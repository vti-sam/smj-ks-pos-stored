---
title: ARCH-HOST sheet block mapping rule
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session 2026-07-08
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
tags:
  - arch-host
  - basic-design
  - sheet-mapping
  - business-flow-excel
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

For ARCH-HOST-01 overview/architecture rendering, block names must match the document exactly. Do not invent main block names.

Main blocks:

- `タブレットPOSアプリ`
- `デバイス制御層（DeviceCtrl）`
- `デバイスコネクタ（Host）`
- `周辺機器`

The Markdown source now includes `5.2 構成ブロックと対応シート`. Before rendering overview Excel, verify every sheet from `22_Excelシート構成` appears in that mapping. Extra mappings are allowed; missing sheets are not.
