---
title: Migration máy in OPOS và CAFIS Arch payment vào App và Host
project: smj-ks-pos
type: lesson
status: stale
source:
  - sources/TabetPosBoilerplate/TabetPos.Applications/
  - sources/TabetPosBoilerplate/TabetPos.DeviceCtrl/
  - sources/TabetPosBoilerplate/TabetPos.Host/
  - sources/TabetPosBoilerplate/TabetPos.Test/
  - sources/Refer/MauiPOSHost/
  - sources/TabetPosBoilerplate/tools/Test-PosPeripherals.ps1
  - scratch/printer-migration-source/README.md
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/
tags:
  - POSPrinter1
  - Payment1
  - CAFIS-Arch
  - SHARPRECPRT80
  - OPOS
  - named-pipe
  - peripheral-integration
  - thin-device-control
  - application-orchestration
scope: historical
captured_at: 2026-08-17
validity: historical_context
promote_to_knowledge: false
---

# Migration máy in OPOS và CAFIS Arch payment vào App và Host

## Outcome

- Đã migration có chọn lọc phần máy in từ source gốc vào contract JSON qua
  Named Pipe của App và Host. Host hỗ trợ text, JAN/EAN barcode, QR code và cắt
  giấy qua logical device `POSPrinter1`; không mang theo 714 formatter nghiệp
  vụ, e-journal, WinForms/ActiveX UI hoặc chức năng logo, stamp, image chưa có
  asset contract trong thiết kế hiện tại.
- Đã tích hợp CAFIS Arch payment vào App và Host qua logical device `Payment1`,
  gồm health check, generic payment và reprint. Luồng bất đồng bộ COM bơm message
  trên STA khi chờ `OutputComplete` hoặc `ErrorEvent`; response thanh toán không
  được ghi log.
- Đã tách timeout chờ response Named Pipe khỏi timeout kết nối để lệnh in và
  thanh toán dài không bị cắt ở mốc 5 giây.
- Timeout dùng cho bước OPOS `Claim` của Printer và CAFIS Payment được sở hữu
  chung tại `TabletDeviceConst.OposClaimTimeoutMilliseconds=5000`; hai device
  không còn khai báo `private ClaimTimeoutMilliseconds` trùng nhau. Các luồng
  legacy dùng `Claim(0)` và timeout chờ command/payment giữ nguyên vì khác
  semantics.
- Đã tích hợp màn hình `DeviceIntegrationTestPage` vào App để kiểm tra trực tiếp
  Payment health check, generic payment bằng JSON và in receipt mẫu. Màn hình
  chỉ là integration harness, chưa nối vào business flow bán hàng.
- Đã bổ sung metadata lỗi an toàn cho Host (`ResultCodeExtended`, stage và loại
  exception), bảo toàn chi tiết kết quả máy in và không ghi payload thanh toán
  vào log.
- MSR và PINPad đã được loại khỏi source, method ID và device ID đang hoạt động
  của Host; chúng không thuộc phạm vi migration này.
- Đã xóa bốn interop binary MSR/PINPad không còn tham chiếu khỏi `legacyBin`,
  xóa metadata XML liên quan và loại các section ServiceOPOS MSR/PINPad khỏi
  registry payload của Host. Hai khóa ServiceOPOS `MSR` và `PINPad` của máy
  cũng đã được sao lưu rồi xóa theo yêu cầu; các nhánh OPOS thiết bị khác vẫn
  được giữ nguyên.
- Đã bổ sung bộ cài lại CAFIS vào `runtime/OPOS/Payment`, chỉ gồm `CatCO.ocx`,
  `CAFISArch_OCXCatSO.dll` và hướng dẫn cài tới đường dẫn ổn định `C:\OPOS`.
  Host vẫn tạo COM bằng CLSID, không phụ thuộc đường dẫn checkout.
- Đã cập nhật tài liệu `ARCH-HOST-01` lên v0.3.9, đưa máy in vào 5 thiết bị ban
  đầu và đồng bộ lifecycle, payload, cấu hình, lỗi/log, mapping triển khai cho
  payment và printer. Workbook cùng ba cặp Office Script đã được sinh lại từ
  Markdown nguồn.
- Đã đăng ký lại CAFIS `CatCO.ocx` 32-bit tại đường dẫn ổn định
  `C:\OPOS\CAT\CAFIS Arch\CatCO.ocx`; CLSID và TypeLib đều trỏ đúng file này.
- Bản CCO Monroe 1.14.001 từng được cài tại
  `C:\OPOS\CommonCO\OPOSPOSPrinter.ocx`. Sau đó đã nhận lại đúng
  `POSPrinter.ocx` SHARP legacy từng dùng cho môi trường cũ và xác nhận contract
  COM khớp wrapper SVN: typelib `{126BC2A0-1C5E-11D0-BC7F-0080C82CC27E}` và
  coclass `{056E4560-24BF-11CF-BD98-444553540000}`.
- Payload SHARP legacy đã được đưa vào cùng source repo tại
  `TabetPos.Host/runtime/OPOS/Printer/POSPrinter.ocx`, thay payload Monroe và
  readme không còn phù hợp. Installer trong repo pin hash, dùng đăng ký COM
  32-bit, xử lý CCO đang xung đột và có nhánh đăng ký lại CCO trước nếu cài lỗi.
  Host tiếp tục activation qua ProgID ổn định `OPOS.POSPrinter`.
- Đã chạy installer bằng quyền Administrator và cài SHARP legacy tại
  `C:\OPOS\CommonCO\POSPrinter.ocx`. Registry32 `OPOS.POSPrinter` hiện trỏ
  CLSID `{056E4560-24BF-11CF-BD98-444553540000}`; CCO Monroe cũ đã được
  unregister. SHARP ghi `InprocServer32` bằng alias DOS 8.3
  `C:\OPOS\CommonCO\POSPRI~1.OCX`, nên installer resolve về long path và kiểm
  hash thay vì so sánh chuỗi path thô.
- Đã gom runtime OPOS thành một package duy nhất dưới
  `TabetPos.Host/runtime/OPOS`: `DeviceRuntimeManifest.psd1` giữ hash, COM
  identity và ServiceOPOS của 5 nhóm CashChanger, CashDrawer, CustomerDisplay,
  Printer và Payment; `Install-DeviceRuntime.ps1` hỗ trợ cài từng nhóm, `All`,
  `Force`, `VerifyOnly`, `List` và cấu hình cổng; file
  `Install-All-DeviceRuntime.cmd` cung cấp luồng one-click tự nâng quyền.
- Runtime mới đăng ký COM trực tiếp bằng absolute path resolve từ chính folder
  package, không copy binary sang `C:\OPOS` hoặc Windows. Installer chỉ đăng ký
  các CCO/Service Object có ProgID/CLSID; DLL phụ SHARP chỉ được pin hash và giữ
  cùng folder để vendor Service Object nạp.
- Installer và README riêng dưới Payment/Printer đã bị loại vì chỉ chuyển tiếp
  và làm package thiếu đồng nhất. Package hiện có đúng một README gốc, một
  PowerShell installer và một one-click batch. Mười sáu export `.reg` legacy
  chứa checkout path cũ, thiết bị ngoài scope và giá trị máy-specific cũng đã
  bị loại.
- Toàn bộ OPOS Scanner payload, manifest option và runtime test entry đã bị loại
  khỏi Host package vì `host_device_config.json` không có Scanner; scanner hiện
  được xử lý qua serial strategy của `TabetPos.DeviceCtrl`. MSR/PINPad cũng
  không có trong manifest hoặc registry write của package mới.
- Lượt one-click `All -Force` sau cùng đã hoàn tất với exit code thành công.
  Sau cleanup, `All -VerifyOnly` độc lập trả exit code 0 cho đúng 5 nhóm Host.
