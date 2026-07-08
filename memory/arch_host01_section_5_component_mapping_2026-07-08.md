---
title: ARCH-HOST-01 section 5 component mapping convention
project: smj-ks-pos
type: architecture
status: archived
source:
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
  - skills/basic-design/resources/arch-host-basic-design-template.md
tags:
  - arch-host-01
  - basic-design
  - section-5
  - related-sheet
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

ARCH-HOST-01 section 5 mapping was corrected so `5.1 全体構成図` and `5.2 構成要素` use the same top-level parenthesized numbers.

Current convention:

- `5.1` large diagram blocks use top-level parenthesized numbers such as `（1） タブレットPOSアプリ`, `（2） DeviceCtrl`, `（3） デバイスコネクタ（Host）`, and `（4） 周辺機器`.
- `5.2` top-level parenthesized numbers must match those large `5.1` blocks one-to-one.
- Smaller diagram nodes in `5.1` use circled-number labels such as `② 通信受付部` inside the matching parent block. The parent block supplies the `（3）` part of the mapping.
- Matching `5.2` details are written as indented circled-number subitems under the matching top-level block, not as additional top-level components.
- Each indented circled-number subitem has its own `関連シート:` line.
- A top-level parenthesized block only needs `関連シート:` when it has no indented subitems.

Updated enforcement:

- `skills/basic-design/references/basic-design-template-rules.md`
- `skills/basic-design/references/basic-design-checklist.md`
- `skills/basic-design/resources/arch-host-basic-design-template.md`
- `skills/design-doc-md/references/basic-design-md.md`
- `skills/basic-design/scripts/basic_design_gate.py`

Verification passed:

- `rtk python skills/design-doc-md/scripts/design_md_lint.py ... --kind basic-design`
- `rtk python skills/basic-design/scripts/basic_design_gate.py ... --profile arch-host`
- `rtk uv run --with openpyxl python skills/basic-design-excel/scripts/basic_design_render.py --validate-only ...`
