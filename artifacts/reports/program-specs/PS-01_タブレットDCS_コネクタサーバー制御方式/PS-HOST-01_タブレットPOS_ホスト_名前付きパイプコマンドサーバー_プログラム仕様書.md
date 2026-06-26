# PS-HOST-01 タブレットPOS ホスト 名前付きパイプコマンドサーバー プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.2 | 2026/06/21 | VTI サム | クラス仕様、フィールド/プロパティ、メソッド仕様を更新 |
| 0.0.1 | 2026/06/19 | VTI サム | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-HOST-01 |
| プロジェクト名 | タブレットPOS |
| 機能名 | 名前付きパイプコマンドサーバー |
| 物理クラス名 | NamedPipeCommandServer |
| 名前空間 | TabletOutProcess.TabletDeviceServer |
| アクセス修飾子 | internal |
| 継承/実装 | IDisposable |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/tabletposboilerplate/TabetPos.Host/src/TabletHost/DeviceHost/NamedPipeCommandServer.cs |
| 対象クラス | NamedPipeCommandServer |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

POSアプリケーションとホストプロセス間のコマンド受け口として、名前付きパイプ経由の要求を受信し、処理結果を応答として返す。通信の待受、接続中セッションの管理、要求形式の解釈、異常時の応答生成をまとめて担う。

### 主な責務

- 名前付きパイプの待受状態と接続中セッションを管理する。
- JSON形式および既存形式の要求を受け付ける。
- 処理中の例外を呼出元へ返却可能な失敗応答に変換する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| フィールド | private static readonly | JsonSerializerOptions | JsonOptions | JSON 変換時の大文字小文字非依存設定。 |
| フィールド | private | CancellationTokenSource | _cancellationTokenSource | 待受停止を通知するキャンセルトークン発行元。 |
| フィールド | private | Thread | _listenThread | Named Pipe 待受用バックグラウンドスレッド。 |
| フィールド | private readonly | Lock | _pipeLock | 接続中パイプリストの排他制御。 |
| フィールド | private readonly | List<NamedPipeServerStream> | _activePipes | 停止時に破棄する接続中パイプリスト。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | internal | - | NamedPipeCommandServer | Named Pipe 名とコマンド処理ハンドラーを受け取ってサーバーを構成する。 |
| 2 | public | void | Start | 待受スレッドを開始する。 |
| 3 | private | void | Stop | キャンセル通知、パイプ破棄、待受スレッド終了を実行する。 |
| 4 | private | void | Listen | Named Pipe 接続を待受し、接続ごとに処理スレッドを起動する。 |
| 5 | private | void | HandleClient | クライアント要求を読み取り、ハンドラー結果を JSON で返却する。 |
| 6 | private static | NamedPipeDeviceCommandRequest | ParseRequest | JSON または既存形式メッセージの要求を解析する。 |
| 7 | public | void | Dispose | Stop を呼び出してリソースを解放する。 |
| 8 | private | void | TrackPipe | 接続中パイプを管理リストへ追加する。 |
| 9 | private | void | UntrackPipe | 接続中パイプを管理リストから削除する。 |
| 10 | private | void | DisposeActivePipes | 接続中パイプを全て破棄する。 |

## メソッド詳細

### 1. NamedPipeCommandServer

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `internal class NamedPipeCommandServer(string pipeName, Func<NamedPipeDeviceCommandRequest, Task<NamedPipeDeviceCommandResponse>> handler)` |
| 可視性 | internal |
| 戻り値 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | パイプ名 | pipeName |
| Func<NamedPipeDeviceCommandRequest, Task<NamedPipeDeviceCommandResponse>> | 要求処理ハンドラー | handler |

処理内容:

- ① pipeName と handler をインスタンス生成時に受け取り、コマンド用パイプの受付先と処理委譲先を固定する。
- ② JSON 要求と既存形式メッセージの両方をハンドラーへ渡せるサーバーインスタンスを構成する。
- ③ Dispose 時に待受スレッドと接続中パイプを解放できる状態にする。

備考: -