- Đã nối trực tiếp đủ 5 implementation vào `AppServer`: CustomerDisplay,
  CashDrawer, CashChanger, Printer và Payment đều có project reference, factory
  registration và được copy vào output thực tế của ứng dụng. Host không còn
  fallback qua `KsClassFactory` hoặc mode tách POSPrinter/EJournal cũ.
- Đã dọn 28 artifact không còn owner khỏi `legacyBin`, gồm toàn bộ Scanner
  interop, binary/XML của DeviceServer/TuriServer cũ, WindowMessage và
  `KsClassControls`. `legacyBin` còn đúng 10 DLL và mọi file đều có project hiện
  tại tham chiếu.
- Đã sửa lifecycle của `DeviceCommandRouter` và deadlock của event Named Pipe.
  Event được xếp hàng gửi bất đồng bộ theo từng client, giữ thứ tự và không còn
  gọi `Flush()` đồng bộ trước khi client đọc.
- Đã lấy bộ cài SHARP Service Object gốc từ máy POS `192.168.9.176` và đóng gói
  tại `TabetPos.Host/runtime/OPOS/Printer/oposso_setup.msi`. Runtime manifest
  quản lý MSI theo ProductCode và hash; installer chung hỗ trợ cài mới, repair
  bằng `-Force` khi trạng thái MSI/COM bị sai, và read-back ProgID, CLSID, server
  path cùng server hash trước khi tạo logical device `SHARPRECPRT80`.
- Ngày 2026-08-20, đã khoanh lỗi UI báo thất bại khi chạy
  `CashChangerForceRecovery` về timeout phản hồi Named Pipe: Host cần khoảng
  8 giây nhưng App chỉ chờ 5 giây. Source được cập nhật để riêng lệnh này chờ
  tối đa đúng 10 giây và dialog cảnh báo người dùng không thao tác chức năng
  khác cho đến khi xử lý hoàn tất; timeout mặc định của lệnh khác không đổi.

## Evidence

### Follow-up 2026-08-18: test thiết bị thật App → Host trên POS

- Đã bổ sung workflow một lệnh `tools/Test-PosPeripherals.ps1`: chạy unit spy,
  build Debug, deploy toàn bộ App và Host tới
  `C:\Deploy\TabetPos.DebugNew`, khởi động trong RDP session tương tác, chạy
  integration runner qua Named Pipe và tải evidence về máy build. Hash DLL
  CashChanger local/remote được đối chiếu trước khi chấp nhận kết quả.
- Lượt cuối `20260818-161414` trên POS `192.168.9.176` đạt 32/32 case, 0 fail,
  gửi 31 command qua Host. Scope gồm CashChanger, CustomerDisplay và Printer;
  Payment, CashDrawer và mọi command mở drawer bị guard loại trừ.
- CashChanger đã chạy thật theo đúng thứ tự recovery → begin → pause → recovery
  và begin → fix → end; `Seisa` thành công và `DispenseChange(10)` xả 10 yên
  thành công. `CashChangerErrGuidance` không còn gọi vendor `DirectIO 101` có
  thể treo; Host trả nhanh `Success=false`, `ResultCode=-2` và App nhận
  `HostCommandException` đúng contract.
- CustomerDisplay đã chạy `ClearText`, `DisplayText`, `DisplayTextAt` và
  `ScrollText(Direction=1)` thành công. `ClearDescriptors` trả OPOS 106/1 và
  được ghi nhận là expected device rejection, không phải lỗi transport/App.
- Printer đã in receipt thật đủ 7 line type: text/style, JAN13, JAN8, QR và cut;
  Host trả `PrintedLineCount=7`. Empty receipt trả expected `ResultCode=-2`.
- Đã sửa package resource của `CashDrawerBySharpForm`; startup log mới tại
  `2026-08-18T16:05:52+09:00` xác nhận module load/open thành công. Không gửi
  command Drawer trong integration run.
- Build Applications đạt 0 warning/0 error. Unit spy đạt 7/7; toàn bộ
  `TabetPos.Host.slnx` đạt 49/49 test, 0 warning trên 5 test project.
- Evidence source nằm tại
  `scratch/evidence/pos-peripherals/20260818-161414/`, gồm summary,
  request/response JSONL, runner events, TRX unit spy, POS preflight/result,
  Windows Application events và snapshot Host logs.

### Follow-up 2026-08-18: `VerifyOnly` theo Host contract

- Đã sửa `Install-DeviceRuntime.ps1 -VerifyOnly` để tách kiểm tra integrity của
  package khỏi kiểm tra active runtime. Payload trong package vẫn phải đúng
  SHA-256, nhưng COM server đang đăng ký chỉ cần đúng CLSID/ProgID mà code Host
  sử dụng và trỏ tới file tồn tại; không còn bắt buộc trỏ vào chính folder
  package đang chạy verify.
- `DeviceRuntimeManifest.psd1` schema 2 khai báo riêng `HostCom` và
  `Registry.Contract`. CashChanger, CashDrawer, CustomerDisplay và Payment được
  kiểm bằng CLSID vì Host/AxHost khởi tạo theo CLSID; Printer được kiểm bằng
  ProgID `OPOS.POSPrinter`. Service Object được kiểm bằng ProgID và logical
  mapping; cổng, log path, USB ID và giá trị máy-specific vẫn là install default,
  không phải Host compatibility contract.
- Logical name CashChanger đã đồng bộ với `host_device_config.json` thành
  `CASHCHANGER`, map tới ServiceOPOS device `GloryRAD/RT-300`.
- Regression test copy toàn bộ OPOS package sang thư mục tạm rồi chạy
  `-Device All -VerifyOnly`; test đạt dù Registry vẫn trỏ active runtime về
  package gốc. Printer Service Object sau correction được coi là runtime bắt
  buộc, không phải optional.
- `-Force` không đổi ý nghĩa: đây vẫn là explicit replacement mode và chỉ dùng
  khi muốn register/repair bằng đúng payload của package. Follow-up này không
  ghi Registry, không cài OPOS và không chạy hardware open trên máy POS.
- Audit read-only đủ 5 thiết bị trên máy POS xác nhận không còn vendor installer
  hợp lệ nào thiếu: Printer SO original MSI đã có và khớp nguồn; SHARP CO cached
  MSI cài thêm MSR/Scanner ngoài scope; SHARP PFO là utility/UI; CAFIS chỉ còn
  uninstall cache; Glory `OPOSSetup.exe` là configuration utility chứ không có
  product installer registration.
- Đã cài `oposso_setup.msi` trên máy build bằng `-Device Printer` không dùng
  `-Force`. Read-back đạt ProductCode `{C9033567-42A8-4CB3-8588-C08232FC3CA8}`,
  CLSID `{8AE1B055-8D25-4111-9303-A4352C930CAE}`, server
  `C:\Windows\SysWOW64\SHARPPTM20.dll` và SHA-256
  `7DFF66A4A851A0101B1582AAF9EBDB455D07F23307F7C2D3BABFB201C34EFDE3`.
- Sau cài đặt, `All -VerifyOnly` đạt đủ 5 nhóm không warning; regression và ba
  runtime COM/ServiceOPOS test đạt 4/4; build Host đạt 21 project, 0 lỗi,
  0 cảnh báo. Không chạy hardware open hoặc in thật.
- Đã deploy side-by-side output Debug Host mới sang máy POS tại
  `C:\Deploy\TabetPos.DebugNew\Host\AppServer`, không ghi đè thư mục
  `C:\Deploy\TabetPos.Debug`. Read-back xác nhận đủ 76/76 file khớp SHA-256
  với output máy build, gồm 12 PDB.
