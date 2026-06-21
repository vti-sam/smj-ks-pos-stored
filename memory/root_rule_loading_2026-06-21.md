---
title: Root rule loading and compression policy
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session 2026-06-21
tags:
  - rules
  - agents
  - rule-loading
  - project-store
scope: historical
captured_at: 2026-06-21
validity: historical_context
promote_to_knowledge: false
---

# Root rule loading and compression policy

- Root `AGENTS.md` should stay as the workspace-level routing and boundary map.
- Folder-specific details stay in the nearest subtree `AGENTS.md`.
- Agents should not read every `AGENTS.md` by default. They should read root first, then the nearest relevant folder rule, and only scan all rule files for cross-cutting tasks such as bootstrap, sync, routing, registry, or rule/folder boundary changes.
- Root rule now includes a `Rule Loading` section and compresses management, knowledge, and memory details by pointing to folder rules.
