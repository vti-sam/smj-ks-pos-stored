# PS-DEVICE-02 タブレットPOS デバイス制御 設定サービス プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-DEVICE-02 |
| 文書名 | タブレットPOS デバイス制御 設定サービス プログラム仕様書 |
| 対象 | タブレットPOS / デバイス制御設定サービス |
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
| 機能名 | デバイス制御設定サービス |
| 物理クラス名 | DeviceControllerConfigService |
| 名前空間 | Pos.DeviceCtrl.Configuration |
| アクセス修飾子 | internal sealed |
| 継承/実装 | - |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/tablet-pos/Pos.DeviceCtrl/Configuration/DeviceControllerConfigService.cs |
| 対象クラス | DeviceControllerConfigService |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

アプリケーション起動時に端末別のランタイムJSONを読み込み、検証できた設定をSQLiteへ再登録する設定管理部。JSONを取得または使用できない場合は既存のSQLite設定へフォールバックする。SQLiteも未初期化の場合は組込みデフォルトJSONを登録する。実行中の読込元と設定更新時の保存先はSQLiteとする。

### 主な責務

- アプリケーション起動時にランタイムJSONを読み込み、検証済み設定をSQLiteへ再登録する。
- ランタイムJSONを取得または使用できない場合は、既存のSQLite設定へ切り替える。
- JSONとSQLiteのどちらも使用できない場合は、組込み初期設定へ切り替える。
- 組込み初期設定を読み込めない場合はエラーを記録して呼出元へ通知する。
- JSONまたは組込み初期設定の取込と検証に成功した設定をSQLiteへ保存する。
- 設定更新時は検証済み設定をSQLiteへ保存する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| コンストラクタ引数 | internal | IDeviceControllerConfigStorage | storage | SQLite設定の読込・保存先、および起動時取込JSONの読込元。 |
| コンストラクタ引数 | internal | IAppLogger | logger | 設定読込失敗時の警告およびエラー出力先。 |
| フィールド | private static readonly | Encoding | Utf8NoBom | 起動時取込JSONの読込に使用するUTF-8（BOMなし）エンコーディング。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | internal | - | DeviceControllerConfigService | 設定ストレージとログ出力先を受け取って初期化する。 |
| ② | public | Task<DeviceConfig> | LoadAsync | 起動時にJSONをSQLiteへ取り込み、取込不可時はSQLiteへフォールバックして読み込む。 |
| ③ | public | Task | SaveAsync | 検証済み設定をSQLiteへ保存する。 |
| ④ | private | Task<DeviceConfig> | LoadDefaultAsync | 組込みデフォルト設定を読み込み、設定モデルへ変換する。 |
| ⑤ | private static | DeviceConfig | Deserialize | JSON文字列をデバイス設定へ変換し、検証する。 |

## メソッド詳細

### ①. DeviceControllerConfigService

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `internal sealed class DeviceControllerConfigService(IDeviceControllerConfigStorage storage, IAppLogger logger)` |
| 可視性 | internal |
| 戻り値 | - |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IDeviceControllerConfigStorage | 設定ストレージ | storage |
| IAppLogger | アプリケーションログ出力先 | logger |

処理内容:

- ① 設定ストレージを受け取り、SQLite設定と起動時取込JSONへアクセスできるようにする。
- ② アプリケーションログ出力先を受け取る。
- ③ 読込失敗時に設定の切替理由または処理中断理由を記録できる状態にする。

備考: 依存性注入コンテナーへシングルトンとして登録される。

### ②. LoadAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task<DeviceConfig> LoadAsync(CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task<DeviceConfig> |
| 戻り値内容 | 起動時取込またはフォールバックの後、SQLiteから読み込んだデバイス設定。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① ランタイムJSONが存在するか確認する。
- ② 存在する場合はUTF-8（BOMなし）で読み込み、デバイス設定へ変換する。
- ③ JSONを検証できた場合はSQLiteへ再登録する。
- ④ JSONの読込または変換に失敗した場合は対象パスを含む警告ログを出力し、既存のSQLite設定へフォールバックする。
- ⑤ SQLiteから設定を読み込み、存在する場合は検証して返す。
- ⑥ SQLiteにも設定がない場合はLoadDefaultAsyncで組込みデフォルト設定を読み込む。
- ⑦ 組込みデフォルト設定をSQLiteへ保存した後、SQLiteから再読込して返す。
- ⑧ キャンセル例外は警告またはエラーへ変換せず、そのまま再送出する。

備考: アプリケーションを再起動した場合もJSONの取込を再試行する。JSONを取得できない場合は前回SQLiteへ保存した設定を使用する。

### ③. SaveAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task SaveAsync(DeviceConfig config, CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task |
| 戻り値内容 | SQLiteへの保存完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| DeviceConfig | 保存対象設定 | config |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① 保存対象設定がnullの場合はArgumentNullExceptionを送出する。
- ② 保存対象設定の必須項目と参照関係を検証する。
- ③ 設定ストレージへSQLiteへの保存を依頼する。

備考: SQLiteへの保存に失敗した場合は例外を呼出元へ通知し、実行中の設定を切り替えない。

### ④. LoadDefaultAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private async Task<DeviceConfig> LoadDefaultAsync(CancellationToken cancellationToken)` |
| 可視性 | private |
| 戻り値 | Task<DeviceConfig> |
| 戻り値内容 | 組込みデフォルトJSONから変換したデバイス設定。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① UTF-8（BOMなし）を指定して組込みデフォルトJSONを読み込む。
- ② JSONをデバイス設定へ変換し、検証して返す。
- ③ 読込または変換に失敗した場合は、リソース名を含むエラーログを出力して例外を再送出する。
- ④ キャンセル例外はログ出力の対象とせず、そのまま再送出する。

備考: 本メソッドはJSONとSQLiteのどちらからも設定を取得できない場合にだけ使用する。

### ⑤. Deserialize

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static DeviceConfig Deserialize(string json, string source)` |
| 可視性 | private static |
| 戻り値 | DeviceConfig |
| 戻り値内容 | JSON文字列から変換したデバイス設定。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | 設定JSON | json |
| string | 設定取得元 | source |

処理内容:

- ① JSON文字列をデバイス設定（DeviceConfig）へ変換する。
- ② 変換結果が存在しない場合は、設定取得元を含むJSONシリアル化例外（JsonSerializationException）を送出する。
- ③ 変換した設定の必須項目と参照関係を検証する。
- ④ 検証済み設定を返す。

備考: JSON形式不正時の例外は呼出元のLoadAsyncで処理される。

## 処理フロー/注意事項

- LoadAsyncは起動ごとにランタイムJSONの取込を試みる。取込できた場合はSQLiteへ再登録し、取込できない場合は既存のSQLite設定を使用する。
- JSON取込後を含め、実行中に使用する設定はSQLiteから読み込む。SQLiteも未初期化の場合だけ組込みデフォルトJSONを登録する。
- SaveAsyncは検証済み設定をSQLiteへ保存する。ランタイムJSONおよび組込みデフォルトJSONは変更しない。
- Deserializeは起動時取込のランタイムJSONと、SQLite未初期化時の組込みデフォルトJSONで共通使用する。

### 注意事項

- キャンセル要求は設定切替の対象とせず、呼出元へ伝播する。
- 組込み初期設定も使用できない場合は初期化を継続しない。
- 本サービスの登録はServiceCollectionExtensions、呼出しはDeviceManagerが担当する。