- Host cũ PID `7540` được dừng graceful bằng lệnh `Kill` qua Named Pipe và trả
  `Success=true`. Host DebugNew được khởi động trong RDP session `1`, PID `1384`;
  process tiếp tục sống, pipe `TabetPos.Host.Command` tồn tại, `msvsmon.exe`
  đang chạy và TCP 4026 reachable. Temporary scheduled task dùng để tạo process
  interactive đã được xóa sau khi start; OPOS/Registry không thay đổi.

- Source migration và UI integration đã được commit tại
  `a2d80d5ed2dc22054ad9d6da2d79306ebadf11db` trên branch `develop`.
- POSPrinter CCO runtime và ProgID activation đã được commit tại
  `677f4cda35527f5491241bcf5c8f856425d3aeb8` trên branch `develop`.
- Build `TabetPos.Applications.csproj --no-restore`: 12 project, 0 error,
  0 warning.
- Build `TabetPos.Host.slnx --no-restore`: 21 project, 0 error, 0 warning.
- Test App `TabetPos.Test.csproj --no-build`: 62 passed.
- Test runtime OPOS sau khi cài POSPrinter CCO: 3 active tests passed, test
  `Open(logicalName)` phần cứng chủ động skip.
- `PrinterByOpos.Tests`: 5 passed; `PaymentByCafisArch.Tests`: 5 passed.
- Sau khi common hóa OPOS Claim timeout, build `PrinterByOpos.csproj` và
  `PaymentByCafisArch.csproj` đều đạt 2 project, 0 error, 0 warning; source chỉ
  còn một literal `5000` tại `TabletDeviceConst` và hai caller tham chiếu nó.
- CodeGraph đã refresh sau khi stage và đọc được trực tiếp các class mới
  `CafisArchPaymentDevice`, `OposPrinterDevice` và
  `DeviceIntegrationTestViewModel`; không còn file Payment/Printer ngoài index.
- Runtime COM test không còn báo lỗi payment; `CatCO.ocx` tạo được COM object.
- Runtime COM x86 tạo được `OPOS.POSPrinter`, đọc được description/version
  `OPOS POSPrinter Control 1.14.001 [Public, by CRM/MCS]` / `1014001`.
- Printer project build đạt 2 project, 0 error, 0 warning; installer trong repo
  chạy lặp lại qua UAC với exit code 0 và read-back đúng ProgID, CLSID,
  `InprocServer32` cùng SHA-256
  `8C1B31C39E8880851FD71BE1A62793526177EF3DFBEBCD4503BD14ABF4068AF0`.
- File SHARP legacy trong repo có version `1.1.0.3` (`OPOS 1.5`), x86 và
  SHA-256 `21A837940126791351D1AA7376DB07E34EB50E52A8C9D78DCD5258CFAAE82A64`;
  type library đọc trực tiếp từ OCX khớp GUID của
  `Interop.POSPRINTERLib.dll` trong SVN.
- Sau khi đổi payload và expected CLSID, build `PrinterByOpos.csproj` đạt 2
  project, 0 error, 0 warning; `PrinterByOpos.Tests` đạt 5/5; build
  `TabetPos.Host.slnx` đạt 21 project, 0 error, 0 warning.
- Elevated installer trả exit code 0 và log `SUCCESS`; read-back xác nhận
  ProgID, CLSID, file đích và SHA-256 đều đúng, còn CLSID Monroe
  `{CCB90152-B81E-11D2-AB74-0040054C3719}` không còn đăng ký.
- Test `OposComControls_AreRegisteredAndCanBeCreated` đạt 1/1 sau khi cài, chứng
  minh Host tạo được các COM control đang cấu hình, gồm SHARP legacy POSPrinter.
- Sau khi dọn MSR/PINPad, build Host vẫn đạt 21 project, 0 error, 0 warning;
  `PaymentByCafisArch.Tests` đạt 4/4.
- Hash của hai CAFIS runtime payload khớp bản đang cài tại `C:\OPOS`:
  `EEDF42C7F0C58B0149A07C434B8154342DAF22544A61AAC014C6BCED4424FACE` và
  `6B57F76434A1CC5FD2AFC77285C108103CF96C8D2FF94593B381A654CE90C241`.
- Registry32 read-back xác nhận CLSID
  `{3B8A21F2-2E86-413F-BC10-87FAAC94D01E}` và TypeLib
  `{C2128DA8-0760-4E6D-BA71-FFF0DD653C7F}` trỏ tới đường dẫn ổn định. Backup
  trước thay đổi nằm tại `scratch/opos-registry-backup-20260817/`.
- `ARCH-HOST-01` vượt qua basic-design gate, customer document quality lint,
  terminology audit, Excel validation và semantic read-back; Office Script
  sinh lặp lại cho cùng 6 hash và audit đủ shape/edge.
- Source gốc máy in đã được trích xuất và kiểm hash trong
  `scratch/printer-migration-source/README.md`, gồm `Ks2_DeviceControls`,
  `Ks2_ReceiptControls`, formatter, OCX overlay và prototype C# liên quan.
- Tìm kiếm trong `TabetPos.Host/src` và `TabetPos.Host/tests` không còn khớp
  `MSR`, `PINPad`, `MsrUse` hoặc `EnablePINEntry`.
- Registry read-back xác nhận không còn
  `HKLM\SOFTWARE\WOW6432Node\OLEforRetail\ServiceOPOS\MSR` và
  `HKLM\SOFTWARE\WOW6432Node\OLEforRetail\ServiceOPOS\PINPad`. Bản khôi phục
  nằm tại `scratch/opos-registry-backup-20260817-msr-pinpad-cleanup/`; các nhánh
  CashChanger, CashDrawer, CAT, ElectronicValueRW, LineDisplay, POSPrinter và
  Scanner vẫn tồn tại.
- Static verification của package xác nhận cú pháp PowerShell hợp lệ trên
  Windows PowerShell, 15 manifest payload binding tồn tại và khớp SHA-256, mọi
  payload path đều tương đối với runtime root, và manifest không chứa
  MSR/PINPad.
- Build `TabetPos.Host.slnx --no-restore` sau cleanup đạt 21 project, 0 error,
  0 warning. `TabletDeviceSettingBase.Tests` đạt 4 tests; runtime matrix khớp 5
  thiết bị Host, còn mapping printer được coi là optional khi vendor ProgID
  ngoài package chưa tồn tại.
- Lượt cài `All -Force` đã chuyển COM registration của các thiết bị được quản lý
  sang binary trong repo. Read-back sau đó xác nhận ProgID, CLSID, path và hash
  của các COM component đều đúng.
- Full verification sau cleanup xác nhận CashChanger, CashDrawer, CustomerDisplay,
  SHARP POSPrinter CCO và CAFIS Arch đều khớp
  Registry32 ProgID/CLSID/path/hash và ServiceOPOS thuộc package. Warning duy
  nhất là external printer SO `SHARP.PtrPTM20P01` chưa được cài.
- Build ApplicationUtils, ApplicationControls project, Applications, Host,
  App tests và UI test project đều đạt 0 error, 0 warning.
- Sau source cleanup, build `TabetPos.Host.slnx` đạt 21 project và build
  `TabetPos.Applications.csproj` đạt 17 project, đều 0 error/0 warning. Output
  `Host/AppServer` của App chứa đủ 12 assembly Host, gồm cả CashChanger,
  CashDrawer, CustomerDisplay, Printer và Payment.
- Toàn bộ 5 project test Host đạt 45 test, 0 warning; riêng
  `DeviceHostCore.Tests` đạt 27/27 và thoát process thành công sau khi sửa hai
  lỗi shutdown/send event.
- `All -VerifyOnly` tiếp tục thành công cho 5 runtime sau khi dọn source;
  warning duy nhất vẫn là external printer SO `SHARP.PtrPTM20P01` chưa có.
- `oposso_setup.msi` trong repo khớp SHA-256 nguồn trên máy POS:
  `36D289E6FE7951DB62C419B5B9427684C2A128462133FB6479DC8D3EB337CAA6`.
  Metadata MSI khớp manifest: SHARP product version `1.0.2`, ProductCode
  `{C9033567-42A8-4CB3-8588-C08232FC3CA8}`.
