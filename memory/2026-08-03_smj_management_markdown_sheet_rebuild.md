---
title: SMJ management Markdown and WBSGAMEN Device Manager Sheet rebuild
project: smj-ks-pos
type: decision
status: archived
source:
  - project-store/config/project.yaml
  - project-store/management/WBS.md
  - project-store/management/RISKS.md
  - project-store/management/DECISIONS.md
  - project-store/management/STAKEHOLDERS.md
  - project-store/management/COMMUNICATIONS.md
  - scratch/management/wbsgamen-terminology-contract.json
  - scratch/backlog/wbsgamen-device-manager-tasks.raw.md
  - skills/project-ops/management-authoring/scripts/management_authoring_gate.py
  - skills/project-ops/management-google-sheets/scripts/management_sheets_sync.py
  - project-data.yaml
  - scratch/management-audit/projection-20260804-070059.json
  - scratch/management-audit/projection-20260804-142401.json
  - skills/project-ops/management-authoring/resources/management.schema.yaml
  - skills/project-ops/management-authoring/scripts/migrate_management_v3_to_v4.py
  - scratch/management-audit/projection-20260804-154234.json
  - scratch/management-audit/projection-20260804-154820.json
  - scratch/management-audit/projection-20260804-161703.json
  - scratch/management-audit/projection-20260804-164948.json
  - scratch/management-verification/verify.log
tags:
  - smj-ks-pos
  - management
  - markdown
  - google-sheets
  - wbs
  - wbsgamen
  - device-manager
  - terminology
scope: historical
captured_at: 2026-08-04
validity: historical_context
promote_to_knowledge: false
---

# SMJ management Markdown and WBSGAMEN Device Manager Sheet rebuild

## Outcome

The management source of truth was rebuilt as content-only Markdown. `WBS.md`
contains six Device Manager rows (`DM-SPEC`, `DM-CONFIG`, `DM-SELECT`,
`DM-FACTORY`, `DM-STRATEGY`, `DM-INTEGRATION`); the Backlog review also
repopulated `RISKS.md` (5), `DECISIONS.md` (3), `STAKEHOLDERS.md` (7) and
`COMMUNICATIONS.md` (5) with verified customer, WBSGAMEN and VTI review
information. The six rows preserve the agreed effort split: August 2人月 for
program specification and September 1人月 for the code/integration group as a
whole, without duplicate per-row counting. Start dates are distributed across
the approved August/September work windows, and the WBS notes carry one explicit
monthly effort marker plus the milestone marker used by the Project summary.

The Google Sheet was rebuilt from the Markdown source with shadow read-back and
now has six WBS rows, 5 risks, 3 decisions, 7 stakeholders and 5 communication
rows across seven canonical tabs, with no legacy/shadow tabs. The final WBS
projection is stable:
the post-publish plan reports `create=0`, `update=0`, `delete=0`,
`unchanged=6`. The first tab now shows the milestone `【MS】共通部品開発（初期開発）`
and section 4 presents the monthly estimates and grouped target tasks as
`2026年8月: 2.0人月` and `2026年9月: 1.0人月`.

The first tab was renamed from `Project / プロジェクト` to `基本情報`. Its
project grid now uses 30 fixed-width columns (approximately 1,200px), the
Basic Info content cells merge across the full `F:AD` content area instead of
leaving an empty tail, and blank separator rows are reduced to 10px. The old
system-name value was corrected to `KsタブレットPOS（次世代システム）`; the
creation date is displayed as `2026-08-04`, and risk/stakeholder level labels
are displayed in Japanese (`高／中／低`).

The management schema is now v4. `WBS.md` stores `estimate_month` and
`estimate_mm` explicitly: August is anchored at 2.0人月 on `DM-SPEC`, and
September is anchored at 1.0人月 on `DM-CONFIG` for the five-task group. The
other September rows keep the month but leave the amount blank, so the monthly
sum cannot multiply the shared estimate. In `基本情報`, counts, status totals,
deadline-month totals, month labels, grouped monthly effort and deadline values
are formula-backed references to WBS; profile metadata and the projection time
remain fixed metadata by design. `estimate_month` is written as text and
`estimate_mm` as numeric data to keep the formulas stable after Excel export.

