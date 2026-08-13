---
title: Basic Design 78-workbook profile export
project: smj-ks-pos
type: lesson
status: archived
source:
  - outputs/019fdcdd-e3e5-7ec3-b9e9-db9ff1124bb2/basic-design-all-profiles/
  - scratch/basic-design-full-audit-20260810/summary.md
  - scratch/basic-design-full-audit-20260810/tip-source-audit.md
  - scratch/basic-design-full-audit-20260810/maui-pos-audit.md
  - scratch/basic-design-full-audit-20260810/device-connector-pos-audit.md
tags:
  - basic-design
  - spring-web
  - maui-pos
  - device-connector-pos
  - excel
  - full-profile-export
scope: historical
captured_at: 2026-08-10
validity: historical_context
promote_to_knowledge: false
---

# Basic Design 78-workbook profile export

## Outcome

Đã xuất bộ Basic Design hiện tại thành 78 workbook Excel tại
`outputs/019fdcdd-e3e5-7ec3-b9e9-db9ff1124bb2/basic-design-all-profiles/`.
Bộ này giữ nguyên cây thư mục của ba profile `spring-web`, `maui-pos` và
`device-connector-pos`, mỗi profile có 26 workbook.

Đây là snapshot để review nội dung và format hiện tại, chưa phải bộ được phê
duyệt để giao khách hàng. Các workbook cần được render lại sau khi xử lý những
gap đã ghi trong full audit ngày 2026-08-10.

## Evidence

- Bản bàn giao có đúng 26 workbook và 152 worksheet cho mỗi profile, tổng cộng
  78 workbook và 456 worksheet.
- Relative path và SHA-256 của từng workbook trùng bản render đã audit trong
  `scratch/basic-design-full-audit-20260810/renders/`.
- ZIP integrity của 78 file đều hợp lệ; không có worksheet rỗng hoặc cell chứa
  `#REF!`, `#DIV/0!`, `#VALUE!` hay `#NAME?`.
- Báo cáo tổng tại `scratch/basic-design-full-audit-20260810/summary.md` liên kết
  tới ba ma trận 26 deliverable và visual evidence theo format family.

## Unresolved

- Mỗi profile còn 42 H5 marker, 4 control comment và 11 non-screen image
  directive bị render thành text; toàn bộ snapshot hiện có 0 embedded image.
- TIP mapping hiện là 13 `semantically-equivalent` và 13 `gap`, không phải
  cell-for-cell exact.
- MAUI và Connector thiếu durable per-difference migration ledger; Connector
  `外部インタフェース一覧` còn có body value lệch nghĩa so với header.
- Không dùng snapshot này làm customer-release artifact trước khi sửa các lỗi,
  render lại đủ 78 workbook và chạy lại semantic, raw-token, image và visual QA.

## Retrieval keys

- Basic Design 78 workbook export 2026-08-10
- outputs 019fdcdd basic-design-all-profiles
- spring-web maui-pos device-connector-pos Excel set
- 26 workbook per profile 456 sheets
- Basic Design full audit render snapshot
