# PS-STATE-06 タブレットPOS ローカル状態管理 セッション管理サービス プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-STATE-06 |
| 文書名 | タブレットPOS ローカル状態管理 セッション管理サービス プログラム仕様書 |
| 対象 | タブレットPOS / セッション管理サービス |
| 版数 | 1.0.0 |
| 作成日 | 2026/06/21 |
| 作成者 | VTI サム |
| レビュー担当 | SMJ 蒲田 |
| 承認者 | SMJ 蒲田 |
| 目的 | 対象クラスの構造、フィールド／プロパティ及びメソッド仕様を定義する。 |
| 期待成果 | 実装及びレビューで参照するクラス単位の仕様を明確にする。 |

## 01_改訂履歴

| 版数 | 日付 | 変更内容 | 作成者 | 承認者 |
| --- | --- | --- | --- | --- |
| 1.0.0 | 2026/06/21 | 正式版として初版を作成。 | VTI サム | SMJ 蒲田 |

## クラス情報

| 項目 | 内容 |
| --- | --- |
| 機能名 | セッション管理サービス |
| 物理クラス名 | EfCoreLocalStateSessionService |
| 名前空間 | TabletPos.Core.State |
| アクセス修飾子 | public sealed |
| 継承/実装 | ILocalStateSessionService |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/TabletPosBoilerplate/TabletPos.Core/State/EfCoreLocalStateSessionService.cs |
| 対象クラス | EfCoreLocalStateSessionService |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

端末内DB上のセッション情報を管理し、保存データの有効範囲と状態を制御するサービスである。新規作成、再有効化、完了、破棄、最終ルート更新を扱う。

### 主な責務

- セッションキー単位で有効セッションを作成または取得する。
- 有効期限と状態に基づき利用可能なセッションを返す。
- 完了、破棄、最終ルート更新をDBへ反映する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| フィールド | private static readonly | TimeSpan | DefaultExpiration | 新規作成または再有効化したセッションの既定有効期間。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | public | Task<LocalStateSession> | GetOrCreateActiveSessionAsync | 有効セッションを取得し、未作成または非有効の場合は利用可能な状態にする。 |
| ② | public | Task<IReadOnlyList<LocalStateSession>> | GetActiveSessionsAsync | 有効期限内の有効セッションを更新日時の新しい順で取得する。 |
| ③ | public | Task | MarkCompletedAsync | 対象セッションを完了状態へ更新する。 |
| ④ | public | Task | MarkAbandonedAsync | 対象セッションを破棄状態へ更新する。 |
| ⑤ | public | Task | UpdateLastRouteAsync | 対象セッションの最終ルートと更新日時を保存する。 |
| ⑥ | private | Task | MarkAsync | 対象セッションの状態と更新日時を変更する。 |
| ⑦ | private static | LocalStateSession | ToModel | DB行を外部返却用モデルへ変換する。 |

## メソッド詳細

### ①. GetOrCreateActiveSessionAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task<LocalStateSession> GetOrCreateActiveSessionAsync(string sessionKey, string? businessFlow = null, CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task<LocalStateSession> |
| 戻り値内容 | 有効セッションを取得し、未作成または非有効の場合は利用可能な状態にした結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | セッションキー | sessionKey |
| string? | 業務フロー名 | businessFlow |
| CancellationToken | キャンセル通知 | cancellationToken |

処理内容:

- ① DBコンテキストを作成し、現在UTC時刻を取得する。
- ② セッションキーに一致する行を検索する。
- ③ 行がない場合は新しいID、状態、作成日時、更新日時、有効期限を設定して追加する。
- ④ 非有効状態の場合は有効状態に戻し、業務フローと有効期限を更新する。
- ⑤ 変更を保存し、外部返却用モデルへ変換する。

備考: -

### ②. GetActiveSessionsAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task<IReadOnlyList<LocalStateSession>> GetActiveSessionsAsync(CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task<IReadOnlyList<LocalStateSession>> |
| 戻り値内容 | 有効期限内の有効セッションを更新日時の新しい順で取得した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| CancellationToken | キャンセル通知 | cancellationToken |

処理内容:

- ① DBコンテキストを作成し、現在UTC時刻を取得する。
- ② 状態が有効で、有効期限が未設定または未来の行だけを抽出する。
- ③ 更新日時の降順に並べる。
- ④ 外部返却用モデルへ変換して一覧で返す。

備考: -

### ③. MarkCompletedAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public Task MarkCompletedAsync(string sessionKey, CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task |
| 戻り値内容 | 非同期処理の完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | セッションキー | sessionKey |
| CancellationToken | キャンセル通知 | cancellationToken |

処理内容:

- ① 共通更新処理へセッションキーと完了状態を渡す。
- ② 共通更新処理の完了を呼び出し元へ返す。

備考: -

### ④. MarkAbandonedAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public Task MarkAbandonedAsync(string sessionKey, CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task |
| 戻り値内容 | 非同期処理の完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | セッションキー | sessionKey |
| CancellationToken | キャンセル通知 | cancellationToken |

処理内容:

- ① 共通更新処理へセッションキーと破棄状態を渡す。
- ② 共通更新処理の完了を呼び出し元へ返す。

備考: -

### ⑤. UpdateLastRouteAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task UpdateLastRouteAsync(string sessionKey, string? lastRoute, CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task |
| 戻り値内容 | 非同期処理の完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | セッションキー | sessionKey |
| string? | 最終ルート | lastRoute |
| CancellationToken | キャンセル通知 | cancellationToken |

処理内容:

- ① DBコンテキストを作成し、セッションキーに一致する行を検索する。
- ② 行が存在しない場合は新規作成せず終了する。
- ③ 最終ルートと更新日時を設定する。
- ④ 変更をDBへ保存する。

備考: -

### ⑥. MarkAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private async Task MarkAsync(string sessionKey, string status, CancellationToken cancellationToken)` |
| 可視性 | private |
| 戻り値 | Task |
| 戻り値内容 | 非同期処理の完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | セッションキー | sessionKey |
| string | 更新後状態 | status |
| CancellationToken | キャンセル通知 | cancellationToken |

処理内容:

- ① DBコンテキストを作成し、セッションキーに一致する行を検索する。
- ② 行が存在しない場合は新規作成せず終了する。
- ③ 指定された状態と更新日時を設定する。
- ④ 変更をDBへ保存する。

備考: -

### ⑦. ToModel

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static LocalStateSession ToModel(LocalStateSessionEntity entity)` |
| 可視性 | private static |
| 戻り値 | LocalStateSession |
| 戻り値内容 | DB行を外部返却用モデルへ変換した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| LocalStateSessionEntity | セッションDB行 | entity |

処理内容:

- ① DB行のID、キー、状態、業務フロー、最終ルート、日時を読み取る。
- ② 読み取った値で外部返却用モデルを生成する。

備考: -

## 処理フロー/注意事項

- 状態値は active、completed、abandoned を使用する。
- 完了、破棄、最終ルート更新で対象が存在しない場合は新規作成しない。
- 非有効状態のセッションを再利用する場合は有効期限を更新する。
