# AGENTS.md

Kế thừa chỉ dẫn root; file này chỉ bổ sung phạm vi `project-store/`.
Đường dẫn tài liệu tính từ workspace root với tiền tố `project-store/`.

- Chủ động tra Codex Memory khi cần ngữ cảnh hoặc quyết định trước đó; dùng
  skill `skills/search/rag/` để tìm hoặc đối chiếu dữ liệu dự án khi chưa rõ nguồn.

## Cấu trúc và cấu hình

- Đây là Git repo riêng. Dữ liệu dùng lại nằm trong `config/`, `artifacts/`,
  `management/`, `skills/`; mã nguồn ứng dụng ở `sources/<project>/` ngoài repo này.
  Cache/index/bản nháp ở `scratch/`, không đưa vào dữ liệu dự án.
- `config/project.yaml` giữ định danh và kết nối dịch vụ. Phần `project` chỉ có
  `id`, `display_name`; không gán scope, milestone, ngày, người hay mục đích báo cáo
  làm mặc định. Dùng nguồn hiện tại, hỏi khi thiếu hoặc lập bản nháp trong `scratch/`.
- `config/management.override.yaml` chỉ chứa khác biệt bố cục của Google Sheets;
  metadata báo cáo truyền riêng bằng `--profile` theo skill phụ trách.
- Secret ở biến môi trường, `config/secrets.local.yaml` hoặc `config/keystore.local/`;
  các đường dẫn local phải được Git ignore.
- Khi đổi kết nối, kiểm tra cấu hình và thao tác đọc liên quan trước khi ghi dịch vụ.
  Bootstrap chỉ kiểm tra/khởi tạo local; không tự lấy secret, tạo remote hay publish.

## Nội dung quản lý

- Markdown trong `management/` là nguồn chính. `project-tables` giữ schema,
  nội dung và stable ID; `google-sheets` giữ bố cục và đồng bộ.
  Google Sheets và `.sync-state.json` là dữ liệu có thể dựng lại từ nguồn.
- Chỉ tạo WBS/record khi được yêu cầu. ID phải duy nhất; không định danh bằng số dòng.
  `deadline` là hạn kế hoạch; `end_date` chỉ ghi khi có căn cứ đã hoàn thành.
- Thiếu record trong dữ liệu đọc một phần không đồng nghĩa được xóa. Chỉ xóa theo
  thay đổi đã xác định từ nguồn chính trong phạm vi tác vụ.
- Ghi Google Sheets theo quy trình của skill: kiểm tra Markdown → xem thay đổi →
  ghi trong phạm vi được giao → đọc lại theo stable ID. Không hỏi lại quyền đã có.
- `watch-fast` chỉ chạy khi được yêu cầu bật tự đồng bộ; thay đổi cấu trúc vượt
  phạm vi đó phải dừng để xử lý theo quy trình rebuild.
- Import Sheets tạo bản nháp trước; `--apply` mới cập nhật Markdown và không tự
  publish lại. Decisions chỉ ghi quyết định dự án, không ghi việc sửa công cụ/skill.

## Tài liệu và skill riêng

- Thư mục trong `artifacts/` dùng tên tiếng Anh, chữ thường, phân tách từ bằng
  dấu gạch nối (`kebab-case`). Tên file tài liệu bên trong phải dùng tiếng Nhật
  như hiện tại; giữ nguyên các identifier trong tên file.
- RAG chỉ index Markdown/YAML trong `artifacts/`; cách chọn công cụ theo root.
- Giữ nguồn và mục đích sử dụng của tài liệu. Đổi tên/di chuyển phải sửa liên kết;
  không suy ra tài liệu đã được duyệt chỉ từ thư mục lưu.
- Quy ước đặt tên file, ID, thuật ngữ và render thuộc skill tài liệu tương ứng.
  Không sao chép quy ước đó thành một bộ chỉ dẫn khác ở đây.
- `skills/` chỉ chứa quy trình đặc thù dự án; cấu hình đọc từ `config/`.
  Script chạy xác định theo đầu vào, không tự gọi LLM; không lưu lịch sử chat,
  mã nguồn, cache hoặc output vào thư mục skill.
- Hoàn tất khi các kiểm tra bắt buộc của skill đã qua; báo đúng phần chưa kiểm chứng.

## Giới hạn riêng của dự án

- File diagram riêng chỉ quản lý trong repo cùng tài liệu gốc; không bàn giao hoặc
  đồng bộ file riêng sang SVN hay đích ngoài repo. Sơ đồ nhúng trong tài liệu bàn giao
  vẫn được giữ; kiểm tra danh sách file trước khi bàn giao.
