---
title: Named Pipe
project: ks_host
type: architecture
status: confirmed
source:
  - migrated from memory/ks_pos_boilerplate/ks_host/runtime/named_pipe.md
tags: [ks_host, runtime, ks_pos_boilerplate, named_pipe]
---

# Named Pipe Host

## Các Pipe

- Command pipe: `KsPos.Host.Command`
  - Đường dẫn yêu cầu POS/App -> Host.
  - Yêu cầu dạng JSON 1 dòng, phản hồi đồng bộ trên cùng kết nối.
- Event pipe: `KsPos.Host.Event`
  - Đường dẫn publish sự kiện Host -> POS/App.
  - Thông báo thiết bị bất đồng bộ thông thường.
- Stream pipe: `KsPos.Host.Stream`
  - Đường dẫn publish tần suất cao Host -> POS/App.
  - Dành cho luồng dữ liệu như Scanner; LineDisplay thường không phải đối tượng stream.

## Cấu trúc yêu cầu (Command)

```json
{
  "requestId": "00000001",
  "message": "DeviceMethod",
  "deviceId": "LineDisplay",
  "methodId": "DisplayText",
  "handle": "0",
  "payload": {}
}
```

## Cấu trúc phản hồi (Response)

```json
{
  "requestId": "00000001",
  "success": true,
  "resultCode": 0,
  "message": "",
  "payload": {
    "ResultCode": "0",
    "ReturnValue": "0"
  }
}
```

## Hành vi Runtime

- `KsHost.StartHost()` khởi động transport qua `DeviceHostTransport`; Named Pipe là đường chính cho application mới, WindowMessage là compatibility path cho client legacy.
- Lệnh Named Pipe được chuyển đổi thành cấu trúc dictionary key/value cũ dùng bởi WindowMessage.
- `DeviceCommandRouter` xếp hàng công việc theo từng khóa thiết bị, bảo toàn thứ tự bên trong thiết bị trong khi cho phép các thiết bị khác chạy độc lập.
- `Kill` và `ReStart` được chấp nhận và thực thi bất đồng bộ sau một khoảng trễ ngắn.
- Các tin nhắn không hỗ trợ sẽ trả về thất bại thay vì chuyển tiếp đến code thiết bị.

## Khả năng tương thích

- Giữ tên lệnh cũ: `DeviceUse`, `DeviceUnUse`, `DeviceUnUseComplete`, `DeviceMethod`, `Kill`, `ReStart`.
- Giữ các key trả về cũ: `ResultCode`, `ReturnValue` và các key payload đặc thù thiết bị.
- Không expose Host concrete class cho `KsPos.DeviceCtrl`; DeviceCtrl chỉ nên giao tiếp bằng Named Pipe.
- Khi migrate tool legacy như AppStopServer, dùng Named Pipe trước nhưng giữ WindowMessage fallback cho tới khi xác nhận không còn runtime consumer cũ.
