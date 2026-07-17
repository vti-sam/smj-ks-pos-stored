# Báo cáo làm rõ phạm vi trách nhiệm nền tảng ứng dụng Tablet POS

| Hạng mục | Nội dung |
|---|---|
| Mã tài liệu | RPT-SCOPE-01 |
| Ngày lập | 2026-07-16 |
| Người lập | SAM |
| Đối tượng sử dụng | Báo cáo nội bộ cho Yoshida-san và chuẩn bị trao đổi với phía Nhật |
| Phạm vi | KSNEWSYS-426, KSNEWSYS-427 và các task, tài liệu liên quan trên Backlog khách hàng |
| Thời điểm chốt dữ liệu | 2026-07-16 16:38 JST |

## 1. Mục đích báo cáo

Báo cáo này tổng hợp tình trạng mới nhất của hai task SAM đang phụ trách:

- KSNEWSYS-426: `端末アプリログ出力基盤`
- KSNEWSYS-427: `端末アプリローカルストレージ保持基盤`

Mục đích là làm rõ ba nội dung trước khi trao đổi với SMJ và JPnet:

1. Có task nào phía Nhật đang thực hiện trùng với phạm vi của SAM hay không.
2. Sau khi Koyama-san rời dự án, quyền điều phối và quyền quyết định kỹ thuật đang được chuyển cho ai.
3. Nếu thay đổi người thực hiện, cần phân tách như thế nào giữa implementation, know-how, review thiết kế và nghiệm thu.

## 2. Tóm tắt nhận định hiện tại

Hai task `KSNEWSYS-426` và `KSNEWSYS-427` có nhiều task liên quan ở tầng trên, nhưng chưa có bằng chứng cho thấy JPnet đang thực hiện một implementation khác trùng với phần SAM đang làm.

Sự trùng lặp hiện tại chủ yếu là trùng theo cấu trúc quản lý:

- Task tầng trên quyết định policy, requirement và guideline.
- Task của SAM phụ trách detailed design, implementation và kiểm chứng kỹ thuật.
- Một số task khác phụ trách account, security, monitoring infrastructure hoặc trình tự khởi động.

Thay đổi quan trọng nhất trong ngày 16/07 nằm ở `KSNEWSYS-533`. Nội dung kết luận ghi rằng Minami-san tiếp nhận tạm thời các vai trò trước đây của Koyama-san, bao gồm:

- Đầu mối VTI và điều chỉnh specification của terminal foundation.
- Đối ứng các issue nền tảng trên Backlog của K’s.
- Development rules và guideline phía terminal application.
- Thiết kế terminal foundation.

Điều này cho thấy Minami-san đã nhận vai trò điều phối và design ownership ở tầng trên. Tuy nhiên, `KSNEWSYS-426` và `KSNEWSYS-427` vẫn đứng tên `VTI サム`. Chưa có comment hoặc thay đổi assignee yêu cầu SAM dừng hay bàn giao implementation.

## 3. Các sự thật đã xác nhận trên Backlog

### 3.1 KSNEWSYS-426

`KSNEWSYS-426` vẫn ở trạng thái `処理中`, assignee là `VTI サム` và chưa có deadline.

Phạm vi được mô tả trong task gồm:

- Dùng Sentry SDK để gửi crash report.
- Ghi operation log vào local storage với các mức Error, Warn, Info và Debug.
- Tự động ghi lifecycle/event log để người làm ContentPage không phải tự xử lý từng nơi.
- API request/response log do API calling foundation gọi logging foundation để xuất log.

VTI đã tạo thiết kế, class specification và implementation nền tảng Sentry trong giai đoạn POC. Backlog chưa ghi nhận quyết định thay thế hoặc loại bỏ kết quả này.

### 3.2 KSNEWSYS-427

`KSNEWSYS-427` vẫn ở trạng thái `処理中`, assignee là `VTI サム`, deadline hiện tại là 2026-07-31.

Phạm vi được mô tả trong task gồm:

- Khôi phục dữ liệu màn hình sau khi chuyển màn, ứng dụng dừng, bị kill hoặc crash.
- Hạn chế tối đa implementation bắt buộc trong từng ContentPage.
- Cho phép xử lý chung trong BaseViewModel.
- Cho phép gắn Behavior vào các custom control khi cần.
- Dùng SQLite để lưu snapshot và thông tin chuyển màn hình.

Tài liệu VTI hiện đã cụ thể hóa cơ chế snapshot, session, lifecycle save/restore, SQLite, WAL mode và giới hạn dữ liệu không được lưu.

### 3.3 Tài liệu VTI đã được ghi nhận là deliverable

Trong `KSNEWSYS-472`, các tài liệu sau đã được phân loại là chương trình specification cần đưa thành tài liệu chính thức:

