---
title: Business Flow Excel basic design overview generator
project: smj-ks-pos
type: runbook
status: archived
source:
  - Codex session 2026-07-08
  - skills/business-flow-excel/scripts/generate_basic_design_overview.py
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/draft/ARCH-HOST-01_設計書全体マップ.xlsx
tags:
  - business-flow-excel
  - basic-design
  - excel
  - architecture-map
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

`skills/business-flow-excel` now has a dynamic generator for basic design Markdown documents.

Use:

```bash
rtk uv run --with pyyaml python skills/business-flow-excel/scripts/generate_basic_design_overview.py <basic-design.md> <overview-flow.yaml>
rtk uv run --with xlsxwriter --with pyyaml --with pillow python skills/business-flow-excel/scripts/render_business_flow.py --check <overview-flow.yaml> <overview.xlsx>
```

The generator reads `00_表紙`, `22_Excelシート構成`, `## NN_...` headings, and the first Mermaid flowchart under `全体構成`. For ARCH-HOST-01 it produced a workbook with `01_設計書全体マップ` and `02_全体構成アーキテクチャ`.
