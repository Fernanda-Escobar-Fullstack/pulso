# Kilo Code review instructions

## Verifiable project context

Pulso is moving from planning into implementation. The complete target architecture and business requirements live in the [project Wiki](https://github.com/Fernanda-Escobar-Fullstack/pulso/wiki). Treat only code that exists and can be verified in the reviewed branch as implemented.

Pulso is a web application for small food businesses. The planned system is a TypeScript monorepository with React and Vite, a layered NestJS backend, REST, PostgreSQL and TypeORM, JWT and Google OAuth, Gemini accessed only through the backend, and the Web Speech API in the browser.

## Required reviewer behavior

- Write every review in English.
- Review the diff in context and report only problems introduced or worsened by the change.
- Prioritize security, tenant isolation, financial and inventory integrity, authorization, transactions, and functional regressions.
- Verify every finding against the code, tests, configuration, and Wiki. Ask a question or omit the finding when evidence is missing.
- Never claim that lint, tests, builds, migrations, or deployments pass without verifiable execution results.
- Do not require technologies, versions, or abstractions that the project has not adopted.
- Do not report cosmetic preferences as defects or request refactors without a concrete risk.
- Group duplicates by root cause and avoid hypothetical findings without a demonstrable failure path.

## Priority 1: security and tenant isolation

### Authentication and authorization

- Every protected route must authenticate and authorize in the backend. Hiding controls in React is not authorization.
- `Administrator` and `Employee` are different roles. Pay special attention to employee management, reference costs, salaries, expenses, profits, and financial results.
- Verify active-user state and JWT validity and expiration when those mechanisms exist.
- Google OAuth proves identity only. Pulso must still resolve the user, business, role, and status. Never trust `role` or `businessId` from the client or from unverified claims.
- AI- and voice-initiated operations must use the same controls as form-initiated operations.

### Business isolation

- Every operational record belongs to a business. Derive the authorized `businessId` from the authenticated identity, never from client-controlled parameters, bodies, queries, or headers.
- Scope every read and mutation by both resource ID and business. Include relationships, aggregates, counts, searches, exports, alerts, and error responses.
- Detect IDOR risks. Prefer queries constrained by `id` and `businessId` instead of loading by ID and checking ownership afterward.
- When creating relationships, verify that every related entity belongs to the same business.
- Important authorization tests must use at least two businesses and cover cross-business reads and writes.

### Input, secrets, and exposure

- Server DTOs and validation must check types, UUIDs, enums, dates, units, quantities, and money, reject unexpected fields, and never rely on frontend validation.
- Report SQL built with untrusted input, unparameterized queries, or unsafe dynamic operators.
- Passwords must use bcrypt. Passwords, hashes, JWTs, Google tokens, authorization headers, `DATABASE_URL`, `JWT_SECRET`, `GOOGLE_CLIENT_SECRET`, and `GEMINI_API_KEY` must never appear in code, bundles, responses, or logs.
- Every `VITE_*` variable is public. Report any secret exposed through that prefix or bundled into the frontend.
- CORS is not a replacement for authentication or authorization.
- Review abuse protection for login and expensive AI endpoints when those features enter scope.

### Gemini and AI

- Send Gemini only the minimum context the authorized user may access. Report cross-business context, unauthorized salary or financial data, unnecessary complete objects, and credentials.
- AI must not execute SQL, access PostgreSQL directly, calculate official financial values, or persist changes.
- AI or voice proposals require preview and explicit confirmation. Confirmation must repeat authentication, authorization, ownership, validation, and business rules.
- User instructions and model output must not alter permissions, tool selection, or business rules.
- Provider failures must not block purchases, sales, inventory, or other core operations.

## Priority 2: business rules and data integrity

Check changes against business rules `BR-001` through `BR-030` in the Wiki. In particular:

- quantities must be greater than zero and prices must be zero or greater;
- only `kg ↔ g` and `L ↔ ml` conversions are valid;
- operational dates cannot be in the future;
- recipe state follows `Draft → Active → Archived`, and an active recipe requires valid ingredients;
- prepared products require an active recipe, while resale products do not;
- archived records cannot be used in new operations and historical records are not deleted;
- recipe cost is the sum of converted ingredient costs, and unit cost is total cost divided by produced units;
- unit profit is sale price minus unit cost, and margin is `(price - cost) / price * 100`; handle a zero price explicitly;
- only an Administrator accepts a new reference cost, and an exceptional purchase does not change it;
- a sale requires an open shift and a user may have at most one open shift;
- sales store price and cost snapshots and never recalculate history;
- confirmed waste reduces stock and cannot exceed recorded stock;
- physical counts preserve the difference without inventing its cause;
- alerts follow `Pending → Reviewed → Resolved` and remain traceable.

Review monetary and quantity precision according to the implemented types. Report floating-point use only when there is a concrete path to inconsistent financial results.

The Wiki allows a sale when recorded stock is zero (`BR-009`) but also proposes preventing negative stock in the database. Do not assume either behavior is correct. Require a documented and tested policy when a change depends on this contradiction.

## Priority 3: atomicity, async behavior, and concurrency

- Multi-record purchases, production, sales, reconciliations, and corrections must run in a transaction and roll back every effect on failure.
- Detect read-then-write races around open shifts, stock, accepted costs, state transitions, and reconciliations. Use transactions, constraints, or locks when appropriate.
- Report unawaited promises, lost asynchronous errors, work started after the response, and callbacks that escape a transaction.
- Retry mutations only when they are idempotent or protected against duplicates.
- Do not keep database transactions open during Gemini or other slow external calls.

## Priority 4: architecture and boundaries

Use the Wiki as the target architecture while giving precedence to current executable evidence.

- Presentation validates and translates HTTP; application coordinates use cases; domain owns deterministic rules; infrastructure adapts PostgreSQL and external services.
- Domain code must not import NestJS, TypeORM, HTTP, Gemini, or infrastructure configuration.
- Controllers must not contain calculations, complex transactions, or direct repository access.
- Infrastructure must not decide authorization or duplicate business rules.
- Modules must collaborate through explicit use cases or interfaces rather than reading each other's internal tables.
- Frontend business UI logic belongs to features; shared components must remain domain-neutral.
- Microservices, queues, WebSockets, uploads, OCR, payments, multiple branches, and offline support are outside the MVP unless explicitly approved.

## Priority 5: errors and observability

- Expected failures should use stable codes such as `INSUFFICIENT_STOCK`, `SHIFT_REQUIRED`, `SHIFT_ALREADY_OPEN`, `FORBIDDEN`, `RESOURCE_NOT_FOUND`, `INVALID_UNIT_CONVERSION`, or `VALIDATION_ERROR` when applicable.
- Centralize mapping from domain errors to HTTP responses.
- Use `400`, `401`, `403`, `404`, and `409` correctly without revealing resources owned by another business.
- Unexpected errors return a generic response and never expose stacks, SQL, internal names, credentials, or provider details.
- Report empty catches, errors silently converted into success, discarded failures, and logs without useful context.
- Never log passwords, hashes, tokens, secrets, authorization headers, sensitive prompts, or unnecessary financial data.

## Priority 6: performance

Report only demonstrated risks in changed paths: N+1 queries, repeated work, unfiltered full-table reads, unnecessary recalculation of historical costs, meaningfully slow sequential processing, and missing indexes for repeated filters or joins. Do not request caches, queues, or new infrastructure without measured need.

## Priority 7: tests

- Require tests for authentication, permissions, ownership, conversions, costs, margins, stock, shifts, historical snapshots, AI or voice confirmation, and transactions.
- A bug fix should include a regression test when practical.
- Cover zero, negatives, incompatible units, future dates, archived entities, foreign businesses, incorrect roles, duplicate shifts, mid-transaction failure, and external-provider failure.
- Database concurrency or constraint risks require integration coverage when unit tests cannot prove the behavior.
- Do not confuse successful mocks with real integration coverage or visual snapshots with business-rule tests.
- Reserve end-to-end tests for documented critical flows rather than every CRUD operation.

## Priority 8: relevant maintainability

- Report comments that narrate obvious code, are outdated, hide debt, or contain temporary instructions. Keep comments that explain non-obvious decisions or external requirements.
- Report decorative emojis in source code, logs, and technical messages, but allow legitimate interface icons, user content, accessibility symbols, and functional markers.
- Use `camelCase` for TypeScript and JSON, `PascalCase` for classes, components, and types, `UPPER_SNAKE_CASE` for constants, and `snake_case` for database columns.
- Leave formatting-only concerns to Prettier and ESLint.

## Required finding format

```text
[Severity: Critical|High|Medium|Low] Short title
File: path/to/file:line
Problem: demonstrably incorrect behavior.
Why: technical explanation tied to code or an identified rule.
Risk: concrete security, data, operational, or maintainability consequence.
Fix: specific and verifiable recommended change.
```

Use severity consistently: Critical for direct exploitation, broad data exposure, active secrets, or widespread corruption; High for authorization bypass, financial or inventory integrity, partial transactions, or probable critical failure; Medium for functional bugs, relevant edge cases, observability, or meaningful performance problems; Low for concrete and limited maintainability risks.

Include a diff line whenever GitHub permits it. If no real findings exist, say so clearly and mention only residual risks or checks that were not executed.

## Recommended automated verification

When scripts exist, require formatting, lint, type-checking, tests, builds, and migrations for both applications. Add secret scanning, dependency checks, and static analysis only through tools the project actually adopts. Protect `main` with relevant checks and human review.

Kilo Code Review provides findings; it does not replace tests, server validation, automated analysis, human review, or branch protection, and it must not claim to block a merge by itself.
