---
title: ARCH-01 and CFG-01 device connection server alignment
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session 2026-06-25
  - project-store/artifacts/reports/architecture/ARCH-01_タブレットPOS_ソフトウェア構造設計書/
  - project-store/artifacts/reports/configuration-guides/CFG-01_タブレットPOS_デバイス制御層設定ファイル記載要領/
tags:
  - reports
  - architecture
  - configuration
  - device-connection-server
scope: historical
captured_at: 2026-06-25
validity: historical_context
promote_to_knowledge: false
---

ARCH-01 and CFG-01 were aligned to the current device connection server naming on 2026-06-25.

Use Japanese business terms as the primary wording and keep code aliases in parentheses where needed:

- デバイス制御層（DeviceCtrl）
- デバイス接続サーバー（Host）

Current config and pipe names used in the documents:

- `device_control_config.json`
- `device_connection_server_config.json`
- `TabetPos.DeviceConnectionServer.Command`
- `TabetPos.DeviceConnectionServer.Event`

DOCX cover titles should stay clean and must not fall back to raw Markdown filenames. The source folder/file convention under `project-store/artifacts/reports` remains unchanged for the main report bundle and main documents.

CFG-01 child Draw.io files were renamed to the same report-style convention as the architecture diagrams:

- `CFG-01_タブレットPOS_デバイス制御層設定ファイル起動時読込フロー.drawio`
- `CFG-01_タブレットPOS_デバイス接続サーバー設定ファイル起動時読込フロー.drawio`

These two CFG-01 flow diagrams were later regenerated with `skills/drawio-flow-chart` structured YAML. The source review/YAML files are kept under the bundle `draft/` directory. Error conditions are shown inside the red error node rather than as Draw.io edge labels because Draw.io desktop export does not preserve the structured renderer's manual label positions.

For CFG-01 configuration flow diagrams, `draft/<diagram_name>.review.md` is the content review source, YAML is only the render/layout source derived from that Markdown, and `device_control_config.json` / `device_connection_server_config.json` are the real configuration filenames shown inside the diagram, not diagram-source artifact names.

On 2026-06-26, ARCH-03 was also normalized to the same current naming set. Do not use the old names `device_controller_config.json`, `host_device_config.json`, `TabetPos.Host.Command`, or `TabetPos.Host.Event` in current report text. Use the Japanese business terms first and keep `Host` / `DeviceCtrl` as aliases for mapping to code and diagrams.

LibreOffice DOCX visual rendering was blocked in this session by missing local `little-cms2` dependency, so verification used DOCX text extraction plus SVG/PNG diagram inspection.
