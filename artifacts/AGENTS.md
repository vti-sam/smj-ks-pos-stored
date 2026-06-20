# AGENTS.md

- `project-store/artifacts/` lưu file dự án cần giữ lại và không do workflow Google Sheets management tạo hoặc đọc như cache sheet; input gốc từ KH/onsite cũng đặt ở đây nếu cần lưu bền trong snapshot.
- Đây là folder artifact chính của snapshot Git stored; không lưu secret, key, cache/index hoặc file nháp tạm.
- Subfolder trong `project-store/artifacts/` phải phản ánh loại dữ liệu hoặc workflow sở hữu file; không tạo subfolder theo workaround của một lần xử lý.
- Nếu tài liệu đã được phân tích thành tri thức bền, ghi bản tổng hợp vào `project-store/knowledge/` và giữ file gốc/bản xuất ra trong `project-store/artifacts/`.
- Khi di chuyển/đổi tên file trong `project-store/artifacts/`, cập nhật link nội bộ liên quan.