- PowerShell parser trả 0 lỗi, `-List` đọc được Printer gồm Common Control và
  Service Object. Trên máy dev, `-VerifyOnly -Device Printer` xác nhận Common
  Control đúng rồi báo rõ MSI/ProgID chưa cài mà không ghi hệ thống. Read-back
  chỉ đọc trên máy POS xác nhận ProductCode/version, ProgID
  `SHARP.PtrPTM20P01`, CLSID `{8AE1B055-8D25-4111-9303-A4352C930CAE}` và hash
  của `C:\Windows\SysWOW64\SHARPPTM20.dll` đều khớp manifest.

### Follow-up 2026-08-18: probe an toàn đủ 5 Host device

- Đã bổ sung chế độ `ConnectivityOnly` cho peripheral integration runner. Chế
  độ này gọi thật Host/OPOS cho `CashChanger`, `CustomerDisplay`, `Printer`,
  `CashDrawer` và `Payment`, đồng thời chặn các method mở drawer, di chuyển
  tiền, in biên lai, giao dịch payment và reprint.
- Drawer theo contract đã chạy trong `sources/Refer/MauiPOSHost`: App gửi
  `CheckDrawerStatus`, Host claim/enable tạm thời, đọc `DrawerOpened`, rồi
  disable/release trong `finally`; không gọi `OpenDrawer`. `Device_Open` chỉ
  đánh dấu opened khi OPOS trả success.
- Payment reflection wrapper được sửa để bóc `TargetInvocationException` và
  ghi đúng inner exception type. Runner chỉ chấp nhận `COMException` tại
  Open/Claim/Enable hoặc OPOS result dương không có exception là trạng thái
  thiết bị không sẵn sàng; lỗi mapping, timeout và exception nội bộ khác vẫn
  là FAIL. Payment request/response JSON được redact khỏi evidence.
- Local verification: Host đạt 50/50 test, App command spy đạt 9/9, runner và
  App/Host Debug build 0 lỗi, 0 cảnh báo.
- POS run `20260818-164318` tại `C:\Deploy\TabetPos.DebugNew` đạt 15 PASS,
  0 FAIL, 0 SKIP với 14 command. CashChanger, CustomerDisplay, Printer và
  CashDrawer trả success; Drawer trả `DrawerOpened=False`. Payment tới đúng
  CAFIS control nhưng terminal không có/sẵn sàng nên Open trả COM/OPOS 111 và
  HealthCheck trả OPOS 101; đây là evidence mapping/OPOS connectivity, không
  phải evidence giao dịch payment thành công.
- Guard hậu kỳ xác nhận đủ 5 DeviceId, 0 forbidden physical command, 0 raw
  Payment JSON. Host PID `9064` và App PID `4788` tiếp tục chạy trong RDP
  session `1`; pipe vẫn ready sau test. Evidence local nằm tại
  `scratch/evidence/pos-peripherals/20260818-164318/`.
- Dọn Rider/source tree sau rename `b484ac1`: xóa hai thư mục legacy ignored
  `TabetPos.Host/src/KsClient` và `TabetPos.Host/src/KsDevice` gồm 206 file chỉ
  thuộc `bin/obj`, không có source hoặc file Git track. Đồng thời bỏ 7 đường
  dẫn highlight `KsPos.*` và cấu hình chạy `Ks2_DeviceServer.AppServer.exe`
  obsolete trong `.idea/workspace.xml`. Audit không còn legacy path active;
  build `TabetPos.Host.slnx` đạt 21 project, 0 lỗi, 0 cảnh báo.
- Đổi checkout local từ `sources/KsPosBoilerplate` sang
  `sources/TabetPosBoilerplate`, cập nhật project registry và toàn bộ đường dẫn
  source-of-truth tương ứng. Xóa thêm năm cây `KsDeviceDefinition`,
  `KsDeviceManager`, `KsDeviceSettingBase`, `KsHost` và
  `KsDeviceSettingBase.Tests` cũ gồm 353 file chỉ thuộc `bin/obj`; không còn
  thư mục source do repo sở hữu bắt đầu bằng `Ks` và không còn reference tới
  đường dẫn checkout cũ. Đồng bộ thêm 35 file knowledge/management từ các tên
  project nội bộ `KsPos.*`, `KsHost`, `KsDeviceManager` sang tên `TabetPos.*`,
  `TabletHost`, `TabletDeviceManager`, đồng thời đổi knowledge root thành
  `project-store/knowledge/tabet_pos_boilerplate`; audit tên nội bộ cũ trả 0
  dòng. Các
  symbol `KsUtility`, `KsClassID`, `KsLogControls`,
  `KsApplicationControls` và `KsMemoryMappedFile` được giữ nguyên vì là binary
  API từ `legacyBin`, không phải tên project nội bộ. Sau đổi tên, Host build đạt
  21 project, 0 lỗi, 0 cảnh báo và `PeripheralCommandSpyTests` pass 9/9.
- Đã commit đúng phạm vi Host, DeviceCtrl, peripheral tests, Rider run profiles
  và remote debug tooling tại `13e4621` (`feat: harden POS host integration and
  debug tooling`), rồi push lên `origin/develop`. Read-back bằng `ls-remote`
  xác nhận remote và local cùng SHA
  `13e4621d359d0e9f9abc45b1ca52a42c4a5ec58c`. Các thay đổi UI/Figma và package
  bump có sẵn không thuộc task vẫn giữ local, không nằm trong commit.
- Tạo root solution `sources/TabetPosBoilerplate/TabetPos.sln` để Rider mở một
  lần toàn bộ App, Core, DeviceCtrl, Host, test và peripheral runner. Đối chiếu
  xác nhận solution chứa đúng 28/28 file `.csproj`. App, `AppServer` và runner
  vẫn là process/run configuration riêng; debug multi-process dùng Multi-Launch
  hoặc attach từng process, không gộp lifecycle. Full solution build trên
  Windows có thể kéo cả iOS/Android/UI test, nên workflow POS chỉ build/debug
  Windows App và Host x86 theo cấu hình tương ứng.
- Viết lại toàn bộ ba README active của source repo theo luồng dễ tra cứu:
  root README giải thích kiến trúc, Rider, remote POS và build/test; Host README
  phân biệt normal mode tự khởi động với `DEBUG` UI, Named Pipe, command order
  và năm device factory; OPOS README đưa quick start, `-VerifyOnly`, `-Force`
  và troubleshooting lên cấu trúc rõ ràng. Audit xác nhận 3/3 README có code
  fence cân bằng, link nội bộ tồn tại, không còn thuật ngữ project cũ; command
  `Install-DeviceRuntime.ps1 -List` trả đúng năm device và exit code 0.
- Đã tách hành vi `TabetPos.BindingLibrary/Epos2iOS` theo hệ điều hành. Trên
  Windows project dùng `net10.0`, tắt binding và default compile nên không phân
  tích các API `Foundation/UIKit/ObjCRuntime`; trên môi trường khác project vẫn
  dùng `net10.0-ios` và là binding project thật. Root `TabetPos.sln` vẫn hiển
  thị project để điều hướng nhưng không có `Build.0`, vì vậy Rider Build Whole
  Solution không build trực tiếp iOS binding. Khi build target iOS,
  `TabetPos.DeviceCtrl` vẫn kéo binding vào bằng conditional ProjectReference.
- Verification trên Windows: build trực tiếp `Epos2iOS.csproj` đạt 1 project,
  0 lỗi, 0 cảnh báo; build `TabetPos.DeviceCtrl.csproj` cho
  `net10.0-windows10.0.19041.0` đạt 2 project, 0 lỗi, 0 cảnh báo. Audit solution
  xác nhận GUID Epos2iOS chỉ còn `ActiveCfg`, không còn dòng `Build.0`.
