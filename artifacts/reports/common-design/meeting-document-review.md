# Rà soát công việc Device Control và tài liệu sau cuộc họp

Ngày rà soát: 2026-09-10. Phạm vi: nội dung cuộc họp ngày 2026-09-04, document list trong SVN và bộ thiết kế hiện tại của VTI. Đây là báo cáo đối chiếu nội bộ, không phải biên bản phê duyệt của khách hàng.

## 1. Nguồn và giới hạn kết luận

- Meeting note: `C:/Users/LX26080219/.codex/attachments/cd0ddf89-c67c-4711-87cc-5037a696fc94/pasted-text.txt`. Bản dựng lại từ âm thanh; Speaker 1 và Speaker 3 chưa được định danh. Các đoạn nghe không rõ không được dùng để suy ra tên component, cam kết hoặc người chịu trách nhiệm.
- Document list: `0400_ドキュメント一覧/ドキュメント一覧_Ver0.1.21.xlsx`. Không xác nhận đây là phiên bản mới nhất trên server; đây là bản dùng để đối chiếu trong checkout local.
- Phân công component: `0500_共通部品開発/2000_端末側/10_共通部品一覧/共通部品一覧_端末アプリ_Ver0.0.11.xlsm`, sheet `端末アプリ共通部品一覧`.
- Nguồn thiết kế hiện tại: các Markdown được liệt kê trong `project-store/artifacts/reports/common-design/README.md`; bộ Office hiện tại mang phiên bản 0.1.0.
- Lượt này xác minh tài liệu, phân công ghi trong danh sách và việc di chuyển file. Không chạy lại build, test tự động, kiểm thử thiết bị hay kiểm chứng tất cả DLL/OCX. Không suy ra nghiệm thu sản phẩm từ việc đã có thiết kế.

## 2. Việc sắp xếp và cập nhật đã thực hiện

| Document list | Nhóm tài liệu | Số file | Nơi lưu từ SVN root | Căn cứ lựa chọn |
| --- | --- | --- | --- | --- |
| No.35, dòng 39 | ARCH-DEVICE-01, CFG-01, IF-DEVICE-01 | 3 | 4100_ガイドライン/20.端末アプリガイドライン | Dòng này quy định cách sử dụng thiết bị và đã nêu sơ đồ lớp, ví dụ triển khai VTI sẽ bổ sung. Interface có cả hướng dẫn tích hợp cho các vendor. |
| No.64, dòng 68 | ARCH-CONNECTOR-01, DB-DEVICE-01 | 2 | 0500_共通部品開発/2000_端末側/60_詳細設計書 | Thiết kế bên trong nền tảng điều khiển thiết bị và dữ liệu cấu hình cục bộ. Không phải phần server API. |
| No.65, dòng 69 | PS-DEVICE-01 đến PS-DEVICE-12; PS-CONNECTOR-01 đến PS-CONNECTOR-14 | 26 | 0500_共通部品開発/2000_端末側/70_プログラム仕様書 | Nội dung thuộc cấu trúc class và xử lý theo method, khớp mô tả của dòng này. |
| Danh mục hỗ trợ tra cứu | デバイス制御_成果物一覧_Ver0.1.0.xlsx | 1 | 0400_ドキュメント一覧 | Liệt kê từng tên file, đường dẫn và No. đối ứng trong document list. |

Đã chuyển 31 tài liệu và một danh mục, không sao chép thành hai bộ hiện hành và không tạo thêm tầng thư mục. Ba tài liệu lịch sử trong `7000_デザイン開発/10_納品物/VTIジャパン/周辺機器制御_共通設計書/99_参考資料` được giữ nguyên. Không mang theo thư mục sơ đồ riêng. Sơ đồ trong Excel được giữ nguyên vì các tài liệu thiết kế chỉ được di chuyển file.

Document list được cập nhật đúng ba ô H39, H68 và H69, cùng chiều cao của ba dòng để đọc được tên file. Đã bỏ câu VTI đang soạn và sẽ lưu sau tại dòng 39, thay bằng tên ba file đã có. Dòng 68 bổ sung hai file. Dòng 69 bổ sung số lượng program spec và tên danh mục để tra cứu từng file. Các mẫu tên tài liệu và PDF cũ của khách hàng vẫn được giữ, chưa tự tuyên bố tài liệu mới thay thế hoặc hủy chúng.

