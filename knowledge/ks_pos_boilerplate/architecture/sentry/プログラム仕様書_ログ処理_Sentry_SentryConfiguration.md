---
project: ks_host
source:
- migrated from management/program-specs/sentry/プログラム仕様書_ログ処理_Sentry_SentryConfiguration.md
status: confirmed
tags:
- ks_host
- architecture
- sentry
- プログラム仕様書_ログ処理_sentry_sentryconfiguration
title: プログラム仕様書_ログ処理_Sentry_SentryConfiguration
type: architecture
---

# プログラム仕様書_ログ処理_Sentry_SentryConfiguration

## 1. 変更履歴

| バージョン | 作成者 | 更新者 | 更新日 | 変更理由 | 更新内容 |
|---|---|---|---|---|---|
| 0.0.1 | VTI | VTI | 2026年05月22日 | 初版作成 | Sentry SDK初期化設定仕様を記載 |

## 2. 表紙

| 項目 | 内容 |
|---|---|
| 名前空間 | `KsPos.Applications.Infrastructure.Monitoring` |
| クラス名（論理） | Sentry設定処理 |
| クラス名（物理） | `SentryConfiguration` |
| 種別 | static class |
| 役割 / 概要 | Sentry SDKの初期化オプションと送信前マスキングhookを設定する |

## 3. クラス定義

| 項目 | 内容 |
|---|---|
| アクセス修飾子 | `public static` |
| 継承 / 実装 | なし |
| static / instance | static |
| コンストラクタ | なし |

## 4. メソッド一覧

| No | 修飾子 | static | 戻り値 | メソッド名 | 概要 |
|---:|---|---|---|---|---|
| 1 | public | yes | `void` | `Configure` | Sentry SDKオプションを設定する |
| 2 | private | yes | `SentryEvent` | `MaskEvent` | Event送信前にmessageをマスキングする |
| 3 | private | yes | `Breadcrumb` | `MaskBreadcrumb` | Breadcrumb送信前にmessageをマスキングする |

## 5. メソッド定義

| No | メソッド名 | 引数 | 戻り値 | 処理内容 |
|---:|---|---|---|---|
| 1 | `Configure` | `SentryOptions options`, `SentrySettings settings` | なし | DSN、Environment、PII無効化、Trace無効化、Breadcrumb上限、Session追跡、Stacktrace、StartupTime検出、送信前hookを設定する |
| 2 | `MaskEvent` | `SentryEvent sentryEvent` | `SentryEvent` | `sentryEvent.Message.Message`が存在する場合、`SensitiveDataMasker.Mask`でマスキングして差し替える |
| 3 | `MaskBreadcrumb` | `Breadcrumb breadcrumb` | `Breadcrumb` | Breadcrumb messageが存在する場合、マスキング済みmessageで新しいBreadcrumbを生成して返す |

## 6. 設定値

| 項目 | 設定値 | 目的 |
|---|---|---|
| `Dsn` | `SentrySettings.Dsn` | Sentry送信先 |
| `Environment` | `SentrySettings.Environment` | Sentry上の環境識別 |
| `SendDefaultPii` | `false` | 個人情報の自動送信を防止 |
| `TracesSampleRate` | `0` | v1ではPerformance Traceを無効化 |
| `MaxBreadcrumbs` | `50` | 直近操作履歴の保持数 |
| `AutoSessionTracking` | `true` | セッション / クラッシュ率把握 |
| `AttachStacktrace` | `true` | 調査用stacktrace添付 |
| `DetectStartupTime` | `Best` | 起動時情報の取得 |

## 7. 注意事項

- SDK hookは最後の防御ラインとして機能する。
- `SentryMonitoringService`側でもマスキングするため、通常イベントは二重に保護される。
- Breadcrumbの`Data`は本クラスでは変更しないため、アプリ側サービスでマスキング済みの値を渡す。
