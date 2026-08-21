---
title: Device connector report terminology alignment
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session 2026-07-02 device connector WBS/report terminology task
  - project-store/artifacts/reports/
tags:
  - reports
  - terminology
  - device-connector
scope: historical
captured_at: 2026-07-02
validity: historical_context
promote_to_knowledge: false
---

Report artifacts were aligned to the official customer-facing term `デバイスコネクタ`.

Use `デバイスコネクタ（Host）` when the text needs to map the business term to the existing `Host` code/project alias. Do not use `コネクタサーバー` in current report text, Draw.io labels, SVG output, DOCX display text, official report artifact names, or Backlog WBS wording for this scope.

Renamed/updated report areas:

- `project-store/artifacts/reports/architecture/ARCH-03_タブレットPOS_デバイスコネクタ構造設計書/`
- `project-store/artifacts/reports/program-specs/PS-HOST_タブレットPOS_デバイスコネクタ/`
- `project-store/artifacts/reports/testcases/TC-IT-DCS-01_タブレットPOS_デバイスコネクタ制御_デバイス戦略・OPOS連携_結合テストケース/`
- `project-store/artifacts/reports/configuration-guides/CFG-01_タブレットPOS_デバイス制御層設定ファイル記載要領/`

Verification performed:

- `rtk rg -n "コネクタサーバー" project-store/artifacts/reports` returned no hits.
- `find project-store/artifacts/reports -name '*コネクタサーバー*' -print` returned no hits.
- DOCX/XLSX internal XML scan returned `old_total 0` for `コネクタサーバー` and confirmed `デバイスコネクタ` exists.
- Markdown image link check returned `image_links_ok`.
- ARCH-03 and CFG-01 device connector PNGs were visually checked and show `デバイスコネクタ（Host）`.
