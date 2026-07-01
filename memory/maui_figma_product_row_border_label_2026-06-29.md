---
title: MAUI Figma product row Border label rendering gotcha
project: smj-ks-pos
type: gotcha
status: archived
source:
  - Codex session 2026-06-29 demo Figma visual compare patch
  - sources/tabletposboilerplate/TabetPos.Applications/Presentation/Views/DemoFigmaPage.xaml
  - scratch/demo-figma-compare-patched/contact-content-no-system-bars.png
tags:
  - maui
  - xaml
  - ios
  - figma-demo
  - visual-compare
scope: historical
captured_at: 2026-06-29
validity: historical_context
promote_to_knowledge: false
---

During the demo Figma compare pass, labels nested as direct content inside `Border` controls in a `CollectionView` item template did not render visibly on the iPad simulator, even when static text was used. The background rectangles were visible but chip labels such as `型番`, `メーカー`, `JAN`, note text, and the circle count were missing.

The working pattern was to use a `Grid` with a `Border` for background/stroke and a sibling `Label` overlay. This preserved the Figma chip appearance while making the text render consistently in the MAUI iOS simulator.

Search dialog overlay was also adjusted to keep the real iOS status bar visible while moving the dialog top padding from `20` to `0`, which better matched the Figma content area without covering system-owned UI.
