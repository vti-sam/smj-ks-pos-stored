---
title: Business Flow Excel PDF fit must preserve drawing shapes
project: smj-ks-pos
type: gotcha
status: archived
source:
  - Codex session 2026-07-08
  - skills/business-flow-excel/scripts/render_business_flow.py
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/draft/ARCH-HOST-01_5.1_全体構成図.xlsx
tags:
  - business-flow-excel
  - pdf-preview
  - xlsxwriter
  - drawingml
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

When generating a one-page PDF preview for a Business Flow Excel sheet, do not post-process the workbook with openpyxl to set page setup. In this session, openpyxl preserved cells and embedded images but dropped xlsxwriter drawing shapes/connectors, so the PDF lost process boxes and lines.

Use the renderer-level `print_fit: one_page` option instead. It applies landscape A3, fit-to-one-page, margins, and print area through xlsxwriter before the workbook is closed, preserving connector shapes and icon images for LibreOffice PDF export.

Verification:

- `ARCH-HOST-01_5.1_全体構成図.pdf` exported as a single A3 page.
- Preview retained process boxes, connectors, the `host_device_config.json` config-file icon, and the three peripheral device icons.
