---
title: Window Message Client
project: ks_host
type: architecture
status: confirmed
source:
  - migrated from memory/ks_pos_boilerplate/ks_host/integration/window_message_client.md
tags: [ks_host, integration, ks_pos_boilerplate, window_message_client]
---

# WindowMessage client protocol

## MessageId và retry

- `KsClient.ReturnMessageId` là static/shared. Comment gốc `Sharedに変更 同じMessagaIdが使用される場合あり` nghĩa là đã đổi sang shared vì có thể dùng trùng message id.
- `_mMessageIdCount` reset về 0 khi vượt 10000. Trước khi dùng message id mới, code xóa hết entry cũ cùng id trong `ReturnMessageId`.
- Không thay bằng counter instance-local trong refactor nếu vẫn giữ WindowMessage legacy; nhiều client instance có thể nhận cùng luồng message.

## ReplyMessage

- Khi đợi kết quả `DeviceUnUse`, `DeviceUnUseNoWait`, `DeviceMethod`, nếu quá 3 giây không có response thì client gửi `ReplyMessage`.
- Comment gốc `ClientにMessageが届かない場合があるため、Replyを用意`: có trường hợp message không đến client nên cần cơ chế reply lại.
- Host xử lý `ReplyMessage` bằng cách lấy response đã lưu theo `CommunicationName` và gửi lại cho destination đó.
- Host hiện cô lập WindowMessage trong adapter; đây là legacy compatibility layer, không phải đường chính cho code mới.
- `_wmStock` là state phục vụ resend; không xóa khi còn `KsClient` hoặc AppStopServer dùng WindowMessage.

## Event handler đặc biệt

- `DeviceMethod` gỡ event handler sau khi có response, trừ `EnablePINEntry`.
- Với `EnablePINEntry`, comment nói cần chờ response vì dữ liệu PINPad (`PINデータ`) đến sau; không auto-unsubscribe sớm.
- Scanner/MSR/PINPad event được lưu vào property `ScanData`, `MsrData`, `PinPadData`; log phải mask `MsrData`.

## Gợi ý Clean Architecture

- Bọc WindowMessage bằng gateway có correlation id + resend/reply contract, nhưng giữ tương thích message id reset 10000 khi còn bridge legacy.
- Tách command response và device event: hiện tại chúng dùng chung event handler, dễ nhầm khi chuyển sang pipe/event bus.
- Code mới không nên thêm logic nghiệp vụ vào WindowMessage; chỉ mapping input/output vào command handler chung.
