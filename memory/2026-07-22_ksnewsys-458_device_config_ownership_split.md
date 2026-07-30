---
title: KSNEWSYS-458 tách ownership device controller config vào DeviceCtrl
project: smj-ks-pos
type: architecture
status: archived
source:
  - sources/tabletposboilerplate/TabetPos.DeviceCtrl/DeviceManager.cs
  - sources/tabletposboilerplate/TabetPos.DeviceCtrl/Configuration/DeviceControllerConfigService.cs
  - project-store/artifacts/reports/architecture/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図.md
  - project-store/artifacts/reports/architecture/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図/draft/ARCH-DEVICE-01_クラス構成図_mermaid-geometry.office-script.ts
  - project-store/artifacts/reports/architecture/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図/draft/ARCH-DEVICE-01_クラス構成図_mermaid-geometry.labels.office-script.ts
  - project-store/artifacts/reports/implementation-examples/EX-DEVICE-01_次世代POS_デバイス制御実装例集/draft/EX-DEVICE-01_次世代POS_デバイス制御実装例集.md
  - project-store/artifacts/reports/architecture/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図.xlsx
  - project-store/artifacts/reports/architecture/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図/ARCH-DEVICE-01_クラス構成図.office-script.ts
  - project-store/artifacts/reports/architecture/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図/ARCH-DEVICE-01_クラス構成図.labels.office-script.ts
  - project-store/artifacts/reports/implementation-examples/EX-DEVICE-01_次世代POS_デバイス制御実装例集/EX-DEVICE-01_次世代POS_デバイス制御実装例集.xlsx
  - project-store/artifacts/reports/implementation-examples/EX-DEVICE-01_次世代POS_デバイス制御実装例集/EX-DEVICE-01_共通利用フロー.office-script.ts
  - project-store/artifacts/reports/implementation-examples/EX-DEVICE-01_次世代POS_デバイス制御実装例集/EX-DEVICE-01_共通利用フロー.labels.office-script.ts
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

# Outcome

KSNEWSYS-458 đã chốt và triển khai ownership hoàn toàn của `device_controller_config.json` trong `TabetPos.DeviceCtrl`.

