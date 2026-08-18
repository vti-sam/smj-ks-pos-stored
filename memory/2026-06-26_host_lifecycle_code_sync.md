---
title: Host lifecycle code sync after source revert
project: smj-ks-pos
type: gotcha
status: archived
source:
  - Codex session on 2026-06-26
  - Codex verification session on 2026-08-13
  - OPOS runtime registration verification on 2026-08-13
  - sources/TabetPosBoilerplate/TabetPos.Applications/Application/Devices/HostProcessManager.cs
  - sources/TabetPosBoilerplate/TabetPos.Applications/App.xaml.cs
  - sources/TabetPosBoilerplate/TabetPos.Applications/Composition/DependencyInjection.cs
  - sources/TabetPosBoilerplate/TabetPos.Applications/TabetPos.Applications.csproj
  - sources/TabetPosBoilerplate/TabetPos.Host/TabetPos.Host.slnx
tags:
  - host
  - app-lifecycle
  - device-control
  - verification
  - windows-build
  - dependency-security
scope: historical
captured_at: 2026-06-26
validity: historical_context
promote_to_knowledge: false
---

# Outcome

Sau khi source được revert ngày 2026-06-26, naming vẫn là `TabetPos.Host`, `DeviceCtrl` và pipe `TabetPos.Host.Command`. App-side lifecycle giữ các contract sau:

- `IHostProcessManager` và `HostProcessManager` nằm dưới `TabetPos.Applications/Application/Devices/`.
- Windows khởi động `TabletDeviceServer.AppServer.exe` từ app output `Host/AppServer/`.
- Lifecycle hook trong `App.xaml.cs` khởi động Host khi tạo window, activate và resume; dừng Host khi stop và destroy.
- Khi dừng, app gửi JSON Named Pipe request có message `Kill` tới `TabetPos.Host.Command`, sau đó chỉ fallback kill process do chính app sở hữu nếu process không thoát.
- `TabetPos.Applications.csproj` có target Windows-only `BuildHostAppServer`, build `TabetPos.Host/src/AppServer/AppServer.csproj` với `Platform=x86` và `TargetFramework=net10.0-windows` vào `$(TargetDir)Host/AppServer/`. Việc chỉ rõ target framework ngăn framework MAUI của parent build bị truyền sai sang host.
- Ngày 2026-08-13, application Windows và toàn bộ host solution đã build sạch sau khi bổ sung namespace `Application.Devices`, sửa async/nullability/AOT analyzer warning và nâng dependency patch để loại bỏ package vulnerability đã biết.
- Các package EF Core và Microsoft.Extensions liên quan được đồng bộ lên `10.0.11`; `System.Security.Cryptography.Xml` được ghim `10.0.11` trong host tests. Dependency scan không còn package vulnerable theo NuGet sources hiện tại.

# Evidence

- `rtk dotnet build TabetPos.Applications/TabetPos.Applications.csproj -c Debug -f net10.0-windows10.0.19041.0 --nologo`: 9 projects, 0 errors, 0 warnings.
- `rtk dotnet build TabetPos.Host/TabetPos.Host.slnx -c Debug --nologo`: 17 projects, 0 errors, 0 warnings.
- `rtk dotnet test TabetPos.Test/TabetPos.Test.csproj -c Debug --nologo`: 57 tests passed, 0 warnings.
- Host tests: `DeviceHostCore.Tests` 22/22 passed, `DevicePipeline.Tests` 4/4 passed; `TabletDeviceSettingBase.Tests` có 2 passed, 1 failed và 1 skipped do local OPOS runtime thiếu ba OCX đã đăng ký.
- Sau khi backup sáu khóa Registry liên quan, ba OCX x86 trong `TabetPos.Host/runtime/OPOS` đã được đăng ký lại bằng `C:\Windows\SysWOW64\regsvr32.exe`: `OPOSCashChanger.ocx`, `LineDisplay.ocx` và `Drawer.ocx`.
- Registry32 `InprocServer32` của ba CLSID đã trỏ tới các file tồn tại dưới `TabetPos.Host/runtime/OPOS`; focused test `OposComControls_AreRegisteredAndCanBeCreated|OposServiceObjects_AreMappedInServiceOposRegistry` đạt 2/2, 0 warning.
- Toàn bộ `TabletDeviceSettingBase.Tests` đạt 3/3 test khả dụng, 0 warning; hardware-open test vẫn được bỏ qua theo thiết kế vì không bật cờ chạy trên thiết bị vật lý.
- `dotnet list ... package --vulnerable --include-transitive` xác nhận application và tất cả 14 project trong host solution không còn vulnerable package theo `https://api.nuget.org/v3/index.json` và local Microsoft SDK package source tại thời điểm 2026-08-13.

# Unresolved

- Runtime start/stop của Host chưa được smoke-test trong session 2026-08-13.
- Thiếu hụt Registry OPOS từng trỏ tới `KsPos.Host/runtime/OPOS` đã được xử lý ngày 2026-08-13 bằng cách đăng ký lại ba OCX từ `TabetPos.Host/runtime/OPOS`. Backup trước thay đổi nằm tại `scratch/opos-registry-backup/20260813-165723` trên máy thực hiện.
- Các caveat build iOS/macOS ghi nhận ngày 2026-06-26 không được kiểm tra lại trong session Windows này.

# Retrieval keys

- `TabetPosBoilerplate Windows clean build 2026-08-13`
- `TabetPos.Applications 0 errors 0 warnings`
- `TabetPos.Host 0 errors 0 warnings`
- `BuildHostAppServer TargetFramework=net10.0-windows`
- `IHostProcessManager HostProcessManager DependencyInjection`
- `System.Security.Cryptography.Xml 10.0.11`
- `SQLitePCLRaw.lib.e_sqlite3 2.1.12`
- `OposComControls_AreRegisteredAndCanBeCreated`
