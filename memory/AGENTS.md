# AGENTS.md

- `project-store/memory/` lưu lịch sử phiên và ghi chú tác nhân dạng historical trong repo stored.

## Commands

- Tìm memory theo keyword: `rtk rg "<keyword>" project-store/memory`.
- Query semantic search: `rtk uv run skills/knowledge-code/knowledge-memory-sync/scripts/sync_qdrant.py query "<keyword>" --scope memory`.
- Lint frontmatter/link: `rtk uv run skills/knowledge-code/knowledge-memory-sync/scripts/lint_knowledge.py`.
- Sync index sau khi sửa: `rtk uv run skills/knowledge-code/knowledge-memory-sync/scripts/sync_qdrant.py`.
- Promote sang knowledge khi có yêu cầu rõ: `rtk uv run skills/knowledge-code/knowledge-memory-sync/scripts/promote_memory.py --help`.

## Boundaries

- Nội dung trong folder này chỉ dùng để truy vết, khôi phục ngữ cảnh hoặc phát hiện gotcha cũ; không coi là source-of-truth active.
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

- Đúng: lưu gotcha của một phiên xử lý đã qua với `scope: historical`, `captured_at` và evidence path.
- Sai: dùng memory làm nơi ghi quyết định active hoặc source-of-truth thay cho `project-store/knowledge/`.