- Applications chỉ resolve `DeviceManager` và gọi `InitializeAsync`; không còn service, đường dẫn file hay deserialize JSON của device config.
- DeviceCtrl sở hữu luồng runtime → embedded default, Warning khi runtime lỗi, Error và dừng khởi tạo khi default lỗi, truyền nguyên cancellation, lưu thành công rồi mới áp dụng.
- Default JSON được chuyển thành embedded resource của `TabetPos.DeviceCtrl`; file runtime vẫn là `FileSystem.AppDataDirectory/device_controller_config.json`.
- ARCH-DEVICE và EX-DEVICE draft 0.4.0 đã được User duyệt nội dung tiếng Việt, sau đó chuyển toàn bộ nội dung khách hàng sang tiếng Nhật và xuất lại workbook Basic Design. ARCH có merge dọc cột `プラットフォーム`; EX giữ ma trận Windows/iOS/Android không merge dọc.
- Quyết định ngày 2026-07-22 từng coi `.ts` là artifact chính của sơ đồ trong vòng lặp review. Quyết định này đã bị thay thế ngày 2026-07-29: Markdown chính thức ngoài `draft/` là source-of-truth nội dung; Office Script và XLSX chỉ là bản render. Khi chạy script, vẫn phải tạo worksheet mới từ `B2`, dùng suffix `_R01`, `_R02` khi trùng tên và không quét/xóa/sửa sheet cũ.
- Ngày 2026-07-29, ARCH-DEVICE-01 0.4.9 được sửa để thể hiện `プラットフォーム別ストラテジー` nằm trong `デバイス制御層（DeviceCtrl）`. Bên trong DeviceCtrl, sơ đồ tách `共通制御・設定管理` và `ストラテジーパターン`. Thuật ngữ logic được thống nhất thành `公開デバイス契約`: `StrategyFactory<T>` tạo platform strategy theo cấu hình, platform strategy thực thi contract này, còn application service chỉ gọi qua contract.
- Ngày 2026-07-29, ARCH-DEVICE-01 0.4.11 bổ sung render mode ngay trong Mermaid: `DEVICE_CTRL=group`, `CORE=table`, `STRATEGY_PATTERN=table`. Main Office Script tạo `① 共通制御・設定管理` và `② ストラテジーパターン` thành hai lane table độc lập; parent `（2）デバイス制御層（DeviceCtrl）` vẫn do Markdown sở hữu và được User gom trong bước review.
- Cặp main/labels Office Script hiện mang cùng tên Markdown nguồn và SHA-256 fingerprint. Script chỉ là output generated; mọi thay đổi nội dung, hierarchy, render mode hoặc style phải sửa trong Markdown/renderer rồi regenerate cả cặp.
- Ngày 2026-07-29, skill tạo Office Script từ Mermaid được đổi tên từ `business-flow-excel` thành `mermaid-office-script`; tên mới là owner active của cặp main/labels script, còn tên cũ chỉ có ý nghĩa lịch sử. Layout giữ tâm và tỷ lệ x/y từ Mermaid bằng một phép scale đồng nhất trong table sở hữu, tự tăng scale tối thiểu khi cần tránh overlap và xếp các table liền nhau theo source order. Candidate ARCH-DEVICE 0.4.12 trong `draft/` tạo bốn table `11 / 8 / 11 / 11` cột trên canvas `1476 × 594`, không có spacer column và không có component overlap; kết quả này thay thế candidate `20 / 17 / 19 / 17` trước đó.
- ARCH-DEVICE-01 0.4.12 định nghĩa sáu vai trò connector trong `凡例`: `主処理`, `コマンド通信`, `ライフサイクル`, `実機制御`, `非同期イベント`, `設定参照`. Chiều mũi tên và nét liền/nét đứt được khai báo tại Mermaid; Hanrei chỉ bind màu, độ dày và vai trò bằng `edge.<sourceIndex>`, trong đó index luôn theo thứ tự cạnh trong Markdown chứ không theo thứ tự SVG DOM. `コマンド通信` và `実機制御` dùng mũi tên hai chiều, `非同期イベント` dùng mũi tên một chiều nét đứt.
- ARCH-DEVICE-01 0.4.13 gộp `④ iOS周辺機器` và `⑤ Android周辺機器` thành một target logic `④ iOS／Android周辺機器`. Hai platform strategy vẫn tách riêng và cùng nối trực tiếp vào target này; platform chỉ sử dụng đường kết nối khi strategy tương ứng cung cấp đủ public operation. Trạng thái hiện tại vẫn giữ iOS khả dụng và Android chưa đủ thao tác bắt buộc.
- Connector label được tạo cùng connector và group thành một object; node label nằm trong chính node. Màu semantic của application, DeviceCtrl, config, platform, external, decision và error được lấy từ `凡例` rồi nhúng trực tiếp vào Office Script.
- Template compact dùng lại nằm tại `skills/doc-authoring/basic-design-authoring/resources/compact-basic-design-template.md`; workbook template đã lưu sơ đồ native tại `skills/doc-authoring/basic-design-excel/resources/compact-basic-design-template.xlsx`. Contract giữ 13 sheet, không có `区分_基本情報`, chỉ có một sơ đồ chính và merge dọc theo `プラットフォーム`.
- Bản tiếng Nhật của ARCH-DEVICE và EX-DEVICE dùng thuật ngữ thống nhất với ARCH-HOST và CFG-01, giữ nguyên identifier kỹ thuật như `strategyclass`. ARCH-HOST, ARCH-01, ARCH-02, ARCH-03 và CFG-01 không được sửa trong vòng dịch này; việc cập nhật physical mapping của các tài liệu liên quan vẫn là phạm vi follow-up riêng.
- Ngày 2026-07-29, toàn bộ sáu artifact chính thức của KSNEWSYS-458 được chuyển về đúng hai report bundle `artifacts/reports/architecture/ARCH-DEVICE-01_.../` và `artifacts/reports/implementation-examples/EX-DEVICE-01_.../`. Folder `project-store/artifacts/deliverables/` và file khóa Excel stale đã được xóa sau khi hash đích được xác nhận.

# Evidence

