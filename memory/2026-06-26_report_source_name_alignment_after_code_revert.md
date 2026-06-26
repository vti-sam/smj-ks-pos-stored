---
title: Report source-name alignment after code revert
project: smj-ks-pos
type: gotcha
status: archived
source:
  - Codex session 2026-06-26 report alignment task
  - project-store/artifacts/reports/architecture/ARCH-03_タブレットPOS_コネクタサーバー構造設計書/
  - project-store/artifacts/reports/configuration-guides/CFG-01_タブレットPOS_デバイス制御層設定ファイル記載要領/
tags:
  - reports
  - docx
  - drawio
  - source-alignment
scope: historical
captured_at: 2026-06-26
validity: historical_context
promote_to_knowledge: false
---

# Notes

After the source code was reverted, report text must map back to the current source identifiers:

- Business term: `コネクタサーバー（Host）`
- Device control layer: `デバイス制御層（DeviceCtrl）`
- Source projects/configs: `TabetPos.DeviceCtrl`, `TabetPos.Host`, `device_controller_config.json`, `host_device_config.json`
- Host code names: `TabletHost`, `AppServer`, `ServerAppForm`, `HostProcessRuntime`
- Pipe names: `TabetPos.Host.Command`, `TabetPos.Host.Event`

Avoid stale generated names in reports: `デバイス接続サーバー`, `DeviceConnectionServer`, `DeviceControl`, `device_control_config.json`, `device_connection_server_config.json`.

When regenerating report assets, update both official outputs and draft outputs. CFG draft SVG files may remain stale if only the official drawio is exported; export the `.structured.drawio` files to both `.structured.svg` and the draft non-structured SVG/PNG names. DOCX text should be checked by extracting the internal XML, not only by searching Markdown.

`rtk find` had trouble with Japanese file names in this task; use `/usr/bin/find` for file enumeration if `rtk find` panics on non-ASCII paths.
