---
title: Basic Design legend composite color black fallback
project: smj-ks-pos
type: gotcha
status: archived
source:
  - skills/doc-authoring/basic-design-excel/scripts/basic_design_render.py
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
tags:
  - basic-design-excel
  - legend
  - color
  - Excel
  - ARCH-HOST-01
scope: historical
captured_at: 2026-07-13
validity: historical_context
promote_to_knowledge: false
---

The `補足コメント` legend row used the composite color value `#FFF2CC / 70%透過`. The Basic Design Excel renderer accepted only one six-digit color and silently fell back to black, causing the official workbook sample to render with fill `FF000000`.

ARCH-HOST-01 version `0.3.2` separates the fields: the color column contains only `#FFF2CC`, while `70%透過` is stated in the meaning. The legend renderer now rejects invalid composite colors instead of falling back and renders comment samples with `#FFF2CC` fill, `#BF9000` border, and `#404040` font.

Workbook read-back confirmed `FFFFF2CC` fill, `FFBF9000` border, and `FF404040` font on `05_全体構成_01!B17`, with version `0.3.2` on the cover and revision history.
