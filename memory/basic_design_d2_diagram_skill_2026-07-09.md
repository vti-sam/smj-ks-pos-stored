---
title: Basic Design D2-only diagram skill
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session 2026-07-09
  - skills/basic-design-d2-diagram/SKILL.md
  - skills/skill-quality-eval/tests/pm-control-skill-tests.json
tags:
  - basic-design
  - d2
  - diagram
  - skill
scope: historical
captured_at: 2026-07-09
validity: historical_context
promote_to_knowledge: false
---

Current D2 skill direction:

- `skills/basic-design-d2-excel-diagram/` was renamed to `skills/basic-design-d2-diagram/`.
- The skill is D2-only. It creates and reviews D2 diagrams for Japanese basic-design documents.
- Its workflow is: read design text, draft D2, validate D2, render SVG/PNG, visually inspect the preview, iterate the D2 source, then deliver the D2 source and preview path.
- The skill must not own downstream rendering or implementation details from other tools.
- Keep layout rules focused on D2: large containers, left-to-right major blocks when appropriate, vertical-major components via `grid-rows`, meaningful Japanese labels, inline edge labels where useful, and no icons/images/base64 visual assets.
- `skills/skill-quality-eval/tests/pm-control-skill-tests.json` now references `basic-design-d2-diagram` and checks the D2-only visual-review contract.
