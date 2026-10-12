# Reactive Resume: agent instructions

This file applies across the repository. Follow a closer `AGENTS.md` when one exists. Keep this guide focused on agent workflows; user-facing documentation lives in `README.md` and `docs/`. Format guidance: [agents.md](https://agents.md/).

<!-- caveman-begin -->

Respond terse like smart caveman. All technical substance stay. Only fluff die.

Rules:

- Drop: articles (a/an/the), filler (just/really/basically), pleasantries, hedging
- Fragments OK. Short synonyms. Technical terms exact. Code unchanged.
- Pattern: [thing] [action] [reason]. [next step].
- Not: "Sure! I'd be happy to help you with that."
- Yes: "Bug in auth middleware. Fix:"

Switch level: /caveman lite|full|ultra|wenyan-lite|wenyan-full|wenyan-ultra
Stop: "stop caveman" or "normal mode"

Auto-Clarity: drop caveman for security warnings, irreversible actions, user confused. Resume after.

Boundaries: code/commits/PRs written normal.
<!-- caveman-end -->

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->

## Agent skills

- Issues and specs: GitHub Issues for `reactive-resume/reactive-resume`. See `docs/agents/issue-tracker.md`.
- Check `git status --short` before editing. Preserve unrelated changes, including existing edits in this file.
- Use scripts and configuration as the source of truth when documentation disagrees with them.

## Chinese AI Resume: mandatory feature delivery workflow

This fork's Chinese AI resume and VIP development must follow this section in every session. Keep the upstream architecture, security, formatting, and testing rules below. The human user's current instructions take precedence.

Canonical project records:

- Development scope, feature contracts, dependencies, and acceptance criteria: [development plan](docs/plans/chinese-ai-resume-development.plan.md).
- Feature status, assigned branch, PR URL, validation evidence, and blockers: [feature tracker](docs/plans/chinese-ai-resume-feature-tracker.md).
- Product positioning, suggested VIP pricing, merchant onboarding, and public-launch prerequisites: [launch plan](docs/plans/chinese-ai-resume-vip-launch.plan.md).
- Product repository: `ryan-deng98/reactive-resume` on `origin`. `upstream` is the original open-source project, not the destination for product feature PRs.

### Start and resume each session

1. Read this file, closer instructions, the development plan, and the tracker before implementation. Check `git status --short`, the current branch, and Git remotes; preserve unrelated changes.
2. Reconcile the selected feature's existing branch, PR, latest checks, and dependency merge state with GitHub. Reuse an existing feature branch/PR instead of creating a duplicate. A previous session's "done" message is not proof of a merge.
3. If the user names a feature, work on that feature. Otherwise, when implementation is authorized, select the next `P0` feature whose dependencies are merged into `origin/dev`; follow the plan's recommended order. Planning-only requests do not authorize implementing the whole backlog.
4. Record the feature ID, scope, acceptance criteria, branch, and status before coding. If dependencies are unmerged, work on another ready feature within the authorized scope or report the dependency; do not silently import unrelated feature commits.

### One feature, one branch, one PR

- Every feature uses its tracker branch: `codex/feature/fNNN-short-name`. The `codex/` prefix follows this environment's branch convention; each branch is still a feature branch.
- Create the branch only when starting that feature, from freshly fetched `origin/dev`. Never pre-create all backlog branches, develop directly on `main`/`dev`, or target `main`/`upstream` with a product feature PR.
- `dev` is the integration branch; `main` is the release branch. Initial creation of `dev` from verified `origin/main` is the sole bootstrap exception to the no-direct-push rule. Subsequent changes enter `dev` through PRs.
- Keep changes within one feature's behavior and necessary tests, migrations, translations, docs, and tracker updates. If a second independently deliverable feature is needed, register it separately before implementation. Do not hide unrelated work in a feature PR.
- A feature PR must be independently reviewable against `dev`. Do not use another unmerged feature branch as the base or create stacked PRs unless the user explicitly requests that exception.
- Update the feature branch from `origin/dev` before final validation; resolve conflicts without overwriting unrelated work. Never force-push shared branches. After integration changes, rerun affected checks.
- Use Conventional Commits. Push the feature branch and open one PR with explicit `--repo ryan-deng98/reactive-resume --base dev --head <feature-branch>`.
- A PR does not authorize a merge. Do not merge PRs, enable auto-merge, change branch protection, publish a release, deploy production, or activate real charging without the user's authorization for that action.

### Required validation and PR handoff

- Every implementation feature includes its own meaningful behavior tests where warranted. Payment, ownership, VIP periods, quotas, concurrency, retries, refunds, and data handling require tests in the same PR; do not postpone those tests to the final E2E feature.
- Follow the existing lint/format rules. Run relevant package typechecks/tests, `pnpm lint:agent`, and `pnpm format:check`; run boundaries for contract/export/import changes, production build for runtime/bundling changes, and browser checks for affected critical flows.
- Documentation-only features require formatting, diff/whitespace, link/path, and tracker/dependency consistency checks; application tests/build are not required for documentation alone. If root scripts cannot run, record the exact reason and any equivalent scoped checks rather than claiming they passed.
- Fix diagnostics without disabling rules or skipping hooks merely to submit a PR. Preserve existing baseline failures as documented blockers, not invented successful results.
- A ready-for-review PR requires completed acceptance criteria and passing applicable local checks. If environment/dependency/CI blockers remain, open or retain a **draft** PR, record the blocker, and leave the feature incomplete.
- PR descriptions state the feature ID, user-visible behavior, scope, dependencies, checks actually run, migration/rollback implications, and remaining blockers. Link a feature issue when one exists; do not create upstream issues for this fork's product backlog. No AI attribution or session links.
- After creating any PR, attach its URL to this chat with `attach_artifact`, and record its URL in the tracker on the same feature branch. Commit/push that tracker update and inspect checks for the latest head commit.

### State and completion rules

Allowed tracker statuses: `planned`, `in_progress`, `blocked`, `draft_pr`, `pr_open`, `merged`, `cancelled`.

- `in_progress`: implementation started on the assigned branch.
- `draft_pr`: a draft exists or required validation is incomplete; include its PR URL and blocker.
- `pr_open`: a non-draft PR exists with required acceptance/local checks complete; record current CI separately, including pending or failed checks.
- `merged`: GitHub confirms the PR merged into `dev`; record PR URL, merge commit, and validation evidence. Only this state satisfies another feature's dependency. A pushed branch, approved review, open PR, or passing tests alone do not mean merged.
- `blocked`: missing dependency, permission, resource, or external approval prevents feature progress; specify the next action and owner. Prefer `draft_pr` with a blocker if a draft PR already exists.
- `cancelled`: the user explicitly removed the feature; preserve the reason and historical links.
- Never mark a feature implemented/merged before its required work is complete. Keep a feature's code and acceptance evidence together; an integration/release PR cannot substitute for missing feature PRs.

Before ending an implementation session, update the tracker with branch/PR, checks and result, blocker/next action, and changed scope. Report what was implemented, PR target and URL, tests actually run, and what remains. If a completed feature PR needs only human review/merge, hand it off and do not start dependent work as though it already merged.

### Product and launch boundaries

- VIP is server-enforced entitlement plus a durable credit ledger, not a browser flag. Every platform-funded model entry point, including API/MCP/background jobs, must use the same policy or be disabled server-side.
- Prices, entitlement periods, and credit amounts come from server-side SKU snapshots. Validate official payment notifications, persist grants atomically/idempotently, and maintain reconciliation/refund audit history.
- Keep personal resume data and credentials out of logs, fixtures, issues, and PRs. Use synthetic or authorized de-identified test data and isolated test databases/providers.
- Merchant/website/AI application approvals, public-facing content disclosures, real transactions, and production activation are external launch gates. A feature PR can be merged behind disabled flags while those gates remain pending; do not call the product publicly launched or start charging merely because code is merged.
- Product tests must not pay real merchants or call paid production models. Use deterministic AI stubs and signed payment fixtures; an explicitly authorized real smoke test is a separate step.

## Overview

Reactive Resume is a free, open-source resume builder for creating, importing, exporting, and sharing resumes, cover letters, and job applications. It is a TypeScript pnpm monorepo managed by Turborepo, with two apps: `apps/web` (React 19 SPA with TanStack Router, TanStack Query, Tailwind CSS, and Vite) and `apps/server` (Hono / Node.js). oRPC connects browser workflows to server business logic; Better Auth handles authentication; Drizzle accesses PostgreSQL. Forme renders PDFs in the browser and on the server.

The production Docker image runs a single Node.js process on port 3000; `apps/server` mounts the API/auth/MCP/static routes and serves the built web app. On Vercel, the `frontend` service serves static assets through its CDN and the `backend` service runs the same Hono application in a Node.js Function.

Internal packages are source-consumed through `package.json` export maps pointing at `src` files. Do not assume package-local `dist` output exists unless a package explicitly adds it.

## Setup

Prerequisites: **Node.js 24** (`.nvmrc`, root `engines`, and Dockerfile), **pnpm 12.11.2** (root `packageManager`; pnpm self-manages to this version), and **Docker with Docker Compose** for local infrastructure. The Dockerfile's `ARG PNPM_VERSION` chooses its base image, not the project's pnpm version. Start your Docker daemon before running Compose.

For this fork's isolated host development and browser acceptance environment, follow [the F001 baseline guide](docs/development/chinese-ai-resume-baseline.md). `compose.baseline.yml` uses separate development/test databases, loopback-only ports, and local file storage; it does not replace the upstream full-service Compose setup below.

Shared dependency versions live in the default `catalog` in `pnpm-workspace.yaml`. Use `catalog:` in workspace manifests when that shared range applies; keep intentional exact pins and peer dependency ranges explicit.

Run commands from the workspace root unless stated otherwise:

```sh
pnpm install --frozen-lockfile
test -e .env.local || cp .env.example .env.local
docker compose -f compose.dev.yml up -d postgres redis seaweedfs seaweedfs_create_bucket
docker compose -f compose.dev.yml ps
```

Copy the environment template only when `.env.local` does not already exist. For host-run development, edit these values in `.env.local`; the template uses container hostnames:

```dotenv
APP_URL=http://localhost:3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
S3_ENDPOINT=http://localhost:8333
REDIS_URL=redis://localhost:6379
```

Set `AUTH_SECRET` to a generated secret (`openssl rand -hex 32`). If using saved AI providers or the assistant, also set a separate `ENCRYPTION_SECRET` of at least 32 characters. For database-only development, start just `postgres` and set `STORAGE_BACKEND=local` to avoid the template's S3 defaults.

## Development workflow

```sh
pnpm dev
pnpm dev:web
pnpm db:generate
pnpm db:migrate
pnpm db:studio
```

- `pnpm dev` runs Vite on `PORT` (default `3000`), Hono on `SERVER_PORT` (default `3001`), and the email template preview on `3002`. Vite proxies API requests to Hono. Vite supplies hot reload; `tsx watch` restarts the server.
- `pnpm dev:web` starts only Vite; API workflows still need a server. If ports are busy, change `PORT` and `SERVER_PORT` consistently in `.env.local`; keep the email preview's `3002` port free when running all dev tasks.
- Server startup applies migrations before initializing auth and serving traffic. `pnpm db:migrate` applies them without starting the app; `pnpm db:studio` opens the database UI.
- After adding user-facing strings, use Lingui macros and run `pnpm lingui:extract`. Catalogs live in `apps/web/locales/*.po`; `pnpm pdf:translations` regenerates PDF translations. Root build/check scripts run PDF translation generation automatically.
- `pnpm docs:gen` regenerates the OpenAPI spec and semantic CSS reference. Use it when changing those public surfaces.
- Career/workspace changes: update the mapped user guides and fictional screenshots in the same change. Use `docs/contributing/career-platform.mdx` → **Keep product guides current**; verify UI labels, opt-ins, context, timezone and voice fallback against current code.

## Ownership map

Where each concern lives, and where new code for it goes:

| Area                                                                                            | Owner                                                                                                                                                            |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Web routes, loaders, user-facing workflows                                                      | `apps/web/src/routes`, `apps/web/src/features` (file-based; never hand-edit `routeTree.gen.ts`)                                                                  |
| Server HTTP routes/adapters, startup checks, static handlers, MCP transport, OpenAPI/well-known | `apps/server/src/{http,rpc,mcp,openapi,static,startup}`                                                                                                          |
| Authenticated API contracts + business logic                                                    | `packages/api/src/features/*` (oRPC routers, DTOs, rate limiting; aggregated at `@reactive-resume/api/routers` for `/api/rpc`)                                   |
| Auth                                                                                            | `packages/auth` (Better Auth config/helpers/types; `apps/server/src/http/auth.ts` delegates to `auth.handler`)                                                   |
| DB client + schema                                                                              | `packages/db` (Drizzle; migrations at repo root `migrations/`)                                                                                                   |
| Server env validation                                                                           | `packages/env` (auto-loads root `.env`)                                                                                                                          |
| Resume/page/template Zod schemas                                                                | `packages/schema`                                                                                                                                                |
| Pure resume-domain behavior (no DB/HTTP/DOM/renderer deps)                                      | `packages/resume` (JSON Patch helpers, social-network icons)                                                                                                     |
| Resume PDF rendering                                                                            | `packages/pdf` (React templates converted through `src/forme` to Forme documents, font resolution, browser/server adapters)                                      |
| PDF.js viewer/canvas UI                                                                         | `apps/web/src/features/resume` — never in `packages/pdf`                                                                                                         |
| DOCX export                                                                                     | `packages/docx`                                                                                                                                                  |
| MCP tools/prompts/resources/server-card                                                         | `packages/mcp`                                                                                                                                                   |
| Generic UI primitives + hooks                                                                   | `packages/ui` (Base UI/shadcn-style); workflow-specific UI stays in the owning web feature                                                                       |
| DeepSeek Harness integration                                                                    | `packages/dsh-plugin` (separately built/published plugin)                                                                                                        |
| Focused support surfaces                                                                        | `packages/fonts`, `packages/email`, `packages/import`, `packages/ai`, `packages/utils`, `packages/config` — prefer existing exports over cross-package shortcuts |
| Dev-only scripts                                                                                | `tooling/`, not `packages/`, so packages only hold runtime-bundled code                                                                                          |

Narrow cross-cutting helpers go in `packages/utils` only after checking no domain package is a better owner. Specifically: resume JSON Patch behavior belongs in `@reactive-resume/resume/patch` and DOCX builders in `@reactive-resume/docx` — not in `@reactive-resume/utils`.

## Web app conventions

- `apps/web/src/router.tsx` initializes router context with `queryClient`, `orpc`, `theme`, `locale`, `session`, and `flags`. Reuse route context instead of refetching these ad hoc.
- The web app is a client-rendered SPA. The web build prerenders marketing homepages per locale; there is no request-time React SSR. `apps/server/src/static/web.ts` serves HTML and injects OpenGraph, canonical, and JSON-LD metadata. When adding a public marketing route, update its server fallback/SEO handling as well as the TanStack route; Vite's dev fallback can otherwise hide production 404s.
- Builder shell: `apps/web/src/routes/builder/$resumeId`. Public resume route: `apps/web/src/routes/$username/$slug.tsx`.
- Browser-only preview code: `apps/web/src/features/resume/preview`. Public PDF viewer: `apps/web/src/features/resume/public`. Keep PDF.js/canvas code in these features, not in `packages/pdf`.
- oRPC client: `apps/web/src/libs/orpc/client.ts` calls `/api/rpc` with credentials included. `apps/web/src/libs/orpc/fetch.ts` stages large request bodies through Blob on Vercel.
- For React components with explicit props, use a named props type (e.g. `type FooProps = {...}` with `function Foo(props: FooProps)`) rather than inline object annotations, especially with more than one field or with generics.

## Package boundaries

`pnpm exec turbo boundaries` is the executable check. Rules:

- Workspace deps go through package names and export maps. Never import another workspace's `src` tree via repo paths, `@reactive-resume/*/src/*`, or TS path aliases.
- Workspace `turbo.json` files declare coarse tags: `app:web`, `app:server`, `runtime:server` (server-only packages: API/auth/db/env/email/MCP), `runtime:browser` (browser-only shared UI), `runtime:universal` (environment-neutral domain packages), plus `role:domain|infra|adapter|api|rendering|tooling` for intent.
- Runtime-specific code lives behind explicit export subpaths (`@reactive-resume/pdf/browser`, `@reactive-resume/pdf/server`, `@reactive-resume/env/server`). Keep root exports environment-neutral unless the package is intentionally server-only.
- Wildcard exports are allowed only for leaf libraries with an intentionally file-like surface — currently `@reactive-resume/ui/components/*`, `@reactive-resume/ui/hooks/*`, and schema resume/application model files. Prefer explicit exports for packages owning runtime behavior.
- Prefer `protectedProcedure` from `packages/api/src/context.ts` for authenticated procedures. Expose only intentional public surfaces through `packages/api/package.json`.
- Shared PDF section filtering: `packages/pdf/src/templates/shared/filtering.ts`. Template-specific visual exceptions stay in the owning template directory unless multiple templates need the behavior. `packages/pdf/src/hooks/use-register-fonts.ts` resolves font families, weights, and script fallback stacks; the Forme adapter owns conversion/rendering. PDF generation needs no Browserless or Chromium service.

Multi-place changes:

- **Resume data shape**: `packages/schema/src/resume/*` first, then API DTOs, importers, PDF rendering, and web forms consuming it.
- **New template**: `packages/schema/src/templates.ts`, `packages/pdf/src/templates/index.ts`, source under `packages/pdf/src/templates/<name>/`, and previews under `apps/web/public/templates/{jpg,pdf}`.
- **New DB column/table**: `packages/db/src/schema/*`, then `pnpm db:generate`.
- **New env var**: `packages/env/src/server.ts`, `.env.example`, **and** the `globalPassThroughEnv` array and applicable test-task `env` arrays in `turbo.json`. Add deployment aliases in `packages/env/src/deployment.ts` when needed. Turborepo strict env mode filters unlisted injected variables from task processes.

## Environment and database

Host development requires `APP_URL`, `DATABASE_URL`, and non-empty `AUTH_SECRET`. `packages/env/src/server.ts` also loads root `.env` through Node's native `process.loadEnvFile`; existing process variables take precedence. Root dev/database scripts explicitly load `.env.local` through `dotenvx`. Tests and application code can have their own environment loaders; do not assume every command loads `.env.local`.

- **Storage**: explicit `STORAGE_BACKEND=local|s3|blob` wins. Otherwise, complete S3 credentials select S3; Vercel selects private Blob; other deployments select local storage. `.env.example` ships SeaweedFS defaults, so either run SeaweedFS or select `local`/remove the S3 credentials. Local storage defaults to `<workspace>/data` in development and `/app/data` in Docker. `LOCAL_STORAGE_PATH` must be absolute and writable; persist it in deployed installations.
- **`ENCRYPTION_SECRET`** is required for saved AI providers and the assistant. **`REDIS_URL`** is optional outside Vercel; it shares rate limits, cancellation and resumable replies between processes. Vercel deployment preparation requires Redis. Host-run dev uses `REDIS_URL=redis://localhost:6379`; the container-run app uses `redis://redis:6379`.
- **`drizzle-kit` (used by `pnpm db:migrate`) reads `DATABASE_URL` from `process.env` directly** — it does not auto-load `.env`. The root migration scripts load `.env.local` through `dotenvx` before invoking Drizzle Kit.
- `DATABASE_MIGRATION_URL` supplies a direct migration connection when runtime `DATABASE_URL` is pooled. Review generated migration SQL before applying it; avoid resetting databases or deleting volumes to fix setup errors.
- Startup verifies the migrated schema. `STRICT_SCHEMA_CHECK=true` makes detected drift fatal; otherwise the server logs it and continues.

## Testing and checks

Prefer package-scoped checks for the files changed. Package names come from their `package.json`: the apps are `web` and `server`, most shared packages are `@reactive-resume/<name>`.

```sh
pnpm --filter web typecheck
pnpm --filter @reactive-resume/pdf test
pnpm --filter @reactive-resume/pdf test src/templates/shared/filtering.test.ts
pnpm --filter @reactive-resume/pdf exec vitest run src/templates/shared/filtering.test.ts -t "filterItems"
pnpm --filter @reactive-resume/pdf test:coverage
pnpm exec oxlint --deny-warnings apps/web/src/features/resume
pnpm exec oxfmt --check apps/web/src/features/resume
pnpm exec turbo boundaries
```

- Vitest tests live alongside source as `src/**/*.test.ts(x)` or `src/**/*.spec.ts(x)` (including integration tests). Paths under `pnpm --filter <package>` are package-relative. Pass paths directly after `test`: an extra `--` currently prevents Vitest from filtering the run. Shared settings live in `vitest.shared.mts` and setup in `vitest.setup.ts`; most packages use Node, while `packages/ui` uses `happy-dom`.
- Coverage uses V8 and writes package-local `coverage/` reports. No shared minimum coverage threshold is configured. `test:ci` writes JSON/JUnit results under package-local `reports/`.
- Root `pnpm test`, `pnpm test:coverage`, and `pnpm typecheck` run workspace checks through Turbo. CI checks boundaries and affected-package typechecks, then runs all unit suites with `pnpm exec turbo run test:ci --concurrency=1` to avoid CPU contention in PDF/rate-limit suites. Unit/browser and Vercel workflows persist `.turbo/cache`; cached coverage and test reports restore to package-local output directories.
- Real-database unit suites use `COVER_LETTER_TEST_DATABASE_URL` and `OAUTH_TEST_DATABASE_URL`; see `.github/workflows/e2e.yml` for isolated database setup. Never point test fixtures at production data.
- After changing shared contracts, exports, or imports, check affected consumers and run `pnpm exec turbo boundaries`.

### Browser tests

Playwright specs live in `tests/e2e/specs/*.spec.ts`, with fixtures in `tests/e2e/fixtures`. Configure a disposable PostgreSQL database and export test environment variables before building/running; these root scripts do not wrap `dotenvx`.

```sh
pnpm exec playwright install chromium
pnpm build
pnpm test:e2e
pnpm test:e2e tests/e2e/specs/auth.spec.ts
pnpm test:e2e:ui
```

- `playwright.config.ts` starts `node apps/server/dist/index.mjs` in production mode and waits for `/api/health`; locally it can reuse an existing server. Build first. Keep the direct Node command: pnpm's script process groups can prevent Playwright from cleaning up a server started through `pnpm start`.
- Export `APP_URL`, `PORT`, `DATABASE_URL`, `AUTH_SECRET`, and `ENCRYPTION_SECRET`, and choose an absolute writable `LOCAL_STORAGE_PATH`. Auth fixtures need signups/email auth enabled; `FLAG_DISABLE_API_RATE_LIMIT=true` is appropriate for this isolated test installation.
- Assistant specs use a deterministic local AI stub and need `FLAG_ALLOW_UNSAFE_AI_BASE_URL=true`; otherwise those specs skip. See `tests/e2e/README.md` for the full environment recipe; adapt its example storage path to your machine.
- Playwright runs Chromium with no retries. CI uses one worker and retains failure traces, screenshots, videos, and reports. PDF/DOCX rasterization and visual regression are outside this browser gate.

## Code style

- TypeScript is strict, including `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, and unused-symbol checks; packages typecheck with `tsgo --noEmit`.
- Oxlint checks code with its native React Compiler and accessibility rules. Oxfmt uses tabs, double quotes, 120-column lines, separated type import groups, and sorted Tailwind classes in `clsx`, `cva`, and `cn`. Use existing file naming and feature-local conventions.
- **`pnpm check` modifies files**: it regenerates PDF translations, applies safe Oxlint fixes, runs Oxfmt, then fails on remaining lint errors or warnings. Review the diff; use `pnpm lint` and `pnpm format:check` for non-mutating checks.
- Lefthook's pre-commit hook checks conflict markers, applies safe Oxlint fixes, runs Oxfmt, then checks staged files with warnings denied and stages the fixes. The commit-message hook enforces Conventional Commits (`fix:`, `feat:`, `docs:`, etc.).

## Linting and formatting for coding agents

- After code changes, run `pnpm exec oxlint --fix <changed paths>`, then `pnpm exec oxfmt <changed paths>`. Safe lint fixes run before formatting and import/Tailwind sorting. Keep side-effect import order intact.
- Before finishing, run `pnpm lint:agent` (`oxlint --deny-warnings --format=agent`) and `pnpm format:check`. Fix diagnostics and recheck; do not disable rules merely to make a check pass. Any necessary inline suppression must name its rule and explain why.
- Lint rules live in `.oxlintrc.json`; formatting and import groups live in `.oxfmtrc.json`. Generated route trees, build outputs, migrations, OpenAPI JSON, generated schema references, and byte-sensitive PDF CSS fixtures are excluded where appropriate.
- `@shadcn/lint` is registered as a JS plugin. Its design-system rules are opt-in: configure them in `.oxlintrc.json` after choosing the policy. It discovers the shared UI exports and Tailwind theme through `apps/web/components.json` and `packages/ui/components.json`. See [available rules](https://github.com/shadcn-ui/lint#rules). Keep UI-specific policies scoped to the web app and UI package.
- Async test doubles may return a Promise without awaiting; the test override permits this. Playwright fixture callbacks named `use` are not React hooks, so `rules-of-hooks` is disabled only in the fixture adapter. Path references in declaration shims remain supported. CSS is formatted by Oxfmt; Oxlint checks JavaScript/TypeScript rather than CSS declarations.
- Editor setup is checked in under `.vscode/`: install the recommended Oxc extension for lint fixes and formatting on save. This workflow follows the [Oxc coding-agent guide](https://oxc.rs/docs/guide/usage/coding-agents.html). Restart Codex sessions after changing these instructions.

## Build and deployment

```sh
pnpm build
NODE_ENV=production pnpm start
docker compose up -d --build
```

- Build outputs: `apps/web/dist` (SPA/assets), `apps/web/dist-prerender` (localized marketing HTML), and `apps/server/dist` (`index.mjs` plus server/deployment chunks). `pnpm start` runs the built server; set `NODE_ENV=production` so it uses `PORT` instead of `SERVER_PORT`. Export runtime variables or provide root `.env`; `.env.local` is not loaded by `start`.
- Production Compose loads `.env.example` then `.env`, not `.env.local`. Configure `.env` with container hostnames (`postgres`, `redis`, `seaweedfs`) and production secrets before running it. The Docker image runs as `node`, listens on `3000`, and persists local storage through `/app/data`. Health endpoint: `/api/health`.
- `vercel.json` defines Vercel Services (project framework must be `Services`): `frontend` (`apps/web`, static `dist`) and `backend` (`apps/server`, entrypoint `apps/server/vercel.mjs` re-exporting the tsdown build). The backend build runs `pnpm build` for both apps, then `node apps/server/dist/prepare-deployment.mjs`. Top-level rewrites send paths whose last segment has a file extension to `frontend` and everything else, including HTML shells, to `backend`, except the server-owned paths listed first. The Function uses Node 24 and a 300-second budget. `outputDirectory: "."` on `backend` stops the builder from treating `dist/index.mjs` (the Docker entrypoint) as the handler.
- Vercel environment normalization accepts `POSTGRES_URL`, direct/unpooled DB aliases, and `KV_URL`. `APP_URL` can be derived from Vercel host variables. Blob is the default when no S3 credentials are set. Preview deployments require isolated resources before enabling `ALLOW_PREVIEW_MIGRATIONS=true`; see `docs/self-hosting/vercel.mdx`.
- `.github/workflows/e2e.yml` gates core unit/browser flows; `vercel.yml` builds and checks the serverless artifact on PRs and pushes to `main`. `autofix.yml` runs write-capable `pnpm knip --fix` and `pnpm check`. GitHub runners are the default; `USE_BLACKSMITH=true` switches runners and paired actions.
- `docker-build.yml` publishes native AMD64/ARM64 images. `main` publishes nightly aliases; release tags/explicit release dispatch publish stable aliases and can trigger configured production integrations. See `docs/agents/container-publishing.md` before release work.
- Deployment smoke tests create/delete accounts and files; run only against a dedicated test installation. Details: `docs/contributing/deployment-checks.mdx`.

## Security and pull requests

- Keep credentials and personal resume data out of source, logs, test artifacts, issues, and PRs. Do not commit local environment files or substitute production secrets for test values.
- Authenticated procedures use `protectedProcedure`; enforce resource ownership in feature logic. Reuse shared auth resolution for API keys, bearer tokens, and cookies rather than adding a separate auth path.
- Keep unsafe OAuth redirect/AI URL flags disabled on public deployments. They relax redirect validation and SSRF protections for trusted self-hosted/test use.
- Keep PRs focused. Describe the problem, resulting behavior, and checks actually run; link the relevant GitHub issue. Conventional Commits are enforced for commit messages; no separate PR-title convention is configured.
- Before submitting, run applicable typechecks/tests and non-mutating lint checks; run the production build for runtime/bundling changes. Match CI's database/browser prerequisites when reproducing its checks. Report skipped checks and failures instead of claiming they passed.
- Never add AI attribution, co-author trailers naming AI tools, or session/chat links to commits or PR descriptions.

## Gotchas

- Email sending needs SMTP config; without it emails are logged to console. Dev still works — verification links appear in server logs.
- Database connection errors: check `docker compose -f compose.dev.yml ps` and use `localhost` for host-run code, service names inside containers.
- S3 errors: check `docker compose -f compose.dev.yml logs seaweedfs seaweedfs_create_bucket`; verify endpoint and bucket, or select local storage.
- Route-tree errors after adding routes: run Vite dev/build to regenerate `apps/web/src/routeTree.gen.ts`; never edit it by hand.
- Serverless module-loading failures: inspect `bundledInteropPackages` in `apps/server/tsdown.config.ts` and the Vercel compatibility workflow. External CommonJS server dependencies break on Vercel because its service builder drops their pnpm links; bundle them with their dependencies.
- Most test scripts use `--passWithNoTests`; a successful run with zero tests does not verify the behavior you changed.
