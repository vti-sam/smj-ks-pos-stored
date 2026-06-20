---
title: Tablet Host DeviceCommandRouter Program Specification
project: tablet_pos_host
type: architecture
status: draft
source:
  - sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/DeviceCommandRouter.cs
tags:
  - tablet-host
  - opos
---

# プログラム仕様書 DeviceCommandRouter

<!-- spec-evidence
document_id: POS-HOST-03
status: verified
sources:
  - path: sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/DeviceCommandRouter.cs
    symbol: KsOutProcess.KsDeviceServer.DeviceCommandRouter
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
| 機能名 | デバイスコマンドルーター |
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
| クラス名(論理) | デバイスコマンドルーター |
| クラス名(物理) | DeviceCommandRouter |
| 役割/概要 | 受信したコマンドをデバイス（DeviceId）単位の専用キューおよびSTAスレッド（Worker）に振り分け、順序性を維持しつつ非同期で実行制御するルータークラス。 |
| 備考 | - |

## クラス定義 {grid=24}

### {kv:6,18}
| 項目 | 内容 |
| --- | --- |
| アクセス修飾子 | internal partial |
| 継承関係(Base/Interfaces) | IDisposable |
| 静的/インスタンス | インスタンス |

### コンストラクタ引数 {table:8,8,8}
| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Func\<NamedPipeDeviceCommandRequest, NamedPipeDeviceCommandResponse\> | コマンドプロセッサ | processor |

### クラスプロパティ {table:5,4,3,3,3,6}
| 型 | 論理名 | 物理名 | getter | setter | 初期値 |
| --- | --- | --- | --- | --- | --- |
| - | - | - | - | - | - |

## メソッド一覧 {grid=40}

### {table:2,5,4,5,8,12,4}
| No | 修飾子 | static | 戻り値 | メソッド名 | 概要 | 備考 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | public | - | Task\<NamedPipeDeviceCommandResponse\> | EnqueueAsync | リクエストの各デバイスキューへの登録 | - |
| 2 | private | - | Worker | GetWorker | デバイス用ワーカーオブジェクトの取得・生成 | - |
| 3 | private | static | string | GetDeviceKey | リクエストからのデバイス識別キーの取得 | - |
| 4 | public | - | void | Dispose | リソース解放処理 | - |

## メソッド定義 {grid=40}

### {methoddef:2,2,6,4,4,4,4,4,6,2,2}

#### EnqueueAsync
No: 1
戻り値: Task\<NamedPipeDeviceCommandResponse\> | コマンドの非同期実行を追跡するタスクオブジェクト
発生例外: -

引数:
- NamedPipeDeviceCommandRequest | 受信リクエスト | request

処理内容:
- ① `GetDeviceKey(request)` を呼び出し、リクエストのターゲットデバイスに応じたキーを取得する。
- ② `GetWorker(key)` を呼び出して、デバイス専用のワーカーオブジェクトを取得する。
- ③ 取得したワーカーの `Enqueue(request)` メソッドを実行し、結果を非同期タスクとして返す。

備考:
- -

#### GetWorker
No: 2
戻り値: Worker | デバイス用ワーカーインスタンス
発生例外: -

引数:
- string | デバイスキー | key

処理内容:
- ① `_syncObject` を排他ロックする。
- ② `_workers` ディクショナリに `key` に対応するワーカーが存在しない場合、新しいワーカー `Worker(processor)` をインスタンス化して追加する。
- ③ `key` に対応するワーカーオブジェクトを返す。

備考:
- ワーカーの初期化時には、専用のSTA (Single Threaded Apartment) スレッドが起動される。

#### GetDeviceKey
No: 3
戻り値: string | デバイスキー（存在しない場合は "Host"）
発生例外: -

引数:
- NamedPipeDeviceCommandRequest | 受信リクエスト | request

処理内容:
- ① `request` が null の場合は文字列 "Host" を返す。
- ② `request.DeviceId` が空または null でない場合は `request.DeviceId` を返し、それ以外の場合は "Host" を返す。

備考:
- -

#### Dispose
No: 4
戻り値: void | -
発生例外: -

引数:
- -

処理内容:
- ① `_syncObject` を排他ロックする。
- ② 管理しているすべてのワーカーに対して `Dispose()` を実行し、キューとスレッドを安全に停止・解放する。
- ③ `_workers` ディクショナリをクリアする。

備考:
- -
