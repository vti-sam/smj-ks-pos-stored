---
title: Tool Routing Token Policy
project: project_management
type: runbook
status: confirmed
source:
  - migrated from memory/project_management/tool_routing_token_policy_2026-05-23.md
tags: [project_management, policy, tool_routing_token_policy_2026_05_23]
---

# Tool routing token policy - 2026-05-23

## Quyết định

- Loại bỏ hoàn toàn Graphify khỏi workflow để tránh làm phình context và tốn token.
- Ưu tiên source of truth trực tiếp trước: local repo, Google Sheets, Backlog, Calendar, registry và file knowledge cụ thể.
- Với source code, dùng `skills/source-code-intel/` để điều phối `rtk rg`, đọc file trực tiếp, build/test/compiler output và phân tích impact theo phạm vi task.
- Với tri thức dài hạn, dùng `knowledge/` làm source-of-truth và `skills/knowledge-sync/` khi cần tra cứu/cập nhật/reconcile.

## Ghi chú vận hành

- Khi cần tìm kiếm tri thức dài hạn liên quan, đọc file `.md` trong `knowledge/` hoặc dùng `rtk rg` theo keyword/project/domain trước.
- Khi cần phân tích source code, bắt đầu bằng `skills/source-code-intel/`; verify bằng `rtk rg`, build output, `.sln/.csproj`, compiler errors và đọc file liên quan.
