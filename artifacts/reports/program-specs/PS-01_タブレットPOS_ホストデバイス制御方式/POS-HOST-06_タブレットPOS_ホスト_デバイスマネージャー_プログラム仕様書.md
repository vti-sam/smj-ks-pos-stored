---
title: POS-HOST-06 タブレットPOS ホスト デバイスマネージャー プログラム仕様書
project: tablet_pos_host
type: architecture
status: draft
source:
  - sources/KsPosBoilerplate/TabetPos.Host/src/KsDeviceManager/KsDeviceManager.cs
tags:
  - tablet-host
  - opos
---

# POS-HOST-06 タブレットPOS ホスト デバイスマネージャー プログラム仕様書

<!-- spec-evidence
document_id: POS-HOST-06
status: verified
sources:
  - path: sources/KsPosBoilerplate/TabetPos.Host/src/KsDeviceManager/KsDeviceManager.cs
    symbol: KsOutProcess.KsDeviceServer.KsDeviceManager
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
| 機能名 | デバイスマネージャー |
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
| クラス名(論理) | デバイスマネージャー |
| クラス名(物理) | KsDeviceManager |
| 役割/概要 | 設定に基づいて各種デバイスクラスを動的にロード・起動し、実行時のデバイス状態の監視（応答確認）およびアンロード処理を制御するクラス。 |
| 備考 | - |

## クラス定義 {grid=24}

### {kv:6,18}
| 項目 | 内容 |
| --- | --- |
| アクセス修飾子 | public |
| 継承関係(Base/Interfaces) | - |
| 静的/インスタンス | インスタンス |

### コンストラクタ引数 {table:8,8,8}
| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| - | - | - |

### クラスプロパティ {table:5,4,3,3,3,6}
| 型 | 論理名 | 物理名 | getter | setter | 初期値 |
| --- | --- | --- | --- | --- | --- |
| IReadOnlyList\<IFDevice\> | デバイスリスト | Devices | public | - | - |

## メソッド一覧 {grid=40}

### {table:2,5,4,5,8,12,4}
| No | 修飾子 | static | 戻り値 | メソッド名 | 概要 | 備考 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | public | static | KsDeviceManager | GetInstance | Singleton インスタンスを取得 | - |
| 2 | public | - | void | StartDeviceManager | デバイスマネージャーの開始とデバイスロード・監視処理 | - |
| 3 | public | - | void | StopDeviceManager | ロード済みデバイスの一括停止とアンロード | - |
| 4 | public | - | IFDevice | FindDevice | デバイスIDによるロード済みデバイスの検索 | - |
| 5 | public | - | void | ReplyDevice | クライアントへの応答処理の中継 | - |

## メソッド定義 {grid=40}

### {methoddef:2,2,6,4,4,4,4,4,6,2,2}

#### GetInstance
No: 1
戻り値: KsDeviceManager | Singleton オブジェクト
発生例外: -

引数:
- -

処理内容:
- ① 内部静的変数 `_singleton` に格納されているインスタンスを返す。

備考:
- -

#### StartDeviceManager
No: 2
戻り値: void | -
発生例外: -

引数:
- IFSettingDevice | デバイス設定インスタンス | deviceSetting
- IFDeviceReply | デバイス応答用インスタンス | deviceReply

処理内容:
- ① 停止フラグ `_stopFlg` を false に初期化し、引数の `deviceSetting` と `deviceReply` をクラス変数に保持する。
- ② `deviceSetting.GetDeviceSettingList()` を呼び出して、起動対象のデバイス設定情報のリストを取得する。
- ③ 取得した各デバイス情報に対して、最大3回のリトライループを実行し、デバイスのインスタンス化 (`CreateDevice`) と起動 (`StartDevice`) を試みる。
- ④ 起動に成功したデバイスは `_deviceList` に追加され、失敗した場合は例外処理を行いリトライするか、3回失敗時にログ出力を行う。
- ⑤ 開始時刻 `timeStart` を現在時刻に設定し、`_stopFlg` が true になるまでループ（10ms スリープ、`Application.DoEvents()` 実行）を開始する。
- ⑥ ループ内において、60秒ごとに登録されたデバイス（Msr または CashChanger）の状態監視を行い、最終応答日時から30秒以上経過している場合に状態異常ログを出力する。

備考:
- -

#### StopDeviceManager
No: 3
戻り値: void | -
発生例外: -

引数:
- -

処理内容:
- ① 停止フラグ `_stopFlg` を true に設定し、監視ループを終了させる。
- ② `_deviceList` に登録されているすべてのデバイスに対して `dev.StopDevice()` を実行し、終了処理を行う。
- ③ `_deviceList` をクリアする。

備考:
- -

#### FindDevice
No: 4
戻り値: IFDevice | 検索されたデバイスインスタンス（存在しない場合は null）
発生例外: -

引数:
- KsDeviceId | デバイスID | deviceId

処理内容:
- ① `_deviceList` から `KsDeviceId` が一致する最初のデバイスを検索して返す。

備考:
- -

#### ReplyDevice
No: 5
戻り値: void | -
発生例外: -

引数:
- KsProcessInfo | クライアントプロセス情報 | proc
- Dictionary\<string, string\> | 応答パラメータ | dic

処理内容:
- ① `_deviceReply.ReplyDevice(proc.Client, proc.KsDeviceId, proc.MethodId, proc.Handle, dic)` を呼び出して、クライアントに処理結果を応答する。

備考:
- -
