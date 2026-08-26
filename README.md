# GPS-CAR Phase 2 — Customer Dashboard

This branch contains initial skeleton for Phase 2: Customer Dashboard (React + Vite + TypeScript), Cloud Functions stubs, and Firebase security rules.

Files included:
- Frontend React app (src/)
- Cloud Functions stubs (functions/)
- Infra security rules (infra/)
- .env.example

How to run locally
1. Copy `.env.example` to `.env` and fill Firebase and Mapbox keys.
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`

Cloud Functions
1. cd functions
2. npm install
3. npm run build (if configured) and `firebase deploy --only functions` (requires firebase CLI and project setup)

Security Rules
- infra/firestore.rules
- infra/rtdb.rules

This is an initial commit. Next steps: implement auth flows, Cloud Function deployment, more UI pages, and integration tests.
