---
title: Business Flow Excel connector labels are alt text only
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session 2026-07-08 connector label review
  - skills/business-flow-excel/SKILL.md
  - skills/business-flow-excel/scripts/generate_office_script.py
tags:
  - business-flow-excel
  - office-script
  - excel
  - connector
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

For `skills/business-flow-excel`, connector `label` values are metadata only and must be stored on the connector shape's alt text title/description. The skill must not render visible line labels, connector label text boxes, or groups that combine line and label.

`labelX`, `labelY`, `labelWidth`, and `labelHeight` are leftovers from the old visible-label renderer. The Office Script generator should reject them under `--check`, and the semantic pre-layout step strips them when producing positioned JSON.

Excel VBA has `Shape.RerouteConnections`, but Office Script `ExcelScript.Line` does not expose a matching reroute API. Keep using native elbow connectors attached with `connectBeginShape` / `connectEndShape`, plus pre-layout side selection.
