---
title: Host lifecycle code sync after source revert
project: smj-ks-pos
type: gotcha
status: archived
source:
  - Codex session on 2026-06-26
  - sources/tabletposboilerplate/TabetPos.Applications/Application/Devices/HostProcessManager.cs
  - sources/tabletposboilerplate/TabetPos.Applications/App.xaml.cs
  - sources/tabletposboilerplate/TabetPos.Applications/TabetPos.Applications.csproj
tags:
  - host
  - app-lifecycle
  - device-control
  - verification
scope: historical
captured_at: 2026-06-26
validity: historical_context
promote_to_knowledge: false
---

After the user reverted code, the source naming remained `TabetPos.Host`, `DeviceCtrl`, and pipe `TabetPos.Host.Command`.

The app-side lifecycle implementation was added without renaming large code areas:

- `IHostProcessManager` and `HostProcessManager` live under `TabetPos.Applications/Application/Devices/`.
- Windows starts `TabletDeviceServer.AppServer.exe` from app output `Host/AppServer/`.
- App lifecycle hooks in `App.xaml.cs` start Host on window creation, activation, and resume; stop Host on stop and destroy.
- Stop first sends a JSON Named Pipe request with message `Kill` to `TabetPos.Host.Command`, then falls back to killing only the process owned by the app if it does not exit.
- `TabetPos.Applications.csproj` has a Windows-only `BuildHostAppServer` target that builds `TabetPos.Host/src/AppServer/AppServer.csproj` with `Platform=x86` into `$(TargetDir)Host\AppServer\`.

Verification caveat from this session:

- Normal Mac build targets `net10.0-ios` and is blocked by existing `TabetPos.DeviceCtrl` iOS `Plugin.BLE` missing-type errors.
- Building app only with project references disabled is blocked by local Xcode/iOS SDK mismatch.
- Cross-target Windows build on Mac is blocked by `TabetPos.ApplicationControls` resolving as `net10.0-ios`.
- Runtime start/stop should be verified on Windows later.
