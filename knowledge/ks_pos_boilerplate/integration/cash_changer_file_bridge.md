---
title: Cash Changer File Bridge
project: ks_host
type: architecture
status: confirmed
source:
  - migrated from memory/ks_pos_boilerplate/ks_host/integration/cash_changer_file_bridge.md
  - sources/KsPosBoilerplate/KsPos.Host/src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs
  - sources/KsPosBoilerplate/KsPos.Host/src/KsDevice/CashChanger/CashChangerByRT300/TuriFileBas.cs
tags: [ks_host, integration, ks_pos_boilerplate, cash_changer_file_bridge]
---

# CashChanger file bridge

## File protocol

- `CashChangerByRT300Form` còn bridge legacy qua file dưới `AppContext.BaseDirectory + @"\..\DATA\"`.
- Bridge này tồn tại vì luồng `AfterDeposit3` được thread hóa để tăng tốc nhưng WindowMessage không dùng ổn trong phần cash change output; comment gốc: `WMが動作しない為、ファイルを使用`.
- File request/response:
  - `TURIREQ.DAT`: request từ CashChanger common DLL sang server.
  - `TURIANS.DAT`: response từ server sang common DLL.
  - `TURIREQ_OK.DAT`: flag request ready.
  - `TURIANS_OK.DAT`: flag response ready.
  - `TURIANS_NG.DAT`: response lỗi.
- Có dấu vết memory mapped file `TURIREQ` / `TURIANS`; code tạo `_mmfTuriReq`, `_mmfTuriAns` và clear lúc form init.

## Thứ tự xóa file

- Request file chỉ bị xóa sau khi `TuriFile_Read` thành công.
- Comment gốc `ファイル削除は読み込みエラー判定の後ろに移動` nghĩa là chuyển xóa file xuống sau khi kiểm tra lỗi đọc.
- Nếu đọc lỗi hoặc nội dung rỗng, code giữ request/ghi NG thay vì xóa sớm. Không đổi sang cleanup đầu hàm nếu chưa xác minh producer legacy.

## Delete retry

- `TuriFile_Delete` không xóa một lần rồi bỏ cuộc; nó retry, log lỗi, gọi `SleepWithEvent(100)` và `Application.DoEvents()`.
- File bridge chạy kiểu polling/timer, cần coi file lock và producer/consumer race là tình huống bình thường.

## Resend

- Khi nhận `ReplyMessage`, code dùng `_mFileStock` theo `CommunicationName` để gửi lại response cũ.
- Điều này tương tự cơ chế resend của WindowMessage, nhưng nằm ở bridge file.
- `_mFileStock` là compatibility state, không được xóa hoặc đổi key nếu chưa có test thay thế cho resend.

## Contract không được đổi

- Không đổi tên file `TURIREQ.DAT`, `TURIANS.DAT`, `TURIREQ_OK.DAT`, `TURIANS_OK.DAT`, `TURIANS_NG.DAT`.
- Không đổi key tab-delimited: `Message`, `DeviceId`, `MethodId`, `Handle`, `ResultCode`, `ReturnValue`, `CommunicationName`.
- Không đổi thứ tự: đọc request thành công rồi mới xóa request/OK file; response phải ghi data file trước, OK file sau.
- Không bỏ retry delete 30 lần với `SleepWithEvent(100)` và `Application.DoEvents()` khi còn producer/consumer legacy.

## Gợi ý Clean Architecture

- Nếu còn phải hỗ trợ bridge file, đặt nó thành adapter riêng với contract request-ready/response-ready rõ ràng.
- Không gom file bridge vào command handler chính; nó là transport legacy, không phải domain CashChanger.
