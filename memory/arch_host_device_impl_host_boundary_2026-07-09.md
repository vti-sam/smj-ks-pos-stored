---
title: ARCH-HOST 5.1 device implementation boundary
project: smj-ks-pos
type: gotcha
status: archived
source:
  - Codex session 2026-07-09 ARCH-HOST-01 5.1 diagram correction
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
  - scratch/d2-5-1-preview/arch_host_5_1_preview_order.d2
tags:
  - ARCH-HOST
  - basic-design
  - diagram
  - ReplyDevice
  - OPOS
  - OCX
  - DLL
scope: historical
captured_at: 2026-07-09
validity: historical_context
promote_to_knowledge: false
---

# Note

For ARCH-HOST-01 section 5.1, `個別デバイス実装` belongs inside the Host boundary. OPOS, OCX, DLL, shared memory, and request/response file linkage are Host-side implementation resources, not separate blocks in `周辺機器`.

`周辺機器` should contain only physical devices, initially:

- RT-300釣銭機
- SHARPキャッシュドロア
- SHARPカスタマーディスプレイ

Do not draw a direct DLL/OCX/device-implementation arrow back to the tablet POS app. The synchronous command result returns through DeviceCtrl <-> Host command pipe. `ReplyDevice` is generated/packaged in Host and sent one-way through the Host event pipe to DeviceCtrl/app-side event handling.

In diagrams, a two-way arrow is acceptable only for DeviceCtrl <-> Host command request / synchronous response. Event notification should be Host -> DeviceCtrl/app one-way.
