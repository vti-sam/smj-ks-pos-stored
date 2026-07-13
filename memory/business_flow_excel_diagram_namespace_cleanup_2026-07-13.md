---
title: Business Flow Excel diagram namespace cleanup
project: smj-ks-pos
type: gotcha
status: archived
source:
  - skills/doc-authoring/business-flow-excel/scripts/generate_office_script.py
  - skills/doc-authoring/business-flow-excel/scripts/validate_office_script.py
tags:
  - business-flow-excel
  - Office Scripts
  - shape cleanup
  - diagram namespace
scope: historical
captured_at: 2026-07-13
validity: historical_context
promote_to_knowledge: false
---

Generated layout scripts previously deleted every worksheet shape whose name started with generic `shape_`, `edge_`, or `section_bg_`. Label scripts similarly deleted all generic `edge_label_` and `shape_comment_` overlays. Running two diagram pairs on one worksheet therefore caused the second diagram to delete the first.

The generator now derives a stable namespace from the numbered diagram title. ARCH-HOST-01 uses `d511`, `d512`, and `d61`. Generated shape, edge, section, label, and comment names include that namespace, and cleanup/scanning use only the current diagram's exact prefixes. The validator rejects the old generic cleanup expressions.

The six final ARCH-HOST-01 artifacts retain their active-cell delivery adaptation after regeneration. Pipeline and golden outputs remain explicitly parameterized by worksheet and anchor.

The first namespace migration exposed a collision issue when legacy generic shapes remained in the same anchor region. Layout and label scripts now remove only non-namespaced legacy generated objects whose centers lie inside the current diagram canvas/review bounds. The common handler also provides deterministic review-grid overflow placement after adjacent candidates are exhausted, preventing legacy collisions or dense layouts from silently reducing overlay coverage.
