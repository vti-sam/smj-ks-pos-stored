---
title: Core
project: ks_host
type: architecture
status: confirmed
source:
  - migrated from memory/ks_pos_boilerplate/ks_host/core.md
tags: [ks_host, architecture, ks_pos_boilerplate, core]
---

# Bộ nhớ cốt lõi KsPos.Host

## Thứ tự đọc

- Runtime host/khởi động-dừng: `runtime/appserver_appstopserver.md`
- Giao thức Named Pipe: `runtime/named_pipe.md`
- Tải thiết bị và vòng đời: `runtime/device_loading.md`
- Ranh giới COM/OCX/OPOS: `devices/ocx_opos_active_x.md`
- Chi tiết LineDisplay: `devices/line_display.md`
- Quy ước công cụ cục bộ: `maintenance/local_tooling.md`
- Ghi chú gốc được lưu trữ trong `_source_notes/`; không đọc theo mặc định.

## Kiến trúc

- `KsPos.Host` là host DeviceServer được di trú để điều khiển ngoại vi POS.
- Đường dẫn runtime chính: `AppServer` -> `KsHost` -> `KsDeviceManager` -> triển khai thiết bị.
- Các lệnh bên ngoài có thể đến từ WindowMessage cũ hoặc Named Pipe mới.
- Các triển khai thiết bị được tải động từ `DEVICE.INI` thông qua `KsDeviceSettingBase` và `KsClassFactory`.
- Ranh giới API thiết bị là `IFDevice`: `StartDevice`, `StopDevice`, `DeviceUse`, `DeviceUnUse`, `DeviceMethod`.

## Ràng buộc ổn định

- Giữ các giả định WinForms/STA/message pump trừ khi hành vi của phần cứng/OCX được xác minh.
- Không gọi OCX/ActiveX từ code thread-pool tùy ý mà không có kế hoạch STA marshal cụ thể.
- Giữ lại các key dictionary cũ và trường kết quả khi di trú: `ResultCode`, `ResultCodeExtended`, `ErrorMessage`, `ReturnValue`.
- Xử lý `AxInterop.*`, `Interop.*`, COM HRESULT và hành vi DLL của nhà cung cấp dưới dạng các mối quan tâm về hạ tầng.
- Ưu tiên các phần thiết bị nhỏ khi tái cấu trúc: CashDrawer trước, sau đó LineDisplay, tiếp theo Scanner, CashChanger cuối cùng.
