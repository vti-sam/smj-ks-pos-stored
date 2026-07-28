# PS-DEVICE-03 タブレットPOS デバイス制御 組込み設定ストレージ プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-DEVICE-03 |
| 文書名 | タブレットPOS デバイス制御 組込み設定ストレージ プログラム仕様書 |
| 対象 | タブレットPOS / デバイス制御組込み設定ストレージ |
| 版数 | 0.0.1 |
| 作成日 | 2026/07/23 |
| 作成者 | VTI サム, VTI 吉田 |
| レビュー担当 | SMJ 蒲田 |
| 承認者 | SMJ 蒲田 |
| 目的 | 対象クラスの構造、フィールド／プロパティ及びメソッド仕様を定義する。 |
| 期待成果 | 実装及びレビューで参照するクラス単位の仕様を明確にする。 |

## 01_改訂履歴

| 版数 | 日付 | 変更内容 | 作成者 | 承認者 |
| --- | --- | --- | --- | --- |
| 0.0.1 | 2026/07/23 | 初版作成 | VTI サム |  |

## クラス情報

| 項目 | 内容 |
| --- | --- |
| 機能名 | デバイス制御組込み設定ストレージ |
| 物理クラス名 | EmbeddedDeviceControllerConfigStorage |
| 名前空間 | TabetPos.DeviceCtrl.Configuration |
| アクセス修飾子 | internal sealed |
| 継承/実装 | IDeviceControllerConfigStorage |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/tabletposboilerplate/TabetPos.DeviceCtrl/Configuration/EmbeddedDeviceControllerConfigStorage.cs |
| 対象クラス | EmbeddedDeviceControllerConfigStorage |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

端末別の実行時設定ファイルとアプリに同梱された初期設定リソースへのアクセスを提供する保存部。実行時ファイルの存在確認、文字コードを指定した読込、組込みリソースの読込、実行時ファイルの保存を担当する。

### 主な責務

- アプリケーションデータ領域の実行時設定パスを提供する。
- 実行時設定ファイルの存在確認と非同期読込を行う。
- アセンブリに組み込まれた初期設定を非同期で読み込む。
- 保存先ディレクトリを準備し、実行時設定を書き込む。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| 定数 | internal const | string | DefaultResourceName | 組込み初期設定のリソース名。 |
| プロパティ | public | string | RuntimeConfigPath | アプリケーションデータ領域にある実行時設定ファイルの絶対パス。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | public | bool | RuntimeConfigExists | 実行時設定ファイルが存在するか確認する。 |
| ② | public | Task<string> | ReadRuntimeAsync | 実行時設定ファイルを指定文字コードで読み込む。 |
| ③ | public | Task<string> | ReadDefaultAsync | 組込み初期設定リソースを指定文字コードで読み込む。 |
| ④ | public | Task | WriteRuntimeAsync | 保存先を準備して実行時設定ファイルを書き込む。 |

## メソッド詳細

### ①. RuntimeConfigExists

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public bool RuntimeConfigExists()` |
| 可視性 | public |
| 戻り値 | bool |
| 戻り値内容 | 実行時設定ファイルが存在する場合はtrue、それ以外はfalse。 |

処理内容:

- ① 実行時設定ファイルパス（RuntimeConfigPath）を取得する。
- ② 対象ファイルの存在を確認する。
- ③ 存在確認結果を返す。

備考: -

### ②. ReadRuntimeAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public Task<string> ReadRuntimeAsync(Encoding encoding, CancellationToken cancellationToken)` |
| 可視性 | public |
| 戻り値 | Task<string> |
| 戻り値内容 | 実行時設定ファイルから読み込んだ文字列。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Encoding | 読込文字コード | encoding |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① 実行時設定ファイルパス（RuntimeConfigPath）を取得する。
- ② 指定された文字コードとキャンセルトークンでファイルを非同期に読み込む。
- ③ 読み込んだ文字列を返すタスクを呼出元へ返す。

備考: ファイル読込例外は設定サービス側で処理される。

### ③. ReadDefaultAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task<string> ReadDefaultAsync(Encoding encoding, CancellationToken cancellationToken)` |
| 可視性 | public |
| 戻り値 | Task<string> |
| 戻り値内容 | 組込み初期設定リソースから読み込んだ文字列。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Encoding | 読込文字コード | encoding |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① 本クラスを含むアセンブリを取得する。
- ② 既定リソース名（DefaultResourceName）で組込みリソースのストリームを取得する。
- ③ リソースが存在しない場合は、リソース名と設定ファイル名を含むファイル未検出例外（FileNotFoundException）を送出する。
- ④ 指定文字コードを使用し、BOM検出を有効にしてストリームリーダーを作成する。
- ⑤ キャンセルトークンを使用して内容を最後まで非同期に読み込み、文字列を返す。
- ⑥ 読込完了後にストリームとリーダーを解放する。

備考: -

### ④. WriteRuntimeAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task WriteRuntimeAsync(string json, Encoding encoding, CancellationToken cancellationToken)` |
| 可視性 | public |
| 戻り値 | Task |
| 戻り値内容 | 実行時設定ファイルの保存完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | 保存対象JSON | json |
| Encoding | 保存文字コード | encoding |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① アプリケーションデータ領域のディレクトリを作成する。
- ② 実行時設定ファイルパス（RuntimeConfigPath）を保存先として使用する。
- ③ 指定された文字コードとキャンセルトークンでJSON文字列を非同期に書き込む。
- ④ 書込完了まで待機する。

備考: 既存の実行時設定ファイルがある場合は内容を置き換える。

## 処理フロー/注意事項

- RuntimeConfigPathはFileSystem.AppDataDirectoryと既定設定ファイル名から構成する。
- 実行時設定は端末のファイルシステムから読み込み、初期設定はアセンブリの組込みリソースから読み込む。
- WriteRuntimeAsyncは保存前にアプリケーションデータ領域を作成する。

### 注意事項

- 読込・保存に使用する文字コードは呼出元の設定サービスが指定する。
- 組込みリソース名はTabetPos.DeviceCtrl.Resources.Raw.device_controller_config.jsonである。
