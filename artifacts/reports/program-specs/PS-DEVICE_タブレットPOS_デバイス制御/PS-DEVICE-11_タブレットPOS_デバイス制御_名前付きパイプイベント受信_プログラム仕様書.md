# PS-DEVICE-11 タブレットPOS デバイス制御 名前付きパイプイベント受信 プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-DEVICE-11 |
| 文書名 | タブレットPOS デバイス制御 名前付きパイプイベント受信 プログラム仕様書 |
| 対象 | タブレットPOS / Hostイベント受信 |
| 版数 | 1.0.0 |
| 作成日 | 2026/08/24 |
| 作成者 | VTI サム |
| レビュー担当 | SMJ 蒲田 |
| 承認者 | SMJ 蒲田 |
| 目的 | Windows環境でHostからデバイスイベントを継続受信する名前付きパイプ仕様を定義する。 |
| 期待成果 | 受信開始、停止、再接続、イベント変換、イベント発行、および現行の購読状態を明確にする。 |

## 01_改訂履歴

| 版数 | 日付 | 変更内容 | 作成者 | 承認者 |
| --- | --- | --- | --- | --- |
| 1.0.0 | 2026/08/24 | 正式版として初版を作成。 | VTI サム | SMJ 蒲田 |

## クラス情報

| 項目 | 内容 |
| --- | --- |
| 機能名 | Hostイベント受信 |
| 物理クラス名 | NamedPipeEventReceiver |
| 名前空間 | Pos.DeviceCtrl.Modules |
| アクセス修飾子 | public sealed |
| 継承/実装 | IDeviceEventReceiver |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/pos-integration/Pos.DeviceCtrl/Platforms/Windows/Modules/NamedPipeEventReceiver.cs |
| 対象クラス | NamedPipeEventReceiver |
| 設計対象 | 設定反映、共通通信契約を使用した受信タスク管理、イベントパイプ接続、再接続、購読者通知 |

## クラス概要

Windows環境でHostプロセスのイベント用名前付きパイプへ接続し、デバイスイベントを継続的に受信するクラスである。受信したJSONをDeviceContractsのNamedPipeDeviceEventへ変換し、イベントとして発行する。通信切断または解析失敗時は、通信設定または共通既定値から決定した間隔後に再接続する。AppはHost起動後に受信処理を開始し、停止・破棄時はHost停止前に受信処理を停止する。現行コードにはイベント購読先がないため、受信イベントはApplicationユースケースへ引き渡されない。

### 主な責務

- イベント用名前付きパイプ設定を保持する。
- 受信ループの開始、重複起動防止および停止を管理する。
- Hostから受信したJSONをDeviceContractsのデバイスイベントへ変換する。
- 通信失敗時の再接続と購読者ごとの例外分離を行う。
- DeviceContractsの共通既定値に基づいて接続待機と再接続間隔を制御する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| フィールド | private static readonly | JsonSerializerOptions | JsonOptions | イベントJSONを大文字と小文字を区別せず変換する設定。 |
| フィールド | private readonly | object | _syncObject | 受信タスクとキャンセルトークンの状態を排他制御する。 |
| フィールド | private | NamedPipeSettings? | _settings | イベントパイプ名、接続時間および再接続間隔を保持する。 |
| フィールド | private | CancellationTokenSource? | _cancellationTokenSource | 受信ループの停止を通知する。 |
| フィールド | private | Task? | _receiveTask | 実行中の受信ループを保持する。 |
| イベント | public | EventHandler<NamedPipeDeviceEvent>? | EventReceived | 受信したデバイスイベントを購読者へ通知する。現行コードには購読先がない。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | public | - | NamedPipeEventReceiver | ログ出力に使用するIAppLoggerを受け取る。 |
| ② | public | void | Configure | 名前付きパイプ設定を反映する。 |
| ③ | public | Task | StartAsync | 受信ループを重複なく開始する。 |
| ④ | public | Task | StopAsync | 受信ループを停止し、保持資源を解放する。 |
| ⑤ | private | Task | ReceiveLoopAsync | Hostイベントパイプへ接続し、イベントを継続受信する。 |
| ⑥ | private | void | Publish | 受信したイベントを各購読者へ通知する。 |

## メソッド詳細

### ①. NamedPipeEventReceiver

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public NamedPipeEventReceiver(IAppLogger logger)` |
| 可視性 | public |
| 戻り値 | - |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IAppLogger | アプリケーションロガー | logger |

処理内容:

- ① 依存性注入から受け取ったロガーを接続、受信および購読者エラーの記録に使用する。

備考: ServiceCollectionExtensionsはIDeviceEventReceiverの実装として本クラスを登録する。AppはHost起動後に本クラスを開始し、Host停止前に停止する。

### ②. Configure

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Configure(NamedPipeSettings? settings)` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| NamedPipeSettings? | 名前付きパイプ設定 | settings |

処理内容:

