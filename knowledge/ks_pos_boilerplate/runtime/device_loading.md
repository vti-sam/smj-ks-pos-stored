---
title: Device Loading
project: ks_host
type: architecture
status: confirmed
source:
  - migrated from memory/ks_pos_boilerplate/ks_host/runtime/device_loading.md
tags: [ks_host, runtime, ks_pos_boilerplate, device_loading]
---

# Tải thiết bị và vòng đời

## Luồng tải

```text
AppServer
  -> KsHost.StartHost()
  -> KsDeviceManager.GetInstance()
  -> KsDeviceManager.StartDeviceManager(setting, host)
  -> setting.GetDeviceSettingList()
  -> setting.CreateDevice(ref devId)
  -> iDev.StartDevice(devId)
```

## DEVICE.INI

- Đường dẫn mong muốn: `Application.StartupPath\..\PRM2\DEVICE.INI`.
- Phần `[Using]` kiểm soát thứ tự tải:
  ```ini
  [Using]
  ID1=Scanner1
  ID2=CashDrawer
  ID3=LineDisplay
  ID4=CashChanger
  ```
- Phần cấu hình mỗi thiết bị cung cấp:
  - `Name`: tên thiết bị/dịch vụ runtime.
  - `Visible`: hiển thị UI/form thiết bị hay không.
  - `ClassID`: khóa class factory.
  - `Parameters`: chuỗi tham số tùy chọn đặc thù thiết bị.

## DeviceManager

- Tải mọi thiết bị được cấu hình từ `IFSettingDevice.GetDeviceSettingList()`.
- Thử lại khi khởi động thiết bị tối đa 3 lần với khoảng nghỉ ngắn.
- Thêm các thiết bị khởi động thành công vào `DeviceList`.
- Luồng dừng thiết lập cờ dừng, gọi từng `StopDevice()`, sau đó xóa danh sách.
- Kiểm tra keep-alive ghi log khi thiết bị được chọn không phản hồi trên 30 giây.

## Vòng đời cơ bản

- Triển khai thiết bị kế thừa từ `DeviceBase` và triển khai `IFDevice`.
- Vòng đời OCX thông dụng:
  - `Open`
  - `ClaimDevice` hoặc `Claim`
  - `DeviceEnabled = true`
  - `ClearInput` (tùy chọn)
  - `DataEventEnabled = true` (tùy chọn)
  - Thực thi lệnh
  - `DataEventEnabled = false` (tùy chọn)
  - `DeviceEnabled = false`
  - `ReleaseDevice` hoặc `Release`
  - `Close`

## Ghi chú tái cấu trúc

- Không suy đoán các dự án thiết bị không sử dụng chỉ từ tham chiếu biên dịch. Việc sử dụng runtime được quyết định bởi `DEVICE.INI` và `ClassID`.
- Giữ API dựa trên dictionary tại ranh giới host trong suốt quá trình di trú từng bước.
- Chuẩn hóa lỗi sau lớp adapter sau này; code hiện tại chủ yếu trả về raw `int` và các giá trị dictionary chuỗi.
