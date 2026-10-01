# Tài liệu tham khảo thiết bị và thanh toán

Nguồn: `C:\Users\LX26080219\Downloads\drive-download-20260930T034229Z-1-001`.

Đặc tả và hướng dẫn Office/PDF; README của Epson; ảnh mẫu hóa đơn, kết hợp thanh toán và flow CAFIS. Có lấy tài liệu trong ZIP con. Loại bản trùng theo SHA-256. Không nhập code, binary, bộ cài hay dữ liệu test.

Các tài liệu nằm trực tiếp trong thư mục này. Tên tài liệu đã chuẩn hóa sang tiếng Nhật; giữ nguyên identifier sản phẩm, phiên bản và ký hiệu ngôn ngữ nguồn. Đổi tên không có nghĩa nội dung tiếng Anh/Việt đã được dịch. `manifest.json` giữ tên cũ, đường dẫn nguồn và SHA-256 để truy lại bản gốc. Giữ các phiên bản khác nội dung và cả bản Office/PDF.

Bảng method/API theo từng thiết bị: [機器別_資料_旧コード_設計一覧.md](../device-control/basic-design/%E6%A9%9F%E5%99%A8%E5%88%A5_%E8%B3%87%E6%96%99_%E6%97%A7%E3%82%B3%E3%83%BC%E3%83%89_%E8%A8%AD%E8%A8%88%E4%B8%80%E8%A6%A7.md). Đối chiếu tài liệu 田邊, code legacy RZ-A476s và thiết kế v1; có interface chung, 備考 và đường dẫn nguồn.

Bản Excel một sheet đã cập nhật: [機器別_資料_旧コード_設計一覧_移行対象整理.xlsx](../device-control/basic-design/%E6%A9%9F%E5%99%A8%E5%88%A5_%E8%B3%87%E6%96%99_%E6%97%A7%E3%82%B3%E3%83%BC%E3%83%89_%E8%A8%AD%E8%A8%88%E4%B8%80%E8%A6%A7_%E7%A7%BB%E8%A1%8C%E5%AF%BE%E8%B1%A1%E6%95%B4%E7%90%86.xlsx).

参考資料 đã ghi tên file đầy đủ và đuôi file dưới interface, cỡ chữ 9. Cột 田邊資料 ghi số tài liệu và trang/slide. Đã bỏ toàn bộ hyperlink trong bảng Excel và Markdown. Tên tài liệu cỡ 9, màu đen nhạt. Đã rà lại trạng thái: なし là không có API hoặc xử lý tương ứng; hàm kết hợp ghi API chính và giải thích trong 備考. Hàm RZ có định nghĩa nhưng không dùng vẫn thuộc phạm vi migration.

Đã rà lại API thiết kế và code legacy, gồm 6.075 file nguồn và 11 file VB6. Bảng đi theo thứ tự tài liệu 田邊 → code cũ → Basic Design. Mỗi ô chỉ ghi tên chính; các hàm kết hợp, thuộc tính, sự kiện và xử lý ứng dụng được giải thích ngắn trong 備考. Đã bỏ comment của ô theo yêu cầu.

V1 dùng 109 API chính với tên gọi thống nhất, gồm `ClearDepositOwner()` cho xử lý `CashChangerClearHandle` và `GetDepositStatus()` cho thuộc tính OPOS `DepositStatus`. Các xử lý riêng của ứng dụng như journal, chống chạy trùng và xóa thông tin người dùng được ghi rõ, không ghép với API thiết bị khác chức năng. Nguồn thiết kế: [Markdown v18](../device-control/basic-design/%E5%9F%BA%E6%9C%AC%E8%A8%AD%E8%A8%88%E6%9B%B8_%E7%AB%AF%E6%9C%AB%E3%82%A2%E3%83%97%E3%83%AA_%E3%83%87%E3%83%90%E3%82%A4%E3%82%B9%E5%88%B6%E5%BE%A1_v1.md), [Excel v18](../device-control/basic-design/%E5%9F%BA%E6%9C%AC%E8%A8%AD%E8%A8%88%E6%9B%B8_%E7%AB%AF%E6%9C%AB%E3%82%A2%E3%83%97%E3%83%AA_%E3%83%87%E3%83%90%E3%82%A4%E3%82%B9%E5%88%B6%E5%BE%A1_v1.xlsx).

`SetDescriptor` không có xử lý riêng trong code cũ; code chỉ gọi `ClearDescriptors`. Tài liệu SHARP, PDF trang 70, ghi các mẫu đang đối chiếu không hỗ trợ ký hiệu (`CapDescriptors = FALSE`, `DeviceDescriptors = 0`). Thiết kế quy định khi không hỗ trợ thì không thao tác và trả thành công. Với 7 API display dùng lệnh 40–46, có đường DirectIO chung nhưng không có nơi gọi riêng các lệnh này trong RZ. Cột code ghi `なし`, 備考 giải thích đường gọi chung; các ô có nền trắng.

`DataEventCount` đếm thông báo `DataEvent`, không đồng nhất với `DataCount` của GLORY. `AsyncMode` là thuộc tính trong tài liệu OPOS. `Claim` của 決済端末 dùng chuỗi `CafisArch_Start`; `Mutex.WaitOne` của `KsKEYHOOK` ngăn chạy chương trình hai lần. Tài liệu Epson có `setKeyPressEventListener` để nhận phím (PDF trang 247/254) và `disconnect` để kết thúc (243/252); ví dụ trang 32–33 có đăng ký và gỡ listener. Hai ô keyboard dùng chúng làm tham khảo theo chức năng, có nền trắng. Tài liệu riêng của ndlib/HookStart/HookEnd vẫn chưa tìm thấy. Đây là đối chiếu tài liệu và source, chưa kiểm tra trên thiết bị thực tế.

Với ハンディターミナル, đã tìm tên khác trong thư mục nguồn, ZIP con và nội dung Office/PDF trích xuất được. Chưa tìm thấy tài liệu riêng về giao thức ENQ/ACK/EOT của tám API trong bảng. Có `BhtTrans.exe` và `Bhttrans.ini` trong `18_CAFISArch資料/Bin2`, nhưng đây là chương trình và cấu hình. Phần ハンディスキャナー trong `SB-H50資料.pdf` trang 20 và 23 nói về máy quét barcode cầm tay. Các API ハンディターミナル trong bảng hiện lấy từ code cũ và thiết kế v1; không kết luận tài liệu không tồn tại ở nơi khác.


