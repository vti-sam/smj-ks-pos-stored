---
title: Report render Draw.io preflight
project: smj-ks-pos
type: runbook
status: archived
source:
  - Codex session 2026-06-29 report renderer skill update
  - skills/report-artifact-common/scripts/refresh_drawio_exports.py
tags:
  - reports
  - drawio
  - docx
  - excel
scope: historical
captured_at: 2026-06-29
validity: historical_context
promote_to_knowledge: false
---

Khi render report từ Markdown sang DOCX hoặc Excel, nếu Markdown tham chiếu ảnh `.svg` hoặc `.png` và trong cùng report bundle có file `.drawio` cùng basename, renderer phải refresh ảnh từ `.drawio` trước khi build.

Helper chung được thêm tại `skills/report-artifact-common/scripts/refresh_drawio_exports.py`. Các renderer đã được móc preflight gồm `docx-builder`, `program-spec-excel`, `db-table-excel`, `testcase-excel`, `checklist-excel`, và `estimate-excel`. `excel-convert-ai` là chiều Excel sang Markdown nên chỉ ghi rule routing, không tự render ngược.

Trong lượt này đã render lại `ARCH-03_タブレットPOS_コネクタサーバー構造設計書.docx` và 11 file `PS-HOST-*.xlsx`. Verify đã gồm py_compile, unit test các renderer Excel, DOCX render sang ảnh, read-back DOCX text/content type, và read-back sheet names của 11 workbook.
