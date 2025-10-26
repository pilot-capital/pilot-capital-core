# Pilot Capital — Monorepo

This monorepo contains:

-   `apps/web`: Vite + React + TypeScript frontend, using React Router for navigation and a sample folder structure (`components`, `pages`, `hooks`, `assets`, `styles`, `utils`).
-   `apps/api`: Django backend, configured for PostgreSQL and Django REST Framework.
-   `packages`: (optional) for shared code/libraries.

It is set up for modern fullstack development, with clear separation between frontend and backend, and ready for local development and deployment.

---

## Quick overview

-   Purpose: centralize frontend, backend, and shared packages in a single repository for consistent development, testing, and deployment.
-   Scope: this template covers structure, stack options, developer workflows, CI hints, and useful scripts.

## Table of contents

1. [Repository layout](#repository-layout)
2. [Tech stack options](#tech-stack-options)
3. [Getting started](#getting-started)
4. [Developer workflows & scripts](#developer-workflows--scripts)
5. [Testing & quality](#testing--quality)
6. [CI / CD recommendations](#ci--cd-recommendations)
7. [Contributing & governance](#contributing--governance)
8. [Appendix: examples & tips](#appendix-examples--tips)

---

## Repository layout

```
/
├─ apps/
│  ├─ web/           # Vite + React + TypeScript frontend
│  │   └─ src/
│  │       ├─ components/
│  │       ├─ pages/
│  │       ├─ hooks/
│  │       ├─ assets/
│  │       ├─ styles/
│  │       └─ utils/
│  └─ api/           # Django backend (PostgreSQL, REST Framework)
├─ packages/         # Shared code (optional)
├─ pnpm-workspace.yaml
├─ README.md
└─ GETTING_STARTED.md
```

## Tech stack options

Below are recommended combinations for different priorities. Use one column from each category (frontend / backend / infra) to compose a stack.

Frontend

-   Vite + React + TypeScript (SPA, fast dev, modern tooling)
-   React Router for navigation between pages

Backend

-   Django (Python) with Django REST Framework
-   PostgreSQL database

Monorepo tooling

Styling & UI

Testing & QA

Example stack in this repo:

-   Vite + React + TypeScript + React Router frontend
-   Django + Django REST Framework + PostgreSQL backend

**Integration notes:**

-   Frontend and backend run independently in local dev (`pnpm dev` for React, `python manage.py runserver` for Django)
-   API requests from React to Django (CORS may need configuration)
-   Environment variables managed via `.env` files in each app
-   PostgreSQL setup instructions in `GETTING_STARTED.md`

Pros/cons table (short):

-   pnpm + Turborepo: fast, good caching; learning curve for newcomers.
-   Nx: powerful dev tooling & generators; heavier but great for large teams.
-   Yarn Workspaces: widely adopted; less strict disk usage than pnpm.

---

## Getting started

Prerequisites

-   Node.js (LTS) installed
-   pnpm (preferred) or Yarn / npm

Install dependencies (PowerShell example):

```powershell
# install pnpm globally if needed
npm install -g pnpm

# install workspace dependencies
pnpm install
```

Common scripts (root `package.json`):

-   `pnpm install` — install all dependencies.
-   `pnpm dev --filter ./apps/web...` — run dev server for `web` app (example using workspace filters).
-   `pnpm build` — build all projects.
-   `pnpm test` — run tests across workspace.

Local development

1. Install dependencies (see above)
2. Start React frontend: `cd apps/web && pnpm dev`
3. Start Django backend: `cd apps/api && python manage.py runserver`
4. Access frontend at [http://localhost:5173](http://localhost:5173), backend at [http://127.0.0.1:8000](http://127.0.0.1:8000)
5. See `GETTING_STARTED.md` for full setup and database instructions

---

## Developer workflows & scripts

Typical workflows to keep the repo healthy:

-   Feature branch per task: `feature/<short-desc>`.
-   Small PRs, focused on a single concern.
-   Use `pnpm --filter` or workspace selectors to run commands only where needed.

Useful examples (root `package.json`):

```json
{
    "scripts": {
        "dev": "turbo run dev",
        "build": "turbo run build",
        "lint": "eslint . --ext .ts,.tsx,.js,.jsx",
        "test": "turbo run test"
    }
}
```

Adding a new app

1. Create `apps/<name>` with its own `package.json`.
2. Expose shared dependencies from `packages/*` as workspace dependencies.
3. Add CI job and script entries.

Sharing code

-   Keep public types and interfaces in `packages/types` or `packages/contracts`.
-   Keep UI primitives in `packages/ui` and publish internal versioning (or use workspace resolution).

---

## Testing & quality

-   Unit tests: configure per-app using Jest or Vitest.
-   E2E: keep E2E tests under `apps/<app>/e2e` or in a top-level `e2e/` folder.
-   Linting: share ESLint/Prettier configs in `packages/config` and reference them in apps.

Example: run only tests for a package

```powershell
pnpm --filter ./packages/ui test
```

---

## CI / CD recommendations

-   Use workspace-aware pipelines (GitHub Actions, GitLab CI, or other). Only run builds/tests for affected packages when possible (Turborepo / Nx / changesets can help).
-   Keep deployable artifacts per-app (e.g., Docker images for `api`, static export for `web`).
-   Secrets: use your CI provider's secret store; avoid checked-in credentials.

Example GitHub Actions hints

-   matrix jobs per app or change-detection to speed up the pipeline.
-   use caching for node modules and build outputs.

---

## Contributing & governance

-   Code of Conduct: add `CODE_OF_CONDUCT.md`.
-   PR template: add `.github/pull_request_template.md`.
-   Reviewers & CODEOWNERS: add `.github/CODEOWNERS` to route PRs.
-   Commit messages: adopt Conventional Commits to power changelogs and releases.

Release management

-   Use `changesets` or a similar tool for versioning and changelogs when publishing packages.

Security & secrets

-   Add `SECURITY.md` for disclosure.
-   Use environment-specific secrets in CI and runtime platform only.

---

## Appendix — Examples & tips

-   React app structure: see `apps/web/src` for `components`, `pages`, `hooks`, `assets`, `styles`, `utils`
-   Routing: handled by React Router in `App.tsx`
-   Django REST API: see `apps/api/PCCore` for backend config
-   PostgreSQL setup: see `GETTING_STARTED.md` and `.env.example` in `apps/api`

Minimal checklist before merging PRs

-   [ ] Frontend and backend run locally
-   [ ] Database migrations applied
-   [ ] API endpoints tested
-   [ ] Linting passes
-   [ ] Types compile (if TypeScript)
-   [ ] Changes documented

---

## Useful links

-   pnpm: https://pnpm.io/
-   Turborepo: https://turbo.build/
-   Nx: https://nx.dev/
-   Changesets: https://github.com/changesets/changesets

---

## License

Specify your project license here (e.g., MIT). Add a `LICENSE` file at repository root.

---

If you'd like, I can also:

-   Add example `package.json` root and app manifests.
-   Scaffold an `apps/web` starter with Next.js + Tailwind + pnpm workspace config.
-   Add recommended CI workflow templates (GitHub Actions).

Tell me which extras you'd like and I will scaffold them next.
