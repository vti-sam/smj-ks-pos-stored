---
title: Design Doc MD Skill Created
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session 2026-07-07
  - skills/design-doc-md/SKILL.md
  - skills/program-spec-excel/SKILL.md
  - skills/basic-design-excel/SKILL.md
tags:
  - design-doc-md
  - program-spec
  - basic-design
  - customer-quality-gate
scope: historical
captured_at: 2026-07-07
validity: historical_context
promote_to_knowledge: false
---

Created `skills/design-doc-md/` as the content-quality skill for design Markdown before Excel/Word rendering.

Decision:

- Delete `skills/program-spec-from-code/` and move its Program Spec reverse-engineering resources into `skills/design-doc-md/`.
- Keep renderer skills focused: `skills/program-spec-excel/` validates/renders Program Spec Excel; `skills/basic-design-excel/` validates/renders Basic Design Excel.
- Use `skills/design-doc-md/` for Program Spec Markdown, Basic Design Markdown, source-code reverse-engineering into Program Spec drafts, and KH/SMJ document quality gates.
- Add `scripts/design_md_lint.py` to catch common review blockers such as missing required sections, unresolved raw markers, and internal evidence leaking into customer-facing Markdown.
- Customer-facing final Markdown must not include internal `spec-evidence`, `CodeGraph`, `Evidence`, `status: draft`, generator notes, or unresolved raw tokens such as `要確認`, `詳細不明`, `検討!`, `TBD`, or `TODO`.
