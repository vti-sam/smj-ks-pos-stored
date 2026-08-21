# PS-DEVICE-10 タブレットPOS デバイス制御 名前付きパイプクライアント プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-DEVICE-10 |
| 文書名 | タブレットPOS デバイス制御 名前付きパイプクライアント プログラム仕様書 |
| 対象 | タブレットPOS / Hostコマンド通信 |
| 版数 | 0.0.2 |
| 作成日 | 2026/08/24 |
| 作成者 | VTI サム |
| レビュー担当 | SMJ 中田 |
| 承認者 | SMJ 中田 |
| 目的 | Windows環境でHostへデバイスコマンドを送信する名前付きパイプ通信仕様を定義する。 |
| 期待成果 | 接続、送受信、タイムアウト、再試行および異常時動作を実装単位で明確にする。 |

## 01_改訂履歴

| 版数 | 日付 | 変更内容 | 作成者 | 承認者 |
| --- | --- | --- | --- | --- |
| 0.0.2 | 2026/08/24 | OposNamedPipeCommandClientとの責務境界を明確化し、本クラスを通信・タイムアウト・再試行の共通実装として整理 | VTI サム | SMJ 中田 |
| 0.0.1 | 2026/08/24 | 初版作成 | VTI サム | SMJ 中田 |

## クラス情報

| 項目 | 内容 |
| --- | --- |
| 機能名 | Hostコマンド通信 |
| 物理クラス名 | NamedPipeClient |
| 名前空間 | TabletPos.DeviceCtrl.Modules |
| アクセス修飾子 | public sealed |
| 継承/実装 | INamedPipeClient |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/TabletPosBoilerplate/TabletPos.DeviceCtrl/Platforms/Windows/Modules/NamedPipeClient.cs |
| 対象クラス | NamedPipeClient |
| 設計対象 | 設定反映、共通通信契約を使用したコマンド送信、パイプ接続、応答待機、再試行、例外変換 |

## クラス概要

Windows環境でタブレットPOSからHostプロセスへデバイスコマンドを送信し、応答を受信する名前付きパイプクライアントである。DeviceContractsで定義した要求・応答モデルおよび共通既定値を使用し、通信設定に基づいて接続、応答待機および再試行を制御する。通信異常とHost処理異常は区別して呼び出し元へ通知する。Strategy操作からDeviceId、MethodId、Payloadへの変換、およびHost応答からStrategy結果・OPOSプロパティへの変換はOposNamedPipeCommandClientが担当し、本クラスは担当しない。

### 主な責務

- 名前付きパイプ設定を保持し、旧パイプ名を現行名へ補正する。
- DeviceContractsのデバイスコマンド要求をJSONへ変換してHostへ送信する。
- Host応答を受信してコマンド応答モデルへ変換する。
- DeviceContractsの共通既定値に基づいて接続失敗時の再試行と応答待機を制御する。
- 通信例外とHost処理異常を別の例外として通知する。
- Strategy固有の操作・結果変換をOposNamedPipeCommandClientへ分離し、通信層へ業務・デバイス固有ロジックを持ち込まない。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| 定数 | private const | string | LegacyDefaultPipeName | 旧版との互換判定に使用するパイプ名TabletPOSPipeMessage。 |
| フィールド | private static readonly | JsonSerializerOptions | JsonOptions | 応答JSONを大文字と小文字を区別せず変換する設定。 |
| フィールド | private | NamedPipeSettings? | _settings | パイプ名、接続・応答タイムアウトおよび再試行条件を保持する。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | public | - | NamedPipeClient | ログ出力に使用するIAppLoggerを受け取る。 |
| ② | public | void | Configure | 名前付きパイプ設定を反映し、旧パイプ名を補正する。 |
| ③ | public | NamedPipeDeviceCommandResponse | SendCommand | デバイスコマンドを送信し、Host応答を検証して返す。 |
| ④ | public | string | SendMessage(string) | 現在の設定で文字列メッセージを送信する。 |
| ⑤ | private | string | SendMessage(string, int?) | 現在の設定と指定応答タイムアウトでメッセージを送信する。 |
| ⑥ | public | string | SendMessage(string, string, int) | 指定パイプ名と接続タイムアウトでメッセージを1回送信する。 |
| ⑦ | private | string | SendMessageCore | 接続、送信、受信および再試行を実行する。 |
| ⑧ | private static | bool | IsConnectionFailure | 例外が再試行可能な接続失敗か判定する。 |
| ⑨ | private | int | GetResponseTimeout | コマンド内容と通信設定から応答タイムアウトを決定する。 |
| ⑩ | private | int | GetConfiguredResponseTimeout | 通信設定または共通既定値から応答タイムアウトを決定する。 |

