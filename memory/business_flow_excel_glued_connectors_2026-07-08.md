---
title: Business Flow Excel connectors must be glued to drawing objects
project: smj-ks-pos
type: gotcha
status: archived
source:
  - skills/business-flow-excel/scripts/render_business_flow.py
  - skills/business-flow-excel/SKILL.md
  - skills/business-flow-excel/references/schema.md
  - skills/business-flow-excel/references/layout-rules.md
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/draft/ARCH-HOST-01_5.1_全体構成図.xlsx
tags:
  - business-flow-excel
  - excel
  - connector
  - drawingml
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

For editable Excel diagrams, rendering one native connector shape is not enough. The connector must be glued to the source and target drawing objects so moving a block in Excel keeps the line attached.

The `business-flow-excel` renderer now maps node boxes to their generated DrawingML object ids and emits connection refs inside each connector:

```xml
<xdr:cNvCxnSpPr>
  <a:stCxn id="..." idx="..."/>
  <a:endCxn id="..." idx="..."/>
</xdr:cNvCxnSpPr>
```

The `--check` validation now fails when a workbook has logical edges but the drawing XML has fewer `a:stCxn` or `a:endCxn` refs than edge count.

For ARCH-HOST-01 `5.1 全体構成図`, the regenerated workbook verified:

- `connector_shapes`: 21
- `bentConnector2_count`: 21
- `stCxn_count`: 21
- `endCxn_count`: 21
- connector color: `1F4E79`
- connector width: `2.25pt`
