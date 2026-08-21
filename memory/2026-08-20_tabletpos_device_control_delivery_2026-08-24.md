---
title: TabletPos device-control Program Specifications delivery for 2026-08-24
project: smj-ks-pos
type: lesson
status: archived
source:
  - project-store/management/WBS.md
  - project-store/artifacts/reports/delivery/2026-08-24_デバイス制御設計資料/2026-08-24_納品資料一覧.md
  - project-store/artifacts/reports/program-specs/PS-DEVICE_タブレットPOS_デバイス制御
  - project-store/artifacts/reports/program-specs/PS-HOST_タブレットPOS_デバイスコネクタ
  - sources/TabletPosBoilerplate/TabletPos.DeviceCtrl/ServiceCollectionExtensions.cs
  - sources/TabletPosBoilerplate/TabletPos.DeviceCtrl/Configuration/DeviceConfiguration.cs
  - sources/TabletPosBoilerplate/TabletPos.DeviceCtrl/Factory/StrategyFactory.cs
  - sources/TabletPosBoilerplate/TabletPos.DeviceCtrl/StrategyBase/DeviceStrategyBase.cs
  - sources/TabletPosBoilerplate/TabletPos.DeviceCtrl/Models/Device/DeviceSpec.cs
  - sources/TabletPosBoilerplate/TabletPos.DeviceCtrl/Platforms/Windows/Modules/NamedPipeClient.cs
  - sources/TabletPosBoilerplate/TabletPos.DeviceCtrl/Platforms/Windows/Modules/NamedPipeEventReceiver.cs
  - sources/TabletPosBoilerplate/TabletPos.DeviceContracts/DeviceProtocol.cs
  - sources/TabletPosBoilerplate/TabletPos.DeviceContracts/NamedPipeContracts.cs
  - project-store/artifacts/reports/architecture/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書
  - project-store/artifacts/reports/testcases/TC-01_タブレットPOS_デバイス制御テストケース
  - project-store/artifacts/reports/testcases/TC-IT-HOST-01_タブレットPOS_ホストデバイス制御_デバイス戦略・OPOS連携_結合テストケース
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
- Bộ 11 workbook mới nhất nằm tại
  `scratch/program-specs/PS-DEVICE_タブレットPOS_デバイス制御/draft/2026-08-21-latest-source`;
  `PS-DEVICE-10` có 10 method và `PS-DEVICE-11` có 6 method đúng theo source
  hiện hành.

## Cập nhật đồng bộ toàn bộ tài liệu ngày 2026-08-21

- Phạm vi giao khách vẫn là `PS-DEVICE-01` đến `PS-DEVICE-11`; phạm vi tài liệu thiết kế trong repository rộng hơn, gồm 24 Program Specification (`PS-DEVICE-01` đến `PS-DEVICE-11` và `PS-HOST-01` đến `PS-HOST-13`). Không được dùng số lượng 11 của gói giao để kết luận repository chỉ có 11 Program Specification.
- Ngày 2026-08-21, bundle Program Specification hỗn hợp đã được tách theo
  owner: 11 Markdown Device Control nằm trong
  `PS-DEVICE_タブレットPOS_デバイス制御`, 13 Markdown Host/Device Connector nằm
  trong `PS-HOST_タブレットPOS_デバイスコネクタ`. Toàn bộ 63 workbook
  projection cũ đã được chuyển ra hai subtree tương ứng dưới
  `scratch/program-specs/`; `project-store` chỉ giữ Markdown canonical.
- Cùng ngày, 17 workbook Excel còn nằm lẫn trong các bundle Architecture,
  implementation example và testcase được rà lại theo cùng boundary. Mười sáu
  file đã được chuyển khỏi `project-store` sang
  `scratch/basic-design-excel/` hoặc `scratch/testcase-excel/`; các bản trùng tên
  được giữ riêng dưới `legacy-tracked/` để không ghi đè bản render mới hơn. Một
  file gốc `ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図.xlsx` đã được sao
  chép sang `scratch` nhưng chưa xóa được khỏi bundle do đang mở trong Excel.
