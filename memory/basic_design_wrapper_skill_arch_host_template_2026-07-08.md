---
title: Basic Design wrapper skill and ARCH-HOST template
project: smj-ks-pos
type: decision
status: archived
source:
  - skills/basic-design/SKILL.md
  - skills/basic-design/resources/arch-host-basic-design-template.md
  - skills/basic-design/scripts/basic_design_gate.py
  - skills/design-doc-md/SKILL.md
  - skills/basic-design-excel/SKILL.md
tags:
  - basic-design
  - skill
  - arch-host-01
  - checklist
  - excel
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

Created `skills/basic-design/` as the end-to-end wrapper skill for Japanese Basic Design work.

Current workflow:

- Use `skills/basic-design/` for create/repair/validate/render orchestration.
- Use `skills/design-doc-md/` as the content quality layer.
- Use `skills/basic-design-excel/` as the renderer and workbook validator.
- Use `skills/basic-design/resources/arch-host-basic-design-template.md` as the current ARCH-HOST style template for architecture/device Basic Design.
- Run `skills/basic-design/scripts/basic_design_gate.py` after `design_md_lint.py`; use `--profile arch-host` for Host/device connector docs.

Rules captured in the wrapper:

- Keep `目次` after `01_改訂履歴`.
- Do not use customer-facing `Excelシート構成`, `Excel化方針`, `テスト観点`, or `テスト分類` sheets unless explicitly requested for an internal workbook.
- Use `_01` only for Markdown diagram source and `_02` for explanations.
- Leave Excel diagram areas blank; do not render Mermaid syntax, generated diagram images, or flow summaries into Excel.
- Keep sheet mapping in `5.2 構成要素` with `関連シート:` lines.
- Related sheet mapping should point to `_02` explanation sheets rather than `_01` diagram source sheets.
- Avoid generic flow sheet names such as `06_処理フロー_01`.
- Keep `承認者` as `-` until the user confirms approval.
- Do not put `WBS_UI_KIBAN-*` or Backlog issue trace in customer-facing Basic Design unless explicitly requested and read back from source-of-truth.

Verification passed:

- `quick_validate.py` for `skills/basic-design`, `skills/design-doc-md`, and `skills/basic-design-excel`.
- `design_md_lint.py --kind basic-design` for the new template and renderer sample.
- `basic_design_gate.py --profile arch-host` for the new template and renderer sample.
- `basic_design_render.py --validate-only` for the new template and renderer sample.
- Rendered `scratch/basic_design_arch_host_template_check.xlsx`.
- Workbook read-back confirmed 25 sheets, `目次` present, new device flow sheet names present, old `06_処理フロー_*` absent, `media_count 0`, and no raw `mermaid`, `flowchart`, `subgraph`, `wbs_ui_kiban`, or `backlog` strings in workbook XML.

2026-07-08 update:

- `05_全体構成_02` should start directly from `5.2 構成要素`.
- Do not keep separate `5.2 関連シートの見方` or `5.3 全体像` headings. Put the short overview paragraph under `5.2 構成要素` before the numbered component list.
