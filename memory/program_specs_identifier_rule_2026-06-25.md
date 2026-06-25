---
title: Program specs identifier rule update 2026-06-25
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session task on program specs Japanese wording and code identifier preservation
  - project-store/artifacts/reports/program-specs/AGENTS.md
tags:
  - program-specs
  - documentation
  - identifiers
scope: historical
captured_at: 2026-06-25
validity: historical_context
promote_to_knowledge: false
---

# Program specs identifier rule update

Program specs now use a local rule under `project-store/artifacts/reports/program-specs/AGENTS.md`.

Key decision:

- Code-facing identifiers such as class names, method names, enum values, signatures, types, physical parameter names, field names, and property names remain unchanged from source code.
- Explanatory fields such as `概要`, `論理名`, `処理内容`, and `備考` should use Japanese prose.
- When a Japanese description needs to map to a code identifier, use the form `日本語（CodeIdentifier）`.
- Standard mapping terms such as `Host`, `DeviceCtrl`, `OPOS`, `OCX`, and `Named Pipe` can remain when they link the report to diagrams or source code.

The current DCS Host program specs under `project-store/artifacts/reports/program-specs/PS-01_タブレットDCS_デバイス接続サーバー制御方式/` were updated narrowly to follow this rule. Code identifiers and signatures were not renamed.
