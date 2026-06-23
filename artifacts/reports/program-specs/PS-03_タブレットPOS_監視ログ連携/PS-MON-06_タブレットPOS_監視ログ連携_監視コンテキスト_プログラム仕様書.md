# PS-MON-06 タブレットPOS 監視ログ連携 監視コンテキスト プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.1 | 2026/06/21 | VTI | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-MON-06 |
| プロジェクト名 | タブレットPOS |
| 機能名 | 監視コンテキスト |
| 物理クラス名 | MonitoringContext |
| 名前空間 | TabetPos.Core.Monitoring |
| アクセス修飾子 | public sealed |
| 継承/実装 | record |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/tabletposboilerplate/TabetPos.Core/Monitoring/MonitoringContext.cs |
| 対象クラス | MonitoringContext |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

監視対象の画面、業務、店舗、端末、デバイス、APIなど調査時に必要な文脈情報をまとめて保持するデータである。

### 主な責務

- 画面名と業務フローを保持する。
- 店舗、端末、デバイス、APIエンドポイントを保持する。
- 必要に応じて追加タグを保持する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| プロパティ | public | string? | ScreenName | 画面名。 |
| プロパティ | public | string? | BusinessFlow | 業務フロー名。 |
| プロパティ | public | string? | StoreCode | 店舗コード。 |
| プロパティ | public | string? | TerminalId | 端末ID。 |
| プロパティ | public | string? | DeviceType | デバイス種別。 |
| プロパティ | public | string? | ApiEndpoint | APIエンドポイント。 |
| プロパティ | public | IReadOnlyDictionary<string, string>? | Tags | 追加タグ。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | public | - | MonitoringContext | 監視コンテキストを生成する。 |

## メソッド詳細

### 1. MonitoringContext

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public MonitoringContext(string? ScreenName = null, string? BusinessFlow = null, string? StoreCode = null, string? TerminalId = null, string? DeviceType = null, string? ApiEndpoint = null, IReadOnlyDictionary<string, string>? Tags = null)` |
| 可視性 | public |
| 戻り値 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string? | 画面名 | ScreenName |
| string? | 業務フロー名 | BusinessFlow |
| string? | 店舗コード | StoreCode |
| string? | 端末ID | TerminalId |
| string? | デバイス種別 | DeviceType |
| string? | APIエンドポイント | ApiEndpoint |
| IReadOnlyDictionary<string, string>? | 追加タグ | Tags |

処理内容:

- ① 画面名と業務フローを受け取る。
- ② 店舗、端末、デバイス、APIの情報を受け取る。
- ③ 追加タグがある場合は保持する。
- ④ 未指定の値はnullとして保持する。

備考: -

## 処理フロー/注意事項

- 空または未指定の項目は監視タグへ設定しない。
- タグ値は監視サービス側でマスキングされる。
