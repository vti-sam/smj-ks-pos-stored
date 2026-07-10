---
title: ARCH-HOST-01 customer-facing terms and overall diagram update
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session 2026-07-10 ARCH-HOST-01 overall diagram and Japanese wording update
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
tags:
  - ARCH-HOST
  - basic-design
  - Mermaid
  - Japanese
  - ReplyDevice
scope: historical
captured_at: 2026-07-10
validity: historical_context
promote_to_knowledge: false
---

# Note

ARCH-HOST-01 was updated to version 0.2.11.

The overall diagram keeps four responsibility blocks and continuous component numbering from ① through ⑲. The main device request route, Host process lifecycle route, configuration references, and asynchronous event route are shown separately.

Customer-facing sections use Japanese logical names as the primary wording. In particular, `ReplyDevice` is described as `デバイス処理結果通知`. The original identifier remains only where protocol or implementation mapping accuracy requires it, such as JSON examples, message definitions, and implementation mapping, with a Japanese explanation beside it.

The same rule is used for command identifiers such as `Kill`, `ReStart`, `DeviceUse`, `DeviceUnUse`, `DeviceUnUseComplete`, and `DeviceMethod`: show the Japanese processing meaning first and keep the code identifier in parentheses or in the identifier column.

Validation completed successfully with the Basic Design Markdown lint, strict ARCH-HOST gate, and Excel render validation.

## D2 review artifact

The revised `5.1 全体構成図` was converted to D2 with `basic-design-d2-diagram` and kept under the document bundle `draft/` folder for review. The D2 uses the Japanese logical name `デバイス処理結果通知` and does not display `ReplyDevice`.

The reviewed preview keeps the terminal application boundary around the application layer and DeviceCtrl, separates the Host lifecycle relation from the main request/response route, and shows the asynchronous event route with dashed edges. D2 validation passed, and both SVG and PNG previews were rendered and visually inspected before delivery.

The reviewed D2 was then converted with `business-flow-excel` into a fresh pair of Excel Office Scripts under the same `draft/` folder. The generated layout audit matched 27 source shapes to 27 rendered nodes and 22 source edges to 22 rendered edges. The layout script uses merged worksheet-cell lane bands, native attached connectors, smart connection sites, and connector alt text. The second script reads connector alt text and creates visible label text boxes. Both Office Script validators passed.

## Diagram legend and memo integration

ARCH-HOST-01 was updated to version 0.2.12. `05_全体構成_01` now includes a `汎用` legend and `メモ` after Mermaid. Stale legend concepts such as `通常処理ブロック（①〜⑥、⑧）` and `異常・ログブロック（⑦）` were replaced with the current `①〜⑲` component range, the open event-receiver block, and the actual solid, bidirectional, and dashed line meanings.

The memo distinguishes device operations, which pass through DeviceCtrl, from Host process lifecycle management, which is owned by the application-layer Host process manager. The event receiver remains an open item because the current DeviceCtrl source has no receiver implementation.

The `basic-design` and `basic-design-excel` workflows were updated to support paired `#### 汎用` and `#### メモ` blocks after Mermaid. The Excel renderer now reserves a blank diagram area, renders level-4 headings as smaller subsection headings, and places legend/memo content below the placeholder. The strict gate rejects legend/memo blocks outside `_01`, missing pairs, wrong order, and incorrect legend columns.

Visual workbook QA confirmed that the diagram placeholder appears before `□汎用`, followed by the legend table and `□メモ`, with no raw Mermaid or Markdown heading markers. The renderer was also corrected to read the first newest-first revision-history row, so the page header uses the current revision date.

Superseded intermediate implementation: the Office Script profile temporarily owned the same legend and memo as editable shapes. That approach was replaced by the worksheet-cell responsibility correction below.

## Diagram sheet responsibility correction

The earlier Office Script ownership of legend and memo was removed after workbook integration review.

