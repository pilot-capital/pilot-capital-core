# Pilot Capital — Monorepo Template

A friendly, practical README template for a monorepo that hosts one or more web applications and shared packages. This document explains repository layout, recommended tech-stack options, common scripts, development flows, and tips for maintaining a healthy monorepo.

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

This is a common, flexible layout. Adjust to fit your needs.

-   `apps/` — top-level applications (e.g., `web`, `admin`, `api`). Each app is independently buildable and runnable.
-   `packages/` — shared libraries: UI components, utilities, types, API clients, hooks, etc.
-   `tools/` — repository tooling (scripts, generator templates, code mods).
-   `infra/` — IaC and deployment configs (optional).
-   `scripts/` — convenience scripts for monorepo tasks (optional).
-   `package.json` / `pnpm-workspace.yaml` / `turbo.json` / `nx.json` — monorepo configuration files at repo root.

Example:

```
/
├─ apps/
│  ├─ web/           # customer-facing web app
│  ├─ admin/         # internal admin UI
│  └─ api/           # backend application or serverless functions
├─ packages/
│  ├─ ui/            # shared React/Vue components
│  ├─ config/        # shared config/constants
│  └─ utils/         # shared utilities
├─ infra/
├─ package.json
├─ pnpm-workspace.yaml
└─ README.md
```

## Tech stack options

Below are recommended combinations for different priorities. Use one column from each category (frontend / backend / infra) to compose a stack.

Frontend choices

-   React (recommended): Next.js (SSR/SSG), Create React App / Vite for single-page apps.
-   Vue: Nuxt (meta-framework) or Vite + Vue 3.
-   Svelte: SvelteKit for full-stack or Svelte + Vite for SPA.

Backend choices

-   Node.js / TypeScript: Express, Fastify, NestJS (structured), or serverless (Vercel, AWS Lambda).
-   Django (Python): Robust, batteries-included backend for REST APIs or server-side rendering. Integrates well with React frontends via Django REST Framework or GraphQL (Graphene).
-   Go: tiny, fast services (useful where performance and binary distribution matter).
-   Deno: if you prefer a secure runtime with first-class TypeScript.

Monorepo tooling

Styling & UI

Testing & QA

Example recommended stacks

-   React + Django (classic fullstack): Vite + React + TypeScript frontend, Django backend (REST API via Django REST Framework).

**React + Django integration notes:**

-   Structure: Place your frontend in `apps/web` (Vite + React + TypeScript) and backend in `apps/api` (Django project).
-   Communication: Use REST or GraphQL APIs (Django REST Framework or Graphene) for frontend-backend interaction.
-   Local dev: Run React dev server (e.g., port 3000) and Django server (e.g., port 8000) concurrently. Configure CORS in Django for local development.
-   Auth: Use JWT or session-based authentication. Django can manage users and expose auth endpoints for React.
-   Deployment: Deploy frontend and backend separately (e.g., Vercel/Netlify for React, Heroku/AWS for Django) or together using Docker Compose.

This setup is ideal for teams wanting a modern JS UI with a robust Python backend. Shared code can be managed in `packages/` (TypeScript) and optionally in a `python-packages/` folder for Django apps/libraries.

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

Local development (recommendation)

1. Install dependencies (see above).
2. Start shared services if needed (databases, mocks).
3. Start the app(s) you work on, e.g. `pnpm --filter apps/web dev`.

Notes about Windows PowerShell:

-   Use the `pnpm` commands as-is in PowerShell. If you use cross-platform scripts, prefer `cross-env` for environment variables.

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

-   Keep shared ESLint/Prettier configurations under `packages/config` and reference them with `eslint-config-<org>`.
-   Favor TypeScript for shared packages to provide strong contracts between apps.
-   Prefer stable, simple CI steps early; optimize caching later when the pipeline becomes slow.

Minimal checklist before merging PRs

-   [ ] Tests pass for affected packages
-   [ ] Linting passes
-   [ ] Types compile (if TypeScript)
-   [ ] Changes documented when exposing breaking API changes

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
