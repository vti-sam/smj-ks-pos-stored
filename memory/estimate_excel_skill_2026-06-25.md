---
title: Estimate Excel Skill 2026-06-25
project: smj-ks-pos
type: runbook
status: archived
source:
  - Codex session 2026-06-25 estimate Japanese Markdown and Excel skill creation
  - skills/estimate-excel/SKILL.md
  - project-store/artifacts/estimates/EST-01_next-gen-tablet-pos_may-july_estimate-gantt/EST-01_next-gen-tablet-pos_may-july_estimate-gantt.ja.md
tags:
  - estimate
  - excel
  - gantt
  - skill
scope: historical
captured_at: 2026-06-25
validity: historical_context
promote_to_knowledge: false
---

# Estimate Excel Skill

Created project-local skill `skills/estimate-excel/` for Japanese customer-facing estimate Markdown to Excel rendering.

Key conventions:

- Markdown source uses 3 source sections: `基本情報`, `見積概要`, `見積工数`.
- Excel output uses three sheets: `基本情報`, `見積概要`, and `見積工数`. The `見積工数` sheet contains both effort rows and the Gantt timeline.
- Customer-facing deliverable must not call itself WBS or 工程表.
- Renderer validates totals, dates, forbidden wording, and outputs numeric effort cells with `0.00"人月"`.
- Gantt uses daily timeline from the detail task periods and formula-driven overlap bars.

Verified on 2026-06-25:

- `rtk uv run --with openpyxl python skills/estimate-excel/scripts/test_estimate_excel.py`
- `rtk uv run --with openpyxl python skills/estimate-excel/scripts/estimate_validate.py project-store/artifacts/estimates/EST-01_next-gen-tablet-pos_may-july_estimate-gantt/EST-01_next-gen-tablet-pos_may-july_estimate-gantt.ja.md`
- `rtk uv run --with openpyxl python skills/estimate-excel/scripts/estimate_render.py ...ja.md .../output/EST-01_next-gen-tablet-pos_may-july_estimate-gantt.ja.xlsx`
- `rtk uv run --with pyyaml python ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/estimate-excel`

Refined on 2026-06-25:

- Renderer was split into smaller modules: `render_style.py`, `render_grid.py`, `render_summary.py`, `render_gantt.py`, with `estimate_render.py` kept as CLI/orchestrator.
- Excel layout now uses the same base-grid pattern as `program-spec-excel` / `testcase-excel`: `COL_W = 5.5`, logical columns are merged from spans, and Gantt day columns are not shrunk below the base width.
- Read-back after render before the final merge change: `基本情報` 21 columns / 22 merges, `見積概要` 21 columns / 73 merges, `見積工数` 37 columns / 234 merges, generated Gantt sheet 112 columns / 160 merges, all min column widths `5.5`.

Updated again on 2026-06-25:

- Project name in the Japanese estimate was corrected to `次世代タブレットPOS`.
- Workbook now has only three sheets: `基本情報`, `見積概要`, `見積工数`.
- The Gantt timeline is merged into `見積工数` on the right side of the effort table.
- Read-back after render: `見積工数` 131 columns / 251 merges, freeze pane `AN5`, all min column widths `5.5`.
- Hidden helper columns `AL` / `AM` hold task start/end dates; timeline formulas use overlap logic such as `=IF(AND(AN$4>=$AL5,AN$4<=$AM5),"■","")`.

Estimate values updated on 2026-06-25:

- Customer-facing document title is `次世代タブレットPOS 見積仕様書`.
- Calculated effort is `6.25人月`, presented effort is `4.00人月`, and VTI-side adjustment is `2.25人月`.
- Presented effort distribution in the estimate summary: May 2026 `2.00人月`, June-July 2026 `2.00人月`.
- Read-back after render confirmed the same totals in `基本情報` and `見積工数`; May-start task rows sum to `2.00人月`.

Template integration update on 2026-06-25:

- User later requested matching the SMJ Google Sheets export format and adding the Gantt to template sheet `見積詳細`.
- `skills/estimate-excel/` was updated so Markdown still uses source sections `基本情報`, `見積概要`, `見積工数`, but Excel output follows the SMJ template sheet order: `表紙`, `変更履歴`, `スコープ・前提条件`, `見積詳細`, `パラメータ`, `機能一覧（全機能）`.
- The supported renderer is now `scripts/estimate_render.py` orchestrating `scripts/render_template.mjs` via bundled Node/artifact-tool. It fills `見積詳細`, adds weekly Gantt columns from `U`, cleans stale template content in `パラメータ` and `機能一覧（全機能）`, and patches freeze pane `A6` after export.
- The raw Google export contained comment/person metadata that artifact-tool could not import (`Person displayName is required`). Keep `assets/smj-estimate-template.raw.xlsx` for audit and use sanitized `assets/smj-estimate-template.xlsx` for rendering.
- Final verified output path: `project-store/artifacts/estimates/EST-01_next-gen-tablet-pos_may-july_estimate-gantt/output/EST-01_next-gen-tablet-pos_may-july_estimate-gantt.template.ja.xlsx`.
- Final read-back confirmed `見積詳細` totals: calculated `6.25人月`, presented `4.00人月`, VTI-side adjustment `2.25人月`; monthly allocation `2.00 / 0.68 / 1.32人月`; no forbidden/stale terms found in workbook text scan.

