---
title: Business Flow Excel short block text rule
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session 2026-07-08
  - skills/business-flow-excel/SKILL.md
  - skills/business-flow-excel/references/layout-rules.md
  - skills/business-flow-excel/scripts/generate_basic_design_overview.py
tags:
  - business-flow-excel
  - basic-design
  - block-text
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

For business-flow and basic-design overview sheets, block text must be short like sheet labels. Use titles and short noun phrases inside blocks, for example `画面・業務処理`, `制御方式判定`, `別プロセス制御`, and `実機制御`.

Do not place full explanatory sentences in block subtitles, such as `画面または業務処理から機器操作を要求し、Hostの起動確認や停止要求を行う。`. Put this detail in surrounding prose, remarks, or the source design document instead.

Implemented in `generate_basic_design_overview.py` by using `block_subtitle()` for main block process subtitles and by prioritizing the block name over long role text when deriving short labels.
