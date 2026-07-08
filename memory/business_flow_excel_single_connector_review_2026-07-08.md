---
title: Business Flow Excel should use one connector per review edge
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session 2026-07-08
  - skills/business-flow-excel/SKILL.md
  - skills/business-flow-excel/scripts/render_business_flow.py
tags:
  - business-flow-excel
  - connector
  - editable-review
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

For Excel flow diagrams intended for manual review/editing, one logical edge should render as one connector shape. Do not split an edge into multiple generated line shapes for automatic route beautification.

Reason:

- The reviewer edits connector routing manually in Excel.
- Multiple generated segments look like broken/double lines and are harder to adjust.
- The renderer should prioritize correct source-target connection over automatic visual routing.

Current behavior:

- `straight` outputs one Excel native straight connector.
- `elbow` outputs one Excel native bent connector (`bentConnector2`) with an adjustment handle.
- Connector lines use dark ocean-blue `1F4E79` and a slightly thicker width than the original draft.
- `waypoints` are not used to generate multiple line segments in the standard editable-review output.
- High-level adjacent blocks can use lane `fill` values to make title blocks visually distinct.
