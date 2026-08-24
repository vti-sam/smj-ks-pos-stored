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
captured_at: 2026-08-22
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
  implementation example và testcase được chuyển khỏi `project-store` sang
  `scratch/basic-design-excel/` hoặc `scratch/testcase-excel/`; các bản trùng tên
  được giữ riêng dưới `legacy-tracked/` để không ghi đè bản render mới hơn.
  Workbook `ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図.xlsx` được xóa khỏi
  bundle sau khi tiến trình Excel nhả khóa. Folder Architecture hiện chỉ giữ
  Markdown canonical và cặp Office Script của sơ đồ.
- Năm tài liệu kiến trúc, hướng dẫn cấu hình, danh sách bàn giao, ví dụ triển khai, 24 Program Specification và hai bộ testcase đã được đối chiếu lại với source ở commit `860376b595e4c8c932bd9ebf2a40a69fbee3a668`. Ranh giới được chốt là App điều phối vòng đời, `TabletPos.DeviceCtrl` chọn strategy và gọi Named Pipe, Host sở hữu OPOS/thiết bị thật, còn `TabletPos.DeviceContracts` sở hữu DTO, identifier, key và default giao tiếp dùng chung.
- `ARCH-01` đã bỏ mô tả cũ cho rằng Printer trên Windows còn chờ tích hợp Host; đường dẫn package default được sửa về owner thật `TabletPos.DeviceCtrl/Resources/Raw/device_controller_config.json`, với fallback khi runtime config thiếu hoặc không đọc/parse được.
- `ARCH-HOST-01` đã ghi đủ năm mapping `CustomerDisplay1`, `CashDrawer1`, `CashChanger1`, `POSPrinter1`, `Payment1`; bổ sung `responseTimeoutMs=30000` cho lệnh thường và giới hạn thao tác dài `300000` cho receipt/payment. Sau khi Host restart hoặc Named Pipe đứt, App ghi thao tác thất bại, chuyển UI về chưa kết nối, hủy strategy cũ và yêu cầu `Start` lại để tạo session mới.
- `ARCH-DEVICE-01` đã phản ánh đầy đủ API hiện hành của `OposPrinterStrategy`: `Start`, `End`, `PrintNormal`, `CutPaper`, `PrintBitmap`, `PrintBarCode`, `PrintReceipt`; `OpenDrawer` không khả dụng qua strategy Printer. `ARCH-02` dùng cùng quy tắc hủy session cũ sau lỗi giao tiếp hoặc `ResultCode=101`.
- Host hiện quản lý năm loại thiết bị: Customer Display, Cash Drawer, Cash Changer, Printer và Payment. Mapping logical name hiện hành là `CustomerDisplay1` tới `LineDisplay1`, cùng `CashDrawer1`, `CashChanger1`, `POSPrinter1` và `Payment1` theo registry tương ứng.
- Luồng event hiện đã có receiver và vòng đọc, nhưng source chưa có đăng ký `EventReceived +=` ở tầng Application. Tài liệu phải mô tả đây là trạng thái chưa nối subscriber/use case, không được ghi là event đã được chuyển tiếp vào nghiệp vụ.
- Bộ testcase thiết bị canonical giữ đúng 90 case. Năm case được phân loại `N/A` kèm lý do theo capability/dữ liệu thực tế: `IT-DEVICE-038`, `IT-DEVICE-075`, `IT-DEVICE-078`, `IT-DEVICE-079`, `IT-DEVICE-085`. Workbook dùng công thức conditional formatting để tô xám toàn hàng khi cột kết quả hoặc cột đánh giá là `N/A`.
- Bộ testcase Host có 46 case, đã bổ sung phạm vi Printer và Payment. Các testcase chỉ mô tả input/default ở tầng App và hành vi quan sát được; không đưa timeout 30 giây thành kỳ vọng nghiệp vụ riêng của từng command.
- `EX-DEVICE-01` được nâng lên `0.5.1`, tham chiếu `PS-DEVICE-01〜11`; workbook 15 sheet đã được render lại. Hai workbook kiến trúc và toàn bộ 24 workbook Program Specification cũng được render lại từ Markdown canonical.
- `ARCH-DEVICE-01` phiên bản `0.4.16` đã thống nhất tên logic của các thành phần
  với 11 Program Specification `PS-DEVICE-01〜11`, ví dụ `デバイスマネージャー`,
  `設定サービス`, `ストラテジーファクトリー` và
  `名前付きパイプイベント受信`. Mục 5.4 bổ sung bảng `tên logic ↔ class/interface
  vật lý ↔ vai trò ↔ workbook Program Specification`, giúp người đọc nhận biết
  trách nhiệm của từng class và mở đúng tài liệu chi tiết.
