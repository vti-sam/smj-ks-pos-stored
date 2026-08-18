---
title: OPOS OCX Runtime Setup
project: smj-ks-pos
type: runbook
status: active
source:
  - sources/TabetPosBoilerplate/TabetPos.Host/runtime/OPOS/
  - sources/TabetPosBoilerplate/TabetPos.Host/src/AppServer/Resources/host_device_config.json
tags: [smj-ks-pos, host, devices, opos, ocx, runtime]
scope: durable
updated_at: 2026-08-18
---

# OPOS / OCX Runtime Setup

## Mục tiêu và phạm vi

Runtime OPOS của `TabetPos.Host` được đóng gói tại:

```text
sources/TabetPosBoilerplate/TabetPos.Host/runtime/OPOS
```

Package chỉ quản lý 5 thiết bị có trong `host_device_config.json`:

| Installer device | Host class | Logical device / runtime |
|---|---|---|
| `CashChanger` | `CashChanger1` | `CASHCHANGER` → Glory RAD/RT-300 |
| `CashDrawer` | `CashDrawer1` | SHARP UPJ36DW3 |
| `CustomerDisplay` | `CustomerDisplay1` → `LineDisplay1` | SHARP RZ4DP1B OPOS LineDisplay |
| `Printer` | `POSPrinter1` | `SHARPRECPRT80` |
| `Payment` | `Payment1` | CAFIS Arch |

Scanner không thuộc Host OPOS package. Luồng hiện tại xử lý DENSO scanner qua
serial strategy của `TabetPos.DeviceCtrl`. MSR và PINPad cũng không thuộc phạm
vi package.

## Source of truth

- `DeviceRuntimeManifest.psd1`: tách hai nhóm dữ liệu: payload/default dùng khi
  cài package và COM/ServiceOPOS contract mà Host thực sự tiêu thụ.
- `Install-DeviceRuntime.ps1`: entrypoint PowerShell duy nhất để cài hoặc
  verify.
- `Install-All-DeviceRuntime.cmd`: entrypoint one-click tự nâng quyền và chạy
  `All -Force`.
- `README.md`: hướng dẫn triển khai và limitation của printer driver.
- Các folder thiết bị chỉ chứa vendor binary, không chứa script hoặc README
  riêng.

Không dùng lại registry export legacy hoặc đăng ký thủ công từng OCX. Các file
export cũ chứa checkout path, thiết bị ngoài scope và giá trị riêng của máy POS.

## Cài đặt

Trên máy POS, đặt repo/package ở đường dẫn cuối cùng rồi double-click:

```text
Install-All-DeviceRuntime.cmd
```

Hoặc chạy từ Administrator PowerShell:

```powershell
.\Install-DeviceRuntime.ps1 -Device All -Force
.\Install-DeviceRuntime.ps1 -Device Payment -PaymentPort COM1 -PaymentProtocol 4800 -PaymentTerminal 1001
```

Installer dùng `SysWOW64\regsvr32.exe`, register binary trực tiếp từ package,
ghi Registry32 ServiceOPOS và read-back ProgID, CLSID, absolute path cùng
SHA-256. Binary không được copy sang `C:\OPOS` hoặc Windows. Chỉ cần chạy lại
với `-Force` khi chủ động thay active runtime bằng binary của package mới;
di chuyển một bản copy chỉ để chạy `-VerifyOnly` không làm thay đổi registration.

Các DLL `SHARPUPCASH.dll`, `SHARPCDISP.dll`, `SHARPSOLOG.dll` và
`SHARPSOMSG.dll` là dependency của SHARP Service Object. Installer kiểm hash
nhưng không register chúng như COM server độc lập.

## Source và output Host

`AppServer` tham chiếu và đăng ký factory trực tiếp cho đủ 5 thiết bị. Khi build
`TabetPos.Applications.csproj`, target `BuildHostAppServer` phải sinh
`Host/AppServer` có các assembly CashChanger, CashDrawer, CustomerDisplay,
Printer và Payment; không dùng binary DeviceServer/TuriServer cũ để bù runtime.

`TabetPos.Host/legacyBin` chỉ giữ 10 DLL có project hiện tại tham chiếu: interop
CashChanger/CashDrawer/LineDisplay và các thư viện KsUtility còn cần. Scanner
interop, `KsClassControls`, WindowMessage và compiled server cũ không thuộc
output hiện tại.

## Verify không cần phần cứng

```powershell
.\Install-DeviceRuntime.ps1 -Device All -VerifyOnly
```

Verify thành công chứng minh:

- payload tồn tại và đúng SHA-256;
- Registry32 có đúng CLSID hoặc ProgID theo cách từng Host device khởi tạo COM;
- active `InprocServer32` trỏ tới file tồn tại, không bắt buộc nằm trong package
  đang dùng để verify;
- logical name và Service Object mapping mà Host cần là đúng;
- không so sánh cổng COM, log path, USB ID hoặc setting riêng của máy với
  install default trong manifest.

`-VerifyOnly` không ghi Registry và không cài/repair MSI. Printer Service Object
`SHARP.PtrPTM20P01` là runtime bắt buộc kể cả khi chưa nối máy in; chỉ thao tác
`Open`/in thật mới phụ thuộc phần cứng.

## Audit bộ cài vendor

Audit read-only trên máy POS `192.168.9.176` ngày 2026-08-18 xác nhận:

- Printer SO có original MSI `oposso_setup.msi`; file trong repo khớp hash nguồn
  `36D289E6FE7951DB62C419B5B9427684C2A128462133FB6479DC8D3EB337CAA6`.
- SHARP CO MSI cache chứa cả MSR/Scanner ngoài 5-device Host contract. Package
  giữ riêng các CCO cần thiết và đăng ký trực tiếp, không đưa cached MSI này vào
  runtime để tránh cài thêm thiết bị ngoài scope.
- Các SHARP PFO MSI là POS utility/UI, không sở hữu Drawer/LineDisplay/Printer
  OPOS runtime mà Host dùng.
- CAFIS InstallShield directory trên máy POS là uninstall cache, không được coi
  là clean installer source. Hai CAFIS COM payload cần thiết đã có trong package.
- Glory `OPOSSetup.exe` là utility nằm cạnh installed runtime và không có product
  installer registration. Host runtime chỉ cần CCO, Service Object và
  ServiceOPOS contract đã được pin trong manifest.

Do đó Printer SO MSI là installer duy nhất cần được package và chạy tự động cho
5-device Host runtime hiện tại; không còn installer hợp lệ nào thiếu sau audit.

Build/test liên quan:

```powershell
rtk dotnet build TabetPos.Host/TabetPos.Host.slnx --no-restore --nologo
rtk dotnet test TabetPos.Host/tests/TabletDeviceSettingBase.Tests/TabletDeviceSettingBase.Tests.csproj --no-build --nologo
```

## Hardware integration

`CreateInstance` hoặc `VerifyOnly` không chứng minh phần cứng đã kết nối.
`Open(logicalName)` chỉ chạy khi cắm đúng thiết bị, cấu hình đúng COM/USB và bật
`TABETPOS_OPOS_RUN_HARDWARE_OPEN_TESTS=1`.

Repository chỉ chứa POSPrinter Common Control `OPOS.POSPrinter`. Máy in thật
còn cần vendor Service Object `SHARP.PtrPTM20P01` và cấu hình USB riêng của máy.

Không chạy các thao tác có tác động thật như mở drawer, dispense/collect tiền,
begin/fix deposit, payment hoặc in giấy nếu chưa xác nhận môi trường hardware.
