---
title: Draw.io Transparent Edge Labels
project: smj-ks-pos
type: lesson
status: archived
source:
  - Codex session on 2026-06-23
  - skills/drawio-create/scripts/structured_diagram.py
  - skills/drawio-create/scripts/create_drawio.py
tags:
  - drawio
  - edge-label
  - transparent-background
scope: historical
captured_at: 2026-06-23
validity: historical_context
promote_to_knowledge: false
---

`skills/drawio-create` was updated so inline/edge labels use transparent backgrounds.

Structured YAML SVG preview no longer draws a white rectangle behind edge labels. The generated `.drawio` edge styles include `labelBackgroundColor=none;labelBorderColor=none;`.

The Mermaid converter `create_drawio.py` also adds the same draw.io label style to default and dashed/error edges.

Verified with:

```bash
rtk uv run --with pyyaml python skills/drawio-create/scripts/structured_diagram.py scratch/arch01_structured_layout.yaml --svg scratch/arch01_transparent_label_run.svg --drawio scratch/arch01_transparent_label_run.drawio --qa scratch/arch01_transparent_label_run.qa.json --fail-on-lint
rtk uv run --with-requirements requirements.txt python skills/drawio-create/scripts/create_drawio.py scratch/drawio_edge_label_transparent_test.md scratch/drawio_edge_label_transparent_test.drawio
```
