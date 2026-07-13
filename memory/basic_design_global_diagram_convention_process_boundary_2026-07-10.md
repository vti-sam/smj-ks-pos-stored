---
title: Basic Design global diagram convention and process boundary
project: smj-ks-pos
type: lesson
status: archived
source:
  - Codex session 2026-07-10 ARCH-HOST-01 diagram convention review
  - skills/doc-authoring/basic-design-authoring/SKILL.md
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
tags:
  - Basic Design
  - Mermaid
  - process boundary
  - visual convention
scope: historical
captured_at: 2026-07-10
validity: historical_context
promote_to_knowledge: false
---

# Result

ARCH-HOST-01 version 0.2.22 moves `汎用` before the first Mermaid and defines it as the document-wide visual convention. Every Mermaid now reuses the same responsibility colors, component/decision/error shapes, and connector semantics for synchronous IPC, lifecycle/control, device control, configuration reference, asynchronous events, and abnormal paths.

The architecture overview and detailed diagram explicitly show that the tablet POS application and device connector run as separate processes on the same Windows terminal. Cross-process request/response uses named pipes, and the memo/detail text states that application components do not directly call device-connector internals. The request flow and lifecycle diagram also label the responsible process and use the common styles.

The `basic-design-authoring` skill, checklist, template rules, sample template, strict ARCH-HOST gate, design Markdown reference, Basic Design Excel skill, and Excel Markdown contract were synchronized. The strict gate now checks that the common legend appears before the first Mermaid, states document-wide scope, includes the process/IPC boundary, and that every ARCH-HOST diagram sheet applies class and link styles.

All four Mermaid diagrams rendered successfully. Source and template Markdown lint, strict gate, Excel validate-only, skill validation, Python compile, and rule lint passed.
