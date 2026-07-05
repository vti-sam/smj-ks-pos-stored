---
title: Backlog WBS markdown description format
project: smj-ks-pos
type: gotcha
status: archived
source:
  - Codex session 2026-07-02 Backlog WBS_UI_KIBAN device connector ticket formatting
tags:
  - backlog
  - wbs
  - markdown
  - device-connector
scope: historical
captured_at: 2026-07-02
validity: historical_context
promote_to_knowledge: false
---

For customer Backlog project `WBS_UI_KIBAN`, the project API returned `textFormattingRule: markdown`.

When updating issue descriptions in this project, use Backlog Markdown headings such as `## 作業内容` with a half-width space after `##`, then one blank line before content. Do not use Backlog notation headings such as `* 見出し` for this project.

The 2026-07-02 formatting fix for `WBS_UI_KIBAN-209`, `WBS_UI_KIBAN-210`, and `WBS_UI_KIBAN-211` updated only `description`, using `##` section headings, blank lines after headings, and `---` separators. Read-back verified heading format, dates unchanged, and no mojibake markers.