- Ngày 2026-08-22, `ARCH-DEVICE-01` được nâng lên `0.4.18`. Mermaid nhiều tầng
  chuyển sang ELK, bỏ toàn bộ `direction` trong subgraph con, khai báo node trước
  cạnh và dùng ba hàng liên kết vô hình ở cấp node để cố định thứ tự ba vùng
  trách nhiệm cấp cao. Projection Office Script ánh xạ một-một ba vùng
  `（1）（2）（3）` thành ba table; bốn subgraph con nằm dưới cùng table `（2）` dưới
  dạng section. Cách projection từng ép hai subgraph trực tiếp
  `① 共通制御・設定` và `② ストラテジーパターン` xếp trên-dưới, nhưng quyết định
  này đã bị thay thế bởi correction ngày 2026-08-23 ở dưới: section con phải giữ
  nguyên hình học Mermaid.
- Cùng ngày, `ARCH-DEVICE-01` được nâng lên `0.4.19`. Mục `5.4` bổ sung cột
  `図中番号` để người đọc đối chiếu từng Program Specification với số của cấu
  phần hoặc nhóm trách nhiệm trên sơ đồ. Các class không có node riêng dùng số
  của nhóm trách nhiệm chứa chúng; không bổ sung cột vị trí bên trong Program
  Specification theo quyết định của User.
- Ngày 2026-08-22, `ARCH-DEVICE-01` được tái cấu trúc thành phiên bản `0.4.20`.
  Hai sheet phân cách `区分_*`, hai sheet trùng nội dung
  `06_設定・初期化`/`07_プラットフォーム対応` và các mục `5.4` đến `5.9` bị loại
  khỏi Markdown canonical. `5.2 責務領域` map trực tiếp ba vùng trên sơ đồ
  `（1）（2）（3）` với bốn tài liệu Excel liên quan; `5.3 責務領域と構成要素`
  giữ một bảng 22 dòng gồm tên logic, số trên sơ đồ, identifier vật lý, trách
  nhiệm, điều kiện liên kết/sử dụng và tên file Program Specification `.xlsx`.
  Nội dung chi tiết cấu hình tiếp tục thuộc `CFG-01`, cách gọi từ application
  thuộc `EX-DEVICE-01`, và xử lý bên trong Device Connector thuộc
  `ARCH-HOST-01`.
- Cùng ngày, `ARCH-DEVICE-01` được nâng lên `0.4.21` sau khi rà lại toàn bộ
  ownership theo template Basic Design. `3.3 責務境界` và `図の補足` bị loại vì
  lặp lại cùng fact; `5.2` trở thành owner duy nhất của ba ranh giới trách nhiệm
  cấp cao, còn `5.3` là owner của trách nhiệm cấu phần, quan hệ, điều kiện sử
  dụng, identifier triển khai và mapping Program Specification. `2.1`, `2.2`
  và `3.1` được rút về mức kết luận, phạm vi và implementation mapping của Basic
  Design; method, input/output, exception và xử lý chi tiết tiếp tục thuộc
  Program Specification. Mermaid contract không đổi nên không regenerate Office
  Script hoặc workbook trong lần sửa nguồn này.