| Nhóm | Tài liệu |
| --- | --- |
| Barcode | [08_コード定義書.xlsx](08_%E3%82%B3%E3%83%BC%E3%83%89%E5%AE%9A%E7%BE%A9%E6%9B%B8.xlsx) |
| CAFIS | [1_POS連動接続仕様書（共通編）_2.X版.docx](1_POS%E9%80%A3%E5%8B%95%E6%8E%A5%E7%B6%9A%E4%BB%95%E6%A7%98%E6%9B%B8%EF%BC%88%E5%85%B1%E9%80%9A%E7%B7%A8%EF%BC%89_2.X%E7%89%88.docx) |
| CAFIS | [1_POS連動接続仕様書（共通編）_2.X版.pdf](1_POS%E9%80%A3%E5%8B%95%E6%8E%A5%E7%B6%9A%E4%BB%95%E6%A7%98%E6%9B%B8%EF%BC%88%E5%85%B1%E9%80%9A%E7%B7%A8%EF%BC%89_2.X%E7%89%88.pdf) |
| CAFIS | [11.　CAH60_POS連動接続仕様書（nanaco編）_1.4版.pdf](11.%E3%80%80CAH60_POS%E9%80%A3%E5%8B%95%E6%8E%A5%E7%B6%9A%E4%BB%95%E6%A7%98%E6%9B%B8%EF%BC%88nanaco%E7%B7%A8%EF%BC%89_1.4%E7%89%88.pdf) |
| CAFIS | [2.　CAH51_POS連動接続仕様書（CREDIT編）_1.6版190320_150(1).docx](2.%E3%80%80CAH51_POS%E9%80%A3%E5%8B%95%E6%8E%A5%E7%B6%9A%E4%BB%95%E6%A7%98%E6%9B%B8%EF%BC%88CREDIT%E7%B7%A8%EF%BC%89_1.6%E7%89%88190320_150%281%29.docx) |
| CAFIS | [2.　CAH51_POS連動接続仕様書（CREDIT編）_1.6版190320_150.docx](2.%E3%80%80CAH51_POS%E9%80%A3%E5%8B%95%E6%8E%A5%E7%B6%9A%E4%BB%95%E6%A7%98%E6%9B%B8%EF%BC%88CREDIT%E7%B7%A8%EF%BC%89_1.6%E7%89%88190320_150.docx) |
| CAFIS | [2.　CAH51_POS連動接続仕様書（CREDIT編）_1.6版190320_150.pdf](2.%E3%80%80CAH51_POS%E9%80%A3%E5%8B%95%E6%8E%A5%E7%B6%9A%E4%BB%95%E6%A7%98%E6%9B%B8%EF%BC%88CREDIT%E7%B7%A8%EF%BC%89_1.6%E7%89%88190320_150.pdf) |
| CAFIS | [27_CAH81_POS連動試験_ArchSilulator説明書_1.5版.pdf](27_CAH81_POS%E9%80%A3%E5%8B%95%E8%A9%A6%E9%A8%93_ArchSilulator%E8%AA%AC%E6%98%8E%E6%9B%B8_1.5%E7%89%88.pdf) |
| CAFIS | [3_POS連動接続仕様書（Credit／NFC編）_1.0版.pdf](3_POS%E9%80%A3%E5%8B%95%E6%8E%A5%E7%B6%9A%E4%BB%95%E6%A7%98%E6%9B%B8%EF%BC%88Credit%EF%BC%8FNFC%E7%B7%A8%EF%BC%89_1.0%E7%89%88.pdf) |
| CAFIS | [3.　CAH52_POS連動接続仕様書（デビット編）_1.2版190320.pdf](3.%E3%80%80CAH52_POS%E9%80%A3%E5%8B%95%E6%8E%A5%E7%B6%9A%E4%BB%95%E6%A7%98%E6%9B%B8%EF%BC%88%E3%83%87%E3%83%93%E3%83%83%E3%83%88%E7%B7%A8%EF%BC%89_1.2%E7%89%88190320.pdf) |
| CAFIS | [4.　CAH53_POS連動接続仕様書（銀聯編）_1.4版.pdf](4.%E3%80%80CAH53_POS%E9%80%A3%E5%8B%95%E6%8E%A5%E7%B6%9A%E4%BB%95%E6%A7%98%E6%9B%B8%EF%BC%88%E9%8A%80%E8%81%AF%E7%B7%A8%EF%BC%89_1.4%E7%89%88.pdf) |
| CAFIS | [5.　CAH54_POS連動接続仕様書（交通系IC編）_1.4版.pdf](5.%E3%80%80CAH54_POS%E9%80%A3%E5%8B%95%E6%8E%A5%E7%B6%9A%E4%BB%95%E6%A7%98%E6%9B%B8%EF%BC%88%E4%BA%A4%E9%80%9A%E7%B3%BBIC%E7%B7%A8%EF%BC%89_1.4%E7%89%88.pdf) |
| CAFIS | [6.　CAH55_POS連動接続仕様書（iD編）_1.4版.pdf](6.%E3%80%80CAH55_POS%E9%80%A3%E5%8B%95%E6%8E%A5%E7%B6%9A%E4%BB%95%E6%A7%98%E6%9B%B8%EF%BC%88iD%E7%B7%A8%EF%BC%89_1.4%E7%89%88.pdf) |
| CAFIS | [7.　CAH56_POS連動接続仕様書（Edy編）_1.4版.pdf](7.%E3%80%80CAH56_POS%E9%80%A3%E5%8B%95%E6%8E%A5%E7%B6%9A%E4%BB%95%E6%A7%98%E6%9B%B8%EF%BC%88Edy%E7%B7%A8%EF%BC%89_1.4%E7%89%88.pdf) |
| CAFIS | [7.　CAH56_POS連動接続仕様書（楽天Edy編）_1.4版190320.pdf](7.%E3%80%80CAH56_POS%E9%80%A3%E5%8B%95%E6%8E%A5%E7%B6%9A%E4%BB%95%E6%A7%98%E6%9B%B8%EF%BC%88%E6%A5%BD%E5%A4%A9Edy%E7%B7%A8%EF%BC%89_1.4%E7%89%88190320.pdf) |
| CAFIS | [8.　CAH57_POS連動接続仕様書（WAON編）_1.5版.pdf](8.%E3%80%80CAH57_POS%E9%80%A3%E5%8B%95%E6%8E%A5%E7%B6%9A%E4%BB%95%E6%A7%98%E6%9B%B8%EF%BC%88WAON%E7%B7%A8%EF%BC%89_1.5%E7%89%88.pdf) |
| CAFIS | [9.　CAH58_POS連動接続仕様書（QUICPay編）_1.5版.pdf](9.%E3%80%80CAH58_POS%E9%80%A3%E5%8B%95%E6%8E%A5%E7%B6%9A%E4%BB%95%E6%A7%98%E6%9B%B8%EF%BC%88QUICPay%E7%B7%A8%EF%BC%89_1.5%E7%89%88.pdf) |
| CAFIS | [CAFIS_Arch_操作手順.xlsx](CAFIS_Arch_%E6%93%8D%E4%BD%9C%E6%89%8B%E9%A0%86.xlsx) |
| CAFIS | [POS連動接続仕様書（共通編）_23ページ.png](POS%E9%80%A3%E5%8B%95%E6%8E%A5%E7%B6%9A%E4%BB%95%E6%A7%98%E6%9B%B8%EF%BC%88%E5%85%B1%E9%80%9A%E7%B7%A8%EF%BC%89_23%E3%83%9A%E3%83%BC%E3%82%B8.png) |
| Display | [カスタマーディスプレイAPI仕様.pptx](%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%83%BC%E3%83%87%E3%82%A3%E3%82%B9%E3%83%97%E3%83%AC%E3%82%A4API%E4%BB%95%E6%A7%98.pptx) |
| Epson | [DM-D70_詳細取扱説明書_英語_revG.pdf](DM-D70_%E8%A9%B3%E7%B4%B0%E5%8F%96%E6%89%B1%E8%AA%AC%E6%98%8E%E6%9B%B8_%E8%8B%B1%E8%AA%9E_revG.pdf) |
| Epson | [Epson__補足説明_英語.txt](Epson_%E8%A3%9C%E8%B6%B3%E8%AA%AC%E6%98%8E_%E8%8B%B1%E8%AA%9E.txt) |
| Epson | [Epson__補足説明_日本語.txt](Epson_%E8%A3%9C%E8%B6%B3%E8%AA%AC%E6%98%8E_%E6%97%A5%E6%9C%AC%E8%AA%9E.txt) |
| Epson | [Epson_補足説明_日本語_c8a1a3bd.txt](Epson_%E8%A3%9C%E8%B6%B3%E8%AA%AC%E6%98%8E_%E6%97%A5%E6%9C%AC%E8%AA%9E_c8a1a3bd.txt) |
| Epson | [JSON_仕様書_revI.pdf](JSON_%E4%BB%95%E6%A7%98%E6%9B%B8_revI.pdf) |
| Epson | [JSON_仕様書_英語_revC.pdf](JSON_%E4%BB%95%E6%A7%98%E6%9B%B8_%E8%8B%B1%E8%AA%9E_revC.pdf) |
| Epson | [補足説明_英語.txt](%E8%A3%9C%E8%B6%B3%E8%AA%AC%E6%98%8E_%E8%8B%B1%E8%AA%9E.txt) |
| Epson | [補足説明_日本語.txt](%E8%A3%9C%E8%B6%B3%E8%AA%AC%E6%98%8E_%E6%97%A5%E6%9C%AC%E8%AA%9E.txt) |
| Epson | [SB-H50_周辺機器連携_CAFIS_Arch_日本語_revA.pdf](SB-H50_%E5%91%A8%E8%BE%BA%E6%A9%9F%E5%99%A8%E9%80%A3%E6%90%BA_CAFIS_Arch_%E6%97%A5%E6%9C%AC%E8%AA%9E_revA.pdf) |
| Epson | [SB-H50_周辺機器連携_Glory_300_N300_日本語_revA (SB-H50_自動つり銭機周辺機器連動).pdf](SB-H50_%E5%91%A8%E8%BE%BA%E6%A9%9F%E5%99%A8%E9%80%A3%E6%90%BA_Glory_300_N300_%E6%97%A5%E6%9C%AC%E8%AA%9E_revA%20%28SB-H50_%E8%87%AA%E5%8B%95%E3%81%A4%E3%82%8A%E9%8A%AD%E6%A9%9F%E5%91%A8%E8%BE%BA%E6%A9%9F%E5%99%A8%E9%80%A3%E5%8B%95%29.pdf) |
| Epson | [SB-H50_周辺機器連携_JET-S_日本語_revA.pdf](SB-H50_%E5%91%A8%E8%BE%BA%E6%A9%9F%E5%99%A8%E9%80%A3%E6%90%BA_JET-S_%E6%97%A5%E6%9C%AC%E8%AA%9E_revA.pdf) |
| Epson | [SB-H50_周辺機器連携_日本語_revB.pdf](SB-H50_%E5%91%A8%E8%BE%BA%E6%A9%9F%E5%99%A8%E9%80%A3%E6%90%BA_%E6%97%A5%E6%9C%AC%E8%AA%9E_revB.pdf) |
| Epson | [SB-H50_周辺機器連携_stera_terminal_日本語_revA.pdf](SB-H50_%E5%91%A8%E8%BE%BA%E6%A9%9F%E5%99%A8%E9%80%A3%E6%90%BA_stera_terminal_%E6%97%A5%E6%9C%AC%E8%AA%9E_revA.pdf) |
| Epson | [SB-H50資料.pdf](SB-H50%E8%B3%87%E6%96%99.pdf) |
| Epson | [TM-DT_周辺機器連携_英語_revD.pdf](TM-DT_%E5%91%A8%E8%BE%BA%E6%A9%9F%E5%99%A8%E9%80%A3%E6%90%BA_%E8%8B%B1%E8%AA%9E_revD.pdf) |
| Epson | [TM-DT_周辺機器連携_日本語_revG.pdf](TM-DT_%E5%91%A8%E8%BE%BA%E6%A9%9F%E5%99%A8%E9%80%A3%E6%90%BA_%E6%97%A5%E6%9C%AC%E8%AA%9E_revG.pdf) |
| Epson | [ePOS-Device_XML_ユーザーズマニュアル_日本語_revAA.pdf](ePOS-Device_XML_%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%82%BA%E3%83%9E%E3%83%8B%E3%83%A5%E3%82%A2%E3%83%AB_%E6%97%A5%E6%9C%AC%E8%AA%9E_revAA.pdf) |
| Epson | [ePOS_SDK_Android_移行ガイド_英語_revE.pdf](ePOS_SDK_Android_%E7%A7%BB%E8%A1%8C%E3%82%AC%E3%82%A4%E3%83%89_%E8%8B%B1%E8%AA%9E_revE.pdf) |
| Epson | [ePOS_SDK_Android_移行ガイド_日本語_revE.pdf](ePOS_SDK_Android_%E7%A7%BB%E8%A1%8C%E3%82%AC%E3%82%A4%E3%83%89_%E6%97%A5%E6%9C%AC%E8%AA%9E_revE.pdf) |
| Epson | [ePOS_SDK_Android_ユーザーズマニュアル_英語_revAH.pdf](ePOS_SDK_Android_%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%82%BA%E3%83%9E%E3%83%8B%E3%83%A5%E3%82%A2%E3%83%AB_%E8%8B%B1%E8%AA%9E_revAH.pdf) |
| Epson | [ePOS_SDK_Android_ユーザーズマニュアル_日本語_revAH.pdf](ePOS_SDK_Android_%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%82%BA%E3%83%9E%E3%83%8B%E3%83%A5%E3%82%A2%E3%83%AB_%E6%97%A5%E6%9C%AC%E8%AA%9E_revAH.pdf) |
| Epson | [ePOS_SDK_iOS_移行ガイド_英語_revE.pdf](ePOS_SDK_iOS_%E7%A7%BB%E8%A1%8C%E3%82%AC%E3%82%A4%E3%83%89_%E8%8B%B1%E8%AA%9E_revE.pdf) |
| Epson | [ePOS_SDK_iOS_移行ガイド_日本語_revE.pdf](ePOS_SDK_iOS_%E7%A7%BB%E8%A1%8C%E3%82%AC%E3%82%A4%E3%83%89_%E6%97%A5%E6%9C%AC%E8%AA%9E_revE.pdf) |
| Epson | [ePOS_SDK_iOS_ユーザーズマニュアル_英語_revAG.pdf](ePOS_SDK_iOS_%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%82%BA%E3%83%9E%E3%83%8B%E3%83%A5%E3%82%A2%E3%83%AB_%E8%8B%B1%E8%AA%9E_revAG.pdf) |
| Epson | [ePOS_SDK_iOS_ユーザーズマニュアル_日本語_revAI.pdf](ePOS_SDK_iOS_%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%82%BA%E3%83%9E%E3%83%8B%E3%83%A5%E3%82%A2%E3%83%AB_%E6%97%A5%E6%9C%AC%E8%AA%9E_revAI.pdf) |
| Epson | [ePOS_バーコードサンプル.pdf](ePOS_%E3%83%90%E3%83%BC%E3%82%B3%E3%83%BC%E3%83%89%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB.pdf) |
| Glory-SHARP | [300SerSSW仕様書.pdf](300SerSSW%E4%BB%95%E6%A7%98%E6%9B%B8.pdf) |
| Glory-SHARP | [300Serインターフェース仕様書.pdf](300Ser%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E4%BB%95%E6%A7%98%E6%9B%B8.pdf) |
| Glory-SHARP | [300_N300シリーズIF仕様書.pdf](300_N300%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BAIF%E4%BB%95%E6%A7%98%E6%9B%B8.pdf) |
| Glory-SHARP | [OPOS_アプリケーションプログラマーズガイド.pdf](OPOS_%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9E%E3%83%BC%E3%82%BA%E3%82%AC%E3%82%A4%E3%83%89.pdf) |
| Glory-SHARP | [RZ-A476SA396S_PFO説明書_v1.0.pdf](RZ-A476SA396S_PFO%E8%AA%AC%E6%98%8E%E6%9B%B8_v1.0.pdf) |
| Glory-SHARP | [RZ-A476SA396S_POSデバイスAPI説明書_第1.0版.pdf](RZ-A476SA396S_POS%E3%83%87%E3%83%90%E3%82%A4%E3%82%B9API%E8%AA%AC%E6%98%8E%E6%9B%B8_%E7%AC%AC1.0%E7%89%88.pdf) |
| Glory-SHARP | [RZ-A476SA396S_POSデバイスAPI説明書_別冊_第1.0版.pdf](RZ-A476SA396S_POS%E3%83%87%E3%83%90%E3%82%A4%E3%82%B9API%E8%AA%AC%E6%98%8E%E6%9B%B8_%E5%88%A5%E5%86%8A_%E7%AC%AC1.0%E7%89%88.pdf) |
| Glory-SHARP | [RZ-A476SA396S_POSユーティリティ説明書_第1.0版.pdf](RZ-A476SA396S_POS%E3%83%A6%E3%83%BC%E3%83%86%E3%82%A3%E3%83%AA%E3%83%86%E3%82%A3%E8%AA%AC%E6%98%8E%E6%9B%B8_%E7%AC%AC1.0%E7%89%88.pdf) |
| Glory-SHARP | [RZ-A476SA396S_基本ソフトウェア説明書_第1.0版.pdf](RZ-A476SA396S_%E5%9F%BA%E6%9C%AC%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2%E8%AA%AC%E6%98%8E%E6%9B%B8_%E7%AC%AC1.0%E7%89%88.pdf) |
| Glory-SHARP | [RZ-A476S_ミラーリング説明書_v1.01.pdf](RZ-A476S_%E3%83%9F%E3%83%A9%E3%83%BC%E3%83%AA%E3%83%B3%E3%82%B0%E8%AA%AC%E6%98%8E%E6%9B%B8_v1.01.pdf) |
| Glory-SHARP | [補足説明.pdf](%E8%A3%9C%E8%B6%B3%E8%AA%AC%E6%98%8E.pdf) |
| Glory-SHARP | [自動更新説明書_v1.0.pdf](%E8%87%AA%E5%8B%95%E6%9B%B4%E6%96%B0%E8%AA%AC%E6%98%8E%E6%9B%B8_v1.0.pdf) |
| Glory-SHARP | [プログラム仕様書(Ks12000I：配送売上)：17案件別ロジック⑥：釣銭機.xlsx](%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%A0%E4%BB%95%E6%A7%98%E6%9B%B8%28Ks12000I%EF%BC%9A%E9%85%8D%E9%80%81%E5%A3%B2%E4%B8%8A%29%EF%BC%9A17%E6%A1%88%E4%BB%B6%E5%88%A5%E3%83%AD%E3%82%B8%E3%83%83%E3%82%AF%E2%91%A5%EF%BC%9A%E9%87%A3%E9%8A%AD%E6%A9%9F.xlsx) |
| Glory-SHARP | [プログラム仕様書(Ks12000I：配送売上)：7レシート・ジャーナル項目説明.xlsx](%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%A0%E4%BB%95%E6%A7%98%E6%9B%B8%28Ks12000I%EF%BC%9A%E9%85%8D%E9%80%81%E5%A3%B2%E4%B8%8A%29%EF%BC%9A7%E3%83%AC%E3%82%B7%E3%83%BC%E3%83%88%E3%83%BB%E3%82%B8%E3%83%A3%E3%83%BC%E3%83%8A%E3%83%AB%E9%A0%85%E7%9B%AE%E8%AA%AC%E6%98%8E.xlsx) |
| Glory-SHARP | [プログラム仕様書：7レシート項目説明_レイアウト設計.xlsx](%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%A0%E4%BB%95%E6%A7%98%E6%9B%B8%EF%BC%9A7%E3%83%AC%E3%82%B7%E3%83%BC%E3%83%88%E9%A0%85%E7%9B%AE%E8%AA%AC%E6%98%8E_%E3%83%AC%E3%82%A4%E3%82%A2%E3%82%A6%E3%83%88%E8%A8%AD%E8%A8%88.xlsx) |
| Glory-SHARP | [自動釣銭機連動対応_ＳＳＷ設定_Ver1.40.xlsx](%E8%87%AA%E5%8B%95%E9%87%A3%E9%8A%AD%E6%A9%9F%E9%80%A3%E5%8B%95%E5%AF%BE%E5%BF%9C_%EF%BC%B3%EF%BC%B3%EF%BC%B7%E8%A8%AD%E5%AE%9A_Ver1.40.xlsx) |
| Glory-SHARP | [釣銭機OPOS機能一覧.xlsx](%E9%87%A3%E9%8A%AD%E6%A9%9FOPOS%E6%A9%9F%E8%83%BD%E4%B8%80%E8%A6%A7.xlsx) |
| Payment | [決済方法の組合せ.png](%E6%B1%BA%E6%B8%88%E6%96%B9%E6%B3%95%E3%81%AE%E7%B5%84%E5%90%88%E3%81%9B.png) |
| Payment | [決済方法の組合せ_V2.png](%E6%B1%BA%E6%B8%88%E6%96%B9%E6%B3%95%E3%81%AE%E7%B5%84%E5%90%88%E3%81%9B_V2.png) |
| Receipt | [7-01-01_お買上げ明細(雑番返品).jpg](7-01-01_%E3%81%8A%E8%B2%B7%E4%B8%8A%E3%81%92%E6%98%8E%E7%B4%B0%28%E9%9B%91%E7%95%AA%E8%BF%94%E5%93%81%29.jpg) |
| Receipt | [7-01-01_お買上げ明細.jpg](7-01-01_%E3%81%8A%E8%B2%B7%E4%B8%8A%E3%81%92%E6%98%8E%E7%B4%B0.jpg) |
| Receipt | [7-01-02_お買上げ明細(セット).jpg](7-01-02_%E3%81%8A%E8%B2%B7%E4%B8%8A%E3%81%92%E6%98%8E%E7%B4%B0%28%E3%82%BB%E3%83%83%E3%83%88%29.jpg) |
| Receipt | [7-01-02_お買上げ明細(内工事代値引).jpg](7-01-02_%E3%81%8A%E8%B2%B7%E4%B8%8A%E3%81%92%E6%98%8E%E7%B4%B0%28%E5%86%85%E5%B7%A5%E4%BA%8B%E4%BB%A3%E5%80%A4%E5%BC%95%29.jpg) |
| Receipt | [7-01-03_お買上明細(POSA_現金決済).jpg](7-01-03_%E3%81%8A%E8%B2%B7%E4%B8%8A%E6%98%8E%E7%B4%B0%28POSA_%E7%8F%BE%E9%87%91%E6%B1%BA%E6%B8%88%29.jpg) |
| Receipt | [7-01-05_お買上明細(テストモード).jpg](7-01-05_%E3%81%8A%E8%B2%B7%E4%B8%8A%E6%98%8E%E7%B4%B0%28%E3%83%86%E3%82%B9%E3%83%88%E3%83%A2%E3%83%BC%E3%83%89%29.jpg) |
| Receipt | [7-01-06_お買上げ明細（売上返品）.jpg](7-01-06_%E3%81%8A%E8%B2%B7%E4%B8%8A%E3%81%92%E6%98%8E%E7%B4%B0%EF%BC%88%E5%A3%B2%E4%B8%8A%E8%BF%94%E5%93%81%EF%BC%89.jpg) |
| Receipt | [7-03-01_お買上明細(商品変更).jpg](7-03-01_%E3%81%8A%E8%B2%B7%E4%B8%8A%E6%98%8E%E7%B4%B0%28%E5%95%86%E5%93%81%E5%A4%89%E6%9B%B4%29.jpg) |
| Receipt | [7-05-01_配送・来店・宅配伝票(雑番返品).jpg](7-05-01_%E9%85%8D%E9%80%81%E3%83%BB%E6%9D%A5%E5%BA%97%E3%83%BB%E5%AE%85%E9%85%8D%E4%BC%9D%E7%A5%A8%28%E9%9B%91%E7%95%AA%E8%BF%94%E5%93%81%29.jpg) |
| Receipt | [7-05-01_配送・来店・宅配伝票.jpg](7-05-01_%E9%85%8D%E9%80%81%E3%83%BB%E6%9D%A5%E5%BA%97%E3%83%BB%E5%AE%85%E9%85%8D%E4%BC%9D%E7%A5%A8.jpg) |
| Receipt | [7-05-02_配送・来店・宅配伝票（売上返品）.jpg](7-05-02_%E9%85%8D%E9%80%81%E3%83%BB%E6%9D%A5%E5%BA%97%E3%83%BB%E5%AE%85%E9%85%8D%E4%BC%9D%E7%A5%A8%EF%BC%88%E5%A3%B2%E4%B8%8A%E8%BF%94%E5%93%81%EF%BC%89.jpg) |
| Receipt | [7-07-01_配送・来店・宅配伝票(商品変更).jpg](7-07-01_%E9%85%8D%E9%80%81%E3%83%BB%E6%9D%A5%E5%BA%97%E3%83%BB%E5%AE%85%E9%85%8D%E4%BC%9D%E7%A5%A8%28%E5%95%86%E5%93%81%E5%A4%89%E6%9B%B4%29.jpg) |
| Receipt | [7-09-01_配送・来店・宅配準備票.jpg](7-09-01_%E9%85%8D%E9%80%81%E3%83%BB%E6%9D%A5%E5%BA%97%E3%83%BB%E5%AE%85%E9%85%8D%E6%BA%96%E5%82%99%E7%A5%A8.jpg) |
| Receipt | [7-1-04_お買上げ明細(QRコード付き).jpg](7-1-04_%E3%81%8A%E8%B2%B7%E4%B8%8A%E3%81%92%E6%98%8E%E7%B4%B0%28QR%E3%82%B3%E3%83%BC%E3%83%89%E4%BB%98%E3%81%8D%29.jpg) |
| Receipt | [7-11-01_売上取消／返品及び入金配送完了取消報告書.jpg](7-11-01_%E5%A3%B2%E4%B8%8A%E5%8F%96%E6%B6%88%EF%BC%8F%E8%BF%94%E5%93%81%E5%8F%8A%E3%81%B3%E5%85%A5%E9%87%91%E9%85%8D%E9%80%81%E5%AE%8C%E4%BA%86%E5%8F%96%E6%B6%88%E5%A0%B1%E5%91%8A%E6%9B%B8.jpg) |
| Receipt | [7-11-01_売上取消／返品及び入金配送完了取消報告書（売上返品）.jpg](7-11-01_%E5%A3%B2%E4%B8%8A%E5%8F%96%E6%B6%88%EF%BC%8F%E8%BF%94%E5%93%81%E5%8F%8A%E3%81%B3%E5%85%A5%E9%87%91%E9%85%8D%E9%80%81%E5%AE%8C%E4%BA%86%E5%8F%96%E6%B6%88%E5%A0%B1%E5%91%8A%E6%9B%B8%EF%BC%88%E5%A3%B2%E4%B8%8A%E8%BF%94%E5%93%81%EF%BC%89.jpg) |
| Receipt | [7-13-01_売上取消／返品及び入金配送完了取消報告書《返金を伴わない商品変更》.jpg](7-13-01_%E5%A3%B2%E4%B8%8A%E5%8F%96%E6%B6%88%EF%BC%8F%E8%BF%94%E5%93%81%E5%8F%8A%E3%81%B3%E5%85%A5%E9%87%91%E9%85%8D%E9%80%81%E5%AE%8C%E4%BA%86%E5%8F%96%E6%B6%88%E5%A0%B1%E5%91%8A%E6%9B%B8%E3%80%8A%E8%BF%94%E9%87%91%E3%82%92%E4%BC%B4%E3%82%8F%E3%81%AA%E3%81%84%E5%95%86%E5%93%81%E5%A4%89%E6%9B%B4%E3%80%8B.jpg) |
| Receipt | [7-15-01_来店案内(購入者のみ).jpg](7-15-01_%E6%9D%A5%E5%BA%97%E6%A1%88%E5%86%85%28%E8%B3%BC%E5%85%A5%E8%80%85%E3%81%AE%E3%81%BF%29.jpg) |
| Receipt | [7-15-02_お届け案内(別配送先あり).jpg](7-15-02_%E3%81%8A%E5%B1%8A%E3%81%91%E6%A1%88%E5%86%85%28%E5%88%A5%E9%85%8D%E9%80%81%E5%85%88%E3%81%82%E3%82%8A%29.jpg) |
| Receipt | [7-18-01_クレジット売上票.jpg](7-18-01_%E3%82%AF%E3%83%AC%E3%82%B8%E3%83%83%E3%83%88%E5%A3%B2%E4%B8%8A%E7%A5%A8.jpg) |
| Receipt | [7-20-01_携帯分割内訳明細.jpg](7-20-01_%E6%90%BA%E5%B8%AF%E5%88%86%E5%89%B2%E5%86%85%E8%A8%B3%E6%98%8E%E7%B4%B0.jpg) |
| Receipt | [7-21-01_携帯分割売上票(雑番返品).jpg](7-21-01_%E6%90%BA%E5%B8%AF%E5%88%86%E5%89%B2%E5%A3%B2%E4%B8%8A%E7%A5%A8%28%E9%9B%91%E7%95%AA%E8%BF%94%E5%93%81%29.jpg) |
| Receipt | [7-21-01_携帯分割売上票.jpg](7-21-01_%E6%90%BA%E5%B8%AF%E5%88%86%E5%89%B2%E5%A3%B2%E4%B8%8A%E7%A5%A8.jpg) |
| Receipt | [7-21-02_携帯分割売上票(商品変更).jpg](7-21-02_%E6%90%BA%E5%B8%AF%E5%88%86%E5%89%B2%E5%A3%B2%E4%B8%8A%E7%A5%A8%28%E5%95%86%E5%93%81%E5%A4%89%E6%9B%B4%29.jpg) |
| Receipt | [7-22-01_携帯分割売上票.jpg](7-22-01_%E6%90%BA%E5%B8%AF%E5%88%86%E5%89%B2%E5%A3%B2%E4%B8%8A%E7%A5%A8.jpg) |
| Receipt | [7-24-01_モバイルバーコード売上票.jpg](7-24-01_%E3%83%A2%E3%83%90%E3%82%A4%E3%83%AB%E3%83%90%E3%83%BC%E3%82%B3%E3%83%BC%E3%83%89%E5%A3%B2%E4%B8%8A%E7%A5%A8.jpg) |
| Receipt | [7-26-01_設置環境.jpg](7-26-01_%E8%A8%AD%E7%BD%AE%E7%92%B0%E5%A2%83.jpg) |
| Receipt | [7-28-01_メーカー保証書添付用レシート.jpg](7-28-01_%E3%83%A1%E3%83%BC%E3%82%AB%E3%83%BC%E4%BF%9D%E8%A8%BC%E6%9B%B8%E6%B7%BB%E4%BB%98%E7%94%A8%E3%83%AC%E3%82%B7%E3%83%BC%E3%83%88.jpg) |
| Receipt | [7-28-02_メーカー保証書添付用レシート（メーカーコールセンター情報印字）.jpg](7-28-02_%E3%83%A1%E3%83%BC%E3%82%AB%E3%83%BC%E4%BF%9D%E8%A8%BC%E6%9B%B8%E6%B7%BB%E4%BB%98%E7%94%A8%E3%83%AC%E3%82%B7%E3%83%BC%E3%83%88%EF%BC%88%E3%83%A1%E3%83%BC%E3%82%AB%E3%83%BC%E3%82%B3%E3%83%BC%E3%83%AB%E3%82%BB%E3%83%B3%E3%82%BF%E3%83%BC%E6%83%85%E5%A0%B1%E5%8D%B0%E5%AD%97%EF%BC%89.jpg) |
| Receipt | [7-30-01_長期無料保証書.jpg](7-30-01_%E9%95%B7%E6%9C%9F%E7%84%A1%E6%96%99%E4%BF%9D%E8%A8%BC%E6%9B%B8.jpg) |
| Receipt | [7-31-01_長期無料保証明細.jpg](7-31-01_%E9%95%B7%E6%9C%9F%E7%84%A1%E6%96%99%E4%BF%9D%E8%A8%BC%E6%98%8E%E7%B4%B0.jpg) |
| Receipt | [7-31-02_長期無料保証明細_管理前.jpg](7-31-02_%E9%95%B7%E6%9C%9F%E7%84%A1%E6%96%99%E4%BF%9D%E8%A8%BC%E6%98%8E%E7%B4%B0_%E7%AE%A1%E7%90%86%E5%89%8D.jpg) |
| Receipt | [7-34-01_あんしん延長保証書.jpg](7-34-01_%E3%81%82%E3%82%93%E3%81%97%E3%82%93%E5%BB%B6%E9%95%B7%E4%BF%9D%E8%A8%BC%E6%9B%B8.jpg) |
| Receipt | [7-36-01_展示品対策費確認票.jpg](7-36-01_%E5%B1%95%E7%A4%BA%E5%93%81%E5%AF%BE%E7%AD%96%E8%B2%BB%E7%A2%BA%E8%AA%8D%E7%A5%A8.jpg) |
| Receipt | [7-38-01_店舗対策費伝票ジャーナル.jpg](7-38-01_%E5%BA%97%E8%88%97%E5%AF%BE%E7%AD%96%E8%B2%BB%E4%BC%9D%E7%A5%A8%E3%82%B8%E3%83%A3%E3%83%BC%E3%83%8A%E3%83%AB.jpg) |
| Receipt | [7-40-01_クレジットカード番号差異.jpg](7-40-01_%E3%82%AF%E3%83%AC%E3%82%B8%E3%83%83%E3%83%88%E3%82%AB%E3%83%BC%E3%83%89%E7%95%AA%E5%8F%B7%E5%B7%AE%E7%95%B0.jpg) |
| Receipt | [7-40-02_中国銀聯カード番号差異.jpg](7-40-02_%E4%B8%AD%E5%9B%BD%E9%8A%80%E8%81%AF%E3%82%AB%E3%83%BC%E3%83%89%E7%95%AA%E5%8F%B7%E5%B7%AE%E7%95%B0.jpg) |
| Receipt | [7-42-01_お買上票(コミッション).jpg](7-42-01_%E3%81%8A%E8%B2%B7%E4%B8%8A%E7%A5%A8%28%E3%82%B3%E3%83%9F%E3%83%83%E3%82%B7%E3%83%A7%E3%83%B3%29.jpg) |
| Receipt | [7-44-01_POSAカードエラー状況一覧.jpg](7-44-01_POSA%E3%82%AB%E3%83%BC%E3%83%89%E3%82%A8%E3%83%A9%E3%83%BC%E7%8A%B6%E6%B3%81%E4%B8%80%E8%A6%A7.jpg) |
| Receipt | [7-46-01_POSAカード有効化エラージャーナル.jpg](7-46-01_POSA%E3%82%AB%E3%83%BC%E3%83%89%E6%9C%89%E5%8A%B9%E5%8C%96%E3%82%A8%E3%83%A9%E3%83%BC%E3%82%B8%E3%83%A3%E3%83%BC%E3%83%8A%E3%83%AB.jpg) |
| Receipt | [7-48-01_ｴﾘｱ内.jpg](7-48-01_%EF%BD%B4%EF%BE%98%EF%BD%B1%E5%86%85.jpg) |
| Receipt | [7-48-02_法人内.jpg](7-48-02_%E6%B3%95%E4%BA%BA%E5%86%85.jpg) |
| Receipt | [7-52-01_商品添付票取消一覧.jpg](7-52-01_%E5%95%86%E5%93%81%E6%B7%BB%E4%BB%98%E7%A5%A8%E5%8F%96%E6%B6%88%E4%B8%80%E8%A6%A7.jpg) |
| Receipt | [7-54-01_商品添付票《お買上準備》.jpg](7-54-01_%E5%95%86%E5%93%81%E6%B7%BB%E4%BB%98%E7%A5%A8%E3%80%8A%E3%81%8A%E8%B2%B7%E4%B8%8A%E6%BA%96%E5%82%99%E3%80%8B.jpg) |
| Receipt | [7-55_練習_配送売上_自配_銀聯売上票.jpg](7-55_%E7%B7%B4%E7%BF%92_%E9%85%8D%E9%80%81%E5%A3%B2%E4%B8%8A_%E8%87%AA%E9%85%8D_%E9%8A%80%E8%81%AF%E5%A3%B2%E4%B8%8A%E7%A5%A8.jpg) |
| Receipt | [7-56_練習_配送売上_自配_お買上明細.jpg](7-56_%E7%B7%B4%E7%BF%92_%E9%85%8D%E9%80%81%E5%A3%B2%E4%B8%8A_%E8%87%AA%E9%85%8D_%E3%81%8A%E8%B2%B7%E4%B8%8A%E6%98%8E%E7%B4%B0.jpg) |
| Receipt | [7-57_練習_配送売上_自配_お届け案内.jpg](7-57_%E7%B7%B4%E7%BF%92_%E9%85%8D%E9%80%81%E5%A3%B2%E4%B8%8A_%E8%87%AA%E9%85%8D_%E3%81%8A%E5%B1%8A%E3%81%91%E6%A1%88%E5%86%85.jpg) |
| Receipt | [7-58_練習_配送売上_自配_設置環境.jpg](7-58_%E7%B7%B4%E7%BF%92_%E9%85%8D%E9%80%81%E5%A3%B2%E4%B8%8A_%E8%87%AA%E9%85%8D_%E8%A8%AD%E7%BD%AE%E7%92%B0%E5%A2%83.jpg) |
| Receipt | [7-59_練習_配送売上_自配_お買上票(コッミション).jpg](7-59_%E7%B7%B4%E7%BF%92_%E9%85%8D%E9%80%81%E5%A3%B2%E4%B8%8A_%E8%87%AA%E9%85%8D_%E3%81%8A%E8%B2%B7%E4%B8%8A%E7%A5%A8%28%E3%82%B3%E3%83%83%E3%83%9F%E3%82%B7%E3%83%A7%E3%83%B3%29.jpg) |
| Receipt | [7-60_練習_配送売上_自配_口座引落確認書.jpg](7-60_%E7%B7%B4%E7%BF%92_%E9%85%8D%E9%80%81%E5%A3%B2%E4%B8%8A_%E8%87%AA%E9%85%8D_%E5%8F%A3%E5%BA%A7%E5%BC%95%E8%90%BD%E7%A2%BA%E8%AA%8D%E6%9B%B8.jpg) |
| Receipt | [7-61_練習_配送売上_自配_Ｅｄｙ支払確認書.jpg](7-61_%E7%B7%B4%E7%BF%92_%E9%85%8D%E9%80%81%E5%A3%B2%E4%B8%8A_%E8%87%AA%E9%85%8D_%EF%BC%A5%EF%BD%84%EF%BD%99%E6%94%AF%E6%89%95%E7%A2%BA%E8%AA%8D%E6%9B%B8.jpg) |
| Receipt | [7-62_練習_配送売上_自配_銀聯売上票.jpg](7-62_%E7%B7%B4%E7%BF%92_%E9%85%8D%E9%80%81%E5%A3%B2%E4%B8%8A_%E8%87%AA%E9%85%8D_%E9%8A%80%E8%81%AF%E5%A3%B2%E4%B8%8A%E7%A5%A8.jpg) |
| Receipt | [7-63_練習_配送売上_自配_メーカー保証書添付レシート.jpg](7-63_%E7%B7%B4%E7%BF%92_%E9%85%8D%E9%80%81%E5%A3%B2%E4%B8%8A_%E8%87%AA%E9%85%8D_%E3%83%A1%E3%83%BC%E3%82%AB%E3%83%BC%E4%BF%9D%E8%A8%BC%E6%9B%B8%E6%B7%BB%E4%BB%98%E3%83%AC%E3%82%B7%E3%83%BC%E3%83%88.jpg) |
| Receipt | [7-64_練習_配送売上_自配_配送伝票.jpg](7-64_%E7%B7%B4%E7%BF%92_%E9%85%8D%E9%80%81%E5%A3%B2%E4%B8%8A_%E8%87%AA%E9%85%8D_%E9%85%8D%E9%80%81%E4%BC%9D%E7%A5%A8.jpg) |
| Receipt | [7-65_練習_配送売上_自配_お買上票(コッミション).jpg](7-65_%E7%B7%B4%E7%BF%92_%E9%85%8D%E9%80%81%E5%A3%B2%E4%B8%8A_%E8%87%AA%E9%85%8D_%E3%81%8A%E8%B2%B7%E4%B8%8A%E7%A5%A8%28%E3%82%B3%E3%83%83%E3%83%9F%E3%82%B7%E3%83%A7%E3%83%B3%29.jpg) |
| Receipt | [7-66_練習_配送売上_自配_クレジット売上票.jpg](7-66_%E7%B7%B4%E7%BF%92_%E9%85%8D%E9%80%81%E5%A3%B2%E4%B8%8A_%E8%87%AA%E9%85%8D_%E3%82%AF%E3%83%AC%E3%82%B8%E3%83%83%E3%83%88%E5%A3%B2%E4%B8%8A%E7%A5%A8.jpg) |
| Receipt | [7-67_練習_配送売上_自配_携帯分割内訳明細.jpg](7-67_%E7%B7%B4%E7%BF%92_%E9%85%8D%E9%80%81%E5%A3%B2%E4%B8%8A_%E8%87%AA%E9%85%8D_%E6%90%BA%E5%B8%AF%E5%88%86%E5%89%B2%E5%86%85%E8%A8%B3%E6%98%8E%E7%B4%B0.jpg) |
| Receipt | [7-68_練習_配送売上_自配_携帯分割売上票.jpg](7-68_%E7%B7%B4%E7%BF%92_%E9%85%8D%E9%80%81%E5%A3%B2%E4%B8%8A_%E8%87%AA%E9%85%8D_%E6%90%BA%E5%B8%AF%E5%88%86%E5%89%B2%E5%A3%B2%E4%B8%8A%E7%A5%A8.jpg) |
| Receipt | [7-69_練習_配送売上_自配_配送準備票.jpg](7-69_%E7%B7%B4%E7%BF%92_%E9%85%8D%E9%80%81%E5%A3%B2%E4%B8%8A_%E8%87%AA%E9%85%8D_%E9%85%8D%E9%80%81%E6%BA%96%E5%82%99%E7%A5%A8.jpg) |
| Receipt | [7-70_練習_配送売上_自配_商品添付票(お買上準備).jpg](7-70_%E7%B7%B4%E7%BF%92_%E9%85%8D%E9%80%81%E5%A3%B2%E4%B8%8A_%E8%87%AA%E9%85%8D_%E5%95%86%E5%93%81%E6%B7%BB%E4%BB%98%E7%A5%A8%28%E3%81%8A%E8%B2%B7%E4%B8%8A%E6%BA%96%E5%82%99%29.jpg) |
| Receipt | [7-71_練習_売上返品_自配_クレジットカード売上票.jpg](7-71_%E7%B7%B4%E7%BF%92_%E5%A3%B2%E4%B8%8A%E8%BF%94%E5%93%81_%E8%87%AA%E9%85%8D_%E3%82%AF%E3%83%AC%E3%82%B8%E3%83%83%E3%83%88%E3%82%AB%E3%83%BC%E3%83%89%E5%A3%B2%E4%B8%8A%E7%A5%A8.jpg) |
| Receipt | [7-72_練習_売上返品_自配_お買上明細.jpg](7-72_%E7%B7%B4%E7%BF%92_%E5%A3%B2%E4%B8%8A%E8%BF%94%E5%93%81_%E8%87%AA%E9%85%8D_%E3%81%8A%E8%B2%B7%E4%B8%8A%E6%98%8E%E7%B4%B0.jpg) |
| Receipt | [7-73_練習_売上返品_自配_お届け案内.jpg](7-73_%E7%B7%B4%E7%BF%92_%E5%A3%B2%E4%B8%8A%E8%BF%94%E5%93%81_%E8%87%AA%E9%85%8D_%E3%81%8A%E5%B1%8A%E3%81%91%E6%A1%88%E5%86%85.jpg) |
| Receipt | [7-75_練習_売上返品_自配_お買上票(コッミション).jpg](7-75_%E7%B7%B4%E7%BF%92_%E5%A3%B2%E4%B8%8A%E8%BF%94%E5%93%81_%E8%87%AA%E9%85%8D_%E3%81%8A%E8%B2%B7%E4%B8%8A%E7%A5%A8%28%E3%82%B3%E3%83%83%E3%83%9F%E3%82%B7%E3%83%A7%E3%83%B3%29.jpg) |
| Receipt | [7-78_練習_売上返品_自配_クレジットカード売上票.jpg](7-78_%E7%B7%B4%E7%BF%92_%E5%A3%B2%E4%B8%8A%E8%BF%94%E5%93%81_%E8%87%AA%E9%85%8D_%E3%82%AF%E3%83%AC%E3%82%B8%E3%83%83%E3%83%88%E3%82%AB%E3%83%BC%E3%83%89%E5%A3%B2%E4%B8%8A%E7%A5%A8.jpg) |
| Receipt | [7-78_練習_売上返品_自配_クレジット売上票.jpg](7-78_%E7%B7%B4%E7%BF%92_%E5%A3%B2%E4%B8%8A%E8%BF%94%E5%93%81_%E8%87%AA%E9%85%8D_%E3%82%AF%E3%83%AC%E3%82%B8%E3%83%83%E3%83%88%E5%A3%B2%E4%B8%8A%E7%A5%A8.jpg) |
| Receipt | [7-80_練習_売上返品_自配_配送伝票.jpg](7-80_%E7%B7%B4%E7%BF%92_%E5%A3%B2%E4%B8%8A%E8%BF%94%E5%93%81_%E8%87%AA%E9%85%8D_%E9%85%8D%E9%80%81%E4%BC%9D%E7%A5%A8.jpg) |
| Receipt | [7-81_練習_売上返品_自配_お買上票(コッミション).jpg](7-81_%E7%B7%B4%E7%BF%92_%E5%A3%B2%E4%B8%8A%E8%BF%94%E5%93%81_%E8%87%AA%E9%85%8D_%E3%81%8A%E8%B2%B7%E4%B8%8A%E7%A5%A8%28%E3%82%B3%E3%83%83%E3%83%9F%E3%82%B7%E3%83%A7%E3%83%B3%29.jpg) |
| Receipt | [7-82_練習_売上返品_自配_クレジット売上票.jpg](7-82_%E7%B7%B4%E7%BF%92_%E5%A3%B2%E4%B8%8A%E8%BF%94%E5%93%81_%E8%87%AA%E9%85%8D_%E3%82%AF%E3%83%AC%E3%82%B8%E3%83%83%E3%83%88%E5%A3%B2%E4%B8%8A%E7%A5%A8.jpg) |
| Receipt | [7-83_練習_売上返品_自配_携帯分割内訳明細.jpg](7-83_%E7%B7%B4%E7%BF%92_%E5%A3%B2%E4%B8%8A%E8%BF%94%E5%93%81_%E8%87%AA%E9%85%8D_%E6%90%BA%E5%B8%AF%E5%88%86%E5%89%B2%E5%86%85%E8%A8%B3%E6%98%8E%E7%B4%B0.jpg) |
| Receipt | [7-84_練習_売上返品_自配_携帯分割売上票.jpg](7-84_%E7%B7%B4%E7%BF%92_%E5%A3%B2%E4%B8%8A%E8%BF%94%E5%93%81_%E8%87%AA%E9%85%8D_%E6%90%BA%E5%B8%AF%E5%88%86%E5%89%B2%E5%A3%B2%E4%B8%8A%E7%A5%A8.jpg) |
| Receipt | [7-85_練習_売上返品_自配_配送準備票.jpg](7-85_%E7%B7%B4%E7%BF%92_%E5%A3%B2%E4%B8%8A%E8%BF%94%E5%93%81_%E8%87%AA%E9%85%8D_%E9%85%8D%E9%80%81%E6%BA%96%E5%82%99%E7%A5%A8.jpg) |
| Receipt | [7-87_練習_売上返品_自配_取消報告書.jpg](7-87_%E7%B7%B4%E7%BF%92_%E5%A3%B2%E4%B8%8A%E8%BF%94%E5%93%81_%E8%87%AA%E9%85%8D_%E5%8F%96%E6%B6%88%E5%A0%B1%E5%91%8A%E6%9B%B8.jpg) |
| Receipt | [7-88_デジタル商品券売上票.jpg](7-88_%E3%83%87%E3%82%B8%E3%82%BF%E3%83%AB%E5%95%86%E5%93%81%E5%88%B8%E5%A3%B2%E4%B8%8A%E7%A5%A8.jpg) |
| Receipt | [7-89_汎用商品券売上票.jpg](7-89_%E6%B1%8E%E7%94%A8%E5%95%86%E5%93%81%E5%88%B8%E5%A3%B2%E4%B8%8A%E7%A5%A8.jpg) |
| Receipt | [7-89_練習_デジタル商品券売上票.jpg](7-89_%E7%B7%B4%E7%BF%92_%E3%83%87%E3%82%B8%E3%82%BF%E3%83%AB%E5%95%86%E5%93%81%E5%88%B8%E5%A3%B2%E4%B8%8A%E7%A5%A8.jpg) |
| Receipt | [7-89_練習_汎用商品券売上票.jpg](7-89_%E7%B7%B4%E7%BF%92_%E6%B1%8E%E7%94%A8%E5%95%86%E5%93%81%E5%88%B8%E5%A3%B2%E4%B8%8A%E7%A5%A8.jpg) |
| Scanner | [【カタログ】BC-BS802DII.pdf](%E3%80%90%E3%82%AB%E3%82%BF%E3%83%AD%E3%82%B0%E3%80%91BC-BS802DII.pdf) |
