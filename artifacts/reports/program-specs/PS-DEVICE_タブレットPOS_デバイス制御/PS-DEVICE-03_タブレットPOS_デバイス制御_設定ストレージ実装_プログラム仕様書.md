# PS-DEVICE-03 タブレットPOS デバイス制御 設定ストレージ実装 プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-DEVICE-03 |
| 文書名 | タブレットPOS デバイス制御 設定ストレージ実装 プログラム仕様書 |
| 対象 | タブレットPOS / デバイス制御設定ストレージ実装 |
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
| 機能名 | デバイス制御設定ストレージ実装 |
| 物理クラス名 | SqliteDeviceControllerConfigStorage |
| 名前空間 | Pos.DeviceCtrl.Configuration |
| アクセス修飾子 | internal sealed |
| 継承/実装 | IDeviceControllerConfigStorage |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/tablet-pos/Pos.DeviceCtrl/Configuration/SqliteDeviceControllerConfigStorage.cs |
| 対象クラス | SqliteDeviceControllerConfigStorage |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

デバイス制御設定のJSONファイルとSQLiteへのアクセスを提供する保存部。SQLiteからの設定モデル復元とSQLiteへの保存を担当し、ランタイムJSONを起動時取込用、組込みデフォルトJSONを最終フォールバック用として読み込む。

### 主な責務

- アプリケーションデータ領域の起動時取込JSONパスとSQLiteパスを提供する。
- 起動時にランタイムJSONを読み込み、必要に応じて組込みデフォルトJSONを読み込む。
- SQLiteの4テーブルから設定モデルを復元する。
- SQLiteの4テーブルを準備し、検証済み設定を1トランザクションで全件置換する。
- SQLiteへの反映に失敗した場合はトランザクションをロールバックする。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| コンストラクタ引数 | internal | string | appDataPath | JSONファイルとSQLiteファイルを配置するアプリケーションデータ領域。 |
| 定数 | internal const | string | DefaultResourceName | 組込みデフォルトJSONのリソース名。 |
| 定数 | internal const | string | DatabaseFileName | SQLiteファイル名。 |
| プロパティ | public | string | DatabasePath | アプリケーションデータ領域にあるSQLiteファイルの絶対パス。 |
| プロパティ | public | string | RuntimeConfigPath | アプリケーションデータ領域にある起動時取込用JSONの絶対パス。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | internal | - | SqliteDeviceControllerConfigStorage | アプリケーションデータ領域を受け取って初期化する。 |
| ② | public | bool | RuntimeConfigExists | 起動時取込用JSONが存在するか確認する。 |
| ③ | public | Task<string> | ReadRuntimeAsync | 起動時取込用JSONを読み込む。 |
| ④ | public | Task<string> | ReadDefaultAsync | 組込みデフォルトJSONを読み込む。 |
| ⑤ | public | Task<DeviceConfig?> | ReadDatabaseAsync | SQLiteから設定モデルを復元する。 |
| ⑥ | public | Task | WriteDatabaseAsync | 検証済み設定をSQLiteへ保存する。 |
| ⑦ | private | SqliteConnection | CreateConnection | SQLite接続を生成する。 |
| ⑧ | private static | Task | EnableForeignKeysAsync | 外部キー制約を有効にする。 |
| ⑨ | private static | Task | EnsureSchemaAsync | SQLiteのテーブルとインデックスを準備する。 |
| ⑩ | private static | Task | DeleteExistingConfigurationAsync | 現行の設定データを削除する。 |
| ⑪ | private static | Task | InsertDeviceSpecificationsAsync | デバイス仕様と接続設定を登録する。 |
| ⑫ | private static | Task | InsertActiveDeviceMappingsAsync | 有効デバイス対応を登録する。 |
| ⑬ | private static | Task | InsertNamedPipeSettingsAsync | 名前付きパイプ設定を登録する。 |
| ⑭ | private static | SqliteCommand | CreateCommand | トランザクションに紐付けたSQLiteコマンドを生成する。 |
| ⑮ | private static | Task | ExecuteNonQueryAsync | 結果行を返さないSQLを実行する。 |
| ⑯ | private static | void | AddParameter | SQLiteコマンドにパラメータを追加する。 |
| ⑰ | private static | object? | NormalizeOptionalText | 未使用の任意文字列をnullへ変換する。 |
| ⑱ | private static | int? | ParseOptionalInteger | 任意の文字列を整数へ変換する。 |
| ⑲ | private static | Task<List<DeviceSpec>> | ReadDeviceSpecificationsAsync | デバイス仕様と接続設定を読み込む。 |
| ⑳ | private static | Task<ActiveDevice> | ReadActiveDeviceMappingsAsync | 有効デバイス対応を読み込む。 |
| ㉑ | private static | Task<NamedPipeSettings?> | ReadNamedPipeSettingsAsync | 名前付きパイプ設定を読み込む。 |
| ㉒ | private static | void | AddActiveDeviceEntry | 種別別の有効デバイス一覧へ設定を追加する。 |
| ㉓ | private static | string? | ReadOptionalString | NULL許容文字列を読み込む。 |
| ㉔ | private static | string? | ReadOptionalInteger | NULL許容整数を設定モデル用文字列へ変換する。 |