The current reviewer display was corrected in the project profile and
`STAKEHOLDERS.md`: the former `小山@ジャパンネット` label is now `SMJ 南` in
the profile reviewer field and stakeholder `S-007`. The historical D-003
wording `チームリーダー（小山）` was left unchanged because this correction
was scoped to the exact current display label.

The WBS status was corrected from the previous snapshot: `DM-SPEC` is now
`In Progress`; `DM-CONFIG`, `DM-SELECT`, `DM-FACTORY`,
`DM-STRATEGY` and `DM-INTEGRATION` are `Not Started`. `DM-SPEC` now has an
explicit working end date of 2026-08-31 so the August bar continues after the
2026-08-24 document-delivery deadline; the other `end_date` cells remain
blank. The WBS
`ステータス` field uses a three-cell horizontal merge consistently on WBS,
Risks and Decisions; all normal tabs use wrapped content with calculated row
heights. The row-height calculation follows the Basic Design rule: the logical
merged width is multiplied by 1.05, non-ASCII characters use double display
width, and multi-line rows receive a 5px padding. WBS Graph remains clipped by
design. On WBS Graph non-working-day cells retain the pale-pink holiday fill,
but their task symbols are suppressed, so `■`, `◇` and `◆` appear only on
working-day columns.

Logical wording was normalized from ARCH-DEVICE-01, ARCH-HOST-01, CFG-01 and
PS-DEVICE/PS-HOST. The applied names include `デバイスマネージャー`,
`使用デバイス選択処理`, `ストラテジー生成`, `ストラテジーの取得・利用順序`,
`名前付きパイプ`, `カスタマディスプレイ`, `実行時設定` and `組込み初期設定`.
Physical class/method/file identifiers remain only in the raw task draft where
they are needed for traceability.

## Evidence

- `management_authoring_gate.py` passed for all five Markdown management tables.
- Terminology audit passed for WBS, the raw Backlog draft, the WBSGAMEN skill and
  the Vietnamese source summary against seven owner documents.
- Skill-quality evaluation for `wbsgamen-backlog-task-authoring` passed all
  tests with score 90.8.
- The management projection unit suite passed 44 tests, including the monthly
  effort aggregation check that prevents the September group estimate from
  being multiplied by five task rows and the Basic Info merge/spacing check.
- Google Sheet publish used the management projection workflow; both publish
  runs completed with shadow read-back.
- Final projection audit: `scratch/management-audit/projection-20260803-232241.json`;
  `tabs=7`, `missing=0`, `legacy=0`, `merge_validation=PASS`.
- Latest layout audit: `scratch/management-audit/projection-20260804-072734.json`;
  `tabs=7`, `missing=0`, `legacy=0`, `merge_validation=PASS`.
- Latest WBS status/layout audit: `scratch/management-audit/projection-20260804-121117.json`;
  `基本情報` shows `未着手=5` and `対応中=1`; the post-publish plan reports
  all six WBS records as `unchanged`.
- Final API read-back: WBS has six stable IDs with deadlines 2026-08-24 or
  2026-09-24, distributed start dates, `DM-SPEC=In Progress` with
  `end_date=2026-08-31`, the other five rows=`Not Started`, and blank
  `end_date` values;
  the first `基本情報` tab is index 0 with 30 columns, no body vertical
  merges, a merged `F:AD` content area, the milestone and two monthly estimate rows;
  risks, decisions, stakeholders and communications read back as 5, 3, 7 and
  5 rows respectively. The same read-back confirms the corrected system name,
  date format, Japanese level labels, wrapped normal tabs, three-cell WBS
  status merges and formula-backed WBS Graph cells. WBS Graph now includes a
  `凡例` in the left metadata band and shades weekends plus the configured
  2026 Japanese holidays (8/11, 9/21, 9/22, 9/23) in pale pink.
- Latest all-status/row-height audit: `scratch/management-audit/projection-20260804-133930.json`;
  the `ステータス` header merges are three cells on WBS (`AG:AI`), Risks and
  Decisions, and populated narrative rows read back with responsive heights
  such as 95–167px. The audit reports seven canonical tabs, no legacy tabs,
  and `merge_validation=PASS`; the post-publish shadow read-back also passed.
