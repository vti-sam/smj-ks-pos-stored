---
title: ARCH-HOST-01 semantic diagram coverage
project: smj-ks-pos
type: decision
status: stale
source:
  - User decision 2026-07-11
  - ARCH-HOST-01 version 0.2.25
  - skills/doc-authoring/basic-design-authoring/references/semantic-coverage.md
tags:
  - Basic Design
  - Mermaid
  - semantic coverage
  - retry
  - error handling
scope: historical
captured_at: 2026-07-11
validity: historical_context
promote_to_knowledge: false
---

# Result

Superseded by `project-store/memory/arch_host01_three_mermaid_integrated_operation_2026-07-11.md`, which records the later three-diagram and 23-sheet design.

ARCH-HOST-01 version 0.2.25 now exposes the operational semantics that were previously available only in detail tables. The detailed architecture shows command connection retry/no-resend and one-second event reconnection. The device-operation flow distinguishes application-side decision failure, communication failure, and a returned device-connector failure response. The lifecycle flow shows the 500-millisecond HealthCheck loop within ten seconds, device startup retry, ownership, delayed shutdown, and forced termination.

Exact rules remain in `図の補足` and the paired `_02` explanation so Mermaid nodes stay readable. Four Mermaid Dagre SVGs and the 24-sheet official Excel workbook were regenerated and visually checked.

# Reusable Skill Rule

Basic Design authoring now requires an internal semantic coverage matrix built from the whole document. It maps actors, boundaries, main/asynchronous paths, decisions, retry/reconnect, timeout/delay, no-resend, ownership, failure classification, fallback, shutdown, and recovery to the owning Mermaid, `図の補足`, and detail/table.

The strict gate emits semantic coverage warnings for process-flow and lifecycle pairs when operational semantics or numeric values appear only in `_02`. Review-ready documents must resolve those warnings. The rule deliberately keeps overview diagrams simple and moves operational detail to the diagram that owns the behavior.

# Verification

Markdown lint, strict ARCH-HOST gate with zero semantic warnings, skill validation, semantic warning self-test, rule lint, SVG XML validation, workbook marker/formula scans, workbook ZIP integrity, and visual review of all four SVGs and all 24 workbook sheets passed.
