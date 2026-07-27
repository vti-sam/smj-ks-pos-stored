---
title: ARCH-HOST-01 aligns supported device models with K's verified equipment
project: smj-ks-pos
type: decision
status: archived
source:
  - Customer email from SMJ Kamata dated 2026-07-27
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
tags:
  - device-connector
  - RZ-4DP3
  - UP-J46DW3
  - OCX
scope: historical
captured_at: 2026-07-27
validity: historical_context
promote_to_knowledge: false
---

# Decision

SMJ clarified that customer-facing supported-device documentation must list only the models that K's will actually use and can verify. Models merely supported by an OCX must not be listed as supported equipment.

ARCH-HOST-01 version 0.3.8 therefore identifies the customer display as `RZ-4DP3` and the drawer as `UP-J46DW3`. The OCX registration values `SHARPRZ4DP1B` and `SHARPUPJ36DW3` were removed from the customer-facing model and configuration descriptions in this deliverable.

This documentation correction does not change the Device Connector source code, runtime configuration, business processing, or test cases.
