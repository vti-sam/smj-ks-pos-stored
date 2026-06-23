---
title: Line Display
project: ks_host
type: architecture
status: confirmed
source:
  - migrated from memory/ks_pos_boilerplate/ks_host/devices/line_display.md
tags: [ks_host, devices, ks_pos_boilerplate, line_display]
---

# LineDisplay

## Vai trò

- Lớp: `LineDisplayBySharp`.
- Namespace: `KsOutProcess.KsDeviceServer`.
- Kế thừa `DeviceBase`, triển khai `IFDevice`.
- Được tải bởi `DEVICE.INI` thông qua `ClassID`, không trực tiếp bởi AppServer UI.
- Sử dụng wrapper Sharp LineDisplay ActiveX/OCX.

## Các lệnh chính

- `ClearDescriptors`
- `ClearText`
- `DisplayText`
- `DisplayTextAt`
- `ScrollText`
- `LinDsp`
- `LinDspTelop`
- `DirectIO` là đường dẫn escape đặc thù của nhà cung cấp.

## Luồng điển hình

```text
DeviceMethod
  -> Device_Start(AxLineDisplay1, false, false)
  -> thực thi phương thức OCX
  -> đọc ResultCode / ResultCodeExtended
  -> điền vào dictionary kết quả trả về
  -> Device_End(AxLineDisplay1, false, true)
```

## Named Pipe

- LineDisplay nhận lệnh thông qua `TabetPos.Host.Command`.
- Thường phản hồi đồng bộ trên kết nối lệnh.
- `TabetPos.Host.Event` chỉ dành cho các sự kiện không đồng bộ nếu chúng xảy ra.
- `TabetPos.Host.Stream` chủ yếu dành cho thiết bị tần suất cao như Scanner; LineDisplay không phải là mục tiêu stream mặc định.

## Thận trọng

- Giữ thứ tự `DeviceEnabled` và claim/release trừ khi được xác minh trên phần cứng.
- Giữ log cục bộ của phương thức/kết quả; Named Pipe không thay thế log cục bộ.
- Không gộp hành vi `DirectIO` đặc thù của LineDisplay thành các lệnh hiển thị chung mà không có xác nhận của nhà cung cấp.
