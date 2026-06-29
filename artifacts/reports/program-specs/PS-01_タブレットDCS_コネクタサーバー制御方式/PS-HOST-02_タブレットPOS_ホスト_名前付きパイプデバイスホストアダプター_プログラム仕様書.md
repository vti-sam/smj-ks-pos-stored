# PS-HOST-02 タブレットPOS ホスト 名前付きパイプデバイスホストアダプター プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.2 | 2026/06/21 | VTI サム | クラス仕様、フィールド/プロパティ、メソッド仕様を更新 |
| 0.0.1 | 2026/06/19 | VTI サム | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-HOST-02 |
| プロジェクト名 | タブレットPOS |
| 機能名 | 名前付きパイプデバイスホストアダプター |
| 物理クラス名 | NamedPipeConnectionAdapter |
| 名前空間 | TabletOutProcess.TabletDeviceServer |
| アクセス修飾子 | internal sealed |
| 継承/実装 | IDisposable |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/tabletposboilerplate/TabetPos.Host/src/TabletHost/DeviceHost/NamedPipeDeviceHostAdapter.cs |
| 対象クラス | NamedPipeConnectionAdapter |
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
| フィールド | private | string | NamedPipeCommandPipeName | コマンド要求を受け付ける既定の Named Pipe 名。 |
| フィールド | private | string | NamedPipeEventPipeName | デバイスイベントを送信する既定の Named Pipe 名。 |
| フィールド | private | IDeviceCommandHandler | _commandHandler | デバイスコマンド処理の委譲先。 |
| フィールド | private | Action<DeviceHostAction> | _hostActionHandler | Kill/ReStart などホスト制御アクションの通知先。 |
| フィールド | private | INamedPipeCommandMapper | _commandMapper | Named Pipe 要求/応答と内部コマンド/結果の変換担当。 |
| フィールド | private | string | _commandPipeName | コマンド受信用サーバー起動時に使用する Named Pipe 名。 |
| フィールド | private | string | _eventPipeName | イベント送信用 publisher 起動時に使用する Named Pipe 名。 |
| フィールド | private | DeviceCommandRouter | _commandRouter | デバイス単位のコマンドキュー制御。 |
| フィールド | private | NamedPipeCommandServer | _commandServer | コマンド受信用 Named Pipe サーバー。 |
| フィールド | private | NamedPipeEventPublisher | _eventPublisher | イベント送信用 Named Pipe publisher。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | public | - | NamedPipeConnectionAdapter | インスタンスを初期化する。 |
| 2 | internal | - | NamedPipeConnectionAdapter | インスタンスを初期化する。 |
| 3 | internal | - | NamedPipeConnectionAdapter | インスタンスを初期化する。 |
| 4 | public | void | Start | コマンドルーター、イベント送信用 publisher、コマンド受信用サーバーを準備し、Named Pipe 通信を開始する。 |
| 5 | public | void | Dispose | コマンド受信用サーバー、ルーター、イベント送信用 publisher を停止・破棄し、再開始可能な状態へ戻す。 |
| 6 | public | void | PublishDeviceReply | デバイス側の非同期応答をイベント用 NamedPipeDeviceEvent に変換して送信する。 |
| 7 | private | NamedPipeDeviceCommandResponse | ProcessCommand | Named Pipe 要求を内部コマンドに変換し、ハンドラー実行後に応答へ戻す。 |

## メソッド詳細

