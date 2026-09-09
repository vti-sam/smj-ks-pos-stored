# PS-DEVICE-08 タブレットPOS デバイス制御 デバイスストラテジー基底 プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-DEVICE-08 |
| 文書名 | タブレットPOS デバイス制御 デバイスストラテジー基底 プログラム仕様書 |
| 対象 | タブレットPOS / デバイスストラテジー共通制御 |
| 版数 | 1.0.0 |
| 作成日 | 2026/08/24 |
| 作成者 | VTI サム |
| レビュー担当 | SMJ 蒲田 |
| 承認者 | SMJ 蒲田 |
| 目的 | 各デバイスストラテジーに共通する初期化、ライフサイクル、コマンド実行およびログ出力仕様を定義する。 |
| 期待成果 | デバイス別ストラテジーの実装とレビューで共通利用できる基底動作を明確にする。 |

## 01_改訂履歴

| 版数 | 日付 | 変更内容 | 作成者 | 承認者 |
| --- | --- | --- | --- | --- |
| 1.0.0 | 2026/08/24 | 正式版として初版を作成。 | VTI サム | SMJ 蒲田 |

## クラス情報

| 項目 | 内容 |
| --- | --- |
| 機能名 | デバイスストラテジー共通制御 |
| 物理クラス名 | DeviceStrategyBase |
| 名前空間 | Pos.DeviceCtrl.StrategyBase |
| アクセス修飾子 | public abstract |
| 継承/実装 | - |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/pos-integration/Pos.DeviceCtrl/StrategyBase/DeviceStrategyBase.cs |
| 対象クラス | DeviceStrategyBase |
| 設計対象 | デバイス仕様初期化、ロガー設定、開始と終了、共通コマンド実行、成功および失敗ログ |

## クラス概要

すべてのデバイスストラテジーに共通するデバイス仕様、ロガー、開始と終了、およびコマンド実行のライフサイクルを提供する抽象基底クラスである。同期または非同期のデバイス処理を共通の非同期実行経路に載せ、開始、完了、失敗をログへ記録する。

### 主な責務

- ストラテジーが使用するDeviceSpecとIAppLoggerを保持する。
- デバイスの開始および終了に関する既定動作を提供する。
- 同期処理と非同期処理を共通のコマンド実行手順で実行する。
- コマンドの開始、完了、失敗および処理時間をログへ記録する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| プロパティ | protected | DeviceSpec | Device | ストラテジーが操作するデバイス仕様を保持する。 |
| プロパティ | protected | string | CurrentMethod | 現在実行中のコマンド名を保持する。初期値は空文字。 |
| プロパティ | protected | DateTime | CommandStart | 現在のコマンド開始時刻を保持する。 |
| フィールド | private | IAppLogger? | _logger | StrategyFactoryから設定されるアプリケーションロガーを保持する。 |
| プロパティ | protected | IAppLogger | Logger | 設定済みのロガーを返す。未設定の場合はInvalidOperationExceptionを送出する。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | public | void | InitInstance | デバイス仕様を設定してインスタンスを初期化する。 |
| ② | public | void | UseLogger | コマンドログに使用するロガーを設定する。 |
| ③ | public virtual | Task | Start | デバイス仕様を必要に応じて更新し、開始処理を完了する。 |
| ④ | public virtual | Task | End | デバイス終了処理の既定結果を返す。 |
| ⑤ | protected | Task<T> | ExecuteCommandAsync<T>(Func<Task<T>>) | 戻り値のある非同期処理を共通手順で実行する。 |
| ⑥ | protected | Task | ExecuteCommandAsync(Func<Task>) | 戻り値のない非同期処理を共通手順で実行する。 |
| ⑦ | protected | Task | ExecuteCommandAsync(Action) | 戻り値のない同期処理を共通手順で非同期実行する。 |
| ⑧ | protected | Task<T> | ExecuteCommandAsync<T>(Func<T>) | 戻り値のある同期処理を共通手順で非同期実行する。 |
| ⑨ | protected virtual | void | OnCommandStarted | コマンド開始状態を設定し、開始ログを出力する。 |
| ⑩ | protected virtual | void | OnCommandCompleted<T> | 戻り値を含むコマンド完了ログを出力する。 |
| ⑪ | protected virtual | void | OnCommandCompleted | 戻り値のないコマンド完了ログを出力する。 |
| ⑫ | protected virtual | void | OnCommandFailed | コマンド失敗ログを出力する。 |

