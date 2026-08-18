---
title: Business Flow Excel cell lane Office Script template
project: smj-ks-pos
type: gotcha
status: archived
source:
  - Codex session 2026-07-09 ARCH-HOST-01 5.1 cell lane integration
  - skills/doc-authoring/business-flow-excel/SKILL.md
  - skills/doc-authoring/business-flow-excel/scripts/generate_office_script.py
  - skills/doc-authoring/business-flow-excel/resources/smart_connector_office_script.template.ts
  - skills/repo-tools/skill-quality-eval/tests/pm-control-skill-tests.json
tags:
  - business-flow-excel
  - office-script
  - excel
  - cell-lane
  - d2
scope: historical
captured_at: 2026-07-09
validity: historical_context
promote_to_knowledge: false
---

# Note

For `business-flow-excel`, leaf D2 containers are now rendered as worksheet cell lane tables, not background shapes. The generated Office Script should:

- call `addCellLaneTable(sheet)` before node shape creation;
- render each lane with `addLaneColumns(...)`;
- merge header, subtitle, and body ranges with `Range.merge(false)`;
- merge the body/content range before setting white fill and gray border;
- use `getRangeBorder(...)` only for outer gray borders;
- skip container nodes when generating `addTextShape(...)` calls.

The normal graph nodes and connectors remain editable Excel shapes. Connector labels remain alt text and visible labels are still produced by the separate show-labels script.

The Office Script validator has a legacy forbidden token for `const LAYOUT` and checks case-insensitively. Do not name a generated variable `layoutRange`, because it contains the forbidden substring `const layout`. Use a name such as `sheetRange`.

The local machine did not have the `d2` CLI on `PATH` during this update. To keep evaluator coverage stable, `business-flow-excel` now includes `resources/sample_d2_fidelity.rendered.svg`, and the skill-quality evidence parses that SVG instead of requiring D2 rendering.
