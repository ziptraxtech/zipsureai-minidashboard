# ZipSureAI Mini Dashboard

Battery performance and anomaly interpretation dashboard.

## Features

* Device battery performance report views with PDF export.
* Paywalled preview (blur) for AI-generated technical analysis, verdict, and recommended actions.
* Unlock flow calls backend FastAPI service for up-to-date anomaly interpretation.
* SVG SOH dial and performance/trend charts (Recharts).

## Architecture Overview

```
frontend/ (Create React App + TypeScript)
	src/components/BatteryReport.tsx  <-- integrates API unlock
backend/ (FastAPI service)
	app/pipeline.py       synthetic data + anomaly detection heuristics
	app/interpretation.py severity → human-readable interpretation
	app/main.py           REST endpoints (/health, /verdicts, /devices/{id}, /refresh)
	requirements.txt      backend Python dependencies
```

## Backend Setup

Python 3.10+ recommended.

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
```

Run the API:

```bash
uvicorn backend.app.main:app --reload --port 8001
```

Or via npm script (still requires Python env prepared):

```bash
npm run api
```

### Key Endpoints

* `GET /health` – service status.
* `POST /refresh` – re-run pipeline (regenerates anomaly outputs).
* `GET /verdicts` – fleet summary + interpreted devices.
* `GET /devices/{device_id}` – single device interpretation (device5 … device8 by default).

## Frontend Setup

Install dependencies and start dev server:

```bash
npm install
npm start
```

Optionally set environment variable to point frontend at deployed backend:

```bash
export REACT_APP_API_BASE=http://localhost:8001
```

## Unlock Flow

`BatteryReport.tsx` prefetches device interpretation and reveals it when user clicks Unlock. Blurred preview remains until `unlocked` state flips true. PDF export temporarily removes blur overlays for a clean document.

## Pipeline Notes

The current pipeline uses synthetic data generation (`fetch_device_data`) as placeholder. Replace with real API calls to `SOURCE_API_BASE` and adapt cleaning/anomaly logic to production dataset. Severity mapping is heuristic and should be calibrated with domain experts.

## Future Enhancements

* Authentication + real paywall enforcement.
* Scheduled pipeline run (cron / serverless) and caching.
* Autoencoder / IsolationForest integration for richer anomaly scoring.
* Multi-device comparative trend charts fed from backend JSON.
* Error boundary + retry UI for API failures.

## License

Proprietary – internal use only (adjust as needed).

---
Generated README replacing merge conflict boilerplate for clarity.
