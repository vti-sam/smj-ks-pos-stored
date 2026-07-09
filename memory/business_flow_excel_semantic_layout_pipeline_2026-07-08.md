---
title: Business Flow Excel semantic layout pipeline
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session 2026-07-08 semantic layout trial for ARCH-HOST 5.1
  - skills/business-flow-excel/scripts/layout_diagram.py
  - scratch/business-flow-excel-semantic-5-1/
tags:
  - business-flow-excel
  - semantic-json
  - layout-algorithm
  - office-script
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

Added a pre-layout step to `skills/business-flow-excel`:

`semantic JSON -> positioned JSON -> Office Script`.

The preprocessor is `skills/business-flow-excel/scripts/layout_diagram.py`. It applies lane-aware layered layout:

- lanes are placed left-to-right;
- lane width defines the high-level architecture block;
- node `order` controls vertical placement;
- nodes with the same `order` can share the same row;
- local overrides (`x`, `y`, `width`, `height`) remain available for deliberate asymmetric layouts;
- connector sides and label positions are inferred unless explicitly supplied.

The ARCH-HOST 5.1 semantic sample generated positioned JSON with 20 nodes, 25 edges, 5 dashed edges, and matched the previous positioned sample exactly for node positions/sizes and edge side/label metadata.