## メソッド詳細

### ①. NamedPipeClient

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public NamedPipeClient(IAppLogger logger)` |
| 可視性 | public |
| 戻り値 | - |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IAppLogger | アプリケーションロガー | logger |

処理内容:

- ① 依存性注入から受け取ったロガーを通信ログの出力に使用する。

備考: ServiceCollectionExtensionsはINamedPipeClientの実装として本クラスを登録する。

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
- ② 設定がnullでなく、PipeNameが旧パイプ名TabletPOSPipeMessageと完全一致するか確認する。
- ③ 旧パイプ名の場合はPipeNameをTabletPos.Host.Commandへ変更する。

備考: 設定がnullの場合は各既定値を使用する。

### ③. SendCommand

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public NamedPipeDeviceCommandResponse SendCommand(NamedPipeDeviceCommandRequest request)` |
| 可視性 | public |
| 戻り値 | NamedPipeDeviceCommandResponse |
| 戻り値内容 | Hostが返した成功済みのデバイスコマンド応答。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| NamedPipeDeviceCommandRequest | デバイスコマンド要求 | request |

処理内容:

- ① 要求がnullの場合はArgumentNullExceptionを送出する。
- ② Handleが空の場合は、現在プロセスのメインウィンドウハンドルまたはプロセスIDを設定する。
- ③ RequestId、Message、DeviceId、MethodId、HandleおよびPayloadを新しい要求へ転記する。
- ④ 送信対象の要求情報をデバッグログへ出力する。
- ⑤ 要求をJSONへ変換し、GetResponseTimeoutで決定した応答タイムアウトを使用して送信する。
- ⑥ 応答文字列をNamedPipeDeviceCommandResponseへ変換する。
- ⑦ JSON変換に失敗した場合は警告ログを出力し、NamedPipeCommunicationExceptionを送出する。
- ⑧ 応答がnullの場合はNamedPipeCommunicationExceptionを送出する。
- ⑨ 受信した応答情報をデバッグログへ出力する。
- ⑩ Successがfalseの場合はHostCommandExceptionを送出する。
- ⑪ 成功応答を返す。

備考: HostCommandExceptionはHost応答全体をResponseプロパティに保持する。

### ④. SendMessage(string)

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public string SendMessage(string message)` |
| 可視性 | public |
| 戻り値 | string |
| 戻り値内容 | Hostから受信した1行の応答文字列。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | 送信メッセージ | message |

処理内容:

- ① 応答タイムアウトを指定せず、内部のSendMessageを呼び出す。
- ② 受信した応答文字列を返す。

備考: パイプ名、接続タイムアウトおよび再試行条件は現在のNamedPipeSettingsを使用する。

### ⑤. SendMessage(string, int?)

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private string SendMessage(string message, int? responseTimeout)` |
| 可視性 | private |
| 戻り値 | string |
| 戻り値内容 | Hostから受信した1行の応答文字列。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | 送信メッセージ | message |
| int? | 応答タイムアウト | responseTimeout |

処理内容:

- ① 設定値または既定値からパイプ名を決定する。
- ② 正のConnectionTimeoutMsまたは既定値から接続タイムアウトを決定する。
- ③ 正のConnectionRetryCountまたは既定値から試行回数を決定する。
- ④ 正のConnectionRetryIntervalMsまたは既定値から再試行間隔を決定する。
- ⑤ 応答タイムアウトが未指定の場合はGetConfiguredResponseTimeoutで決定した値を使用する。
- ⑥ 決定した条件でSendMessageCoreを呼び出し、応答を返す。

備考: ConnectionRetryIntervalMsが0の場合は既定値を使用する。

### ⑥. SendMessage(string, string, int)

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public string SendMessage(string message, string pipeName, int connectionTimeout)` |
| 可視性 | public |
| 戻り値 | string |
| 戻り値内容 | 指定パイプから受信した1行の応答文字列。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | 送信メッセージ | message |
| string | 接続先パイプ名 | pipeName |
| int | 接続タイムアウト | connectionTimeout |

処理内容:

- ① 応答タイムアウトにDeviceContractsのコマンド応答待機既定値を使用する。
- ② 試行回数を1回、再試行間隔を0ミリ秒としてSendMessageCoreを呼び出す。
- ③ 受信した応答を返す。

備考: 呼び出し元が通信先を明示する場合に使用する。

### ⑦. SendMessageCore

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private string SendMessageCore(string message, string pipeName, int connectionTimeout, int responseTimeout, int retryCount, int retryIntervalMs)` |
| 可視性 | private |
| 戻り値 | string |
| 戻り値内容 | Hostから受信した1行の応答文字列。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | 送信メッセージ | message |
| string | 接続先パイプ名 | pipeName |
| int | 接続タイムアウト | connectionTimeout |
| int | 応答タイムアウト | responseTimeout |
| int | 最大試行回数 | retryCount |
| int | 再試行間隔 | retryIntervalMs |

