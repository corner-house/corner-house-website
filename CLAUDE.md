# Corner House — Project Conventions

## Deployment Workflow (MANDATORY)

All changes flow through staging before reaching production. No exceptions for routine work.

### Branches
- `main` → production at https://cornerhouse.co.in (protected, no direct pushes)
- `staging` → preview at https://staging.cornerhouse.co.in (Cloudflare Access-protected, always on)
- `feature/*`, `fix/*` → per-task branches with auto-generated preview URLs

### Flow
1. Create feature branch from `staging` (NOT main)
2. Push commits, get auto-generated preview URL for ad-hoc review
3. When feature is ready, open PR: feature → staging
4. Merge to staging → Cloudflare auto-deploys staging.cornerhouse.co.in
5. Saurabh reviews staging URL — eyeballs the actual rendered page
6. When staging review passes, open PR: staging → main
7. Merge to main → Cloudflare auto-deploys production
8. Run IndexNow ping if content changed substantively
9. Delete merged feature branch

### Property Listings — Extra Rules
Property listings have a stricter pre-deploy audit step (learned the hard way on krisumi-forest-reserve, see scripts/krisumi-forest-reserve-audit.md):
- Source of truth is the brochure PDF only — never web aggregators, never inference, never embellishment
- Tag uncertain facts inline as `[UNVERIFIED]` and OMIT from rendered output until client confirms
- Run a content audit before merging to staging — every claim cross-checked against the brochure
- Audit document committed to scripts/<property-slug>-audit.md as historical record

### Emergency Hotfix
If production is broken and staging route is too slow:
- Hotfix branch from main, merge directly to main with explicit Saurabh approval
- Immediately rebase staging onto main after the hotfix
- Document the bypass in commit message with reason
