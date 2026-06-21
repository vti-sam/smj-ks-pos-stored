# PS-STATE-08 タブレットPOS ローカル状態管理 セッション永続化モデル プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.1 | 2026/06/21 | VTI | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-STATE-08 |
| プロジェクト名 | タブレットPOS |
| 機能名 | セッション永続化モデル |
| 物理クラス名 | LocalStateSessionEntity |
| 名前空間 | TabetPos.Core.State |
| アクセス修飾子 | public sealed |
| 継承/実装 | - |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/KsPosBoilerplate/TabetPos.Core/State/LocalStateSessionEntity.cs |
| 対象クラス | LocalStateSessionEntity |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

ローカル状態セッションを端末内DBへ保存するための永続化データである。セッションキー、状態、業務フロー、最終ルート、日時、および配下の画面状態を保持する。

### 主な責務

- セッション単位の永続化データを保持する。
- 画面状態との親子関係を保持する。
- 状態と有効期限により復元対象を判定できるようにする。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| プロパティ | public | Guid | Id | 主キー。 |
| プロパティ | public | string | SessionKey | 一意なセッションキー。 |
| プロパティ | public | string? | BusinessFlow | 業務フロー名。 |
| プロパティ | public | string? | LastRoute | 最後に保存された画面ルート。 |
| プロパティ | public | string | Status | セッション状態。既定値は active。 |
| プロパティ | public | int | SchemaVersion | セッション形式のバージョン。既定値は1。 |
| プロパティ | public | string? | AppVersion | アプリバージョン。 |
| プロパティ | public | string? | TerminalId | 端末ID。 |
| プロパティ | public | string? | StoreCode | 店舗コード。 |
| プロパティ | public | DateTime | CreatedAtUtc | 作成日時UTC。 |
| プロパティ | public | DateTime | UpdatedAtUtc | 更新日時UTC。 |
| プロパティ | public | DateTime? | ExpiresAtUtc | 有効期限UTC。 |
| プロパティ | public | List<ViewModelSnapshotEntity> | Snapshots | 配下の画面状態一覧。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | public | - | LocalStateSessionEntity | セッション永続化データを生成する。 |

## メソッド詳細

### 1. LocalStateSessionEntity

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public LocalStateSessionEntity()` |
| 可視性 | public |
| 戻り値 | - |

処理内容:

- ① 文字列項目は安全な既定値で初期化される。
- ② 状態は有効状態、形式バージョンは1として初期化される。
- ③ 配下の画面状態一覧は空リストとして初期化される。

備考: -

## 処理フロー/注意事項

- テーブル定義によりセッションキーは一意制約を持つ。
- 配下の画面状態はセッション削除時に連動して削除される。
