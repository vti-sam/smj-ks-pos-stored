---
title: Business Flow Excel deterministic horizontal lane pipeline
project: smj-ks-pos
type: decision
status: archived
source:
  - skills/doc-authoring/business-flow-excel/SKILL.md
  - skills/doc-authoring/business-flow-excel/references/horizontal-lane-layout-contract.md
  - Codex session 2026-07-12
tags:
  - Business Flow Excel
  - Mermaid
  - Office Script
  - deterministic layout
  - horizontal lanes
scope: historical
captured_at: 2026-07-12
validity: historical_context
promote_to_knowledge: false
---

# Result

The Mermaid-to-Office-Script pipeline now preserves reviewed horizontal lane and parent-block structure instead of accepting a flattened canvas when shape and edge audits still match.

The root cause was Mermaid SVG DOM structure: cluster and node groups are emitted as flat siblings, so DOM ancestry cannot recover `subgraph` ownership. The pipeline now reads container hierarchy, `direction`, and declaration order directly from Mermaid source, then combines those semantics with SVG geometry.

Reusable safeguards:

- Sibling top-level subgraphs become horizontal lane titles in source order. Only the title band is merged; body cells remain unmerged and borderless.
- The diagram uses the Basic Design grid width: 25 columns from a B anchor through Z, with each Office Script column set to 36pt, equivalent to Excel width `5.5`.
- Three vertically directed top-level lanes use the stable 25-column `9 / 8 / 8` template.
- Direct nested subgraphs become `section_bg_*` backgrounds.
- Nested sections reserve 42pt above members for the title, 16pt below members, 12pt on both sides, and a 96pt row transition between adjacent sections. The first component begins 90pt below the diagram anchor so the section title cannot overlap the lane title.
- Responsibility groups and unconnected lists use stable vertical declaration order.
- Branched runtime flows keep reviewed rank and left/right offsets; oversized rows are reflowed before the lane template is expanded.
- The validator compares source-derived top-level/nested container counts with generated lane/section counts.
- A diagram with no top-level subgraph cannot receive a fake lane table.
- Generation is checked for deterministic byte-identical output.

The skill now includes:

- `references/horizontal-lane-layout-contract.md`
- `resources/horizontal-lane-template.md`
- golden layout and show-labels Office Scripts
- rendered Mermaid sample
- `scripts/test_horizontal_lane_pipeline.py`, including a flattened-output rejection test

ARCH-HOST-01 official scripts were regenerated. `5.1.2` now has three `9 / 8 / 8` lanes and five spacious nested sections. `6.1` now has three `9 / 8 / 8` phase lanes. Shape/edge audits remain `26/26 + 19/19` and `33/33 + 41/41`.

# Verification

- Horizontal-lane regression tests: 4 passed.
- D2 regression: 33/33 shapes and 31/31 edges.
- All six ARCH-HOST Office Scripts passed validators with expected lane/section counts.
- Skill quick validation passed.
- Skill quality score: 91.1, no failed evidence.

# Offline PDF pipeline update

The iterative review loop no longer depends on Excel Online. The manifest pipeline now generates one shared layout model and derives these artifacts from it:

- explicit-sheet/anchor layout Office Script;
- corresponding show-labels Office Script;
- offline SVG preview;
- one-page A3 PDF converted by headless LibreOffice with an isolated temporary profile;
- PNG rendered by Poppler for visual inspection.

LibreOffice is used only to convert the generated SVG to PDF. It never opens, modifies, or resaves the destination workbook; editable Excel shapes are still created only by Office Script.

Reusable safeguards added:

- a generated layout JSON may exist as a disposable build artifact, but it is never edited or treated as source-of-truth;
- offline rendering reuses the generator's 25-column lane allocation, row fitting, nested-section bounds, node sizing, and spacing constants;
- connector labels try several positions and are omitted when every candidate would cover a node or another label;
- diagrams without a top-level container do not receive a fake empty lane title;
- decision diamonds receive extra width and height, and all component width estimates use a larger Meiryo-compatible text factor;
- the default pipeline is `--mode offline`; authenticated Microsoft 365 execution is an optional compatibility check only.

ARCH-HOST-01 now renders all three Mermaid diagrams locally in about nine seconds total. Each PDF is one A3 page, all six Office Scripts pass validation, and the offline pipeline regression suite has eight passing tests.

# 汎用 visual-contract gate

The pipeline now extracts the first `#### 汎用` display/color table from Basic Design Markdown and treats it as the machine-checked visual source of truth.

Rules:

