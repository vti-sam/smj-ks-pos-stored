---
title: Original Detail Design Linedisplay OCX
project: ks_host
type: architecture
status: confirmed
source:
  - migrated from memory/ks_pos_boilerplate/ks_host/_source_notes/original_detail_design_linedisplay_ocx.md
tags: [ks_host, architecture, ks_pos_boilerplate, source_notes, original_detail_design_linedisplay_ocx]
---

# Thiết kế chi tiết: Điều khiển LineDisplay (Màn hình hiển thị khách hàng)

## Tổng quan IO & OCX

- **Mô tả**: Lớp `LineDisplayBySharp` trên Host (DeviceServer) thực hiện kết nối, ngắt kết nối, hiển thị văn bản, xóa màn hình, cuộn chữ, và điều khiển DirectIO (chữ chạy...) tới LineDisplay thông qua OPOS OCX.
- **Giả định**: Mỗi lệnh thực thi được bao bọc bởi kiểm soát độc quyền (`DeviceEnabled = true/false`).
- **Danh sách vào/ra (I/O)**:
  - Thiết bị đích: LineDisplay ngoại vi.
  - OCX: `AxLineDisplay` (`AxInterop.LINEDISPLAYLib.dll`) để điều khiển OPOS.
  - Host (`DeviceServer`): Nhận lệnh từ Named Pipe và ủy quyền cho lớp điều khiển LineDisplay.
  - Pipe lệnh: `TabetPos.Host.Command` (POS/App -> Host) nhận yêu cầu dạng JSON 1 dòng (đồng bộ).
  - Pipe sự kiện: `TabetPos.Host.Event` (Host -> POS/App) thông báo phản hồi bất đồng bộ (LineDisplay không dùng Stream Pipe).
  - Cấu hình `DEVICE.INI`: Nằm tại `..\PRM2\DEVICE.INI`, định cấu hình `Name`, `Visible`, `ClassID`, `Parameters`.
  - Kết quả & Log: Trả về `ResultCode` / `ResultCodeExtended` và ghi log cục bộ qua `KsLogControls`.
- **Thông tin OCX**:
  - Tên: OPOS LineDisplay Control. Nhúng dưới dạng STA (Single-Threaded Apartment) thread.
  - Thuộc tính chính: `DeviceEnabled` (kích hoạt/hủy kích hoạt), `ResultCode` (mã kết quả), `ResultCodeExtended` (mã mở rộng).
  - Các hàm chính: `ClearDescriptors()`, `ClearText()`, `DisplayText()`, `DisplayTextAt()`, `ScrollText()`, `DirectIO()`.

## Cấu trúc Lớp & Phương thức

- **Luồng gọi lệnh**: POS/App -> Host (Command Pipe) -> `DeviceManager` -> Lớp điều khiển LineDisplay (`LineDisplayBySharp`) -> OPOS OCX -> Thiết bị.
- **Danh sách phương thức của Host**:
  - `DeviceUse`: Khởi động sử dụng thiết bị.
  - `DeviceUnUse`: Kết thúc sử dụng thiết bị.
  - `DeviceMethod`: Thực thi phương thức hiển thị (`ClearText`, `DisplayText`, v.v.).
  - `DisplayText`: Hiển thị chuỗi văn bản với thuộc tính định trước.
  - `DisplayTextAt`: Hiển thị văn bản tại vị trí chỉ định (dòng, cột).
  - `LinDsp`: Gọi lệnh DirectIO đặc thù hoặc xóa descriptor.
  - `LinDspTelop`: Chạy chữ telop (chữ cuộn) qua DirectIO.
- **Xử lý chung cho mỗi lệnh**:
  - Trước khi gọi: Thực hiện claim thiết bị và đặt `DeviceEnabled = true`.
  - Thực thi: Gọi hàm OCX tương ứng.
  - Sau khi gọi: Đọc `ResultCode` / `ResultCodeExtended`, log thông tin ra file, đặt `DeviceEnabled = false` và giải phóng claim.

## Xử lý lỗi & Ghi log

- **Lỗi**: Nếu xảy ra `COMException`, log lỗi và trả kết quả bất thường về client. Nếu `ResultCode` khác 0 (thất bại), không ném exception mà trả trực tiếp mã lỗi về client để xử lý.
- **Định dạng Log (Debug)**: `【デバイスのメソッド実行】 デバイスID:{ID} デバイス名:{Name} {MethodName}を実行しました。結果:{ResultCode}-{ResultCodeExtended}` (ghi vào log cục bộ, không trả qua Named Pipe).
