# PS-DEVICE-01 タブレットPOS デバイス制御 デバイスマネージャー プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-DEVICE-01 |
| 文書名 | タブレットPOS デバイス制御 デバイスマネージャー プログラム仕様書 |
| 対象 | タブレットPOS / デバイス制御デバイスマネージャー |
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
| 機能名 | デバイス制御デバイスマネージャー |
| 物理クラス名 | DeviceManager |
| 名前空間 | Pos.DeviceCtrl |
| アクセス修飾子 | public |
| 継承/実装 | - |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/tablet-pos/Pos.DeviceCtrl/DeviceManager.cs |
| 対象クラス | DeviceManager |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

端末アプリケーションで使用するデバイス設定を読み込み、実行環境に応じたデバイス制御方式を提供する管理部。設定の初期化と保存、デバイス候補の保持、プラットフォーム別の制御方式登録、使用対象デバイスの選択を一元管理する。

### 主な責務

- デバイス設定を一度だけ読み込み、同時実行時の初期化を排他制御する。
- SQLiteへの保存が完了した設定を、実行中のデバイス構成へ反映する。
- OSとデバイス種別に応じた有効デバイスを選択し、制御方式を生成する。
- Windows環境では名前付きパイプの通信設定をクライアントとイベント受信部へ反映する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| 定数 | public const | string | DefaultConfigFileName | 実行時デバイス設定ファイル名。 |
| フィールド | private | Dictionary<string, DeviceSpec> | _devices | デバイスIDをキーとするデバイス仕様辞書。 |
| フィールド | private | DeviceConfig? | _config | 読み込み済みのデバイス設定。 |
| フィールド | private | bool | _initialized | 設定反映済みかを示すフラグ。 |
| フィールド | private readonly | SemaphoreSlim | _initLock | 初期化および保存処理の排他制御。 |
| フィールド | private readonly | IServiceProvider | _serviceProvider | 設定サービスと制御方式の依存先取得元。 |
| フィールド | private readonly | IDeviceEventReceiver | _deviceEventReceiver | デバイスイベント受信部。 |
| フィールド | private readonly | INamedPipeClient | _namedPipeClient | Windows環境の名前付きパイプクライアント。 |
| プロパティ | private | DeviceControllerConfigService | ConfigService | サービスプロバイダーから取得する設定サービス。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | public | - | DeviceManager | サービスプロバイダーから必要な通信依存先を取得して初期化する。 |
| ② | public | void | InitializeDevice | JSON文字列からデバイス仕様辞書を再構築する。 |
| ③ | public | Task | InitializeAsync | デバイス設定を読み込み、一度だけ実行構成へ反映する。 |
| ④ | public | Task | SaveConfigAsync | デバイス設定を保存し、保存した内容を実行構成へ反映する。 |
| ⑤ | private | void | ApplyConfig | 設定、制御方式、デバイス一覧、通信設定を実行状態へ反映する。 |
| ⑥ | private | Task | EnsureInitializedAsync | 未初期化の場合に初期化処理を実行する。 |
| ⑦ | private static | string | GetRuntimeOs | 実行中のOS識別文字列を返す。 |
| ⑧ | public | Task<IBarcodeScannerStrategy?> | GetScannerStrategyAsync | 実行環境で有効なスキャナー制御方式を取得する。 |
| ⑨ | public | Task<IPrinterStrategy?> | GetPrinterStrategyAsync | 実行環境で有効なプリンター制御方式を取得する。 |
| ⑩ | public | Task<IPaymentStrategy?> | GetPaymentStrategyAsync | 実行環境で有効な決済制御方式を取得する。 |
| ⑪ | public | Task<ICashChangerStrategy?> | GetCashChangerStrategyAsync | 実行環境で有効な自動釣銭機制御方式を取得する。 |
| ⑫ | public | Task<ICustomerDisplayStrategy?> | GetCustomerDisplayStrategyAsync | 実行環境で有効なカスタマディスプレイ制御方式を取得する。 |
| ⑬ | public | Task<IDrawerStrategy?> | GetDrawerStrategyAsync | 実行環境で有効なドロワー制御方式を取得する。 |
| ⑭ | public | Task<IKeyboardStrategy?> | GetKeyboardStrategyAsync | 実行環境で有効なキーボード制御方式を取得する。 |
| ⑮ | public | DeviceSpec | GetActiveDevice | デバイス種別とOSに一致する有効デバイス仕様を取得する。 |
| ⑯ | public | void | RegisterDeviceStrategy | プラットフォーム別のデバイス制御方式を登録する。 |
| ⑰ | private | void | ConfigureNamedPipe | Windows環境の名前付きパイプ設定を通信部へ反映する。 |

