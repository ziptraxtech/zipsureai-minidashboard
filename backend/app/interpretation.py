from __future__ import annotations
from typing import Dict, Any, List

SEVERITY_ORDER = ["critical", "high", "medium", "low"]

RATING_MAP = {
    "critical": {
        "label": "Immediate Action Required",
        "summary": "Critical anomalies detected indicating potential safety or reliability risks. Immediate diagnostic and potential replacement recommended.",
        "actions": [
            "Isolate battery from high load operations",
            "Run full diagnostic and thermal inspection",
            "Schedule replacement procurement",
            "Increase monitoring frequency to real-time"
        ]
    },
    "high": {
        "label": "Degradation Accelerating",
        "summary": "High severity anomalies present. Performance trending downward; proactive maintenance advisable soon.",
        "actions": [
            "Plan a detailed capacity test",
            "Check cell balancing configuration",
            "Review recent charge/discharge cycles",
            "Increase monitoring to daily summaries"
        ]
    },
    "medium": {
        "label": "Moderate Irregularities",
        "summary": "Some anomalies observed but within controlled bounds. Monitor and optimize usage patterns.",
        "actions": [
            "Schedule periodic internal resistance measurements",
            "Verify thermal management firmware",
            "Optimize charging schedule for longevity",
            "Maintain normal monitoring cadence"
        ]
    },
    "low": {
        "label": "Stable",
        "summary": "No material anomalies. Battery operating within expected parameters.",
        "actions": [
            "Continue standard performance logging",
            "Maintain periodic preventative checks",
            "Review historical trend monthly",
            "No immediate intervention required"
        ]
    }
}

def classify_device(severity_counts: Dict[str, int]) -> str:
    for sev in SEVERITY_ORDER:
        if severity_counts.get(sev, 0) > 0:
            return sev
    return "low"


def interpret_device(device_id: str, severity_counts: Dict[str, int], total_anomalies: int) -> Dict[str, Any]:
    dominant = classify_device(severity_counts)
    meta = RATING_MAP[dominant]
    return {
        "device_id": device_id,
        "status": meta["label"],
        "summary": meta["summary"],
        "recommended_actions": meta["actions"],
        "anomalies": {
            "total": total_anomalies,
            "breakdown": severity_counts
        }
    }


def summarize_fleet(devices: List[Dict[str, Any]]) -> Dict[str, Any]:
    fleet_counts = {k: 0 for k in SEVERITY_ORDER}
    for d in devices:
        dom = classify_device(d.get("anomalies", {}).get("breakdown", {}))
        fleet_counts[dom] += 1
    total_devices = len(devices)
    risk_devices = fleet_counts["critical"] + fleet_counts["high"]
    fleet_health = (
        "Critical Risk" if fleet_counts["critical"] > 0 else
        "Elevated Risk" if fleet_counts["high"] / max(total_devices, 1) > 0.3 else
        "Mixed" if fleet_counts["medium"] / max(total_devices, 1) > 0.4 else
        "Stable"
    )
    return {
        "fleet_health": fleet_health,
        "distribution": fleet_counts,
        "risk_summary": f"{risk_devices} devices require attention (critical/high).",
        "recommendation": (
            "Prioritize diagnostics for critical units and schedule maintenance window." if risk_devices > 0 else
            "Maintain routine monitoring; no immediate interventions required."
        )
    }
