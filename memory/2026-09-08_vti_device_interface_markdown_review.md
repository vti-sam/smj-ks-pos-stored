---
title: Rà soát interface thiết bị VTI và bản Markdown review
project: smj-ks-pos
type: decision
status: stale
source:
  - User xác nhận lưu kết quả rà soát interface trong cuộc hội thoại ngày 2026-09-08
  - scratch/basic-design-excel/vti-device/VTI_DeviceControl_BasicDesign_Review.md
  - scratch/interface-detail-review/operation-coverage.json
  - scratch/interface-detail-review/source-id-mapping.json
tags:
  - vti
  - device-interface
  - basic-design
  - svn
scope: historical
captured_at: 2026-09-08
validity: historical_context
promote_to_knowledge: false
---

## Outcome

- Bản review hiện tại là `scratch/basic-design-excel/vti-device/VTI_DeviceControl_BasicDesign_Review.md`, viết tiếng Nhật, tên thành phần Device Connector. Nội dung tiếp tục sửa tại Markdown; chỉ render Office khi User yêu cầu rõ.
- Mỗi loại thiết bị có một chương tương ứng một sheet interface: terminal thanh toán, máy nhận/trả tiền, scanner, máy in receipt, màn hình khách, drawer, A4, Handy, POSA và keyboard — tổng cộng 10 interface.
- 区分 là trang ngăn trước nhóm sheet, không phải nhãn lặp trong từng mục. Bản review có ba nhóm: 共通説明, デバイスインターフェース, 参照資料.
- Dùng 説明 và diễn đạt nghiệp vụ trong phần tổng quan/cách sử dụng. Tên API đặt trong cột tra cứu chuyên biệt, không dùng chuỗi lệnh để thay phần thuyết minh.
- Đã bổ sung 102 dòng thao tác trên 7 interface hiện có, tính cả overload và hàm bảo trì kế thừa, cùng một thuộc tính Capabilities. Đây không phải 102 hàm nghiệp vụ độc lập hay bằng chứng mọi model đã chạy.
- Bỏ ID số khỏi bản đọc khi tên thiết bị/model đủ để nhận biết. Giữ 29 ID gốc trong bản đối chiếu nguồn riêng; không đổi ID trong tài liệu SVN. Khi thực sự cần ID mới, ưu tiên mã có loại thiết bị/model theo quy ước User duyệt, không tự sinh chuỗi 001/002.

## Evidence

- SVN có `API詳細設計書_デバイス制御層.xlsx` tại `8000_受取資料/VTI/20.デバイス制御レイヤーの設計書/クラス詳細設計書（デバイス制御部）`. Sheet メソッド一覧 và hai sheet メソッド詳細 xác định tài liệu chỉ lấy API chính và ví dụ printer/cash changer, không liệt kê toàn bộ thao tác.
- Cùng thư mục có các class detail của OposCashChangerStrategy, OposPrinterStrategy, OposCustomerDisplayStrategy, OposSharpDrawerStrategy, OposCafisArchPaymentStrategy và OposKeyboardStrategy. Nội dung có tên/kiểu trả về/giới hạn cũ; đã phân biệt với định nghĩa hiện tại ở `sources/pos-integration/Pos.DeviceCtrl/Interfaces/`.
- SVN `9000_参考資料/決済端末関連/API仕様/【CAFIS Arch対応】OPOS-OCX_APG.pdf`, trang nội dung 72–75 (trang PDF 90–93), có yêu cầu/đáp ứng, tái in, toàn nhật kế và mã lỗi. Chức năng vendor không đồng nghĩa đã có API công khai tương ứng.
- Tài liệu `3000_詳細設計書/1000_システム全体/WORK/詳細設計書（システム全体）_外部インターフェースファイル定義（端末）_Ver0.0.1.xlsx` chủ yếu định nghĩa file cấu hình và vòng đời file, không phải danh sách API thao tác thiết bị.
- `operation-coverage.json` ghi 5/53/3/8/19/11/3 dòng cho payment/cash changer/scanner/printer/display/drawer/keyboard; Capabilities là thuộc tính bổ sung. `source-id-mapping.json` giữ 29 ID nguồn.
- Check hẹp xác nhận 3 divider, 102 dòng thao tác, đối chiếu 29 ID và loại nhãn cũ. document_quality_lint.py pass. Không tạo Office trong lượt sửa này.

## Unresolved

- Tài liệu đang review, không phải bản được khách hàng nghiệm thu. Gate bản chính thức còn chặn các nội dung chưa xác nhận; không được xóa sự không chắc chắn chỉ để vượt gate.
- CAFIS: cần chốt mapping dữ liệu nghiệp vụ, tham số tái in, cách công khai toàn nhật kế và xử lý kết quả giao dịch không rõ.
- Cash changer: còn xác nhận đơn vị tiền, control codes, thứ tự hủy/trả/khôi phục và nhánh SerialCashChanger chưa hoàn tất. Một số thao tác cũ không trả dữ liệu dù tên gợi ý có kết quả.
- A4, Handy, POSA chưa đủ thông tin để chốt API. Các model, driver/SDK và thiết bị thật chưa được xác nhận tương thích đầy đủ.
- Các file dưới scratch là artifact review tạm và có thể bị thay đổi hoặc dọn; cần kiểm tra tồn tại và đọc bản mới nhất trước khi tiếp tục. Memory không thay Markdown/source làm nguồn nội dung hiện hành.

## Retrieval keys

VTI_DeviceControl_BasicDesign_Review; interface VTI; API詳細設計書_デバイス制御層;
Device Connector; 区分 divider; 説明 nghiệp vụ; 102 thao tác; 29 ID nguồn;
DS-Scanner-AT30Q－SM; CAFIS; pos-integration; review Markdown không render Office.