- Theo quyết định tiếp theo của User, version hiển thị chính thức của
  `ARCH-DEVICE-01` được reset từ chuỗi bản làm việc `0.4.21` về `0.1.0`.
  `変更履歴` chỉ giữ một dòng `新規` ngày `2026/08/24`; header, cover version và
  ngày tạo dùng cùng giá trị. Các mốc `0.4.x` phía trên chỉ còn là historical
  context trong memory, không xuất hiện trong Markdown giao khách.
- Workbook `ARCH-DEVICE-01` phiên bản `0.1.0` đã được render lại từ Markdown
  canonical thành 8 sheet. Bảng `5.3 責務領域と構成要素` đặt `図中番号` trước
  `論理構成要素`, gồm 3 hàng nhóm `（1）アプリケーション層`,
  `（2）デバイス制御層（DeviceCtrl）`, `（3）外部境界` và 22 hàng cấu phần.
  Renderer dùng hàng nhóm thưa trong Markdown để tạo một hàng phân khu nền xám,
  ghép số sơ đồ với tên nhóm bằng một khoảng trắng rồi merge nhãn đó trên toàn
  chiều rộng bảng. Hàng nhóm dùng chữ đậm lớn hơn và cao tối thiểu 30pt.
  HTML entity trong ô được giải mã khi projection, vì vậy
  `StrategyFactory&lt;TBase&gt;` trong Markdown hiển thị thành
  `StrategyFactory<TBase>` trong Excel.
- Theo yêu cầu điều chỉnh độ rộng ngày 2026-08-22, bảng `5.2 責務領域` tiếp tục
  dùng lưới chuẩn `B:Z`, còn bảng `5.3 責務領域と構成要素` dùng lưới rộng
  `B:AN`. Markdown canonical đặt directive dùng chung
  `<!-- excel-render table-grid=wide -->` ngay trước bảng 5.3; renderer chỉ áp
  dụng directive cho bảng kế tiếp rồi tự trở về lưới chuẩn, không hard-code
  document, sheet hoặc section.
- Ngày 2026-08-23, vùng tiêu đề merge `A1:D3` của workbook Basic Design chuyển
  từ chiều cao cố định sang phép tính AutoFit nội bộ dựa trên source text, tổng
  độ rộng các cột merge và cỡ chữ. Vì Excel không AutoFit ổn định cho merged
  cell, renderer tính chiều cao trong giới hạn `54pt` đến `108pt` rồi chia đều
  cho ba hàng; tiêu đề ngắn vẫn giữ baseline `54pt`.
- Cùng ngày, thông tin người tạo của `ARCH-DEVICE-01` được thống nhất chỉ còn
  `VTI サム`. Tiêu đề bảng `5.2` được chuẩn hóa thành
  `図中番号 / 責務領域 / 主な責務 / 主な構成要素 / 関連資料`; tiêu đề bảng `5.3`
  thành `図中番号 / 論理構成要素 / 実装識別子 / 責務 / 主な連携・利用条件 /
  関連プログラム仕様書`. Cụm `ファイル` được bỏ khỏi tiêu đề vì từng giá trị
  đã ghi rõ tên file `.xlsx`; bảng `5.2` giữ đúng năm cột, không có cột rỗng
  thứ sáu.
- Cùng ngày, baseline authoring cho logical architecture mới hoặc được tái cấu
  trúc chuyển sang ELK spacing compact `nodeSpacing: 26` và `rankSpacing: 50`;
  tài liệu đã review với `30/60` vẫn hợp lệ khi không có yêu cầu đổi layout.
  Generator Office Script giữ nguyên kiểu table hiện hành: chỉ có dải tiêu đề,
  phần body không thêm khung riêng và các ô nền vẫn không merge/không border.
  Mỗi top-level table dùng một giá trị padding nội dung tối thiểu một hàng Basic
  `18pt`, áp dụng bằng nhau cho top/left/right/bottom. Markdown `ARCH-DEVICE-01`
  không đổi; cặp script được regenerate từ nguồn đó và chỉ thay đổi geometry
  projection.
