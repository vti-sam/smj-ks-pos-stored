---
title: Business-flow Excel selective comment performance optimization
project: smj-ks-pos
type: gotcha
status: archived
source:
  - Codex session 2026-07-13 ARCH-HOST-01 selective comments and Office Scripts performance
  - skills/doc-authoring/business-flow-excel/scripts/generate_office_script.py
  - Microsoft Learn Office Scripts performance guidance
tags:
  - Office Scripts
  - performance
  - shape comments
  - getShapes
  - ARCH-HOST-01
scope: historical
captured_at: 2026-07-13
validity: historical_context
promote_to_knowledge: false
---

# Result

The show-labels generator had drifted from the offline PDF model. PDF output selected only `1 / 3 / 3` focused component comments for the context, logical architecture, and operational scenario diagrams, while the Excel script created one yellow callout for every component and fell back to the component title when no curated description existed.

The same script also called `sheet.getShapes()` from collision checks for every adjacent candidate and every review-grid cell. Office Scripts may synchronize with the workbook for each read, so this repeated API access inside loops dominated execution time.

The generator now:

- creates a shape comment only when the selected alt-text description is non-empty;
- uses the same `1 / 3 / 3` selected comment set as the PDF;
- never falls back to component titles or internal IDs;
- scans worksheet shapes exactly twice, once for cleanup and once for diagram candidates;
- caches non-line obstacle bounds as numeric arrays and appends new overlay bounds locally;
- performs all candidate and review-grid collision checks against local numbers without workbook API reads.

Generated ARCH-HOST-01 scripts retained active-cell execution in the six final artifacts. Template audits, Office Script validation, deterministic golden tests, PDF/PNG review, rule lint, knowledge lint, and workspace verification passed.

## Tối ưu tra cứu ID

Phần tra cứu còn lại có độ phức tạp bậc hai do quét toàn bộ `diagramShapes` và gọi lại `getName()` cho từng ID đã sắp xếp. Common handler hiện chỉ quét một lần sau cleanup để đồng thời:

- lưu `shapeIndexById[id] = index` chỉ bằng index số cục bộ;
- thu thập ID của edge và component để chỉ sắp xếp chuỗi;
- cache bounds dạng số của các obstacle không phải line.

Các vòng tạo overlay truy cập thẳng `diagramShapes[shapeIndexById[sourceId]]`. Script không alias `ExcelScript.Shape`, không gọi Office API trong `Array.sort`, và không còn quét lồng `diagramShapes`.
