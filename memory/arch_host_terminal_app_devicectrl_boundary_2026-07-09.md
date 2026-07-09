---
title: ARCH-HOST terminal app and DeviceCtrl boundary
project: smj-ks-pos
type: gotcha
status: archived
source:
  - Codex session 2026-07-09 ARCH-HOST-01 terminal app boundary correction
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/draft/ARCH-HOST-01_5.1_全体構成図.d2
tags:
  - ARCH-HOST
  - DeviceCtrl
  - Host
  - basic-design
  - diagram
scope: historical
captured_at: 2026-07-09
validity: historical_context
promote_to_knowledge: false
---

# Note

For ARCH-HOST-01, `アプリケーション層` and `デバイス制御層（DeviceCtrl）` are both inside `タブレットPOS端末アプリ`.

Do not draw or describe direct communication between `アプリケーション層` and `デバイスコネクタ（Host）`.

Correct boundary:

- `アプリケーション層` passes device operation, lifecycle, response, and event handling through `DeviceCtrl`.
- `DeviceCtrl` sends Host command requests and receives Host synchronous responses/events.
- `Host` communicates with `DeviceCtrl` over `TabetPos.Host.Command` and `TabetPos.Host.Event`.
- `DeviceCtrl` returns results or notifications to the application layer.

When updating `5.1 全体構成図`, wrapping `(1)` and `(2)` in a faint parent block labeled `タブレットPOS端末アプリ` is acceptable to make this boundary clear.

For `5.1 全体構成図`, the request/response relationships should be drawn as bidirectional exchanges where appropriate:

- `アプリケーション層` ⇄ `DeviceCtrl`
- `DeviceCtrl` ⇄ `Host` command pipe
- `Host` ⇄ physical devices

Keep `ReplyDevice`/event notification as a separate dashed return path from `Host` to `DeviceCtrl`, then from `DeviceCtrl` to the application layer.
