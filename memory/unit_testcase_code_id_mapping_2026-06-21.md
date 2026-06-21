---
title: Unit testcase IDs mapped into MSTest methods
project: smj-ks-pos
type: lesson
status: archived
source:
  - Codex session 2026-06-21 testcase ID mapping task
tags:
  - testcase
  - unit-test
  - mstest
  - traceability
scope: historical
captured_at: 2026-06-21
validity: historical_context
promote_to_knowledge: false
---

# Unit Testcase ID Mapping

2026-06-21 に unit testcase document IDs を MSTest methods へ `TestProperty("TestCaseId", "...")` として追加した。

- Host unit testcase IDs: `UT-HOST-001` through `UT-HOST-033`.
- Local State unit testcase IDs: `UT-STATE-001` through `UT-STATE-024`.
- Sentry unit testcase IDs: `UT-SENTRY-001` through `UT-SENTRY-013`.

Scope note:

- OPOS hardware/runtime methods in `OposRuntimeConnectivityTests.cs` were not changed in this task because they map to the separate Host OPOS integration testcase document (`IT-HOST-*`), not the unit testcase documents.

Verification notes:

- ID count check found 70 `TestCaseId` values with no duplicates and no missing IDs for Host, Local State, or Sentry unit testcase documents.
- `DeviceHostCore.Tests` and `KsDeviceSettingBase.Tests` built successfully with `-p:EnableWindowsTargeting=true`.
- Test execution on macOS remained blocked by WindowsDesktop/runtime constraints. `DeviceHostCore.Tests` requires `Microsoft.WindowsDesktop.App 10.0.0`; `TabetPos.Test` and `DevicePipeline.Tests` restore is blocked by target mismatch with Android/iOS-only dependent projects.