Không sửa cột `公開中バージョン`, người phụ trách, người phê duyệt, lịch thực hiện, số No. hay các sheet khác. Document list vẫn mang phiên bản 0.1.21: đây là cập nhật local để review, chưa tự nâng thành bản 0.1.22 hoặc công bố đã được Japan Net duyệt. Chưa commit SVN.

## 3. Toàn bộ nội dung công việc từ cuộc họp

| Nội dung | Mốc trong note | Việc cần đạt | Hiện trạng và việc còn lại |
| --- | --- | --- | --- |
| Tài liệu không nằm dưới nhóm thiết kế màn hình | 01:32–01:45 | Đặt tài liệu nền tảng đúng phân loại dự án | Đã chuyển bộ hiện tại ra khỏi nhóm bàn giao thiết kế màn hình. |
| Một đầu mối tra cứu tài liệu | 01:45–02:32 | Người đọc biết có tài liệu gì, ở đâu | Đã cập nhật document list và danh mục 31 file. |
| Người đọc và phạm vi công khai | 02:35; 06:41; 09:19 | Tách tài liệu cần cho vendor sử dụng với chi tiết dành cho bên phát triển/bảo trì | Đã phân theo nhóm hướng dẫn và thiết kế nội bộ. Quyền công khai và đối tượng được nhận vẫn cần khách hàng xác nhận; không tự đổi cột 納／内. |
| Tên và cách trình bày đồng nhất với toàn dự án | 03:20–04:21; 52:35 | Tên file có phiên bản và nhận diện đúng tài liệu | Bộ mới có ID và hậu tố _Ver0.1.0. Tên mẫu trong list và tên thực tế có cấu trúc khác nhau; đã liên kết để tìm được file, chưa tự đổi tất cả sang mã component của Japan Net. |
| Loại tài liệu không thuộc Device Control | 05:05–05:47 | Tránh coi tài liệu PoC/UI hoặc việc do bên khác yêu cầu là deliverable thiết bị | Bộ hiện tại tách ba tài liệu lịch sử ở 99_参考資料. Không kết luận ba bản này đã được phép hủy. |
| Database design phải vào danh sách chính | 06:08 | Có file và vị trí tra cứu DB liên quan | Đã bổ sung DB-DEVICE-01 vào No.64. File này chỉ sở hữu DB cấu hình thiết bị, không đại diện toàn bộ nền tảng DB nghiệp vụ. |
| Ranh giới business app, nền tảng và Device Connector | 07:34–08:11 | Nhóm nghiệp vụ dùng nền tảng; nền tảng giao tiếp với Device Connector | Interface và tài liệu kiến trúc đã mô tả các lớp. Cần Japan Net xác nhận phần nền tảng đã tích hợp được họ tiếp nhận đến đâu. |
| Hướng dẫn đủ để vendor sử dụng | 09:19 | Có cách đăng ký DI, lấy instance, gọi API và xử lý kết quả | IF-DEVICE-01 có hướng dẫn cùng ví dụ. Việc vendor tự tích hợp thành công vẫn cần thử và review, chưa có bằng chứng nghiệm thu trong lượt này. |
| Tránh triển khai trùng với Japan Net | 10:31–12:47 | Chỉ rõ component nào Sam đã làm, component nào Japan Net dự định làm | Còn cần bảng đối ứng giữa component list, class hiện tại và bên tiếp nhận. Không thể đóng việc này chỉ vì repo đã được tích hợp. |
| Phân biệt SQLite PoC và sản phẩm | 13:06–13:39 | Chỉ rõ phần dùng lại, phần thay thế, bên sở hữu DB access | Đã tách DB cấu hình thiết bị khỏi tài liệu trạng thái cũ. Phạm vi nền tảng DB sản phẩm và trách nhiệm Japan Net vẫn phải chốt riêng. |
| Test case | 17:02–17:41 | Có test phù hợp component và implementation | Chưa có bộ bằng chứng test được bàn giao trong 80_単体試験. Repo có tài liệu cũ và một bản ghi 廃止; cần chọn lại theo pos-integration. |
| Strategy và lineup thiết bị | 19:25–20:33 | Liệt kê từng implementation và khả năng thay đổi | Có kiến trúc/PS và interface theo nhóm. Cần đối ứng từng model, OS, phương thức kết nối và thư viện với component list. |
| Điều tra POSA | 19:32–20:00 | Tìm nguồn và hiểu phạm vi giao dịch | POSA đã có nhóm API trong IF-DEVICE-01. Chưa thể suy ra đã kiểm thử giao dịch với hệ thống đối tác. |
| Component/class thực sự phải tạo | 21:25–23:50 | Đủ specification cho phần cần phát triển và bảo trì | Đã có 26 PS theo class được chọn. Chưa chứng minh 26 file phủ đủ toàn bộ 29 mục VTI trong common-component list; hai số là hai loại đối tượng khác nhau. |
| Source Device Connector trong bộ bàn giao | 27:00–28:12 | Source và tài liệu chỉ đúng nơi chứa component | Có checkout pos-integration từ công việc trước. Nơi tiếp nhận source của khách hàng, nhánh và phạm vi source bàn giao chưa được xác minh trong lượt này. |
| Cấu trúc project, dependency và binary cuối | 28:36–31:48 | Biết project nào build ra app, project/library nào được tham chiếu | Tài liệu hiện tại mô tả cấu trúc. Còn cần kiểm tra package/build theo platform và thống nhất cách bàn giao với Japan Net. Không tự di chuyển source trong lần seiri tài liệu. |
| Binary/library và SDK theo platform | 32:30–33:36 | Có danh sách thực tế của từng library, version, platform và cách dùng | Cần đối chiếu danh sách dependency, DLL/OCX/COM và SDK với code mới, nguồn vendor và gói chạy. Một tên library trong tài liệu chưa chứng minh đã đủ bộ chạy. |
| SVN, GitLab và file server | 34:44–35:06 | Chốt đầu vào, repository đích và luồng bàn giao source/tài liệu | Chỉ là định hướng trong cuộc họp. Lượt này mới cập nhật working copy SVN, chưa đẩy GitLab hoặc tạo pipeline. |
| Source/repository phía server | 36:13–37:10 | Làm rõ nơi lưu source server và bên quản lý | Cần quyết định cấp dự án. Không đồng nhất Device Connector chạy tại terminal với server API. |
| Hỗ trợ cloud | 37:58–38:55 | Xác nhận nếu có yêu cầu hỗ trợ ngoài phần device | Đây là đề nghị có thể hỗ trợ; chưa phải task đã giao. Không kết luận cloud được chọn hoặc tự tạo task triển khai. |
| Thống nhất tên Device Connector | 43:18–43:57 | Không mâu thuẫn với cách đã giải thích cho KS | User đã chốt tên Device Connector ở các trao đổi sau. Bộ hiện tại sử dụng tên đã chốt; tài liệu lịch sử không được xem là glossary hiện hành. |
| Thiết kế để người khác sửa được chương trình | 45:30; 50:19–55:35 | Biết class thuộc lớp nào, component nào và cần đọc specification nào | Đã có ARCH-DEVICE-01, ARCH-CONNECTOR-01 và 26 PS. Còn bảng đối ứng theo mã component của khách hàng để nối catalogue với implementation. |
| Xác nhận với Japan Net trước khi coi vị trí là quyết định chung | 56:45–57:58 | Bên dự án hiểu và chấp nhận cách phân loại | Đã áp dụng các thư mục có sẵn theo yêu cầu hiện tại của User. Meeting note không phải bằng chứng Japan Net đã duyệt riêng từng file. |

