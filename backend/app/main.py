from __future__ import annotations
import os
import json
from typing import Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .pipeline import run_pipeline, OUT_DIR, run_pipeline_for_devices, DEVICE_TABLES
from .interpretation import interpret_device, summarize_fleet

BACKEND_ENV = os.getenv("ENV", "dev")
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")

app = FastAPI(title="Battery Anomaly API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*", FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> Dict[str, Any]:
    return {"status": "ok", "env": BACKEND_ENV}


def _load_verdicts_file() -> Dict[str, Any]:
    path = os.path.join(OUT_DIR, "device_verdicts.json")
    if not os.path.exists(path):
        # Lazy-generate if missing
        run_pipeline()
    if not os.path.exists(path):
        raise HTTPException(status_code=500, detail="Failed to generate verdicts")
    with open(path, "r") as f:
        return json.load(f)


@app.get("/verdicts")
def get_verdicts() -> Dict[str, Any]:
    data = _load_verdicts_file()
    devices = data.get("devices", {})
    interpreted = []
    for dev_id, meta in devices.items():
        sev_counts = meta.get("severity_counts", {})
        total = meta.get("total_anomalies", 0)
        interpreted.append(interpret_device(dev_id, sev_counts, total))
    fleet = summarize_fleet(interpreted)
    return {"generated_at": data.get("generated_at"), "fleet": fleet, "devices": interpreted}


@app.post("/refresh")
def refresh() -> Dict[str, Any]:
    info = run_pipeline()
    return {"records": info.get("records", 0), "devices": len(info.get("verdicts", {}))}


@app.post("/refresh/devices")
def refresh_subset(devices: str) -> Dict[str, Any]:
    subset = [d.strip() for d in devices.split(",") if d.strip()]
    if not subset:
        raise HTTPException(status_code=400, detail="No devices provided")
    info = run_pipeline_for_devices(subset)
    return {"records": info.get("records", 0), "devices": list(info.get("verdicts", {}).keys())}


@app.get("/devices/{device_id}")
def device_detail(device_id: str) -> Dict[str, Any]:
    data = _load_verdicts_file()
    devices = data.get("devices", {})
    if device_id not in devices:
        raise HTTPException(status_code=404, detail="Device not found")
    meta = devices[device_id]
    sev_counts = meta.get("severity_counts", {})
    total = meta.get("total_anomalies", 0)
    interpretation = interpret_device(device_id, sev_counts, total)
    return {"generated_at": data.get("generated_at"), **interpretation}


@app.get("/config/devices")
def list_devices() -> Dict[str, Any]:
    return {"devices": DEVICE_TABLES}
