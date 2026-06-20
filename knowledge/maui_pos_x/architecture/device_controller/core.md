---
title: Core
project: maui_pos_x
type: architecture
status: confirmed
source:
  - migrated from memory/maui_pos_x/device_controller/core.md
tags: [maui_pos_x, devices, device_controller, core]
---

# Bộ nhớ cốt lõi MauiPOSX.DeviceCtrl

## Thứ tự đọc

- Hướng dẫn thiết kế chi tiết bằng tiếng Anh: [device_ctrl_design.md](device_ctrl_design.md)
- Ghi chú và thiết kế gốc bằng tiếng Nhật được lưu trữ trong [_source_notes/](_source_notes/); không đọc theo mặc định.

## Kiến trúc

- `MauiPOSX.DeviceCtrl` là lớp trừu tượng điều khiển phần cứng của ứng dụng MauiPOSX POS, cung cấp khả năng điều khiển thiết bị ngoại vi đa nền tảng (Windows, iOS, Android) bao gồm printer, scanner, cash_changer, customer_display, msr và drawer.
- Kiến trúc dựa trên **Strategy Pattern** và **Factory Pattern**:
  - `DeviceManager` (Singleton) tải cấu hình từ `config.json`, giải quyết thiết bị hoạt động (active device) dựa trên hệ điều hành đang chạy, và cung cấp các instance của strategy.
  - `StrategyFactory` và `DeviceFactoryBase` chịu trách nhiệm khởi tạo các strategy động theo tên lớp được chỉ định từ cấu hình.
  - Các interface như `IPrinterStrategy`, `ICashChangerStrategy`, v.v., định nghĩa hành vi của thiết bị. Các lớp cụ thể (platform strategies) thực thi hành vi này cho từng nền tảng tương ứng.
- **Phương thức giao tiếp**:
  - **Windows**: Sử dụng `NamedPipeClient` để kết nối với dịch vụ `PrinterHost32` trên Windows chạy OPOS driver hoặc Serial Port trực tiếp.
  - **iOS/Android**: Kết nối TCP Socket với một XML Hub trung tâm để truyền nhận các lệnh dạng XML (ePOS) đối với máy in, cash changer, màn hình hiển thị phụ. Hoặc sử dụng trực tiếp SDK của thiết bị (ví dụ Epson SDK cho Bluetooth/Network) hay camera để quét mã vạch.

## Ràng buộc ổn định

- **Đồng bộ hóa luồng (STA) trên Windows**: Đối với Windows, do các ActiveX/OPOS controls thường yêu cầu STA (Single Threaded Apartment), cần đảm bảo các lệnh giao tiếp qua Named Pipe và UI thread được kiểm soát đồng bộ tránh xung đột luồng hoặc lỗi COM HRESULT.
- **Giao thức Socket TCP Hub**: XML Hub trên iOS/Android giao tiếp dạng bất đối xứng. Mỗi gói tin gửi/nhận kết thúc bằng ký tự null (`\0`). Phải đảm bảo luồng đọc nền (`ListenLoopAsync`) luôn chạy và thực hiện cơ chế phục hồi lỗi kết nối (`CloseSocket` / `SendCloseDeviceAsync`) khi mất kết nối đột ngột.
- **Tương thích ngược**: Khi thay đổi cấu trúc hoặc di chuyển dữ liệu, các thuộc tính cũ trong cấu hình thiết bị như `ResultCode`, `ResultCodeExtended`, `ErrorMessage`, `ReturnValue` của OPOS phải được bảo tồn chính xác.
- **Phân tách nền tảng**: Mã nguồn viết cho các nền tảng phải được đặt trong các thư mục tương ứng `Platforms/Windows/`, `Platforms/iOS/`, `Platforms/Android/` để tránh lỗi build chéo nền tảng.
