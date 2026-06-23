---
title: Draw.io White Edge Labels and Semantic Bundles
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
  - line-bundling
  - structured-yaml
scope: historical
captured_at: 2026-06-23
validity: historical_context
promote_to_knowledge: false
---

`skills/drawio-create` was corrected after review:

- Inline and edge labels should use a white background for readability, not transparent text.
- Structured YAML should not group lines only because they share a source, target, or lane.
- Bundled trunk and branch routes should be generated only when the YAML provides `bundle`, `fanout`, `fanin`, or a shared semantic `flow`.
- Three or more unbundled parallel edges now produce a soft `parallel_edges_may_need_bundle` warning instead of auto-grouping.

Verified with:

```bash
rtk uv run --with pyyaml python skills/drawio-create/scripts/structured_diagram.py scratch/arch01_structured_layout.yaml --svg scratch/arch01_white_label_semantic_bundle.svg --drawio scratch/arch01_white_label_semantic_bundle.drawio --qa scratch/arch01_white_label_semantic_bundle.qa.json --fail-on-lint
rtk uv run --with pyyaml python skills/drawio-create/scripts/structured_diagram.py scratch/drawio_bundle_fanin_test.yaml --svg scratch/drawio_unbundled_parallel_test.svg --drawio scratch/drawio_unbundled_parallel_test.drawio --qa scratch/drawio_unbundled_parallel_test.qa.json --fail-on-lint
rtk uv run --with pyyaml python skills/drawio-create/scripts/structured_diagram.py scratch/drawio_flow_bundle_fanin_test.yaml --svg scratch/drawio_flow_bundle_fanin_test.svg --drawio scratch/drawio_flow_bundle_fanin_test.drawio --qa scratch/drawio_flow_bundle_fanin_test.qa.json --fail-on-lint
```
