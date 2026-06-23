---
title: Report Markdown Code Audit 2026-06-23
project: smj-ks-pos
type: gotcha
status: archived
source:
  - Codex session 2026-06-23 report Markdown audit against sources/ksposboilerplate
  - project-store/artifacts/reports/
  - sources/ksposboilerplate/
tags:
  - reports
  - named-pipe
  - ksclient
  - windowmessage
  - testcase-id
scope: historical
captured_at: 2026-06-23
validity: historical_context
promote_to_knowledge: false
---

# Report Markdown Code Audit 2026-06-23

Snapshot audit checked 44 Markdown files under `project-store/artifacts/reports/` against current source under `sources/ksposboilerplate`.

Verified current code state:

- Active Host communication path is Named Pipe. `DeviceHostTransport` creates `NamedPipeDeviceHostAdapter`; command pipe is `TabetPos.Host.Command`, event pipe is `TabetPos.Host.Event`.
- `NamedPipeClient` default pipe is `TabetPos.Host.Command`; legacy `KsPOSPipeMessage` is only migrated in `Configure`.
- `AppStopServer` sends `Kill` JSON through `TabetPos.Host.Command`.
- Active source/build no longer contains `KsClient`/`DeviceClient`; only stale generated `obj` traces may remain.

Report findings:

- `ARCH-01`, `ARCH-02`, `ARCH-03`, and `CFG-01` still contain old root path text `sources/POS 開発用ベースプロジェクト`.
- All 33 program spec Markdown files use `sources/KsPosBoilerplate`; after normalizing to `sources/ksposboilerplate`, source files and documented physical class names all resolve correctly.
- `PS-HOST-05` has stale transport wording: `_transport` is described as `WindowMessage/Named Pipe transport`; current implementation is Named Pipe only.
- `CFG-01` still shows `KsPOSPipeMessage` as named pipe example/default; current default config uses `TabetPos.Host.Command`.
- `TC-IT-HOST-01` case `IT-HOST-032` still expects no `WindowMessage送信エラー`; AppStopServer now uses Named Pipe stop request, so the expected result should mention pipe close/Named Pipe behavior instead.
- `TC-UT-DEVICE-01` is stale/misclassified: current source has 71 unit test IDs (`UT-HOST` 34, `UT-STATE` 24, `UT-SENTRY` 13) and zero `UT-DEVICE` IDs. The document's 50 `UT-DEVICE-*` rows duplicate or rename Host/State/Sentry cases.

Keep `ARCH-03_...構造図.original.md` as original Mermaid artifact unless the user explicitly asks to normalize original source too.
