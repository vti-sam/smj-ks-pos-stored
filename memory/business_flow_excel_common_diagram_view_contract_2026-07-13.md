---
title: Business Flow Excel common diagram view contract
project: smj-ks-pos
type: decision
status: archived
source:
  - skills/doc-authoring/business-flow-excel/references/common-diagram-view-contract.md
  - skills/doc-authoring/business-flow-excel/resources/common-diagram-view.office-script.ts
tags:
  - business-flow-excel
  - Office Scripts
  - Mermaid
  - connector direction
  - visual contract
scope: historical
captured_at: 2026-07-13
validity: historical_context
promote_to_knowledge: false
---

The reusable diagram view contract now separates direction from semantic color. `主処理` is a solid blue one-way relationship and must not include `同期応答` in its meaning. Request plus synchronous response uses the separate solid blue bidirectional `コマンド通信` relationship. Device control plus returned result uses solid purple bidirectional `実機制御`.

Lifecycle remains solid green and one-way. Asynchronous events, configuration references, and error routes remain dashed and one-way, using orange, gray, and red respectively. Operational scenarios do not use bidirectional shorthand.

The skill now includes a runnable `common-diagram-view.office-script.ts` preview with the shared shape palette, 2pt native borders/connectors, Meiryo UI typography, semantic arrowheads, and the pale-yellow 70%-transparent explanatory callout style.

The same resource is now injected into every generated self-contained Office Script as the common handler source. Generated label scripts sort persisted shape-name IDs as strings, rescan the worksheet shape array by ID, and derive connector-label/comment placement order deterministically from each ID. The validator rejects Office Scripts API use inside `Array.sort`, sortable records that alias `ExcelScript.Shape`, and layout scripts that apply arrowheads outside `applyConnectorView`.

The label pipeline now requires full review-overlay coverage. Every edge receives an `edge_label_<id>` overlay containing its ID and Mermaid label when present; unlabeled edges still show the ID. Every component receives a `shape_comment_<id>` callout containing its ID and curated description or alt-text-title fallback. Runtime counters must equal the sorted source edge/shape ID counts, and placement failure throws an error listing missing IDs instead of silently deleting overlays.

Visible overlay text was refined after review: labeled edges show only their Mermaid label, while unlabeled edges remain native connectors without visible textboxes. Internal edge IDs are never used as customer-visible fallback text. Shape comments show only their curated description or alt-text-title fallback; internal names such as `[shape_d511_DEVICE]` remain in `Shape.name` and placement logic but are not displayed to reviewers.
