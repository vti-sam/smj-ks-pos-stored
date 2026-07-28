# PS-HOST-02 タブレットPOS ホスト 名前付きパイプデバイスホストアダプター プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-HOST-02 |
| 文書名 | タブレットPOS ホスト 名前付きパイプデバイスホストアダプター プログラム仕様書 |
| 対象 | タブレットPOS / 名前付きパイプデバイスホストアダプター |
| 版数 | 0.0.4 |
| 作成日 | 2026/06/19 |
| 作成者 | VTI サム, VTI 吉田 |
| レビュー担当 | SMJ 蒲田 |
| 承認者 | SMJ 蒲田 |
| 目的 | 対象クラスの構造、フィールド／プロパティ及びメソッド仕様を定義する。 |
| 期待成果 | 実装及びレビューで参照するクラス単位の仕様を明確にする。 |

## 01_改訂履歴

| 版数 | 日付 | 変更内容 | 作成者 | 承認者 |
| --- | --- | --- | --- | --- |
| 0.0.4 | 2026/07/23 | ARCH-HOST-01に合わせて、デバイスコネクタ、タブレットPOS端末アプリ、および通信経路の表記を統一 | VTI サム |  |
| 0.0.3 | 2026/07/23 | 現行クラス名、ルーティングキー選択、応答送信後のデバイスコネクタ制御処理を更新 | VTI サム |  |
| 0.0.2 | 2026/06/21 | クラス仕様、フィールド/プロパティ、メソッド仕様を更新 | VTI サム |  |
| 0.0.1 | 2026/06/19 | 初版作成 | VTI サム |  |

## クラス情報

| 項目 | 内容 |
| --- | --- |
| 機能名 | 名前付きパイプデバイスホストアダプター |
| 物理クラス名 | NamedPipeDeviceHostAdapter |
| 名前空間 | TabletOutProcess.TabletDeviceServer |
| アクセス修飾子 | internal sealed |
| 継承/実装 | IDisposable |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/tabletposboilerplate/TabetPos.Host/src/TabletHost/DeviceHost/NamedPipeDeviceHostAdapter.cs |
| 対象クラス | NamedPipeDeviceHostAdapter |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

デバイスコネクタ内部のデバイス制御処理と名前付きパイプ通信をつなぐ中継部。タブレットPOS端末アプリから届くコマンドを内部処理用の要求に変換し、デバイス応答やデバイスコネクタ制御通知を通信経路へ戻す。

### 主な責務

- コマンド通信用パイプとイベント通知用パイプを開始・終了する。
- 外部メッセージと内部デバイスコマンドの変換を行う。
- デバイス単位の順序制御とデバイスコネクタ停止・再起動通知を仲介する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| フィールド | private const | string | NamedPipeCommandPipeName | コマンド通信用パイプの既定名。 |
| フィールド | private const | string | NamedPipeEventPipeName | イベント通知用パイプの既定名。 |
| フィールド | private readonly | IDeviceCommandHandler | _commandHandler | デバイスコマンド処理の委譲先。 |
| フィールド | private readonly | Action<DeviceHostAction> | _hostActionHandler | 「Kill」／「ReStart」要求など、デバイスコネクタ制御アクションの通知先。 |
| フィールド | private readonly | INamedPipeCommandMapper | _commandMapper | 名前付きパイプ要求/応答と内部コマンド/結果の変換担当。 |
| フィールド | private readonly | string | _commandPipeName | コマンド通信用パイプ名。 |
| フィールド | private readonly | string | _eventPipeName | イベント通知用パイプ名。 |
| フィールド | private | DeviceCommandRouter | _commandRouter | デバイス単位のコマンドキュー制御。 |
| フィールド | private | NamedPipeCommandServer | _commandServer | コマンド通信用パイプのサーバー。 |
| フィールド | private | NamedPipeEventPublisher | _eventPublisher | イベント通知用パイプのパブリッシャー。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | public | - | NamedPipeDeviceHostAdapter | 既定のマッパーとパイプ名を使用してインスタンスを初期化する。 |
| ② | internal | - | NamedPipeDeviceHostAdapter | 指定されたマッパーと既定のパイプ名を使用してインスタンスを初期化する。 |
| ③ | internal | - | NamedPipeDeviceHostAdapter | 指定されたマッパーとパイプ名を使用してインスタンスを初期化する。 |
| ④ | public | void | Start | コマンドルーター、イベント通知用パブリッシャー、コマンド通信用サーバーを準備し、名前付きパイプ通信を開始する。 |
| ⑤ | public | void | Dispose | コマンド通信用サーバー、ルーター、イベント通知用パブリッシャーを停止・破棄し、再開始可能な状態へ戻す。 |
| ⑥ | public | void | PublishDeviceReply | デバイス側の非同期応答をイベント通知用のNamedPipeDeviceEventに変換して送信する。 |
| ⑦ | private | NamedPipeDeviceCommandResponse | ProcessCommand | 名前付きパイプ要求を内部コマンドに変換し、ハンドラー実行後に応答へ戻す。 |

## メソッド詳細

