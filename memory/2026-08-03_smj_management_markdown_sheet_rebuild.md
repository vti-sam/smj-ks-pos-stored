---
title: SMJ management Markdown source and Google Sheets rebuild
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
  - project-store/management/.sync-state.json
  - skills/project-ops/management-authoring/scripts/management_authoring_gate.py
  - skills/project-ops/management-google-sheets/scripts/management_sheets_sync.py
tags:
  - smj-ks-pos
  - management
  - markdown
  - google-sheets
  - wbs
scope: historical
captured_at: 2026-08-03
validity: historical_context
promote_to_knowledge: false
---

# SMJ management Markdown source and Google Sheets rebuild

## Outcome

SMJ KS POS management records now use the five Markdown tables as the canonical
project records. The Google Sheet is a regenerated projection with a derived
WBS Graph tab. Legacy management YAML and the obsolete management override were
removed after the candidate passed the authoring gate. Three old PM-control
tooling decisions were excluded from `DECISIONS.md`; eight project decisions
remain.

## Evidence

- Markdown authoring gate passed with 27 WBS, 10 risks, 8 decisions, 11
  stakeholders and 10 communications records.
- `management_sheets_sync rebuild --apply --confirm-rebuild` completed with
  shadow read-back and swap; the final Sheet has seven canonical tabs and no
  legacy or shadow tabs.
- Post-publish read-back matched every stable ID and canonical field. The
  source hashes are recorded in `management/.sync-state.json`.
- Projection audit passed merge validation. Gridlines are hidden, WBS Graph
  formulas are present, and a value scan found no `#REF!`, `#VALUE!`,
  `#DIV/0!`, `#N/A` or replacement characters.

## Unresolved

No unresolved migration issue remains. A future Sheet-to-Markdown change still
requires an explicit `management-google-sheets import` command and review.

## Retrieval keys

`smj-ks-pos`, `EST-GANTT-001..027`, `R-001..R-010`, `DEC-2026-05-21`,
`DEC-2026-05-23`, `DEC-2026-05-28`, `SH-001..SH-011`, `COMM-001..COMM-010`,
`1cNCS6-y0tX7hkpZ2Y26UfVVPGtFOOxQOwd5AVfUgMpA`, `WBS / WBS`,
`WBS Graph / WBSグラフ`
