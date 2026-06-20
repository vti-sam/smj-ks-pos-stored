---
title: Original Host Device Com OCX OPOS Wiki
project: ks_host
type: architecture
status: confirmed
source:
  - migrated from memory/ks_pos_boilerplate/ks_host/_source_notes/original_host-device-com-ocx-opos-wiki.md
tags: [ks_host, architecture, ks_pos_boilerplate, source_notes, original_host_device_com_ocx_opos_wiki]
---

# Ghi chú kiến trúc Host Device: COM, OCX, ActiveX, OPOS

## Tổng quan

- Host điều phối thiết bị qua `IFDevice`, `DeviceMethod`, `DeviceUse`, `DeviceUnUse` và `Dictionary<string, string>`.
- Các thiết bị chạy trên UI thread/STA của một WinForms form ẩn để tương thích OCX/ActiveX.
- Thiết bị và thư viện liên kết:
  - CashChanger RT300: `AxInterop.OposCashChanger_CCO.dll` (OPOS CCO chuẩn).
  - CashDrawer Sharp: `AxInterop.DRAWERLib.dll` và `Interop.DRAWERLib.dll`.
  - LineDisplay Sharp: `AxInterop.LINEDISPLAYLib.dll` và `Interop.LINEDISPLAYLib.dll`.
  - Scanner DENSO: `AxInterop.SCANNERLibDENSO.dll`.
- Chưa có chuẩn hóa lỗi; kết quả trả về chủ yếu là raw `ResultCode`, `ResultCodeExtended`, `ErrorMessage`, HRESULT, hoặc vendor code.

## Vòng đời dùng chung (DeviceBase.cs)

- **Open**: `Device_Open(dynamic)` -> Gọi `_oDevice.Open(dev.DeviceName)`.
- **Close**: `Device_Close(dynamic)` -> Giải phóng claim và gọi `_oDevice.Close()`.
- **Claim**: `Device_Claim(dynamic)` -> Gọi `ClaimDevice(0)` hoặc `Claim(0)`.
- **Release**: `Device_Release(dynamic)` -> Gọi `ReleaseDevice()` hoặc `Release()`.
- **Start**: `Device_Start(...)` -> Thực hiện Claim -> Thiết lập `DeviceEnabled = true` -> `ClearInput()` -> `DataEventEnabled = true` (tùy chọn).
- **End**: `Device_End(...)` -> Tắt `DataEventEnabled` -> Tắt `DeviceEnabled` -> Giải phóng claim.

## Bề mặt API theo thiết bị

- **CashChanger RT300 (`OPOSCashChanger1`)**:
  - Trạng thái/vòng đời: `Open`, `Close`, `ClaimDevice`, `ReleaseDevice`, `Claimed`, `DeviceEnabled`, `DataEventEnabled`, `FreezeEvents`, `PowerNotify`, `OcxState`.
  - Kết quả: `ResultCode`, `ResultCodeExtended`, `AsyncResultCode`, `AsyncResultCodeExtended`.
  - Nghiệp vụ: `BeginDeposit`, `EndDeposit`, `FixDeposit`, `PauseDeposit`, `DepositAmount`, `DepositCounts`, `DepositStatus`, `ReadCashCounts`, `DispenseCash`, `DispenseChange`, `CurrentExit`, `FullStatus`, `DeviceStatus`, `ClearInput`, `DirectIO`.
  - Sự kiện: `DataEvent`, `DirectIOEvent`, `StatusUpdateEvent`.
- **CashDrawer Sharp (`AxDrawer1`)**:
  - Nghiệp vụ chính: `OpenDrawer`.
  - Vòng đời: Dùng `DeviceBase` (Open, Close, Claim, Release, DeviceEnabled).
- **LineDisplay Sharp (`AxLineDisplay1`)**:
  - Nghiệp vụ chính: `ClearDescriptors`, `ClearText`, `DisplayText`, `DisplayTextAt`, `ScrollText`, `DirectIO`.
  - Vòng đời: Dùng `DeviceBase`.
- **Scanner DENSO (`AxScanner1`)**:
  - Hướng sự kiện: `Open` và `Claim` lúc tải form.
  - Vòng đời: `DeviceEnabled = true`, `DataEventEnabled = true` để nhận sự kiện `ScanData`.
  - Nghiệp vụ: Lệnh `ReadScanData` đọc dữ liệu quét đã được lưu trữ trong `KsDeviceInfo`.

## Xử lý Lỗi & Constants hiện tại

- OPOS Constants trong `KsDeviceConst.cs`: `OPOS_E_CLOSED`, `OPOS_E_CLAIMED`, `OPOS_E_NOTCLAIMED`, `OPOS_E_NOSERVICE`, `OPOS_E_DISABLED`, `OPOS_E_ILLEGAL`, `OPOS_E_NOHARDWARE`, `OPOS_E_OFFLINE`, `OPOS_E_NOEXIST`, `OPOS_E_EXISTS`, `OPOS_E_FAILURE`, `OPOS_E_TIMEOUT`, `OPOS_E_BUSY`, `OPOS_E_EXTENDED`.
- Mã lỗi mở rộng CashChanger: `OPOS_ECHAN_CHANGEERROR`, `OPOS_ECHAN_IFERROR`, `OPOS_ECHAN_SETERROR`, `OPOS_ECHAN_ERROR`, `OPOS_ECHAN_COUNTERROR`, `OPOS_ECHAN_AMOUNTERROR`.
- Các key dictionary kết quả: `ResultCode`, `ResultCodeExtended`, `ErrorMessage`, `ReturnValue`, `MessageId`, `Message`, `ReplyMessage`, `CompletionCode`, `ReturnCmd`.
- COM HRESULT (`ComHResults.cs`): `RpcECantCallOutInInputSyncCall = 0x8001010D` (lỗi COM callback trong WinForms input sync call).
- Hiện tượng giá trị magic: `-1`, `-3`, `-9` xuất hiện trong code thiết bị.

## Ranh giới & Định hướng Refactor

- **Phân tách ranh giới**:
  - Application: Chỉ biết các interface nội bộ như `IDevicePort`, `ICashDrawerPort`, v.v.
  - Infrastructure.Devices: Chứa các adapter `ComOcxDeviceAdapter`, `OposCcoAdapter`, `VendorActiveXAdapter`.
  - Vendor/OPOS: Chứa `AxInterop.*`, `Interop.*` và COM/OCX.
- **Thứ tự tái cấu trúc đề xuất**:
  1. `CashDrawer`: Nhỏ nhất, hướng lệnh, ít rủi ro nhất.
  2. `LineDisplay`: Nhiều lệnh đồng bộ, cần cô lập `DirectIO`.
  3. `Scanner`: Hướng sự kiện, có quản lý trạng thái, phức tạp trung bình.
  4. `CashChanger`: Bề mặt lớn nhất, rủi ro cao nhất (nhiều lệnh bất đồng bộ/sự kiện).
- **Rủi ro kỹ thuật cần lưu ý**:
  - COM apartment (STA) và WinForms message pump.
  - Gọi OCX từ thread pool bắt buộc phải marshal sang luồng STA.
  - Vấn đề đăng ký COM x86/x64 trên máy POS thực tế.
  - Cơ chế tương thích ngược thông qua việc giữ lại cấu trúc dictionary cũ.
