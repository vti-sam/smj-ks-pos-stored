---
title: Business Flow Excel no inline reference text in blocks
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session 2026-07-08
  - skills/business-flow-excel/SKILL.md
  - skills/business-flow-excel/references/layout-rules.md
  - skills/business-flow-excel/scripts/generate_basic_design_overview.py
tags:
  - business-flow-excel
  - basic-design
  - arch-host
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

For customer-facing basic-design flow sheets, do not repeat inline reference phrases such as `参照：全体構成` or `参照：ライフサイクル` inside generated blocks.

Current rule:

- Put sequence numbers directly inside the main block title.
- Use connector labels to explain relationships.
- If cross-sheet guidance is needed, put it in `備考` only.
- Do not create separate sheet-list nodes or repeated `対応シート` boxes under each block.

Verification for `ARCH-HOST-01_構成ブロック横型フロー.xlsx`:

- Generated YAML contains no `参照：`.
- Generated workbook XML contains no `参照：`.
- Icon nodes remain controlled at `4`, not zero.
- Lifecycle nodes are `process` blocks, not lightweight `step` nodes.
- Edge types are `straight` only.
- Workbook ZIP and DrawingML checks passed with no reversed anchors or duplicate shape ids.
