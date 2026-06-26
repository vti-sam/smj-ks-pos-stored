# Next Generation Tablet POS 見積仕様書

## Sheet 1. 基本情報

| Hạng mục | Nội dung |
| --- | --- |
| Tên tài liệu | Next Generation Tablet POS 見積仕様書 |
| Đối tượng | Next Generation Tablet POS common foundation / tài liệu nền tảng chung |
| Giai đoạn estimate | 2026/05/01 đến 2026/07/31 |
| Issue liên quan | KSNEWSYS-424, KSNEWSYS-426, KSNEWSYS-427 |
| Đơn vị thực hiện | VTI |
| Công số tính toán | 5.25人月 |
| Công số trình bày | 3.00人月 |
| Phần VTI điều chỉnh | 2.25人月 |
| Mục đích | Trình bày phạm vi tài liệu và công số estimate theo từng nhóm deliverable |

## Sheet 2. 見積概要

### 2.1 見積概要

Estimate này bao gồm phần code nền liên quan, chuẩn bị tài liệu, hoàn thiện testcase, kiểm tra nội dung và phản ánh review cho Next Generation Tablet POS. Giai đoạn từ tháng 5 đến tháng 7 tập trung vào việc biến các phần kỹ thuật chính thành tài liệu và deliverable có thể review được.

Phạm vi được chia theo các nhóm chính: thiết bị và Host, lưu trạng thái cục bộ, ghi log / Sentry, testcase và review. Cách chia này giúp thể hiện rõ từng nhóm deliverable, công số tương ứng và kế hoạch thực hiện trong 3 tháng.

| Hạng mục | Công số | Ghi chú |
| --- | ---: | --- |
| Công số tính toán | 5.25人月 | Tương đương khoảng 1.5 đến 2.0 người mỗi tháng trong 3 tháng |
| Công số trình bày | 3.00人月 | Tương đương 1.0 người mỗi tháng trong 3 tháng |
| Phần VTI điều chỉnh | 2.25人月 | VTI điều chỉnh trong phạm vi đề xuất này |

### 2.2 見積前提条件

| Hạng mục | Nội dung |
| --- | --- |
| Giai đoạn thực hiện | Từ đầu tháng 5 đến cuối tháng 7 năm 2026 |
| Trọng tâm công việc | Code nền liên quan, tài liệu hóa, testcase, kiểm tra nội dung, review và điều chỉnh tài liệu |
| Phạm vi kỹ thuật | Thiết bị và Host, thiết bị thanh toán CAFISArch, lưu trạng thái cục bộ, ghi log / Sentry |
| Hình thức deliverable | Tài liệu thiết kế, tài liệu chương trình, testcase và bảng công số estimate |
| Review | Bao gồm review nội dung, Q&A và phản ánh điều chỉnh nhỏ trong phạm vi estimate |
| Điều kiện thay đổi | Nếu phát sinh phạm vi lớn ngoài các nhóm nêu trên, hai bên sẽ xác nhận impact và estimate bổ sung |

### 2.3 対象範囲

| Nhóm | Nội dung phạm vi |
| --- | --- |
| Thiết bị và Host | Tài liệu hóa デバイス接続サーバー, 名前付きパイプコマンドサーバー, デバイスマネージャー, các thiết bị chính và thiết bị thanh toán CAFISArch |
| Lưu trạng thái cục bộ | Tài liệu hóa cơ chế lưu và khôi phục trạng thái màn hình, session, snapshot, DB cục bộ và migration |
| Ghi log / Sentry | Tài liệu hóa cơ chế ghi log, gửi thông tin sự cố lên Sentry, masking thông tin nhạy cảm và thông tin hỗ trợ điều tra |
| Testcase / Verification | Chuẩn bị testcase và các quan điểm kiểm tra cần thiết để hỗ trợ review tài liệu |
| Review / Coordination | Review tài liệu, Q&A, điều chỉnh nhỏ và sắp xếp deliverable trước khi bàn giao |

### 2.4 成果物一覧

| Nhóm tài liệu | Nội dung |
| --- | --- |
| Architecture document | Tài liệu cấu trúc tổng thể, cấu trúc terminal app và cấu trúc デバイス接続サーバー |
| Configuration guide | Tài liệu hướng dẫn cấu hình cho device control |
| Program specification | Tài liệu chương trình cho thiết bị và Host, thiết bị thanh toán CAFISArch, lưu trạng thái cục bộ và ghi log / Sentry |
| Testcase | Testcase cho thiết bị và Host, lưu trạng thái cục bộ và ghi log / Sentry |
| Estimate summary | Bảng estimate để theo dõi phạm vi và công số thực hiện |

### 2.5 対象外・補足事項

