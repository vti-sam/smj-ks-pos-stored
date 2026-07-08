---
title: ARCH-HOST-01 remove Backlog issue references
project: smj-ks-pos
type: architecture
status: archived
source:
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
  - scratch/ARCH-HOST-01_basic_design_split_check.xlsx
tags:
  - arch-host-01
  - basic-design
  - backlog
  - excel
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

`ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md` was updated after user feedback that `WBS_UI_KIBAN-*` values are not document IDs and should not appear as Backlog issue trace in the customer-facing design document.

Current convention for this document:

- Keep `文書ID` as `ARCH-HOST-01`.
- Do not include `関連Backlog`, `WBS_UI_KIBAN-*`, or Backlog issue rows in the cover or `04_関連資料`.
- `04_関連資料` should contain design/config/program-spec document IDs only.
- `23_未決事項` should manage open questions inside the document with `確認ID`, owner, deadline wording, and status, without a tracking issue column.
- The document version was bumped to `0.2.6`.

Final checks passed:

- `rtk rg -n 'Backlog|WBS_UI_KIBAN|関連Backlog|追跡課題' ...` returned no matches.
- `rtk python skills/design-doc-md/scripts/design_md_lint.py ... --kind basic-design`
- `rtk uv run --with openpyxl python skills/basic-design-excel/scripts/basic_design_render.py --validate-only ...`
- Rendered `scratch/ARCH-HOST-01_basic_design_split_check.xlsx`
- Workbook readback: 28 sheets, `media_count 0`, and no `backlog`, `wbs_ui_kiban`, `mermaid`, `flowchart`, or `subgraph` strings in Excel XML.
