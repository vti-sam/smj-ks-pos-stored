---
title: Create XAML POS UI skill workflow
project: smj-ks-pos
type: runbook
status: archived
source:
  - Codex session 2026-06-29 skill creation
  - skills/create-xaml-pos-ui/SKILL.md
  - skills/create-xaml-pos-ui/references/figma-to-maui-pos-workflow.md
tags:
  - maui
  - xaml
  - pos-ui
  - figma
  - visual-compare
scope: historical
captured_at: 2026-06-29
validity: historical_context
promote_to_knowledge: false
---

Created project-local skill `skills/create-xaml-pos-ui/` for implementing and refining .NET MAUI POS XAML screens from Figma.

The skill codifies the demo Figma workflow lessons:

- Extract Figma semantic node properties before coding, not just screenshots.
- Audit every visible node for bounds, fill, stroke, effect, radius, text, icon, and layout mapping.
- Treat iOS status bar and bottom home/navigation area as system-owned unless explicitly required.
- Use top shadow/elevation for normal app footer/navigation bars and divider lines for dialog footers.
- Export exact Figma icons as SVG, keep SVG dimensions out of the asset, and set icon size in XAML.
- Use Noto Sans JP Medium/Bold for Japanese POS UI when Figma uses Noto.
- Build, click through simulator/device flow, capture each state, normalize screenshots, compare against Figma, then iterate until checklist rows are closed.