- Tablet POS local storage foundation program specification.
- Tablet POS logging và Sentry monitoring foundation program specification.

Điều này cho thấy kết quả của VTI được xem là đầu vào chính thức cho hệ thống, không chỉ là tài liệu điều tra tham khảo.

## 4. Đối chiếu các task có nội dung liên quan

| Task | Phạm vi | Quan hệ với task của SAM | Mức độ trùng |
|---|---|---|---|
| KSNEWSYS-363 `ローカルデータ保持基盤` | Quyết định policy giữ/xóa dữ liệu và phản ánh vào guideline | Phần kết luận ghi rõ detailed design được thực hiện tại KSNEWSYS-427 | Trùng trực tiếp về chủ đề, nhưng khác tầng trách nhiệm |
| KSNEWSYS-316 `復元すべき情報の精査・ガイドライン化` | Phân loại dữ liệu lấy lại từ API, khôi phục từ local hoặc không cần giữ | Là requirement và dependency trực tiếp của KSNEWSYS-427 | Không trùng implementation |
| KSNEWSYS-365 `ログ出力基盤` | Điều tra và quyết định phương thức logging/Sentry | Là cơ sở phương thức cho KSNEWSYS-426, đã hoàn thành | Trùng chủ đề, khác giai đoạn |
| KSNEWSYS-361 `共通基盤準備` | Umbrella task cho logging, SQLite, local state, API và device control | Bao trùm cả KSNEWSYS-426 và KSNEWSYS-427 | Không phải implementation song song |
| KSNEWSYS-431 `Sentryのアカウント` | Quyết định account, license và user sử dụng Sentry | Điều kiện môi trường để test KSNEWSYS-426 | Dependency vận hành |
| KSNEWSYS-498 `DB/監視/ログ` | Infrastructure monitoring, DB và log phía server/API | Có thể giao nhau ở log forwarding hoặc long-term storage | Liên quan một phần, cần tách application log và infrastructure log |
| KSNEWSYS-482 `端末内データ暗号化方式` | Quy định bảo vệ dữ liệu lưu trên thiết bị | Áp dụng cho local snapshot và local log | Yêu cầu phi chức năng, không trùng chức năng |
| KSNEWSYS-362 `SQLite接続基盤` | ORM và SQLite connection foundation | KSNEWSYS-427 cần reuse foundation này | Dependency kỹ thuật đã hoàn thành |
| KSNEWSYS-390 `起動シーケンス` | Các bước cần chạy khi ứng dụng khởi động | Bao gồm bước xác định có cần restore hay không | Điểm tích hợp của KSNEWSYS-427 |
| KSNEWSYS-472 `VTI作成ドキュメントの正式文書昇格` | Đưa tài liệu VTI vào danh mục tài liệu chính thức | Quản lý deliverable của cả hai task | Không trùng implementation |
| KSNEWSYS-552 `共通部品仕様書テンプレート` | Chuẩn hóa template specification của common component | Có thể yêu cầu điều chỉnh format tài liệu của VTI | Trùng quy trình tài liệu, không trùng code |
| KSNEWSYS-533 `基盤未決事項一覧` | Bàn giao vai trò của Koyama-san cho Minami-san | Thay đổi đầu mối và quyền điều phối đối với VTI/terminal foundation | Trùng quyền điều phối, chưa trùng implementation |

## 5. Thông tin mới nhất từ report và Documents phía khách hàng

### 5.1 Leader Meeting ngày 14/07

- Môi trường Sentry development của K’s đã được xây dựng xong.
- SMJ đang thu thập tên và email người dùng để cấp quyền Sentry.
- Minami-san được ghi nhận là người phụ trách terminal foundation/common components.
- Các team được yêu cầu xử lý task quá hạn và thiết lập assignee thực tế trên WBS/Backlog.

### 5.2 Terminal common components meeting ngày 15/07

- Sentry user information được đưa thành follow-up action của từng người.
- Ranh giới giữa common component và application vẫn chưa được chốt.
- JPnet dự kiến sử dụng kết quả prior development làm cơ sở để common hóa.
- Có action `設計書リバース対応`, nghĩa là các thành viên sẽ đọc lại kết quả hiện có để hoàn thiện thiết kế.
- Kế hoạch hiện tại là hoàn thành Basic Design trước cuối tháng 8 và bắt đầu Detailed Design/development từ tháng 9.

### 5.3 Wiki

Không có Wiki phía khách hàng được cập nhật trong ngày 15/07 và 16/07 liên quan đến logging hoặc local state. Thông tin mới hiện nằm chủ yếu trong issue và Backlog Documents.

## 6. Phân tách ranh giới kỹ thuật

### 6.1 Logging foundation

