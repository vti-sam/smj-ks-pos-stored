---
title: Local bootstrap for TabetPosBoilerplate on Windows and WSL2
project: smj-ks-pos
type: lesson
status: stale
source:
  - project-store/config/project.yaml
  - sources/TabetPosBoilerplate/.git/config
  - Local verification session 2026-08-20
tags:
  - bootstrap
  - tabetposboilerplate
  - wsl2
  - falkordblite
  - codegraph
  - scip
scope: historical
captured_at: 2026-08-20
validity: historical_context
promote_to_knowledge: false
---

# Local bootstrap for TabetPosBoilerplate on Windows and WSL2

## Outcome

- Checkout local chuẩn là `sources/TabetPosBoilerplate`; `KsPosBoilerplate` chỉ là tên repository GitLab tại `https://git.vti.com.vn/sharp/ksposboilerplate.git`.
- `project-store/config/project.yaml` bind source-intelligence bằng ID `tabetposboilerplate`, path `sources/TabetPosBoilerplate` và output SCIP `scratch/indexes/scip/tabetposboilerplate`.
- Rider local VCS mapping nhận diện riêng ba Git root: workspace, `project-store` và `sources/TabetPosBoilerplate`.
- Máy local đã có WSL2 với Ubuntu 24.04, Python 3.12, uv, rtk, Node.js LTS, .NET SDK, Visual Studio Build Tools, CodeGraph và FalkorDBLite runtime.
- FastEmbed, Qdrant và GitNexus đã được loại khỏi workflow/repository bootstrap; knowledge-memory dùng embedding local dependency-free `local-hash-lexical-v1`.

## Evidence

- `git fetch --prune` tại `sources/TabetPosBoilerplate` hoàn tất; `HEAD...origin/develop` trả `0 0` và source worktree sạch.
- Bootstrap dry-run và bootstrap thực tế đều resolve `project-store/config/project.yaml`; file local `project-data.yaml` được sinh lại.
- FalkorDBLite doctor pass với 214 file trên đĩa, 214 file trong graph và schema version 9; workspace verification pass toàn bộ rule, knowledge-memory test, isolation và smoke query.
- `codegraph status` tại `sources/TabetPosBoilerplate` báo index up to date: 252 files, 7,238 nodes và 11,351 edges.
- `wsl --list --verbose` báo Ubuntu-24.04 dùng WSL version 2.
- `.idea/vcs.xml` parse XML thành công; cả ba mapping đều tồn tại và `git rev-parse --show-toplevel` trả đúng ba Git root tương ứng.

## Unresolved

- CodeGraph index được tạo bởi engine cũ; full re-index chưa chạy vì index write cần approval riêng.
- SCIP consumer 0.9.0 không có Windows AMD64 asset chính thức; SCIP index chưa được tạo. Có thể cần bổ sung WSL bridge cho workflow SCIP trước khi bootstrap/index phần này.
- Root repo và nested `project-store` có các thay đổi cleanup/config chưa commit; không stage, commit hoặc push vì User chưa yêu cầu.

## Retrieval keys

- `smj-ks-pos local bootstrap 2026-08-20`
- `sources/TabetPosBoilerplate`
- `KsPosBoilerplate GitLab repository name only`
- `tabetposboilerplate source binding`
- `Rider three Git roots VCS mapping`
- `WSL2 Ubuntu-24.04 FalkorDBLite`
- `CodeGraph old engine re-index pending`
- `SCIP Windows asset unavailable`
