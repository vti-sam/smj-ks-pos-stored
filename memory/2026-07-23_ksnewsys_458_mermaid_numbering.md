---
title: KSNEWSYS-458 Mermaid và Office Script dùng số thứ tự Basic Design
project: smj-ks-pos
type: decision
status: archived
source:
  - project-store/artifacts/reports/architecture/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図.md
  - project-store/artifacts/reports/implementation-examples/EX-DEVICE-01_次世代POS_デバイス制御実装例集/draft/EX-DEVICE-01_次世代POS_デバイス制御実装例集.md
  - project-store/artifacts/reports/architecture/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図/
  - project-store/artifacts/reports/implementation-examples/EX-DEVICE-01_次世代POS_デバイス制御実装例集/
tags:
  - KSNEWSYS-458
  - mermaid
  - office-script
  - numbering
  - basic-design
scope: historical
captured_at: 2026-07-23
validity: historical_context
promote_to_knowledge: false
---

# Kết quả

Hai sơ đồ chính thức của ARCH-DEVICE và EX-DEVICE dùng số thứ tự theo cấu trúc Basic Design ngay trong Mermaid:

- vùng hoặc phase cấp cao dùng `（1）`, `（2）`;
- thành phần trực tiếp dùng `①`, `②`;
- thành phần trong nhóm con dùng `①-1`, `①-2`.

Quy tắc áp dụng cho cả luồng chính, decision, kết quả, lỗi, fallback và node hoàn tất. Office Script giữ nguyên số trong shape text và Alt Text.

EX-DEVICE đồng bộ bảng trách nhiệm theo phase với các nhãn `（1）準備` đến `（5）結果返却`. ARCH-DEVICE giữ bảng quan hệ lớp với chuỗi `No` riêng vì các hàng mô tả quan hệ, không phải danh sách component.

# Kiểm tra

- ARCH-DEVICE: audit đủ 24 shape và 21 edge.
- EX-DEVICE: audit đủ 24 shape và 24 edge.
- Bốn Office Script sinh lặp lại byte-identical và qua validator.
- Markdown lint và Basic Design gate của cả hai tài liệu đều đạt.
