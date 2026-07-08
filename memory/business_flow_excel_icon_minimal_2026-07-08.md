---
title: Business Flow Excel minimal icon usage for basic design review
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
  - icon-usage
  - arch-host
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

For customer-facing basic design Excel flows, icons should be used sparingly. Do not generate icons by default for every block, architecture component, or lifecycle step.

Current ARCH-HOST overview generator behavior:

- `01_構成ブロック横型フロー`: text blocks and labeled connectors only.
- `02_全体構成アーキテクチャ`: process blocks and labeled connectors only.
- `03_ライフサイクル横型`: horizontal step text and labeled connectors only.

Final verification for `ARCH-HOST-01_構成ブロック横型フロー.xlsx` after this change:

- Generated YAML `icon_nodes: 0`.
- Workbook XML media files: `0`.
- XML parse OK, ZIP test OK, duplicate drawing ids `0`, reversed anchors `0`.
