# PS-DEVICE-04 タブレットPOS デバイス制御 設定ストレージインターフェース プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-DEVICE-04 |
| 文書名 | タブレットPOS デバイス制御 設定ストレージインターフェース プログラム仕様書 |
| 対象 | タブレットPOS / デバイス制御設定ストレージインターフェース |
| 版数 | 0.0.3 |
| 作成日 | 2026/07/23 |
| 作成者 | VTI サム, VTI 吉田 |
| レビュー担当 | SMJ 蒲田 |
| 承認者 | SMJ 蒲田 |
| 目的 | 対象クラスの構造、フィールド／プロパティ及びメソッド仕様を定義する。 |
| 期待成果 | 実装及びレビューで参照するクラス単位の仕様を明確にする。 |

## 01_改訂履歴

| 版数 | 日付 | 変更内容 | 作成者 | 承認者 |
| --- | --- | --- | --- | --- |
| 0.0.3 | 2026/08/24 | ソースコードの名称変更に伴い、名前空間、およびソースファイルパスの表記をTabletPos.*に統一。責務、処理フロー、および設計上の動作に変更なし。 | VTI サム |  |
| 0.0.2 | 2026/07/30 | クラス概要の表現を明確化 | VTI サム |  |
| 0.0.1 | 2026/07/23 | 初版作成 | VTI サム |  |

## クラス情報

| 項目 | 内容 |
| --- | --- |
| 機能名 | デバイス制御設定ストレージインターフェース |
| 物理クラス名 | IDeviceControllerConfigStorage |
| 名前空間 | TabletPos.DeviceCtrl.Configuration |
| アクセス修飾子 | internal |
| 継承/実装 | - |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/TabletPosBoilerplate/TabletPos.DeviceCtrl/Configuration/IDeviceControllerConfigStorage.cs |
| 対象クラス | IDeviceControllerConfigStorage |
| 設計対象 | インターフェース本体、プロパティ、メソッド仕様 |

## クラス概要

デバイス設定サービスから保存先の実装を分離し、設定ストレージへのアクセス方法を定義するインターフェース。実行時設定のパス取得と存在確認、実行時設定および組込み初期設定の読込、実行時設定の保存を定義する。

### 主な責務

- 実行時設定ファイルのパス取得契約を定義する。
- 実行時設定ファイルの存在確認と読込契約を定義する。
- 初期設定の読込契約を定義する。
- 実行時設定ファイルの保存契約を定義する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| プロパティ | public | string | RuntimeConfigPath | 実行時設定ファイルのパスを取得する契約。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | public | bool | RuntimeConfigExists | 実行時設定ファイルの存在確認契約を定義する。 |
| ② | public | Task<string> | ReadRuntimeAsync | 実行時設定ファイルの非同期読込契約を定義する。 |
| ③ | public | Task<string> | ReadDefaultAsync | 初期設定の非同期読込契約を定義する。 |
| ④ | public | Task | WriteRuntimeAsync | 実行時設定ファイルの非同期保存契約を定義する。 |

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

### ④. WriteRuntimeAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `Task WriteRuntimeAsync(string json, Encoding encoding, CancellationToken cancellationToken)` |
| 可視性 | public |
| 戻り値 | Task |
| 戻り値内容 | 実行時設定の保存完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | 保存対象JSON | json |
| Encoding | 保存文字コード | encoding |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① 保存対象JSON、文字コード、キャンセルトークンを受け付ける。
- ② 実行時設定の非同期保存を実装へ委譲する。
- ③ 保存完了を表すタスクを返す。

備考: -

## 処理フロー/注意事項

- 設定サービスは本インターフェースだけを参照し、保存場所や組込みリソースの実装詳細を持たない。
- 現行実装ではEmbeddedDeviceControllerConfigStorageが本契約を実装する。

### 注意事項

- 文字コードとキャンセル制御は呼出元から実装へ引き渡す。
- 本インターフェースと実装の対応はServiceCollectionExtensionsでシングルトンとして登録される。