- Đã sửa Rider profile `POS - Logs` trong `tools/PosDebug.ps1` để stream đúng
  `Host/LOG/AppServer.runtime.log` thay vì chờ file log4net legacy không tồn
  tại. PowerShell local và remote cùng khóa input/output/pipeline về UTF-8 không
  BOM cho mọi mode Validate, Deploy, Run và Logs; progress bị tắt và chỉ
  metadata progress CLIXML bị lọc, còn lỗi SSH thật vẫn được giữ. Host runtime
  log vốn ghi UTF-8 không BOM và Logs đọc tường minh bằng UTF-8. Chạy thử trên
  POS xác nhận log command hiển thị liên tục, tiếng Nhật đúng encoding và không
  còn `#< CLIXML`; strict UTF-8 audit đạt 3/3 file lõi và scan source liên quan
  không tìm thấy ký tự thay thế hoặc mẫu mojibake.
- Đã nâng `DeviceIntegrationTestPage` thành Device Test Workbench ở tầng
  Application, không sửa contract/runtime của DeviceCtrl hoặc Host. Một provider
  Application bọc bảy strategy CashChanger, CustomerDisplay, Printer,
  CashDrawer, Payment, Scanner và Keyboard; ViewModel giữ session Start/End,
  state riêng từng thiết bị và chỉ cho chạy command hợp lệ theo state.
- Workbench có input và command tương ứng với contract đang support, hiển thị
  các command Refer chưa map là `Unsupported`. Thao tác vật lý như deposit,
  dispense, in/cắt, mở drawer và payment/reprint mặc định bị khóa, phải bật
  `PhysicalOperationsEnabled`; guard nằm cả trong command handler nên không thể
  bypass chỉ bằng cách gọi command từ code/test.
- Operation log giữ tối đa 300 dòng mới nhất, gồm App operation ID, Host request
  ID khi exception trả về, device/command, state trước-sau, duration, result
  code/extended, stage, exception type và message. Payment request/response JSON
  không được ghi log. Scanner chờ dữ liệu trên background task để không khóa UI;
  thoát trang cleanup best-effort mọi session.
- Bổ sung 3 Application boundary test cho CashChanger state order, physical
  guard, Payment redaction và lifecycle của đủ bảy panel. Build Windows đạt 17
  project, 0 lỗi, 0 cảnh báo; toàn bộ `TabetPos.Test` đạt 74/74, 0 warning, gồm
  cả 9 peripheral command spy hiện có. Scan source mới không có mojibake.
- Đã chỉnh layout Workbench để mọi action button có khoảng cách ngang/dọc 10px
  khi wrap; riêng Printer tách Start/End khỏi nhóm Print commands để tránh dải
  nút dính sát nhau. Commit `1c24299733ad0e4d347c5aabd45fc97dd8598c87`
  (`feat: add application device test workbench`) đã được push lên
  `origin/develop`; read-back `ls-remote` xác nhận remote trùng đúng commit.
  Build Windows sau chỉnh layout vẫn đạt 17 project, 0 lỗi, 0 cảnh báo và toàn
  bộ `TabetPos.Test` đạt 74/74.

### Follow-up 2026-08-19: parity chức năng và tách orchestration khỏi DeviceCtrl

- Đã đối chiếu command surface của `sources/Refer/MauiPOSHost` và migration các
  lệnh an toàn còn thiếu cho CashChanger, CustomerDisplay và Printer. DeviceCtrl
  chỉ còn contract/typed result cùng mapping Named Pipe nguyên tử; chuỗi nghiệp
  vụ recovery, tính tiền thừa rồi dispense, và gom từng dòng receipt được thực
  hiện tại tầng Application.
- CashChanger có thêm deposit details, cash counts, collect, clear input,
  dispense cash/change, DirectIO, coin/bill/full status, mode, seisa và nhóm
  async status/event. CustomerDisplay có descriptor/window/refresh/DirectIO cùng
  LinDsp/Telop. Printer có text, bitmap, barcode/QR và cut nguyên tử.
- Host vẫn giữ composite receipt cũ để tương thích caller hiện hữu, nhưng
  Device Test Workbench mới không gọi composite này; Application phân rã receipt
  thành các lệnh printer nguyên tử. Lifecycle Start/End vẫn gom Open/Claim/Enable
  vì đây là quản lý session kỹ thuật, không phải nghiệp vụ bán hàng.
- Verification local đạt `TabetPos.Test` 75/75, `DeviceHostCore.Tests` 30/30,
  `PrinterByOpos.Tests` 6/6 và `DevicePipeline.Tests` 3/3; tất cả 0 warning.
  Test recovery xác nhận thứ tự Fix → End → EndDepositFlagOn, test receipt xác
  nhận không gọi Host composite, và test QR xác nhận bật/tắt BinaryConversion.
- Commit `ee399f350178d66844f8903fcaa51da4d4eca385`
  (`feat: complete device command migration`) đã được push lên `origin/develop`;
  read-back `ls-remote` xác nhận local và remote cùng SHA. Commit chỉ chứa 24
  file migration; các thay đổi local ngoài task vẫn để nguyên unstaged.

### Follow-up 2026-08-19: bỏ physical guard và chuẩn hóa Workbench tiếng Nhật

- Đã xác nhận `物理操作を許可`/`PhysicalOperationsEnabled` không tồn tại trong
  test form của source tham chiếu MauiPOSHost. Source tham chiếu bật toàn bộ
  operation button ngay sau khi kết nối thành công; physical guard là logic được
  thêm riêng khi dựng Workbench và không thuộc contract DeviceCtrl/Host.
- Đã xóa hoàn toàn toggle, physical guard và style nút màu cam. Sau `Start`, mọi
  command của panel được phép gọi khi thiết bị đã kết nối; CashChanger vẫn cập
  nhật state theo kết quả lệnh nhưng không chặn kỹ thuật viên thử command theo
  thứ tự khác.
- Toàn bộ tiêu đề, nhãn trường, trạng thái và nhãn nghiệp vụ của Workbench được
  chuẩn hóa sang tiếng Nhật. Tên hàm/API được giữ trong ngoặc để truy vết kỹ
  thuật. CustomerDisplay được chia thành ba nhóm: nội dung/vị trí hiển thị,
  descriptor/window và DirectIO/telop; mỗi input có nhãn nhỏ mô tả mục đích.
- `TabetPos.Test` đạt 75/75 test, 0 warning. Audit source không còn
  `PhysicalOperationsEnabled`, `PhysicalButton` hoặc `物理操作を許可`; XAML được
  compile qua source generator trong lượt test.

### Follow-up 2026-08-19: tích hợp CashChanger ForceRecovery

- Đã đối chiếu `⚠ 強制回復` của MauiPOSHost: đây là chuỗi khôi phục OPOS mạnh,
  khác `RecoveryDeposit` thông thường và khác hoàn toàn `HardReset` của
  `GlorySerialController`. DeviceCtrl không ánh xạ lệnh này sang serial
  controller khi chưa có contract/protocol tương ứng.
- Host sở hữu toàn bộ chuỗi `CashChangerForceRecovery`: đóng session hiện tại,
  mở/claim/enable OPOS, chạy `FixDeposit → EndDeposit(REPAY) → ClearInput`, xóa
  trạng thái session, đóng/mở và claim/enable lại, sau đó kiểm tra `FullStatus`.
  Không nuốt lỗi như source tham chiếu: từng bước trả `ResultCode`,
  `ResultCodeExtended` và message; chỉ thành công khi mọi bước đạt và
  `FullStatus=CHAN_STATUS_OK`.
