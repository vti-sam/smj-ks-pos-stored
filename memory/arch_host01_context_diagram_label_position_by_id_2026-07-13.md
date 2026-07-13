---
title: ARCH-HOST-01 context diagram label positioning by shape ID
project: smj-ks-pos
type: gotcha
status: archived
source:
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_5.1.1_システムコンテキスト図.show-labels.office-script.ts
tags:
  - ARCH-HOST-01
  - Office Scripts
  - diagram labels
  - shape ID
scope: historical
captured_at: 2026-07-13
validity: historical_context
promote_to_knowledge: false
---

The `5.1.1 システムコンテキスト図` review-label script previously used shape IDs only as generated shape names. Placement depended on the order returned by `Worksheet.getShapes()` and generic collision fallback positions, so labels could appear inconsistent.

The review-label script now sorts source edges and shapes by ID and uses an explicit ID-to-preferred-position mapping. Current mappings are:

- `edge_01_APP_to_HOST` -> top
- `edge_02_HOST_to_APP` -> bottom
- `edge_03_HOST_to_DEVICE` -> top
- `shape_DEVICE` -> bottom

Fallback positions remain available in a deterministic order when the preferred position is outside the review area or overlaps another shape. Shape comments also participate in collision checks against edge labels.
