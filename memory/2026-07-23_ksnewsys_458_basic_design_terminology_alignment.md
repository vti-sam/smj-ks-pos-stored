---
title: KSNEWSYS-458 thống nhất thuật ngữ Device Control theo ARCH-HOST
project: smj-ks-pos
type: decision
status: archived
source:
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
  - project-store/artifacts/reports/architecture/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図/draft/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図.md
  - project-store/artifacts/reports/implementation-examples/EX-DEVICE-01_次世代POS_デバイス制御実装例集/draft/EX-DEVICE-01_次世代POS_デバイス制御実装例集.md
  - project-store/artifacts/deliverables/KSNEWSYS-458_device-control/
tags:
  - KSNEWSYS-458
  - basic-design
  - terminology
  - device-control
scope: historical
captured_at: 2026-07-23
validity: historical_context
promote_to_knowledge: false
---

# Kết quả

ARCH-DEVICE và EX-DEVICE bản 0.4.6 dùng nhất quán thuật ngữ và semantic palette của ARCH-HOST:

- tên logic là `デバイス制御層`; chỉ ghi `デバイス制御層（DeviceCtrl）` tại vị trí mapping với code;
- dùng `デバイスコネクタ`, `ドロア`, `カスタマディスプレイ`, `タブレットPOS端末アプリ`, `アプリケーション層` và `OPOS／OCX`;
- phân biệt `コマンド通信用パイプ` với `イベント通知用パイプ`;
- giữ nguyên identifier kỹ thuật như `TabetPos.DeviceCtrl`, `DeviceManager`, tên class và tên file trong phần mapping/code.

Màu được định nghĩa tại `凡例` của từng Markdown và truyền nguyên trạng sang Mermaid, workbook và Office Script:

- ARCH dùng màu vùng ứng dụng, cấu thành logic, device connector, peripheral, comment và connector của ARCH-HOST;
- EX dùng màu application processing, control processing, phase, decision và error của operational scenario trong ARCH-HOST;
- validator không blacklist một mã màu cụ thể; nó kiểm tra màu được truyền qua tham số tạo từ `凡例`.

# Deliverable

Folder chính thức chứa hai workbook và bốn Office Script:

- `project-store/artifacts/deliverables/KSNEWSYS-458_device-control/`

Đã đọc ngược đủ 29 sheet, xác nhận đúng thứ tự, metadata bản 0.4.6, không còn thuật ngữ cũ, không lộ Mermaid source và giữ đúng quy tắc merge của bảng nền tảng. Bốn Office Script không chứa màu ngoài `凡例` và tái sinh byte-for-byte.
