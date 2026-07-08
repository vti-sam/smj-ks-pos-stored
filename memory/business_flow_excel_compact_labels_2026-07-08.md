---
title: Business Flow Excel compact sheet list and transparent line labels
project: smj-ks-pos
type: runbook
status: archived
source:
  - Codex session 2026-07-08
  - skills/business-flow-excel/scripts/render_business_flow.py
  - skills/business-flow-excel/scripts/generate_basic_design_overview.py
  - skills/business-flow-excel/references/layout-rules.md
tags:
  - business-flow-excel
  - excel
  - flow-label
  - basic-design
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

Updated `skills/business-flow-excel` after visual review:

- Connector labels are rendered with transparent fill and no border, then positioned on or just above the connector line so the line is not covered by a white text box.
- Generated basic-design overview maps no longer create repeated boxes titled `対応シート`.
- Sheet lists under each block are rendered as compact, borderless text such as `① 概要`, `② 全体構成`, without source prefixes such as `02_`.
- Architecture and lifecycle reference labels also hide sheet number prefixes in visible text.

Final verification on `ARCH-HOST-01_構成ブロック横型フロー.xlsx`:

- Visible generated text did not contain `対応シート`.
- Visible generated text did not contain sheet-number prefixes such as `02_概要`.
- Workbook XML contained `a:noFill` tags for transparent label/text boxes.
- Workbook render check passed.
