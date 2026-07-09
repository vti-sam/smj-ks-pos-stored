---
title: Basic Design D2-first Excel diagram skill
project: smj-ks-pos
type: decision
status: stale
source:
  - Codex session 2026-07-09
  - skills/basic-design-d2-excel-diagram/SKILL.md
  - skills/business-flow-excel/SKILL.md
  - skills/business-flow-excel/resources/sample_arch_host_5_1.d2
  - skills/business-flow-excel/scripts/d2_svg_to_layout.py
tags:
  - basic-design
  - d2
  - excel
  - office-script
  - diagram
scope: historical
captured_at: 2026-07-09
validity: historical_context
promote_to_knowledge: false
---

Stale note:

- This memory is superseded by `project-store/memory/basic_design_d2_diagram_skill_2026-07-09.md`.
- The D2 skill was later renamed to `skills/basic-design-d2-diagram/` and made D2-only.
- Do not use this memory as current guidance for the D2 skill.

Current Basic Design 5.1 diagram direction:

- D2 is the primary layout and review source.
- Excel is generated later from the reviewed D2/SVG through Office Script, using native editable Excel shapes.
- JSON is only the generated intermediate between D2/SVG and Office Script; do not maintain hand-authored coordinate JSON as a parallel layout source.
- The old YAML/xlsxwriter/icon/DrawingML renderer path was removed from `skills/business-flow-excel/`.
- A separate `skills/basic-design-d2-excel-diagram/` skill now defines the D2-first workflow: draft D2, render SVG/PNG, visually inspect, iterate, then convert to Excel.
- For ARCH-HOST-style 5.1 diagrams, use four major lanes left-to-right: `タブレットPOSアプリ`, `デバイス制御層（DeviceCtrl）`, `デバイスコネクタ（Host）`, `周辺機器`.
- Components inside each lane should be vertical-major. Use D2 `grid-rows` plus invisible lane-to-lane edges to keep the large lanes horizontal while stacking components vertically.
- Do not use icons or images. Device names, config files, log blocks, and error blocks are normal text blocks.
- D2 may show inline edge labels for review readability.
- Excel output must not render visible line-label text boxes or grouped label shapes. Connector labels are stored only in connector alt text title/description.
- Excel line routes do not need to match D2 exactly. The priority is editable blocks/components matching the D2 layout and attached connector endpoints; reviewers can adjust connector routes manually in Excel.
- Do not patch `.xlsx` ZIP/XML/DrawingML. The valid output path is D2/SVG -> positioned JSON -> Office Script -> run in Excel.

Verification from this update:

- `rtk d2 validate skills/business-flow-excel/resources/sample_arch_host_5_1.d2`
- `rtk python skills/business-flow-excel/scripts/d2_svg_to_layout.py skills/business-flow-excel/resources/sample_arch_host_5_1.d2 scratch/business-flow-excel-d2-check/arch_host_5_1.json --template-json skills/business-flow-excel/resources/sample_arch_host_5_1.template.json --svg-out scratch/business-flow-excel-d2-check/arch_host_5_1.svg`
- `rtk python skills/business-flow-excel/scripts/generate_office_script.py --check scratch/business-flow-excel-d2-check/arch_host_5_1.json scratch/business-flow-excel-d2-check/arch_host_5_1.ts`
- `rtk uv run --with pyyaml python /Users/vti-sam/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/business-flow-excel`
- `rtk uv run --with pyyaml python /Users/vti-sam/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/basic-design-d2-excel-diagram`
- `rtk python skills/skill-quality-eval/scripts/evaluate_skills.py`

Skill-quality score after the update:

- `business-flow-excel`: 85.1, failed evidence 0.
- `basic-design-d2-excel-diagram`: 82.0, failed evidence 0.
