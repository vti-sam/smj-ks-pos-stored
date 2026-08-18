---
title: Cập nhật skill sheet tiếng Nhật và lưu ý round-trip Excel
project: smj-ks-pos
type: gotcha
status: archived
source:
  - Codex task 2026-07-14
  - outputs/skill-sheet-20260714/VTI_スキルシート_グエンホンソン_更新版.xlsx
tags:
  - skill-sheet
  - excel
  - japanese
  - anonymization
scope: historical
captured_at: 2026-07-14
validity: historical_context
promote_to_knowledge: false
---

Đã cập nhật skill sheet bằng tiếng Nhật ngắn gọn, ẩn tên khách hàng ngoài VTI và bổ sung hai dự án mới với vai trò ブリッジSE／テックリード.

Gotcha: round-trip workbook này qua artifact-tool tạo tệp mà Microsoft Excel không mở được. Cách xử lý đã kiểm chứng là dùng Excel COM để sửa trên bản gốc, mở lại bằng Excel để kiểm tra nội dung/công thức, rồi xuất ảnh PNG từng trang trực tiếp từ Excel.

Follow-up: các sheet kinh nghiệm tiếp theo cần sao chép nguyên header bảng và thiết lập trang ngang từ sheet đầu để đồng bộ đường viền, cột và khổ in. Excel `CopyPicture` đôi khi xuất PNG trắng ở một sheet dù workbook đúng; cần retry riêng sheet đó với tổ hợp appearance/format khác, kiểm tra dung lượng ảnh và xem lại trực quan trước khi bàn giao.
