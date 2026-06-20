---
title: Cash Changer RT300
project: ks_host
type: architecture
status: confirmed
source:
  - migrated from memory/ks_pos_boilerplate/ks_host/devices/cash_changer_rt300.md
  - sources/KsPosBoilerplate/KsPos.Host/src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs
tags: [ks_host, devices, ks_pos_boilerplate, cash_changer_rt300]
---

# CashChanger RT300

## State vendor quan trọng

- Device chính: `CashChangerByRt300`, OCX `AxOposCashChanger_CCO.AxOPOSCashChanger`.
- Comment legacy xác định chương trình gốc là `釣銭機サーバー` (`TuriSvrFrm`), tạo ngày 2017-02-14.
- Revision `00.10` ghi lý do thay đổi quan trọng: speed-up CashChanger bằng cách thread hóa riêng `AfterDeposit3` (釣銭出力) để receipt và cash change output chạy đồng thời; vì WindowMessage không hoạt động ổn trong nhánh này nên file/memory bridge được dùng.
- State runtime tập trung ở kiểu `TpCashRslt` / `GtOposCashRslt`: `ProgramId`, `LCmd`, `Sync`, `HWnd`, `HWndBegin`, `BeginDeposit`, `EndDeposit`, `DiStatus`, `DiEvent`.
- `HWndBegin` là handle đã gọi `BeginDeposit`; các lệnh liên quan deposit không nên cho handle khác chen vào.
- Khi có handle khác đang xử lý, code có nhánh kết thúc async hiện tại, reset state rồi sleep/doevents. Đây là chắp vá legacy nhưng là hành vi cần nhận diện trước khi thay bằng lock/queue sạch.

## Async/Freeze/Event

- Ba property vendor nhạy cảm: `AsyncMode`, `FreezeEvents`, `DataEventEnabled`.
- `pDirectIO_Async` bật async bằng cách set `FreezeEvents=false`, `AsyncMode=true`, gọi `DirectIO`, sau đó loop `DoEvents`/`SleepWithEvent(100)` đến khi `GbAsyncResult=true`.
- Nếu OCX đã ở `AsyncMode`, comment `非同期への切替は不要` nghĩa là không cần chuyển sang async nữa; khi kết thúc cũng không tự tắt async nếu vốn đã async.
- DirectIO/StatusUpdate event được gom vào `GsAsyncDirectIoEvents`, `GsAsyncStatusUpdateEvents`; result chính lấy từ `GlAsyncResultCode`, `GlAsyncResultCodeEx`.

## Freeze workaround

- Nhiều comment `フリーズ対応２` (workaround chống freeze lần 2) quanh các lệnh OPOS.
- Khi xử lý lỗi và không ở giữa Begin/End deposit (`!BBeginDp`), code gọi `PDeviceEnabled2(false)` để disable device.
- Không được thay thế bằng `finally { DeviceEnabled=false; Release(); }` chung cho mọi lệnh, vì Begin/End deposit có policy giữ device riêng.

## DepositAmount mapping

- `DepositAmount` đọc `DiEvent`/`DiStatus`, reset chúng về 0 rồi map thành result nội bộ:
  - cassette full/full: `-103`, `ResultCodeExtended=-99999`, message `フル`.
  - set error: `-104`, `ResultCodeExtended=-99999`, message `セット外れ`.
  - jam: `-101`, `ResultCodeExtended=-99999`, message `機器障害発生`.
  - các lỗi khác còn có `-102`, `-105` trong nhánh cũ/comment.
- Comment gốc nói set-error guidance không hiển thị lặp lại: `なぜか毎回表示されるのではなく１度表示した後は...２度目の表示が発生しない`. Vì vậy code cố tình loại result 104 khỏi error guidance ở một số nhánh.

## Error guidance

- `OPOSCash_ErrGuidance` dùng DirectIO command `101` (`CHAN_DI_ERRGUIDANCE`) và timer `TmrErrGuide` 500ms.
- Nếu vẫn lỗi `OposEExtended` + `OposEchanError`, code retry guidance bằng async DirectIO và sleep 500ms.
- Comment Mantis trong `ErrGuidance.cs`: sau khi hiển thị error guidance có thể còn sót hình vẽ, nên gọi `UpdateWindow` để redraw cưỡng bức.

## Deleted legacy comment inventory

Các block dưới đây đã từng tồn tại dưới dạng commented-out code trong source RT300. Chúng đã được xóa khỏi code để tránh nhiễu, nhưng giữ lại ở đây để VTI biết nguồn gốc khi control hoặc audit.

- `CashChangerByRT300.cs` và `CashChangerByRT300Form.cs` từng có block VB/comment cũ cho `TSURI_ICON.ini`:
  - `sPath = "D:\KPJ\PRM2\TSURI_ICON.ini"`
  - `oINI.FileName = sPath`
  - `oINI.Section = "ICON"`
  - `Read_IconFile = oINI.GetString(...)`
  - `Write_IconFile = oINI.SetString(...)`
- Ý nghĩa runtime hiện tại của block này không mất: code đang chạy vẫn đọc/ghi `Application.StartupPath + @"\..\PRM2\TSURI_ICON.ini"` qua `GetIni` / `SetIni`.
- Section/key quan trọng: section `ICON`, key `WATCH`.
- `WATCH != "0"` nghĩa là cassette được xử lý như trạng thái tồn quỹ không chắc chắn (`在高不確定`), ví dụ khi cassette bị tháo hoặc lấy tồn quỹ trong máy thất bại.
- Các dòng commented-out như `returns.Add(...)`, `ResultCode = ...`, `ResultCodeExtended = ...`, `Device_End(...)`, `FreezeEvents = ...`, `Application.DoEvents()` là vết chuyển đổi/nhánh test cũ. Không dùng chúng làm source-of-truth nếu code chạy hiện tại khác.
- Khi cần truy lại lịch sử cleanup, xem thêm memory local `memory/kspos_host_comment_cleanup_2026_06_08.md`.

## Gợi ý Clean Architecture

- Tách CashChanger thành state machine rõ ràng: idle, in-deposit, async-running, error-guidance.
- Domain chỉ nhận event/result chuẩn hóa; adapter giữ nguyên toàn bộ chi tiết OPOS, magic result và UI guidance.
- Khi migrate, ưu tiên viết golden tests cho mapping `DiEvent`/`DiStatus` và policy Begin/End deposit trước khi sửa cấu trúc.

## Quy tắc cleanup code

- Có thể xóa comment convert từ VB như `Friend Class`, `Partial Public Class`, `Inherits`, `Dim`, `Call`, `Private Sub` khi chúng không còn là code chạy.
- Có thể xóa header lịch sử sau khi đã lưu vào knowledge này; không giữ `USER NAME`, `PROGRAM NAME`, `FILE NAME`, `Ver.` trong code.
- Giữ runtime log đang chạy, đặc biệt log lỗi OPOS/file bridge; cleanup chỉ áp dụng cho commented-out log và separator.
- Nếu cần comment mới trong code, dùng English ngắn và chỉ giải thích lý do kỹ thuật như file bridge, OPOS threading, retry hoặc `ReplyMessage`.
