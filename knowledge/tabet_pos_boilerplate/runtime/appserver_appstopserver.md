---
title: Appserver Appstopserver
project: ks_host
type: architecture
status: active
source:
  - migrated from memory/ks_pos_boilerplate/ks_host/runtime/appserver_appstopserver.md
tags: [ks_host, runtime, ks_pos_boilerplate, appserver_appstopserver]
scope: durable
updated_at: 2026-08-18
---

# AppServer / AppStopServer

## AppServer

- Tiến trình đầu vào cho Host DeviceServer; output hiện tại là
  `TabletDeviceServer.AppServer`.
- Chế độ non-debug khởi tạo `TabletHost`, đăng ký factory cho đúng 5 thiết bị
  CustomerDisplay, CashDrawer, CashChanger, Printer và Payment, rồi giữ tiến
  trình sống đến khi `TabletHost.IsEndOrder` được kích hoạt.
- Chế độ debug được chọn bằng đối số dòng lệnh `DEBUG` và hiển thị `ServerAppForm`.
- Vòng lặp runtime sử dụng `Thread.Sleep(100)` và `Application.DoEvents()` để
  giữ message pump cho WinForms/OCX. Giao tiếp App ↔ Host dùng Named Pipe,
  không còn WindowMessage adapter.
- Quy trình tắt gọi `StopHost()` và chờ tối đa 10 giây; quá thời gian chờ sẽ thoát với `Environment.Exit(-1)`.
- Cleanup cuối cùng gọi dispose các form đang mở. Không thay thế `Dispose()` bằng `Close()` mà không có xác minh OCX.

## ServerAppForm

- Form chỉ dành cho chế độ debug với các nút start/stop.
- Start gọi `StartHost()` trên `TabletHost`.
- Stop gọi `StopHost()`.
- Code WinForms chuyển đổi vẫn mang các mẫu di trú từ VB; chỉnh sửa code-behind trước, designer chỉ sửa khi sinh layout/control yêu cầu.

## AppStopServer

- Tiến trình ngắn hạn yêu cầu host DeviceServer đang chạy dừng lại.
- Gửi JSON 1 dòng qua Named Pipe `TabetPos.Host.Command`:
  ```json
  {
    "requestId": "AppStopServer-<guid>",
    "message": "Kill",
    "handle": "0"
  }
  ```
- Đích gửi là command pipe của DeviceServer, không phải kill tiến trình trực tiếp.
- `TabletHost` xử lý `Kill` qua command handler chung, gọi `StopHost()` và thiết
  lập `IsEndOrder = true`.

## Logging / Cấu hình

- `AppServer/app.config` vẫn giữ các gợi ý runtime/probing cũ dù dự án nhắm tới .NET Windows hiện đại.
- `AppStopServer/app.config` ghi log vào `..\LOG\ServerApp.log` cũ; không đổi tên nếu chưa xác nhận các bên đọc log.
- Các mức/phương thức ghi log hiện tại khác với chú thích VB cũ; giữ nguyên hành vi hiện tại trừ khi chính sách ghi log thay đổi rõ ràng.
