---
title: Business-flow Excel PDF CJK browser fallback
project: smj-ks-pos
type: gotcha
status: archived
source:
  - Codex session 2026-07-13 ARCH-HOST-01 PDF and PNG regeneration
  - skills/doc-authoring/business-flow-excel/scripts/render_offline_pdf.py
tags:
  - business-flow-excel
  - PDF
  - Japanese
  - LibreOffice
  - Chrome
scope: historical
captured_at: 2026-07-13
validity: historical_context
promote_to_knowledge: false
---

# Result

The ARCH-HOST-01 offline SVG contained valid Japanese text, but the installed LibreOffice SVG importer substituted Verdana for the unavailable `Meiryo UI` and `Noto Sans CJK JP` fonts, causing most CJK glyphs to disappear from the PDF.

The offline renderer now prefers an installed Chromium-family browser. It captures the SVG at A3 aspect ratio with a 2x device scale, then packages the stable raster image onto one A3 PDF page. LibreOffice remains a fallback when no supported browser is available. Direct browser printing of the complex SVG was rejected because large render surfaces intermittently produced black regions; the two-step SVG screenshot and image-to-PDF path was stable.

Comment placement now treats visible connector-label boxes as obstacles and uses a deterministic review-grid fallback so required comments are not silently lost when adjacent positions are exhausted.

Final evidence:

- All three ARCH-HOST-01 PDFs are one-page A3.
- Japanese text remains visible in all three PDF-derived PNGs.
- Mermaid audits match `3/3`, `26/26`, and `33/33` shapes plus `3/3`, `19/19`, and `41/41` edges.
