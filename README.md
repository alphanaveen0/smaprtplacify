# SmartPlacify

SmartPlacify is a mobile-first Expo React Native application for AI-powered placement management.

Phase 1 includes:

- Expo Router with role-based mobile tab shells.
- NativeWind/Tailwind-style styling and centralized SmartPlacify colors.
- Auth UI, role selection UI, Student, Company, TPO and Super Admin shells.
- Polished mock dashboards using separate mock data.
- Placeholder service boundaries for eligibility, AI, jobs, students, applications, payments and notifications.

Phase 1 intentionally does not include real Supabase operations, AI calls, payments or production eligibility workflows.

## Run

```bash
npm install
npm run start
```

## Test

```bash
npm run typecheck
```

## Environment

Copy `.env.example` to `.env` when Phase 2 starts and add Supabase project values. Never place service-role keys, AI secrets or Razorpay secrets in the mobile app.