### ①. NamedPipeDeviceHostAdapter

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public NamedPipeDeviceHostAdapter(IDeviceCommandHandler commandHandler, Action<DeviceHostAction> hostActionHandler)` |
| 可視性 | public |
| 戻り値 | - |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IDeviceCommandHandler | コマンドハンドラー | commandHandler |
| Action<DeviceHostAction> | デバイスコネクタ制御アクションハンドラー | hostActionHandler |

処理内容:

- ① コマンド処理ハンドラーとデバイスコネクタ制御アクション通知先を受け取る。
- ② LegacyMessageParser を使用する NamedPipeCommandMapper を生成する。
- ③ コマンド通信用パイプ／イベント通知用パイプは既定名を使用し、共通コンストラクタへ初期化を委譲する。

備考: -

### ②. NamedPipeDeviceHostAdapter

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `internal NamedPipeDeviceHostAdapter(IDeviceCommandHandler commandHandler, Action<DeviceHostAction> hostActionHandler, INamedPipeCommandMapper commandMapper)` |
| 可視性 | internal |
| 戻り値 | - |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IDeviceCommandHandler | コマンドハンドラー | commandHandler |
| Action<DeviceHostAction> | デバイスコネクタ制御アクションハンドラー | hostActionHandler |
| INamedPipeCommandMapper | コマンドマッパー | commandMapper |

処理内容:

- ① コマンド処理ハンドラー、デバイスコネクタ制御アクション通知先、コマンドマッパーを受け取る。
- ② コマンド通信用パイプ／イベント通知用パイプは既定名を使用する。
- ③ 共通コンストラクタへ委譲し、マッパー差し替え可能なアダプターを構成する。

備考: -

### ③. NamedPipeDeviceHostAdapter

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `internal NamedPipeDeviceHostAdapter(IDeviceCommandHandler commandHandler, Action<DeviceHostAction> hostActionHandler, INamedPipeCommandMapper commandMapper, string commandPipeName, string eventPipeName)` |
| 可視性 | internal |
| 戻り値 | - |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IDeviceCommandHandler | コマンドハンドラー | commandHandler |
| Action<DeviceHostAction> | デバイスコネクタ制御アクションハンドラー | hostActionHandler |
| INamedPipeCommandMapper | コマンドマッパー | commandMapper |
| string | コマンド通信用パイプ名 | commandPipeName |
| string | イベント通知用パイプ名 | eventPipeName |

処理内容:

- ① コマンド処理ハンドラー、デバイスコネクタ制御アクション通知先、コマンドマッパー、コマンド通信用パイプ名／イベント通知用パイプ名を受け取る。
- ② 受け取った依存先とパイプ名を非公開フィールドに保持する。
- ③ 開始処理（Start）時にルーター、コマンド通信用サーバー、イベント通知用パブリッシャーを生成できる状態にする。

備考: -

### ④. Start

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Start()` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

処理内容:

- ① 未生成のデバイスコマンドルーター（DeviceCommandRouter）を、コマンド処理（ProcessCommand）とルーティングキー取得処理（GetRoutingKey）で作成する。
- ② 未生成の名前付きパイプイベントパブリッシャー（NamedPipeEventPublisher）と名前付きパイプコマンドサーバー（NamedPipeCommandServer）を作成する。
- ③ イベント通知用パイプのパブリッシャーを開始する。
- ④ コマンド通信用パイプのサーバーを開始し、要求をルーターの非同期キュー投入処理（EnqueueAsync）へ接続する。

備考: -

### ⑤. Dispose

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Dispose()` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

処理内容:

- ① コマンド通信用サーバーを破棄し、参照を未設定（null）にする。
- ② ルーターを破棄してワーカーキューを停止する。
- ③ イベント通知用パブリッシャーを破棄し、参照を未設定（null）にする。

備考: -

### ⑥. PublishDeviceReply

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

- ① デバイスID、メソッドID、ハンドル、ペイロードから NamedPipeDeviceEvent を生成する。
- ② EventId を GUID で採番し、EventType/Message に ReplyDevice を設定する。
- ③ ペイロードが null の場合は空の辞書を設定する。
- ④ イベント通知用パブリッシャーが存在する場合のみ送信する。

備考: -

### ⑦. ProcessCommand

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private NamedPipeDeviceCommandResponse ProcessCommand(NamedPipeDeviceCommandRequest request)` |
| 可視性 | private |
| 戻り値 | NamedPipeDeviceCommandResponse |
| 戻り値内容 | 名前付きパイプ要求を内部コマンドに変換し、ハンドラー実行後に応答へ戻した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| NamedPipeDeviceCommandRequest | デバイスコマンド要求 | request |

処理内容:

- ① 要求をコマンドマッパーで内部デバイスコマンド（DeviceCommand）に変換する。
- ② デバイスコマンド処理（DeviceCommandHandler.Handle）を呼び、処理結果を取得する。
- ③ 処理結果を名前付きパイプ応答へ変換する。
- ④ 「Kill」／「ReStart」要求によってデバイスコネクタ制御アクションが設定された場合は、応答送信後に500ミリ秒待機して通知先を実行する送信後処理（PostWriteAction）を設定する。
- ⑤ 送信後処理（PostWriteAction）を含む応答を返却する。

備考: -

## 処理フロー/注意事項

- Startがコマンドルーター、イベント通知用パブリッシャー、コマンド通信用サーバーを生成して開始する。
- ProcessCommand が要求、コマンド、結果、応答の変換を行う。
- PublishDeviceReply がデバイスイベントをイベント通知用パイプへ送信する。
- Dispose が通信関連リソースを解放する。

### 注意事項

- 既定 pipe 名は `TabetPos.Host.Command` と `TabetPos.Host.Event`。
- 「Kill」／「ReStart」要求によるデバイスコネクタ制御は、コマンド応答の送信完了後に実行される。