- ① 引数の設定を_settingsへ保持する。

備考: 設定がnullの場合はイベントパイプ名、接続タイムアウトおよび再接続間隔の既定値を使用する。

### ③. StartAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public Task StartAsync(CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task |
| 戻り値内容 | 受信ループの開始操作が完了したことを表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| CancellationToken | 受信停止連携トークン | cancellationToken |

処理内容:

- ① _syncObjectを使用して受信状態を排他制御する。
- ② _receiveTaskが実行中の場合は新しい受信ループを開始せず、完了済みタスクを返す。
- ③ 既存のCancellationTokenSourceを解放する。
- ④ 引数のトークンと連携するCancellationTokenSourceを生成する。
- ⑤ ReceiveLoopAsyncをバックグラウンドタスクとして開始し、_receiveTaskへ保持する。
- ⑥ 完了済みタスクを返す。

備考: 本メソッドは受信ループ自体の終了を待たず、開始操作のみ完了させる。

### ④. StopAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task StopAsync(CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task |
| 戻り値内容 | 受信ループの停止と資源解放が完了したことを表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| CancellationToken | 停止待機キャンセルトークン | cancellationToken |

処理内容:

- ① 排他制御内で受信ループ用CancellationTokenSourceへ停止を通知し、現在の受信タスクを取得する。
- ② 受信タスクが存在する場合は、引数のトークンを使用して終了を待つ。
- ③ 受信ループ側のキャンセルによりOperationCanceledExceptionが発生し、引数のトークンがキャンセルされていない場合は正常停止として扱う。
- ④ 排他制御内で_receiveTaskをnullへ更新する。
- ⑤ CancellationTokenSourceを解放してnullへ更新する。

備考: 呼び出し元が指定したキャンセルトークン自体がキャンセルされた場合は例外を呼び出し元へ通知する。

### ⑤. ReceiveLoopAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private async Task ReceiveLoopAsync(CancellationToken cancellationToken)` |
| 可視性 | private |
| 戻り値 | Task |
| 戻り値内容 | 受信ループが終了したことを表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| CancellationToken | 受信ループキャンセルトークン | cancellationToken |

処理内容:

- ① 設定値または既定値からイベントパイプ名、接続タイムアウトおよび再接続間隔を決定する。
- ② キャンセルが要求されるまで接続と受信を繰り返す。
- ③ 読取専用の名前付きパイプクライアントを生成し、指定時間内にHostへ接続する。
- ④ 接続成功をデバッグログへ出力する。
- ⑤ UTF-8のリーダーを生成し、キャンセルが要求されるまで1行ずつ読み取る。
- ⑥ Hostがパイプを閉じて行を取得できない場合はEndOfStreamExceptionを送出する。
- ⑦ 受信JSONをNamedPipeDeviceEventへ変換し、nullの場合はJsonExceptionを送出する。
- ⑧ イベント識別情報をデバッグログへ出力し、Publishを呼び出す。
- ⑨ 受信ループのキャンセルによるOperationCanceledExceptionの場合はループを終了する。
- ⑩ その他の例外では警告ログを出力し、再接続間隔だけ待機して接続を再試行する。

備考: 再接続待機中にキャンセルされた場合は受信タスクを終了する。

### ⑥. Publish

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void Publish(NamedPipeDeviceEvent deviceEvent)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| NamedPipeDeviceEvent | 受信デバイスイベント | deviceEvent |

処理内容:

- ① EventReceivedに登録された購読者一覧を取得する。
- ② 購読者が存在しない場合は処理を終了する。
- ③ 各購読者を順番に呼び出し、受信イベントを通知する。
- ④ 購読者の処理で例外が発生した場合は、イベントIDを含む警告ログを出力する。
- ⑤ 例外が発生しても残りの購読者への通知を継続する。

備考: 購読者例外はHostとの受信接続を切断しない。現行コードにはEventReceived購読先がないため、②で処理を終了する。

## 処理フロー/注意事項

- DeviceManagerはWindows環境でNamedPipeSettingsをConfigureへ反映する。
- StartAsyncは受信ループを一つだけ開始し、Pos.DeviceConnector.Eventへ接続する。
- イベントパイプ名、接続タイムアウトおよび再接続間隔の既定値はDeviceContractsで一元管理する。
- Hostから受信した1行単位のJSONをNamedPipeDeviceEventへ変換してEventReceivedで通知する。
- AppはWindow作成・有効化・再開時にHost起動完了後のStartAsyncを実行し、Window停止・破棄時はStopAsyncを実行してからHostを停止する。
- 現行コードにはEventReceived購読先がないため、受信ループとイベント変換は動作するが、Applicationユースケースへの引渡しは行わない。
- 通信切断、JSON解析失敗またはその他の受信異常が発生した場合は警告を記録し、設定間隔後に再接続する。
- StopAsyncは受信ループをキャンセルし、タスク終了後にCancellationTokenSourceを解放する。
