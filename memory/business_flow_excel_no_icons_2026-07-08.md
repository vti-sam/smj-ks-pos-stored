---
title: Business Flow Excel text-block-only diagrams
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session 2026-07-08
  - skills/business-flow-excel/
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_5.1_全体構成図.xlsx
tags:
  - business-flow-excel
  - basic-design
  - excel
  - diagram
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

`skills/business-flow-excel` was updated to remove all icon/catalog support. Diagram components should be rendered as compact text block shapes only, including Basic Design architecture diagrams.

Important details:

- The renderer no longer depends on Pillow and no longer creates embedded image components.
- The YAML schema no longer supports `kind: icon` or catalog sheets.
- Connector labels remain transparent textboxes near the connector. They can be selected with a connector in Excel for manual grouping, but Excel does not automatically recenter the label when only the connector endpoint or route is edited.
- `ARCH-HOST-01_5.1_全体構成図.xlsx` was cleaned to remove embedded pictures; verification showed `media_count=0`, `picture_count=0`, and connector glue remained `stCxn=25`, `endCxn=25`.
- Skill quality evaluation for `business-flow-excel` scored `88.2` with `0` failed evidence after the change.
