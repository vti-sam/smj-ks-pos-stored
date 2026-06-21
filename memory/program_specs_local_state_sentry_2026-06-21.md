---
title: Program Specs Local State và Sentry 2026-06-21
project: smj-ks-pos
type: lesson
status: archived
source:
  - project-store/artifacts/reports/program-specs/PS-02_タブレットPOS_ローカル状態管理/
  - project-store/artifacts/reports/program-specs/PS-03_タブレットPOS_監視ログ連携/
tags:
  - program-specs
  - local-state
  - sentry
  - excel-render
scope: historical
captured_at: 2026-06-21
validity: historical_context
promote_to_knowledge: false
---

# Program Specs Local State và Sentry 2026-06-21

Đã tạo program specs khách hàng cho hai bundle:

- `project-store/artifacts/reports/program-specs/PS-02_タブレットPOS_ローカル状態管理/`: 15 Markdown và 15 XLSX.
- `project-store/artifacts/reports/program-specs/PS-03_タブレットPOS_監視ログ連携/`: 7 Markdown và 7 XLSX.

Nội dung được đối chiếu bằng CodeGraph với `sources/KsPosBoilerplate`, sau đó đọc source liên quan trực tiếp. Generated migration/designer không tách thành spec riêng; enum/constant nhỏ được mô tả trong spec liên quan để tài liệu dễ đọc hơn.

Verify đã chạy:

- `spec_validate.py --profile japanese-class` pass toàn bộ 22 Markdown.
- Rà marker nội bộ như `CodeGraph`, `Pure Markdown`, `Evidence`, `## @meta`, `{grid=}` không có match trong hai bundle.
- Read-back 22 workbook bằng `openpyxl`, đủ sheet `変更履歴`, `表紙`, `クラス定義`, `メソッド一覧`, `メソッド定義`.
- Source path trong Markdown đều tồn tại.

Gotcha: `rtk dotnet test sources/KsPosBoilerplate/TabetPos.Test/TabetPos.Test.csproj` bị chặn trên macOS. Lần đầu lỗi `NETSDK1100` vì target Windows; khi thêm `-p:EnableWindowsTargeting=true` thì restore fail `NU1201` do `TabetPos.Core` chỉ support `net10.0-android36.0` / `net10.0-ios26.0`, còn `TabetPos.Applications` support `net10.0-ios26.2`.
