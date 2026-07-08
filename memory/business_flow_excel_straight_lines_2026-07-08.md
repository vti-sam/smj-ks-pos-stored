---
title: Business Flow Excel prefers straight lines for horizontal flows
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session 2026-07-08
  - skills/business-flow-excel/scripts/generate_basic_design_overview.py
  - skills/business-flow-excel/references/layout-rules.md
tags:
  - business-flow-excel
  - connector
  - arch-host
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

For ARCH-HOST and similar horizontal basic-design flows, prefer straight connector lines. Do not generate elbow lines or waypoints unless the connector must avoid unrelated content.

Current generated ARCH-HOST overview verification:

- Generated YAML edge types: `straight` only.
- Generated YAML waypoint edges: `0`.
- Workbook XML parse OK.
- Workbook ZIP test OK.
- Drawing duplicate ids: `0`.
- Drawing reversed anchors: `0`.
