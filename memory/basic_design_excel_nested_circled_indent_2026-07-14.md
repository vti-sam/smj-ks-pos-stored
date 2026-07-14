---
title: Basic Design Excel nested circled-number indentation
project: smj-ks-pos
type: lesson
status: archived
source:
  - skills/doc-authoring/basic-design-excel/scripts/basic_design_render.py
  - skills/doc-authoring/basic-design-excel/scripts/test_basic_design_render.py
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.xlsx
tags:
  - basic-design
  - excel
  - renderer
  - indentation
scope: historical
captured_at: 2026-07-14
validity: historical_context
promote_to_knowledge: false
---

# Basic Design Excel nested circled-number indentation

Renderer Basic Design phải phân biệt hai cấp danh sách trong phần thuyết minh:

- Nhãn cha dạng `①`, `②`, `③` bắt đầu từ cột C.
- Nhãn con dạng `①-1`, `②-2`, `③-3` bắt đầu từ cột D.
- Dòng `関連シート:` kế thừa cùng mức thụt của item đánh số gần nhất phía trước, kể cả khi có dòng trống ngăn cách.
- Quy tắc áp dụng cho cả dấu gạch ASCII `-` và full-width `－`.

Ngày 2026-07-14, `list_indent_columns()` và context thụt lề được thêm vào renderer, kèm regression test kiểm tra cột C/D. Workbook ARCH-HOST-01 sau khi render có 16 cặp item–`関連シート:` trong sheet `05_全体構成_02`; tất cả cặp đều bắt đầu cùng cột.
