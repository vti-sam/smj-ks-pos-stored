# PS-STATE-04 タブレットPOS ローカル状態管理 スナップショット保存サービス プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-STATE-04 |
| 文書名 | タブレットPOS ローカル状態管理 スナップショット保存サービス プログラム仕様書 |
| 対象 | タブレットPOS / スナップショット保存サービス |
| 版数 | 0.0.1 |
| 作成日 | 2026/06/21 |
| 作成者 | VTI サム, VTI 吉田 |
| レビュー担当 | SMJ 蒲田 |
| 承認者 | SMJ 蒲田 |
| 目的 | 対象クラスの構造、フィールド／プロパティ及びメソッド仕様を定義する。 |
| 期待成果 | 実装及びレビューで参照するクラス単位の仕様を明確にする。 |

## 01_改訂履歴

| 版数 | 日付 | 変更内容 | 作成者 | 承認者 |
| --- | --- | --- | --- | --- |
| 0.0.1 | 2026/06/21 | 初版作成 | VTI |  |

## クラス情報

| 項目 | 内容 |
| --- | --- |
| 機能名 | スナップショット保存サービス |
| 物理クラス名 | EfCoreViewModelSnapshotService |
| 名前空間 | TabletPos.Core.State |
| アクセス修飾子 | public sealed |
| 継承/実装 | IViewModelSnapshotService |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/TabletPosBoilerplate/TabletPos.Core/State/EfCoreViewModelSnapshotService.cs |
| 対象クラス | EfCoreViewModelSnapshotService |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

画面状態をJSONに変換して端末内DBへ保存し、必要に応じてメモリ上のキャッシュから復元するサービスである。セッション管理と連携し、画面状態をセッション単位で分離する。

### 主な責務

- 保存対象項目をJSON形式で永続化する。
- 同一セッション内の画面キーごとに保存データを管理する。
- 読み取り高速化のためメモリ上のキャッシュを併用する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| フィールド | private static readonly | JsonSerializerOptions | JsonOptions | JSON変換時のWeb既定設定。 |
| フィールド | private readonly | ConcurrentDictionary<string, Dictionary<string, object?>> | _cache | セッションキーと画面キーを組み合わせたメモリキャッシュ。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | public | Task | SaveSnapshotAsync | 画面状態を追加または更新し、キャッシュも更新する。 |
| ② | public | Task<Dictionary<string, object?>?> | GetSnapshotAsync | 画面状態をキャッシュまたはDBから取得する。 |
| ③ | public | Task | ClearSnapshotAsync | 指定された画面状態をDBとキャッシュから削除する。 |
| ④ | public | Task | ClearSessionSnapshotsAsync | 指定されたセッション配下の画面状態をまとめて削除する。 |
| ⑤ | private static | string | BuildCacheKey | メモリキャッシュ用のキーを組み立てる。 |

## メソッド詳細

### ①. SaveSnapshotAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task SaveSnapshotAsync(string sessionKey, string snapshotKey, string viewModelType, IReadOnlyDictionary<string, object?> properties, string? route = null, CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task |
| 戻り値内容 | 非同期処理の完了を表すタスク。 |

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

- ① 対象セッションを取得し、存在しない場合は作成する。
- ② 保存対象項目をJSON文字列へ変換する。
- ③ 同一セッションと画面キーの既存データを検索する。
- ④ 既存データがなければ新規行を作成し、あれば内容を更新する。
- ⑤ DBへ保存後、セッションの最終ルートとメモリキャッシュを更新する。

備考: -

### ②. GetSnapshotAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task<Dictionary<string, object?>?> GetSnapshotAsync(string sessionKey, string snapshotKey, CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task<Dictionary<string, object?>?> |
| 戻り値内容 | 画面状態をキャッシュまたはDBから取得した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | セッションキー | sessionKey |
| string | 画面状態キー | snapshotKey |
| CancellationToken | キャンセル通知 | cancellationToken |

処理内容:

- ① メモリキャッシュに対象データがあればコピーを返す。
- ② キャッシュにない場合は対象セッションを取得または作成する。
- ③ DBから同一セッションと画面キーの保存データを読み取る。
- ④ データがなければ null を返す。
- ⑤ JSONを項目辞書へ変換し、キャッシュへ格納して返す。

備考: -

### ③. ClearSnapshotAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task ClearSnapshotAsync(string sessionKey, string snapshotKey, CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task |
| 戻り値内容 | 非同期処理の完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | セッションキー | sessionKey |
| string | 画面状態キー | snapshotKey |
| CancellationToken | キャンセル通知 | cancellationToken |

処理内容:

- ① 対象セッションを取得または作成する。
- ② 同一セッションと画面キーに一致する保存データを削除する。
- ③ 対応するメモリキャッシュを削除する。

備考: -

### ④. ClearSessionSnapshotsAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task ClearSessionSnapshotsAsync(string sessionKey, CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task |
| 戻り値内容 | 非同期処理の完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | セッションキー | sessionKey |
| CancellationToken | キャンセル通知 | cancellationToken |

処理内容:

- ① 対象セッションを取得または作成する。
- ② セッション配下の保存データをDBから削除する。
- ③ セッションキーに一致するメモリキャッシュをすべて削除する。

備考: -

### ⑤. BuildCacheKey

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static string BuildCacheKey(string sessionKey, string snapshotKey)` |
| 可視性 | private static |
| 戻り値 | string |
| 戻り値内容 | メモリキャッシュ用のキーを組み立てた結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | セッションキー | sessionKey |
| string | 画面状態キー | snapshotKey |

処理内容:

- ① セッションキーと画面キーを区切り文字で連結する。
- ② 連結した文字列をキャッシュ検索用キーとして返す。

備考: -

## 処理フロー/注意事項

- 取得結果はキャッシュの直接参照ではなくコピーとして返し、呼び出し側の変更でキャッシュを汚染しない。
- 同じ画面キーでもセッションが異なれば別データとして扱う。
- 保存時にセッションの最終ルートも更新する。
