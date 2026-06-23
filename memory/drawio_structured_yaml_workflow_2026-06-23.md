---
title: Draw.io Structured YAML Workflow
project: smj-ks-pos
type: runbook
status: archived
source:
  - Codex session on 2026-06-23 updating skills/drawio-create after ARCH-01 arrow routing issues
tags:
  - drawio
  - diagram
  - yaml
  - visual-qa
scope: historical
captured_at: 2026-06-23
validity: historical_context
promote_to_knowledge: false
---

`skills/drawio-create` was updated with a structured YAML workflow for complex architecture diagrams.

Key point: do not use Mermaid or drawio auto-layout as the final layout source for architecture diagrams with many containers, device groups, command/event paths, or legacy paths. Use `skills/drawio-create/scripts/structured_diagram.py` to render SVG, generate editable `.drawio`, and emit QA JSON. Run with `--fail-on-lint` and iterate YAML/router until QA passes before sending any PNG/SVG for user review.

The QA check catches edge segments crossing unrelated nodes and labels overlapping nodes. This was added because visual review of ARCH-01 showed lines crossing `直接接続制御` and other blocks even after earlier manual fixes.