- DeviceCtrl compile được cho iOS và Windows; compile của DeviceCtrl cũng đi qua trong build application iOS.
- Build toàn application iOS dừng ở compatibility gate do .NET iOS SDK yêu cầu Xcode 26.3 trong khi máy có Xcode 26.4.1.
- MSTest Windows đã bổ sung cho runtime/default/fallback/cancellation/save/concurrency, nhưng cần chạy trên Windows hoặc CI vì project graph hiện tại không build Windows target trên macOS.
- Bản tiếng Nhật của hai Markdown đều qua Basic Design gate; workbook read-back không còn nội dung tiếng Việt hoặc Mermaid source. Office Script audit đạt ARCH `20/20` khối và `19/19` đường, EX `24/24` khối và `24/24` đường. Basic Design gate, renderer tests, Office Script validators và semantic validation của hai script ARCH/EX đều đạt. Regression suite của pipeline đạt 21 test; skill quality evaluator của `business-flow-excel` đạt 91.2 và không còn failed evidence.
- Workbook-side check xác nhận drawing native: template `6` connector, ARCH-DEVICE `19` connector và EX-DEVICE `24` connector. Excel runtime không hỗ trợ `ShapeTextFrame.setWordWrap`; generator đã bỏ API này và có regression assertion để các script mới không tái phát lỗi.
- ARCH-DEVICE-01 0.4.11 qua shared document lint, strict Basic Design gate và Excel validate-only. Workbook chính thức render thành `12` sheet; semantic read-back khớp candidate, có version `0.4.11`, không chứa raw Mermaid hoặc `excel-render` directive.
- Office Script audit đạt `26/26` shape và `21/21` edge. Main script có `4` lane table, `2` nested section và cùng fingerprint `ae3a5f9297b3f9bf07efd1618c51901453a8ae696bd63e7cbe498c29bc1444c1` với labels script.
- `mermaid-office-script` đạt `38` regression tests; template catalog audit đạt cả ba template; quick validator pass. Skill evaluator ratchet đạt `93.6`, `14/14` evidence và `failed=0`.
- Bản chính thức 0.4.13 đạt `25/25` shape, `22/22` edge, `18` functional component, `4` table và `0` overlap trong offline model. Hai cạnh thực機制御 từ iOS và Android cùng trỏ vào một target `④ iOS／Android周辺機器`. Source-edge audit xác nhận `edge.0` đến `edge.21` giữ đúng thứ tự khai báo sau khi SVG reorder; semantic gate từ chối binding ngoài phạm vi, sai chiều hoặc sai nét.
- Workbook 0.4.13 được render lại từ Markdown thành `12` sheet và được mở read-only trong Microsoft Excel tại report bundle để xác nhận sheet order và used range. PDF QA gồm `25` trang A4 không có lỗi bố cục nghiêm trọng; sheet Mermaid giữ vùng trống theo contract để cặp Office Script tạo sơ đồ native riêng, không vá hoặc resave DrawingML.

# Unresolved

- Bước gom hai bảng `① 共通制御・設定管理` và `② ストラテジーパターン` vào parent `（2）デバイス制御層（DeviceCtrl）` trên Excel native chưa được chạy trong task này; User sẽ thực hiện ở bước review.
- Excel Online publication không được yêu cầu, vì vậy chưa có bằng chứng runtime/autosave của cặp script 0.4.13 trên workbook online.
- Cặp Office Script 0.4.13 và workbook khung Basic Design đã là artifact chính thức trong report bundle. Sơ đồ native chưa được nhúng vào workbook Basic Design vì workflow hiện hành yêu cầu Office Script tạo một render sheet mới và cấm vá hoặc resave DrawingML.
- Ba artifact EX-DEVICE đã được chuyển nguyên trạng sang report bundle để không thay đổi nội dung ngoài scope. Cặp Office Script EX là output legacy, thiếu Markdown fingerprint và dùng helper layout cũ nên không pass validator `mermaid-office-script` hiện hành. Markdown EX 0.4.7 trong `draft/` pass document lint nhưng Basic Design gate còn thiếu overview phase và phase heading tương ứng với năm phase của sơ đồ; cần sửa Markdown trước rồi mới được regenerate.
- ARCH-01, ARCH-03 và CFG-01 vẫn còn cách viết `デバイス制御層（DeviceCtrl）`; việc chuẩn hóa logical/physical mapping của các tài liệu đó vẫn là follow-up riêng.

# Retrieval keys

- `KSNEWSYS-458`
- `ARCH-DEVICE-01`
- `0.4.13`
- `mermaid-office-script`
- `sourceIndex`
- `◀━━▶ コマンド通信`
- `◀━━▶ 実機制御`
- `┄┄▶ 非同期イベント`
- `DEVICE_CTRL=group`
- `CORE=table`
- `STRATEGY_PATTERN=table`
- `placeMermaidGeometry`
- `ARCH-DEVICE-01_クラス構成図_mermaid-geometry.office-script.ts`
- `project-store/artifacts/reports/architecture/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図.md`
- `④ iOS／Android周辺機器`
- `project-store/artifacts/reports/architecture/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図/ARCH-DEVICE-01_クラス構成図.office-script.ts`
- `project-store/artifacts/reports/architecture/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図/ARCH-DEVICE-01_クラス構成図.labels.office-script.ts`
- `project-store/artifacts/reports/architecture/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図.xlsx`
