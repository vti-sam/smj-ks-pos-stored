---
title: Japanese tech report listener comprehension gate
project: smj-ks-pos
type: lesson
status: archived
source:
  - Codex session 2026-07-14
  - skills/doc-authoring/japanese-tech-report/SKILL.md
  - skills/doc-authoring/japanese-tech-report/references/customer-basic-design-speaking.md
tags:
  - japanese-tech-report
  - customer-facing
  - spoken-japanese
  - basic-design
  - semantic-rewrite
scope: historical
captured_at: 2026-07-14
validity: historical_context
promote_to_knowledge: false
---

# Kết quả

`japanese-tech-report` được bổ sung `Listener Comprehension Gate` để tránh trường hợp câu tiếng Nhật đúng ngữ pháp nhưng chỉ thay một thuật ngữ nguồn cứng bằng một danh từ kỹ thuật trừu tượng khác.

Trước khi chỉnh câu tiếng Nhật, mỗi ý kỹ thuật cần được chuyển về chuỗi ý nghĩa tối thiểu phù hợp với nội dung: tình huống hoặc hạn chế hiện tại, chủ thể, hành động hoặc tương tác cụ thể, và kết quả hoặc ảnh hưởng. Người nghe phải hình dung được ai làm gì, vì sao cần và điều gì trở nên khả thi; nếu chỉ có thể lặp lại các từ như `境界`, `互換性`, `抽象化` hoặc `責務分離` thì câu chưa đạt.

Nguyên tắc chung là giải thích hành vi dễ hiểu trước, sau đó mới thêm nhãn kỹ thuật khi cần mapping với tài liệu hoặc review. Việc đơn giản hóa không được làm mất hướng giao tiếp, owner, thời điểm, retry, phân loại lỗi hoặc điều kiện lifecycle.

Reference Basic Design đã thêm ví dụ Device Connector: ứng dụng không thể gọi trực tiếp thiết bị cũ, connector đứng giữa để chuyển yêu cầu và trả kết quả, nhờ đó thiết bị hiện có vẫn được sử dụng. `SKILL.md` giữ source-of-truth của gate; các reference chỉ áp dụng theo domain để tránh lặp rule.

# Kiểm tra

- Skill validator: pass.
- Evaluator unit tests: 7/7 pass.
- `japanese-tech-report` score: 91.9, failed evidence: 0.
- Rule lint, knowledge lint và workspace verify: pass trước khi tạo memory.