- `basic-design-excel` is now the sole owner of `汎用` and `メモ`. Both are rendered as normal worksheet cells using the Basic Design subsection, table, and prose styles.
- The Excel-only order on paired `_01` sheets is `汎用` -> fixed blank diagram area -> `メモ`, even though the Markdown source keeps Mermaid before the two level-4 blocks for document validation.
- The reserved diagram area is fixed at 40 rows with row height 18. For ARCH-HOST 5.1, the legend table occupies rows 9-18, the blank diagram area occupies rows 20-59, the memo heading is row 60, and memo text begins at row 62.
- `business-flow-excel` no longer accepts or emits `legend` or `memo`. Profiles containing either field are rejected, and layout/Office Script validation rejects the former `shape_legend_*` and `shape_memo` outputs.
- Business-flow profiles are reduced to sheet name, description, and colors. Basic Design title, system, author, and revision metadata are not accepted because the diagram skill does not render the page header.
- Diagram Office Scripts use the Basic Design-compatible A:X grid: A corresponds to width 3.0, B:D to 7.5, E:W to 5.5, X to 10.0, and all working rows use height 18. Rows 1-4 stay reserved and blank; the diagram-only region begins at row 5 without generating a Basic Design page header.
- The current ARCH-HOST 5.1 Office Scripts were regenerated with the new contract. Fidelity remains 27/27 nodes and 22/22 edges, with no legend or memo shapes.

## Compact legend and memo visual correction

ARCH-HOST-01 was updated to version 0.2.13 after comparing the rendered sheet with the supplied SMJ-style screenshots.

- The Markdown still uses `表示 / 背景色 / 枠線色 / 意味` as styling metadata, but Excel no longer displays the table header or color-code cells.
- Excel renders `■汎用` followed by seven compact colored label cells in columns B:G and borderless explanations in columns J:X. The seven labels are タブレットPOSアプリ, デバイス制御層, デバイスコネクタ, 周辺機器, 構成要素, 確認事項, and コネクタ.
- The fixed 40-row diagram area begins immediately after the compact legend. In the ARCH-HOST 5.1 output it occupies rows 15-54.
- Excel renders `■メモ` at row 55 and three concise borderless dash-note lines beneath it. Circled memo numbering is no longer used.
- `basic-design`, `basic-design-excel`, their references, sample Markdown, strict gate, and ARCH-HOST template were synchronized with this presentation contract.
- Visual QA confirmed that the rendered 5.1 sheet matches the reference structure: colored label stack at left, explanations at right, large blank diagram region, and compact memo lines below.

## 5.1 and 5.2 content alignment

ARCH-HOST-01 was updated to version 0.2.14 so the compact legend and memo are not merely visually correct but also map directly to the design content.

- The four responsibility labels now use the exact 5.1 and 5.2 names: `（1）アプリケーション層`, `（2）デバイス制御層`, `（3）デバイスコネクタ（Host）`, and `（4）周辺機器`.
- Each responsibility description summarizes the actual numbered components below that block in 5.2 rather than using a generic layer description.
- `構成要素（①〜⑲）` explicitly states that its numbering corresponds to the 5.2 component items.
- `イベント受信（確認事項）` identifies TabetPos.Host.Event and states that the DeviceCtrl receiver remains a confirmation item.
- The connector description matches the relationships used in 5.1 and explained in 5.2: solid for synchronous/control paths, bidirectional for requests and results, and dashed for configuration references or asynchronous event notification.
- The memo now explains the 5.1-to-5.2 numbering relationship, DeviceCtrl routing boundary, application-owned Host lifecycle, Host-owned communication/device control, and the detailed-sheet/open-item locations.
- Visual QA confirmed that the longer, content-aligned descriptions still fit the compact two-column legend and that all four memo lines remain readable.

## Device request flow simplification

ARCH-HOST-01 was updated to version 0.2.15 to simplify `06_デバイス操作要求処理フロー_01`.

