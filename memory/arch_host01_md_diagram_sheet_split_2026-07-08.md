---
title: ARCH-HOST-01 Markdown diagram sheet split
project: smj-ks-pos
type: architecture
status: archived
source:
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
  - scratch/ARCH-HOST-01_basic_design_split_check.xlsx
tags:
  - arch-host-01
  - basic-design
  - diagram-sheet
  - excel
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

`ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md` was updated to follow the Basic Design diagram split format.

Applied split:

- `05_全体構成_01`: Markdown diagram source only, with large blocks and nested blocks mapping to document sheets.
- `05_全体構成_02`: detailed prose, mapping table, and numbered explanation steps.
- `06_デバイス操作要求処理フロー_01`: Markdown diagram source for the device operation request flow.
- `06_デバイス操作要求処理フロー_02`: detailed prose and numbered flow steps.
- `09_ライフサイクル_01`: Markdown diagram source for operation lifecycle.
- `09_ライフサイクル_02`: detailed lifecycle prose and debug-time explanation.

Visible Excel wording now uses `図原本` / `図シート` instead of `Mermaid`, so the generated workbook does not contain diagram-source syntax or raw Mermaid terms. The renderer leaves diagram sheet body areas blank for manual insertion of approved images.

Final checks passed:

- `rtk python skills/design-doc-md/scripts/design_md_lint.py ... --kind basic-design`
- `rtk uv run --with openpyxl python skills/basic-design-excel/scripts/basic_design_render.py --validate-only ...`
- Rendered `scratch/ARCH-HOST-01_basic_design_split_check.xlsx`
- Workbook readback: 28 sheets, expected `_01/_02` sheets present, `media_count 0`, no `mermaid`, `flowchart`, or `subgraph` strings in Excel XML.