- Năm tài liệu kiến trúc, hướng dẫn cấu hình, danh sách bàn giao, ví dụ triển khai, 24 Program Specification và hai bộ testcase đã được đối chiếu lại với source ở commit `860376b595e4c8c932bd9ebf2a40a69fbee3a668`. Ranh giới được chốt là App điều phối vòng đời, `TabletPos.DeviceCtrl` chọn strategy và gọi Named Pipe, Host sở hữu OPOS/thiết bị thật, còn `TabletPos.DeviceContracts` sở hữu DTO, identifier, key và default giao tiếp dùng chung.
- `ARCH-01` đã bỏ mô tả cũ cho rằng Printer trên Windows còn chờ tích hợp Host; đường dẫn package default được sửa về owner thật `TabletPos.DeviceCtrl/Resources/Raw/device_controller_config.json`, với fallback khi runtime config thiếu hoặc không đọc/parse được.
- `ARCH-HOST-01` đã ghi đủ năm mapping `CustomerDisplay1`, `CashDrawer1`, `CashChanger1`, `POSPrinter1`, `Payment1`; bổ sung `responseTimeoutMs=30000` cho lệnh thường và giới hạn thao tác dài `300000` cho receipt/payment. Sau khi Host restart hoặc Named Pipe đứt, App ghi thao tác thất bại, chuyển UI về chưa kết nối, hủy strategy cũ và yêu cầu `Start` lại để tạo session mới.
- `ARCH-DEVICE-01` đã phản ánh đầy đủ API hiện hành của `OposPrinterStrategy`: `Start`, `End`, `PrintNormal`, `CutPaper`, `PrintBitmap`, `PrintBarCode`, `PrintReceipt`; `OpenDrawer` không khả dụng qua strategy Printer. `ARCH-02` dùng cùng quy tắc hủy session cũ sau lỗi giao tiếp hoặc `ResultCode=101`.
- Host hiện quản lý năm loại thiết bị: Customer Display, Cash Drawer, Cash Changer, Printer và Payment. Mapping logical name hiện hành là `CustomerDisplay1` tới `LineDisplay1`, cùng `CashDrawer1`, `CashChanger1`, `POSPrinter1` và `Payment1` theo registry tương ứng.
- Luồng event hiện đã có receiver và vòng đọc, nhưng source chưa có đăng ký `EventReceived +=` ở tầng Application. Tài liệu phải mô tả đây là trạng thái chưa nối subscriber/use case, không được ghi là event đã được chuyển tiếp vào nghiệp vụ.
- Bộ testcase thiết bị canonical giữ đúng 90 case. Năm case được phân loại `N/A` kèm lý do theo capability/dữ liệu thực tế: `IT-DEVICE-038`, `IT-DEVICE-075`, `IT-DEVICE-078`, `IT-DEVICE-079`, `IT-DEVICE-085`. Workbook dùng công thức conditional formatting để tô xám toàn hàng khi cột kết quả hoặc cột đánh giá là `N/A`.
- Bộ testcase Host có 46 case, đã bổ sung phạm vi Printer và Payment. Các testcase chỉ mô tả input/default ở tầng App và hành vi quan sát được; không đưa timeout 30 giây thành kỳ vọng nghiệp vụ riêng của từng command.
- `EX-DEVICE-01` được nâng lên `0.5.1`, tham chiếu `PS-DEVICE-01〜11`; workbook 15 sheet đã được render lại. Hai workbook kiến trúc và toàn bộ 24 workbook Program Specification cũng được render lại từ Markdown canonical.
- Sơ đồ canonical dùng Markdown làm nguồn duy nhất: Mermaid trong `ARCH-DEVICE-01`, `ARCH-HOST-01` và `EX-DEVICE-01` được sinh thành năm cặp Office Script. Draw.io không phải nguồn hoặc projection nghiệm thu của các sơ đồ này.
- `CFG-01` chỉ rõ `TabletPos.DeviceContracts` là owner của hợp đồng giao tiếp dùng chung; `DeviceCommandDefaults` sở hữu mặc định Named Pipe và `DeviceOperationTimeouts` sở hữu giới hạn thao tác Printer／Payment.
- Kết quả tài liệu không đồng nghĩa với 100% pass trên máy POS thật. Bằng chứng hiện có là source/build commit đã chốt, validator, lint, read-back workbook và kiểm tra trực quan; không có lần chạy lại đủ 90 testcase trên thiết bị trong đợt đồng bộ này.

## Evidence

- Source repo `sources/TabletPosBoilerplate` đã build và push commit `860376b595e4c8c932bd9ebf2a40a69fbee3a668` lên `origin/develop` khi đối chiếu tài liệu lần cuối.
- Cả 11 Markdown qua `spec_validate.py` với profile `japanese-class`, terminology contract và backlink tới danh sách bàn giao; mỗi tài liệu được nhận diện đúng 5 sheet.
- Method inventory của bảy tài liệu mới được đối chiếu trực tiếp với source. Số method tương ứng là `1`, `1`, `2`, `12`, `3`, `10`, `6`; constructor primary, generic method và chữ ký nhiều dòng được kiểm tra trực tiếp do parser inventory chưa nhận diện đầy đủ các cấu trúc C# này.
- Read-back bằng openpyxl xác nhận cả 11 workbook mới mở được, đúng thứ tự 5 sheet, đúng method inventory, landscape print setup, không còn comment hoặc marker xuống dòng dạng literal.
- `spec_validate.py` profile `japanese-class`, document-quality lint và terminology audit đều pass cho 11 Markdown; bản Excel versioned read-back pass 11/11.
- Program Specification renderer regression pass 19 test, gồm guard tách
  `PS-DEVICE`/`PS-HOST` và từ chối Office output ngoài workspace `scratch/`;
  management authoring gate pass sau khi cập nhật WBS.