Application logging và infrastructure monitoring không nên được coi là một phạm vi duy nhất.

Application logging xử lý việc ứng dụng ghi lifecycle, navigation, business event, API call và device command. Logging foundation cũng quyết định log level, masking dữ liệu nhạy cảm và cách gửi crash event sang Sentry.

Infrastructure monitoring xử lý account, quyền truy cập, downstream monitoring, OCI Functions/Object Storage và vận hành hệ thống giám sát.

Nếu hai phạm vi bị gộp, có nguy cơ không ai chịu trách nhiệm đầy đủ cho phần tự động ghi log trong ứng dụng, trong khi phần account và server monitoring vẫn được coi là đã hoàn thành.

### 6.2 Local state foundation

Policy về dữ liệu cần khôi phục và implementation lưu snapshot cũng không phải một phạm vi duy nhất.

SMJ, K’s và JPnet cần quyết định dữ liệu nào phải lấy lại từ API, dữ liệu nào khôi phục từ thiết bị và dữ liệu nào không được lưu. Sau khi có quyết định đó, implementation mới chịu trách nhiệm lưu đúng dữ liệu vào SQLite, phục hồi theo lifecycle và xóa dữ liệu đúng thời điểm.

Nếu policy chưa chốt nhưng implementation vẫn tiếp tục, nguy cơ lớn nhất không phải là code không chạy. Nguy cơ là code khôi phục sai loại dữ liệu, giữ dữ liệu quá lâu hoặc không bảo đảm tính nhất quán nghiệp vụ.

## 7. Phân tách bốn vai trò cần tách riêng

| Vai trò | Trạng thái hiện tại | Điểm chưa rõ cần xác nhận |
|---|---|---|
| Implementation owner | Backlog vẫn ghi SAM cho KSNEWSYS-426 và KSNEWSYS-427 | SAM tiếp tục implementation, chỉ hoàn thiện tài liệu hay bàn giao toàn bộ cho JPnet |
| Knowledge holder | Phần lớn thiết kế chi tiết và kết quả POC hiện nằm phía VTI/SAM | Nếu đổi implementation owner, SAM tham gia giải thích và review đến giai đoạn nào |
| Design reviewer | Minami-san đã nhận terminal foundation design ownership, nhưng chưa có review gate cụ thể cho hai task | Ai review architecture, security, lifecycle và integration trước khi coi là hoàn thành |
| Acceptance owner | Chưa được ghi rõ trong hai task | SMJ, JPnet hay K’s là người đưa ra acceptance cuối cùng cho từng deliverable |

Việc assignee trên Backlog không tự động đồng nghĩa với người có đủ know-how để review hoặc acceptance. Nếu thay đổi assignee, bốn vai trò trên vẫn cần được chốt riêng.

## 8. Các rủi ro nếu phân chia không rõ

| Rủi ro | Ảnh hưởng |
|---|---|
| Hai bên cùng implementation một foundation | Trùng công số, khác kiến trúc và phải chọn lại một implementation sau này |
| Mỗi bên nghĩ bên kia đang thực hiện | Task vẫn `処理中` nhưng không có output mới, ảnh hưởng mốc Detailed Design/development |
| Chỉ bàn giao tài liệu mà không bàn giao review viewpoints | Người tiếp nhận có thể viết được code nhưng không biết điều kiện lifecycle, security, masking và dữ liệu cấm lưu |
| Gộp screen common component với application foundation | UI component có thể phụ thuộc trực tiếp vào API, local state, logging hoặc device control |
| Chưa có acceptance owner | Không có người đủ thẩm quyền xác nhận task đã hoàn thành |
| Chưa chốt requirement của KSNEWSYS-316 | Local state implementation có thể khôi phục dữ liệu không phù hợp với nghiệp vụ |

## 9. Vai trò đề xuất cho Yoshida-san

Yoshida-san phù hợp làm đầu mối điều phối và báo cáo phía Nhật. Vai trò này nên tập trung vào:

- Nhận thông tin sự thật kỹ thuật và risk từ SAM.
- Sắp xếp nội dung để trao đổi với SMJ và JPnet.
- Theo dõi câu trả lời, người quyết định và deadline.
- Xác nhận kết luận được phản ánh lại vào Backlog.
- Escalate khi task vẫn đứng tên SAM nhưng phía Nhật chưa quyết định có tiếp tục implementation hay không.

Yoshida-san không cần tự quyết định architecture. Khi có nội dung về Sentry integration, masking, SQLite snapshot, lifecycle hoặc restore policy, SAM cần trực tiếp giải thích và kiểm tra lại nội dung kỹ thuật trước khi kết luận.

## 10. Các điểm cần quyết định trong cuộc họp

