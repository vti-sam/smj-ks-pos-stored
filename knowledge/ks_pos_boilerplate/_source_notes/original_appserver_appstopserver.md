---
title: Original Appserver Appstopserver
project: ks_host
type: architecture
status: confirmed
source:
  - migrated from memory/ks_pos_boilerplate/ks_host/_source_notes/original_appserver_appstopserver.md
tags: [ks_host, architecture, ks_pos_boilerplate, source_notes, original_appserver_appstopserver]
---

# Tài liệu AppServer / AppStopServer

## Luồng hoạt động & Vai trò

- **AppServer** (tiến trình host chính, tên đầu ra: `Ks2_DeviceServer.AppServer`):
  - Khởi tạo thông tin toàn cục, chạy `KsHost`, nhận WindowMessage/device message.
  - Sử dụng vòng lặp `Thread.Sleep(100)` + `Application.DoEvents()` để duy trì message pump (phụ thuộc WindowMessage/OCX/COM). Không thay bằng vòng lặp nền thuần túy.
  - Khi tắt: gọi `StopHost()`, chờ tối đa 10s, quá thời gian sẽ gọi `Environment.Exit(-1)`.
  - Hủy toàn bộ form đang mở bằng `Dispose()` thay vì `Close()` để tránh lỗi với OCX.
- **ServerAppForm** (chỉ hiển thị khi truyền đối số dòng lệnh `DEBUG`):
  - Có các nút Start (chạy `StartHost()`) và Stop (chạy `StopHost()`).
  - Đăng ký sự kiện trong code-behind (không dùng designer) do chuyển đổi từ VB.
- **AppStopServer** (tiến trình ngắn hạn để dừng DeviceServer):
  - Gửi WindowMessage với nội dung `Message\tKill` tới `WINDOWMESSAGE_DeviceServer`.
  - `KsHost.OnReceiveMessage` nhận lệnh `Kill`, gọi `StopHost()` và đặt `IsEndOrder = true`.

## Ngoại lệ & Ghi log

- `AppServer` bắt thread/unhandled exception và log bằng `PutProcessInfoLog`.
- Riêng lỗi `RPC_E_CANTCALLOUT_ININPUTSYNCCALL` (`0x8001010D`) khi gọi COM trong luồng xử lý input-synchronous được check riêng để log và trả về sớm.
- `AppStopServer` log thành công bằng `PutProcessDebugLog`, thất bại bằng `PutProcessInfoLog`.

## Cấu hình

- **AppServer (`app.config`)**:
  - Ghi log ra `..\LOG\AppServer.log` (rolling, tối đa 10 bản backup, mỗi bản 5MB).
  - Probing path: `DENSO;SHARP`. File môi trường: `..\PRM2\environment.ini`.
  - Vẫn giữ các khai báo legacy .NET Framework dù dự án đã nâng cấp lên `.net10.0-windows`. Không tự ý xóa.
- **AppStopServer (`app.config`)**:
  - Tên file log là `ServerApp.log` (không phải `AppStopServer.log`). Không đổi tên.
  - Probing path: `Base;Base\ext`.

## Liên kết với KsHost

- `KsHost` điều phối WindowMessage service:
  - `StartHost()`: khởi động named pipe, đăng ký xử lý nhận tin nhắn, khởi động `KsDeviceManager`.
  - `StopHost()`: dừng named pipe host, dừng device manager, hủy đăng ký nhận tin nhắn.
  - `OnReceiveMessage()`: xử lý tin nhắn định dạng key/value phân tách bằng Tab. Nhận lệnh `Kill` (dừng) hoặc `ReStart` (khởi động lại). Có cơ chế gửi lại phản hồi (`ReplyMessage`) để tránh mất tin nhắn.

## Tactical Notes (Ghi chú thực chiến)

- Không thay thế `Application.DoEvents()` và dùng `Dispose()` thay cho `Close()` khi dọn form.
- Không đổi tên file log `ServerApp.log` của `AppStopServer`.
- Không tự ý xóa cấu hình runtime/probing legacy trong `app.config`.
- Tránh sửa file designer trực tiếp khi làm việc với code WinForms được convert; ưu tiên code-behind.
- `DEBUG` là tham số dòng lệnh để hiển thị UI debug, không phải build configuration.
- `AppStopServer` dừng host thông qua tin nhắn giao thức, không kill tiến trình trực tiếp.

## Các chú thích gốc đáng chú ý trong code

- `AppServer/Program.cs`:
  - Dòng 27: Di chuyển thư mục hiện tại về thư mục EXE vì khi chạy quyền Admin có thể bị chuyển về C:\Windows.
  - Dòng 31: Kiểm tra chạy trùng (二重起動).
  - Dòng 45: Đặt chạy thường trú (`bKidouFlag = false`).
  - Dòng 108: Giải phóng toàn bộ Form do lỗi OCX gắn trên Form.
- `AppStopServer/Program.cs`:
  - Dòng 30: Di chuyển thư mục hiện tại về thư mục EXE.
  - Dòng 47: Gửi lệnh Kill tới Host.
- `KsHost/KsHost.cs`:
  - Dòng 30: Chia riêng cổng máy in (POSPrinter/EJournal) và các thiết bị khác.
  - Dòng 185: Client thỉnh thoảng không nhận được tin nhắn nên có cơ chế Reply lại.
