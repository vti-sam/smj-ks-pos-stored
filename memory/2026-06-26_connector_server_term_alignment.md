---
title: Connector server terminology alignment in report artifacts
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session on 2026-06-26
  - project-store/artifacts/reports/
tags:
  - reports
  - terminology
  - connector-server
scope: historical
captured_at: 2026-06-26
validity: historical_context
promote_to_knowledge: false
---

Report artifacts were aligned to use `コネクタサーバー` as the main Japanese term instead of `デバイス接続サーバー`.

Use `コネクタサーバー（Host）` only when mapping to code or diagrams needs the `Host` alias. Do not reintroduce `デバイス接続サーバー` in report text, drawio labels, SVG output, DOCX display text, or official report artifact names.

Important touched areas:

- `project-store/artifacts/reports/architecture/ARCH-01_タブレットPOS_ソフトウェア構造設計書/`
- `project-store/artifacts/reports/architecture/ARCH-02_タブレットPOS_端末アプリケーション構造設計書/`
- `project-store/artifacts/reports/architecture/ARCH-03_タブレットPOS_コネクタサーバー構造設計書/`
- `project-store/artifacts/reports/configuration-guides/CFG-01_タブレットPOS_デバイス制御層設定ファイル記載要領/`
- `project-store/artifacts/reports/program-specs/PS-01_タブレットDCS_コネクタサーバー制御方式/`

Verification performed during the session:

- No `デバイス接続サーバー` path remained under `project-store/artifacts/reports`.
- No `デバイス接続サーバー` text remained in Markdown, drawio, YAML, or SVG report sources.
- DOCX text extraction for ARCH-01, ARCH-02, ARCH-03, and CFG-01 returned zero occurrences of `デバイス接続サーバー`.

Visual DOCX rendering could not be completed in the local environment because LibreOffice failed to load `liblcms2.2.dylib`. Text extraction and diagram image checks were still completed.
