---
title: Original Program Spec Linedisplay OCX
project: ks_host
type: architecture
status: confirmed
source:
  - migrated from memory/ks_pos_boilerplate/ks_host/_source_notes/original_program_spec_linedisplay_ocx.md
tags: [ks_host, architecture, ks_pos_boilerplate, source_notes, original_program_spec_linedisplay_ocx]
---

# Đặc tả chương trình: Điều khiển LineDisplay

## Thông tin Lớp

- **Namespace**: `KsOutProcess.KsDeviceServer`
- **Tên lớp**: `LineDisplayBySharp` (logic: Điều khiển màn hình hiển thị khách hàng)
- **Kế thừa**: `DeviceBase`, thực thi `IFDevice`
- **Khởi tạo**: Tạo bởi `KsClassFactory` dựa trên `ClassID` cấu hình trong `DEVICE.INI`.
- **Thuộc tính chính**:
  - `KsDeviceID`: Định danh thiết bị.
  - `KeepAliveDateTime`: Thời gian kiểm tra trạng thái sống.
  - `oFrm` (`Form`): Form chứa control OCX ẩn của LineDisplay.

## Các phương thức chi tiết

- **`StartDevice(KsDeviceID devId)`**: Khởi động thiết bị.
  - Tạo form ẩn chứa OCX. Khởi tạo thông tin thiết bị từ `DEVICE.INI`. Nếu `Visible = True` thì hiển thị form. Trả về kết quả khởi động (0 là thành công).
- **`StopDevice()`**: Dừng thiết bị.
  - Đóng form ẩn, giải phóng tài nguyên COM/OCX. Ném `COMException` nếu giải phóng lỗi.
- **`DeviceUse(arguments, returns)`**: Nhận yêu cầu và thực hiện các chuẩn bị ban đầu để sử dụng thiết bị. Đặt mã kết quả vào `returns`.
- **`DeviceUnUse(arguments, returns)`**: Dọn dẹp trạng thái và kết thúc sử dụng thiết bị.
- **`DeviceMethod(methodId, arguments, returns)`**: Thực thi lệnh tương ứng từ `methodId` (như `ClearText`, `DisplayText`, `DisplayTextAt`, `ScrollText`, `LinDsp`, `LinDspTelop`).
  - Trước khi gọi: Thực hiện `Device_Start` (claim thiết bị, set `DeviceEnabled = true`).
  - Thực thi: Gọi hàm OCX tương ứng, lấy `ResultCode` / `ResultCodeExtended` gán vào `returns`.
  - Log kết quả cục bộ.
  - Sau khi gọi: Thực hiện `Device_End` (set `DeviceEnabled = false`, giải phóng claim).
- **`LinDsp(Kbn, Data)`**: Dựng các lệnh DirectIO đặc thù dựa trên tham số `Kbn` hoặc xóa descriptors.
