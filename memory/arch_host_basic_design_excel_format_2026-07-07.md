---
title: ARCH-HOST-01 Basic Design Excel Format Rewrite
project: smj-ks-pos
type: lesson
status: archived
source:
  - Codex session 2026-07-07
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
tags:
  - arch-host-01
  - basic-design
  - excel-format
  - device-connector
scope: historical
captured_at: 2026-07-07
validity: historical_context
promote_to_knowledge: false
---

User requested the デバイスコネクタ（Host）基本設計書 to be adjusted for Excel conversion.

Operational lesson:

- For basic design documents that may become Excel, prefer sheet-oriented Markdown from the start.
- Use stable IDs and table columns for 機能一覧, 機能詳細, インターフェース, 設定ファイル, エラー処理, ログ設計, テスト観点.
- Use customer-facing logical names in the main sheets, such as 通信受付部, 順序制御部, コマンド処理部, and デバイス管理部.
- Keep physical class names only in a dedicated implementation mapping sheet such as `24_実装対応表`, not as the main design content.
- Avoid Markdown inline backtick code spans in customer-facing prose and tables because Excel renders them as plain text, not inline formatting.
- Do not force all basic design sheets into tables. Overview, scope, structure, flow, lifecycle, and policy sheets should use short prose, `① ② ③` steps, and Mermaid blocks when that is easier to read.
- `skills/basic-design-excel` now renders the workbook grid from A to X (`GRID=24`), so text blocks, section bars, code blocks, and Mermaid blocks should span A:X.
- After user provided `scratch/basic-design_template.xlsx`, `scratch/AST_基本設計書.pdf`, and a screenshot of `２．システム化の目的`, the renderer was changed to an SMJ-style page layout: dark gray `システム基本設計書` header block, top metadata table, A4 landscape, unbordered prose body, underlined `■` headings, pale-yellow table headers, and black bordered catalog tables.
- In Excel output, raw Mermaid syntax must not appear. Mermaid source can stay in Markdown for source readability, but the renderer should convert it to a readable flow summary or image if image rendering is available.
- Keep long explanatory prose short; put implementation detail in `PS-HOST-*` program specs.
- Only true tables should have borders in the Excel output. Prose, notes, flow summaries, and `① ② ③` list steps should be unbordered body text; list-like lines should be indented instead of boxed row by row.
- Mermaid blocks in basic design Markdown should remain in the source and render as embedded diagram images in Excel where possible; fallback text summaries are only for missing image dependencies.
- Long JSON/config examples should stay in fenced code blocks and render as wrapped text with scaled row height, not as table cells or clipped one-line rows.
- In basic design Excel tables, center short identifier columns such as `シート名`, `元章`, `主キー`, ID, No, category, type, and required flags; keep long description columns such as `内容`, `概要`, and `備考` left-aligned.
