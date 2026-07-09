---
title: Business Flow Excel must not deliver XML-patched workbooks
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session 2026-07-08 Excel 5.1 workbook open issue
  - skills/business-flow-excel/SKILL.md
tags:
  - business-flow-excel
  - office-script
  - excel
  - openxml
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

`skills/business-flow-excel` should treat generated Office Script `.ts` as the source-of-truth artifact. A valid workbook for review must be created by Excel running that Office Script.

Do not deliver `.xlsx` files created by direct ZIP/OpenXML/DrawingML patching, including edits to `xl/drawings/*.xml`, worksheet XML, relationship XML, or connector references. Do not use LibreOffice/Numbers resave as the primary artifact either. Such files can sometimes open locally but may trigger Excel repair prompts, lose connector attachments, or produce different connector routing than Excel's native Office Script output.
