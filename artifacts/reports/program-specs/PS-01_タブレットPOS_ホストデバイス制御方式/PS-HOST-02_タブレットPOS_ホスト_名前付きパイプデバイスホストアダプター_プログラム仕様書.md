# PS-HOST-02 タブレットPOS ホスト 名前付きパイプデバイスホストアダプター プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.2 | 2026/06/21 | VTI | クラス仕様、フィールド/プロパティ、メソッド仕様を更新 |
| 0.0.1 | 2026/06/19 | VTI | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-HOST-02 |
| プロジェクト名 | タブレットPOS |
| 機能名 | 名前付きパイプデバイスホストアダプター |
| 物理クラス名 | NamedPipeDeviceHostAdapter |
| 名前空間 | KsOutProcess.KsDeviceServer |
| アクセス修飾子 | internal sealed |
| 継承/実装 | IDisposable |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs |
| 対象クラス | NamedPipeDeviceHostAdapter |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

ホスト内部のデバイス制御処理と名前付きパイプ通信をつなぐ中継層。アプリケーションから届くコマンドを内部処理用の要求に変換し、デバイス応答やホスト制御通知を通信路へ戻す。

### 主な責務

- コマンド受信用とイベント通知用の通信路を開始・終了する。
- 外部メッセージと内部デバイスコマンドの変換を行う。
- デバイス単位の順序制御とホスト停止・再起動通知を仲介する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| フィールド | private | string | NamedPipeCommandPipeName | command request を受け付ける既定の Named Pipe 名。 |
| フィールド | private | string | NamedPipeEventPipeName | device event を publish する既定の Named Pipe 名。 |
| フィールド | private | IDeviceCommandHandler | _commandHandler | デバイスコマンド処理の委譲先。 |
| フィールド | private | Action<DeviceHostAction> | _hostActionHandler | Kill/ReStart などホスト制御アクションの通知先。 |
| フィールド | private | INamedPipeCommandMapper | _commandMapper | Named Pipe request/response と内部 command/result の変換担当。 |
| フィールド | private | string | _commandPipeName | command server 起動時に使用する Named Pipe 名。 |
| フィールド | private | string | _eventPipeName | event publisher 起動時に使用する Named Pipe 名。 |
| フィールド | private | DeviceCommandRouter | _commandRouter | デバイス単位のコマンドキュー制御。 |
| フィールド | private | NamedPipeCommandServer | _commandServer | コマンド受信用 Named Pipe サーバー。 |
| フィールド | private | NamedPipeEventPublisher | _eventPublisher | イベント送信用 Named Pipe publisher。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | public | - | NamedPipeDeviceHostAdapter | インスタンスを初期化する。 |
| 2 | internal | - | NamedPipeDeviceHostAdapter | インスタンスを初期化する。 |
| 3 | internal | - | NamedPipeDeviceHostAdapter | インスタンスを初期化する。 |
| 4 | public | void | Start | command router、event publisher、command server を準備し、Named Pipe 通信を開始する。 |
| 5 | public | void | Dispose | command server、router、event publisher を停止・破棄し、再開始可能な状態へ戻す。 |
| 6 | public | void | PublishDeviceReply | デバイス側の非同期応答を event pipe 用の NamedPipeDeviceEvent に変換して送信する。 |
| 7 | private | NamedPipeDeviceCommandResponse | ProcessCommand | Named Pipe request を内部 command に変換し、handler 実行後に response へ戻す。 |

## メソッド詳細

