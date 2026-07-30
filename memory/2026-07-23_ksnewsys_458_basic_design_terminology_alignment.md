---
title: KSNEWSYS-458 thống nhất thuật ngữ Device Control theo ARCH-HOST
project: smj-ks-pos
type: decision
status: archived
source:
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
  - project-store/artifacts/reports/architecture/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図.md
  - project-store/artifacts/reports/implementation-examples/EX-DEVICE-01_次世代POS_デバイス制御実装例集/draft/EX-DEVICE-01_次世代POS_デバイス制御実装例集.md
  - project-store/artifacts/reports/architecture/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図/
  - project-store/artifacts/reports/implementation-examples/EX-DEVICE-01_次世代POS_デバイス制御実装例集/
tags:
  - KSNEWSYS-458
  - basic-design
  - terminology
  - device-control
scope: historical
captured_at: 2026-07-23
validity: historical_context
promote_to_knowledge: false
---

# Outcome

ARCH-DEVICE bản 0.4.10 áp dụng quy tắc tên logic và vật lý của Basic Design:

- phần overview, trách nhiệm, lifecycle và luồng sử dụng dùng tên logic tiếng Nhật;
- vật lý identifier chỉ xuất hiện trong Mermaid có mapping, bảng `実装識別子との対応`, cột identifier và contract kỹ thuật;
- `ストラテジー生成` map với `StrategyFactory<T>` và không được gọi là `公開デバイス契約`;
- `公開デバイス契約` map với sáu interface `IPrinterStrategy`, `IBarcodeScannerStrategy`, `ICashChangerStrategy`, `ICustomerDisplayStrategy`, `IDrawerStrategy`, `IKeyboardStrategy`;
- `DeviceStrategyBase` và `DeviceStrategyBase<T>` được tách thành `共通ストラテジー基底`;
- mô hình trong `デバイス制御層` được trình bày rõ là `ストラテジーパターン`.

Markdown ARCH-DEVICE là nguồn nội dung chính. Cặp Office Script đã được sinh lại từ Mermaid bản 0.4.10:

- script chính thể hiện `公開デバイス契約（IPrinterStrategy等）`, không còn `I...Strategy / DeviceStrategyBase`;
- `ストラテジー生成（StrategyFactory<T>）` được giữ là cấu thành riêng;
- sơ đồ có 3 lane, đủ 4 section lồng nhau, 26 shape và 21 connector;
- hai lần sinh cho kết quả byte-identical; main và labels script đều pass validator.

Workbook và Office Script là bản render dẫn xuất, không được dùng để sửa ngược nội dung thiết kế.

# Evidence

- `project-store/artifacts/reports/architecture/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図.md`
- `sources/tabletposboilerplate/TabetPos.DeviceCtrl/Factory/StrategyFactory.cs`
- `sources/tabletposboilerplate/TabetPos.DeviceCtrl/Interfaces/IPrinterStrategy.cs`
- `sources/tabletposboilerplate/TabetPos.DeviceCtrl/Interfaces/IBarcodeScannerStrategy.cs`
- `sources/tabletposboilerplate/TabetPos.DeviceCtrl/Interfaces/ICashChangerStrategy.cs`
- `sources/tabletposboilerplate/TabetPos.DeviceCtrl/Interfaces/ICustomerDisplayStrategy.cs`
- `sources/tabletposboilerplate/TabetPos.DeviceCtrl/Interfaces/IDrawerStrategy.cs`
- `sources/tabletposboilerplate/TabetPos.DeviceCtrl/Interfaces/IKeyboardStrategy.cs`
- `sources/tabletposboilerplate/TabetPos.DeviceCtrl/StrategyBase/DeviceStrategyBase.cs`
- `project-store/artifacts/reports/architecture/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図/ARCH-DEVICE-01_クラス構成図.office-script.ts`
- `project-store/artifacts/reports/architecture/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図/ARCH-DEVICE-01_クラス構成図.labels.office-script.ts`
- Markdown lint, Basic Design strict gate và terminology audit của ARCH-DEVICE đều pass ngày 2026-07-29.
- Office Script audit xác nhận `shapes=26/26`, `edges=21/21`, `lanes=3`, `sections=4`; pipeline test, template catalog, skill validator và skill-quality evidence đều pass ngày 2026-07-29.

# Unresolved

- `project-store/artifacts/reports/implementation-examples/EX-DEVICE-01_次世代POS_デバイス制御実装例集/draft/EX-DEVICE-01_次世代POS_デバイス制御実装例集.md` vẫn còn các cách gọi `公開インターフェース`, `公開契約` và identifier vật lý trong câu giải thích. Chưa sửa trong task này vì ngoài scope đã duyệt.
- Workbook chưa được chạy hoặc lưu lại bằng cặp Office Script mới. Theo quyết định của User, phần Excel sẽ được vẽ lại thủ công. Bundle chỉ hoàn tất sau khi workbook phản ánh đúng Markdown 0.4.10.

# Retrieval keys

- KSNEWSYS-458
- ARCH-DEVICE-01
- StrategyFactory
- 公開デバイス契約
- ストラテジーパターン
- DeviceStrategyBase
- Markdown source of truth
