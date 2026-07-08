---
title: Business Flow Excel ARCH-HOST labeled overview update
project: smj-ks-pos
type: runbook
status: archived
source:
  - Codex session 2026-07-08
  - skills/business-flow-excel/scripts/generate_basic_design_overview.py
  - skills/business-flow-excel/scripts/render_business_flow.py
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
tags:
  - business-flow-excel
  - arch-host
  - basic-design
  - excel
  - architecture-map
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

Updated `skills/business-flow-excel` for ARCH-HOST overview rendering:

- Mermaid edges with labels such as `A -->|Host経由要求| B` are now parsed dynamically and used as Excel connector labels.
- Architecture overview sheets combine local icons, process blocks, connector labels, and optional waypoints.
- Lifecycle overview sheets use horizontal `step` nodes with icons, not heavy process boxes.
- ARCH-HOST `5.3 全体像` now has meaningful line labels in the source Markdown.
- Generated output verified at `project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/draft/ARCH-HOST-01_構成ブロック横型フロー.xlsx`.

Verification from the final run:

- Generated sheets: `01_構成ブロック横型フロー`, `02_全体構成アーキテクチャ`, `03_ライフサイクル横型`.
- Sheet mapping coverage: 25/25 sheets from `22_Excelシート構成`, no missing sheets.
- YAML content: 21 connector labels, 3 waypoint edges, 19 icon nodes, 7 lifecycle step nodes.
- Workbook XML: 3 drawing XML files, 13 embedded icon media files, 77 connector/guide shapes, 18 dashed guide lines.
