---
title: ARCH-HOST-01 Design Doc Gate And Backlog Trace
project: smj-ks-pos
type: lesson
status: archived
source:
  - Codex session 2026-07-07
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
tags:
  - arch-host-01
  - design-doc-md
  - backlog
  - wbs-ui-kiban
scope: historical
captured_at: 2026-07-07
validity: historical_context
promote_to_knowledge: false
---

Updated ARCH-HOST-01 to pass `skills/design-doc-md/scripts/design_md_lint.py --kind basic-design`.

Backlog context:

- User provided WBS_UI_KIBAN-209, WBS_UI_KIBAN-210, WBS_UI_KIBAN-211 as context for device connector basic design.
- Current registry API keys and Chrome session could not read `WBS_UI_KIBAN`; Backlog returned project/page not found.
- The document therefore uses the issue keys and user-provided titles only as trace context, without inventing ticket body details.

Document changes:

- Added H1 identity.
- Moved `02_概要` and `03_対象範囲` to match `design-doc-md` basic design contract.
- Added Backlog trace rows in cover and related documents.
- Reworked open issues with stable `Q-HOST-*` IDs, assumptions, impact, owner, deadline boundary, tracking issue, and status.
- Re-rendered Excel through `skills/basic-design-excel/`.