- ZIP read-back xác nhận 23 entry, gồm 12 Markdown và 11 Excel, không có entry rỗng.
- Customer document-quality lint pass 34/34 Markdown thuộc phạm vi đồng bộ. Program Specification validator pass 24/24; testcase validator nhận đúng 90 case thiết bị và 46 case Host.
- Read-back workbook xác nhận 24 Program Specification có đúng 5 sheet, workbook thiết bị có 90 case và 5 `N/A`, workbook Host có 46 case, không có lỗi công thức. Workbook testcase có freeze pane `AE11` và conditional formatting toàn hàng với công thức `OR($AI11="N/A",$AW11="N/A")`.
- Mười Office Script của ba sơ đồ ARCH-HOST, một sơ đồ ARCH-DEVICE và một sơ đồ EX-DEVICE qua validator; từng cặp main/labels có cùng Source contract SHA-256 và audit shape/edge khớp nguồn Mermaid. Workbook `ARCH-DEVICE`, `ARCH-HOST` và `EX-DEVICE` đã được kiểm tra trực quan lần lượt 12/12, 15/15 và 15/15 sheet.
- Sau lần sửa nội dung cuối, workbook `ARCH-DEVICE-01` và `ARCH-HOST-01` được regenerate từ Markdown canonical. Read-back xác nhận lần lượt 12 và 15 sheet, không có lỗi công thức; các ô chứa đủ API Printer, năm class ID, `responseTimeoutMs` và quy tắc vô hiệu session sau restart. Năm cặp Office Script tiếp tục pass validator và mỗi cặp giữ fingerprint main/labels giống nhau vì Mermaid contract không đổi.
- Rule lint pass sau khi bổ sung boundary Office projection. Skill validator
  pass cho Program Spec, Basic Design, Test Case, Checklist, DB Table, Estimate,
  DOCX và Mermaid Office Script; regression test placement/render liên quan đều
  pass.
- Read-back bằng artifact-tool import thành công 23 workbook hiện có trong
  `scratch/basic-design-excel/` và `scratch/testcase-excel/`; không phát hiện
  chuỗi lỗi công thức `#REF!`, `#DIV/0!`, `#VALUE!` hoặc `#NAME?`. Đối chiếu Git
  blob xác nhận 11/11 workbook tracked đã chuyển có bản tương ứng nguyên vẹn
  trong `scratch`.

## Unresolved

- Máy local không có Microsoft Excel hoặc LibreOffice nên chưa thực hiện native Excel-to-PDF render. Semantic, style và print-setup read-back bằng openpyxl đã pass.
- Các file Draw.io/SVG cũ không được dùng làm bằng chứng cho năm sơ đồ canonical. Theo quyết định của User, pipeline nghiệm thu là Markdown → Mermaid → Office Script; không yêu cầu regenerate Draw.io trong đợt đồng bộ này.
- Chưa chạy lại bộ testcase trên thiết bị POS thật; không dùng kết quả lint/render để khẳng định toàn bộ nghiệp vụ vật lý đã pass.
- Workbook `ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図.xlsx` vẫn đang bị
  tiến trình Excel giữ khóa tại bundle Architecture. Cần đóng workbook rồi xóa
  file nguồn và lock file `~$...xlsx`; bản sao đã được bảo toàn dưới
  `scratch/basic-design-excel/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図/legacy-tracked/`.

## Retrieval keys

- `TabletPos device-control Program Specifications 2026-08-24`
- `PS-DEVICE-01 PS-DEVICE-11`
- `ServiceCollectionExtensions DeviceConfiguration StrategyFactory DeviceStrategyBase DeviceSpec`
- `NamedPipeClient NamedPipeEventReceiver`
- `TabletPos_プログラム仕様書_20260824.zip`
- `84341DD29917C06AA4932C4D57F08664CD387F1979FAA5459B80FC394BBBA353`
- `90 device test cases 5 N/A IT-DEVICE-038 075 078 079 085`
- `46 host test cases Printer Payment`
- `DeviceContracts NamedPipe event subscriber not connected`
- `Program Spec Device Control Device Connector separate folders scratch Office output`
- `Architecture implementation testcase Excel projection scratch Office output`
