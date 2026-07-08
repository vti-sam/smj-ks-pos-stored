---
title: ARCH-HOST-01 overall structure section order
project: smj-ks-pos
type: architecture
status: stale
source:
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
  - scratch/ARCH-HOST-01_basic_design_split_check.xlsx
tags:
  - arch-host-01
  - basic-design
  - section-order
  - excel
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

`ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md` section 05 was reordered after user feedback that the main architecture diagram should precede the document map.

Historical section order, superseded later:

- `5.1 全体構成図`: runtime architecture from タブレットPOSアプリ to DeviceCtrl, Host, and 周辺機器.
- `5.2 設計書全体マップ`: navigation/map showing which sheets explain each block.
- `5.3 全体像`
- `5.4 構成要素`
- `5.5 設計書全体マップの説明`
- `5.6 構成ブロックと対応シート`

The document version was bumped to `0.2.7`.

Final checks passed:

- `rtk python skills/design-doc-md/scripts/design_md_lint.py ... --kind basic-design`
- `rtk uv run --with openpyxl python skills/basic-design-excel/scripts/basic_design_render.py --validate-only ...`
- Rendered `scratch/ARCH-HOST-01_basic_design_split_check.xlsx`
- Workbook readback: 28 sheets, `media_count 0`, no `backlog`, `wbs_ui_kiban`, `mermaid`, `flowchart`, or `subgraph`, and sheet headings show `5.1 全体構成図` before `5.2 設計書全体マップ`.

Superseded update on 2026-07-08:

- The current rule is that `05_全体構成_02` starts directly from `5.2 構成要素`.
- Separate `5.2 関連シートの見方`, `5.3 全体像`, and `5.4 構成要素` headings should not be used in the current template.
