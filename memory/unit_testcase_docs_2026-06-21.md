---
title: Unit testcase docs for Host, Sentry and Local State
project: smj-ks-pos
type: lesson
status: archived
source:
  - project-store/artifacts/reports/testcases/TC-UT-01_タブレットPOS_単体テストケース/
  - sources/KsPosBoilerplate/TabetPos.Test/
  - sources/KsPosBoilerplate/TabetPos.Host/tests/
tags:
  - testcase
  - unittest
  - host
  - sentry
  - state
scope: historical
captured_at: 2026-06-21
validity: historical_context
promote_to_knowledge: false
---

# Unit Testcase Documentation

2026-06-21 時点の source に基づき、単体テストケース Markdown を `TC-UT-01_タブレットPOS_単体テストケース` に作成した。

- Host: `TC-UT-HOST-01_タブレットPOS_ホストデバイス制御_単体テストケース.md`、33 件。
- Sentry: `TC-UT-SENTRY-01_タブレットPOS_監視ログ連携_単体テストケース.md`、13 件。
- Local State: `TC-UT-STATE-01_タブレットPOS_ローカル状態管理_単体テストケース.md`、24 件。
- Host Device / OPOS Integration: `TC-IT-HOST-01_タブレットPOS_ホストデバイス制御_デバイス戦略・OPOS連携_結合テストケース.md`、31 件。

作成時の方針:

- 既存 `testcase-excel` skill の Markdown schema を維持した。
- Excel は生成していない。
- TestMethod 数と testcase 行数を突合した。
- Hardware / Integration category のテストは単体テストケースから分離し、手動実施・証跡取得用の結合テストケースとして作成した。

## Skill Update

同日に `skills/testcase-excel/` を更新した。

- `SKILL.md` に source code / unit test 由来の testcase 作成手順、顧客向け日本語の書き方、内部プロセス文言を出さないルールを追加した。
- `scripts/testcase_validate.py` を追加し、Markdown schema、ID重複、種別、必須section、Excel sheet名、内部プロセス文言を検査できるようにした。
- `resources/testcase_sample.md` を必須section付きの標準サンプルに更新した。

## Host Coverage Update

Host core の単体テストを `sources/KsPosBoilerplate/TabetPos.Host/tests/DeviceHostCore.Tests/` に追加した。

- 新規 TestMethod: 23 件。
- Host unit testcase: 既存 10 件 + 新規 23 件 = 33 件。
- OPOS runtime / registry / hardware flag の 3 件に加え、Customer Display 7 件、Cash Drawer 3 件、Cash Changer 18 件の手動 command-level IT を `TC-IT-HOST-01` に定義した。
- macOS では `KsHost` が WindowsDesktop runtime を要求するため test execution は不可。`dotnet build ...DeviceHostCore.Tests.csproj -p:EnableWindowsTargeting=true` は成功した。
