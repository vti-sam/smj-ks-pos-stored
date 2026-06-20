---
title: Original Repo Local Tooling Gitignore
project: ks_host
type: architecture
status: confirmed
source:
  - migrated from memory/ks_pos_boilerplate/ks_host/_source_notes/original_repo_local_tooling_gitignore.md
tags: [ks_host, architecture, ks_pos_boilerplate, source_notes, original_repo_local_tooling_gitignore]
---

# Gitignore cho công cụ cục bộ repo

- `.serena/` cố ý bị bỏ qua trong `KsPos.Host/.gitignore` vì là đầu ra/trạng thái workspace Serena cục bộ.
- `docs/` cố ý bị bỏ qua trong `KsPos.Host/.gitignore` dành cho ghi chú tài liệu cục bộ/được tạo tự động.
- Không loại bỏ các quy tắc này trừ khi repo cố ý theo dõi metadata/tài liệu cục bộ đó.