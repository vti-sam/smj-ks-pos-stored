---
title: Migration máy in OPOS và CAFIS Arch payment vào App và Host
project: smj-ks-pos
type: lesson
status: stale
source:
  - sources/TabetPosBoilerplate/TabetPos.DeviceCtrl/
  - sources/TabetPosBoilerplate/TabetPos.Host/
  - sources/TabetPosBoilerplate/TabetPos.Test/
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

## Unresolved

- Chưa chạy cài mới trên một máy POS sạch. Máy `192.168.9.176` đã open và in
  giấy thật thành công bằng package/deploy hiện tại, nhưng một máy mới vẫn cần
  đúng USB printer và mapping USB riêng.
- Payment transaction và thao tác mở CashDrawer vẫn chủ động không chạy. Lượt
  `20260818-164318` đã xác nhận mapping/OPOS của Payment và đọc trạng thái
  CashDrawer an toàn, nhưng chưa chứng minh payment terminal hoặc mở drawer.
- `TabetPos.ApplicationControls.slnx` còn absolute project path của máy
  `C:\Users\koyamata\...`, nên build solution độc lập fail; build trực tiếp
  `TabetPos.ApplicationControls.csproj` và build qua Applications solution đều
  pass.
- `TabetPos.UITests` restore/build đạt 0 error, 0 warning nhưng test Appium iOS
  không chạy được trên máy Windows vì thiếu output
  `net10.0-ios\iossimulator-arm64\TabetPos.Applications.app` và môi trường iOS
  Simulator/Appium. Đây là environment limitation, không phải compile failure.

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
