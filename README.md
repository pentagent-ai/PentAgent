# PentAgent

PentAgent is an AI-native desktop workbench for web app security. It learns your target from real traffic, explains it, plans tests, and runs them only when you approve. It runs locally and works with your own model.

**Early version.** PentAgent is in an invite-only pilot. Expect rough edges, and only test systems you own or have explicit permission to test.

Website and docs: https://pentagent-ai.github.io/PentAgent/

Join the pilot: https://pentagent-ai.github.io/PentAgent/pilot/

---

This repository holds the public website. It is a static Next.js site, built and deployed to GitHub Pages by `.github/workflows/pages.yml`.

```bash
npm ci
npm run build   # static export in ./out, served under /PentAgent/
```
