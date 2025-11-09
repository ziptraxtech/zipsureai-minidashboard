from __future__ import annotations
import os
import json
from datetime import datetime
from typing import Dict, Any, List
import numpy as np
import pandas as pd
import requests

# Minimal reimplementation of parts of the Colab notebook for production use.
# NOTE: Heavy model training (TensorFlow Autoencoder) is optional. Set SKIP_TRAINING=1 to bypass.

DEVICE_TABLES = os.getenv("DEVICE_TABLES", "device5,device6,device7,device8").split(",")
API_BASE_URL = os.getenv(
    "SOURCE_API_BASE",
    "https://le3tvo1cgc.execute-api.us-east-1.amazonaws.com/prod/get-data",
)
OUT_DIR = os.getenv("PIPELINE_OUTPUT", "battery_ae_if_results")
os.makedirs(OUT_DIR, exist_ok=True)

# Threshold params (aligned with notebook intent; adjustable)
THRESHOLD_MULTIPLIER = 2.5
RECENT_WINDOW_MINUTES = 20


def fetch_device_data(device: str) -> pd.DataFrame:
    """Fetch data for a device from the configured API.

    Expects the endpoint to support a `table` query param like `?table=device5` and
    to return JSON records with at least datetime/current/temperature fields.
    """
    try:
        resp = requests.get(API_BASE_URL, params={"table": device}, timeout=30)
        resp.raise_for_status()
        data = resp.json()
    except Exception as e:
        # Surface a clear error that upstream fetch failed
        raise RuntimeError(f"Failed to fetch data for {device}: {e}")

    if isinstance(data, dict) and "data" in data:
        records = data["data"]
    else:
        records = data

    if not isinstance(records, list):
        raise RuntimeError(f"Unexpected API response for {device}: {type(records)}")

    df = pd.DataFrame(records)
    # Normalize column names
    df.columns = [str(c).strip().lower() for c in df.columns]
    # Map potential alternative names
    if "datetime" not in df.columns and "ts" in df.columns:
        df["datetime"] = df["ts"]
    # Best-effort current/temperature mapping
    if "current" not in df.columns:
        for alt in ("curr", "i", "amps"):
            if alt in df.columns:
                df["current"] = df[alt]
                break
    if "temperature" not in df.columns:
        for alt in ("temp", "t"):
            if alt in df.columns:
                df["temperature"] = df[alt]
                break

    # Keep only expected columns
    missing = [c for c in ("datetime", "current", "temperature") if c not in df.columns]
    if missing:
        raise RuntimeError(f"API for {device} missing columns: {missing}")

    df = df[["datetime", "current", "temperature"]].copy()
    df["device_id"] = device
    # Parse datetime
    df["datetime"] = pd.to_datetime(df["datetime"], errors="coerce")
    return df


def load_all_devices(devices: List[str] | None = None) -> pd.DataFrame:
    devs = devices or DEVICE_TABLES
    frames = [fetch_device_data(d) for d in devs]
    return pd.concat(frames, ignore_index=True)


def clean(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df["current"] = pd.to_numeric(df["current"], errors="coerce")
    df["temperature"] = pd.to_numeric(df["temperature"], errors="coerce")
    df = df.dropna(subset=["current", "temperature"]).reset_index(drop=True)
    df["current"] = df["current"].clip(lower=0)  # convert negative discharge to 0 (as per note)
    return df


def compute_thresholds(series: pd.Series) -> Dict[str, float]:
    mu = float(series.mean())
    sigma = float(series.std() or 1.0)
    return {
        "mean": mu,
        "std": sigma,
        "high": mu + THRESHOLD_MULTIPLIER * sigma,
        "low": max(0.0, mu - THRESHOLD_MULTIPLIER * sigma)
    }


def detect_anomalies(df: pd.DataFrame) -> pd.DataFrame:
    c_thr = compute_thresholds(df["current"])
    t_thr = compute_thresholds(df["temperature"])
    df["anomaly_current"] = (df["current"] > c_thr["high"]).astype(int)
    df["anomaly_temperature"] = (df["temperature"] > t_thr["high"]).astype(int)
    # Severity heuristic: temperature spikes more severe; combine
    df["anomaly_combined"] = ((df["anomaly_current"] + df["anomaly_temperature"]) > 0).astype(int)
    # Assign severity label per row
    severity = []
    for _, r in df.iterrows():
        if r["anomaly_temperature"] and r["temperature"] > t_thr["high"] * 1.15:
            severity.append("critical")
        elif r["anomaly_current"] and r["current"] > c_thr["high"] * 1.25:
            severity.append("high")
        elif r["anomaly_combined"]:
            severity.append("medium")
        else:
            severity.append("low")
    df["severity"] = severity
    return df


def aggregate_device_verdicts(df: pd.DataFrame) -> Dict[str, Any]:
    verdicts: Dict[str, Any] = {}
    for device_id, group in df.groupby("device_id"):
        sev_counts = group["severity"].value_counts().to_dict()
        total_anoms = int((group["severity"] != "low").sum())
        verdicts[device_id] = {
            "severity_counts": sev_counts,
            "total_anomalies": total_anoms,
            "samples": len(group),
        }
    return verdicts


def recent_window(df: pd.DataFrame) -> pd.DataFrame:
    cutoff = df["datetime"].max() - pd.Timedelta(minutes=RECENT_WINDOW_MINUTES)
    return df[df["datetime"] >= cutoff].copy()


def run_pipeline() -> Dict[str, Any]:
    raw = load_all_devices()
    cleaned = clean(raw)
    detected = detect_anomalies(cleaned)
    verdicts = aggregate_device_verdicts(detected)
    recents = recent_window(detected)

    # Persist outputs
    verdicts_path = os.path.join(OUT_DIR, "device_verdicts.json")
    with open(verdicts_path, "w") as f:
        json.dump({
            "generated_at": datetime.utcnow().isoformat(),
            "devices": verdicts
        }, f, indent=2)

    detected.to_csv(os.path.join(OUT_DIR, "anomaly_detection_results_combined.csv"), index=False)
    recents.to_csv(os.path.join(OUT_DIR, "recent_window.csv"), index=False)

    return {
        "verdicts": verdicts,
        "recent": recents,
        "records": len(detected)
    }


def run_pipeline_for_devices(devices: List[str]) -> Dict[str, Any]:
    raw = load_all_devices(devices)
    cleaned = clean(raw)
    detected = detect_anomalies(cleaned)
    verdicts = aggregate_device_verdicts(detected)
    return {
        "verdicts": verdicts,
        "records": len(detected)
    }

if __name__ == "__main__":  # Manual run convenience
    info = run_pipeline()
    print(json.dumps({
        "summary": {
            "devices": len(info["verdicts"]),
            "records": info["records"]
        }
    }, indent=2))
