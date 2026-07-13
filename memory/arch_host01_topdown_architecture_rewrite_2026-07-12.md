---
title: ARCH-HOST-01 top-down architecture rewrite and Mermaid visual correction
project: smj-ks-pos
type: architecture
status: archived
source:
  - Codex session 2026-07-12
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/draft/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書_v0.3.0.md
tags:
  - ARCH-HOST-01
  - Basic Design
  - top-down architecture
  - Mermaid
scope: historical
captured_at: 2026-07-12
validity: historical_context
promote_to_knowledge: false
---

# Kết quả

Bản nháp 0.3.0 được viết lại theo luồng hệ thống tổng quát → Level 2 nhóm trách nhiệm → Level 3 cấu thành logic → kịch bản vận hành → chức năng → hợp đồng chi tiết → mapping triển khai.

Ba Mermaid có vai trò riêng:

1. `5.1.1 システムコンテキスト図` chỉ thể hiện ba miền trách nhiệm và giao tiếp giữa chúng.
2. `5.1.2 論理構成図` thể hiện Level 2, Level 3 và hai nguồn cấu hình.
3. `6.1 運用シナリオ図` thể hiện khởi động, thao tác đồng bộ, event bất đồng bộ và kết thúc.

# Gotcha

Mermaid hợp lệ về cú pháp vẫn có thể bố trí sai thứ tự trực quan hoặc tô sai ý nghĩa đường nối khi `linkStyle` dùng chỉ số cũ. Sau mỗi lần thay đổi cạnh phải render lại ảnh, kiểm tra thứ tự miền trách nhiệm, hướng mũi tên và màu từng loại đường. Với sơ đồ logic này, `flowchart RL` kết hợp thứ tự khai báo cạnh thiết bị đảo chiều và mũi tên hai chiều giúp ảnh hiển thị đúng từ trái sang phải: ứng dụng POS → connector → thiết bị.

Mapping `デバイス制御設定管理` không thuộc `F-HOST-009`; đây là điều kiện cấu hình phía ứng dụng và không được gán một `F-HOST` độc lập trong bản này.

# Kiểm tra

Ba Mermaid render thành công và được kiểm tra bằng ảnh. Markdown lint, strict Basic Design gate chung, liên kết `関連シート`, tập `F-HOST-001` đến `F-HOST-011`, marker phát hành và `git diff --check` đều đạt.
