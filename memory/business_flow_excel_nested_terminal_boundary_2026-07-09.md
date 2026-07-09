---
title: Business Flow Excel nested terminal boundary fix
project: smj-ks-pos
type: gotcha
status: archived
source:
  - Codex session 2026-07-09 ARCH-HOST-01 5.1 Excel flow generation
  - skills/doc-authoring/business-flow-excel/scripts/d2_svg_to_layout.py
  - skills/doc-authoring/business-flow-excel/scripts/d2_to_office_script.py
  - skills/doc-authoring/business-flow-excel/resources/sample_d2_fidelity.d2
  - skills/doc-authoring/business-flow-excel/scripts/generate_office_script.py
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/draft/ARCH-HOST-01_5.1_全体構成図.office-script.ts
tags:
  - business-flow-excel
  - ARCH-HOST
  - D2
  - Excel
  - DeviceCtrl
scope: historical
captured_at: 2026-07-09
validity: historical_context
promote_to_knowledge: false
---

# Note

When converting ARCH-HOST-01 `5.1 全体構成図` from D2 to Excel, preserve the reviewed outer boundary:

- `タブレットPOS端末アプリ` contains `（1）アプリケーション層` and `（2）デバイス制御層（DeviceCtrl）`.
- Do not generate a direct `アプリケーション層` to `デバイスコネクタ（Host）` connector.
- Request/response and device control/result edges should remain bidirectional.
- `ReplyDevice` or event notification remains a separate dashed one-way return path.

The D2 SVG converter must prefix scoped endpoints inside nested containers. For example, an edge emitted under `terminal` such as `app.biz <-> ctrl.config` must resolve to `terminal.app.biz <-> terminal.ctrl.config`. Otherwise the Excel layout silently drops the app-to-DeviceCtrl connectors.

For the customer-facing ARCH-HOST `5.1 全体構成図` Excel artifact, D2 SVG geometry is the visual source of truth. Do not hand-author a second node/edge list and do not use a hardcoded ARCH-HOST coordinate map. Use the generic wrapper pipeline for each new diagram:

`d2_to_office_script.py <input.d2-or.svg> <diagram.office-script.ts> --profile <diagram.profile.json>`

The converter parses the reviewed D2 SVG and preserves:

- shape/container coordinates and sizes
- rectangle/diamond shape type
- fill, stroke, and dashed styling
- text labels as overlay text boxes
- connector start/end points, direction, labels, and path points

The generated Office Script is a per-diagram artifact. Do not copy or reuse a script generated for another D2/SVG. The wrapper writes a fresh `.office-script.ts` plus intermediate `.layout.json` and `.d2-rendered.svg` from the current input.

When the user asks for the actual Excel file, run `render_layout_workbook.mjs <diagram.layout.json> <diagram.xlsx> <diagram.preview.png>` with the bundled spreadsheet runtime. This creates a local review workbook immediately from the parsed D2 layout, using merged worksheet ranges for visible blocks/text and native line shapes for connectors. Keep the Office Script as the canonical native-shape automation artifact, but do not answer "done" without a `.xlsx` when the user explicitly asks for Excel.

Generated review artifacts for this diagram should go under the document bundle `draft/` folder, not the root bundle folder.

The renderer must validate visual ownership by geometry, not only logical IDs. A previous hardcoded draft parsed `device` as 3 nodes correctly but positioned `host.impl` inside the 周辺機器 lane, making the review image look like 4 peripheral blocks. The generic converter now gates output with D2/SVG fidelity audit. Verified evidence for the ARCH-HOST `5.1 全体構成図` render after switching to the generic pipeline: `sourceShapeCount=33`, `renderedNodeCount=33`, `sourceEdgeCount=31`, `renderedEdgeCount=31`, device shapes are `device`, `device.cash_changer`, `device.cash_drawer`, `device.customer_display`.
