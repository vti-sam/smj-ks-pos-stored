---
title: ARCH-HOST-01 connector process rationale correction
project: smj-ks-pos
type: architecture
status: archived
source:
  - Codex session 2026-07-14 ARCH-HOST-01 Basic Design correction
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
tags:
  - ARCH-HOST
  - basic-design
  - MAUI
  - OPOS
  - OCX
  - ActiveX
  - NamedPipe
scope: historical
captured_at: 2026-07-14
validity: historical_context
promote_to_knowledge: false
---

# Correction summary

The primary reason for separating the device connector from the tablet POS app is the runtime boundary between the .NET MAUI app and existing Windows device resources such as OPOS, OCX, ActiveX, and legacy DLLs. Responsibility separation is a consequence of this constraint, not the original reason for creating the process boundary.

The app-side device control layer selects and calls an app strategy. Connector-side components are not app strategies; they are host-internal implementations that invoke existing device resources. The app must not have a direct call path to those resources.

The current connector manages the target legacy devices in one process. It runs in the background without a business UI during normal operation and shows its technical control screen only in debug mode.

Future devices should be controlled directly from the terminal app, as on iPad, unless they require existing Windows device resources. The connector can be retired after all connector-backed legacy devices are no longer used.

The current design contract uses Named Pipe. Do not describe the former Window Message transport as part of the current design. Keep physical identifiers such as `Kill` or `ReStart` only in explicit implementation or protocol mapping positions.