## メソッド詳細

### ①. InitInstance

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void InitInstance(DeviceSpec d)` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| DeviceSpec | デバイス仕様 | d |

処理内容:

- ① 引数のデバイス仕様がnullでないことを確認する。
- ② デバイス仕様をDeviceへ設定する。

備考: 引数がnullの場合はArgumentNullExceptionを送出する。

### ②. UseLogger

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void UseLogger(IAppLogger logger)` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IAppLogger | アプリケーションロガー | logger |

処理内容:

- ① 引数のロガーを_loggerへ設定する。

備考: StrategyFactoryはストラテジー生成時に本メソッドを呼び出す。

### ③. Start

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public virtual Task Start(DeviceSpec? config = null)` |
| 可視性 | public virtual |
| 戻り値 | Task |
| 戻り値内容 | 既定の開始処理が完了したことを表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| DeviceSpec? | 更新用デバイス仕様 | config |

処理内容:

- ① 更新用デバイス仕様が指定されているか確認する。
- ② 指定されている場合はDeviceを更新する。
- ③ 完了済みタスクを返す。

備考: デバイス固有の接続または初期化が必要な派生クラスは本メソッドをオーバーライドする。

### ④. End

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public virtual Task End()` |
| 可視性 | public virtual |
| 戻り値 | Task |
| 戻り値内容 | 既定の終了処理が完了したことを表すタスク。 |

処理内容:

- ① 完了済みタスクを返す。

備考: デバイス固有の切断または終了処理が必要な派生クラスは本メソッドをオーバーライドする。

### ⑤. ExecuteCommandAsync<T>(Func<Task<T>>)

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `protected async Task<T> ExecuteCommandAsync<T>(Func<Task<T>> action, [CallerMemberName] string memberName = "")` |
| 可視性 | protected |
| 戻り値 | Task<T> |
| 戻り値内容 | 非同期アクションが返した処理結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Func<Task<T>> | 戻り値付き非同期処理 | action |
| string | 呼び出し元メソッド名 | memberName |

処理内容:

- ① 実行クラス名と呼び出し元メソッド名からコマンド名を生成する。
- ② 現在のUTC時刻を開始時刻として取得し、OnCommandStartedを呼び出す。
- ③ アクションをTask.Runで実行し、完了を待つ。
- ④ OnCommandCompletedへ結果を渡して完了ログを出力する。
- ⑤ アクションの結果を返す。
- ⑥ 例外発生時はOnCommandFailedを呼び出し、同じ例外を再送出する。

備考: memberNameを省略した場合はCallerMemberNameにより呼び出し元名が設定される。

### ⑥. ExecuteCommandAsync(Func<Task>)

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `protected async Task ExecuteCommandAsync(Func<Task> action, [CallerMemberName] string memberName = "")` |
| 可視性 | protected |
| 戻り値 | Task |
| 戻り値内容 | 戻り値のない非同期コマンドの完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Func<Task> | 戻り値なし非同期処理 | action |
| string | 呼び出し元メソッド名 | memberName |

処理内容:

- ① コマンド名と開始時刻を決定し、OnCommandStartedを呼び出す。
- ② アクションをTask.Runで実行し、完了を待つ。
- ③ 戻り値なしのOnCommandCompletedを呼び出す。
- ④ 例外発生時はOnCommandFailedを呼び出し、同じ例外を再送出する。

備考: 実行前後のログ出力順序は戻り値付き非同期処理と同じである。

### ⑦. ExecuteCommandAsync(Action)

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `protected async Task ExecuteCommandAsync(Action action, [CallerMemberName] string memberName = "")` |
| 可視性 | protected |
| 戻り値 | Task |
| 戻り値内容 | 同期アクションの非同期実行完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Action | 戻り値なし同期処理 | action |
| string | 呼び出し元メソッド名 | memberName |

