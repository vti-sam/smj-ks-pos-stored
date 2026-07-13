---
title: Basic Design skill changed from ARCH-HOST template to content-driven authoring method
project: smj-ks-pos
type: decision
status: archived
source:
  - User decision 2026-07-12
  - skills/doc-authoring/basic-design-authoring/SKILL.md
  - skills/doc-authoring/basic-design-authoring/references/document-architecture-thinking.md
  - skills/doc-authoring/basic-design-authoring/scripts/basic_design_gate.py
tags:
  - Basic Design
  - skill
  - document architecture
  - customer-facing Japanese
scope: historical
captured_at: 2026-07-12
validity: historical_context
promote_to_knowledge: false
---

# Kết quả

`basic-design-authoring` không còn dùng ARCH-HOST làm cấu trúc mặc định. Skill bắt đầu từ quyết định của người review và evidence, sau đó phân tích context, responsibility, decomposition, runtime behavior, functional contract, detailed contract và physical trace ở nội bộ.

Các bước phân tích nội bộ không được xuất hiện trong deliverable chính thức. Gate chung từ chối `Level 1/2/3`, numbered `レベル`, `top-down` và `coverage matrix`; thuật ngữ kỹ thuật `ログレベル` vẫn hợp lệ.

Số lượng Mermaid, tên chương và số sheet được chọn theo câu hỏi review. Mỗi fact có một section sở hữu; nội dung chỉ lặp có chủ đích dưới dạng kết luận, điều kiện trong flow, contract chính xác hoặc mapping truy vết.

Profile `arch-host` chỉ còn kiểm tra facts và terminology của domain, không ép sheet name, đúng ba Mermaid hoặc lifecycle layout cũ.

# Forward-test

Skill được thử với dịch vụ đồng bộ tồn kho cửa hàng. Kết quả tự tạo cấu trúc theo queue, idempotency, offline operation, retry/recovery, asynchronous reconciliation và đề xuất sáu diagram có câu hỏi review riêng. Output không sao chép ARCH-HOST, không dùng `Level 1/2/3` và không ép bộ ba Mermaid.

# Kiểm tra

Skill quick validation, 5 unit tests, Python compile, Markdown lint, generic gate, ARCH-HOST profile, rule lint, workspace verify và skill-quality evaluator đều đạt. Evaluator đạt 86.4 với 0 failed evidence.
