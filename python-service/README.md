# SmartPlacify Python Service

Runs resume parsing, skill extraction, and skill matching outside the Node API.

```bash
cd python-service
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 5001
```
