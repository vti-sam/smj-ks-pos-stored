---
title: Draw.io Markdown Review Gate
project: smj-ks-pos
type: runbook
status: archived
source:
  - Codex task 2026-06-25 updating skills/drawio-create workflow
  - skills/drawio-create/SKILL.md
  - skills/drawio-create/references/structured-yaml-workflow.md
tags:
  - drawio-create
  - markdown-review
  - structured-yaml
  - output-folder
scope: historical
captured_at: 2026-06-25
validity: historical_context
promote_to_knowledge: false
---

`skills/drawio-create` now requires a Markdown review gate before creating YAML or Draw.io artifacts for report/review diagrams.

Workflow:

1. Create `output/<diagram_name>.review.md` with the diagram purpose, groups/nodes, relationships/flows, labels, notes, assumptions, and open questions.
2. Send the review Markdown content or file path to the user and stop.
3. After explicit approval, create `output/<diagram_name>.yaml` from the approved review Markdown.
4. Render SVG, Draw.io, QA JSON, and exported PNG/SVG under the same `output/` folder.

YAML is only the layout/routing implementation after content approval. The approved review Markdown is the content source-of-truth.
