---
title: ARCH-HOST-01 final Office Scripts use active cell
project: smj-ks-pos
type: decision
status: archived
source:
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01.office-script-pdf-manifest.json
tags:
  - ARCH-HOST-01
  - Office Scripts
  - active cell
  - final artifact
scope: historical
captured_at: 2026-07-13
validity: historical_context
promote_to_knowledge: false
---

The six final ARCH-HOST-01 Office Script artifacts were adapted after pipeline generation so Excel does not show a parameter dialog. Their `main` functions accept only `workbook`, obtain the anchor through `workbook.getActiveCell()`, and obtain the worksheet from that anchor.

The shared generator, validator, golden resources, and manifest pipeline remain parameterized with explicit `sheetName` and `anchorAddress` for deterministic unattended generation and validation. Regenerating the final ARCH-HOST-01 artifacts through the manifest will restore the pipeline signatures, so the final active-cell adaptation must be reapplied as the last delivery step.