## 4. Interface có đủ chưa?

Trong common-component list, dòng 168–177 có 10 mục Device-IF giao VTI. IF-DEVICE-01 đã có đủ 10 nhóm tương ứng về bố cục tài liệu:

| Mã trong common-component list | Nhóm trong IF-DEVICE-01 |
| --- | --- |
| Device-IF-Keyboard-001 | 3. キーボード |
| Device-IF-Scanner-001 | 4. スキャナ |
| Device-IF-Drawer-001 | 5. ドロア |
| Device-IF-LineDisplay-001 | 6. カスタマディスプレイ |
| Device-IF-Printer-001 | 7. レシートプリンタ |
| Device-IF-Handy-001 | 8. ハンディターミナル |
| Device-IF-Tsurisen-001 | 9. 自動釣銭機 |
| Device-IF-CAFIS-001 | 10. 決済端末 |
| Device-IF-Printer-002 | 11. A4帳票印刷 |
| Device-IF-POSA-001 | 12. POSAカード取引 |

Kết luận là đã phủ đủ nhóm interface của danh sách này, không phải đã xác nhận tất cả API chạy trên mọi model và OS. Ngoài 10 interface còn có Device-Manager, Device-Common-IF, Device-Factory và 16 strategy giao VTI, tổng cộng 29 mục tại dòng 168–196. Cần lập quan hệ các mục này với class/PS/thiết bị và test; không được đếm số file PS để kết luận xong cả 29 mục.