- ordinary rounded blocks are normalized to the declared `角丸ブロック` fill;
- decisions, errors, responsibility groups, phase lanes, and numbered responsibility areas use their matching declared fills;
- undeclared Mermaid `classDef` fills are not preserved automatically;
- semantic connector colors are accepted only when declared by a `汎用` relationship row;
- repeated Mermaid CSS declarations use the last value, which preserves specific `linkStyle` overrides after `linkStyle default`;
- connector arrowheads use the same color as their connector;
- parallel relationships between the same two nodes are offset so different colors and dash patterns remain visible;
- SVG validation checks Meiryo UI, 13/10pt role sizes where applicable, and 2pt outlines;
- after PDF creation, the pipeline renders a 72dpi PPM probe and requires every fill/connector color used by the generated layout to appear in the actual PDF raster.

ARCH-HOST-01 palette verification now confirms:

- 5.1.1: main flow blue, asynchronous event orange, device control purple, and all three declared responsibility-area fills;
- 5.1.2: blue, green, purple, orange, gray relationships plus the declared area/component fills;
- 6.1: lifecycle green, error red, asynchronous event orange, decision yellow, error-block red, generic rounded-block fill, and common blue outline/main flow.

All six Office Scripts pass validation, all three PDFs remain one-page A3, and the combined regression suite now has ten passing tests.

# Editable Basic Design callouts

Explanatory notes are now curated Basic Design callouts rather than generic yellow rectangles.

- `汎用` declares `補足コメント（吹き出し・半透明）` as `#FFF2CC / 70%透過`, with amber `#BF9000` 2pt outline and Meiryo UI 9pt text.
- The generated show-labels Office Script uses native `ExcelScript.GeometricShapeType.wedgeRRectCallout`, so the pointer can be adjusted manually in Excel.
- Context diagrams select one callout; logical and operational diagrams select at most three. Retry, timeout, ownership, lifecycle, ordering, and isolation constraints take precedence over generic component descriptions.
- Callouts are placed only beside their source shape. The offline SVG/PDF draws a matching amber pointer toward the source and rejects partial callout rendering.
- Connector labels are kept in the foreground when a translucent callout crosses their area.
- Dense three-phase operational scenarios use a roomy `12 / 12 / 12` lane allocation so callouts remain adjacent to their target. Other stable three-lane templates keep `9 / 8 / 8`.

# Mermaid connector-direction contract

The pipeline now treats connector direction as semantic data and validates it independently of color and line style.

- Context/logical relationships labeled with request plus synchronous response, or control plus result, must be bidirectional.
- Asynchronous events, notifications, configuration references, lifecycle commands, decision branches, and error paths remain one-way.
- Operational scenarios reject bidirectional shorthand; responses and returns must be modeled as explicit ordered steps.
- Cross-lane connectors are forced to left/right attachment sides. The former horizontal/vertical gap comparison was reversed and could attach horizontally separated nodes at their top/bottom edges.
- Offline SVG draws arrowhead overlays after node fills, then requires one end arrowhead per edge and one additional start arrowhead per bidirectional edge.
- ARCH-HOST-01 final arrowhead counts are `2 + 3` for 5.1.1, `4 + 19` for 5.1.2, and `0 + 41` for 6.1, where the first number is bidirectional start arrows and the second is all end arrows.
- The reusable rules are documented in `skills/doc-authoring/business-flow-excel/references/mermaid-edge-direction-contract.md` and covered by semantic and geometry regression tests.

# Three-template Mermaid catalog

The reviewed ARCH-HOST Mermaid diagrams are now reusable skill resources rather than project-only examples:

- `mermaid-system-context-template.mmd`: boundary/actor view, 3 shapes, 3 edges, 2 bidirectional.
- `mermaid-logical-architecture-template.mmd`: responsibility/component view, 26 shapes, 19 edges, 4 bidirectional, 3 lanes, 5 nested sections.
- `mermaid-operational-scenario-template.mmd`: ordered runtime view, 33 shapes, 41 one-way edges, 3 phases.

`mermaid-template-manifest.json` stores the machine-readable golden counts and diagram-selection intent. `audit_mermaid_templates.py` renders each template from source, reparses SVG, validates semantic direction, compares structural counts, generates both Office Scripts twice, checks deterministic equality, and runs the Office Script validators. `mermaid-invalid-direction-fixtures.json` proves that request/response one-way, event bidirectional, and operational bidirectional cases continue to fail.

The skill now requires choosing exactly one of the three reasoning patterns before authoring Mermaid. Project identifiers and labels may change, but the selected diagram's purpose, hierarchy, edge-direction rules, and validation contract must remain coherent.
