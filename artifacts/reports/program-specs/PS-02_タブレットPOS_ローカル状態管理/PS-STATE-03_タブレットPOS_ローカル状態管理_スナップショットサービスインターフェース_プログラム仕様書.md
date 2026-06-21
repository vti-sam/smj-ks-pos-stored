# PS-STATE-03 タブレットPOS ローカル状態管理 スナップショットサービスインターフェース プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.1 | 2026/06/21 | VTI | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-STATE-03 |
| プロジェクト名 | タブレットPOS |
| 機能名 | スナップショットサービスインターフェース |
| 物理クラス名 | IViewModelSnapshotService |
| 名前空間 | TabetPos.Core.State |
| アクセス修飾子 | public |
| 継承/実装 | - |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/KsPosBoilerplate/TabetPos.Core/State/IViewModelSnapshotService.cs |
| 対象クラス | IViewModelSnapshotService |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

画面状態の保存、取得、削除を呼び出し側から利用するための窓口である。利用側は保存先の実装を意識せず、セッションキーと画面キーで状態を扱う。

### 主な責務

- 画面状態の保存契約を定義する。
- 画面状態の取得契約を定義する。
- 画面単位またはセッション単位の削除契約を定義する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| - | - | - | - | フィールド/プロパティ定義なし。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | public | Task | SaveSnapshotAsync | 指定された画面状態を保存する。 |
| 2 | public | Task<Dictionary<string, object?>?> | GetSnapshotAsync | 指定された画面状態を取得する。 |
| 3 | public | Task | ClearSnapshotAsync | 指定された画面状態を削除する。 |
| 4 | public | Task | ClearSessionSnapshotsAsync | 指定されたセッション配下の画面状態をまとめて削除する。 |

## メソッド詳細

### 1. SaveSnapshotAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `Task SaveSnapshotAsync(string sessionKey, string snapshotKey, string viewModelType, IReadOnlyDictionary<string, object?> properties, string? route = null, CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | セッションキー | sessionKey |
| string | 画面状態キー | snapshotKey |
| string | 画面種別 | viewModelType |
| IReadOnlyDictionary<string, object?> | 保存対象項目 | properties |
| string? | 現在ルート | route |
| CancellationToken | キャンセル通知 | cancellationToken |

処理内容:

- ① 指定されたセッションと画面キーに紐づく保存要求を受け付ける。
- ② 画面種別、保存対象項目、現在ルートを実装へ渡す。
- ③ 保存完了まで非同期で待機する。

備考: -

### 2. GetSnapshotAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `Task<Dictionary<string, object?>?> GetSnapshotAsync(string sessionKey, string snapshotKey, CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task<Dictionary<string, object?>?> |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | セッションキー | sessionKey |
| string | 画面状態キー | snapshotKey |
| CancellationToken | キャンセル通知 | cancellationToken |

処理内容:

- ① セッションキーと画面キーに一致する保存済み状態を要求する。
- ② 存在する場合は項目名と値の組を返す。
- ③ 存在しない場合は null を返す。

備考: -

### 3. ClearSnapshotAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `Task ClearSnapshotAsync(string sessionKey, string snapshotKey, CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | セッションキー | sessionKey |
| string | 画面状態キー | snapshotKey |
| CancellationToken | キャンセル通知 | cancellationToken |

処理内容:

- ① セッションキーと画面キーに一致する保存データの削除を要求する。
- ② 削除完了まで非同期で待機する。

備考: -

### 4. ClearSessionSnapshotsAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `Task ClearSessionSnapshotsAsync(string sessionKey, CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | セッションキー | sessionKey |
| CancellationToken | キャンセル通知 | cancellationToken |

処理内容:

- ① セッションキーに紐づく保存データの削除を要求する。
- ② 削除完了まで非同期で待機する。

備考: -

## 処理フロー/注意事項

- 保存先の詳細は実装側へ閉じ込め、呼び出し側は契約だけを参照する。
