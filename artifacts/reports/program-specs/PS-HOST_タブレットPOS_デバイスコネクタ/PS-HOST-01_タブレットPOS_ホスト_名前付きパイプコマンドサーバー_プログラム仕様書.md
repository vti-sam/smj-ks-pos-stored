# PS-HOST-01 タブレットPOS ホスト 名前付きパイプコマンドサーバー プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-HOST-01 |
| 文書名 | タブレットPOS ホスト 名前付きパイプコマンドサーバー プログラム仕様書 |
| 対象 | タブレットPOS / 名前付きパイプコマンドサーバー |
| 版数 | 0.0.5 |
| 作成日 | 2026/06/19 |
| 作成者 | VTI サム, VTI 吉田 |
| レビュー担当 | SMJ 蒲田 |
| 承認者 | SMJ 蒲田 |
| 目的 | 対象クラスの構造、フィールド／プロパティ及びメソッド仕様を定義する。 |
| 期待成果 | 実装及びレビューで参照するクラス単位の仕様を明確にする。 |

## 01_改訂履歴

| 版数 | 日付 | 変更内容 | 作成者 | 承認者 |
| --- | --- | --- | --- | --- |
| 0.0.5 | 2026/08/24 | 通信復旧を旧ログ実装の異常から分離するSafeLogを追加し、現行ソースのメソッド構成へ統一 | VTI サム | SMJ 蒲田 |
| 0.0.4 | 2026/07/23 | ARCH-HOST-01に合わせて、デバイスコネクタ、タブレットPOS端末アプリ、および通信経路の表記を統一 | VTI サム |  |
| 0.0.3 | 2026/07/23 | 現行実装に合わせて応答送信後処理、既存形式要求ID、例外ログ、破棄処理を更新 | VTI サム |  |
| 0.0.2 | 2026/06/21 | クラス仕様、フィールド/プロパティ、メソッド仕様を更新 | VTI サム |  |
| 0.0.1 | 2026/06/19 | 初版作成 | VTI サム |  |

## クラス情報

| 項目 | 内容 |
| --- | --- |
| 機能名 | 名前付きパイプコマンドサーバー |
| 物理クラス名 | NamedPipeCommandServer |
| 名前空間 | TabletOutProcess.TabletDeviceServer |
| アクセス修飾子 | internal |
| 継承/実装 | IDisposable |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/TabletPosBoilerplate/TabletPos.Host/src/TabletHost/DeviceHost/NamedPipeCommandServer.cs |
| 対象クラス | NamedPipeCommandServer |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

タブレットPOS端末アプリとデバイスコネクタプロセス間のコマンド受け口として、コマンド通信用パイプから要求を受信し、処理結果を応答として返す。通信の待受、接続中セッションの管理、要求形式の解釈、異常時の応答生成をまとめて担う。

### 主な責務

- コマンド通信用パイプの待受状態と接続中セッションを管理する。
- JSON形式および既存形式の要求を受け付ける。
- 処理中の例外を呼出元へ返却可能な失敗応答に変換する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| フィールド | private static readonly | JsonSerializerOptions | JsonOptions | JSON 変換時の大文字小文字非依存設定。 |
| フィールド | private | CancellationTokenSource | _cancellationTokenSource | 待受停止を通知するキャンセルトークン発行元。 |
| フィールド | private | Thread | _listenThread | 名前付きパイプ待受用バックグラウンドスレッド。 |
| フィールド | private readonly | Lock | _pipeLock | 接続中パイプリストの排他制御。 |
| フィールド | private readonly | List<NamedPipeServerStream> | _activePipes | 停止時に破棄する接続中パイプリスト。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | internal | - | NamedPipeCommandServer | 名前付きパイプ名とコマンド処理ハンドラーを受け取ってサーバーを構成する。 |
| ② | public | void | Start | 待受スレッドを開始する。 |
| ③ | private | void | Stop | キャンセル通知、パイプ破棄、待受スレッド終了を実行する。 |
| ④ | private | void | Listen | 名前付きパイプ接続を待受し、接続ごとに処理スレッドを起動する。 |
| ⑤ | private | void | HandleClient | クライアント要求を読み取り、ハンドラー結果を JSON で返却する。 |
| ⑥ | private static | NamedPipeDeviceCommandRequest | ParseRequest | JSON または既存形式メッセージの要求を解析する。 |
| ⑦ | public | void | Dispose | Stop を呼び出してリソースを解放する。 |
| ⑧ | private | void | TrackPipe | 接続中パイプを管理リストへ追加する。 |
| ⑨ | private | void | UntrackPipe | 接続中パイプを管理リストから削除する。 |
| ⑩ | private | void | DisposeActivePipes | 接続中パイプを全て破棄する。 |
| ⑪ | private | void | SafeLog | ログ出力例外を通信復旧処理へ波及させずに異常ログを記録する。 |

## メソッド詳細

### ①. NamedPipeCommandServer

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `internal class NamedPipeCommandServer(string pipeName, Func<NamedPipeDeviceCommandRequest, Task<NamedPipeDeviceCommandResponse>> handler)` |
| 可視性 | internal |
| 戻り値 | - |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | パイプ名 | pipeName |
| Func<NamedPipeDeviceCommandRequest, Task<NamedPipeDeviceCommandResponse>> | 要求処理ハンドラー | handler |

処理内容:

