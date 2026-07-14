---
title: Japanese tech report structure-first and semantic compression
project: smj-ks-pos
type: decision
status: archived
source:
  - User feedback 2026-07-14
  - skills/doc-authoring/japanese-tech-report/SKILL.md
  - skills/doc-authoring/japanese-tech-report/references/report-patterns.md
tags:
  - japanese-tech-report
  - spoken-japanese
  - basic-design
  - semantic-compression
scope: historical
captured_at: 2026-07-14
validity: historical_context
promote_to_knowledge: false
---

# Kết quả

Skill `japanese-tech-report` không còn dùng `先に結論からお伝えします` làm mở đầu mặc định.

Với báo cáo có nhiều chủ đề, cách nói mặc định là báo trước số phần rồi đi thẳng vào từng phần, ví dụ `本日は、大きく3点に分けてご説明します。`. Với một chủ đề nhỏ, bắt đầu trực tiếp từ chủ đề. Với incident, release hoặc blocker cần quyết định ngay, nêu thẳng trạng thái hiện tại mà không thông báo rằng sắp nói kết luận.

# Quy tắc semantic compression

- Mỗi content sentence phải thêm ít nhất một fact, judgment, reason, action hoặc request.
- Giữ các interactional phrase như `そうなんですね` và `〜なんですけれども` khi chúng có tác dụng acknowledge, alignment, turn-taking, soft contrast, thinking hoặc làm mềm request. Chỉ loại khi bị lặp hoặc không có chức năng hội thoại.
- Bỏ câu dẫn mang tính nghi thức, summary lặp lại, transition trang trí và paraphrase không thêm nghĩa.
- Khi trình bày tài liệu đang mở, chỉ vào section liên quan và chỉ giải thích decision hoặc relationship không nhìn ra ngay từ trang tài liệu.
- Report Basic Design thông thường không tự thêm background, impact, release, next action hoặc Q&A nếu không liên quan trực tiếp.
- Q&A chỉ thêm khi User yêu cầu luyện tập hoặc có material pushback risk.

# Verify

- `skill-creator` quick validation: pass.
- Skill quality evaluator: 93/100, không có failed evidence.
- Rule lint và `git diff --check`: pass.
