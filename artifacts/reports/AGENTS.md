# AGENTS.md

- `project-store/artifacts/reports/` chỉ chứa các category folder theo loại tài liệu hoặc workflow tài liệu; không đặt report bundle đơn lẻ trực tiếp dưới folder này.
- Category folder phải được đặt bằng tên loại tài liệu ổn định, dạng kebab-case ASCII, ví dụ `architecture/`, `program-specs/`, `testcases/`, `configuration-guides/`.
- Report bundle folder dùng dạng `<doc_type>-<seq>_<document_title>/`, trong đó `<doc_type>-<seq>` là mã tài liệu ổn định và `<document_title>` là tên tài liệu tiếng Nhật.
- Folder chứa trực tiếp một tài liệu chính phải trùng basename với file chính, hoặc dùng tên cụm tài liệu tiếng Nhật khi bundle chứa nhiều file cùng một cụm nghĩa.
- File tài liệu chính phải dùng basename dạng `<document_id>_<document_title>_<document_kind>`, trong đó `<document_title>` và `<document_kind>` là tiếng Nhật; mã tài liệu, mã model, mã thiết bị hoặc thuật ngữ chuẩn đã được source-of-truth định nghĩa có thể giữ nguyên.
- Các bản xuất cùng nội dung nhưng khác định dạng phải giữ cùng basename và chỉ khác extension; nếu cần gom theo định dạng, dùng subfolder như `excel/`.
- Không dùng tên class, component, agent, workaround hoặc mô tả tiếng Anh làm title chính của filename/folder nếu đã có tên tài liệu tiếng Nhật tương ứng.
- Khi di chuyển hoặc đổi tên report artifact, cập nhật link nội bộ trong `project-store/` trỏ tới đường dẫn hoặc filename cũ.