### 1. NamedPipeConnectionAdapter

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public NamedPipeConnectionAdapter( IDeviceCommandHandler commandHandler, Action<DeviceHostAction> hostActionHandler)` |
| 可視性 | public |
| 戻り値 | - |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IDeviceCommandHandler | コマンドハンドラー | commandHandler |
| Action<DeviceHostAction> | ホストアクションハンドラー | hostActionHandler |

処理内容:

- ① コマンド処理ハンドラーとホスト制御アクション通知先を受け取る。
- ② LegacyMessageParser を使用する NamedPipeCommandMapper を生成する。
- ③ コマンド用/イベント用パイプは既定名を使用し、共通コンストラクタへ初期化を委譲する。

備考: -

### 2. NamedPipeConnectionAdapter

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `internal NamedPipeConnectionAdapter( IDeviceCommandHandler commandHandler, Action<DeviceHostAction> hostActionHandler, INamedPipeCommandMapper commandMapper)` |
| 可視性 | internal |
| 戻り値 | - |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IDeviceCommandHandler | コマンドハンドラー | commandHandler |
| Action<DeviceHostAction> | ホストアクションハンドラー | hostActionHandler |
| INamedPipeCommandMapper | コマンドマッパー | commandMapper |

処理内容:

- ① コマンド処理ハンドラー、ホスト制御アクション通知先、コマンドマッパーを受け取る。
- ② コマンド用/イベント用パイプは既定名を使用する。
- ③ 共通コンストラクタへ委譲し、マッパー差し替え可能なアダプターを構成する。

備考: -

### 3. NamedPipeConnectionAdapter

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `internal NamedPipeConnectionAdapter( IDeviceCommandHandler commandHandler, Action<DeviceHostAction> hostActionHandler, INamedPipeCommandMapper commandMapper, string commandPipeName, string eventPipeName)` |
| 可視性 | internal |
| 戻り値 | - |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IDeviceCommandHandler | コマンドハンドラー | commandHandler |
| Action<DeviceHostAction> | ホストアクションハンドラー | hostActionHandler |
| INamedPipeCommandMapper | コマンドマッパー | commandMapper |
| string | コマンド用パイプ名 | commandPipeName |
| string | イベント用パイプ名 | eventPipeName |

処理内容:

- ① コマンド処理ハンドラー、ホスト制御アクション通知先、コマンドマッパー、コマンド用/イベント用パイプ名を受け取る。
- ② 受け取った依存先とパイプ名を private field に保持する。
- ③ Start 時にルーター、コマンド受信用サーバー、イベント送信用 publisher を生成できる状態にする。

備考: -

### 4. Start

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Start()` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

処理内容:

- ① 未生成の DeviceCommandRouter、NamedPipeEventPublisher、NamedPipeCommandServer を作成する。
- ② イベント用パイプの publisher を開始する。
- ③ コマンド用パイプのサーバーを開始し、要求をルーターの enqueue に接続する。

備考: -

### 5. Dispose

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Dispose()` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

処理内容:

- ① コマンド受信用サーバーを破棄し、参照を null にする。
- ② ルーターを破棄してワーカーキューを停止する。
- ③ イベント送信用 publisher を破棄し、参照を null にする。

備考: -

### 6. PublishDeviceReply

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void PublishDeviceReply(TabletDeviceId deviceId, TabletDeviceMethodID methodId, IntPtr handle, Dictionary<string, string> payload)` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| TabletDeviceId | デバイスID | deviceId |
| TabletDeviceMethodID | デバイスメソッドID | methodId |
| IntPtr | ウィンドウハンドル | handle |
| Dictionary<string, string> | ペイロード | payload |

処理内容:

- ① デバイスID、メソッドID、ペイロードから NamedPipeDeviceEvent を生成する。
- ② EventId を GUID で採番し、EventType/Message に ReplyDevice を設定する。
- ③ イベント送信用 publisher が存在する場合のみ送信する。

備考: -

### 7. ProcessCommand

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private NamedPipeDeviceCommandResponse ProcessCommand(NamedPipeDeviceCommandRequest request)` |
| 可視性 | private |
| 戻り値 | NamedPipeDeviceCommandResponse |
| 戻り値内容 | Named Pipe 要求を内部コマンドに変換し、ハンドラー実行後に応答へ戻した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| NamedPipeDeviceCommandRequest | デバイスコマンド要求 | request |

処理内容:

- ① 要求をコマンドマッパーで内部 DeviceCommand に変換する。
- ② DeviceCommandHandler.Handle を呼び、処理結果を取得する。
- ③ Kill/Restart の場合は 500ms 遅延してホスト制御アクション通知先を実行する。
- ④ 処理結果を Named Pipe 応答へ変換して返却する。

備考: -
## 処理フロー/注意事項

- Start がコマンドルーター、イベント送信用 publisher、コマンド受信用サーバーを生成して開始する。
- ProcessCommand が要求、コマンド、結果、応答の変換を行う。
- PublishDeviceReply がデバイスイベントをイベント用パイプへ送信する。
- Dispose が通信関連リソースを解放する。

### 注意事項

- 既定 pipe 名は `TabetPos.Host.Command` と `TabetPos.Host.Event`。
