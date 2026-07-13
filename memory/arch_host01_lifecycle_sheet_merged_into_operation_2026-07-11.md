---
title: ARCH-HOST-01 lifecycle sheet merged into normal operation
project: smj-ks-pos
type: decision
status: archived
source:
  - User decision 2026-07-11
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
  - skills/doc-authoring/basic-design-authoring/scripts/basic_design_gate.py
tags:
  - basic-design
  - lifecycle
  - normal-operation
  - arch-host
scope: historical
captured_at: 2026-07-11
validity: historical_context
promote_to_knowledge: false
---

# ARCH-HOST-01 lifecycle sheet merged into normal operation

Sheet `09_ライフサイクル設計` lặp lại phần khởi động và kết thúc của `06_通常運用フロー_02`, nên đã bị xoá khỏi tài liệu chính thức. Nội dung riêng cần giữ được chuyển như sau:

- Ranh giới trách nhiệm, process ownership và quy tắc quản lý process nằm trong phần mở đầu `6.2 通常運用`.
- Quy tắc bảo trì, debug, Start/Stop và Host restart nằm trong `6.2.5 保守・デバッグ時`.
- Menu và implementation mapping trỏ về `06_通常運用フロー_02`.

ARCH-HOST Basic Design dùng 22 sheet và đúng ba Mermaid. Gate từ chối việc thêm lại `09_ライフサイクル設計`, đồng thời yêu cầu `06_通常運用フロー_02` có ownership và phần bảo trì/debug.
