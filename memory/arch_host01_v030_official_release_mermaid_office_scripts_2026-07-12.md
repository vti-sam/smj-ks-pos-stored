---
title: ARCH-HOST-01 v0.3.0 official release and Mermaid Office Scripts
project: smj-ks-pos
type: architecture
status: archived
source:
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
  - Codex session 2026-07-12
tags:
  - ARCH-HOST-01
  - Basic Design
  - Mermaid
  - Office Script
  - official release
scope: historical
captured_at: 2026-07-12
validity: historical_context
promote_to_knowledge: false
---

# Result

The reviewed draft `v0.3.0` was promoted to the official Markdown and Excel pair in the ARCH-HOST-01 report bundle. The official workbook contains 15 sheets and uses the current B:Z table-layout pipeline.

Three canonical Mermaid-based Excel Flow script pairs were generated directly from the official Markdown without D2:

1. `5.1.1 システムコンテキスト図`: 3/3 shapes and 3/3 edges.
2. `5.1.2 論理構成図`: 26/26 shapes and 19/19 edges.
3. `6.1 運用シナリオ図`: 33/33 shapes and 41/41 edges.

Each diagram has a layout Office Script, a show-labels Office Script, and a reviewed Mermaid SVG. Superseded official artifacts named `全体概要図`, `詳細構成図`, and `通常運用フロー図` were removed so the bundle matches the current Markdown headings. The `draft/` history remains unchanged.

# Verification

- Markdown lint, generic Basic Design gate, and ARCH-HOST profile gate passed.
- Excel render validation, ZIP integrity, formula-error scan, and visual review of all 15 sheets passed.
- All six Office Scripts passed the layout/label validators.
- Mermaid audits matched source and rendered shape/edge counts for all three diagrams.
