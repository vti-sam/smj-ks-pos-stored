---
title: Business Flow Excel selective shape comments from alt text
project: smj-ks-pos
type: decision
status: archived
source:
  - User decision 2026-07-11
  - skills/doc-authoring/business-flow-excel/SKILL.md
  - skills/doc-authoring/business-flow-excel/scripts/generate_office_script.py
tags:
  - Office Script
  - Excel shape
  - alt text
  - accessibility
  - diagram comment
scope: historical
captured_at: 2026-07-11
validity: historical_context
promote_to_knowledge: false
---

# Kết quả

Business Flow Excel layout script now assigns a concise alternative-text title to every generated component shape. It assigns a non-empty alternative-text description only when a conservative heuristic identifies a technical identifier, technical control concept, long label, or complex decision.

The show-labels script keeps connector labels and additionally creates `shape_comment_` overlays only from non-empty shape descriptions. It tries the right, left, bottom, and top sides, avoids existing non-line shapes including unrelated shapes without alternative text, and cascades to the right when nearby positions are occupied.

# Comment style

- Rounded rectangle.
- Fill `#FFF2CC` with 15% transparency.
- Border `#BF9000`, 2pt.
- Text `#404040`, Meiryo UI 9pt.
- Always brought to front and remains editable.

The ARCH-HOST-01 document-wide `汎用` legend and the reusable template contain the same comment convention. The official document was updated to version 0.2.27, and the official workbook and Excel baseline were updated through artifact-tool with visual verification.

# Verification

The sample preserved 33/33 shapes and 31/31 edges. All 28 generated component shapes received alt-text titles; 12 received selective descriptions/comments. Both generated Office Scripts and the label template passed the Office-Script validator. Skill quick validation, skill-quality evaluation, Basic Design gates, workbook formula scans, ZIP integrity, visual checks, rule lint, and workspace verification passed.
