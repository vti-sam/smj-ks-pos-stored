---
title: AppStopServer NamedPipe Migration
project: ks_host
type: decision
status: archived
source:
  - Codex session 2026-06-23 AppStopServer NamedPipe migration
  - sources/KsPosBoilerplate/TabetPos.Host/src/AppStopServer/Program.cs
  - project-store/knowledge/ks_pos_boilerplate/runtime/appserver_appstopserver.md
  - project-store/artifacts/reports/architecture/ARCH-01_タブレットPOS_ソフトウェア構造設計書/ARCH-01_タブレットPOS_ソフトウェア構造図.drawio
tags:
  - ks_host
  - appstopserver
  - named_pipe
  - host_control_cleanup
  - architecture
scope: historical
captured_at: 2026-06-23
validity: historical_context
promote_to_knowledge: false
---

# AppStopServer NamedPipe Migration

- `AppStopServer` vẫn là executable legacy để operator hoặc external script dừng DeviceServer Host từ ngoài UI.
- Scope cuối cùng: giữ `AppStopServer` vì đây là executable vận hành riêng để dừng Host, nhưng xoá `KsClient` vì app mới dùng `DeviceCtrl` gọi Host trực tiếp qua Named Pipe.
- Request dừng Host gửi JSON 1 dòng tới `TabetPos.Host.Command` với `message = "Kill"` và `handle = "0"`.
- `src/AppStopServer` không còn reference `KsWindowMessageControls`, `KsWindowMessageDefinition`, `WINDOWMESSAGE` hoặc `TransferMessage`.
- Sơ đồ `ARCH-01` đã vẽ `AppStopServer.exe` là external caller/process riêng, gửi `Kill` vào `TabetPos.Host.Command`; `KsClient` không còn là runtime component, chỉ còn note đỏ giải thích trước đây external app phải nhúng DLL trung gian này.
- `KsClient` project đã bị xoá khỏi `TabetPos.Host.slnx` cùng file source/project `src/KsClient/DeviceClient/KsClient.cs` và `KsClient.csproj`.
- `KsDeviceDefinition` được giữ lại vì Host vẫn cần `KsDeviceId`, `KsDeviceMethodID`, `KsDeviceConst`, `IFDevice` để parse/dispatch command và chạy các nghiệp vụ như `CashChangerByRT300`.
- Verify đã build được `AppStopServer.csproj`, `KsHost.csproj`, `CashChangerByRT300.csproj`, `DeviceHostCore.Tests.csproj`; `dotnet test` bị chặn trên macOS do thiếu runtime `Microsoft.WindowsDesktop.App 10.0.0`.
- IT testcase đã bổ sung:
  - `TC-IT-HOST-01`: `IT-HOST-032` đến `IT-HOST-034` cho AppStopServer stop, Host chưa chạy, và restart sau stop.
  - `TC-IT-DEVICE-01`: `IT-DEVICE-031` đến `IT-DEVICE-033` cho app timeout/reconnect khi Host bị stop bằng AppStopServer.