- DeviceCtrl chỉ expose typed `CashChangerForceRecoveryResult`. Application sở
  hữu xác nhận hai bước và state UI; nút `⚠ 強制復旧 (ForceRecovery)` nằm riêng
  trong nhóm `保守操作`, vẫn cho phép gọi khi session đang lỗi/chưa kết nối để
  phục vụ cứu hộ. Hủy ở một trong hai xác nhận không gửi command; lỗi Host đưa
  CashChanger về `Faulted`, không báo `Ready` giả.
- Verification local đạt `TabetPos.Test` 78/78 và `DevicePipeline.Tests` 3/3,
  tất cả 0 warning. Test bao phủ hai bước xác nhận, result lỗi, JSON typed mapping
  và tuyến Application → DeviceCtrl → named pipe → Host method ID.

### Follow-up 2026-08-19: khôi phục feed giấy trước khi cắt

- Ảnh chạy thật cho thấy QR nằm sát và bị dao cắt đi qua mép dưới. Đối chiếu
  MauiPOSHost xác nhận composite receipt cũ không có API `FeedPaper` riêng mà
  dùng `PrintNormal(station, "\n\n\n\n")` để đẩy bốn dòng, sau đó mới gọi
  `CutPaper(90)`.
- Atomic receipt flow tại Application và composite compatibility flow trong
  Host trước đó đều gọi thẳng `CutPaper(100)`, nên thiếu đúng bước feed đã có ở
  source tham chiếu. Đã sửa cả hai flow thành `PrintNormal` bốn newline rồi
  `CutPaper(90)`; nếu feed lỗi thì không tiếp tục cắt.
- Regression test bắt thứ tự QR/barcode → feed bốn dòng → cut 90%. Verification
  local đạt `TabetPos.Test` 79/79 và `PrinterByOpos.Tests` 6/6, đều 0 warning.
  Chưa chạy lại trên máy in OPOS thật sau thay đổi này.

### Follow-up 2026-08-19: lifecycle và capability của CustomerDisplay

- `CustomerDisplay.Start` không còn chỉ kiểm tra trạng thái Open. Host xác nhận
  lần lượt trạng thái Open, Claim và DeviceEnabled; lỗi `Device_Start` được trả
  về với stage `DeviceStart` thay vì tiếp tục gọi OCX rồi báo Ready giả.
- Host trả `CapDescriptors`, `CapHMarquee`, `CapVMarquee`, `DeviceWindows`,
  `Rows` và `Columns` trong response `DeviceUse`. DeviceCtrl giữ capability dưới
  typed model; Application dùng capability để hiển thị `未対応` và không gửi
  descriptor/window command mà thiết bị không hỗ trợ.
- Viewport của `CreateWindow` được tách khỏi tọa độ `DisplayTextAt`, mặc định
  `(0,0,2,20)`, và được validate theo Rows/Columns cùng quan hệ
  window-size ≥ viewport-size trước khi gửi Host. `DestroyWindow` và
  `RefreshWindow` chỉ được bật sau khi `CreateWindow` thành công.
- Verification local đạt `TabetPos.Test` 83/83, `DevicePipeline.Tests` 3/3 và
  `DeviceHostCore.Tests` 30/30; project `CustomerDisplayBySharp` build sạch
  0 error, 0 warning. Test bao phủ capability payload xuyên Host → DeviceCtrl,
  trạng thái `未対応`, viewport zero-origin, validation và window lifecycle.

### Follow-up 2026-08-19: hoàn thiện Raw Input bàn phím và cấu hình scanner serial

- Đã xác nhận transport Windows đang hoạt động: DENSO scanner dùng
  `SerialHandyScannerStrategy` mở COM trực tiếp; bàn phím SHARP dùng Windows
  Raw Input. Tên command `OPOS_Keyboard*` trong MauiPOSHost là protocol qua
  Named Pipe, còn Host vẫn đọc bàn phím bằng Raw Input chứ không có OPOS
  Keyboard Control.
- DeviceCtrl không còn bỏ qua hầu hết tín hiệu bàn phím. Bộ compose phát mọi
  phím thường, ghép `Shift + key` thành `0x1000 | VirtualKey`, xử lý nhấn
  `Insert` hai lần thành `0x2D2D`, đồng thời trả VirtualKey, scan code, VID/PID
  và cờ bàn phím chuyên dụng. Thiết bị SHARP được nhận diện theo `VID_04DD` như
  MauiPOSHost tham chiếu.
- Mapping mã phím sang nhãn nghiệp vụ tiếng Nhật đã chuyển khỏi DeviceCtrl sang
  tầng Application. DeviceCtrl chỉ giữ input/identity của thiết bị; Workbench
  hiển thị cả mã raw, nhãn nghiệp vụ và device ID, đồng thời vẫn cho thấy phím
  thường chưa có mapping nghiệp vụ.
- `WindowsRawKeyboardStrategy.Start` không còn nuốt lỗi hook/register Raw
  Input. Workbench chỉ chuyển sang Ready sau khi lấy được MAUI window handle,
  đăng ký Raw Input và hook WndProc thành công; lỗi Start được log và giữ state
  Disconnected.
- Scanner đã dùng đúng `ComPort`, baud rate, parity, data bits, stop bits và
  handshake trong `DeviceSpec`; lỗi cũ luôn ép về COM7 khi có config đã được
  loại bỏ. Kết nối serial thất bại giờ throw để Workbench không báo kết nối
  thành công giả.
- Toàn bộ `TabetPos.Test` đạt 88/88. Test mới bao phủ phím thường, Shift
  composite, double Insert, mapping Application, cấu hình COM9 và keyboard
  Start failure không báo Ready. Build trực tiếp test dependency đạt 0 warning,
  0 error; root `TabetPos.sln` build đủ 28 project, 0 error. Các warning của
  full solution nằm ở Android Epson binding metadata đã tồn tại ngoài scope.

### Follow-up 2026-08-19: hoàn thiện command OPOS và testcase Workbench

- Đã đối chiếu trực tiếp ba COM interface vendor `IOPOSCashChanger`,
  `_DLineDisplay` và `_DDrawer`. Workbench bổ sung các lệnh bảo trì dùng chung
  `CheckHealth`, `RetrieveStatistics`, `ResetStatistics`, `UpdateStatistics`
  và lấy toàn bộ property OPOS; CashChanger bổ sung `AdjustCashCounts`,
  `CompareFirmwareVersion`, `UpdateFirmware`; CashDrawer bổ sung `DirectIO` và
  `WaitForDrawerClose`.
- Bốn command CashChanger đã có Host mapping nhưng chưa có action độc lập tại
  Application cũng được đưa ra Workbench: `EndDepositFlagOn`, `ClearHandle`,
  `DataEventCount` và `Answer`. Command stale `CashChangerEnq2` được loại khỏi
  method ID vì không có caller và không thuộc COM interface hiện hành.
- `Open`/`ClaimDevice`/`DeviceEnabled` tiếp tục được quản lý nguyên tử trong
  `Start`; `ReleaseDevice`/`Close` nằm trong `End`. Các callback Service Object
  `SOData`, `SODirectIO`, `SOStatusUpdate` và các callback dummy không phải
  command do kỹ thuật viên gọi nên không tạo nút/testcase riêng.
- Testcase thủ công `TC-IT-DEVICE-02` tăng từ 68 lên 92 case, chia theo bảy
  thiết bị: CashChanger 42, Customer Display 19, Printer 9, CashDrawer 11,
  Payment 5, Scanner 3 và Keyboard 3. Workbook có đúng tám sheet gồm thay đổi
  lịch sử và bảy sheet thiết bị, giữ freeze pane `AE11`, validation, công thức
  và layout đọc được sau render toàn bộ sheet.
