---
title: Report Document ID Rule Update 2026-06-21
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session 2026-06-21 document ID normalization task
tags:
  - reports
  - document-id
  - program-spec
  - testcase
scope: historical
captured_at: 2026-06-21
validity: historical_context
promote_to_knowledge: false
---

# Report Document ID Rule Update

2026-06-21 に report artifact の文書IDルールを整理した。

- Program Spec は `POS-*` ではなく `PS-<domain>-<seq2>` を使う。`POS` は製品/domain であり、文書種別ではないため。
- Host / Local State / Monitoring の Program Spec は `PS-HOST-*`, `PS-STATE-*`, `PS-MON-*` に統一した。
- Testcase は document ID を `TC-<phase>-<domain>-<seq2>`、row ID を `<phase>-<domain>-<seq3>` に統一した。
- Testcase の `IT` は `結合テスト` の phase code として扱い、Information Technology の意味では使わない。
- Bundle folder は複数文書を束ねる場合のみ domain を省略できる。例: `TC-UT-01_タブレットPOS_単体テストケース/`。
- `project-store/artifacts/reports/AGENTS.md`, `skills/program-spec-excel/`, `skills/program-spec-from-code/`, `skills/testcase-excel/` に rule を反映し、Program Spec / Testcase validator でも ID を検査するようにした。

検証:

- Program Spec Markdown 33 件は `japanese-class` profile で validation OK。
- Program Spec Excel 33 件は再renderし、5 sheet 構成を read-back 済み。
- Testcase Markdown 6 件は validation OK。
- 既存 Testcase Excel 2 件は再renderし、2 sheet 構成を read-back 済み。
- Architecture DOCX 3 件は text read-back OK。LibreOffice render は local runtime dependency `liblcms2.2.dylib` 欠落で実施不可。
