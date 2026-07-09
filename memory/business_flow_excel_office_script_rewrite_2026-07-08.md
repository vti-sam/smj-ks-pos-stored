---
title: Business Flow Excel skill rewritten to JSON Office Script
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session 2026-07-08 business-flow-excel rewrite
  - skills/business-flow-excel/
tags:
  - business-flow-excel
  - office-script
  - excel-js
  - diagram
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

`skills/business-flow-excel/` was simplified from the old workbook renderer to a JSON -> Office Script generator.

Current direction:

- Use `skills/business-flow-excel/scripts/generate_office_script.py`.
- Input is JSON only; sample is `skills/business-flow-excel/resources/sample_arch_host_5_1.json`.
- Output is an Office Script `.ts` to paste/run in Excel Automate.
- All diagram components are native Excel text block shapes.
- Connector endpoints use Office Script line attachment (`connectBeginShape` / `connectEndShape`) with site mapping `top=0`, `left=1`, `bottom=2`, `right=3`.
- Connector labels are white borderless text boxes placed on top of the line, then grouped with the connector when the Excel host allows it.
- Old YAML, xlsxwriter, dynamic Markdown overview generator, and DrawingML post-processing files were removed from the skill.
