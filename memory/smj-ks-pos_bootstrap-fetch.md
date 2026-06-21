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
- On 2026-06-21, `scripts/bootstrap_project.py` was updated so `project-store/` is recreated as a nested Git repository with `origin` set to the stored repo registered in `registry/projects.yaml`.
- The stored repo currently keeps data under a `project-store/` prefix, so bootstrap strips `stored_repo.source_root` into the nested repo root instead of creating `project-store/project-store`.
- `project-data.template.yaml` restores the management `layout` and `tables` schema when ignored local `project-data.yaml` only has the minimal project fields.
- Rider local VCS mapping includes both `$PROJECT_DIR$` and `$PROJECT_DIR$/project-store`.
