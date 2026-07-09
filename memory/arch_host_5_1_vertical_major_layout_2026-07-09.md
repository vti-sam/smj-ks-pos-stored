---
title: ARCH-HOST 5.1 vertical-major lane layout
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session 2026-07-09 ARCH-HOST-01 5.1 vertical layout update
  - skills/business-flow-excel/resources/sample_arch_host_5_1.semantic.json
  - skills/business-flow-excel/SKILL.md
tags:
  - ARCH-HOST
  - basic-design
  - diagram
  - Excel
  - OfficeScript
scope: historical
captured_at: 2026-07-09
validity: historical_context
promote_to_knowledge: false
---

# Note

For ARCH-HOST-style 5.1 diagrams, keep the four large areas left-to-right:

- タブレットPOSアプリ
- デバイス制御層（DeviceCtrl）
- デバイスコネクタ（Host）
- 周辺機器

Inside each large area, stack components vertically by default. Use same-row layout only for deliberate same-level branches or local split logic. The `周辺機器` area should also stack the three physical device blocks vertically.

The `business-flow-excel` skill now treats semantic JSON `order` as the vertical sequence inside a lane. Avoid `x` / `y` overrides for normal lane components because they can unintentionally return the diagram to a horizontal component layout.
