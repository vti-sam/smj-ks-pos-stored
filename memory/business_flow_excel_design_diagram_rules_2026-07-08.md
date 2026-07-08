---
title: Business Flow Excel design diagram rules
project: smj-ks-pos
type: gotcha
status: archived
source:
  - Codex session on 2026-07-08 updating skills/business-flow-excel and ARCH-HOST-01 5.1 diagram
  - skills/business-flow-excel/SKILL.md
  - skills/business-flow-excel/references/schema.md
  - skills/business-flow-excel/references/layout-rules.md
tags:
  - business-flow-excel
  - basic-design
  - excel-diagram
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

For Basic Design diagram sheets rendered by `skills/business-flow-excel`, use a compact `general` section rendered as `汎用` near the top for shared colors, symbols, connector meanings, and icon meanings.

The `汎用` descriptions must be short and direct. Do not generate meta explanations about the color role; write the actual meaning such as the target area or element behavior.

Render `memo` as one unframed merged row below the diagram. Put `■メモ` on the first line and each memo item as a `- ...` line in the same row. Do not use a large bordered memo box.

Icon nodes that need connectors, especially peripheral devices, should have a small transparent wrapper block behind the icon and label. Connectors attach to the wrapper shape, not to the embedded PNG.

When a Mermaid source uses dotted edges such as `-.->` for log or secondary paths, render the matching Excel edge with `dashed: true`.

For Basic Design diagram sheets, large block boundaries must be worksheet cell borders, not DrawingML line shapes. Use `boundary_guides: borders` so separators align from the lane header down to the memo area and copy as table borders into the Basic Design workbook. Use gray borders and include a bottom border before `メモ`.

`skill-quality-eval` now has a `business-flow-excel` sample render evidence test. Keep this test passing before claiming workflow-quality improvements; it catches workbook XML validation regressions such as connector attachment checks.