- ① パイプ名（pipeName）と処理ハンドラー（handler）をインスタンス生成時に受け取り、コマンド通信用パイプの受付先と処理委譲先を固定する。
- ② JSON 要求と既存形式メッセージの両方をハンドラーへ渡せるサーバーインスタンスを構成する。
- ③ Dispose 時に待受スレッドと接続中パイプを解放できる状態にする。

備考: -

### ②. Start

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Start()` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

処理内容:

- ① 待受スレッドが既に存在する場合は何もせず終了する。
- ② CancellationTokenSource を生成し、Listen を実行するバックグラウンドスレッドを作成する。
- ③ スレッド名を設定し、コマンド通信用パイプの待受を開始する。

備考: -

### ③. Stop

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void Stop()` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

処理内容:

- ① CancellationTokenSource にキャンセルを通知する。
- ② 接続中パイプをすべて破棄し、WaitForConnection/通信待ちを解除する。
- ③ 待受スレッドを最大3秒待ち、トークン発行元を破棄して参照をクリアする。

備考: -

### ④. Listen

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void Listen(CancellationToken cancellationToken)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① キャンセルされるまで NamedPipeServerStream を作成し、管理リストへ登録する。
- ② クライアント接続を待ち、接続済みパイプをクライアント処理スレッドへ渡す。
- ③ 待受中の例外ではパイプを管理リストから外す。
- ④ キャンセル中でなければ異常ログを出力し、200ms 待って再試行する。

備考: -

### ⑤. HandleClient

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void HandleClient(NamedPipeServerStream pipe)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| NamedPipeServerStream | 名前付きパイプ| pipe |

処理内容:

- ① UTF-8リーダー／ライターを作成し、クライアントから1行の要求を読み取る。
- ② 要求解析処理（ParseRequest）の結果をハンドラーに渡し、同期的に応答を取得する。
- ③ 要求解析またはハンドラー実行の例外時は異常ログを出力し、結果コード（ResultCode）が「-1」の失敗応答を生成する。
- ④ 応答をJSONで書き戻し、ライターをフラッシュする。
- ⑤ 応答の送信完了後、送信後処理（PostWriteAction）が設定されている場合は実行する。
- ⑥ 応答の変換、送信または送信後処理で例外が発生した場合は異常ログを出力する。
- ⑦ 通信リソースを解放し、パイプを管理リストから外す。

備考: -

### ⑥. ParseRequest

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static NamedPipeDeviceCommandRequest ParseRequest(string line)` |
| 可視性 | private static |
| 戻り値 | NamedPipeDeviceCommandRequest |
| 戻り値内容 | JSON または既存形式メッセージの要求を解析した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | 受信行 | line |

処理内容:

- ① 空または空白のみの要求は引数例外（ArgumentException）とする。
- ② 先頭文字が「{」の場合は、JSONとして名前付きパイプデバイスコマンド要求（NamedPipeDeviceCommandRequest）へ変換する。
- ③ JSON以外は既存形式メッセージとして要求に保持する。
- ④ 既存形式メッセージには「Legacy-」とGUIDを連結した要求ID（RequestId）を設定する。

備考: -

### ⑦. Dispose

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Dispose()` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

処理内容:

- ① Stop を呼び出す。
- ② 待受キャンセル、接続中パイプ破棄、待受スレッド終了待ちを実行する。
- ③ キャンセルトークン発行元を破棄し、サーバーの保有リソースを解放する。

備考: -

### ⑧. TrackPipe

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void TrackPipe(NamedPipeServerStream pipe)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| NamedPipeServerStream | 名前付きパイプ| pipe |

処理内容:

- ① 接続中パイプリストの排他ロックを取得する。
- ② 新規に作成した NamedPipeServerStream を接続中パイプリストへ追加する。
- ③ Stop/Dispose 時に待受中パイプを確実に破棄できるよう管理対象にする。

備考: -

### ⑨. UntrackPipe

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void UntrackPipe(NamedPipeServerStream pipe)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| NamedPipeServerStream | 名前付きパイプ| pipe |

処理内容:

- ① 接続中パイプリストの排他ロックを取得する。
- ② 処理済みまたは接続失敗したパイプを接続中パイプリストから削除する。
- ③ DisposeActivePipes の対象から外し、二重破棄を防止する。

備考: -

### ⑩. DisposeActivePipes

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void DisposeActivePipes()` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

処理内容:

- ① 接続中パイプリストの排他ロックを取得する。
- ② 接続中パイプのスナップショットを作成し、各パイプを Dispose して待受/通信待ちを解除する。
- ③ 接続中パイプリストをクリアし、Stop 後に接続中パイプが残らない状態にする。

備考: -

### ⑪. SafeLog

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void SafeLog(string message)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | 異常メッセージ | message |

処理内容:

- ① 旧ログ出力部へ異常メッセージ、Host識別子、および異常区分を渡す。
- ② ログ出力で例外が発生した場合は、通信復旧を継続するため例外を呼び出し元へ通知しない。

備考: 本メソッドは通信異常処理の成否を旧ログ実装へ依存させない。

## 処理フロー/注意事項

- Start が待受スレッドを起動する。
- Listen が接続ごとにクライアント処理スレッドを作成する。
- HandleClient が要求を解析してハンドラーを呼び出し、応答を書き戻した後に PostWriteAction を実行する。
- SafeLogがログ出力例外を分離し、待受・応答処理の復旧を継続する。
- Dispose/Stop がキャンセル通知、パイプ破棄、スレッド終了待ちを実行する。

### 注意事項

- primary constructor 形式のため、pipeName と handler はインスタンス生成時に固定される。
- PostWriteAction は応答がクライアントへ書き込まれた後に実行される。
