# AGENTS.md

- `project-store/memory/` chỉ lưu lịch sử historical có relevance trực tiếp với project hiện tại trong repo stored.

## Commands

- Tìm memory theo keyword: `rtk rg "<keyword>" project-store/memory`.
- Query hybrid search: `rtk uv run skills/knowledge-code/knowledge-memory-sync/scripts/sync_falkor.py query "<keyword>" --scope memory`.
- Lint frontmatter/link: `rtk uv run skills/knowledge-code/knowledge-memory-sync/scripts/lint_knowledge.py`.
- Sync index sau khi sửa: `rtk uv run skills/knowledge-code/knowledge-memory-sync/scripts/sync_falkor.py`.
- Promote sang knowledge khi có yêu cầu rõ: `rtk uv run skills/knowledge-code/knowledge-memory-sync/scripts/promote_memory.py --help`.

## Boundaries

- Nội dung trong folder này chỉ dùng để truy vết, khôi phục ngữ cảnh hoặc phát hiện gotcha cũ; không coi là source-of-truth active.
- Trước khi ghi, phải chỉ ra ít nhất một project anchor kiểm chứng được: source path của ứng dụng, issue/WBS, deliverable/artifact, quyết định khách hàng, hoặc trạng thái vận hành của project. Frontmatter `source` phải chứa anchor hoặc evidence truy ngược được tới anchor đó.
- Không ghi thay đổi skill/tool/rule dùng chung, benchmark hạ tầng, evaluator score, setup agent hoặc log verify thông thường nếu nội dung không tạo ra kết quả hay quyết định riêng của project.
- Nội dung generic phải giữ tại owner artifact tương ứng: workflow trong `SKILL.md`/rule, hành vi trong test/evidence manifest, kết quả tạm trong `scratch/`, và lịch sử implementation trong Git. Không tạo file memory chỉ để tóm tắt những artifact này.
- Khi nội dung có giá trị bền, promote sang `project-store/knowledge/` với source/evidence rõ và metadata knowledge chuẩn.
- File Markdown trong folder này phải có YAML frontmatter ở đầu. Reuse metadata chuẩn của knowledge và thêm các field historical:

```yaml
---
title: <Human readable title>
project: <project_id>
type: requirement | decision | gotcha | runbook | architecture | lesson
status: archived | stale
source:
  - <Codex session / task log / evidence path>
tags:
  - <keyword>
scope: historical
captured_at: <YYYY-MM-DD>
validity: historical_context
promote_to_knowledge: false
---
```

- `type` vẫn phân loại bản chất nội dung; không thêm type riêng là `memory`.
- `status: archived` nghĩa là dữ liệu lịch sử còn hữu ích để truy vết. `status: stale` nghĩa là chỉ giữ để audit, không dùng làm cơ sở hành động nếu chưa verify lại.
- Link nội bộ nên viết từ repo root bằng tiền tố `project-store/`.

## Examples

- Đúng: lưu gotcha của source ứng dụng, issue, deliverable hoặc quyết định khách hàng đã qua với project anchor, `scope: historical`, `captured_at` và evidence path.
- Đúng: skill dùng chung tạo ra thay đổi riêng cho một deliverable của project thì chỉ lưu project outcome và anchor của deliverable, không ghi lịch sử phát triển skill.
- Sai: dùng memory làm nơi ghi quyết định active hoặc source-of-truth thay cho `project-store/knowledge/`.
- Sai: lưu điểm evaluator, benchmark model, cách sửa skill hoặc log test chung khi không có project outcome.