| Hạng mục | Nội dung |
| --- | --- |
| Màn hình nghiệp vụ mới số lượng lớn | Ngoài phạm vi estimate này vì giai đoạn hiện tại tập trung vào tài liệu và nền tảng chung |
| Device hoặc OCX chưa được cung cấp thông tin | Cần phân tích riêng về thông số, môi trường và cách kiểm tra |
| Kiểm chứng toàn bộ thiết bị tại môi trường production | Cần kế hoạch kiểm thử hiện trường riêng |
| Thiết kế vận hành Sentry ở cấp tổ chức | Phạm vi hiện tại tập trung vào phần sử dụng trong app |
| Thay đổi lớn ngoài phạm vi đã xác nhận | Cần đánh giá impact và estimate bổ sung |
| Điều chỉnh công số | Nếu có thay đổi lớn về deliverable, phạm vi thiết bị, môi trường kiểm tra hoặc yêu cầu review bổ sung, công số và schedule có thể cần được xác nhận lại |

## Sheet 3. 見積工数

| No | Nhóm | Hạng mục | Nội dung | Giai đoạn | Công số tính toán | Công số trình bày | Deliverable | Ghi chú |
| ---: | --- | --- | --- | --- | ---: | ---: | --- | --- |
| 1 | Thiết bị và Host | Tài liệu cấu trúc Host | Tài liệu hóa cấu trúc tổng thể và cấu trúc デバイス接続サーバー, bao gồm phần code nền liên quan | 2026/05-2026/06 | 0.35人月 | 0.20人月 | Architecture document | Chuẩn bị nền cho các tài liệu chi tiết |
| 2 | Thiết bị và Host | 名前付きパイプコマンドサーバー / Host adapter | Tài liệu hóa và kiểm tra cơ chế nhận yêu cầu từ terminal app và kết nối tới Host | 2026/05-2026/06 | 0.36人月 | 0.21人月 | Program specification | Dùng thuật ngữ theo tài liệu Host |
| 3 | Thiết bị và Host | デバイスコマンドルーター / デバイスコマンドハンドラー | Tài liệu hóa và kiểm tra cách phân phối, xử lý yêu cầu điều khiển thiết bị | 2026/05-2026/06 | 0.38人月 | 0.22人月 | Program specification | Là phần chính của luồng điều khiển thiết bị |
| 4 | Thiết bị và Host | デバイスサーバーホスト / デバイスマネージャー | Tài liệu hóa và kiểm tra khởi động, kết thúc, quản lý trạng thái thiết bị | 2026/05-2026/06 | 0.32人月 | 0.18人月 | Program specification | Bao gồm start / stop và quản lý thiết bị |
| 5 | Thiết bị và Host | デバイスベース / thiết bị chính | Tài liệu hóa và kiểm tra xử lý chung, 釣銭機制御 RT-300, キャッシュドロア制御 SHARP, カスタマーディスプレイ制御 SHARP | 2026/06-2026/07 | 0.44人月 | 0.25人月 | Program specification | Dùng thuật ngữ theo tài liệu Host |
| 6 | Thiết bị và Host | Thiết bị thanh toán CAFISArch | Tài liệu hóa và kiểm tra tích hợp thiết bị thanh toán CAFISArch, trạng thái, thanh toán và in lại | 2026/06-2026/07 | 0.32人月 | 0.19人月 | Program specification | Nằm trong nhóm thiết bị và Host |
| 7 | Thiết bị và Host | Testcase thiết bị và Host | Chuẩn bị testcase và quan điểm kiểm tra cho phần thiết bị và Host | 2026/07 | 0.33人月 | 0.19人月 | Testcase | Dùng cho review và xác nhận tài liệu |
| 8 | Lưu trạng thái cục bộ | Tổng quan lưu trạng thái | Tài liệu hóa tổng quan lưu và khôi phục trạng thái cục bộ | 2026/05-2026/06 | 0.12人月 | 0.07人月 | Architecture / Program specification | Là phần nền cho session và snapshot |
| 9 | Lưu trạng thái cục bộ | ViewModel lưu trạng thái / dữ liệu cần lưu | Tài liệu hóa cách màn hình chỉ định dữ liệu cần lưu và khôi phục | 2026/06 | 0.14人月 | 0.08人月 | Program specification | Viết theo hướng người đọc dễ hiểu |
| 10 | Lưu trạng thái cục bộ | Dịch vụ snapshot / session | Tài liệu hóa service lưu trạng thái màn hình và quản lý session | 2026/06-2026/07 | 0.18人月 | 0.10人月 | Program specification | Bao gồm xử lý session chính |
| 11 | Lưu trạng thái cục bộ | DB cục bộ / migration | Tài liệu hóa DB cục bộ, migration và thiết lập SQLite | 2026/06-2026/07 | 0.18人月 | 0.10人月 | Program specification | Dùng cho phần lưu trạng thái |
| 12 | Lưu trạng thái cục bộ | Định nghĩa bảng | Tài liệu hóa bảng session và snapshot | 2026/06-2026/07 | 0.09人月 | 0.05人月 | Program specification | Là phần chi tiết DB |
| 13 | Lưu trạng thái cục bộ | Testcase lưu trạng thái | Chuẩn bị testcase cho lưu và khôi phục trạng thái | 2026/07 | 0.09人月 | 0.05人月 | Testcase | Dùng cho review và xác nhận tài liệu |
| 14 | Ghi log / Sentry | Tổng quan ghi log | Tài liệu hóa tổng quan ghi log và theo dõi sự cố | 2026/05-2026/06 | 0.09人月 | 0.05人月 | Architecture / Program specification | Là phần nền cho Sentry |
| 15 | Ghi log / Sentry | Monitoring service / Sentry service | Tài liệu hóa xử lý gửi message, exception và breadcrumb | 2026/06 | 0.13人月 | 0.08人月 | Program specification | Dùng thuật ngữ trong tài liệu ghi log |
| 16 | Ghi log / Sentry | Sentry settings / initialization | Tài liệu hóa setting và khởi tạo Sentry SDK | 2026/06 | 0.11人月 | 0.06人月 | Program specification | Bao gồm cấu hình cơ bản |
| 17 | Ghi log / Sentry | Masking / thông tin điều tra | Tài liệu hóa masking thông tin nhạy cảm, monitoring context và event | 2026/06-2026/07 | 0.15人月 | 0.09人月 | Program specification | Dùng cho log và review |
| 18 | Ghi log / Sentry | Testcase ghi log / Sentry | Chuẩn bị testcase cho ghi log và Sentry | 2026/07 | 0.07人月 | 0.04人月 | Testcase | Dùng cho review và xác nhận tài liệu |
| 19 | Testcase / Verification | Cấu trúc testcase | Sắp xếp testcase theo nhóm thiết bị và Host, lưu trạng thái, ghi log | 2026/06-2026/07 | 0.15人月 | 0.09人月 | Testcase | Tạo cấu trúc để review dễ hơn |
| 20 | Testcase / Verification | Quan điểm kiểm tra kết hợp | Chuẩn bị quan điểm kiểm tra kết hợp giữa app, Host, DB cục bộ và monitoring | 2026/07 | 0.20人月 | 0.11人月 | Verification note | Không phải kiểm thử onsite toàn bộ thiết bị |
| 21 | Testcase / Verification | Sắp xếp nội dung kiểm tra | Sắp xếp nội dung kiểm tra và kết quả xác nhận phục vụ review tài liệu | 2026/07 | 0.18人月 | 0.10人月 | Nội dung kiểm tra | Tập trung vào nội dung cần bàn giao |
| 22 | Testcase / Verification | Điều chỉnh testcase cuối | Điều chỉnh testcase theo feedback và hoàn thiện format | 2026/07 | 0.17人月 | 0.10人月 | Testcase | Hoàn thiện trước bàn giao |
| 23 | Review / Coordination | Review tài liệu | Kiểm tra lại nội dung, format và tính dễ hiểu của tài liệu | 2026/06-2026/07 | 0.20人月 | 0.11人月 | Tài liệu đã review | Áp dụng cho toàn bộ nhóm tài liệu |
| 24 | Review / Coordination | Review khách hàng / Q&A | Xác nhận nội dung với khách hàng và xử lý Q&A | 2026/07 | 0.20人月 | 0.11人月 | Q&A / ghi chú review | Bao gồm làm rõ nội dung cần xác nhận |
| 25 | Review / Coordination | Điều chỉnh nhỏ | Phản ánh điều chỉnh nhỏ trong phạm vi estimate | 2026/07 | 0.15人月 | 0.09人月 | Tài liệu đã cập nhật | Không bao gồm thay đổi lớn ngoài phạm vi |
| 26 | Review / Coordination | Sắp xếp bản cuối | Sắp xếp deliverable và chuẩn bị bản gửi khách hàng | 2026/07 | 0.10人月 | 0.06人月 | Deliverable cuối | Chuẩn bị trước khi bàn giao |
| 27 | Review / Coordination | Bảng estimate tổng hợp | Tạo bảng estimate để theo dõi phạm vi và công số theo nhóm deliverable | 2026/06-2026/07 | 0.05人月 | 0.02人月 | Estimate summary | Là phần trình bày tổng hợp |
|  | Tổng cộng |  |  | 2026/05-2026/07 | 5.25人月 | 3.00人月 |  |  |
