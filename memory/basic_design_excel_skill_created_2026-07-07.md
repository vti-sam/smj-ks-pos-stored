---
title: Basic Design Excel Skill Created
project: smj-ks-pos
type: lesson
status: archived
source:
  - Codex session 2026-07-07
  - skills/basic-design-excel/SKILL.md
  - skills/basic-design-excel/scripts/basic_design_render.py
tags:
  - basic-design-excel
  - program-spec-excel-layout
  - excel-render
  - device-connector
scope: historical
captured_at: 2026-07-07
validity: historical_context
promote_to_knowledge: false
---

Created `skills/basic-design-excel/` for Japanese 基本設計書 / architecture basic design Excel output.

Decision:

- Do not modify or misuse `skills/program-spec-excel/` for basic design documents, because that skill has a strict class/program-spec contract.
- Use `skills/basic-design-excel/scripts/basic_design_render.py` for sheet-oriented Markdown such as `## 00_表紙`, `## 08_機能一覧`, and `## 18_エラー処理`.
- Keep layout philosophy aligned with `program-spec-excel`: Meiryo, GRID base columns, monochrome Japanese style, merged table spans, wrapped text, XML cleanup, and report-bundle `draft/` output.
- Keep class names in mapping columns like `関連クラス`; the main basic design content should remain responsibility, input/output, error handling, settings, logs, and test viewpoints.