処理内容:

- ① 接続タイムアウト、応答タイムアウト、試行回数および再試行間隔を有効範囲へ補正する。
- ② 試行回数の範囲で名前付きパイプクライアントを生成する。
- ③ 接続開始をデバッグログへ出力し、指定時間内にHostへ接続する。
- ④ BOMなしUTF-8のライターとUTF-8のリーダーを生成する。
- ⑤ メッセージを1行で送信し、書込済み状態へ更新する。
- ⑥ 応答を1行読み込み、応答タイムアウト内の完了を待つ。
- ⑦ 応答がnullの場合はEndOfStreamExceptionを送出する。
- ⑧ 正常に受信した応答文字列を返す。
- ⑨ メッセージ送信前に再試行可能な接続失敗が発生し、残り試行がある場合は警告ログを出力して指定時間待機する。
- ⑩ その他の例外では発生段階をconnectionまたはresponseとして警告ログへ出力し、NamedPipeCommunicationExceptionへ変換して送出する。
- ⑪ 試行ループが結果を返さず終了した場合はInvalidOperationExceptionを送出する。

備考: メッセージ送信後の失敗は重複実行を避けるため再試行しない。

### ⑧. IsConnectionFailure

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static bool IsConnectionFailure(Exception exception)` |
| 可視性 | private static |
| 戻り値 | bool |
| 戻り値内容 | TimeoutExceptionまたはIOExceptionの場合はtrue、それ以外はfalse。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Exception | 判定対象例外 | exception |

処理内容:

- ① 例外の型がTimeoutExceptionまたはIOExceptionか判定する。
- ② 判定結果を返す。

備考: SendMessageCoreは送信前に発生した再試行可能な例外の判定に使用する。

### ⑨. GetResponseTimeout

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int GetResponseTimeout(NamedPipeDeviceCommandRequest request)` |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | コマンド応答待機に使用するタイムアウトのミリ秒値。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| NamedPipeDeviceCommandRequest | デバイスコマンド要求 | request |

処理内容:

- ① PayloadのResponseTimeoutMillisecondsが正の整数の場合は、その値を返す。
- ② ResponseTimeoutMillisecondsが未指定で、TimeoutMillisecondsが正の整数の場合は、その値を返す。
- ③ いずれも使用できない場合はGetConfiguredResponseTimeoutで決定した値を返す。

備考: コマンド固有の応答タイムアウトを優先し、同じ待機時間を重複加算しない。

### ⑩. GetConfiguredResponseTimeout

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int GetConfiguredResponseTimeout()` |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | コマンド応答待機に使用するタイムアウトのミリ秒値。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| - | - | - |

処理内容:

- ① NamedPipeSettingsのResponseTimeoutMsが正の値か判定する。
- ② 正の値の場合は設定値を返す。
- ③ 設定値を使用できない場合はDeviceContractsのコマンド応答待機既定値を返す。

備考: 現行の共通既定値は30000ミリ秒である。

## 処理フロー/注意事項

- DeviceManagerはWindows環境でNamedPipeSettingsをConfigureへ反映する。
- SendCommandは要求をJSON化し、TabletPos.Host.Commandへ送信して成功応答を返す。
- パイプ名、接続タイムアウト、応答タイムアウト、再試行回数および再試行間隔の既定値はDeviceContractsで一元管理する。
- 旧パイプ名TabletPOSPipeMessageを受け取った場合は現行名TabletPos.Host.Commandへ補正する。
- 接続失敗は送信前のみ設定回数まで再試行し、送信後の応答失敗は再試行しない。
- 通信異常はNamedPipeCommunicationException、Host処理失敗はHostCommandExceptionとして区別する。
- OposNamedPipeCommandClientがStrategy固有の要求生成と結果変換を担当し、NamedPipeClientは共通DTOの送受信、タイムアウトおよび再試行だけを担当する。
