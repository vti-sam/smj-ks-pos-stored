---
title: Local Tooling
project: ks_host
type: runbook
status: confirmed
source:
  - migrated from memory/ks_pos_boilerplate/ks_host/maintenance/local_tooling.md
tags: [ks_host, maintenance, ks_pos_boilerplate, local_tooling]
---

# Công cụ cục bộ

- PM-control vận hành theo hướng skill-first: `knowledge/` là source-of-truth tri thức, `sources/` được phân tích qua `skills/source-code-intel/`.
- Với source code trong `sources/`, dùng `skills/source-code-intel/` để tìm symbol/context/impact bằng `rtk rg`, đọc file trực tiếp, sau đó verify bằng `rtk dotnet build/test`, `.sln/.csproj`, compiler errors và cấu trúc MSBuild/Roslyn.
- Khi cần rebuild/reconcile index tri thức, dùng skill `skills/knowledge-sync/`.
- Kiến thức dài hạn của PM-control ghi thành file trong `knowledge/`.
- `docs/` có thể vẫn bị ignore trong `KsPos.Host/.gitignore`; đây là ghi chú/tài liệu cục bộ được tạo tự động.
- Không loại bỏ các rule ignore cục bộ trừ khi repo chính thức cần theo dõi metadata hoặc tài liệu đó.
