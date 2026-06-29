---
title: WBS Estimate Gantt Sync 2026-06-29
project: smj-ks-pos
type: runbook
status: archived
source:
  - Codex session 2026-06-29 WBS Google Sheets sync
  - project-store/management/WBS.yaml
  - project-store/artifacts/estimates/EST-01_次世代タブレットPOS_5月〜7月_詳細見積/EST-01_次世代タブレットPOS_5月〜7月_詳細見積.ja.md
tags:
  - wbs
  - estimate-gantt
  - google-sheets
  - management-sync
scope: historical
captured_at: 2026-06-29
validity: historical_context
promote_to_knowledge: false
---

# WBS Estimate Gantt Sync

On 2026-06-29, `project-store/management/WBS.yaml` and Google Sheets `WBS / WBS` were rebuilt from the 27 rows in `Sheet 3. 見積工数` of the Japanese estimate Markdown.

The management update script dry-run would have created the new `EST-GANTT-*` records after existing rows and then cleared old stable IDs, which could leave blank rows at the top of the sheet. To keep the visible WBS sheet clean, the WBS data columns `A:AW` were cleared from row 5 through row 104, then the 27 new records were written from the first data row while preserving existing sheet style and Gantt formula area.

Read-back verification after sync:

- Record count: 27
- ID range: `EST-GANTT-001` to `EST-GANTT-027`
- Old IDs remaining: 0
- Calculated effort in notes: `6.25人月`
- Presented effort in notes: `4.00人月`
- Adjustment: `2.25人月`
- Schedule range: `2026-05-01` to `2026-07-31`
- Groups: `デバイス・Host`, `ローカル状態保存`, `ログ・Sentry`, `テストケース・確認`, `レビュー・調整`

After writing records, `fetch_wbs.py --force` was run to read back the online sheet to YAML, and `update_today_line.py` was run to refresh the today line.