Dynamic allocation update on 2026-06-25:

- User clarified that monthly effort must not be fixed as May `2.00人月`; it should be distributed realistically from the current task data.
- `skills/estimate-excel/scripts/render_template.mjs` now generates month columns from `見積期間` and allocates each task's `提示工数` by the number of overlapping days in each month. The last positive month in each task absorbs rounding so row totals stay exact.
- `skills/estimate-excel/SKILL.md` and `references/markdown-schema.md` now say monthly allocation is dynamic and must not hard-code a target month.
- Customer-facing Markdown summary now states total presented effort `4.00人月` and says month values are shown in `見積詳細`, without naming a fixed May amount.
- Verified final Japanese workbook path: `project-store/artifacts/estimates/EST-01_next-gen-tablet-pos_may-july_estimate-gantt/output/【SMJ様】VTIジャパン_次世代タブレットPOS_5月〜7月_見積詳細_v1.0.xlsx`.
- Read-back confirmed dynamic monthly values in `パラメータ`: May 2026 `1.01人月`, June 2026 `1.67人月`, July 2026 `1.32人月`, total `4.00人月`; freeze pane `A6`; no forbidden customer-facing terms found.

Gantt style correction on 2026-06-25:

- User clarified that the Gantt chart style must not be changed arbitrarily.
- `render_template.mjs` keeps the dynamic formulas and monthly allocation, but the Gantt visual style is now aligned with the management Google Sheet pattern: blue headers, compact timeline columns, light green bar background via conditional formatting, and green task symbols.
- Workbook font styling was normalized to Meiryo for generated customer-facing ranges, with 9pt body text and 8pt Gantt date headers.
- `skills/estimate-excel/SKILL.md` now has a guardrail to avoid changing Gantt visual style unless the user explicitly requests it.

Merge-cell layout correction on 2026-06-25:

- User clarified that all generated tables must use merged cells, not only long-text columns.
- `render_template.mjs` now renders generated tables through a merge-cell grid helper. `見積詳細`, `スコープ・前提条件`, `パラメータ`, and `機能一覧（全機能）` use logical columns represented by merged spans across header/body/total rows.
- `見積詳細` header background is now consistent across the full estimate table header row; only the separate Gantt/timeline area keeps separate styling.
- Read-back after render confirmed required merges such as `B5:C5`, `K5:Q5`, `K6:Q6`, `AP5:AQ5`, and `AZ5:BA5`; `見積詳細` had 533 merged ranges; dynamic monthly allocation remained May `1.01人月`, June `1.67人月`, July `1.32人月`.

Reverted away from template form on 2026-06-25:

- User requested reverting to the checkpoint before applying the VTI/SMJ form/template.
- Supported output returned to the simple workbook: `基本情報`, `見積概要`, `見積工数`.
- `見積工数` again combines the effort table and Gantt timeline in one sheet, with Gantt starting at column `AN` and freeze pane `AN5`.
- Markdown summary returned to the prior presented-effort distribution: May 2026 `2.00人月`, June-July 2026 `2.00人月`.
- Current rendered file for that checkpoint: `project-store/artifacts/estimates/EST-01_next-gen-tablet-pos_may-july_estimate-gantt/output/EST-01_next-gen-tablet-pos_may-july_estimate-gantt.ja.xlsx`.
- The later template workbook path with Japanese customer filename may still exist in output for audit, but it is not the active deliverable for this reverted checkpoint.

Simple workbook style polish on 2026-06-25:

- User wanted the reverted simple workbook to keep its 3-sheet structure, but use the VTI form's title/header feel.
- `render_style.py` now uses `Meiryo UI`, title size 16 bold, table header background `#2F5496` with white text, and subtitle/section background `#DBE5F1`.
- Markdown basic information includes `作成者 | VTI`; title remains `次世代タブレットPOS 見積仕様書`.
- Verified preview showed `基本情報` and `見積工数` with VTI-like header colors while keeping the simple workbook layout.

VTI cover sheet added on 2026-06-25:

- User requested a new first sheet copied from the VTI form sheet containing the VTI logo, placed before `基本情報`.
- `estimate_render.py` now loads `assets/smj-estimate-template.xlsx`, keeps only `表紙`, updates the title to `次世代タブレットPOS 見積仕様書`, document number `EST-01`, version `1.0`, creator `VTI`, and dates `2026-06-25`, then appends the simple sheets.
- Active sheet order is now `表紙`, `基本情報`, `見積概要`, `見積工数`.
- Read-back confirmed the cover sheet has one embedded image and creator `VTI`; artifact-tool preview may not display Excel images even though the workbook contains the image.

VTI change-history sheet added on 2026-06-25:

- User requested copying `変更履歴` from the VTI form and placing it after `表紙`.
- Active sheet order is now `表紙`, `変更履歴`, `基本情報`, `見積概要`, `見積工数`.
- `変更履歴` row 3 is normalized to date `2026-06-25`, version `1.0`,担当者 `VTI`, and change content `次世代タブレットPOS 見積仕様書 新規作成`.
- Stale template reviewer/approver names are removed; read-back confirmed `Y3` and `AE3` are blank.
