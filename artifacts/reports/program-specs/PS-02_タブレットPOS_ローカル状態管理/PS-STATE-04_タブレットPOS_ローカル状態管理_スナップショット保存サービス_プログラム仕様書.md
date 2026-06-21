# PS-STATE-04 タブレットPOS ローカル状態管理 スナップショット保存サービス プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.1 | 2026/06/21 | VTI | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-STATE-04 |
| プロジェクト名 | タブレットPOS |
| 機能名 | スナップショット保存サービス |
| 物理クラス名 | EfCoreViewModelSnapshotService |
| 名前空間 | TabetPos.Core.State |
| アクセス修飾子 | public sealed |
| 継承/実装 | IViewModelSnapshotService |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/KsPosBoilerplate/TabetPos.Core/State/EfCoreViewModelSnapshotService.cs |
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
| 1 | public | Task | SaveSnapshotAsync | 画面状態を追加または更新し、キャッシュも更新する。 |
| 2 | public | Task<Dictionary<string, object?>?> | GetSnapshotAsync | 画面状態をキャッシュまたはDBから取得する。 |
| 3 | public | Task | ClearSnapshotAsync | 指定された画面状態をDBとキャッシュから削除する。 |
| 4 | public | Task | ClearSessionSnapshotsAsync | 指定されたセッション配下の画面状態をまとめて削除する。 |
| 5 | private static | string | BuildCacheKey | メモリキャッシュ用のキーを組み立てる。 |

## メソッド詳細

### 1. SaveSnapshotAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task SaveSnapshotAsync(string sessionKey, string snapshotKey, string viewModelType, IReadOnlyDictionary<string, object?> properties, string? route = null, CancellationToken cancellationToken = default)` |
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

- ① 対象セッションを取得し、存在しない場合は作成する。
- ② 保存対象項目をJSON文字列へ変換する。
- ③ 同一セッションと画面キーの既存データを検索する。
- ④ 既存データがなければ新規行を作成し、あれば内容を更新する。
- ⑤ DBへ保存後、セッションの最終ルートとメモリキャッシュを更新する。

備考: -

### 2. GetSnapshotAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task<Dictionary<string, object?>?> GetSnapshotAsync(string sessionKey, string snapshotKey, CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task<Dictionary<string, object?>?> |

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

### 3. ClearSnapshotAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task ClearSnapshotAsync(string sessionKey, string snapshotKey, CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task |

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

### 4. ClearSessionSnapshotsAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task ClearSessionSnapshotsAsync(string sessionKey, CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task |

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

### 5. BuildCacheKey

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static string BuildCacheKey(string sessionKey, string snapshotKey)` |
| 可視性 | private static |
| 戻り値 | string |

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
