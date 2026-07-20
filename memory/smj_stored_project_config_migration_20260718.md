---
title: SMJ stored project config migration
project: smj-ks-pos
type: decision
status: archived
source:
  - project-store/config/project.yaml
  - project-store/config/management.override.yaml
  - Codex session 2026-07-18
tags:
  - bootstrap
  - project-store
  - configuration
  - management-sync
  - backlog
scope: historical
captured_at: 2026-07-18
validity: historical_context
promote_to_knowledge: false
---

# SMJ stored project config migration

- Cấu hình riêng của `smj-ks-pos` được chuyển sang `project-store/config/project.yaml`, gồm Google resource ID, Backlog role binding và endpoint không bí mật.
- Khác biệt WBS của SMJ được thu gọn vào `project-store/config/management.override.yaml`; template management chung không còn chứa tùy biến project.
- Secret được chuyển khỏi root registry vào `project-store/config/secrets.local.yaml` và `project-store/config/keystore.local/`; cả hai bị nested Git ignore. Runtime không còn dùng credential fallback từ root.
- Bootstrap local đã resolve đúng stored config, giữ nguyên nested stored Git repo và sinh lại `project-data.yaml` với tiêu đề `Estimate Gantt / 見積ガント`.
- Smoke test read-only đã resolve đúng Google spreadsheet/Drive resource và Backlog project nội bộ `SHARP_MULTI_DEVICE_POS`.
- Root registry không còn mapping, endpoint, resource ID hoặc keystore riêng của SMJ/ITEC.