### 1. NamedPipeDeviceHostAdapter

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public NamedPipeDeviceHostAdapter( IDeviceCommandHandler commandHandler, Action<DeviceHostAction> hostActionHandler)` |
| 可視性 | public |
| 戻り値 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IDeviceCommandHandler | コマンドハンドラー | commandHandler |
| Action<DeviceHostAction> | ホストアクションハンドラー | hostActionHandler |

処理内容:

- ① command handler と host action handler を受け取る。
- ② LegacyMessageParser を使用する NamedPipeCommandMapper を生成する。
- ③ command/event pipe は既定名を使用し、共通コンストラクタへ初期化を委譲する。

備考: -

### 2. NamedPipeDeviceHostAdapter

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `internal NamedPipeDeviceHostAdapter( IDeviceCommandHandler commandHandler, Action<DeviceHostAction> hostActionHandler, INamedPipeCommandMapper commandMapper)` |
| 可視性 | internal |
| 戻り値 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IDeviceCommandHandler | コマンドハンドラー | commandHandler |
| Action<DeviceHostAction> | ホストアクションハンドラー | hostActionHandler |
| INamedPipeCommandMapper | コマンドマッパー | commandMapper |

処理内容:

- ① command handler、host action handler、command mapper を受け取る。
- ② command/event pipe は既定名を使用する。
- ③ 共通コンストラクタへ委譲し、mapper 差し替え可能な adapter を構成する。

備考: -

### 3. NamedPipeDeviceHostAdapter

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `internal NamedPipeDeviceHostAdapter( IDeviceCommandHandler commandHandler, Action<DeviceHostAction> hostActionHandler, INamedPipeCommandMapper commandMapper, string commandPipeName, string eventPipeName)` |
| 可視性 | internal |
| 戻り値 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IDeviceCommandHandler | コマンドハンドラー | commandHandler |
| Action<DeviceHostAction> | ホストアクションハンドラー | hostActionHandler |
| INamedPipeCommandMapper | コマンドマッパー | commandMapper |
| string | コマンド用パイプ名 | commandPipeName |
| string | イベント用パイプ名 | eventPipeName |

処理内容:

- ① command handler、host action handler、command mapper、command/event pipe 名を受け取る。
- ② 受け取った dependency と pipe 名を private field に保持する。
- ③ Start 時に router、command server、event publisher を生成できる状態にする。

備考: -

### 4. Start

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Start()` |
| 可視性 | public |
| 戻り値 | void |

処理内容:

- ① 未生成の DeviceCommandRouter、NamedPipeEventPublisher、NamedPipeCommandServer を作成する。
- ② event pipe publisher を開始する。
- ③ command pipe server を開始し、request を router の enqueue に接続する。

備考: -

### 5. Dispose

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Dispose()` |
| 可視性 | public |
| 戻り値 | void |

処理内容:

- ① command server を dispose し、参照を null にする。
- ② router を dispose して worker queue を停止する。
- ③ event publisher を dispose し、参照を null にする。

備考: -

### 6. PublishDeviceReply

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void PublishDeviceReply(KsDeviceId deviceId, KsDeviceMethodID methodId, IntPtr handle, Dictionary<string, string> payload)` |
| 可視性 | public |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| KsDeviceId | デバイスID | deviceId |
| KsDeviceMethodID | デバイスメソッドID | methodId |
| IntPtr | ウィンドウハンドル | handle |
| Dictionary<string, string> | ペイロード | payload |

処理内容:

- ① deviceId、methodId、payload から NamedPipeDeviceEvent を生成する。
- ② EventId を GUID で採番し、EventType/Message に ReplyDevice を設定する。
- ③ event publisher が存在する場合のみ publish する。

備考: -

### 7. ProcessCommand

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private NamedPipeDeviceCommandResponse ProcessCommand(NamedPipeDeviceCommandRequest request)` |
| 可視性 | private |
| 戻り値 | NamedPipeDeviceCommandResponse |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| NamedPipeDeviceCommandRequest | デバイスコマンド要求 | request |

処理内容:

- ① request を command mapper で内部 DeviceCommand に変換する。
- ② DeviceCommandHandler.Handle を呼び、処理結果を取得する。
- ③ Kill/Restart の場合は 500ms 遅延して host action handler を実行する。
- ④ 処理結果を Named Pipe response へ変換して返却する。

備考: -
## 処理フロー/注意事項

- Start が command router、event publisher、command server を生成して開始する。
- ProcessCommand が request -> command -> result -> response を変換する。
- PublishDeviceReply が device event を event pipe へ送信する。
- Dispose が transport 関連リソースを解放する。

### 注意事項

- 既定 pipe 名は `TabetPos.Host.Command` と `TabetPos.Host.Event`。
