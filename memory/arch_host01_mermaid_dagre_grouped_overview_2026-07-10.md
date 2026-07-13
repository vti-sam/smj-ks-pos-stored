---
title: ARCH-HOST-01 grouped Mermaid Dagre overview
project: smj-ks-pos
type: architecture
status: archived
source:
  - Codex session 2026-07-10 ARCH-HOST-01 Mermaid review
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
tags:
  - ARCH-HOST-01
  - Mermaid
  - Dagre
  - Basic Design
scope: historical
captured_at: 2026-07-10
validity: historical_context
promote_to_knowledge: false
---

# Result

ARCH-HOST-01 version 0.2.20 groups the 5.1 overview into three top-level responsibility areas: tablet POS application, device connector, and peripheral devices. The application responsibility contains separate application-layer and device-control functional groups. The device connector contains startup/communication management, command/device management, and asynchronous-event groups.

The Mermaid source explicitly uses Dagre, keeps the application layer above device control with a bottom-to-top parent layout constraint, and distinguishes primary request/response, lifecycle/control, device control, configuration reference, and asynchronous event connectors using the colors documented in the legend. A concise memo gives the reading order. The Basic Design skill, checklist, and template rules now require responsibility-first grouping, functional subgroups, a visually dominant primary path, documented secondary paths, and no decorative imagery used as a substitute for diagram simplification.

The source Mermaid rendered successfully with Mermaid CLI 11.12.0. Markdown lint, the ARCH-HOST strict Basic Design gate, and rule lint passed.
