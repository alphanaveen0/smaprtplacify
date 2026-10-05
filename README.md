# SmartPlacify

SmartPlacify contains three related deliverables:

- `app/` and `src/` - Expo React Native mobile app shell.
- `website/` - no-dependency static dashboard website.
- `frontend/`, `backend/`, `python-service/`, `database/` - full-stack React + Express + MySQL + Python application.

## Mobile App

```bash
npm install
npm run start
```

```bash
npm run typecheck
```

The mobile app is the Phase 1 Expo Router scaffold with role-based shells, NativeWind styling, and mock UI.

## Static Website

Open `website/index.html` directly in a browser, or serve it with:

```bash
python3 -m http.server 8000 --directory website
```

Then open `http://localhost:8000`.

## Full-Stack Web App

The full-stack app preserves the approved SmartPlacify dashboard visual design and connects it to real APIs and MySQL persistence.

Folder structure:

- `frontend/` - React + Vite UI.
- `backend/` - Node.js + Express REST API.
- `python-service/` - FastAPI resume parser and skill matcher.
- `database/` - MySQL schema and seed data.

### Database Setup

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

Seed login accounts:

- Student: `student@test.com`
- Company: `company@test.com`
- TPO/Admin: `admin@test.com`
- Password: `password123`

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Required environment variables are listed in `backend/.env.example`.

### Python Service

```bash
cd python-service
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 5001
```

If this service is offline, the backend still handles normal app flows and uses fallback skill matching.

### React Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open the Vite URL, usually `http://localhost:5173`.

## Implemented Modules

- Authentication: register, login, logout, JWT sessions, protected APIs and role guards.
- Dashboards: student, company and TPO dashboard statistics from MySQL.
- Students: create, edit, delete, search and profile records.
- Companies: create, edit, delete, search and verification-ready records.
- Jobs: create, edit, delete, search and active/inactive fields.
- Eligibility: deterministic CGPA, branch, backlog, graduation year, experience and skill matching.
- Applications: apply only when eligible, duplicate prevention, shortlist, reject and final result.
- Interviews: create, edit, delete and list scheduled interviews.
- Notifications: stored notifications and mark-as-read.
- Resume upload: PDF/DOC/DOCX validation, file storage and Python analysis hook.
- Reports: TPO dashboard and analytics pull live API data.

## Limitations

- Email delivery for forgot password is not wired yet.
- DOC parsing returns empty text unless converted to DOCX/PDF.
- The full-stack frontend is functional and preserves the approved dashboard look, but it is not a pixel-perfect clone of every mobile Expo screen.
- Runtime validation was not possible on this Mac because Node/npm are unavailable in the shell.