- Ngày 2026-08-23, projection connector của `ARCH-DEVICE-01` được sửa để giữ
  nguyên từng cặp endpoint do Mermaid render. Thứ tự ưu tiên là
  `%% excel-route` đã review, `fromSide/toSide` parse từ Mermaid/SVG, rồi mới
  fallback theo bounds khi thiếu side. Generator không còn tự thay các cạnh
  bằng heuristic `left/left`, `right/right`, `top/top` hoặc side bus. Parser
  `凡例` đồng thời được sửa để dừng ở heading cùng cấp hoặc cao hơn, tránh nuốt
  các bảng 5.2/5.3 vào legend khi regenerate. Nội dung và topology Mermaid của
  `ARCH-DEVICE-01` không đổi.
- Correction cuối ngày 2026-08-23 chốt rằng Office Script chỉ thay ba subgraph
  top-level `（1）（2）（3）` bằng title row của table. Sau ảnh review, ba title row
  được khôi phục đúng presentation cũ: cùng hàng tại row offset `0`, table đầu
  bắt đầu ở column offset `0`, table sau bắt đầu đúng tại cột kết thúc của table
  trước và không có spacer column. Bốn subgraph con của `（2）`, toàn bộ node và
  quan hệ trái-phải/trên-dưới vẫn giữ nguyên phép chiếu `x/y/width/height` từ
  Mermaid/SVG. Rule xếp dọc và căn trái section con bị xóa khỏi generator,
  preview và skill.
- Bản trung gian cùng ngày từng dùng nhiều native straight segment rồi group để
  giữ toàn bộ polyline Mermaid. Cách này bị thay thế vì Excel chọn cả bounding
  box của group, làm connector khó chỉnh trực tiếp.
- Correction cuối cùng ngày 2026-08-23 giữ ba title row `（1）（2）（3）` cùng hàng
  và liền cột, nhưng không căn thẳng nội dung bên trong ba table. Toàn sơ đồ dùng
  một phép tịnh tiến dọc chung nên độ cao tương đối của Application, DeviceCtrl,
  External, section con và route vẫn đúng theo Mermaid; không còn phép chuẩn hóa
  riêng từng table kéo node về cùng baseline. Một scale chung được tăng đủ để
  chữ Excel nằm trong đúng rectangle Mermaid đã scale; node và section tiếp tục
  dùng cùng phép chiếu. Correction cuối ưu tiên khả năng chỉnh line: mỗi logical
  edge dùng đúng một native Excel connector, giữ điểm đầu/cuối đã chiếu, chọn
  `straight` cho route hai điểm và `elbow` khi route có bend; không group route
  hoặc connector label. Interior bend được phép sai khác nhẹ so với Mermaid.
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
- Workbook Basic Design mới của `ARCH-DEVICE-01` có 12 sheet, chứa đủ 11 công
  thức liên kết tới 11 workbook `PS-DEVICE-*`; toàn bộ đích liên kết tồn tại.
  Read-back xác nhận đủ 11 tên logic mới, không còn `デバイス管理`,
  `共通ストラテジー基底` hoặc `ストラテジー生成`. Cặp Office Script được sinh
  lại hai lần cho kết quả byte-identical, audit đủ 29/29 shape và 34/34 edge,
  đồng thời giữ cùng source-contract fingerprint.
- Cặp Office Script của `ARCH-DEVICE-01` phiên bản `0.4.18` được regenerate trực
  tiếp từ Markdown và pass validator với 3 lane, 4 section, 29/29 shape, 34/34
  edge. Hai lần sinh độc lập có SHA-256 giống nhau cho cả main và labels.
  Document-quality lint, Basic Design gate, audit toàn bộ 6 template và 58
  regression test của Mermaid renderer đều pass. Kết quả này đã được thay thế
  bởi layout vertical-section bên dưới sau khi ảnh review xác nhận hai section
  trực tiếp trong lane `（2）` phải xếp trên-dưới.
