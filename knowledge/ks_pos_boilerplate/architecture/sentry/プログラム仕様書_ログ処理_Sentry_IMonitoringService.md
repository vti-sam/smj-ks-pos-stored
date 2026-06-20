---
project: ks_host
source:
- migrated from management/program-specs/sentry/プログラム仕様書_ログ処理_Sentry_IMonitoringService.md
status: confirmed
tags:
- ks_host
- architecture
- sentry
- プログラム仕様書_ログ処理_sentry_imonitoringservice
title: プログラム仕様書_ログ処理_Sentry_IMonitoringService
type: architecture
---

# プログラム仕様書_ログ処理_Sentry_IMonitoringService

## 1. 変更履歴

| バージョン | 作成者 | 更新者 | 更新日 | 変更理由 | 更新内容 |
|---|---|---|---|---|---|
| 0.0.1 | VTI | VTI | 2026年05月22日 | 初版作成 | Sentry監視基盤の抽象Interface仕様を記載 |

## 2. 表紙

| 項目 | 内容 |
|---|---|
| 名前空間 | `KsPos.Applications.Ports.Monitoring` |
| クラス名（論理） | 監視サービスInterface |
| クラス名（物理） | `IMonitoringService` |
| 種別 | Interface |
| 役割 / 概要 | Presentation層やNavigation処理からSentry SDKを直接参照しないための監視処理抽象化 |

## 3. クラス定義

| 項目 | 内容 |
|---|---|
| アクセス修飾子 | `public` |
| 継承 / 実装 | なし |
| static / instance | instance |
| コンストラクタ | なし |

## 4. メソッド一覧

| No | 修飾子 | 戻り値 | メソッド名 | 概要 |
|---:|---|---|---|---|
| 1 | public | `void` | `SetContext` | Sentry Scopeに画面、業務、端末などのコンテキストを設定する |
| 2 | public | `void` | `AddBreadcrumb` | エラー発生前の操作履歴としてBreadcrumbを追加する |
| 3 | public | `string` | `CaptureMessage` | ログイベントをSentry Eventとして送信し、Event IDを返す |
| 4 | public | `string` | `CaptureException` | 例外をSentry Eventとして送信し、Event IDを返す |
| 5 | public | `Task` | `FlushAsync` | Sentry SDKの送信キューを指定時間内でflushする |

## 5. メソッド定義

| No | メソッド名 | 引数 | 戻り値 | 処理内容 |
|---:|---|---|---|---|
| 1 | `SetContext` | `MonitoringContext context` | なし | 現在画面、業務フロー、店舗、端末などの調査用タグを設定する |
| 2 | `AddBreadcrumb` | `MonitoringEvent monitoringEvent` | なし | `Info` / `Warning`などの調査用イベントをBreadcrumbとして記録する |
| 3 | `CaptureMessage` | `MonitoringEvent monitoringEvent` | Event ID文字列 | 業務エラー、テストイベントなどをSentry Eventとして送信する |
| 4 | `CaptureException` | `Exception exception`, `MonitoringEvent? monitoringEvent` | Event ID文字列 | 例外を送信する。補足イベントがある場合はBreadcrumbとして追加する |
| 5 | `FlushAsync` | `TimeSpan timeout` | `Task` | 結合テストなどで送信完了を待つために使用する |