## メソッド詳細

### ①. SqliteDeviceControllerConfigStorage

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `internal sealed class SqliteDeviceControllerConfigStorage(string appDataPath)` |
| 可視性 | internal |
| 戻り値 | - |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | アプリケーションデータ領域 | appDataPath |

処理内容:

- ① JSONファイルとSQLiteファイルの配置先として、アプリケーションデータ領域を保持する。

備考: ServiceCollectionExtensionsがFileSystem.AppDataDirectoryを指定して生成する。

### ②. RuntimeConfigExists

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public bool RuntimeConfigExists()` |
| 可視性 | public |
| 戻り値 | bool |
| 戻り値内容 | ランタイムJSONが存在する場合はtrue、それ以外はfalse。 |

処理内容:

- ① ランタイムJSONパスの存在確認結果を返す。

備考: -

### ③. ReadRuntimeAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public Task<string> ReadRuntimeAsync(Encoding encoding, CancellationToken cancellationToken)` |
| 可視性 | public |
| 戻り値 | Task<string> |
| 戻り値内容 | ランタイムJSONから読み込んだ文字列。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Encoding | 読込文字コード | encoding |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① ランタイムJSONを指定文字コードで非同期に読み込む。

備考: 読込例外は設定サービスに伝播する。

### ④. ReadDefaultAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task<string> ReadDefaultAsync(Encoding encoding, CancellationToken cancellationToken)` |
| 可視性 | public |
| 戻り値 | Task<string> |
| 戻り値内容 | 組込みデフォルトJSONから読み込んだ文字列。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Encoding | 読込文字コード | encoding |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① 対象クラスを含むアセンブリを取得する。
- ② 組込みリソースのストリームを取得する。
- ③ リソースが存在しない場合はFileNotFoundExceptionを送出する。
- ④ BOM検出を有効にしてストリームを読み込み、文字列を返す。

備考: 組込みリソース名はPos.DeviceCtrl.Resources.Raw.device_controller_config.jsonである。

### ⑤. ReadDatabaseAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task<DeviceConfig?> ReadDatabaseAsync(CancellationToken cancellationToken)` |
| 可視性 | public |
| 戻り値 | Task<DeviceConfig?> |
| 戻り値内容 | SQLiteから復元した設定。DBファイルが存在しない場合、またはデバイス仕様が未登録の場合はnull。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① SQLiteファイルが存在しない場合はnullを返す。
- ② SQLite接続を開き、外部キー制約を有効にしてスキーマを準備する。
- ③ デバイス仕様と接続設定を定義順に読み込む。
- ④ デバイス仕様が0件の場合は未初期化としてnullを返す。
- ⑤ 有効デバイス対応と名前付きパイプ設定を読み込み、DeviceConfigを復元して返す。

