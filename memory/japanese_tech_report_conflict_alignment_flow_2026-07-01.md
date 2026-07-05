---
title: Japanese tech report conflict alignment flow
project: smj-ks-pos
type: runbook
status: archived
source:
  - Codex session 2026-07-01: extend japanese-tech-report skill for conflict/alignment meeting practice
  - skills/japanese-tech-report/SKILL.md
  - skills/japanese-tech-report/references/conflict-alignment-flow.md
tags:
  - japanese-tech-report
  - conflict-alignment
  - customer-meeting
  - architecture-boundary
scope: historical
captured_at: 2026-07-01
validity: historical_context
promote_to_knowledge: false
---

Updated `skills/japanese-tech-report/` to support customer/vendor conflict and alignment discussion practice.

New reference file:

- `skills/japanese-tech-report/references/conflict-alignment-flow.md`

The new flow forces conflict wording into this order:

1. Conclusion first
2. Misaligned understanding
3. Confirmed facts
4. Technical boundary
5. Risk if unchanged
6. VTI/current speaker view
7. Decision request
8. Next action

`SKILL.md` now routes customer/vendor conflict, scope mismatch, vendor handover, unclear ownership, acceptance responsibility, and architecture boundary alignment to this reference together with `connectors-risk-flow.md` and `spoken-softeners.md`.

The reference includes a reusable MAUI/common-view example for separating view common components from app foundation such as `BaseViewModel`, navigation, log, local storage, and device connector review responsibility.

Later in the same session, `skills/japanese-tech-report/SKILL.md` and `skills/japanese-tech-report/references/style-guide.md` were updated with a customer-facing terminology policy:

- Do not leave raw English words inside customer-facing Japanese sentences.
- Convert technical terms and proper nouns to natural Japanese terms or katakana transcription even when the term is not listed in a glossary.
- Keep raw English only for official code identifiers, API/class/file/path names, or official product/function names that must map directly to source or tools.
- Example mappings include `CollectionView` -> `一覧表示部品（コレクションビュー）`, `BaseViewModel` -> `基底ビューモデル`, `common view` -> `画面共通部品`, `navigation` -> `画面遷移`, and `local storage` -> `ローカル状態保持`.

On 2026-07-02, the skill agent metadata at `skills/japanese-tech-report/agents/openai.yaml` was updated so the default prompt also advertises internal senior briefings, conflict/alignment explanations, humble guidance requests, and Japanese/katakana terminology instead of raw English.
