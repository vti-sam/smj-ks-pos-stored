---
title: ARCH-HOST-01 three-diagram D2 and Excel flow generation
project: smj-ks-pos
type: architecture
status: archived
source:
  - Codex session 2026-07-10 ARCH-HOST-01 diagram rendering
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
tags:
  - ARCH-HOST-01
  - D2
  - Excel
  - Office Script
scope: historical
captured_at: 2026-07-10
validity: historical_context
promote_to_knowledge: false
---

# Result

Generated reviewed D2 sources, SVG/PNG previews, and fresh Excel Office Script pairs under the document bundle `draft/` folder for:

- `5.1 全体構成図`
- `6.1 デバイス操作要求処理フロー図`
- `9.1 通常運用図`

The final D2-to-Office-Script fidelity audits passed with `24/24 nodes and 23/23 edges`, `7/7 nodes and 9/9 edges`, and `12/12 nodes and 13/13 edges`. The 5.1 source was flattened so only the four numbered responsibility areas are leaf containers and therefore only those four areas become Excel merged-cell lane tables. All six Office Scripts passed their layout or label validator. The peripheral numbering in 5.1 was verified as `⑰〜⑲` after visual preview inspection.

For the final 5.1 layout, the four numbered responsibility areas remain left-to-right. The device connector content is arranged as one vertical sequence from startup/control through command processing, device implementation, event publishing, and the event pipe. ELK was selected over Dagre for the regenerated SVG and Office Scripts because it produced the more balanced four-lane composition while preserving the same 24-node/23-edge fidelity.
