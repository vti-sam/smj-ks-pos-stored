---
title: ARCH-HOST-01 đổi tên lớp ứng dụng và lớp điều khiển thiết bị
project: smj-ks-pos
type: architecture
status: archived
source:
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
  - Codex session 2026-07-13
tags:
  - ARCH-HOST-01
  - logical architecture
  - Excel
  - Office Script
scope: historical
captured_at: 2026-07-13
validity: historical_context
promote_to_knowledge: false
---

Trong sơ đồ logic 5.1.2, hai nhóm bên trong tiến trình ứng dụng được thống nhất thành:

- `① アプリケーション層（業務・プロセス管理）`
- `② デバイス制御層`

Thuật ngữ cũ `デバイスアクセス` đã được thay trong phần giải thích cấu trúc, luồng vận hành và thiết kế cấu hình để tránh lệch tên giữa sơ đồ và nội dung.

Markdown là nguồn chính. Workbook 15 sheet được tái tạo bằng `basic-design-excel`; ba bộ Office Script, PDF và PNG được tái sinh bằng manifest. Bản Office Script giao cuối tiếp tục lấy worksheet và anchor từ ô đang active theo yêu cầu người dùng.

Kết quả kiểm tra: lint/gate Markdown đạt, workbook không có lỗi công thức và không còn `デバイスアクセス`, audit Mermaid giữ nguyên 26 shape và 19 edge cho sơ đồ logic.
