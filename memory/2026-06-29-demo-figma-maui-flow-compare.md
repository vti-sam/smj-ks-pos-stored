---
title: Demo Figma MAUI Flow Compare Iteration
project: smj-ks-pos
type: lesson
status: archived
source:
  - Codex session on 2026-06-29
  - scratch/demo-figma-compare/metrics.csv
  - scratch/demo-figma-sim/
  - scratch/demo-figma-baseline/
tags:
  - maui
  - ios
  - figma
  - simulator
  - visual-compare
scope: historical
captured_at: 2026-06-29
validity: historical_context
promote_to_knowledge: false
---

# Demo Figma MAUI Flow Compare Iteration

Implemented a demo Figma flow in `sources/tabletposboilerplate` and iterated with simulator screenshots against Figma node screenshots.

Useful gotchas:

- Simulator screenshots are portrait framebuffer images; normalize by rotating `-90` and resizing to `1133x744`.
- The iOS status bar is system-owned. For this demo page, do not draw a fake status bar in XAML.
- MAUI Shell still applies visual safe-area behavior on iPad simulator; the demo root uses a small negative margin to align with the Figma frame while leaving the system status bar visible.
- Product screen header is taller than staff screen header: staff uses `94`, product uses `128`.
- Search dialog Figma geometry is `x=20 y=20 w=1093 h=704`; using a fixed `HeightRequest=704` and `TranslationY=-24` improved alignment.
- Final simulator compare metrics after the latest iteration:
  - staff full mean_abs `5.1703`, content `4.4944`
  - choice dialog full `5.1076`, content `4.7327`
  - product full `12.8712`, content `12.4519`
  - search dialog full `13.8145`, content `13.4236`

Remaining visual drift is mostly font weight/rendering, glyph fallback icons, and product item micro-layout rather than navigation or gross geometry.