A4 cần giữ rõ ba phần trách nhiệm đã ghi trong common-component list: Device-IF-Printer-002 giao VTI (dòng 174); App-Infrastructure-014, xử lý in chung, giao 共通部品T (dòng 153); C000084, màn hình xuất, giao G1担当T (dòng 315). Theo trao đổi sau cuộc họp và tài liệu interface hiện tại, đầu vào của terminal là PDF. Adapter in PDF và việc tích hợp với bộ in chung cần được xác nhận/hoàn thiện; không quay lại mặc định VTI chuyển đổi toàn bộ .crf.

## 5. Phần còn thiếu cần làm trước khi báo hoàn tất

| Ưu tiên đề xuất | Việc | Chi tiết cần đối ứng | Điều kiện có thể đóng |
| --- | --- | --- | --- |
| 1 | Mapping 29 component VTI | Mã component, interface/class, PS sở hữu, model/OS, dependency, kết quả test, bên tiếp nhận. Ghi rõ mục chưa triển khai hoặc không áp dụng. | Không còn mục VTI không có đối ứng hoặc quyết định phạm vi. |
| 1 | Chốt ranh giới với Japan Net | DeviceManager/common/Factory, SQLite sản phẩm, cơ chế khởi động và kết thúc, source được tiếp nhận, phần Nhật đã làm trùng. | Có xác nhận trách nhiệm và phạm vi dùng lại từ phía liên quan. |
| 1 | Chốt A4 PDF | Ai cung cấp implementation IA4ReportService; lấy PDF từ đâu; bộ in chung được gọi thế nào; giới hạn platform; lỗi in và thử in thực tế. | Interface, implementation và trách nhiệm khớp nhau; có thử tích hợp. |
| 2 | Rà test và bằng chứng | No.66 checklist; No.67 test spec; No.68 kết quả từng case/lỗi/coverage; No.69 báo cáo chất lượng. Dùng code pos-integration, không dùng nguyên tài liệu test cũ. | Có tài liệu phù hợp và bằng chứng thực hiện; mục chưa thử được ghi đúng trạng thái. |
| 2 | Rà SDK/DLL/OCX/COM và đóng gói | File thực tế, nguồn vendor, version, OS/kiến trúc, đăng ký/cài đặt nếu cần, dependency đi kèm, liên hệ với strategy. | Có thể dựng môi trường và chạy thử bằng danh sách đã kiểm chứng. |
| 2 | Rà thiết bị và bất thường | Scanner đọc một lần và giải phóng; thiết bị không hỗ trợ trên OS; timeout/ngắt kết nối; printer hết giấy; payment/POSA lỗi và kết quả; giải phóng tài nguyên. Đây là góc kiểm tra đề xuất từ phạm vi hiện tại. | Case bám API và yêu cầu, có kết quả thay vì chỉ có mô tả. |
| 3 | Review danh sách và công khai | Tên thực tế so với mẫu tên; phiên bản được công khai; PDF cũ có bị thay thế không; ai đọc interface, ai đọc chi tiết. | Japan Net/khách hàng xác nhận; cập nhật chính thức các trường quản lý tương ứng. |
| Cấp dự án | Repository và bàn giao | GitLab KS, source server, binary, CI/CD copy tài liệu sang file server. | Có quyết định và người phụ trách; không mặc định toàn bộ là việc của Sam. |

## 6. Bằng chứng thao tác

- `scratch/document-placement/result.json`: 32 đường dẫn trước/sau và SHA-256 của file đích.
- `scratch/document-placement/list-changes.json`: giá trị trước/sau của H39, H68, H69.
- `scratch/document-placement/backup-delivery/`: các file trước khi chuyển.
- `scratch/document-placement/backup-document-list.xlsx`: document list trước khi cập nhật.
- Đã kiểm tra giá trị tất cả ô của document list; chỉ ba ô nêu trên thay đổi. Các phần XML khác, validation, sheet và thông tin quản lý được bảo toàn. Đây là bằng chứng bố trí tài liệu, không phải bằng chứng nghiệm thu code.
