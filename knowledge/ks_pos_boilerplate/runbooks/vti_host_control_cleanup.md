---
title: VTI Host Control Cleanup Guide
project: ks_host
type: runbook
status: confirmed
source:
  - user request 2026-06-08
  - sources/KsPosBoilerplate/KsPos.Host/src
tags:
  - ks_host
  - vti
  - cleanup
  - cash_changer
---

# VTI Host control cleanup guide

## Mục tiêu

Guide này dùng khi VTI đọc hoặc tiếp tục cleanup `KsPos.Host`. Mục tiêu là làm code sạch hơn nhưng không phá luồng thiết bị legacy.

## Luồng chính cần nhớ

- Application mới đi qua Named Pipe `KsPos.Host.Command`; event thường dùng `KsPos.Host.Event`, scanner dùng `KsPos.Host.Stream`.
- WindowMessage vẫn là compatibility path cho `KsClient` và một số tool legacy. Không xóa khi chưa migrate hết consumer.
- CashChanger RT300 là device rủi ro nhất vì phụ thuộc OPOS OCX, WinForms message pump, shared memory/file bridge và retry `ReplyMessage`.
- File bridge CashChanger dùng `TURIREQ/TURIANS` để bù cho nhánh `AfterDeposit3` thread hóa mà WindowMessage không ổn định.

## Cleanup được phép

- Xóa comment-only legacy từ VB/C# conversion: `Friend Class`, `Partial Public`, `Inherits`, `Dim`, `Call`, `Private Sub`, `If ... Then`, `End If`.
- Xóa header lịch sử trong code sau khi đã lưu ý nghĩa vào knowledge.
- Xóa separator như `// =============================` và commented-out `KsLogControls`.
- Xóa empty XML docs không có nội dung.

## Knowledge trước khi xóa

- Trước khi xóa block comment legacy, phân loại nó vào một trong hai nhóm:
  - Noise thuần: VB conversion, separator, commented-out log, assignment/call đã có code chạy thay thế. Có thể xóa sau khi scan và ghi inventory theo nhóm.
  - Knowhow: comment giải thích lý do nghiệp vụ/kỹ thuật, path/file legacy, key INI, wire contract, OPOS/OCX sequence, retry/threading. Phải đưa vào knowledge trước khi xóa hoặc rewrite thành comment English ngắn trong code.
- Không cần copy đủ mọi dòng dead code vào knowledge. Cần ghi lại nguồn gốc, file chứa, ví dụ nhận diện, ý nghĩa runtime và rule không được đổi.
- Với CashChanger RT300, inventory đã lưu trong `knowledge/ks_pos_boilerplate/devices/cash_changer_rt300.md`, gồm `TSURI_ICON.ini`, `ICON/WATCH`, commented-out result mapping, device lifecycle call và file bridge.

## Cleanup không được phép nếu chưa có smoke thiết bị thật

- Không đổi OPOS open/claim/enable/release/close sequence.
- Không đổi `TURIREQ/TURIANS`, `_mFileStock`, `_wmStock`, `ReplyMessage`.
- Không đổi Named Pipe/WindowMessage wire keys: `ResultCode`, `ResultCodeExtended`, `ErrorMessage`, `ReturnValue`.
- Không xóa runtime log đang chạy trong `KsLogControls.*`; chỉ xóa comment/dead log.

## Refactor runtime log

- `KsLogControlsItem` chiếm nhiều code lặp nhưng backend log legacy phải giữ nguyên.
- Pattern an toàn là dùng thin facade, ví dụ `DeviceLog.ProcessDebug(this, detail)`, để tạo `KsLogControlsItem` và gọi lại đúng `KsLogControls.PutProcessDebugLog` / `PutProcessInfoLog` / `PutProcessErrorLog`.
- Facade phải giữ nguyên `programName`, `status`, `sClassName`, `sMethodName`, `sDetail` và channel log. Không đổi message Nhật đang chạy.
- Không dùng `MethodBase.GetCurrentMethod()` bên trong facade vì method name sẽ thành tên helper; dùng `[CallerMemberName]` hoặc truyền explicit method name.
- `DeviceLog` hiện nằm trong `KsDeviceManager` để các device project dùng chung được mà không phải duplicate helper.
- Đã áp dụng facade cho `DeviceBase`, `ScannerByDENSO`, `ScannerByDENSOForm`, `CashDrawerBySharpForm`, `LineDisplayBySharp`, `LineDisplayBySharpForm`, `CashChangerBase`, `KsDeviceManager`, `KsHost`, `KsClient`, `AppServer` và `AppStopServer`.
- Sau stage này, direct `KsLogControlsItem` chỉ nên còn trong các helper log và cụm `CashChangerByRT300Form` / `TuriFileBas`. Cụm RT300 cần stage riêng vì có program name/channel đặc thù như `CashChangerByRT300Form`, `TuriMem_Write`, `TuriFile_Read`, và `PutControlsLog`.
- Khi refactor tiếp `CashChangerByRT300Form` / `TuriFileBas`, phải inventory trước từng `programName`, channel log và message Nhật; không gom thẳng vào `DeviceLog` nếu làm mất nhãn log dùng để audit file/memory bridge.

## Verify tối thiểu

- Chạy `rtk codegraph sync sources/KsPosBoilerplate` trước và sau stage cleanup.
- Build `rtk dotnet build sources/KsPosBoilerplate/KsPos.Host/KsPos.Host.slnx -v:m`.
- Nếu đụng transport/AppStopServer, smoke Named Pipe invalid command và `Kill`.
