---
title: Device connection server app lifecycle implementation 2026-06-25
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session task on app lifecycle starting/stopping DeviceConnectionServer
  - sources/tabletposboilerplate/TabetPos.Applications/App.xaml.cs
  - sources/tabletposboilerplate/TabetPos.Applications/Application/Devices/DeviceConnectionServerProcessManager.cs
tags:
  - device-connection-server
  - app-lifecycle
  - source-code
scope: historical
captured_at: 2026-06-25
validity: historical_context
promote_to_knowledge: false
---

# Device connection server app lifecycle implementation

Implemented the application-side lifecycle handling so the DeviceConnectionServer is managed with the Tablet POS app lifecycle:

- App window creation/activation/resume starts the DeviceConnectionServer through `IDeviceConnectionServerProcessManager`.
- App window stop/destroy stops the DeviceConnectionServer.
- `DeviceConnectionServerProcessManager` is idempotent and guarded by a lifecycle lock to avoid overlapping start/stop calls.
- Stop first sends the Named Pipe `Kill` command, waits for exit, and falls back to killing the process that was started by the app if it remains alive.
- The app project includes a Windows-only MSBuild target to build and copy `TabletDeviceServer.DeviceConnectionServerApp.exe` into the app output under `DeviceConnectionServer/`.

Verification note: Host app build passed with Windows targeting on macOS. Full app Windows build was not pursued further after user clarified that Windows testing is not needed for this task.
