---
title: Local State Snapshot Persistence
project: ks_host
type: architecture
status: confirmed
source:
  - migrated from memory/ks_pos_boilerplate/application_architecture/local_state_snapshot_persistence_2026-05-27.md
tags: [ks_host, architecture, ks_pos_boilerplate, application_architecture, local_state_snapshot_persistence_2026_05_27]
---

# Local state snapshot persistence - 2026-05-27

## Quyết định

`KsPos.Applications` thêm nền tảng lưu ViewModel snapshot bằng SQLite để giữ state cục bộ của terminal app sau chuyển màn hình, app kill/crash hoặc mất điện.

Scope phase này chỉ gồm snapshot persistence. Không thêm `local_settings`, không dùng Preferences, không lưu cấu hình terminal.

## Thiết kế

- `[PersistSnapshot]` là opt-in attribute; property không đánh attribute thì không được lưu.
- `SnapshotViewModelBase` kế thừa `BaseViewModel`, tự restore khi appearing/resuming và save khi disappearing/stopping.
- `IViewModelSnapshotService` là port chính cho snapshot.
- `ILocalStateSessionService` quản lý session/flow theo `session_key`.
- SQLite DB đặt tại `FileSystem.AppDataDirectory/kspos_local_state.db`.
- Schema chính:
  - `local_state_sessions`
  - `view_model_snapshots`
- Hỗ trợ nhiều flow không giới hạn bằng cách dùng `session_key` riêng cho từng flow.
- Không copy nghiệp vụ MauiPOSX như payment, employee, switch slot 1-3.

## Verify

Build đã pass:

```powershell
rtk dotnet build KsPos.Applications.csproj -f net10.0-windows10.0.19041.0 -v:m
```

Warnings còn lại là warning package/vulnerability và MVVMTK AOT warning có sẵn quanh sample ViewModel.

## Cập nhật lifecycle save/restore - 2026-05-27

- Bổ sung `Window.Deactivated` để gọi `HandleStoppingAsync()` và save snapshot khi app/window mất active.
- Bổ sung `Window.Activated` để gọi `HandleResumingAsync()` và restore snapshot khi app/window active lại.
- Để tránh save trùng do `PageDisappearing`, `Window.Deactivated`, `Window.Stopped` có thể bắn gần nhau, `SnapshotViewModelBase` dùng:
  - `SemaphoreSlim` chống save song song.
  - throttle 500ms; nếu vừa save trong 500ms thì skip.
  - check throttle 2 lần: trước khi lấy lock và sau khi lấy lock.
- Chưa thêm dirty/hash compare vì hiện tại save chỉ theo lifecycle, không phải autosave theo từng thay đổi property.