処理内容:

- ① コマンド名と開始時刻を決定し、OnCommandStartedを呼び出す。
- ② 同期アクションをTask.Runで実行し、完了を待つ。
- ③ 戻り値なしのOnCommandCompletedを呼び出す。
- ④ 例外発生時はOnCommandFailedを呼び出し、同じ例外を再送出する。

備考: 呼び出し元は同期処理を直接ブロックせずに待機できる。

### ⑧. ExecuteCommandAsync<T>(Func<T>)

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `protected async Task<T> ExecuteCommandAsync<T>(Func<T> action, [CallerMemberName] string memberName = "")` |
| 可視性 | protected |
| 戻り値 | Task<T> |
| 戻り値内容 | 同期関数が返した処理結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Func<T> | 戻り値付き同期処理 | action |
| string | 呼び出し元メソッド名 | memberName |

処理内容:

- ① コマンド名と開始時刻を決定し、OnCommandStartedを呼び出す。
- ② 同期関数をTask.Runで実行し、結果を取得する。
- ③ OnCommandCompletedへ結果を渡して完了ログを出力する。
- ④ 処理結果を返す。
- ⑤ 例外発生時はOnCommandFailedを呼び出し、同じ例外を再送出する。

備考: 呼び出し元は同期関数の結果をTask<T>として待機する。

### ⑨. OnCommandStarted

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `protected virtual void OnCommandStarted(string commandName, DateTime start)` |
| 可視性 | protected virtual |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | コマンド名 | commandName |
| DateTime | 開始時刻 | start |

処理内容:

- ① CurrentMethodへコマンド名を設定する。
- ② CommandStartへ開始時刻を設定する。
- ③ ローディング表示開始を示す情報ログとデバッグログを出力する。
- ④ デバイスコマンド開始ログを出力する。

備考: Loggerが未設定の場合はInvalidOperationExceptionを送出する。

### ⑩. OnCommandCompleted<T>

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `protected virtual void OnCommandCompleted<T>(string commandName, DateTime start, T result)` |
| 可視性 | protected virtual |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | コマンド名 | commandName |
| DateTime | 開始時刻 | start |
| T | 処理結果 | result |

処理内容:

- ① 現在のUTC時刻と開始時刻から処理時間をミリ秒で算出する。
- ② ローディング表示終了ログを出力する。
- ③ コマンド名、処理時間および処理結果を含む成功ログを出力する。

備考: 処理時間は小数点以下を含まない文字列として出力する。

### ⑪. OnCommandCompleted

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `protected virtual void OnCommandCompleted(string commandName, DateTime start)` |
| 可視性 | protected virtual |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | コマンド名 | commandName |
| DateTime | 開始時刻 | start |

処理内容:

- ① 現在のUTC時刻と開始時刻から処理時間をミリ秒で算出する。
- ② ローディング表示終了ログを出力する。
- ③ コマンド名と処理時間を含む成功ログを出力する。

備考: 戻り値がないコマンドで使用する。

### ⑫. OnCommandFailed

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `protected virtual void OnCommandFailed(string commandName, DateTime start, Exception ex)` |
| 可視性 | protected virtual |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | コマンド名 | commandName |
| DateTime | 開始時刻 | start |
| Exception | 発生例外 | ex |

処理内容:

- ① 現在のUTC時刻と開始時刻から処理時間をミリ秒で算出する。
- ② ローディング表示終了を示す情報ログとデバッグログを出力する。
- ③ 例外、コマンド名および処理時間を含む失敗ログを出力する。

備考: ExecuteCommandAsyncは本メソッドの実行後に同じ例外を再送出する。

## 処理フロー/注意事項

- StrategyFactoryは生成直後にInitInstanceとUseLoggerを実行する。
- 派生クラスはStartとEndを必要に応じてオーバーライドし、デバイス固有の接続と切断を実装する。
- 派生クラスのデバイス操作は適切なExecuteCommandAsyncを使用し、開始、完了、失敗ログを共通化する。
- 同一ソースファイル内のDeviceStrategyBase<T>は本クラスを継承する型パラメーター付き補助基底クラスであり、本仕様書の対象外である。
