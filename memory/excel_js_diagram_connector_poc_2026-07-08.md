---
title: Excel JS diagram connector POC for basic design 5.1
project: smj-ks-pos
type: lesson
status: archived
source:
  - Codex session 2026-07-08 Office JavaScript / Office Script diagram POC
  - scratch/excel-js-diagram-poc/
tags:
  - excel-js
  - office-script
  - diagram
  - connector
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

User muốn thử hướng Excel JavaScript API / Office Add-in để vẽ `5.1 全体構成図` bằng native Excel shapes thay vì mermaid/draw.io.

Kết luận kỹ thuật:

- Excel JavaScript API và Office Scripts đều có connector line native và hàm gắn đầu/cuối line vào shape: `connectBeginShape` / `connectEndShape`.
- Với rectangle shape của Excel đang dùng trong workbook 5.1, connection site mapping thực tế khi đọc drawing XML là `top=0`, `left=1`, `bottom=2`, `right=3`.
- API hỗ trợ elbow connector, màu, độ dày, dash style, arrowhead. Chưa thấy API ổn định để chỉnh từng điểm bẻ route của elbow như thao tác tay trong Excel.
- Label trên line có thể group với line, nhưng group không tự căn lại theo midpoint khi route line đổi. POC giữ label là text box riêng để dễ sửa tay.
- POC tối thiểu nằm ở `scratch/excel-js-diagram-poc/`: layout JSON, Office Script chạy nhanh trong Excel, và Office Add-in skeleton.
