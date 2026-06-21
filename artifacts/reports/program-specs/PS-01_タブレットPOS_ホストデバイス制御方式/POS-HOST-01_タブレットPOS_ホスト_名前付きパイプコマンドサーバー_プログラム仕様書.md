---
title: POS-HOST-01 タブレットPOS ホスト 名前付きパイプコマンドサーバー プログラム仕様書
project: tablet_pos_host
type: architecture
status: draft
source:
  - sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/NamedPipeCommandServer.cs
tags:
  - tablet-host
  - opos
---

# POS-HOST-01 タブレットPOS ホスト 名前付きパイプコマンドサーバー プログラム仕様書

<!-- spec-evidence
document_id: POS-HOST-01
status: verified
sources:
  - path: sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/NamedPipeCommandServer.cs
    symbol: KsOutProcess.KsDeviceServer.NamedPipeCommandServer
notes: CodeGraph とソースコードで確認済み（2026-06-19）。
-->

## @meta
作成者: VTI-SAM
図番: -
更新日: 2026/06/19

## 変更履歴 {grid=21}

### 基本情報 {kv:6,15}
| 項目 | 内容 |
| --- | --- |
| プロジェクト名 | タブレットPOS |
| 機能名 | Named Pipeコマンドサーバー |
| バージョン | 0.0.1 |
| 作成者 | VTI-SAM |
| 作成日 | 2026年06月19日 |

### 更新履歴 {table:3,3,3,3,3,3,3}
| バージョン | 依頼者 | 更新者 | 更新日時 | 変更理由 | シート名 | 更新内容 |
| --- | --- | --- | --- | --- | --- | --- |
| 0.0.1 | SMJ様 | VTI-SAM | 2026年06月19日 | - | 全体 | 初版作成 |

## 表紙 {grid=21}

### {kv:6,15}
| 項目 | 内容 |
| --- | --- |
| 名前空間 | KsOutProcess.KsDeviceServer |
| クラス名(論理) | Named Pipeコマンドサーバー |
| クラス名(物理) | NamedPipeCommandServer |
| 役割/概要 | Named Pipeを介してクライアントからのデバイス操作コマンドを受信し、非同期で処理するサーバークラス。 |
| 備考 | - |

## クラス定義 {grid=24}

### {kv:6,18}
| 項目 | 内容 |
| --- | --- |
| アクセス修飾子 | internal |
| 継承関係(Base/Interfaces) | IDisposable |
| 静的/インスタンス | インスタンス |

### コンストラクタ引数 {table:8,8,8}
| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | パイプ名 | pipeName |
| Func\<NamedPipeDeviceCommandRequest, Task\<NamedPipeDeviceCommandResponse\>\> | コマンドハンドラ | handler |

### クラスプロパティ {table:5,4,3,3,3,6}
| 型 | 論理名 | 物理名 | getter | setter | 初期値 |
| --- | --- | --- | --- | --- | --- |
| - | - | - | - | - | - |

## メソッド一覧 {grid=40}

### {table:2,5,4,5,8,12,4}
| No | 修飾子 | static | 戻り値 | メソッド名 | 概要 | 備考 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | public | - | void | Start | Named Pipe受信スレッドの開始 | - |
| 2 | private | - | void | Stop | Named Pipe受信スレッドの停止 | - |
| 3 | private | - | void | Listen | クライアント接続待ち受け処理 | - |
| 4 | private | - | void | HandleClient | クライアント通信処理 | - |
| 5 | private | static | NamedPipeDeviceCommandRequest | ParseRequest | リクエストメッセージ解析 | - |
| 6 | public | - | void | Dispose | リソース解放処理 | - |
| 7 | private | - | void | TrackPipe | 生成したパイプの管理登録 | - |
| 8 | private | - | void | UntrackPipe | パイプの管理登録解除 | - |
| 9 | private | - | void | DisposeActivePipes | アクティブなパイプの一括解放 | - |

## メソッド定義 {grid=40}

### {methoddef:2,2,6,4,4,4,4,4,6,2,2}

#### Start
No: 1
戻り値: void | -
発生例外: -

引数:
- -

