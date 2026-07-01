---
title: Create XAML POS UI visual contact sheet requirement
project: smj-ks-pos
type: runbook
status: archived
source:
  - Codex session 2026-06-29 create-xaml-pos-ui skill update
  - skills/create-xaml-pos-ui/scripts/make_visual_contact_sheet.py
  - scratch/demo-figma-skill-script-smoke/contact-content-no-system-bars-preview.png
tags:
  - maui
  - xaml
  - figma
  - visual-regression
  - contact-sheet
  - heatmap
scope: historical
captured_at: 2026-06-29
validity: historical_context
promote_to_knowledge: false
---

Updated `skills/create-xaml-pos-ui/` so every Figma-to-MAUI POS visual comparison pass must output a comparison contact sheet.

Terminology:

- Visual regression testing: comparing UI screenshots over iterations.
- Screenshot diff / pixel diff: numeric and image-level comparison between baseline and app capture.
- Diff heatmap: red overlay showing where pixels differ.
- Comparison contact sheet: one consolidated image with rows for states/screens and columns for `Figma baseline`, `App capture`, and `Heatmap`.

The bundled script `skills/create-xaml-pos-ui/scripts/make_visual_contact_sheet.py` creates `contact-full.png`, `contact-content-no-system-bars.png`, preview images, per-screen heatmaps, normalized app captures, and `metrics.csv`.
