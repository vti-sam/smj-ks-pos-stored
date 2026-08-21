---
title: TabletPos device-control Program Specifications delivery for 2026-08-24
project: smj-ks-pos
type: lesson
status: archived
source:
  - project-store/management/WBS.md
  - project-store/artifacts/reports/delivery/2026-08-24_デバイス制御設計資料/2026-08-24_納品資料一覧.md
  - project-store/artifacts/reports/program-specs/PS-01_タブレットDCS_デバイスコネクタ制御方式
  - sources/TabletPosBoilerplate/TabletPos.DeviceCtrl/ServiceCollectionExtensions.cs
  - sources/TabletPosBoilerplate/TabletPos.DeviceCtrl/Configuration/DeviceConfiguration.cs
  - sources/TabletPosBoilerplate/TabletPos.DeviceCtrl/Factory/StrategyFactory.cs
  - sources/TabletPosBoilerplate/TabletPos.DeviceCtrl/StrategyBase/DeviceStrategyBase.cs
  - sources/TabletPosBoilerplate/TabletPos.DeviceCtrl/Models/Device/DeviceSpec.cs
  - sources/TabletPosBoilerplate/TabletPos.DeviceCtrl/Platforms/Windows/Modules/NamedPipeClient.cs
  - sources/TabletPosBoilerplate/TabletPos.DeviceCtrl/Platforms/Windows/Modules/NamedPipeEventReceiver.cs
  - sources/TabletPosBoilerplate/TabletPos.DeviceContracts/DeviceProtocol.cs
  - sources/TabletPosBoilerplate/TabletPos.DeviceContracts/NamedPipeContracts.cs
tags:
  - tabletpos
  - delivery
  - device-control
  - program-specification
  - named-pipe
scope: historical
captured_at: 2026-08-20
validity: historical_context
promote_to_knowledge: false
---

# TabletPos device-control Program Specifications delivery for 2026-08-24

## Outcome

- Bộ giao khách ngày 2026-08-24 được chốt là Program Specification cho `PS-DEVICE-01` đến `PS-DEVICE-11`; `ARCH-DEVICE-01` và `EX-DEVICE-01` không nằm trong gói giao khách này.
- Bốn tài liệu hiện có giữ phiên bản `0.0.3`, `0.0.2`, `0.0.2`, `0.0.3`. Bảy tài liệu bổ sung `PS-DEVICE-05` đến `PS-DEVICE-11` có phiên bản đầu `0.0.1`.
- Bảy class bổ sung lần lượt là `ServiceCollectionExtensions`, `DeviceConfiguration`, `StrategyFactory<TBase>`, `DeviceStrategyBase`, `DeviceSpec`, `NamedPipeClient` và `NamedPipeEventReceiver`.
- Mỗi tài liệu có một Markdown canonical và một workbook Excel 5 sheet. Tên vật lý của `PS-DEVICE-03` và `PS-DEVICE-04` trong danh sách giao đã sửa đúng thành `EmbeddedDeviceControllerConfigStorage` và `IDeviceControllerConfigStorage`.
- WBS đã cập nhật tham chiếu từ `PS-DEVICE-01〜04` thành phạm vi `PS-DEVICE-01〜11`, đồng thời bổ sung liên kết tới các tài liệu cấu hình, factory, strategy, model và Named Pipe tương ứng.
- Gói local nằm tại `scratch/delivery-20260824/TabletPos_プログラム仕様書_20260824.zip`, gồm 23 file: 11 Markdown Program Specification, 11 workbook Excel và một danh sách bàn giao. SHA-256 là `84341DD29917C06AA4932C4D57F08664CD387F1979FAA5459B80FC394BBBA353`.
- Ngày 2026-08-21, `PS-DEVICE-10` và `PS-DEVICE-11` được đồng bộ lại với source commonization: request/response/event model cùng pipe name, timeout và retry default chuyển sang `TabletPos.DeviceContracts`; các constant cục bộ không còn trong class đã được bỏ khỏi tài liệu. `NamedPipeClient` chọn response timeout theo thứ tự payload riêng, cấu hình, rồi default chung và không cộng chồng thời gian chờ.
- Bộ 11 workbook mới nhất được render vào `draft/2026-08-21-latest-source`; `PS-DEVICE-10` có 10 method và `PS-DEVICE-11` có 6 method đúng theo source hiện hành.

## Evidence

- Source repo `sources/TabletPosBoilerplate` đã build và push commit `860376b595e4c8c932bd9ebf2a40a69fbee3a668` lên `origin/develop` khi đối chiếu tài liệu lần cuối.
- Cả 11 Markdown qua `spec_validate.py` với profile `japanese-class`, terminology contract và backlink tới danh sách bàn giao; mỗi tài liệu được nhận diện đúng 5 sheet.
- Method inventory của bảy tài liệu mới được đối chiếu trực tiếp với source. Số method tương ứng là `1`, `1`, `2`, `12`, `3`, `10`, `6`; constructor primary, generic method và chữ ký nhiều dòng được kiểm tra trực tiếp do parser inventory chưa nhận diện đầy đủ các cấu trúc C# này.
- Read-back bằng openpyxl xác nhận cả 11 workbook mới mở được, đúng thứ tự 5 sheet, đúng method inventory, landscape print setup, không còn comment hoặc marker xuống dòng dạng literal.
- `spec_validate.py` profile `japanese-class`, document-quality lint và terminology audit đều pass cho 11 Markdown; bản Excel versioned read-back pass 11/11.
- Program Specification renderer regression pass 17 test; management authoring gate pass sau khi cập nhật WBS.
- ZIP read-back xác nhận 23 entry, gồm 12 Markdown và 11 Excel, không có entry rỗng.

## Unresolved

- Máy local không có Microsoft Excel hoặc LibreOffice nên chưa thực hiện native Excel-to-PDF render. Semantic, style và print-setup read-back bằng openpyxl đã pass.

## Retrieval keys

- `TabletPos device-control Program Specifications 2026-08-24`
- `PS-DEVICE-01 PS-DEVICE-11`
- `ServiceCollectionExtensions DeviceConfiguration StrategyFactory DeviceStrategyBase DeviceSpec`
- `NamedPipeClient NamedPipeEventReceiver`
- `TabletPos_プログラム仕様書_20260824.zip`
- `84341DD29917C06AA4932C4D57F08664CD387F1979FAA5459B80FC394BBBA353`
