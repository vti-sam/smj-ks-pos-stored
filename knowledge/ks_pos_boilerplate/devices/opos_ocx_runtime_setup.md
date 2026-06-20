---
title: OPOS OCX Runtime Setup
project: ks_host
type: runbook
status: confirmed
source:
  - raw/Register
  - raw/OCX
  - raw/LineDisplay vs CashDrawer
  - runtime verification on 2026-06-10
tags: [ks_host, devices, opos, ocx, activex, runtime]
---

# OPOS / OCX Runtime Setup

## Mục tiêu

Tài liệu này ghi lại cách chuẩn bị runtime OPOS / OCX cho `KsPos.Host` trên máy phát triển hoặc POS clone. Mục tiêu test tối thiểu là kết nối được tới OCX/ActiveX bằng COM 32-bit. `Open()` chỉ dùng cho integration test khi phần cứng thật đã được cắm và cấu hình cổng đúng.

## Ba lớp cần phân biệt

- `.NET interop wrapper`: các file `AxInterop.*.dll` và `Interop.*.dll` trong `legacyBin`. Chúng phục vụ build/run .NET, nhưng không register được bằng `regsvr32`.
- OCX / ActiveX control: COM control được WinForms AxHost giữ trên form, ví dụ `OPOSCashChanger.ocx`, `LineDisplay.ocx`, `Drawer.ocx`, `DensoScn.ocx`.
- OPOS Service Object: COM service object hoặc DLL vendor dùng khi control gọi `Open(logicalName)`, ví dụ `ChangerSO.dll`, `DENSOScannerSO.dll`, `SHARPRZ3DP4.dll`, `SHARPUPJ36DW3.dll`.

## Runtime folder chuẩn

Không dùng `raw/` làm runtime. `raw/` chỉ là dump/export gốc từ máy POS.

Runtime chuẩn của Host:

```text
sources/KsPosBoilerplate/KsPos.Host/runtime/OPOS
```

Bố cục đang dùng:

```text
runtime/OPOS/
  CashChanger/
    OPOSCashChanger.ocx
    ChangerSO.dll
  LineDisplay/
    LineDisplay.ocx
  CashDrawer/
    Drawer.ocx
  Scanner/
    DensoScn.ocx
    DENSOScannerSO.dll
    Scanner.ocx
    SOSetting.exe
  Sharp/
    SHARPRZ3DP4.dll
    SHARPCDISP.dll
    SHARPUPJ36DW3.dll
    SHARPUPCASH.dll
    SHARPSOLOG.dll
    SHARPSOMSG.dll
  Registry/
    *.reg
```

## Register bằng 32-bit regsvr32

`KsPos.Host` target `x86`, nên phải dùng `SysWOW64`:

```powershell
C:\Windows\SysWOW64\regsvr32.exe "<repo>\sources\KsPosBoilerplate\KsPos.Host\runtime\OPOS\CashChanger\OPOSCashChanger.ocx"
C:\Windows\SysWOW64\regsvr32.exe "<repo>\sources\KsPosBoilerplate\KsPos.Host\runtime\OPOS\CashChanger\ChangerSO.dll"

C:\Windows\SysWOW64\regsvr32.exe "<repo>\sources\KsPosBoilerplate\KsPos.Host\runtime\OPOS\LineDisplay\LineDisplay.ocx"
C:\Windows\SysWOW64\regsvr32.exe "<repo>\sources\KsPosBoilerplate\KsPos.Host\runtime\OPOS\CashDrawer\Drawer.ocx"

C:\Windows\SysWOW64\regsvr32.exe "<repo>\sources\KsPosBoilerplate\KsPos.Host\runtime\OPOS\Scanner\DensoScn.ocx"
C:\Windows\SysWOW64\regsvr32.exe "<repo>\sources\KsPosBoilerplate\KsPos.Host\runtime\OPOS\Scanner\DENSOScannerSO.dll"
C:\Windows\SysWOW64\regsvr32.exe "<repo>\sources\KsPosBoilerplate\KsPos.Host\runtime\OPOS\Scanner\Scanner.ocx"

C:\Windows\SysWOW64\regsvr32.exe "<repo>\sources\KsPosBoilerplate\KsPos.Host\runtime\OPOS\Sharp\SHARPRZ3DP4.dll"
C:\Windows\SysWOW64\regsvr32.exe "<repo>\sources\KsPosBoilerplate\KsPos.Host\runtime\OPOS\Sharp\SHARPCDISP.dll"
C:\Windows\SysWOW64\regsvr32.exe "<repo>\sources\KsPosBoilerplate\KsPos.Host\runtime\OPOS\Sharp\SHARPUPJ36DW3.dll"
C:\Windows\SysWOW64\regsvr32.exe "<repo>\sources\KsPosBoilerplate\KsPos.Host\runtime\OPOS\Sharp\SHARPUPCASH.dll"
```

`SHARPSOLOG.dll` và `SHARPSOMSG.dll` là dependency chung của Sharp SO. Chúng có thể không self-register; nếu `regsvr32` trả exit `4` nhưng service DLL chính register được thì không coi là lỗi ngay.

Các lệnh ghi `HKCR` / `HKLM` cần PowerShell Run as Administrator.

## Registry ServiceOPOS

Logical device nằm dưới:

```text
HKLM\SOFTWARE\WOW6432Node\OLEforRetail\ServiceOPOS
```

Import registry export từ máy POS bằng full path `reg.exe`, không gọi alias `reg`:

```powershell
C:\Windows\SysWOW64\reg.exe import "<repo>\sources\KsPosBoilerplate\KsPos.Host\runtime\OPOS\Registry\HKLM_SOFTWARE_WOW6432Node_OLEforRetail_ServiceOPOS-reg32.reg"
```

