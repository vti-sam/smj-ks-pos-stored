---
title: Business Flow Excel block numbering and Excel repair fix
project: smj-ks-pos
type: gotcha
status: archived
source:
  - Codex session 2026-07-08
  - skills/business-flow-excel/scripts/generate_basic_design_overview.py
  - skills/business-flow-excel/scripts/render_business_flow.py
tags:
  - business-flow-excel
  - excel-repair
  - block-numbering
  - arch-host
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

For ARCH-HOST style overview flows, do not render sheet-name order as a separate list under each block. The intended numbering is inside the main block title itself, for example `① タブレットPOSアプリ`, `② デバイス制御層（DeviceCtrl）`, `③ デバイスコネクタ（Host）`, `④ 周辺機器`.

Avoid generating separate nodes such as `whole_doc_sheets`, `app_sheets`, `ctrl_sheets`, `host_sheets`, or `device_sheets`.

Excel repair warning was likely caused by DrawingML `twoCellAnchor` entries where `from` was after `to` for connectors going left or upward. Renderer should normalize connector anchors to top-left/bottom-right and use `flipH` / `flipV` for direction. Verify final workbooks with:

- XML parse: no malformed XML.
- Drawing anchors: `total_reversed: 0`.
- Drawing ids: `total_dups: 0`.
- ZIP test: no compressed data errors.
