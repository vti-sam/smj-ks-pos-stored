# PS-DEVICE-04 タブレットPOS デバイス制御 設定ストレージインターフェース プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-DEVICE-04 |
| 文書名 | タブレットPOS デバイス制御 設定ストレージインターフェース プログラム仕様書 |
| 対象 | タブレットPOS / デバイス制御設定ストレージインターフェース |
| 版数 | 1.0.0 |
| 作成日 | 2026/07/23 |
| 作成者 | VTI サム |
| レビュー担当 | SMJ 蒲田 |
| 承認者 | SMJ 蒲田 |
| 目的 | 対象クラスの構造、フィールド／プロパティ及びメソッド仕様を定義する。 |
| 期待成果 | 実装及びレビューで参照するクラス単位の仕様を明確にする。 |

## 01_改訂履歴

| 版数 | 日付 | 変更内容 | 作成者 | 承認者 |
| --- | --- | --- | --- | --- |
| 1.0.0 | 2026/09/03 | 正式版として初版を作成。 | VTI サム | SMJ 蒲田 |

## クラス情報

| 項目 | 内容 |
| --- | --- |
| 機能名 | デバイス制御設定ストレージインターフェース |
| 物理クラス名 | IDeviceControllerConfigStorage |
| 名前空間 | Pos.DeviceCtrl.Configuration |
| アクセス修飾子 | internal |
| 継承/実装 | - |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/tablet-pos/Pos.DeviceCtrl/Configuration/IDeviceControllerConfigStorage.cs |
| 対象クラス | IDeviceControllerConfigStorage |
| 設計対象 | インターフェース本体、プロパティ、メソッド仕様 |

## クラス概要

デバイス設定サービスから保存先の実装を分離し、設定ストレージへのアクセス方法を定義するインターフェース。SQLiteからの設定読込・保存、起動時に取り込むランタイムJSON、およびフォールバック用の組込みデフォルトJSONの読込を定義する。

### 主な責務

- 起動時取込用JSONのパス取得、存在確認および読込契約を定義する。
- 組込み初期設定JSONの読込契約を定義する。
- SQLiteから設定を読み込む契約を定義する。
- 検証済み設定をSQLiteへ保存する契約を定義する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| プロパティ | public | string | RuntimeConfigPath | 起動時取込用JSONファイルのパスを取得する契約。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | public | bool | RuntimeConfigExists | 起動時取込用JSONファイルの存在確認契約を定義する。 |
| ② | public | Task<string> | ReadRuntimeAsync | 起動時取込用JSONファイルの非同期読込契約を定義する。 |
| ③ | public | Task<string> | ReadDefaultAsync | 組込み初期設定の非同期読込契約を定義する。 |
| ④ | public | Task<DeviceConfig?> | ReadDatabaseAsync | SQLiteから設定を非同期で読み込む契約を定義する。 |
| ⑤ | public | Task | WriteDatabaseAsync | 検証済み設定をSQLiteへ非同期で保存する契約を定義する。 |

## メソッド詳細

### ①. RuntimeConfigExists

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `bool RuntimeConfigExists()` |
| 可視性 | public |
| 戻り値 | bool |
| 戻り値内容 | 実行時設定ファイルが存在する場合はtrue、それ以外はfalse。 |

処理内容:

- ① 実行時設定ファイルの存在確認を行う。
- ② 実装が確認した存在状態を返す。

備考: -

### ②. ReadRuntimeAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `Task<string> ReadRuntimeAsync(Encoding encoding, CancellationToken cancellationToken)` |
| 可視性 | public |
| 戻り値 | Task<string> |
| 戻り値内容 | 実行時設定から読み込んだ文字列。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Encoding | 読込文字コード | encoding |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① 読込文字コードとキャンセルトークンを受け付ける。
- ② 実行時設定の非同期読込を実装へ委譲する。
- ③ 読み込んだ文字列を返す。

備考: -

### ③. ReadDefaultAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `Task<string> ReadDefaultAsync(Encoding encoding, CancellationToken cancellationToken)` |
| 可視性 | public |
| 戻り値 | Task<string> |
| 戻り値内容 | 初期設定から読み込んだ文字列。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Encoding | 読込文字コード | encoding |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① 読込文字コードとキャンセルトークンを受け付ける。
- ② 初期設定の非同期読込を実装へ委譲する。
- ③ 読み込んだ文字列を返す。

備考: -

### ④. ReadDatabaseAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `Task<DeviceConfig?> ReadDatabaseAsync(CancellationToken cancellationToken)` |
| 可視性 | public |
| 戻り値 | Task<DeviceConfig?> |
| 戻り値内容 | SQLiteから復元した設定。DBファイルが存在しない場合、または設定が未登録の場合はnull。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① キャンセルトークンを受け付ける。
- ② SQLiteからの設定復元を実装へ委譲する。
- ③ 復元した設定、または未初期化を示すnullを返す。

備考: 通常起動時およびアプリケーション再起動時の設定読込元はSQLiteとする。

### ⑤. WriteDatabaseAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `Task WriteDatabaseAsync(DeviceConfig config, CancellationToken cancellationToken)` |
| 可視性 | public |
| 戻り値 | Task |
| 戻り値内容 | SQLiteへの設定保存完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| DeviceConfig | 反映対象設定 | config |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① 保存対象設定とキャンセルトークンを受け付ける。
- ② SQLiteへのスキーマ準備、現行データの全件置換、トランザクション制御を実装クラスへ委譲する。
- ③ 反映処理の完了まで待機する。

備考: 設定更新時にJSONへ書き戻す契約は定義しない。

## 処理フロー/注意事項

- 設定サービスは本インターフェースだけを参照し、保存場所や組込みリソースの実装詳細を持たない。
- 現行実装ではSqliteDeviceControllerConfigStorageが本契約を実装する。
- SQLiteは実行中の設定読込元および保存先とする。JSONはアプリケーション起動時に取込を試行し、取得できない場合は既存のSQLite設定へフォールバックする。

### 注意事項

- 文字コードとキャンセル制御は呼出元から実装へ引き渡す。
- 本インターフェースと実装の対応はServiceCollectionExtensionsでシングルトンとして登録される。
