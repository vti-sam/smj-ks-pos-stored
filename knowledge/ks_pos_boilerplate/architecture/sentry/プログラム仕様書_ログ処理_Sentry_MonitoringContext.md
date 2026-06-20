---
project: ks_host
source:
- migrated from management/program-specs/sentry/プログラム仕様書_ログ処理_Sentry_MonitoringContext.md
status: confirmed
tags:
- ks_host
- architecture
- sentry
- プログラム仕様書_ログ処理_sentry_monitoringcontext
title: プログラム仕様書_ログ処理_Sentry_MonitoringContext
type: architecture
---

# プログラム仕様書_ログ処理_Sentry_MonitoringContext

## 1. 変更履歴

| バージョン | 作成者 | 更新者 | 更新日 | 変更理由 | 更新内容 |
|---|---|---|---|---|---|
| 0.0.1 | VTI | VTI | 2026年05月22日 | 初版作成 | 監視コンテキストDTO仕様を記載 |

## 2. 表紙

| 項目 | 内容 |
|---|---|
| 名前空間 | `KsPos.Applications.Ports.Monitoring` |
| クラス名（論理） | 監視コンテキスト |
| クラス名（物理） | `MonitoringContext` |
| 種別 | `record` |
| 役割 / 概要 | Sentry Scopeに設定する画面名、業務フロー、端末情報などを保持する |

## 3. クラス定義

| 項目 | 内容 |
|---|---|
| アクセス修飾子 | `public sealed` |
| 継承 / 実装 | なし |
| static / instance | instance |
| コンストラクタ | primary constructor |

### コンストラクタ引数

| 型 | 論理名 | 物理名 | 内容 |
|---|---|---|---|
| `string?` | 画面名 | `ScreenName` | 現在画面またはViewModel名 |
| `string?` | 業務フロー | `BusinessFlow` | 会計、返品、結合テストなどの業務分類 |
| `string?` | 店舗コード | `StoreCode` | 店舗識別子 |
| `string?` | 端末ID | `TerminalId` | POS端末識別子 |
| `string?` | デバイス種別 | `DeviceType` | プリンター、釣銭機など |
| `string?` | APIエンドポイント | `ApiEndpoint` | API処理時のendpoint/path |
| `IReadOnlyDictionary<string, string>?` | 追加タグ | `Tags` | 上記以外の調査用タグ |

## 4. メソッド一覧

| No | 修飾子 | 戻り値 | メソッド名 | 概要 |
|---:|---|---|---|---|
| 1 | public | - | primary constructor | 監視コンテキストを生成する |

## 5. メソッド定義

| No | メソッド名 | 引数 | 戻り値 | 処理内容 |
|---:|---|---|---|---|
| 1 | `MonitoringContext` | 各コンテキスト項目 | `MonitoringContext` | Sentry Scopeに設定するタグ情報を保持する。空値は送信側で設定対象外とする |

## 6. 注意事項

- `StoreCode`、`TerminalId`などは調査に必要な識別子のみ設定する。
- 個人情報、カード番号、電話番号、メールアドレスはタグに入れない。
- 値は`SentryMonitoringService`側で再度マスキングされる。
