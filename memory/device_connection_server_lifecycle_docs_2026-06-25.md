---
title: Device connection server lifecycle documented in ARCH-03 and PS-HOST-05
project: smj-ks-pos
type: architecture
status: archived
source:
  - Codex session 2026-06-25
  - project-store/artifacts/reports/architecture/ARCH-03_タブレットPOS_デバイス接続サーバー構造設計書/ARCH-03_タブレットPOS_デバイス接続サーバー構造設計書.md
  - project-store/artifacts/reports/architecture/ARCH-03_タブレットPOS_デバイス接続サーバー構造設計書/ARCH-03_タブレットPOS_デバイス接続サーバー制御方式構造図.drawio
  - project-store/artifacts/reports/program-specs/PS-01_タブレットDCS_デバイス接続サーバー制御方式/PS-HOST-05_タブレットPOS_ホスト_デバイスサーバーホスト_プログラム仕様書.md
tags:
  - device-connection-server
  - lifecycle
  - architecture-doc
  - program-spec
scope: historical
captured_at: 2026-06-25
validity: historical_context
promote_to_knowledge: false
---

Ngày 2026-06-25 đã cập nhật tài liệu để làm rõ デバイス接続サーバー（Host） đi theo vòng đời タブレットPOSアプリ trong vận hành thường.

Nội dung đã thống nhất:

- Khi app khởi động, tạo window hoặc resume, Host được kiểm tra trạng thái và tự động khởi động ở background nếu chưa chạy.
- Khi app stop hoặc destroy, app gửi Kill tới Host để Host chạy StopHost, dừng pipe và các device đã start.
- Start/Stop画面 không nằm trong luồng vận hành thường; nếu giữ lại thì chỉ dùng cho debug/developer.
- ARCH-03 đã thêm mục 2.5, drawio đã thêm callout nổi bật giữa app và Host, PS-HOST-05 đã bổ sung chú ý tương ứng.

Ghi chú này chỉ phục vụ truy vết. Khi cần xác nhận trạng thái mới nhất, đọc lại các file source trong `project-store/artifacts/reports/`.