備考: JSONの取込に成功した場合はSQLiteへ再登録し、取込に失敗した場合は既存のSQLite設定を読み込む。

### ⑥. WriteDatabaseAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task WriteDatabaseAsync(DeviceConfig config, CancellationToken cancellationToken)` |
| 可視性 | public |
| 戻り値 | Task |
| 戻り値内容 | SQLiteへの設定保存完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| DeviceConfig | 反映対象設定 | config |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① 反映対象設定を検証する。
- ② アプリケーションデータ領域を作成する。
- ③ SQLite接続を開き、外部キー制約を有効にする。
- ④ テーブルとインデックスを準備する。
- ⑤ トランザクションを開始する。
- ⑥ 現行の設定データを削除し、デバイス仕様、接続設定、有効デバイス対応、名前付きパイプ設定を登録する。
- ⑦ 全ての登録に成功した場合はトランザクションをコミットする。
- ⑧ 登録処理で例外が発生した場合はトランザクションをロールバックし、例外を再送出する。

備考: 保存処理はランタイムJSONを更新しない。

### ⑦. CreateConnection

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private SqliteConnection CreateConnection()` |
| 可視性 | private |
| 戻り値 | SqliteConnection |
| 戻り値内容 | 生成したSQLite接続。 |

処理内容:

- ① SQLiteファイルパス、読書き・新規作成モード、外部キー有効化を含む接続文字列を作成する。
- ② SQLite接続を生成して返す。

備考: -

### ⑧. EnableForeignKeysAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static async Task EnableForeignKeysAsync(SqliteConnection connection, CancellationToken cancellationToken)` |
| 可視性 | private static |
| 戻り値 | Task |
| 戻り値内容 | 外部キー有効化の完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| SqliteConnection | SQLite接続 | connection |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① `PRAGMA foreign_keys = ON;`を実行する。

備考: -

### ⑨. EnsureSchemaAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static async Task EnsureSchemaAsync(SqliteConnection connection, CancellationToken cancellationToken)` |
| 可視性 | private static |
| 戻り値 | Task |
| 戻り値内容 | スキーマ準備の完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| SqliteConnection | SQLite接続 | connection |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① deviceSpecifications、deviceConnectionSettings、activeDeviceMappings、namedPipeSettingsと必要なインデックスを作成する。

備考: 既に存在するテーブルとインデックスは再作成しない。

### ⑩. DeleteExistingConfigurationAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static async Task DeleteExistingConfigurationAsync(SqliteConnection connection, SqliteTransaction transaction, CancellationToken cancellationToken)` |
| 可視性 | private static |
| 戻り値 | Task |
| 戻り値内容 | 現行設定データの削除完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| SqliteConnection | SQLite接続 | connection |
| SqliteTransaction | SQLiteトランザクション | transaction |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① 参照関係に従って有効デバイス対応、接続設定、デバイス仕様、名前付きパイプ設定の順に削除する。

備考: -

### ⑪. InsertDeviceSpecificationsAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static async Task InsertDeviceSpecificationsAsync(SqliteConnection connection, SqliteTransaction transaction, IReadOnlyList<DeviceSpec> devices, CancellationToken cancellationToken)` |
| 可視性 | private static |
| 戻り値 | Task |
| 戻り値内容 | デバイス仕様と接続設定の登録完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| SqliteConnection | SQLite接続 | connection |
| SqliteTransaction | SQLiteトランザクション | transaction |
| IReadOnlyList<DeviceSpec> | デバイス仕様一覧 | devices |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① デバイス仕様をJSONの定義順でdeviceSpecificationsへ登録する。
- ② 接続設定が存在するデバイスはdeviceConnectionSettingsへ登録する。
- ③ 任意文字列は空の場合にnullへ変換し、数値文字列は整数へ変換する。

備考: 接続設定がnullのデバイスはdeviceConnectionSettingsへ登録しない。

### ⑫. InsertActiveDeviceMappingsAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static async Task InsertActiveDeviceMappingsAsync(SqliteConnection connection, SqliteTransaction transaction, ActiveDevice activeDevices, CancellationToken cancellationToken)` |
| 可視性 | private static |
| 戻り値 | Task |
| 戻り値内容 | 有効デバイス対応の登録完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| SqliteConnection | SQLite接続 | connection |
| SqliteTransaction | SQLiteトランザクション | transaction |
| ActiveDevice | 有効デバイス設定 | activeDevices |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① デバイス種別ごとの有効デバイス一覧を列挙する。
- ② 各一覧をJSONの定義順でactiveDeviceMappingsへ登録する。

備考: 一覧がnullのデバイス種別は登録しない。

### ⑬. InsertNamedPipeSettingsAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static async Task InsertNamedPipeSettingsAsync(SqliteConnection connection, SqliteTransaction transaction, NamedPipeSettings? settings, CancellationToken cancellationToken)` |
| 可視性 | private static |
| 戻り値 | Task |
| 戻り値内容 | 名前付きパイプ設定の登録完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| SqliteConnection | SQLite接続 | connection |
| SqliteTransaction | SQLiteトランザクション | transaction |
| NamedPipeSettings? | 名前付きパイプ設定 | settings |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① 名前付きパイプ設定がnullの場合は処理を終了する。
- ② 設定IDを1としてnamedPipeSettingsへ登録する。

備考: -

### ⑭. CreateCommand

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static SqliteCommand CreateCommand(SqliteConnection connection, SqliteTransaction transaction, string sql)` |
| 可視性 | private static |
| 戻り値 | SqliteCommand |
| 戻り値内容 | トランザクションに紐付くSQLiteコマンド。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| SqliteConnection | SQLite接続 | connection |
| SqliteTransaction | SQLiteトランザクション | transaction |
| string | SQL文 | sql |

処理内容:

- ① SQLite接続からコマンドを生成する。
- ② トランザクションとSQL文を設定して返す。

備考: -

### ⑮. ExecuteNonQueryAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static async Task ExecuteNonQueryAsync(SqliteConnection connection, SqliteTransaction transaction, string sql, CancellationToken cancellationToken)` |
| 可視性 | private static |
| 戻り値 | Task |
| 戻り値内容 | SQL実行の完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| SqliteConnection | SQLite接続 | connection |
| SqliteTransaction | SQLiteトランザクション | transaction |
| string | SQL文 | sql |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① トランザクションに紐付くSQLiteコマンドを生成する。
- ② SQLを非同期に実行する。

備考: -

### ⑯. AddParameter

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static void AddParameter(SqliteCommand command, string name, object? value)` |
| 可視性 | private static |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| SqliteCommand | SQLiteコマンド | command |
| string | パラメータ名 | name |
| object? | パラメータ値 | value |

処理内容:

- ① 値がnullの場合はDBNull.Valueへ変換する。
- ② コマンドにパラメータを追加する。

備考: -

### ⑰. NormalizeOptionalText

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static object? NormalizeOptionalText(string? value)` |
| 可視性 | private static |
| 戻り値 | object? |
| 戻り値内容 | 入力文字列またはnull。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string? | 任意文字列 | value |

処理内容:

- ① 入力がnullまたは空文字列の場合はnullを返す。
- ② それ以外は入力文字列を返す。

備考: -

### ⑱. ParseOptionalInteger

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static int? ParseOptionalInteger(string? value)` |
| 可視性 | private static |
| 戻り値 | int? |
| 戻り値内容 | 変換した整数またはnull。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string? | 任意数値文字列 | value |

処理内容:

- ① 入力がnullまたは空文字列の場合はnullを返す。
- ② それ以外は固定カルチャの整数形式で変換して返す。

備考: 整数へ変換できない場合は変換例外が呼出元へ伝播する。

### ⑲. ReadDeviceSpecificationsAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static async Task<List<DeviceSpec>> ReadDeviceSpecificationsAsync(SqliteConnection connection, CancellationToken cancellationToken)` |
| 可視性 | private static |
| 戻り値 | Task<List<DeviceSpec>> |
| 戻り値内容 | 定義順で復元したデバイス仕様一覧。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| SqliteConnection | SQLite接続 | connection |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① deviceSpecificationsとdeviceConnectionSettingsを左外部結合し、definitionOrder順に読み込む。
- ② NULL許容の接続設定をDeviceConfigへ変換し、DeviceSpecへ設定する。
- ③ 復元したデバイス仕様一覧を返す。

### ⑳. ReadActiveDeviceMappingsAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static async Task<ActiveDevice> ReadActiveDeviceMappingsAsync(SqliteConnection connection, CancellationToken cancellationToken)` |
| 可視性 | private static |
| 戻り値 | Task<ActiveDevice> |
| 戻り値内容 | OS別・種別別に復元した有効デバイス設定。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| SqliteConnection | SQLite接続 | connection |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① activeDeviceMappingsをdeviceType、targetOs、selectionOrder順に読み込む。
- ② 各行をActiveDeviceEntryへ変換し、デバイス種別別の一覧へ追加する。

### ㉑. ReadNamedPipeSettingsAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static async Task<NamedPipeSettings?> ReadNamedPipeSettingsAsync(SqliteConnection connection, CancellationToken cancellationToken)` |
| 可視性 | private static |
| 戻り値 | Task<NamedPipeSettings?> |
| 戻り値内容 | 名前付きパイプ設定。登録されていない場合はnull。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| SqliteConnection | SQLite接続 | connection |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① namedPipeSettingsからsettingsIdが1の行を読み込む。
- ② 行が存在する場合はNamedPipeSettingsへ変換し、存在しない場合はnullを返す。

### ㉒. AddActiveDeviceEntry

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static void AddActiveDeviceEntry(ActiveDevice activeDevices, string deviceType, ActiveDeviceEntry entry)` |
| 可視性 | private static |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| ActiveDevice | 有効デバイス設定 | activeDevices |
| string | デバイス種別 | deviceType |
| ActiveDeviceEntry | 追加対象設定 | entry |

処理内容:

- ① deviceTypeに対応するActiveDeviceの一覧を生成または取得する。
- ② 対象一覧へentryを追加する。
- ③ 未対応のdeviceTypeの場合はInvalidDataExceptionを送出する。

### ㉓. ReadOptionalString

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static string? ReadOptionalString(SqliteDataReader reader, int ordinal)` |
| 可視性 | private static |
| 戻り値 | string? |
| 戻り値内容 | 指定列の文字列。SQLiteの値がNULLの場合はnull。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| SqliteDataReader | SQLiteデータリーダー | reader |
| int | 列番号 | ordinal |

処理内容:

- ① 指定列がNULLの場合はnull、それ以外は文字列値を返す。

### ㉔. ReadOptionalInteger

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static string? ReadOptionalInteger(SqliteDataReader reader, int ordinal)` |
| 可視性 | private static |
| 戻り値 | string? |
| 戻り値内容 | 指定列の整数を固定カルチャで変換した文字列。SQLiteの値がNULLの場合はnull。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| SqliteDataReader | SQLiteデータリーダー | reader |
| int | 列番号 | ordinal |

処理内容:

- ① 指定列がNULLの場合はnullを返す。
- ② 整数値をInvariantCultureで文字列へ変換して返す。

## 処理フロー/注意事項

- 起動時はランタイムJSONの取込を試行し、使用できる場合はSQLiteへ再登録する。
- JSONを取得または使用できない場合は既存のSQLite設定を読み込む。SQLiteも未初期化の場合は組込みデフォルトJSONを登録する。
- JSON取込後を含め、実行中に使用する設定はSQLiteから読み込む。
- データベース反映時は4テーブルの現行データを削除し、同じトランザクションで新しい設定を登録する。
- 外部キー制約はSQLite接続ごとに有効にする。

### 注意事項

- ランタイムJSONはdevice_controller_config.json、SQLiteファイルはdevice_controller_config.dbである。
- SQLiteの物理テーブル構成はDB-DEVICE-01で定義する。
