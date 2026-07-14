---
title: Source Code Intel Quality Loops
project: smj-ks-pos
type: architecture
status: archived
source:
  - Codex session 2026-07-14
  - https://github.com/mattpocock/skills/releases/tag/v1.1.0
  - skills/knowledge-code/source-code-intel/SKILL.md
  - skills/repo-tools/skill-quality-eval/SKILL.md
tags:
  - source-code-intel
  - bug-diagnosis
  - tdd
  - code-review
  - codebase-design
  - skill-quality
scope: historical
captured_at: 2026-07-14
validity: historical_context
promote_to_knowledge: false
---

Đã tích hợp có chọn lọc các quality loop từ `mattpocock/skills` v1.1.0 vào workflow nội bộ, không sao chép nguyên bộ skill.

Kết quả:

- `source-code-intel` là router duy nhất cho source code và dùng progressive disclosure cho bốn nhánh: chẩn đoán bug, thay đổi theo test, review Standards/Spec và thiết kế codebase.
- Routing tại root và `sources/AGENTS.md` phân biệt rõ task diagnose/review với quyền sửa.
- `skill-quality-eval` kiểm tra thêm invocation trigger, completion criterion, resource pointer, duplication/no-op và guardrail có hành vi thay thế.
- Đã thêm unit test cho rubric và evidence contract cho hai skill được thay đổi.

Các workflow tự commit/push, tự ghi issue tracker, bắt buộc sub-agent, thay cấu trúc knowledge/memory bằng `CONTEXT.md`, và luồng `to-spec`/`to-tickets`/`wayfinder` không được tích hợp vì xung đột hoặc chồng lấn boundary hiện tại.

Evidence sau thay đổi:

- `source-code-intel`: baseline rubric cũ 68,5; rubric mới 90,8; failed evidence 1 → 0.
- `skill-quality-eval`: baseline rubric cũ 85,5; rubric mới 89,6; failed evidence giữ ở 0.
- Bảy unit test evaluator pass, gồm case bỏ qua `__pycache__`/`.pyc` khi chấm resource.
- Validator hệ thống cần chạy qua `rtk uv run --with pyyaml python .../quick_validate.py` vì Python mặc định không có module `yaml`.

Do rubric evaluator thay đổi trong cùng patch, hai score trước/sau không hoàn toàn đồng thước; failed evidence, validator và unit test là bằng chứng so sánh trực tiếp.