- Latest WBS Graph holiday-symbol audit: `scratch/management-audit/projection-20260804-135631.json`;
  weekend and configured holiday cells read back with no effective symbol and
  the expected `#FCE4EC` background; the graph keeps nine conditional rules,
  and the post-publish plan reports all management records unchanged.
- Latest August continuation audit: `scratch/management-audit/projection-20260804-140131.json`;
  the Graph read-back shows `■` on 2026-08-25 through 2026-08-28 and 2026-08-31,
  while 2026-08-29 and 2026-08-30 remain pink weekends without symbols.
- Excel export compatibility was corrected without replacing calculations with
  static values. WBS Graph timeline columns remain 56px wide, and every working
  day cell remains formula-backed. The symbol expression now uses legacy
  Excel-compatible `IF`/`OR` functions instead of `SWITCH`; holiday cells remain
  formula-backed empty strings. The direct Drive XLSX export contains formula
  elements and text caches such as `<v>■</v>`, and the rendered export shows
  dates without `####`. Task symbols use dark text on light-blue bars for
  visibility; pink non-working days remain symbol-free.
- Final formula/export audit: `scratch/management-audit/projection-20260804-142401.json`;
  `tabs=7`, `missing=0`, `legacy=0`, `merge_validation=PASS`. The management
  projection unit suite passes 45/45 tests, including formula preservation,
  holiday suppression and 56px timeline width.
- The reusable `management-google-sheets` skill now makes the XLSX verification
  mandatory whenever WBS Graph formulas or formats change: static graph values
  are forbidden, legacy-compatible `IF`/`OR` formulas are preferred, and a
  result that appears only after pressing Enter is treated as a verification
  failure. Final dark-symbol audit:
  `scratch/management-audit/projection-20260804-143804.json`; exported XLSX
  rendering confirms dark symbols, preserved formulas and no `####` matches.
- The v4 authoring and projection tests pass 59/59. The final live read-back
  confirms formulas in `基本情報` for WBS/risk/status/deadline counts and the
  two monthly estimate rows; the WBS estimate range returns text months and
  numeric 2.0/1.0 values. XLSX formula/error verification found zero matches
  for `#REF!`, `#DIV/0!`, `#VALUE!`, `#NAME?`, `#N/A` and `####`; LibreOffice
  rendering also shows the calculated 6/5 counts and 2.0/1.0人月 values.
- The `SMJ 南` naming correction publish completed with shadow read-back in
  8.76 seconds wall time; a separate live API read-back completed in 2.08
  seconds and
  returned `基本情報` reviewer `SMJ 小林、SMJ鎌田、SMJ 南` and stakeholder `S-007`
  name `SMJ 南`. The final seven-tab audit is
  `scratch/management-audit/projection-20260804-164948.json` with
  `missing=0`, `legacy=0` and `merge_validation=PASS`.
- The timed workflow measured authoring gate 0.24s, plan 4.41s, publish with
  shadow read-back 8.76s, live read-back 2.08s and audit 0.80s (about 16.3s
  for these commands). The observed 5m32s therefore was outside the measured
  Google Sheets publish/read-back path.

## Unresolved

- Backlog online task creation was not performed in this closeout. The raw draft
  remains draft-only; new issue keys and live metadata must be read back in a
  separate approved Backlog write.
- `格納先リンク` remains blank because no storage URL was verified for the new
  deliverables.
- `Ks様承認要否` is retained as required Backlog metadata in the raw draft and
  is intentionally not added as a column to `WBS.md`.

## Retrieval keys

`smj-ks-pos`, `WBSGAMEN-40`, `WBSGAMEN-44`, `WBSGAMEN-45`, `WBSGAMEN-46..54`,
`WBSGAMEN-266`, `KSNEWSYS-458`, `KSNEWSYS-568`, `DM-SPEC`, `DM-CONFIG`,
`DM-SELECT`, `DM-FACTORY`, `DM-STRATEGY`, `DM-INTEGRATION`,
`1cNCS6-y0tX7hkpZ2Y26UfVVPGtFOOxQOwd5AVfUgMpA`, `WBS / WBS`,
`WBS Graph / WBSグラフ`, `management-authoring`, `management-google-sheets`,
`wbsgamen-terminology-contract.json`
