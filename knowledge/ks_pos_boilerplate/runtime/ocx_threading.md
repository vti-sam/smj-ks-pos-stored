---
title: OCX Threading
project: ks_host
type: architecture
status: confirmed
source:
  - migrated from memory/ks_pos_boilerplate/ks_host/runtime/ocx_threading.md
tags: [ks_host, runtime, ks_pos_boilerplate, ocx_threading]
---

# OCX threading / WinForms boundary

## Invariants

- Các device OCX hiện được đặt trên WinForms form riêng, ví dụ `CashDrawerBySharpForm`, `LineDisplayBySharpForm`, `ScannerByDENSOForm`, `CashChangerByRT300Form`.
- Comment gốc lặp lại ở nhiều device: `別スレッドでUIオブジェクトを操作するとエラーになる可能性があるため、タイマースレッドはOCXオブジェクトを持つフォームとする`.
- Nghĩa là: thao tác UI object từ thread khác có thể lỗi, nên timer thread phải synchronize về form đang giữ OCX.
- Code set `LoopTimer.SynchronizingObject = _oFrm`; đây là ranh giới STA/UI-thread quan trọng, không phải chi tiết UI dư thừa.

## Stop/Dispose

- `DeviceBase.StopDevice()` có comment cũ về việc phải xử lý qua `Invoke` khi gọi từ thread khác, nhưng hiện form close/dispose logic vẫn phụ thuộc message pump.
- `AppServer` cleanup cuối cùng dispose toàn bộ open forms vì form chứa OCX có vấn đề khi tiến trình kết thúc.

## Gợi ý Clean Architecture

- Infrastructure adapter cần có scheduler/UI dispatcher cho OCX. Không gọi OCX trực tiếp từ application service, background worker hoặc pipe handler.
- Nếu chuyển sang worker thread/async queue, queue chỉ nên marshal command vào UI dispatcher chứa OCX rồi trả result ra ngoài.
- Không bỏ WinForms/message pump cho đến khi từng OCX được xác minh trên phần cứng/vendor runtime.