処理内容:
- ① すでに監視スレッド `_listenThread` が存在する場合は処理を終了する。
- ② スレッド停止用トークン `_cancellationTokenSource` をインスタンス化する。
- ③ 監視スレッド `_listenThread` を生成し、バックグラウンド実行、名前を「TabetPos.Host.Command」に設定し、`Listen` メソッドを実行するように登録する。
- ④ 監視スレッドを開始する。

備考:
- -

#### Stop
No: 2
戻り値: void | -
発生例外: -

引数:
- -

処理内容:
- ① スレッド停止トークン `_cancellationTokenSource` のキャンセルを要求する。
- ② `DisposeActivePipes` を呼び出し、アクティブなパイプ接続をすべて閉じる。
- ③ 監視スレッド `_listenThread` が終了するのを最大3000ミリ秒待つ。
- ④ `_listenThread` を null クリアする。
- ⑤ `_cancellationTokenSource` を解放し、null クリアする。

備考:
- -

#### Listen
No: 3
戻り値: void | -
発生例外: -

引数:
- CancellationToken | キャンセルトークン | cancellationToken

処理内容:
- ① キャンセル要求が来るまでループを実行する。
- ② NamedPipeServerStream をインスタンス化する。方向は `InOut`、インスタンス数は最大許可数、転送モードは `Byte` を指定する。
- ③ `TrackPipe` を呼び出してパイプを登録する。
- ④ クライアント接続を待ち受ける (`WaitForConnection`)。
- ⑤ 接続完了後、クライアント通信処理を実行するためのスレッドを生成し、開始する。スレッド名は「TabetPos.Host.Command.Client」とする。
- ⑥ 例外発生時はパイプを登録解除し、ループを継続する（200ミリ秒スリープ）。

備考:
- -

#### HandleClient
No: 4
戻り値: void | -
発生例外: -

引数:
- NamedPipeServerStream | パイプストリーム | pipe

処理内容:
- ① `pipe` から StreamReader および StreamWriter を UTF-8 で生成する。
- ② `reader.ReadLine()` を呼び出し、クライアントからのリクエストデータを1行読み込む。
- ③ 読み込んだリクエストデータを `ParseRequest` で解析する。
- ④ 解析したリクエストを `handler`（コンストラクタで渡されたコールバック）に渡し、同期的に応答を待つ。
- ⑤ 応答データ（または例外情報）を JSON シリアライズし、クライアントに書き込む (`WriteLine`)。
- ⑥ 処理終了後、`UntrackPipe` を呼び出し、パイプを登録解除して閉じる。

備考:
- -

#### ParseRequest
No: 5
戻り値: NamedPipeDeviceCommandRequest | 解析されたリクエストオブジェクト
発生例外:
- ArgumentException | リクエストデータが空の場合

引数:
- string | 受信テキスト | line

処理内容:
- ① `line` が空または空白文字のみの場合、ArgumentException をスローする。
- ② 文字列の先頭が「{」で始まる場合、JSON 文字列として `NamedPipeDeviceCommandRequest` にデシリアライズする。
- ③ 「{」以外で始まる場合、レガシーコマンドフォーマットとして扱い、`LegacyMessage` プロパティに `line` を設定したリクエストオブジェクトを返す。

備考:
- -

#### Dispose
No: 6
戻り値: void | -
発生例外: -

引数:
- -

処理内容:
- ① `Stop` メソッドを呼び出し、スレッドとパイプのリソースを解放する.

備考:
- -

#### TrackPipe
No: 7
戻り値: void | -
発生例外: -

引数:
- NamedPipeServerStream | パイプストリーム | pipe

処理内容:
- ① `_pipeLock` をロックする。
- ② `_activePipes` リストに指定された `pipe` を追加する。

備考:
- -

#### UntrackPipe
No: 8
戻り値: void | -
発生例外: -

引数:
- NamedPipeServerStream | パイプストリーム | pipe

処理内容:
- ① `_pipeLock` をロックする。
- ② `_activePipes` リストから指定された `pipe` を削除する。

備考:
- -

#### DisposeActivePipes
No: 9
戻り値: void | -
発生例外: -

引数:
- -

処理内容:
- ① `_pipeLock` をロックする.
- ② `_activePipes` に存在するすべてのパイプに対して `Dispose()` を実行し、ストリームを閉じる。
- ③ `_activePipes` リストをクリアする。

備考:
- -
