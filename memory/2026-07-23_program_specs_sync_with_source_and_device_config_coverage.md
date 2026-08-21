---
title: Program Specs đồng bộ source và bổ sung Device Config 2026-07-23
project: smj-ks-pos
type: lesson
status: archived
source:
  - project-store/artifacts/reports/program-specs/PS-DEVICE_タブレットPOS_デバイス制御/
  - project-store/artifacts/reports/program-specs/PS-HOST_タブレットPOS_デバイスコネクタ/
  - sources/tabletposboilerplate/TabetPos.Host/src/TabletHost/DeviceHost/
  - sources/tabletposboilerplate/TabetPos.Host/src/TabletDeviceManager/TabletDeviceManager.cs
  - sources/tabletposboilerplate/TabetPos.DeviceCtrl/DeviceManager.cs
  - sources/tabletposboilerplate/TabetPos.DeviceCtrl/Configuration/
tags:
  - program-specs
  - device-config
  - named-pipe
  - source-alignment
scope: historical
captured_at: 2026-07-23
validity: historical_context
promote_to_knowledge: false
---

# Program Specs đồng bộ source và bổ sung Device Config 2026-07-23

Đã đối chiếu 33 Program Spec hiện hữu với source `sources/tabletposboilerplate` tại commit `872ef1d`, sau đó cập nhật hai bundle `PS-DEVICE_タブレットPOS_デバイス制御` và `PS-HOST_タブレットPOS_デバイスコネクタ`.

Kết quả:

- Sửa 6 tài liệu `PS-HOST-01` đến `PS-HOST-06` theo logic Host hiện tại.
- Giữ nguyên 27 tài liệu HOST/STATE/MON không có sai lệch nội dung với source.
- Bổ sung 6 tài liệu: `PS-HOST-12`, `PS-HOST-13`, `PS-DEVICE-01` đến `PS-DEVICE-04`.
- Tổng số Program Spec sau cập nhật là 39.
- Chuẩn hoá `No` của toàn bộ 291 method theo format Basic Design trong cả `メソッド一覧` và `メソッド詳細`: `①`…`㊿`; từ 51 trở đi dùng dạng ghép từng chữ số khoanh tròn như `⑤①` và `⑥②`.
- Không tách tài liệu riêng cho các DTO, `PostWriteAction`, `ServiceCollectionExtensions`, `MauiProgram` và các interface/parser nhỏ; hành vi liên quan được mô tả trong tài liệu class chính.

Các điểm đồng bộ quan trọng:

- Named Pipe command server thực hiện `PostWriteAction` sau khi ghi phản hồi và cấp `Legacy-<GUID>` cho yêu cầu cũ.
- Host adapter sử dụng đúng class `NamedPipeDeviceHostAdapter`, dùng mapper để chọn routing key và chỉ thực hiện Kill/Restart sau khi phản hồi đã được gửi.
- Router hỗ trợ `keySelector`; command handler hỗ trợ HealthCheck qua readiness probe.
- TabletHost dừng transport và đặt trạng thái kết thúc khi khởi động thất bại.
- TabletDeviceManager quản lý `IsReady`, chỉ giám sát keep-alive của CashChanger và dùng `TabletProcessInfo`.
- Device controller ưu tiên runtime config, fallback sang embedded config khi runtime config lỗi, lưu UTF-8 không BOM và áp dụng lại cấu hình sau khi lưu.

Kiểm tra đã thực hiện:

- `spec_validate.py --profile japanese-class` pass toàn bộ 39 Markdown.
- Toàn bộ 39 workbook đã render lại vào `draft/`; mỗi workbook có đúng 5 sheet, đúng số method, `No` giữa danh sách và định nghĩa khớp 1:1, print setup hợp lệ và không còn marker `<br>` hoặc `\n` dạng chữ.
- Toàn bộ 39 đường dẫn source trong Program Spec tồn tại.
- Source repo không có thay đổi do phiên cập nhật tài liệu.

Gotcha:

- `verify_method_inventory.py` hiện không phân tích chính xác primary constructor, interface, expression-bodied method, nested class và nhiều class trong cùng file. Inventory cuối cùng được xác nhận bằng CodeGraph và đọc source trực tiếp.
- `design_md_lint.py --kind program-spec` đang yêu cầu marker `変更履歴/表紙/クラス定義`, trong khi Markdown canonical của bundle dùng `改訂履歴/基本情報/クラス概要` và validator/renderer Program Spec vẫn xử lý đúng. Đây là sai lệch giữa hai công cụ QA, không phải lỗi nội dung của bundle.
- Unicode chỉ có ký tự số khoanh tròn đơn đến 50. Hai tài liệu dài `PS-HOST-08` và `PS-HOST-09` phải dùng dạng ghép từng chữ số khoanh tròn từ method 51 để giữ format và định danh tuần tự.

## Bổ sung: thống nhất thuật ngữ với ARCH-HOST-01

Theo quyết định review ngày 2026-07-23, đã rà lại từng sheet của 13 Program Spec `PS-HOST-01` đến `PS-HOST-13` và dùng `ARCH-HOST-01` làm nguồn thuật ngữ chuẩn.

Kết quả:

- Phần diễn giải dùng thống nhất `デバイスコネクタ`, `タブレットPOS端末アプリ`, `コマンド通信用パイプ`, `イベント通知用パイプ`, `自動釣銭機`, `ドロア`, `カスタマディスプレイ` và `OPOS／OCX`.
- Tên class, method, namespace, file, pipe vật lý, `DeviceHostAction` và routing key `Host` được giữ nguyên; routing key `Host` được ghi rõ là giá trị vật lý dùng cho yêu cầu điều khiển không có DeviceId.
- Đổi tên deliverable `PS-HOST-08`, `PS-HOST-10`, `PS-HOST-11` theo tên thiết bị trong `ARCH-HOST-01` và cập nhật liên kết ở `ARCH-01`, `ARCH-02`, `ARCH-03`, `CFG-01`.
- Render lại 13 workbook; kiểm tra đọc ngược xác nhận đủ 65 sheet, đúng thứ tự `変更履歴`, `表紙`, `クラス定義`, `メソッド一覧`, `メソッド定義`, dòng 2 không chứa tên sheet lặp và cột No sử dụng số khoanh tròn.
- `spec_validate.py --profile japanese-class`, 13 unit test của Program Spec, rule lint và workspace verify đều đạt.
