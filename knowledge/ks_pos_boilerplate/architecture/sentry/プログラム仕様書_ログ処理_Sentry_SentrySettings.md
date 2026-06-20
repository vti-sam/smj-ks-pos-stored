---
project: ks_host
source:
- migrated from management/program-specs/sentry/プログラム仕様書_ログ処理_Sentry_SentrySettings.md
status: confirmed
tags:
- ks_host
- architecture
- sentry
- プログラム仕様書_ログ処理_sentry_sentrysettings
title: プログラム仕様書_ログ処理_Sentry_SentrySettings
type: architecture
---

# プログラム仕様書_ログ処理_Sentry_SentrySettings

## 1. 変更履歴

| バージョン | 作成者 | 更新者 | 更新日 | 変更理由 | 更新内容 |
|---|---|---|---|---|---|
| 0.0.1 | VTI | VTI | 2026年05月22日 | 初版作成 | Sentry設定読み込み仕様を記載 |

## 2. 表紙

| 項目 | 内容 |
|---|---|
| 名前空間 | `KsPos.Applications.Infrastructure.Monitoring` |
| クラス名（論理） | Sentry設定値 |
| クラス名（物理） | `SentrySettings` |
| 種別 | class |
| 役割 / 概要 | Sentry初期化に必要なDSN、Environment、有効/無効フラグを設定ファイルまたは環境変数から読み込む |

## 3. クラス定義

| 項目 | 内容 |
|---|---|
| アクセス修飾子 | `public sealed` |
| 継承 / 実装 | なし |
| static / instance | instance |
| コンストラクタ | 既定コンストラクタ |

### 定数

| 型 | 物理名 | 内容 |
|---|---|---|
| `string` | `SectionName` | 設定セクション名。値は`Sentry` |
| `string` | `TemporaryTestDsn` | 結合テスト用の一時DSN。本番リリース前に削除する |

### プロパティ

| 型 | 物理名 | getter | setter | 内容 |
|---|---|---|---|---|
| `string?` | `Dsn` | public | private init | Sentry DSN |
| `string` | `Environment` | public | private init | Sentry環境名。既定値は`production` |
| `bool` | `EnableSentry` | public | init | Sentry初期化フラグ |
| `bool` | `ShouldInitialize` | public | - | `EnableSentry`がtrue、かつDSNが空でない場合true |

## 4. メソッド一覧

| No | 修飾子 | static | 戻り値 | メソッド名 | 概要 |
|---:|---|---|---|---|---|
| 1 | public | yes | `SentrySettings` | `FromConfiguration` | 設定ファイルまたは環境変数からSentry設定を生成する |
| 2 | private | yes | `string?` | `Read` | 設定値を読み込む |

## 5. メソッド定義

| No | メソッド名 | 引数 | 戻り値 | 処理内容 |
|---:|---|---|---|---|
| 1 | `FromConfiguration` | `IConfiguration configuration` | `SentrySettings` | `Sentry:Dsn`または`KSPOS_SENTRY_DSN`、`Sentry:Environment`または`KSPOS_SENTRY_ENVIRONMENT`、`Sentry:EnableSentry`または`KSPOS_SENTRY_ENABLED`を読み込む |
| 2 | `Read` | `IConfiguration configuration`, `string key`, `string environmentVariable` | `string?` | config値が空でなければconfigを採用し、空の場合は環境変数を採用する |

## 6. 設定キー

| 用途 | app config | 環境変数 | 既定値 |
|---|---|---|---|
| DSN | `Sentry:Dsn` | `KSPOS_SENTRY_DSN` | 結合テスト用一時DSN |
| Environment | `Sentry:Environment` | `KSPOS_SENTRY_ENVIRONMENT` | `production` |
| 有効/無効 | `Sentry:EnableSentry` | `KSPOS_SENTRY_ENABLED` | 未指定時は有効 |

## 7. 注意事項

- 現在の一時DSNはDebug結合テスト用である。
- 本番運用ではDSNをソースコードに保持せず、CI/CDまたは実行時設定から注入する。
- DSNが空、または`EnableSentry=false`の場合、`ShouldInitialize=false`となりSentry SDK初期化を行わない。
