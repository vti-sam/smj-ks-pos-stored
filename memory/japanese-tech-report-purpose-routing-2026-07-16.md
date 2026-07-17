---
title: Japanese Tech Report chuyển sang routing theo mục đích giao tiếp
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session 2026-07-16
  - skills/doc-authoring/japanese-tech-report/SKILL.md
  - skills/doc-authoring/japanese-tech-report/references/mode-decision-negotiation.md
tags:
  - japanese-tech-report
  - communication-purpose
  - scope-alignment
  - decision-negotiation
scope: historical
captured_at: 2026-07-16
validity: historical_context
promote_to_knowledge: false
---

# Bối cảnh

Skill trước đây dùng cấu trúc report nói miệng làm mặc định. Khi yêu cầu thực tế là phân chia task, trách nhiệm vendor hoặc phạm vi implementation, output dễ trở thành báo cáo công việc của VTI thay vì phục vụ quyết định của cuộc họp.

# Thay đổi đã thống nhất

- Thêm `Pre-Draft Discovery Gate`: với report/cuộc họp nhiều nội dung, skill phải lấy dữ liệu sẵn có từ prompt và source-of-truth trước; nếu vẫn thiếu dữ kiện có thể làm thay đổi cấu trúc hoặc quyết định, phải hỏi một batch câu hỏi thích ứng và chờ User trả lời.
- Không kích hoạt questionnaire cho dịch một câu, sửa câu ngắn hoặc khi đầu vào đã đủ.
- Chọn mode từ hành động cần có ở người nghe trước khi chọn văn phong hoặc template.
- Tách sáu mode: status report, work/knowledge explanation, alignment, decision/negotiation, escalation và handover.
- Với scope division hoặc ownership, outer flow bắt buộc là decision/negotiation; status và technical explanation chỉ là bằng chứng hỗ trợ.
- Hỗ trợ composite mode: ví dụ primary là decision/negotiation, supporting là status report. Khi đó phải trình bày completed work, remaining work, blocker và overlap theo từng task trước các câu hỏi xin quyết định.
- Flow quyết định phải xác định decision target, authority, facts, overlap, options, impacts, decision request, owner, timing và nơi ghi nhận.
- Giữ tên invocation `japanese-tech-report` để tương thích, nhưng đổi display name và nội dung thành Japanese Tech Communication.

# Verify

- Skill system validator: pass.
- Skill quality evaluator: 88.1, failed evidence bằng 0.
- Rule lint và workspace verify: pass.
