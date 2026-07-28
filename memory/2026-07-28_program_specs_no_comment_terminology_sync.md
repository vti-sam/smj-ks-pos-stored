---
title: Hoàn tất đồng bộ và chính thức hóa 17 Program Specs sau Yoshida review
project: smj-ks-pos
type: lesson
status: archived
source:
  - scratch/デバイスコネクタプログラム仕様書/指摘反映済み/
  - scratch/デバイスコネクタプログラム仕様書/
  - project-store/artifacts/reports/program-specs/PS-01_タブレットDCS_デバイスコネクタ制御方式/
  - project-store/knowledge/ks_pos_boilerplate/runbooks/document_authoring_markdown_source_of_truth.md
  - sources/tabletposboilerplate/TabetPos.Host/src/TabletHost/DeviceHost/DeviceCommandCore.cs
  - sources/tabletposboilerplate/TabetPos.Host/src/TabletHost/DeviceHost/NamedPipeDeviceHostAdapter.cs
  - sources/tabletposboilerplate/TabetPos.Host/src/TabletDevice/CashDrawer/CashDrawerBySharp/CashDrawerBySharp.cs
tags:
  - program-specs
  - yoshida-review
  - terminology
  - host
  - device
scope: historical
captured_at: 2026-07-28
validity: historical_context
promote_to_knowledge: false
---

# Hoàn tất đồng bộ và chính thức hóa 17 Program Specs sau Yoshida review

Sau khi xác nhận các file không có chỉ摘 vẫn được tính là đã review xong, đã
phản ánh nội dung review và chuẩn hóa thuật ngữ vào canonical Markdown của 15
Program Specs. `PS-HOST-05` và `PS-HOST-07` không thay đổi nội dung Markdown;
hai file này chỉ có thao tác xử lý ghi chú hoặc trình bày trên bản review.

Trong 15 Markdown đã sửa, bảy tài liệu không có chỉ摘 nhưng cần đồng bộ thuật
ngữ toàn bộ bundle gồm:

- `PS-DEVICE-02`, `PS-DEVICE-03`
- `PS-HOST-01`, `PS-HOST-02`
- `PS-HOST-10`, `PS-HOST-11`, `PS-HOST-12`

Phạm vi sửa chỉ gồm thuật ngữ và cách trình bày:

- thay English thô trong câu Nhật bằng thuật ngữ Nhật hoặc dạng
  `論理名（コード識別子）`;
- dùng dấu ngoặc Nhật cho literal như `「Host」`, `「Kill」`, `「ReStart」`;
- sửa mô tả `OpenDrawer`: giá trị trả về là `ResultCode`, còn
  `ResultCodeExtended` được ghi vào từ điển kết quả;
- giữ đúng giá trị lệnh tương thích cũ `ReStart`, phân biệt với enum nội bộ
  `Restart`;
- rút gọn câu tại `PS-HOST-06` để bản render không bị cắt dòng.

Theo quyết định Markdown-first của dự án, 17 workbook chính thức được render
lại từ canonical Markdown thay vì tiếp tục dùng các ô đã vá thủ công. Toàn bộ
file trong `指摘反映済み` đã bỏ tiền tố `吉田_レビュー済み_` và dùng basename
chính thức `PS-*.xlsx`.

Bản review gốc được giữ nguyên. Các bản vá thủ công trước khi áp dụng
Markdown-first được chuyển sang
`scratch/program-spec-pre-md-first-backup/2026-07-28/` để có thể khôi phục.
Bundle chính thức có đủ 17 workbook; mỗi file có 5 sheet, byte-identical với
bản render canonical Markdown, không có lỗi công thức, vùng ghi chú review
ngoài template trống và các vùng nội dung bị ảnh hưởng đã được kiểm tra trực
quan.