Cuộc họp cần kết thúc với câu trả lời rõ cho các nội dung sau:

1. SAM/VTI có tiếp tục implementation `KSNEWSYS-426` và `KSNEWSYS-427` hay không.
2. Nếu tiếp tục, phạm vi cụ thể là detailed design, implementation, unit test, integration test hay chỉ hoàn thiện tài liệu.
3. Minami-san review phần nào và ai là người acceptance cuối cùng.
4. Nếu JPnet tiếp nhận implementation, SAM có tham gia explanation session và design review hay không.
5. Tài liệu và code POC nào được coi là baseline chính thức.
6. Deadline của `KSNEWSYS-427` ngày 31/07 có còn hiệu lực hay cần cập nhật lại.
7. `KSNEWSYS-426` chưa có deadline; cần xác định thời điểm hoàn thành và dependency với Sentry environment.

## 11. Nhận định đề xuất để báo cáo

Hiện tại chưa nên báo cáo rằng JPnet đang làm trùng implementation của SAM. Cách diễn đạt chính xác hơn là:

> JPnet và Minami-san đã nhận vai trò điều phối, quyết định policy và thiết kế terminal foundation ở tầng trên. Trong khi đó, hai task detailed design/implementation vẫn đứng tên SAM và chưa có chỉ thị thay đổi. Vì vậy, cuộc họp cần xác nhận ranh giới giữa design ownership, implementation ownership, review và acceptance trước khi tiếp tục.

Phương án phù hợp nhất với trạng thái Backlog hiện tại là:

- Minami-san/JPnet phụ trách policy, requirement alignment, guideline và điều phối phía Nhật.
- SAM/VTI phụ trách detailed design, implementation và giải thích kết quả POC cho phần được tiếp tục giao.
- SMJ/K’s quyết định nghiệp vụ, security, operation và acceptance.
- Yoshida-san là đầu mối báo cáo, theo dõi quyết định và bảo đảm kết luận được ghi lại trên Backlog.

Đây là phương án phân tách vai trò theo bằng chứng hiện tại, chưa phải quyết định đã được SMJ hoặc JPnet chốt.

## 12. Câu hỏi có thể phát sinh và hướng trả lời

### Câu hỏi 1: JPnet có thể tự implementation hai task này không?

Về nguyên tắc, JPnet có thể tiếp nhận implementation. Tuy nhiên, hai task phụ thuộc nhiều vào kết quả POC, lifecycle, masking, restore policy và các quyết định đã được VTI cụ thể hóa. Nếu chuyển implementation, cần bàn giao cả review viewpoints và acceptance conditions, không chỉ bàn giao tài liệu.

### Câu hỏi 2: Đã có tài liệu thì tại sao vẫn cần SAM tham gia?

Tài liệu giúp người tiếp nhận hiểu cấu trúc. Tuy nhiên, việc đọc được tài liệu không tự động đồng nghĩa với việc biết tại sao một số dữ liệu không được lưu, khi nào phải save/restore, cách mask dữ liệu nhạy cảm hoặc điều kiện nào được coi là test pass. SAM có thể hỗ trợ explanation và review để giảm rework.

### Câu hỏi 3: Có thể coi KSNEWSYS-363 và KSNEWSYS-365 là đã bao gồm 426/427 không?

Không nên coi là đã bao gồm toàn bộ. `KSNEWSYS-363` ghi rõ detailed design nằm tại `KSNEWSYS-427`. `KSNEWSYS-365` mới hoàn thành phần điều tra và phương thức logging. Hai task đó là đầu vào ở tầng trên, không thay thế detailed design và implementation.

### Câu hỏi 4: Có thể quyết định ngay trong cuộc họp rằng task không còn cần VTI không?

Có thể thay đổi implementation owner nếu SMJ quyết định. Tuy nhiên, trước khi kết luận cần xác nhận output đã có, phần còn thiếu, người review, acceptance conditions và phương thức bàn giao. Nếu chưa xác nhận các điểm này, việc dừng VTI ngay có thể tạo khoảng trống trách nhiệm.

## 13. Nguồn đối chiếu

- Backlog: KSNEWSYS-316, KSNEWSYS-361, KSNEWSYS-362, KSNEWSYS-363, KSNEWSYS-365.
- Backlog: KSNEWSYS-390, KSNEWSYS-426, KSNEWSYS-427, KSNEWSYS-431.
- Backlog: KSNEWSYS-472, KSNEWSYS-482, KSNEWSYS-498, KSNEWSYS-533, KSNEWSYS-552.
- Backlog Documents: Leader Meeting 20260714.
- Backlog Documents: Terminal common components meeting 20260715.
- VTI deliverables: local state program specifications, logging/Sentry program specifications và kết quả POC tương ứng.

