# Engineering Standards — curso-playwright

Source of truth for AI agents working in this repo (OpenCode, Claude Code, Codex). Migrated from the Obsidian vault's agent decisions on 2026-07-20.

## Code quality
- Max 250 lines per source file — when exceeded, split by extracting Page Objects, fixtures, or utility modules.
- Page Objects hold actions and locators only; assertions (`expect`) belong in tests.

## Secrets
- Never hardcode credentials in source or test data committed to git; test credentials come from environment variables or gitignored data files.
- `.env` holds real values, lives in `.gitignore`, and is never committed. `.env.example` holds the same variable names with placeholders and IS committed.
- If a secret ever lands in git history (even if deleted afterwards), rotate it immediately — history preserves the value.

## Git
- Conventional commits (`feat:`, `fix:`, `chore:`, ...). No AI attribution in commit messages.
- Never push, pull, delete remote branches, or run any remote-mutating git operation without asking the user first.
