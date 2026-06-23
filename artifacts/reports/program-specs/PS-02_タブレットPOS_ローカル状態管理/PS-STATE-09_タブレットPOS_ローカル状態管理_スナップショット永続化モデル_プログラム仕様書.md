# PS-STATE-09 タブレットPOS ローカル状態管理 スナップショット永続化モデル プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.1 | 2026/06/21 | VTI | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-STATE-09 |
| プロジェクト名 | タブレットPOS |
| 機能名 | スナップショット永続化モデル |
| 物理クラス名 | ViewModelSnapshotEntity |
| 名前空間 | TabetPos.Core.State |
| アクセス修飾子 | public sealed |
| 継承/実装 | - |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/tabletposboilerplate/TabetPos.Core/State/ViewModelSnapshotEntity.cs |
| 対象クラス | ViewModelSnapshotEntity |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

画面状態を端末内DBへ保存するための永続化データである。セッション、画面キー、画面種別、ルート、JSON化した項目値、更新日時を保持する。

### 主な責務

- 画面単位の保存データを保持する。
- セッションとの親子関係を保持する。
- 復元に必要なJSONデータとバージョンを保持する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| プロパティ | public | Guid | Id | 主キー。 |
| プロパティ | public | Guid | SessionId | 親セッションID。 |
| プロパティ | public | string | SnapshotKey | 画面状態キー。 |
| プロパティ | public | string | ViewModelType | 画面種別。 |
| プロパティ | public | string? | Route | 保存時の画面ルート。 |
| プロパティ | public | string | PayloadJson | 保存対象項目のJSON。 |
| プロパティ | public | int | PayloadVersion | 保存データ形式バージョン。 |
| プロパティ | public | DateTime | UpdatedAtUtc | 更新日時UTC。 |
| プロパティ | public | LocalStateSessionEntity? | Session | 親セッションへの参照。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | public | - | ViewModelSnapshotEntity | 画面状態の永続化データを生成する。 |

## メソッド詳細

### 1. ViewModelSnapshotEntity

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public ViewModelSnapshotEntity()` |
| 可視性 | public |
| 戻り値 | - |

処理内容:

- ① 文字列項目は安全な既定値で初期化される。
- ② 保存データ形式バージョンは1として初期化される。
- ③ 親セッションとの関連付けは保存時に設定される。

備考: -

## 処理フロー/注意事項

- 同一セッション内では画面状態キーが一意になる。
- 保存データ本体はJSON文字列として保持する。
