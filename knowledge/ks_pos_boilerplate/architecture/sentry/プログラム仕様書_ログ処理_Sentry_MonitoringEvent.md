---
project: ks_host
source:
- migrated from management/program-specs/sentry/プログラム仕様書_ログ処理_Sentry_MonitoringEvent.md
status: confirmed
tags:
- ks_host
- architecture
- sentry
- プログラム仕様書_ログ処理_sentry_monitoringevent
title: プログラム仕様書_ログ処理_Sentry_MonitoringEvent
type: architecture
---

# プログラム仕様書_ログ処理_Sentry_MonitoringEvent

## 1. 変更履歴

| バージョン | 作成者 | 更新者 | 更新日 | 変更理由 | 更新内容 |
|---|---|---|---|---|---|
| 0.0.1 | VTI | VTI | 2026年05月22日 | 初版作成 | 監視イベントDTO仕様を記載 |

## 2. 表紙

| 項目 | 内容 |
|---|---|
| 名前空間 | `KsPos.Applications.Ports.Monitoring` |
| クラス名（論理） | 監視イベント |
| クラス名（物理） | `MonitoringEvent` |
| 種別 | `record` |
| 役割 / 概要 | BreadcrumbまたはSentry Eventとして送信するログ情報を保持する |

## 3. クラス定義

| 項目 | 内容 |
|---|---|
| アクセス修飾子 | `public sealed` |
| 継承 / 実装 | なし |
| static / instance | instance |
| コンストラクタ | primary constructor |

### コンストラクタ引数

| 型 | 論理名 | 物理名 | 必須 | 内容 |
|---|---|---|---|---|
| `string` | カテゴリ | `Category` | 必須 | `lifecycle`、`navigation`、`api`、`device`などの分類 |
| `string` | メッセージ | `Message` | 必須 | 送信するログ本文 |
| `MonitoringLevel` | レベル | `Level` | 任意 | 既定値は`Info` |
| `IReadOnlyDictionary<string, string>?` | 付加情報 | `Data` | 任意 | route、screen_name、status codeなどの補足情報 |

## 4. メソッド一覧

| No | 修飾子 | 戻り値 | メソッド名 | 概要 |
|---:|---|---|---|---|
| 1 | public | - | primary constructor | 監視イベントを生成する |

## 5. メソッド定義

| No | メソッド名 | 引数 | 戻り値 | 処理内容 |
|---:|---|---|---|---|
| 1 | `MonitoringEvent` | `Category`, `Message`, `Level`, `Data` | `MonitoringEvent` | ログ分類、本文、レベル、補足情報を保持する。送信時のマスキングは`SentryMonitoringService`側で実施する |

## 6. 使用例

| 用途 | Category | Message | Level |
|---|---|---|---|
| 画面表示 | `lifecycle` | `appearing` | `Info` |
| 画面遷移開始 | `navigation` | `navigate_start` | `Info` |
| 画面遷移失敗 | `navigation` | `navigate_failed` | `Error` |
| 結合テスト送信 | `integration-test` | `タブレットPOS Sentry smoke test` | `Info` |
