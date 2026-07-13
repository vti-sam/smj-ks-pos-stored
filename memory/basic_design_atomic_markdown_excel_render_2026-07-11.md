---
title: Basic Design atomic Markdown-to-Excel render
project: smj-ks-pos
type: lesson
status: archived
source:
  - skills/doc-authoring/basic-design-excel/scripts/basic_design_render.py
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
tags:
  - basic-design
  - excel
  - renderer
  - revision-history
scope: historical
captured_at: 2026-07-11
validity: historical_context
promote_to_knowledge: false
---

# Basic Design atomic Markdown-to-Excel render

Workbook chính thức từng bị mất dòng lịch sử cũ khi vá trực tiếp sau render. Renderer đã được đổi sang quy trình dựng file tạm, kiểm tra ngữ nghĩa, rồi thay file đích bằng thao tác nguyên tử.

Kiểm tra bắt buộc gồm tên và thứ tự sheet, phiên bản bìa so với dòng lịch sử mới nhất, toàn bộ dòng của bảng bìa và lịch sử, các cặp nhãn/ý nghĩa trong `汎用`, cùng ký tự xuống dòng lỗi. Nếu kiểm tra thất bại, file Excel chính thức trước đó được giữ nguyên.

Nội dung workbook phải sửa tại Markdown rồi render lại. Không vá lịch sử phiên bản hoặc legend trực tiếp trong workbook chính thức.
