---
title: Basic Design Excel related-sheet and table formatting
project: smj-ks-pos
type: decision
status: archived
source:
  - skills/basic-design-excel/scripts/basic_design_render.py
  - skills/basic-design-excel/SKILL.md
  - skills/basic-design-excel/references/markdown-contract.md
  - scratch/ARCH-HOST-01_basic_design_split_check.xlsx
tags:
  - basic-design
  - excel
  - renderer
  - formatting
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

Updated Basic Design Excel rendering rules:

- `目次` renders as a large bordered two-column menu frame like the SMJ template, not as a yellow-header data table.
- `目次` body uses `No． 資料名称`; items 1-14 render on the left, later items render on the right.
- Technical sheet names in the Markdown `備考` column, such as `00_表紙`, are not shown in the rendered `目次` body unless the note starts with `※`.
- Header value cells for `作成者`, `作成日`, `改訂者`, and `改訂日` render at font size 8 on every sheet.
- Plain body lines starting with `関連シート:` render as red text and use the same left indent as `① ② ③` component/flow lines.
- Every Markdown table column whose header is exactly `No` uses 2 Excel grid cells.
- Table body cells are centered only when the header is `No` or ID-related, such as `ID`, `項目ID`, `機能ID`, `エラーID`, `ログID`, `対応ID`, `デバイスID`, and `IF-ID`.
- All other table body cells are left-aligned and vertically centered.

Verification on `scratch/ARCH-HOST-01_basic_design_split_check.xlsx`:

- `05_全体構成_02` had 8 `関連シート:` rows with font color `FFFF0000`, horizontal left, vertical center.
- `05_全体構成_02` read-back confirmed `①...` component lines and `関連シート:` lines both start from column C.
- `目次` header `No` cells were merged across 2 cells.
- `目次` body `No` was center/center; non-ID body cells were left/center.
- `07_機能一覧` `F-HOST-001` was center/center; function name and description were left/center.
- Workbook still had `media_count 0` and no raw `mermaid`, `flowchart`, or `subgraph` strings.

Additional header verification:

- `目次`, `05_全体構成_02`, and `17_エラー処理` all had `T1`, `X1`, `T2`, and `X2` at font size 8 after render.

Additional menu verification:

- `目次!C7` was `1． 表紙`.
- `目次!C20` was `14． インターフェース一覧`.
- `目次!N7` was `15． 要求項目定義`.
- `目次!N16` was `24． 実装対応表`.
- `目次` body had no `No` table header, no technical sheet-name text such as `00_表紙`, no yellow body cells, and the outer/divider borders were medium.
