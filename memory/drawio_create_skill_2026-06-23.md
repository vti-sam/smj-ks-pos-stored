---
title: Draw.io Create Skill Implementation
project: smj-ks-pos
type: runbook
status: archived
source:
  - Codex session implementing skills/drawio-create
  - skills/drawio-create/SKILL.md
  - skills/drawio-create/scripts/create_drawio.py
  - Codex session 2026-06-23 Visual QA workflow update
  - Codex session 2026-06-23 ARCH-01 Host architecture redraw
tags:
  - drawio
  - mermaid
  - report-diagram
  - skill
  - visual-qa
scope: historical
captured_at: 2026-06-23
validity: historical_context
promote_to_knowledge: false
---

Created repo-local `drawio-create` skill for generating editable `.drawio` report diagrams from Markdown or raw Mermaid.

Key implementation notes:

- Style and layout rules are embedded in `SKILL.md` and `scripts/create_drawio.py`; runtime does not read existing `.drawio` files for style.
- Script uses `drawpyo` for file/page/object/edge generation, then patches generated XML style strings by object id because `drawpyo==0.2.5` blocks some Draw.io style attributes such as `container` and `endFill` through property setters.
- Supported v1 Mermaid inputs are `flowchart`, `graph`, and `sequenceDiagram`.
- AWS nodes are detected through labels like `aws:ec2\nweb`, `aws:alb\nALB`, and mapped to `mxgraph.aws4.*` style constants.
- Smoke test used `/tmp/drawio-create-smoke.md` and verified generated XML parses, includes AWS4 styles, and preserves canonical report colors.
- Workflow now requires exporting PNG/SVG for report/review diagrams and visually checking the rendered image. XML/text checks alone are insufficient because edge routing can still create misleading arrows, overlap, or cramped labels.
- Workflow now also requires a Mermaid review gate for report/review or architecture diagrams: generate Mermaid raw first, send it to the user for review, and only create/export `.drawio` after explicit approval. The PNG/SVG Visual QA loop remains mandatory after drawio generation.
- For reviewed architecture diagrams, Mermaid is the content source-of-truth. The `.drawio` output must keep the same subgraphs, node IDs/labels, and edges; only visual arrangement, swimlane sizing, and connector waypoints may change. Do not add helper nodes, hardware rows, or extra section titles that are not present in the approved Mermaid.
- In this environment, system Python may not have `drawpyo` installed and may reject global `pip install` due PEP 668. Do not skip the converter. Run it with `rtk uv run --with-requirements requirements.txt python skills/drawio-create/scripts/create_drawio.py ...`, then post-process the converted `.drawio` by Mermaid IDs for geometry/style/waypoints only.
- `create_drawio.py` now preserves Mermaid node/subgraph IDs and generated edge IDs in the raw `.drawio`; downstream layout scripts should map by these IDs, not by visible labels.
