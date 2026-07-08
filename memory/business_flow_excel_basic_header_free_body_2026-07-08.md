---
title: Business Flow Excel Basic Design header with free-width body
project: smj-ks-pos
type: gotcha
status: archived
source:
  - skills/business-flow-excel/scripts/render_business_flow.py
  - skills/business-flow-excel/references/schema.md
  - skills/business-flow-excel/references/layout-rules.md
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/draft/ARCH-HOST-01_5.1_全体構成図.flow.yaml
tags:
  - business-flow-excel
  - basic-design
  - diagram
  - arch-host-01
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

For Basic Design review diagrams such as `5.1 全体構成図`, do not use `layout: basic_design` unless the user explicitly wants the entire sheet body locked to A:X.

Use:

```yaml
header: basic_design
fit_to_content: true
print_fit: one_page
```

This keeps the SMJ/Basic Design-style header while allowing the diagram body to expand horizontally and vertically so blocks can be spaced cleanly. `fit_to_content: true` crops the PDF print area around actual diagram content instead of leaving the default wide flow canvas.

The ARCH-HOST-01 `5.1` flow was updated with four adjacent high-level blocks and wider internal placement. The rendered workbook should still use native Excel bent connectors (`bentConnector2`), dark ocean-blue connector color `1F4E79`, and connector width `2.25pt`.
