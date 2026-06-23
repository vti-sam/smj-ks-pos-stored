---
title: Draw.io Structured YAML Bundle Routes
project: smj-ks-pos
type: lesson
status: archived
source:
  - Codex session on 2026-06-23
  - skills/drawio-create/scripts/structured_diagram.py
  - scratch/drawio_bundle_fanin_test.qa.json
tags:
  - drawio
  - structured-yaml
  - diagram-qa
  - line-bundling
scope: historical
captured_at: 2026-06-23
validity: historical_context
promote_to_knowledge: false
---

`skills/drawio-create/scripts/structured_diagram.py` now supports bundled routes for structured YAML diagrams.

Use `bundle` with `bundle_mode: fanout` for one source to many targets, and `bundle_mode: fanin` for many sources to one target. Existing `fanout` remains a compatibility alias, and `fanin` is also supported.

The renderer defaults `layout_rules.auto_bundle` to true. Three or more unlabeled edges with the same source or target on bundle-capable lanes are auto-bundled into trunk and branch routes. QA emits `auto_bundle_applied` warnings when this happens. If `auto_bundle` is false, the same pattern becomes a `bundle_required` error.

ARCH-01 was verified with:

```bash
rtk uv run --with pyyaml python skills/drawio-create/scripts/structured_diagram.py scratch/arch01_structured_layout.yaml --svg scratch/arch01_skill_bundle_run.svg --drawio scratch/arch01_skill_bundle_run.drawio --qa scratch/arch01_skill_bundle_run.qa.json --fail-on-lint
```

Fan-in auto-bundle was verified with `scratch/drawio_bundle_fanin_test.yaml`; its QA output is `ok: true` with one `auto_bundle_applied` warning.
