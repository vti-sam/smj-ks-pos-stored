---
title: ARCH-HOST-01 three-diagram D2 and Excel flow generation
project: smj-ks-pos
type: architecture
status: archived
source:
  - Codex session 2026-07-10 ARCH-HOST-01 diagram rendering
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
tags:
  - ARCH-HOST-01
  - D2
  - Excel
  - Office Script
scope: historical
captured_at: 2026-07-10
validity: historical_context
promote_to_knowledge: false
---

# Result

Generated reviewed D2 sources, SVG/PNG previews, and fresh Excel Office Script pairs under the document bundle `draft/` folder for:

- `5.1 全体構成図`
- `6.1 デバイス操作要求処理フロー図`
- `9.1 通常運用図`

The final D2-to-Office-Script fidelity audits passed with `24/24 nodes and 23/23 edges`, `7/7 nodes and 9/9 edges`, and `12/12 nodes and 13/13 edges`. The 5.1 source was flattened so only the four numbered responsibility areas are leaf containers and therefore only those four areas become Excel merged-cell lane tables. All six Office Scripts passed their layout or label validator. The peripheral numbering in 5.1 was verified as `⑰〜⑲` after visual preview inspection.

For the final 5.1 layout, the four numbered responsibility areas remain left-to-right. The device connector content is arranged as one vertical sequence from startup/control through command processing, device implementation, event publishing, and the event pipe. ELK was selected over Dagre for the regenerated SVG and Office Scripts because it produced the more balanced four-lane composition while preserving the same 24-node/23-edge fidelity.

Later review consolidated Application and Device Control under one top-level `（1） タブレットPOS端末アプリ` boundary. The generic Excel converter was updated to create lanes from top-level D2 containers. Direct child containers are rendered as rectangle background shapes sized from the actual post-auto-fit bounds of their member components and sent to the back with `ExcelScript.ShapeZOrder.sendToBack`; they are not merged-cell sections because SVG ratios and Excel runtime auto-fit caused the earlier section tables to overlap components. The regenerated 5.1 script therefore has three peer lanes, with `アプリケーション層` and `デバイス制御` retained as blue and green nested backgrounds in lane 1. The final audit for this variant is 25/25 shapes and 23/23 edges.

For the latest visual experiment, colour remains unchanged. Only `⑤ 使用ストラテジー判定` is a diamond because it is an actual strategy-selection point; `⑬ コマンド判定・実行` and every other component remain standard rounded blocks. No icon, UML stereotype, document symbol, or generated Office Script wrapper is used.

The 5.1 `汎用` legend now has a `◇` row that identifies a judgment/branching point, and the source Mermaid defines the same Strategy node as a diamond. The shared Basic Design gate, template rule, and Markdown reference now consistently use the three legend columns `表示 / 色 / 意味`, matching the current Basic Design Excel renderer. Both the Markdown lint and ARCH-HOST strict gate pass.

Shape rule was formalized in the Basic Design template/Excel contract and Business Flow Excel skill: normal components use rounded blocks; diamonds are limited to actual judgment/branching; no decorative icon or UML stereotype; a document shape is only for an actual input/output artifact. The source Basic Design was raised to version `0.2.18`, records the shape/legend update in revision history, and was re-rendered to `draft/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.xlsx` (25 sheets). Validation, Markdown lint, strict gate, ZIP integrity, and workspace verification pass. The rendered `_01` sheet retains the prescribed blank diagram insertion area; `汎用` renders the diamond and connector legend above it.

Basic Design is now Mermaid-native: the Basic Design skill no longer requires D2 or Office Script. Rules, Markdown reference, ARCH-HOST template, and Basic Design Excel sample use `Node("...")` for a normal rounded component and `Decision{"..."}` only for an actual judgment/branch. A document shape is allowed only for a real input/output artifact when Mermaid v11.3.0+ is an approved runtime. ARCH-HOST-01 source version `0.2.19` converts all normal nodes in 5.1, 6.1, and 9.1 to rounded Mermaid nodes while retaining the genuine strategy/lifecycle decisions as diamonds; its `汎用` calls out both rounded blocks and diamonds. The source and template pass Markdown lint + ARCH-HOST gate; the regenerated 25-sheet Basic Design workbook has version 0.2.19, both legend rows, no raw Mermaid text or media files, and ZIP integrity passes.
