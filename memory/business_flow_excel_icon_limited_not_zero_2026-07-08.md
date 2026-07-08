---
title: Business Flow Excel limited icons, not zero icons
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session 2026-07-08
  - skills/business-flow-excel/scripts/generate_basic_design_overview.py
  - skills/business-flow-excel/SKILL.md
  - skills/business-flow-excel/references/layout-rules.md
tags:
  - business-flow-excel
  - icon-usage
  - lifecycle
  - arch-host
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

Correction to the earlier minimal-icon change: "limit icons" means controlled usage, not removing all icons.

Current ARCH-HOST generated flow behavior:

- `01_構成ブロック横型フロー`: keeps 4 icons, one for each main block only.
- `02_全体構成アーキテクチャ`: no icon per component; uses process blocks and connector labels.
- `03_ライフサイクル横型`: lifecycle steps are visible process blocks, not bare text steps. No repeated icon per lifecycle step.

Verification target:

- Generated YAML should have `icon_nodes: 4`.
- Generated YAML should have `step_nodes: 0`.
- Lifecycle nodes should be `kind: process`.
- Workbook media files should be 4.
