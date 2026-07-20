---
title: SMJ KS POS bootstrap and management fetch
project: smj-ks-pos
type: lesson
status: archived
source:
  - Codex session 2026-06-18
  - Codex session 2026-06-21
tags:
  - bootstrap
  - management-sync
  - google-sheets
  - project-store
scope: historical
captured_at: 2026-06-21
validity: historical_context
promote_to_knowledge: false
---

# SMJ KS POS bootstrap and management fetch

- Workspace project was switched from `<project_id>` to `smj-ks-pos` in `project-data.yaml`.
- Bootstrap pulled the stored snapshot from `https://github.com/vti-sam/smj-ks-pos-stored.git`.
- Google Sheets full fetch completed with 39 WBS, 10 risks, 11 decisions, 11 stakeholders, and 10 communications records.
- Google Drive `modifiedTime` lookup returned `FAILED_PRECONDITION`; management sync used its `full_fetch` fallback successfully.
- Backlog project keys are `KSNEWSYS` for customer and `SHARP_MULTI_DEVICE_POS` for internal.
- Cập nhật 2026-07-18: cơ chế bootstrap tự clone/recreate stored repo và mapping dự án tại registry chung đã bị loại bỏ. Bootstrap chỉ kiểm tra nested Git repo đã được chuẩn bị thủ công; cấu hình dự án nằm tại `project-store/config/project.yaml`.
- Template management dùng chung hiện nằm tại `skills/project-ops/management-sync/resources/project-data.template.yaml`.
- Rider local VCS mapping includes both `$PROJECT_DIR$` and `$PROJECT_DIR$/project-store`.