Trên máy POS có thể có `D:\Ks\Bin2\REG.BAT` đứng trước `reg.exe` trong `PATH`. Khi export/query registry, luôn dùng full path:

```powershell
& "C:\Windows\System32\reg.exe" query "<key>" /reg:32
& "C:\Windows\System32\reg.exe" export "<key>" "<file.reg>" /reg:32
```

## Mapping cần kiểm

`device.json` của Host truyền `name` vào `oDevice.Open(name)`.

| Host device | Logical name | Registry cần có |
|---|---|---|
| Scanner | `DENSO Handy Scanner` | `ServiceOPOS\Scanner\DENSO Handy Scanner` -> `OPOS.SCANNER.SO.DENSO.1` |
| LineDisplay | `SHARPRZ4DP1B` | `ServiceOPOS\LineDisplay\SHARPRZ4DP1B` -> `SHARP.DispRZ3DP4` |
| CashDrawer | `SHARPUPJ36DW3` | alias root `SHARPUPJ36DW3=UPJ36DW3`, actual `ServiceOPOS\CashDrawer\UPJ36DW3` -> `SHARP.CashUPJ36DW3` |
| CashChanger | `CASHCHANGER` hoặc `GloryRAD/RT-300` | `ServiceOPOS\CashChanger\GloryRAD/RT-300` -> `CHANGERSO.CASHCHANGER` |

CashChanger trên máy clone đã từng `Open("CASHCHANGER")` và `Open("GloryRAD/RT-300")` đều trả `0`, nhưng source-of-truth POS export là `GloryRAD/RT-300`. Nếu dùng `CASHCHANGER`, cần xác nhận alias hoặc behavior của `ChangerSO`.

## Verify registry và COM

Mục tiêu test không cần phần cứng:

- CLSID tồn tại trong Registry32.
- `InprocServer32` trỏ tới file tồn tại.
- COM x86 `CreateInstance` thành công.

Ví dụ verify bằng PowerShell 32-bit:

```powershell
$ps32 = Join-Path $env:WINDIR 'SysWOW64\WindowsPowerShell\v1.0\powershell.exe'
$script = @'
$items = @{
  CashChanger = '{CCB90032-B81E-11D2-AB74-0040054C3719}'
  LineDisplay = '{D3AC4640-297C-11CF-BD98-444553540000}'
  CashDrawer = '{CFC70B84-1ADC-11D0-BC7F-0080C82CC27E}'
  ScannerDenso = '{CE7B0E84-AD38-11D1-9746-00C04FCAC198}'
}
Write-Output ("PROCESS_BITS={0}" -f ([IntPtr]::Size * 8))
foreach ($name in $items.Keys) {
  $clsid = $items[$name]
  try {
    $type = [type]::GetTypeFromCLSID([guid]$clsid, $true)
    $obj = [Activator]::CreateInstance($type)
    if ($obj) { [Runtime.InteropServices.Marshal]::ReleaseComObject($obj) | Out-Null }
    Write-Output ("CREATE_OK`t{0}`t{1}" -f $name, $clsid)
  } catch {
    Write-Output ("CREATE_FAIL`t{0}`t{1}`t{2}" -f $name, $clsid, $_.Exception.Message)
  }
}
'@
& $ps32 -NoProfile -ExecutionPolicy Bypass -Command $script
```

`Open(logicalName)` là hardware integration test. Nếu LineDisplay/CashDrawer chưa cắm hoặc COM port chưa đúng, `Open()` fail là expected và không được dùng để đánh fail test OCX-connect.

## Gotcha đã gặp

- `regsvr32` phải dùng bản 32-bit `C:\Windows\SysWOW64\regsvr32.exe`.
- `reg.exe` có thể bị shadow bởi `REG.BAT`; dùng full path `C:\Windows\System32\reg.exe` hoặc `C:\Windows\SysWOW64\reg.exe`.
- Registry ghi `System32`, nhưng trên 32-bit view file thực tế có thể nằm ở `SysWOW64`.
- Với Sharp CashDrawer, không copy `SHARPU~1.DLL` / `SHARPU~2.DLL` vào cùng folder runtime repo bằng tên short-name. Trên NTFS, các tên này có thể resolve thành 8.3 alias của `SHARPUPCASH.dll` / `SHARPUPJ36DW3.dll` và ghi đè nhầm file long-name. Runtime repo nên giữ long-name DLL đúng hash; short-name chỉ là path registry trên POS.
- Thiếu quyền Administrator sẽ gây `Error accessing the registry` hoặc `Access is denied`.
- `AxInterop.*.dll` không thay thế OCX thật và không register được bằng `regsvr32`.
- `CreateInstance` pass chỉ chứng minh control COM load được; chưa chứng minh hardware đã kết nối.
- Các lệnh có tác động thật như `OpenDrawer`, `DispenseCash`, `Collect`, `BeginDeposit`, `FixDeposit` chỉ chạy khi bật hardware integration test rõ ràng.

## Verify build/test hiện tại

Unit test mặc định kiểm `device.json`, OPOS control COM, và `ServiceOPOS` mapping. Test `Open(logicalName)` là integration test, chỉ chạy khi bật biến môi trường `KSPOS_OPOS_RUN_HARDWARE_OPEN_TESTS=1`.

```powershell
rtk dotnet test sources\KsPosBoilerplate\KsPos.Host\tests\KsDeviceSettingBase.Tests\KsDeviceSettingBase.Tests.csproj -p:Platform=x86 -v:m
```

Build Host:

```powershell
rtk dotnet build sources\KsPosBoilerplate\KsPos.Host\KsPos.Host.slnx -v:m
```
