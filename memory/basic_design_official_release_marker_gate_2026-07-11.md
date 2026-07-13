---
title: Basic Design official release marker gate
project: smj-ks-pos
type: decision
status: archived
source:
  - User decision 2026-07-11
  - AGENTS.md
  - skills/doc-authoring/basic-design-authoring/SKILL.md
  - skills/doc-authoring/basic-design-authoring/scripts/basic_design_gate.py
tags:
  - Basic Design
  - customer deliverable
  - quality gate
  - release readiness
scope: historical
captured_at: 2026-07-11
validity: historical_context
promote_to_knowledge: false
---

# Decision

Official customer-facing design documents must not contain TODO markers, open questions, undecided or pending states, internal-note headings, or confirmation/open-item sheets. Unresolved work is managed outside the official deliverable and only the decided result is reflected in the relevant design section.

# Enforcement

The workspace rule, Basic Design authoring skill, checklist, template rules, shared customer quality gate, and strict Basic Design gate were synchronized. The gate checks the complete Markdown, including fenced blocks, for ASCII markers and Japanese pending-state markers. Internal memo headings and table labels are rejected while valid words such as `メモリ管理` are not treated as internal notes.

# Verification

The ARCH-HOST-01 official document and reusable template pass Markdown lint and the strict ARCH-HOST gate. Pattern self-checks confirm the new forbidden markers are detected without the `メモリ管理` false positive.
