---
title: Business Flow Excel Sample Format
project: smj-ks-pos
type: lesson
status: archived
source:
  - Codex session 2026-07-07
  - scratch/business_flow_auto_excel_sample.xlsx
  - scratch/電話アプリ_番号計画変更まとめ_VTI提示_20251208.xlsx
tags:
  - business-flow
  - excel-format
  - basic-design
  - automation
scope: historical
captured_at: 2026-07-07
validity: historical_context
promote_to_knowledge: false
---

User asked whether Japanese-style business flow sheets can be automated in Excel.

Observed reference workbook:

- The phone app workbook has flow sheets with lane/stage structure and many Excel drawing objects.
- The visible style is close to Japanese business flow documents: lane headers by department/role, left-side stages, manual/system/auto/vendor legends, process boxes, arrows, and notes.

Reusable data model proposed for automation:

- `flows`: `flow_id`, `flow_name`, `pattern`, `variant`.
- `lanes`: `lane_id`, `lane_group`, `lane_name`, `order`.
- `stages`: `stage_id`, `stage_name`, `order`.
- `steps`: `step_id`, `stage_id`, `lane_id`, `title`, `detail`, `step_type`, `order`.
- `edges`: `from_step_id`, `to_step_id`, `label`, `edge_type`.

Sample output:

- `scratch/business_flow_auto_excel_sample.xlsx` uses the basic-design-excel style header, Meiryo UI, pale-yellow table headers, wide flow columns, gray stage columns, lane headers, colored step boxes, and DrawingML connector shapes.
- This data model is better than raw Mermaid for Japanese-style 業務フロー, As-Is/To-Be, approval flow, and user-admin-system-vendor mixed flows because it preserves lane/stage semantics.
- For wide business-flow sheets, do not force the layout into A:X or one printed page. Keep `区分`/`ステージ` columns spacious and use scroll/zoom in Excel. Do not freeze the flow sheet just to keep headers visible.
- Use connector shapes for lines, not text arrows in cells. The current preferred flow connector style is thick blue DrawingML connectors (`4472C4`, about 4 pt), because yellow was hard to see against the flow layout.
- Do not make a `備考` cell/table column for flow annotations. Render the `備考` title as a light-blue bordered header shape. Render the remark sentences below as worksheet text in merged/wrapped cells with no border and no fill, not as individual textbox shapes.
- Process boxes in flow sheets should be compact, about two-thirds of the early sample size, with slightly smaller text if needed. Re-route connector shapes after resizing so arrows connect to the box edges.
- Add faint dashed vertical guide lines from the lane/title area down through the flow area so lane blocks are readable. Keep these guide lines behind the process boxes and connectors, using light gray rather than strong table borders.
