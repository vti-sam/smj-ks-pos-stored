---
title: Conversion Artifacts
project: ks_host
type: runbook
status: confirmed
source:
  - migrated from memory/ks_pos_boilerplate/ks_host/maintenance/conversion_artifacts.md
tags: [ks_host, maintenance, ks_pos_boilerplate, conversion_artifacts]
---

# Conversion artifacts

## File không thuộc runtime compile chính

- `src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300.csproj` dùng `EnableDefaultCompileItems=false`.
- Project chỉ compile:
  - `CashChangerByRT300.cs`
  - `CashChangerByRT300Form.cs`
  - `CashChangerByRT300Form.Designer.cs`
  - `ErrGuidance.cs`
  - `OPOSCashChangerLog.cs`
  - `TuriFileBas.cs`
- `TuriSvr_frm.cs`, `CashChangerByRT300Form3.cs`, `CashChangerByRT300Form3.Designer.cs` không nằm trong compile list hiện tại.

## Dấu vết converter

- `TuriSvr_frm.cs` còn nhiều `#error Cannot convert ...`, `CONVERSION ERROR`, `On Error GoTo`, `On Error Resume Next`, `ReDim`.
- Đây là source note/di sản chuyển đổi VB, không phải runtime source đang build.
- Khi cần đối chiếu hành vi CashChanger, có thể đọc các file này như bản gốc tham khảo, nhưng không sửa để làm build pass trừ khi có kế hoạch migrate riêng.

## Gợi ý Clean Architecture

- Khi trích behavior, ưu tiên source đang compile. Chỉ dùng file artifact để giải nghĩa comment hoặc tìm ý đồ vendor cũ.
- Không đưa file artifact vào `.csproj` chỉ để "đầy đủ source"; nó sẽ kéo theo lỗi conversion chưa xử lý.
