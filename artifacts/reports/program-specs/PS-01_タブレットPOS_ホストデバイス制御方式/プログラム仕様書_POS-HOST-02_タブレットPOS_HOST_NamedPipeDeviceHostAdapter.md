---
title: Tablet Host NamedPipeDeviceHostAdapter Program Specification
project: tablet_pos_host
type: architecture
status: draft
source:
  - sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs
tags:
  - tablet-host
  - opos
---

# プログラム仕様書 NamedPipeDeviceHostAdapter

<!-- spec-evidence
document_id: POS-HOST-02
status: verified
sources:
  - path: sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs
    symbol: KsOutProcess.KsDeviceServer.NamedPipeDeviceHostAdapter
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
| 機能名 | Named Pipeデバイスホストアダプター |
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
| クラス名(論理) | Named Pipeデバイスホストアダプター |
| クラス名(物理) | NamedPipeDeviceHostAdapter |
| 役割/概要 | Named Pipe通信を管理し、受信コマンドをコマンドルーターに中継し、非同期のデバイスイベントをクライアントへ配信するアダプタークラス。 |
| 備考 | - |

## クラス定義 {grid=24}

### {kv:6,18}
| 項目 | 内容 |
| --- | --- |
| アクセス修飾子 | internal sealed |
| 継承関係(Base/Interfaces) | IDisposable |
| 静的/インスタンス | インスタンス |

### コンストラクタ引数 {table:8,8,8}
| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IDeviceCommandHandler | コマンドハンドラ | commandHandler |
| Action\<DeviceHostAction\> | ホストアクションハンドラ | hostActionHandler |

### クラスプロパティ {table:5,4,3,3,3,6}
| 型 | 論理名 | 物理名 | getter | setter | 初期値 |
| --- | --- | --- | --- | --- | --- |
| - | - | - | - | - | - |

## メソッド一覧 {grid=40}

### {table:2,5,4,5,8,12,4}
| No | 修飾子 | static | 戻り値 | メソッド名 | 概要 | 備考 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | public | - | void | Start | Named Pipeサービス（受信・イベント配信）の開始 | - |
| 2 | public | - | void | Dispose | リソース解放処理 | - |
| 3 | public | - | void | PublishDeviceReply | デバイス応答イベントのクライアント配信 | - |
| 4 | private | - | NamedPipeDeviceCommandResponse | ProcessCommand | 受信コマンドの処理とルーティング | - |

## メソッド定義 {grid=40}

### {methoddef:2,2,6,4,4,4,4,4,6,2,2}

#### Start
No: 1
戻り値: void | -
発生例外: -

引数:
- -

処理内容:
- ① コマンドルーター `_commandRouter` が未作成の場合、`ProcessCommand` メソッドを登録してインスタンス化する。
- ② イベント配信サーバー `_eventPublisher` が未作成の場合、パイプ名 `_eventPipeName` を指定してインスタンス化する。
- ③ コマンド受信サーバー `_commandServer` が未作成の場合、パイプ名 `_commandPipeName` とルーターのキュー登録処理 `_commandRouter.EnqueueAsync` を指定してインスタンス化する。
- ④ イベント配信サーバー `_eventPublisher.Start()` を開始する。
- ⑤ コマンド受信サーバー `_commandServer.Start()` を開始する。

備考:
- -

#### Dispose
No: 2
戻り値: void | -
発生例外: -

引数:
- -

処理内容:
- ① コマンド受信サーバー `_commandServer` の `Dispose()` を実行し、null クリアする。
- ② コマンドルーター `_commandRouter` の `Dispose()` を実行し、null クリアする。
- ③ イベント配信サーバー `_eventPublisher` の `Dispose()` を実行し、null クリアする。

備考:
- -

#### PublishDeviceReply
No: 3
戻り値: void | -
発生例外: -

引数:
- KsDeviceId | デバイスID | deviceId
- KsDeviceMethodID | メソッドID | methodId
- IntPtr | ウィンドウハンドル | handle
- Dictionary\<string, string\> | 応答ペイロード | payload

処理内容:
- ① 新しい `NamedPipeDeviceEvent` オブジェクトを構築し、`EventId` に一意の GUID 文字列、`DeviceId` と `MethodId` に引数の文字列、`EventType` と `Message` に "ReplyDevice"、`Payload` に引数の `payload`（null の場合は空のディクショナリ）を設定する。
- ② イベント配信サーバー `_eventPublisher` を通じて、構築したイベントをクライアントへ非同期配信 (`Publish`) する。

備考:
- -

#### ProcessCommand
No: 4
戻り値: NamedPipeDeviceCommandResponse | クライアントへのコマンド応答データ
発生例外: -

引数:
- NamedPipeDeviceCommandRequest | 受信リクエスト | request

処理内容:
- ① リクエストマッパー `_commandMapper` を用いて、受信したパイプリクエスト `request` を内部コマンドオブジェクト `DeviceCommand` に変換する。
- ② コマンドハンドラ `_commandHandler.Handle(command)` を呼び出してコマンドを実行し、実行結果 `DeviceCommandResult` を得る。
- ③ 実行結果のホスト制御アクション `result.HostAction` が `None` 以外の場合、非同期タスク (`Task.Run`) を立ち上げ、500ミリ秒待機 (`Task.Delay`) した後、`_hostActionHandler(result.HostAction)` を呼び出してホストプロセスの終了または再起動を実行する。
- ④ `_commandMapper.ToResponse` を呼び出して、実行結果をパイプ応答 `NamedPipeDeviceCommandResponse` に変換して返す。

備考:
- -
