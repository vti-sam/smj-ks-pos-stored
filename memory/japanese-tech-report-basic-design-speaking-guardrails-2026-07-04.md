---
title: Japanese tech report basic design speaking guardrails
project: smj-ks-pos
type: gotcha
status: archived
source:
  - Codex session 2026-07-04
  - skills/japanese-tech-report/SKILL.md
  - skills/japanese-tech-report/references/customer-basic-design-speaking.md
tags:
  - japanese-tech-report
  - customer-facing
  - basic-design
  - skill
scope: historical
captured_at: 2026-07-04
validity: historical_context
promote_to_knowledge: false
---

# Ghi chú

Khi user yêu cầu dùng `japanese-tech-report` để chuẩn bị tiếng Nhật gửi khách hàng về basic design hoặc kiến trúc, không được dịch thẳng từ source/design note sang văn phong tài liệu. Phải tách hai bước: lấy fact từ source, sau đó viết lại thành câu nói ngắn, tự nhiên, có scope, boundary, lý do, flow, setting/lifecycle, test viewpoint và câu xin xác nhận.

Khi sửa skill, tránh vá theo một domain cụ thể như device connector. Rule phải triển khai ngang cho mọi basic design/architecture explanation. Nếu cần ví dụ, dùng placeholder hoặc ví dụ generic, và để terminology của project/source-of-truth thắng glossary chung.

Các guardrail đã được thêm vào `skills/japanese-tech-report/SKILL.md` và reference mới `skills/japanese-tech-report/references/customer-basic-design-speaking.md`.