### 2. Start

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Start()` |
| 可視性 | public |
| 戻り値 | void |

処理内容:

- ① 待受スレッドが既に存在する場合は何もせず終了する。
- ② CancellationTokenSource を生成し、Listen を実行するバックグラウンドスレッドを作成する。
- ③ スレッド名を設定し、コマンド用パイプの待受を開始する。

備考: -

### 3. Stop

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void Stop()` |
| 可視性 | private |
| 戻り値 | void |

処理内容:

- ① CancellationTokenSource にキャンセルを通知する。
- ② 接続中パイプをすべて破棄し、WaitForConnection/通信待ちを解除する。
- ③ 待受スレッドを最大3秒待ち、トークン発行元を破棄して参照をクリアする。

備考: -

### 4. Listen

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void Listen(CancellationToken cancellationToken)` |
| 可視性 | private |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① キャンセルされるまで NamedPipeServerStream を作成し、管理リストへ登録する。
- ② クライアント接続を待ち、接続済みパイプをクライアント処理スレッドへ渡す。
- ③ 待受中の例外ではパイプを管理リストから外し、キャンセル中でなければ短時間待って再試行する。

備考: -

### 5. HandleClient

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void HandleClient(NamedPipeServerStream pipe)` |
| 可視性 | private |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| NamedPipeServerStream | 名前付きパイプ | pipe |

処理内容:

- ① UTF-8 reader/writer を作成し、クライアントから1行の要求を読み取る。
- ② ParseRequest の結果をハンドラーに渡し、同期的に応答を取得する。
- ③ 例外時は ResultCode=-1 の失敗応答を生成する。
- ④ 応答を JSON で書き戻し、パイプを管理リストから外す。

備考: -

### 6. ParseRequest

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static NamedPipeDeviceCommandRequest ParseRequest(string line)` |
| 可視性 | private static |
| 戻り値 | NamedPipeDeviceCommandRequest |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | 受信行 | line |

処理内容:

- ① 空または空白のみの要求は ArgumentException とする。
- ② 先頭が `{` の場合は JSON として NamedPipeDeviceCommandRequest へ変換する。
- ③ JSON 以外は既存形式メッセージとして要求に保持する。

備考: -

### 7. Dispose

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Dispose()` |
| 可視性 | public |
| 戻り値 | void |

処理内容:

- ① 保持しているサーバー、ルーター、publisher またはフォームを停止する。
- ② 対象インスタンスを破棄し、参照を null または解放済み状態へ更新する。
- ③ 以後の再開始時に新規生成できる状態に戻す。

備考: -

### 8. TrackPipe

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void TrackPipe(NamedPipeServerStream pipe)` |
| 可視性 | private |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| NamedPipeServerStream | 名前付きパイプ | pipe |

処理内容:

- ① 接続中パイプリストの排他ロックを取得する。
- ② 新規に作成した NamedPipeServerStream を接続中パイプリストへ追加する。
- ③ Stop/Dispose 時に待受中パイプを確実に破棄できるよう管理対象にする。

備考: -

### 9. UntrackPipe

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void UntrackPipe(NamedPipeServerStream pipe)` |
| 可視性 | private |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| NamedPipeServerStream | 名前付きパイプ | pipe |

処理内容:

- ① 接続中パイプリストの排他ロックを取得する。
- ② 処理済みまたは接続失敗したパイプを接続中パイプリストから削除する。
- ③ DisposeActivePipes の対象から外し、二重破棄を防止する。

備考: -

### 10. DisposeActivePipes

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void DisposeActivePipes()` |
| 可視性 | private |
| 戻り値 | void |

処理内容:

- ① 接続中パイプリストの排他ロックを取得する。
- ② 接続中パイプのスナップショットを作成し、各パイプを Dispose して待受/通信待ちを解除する。
- ③ 接続中パイプリストをクリアし、Stop 後に接続中パイプが残らない状態にする。

備考: -
## 処理フロー/注意事項

- Start が待受スレッドを起動する。
- Listen が接続ごとにクライアント処理スレッドを作成する。
- HandleClient が要求を解析してハンドラーを呼び出し、応答を書き戻す。
- Dispose/Stop がキャンセル通知、パイプ破棄、スレッド終了待ちを実行する。

### 注意事項

- primary constructor 形式のため、pipeName と handler はインスタンス生成時に固定される。
