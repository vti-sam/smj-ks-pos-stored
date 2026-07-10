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

The final review layout keeps `6.1` as a compact left-to-right flow and `9.1` as two readable flowchart groups placed side by side (`起動・再開` and `停止・終了`). A single long horizontal lifecycle line was rejected during visual QA because its labels became too small.

## Diagram typography contract

`business-flow-excel` now owns one typography contract for every generated Office Script: level-1 and level-2 lane/container headings are 13pt bold; component blocks are 10pt bold; connector labels are 9pt normal. The generator no longer inherits font size or font weight from D2/SVG geometry, and the Office Script validator rejects output that does not contain the three required styles. The 5.1, 6.1, and 9.1 Office Script pairs were regenerated and passed the strengthened validator.

## Compact Excel box and placement contract

The Office Script generator now sizes each functional component from its displayed fixed 10pt label, within a compact 56–108pt width and 22–36pt height range. It preserves the component center derived from reviewed D2 geometry, so only excess SVG padding is removed. If a nested D2 container would otherwise pull a functional component into the reserved worksheet margin, the complete diagram is shifted just enough to begin inside the graph region. Connector labels are compact 9pt normal transparent text placed immediately above the connector, rather than white bordered boxes. The 5.1, 6.1, and 9.1 Office Script pairs and the duplicate intermediate flow outputs were regenerated and passed Office Script validation; the reusable `business-flow-excel` skill, D2 layout guidance, and skill-quality evidence test were updated to enforce the contract.

## Excel-native auto-fit and full reflow correction

The earlier center-preserving box contract above is superseded. Microsoft Office Scripts supports `ExcelScript.ShapeAutoSize.autoSizeShapeToFitText`, so component and connector-label shapes now apply the final Meiryo UI font first and then let Excel fit the shape to the text. The former `autoSizeTextToFitShape` path is forbidden because it shrinks text to an arbitrary box.

The generator no longer emits D2/SVG component positions as final Excel positions. It uses the parsed diagram only for containment, lane order, and processing order; wraps long labels at semantic Japanese boundaries while keeping code identifiers intact; allocates A:X lane widths; creates all component shapes at a neutral origin; auto-fits them; then places each group again with a fixed vertical gap and lane-centered alignment. Connector geometry is created from the newly positioned Excel shapes rather than from old SVG endpoints. Runtime validation rejects generated component calls that retain non-zero source coordinates, rejects `autoSizeTextToFitShape`, requires `autoSizeShapeToFitText` and `placeVerticalGroup`, and checks estimated wrapped width against lane capacity.

The canonical 5.1, 6.1, and 9.1 Office Script pairs plus the two duplicate intermediate flow pairs were regenerated with the new contract. All Office Script validators, skill quick validation, skill-quality evaluation, rule lint, knowledge lint, and workspace verification passed.

## Expandable canvas and unified 1.5pt stroke contract

The diagram renderer is no longer limited to A:X. Normal diagram sheets keep a 23-content-column baseline, but each lane receives at least 210pt and the end column expands from the number of lanes and the widest fitted component. Column A remains a margin; content columns from B onward use a repeatable 36pt width. Components use at least 80×28pt, 12pt lane inset, larger text-frame margins, and an 18pt vertical gap.

All native connectors, component borders, text-box borders, connector-label borders, and lane/table borders now share `#1F4E79`. Native shape and connector weights resolve through one `diagramLineWeight()` function returning exactly 1.5pt. The adaptive `safeLineWeight` path, hidden connector-label borders, `#0D32B2` Office Script borders, and fixed `A1:X80` layout code are rejected by validation.

The canonical outputs now allocate through column AE for 5.1, Y for 6.1, and X for 9.1. The `business-flow-excel`, `basic-design-d2-diagram`, and `basic-design-excel` rules were updated so the same content-driven sizing and stroke contract can be reused across projects and document types instead of depending on ARCH-HOST coordinates or a fixed canvas.

## Runtime-safe integer stroke correction

The earlier 1.5pt stroke contract is superseded. An Excel Office Scripts runtime rejected the fractional value at `ShapeLineFormat.setWeight` with an invalid-argument error. All generated native connectors, component borders, text-box borders, and connector-label borders now resolve through `diagramLineWeight()` to the integer value 2pt while keeping the shared color `#1F4E79`.

The reusable validator now requires `return 2;` and rejects fractional literals both in direct `setWeight(...)` calls and in the centralized `diagramLineWeight()` helper. This runtime-safe rule applies across diagram types and projects rather than only to the current ARCH-HOST document.

## Runtime-sized lane table and spacing correction

The earlier 210pt lane, 12pt inset, and 18pt component-gap contract is superseded. Excel applies `autoSizeShapeToFitText` at runtime, so a lane table sized only from pre-fit estimates can end above the lowest component. The reusable renderer now allocates at least 252pt per lane, uses 24pt horizontal/top padding, a 28pt vertical component gap, and a 96pt minimum component width.

`placeVerticalGroup()` now returns the actual bottom edge of each group after Excel auto-fit. The script derives `bodyEndRow` from the lowest returned edge plus 36pt bottom padding, then creates the merged lane table to that runtime row. The validator rejects the old fixed `addCellLaneTable(sheet)` call and placements below the 252pt/28pt minimum. `basic-design-excel` must preserve the generated end column, `bodyEndRow`, and bottom padding when the diagram region is copied into a Basic Design sheet.

The canonical 5.1, 6.1, and 9.1 Office Script pairs plus the intermediate duplicate-name pairs were regenerated. The 5.1 canvas now expands through column AJ and its five lane bodies all terminate at the shared runtime-calculated bottom row.

## D2-relative component placement correction

The topological single-column placement behavior is superseded. Large responsibility areas remain merged-cell lane tables, but small shapes must preserve the reviewed D2 layout: nearby source `y` centers form one row, nodes within a row keep source `x` order and normalized horizontal offsets, and diagrams without containers use the whole canvas as one placement region. Excel may resize shapes for Meiryo UI, but it must not reorder same-level nodes or remove deliberate left/right branch offsets.

The renderer now emits `placeD2Row()` calls instead of `placeVerticalGroup()`. Each row resolves overlap with 24pt lane inset and 28pt horizontal gap, returns its runtime bottom after auto-fit, and feeds the dynamic table-height calculation. Generated connectors receive D2 `fromSide` and `toSide`; relative-center inference is only a fallback when a source side is missing. Exact D2 bend points remain outside the stable Office Scripts API, so connectors stay as single editable native Excel connectors.

For ARCH-HOST, 6.1 now keeps four D2 rows with node counts `1 / 2 / 2 / 2`; 9.1 lifecycle flow keeps the D2 vertical order and the right-offset launch/init and force branches; 5.1 retains the reviewed vertical sequences within each of its five leaf lanes. The canonical and duplicate-name Office Script pairs were regenerated, and validation rejects the old single-column helper.
