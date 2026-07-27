---
title: KSNEWSYS-458 connector label dùng nền trắng
project: smj-ks-pos
type: decision
status: archived
source:
  - project-store/artifacts/reports/architecture/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図/draft/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図.md
  - project-store/artifacts/reports/implementation-examples/EX-DEVICE-01_次世代POS_デバイス制御実装例集/draft/EX-DEVICE-01_次世代POS_デバイス制御実装例集.md
  - project-store/artifacts/deliverables/KSNEWSYS-458_device-control/
tags:
  - KSNEWSYS-458
  - office-script
  - connector-label
  - basic-design
scope: historical
captured_at: 2026-07-23
validity: historical_context
promote_to_knowledge: false
---

# Kết quả

Hai sơ đồ chính thức của ARCH-DEVICE và EX-DEVICE sử dụng text-box nền trắng, không viền cho nhãn nằm giữa connector. Nhãn được group trực tiếp với connector; comment bổ sung của component vẫn dùng khung vàng bán trong suốt riêng.

`凡例` trong hai Markdown khai báo `背景:#FFFFFF / 枠線:透明`. Mỗi sơ đồ có hai Office Script chính thức:

- Script chính tạo sheet mới, vẽ node/connector và gán Alt Text.
- Script `.labels.office-script.ts` chạy trên sheet sơ đồ đang active, quét danh sách shape một lần rồi tạo label/comment theo Alt Text. Script không tạo hoặc xóa sheet; các group đã tồn tại được bỏ qua khi chạy lại.

Workbook giữ nguyên vì lần tách script này không thay đổi nội dung Markdown hoặc quy cách màu đã được render trước đó.

# Kiểm tra

- ARCH-DEVICE: audit đủ 24 shape và 21 edge.
- EX-DEVICE: audit đủ 24 shape và 24 edge.
- Bốn Office Script sinh lặp lại byte-identical và qua validator.
- Read-back hai workbook xác nhận ô `コネクターラベル` có solid fill `FFFFFFFF`.
