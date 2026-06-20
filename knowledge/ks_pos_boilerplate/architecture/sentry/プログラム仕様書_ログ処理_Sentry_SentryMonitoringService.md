---
project: ks_host
source:
- migrated from management/program-specs/sentry/プログラム仕様書_ログ処理_Sentry_SentryMonitoringService.md
status: confirmed
tags:
- ks_host
- architecture
- sentry
- プログラム仕様書_ログ処理_sentry_sentrymonitoringservice
title: プログラム仕様書_ログ処理_Sentry_SentryMonitoringService
type: architecture
---

# プログラム仕様書_ログ処理_Sentry_SentryMonitoringService

## 1. 変更履歴

| バージョン | 作成者 | 更新者 | 更新日 | 変更理由 | 更新内容 |
|---|---|---|---|---|---|
| 0.0.1 | VTI | VTI | 2026年05月22日 | 初版作成 | Sentry監視サービス実装仕様を記載 |

## 2. 表紙

| 項目 | 内容 |
|---|---|
| 名前空間 | `KsPos.Applications.Infrastructure.Monitoring` |
| クラス名（論理） | Sentry監視サービス |
| クラス名（物理） | `SentryMonitoringService` |
| 種別 | class |
| 役割 / 概要 | `IMonitoringService`を実装し、アプリ内監視イベントをSentry SDKへ連携する |

## 3. クラス定義

| 項目 | 内容 |
|---|---|
| アクセス修飾子 | `public sealed` |
| 継承 / 実装 | `IMonitoringService` |
| static / instance | instance |
| コンストラクタ | 既定コンストラクタ |

## 4. メソッド一覧

| No | 修飾子 | static | 戻り値 | メソッド名 | 概要 |
|---:|---|---|---|---|---|
| 1 | public | no | `void` | `SetContext` | Sentry Scopeへタグを設定する |
| 2 | public | no | `void` | `AddBreadcrumb` | Sentry Breadcrumbを追加する |
| 3 | public | no | `string` | `CaptureMessage` | メッセージEventを送信する |
| 4 | public | no | `string` | `CaptureException` | 例外Eventを送信する |
| 5 | public | no | `Task` | `FlushAsync` | SDK送信キューをflushする |
| 6 | private | yes | `void` | `SetTag` | 空値を除外し、マスキング後にタグ設定する |
| 7 | private | yes | `string` | `Mask` | 文字列をマスキングする |
| 8 | private | yes | `Dictionary<string,string>?` | `MaskData` | Breadcrumb Dataをマスキングする |
| 9 | private | yes | `BreadcrumbLevel` | `ToBreadcrumbLevel` | `MonitoringLevel`をBreadcrumbレベルへ変換する |
| 10 | private | yes | `SentryLevel` | `ToSentryLevel` | `MonitoringLevel`をSentry Eventレベルへ変換する |

## 5. メソッド定義

| No | メソッド名 | 引数 | 戻り値 | 処理内容 | 例外 |
|---:|---|---|---|---|---|
| 1 | `SetContext` | `MonitoringContext context` | なし | `screen_name`、`business_flow`、`store_code`、`terminal_id`、`device_type`、`api_endpoint`、追加タグをSentry Scopeへ設定する | SDK側例外は呼び出し元へ伝播 |
| 2 | `AddBreadcrumb` | `MonitoringEvent monitoringEvent` | なし | message、category、data、levelをSentry Breadcrumbとして追加する。message/dataは送信前にマスキングする | SDK側例外は呼び出し元へ伝播 |
| 3 | `CaptureMessage` | `MonitoringEvent monitoringEvent` | Event ID文字列 | messageをマスキングし、指定レベルでSentry Eventを送信する。Event IDが空の場合は空文字を返す | SDK側例外は呼び出し元へ伝播 |
| 4 | `CaptureException` | `Exception exception`, `MonitoringEvent? monitoringEvent` | Event ID文字列 | 補足イベントがある場合はError Breadcrumbとして追加した後、例外をSentry Eventとして送信する | SDK側例外は呼び出し元へ伝播 |
| 5 | `FlushAsync` | `TimeSpan timeout` | `Task` | 指定時間内でSDKの送信キューをflushする | SDK側例外は呼び出し元へ伝播 |

## 6. レベル変換

| MonitoringLevel | BreadcrumbLevel | SentryLevel |
|---|---|---|
| `Debug` | `Debug` | `Debug` |
| `Info` | `Info` | `Info` |
| `Warning` | `Warning` | `Warning` |
| `Error` | `Error` | `Error` |
| `Fatal` | `Fatal` | `Fatal` |

## 7. 注意事項

- Presentation層から`SentrySdk`を直接呼び出さない。
- message、data、tag valueは必ず`SensitiveDataMasker`を通す。
- request body、response body、カード情報のraw値は渡さない。
