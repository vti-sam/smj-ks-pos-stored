---
title: Program Spec return content rule
project: smj-ks-pos
type: runbook
status: archived
source:
  - Codex session 2026-06-29 program spec return content update
  - skills/program-spec-excel/references/markdown-schema.md
tags:
  - program-spec
  - excel
  - return-value
scope: historical
captured_at: 2026-06-29
validity: historical_context
promote_to_knowledge: false
---

Program Spec Markdown phải ghi `戻り値内容` ngay sau dòng `戻り値` trong bảng `項目/内容` của mỗi `メソッド詳細`. Dòng này là source cho cột Excel `戻り値・内容`; không sửa Excel thủ công vì lần render sau sẽ mất.

Với constructor hoặc `void`, dùng `-`. Với `Task`, dùng `非同期処理の完了を表すタスク。`. Với kiểu trả về khác, mô tả kết quả được trả về dựa trên `概要` hoặc hành vi đã xác minh.

Validator `japanese-class` đã bắt lỗi thiếu `戻り値内容`; 33 Program Spec hiện tại đã được cập nhật và render lại workbook chính thức cạnh Markdown.
