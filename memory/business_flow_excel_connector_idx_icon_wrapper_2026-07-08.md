---
title: Business Flow Excel connector site index and icon wrapper fix
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

Excel connector glue requires correct connection site indexes, not just `a:stCxn` / `a:endCxn`.

Use this mapping for rectangle-like shapes:

```text
top = 0
left = 1
bottom = 2
right = 3
```

Do not attach connector refs directly to `xdr:pic` image objects. For icon nodes, render an invisible `xdr:sp` textbox wrapper behind the PNG icon and attach connectors to that wrapper. The visible PNG remains only visual decoration.

For ARCH-HOST-01 `5.1 全体構成図`, regenerated XML verified:

- connectors: 21
- `a:stCxn`: 21
- `a:endCxn`: 21
- connected picture ids: none
- example horizontal connector: `stCxn idx="3"` to `endCxn idx="1"`