## メソッド詳細

### ①. DeviceManager

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public DeviceManager(IServiceProvider serviceProvider)` |
| 可視性 | public |
| 戻り値 | - |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IServiceProvider | サービス取得元 | serviceProvider |

処理内容:

- ① サービス取得元を保持する。
- ② デバイスイベント受信部をサービス取得元から取得する。
- ③ Windows環境では名前付きパイプクライアントをサービス取得元から取得する。

備考: 本クラスは依存性注入コンテナーへシングルトンとして登録される。

### ②. InitializeDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void InitializeDevice(string deviceJson)` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | デバイス情報JSON | deviceJson |

処理内容:

- ① 現在のデバイス仕様辞書をクリアする。
- ② JSON文字列をデバイス仕様辞書へ変換する。
- ③ 変換結果を管理対象のデバイス仕様辞書として保持する。

備考: -

### ③. InitializeAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task InitializeAsync(CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task |
| 戻り値内容 | 初期化処理の完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① 初期化済みの場合は処理を終了する。
- ② セマフォを取得し、同時に複数の初期化処理が実行されないようにする。
- ③ セマフォ取得後に初期化状態を再確認する。
- ④ 設定サービスからデバイス設定を読み込む。
- ⑤ 読み込んだ設定をApplyConfigで実行構成へ反映する。
- ⑥ 成否にかかわらずセマフォを解放する。

備考: アプリケーション生成時にMauiProgramから同期的に完了待ちされる。

### ④. SaveConfigAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task SaveConfigAsync(DeviceConfig config, CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task |
| 戻り値内容 | 設定保存および反映処理の完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| DeviceConfig | 保存対象設定 | config |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① 保存対象設定がnullの場合はArgumentNullExceptionを送出する。
- ② セマフォを取得し、初期化または他の保存処理との同時実行を防止する。
- ③ 設定サービスへSQLiteへの設定保存を依頼する。
- ④ 保存した設定をApplyConfigで実行構成へ反映する。
- ⑤ 成否にかかわらずセマフォを解放する。

備考: 設定サービスがSQLiteへの保存を完了した後に、同じ設定インスタンスを実行状態へ反映する。保存に失敗した場合は反映しない。

### ⑤. ApplyConfig

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void ApplyConfig(DeviceConfig config)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| DeviceConfig | 反映対象設定 | config |

処理内容:

- ① 設定を現在のデバイス設定として保持する。
- ② プラットフォーム別のデバイス制御方式を登録する。
- ③ 設定内のデバイス一覧からデバイス仕様辞書を再構築する。
- ④ Windows環境では名前付きパイプ設定を通信部へ反映する。
- ⑤ 初期化済みフラグをtrueにする。

備考: -

### ⑥. EnsureInitializedAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private async Task EnsureInitializedAsync()` |
| 可視性 | private |
| 戻り値 | Task |
| 戻り値内容 | 初期化確認の完了を表すタスク。 |

処理内容:

- ① InitializeAsyncを呼び出す。
- ② 初期化済みの場合はInitializeAsync側で処理を省略する。
- ③ 初期化が必要な場合は設定読込と反映の完了を待つ。

備考: 各デバイス制御方式取得メソッドの先頭で実行される。

