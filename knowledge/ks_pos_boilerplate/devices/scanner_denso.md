---
title: Scanner Denso
project: ks_host
type: architecture
status: confirmed
source:
  - migrated from memory/ks_pos_boilerplate/ks_host/devices/scanner_denso.md
tags: [ks_host, devices, ks_pos_boilerplate, scanner_denso]
---

# Scanner DENSO

## Invariants khi refactor

- Device: `ScannerByDenso`, OCX DENSO scanner, tải qua `DEVICE.INI` giống các device khác.
- Scanner có tối ưu tốc độ riêng: comment gốc `スキャナ速度アップ対応` nghĩa là "xử lý tăng tốc scanner".
- `ClaimDevice()` được chuyển lên ngay sau `Open`; nếu cờ `_oFrm.PbClaim` chưa có thì `Device_Start()` phải claim lại.
- Khi dừng scanner sau khi đã trả dữ liệu, code cố tình gọi `Device_End(oDevice, true, false)`: tắt `DataEventEnabled` nhưng không `Release`.
- Không đổi thành release/close chuẩn theo vòng đời OPOS thông thường nếu chưa test phần cứng. Comment gốc nói kiểu VB6 release đến hết sẽ làm mất dữ liệu đọc trong khoảng giữa `DeviceEnabled=false` và `Release()`.

## Chống mất barcode

- Client có nhánh `スキャナ読込漏れ対応` nghĩa là "xử lý đọc sót scanner": nếu `DeviceUnUse(ScanUse)` mà `ScanData` rỗng thì chờ tối đa 50 vòng x 10ms trước khi gửi `DeviceUnUseComplete`.
- Comment cảnh báo `これでも状況によっては即時取得できない場合があります`: ngay cả chờ kiểu này vẫn có trường hợp không lấy được ngay.
- Có comment về `スキャナー読込漏れ対応[完全版]` nhưng đang là `非対応` (chưa hỗ trợ). Ý tưởng là không release, giữ/khởi động lại event trong một khoảng ngắn rồi cần app phía client chờ thêm.

## Gợi ý Clean Architecture

- Tách scanner thành adapter có state "claim giữ lâu" khác với command device đồng bộ.
- Domain không nên biết `DataEventEnabled`, `Release`, `PbClaim`; expose thành invariant như `KeepClaimedBetweenReads` hoặc policy tương đương trong infrastructure.
- Test refactor phải có case barcode đến muộn trong lúc `DeviceUnUse`.
