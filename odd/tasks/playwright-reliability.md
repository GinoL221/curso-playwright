# Playwright reliability improvements
Objective: address the reviewed findings while keeping employee creation disabled until an isolated environment is available.
Branch: main (existing user changes preserved); delivery: ask-on-risk; runners: Node.js, Playwright, TypeScript and Docker where available.

## Specs

- S1: "deshabilitar explícitamente el alta hasta tener ese entorno"; "El alta quedará omitida explícitamente hasta contar con un entorno aislado."
- S2: "corregir el resto de los hallazgos" — the accepted review identified weak assertions and lost diagnostic context, fixture typing, the Docker setup/test workflow, Allure CLI prerequisites and README drift.
- S3: "bueno, lo hacemos asi entonces" — approval of the recommendation to avoid employee creation until an isolated environment is available. The earlier wording about not executing Docker was the assistant's statement, not a user prohibition; container execution and network creation are recorded below.

## Tasks

- T1 [S1] inline; done; commit: not authorized; Playwright list RED passed status, GREEN skipped status.
- T2 [S2,S3] inline; done; commit: not authorized; 12 offline tests and all 27 enabled Docker browser tests passed.
- T3 [S2,S3] inline; done; commit: not authorized; targeted TypeScript check RED with TS2322, GREEN after fixture type correction.
- T4 [S2,S3] inline; done; commit: not authorized; docker:test passed in isolated copy; README duplicate fixed and checked.
- T5 [S1-S3] inline; done; commit: not authorized; native review review-6d54c005c7bcf893 approved and acknowledged after correction; Docker argument forwarding verified.

## Log

- L1: "bueno, lo hacemos asi entonces"
- User continuation: "verificalo" — proceeding with the previously recommended Docker route, without installing host libraries.
- T1: Playwright JSON discovery showed expectedStatus `passed` before and `skipped` after the edit; no browser or employee creation ran.
- T2: Six original-error preservation tests failed before changes and passed after; 10 offline tests pass, including the actual search spec with a non-filtering fake. Live browser coverage is pending.
- T3: Targeted TypeScript check failed on three fixture TS2322 errors before the edit and passed after it with --resolveJsonModule.
- T4: The initial container check failed because /app/node_modules was not writable; Compose created the curso-playwright_default network. A writable tmpfs then failed with noexec (exit 126); enabling exec allowed npm ci --ignore-scripts and Playwright --version 1.60.0 in the same container. Docker npm-script tests passed and compose config validated; no Docker E2E was run. The Allure CLI prerequisite and README were updated.
- T5: Browser suite against the explicitly selected public demo: 18 passed (Chromium and Firefox), 3 skipped (employee creation), 9 failed because WebKit host libraries were missing. Suite output is in .playwright-verification-run.
- T5: Independent verifier confirmed the skip, 12 offline tests, targeted typecheck and Docker config; flagged duplicated login.spec.js in README and clarified S3's Docker wording was the assistant's statement, not a user instruction.
- T5: `npm run docker:test` in an isolated copy exited 0: 27 passed across Chromium, Firefox and WebKit; 3 employee-creation cases skipped. Host WebKit libraries remain uninstalled.
- T4: Removed duplicate README login.spec.js entry; structural check confirmed exactly one entry and git diff --check passed.
- T5: Native assessment returned unassessable because untracked files require explicit declaration; independent verification was already completed. User requested native review; review-6d54c005c7bcf893 captured risk, resilience and readability. Reliability capture failed with provider overload; fresh STATUS reoffered that slot and the review remains open.
- T5: Native review confirmed docker:test discarded arguments; a regression test failed before and passed after forwarding "$@". All 13 offline tests passed. Targeted native validation approved the correction and the approval was acknowledged and consumed. A real isolated Docker `npm run docker:test -- --project=chromium --list` exited 0 and listed 10 Chromium tests only; it did not execute them.
- Context: user approved the prior recommendation to disable employee creation until an isolated environment exists and address the other review findings. Existing README.md and AGENTS.md changes predate this work; preserve them. No commit explicitly requested.
