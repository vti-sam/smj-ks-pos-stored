---
title: ARCH-HOST-01 three-Mermaid integrated operation design
project: smj-ks-pos
type: decision
status: archived
source:
  - User decision 2026-07-11
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
  - skills/doc-authoring/basic-design-authoring/SKILL.md
tags:
  - Basic Design
  - Mermaid
  - lifecycle
  - error handling
  - Excel
scope: historical
captured_at: 2026-07-11
validity: historical_context
promote_to_knowledge: false
---

# Kết quả

ARCH-HOST-01 phiên bản 0.2.26 được rút gọn còn đúng ba Mermaid:

1. `5.1.1 全体概要図` trả lời phạm vi và luồng chính giữa ba miền trách nhiệm.
2. `5.1.2 詳細構成図` thể hiện các component ①〜⑲, process boundary, named pipe và các luồng phụ.
3. `6.1 通常運用フロー図` tích hợp toàn bộ startup, device operation và shutdown thành một runtime story.

Phần `09_ライフサイクル設計` chỉ giữ contract chi tiết bằng prose; không có lifecycle Mermaid riêng. Excel chính và baseline Excel của skill đều được render lại thành 23 sheet.

# Ngữ nghĩa chính của 6.1

- Startup: ưu tiên operational configuration, fallback sang initial configuration, dừng app nếu cả hai lỗi; kiểm tra/khởi động connector process; retry khởi động device tối đa 3 lần cách 50 ms; HealthCheck tối đa 10 giây cách 500 ms.
- Operation: retry kết nối trước khi gửi tối đa 3 lần cách 500 ms; không tự gửi lại sau khi request đã gửi; phân biệt communication failure với returned failure response; reconnect event pipe sau 1 giây.
- Shutdown: chỉ dừng owned process; ghi nhận lỗi Kill nhưng tiếp tục monitor; chờ tối đa 10 giây rồi force-terminate process tree.

# Quy tắc skill tái sử dụng

Basic Design cho connector/device nên ưu tiên portfolio ba sơ đồ: overview, detailed architecture và phased normal-operation flow. Chỉ tạo lifecycle diagram riêng khi nó kể một runtime story thực sự khác. Các nhánh lỗi làm đổi control flow phải xuất hiện trong Mermaid hoặc `図の補足`; error catalog đầy đủ nằm ở phần chi tiết.

Strict gate kiểm tra đúng ba Mermaid, ba phase vận hành, các outcome lỗi chính và nhánh configuration fallback khi tài liệu có quy tắc dừng app do lỗi cấu hình.

Basic Design Excel renderer mặc định ghi workbook cạnh Markdown với cùng basename. `draft/` chỉ dùng khi caller truyền output path preview rõ ràng.

# Kiểm tra

Markdown gate, renderer validation, skill quick validation, Python compile, SVG XML validation, Mermaid visual review, workbook marker/formula scans, workbook ZIP integrity và visual review của 23 sheet đều đạt.
