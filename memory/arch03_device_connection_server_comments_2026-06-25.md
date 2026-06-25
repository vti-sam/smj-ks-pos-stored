---
title: ARCH-03 device connection server customer comments update
project: smj-ks-pos
type: architecture
status: archived
source:
  - Codex session 2026-06-25, ARCH-03 report update after customer comments
  - project-store/artifacts/reports/architecture/ARCH-03_タブレットPOS_デバイス接続サーバー構造設計書/ARCH-03_タブレットPOS_デバイス接続サーバー構造設計書.md
tags:
  - ARCH-03
  - device-connection-server
  - DeviceCtrl
  - report
scope: historical
captured_at: 2026-06-25
validity: historical_context
promote_to_knowledge: false
---

# ARCH-03 update notes

Customer comments were addressed by keeping the code-facing `Host` mapping but using Japanese terms as primary labels:

- `デバイス制御層（DeviceCtrl）`
- `デバイス接続サーバー（Host）`

The document and diagram were updated narrowly. No source code rename was performed.

Key decisions captured in ARCH-03:

- `デバイス接続サーバー（Host）` starts automatically with the Tablet POS app lifecycle during normal operation.
- Start/Stop UI is limited to debug/developer use and is not shown in normal operation.
- Host-side implementation is described as an internal implementation for existing device resources, not as the same role as the app-side device control strategy.
- Initial Host route is only for continuing current POS devices. New device models should generally use direct control, and no new legacy device should be added to Host.
- After target devices such as RZ-476 are no longer used, Host can be treated as unnecessary material.

Verification performed:

- Draw.io XML parsed successfully.
- SVG/PNG diagram exported from the updated drawio.
- DOCX rebuilt from markdown.
- Microsoft Word PDF render produced 12 pages for visual QA because bundled LibreOffice headless was blocked by a missing `little-cms2` dylib.
- Searches confirmed old terms such as `旧方式`, `KsClient`, `旧DLL`, `TabletPOSPipeMessage`, and `old_dll` were removed from the updated report sources/DOCX.
