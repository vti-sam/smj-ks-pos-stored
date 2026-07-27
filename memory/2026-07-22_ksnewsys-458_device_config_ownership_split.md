---
title: KSNEWSYS-458 tách ownership device controller config vào DeviceCtrl
project: smj-ks-pos
type: architecture
status: archived
source:
  - sources/tabletposboilerplate/TabetPos.DeviceCtrl/DeviceManager.cs
  - sources/tabletposboilerplate/TabetPos.DeviceCtrl/Configuration/DeviceControllerConfigService.cs
  - project-store/artifacts/reports/architecture/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図/draft/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図.md
  - project-store/artifacts/reports/implementation-examples/EX-DEVICE-01_次世代POS_デバイス制御実装例集/draft/EX-DEVICE-01_次世代POS_デバイス制御実装例集.md
  - project-store/artifacts/deliverables/KSNEWSYS-458_device-control/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図.xlsx
  - project-store/artifacts/deliverables/KSNEWSYS-458_device-control/ARCH-DEVICE-01_クラス構成図.office-script.ts
  - project-store/artifacts/deliverables/KSNEWSYS-458_device-control/EX-DEVICE-01_次世代POS_デバイス制御実装例集.xlsx
  - project-store/artifacts/deliverables/KSNEWSYS-458_device-control/EX-DEVICE-01_共通利用フロー.office-script.ts
tags:
  - KSNEWSYS-458
  - DeviceCtrl
  - device-controller-config
  - basic-design
scope: historical
captured_at: 2026-07-22
validity: historical_context
promote_to_knowledge: false
---

# Kết quả

KSNEWSYS-458 đã chốt và triển khai ownership hoàn toàn của `device_controller_config.json` trong `TabetPos.DeviceCtrl`.

- Applications chỉ resolve `DeviceManager` và gọi `InitializeAsync`; không còn service, đường dẫn file hay deserialize JSON của device config.
- DeviceCtrl sở hữu luồng runtime → embedded default, Warning khi runtime lỗi, Error và dừng khởi tạo khi default lỗi, truyền nguyên cancellation, lưu thành công rồi mới áp dụng.
- Default JSON được chuyển thành embedded resource của `TabetPos.DeviceCtrl`; file runtime vẫn là `FileSystem.AppDataDirectory/device_controller_config.json`.
- ARCH-DEVICE và EX-DEVICE draft 0.4.0 đã được User duyệt nội dung tiếng Việt, sau đó chuyển toàn bộ nội dung khách hàng sang tiếng Nhật và xuất lại workbook Basic Design. ARCH có merge dọc cột `プラットフォーム`; EX giữ ma trận Windows/iOS/Android không merge dọc.
- Quyết định follow-up mới nhất ngày 2026-07-22: `.ts` là artifact chính của sơ đồ trong vòng lặp review. Mỗi lần chạy script phải tạo một worksheet render mới từ `B2`, dùng suffix `_R01`, `_R02` khi trùng tên và không quét/xóa/sửa sheet cũ. Không upload, download hoặc tích hợp workbook trong vòng lặp; chỉ publish vào workbook chính khi User yêu cầu riêng.
- Connector label được tạo cùng connector và group thành một object; node label nằm trong chính node. Màu semantic của application, DeviceCtrl, config, platform, external, decision và error được lấy từ `凡例` rồi nhúng trực tiếp vào Office Script.
- Template compact dùng lại nằm tại `skills/doc-authoring/basic-design-authoring/resources/compact-basic-design-template.md`; workbook template đã lưu sơ đồ native tại `skills/doc-authoring/basic-design-excel/resources/compact-basic-design-template.xlsx`. Contract giữ 13 sheet, không có `区分_基本情報`, chỉ có một sơ đồ chính và merge dọc theo `プラットフォーム`.
- Bản tiếng Nhật của ARCH-DEVICE và EX-DEVICE dùng thuật ngữ thống nhất với ARCH-HOST và CFG-01, giữ nguyên identifier kỹ thuật như `strategyclass`. ARCH-HOST, ARCH-01, ARCH-02, ARCH-03 và CFG-01 không được sửa trong vòng dịch này; việc cập nhật physical mapping của các tài liệu liên quan vẫn là phạm vi follow-up riêng.
- Ngày 2026-07-23, hai workbook và hai Office Script hiện hành đã được promote vào bundle bàn giao `project-store/artifacts/deliverables/KSNEWSYS-458_device-control/`. Các bản trong `draft/` được giữ làm nguồn review; bản Excel thừa `scratch/ARCH-DEVICE-01_updated.xlsx` đã bị xóa.

# Kiểm tra

- DeviceCtrl compile được cho iOS và Windows; compile của DeviceCtrl cũng đi qua trong build application iOS.
- Build toàn application iOS dừng ở compatibility gate do .NET iOS SDK yêu cầu Xcode 26.3 trong khi máy có Xcode 26.4.1.
- MSTest Windows đã bổ sung cho runtime/default/fallback/cancellation/save/concurrency, nhưng cần chạy trên Windows hoặc CI vì project graph hiện tại không build Windows target trên macOS.
- Bản tiếng Nhật của hai Markdown đều qua Basic Design gate; workbook read-back không còn nội dung tiếng Việt hoặc Mermaid source. Office Script audit đạt ARCH `20/20` khối và `19/19` đường, EX `24/24` khối và `24/24` đường. Basic Design gate, renderer tests, Office Script validators và semantic validation của hai script ARCH/EX đều đạt. Regression suite của pipeline đạt 21 test; skill quality evaluator của `business-flow-excel` đạt 91.2 và không còn failed evidence.
- Workbook-side check xác nhận drawing native: template `6` connector, ARCH-DEVICE `19` connector và EX-DEVICE `24` connector. Excel runtime không hỗ trợ `ShapeTextFrame.setWordWrap`; generator đã bỏ API này và có regression assertion để các script mới không tái phát lỗi.
