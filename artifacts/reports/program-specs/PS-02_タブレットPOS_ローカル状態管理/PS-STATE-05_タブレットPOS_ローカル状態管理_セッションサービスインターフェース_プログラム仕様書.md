# PS-STATE-05 タブレットPOS ローカル状態管理 セッションサービスインターフェース プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.1 | 2026/06/21 | VTI | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-STATE-05 |
| プロジェクト名 | タブレットPOS |
| 機能名 | セッションサービスインターフェース |
| 物理クラス名 | ILocalStateSessionService |
| 名前空間 | TabetPos.Core.State |
| アクセス修飾子 | public |
| 継承/実装 | - |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/tabletposboilerplate/TabetPos.Core/State/ILocalStateSessionService.cs |
| 対象クラス | ILocalStateSessionService |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

ローカル状態を保存する単位となるセッションの取得、一覧取得、完了、破棄、最終ルート更新を呼び出すための契約である。

### 主な責務

- 有効なセッションを取得または作成する契約を定義する。
- 有効期限内のセッション一覧を取得する契約を定義する。
- セッション状態と最終ルートの更新契約を定義する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| - | - | - | - | フィールド/プロパティ定義なし。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | public | Task<LocalStateSession> | GetOrCreateActiveSessionAsync | 有効なセッションを取得し、存在しない場合は作成する。 |
| 2 | public | Task<IReadOnlyList<LocalStateSession>> | GetActiveSessionsAsync | 有効期限内の有効セッション一覧を取得する。 |
| 3 | public | Task | MarkCompletedAsync | 対象セッションを完了状態にする。 |
| 4 | public | Task | MarkAbandonedAsync | 対象セッションを破棄状態にする。 |
| 5 | public | Task | UpdateLastRouteAsync | 対象セッションの最終ルートを更新する。 |

## メソッド詳細

### 1. GetOrCreateActiveSessionAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `Task<LocalStateSession> GetOrCreateActiveSessionAsync(string sessionKey, string? businessFlow = null, CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task<LocalStateSession> |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | セッションキー | sessionKey |
| string? | 業務フロー名 | businessFlow |
| CancellationToken | キャンセル通知 | cancellationToken |

処理内容:

- ① 指定されたセッションキーの取得要求を受け付ける。
- ② 有効なデータがなければ実装側で新規作成する。
- ③ 取得または作成されたセッション情報を返す。

備考: -

### 2. GetActiveSessionsAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `Task<IReadOnlyList<LocalStateSession>> GetActiveSessionsAsync(CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task<IReadOnlyList<LocalStateSession>> |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| CancellationToken | キャンセル通知 | cancellationToken |

処理内容:

- ① 一覧取得要求を受け付ける。
- ② 実装側で状態と有効期限により対象を絞り込む。
- ③ 更新日時の新しい順で結果を返す。

備考: -

### 3. MarkCompletedAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `Task MarkCompletedAsync(string sessionKey, CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | セッションキー | sessionKey |
| CancellationToken | キャンセル通知 | cancellationToken |

処理内容:

- ① セッションキーに紐づく完了更新要求を受け付ける。
- ② 実装側で状態を完了へ更新する。

備考: -

### 4. MarkAbandonedAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `Task MarkAbandonedAsync(string sessionKey, CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | セッションキー | sessionKey |
| CancellationToken | キャンセル通知 | cancellationToken |

処理内容:

- ① セッションキーに紐づく破棄更新要求を受け付ける。
- ② 実装側で状態を破棄へ更新する。

備考: -

### 5. UpdateLastRouteAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `Task UpdateLastRouteAsync(string sessionKey, string? lastRoute, CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | セッションキー | sessionKey |
| string? | 最終ルート | lastRoute |
| CancellationToken | キャンセル通知 | cancellationToken |

処理内容:

- ① セッションキーとルート情報を受け付ける。
- ② 実装側で該当セッションの最終ルートを更新する。

備考: -

## 処理フロー/注意事項

- セッションキーは業務フローや画面群ごとの保存範囲を分けるために使用する。