- Verification local: `TabetPos.Host.slnx` build đủ 21 project, 0 error,
  0 warning; toàn bộ `TabetPos.Test` đạt 91/91, trong đó nhóm
  `DeviceIntegrationTestViewModelTests` đạt 14/14; DeviceCtrl build đạt 0 error
  với một warning `CS4014` đã tồn tại ngoài scope. Validator
  Markdown đạt đúng 92 case, regression renderer đạt 10/10 và workbook
  read-back đạt đúng 92 ID, không có công thức `#REF!`.

### Follow-up 2026-08-19: PeripheralIntegrationRunner 92 case trên POS thật

- Đã xóa toàn bộ project unit/UI/Host test và reference tương ứng khỏi root
  solution cùng Host solution; `PeripheralIntegrationRunner` là test runner duy
  nhất còn lại. Runner tự kiểm tra đúng 92 ID `IT-DEVICE-001..092`, không thiếu
  hoặc trùng, và phân biệt `PASS`, `FAIL`, `PENDING`; OPOS lỗi không còn được
  chuyển thành PASS. Build runner 3 project và Host solution 14 project đều đạt
  0 error, 0 warning.
- Lượt thực máy OPOS-only `20260819-172400` trên POS `192.168.9.176`, deploy root
  `C:\Deploy\TabetPos.DebugNew`, đạt coverage 92/92: 53 PASS, 9 FAIL, 30 PENDING,
  gửi 75 Host command. Payment 5 case và scanner/keyboard 6 case được chủ động
  để PENDING theo phạm vi chạy; không gửi command tới các thiết bị này. Evidence
  local nằm tại `scratch/evidence/pos-peripherals/20260819-172400/pos/`.
- CashChanger PASS 25 case, gồm deposit 0円 Begin/Pause/Fix/End/Recovery,
  `DispenseChange(0,10)`, status, Seisa, ClearInput, change 0円,
  EndDepositFlagOn, ClearHandle, DataEventCount và CheckHealth. Printer PASS đủ
  9/9 gồm text, JAN13, JAN8, QR, cut 100%, bitmap và full receipt. Customer
  Display PASS 13 case gồm viewport `0,0`, marquee, Create/Refresh/Destroy window,
  DirectIO, LinDsp/Telop. CashDrawer PASS Start/End/status/open,
  RetrieveStatistics và WaitForDrawerClose.
- Lượt `20260819-172400` ban đầu giữ chín lỗi thực làm evidence: CashChanger
  OpenDrawer RC=113, AsyncStart RC=-1, ForceRecovery fail tại FixDeposit, Answer
  null; CustomerDisplay và CashDrawer CheckHealth RC=106; snapshot OPOS thiếu
  `State` ở CashChanger và thiếu `OPOSConstData`/`State` ở Display/Drawer.
- Sau khi sửa Host và runner, lượt xác nhận cuối `20260819-180150` trên cùng POS
  đạt coverage 92/92: 63 PASS, 0 FAIL, 29 PENDING, gửi 82 Host command. Evidence
  local nằm tại
  `scratch/evidence/pos-peripherals/20260819-180150/pos/summary.md`; app POS được
  khôi phục sau test. AsyncStart/AsyncEnd trả đúng kết quả OPOS; Answer null-safe;
  ForceRecovery phân biệt bước cleanup không bắt buộc; property snapshot chỉ đọc
  54/44/22 property thực sự được control cung cấp và không còn lỗi.
- CashChanger OpenDrawer trên thiết bị thật đi tới trạng thái RC=114,
  Extended=217 `collection cassette removal wait`; runner chỉ coi đúng cặp mã
  này là PASS vì xác nhận được chuyển trạng thái vật lý mong đợi. CustomerDisplay
  và CashDrawer CheckHealth được thử đủ level 1/2/3 sau Open/Claim/Enable; service
  object đều trả RC=106, Extended=1 nên hai case được ghi PENDING có lý do cụ thể,
  không còn là FAIL hoặc lỗi chung.
- Theo quyết định sau lượt test thật, đã bỏ nút và testcase CheckHealth của
  CustomerDisplay/CashDrawer vì service object thực tế không hỗ trợ; vẫn giữ
  CheckHealth của CashChanger và HealthCheck riêng của CAFIS Payment. Catalog
  hiện tại có 90 ID, loại `IT-DEVICE-081` và `IT-DEVICE-086`; mapping-only đạt
  90/90. Tài liệu `TC-IT-DEVICE-02` và workbook được cập nhật lên 1.1.1, đúng 90
  case. Chưa chạy lại toàn bộ thiết bị sau thay đổi chỉ loại testcase này; nếu
  chiếu theo evidence thực `20260819-180150` thì còn 63 PASS, 0 FAIL, 27 PENDING.

### Follow-up 2026-08-20: timeout `CashChangerForceRecovery`

- Log read-only trên POS tại
  `C:\Deploy\TabetPos.DebugNew\Host\LOG\AppServer.runtime.log` cho thấy ba lần
  `CashChangerForceRecovery` lúc 19:02, 19:03 và 19:04 đều hoàn tất phía Host
  với `ResultCode=0`, sau khoảng 8 giây, rồi ngay lập tức ghi `Pipe is broken`.
- Evidence runner dùng timeout dài hơn đã nhận response đầy đủ trong khoảng
  7,8–8,4 giây với `FullStatus=0`, xác nhận thiết bị phục hồi xong và lỗi quan
  sát ở App là timeout transport, không phải lỗi hoàn tất recovery của Host.
- `OposCashChangerStrategy.ForceRecovery` truyền
  `ResponseTimeoutMilliseconds=10000`; `NamedPipeClient` dùng key này làm
  timeout phản hồi chính xác, không cộng thêm timeout kết nối 5 giây. Dialog
  tiếng Nhật nêu thao tác có thể mất khoảng 10 giây và yêu cầu không thực hiện
  thao tác khác cho đến khi hoàn tất.
- `git diff --check` pass và CodeGraph parse lại thành công ba file đã sửa.
  Build local ban đầu bị chặn trước compile bởi `NETSDK1147` vì máy chưa có
  MAUI workload.
- Theo yêu cầu ngày 2026-08-20, máy build đã cài workload tổng `maui` cho SDK
  `10.0.400`; `dotnet workload list` xác nhận workload version `10.0.400.1` và
  MAUI manifest `10.0.20/10.0.100`. Build Windows của
  `TabetPos.Applications.csproj` sau đó đạt 17 project, 0 lỗi. Build còn 72
  cảnh báo, gồm `NU1903` cho `System.Security.Cryptography.Xml 10.0.0`; chưa
  thay đổi dependency để xử lý cảnh báo này.
- Đã cài tiếp Android SDK và Microsoft OpenJDK 17 vào
  `%LOCALAPPDATA%\Android`, đặt user environment `ANDROID_HOME` và `JAVA_HOME`.
  Sau cài đặt, `Epos2Android.csproj` build được không cần truyền path thủ công;
  build toàn bộ `TabetPos.sln` đạt 21 project, 0 lỗi, 0 cảnh báo. Các lỗi Rider
  `NU1015` cho `$(MauiVersion)` và `NU1012` cho `net10.0-android` không tái hiện
  sau khi workload/toolchain hoàn tất; Rider cần restart để nhận environment
  mới.
- Rider sau restart đã nhận đúng Android SDK/JDK nhưng Android binding task gặp
  `XARDF7024` khi xóa `generated\enums` trong `Epos2Android\obj` nằm dưới
  OneDrive reparse point. Không sửa source: local ignored path
  `Epos2Android\obj` được đổi thành junction tới
  `%LOCALAPPDATA%\TabetPosBuild\Epos2Android\obj`; build trực tiếp trong Rider
  sau đó đạt 0 lỗi, còn 101 warning binding metadata của Epson. Hai bản cache
  cũ được giữ có thể khôi phục dưới `scratch/quarantine/`.
