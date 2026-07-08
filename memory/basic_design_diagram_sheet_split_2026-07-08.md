---
title: Basic Design diagram sheet split
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session 2026-07-08
  - skills/design-doc-md/SKILL.md
  - skills/basic-design-excel/SKILL.md
  - skills/basic-design-excel/scripts/basic_design_render.py
tags:
  - basic-design
  - excel
  - diagram
  - skill
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

Basic Design Excel Markdown now separates diagram and explanation sheets.

Decision:

- For Excel-targeted Basic Design documents, use `NN_<章名>_01` for the diagram sheet and `NN_<章名>_02` for the detailed explanation sheet.
- Mermaid diagrams are allowed only in `_01` diagram sheets. The matching `_02` sheet must contain prose and `① ② ③` flow steps without Mermaid.
- Diagram Markdown should use Mermaid `subgraph` blocks for large responsibility areas that contain smaller nodes.
- Node and arrow labels should map tightly to the sheet inventory and row definitions, such as `要求（11_要求項目定義）` and `制御方式（05_全体構成_02）`.
- `skills/design-doc-md/scripts/design_md_lint.py` and `skills/basic-design-excel/scripts/basic_design_render.py` now guard this format.
- The Basic Design Excel renderer now skips Mermaid blocks and leaves `_01` diagram areas blank. Do not generate diagram images or Mermaid text in the workbook; paste approved diagram images manually after Excel export.
- The Basic Design Excel sample now follows the ARCH-HOST style with `タブレットPOSアプリ`, `デバイス制御層（DeviceCtrl）`, `デバイスコネクタ（Host）`, and `周辺機器` as the main blocks.

Verification:

- `rtk python -m py_compile skills/design-doc-md/scripts/design_md_lint.py skills/basic-design-excel/scripts/basic_design_render.py`
- `rtk python skills/design-doc-md/scripts/design_md_lint.py skills/basic-design-excel/resources/basic_design_sample.md --kind basic-design`
- `rtk uv run --with openpyxl python skills/basic-design-excel/scripts/basic_design_render.py skills/basic-design-excel/resources/basic_design_sample.md scratch/basic_design_host_sample_blank_diagram.xlsx`
- `rtk uv run --with openpyxl python skills/basic-design-excel/scripts/basic_design_render.py --validate-only skills/basic-design-excel/resources/basic_design_sample.md`
- `rtk uv run --with pyyaml python /Users/vti-sam/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/basic-design-excel`
- `rtk uv run --with pyyaml python /Users/vti-sam/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/design-doc-md`
- `rtk python -m zipfile -t scratch/basic_design_host_sample_blank_diagram.xlsx`
- Workbook read-back confirmed `media_count 0`, no raw Mermaid XML, and `05_全体構成_01` contains only the page header and `■5.1 全体構成図`.
