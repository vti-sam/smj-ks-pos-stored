---
title: Basic Design Authoring overview-detail diagram pattern
project: smj-ks-pos
type: lesson
status: archived
source:
  - Codex session 2026-07-10 Basic Design Mermaid refinement
  - skills/doc-authoring/basic-design-authoring/SKILL.md
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
tags:
  - Basic Design
  - Mermaid
  - SIer
  - architecture
scope: historical
captured_at: 2026-07-10
validity: historical_context
promote_to_knowledge: false
---

# Result

The end-to-end Japanese Basic Design skill was renamed from `basic-design` to `basic-design-authoring`. Its folder, frontmatter name, agent metadata, commands, and all active internal references were migrated to `skills/doc-authoring/basic-design-authoring/`.

Dense architecture sections now use a Japanese SIer-style two-level presentation in the same `_01` sheet. `全体概要図` appears first and contains only the top-level responsibility areas and primary path. `詳細構成図` follows with numbered components, functional groups, lifecycle/configuration/device/asynchronous paths, and synchronized legend content. Detailed explanations stay in the paired `_02` sheet.

ARCH-HOST-01 version 0.2.21 applies the pattern to section 5.1. The overview has three blocks; the detailed diagram retains components ① through ⑲. Both Mermaid Dagre diagrams rendered successfully. Markdown lint, the ARCH-HOST strict gate, skill validation, and rule lint passed.