- The former nine-participant, sixteen-message sequence diagram was replaced with a left-to-right flowchart.
- The diagram now shows six review-level stages: application request, DeviceCtrl setting/control decision, Host request generation, Host reception/order control, device search/execution, and result return.
- DeviceCtrl, Host reception, and device execution can branch to one shared `失敗応答・ログ出力` block; the failure path rejoins the result return stage.
- The optional event-detail path was removed from the overview flowchart because it is already shown in 5.1 and explained in 6.2/19_確認事項.
- `06_デバイス操作要求処理フロー_02` keeps the sixteen detailed internal steps and now explicitly distinguishes those details from the six overview stages.
- Markdown lint, the strict ARCH-HOST Basic Design gate, Excel validation, and workbook rendering passed for the simplified diagram source.

## Japanese logical-term standardization

ARCH-HOST-01 was updated to version 0.2.16 to use one customer-facing term for each logical component.

- `デバイス制御` is the standard logical name for the component formerly shown as `DeviceCtrl` or `デバイス制御層`.
- `デバイス操作` describes a request or operation, while `実機制御` describes direct control of physical devices by the device connector. This avoids using the component name as an action.
- Customer-facing prose and diagrams use Japanese logical names such as `デバイスID`, `メソッドID`, `付加データ`, and `デバイス処理結果通知`.
- Exact code and protocol identifiers remain only in the technical definition areas where mapping accuracy is required: interface/field/message/configuration definitions and `20_実装対応表`.
- The 5.1 D2 layout and both Office Scripts were regenerated and validated with 27/27 nodes and 22/22 edges. The generated files no longer display `DeviceCtrl`, `デバイス制御層`, `ReplyDevice`, `DeviceId`, or `DeviceMethod`.
- The strict ARCH-HOST gate now checks that raw implementation identifiers do not leak into customer-facing sheets. Markdown lint, the strict gate, Excel rendering, Office Script validation, and visual inspection of sheet 5.1 passed.

## Mandatory logical-name and code-mapping rule

ARCH-HOST-01 was updated to version 0.2.17 after the terminology rule was strengthened from a placement guideline to a mandatory display contract.

- Main content uses a Japanese logical name alone. When source-code mapping must be shown, the visible form is `日本語論理名（コード識別子）`.
- Raw identifiers such as `AppServer`, `TabetPos.Host.Command`, `TabetPos.Host.Event`, command values, request/event field names, and device identifiers must not stand alone in prose, diagrams, legends, memos, error/log descriptions, or open items.
- Exact identifiers may remain alone only inside complete JSON/config examples or dedicated physical implementation columns whose same row provides the Japanese logical meaning.
- The reusable mapping table was added to the Basic Design rules. The ARCH-HOST gate now checks mapped terms outside fenced code blocks, requires a flowchart for `09_ライフサイクル_01`, and rejects `Resources/host_device_config.json`.
- `09_ライフサイクル_01` was simplified from a sequence diagram to a ten-stage decision flowchart. `09_ライフサイクル_02` retains the fifteen detailed lifecycle steps and explains their relationship to the overview.
- `Resources/host_device_config.json` was shortened to `host_device_config.json` because the deployment-relative directory is not part of the reviewed configuration-file name.
- Basic Design, Basic Design Excel, Basic Design D2 Diagram, and Business Flow Excel skill guidance were synchronized with the same terminology contract.
- The 5.1 D2/Office Script artifacts were regenerated so the event channel is displayed as `イベント通知用パイプ（TabetPos.Host.Event）`. Fidelity remained 27/27 nodes and 22/22 edges.

## Three-flow D2 and Excel rendering

The three review-level flows were rendered together under the ARCH-HOST draft bundle:

- `5.1 全体構成図`: 27 nodes and 22 edges, regenerated from the current D2 source.
- `6.1 デバイス操作要求処理フロー`: six-stage left-to-right flow with a shared failure-response/log branch; 10 nodes and 9 edges.
- `9.1 ライフサイクル`: vertical flowchart with startup and ten-second termination decisions; 12 nodes and 13 edges.

Each flow has a D2 source, rendered SVG/PNG preview, positioned layout JSON, and two validated Office Scripts (graph and connector-label display). The scripts use the Basic Design-compatible A:X grid and contain graph content only; `汎用` and `メモ` remain owned by the Basic Design worksheet renderer.