### ⑦. GetRuntimeOs

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static string GetRuntimeOs()` |
| 可視性 | private static |
| 戻り値 | string |
| 戻り値内容 | 「windows」、「ios」、「android」のいずれかのOS識別文字列。 |

処理内容:

- ① iOSビルドでは「ios」を返す。
- ② Androidビルドでは「android」を返す。
- ③ その他のビルドでは「windows」を返す。

備考: コンパイル対象プラットフォームにより返却値が決定される。

### ⑧. GetScannerStrategyAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task<IBarcodeScannerStrategy?> GetScannerStrategyAsync()` |
| 可視性 | public |
| 戻り値 | Task<IBarcodeScannerStrategy?> |
| 戻り値内容 | 有効なスキャナー制御方式。未設定の場合はnull。 |

処理内容:

- ① デバイス設定の初期化完了を待つ。
- ② 現在のOSとlocal_scannerを条件に有効デバイスを選択する。
- ③ 制御方式クラス名が空の場合はnullを返す。
- ④ 制御方式ファクトリーでスキャナー制御方式を生成して返す。

備考: -

### ⑨. GetPrinterStrategyAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task<IPrinterStrategy?> GetPrinterStrategyAsync()` |
| 可視性 | public |
| 戻り値 | Task<IPrinterStrategy?> |
| 戻り値内容 | 有効なプリンター制御方式。未設定の場合はnull。 |

処理内容:

- ① デバイス設定の初期化完了を待つ。
- ② 現在のOSとlocal_printerを条件に有効デバイスを選択する。
- ③ 制御方式クラス名が空の場合はnullを返す。
- ④ 制御方式ファクトリーでプリンター制御方式を生成して返す。

備考: -

### ⑩. GetPaymentStrategyAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task<IPaymentStrategy?> GetPaymentStrategyAsync()` |
| 可視性 | public |
| 戻り値 | Task<IPaymentStrategy?> |
| 戻り値内容 | 有効な決済制御方式。未設定の場合はnull。 |

処理内容:

- ① デバイス設定の初期化完了を待つ。
- ② 現在のOSとlocal_paymentを条件に有効デバイスを選択する。
- ③ 制御方式クラス名が空の場合はnullを返す。
- ④ 制御方式ファクトリーで決済制御方式を生成して返す。

備考: Windows環境で登録されるOposCafisArchPaymentStrategyを使用する。

### ⑪. GetCashChangerStrategyAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task<ICashChangerStrategy?> GetCashChangerStrategyAsync()` |
| 可視性 | public |
| 戻り値 | Task<ICashChangerStrategy?> |
| 戻り値内容 | 有効な自動釣銭機制御方式。未設定の場合はnull。 |

処理内容:

- ① デバイス設定の初期化完了を待つ。
- ② 現在のOSとlocal_cashchangerを条件に有効デバイスを選択する。
- ③ 制御方式クラス名が空の場合はnullを返す。
- ④ 制御方式ファクトリーで自動釣銭機制御方式を生成して返す。

備考: Windows環境で登録される制御方式を使用する。

### ⑫. GetCustomerDisplayStrategyAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task<ICustomerDisplayStrategy?> GetCustomerDisplayStrategyAsync()` |
| 可視性 | public |
| 戻り値 | Task<ICustomerDisplayStrategy?> |
| 戻り値内容 | 有効なカスタマディスプレイ制御方式。未設定の場合はnull。 |

処理内容:

- ① デバイス設定の初期化完了を待つ。
- ② 現在のOSとlocal_displayを条件に有効デバイスを選択する。
- ③ 制御方式クラス名が空の場合はnullを返す。
- ④ 制御方式ファクトリーでカスタマディスプレイ制御方式を生成して返す。

備考: -

### ⑬. GetDrawerStrategyAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task<IDrawerStrategy?> GetDrawerStrategyAsync()` |
| 可視性 | public |
| 戻り値 | Task<IDrawerStrategy?> |
| 戻り値内容 | 有効なドロワー制御方式。未設定の場合はnull。 |

処理内容:

- ① デバイス設定の初期化完了を待つ。
- ② 現在のOSとlocal_drawerを条件に有効デバイスを選択する。
- ③ 制御方式クラス名が空の場合はnullを返す。
- ④ 制御方式ファクトリーでドロワー制御方式を生成して返す。

備考: Windows環境で登録される制御方式を使用する。

### ⑭. GetKeyboardStrategyAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task<IKeyboardStrategy?> GetKeyboardStrategyAsync()` |
| 可視性 | public |
| 戻り値 | Task<IKeyboardStrategy?> |
| 戻り値内容 | 有効なキーボード制御方式。未設定の場合はnull。 |

処理内容:

- ① デバイス設定の初期化完了を待つ。
- ② 現在のOSとlocal_keyboardを条件に有効デバイスを選択する。
- ③ 制御方式クラス名が空の場合はnullを返す。
- ④ 制御方式ファクトリーでキーボード制御方式を生成して返す。

備考: Windows環境で登録される制御方式を使用する。

### ⑮. GetActiveDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public DeviceSpec GetActiveDevice(List<DeviceSpec> devices, ActiveDevice activeDevices, string type, string os)` |
| 可視性 | public |
| 戻り値 | DeviceSpec |
| 戻り値内容 | デバイス種別とOSに一致するデバイス仕様。該当なしの場合は空のDeviceSpec。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| List<DeviceSpec> | デバイス仕様一覧 | devices |
| ActiveDevice | 有効デバイス設定 | activeDevices |
| string | デバイス種別 | type |
| string | OS種別 | os |

処理内容:

- ① デバイス種別に対応する有効デバイス一覧を選択する。
- ② 対応一覧が定義されていない場合、または空の場合は空のDeviceSpecを返す。
- ③ 有効デバイス一覧をOSで大文字小文字を区別せず絞り込む。
- ④ 対象ID、デバイス種別、OSが一致する最初のデバイス仕様を返す。
- ⑤ 一致するデバイスがない場合は空のDeviceSpecを返す。

備考: 対応する種別はプリンター、スキャナー、自動釣銭機、カスタマディスプレイ、ドロワー、キーボード。

### ⑯. RegisterDeviceStrategy

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void RegisterDeviceStrategy()` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

処理内容:

- ① WindowsビルドではOPOS、シリアル、Raw Keyboardの各制御方式を登録する。
- ② iOSビルドではEpsonプリンター、カメラ/BLEスキャナー、カスタマディスプレイの各制御方式を登録する。
- ③ AndroidビルドではBluetoothプリンター、カメラスキャナー、カスタマディスプレイの各制御方式を登録する。
- ④ 設定のStrategyClassから制御方式を生成できる状態にする。

備考: 登録対象はコンパイル対象プラットフォームにより異なる。

### ⑰. ConfigureNamedPipe

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void ConfigureNamedPipe(NamedPipeSettings? settings)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| NamedPipeSettings? | 名前付きパイプ設定 | settings |

処理内容:

- ① 名前付きパイプクライアントへ設定を反映する。
- ② デバイスイベント受信部へ同じ設定を反映する。
- ③ コマンド送信とイベント受信で共通の通信設定を使用できる状態にする。

備考: Windowsビルドでのみ定義される。

## 処理フロー/注意事項

- アプリケーション生成時にInitializeAsyncが実行時設定または組込み初期設定を読み込む。
- ApplyConfigが制御方式登録、デバイス仕様辞書生成、Windows通信設定をまとめて反映する。
- 各制御方式取得メソッドは初期化完了後にOSとデバイス種別から有効デバイスを選択する。
- SaveConfigAsyncは実行時設定の保存完了後に同じ内容を現在の実行構成へ反映する。

### 注意事項

- 初期化と保存は同じセマフォで排他制御される。
- 初期化済みフラグはApplyConfigの全処理完了後にtrueとなる。
- ServiceCollectionExtensionsは設定ストレージ実装、設定サービス、デバイスマネージャーをシングルトンとして登録する。
- ServiceCollectionExtensionsはWindows環境の名前付きパイプ通信部をシングルトン、各デバイス制御方式をトランジェントとして登録する。iOS／Android環境では空実装のイベント受信部と各プラットフォーム用制御方式を登録する。
- MauiProgramはアプリ構築とデータベース移行の後にDeviceManagerを取得し、InitializeAsyncの完了を同期的に待つ。
- MauiProgramで初期化に失敗した場合はエラーログを出力し、例外を再送出してアプリ起動を継続しない。