- Evidence vertical-section dưới đây là kết quả trung gian đã bị correction cuối
  ngày 2026-08-23 thay thế. Khi đó validator xác nhận `3` lane, `4` section,
  `29/29` shape và `34/34` edge. Offline layout read-back xác nhận ba top-level
  table lần lượt dùng padding `22.0pt`, `30.4pt`, `25.2pt`; trong từng table,
  cùng một giá trị được áp dụng cho cả top/left/right/bottom. Preview giữ nguyên
  dải tiêu đề và body không có khung riêng. Hai section trực tiếp `①` và `②`
  trong lane `（2）` vẫn xếp trên-dưới, cùng căn trái và không chồng lấn. Main
  script mới có SHA-256
  `52C73A5B105C90314278B83626E05E9176532979D7A693177F774DEBF84CBAEB`;
  labels script giữ SHA-256
  `A14B36DA2B0CA40BFA3A8438C61EE9C0008A7C68CE6298D0B7B13317C2842C50`.
  Toàn bộ `62` regression test và audit `6/6` profile đều pass; không dùng hình
  học xếp dọc này làm baseline hiện hành.
- Sau khi sửa routing connector, `ARCH-DEVICE-01` được sinh độc lập hai lần;
  main và labels lần lượt byte-identical giữa hai run. Audit xác nhận `29/29`
  shape, `34/34` edge và `34/34` cặp endpoint trong Office Script trùng với
  generated Mermaid layout. Validator tiếp tục pass `3` lane và `4` section.
  Main script mới có SHA-256
  `CA3AAFDB8EE7E628E4BEDB6FE4A54E44B993597411E53E3E8285AD1C984ED15E`;
  labels script có SHA-256
  `A14B36DA2B0CA40BFA3A8438C61EE9C0008A7C68CE6298D0B7B13317C2842C50`.
  Regression riêng của horizontal-lane pass `24/24`, bốn suite liên quan và
  audit `6/6` profile đều pass; skill-quality giữ điểm `93.6`, không có test
  failure hoặc regression so với baseline.
- Sau correction “chỉ top-level thành table”, main/labels của `ARCH-DEVICE-01`
  được regenerate trực tiếp từ Markdown canonical. Kết quả dùng row offset
  `23`, `0`, `7` là evidence trung gian và đã bị ảnh review thay thế vì làm mất
  presentation ba table cùng hàng. Baseline hiện hành dùng row offset `0` cho
  cả ba table, column offset `0`, `12`, `75`, không có spacer column. Phần bằng
  chứng `26/26` và hash main `1407BD...` của bản này đã bị correction hình học
  dọc và route cuối cùng bên dưới thay thế.
- Bản hiện hành sau correction single-connector được regenerate trực tiếp từ
  Markdown canonical và sinh độc lập byte-identical. Validator pass `3` table,
  `4` section; source/render audit pass `29/29` shape và `34/34` edge. Ba title
  row vẫn dùng cùng row offset `0`; nội dung không bị căn baseline giữa table.
  Read-back hình học xác nhận `22/22` node dùng đúng `sourceWidth/sourceHeight ×
  scale`. Main script có `34` lệnh tạo edge, mỗi edge gọi helper sinh đúng một
  `Worksheet.addLine`; không còn `addGroup(routeSegments)`. Labels script cũng
  không còn `addGroup([connector, box])`, nên line và label chọn độc lập. Label
  không dùng tâm bounding box của elbow; generator lưu anchor chuẩn hóa tại
  trung điểm đoạn dài nhất của route tham chiếu và labels script đặt text box
  vào anchor đó. Horizontal-lane regression pass `30/30`; toàn bộ
  suite Mermaid Office Script pass `70/70`; template catalog và audit profile
  pass `6/6`. Main script có SHA-256
  `DBC34F6AB30420D30F79E2B00B6B1D1F45A7549C776D66FCFAFBC53515803041`;
  labels script có SHA-256
  `4A9C9FE77E49C9E5E08560CC9C9A82EF5ABC76BC2FA9CC9E074E65C863EC989B`.
