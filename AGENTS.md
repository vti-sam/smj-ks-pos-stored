# AGENTS.md

- `project-store/` là snapshot dữ liệu dự án được quản lý bởi Git repo stored khai báo trong `registry/projects.yaml`.
- Chỉ đặt các folder dữ liệu portable trong subtree này: `knowledge/`, `memory/`, `artifacts/`, `management/`.

## Commands

- Kiểm tra trạng thái repo stored: `rtk git -C project-store status --short`.
- Tìm link/path trong snapshot: `rtk rg "<keyword_or_path>" project-store`.
- Lint knowledge/memory: `rtk uv run skills/knowledge-code/knowledge-memory-sync/scripts/lint_knowledge.py`.
- Lint rule/path: `rtk uv run skills/knowledge-code/knowledge-memory-sync/scripts/lint_rules.py`.

## Boundaries

- `memory/` chỉ lưu lịch sử phiên và ghi chú tác nhân dạng historical; không dùng làm source-of-truth active. Khi nội dung có giá trị bền, promote sang `knowledge/` với source/evidence rõ.
- Không lưu source code, secret, token, cache/index, build output hoặc file nháp tạm trong `project-store/`.
- Khi bootstrap workspace, fetch/pull repo stored về đúng `project-store/` trước khi dùng các workflow cần dữ liệu dự án.
- Sau khi sửa nội dung trong `project-store/knowledge/`, `project-store/memory/`, `project-store/artifacts/` hoặc `project-store/management/`, kiểm tra repo stored bằng Git; không dùng Google Drive/rclone làm snapshot backend mặc định.
- Link nội bộ trong snapshot nên viết từ repo root bằng tiền tố `project-store/` khi tài liệu được tham chiếu từ ngoài subtree.

## Git Workflow

- `project-store/` là nested Git repo, tách với root repo.
- Không stage/commit/push repo stored nếu User chưa yêu cầu.
- Khi đổi tên/di chuyển file trong snapshot, cập nhật link nội bộ liên quan rồi kiểm tra `rtk git -C project-store status --short`.

## Examples

- Đúng: file gốc hoặc bản xuất ra để lưu bền đặt trong `project-store/artifacts/`; ghi chú đã tổng hợp và có source/evidence đặt trong `project-store/knowledge/`.
- Sai: lưu source code, cache index, secret, file nháp tạm hoặc dữ liệu chưa xác minh trực tiếp trong `project-store/`.
