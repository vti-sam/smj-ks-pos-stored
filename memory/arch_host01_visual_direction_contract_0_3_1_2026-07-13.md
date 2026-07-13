---
title: ARCH-HOST-01 visual direction contract version 0.3.1
project: smj-ks-pos
type: decision
status: archived
source:
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.xlsx
tags:
  - ARCH-HOST-01
  - visual contract
  - connector direction
  - Excel
  - Markdown
scope: historical
captured_at: 2026-07-13
validity: historical_context
promote_to_knowledge: false
---

ARCH-HOST-01 was updated from version `0.3.0` to `0.3.1` to state explicitly that arrow direction represents relationship direction while color and dash style represent relationship meaning.

Only command request plus synchronous response and device control plus returned result use bidirectional relationships. Main processing, lifecycle, asynchronous events, configuration references, and error branches remain one-way.

The official 15-sheet workbook was regenerated atomically from Markdown. Read-back confirmed version `0.3.1` on the cover and revision history and confirmed all seven legend rows on `05_全体構成_01`. All three layout scripts and all three label scripts were regenerated from the manifest and passed the Office Script validator with the shared common handlers.