- Markdown `ARCH-DEVICE-01` phiên bản `0.4.19` pass document-quality lint,
  Basic Design gate và terminology audit. Workbook được regenerate dưới
  `scratch/basic-design-excel/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図/`;
  read-back xác nhận 12 sheet, header `図中番号` tại sheet
  `05_クラス構成_02`, đủ 11 giá trị mapping cho `PS-DEVICE-01〜11`, và version
  cover là `0.4.19`.
- Markdown `ARCH-DEVICE-01` phiên bản `0.4.20` pass document-quality lint,
  Basic Design strict gate và terminology audit với bốn tài liệu liên quan.
  Read-back source xác nhận còn 8 heading sheet, `5.2` có đúng 3 dòng top-level,
  `5.3` có đúng 22 dòng cấu phần, không còn tên sheet cũ, `区分_*`, công thức
  `HYPERLINK`, `関連シート:` hoặc heading `5.4`. Toàn bộ 15 tên file `.xlsx`
  được ghi trong mapping đều có Markdown canonical cùng tên trong
  `project-store`.
- Markdown `ARCH-DEVICE-01` phiên bản `0.4.21` pass document-quality lint,
  Basic Design strict gate và terminology audit với bốn tài liệu liên quan.
  Read-back source xác nhận 8 heading sheet, 3 dòng top-level trong `5.2`, 22
  dòng cấu phần trong `5.3`, không còn `3.3 責務境界` hoặc `図の補足`, và cả 15
  tên file `.xlsx` trong mapping đều có Markdown canonical cùng tên. Skill
  Basic Design pass validator, skill-quality ratchet không có regression, rule
  lint và workspace verify cùng pass.
- Sau khi reset version, Markdown canonical pass lại document-quality lint,
  Basic Design strict gate và terminology audit với bốn tài liệu liên quan.
  Read-back xác nhận header và cover đều là `0.1.0`, ngày tạo là `2026/08/24`,
  `変更履歴` có đúng một dòng `0.1.0 / 新規`, và không còn chuỗi version `0.4.x`
  trong tài liệu.
- Workbook `ARCH-DEVICE-01` phiên bản `0.1.0` được import và render preview bằng
  artifact-tool cho đủ 8 sheet; không có lỗi công thức. Read-back sheet
  `05_クラス構成_02` xác nhận header 6 cột theo đúng thứ tự mới, các hàng nhóm ở
  dòng 19/23/39, đủ 22 hàng chi tiết và identifier `StrategyFactory<TBase>` tại
  ô `J33`. Bản projection rộng giữ bảng 5.2 tại `B:Z`, mở bảng 5.3 tới `B:AN`,
  và merge đúng `B19:AN19`, `B23:AN23`, `B39:AN39` với
  các nhãn `（1） アプリケーション層`,
  `（2） デバイス制御層（DeviceCtrl）`, `（3） 外部境界`; mỗi hàng cao 30pt.
  Kiểm tra trực quan xác nhận bảng 5.3 sử dụng thêm chiều ngang, ba hàng nhóm
  phủ đúng toàn bộ bảng và bảng 5.2 không bị thay đổi độ rộng.
- Với tiêu đề `次世代POS デバイス制御クラス構成図`, read-back xác nhận mỗi hàng
  `1:3` cao `20.5167pt`, tổng `61.55pt`, cùng một giá trị trên đủ 8 sheet; merge
  `A1:D3`, nội dung tiêu đề và toàn bộ cấu trúc `5.2`/`5.3` được giữ nguyên.
  Artifact-tool render đủ 8 sheet và không phát hiện lỗi công thức; kiểm tra
  trực quan xác nhận tiêu đề không bị cắt và header không đẩy lệch nội dung.
