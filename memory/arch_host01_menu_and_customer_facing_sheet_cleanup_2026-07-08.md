---
title: ARCH-HOST-01 menu and customer-facing sheet cleanup
project: smj-ks-pos
type: architecture
status: archived
source:
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
  - scratch/ARCH-HOST-01_basic_design_split_check.xlsx
tags:
  - arch-host-01
  - basic-design
  - menu
  - customer-facing
  - excel
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

`ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md` was updated to replace the internal Excel sheet inventory with a customer-facing `目次` sheet.

Current convention:

- Keep `目次` near the front, after `01_改訂履歴`.
- Do not include customer-facing sheets for `テスト観点`, `テスト分類`, `Excel化方針`, or `Excelシート構成`.
- Rename remaining review/open items to `19_確認事項`.
- Rename implementation mapping to `20_実装対応表`.
- Remove the `設計書全体マップ` Mermaid diagram. Use `5.2 構成要素` to show each component and its `関連シート` instead.
- The peripheral device block in `5.1 全体構成図` should list the three initial devices: `釣銭機（RT-300）`, `キャッシュドロア（SHARP）`, and `カスタマーディスプレイ（SHARP）`.
- Diagram labels should not include sheet numbers such as `設定（15）` or `16_デバイス別設計`. Use only system component numbering `① ② ③ ④` for responsibility areas. Keep sheet mapping in `関連シート:` text below each component.
- `5.1 全体構成図` now includes configuration reference, response reception, event reception, error response, and log output nodes so the architecture overview covers configuration, request/response, event, error, and log topics without turning the diagram into a sheet map.
- Use `06_デバイス操作要求処理フロー_01` and `06_デバイス操作要求処理フロー_02` in the menu and related-sheet references. The `_01` sheet is only for Markdown diagram source, while `5.2 構成要素` `関連シート:` lines should point to the `_02` explanation sheet.
- The document version was bumped to `0.2.8`.

Final checks passed:

- `rtk python skills/design-doc-md/scripts/design_md_lint.py ... --kind basic-design`
- `rtk uv run --with openpyxl python skills/basic-design-excel/scripts/basic_design_render.py --validate-only ...`
- Rendered `scratch/ARCH-HOST-01_basic_design_split_check.xlsx`
- Workbook readback: 25 sheets, `目次` present, deleted internal sheets absent, `media_count 0`, and no `backlog`, `wbs_ui_kiban`, `mermaid`, `flowchart`, or `subgraph` strings in Excel XML.
