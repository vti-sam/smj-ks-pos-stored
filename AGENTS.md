# AGENTS.md

- `project-store/` là snapshot dữ liệu và cấu hình portable riêng của dự án, được quản lý bằng nested Git repo do User clone thủ công.
- Chỉ đặt các folder portable trong subtree này: `config/`, `knowledge/`, `memory/`, `artifacts/`, `management/`.

## Commands

- Kiểm tra trạng thái repo stored: `rtk git -C project-store status --short`.
- Tìm link/path trong snapshot: `rtk rg "<keyword_or_path>" project-store`.
- Lint knowledge/memory: `rtk uv run skills/knowledge-code/knowledge-memory-sync/scripts/lint_knowledge.py`.
- Lint rule/path: `rtk uv run skills/knowledge-code/knowledge-memory-sync/scripts/lint_rules.py`.

## Boundaries

- `memory/` chỉ lưu lịch sử phiên và ghi chú tác nhân dạng historical; không dùng làm source-of-truth active. Khi nội dung có giá trị bền, promote sang `knowledge/` với source/evidence rõ.
- Không lưu source code, secret tracked, cache/index, build output hoặc file nháp tạm trong `project-store/`.
- File portable trong `config/` chỉ chứa định danh, resource ID, binding và tham chiếu local; secret/token/key thật chỉ nằm trong biến môi trường hoặc các path local bị nested Git ignore.
- Trước khi bootstrap workspace, User clone repo stored về đúng `project-store/`; bootstrap không fetch/pull repo này.
- Sau khi sửa nội dung portable trong `project-store/`, kiểm tra repo stored bằng Git; không dùng Google Drive/rclone làm snapshot backend mặc định.
- Link nội bộ trong snapshot nên viết từ repo root bằng tiền tố `project-store/` khi tài liệu được tham chiếu từ ngoài subtree.

## Git Workflow

- `project-store/` là nested Git repo, tách với root repo.
- Không stage/commit/push repo stored nếu User chưa yêu cầu.
- Khi đổi tên/di chuyển file trong snapshot, cập nhật link nội bộ liên quan rồi kiểm tra `rtk git -C project-store status --short`.

## Examples

- Đúng: file gốc hoặc bản xuất ra để lưu bền đặt trong `project-store/artifacts/`; ghi chú đã tổng hợp và có source/evidence đặt trong `project-store/knowledge/`.
- Sai: commit source code, cache index, secret hoặc file nháp tạm vào stored repo.
