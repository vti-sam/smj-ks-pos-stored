---
title: Basic Design D2 draft placement and simple layout rule
project: smj-ks-pos
type: lesson
status: archived
source:
  - Codex session 2026-07-09 ARCH-HOST-01 5.1 D2 review
  - skills/doc-authoring/basic-design-d2-diagram/SKILL.md
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/draft/ARCH-HOST-01_5.1_全体構成図.d2
tags:
  - basic-design
  - d2
  - diagram
  - hierarchy
  - draft
scope: historical
captured_at: 2026-07-09
validity: historical_context
promote_to_knowledge: false
---

# Note

For Basic Design D2 diagrams, unapproved D2/SVG review artifacts should be placed under the document bundle's `draft/` folder unless the user asks for final placement.

Current layout rule after user review:

- Level 1 responsibility blocks normally flow left-to-right for architecture/sequence-like overviews.
- Do not add nested sub-containers by default; they can make the diagram harder to read.
- Components inside each responsibility block can use vertical, horizontal, or D2 default layout depending on the rendered preview.

Decision diamonds should only be used when the source design has multiple meaningful branches. If a node has one path, use a normal rectangle. When edge labels become hard to read, move branch meaning into short target nodes instead of keeping long connector labels.

Architecture diagrams should not be treated as one-way control flow by default. If a relationship includes request/response, command/result, control/status, or device-control/result, use a bidirectional edge or explicit opposite arrows. Keep async events/notifications as separate dashed return paths when they use a different channel or timing.

Do not draw an edge that bypasses an owner or middle layer. Route communication through the layer that owns the integration.

For ARCH-HOST-style diagrams, read the related `PS-HOST-*` program specifications before redrawing 5.1 so Host communication, router, handler, device manager, ReplyDevice, error, and log directions are not copied mechanically from older Mermaid diagrams.
