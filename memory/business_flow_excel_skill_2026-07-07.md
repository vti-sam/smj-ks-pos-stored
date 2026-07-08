---
title: Business Flow Excel skill created
project: smj-ks-pos
type: runbook
status: archived
source:
  - skills/business-flow-excel/
  - scratch/business_flow_skill_sample.xlsx
tags:
  - business-flow-excel
  - xlsx
  - japanese-design-doc
  - skill
scope: historical
captured_at: 2026-07-07
validity: historical_context
promote_to_knowledge: false
---

Created `skills/business-flow-excel/` to render Japanese-style 業務フロー, operational flow, user-admin-system-vendor flow, and As-Is/To-Be Excel sheets from YAML/JSON.

Important implementation points:

- Main renderer: `skills/business-flow-excel/scripts/render_business_flow.py`.
- Input sample: `skills/business-flow-excel/resources/sample_business_flow.yaml`.
- Renderer uses `xlsxwriter` for workbook/cells/textboxes/images, then post-processes DrawingML to add connector shapes and dashed guide lines.
- Icons are generated locally with Pillow; no internet icon pack is used.
- Connector color is `4472C4`; lane guide color is `D9D9D9` with dashed style.
- Process boxes are compact, around two-thirds of the earlier large sample.
- `備考` title is a light-blue bordered shape, but remark body text is normal merged/wrapped worksheet text without border/fill.
- Sample output verified at `scratch/business_flow_skill_sample.xlsx`; PDF/PNG preview was generated under `scratch/business_flow_skill_preview/`.

Icon catalog update on 2026-07-07:

- The renderer now supports `kind: icon` with an `icon` field as the primary interface.
- Shortcut kinds such as `approval`, `database`, `printer`, and `decision` are also supported for compact specs.
- Supported icon groups are role, communication, business, status, data, system, device, and flow-control.
- `type: icon_catalog` auto-renders a catalog sheet from the built-in icon registry.
- Sample workbook now includes `03_アイコン一覧`; XML verification found 71 picture placements, 25 connector shapes, and 16 dashed guide lines.

Legend/color update on 2026-07-07:

- Flow sheets render `凡例・用語説明` by default above lane headers.
- Default legend items are `手動処理`, `システム処理`, `自動処理`, `外部／ベンダー`, `判定／分岐`, and `補足／備考`.
- Nodes support `style` / `process_type` / `category`; `fill` still overrides style when specified.
- Standard style colors are manual `FFFFFF`, system `DDEBF7`, auto `E2F0D9`, vendor `FCE4D6`, decision `E4DFEC`, note `FFF2CC`.
- Legend is rendered as a vertical list of colored sample boxes plus explanations, not as a heavy table, and the renderer pushes the flow body down to avoid overlap.

Useful verification commands:

```bash
rtk uv run --with xlsxwriter --with pyyaml --with pillow python skills/business-flow-excel/scripts/render_business_flow.py --check skills/business-flow-excel/resources/sample_business_flow.yaml scratch/business_flow_skill_sample.xlsx
rtk uv run --with pyyaml python /Users/vti-sam/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/business-flow-excel
```