- Sau khi chuẩn hóa người tạo và tiêu đề cột, document-quality lint, Basic
  Design gate và terminology audit với `ARCH-HOST-01` đều pass. Read-back
  workbook xác nhận `作成者=VTI サム`, đúng thứ tự năm tiêu đề của `5.2`, sáu
  tiêu đề của `5.3`, ba merge `B19:AN19`, `B23:AN23`, `B39:AN39`, đủ 8 sheet
  và chiều cao tiêu đề `20.5167pt` trên các hàng `1:3`. Artifact-tool render đủ
  8 sheet và không phát hiện lỗi công thức.
- Regression test của Basic Design Excel pass 27/27; Basic Design authoring gate
  pass 39/39 và đã sửa false positive để chỉ cấm số tròn trong cột `No`/`No.`,
  không cấm ký hiệu hợp lệ trong cột `図中番号`. Skill validator và
  skill-quality ratchet của `basic-design-excel` và `basic-design-authoring`
  không có regression; rule lint và workspace verify cùng pass.

## Unresolved

- Máy local không có Microsoft Excel hoặc LibreOffice nên chưa thực hiện native Excel-to-PDF render. Semantic, style và print-setup read-back bằng openpyxl đã pass.
- Các file Draw.io/SVG cũ không được dùng làm bằng chứng cho năm sơ đồ canonical. Theo quyết định của User, pipeline nghiệm thu là Markdown → Mermaid → Office Script; không yêu cầu regenerate Draw.io trong đợt đồng bộ này.
- Office Script không có waypoint setter cho một connector duy nhất. Bản hiện
  hành chủ động chấp nhận interior bend của native `elbow` sai khác nhẹ với
  Mermaid để line chọn và chỉnh trực tiếp; node/section rectangle và endpoint
  projection vẫn là phần bắt buộc giữ nguyên.
- Chưa chạy lại bộ testcase trên thiết bị POS thật; không dùng kết quả lint/render để khẳng định toàn bộ nghiệp vụ vật lý đã pass.
- Bản verify hiện hành là
  `ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図_wide_updated.xlsx` trong
  `scratch/basic-design-excel`; bản `_wide.xlsx` đang được Microsoft Excel giữ
  khóa nên không bị ghi đè. Bản tên gốc không được tự động thay thế vì User chưa
  yêu cầu promote artifact.

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
- `ARCH-DEVICE-01 PS-DEVICE-01 PS-DEVICE-11 class mapping デバイスマネージャー`
- `ARCH-DEVICE-01 0.4.18 Mermaid ELK 29 shapes 34 edges 3 lanes 4 sections`
- `ARCH-DEVICE-01 lane header first section gap 18pt compact 26 50 legacy 30 60`
- `ARCH-DEVICE-01 direct child vertical section superseded preserve Mermaid geometry`
- `ARCH-DEVICE-01 top-level tables aligned row zero contiguous columns single editable native connector`
- `ARCH-DEVICE-01 aligned table titles shared vertical Mermaid projection zero route node title crossings`
- `ARCH-DEVICE-01 22 exact node rectangles 34 single straight elbow connectors no route label group`
- `ARCH-DEVICE-01 connector label longest projected segment anchor not bounding box center`
- `ARCH-DEVICE-01 top-level table equal four-side padding no body frame`
- `ARCH-DEVICE-01 Mermaid connector endpoint fromSide toSide top left Office Script routing`
- `ARCH-DEVICE-01 0.4.19 図中番号 PS-DEVICE-01 PS-DEVICE-11 mapping`
- `ARCH-DEVICE-01 0.4.20 5.2 責務領域 5.3 責務領域と構成要素 3 top-level 22 components`
- `ARCH-DEVICE-01 0.4.21 図の補足 3.3 責務境界 ownership consolidated into 5.2 5.3`
- `ARCH-DEVICE-01 0.1.0 変更履歴 single initial revision version reset`
- `ARCH-DEVICE-01 0.1.0 5.3 wide table B:AN 5.2 B:Z excel-render table-grid`
- `ARCH-DEVICE-01 merged title A1:D3 auto height 61.55pt 54 108`
- `ARCH-DEVICE-01 VTI サム 5.2 主な責務 関連資料 5.3 関連プログラム仕様書`