- Ba shared Rider run configuration `POS - Run`, `POS - Deploy only` và
  `POS - Logs` đã được sửa để gọi đúng Windows PowerShell 5.1 với tham số
  `-File`; trước đó script path có khoảng trắng bị PowerShell tách tại
  `OneDrive\pm control`. `PosDebug.ps1 -Mode Validate` xác nhận SSH config và
  remote root hợp lệ. Local Rider workspace cũng được dọn hai run configuration
  auto-generated không thể chạy: UWP cũ của `TabetPos.Applications` và Android
  binding library `Epos2Android`; cấu hình MAUI `Windows Machine` vẫn được giữ.
- OneDrive được vô hiệu hóa theo yêu cầu để dừng đồng bộ workspace: process đã
  shutdown và startup state của user được đặt `Disabled`. Không uninstall ứng
  dụng, không xóa file local/cloud và các known folder vẫn đang trỏ vào
  OneDrive. Startup value gốc được ghi lại tại
  `scratch/onedrive-startup-backup-20260820.txt` để có thể khôi phục.

## Unresolved

- Chưa chạy cài mới trên một máy POS sạch. Máy `192.168.9.176` đã open và in
  giấy thật thành công bằng package/deploy hiện tại, nhưng một máy mới vẫn cần
  đúng USB printer và mapping USB riêng.
- Payment transaction vẫn chủ động để PENDING do chưa có môi trường CAFIS test.
  CashDrawer OpenDrawer và WaitForDrawerClose đã PASS trên lượt
  `20260819-172400`.
- `TabetPos.ApplicationControls.slnx` còn absolute project path của máy
  `C:\Users\koyamata\...`, nên build solution độc lập fail; build trực tiếp
  `TabetPos.ApplicationControls.csproj` và build qua Applications solution đều
  pass.
- Scanner và keyboard không chạy lại trong lượt OPOS-only theo quyết định phạm
  vi; sáu case được giữ PENDING. Firmware, vendor DirectIO, Collect,
  DispenseCash, AdjustCashCounts và thay đổi statistics cũng PENDING vì chưa có
  file/lệnh/buffer vendor đã xác nhận an toàn.
- CustomerDisplay thực tế báo `CapDescriptors=false`, vì vậy Set/ClearDescriptor
  PENDING; marquee và additional window đều chạy thành công. Hai CheckHealth của
  CustomerDisplay/CashDrawer vẫn PENDING vì service object không chấp nhận cả ba
  level chuẩn dù lifecycle Open/Claim/Enable đã thành công. Các lỗi property,
  AsyncStart, Answer, ForceRecovery và OpenDrawer của lượt đầu đã được xử lý và
  xác nhận lại ở lượt `20260819-180150`.
- Chưa deploy bản timeout 10 giây lên POS và chưa replay UI để xác nhận App nhận
  response trước hạn; lần kiểm tra tiếp theo cần đối chiếu không còn
  `Pipe is broken` sau `CashChangerForceRecovery`.

## Retrieval keys

- POSPrinter1 SHARPRECPRT80 PrinterPrintReceipt ReceiptJson
- Payment1 CAFIS Arch CAFIS_GenericPayment CAFIS_RePrint
- OPOS POSPrinter Common Control CLSID 056E4560
- POSPrinter.ocx SHA256 21A837940126 legacy SHARP CCO packaging
- CatCO.ocx stable InprocServer32 CAFIS Arch COM activation
- ARCH-HOST-01 v0.3.9 printer payment basic design
- Ks2_DeviceControls Ks2_ReceiptControls selective migration
- MSR PINPad excluded Host registry cleanup backup
- Install-DeviceRuntime DeviceRuntimeManifest Install-All-DeviceRuntime one-click OPOS package
- ServiceOPOS SHARPRZ4DP1B five-device Host runtime package
- DeviceHostCore 27 passed async NamedPipe event queue BlockingCollection shutdown
- AppServer direct five-device factory registration legacyBin ten owned DLLs
- oposso_setup.msi SHARP.PtrPTM20P01 ProductCode C9033567 SHARPPTM20.dll
- ApplicationControls slnx koyamata absolute path UI Appium iOS simulator
- VerifyOnly relocated package HostCom Registry.Contract CASHCHANGER host compatibility
- Printer Service Object required SHARPPTM20 vendor installer audit five devices
- DebugNew Host PID 1384 session 1 76 files 12 PDB msvsmon 4026
- 20260818-161414 POS peripheral integration 32 pass 31 commands CashChanger
- GuidanceError ResultCode -2 DirectIO 101 disabled DispenseChange 10
- CustomerDisplay ScrollText Direction 1 Printer PrintedLineCount 7
- CashDrawerBySharpForm resources startup load open session 1
- 20260818-164318 connectivity-only five Host devices CheckDrawerStatus
- Payment COMException Open 111 HealthCheck 101 no terminal 15 pass 14 commands
- Rider stale KsClient KsDevice bin obj workspace.xml cleanup b484ac1
- TabetPosBoilerplate checkout rename legacy Ks directories 353 bin obj files
- HostDeviceClassRegistry external legacy KsUtility KsClassID KsLogControls
- 13e4621 origin develop POS host integration debug tooling
- TabetPos.sln Rider 28 projects multi-process AppServer Applications runner
- README Rider Host OPOS quick start verify force troubleshooting
- Epos2iOS Windows placeholder EnableDefaultCompileItems false IsBindingProject
- TabetPos.sln Epos2iOS ActiveCfg no Build.0 DeviceCtrl conditional iOS reference
- PosDebug POS Logs AppServer.runtime.log UTF-8 no CLIXML Rider stream
- Device Test Workbench seven device Application state session physical guard
- DeviceIntegrationTestViewModel operation log payment redaction 74 tests
- 1c24299 origin develop Device Test Workbench button spacing Printer groups
- MauiPOSHost parity thin DeviceCtrl Application orchestration atomic commands
- CashChanger Fix End EndDepositFlagOn cash dispense DirectIO async full status
- CustomerDisplay descriptor window LinDsp Telop DirectIO Printer bitmap QR cut
- ee399f3 origin develop complete device command migration
- Device Test Workbench Japanese labels no physical guard all commands after Start
- CashChangerForceRecovery OPOS FixDeposit Repay ClearInput PostCheck two confirmations
- OPOS printer paper feed four newlines CutPaper 90 QR cut edge MauiPOSHost parity
- CustomerDisplay DeviceUse Open Claim DeviceEnabled capabilities viewport 0 0
- CapDescriptors CapHMarquee CapVMarquee DeviceWindows Rows Columns 未対応
- CustomerDisplay CreateWindow RefreshWindow DestroyWindow lifecycle validation
- WindowsRawKeyboardStrategy Raw Input VID_04DD VirtualKey ScanCode device ID
- KeyboardBusinessKeyMapper Shift 0x1000 double Insert 0x2D2D COM9 scanner serial
- TC-IT-DEVICE-02 92 manual cases OPOS maintenance statistics firmware properties
- OposCheckHealth RetrieveStatistics ResetStatistics UpdateStatistics GetProperties
- CashChanger AdjustCashCounts CompareFirmwareVersion UpdateFirmware EndDepositFlagOn
- CashDrawer DirectIO WaitForDrawerClose COM callbacks SOData excluded
- PeripheralIntegrationRunner current catalog 90/90 excludes IT-DEVICE-081 IT-DEVICE-086
- PeripheralIntegrationRunner real evidence 20260819-180150 63 pass 0 fail 29 pending 82 commands before exclusions
- OPOS-only Payment input devices pending CashChanger 25 Printer 9 Display 13 Drawer 6
- OPOS property State OPOSConstData RC106 RC113 AsyncStart Answer ForceRecovery
- CashChangerForceRecovery ResponseTimeoutMilliseconds 10000 Pipe is broken
- OposClaimTimeoutMilliseconds 5000 Printer Payment common constant
- 2026-08-19 19:02 19:03 19:04 Host ResultCode 0 App timeout 5 seconds
