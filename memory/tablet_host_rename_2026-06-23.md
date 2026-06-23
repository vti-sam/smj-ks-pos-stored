---
title: Tablet Host Rename 2026-06-23
project: smj-ks-pos
type: architecture
status: archived
source:
  - Codex session 2026-06-23 rename Ks host/device source symbols to Tablet and push develop commit b484ac1
tags:
  - tabletpos
  - host
  - rename
  - legacy-dependency
scope: historical
captured_at: 2026-06-23
validity: historical_context
promote_to_knowledge: false
---

# Tablet Host Rename

User requested source code naming to stop using project-owned `Ks*` host/device names and switch to `Tablet*`.

Completed in nested source repo `sources/tabletposboilerplate` on branch `develop`, commit `b484ac1`:

- Renamed local source folder from `sources/ksposboilerplate` to `sources/tabletposboilerplate`.
- Renamed project-owned host/device paths and symbols:
  - `KsHost` -> `TabletHost`
  - `KsDevice*` -> `TabletDevice*`
  - `KsDeviceManager` -> `TabletDeviceManager`
  - `KsDeviceDefinition` -> `TabletDeviceDefinition`
  - `KsDeviceSettingBase` -> `TabletDeviceSettingBase`
- Removed stale `KsClient` source tree and old `WindowMessageDeviceHostAdapter`.
- Kept external legacy binary API names such as `KsUtility`, `KsLogControls`, `KsClassID`, `KsClassFactory`, `KSINIED`, and `legacyBin/Ks*.dll` references because they are provided by prebuilt legacy assemblies and are required for build.

Verification:

- CodeGraph ensured for `sources/tabletposboilerplate`.
- `dotnet build src/TabletHost/DeviceHost/TabletHost.csproj -p:EnableWindowsTargeting=true /m:1` passed.
- `dotnet build tests/DeviceHostCore.Tests/DeviceHostCore.Tests.csproj -p:EnableWindowsTargeting=true /m:1 -nr:false` passed.
- `dotnet build tests/TabletDeviceSettingBase.Tests/TabletDeviceSettingBase.Tests.csproj -p:EnableWindowsTargeting=true /m:1 -nr:false` passed.
- `dotnet test` was blocked on macOS arm64 by missing `Microsoft.WindowsDesktop.App 10.0.0` runtime, same class of environment blocker as previous WindowsDesktop test attempts.
