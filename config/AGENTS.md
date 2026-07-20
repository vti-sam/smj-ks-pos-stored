# AGENTS.md

- `config/` là source-of-truth portable cho định danh, resource ID, service binding và management override của đúng project đang mở.

## Boundaries

- `project.yaml` chỉ chứa cấu hình không bí mật và tên biến môi trường hoặc đường dẫn `keystore.local/`.
- `management.override.yaml` chỉ chứa phần khác biệt so với template chung do `management-sync` sở hữu.
- Secret local chỉ được đặt trong `secrets.local.yaml` hoặc `keystore.local/`; cả hai bắt buộc bị ignore khỏi nested Git repo.
- Không đặt API key, token, private key, password hoặc nội dung credential trong file portable/tracked của subtree này.
- Khi đổi project ID, Google resource hoặc Backlog binding, verify runtime resolver và bootstrap dry-run trước khi dùng workflow online.

## Git Workflow

- Kiểm tra trạng thái nested repo sau khi sửa; không stage/commit/push nếu User chưa yêu cầu.
