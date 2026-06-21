---
title: POS-HOST-05 タブレットPOS ホスト デバイスサーバーホスト プログラム仕様書
project: tablet_pos_host
type: architecture
status: draft
source:
  - sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/KsHost.cs
tags:
  - tablet-host
  - opos
---

# POS-HOST-05 タブレットPOS ホスト デバイスサーバーホスト プログラム仕様書

<!-- spec-evidence
document_id: POS-HOST-05
status: verified
sources:
  - path: sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/KsHost.cs
    symbol: KsOutProcess.KsDeviceServer.KsHost
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
| 機能名 | デバイスサーバーホスト |
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
| クラス名(論理) | WindowMessageサービスホスト |
| クラス名(物理) | KsHost |
| 役割/概要 | デバイスサーバーのメインホストであり、通信トランスポート（WindowMessage/NamedPipe）を初期化・開始し、デバイスマネージャーのライフサイクルを制御するクラス。 |
| 備考 | - |

## クラス定義 {grid=24}

### {kv:6,18}
| 項目 | 内容 |
| --- | --- |
| アクセス修飾子 | public sealed partial |
| 継承関係(Base/Interfaces) | IFDeviceReply |
| 静的/インスタンス | インスタンス |

### コンストラクタ引数 {table:8,8,8}
| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| - | - | - |
| int | 起動モード | mode |

### クラスプロパティ {table:5,4,3,3,3,6}
| 型 | 論理名 | 物理名 | getter | setter | 初期値 |
| --- | --- | --- | --- | --- | --- |
| bool | 終了命令フラグ | IsEndOrder | public | private | false |

## メソッド一覧 {grid=40}

### {table:2,5,4,5,8,12,4}
| No | 修飾子 | static | 戻り値 | メソッド名 | 概要 | 備考 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | public | - | void | StartHost | ホストサービスおよびデバイスマネージャーの開始 | - |
| 2 | public | - | void | StopHost | ホストサービスおよびデバイスマネージャーの停止 | - |
| 3 | private | - | void | HandleHostAction | ホスト制御アクション（終了・再起動）の実行 | - |
| 4 | public | - | void | ReplyDevice | クライアントへの非同期デバイス結果の返却 | - |

## メソッド定義 {grid=40}

### {methoddef:2,2,6,4,4,4,4,4,6,2,2}

#### StartHost
No: 1
戻り値: void | -
発生例外: -

引数:
- -

処理内容:
- ① デバッグログに出力する。
- ② デバイスマネージャー `KsDeviceManager` の Singleton インスタンスを取得し `_mDevmanager` に設定する。
- ③ デバイスレジストリとプロセス情報ストアを指定して `DeviceCommandHandler` を生成し `_commandHandler` に設定する。
- ④ トランスポート `_transport.Start(_commandHandler)` を開始する。
- ⑤ 設定ファクトリ `_deviceSettingFactory.Create(_mMode)` を用いて、指定されたモードに応じたデバイス設定オブジェクト `iSetting` を生成する。
- ⑥ `_mDevmanager.StartDeviceManager(iSetting, this)` を呼び出して、各デバイスのロードおよび監視を開始する。
- ⑦ 例外発生時は情報ログにエラー詳細を出力する。

備考:
- -

#### StopHost
No: 2
戻り値: void | -
発生例外: -

引数:
- -

処理内容:
- ① トランスポート `_transport.Stop()` を呼び出して、通信受信サービスを停止する。
- ② デバイスマネージャー `_mDevmanager.StopDeviceManager()` を呼び出して、全デバイスをアンロード・停止する。
- ③ デバッグログにホスト停止を出力する。
- ④ 例外発生時は情報ログにエラー詳細を出力する。

備考:
- -

#### HandleHostAction
No: 3
戻り値: void | -
発生例外: -

引数:
- DeviceHostAction | 制御アクション | action

処理内容:
- ① `action` が `Kill` の場合、`StopHost()` を呼び出し、終了フラグ `IsEndOrder` に true を設定する。
- ② `action` が `Restart` の場合、`StopHost()` を呼び出した後、直ちに `StartHost()` を呼び出して再起動を行う。

備考:
- -

#### ReplyDevice
No: 4
戻り値: void | -
発生例外: -

引数:
- IDeviceServiceCallBack | クライアントオブジェクト | client
- KsDeviceId | デバイスID | deviceId
- KsDeviceMethodID | デバイスメソッドID | ksDeviceMethodId
- IntPtr | ウィンドウハンドル | handle
- Dictionary\<string, string\> | 応答データ | dic

処理内容:
- ① トランスポート `_transport.PublishDeviceReply(deviceId, ksDeviceMethodId, handle, dic)` を呼び出して、クライアントに応答データを通知する。

備考:
- -
