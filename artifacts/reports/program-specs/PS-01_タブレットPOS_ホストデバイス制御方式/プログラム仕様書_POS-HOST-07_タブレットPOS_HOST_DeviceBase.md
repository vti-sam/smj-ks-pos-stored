---
title: Tablet Host DeviceBase Program Specification
project: tablet_pos_host
type: architecture
status: draft
source:
  - sources/KsPosBoilerplate/TabetPos.Host/src/KsDevice/DeviceBase/DeviceBase.cs
tags:
  - tablet-host
  - opos
---

# プログラム仕様書 DeviceBase

<!-- spec-evidence
document_id: POS-HOST-07
status: verified
sources:
  - path: sources/KsPosBoilerplate/TabetPos.Host/src/KsDevice/DeviceBase/DeviceBase.cs
    symbol: KsOutProcess.KsDeviceServer.DeviceBase
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
| 機能名 | デバイスベース |
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
| クラス名(論理) | デバイスベース |
| クラス名(物理) | DeviceBase |
| 役割/概要 | 各種周辺機器（周辺デバイス）制御クラスの基底クラスであり、OPOS制御（オープン・クローズ・排他制御・イベント処理等）の共通インターフェースおよび共通処理を提供する。 |
| 備考 | - |

## クラス定義 {grid=24}

### {kv:6,18}
| 項目 | 内容 |
| --- | --- |
| アクセス修飾子 | public |
| 継承関係(Base/Interfaces) | IFDevice |
| 静的/インスタンス | インスタンス |

### コンストラクタ引数 {table:8,8,8}
| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| - | - | - |

### クラスプロパティ {table:5,4,3,3,3,6}
| 型 | 論理名 | 物理名 | getter | setter | 初期値 |
| --- | --- | --- | --- | --- | --- |
| KsDeviceId | デバイス識別ID | KsDeviceId | public | public | - |
| DateTime | 生存確認用日時 | KeepAliveDateTime | public | public | - |

## メソッド一覧 {grid=40}

### {table:2,5,4,5,8,12,4}
| No | 修飾子 | static | 戻り値 | メソッド名 | 概要 | 備考 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | public | - | void | timer_tick | タイマー監視による定期処理 | - |
| 2 | public | virtual | void | Device_Mng | 周辺機器の固有制御処理 | 空実装 |
| 3 | public | virtual | int | Data_Check | 読込データの健全性チェック | 固定で-1を返却 |
| 4 | public | virtual | void | PutLog | デバイスログ output | - |
| 5 | public | virtual | int | Device_Open | OPOSデバイスのオープン処理 | - |
| 6 | public | virtual | int | Device_Close | OPOSデバイスのクローズ処理 | - |
| 7 | public | virtual | int | Device_Claim | デバイスの排他占有権の取得 | - |
| 8 | public | virtual | int | Device_Release | デバイスの排他占有権の解放 | - |
| 9 | public | virtual | int | Device_Start | デバイスの読み込み開始（初期占有、有効化） | - |
| 10 | public | virtual | int | Device_End | デバイスの読み込み終了（無効化、排他解放） | - |
| 11 | public | virtual | int | Device_End_2 | デバイスの読み込み終了（無効化、排他解放、詳細指定） | オーバーロード |
| 12 | public | virtual | void | StartDevice | デバイス制御の開始処理 | - |
| 13 | public | virtual | void | StopDevice | デバイス制御の終了処理 | - |
| 14 | public | virtual | int | DeviceMethod | デバイス固有メソッドの実行 | 基底では-1を返却 |
| 15 | public | virtual | int | DeviceUse | デバイスの利用開始処理 | 基底では-1を返却 |
| 16 | public | virtual | int | DeviceUnUse | デバイスの利用終了処理 | 基底では-1を返却 |

## メソッド定義 {grid=40}

### {methoddef:2,2,6,4,4,4,4,4,6,2,2}

#### timer_tick
No: 1
戻り値: void | -
発生例外: -

引数:
- object | イベント送信元 | sender
- EventArgs | イベント引数 | e

処理内容:
- ① 生存確認日時 `_keepAliveDateTime` を現在日時に更新する。
- ② `LoopTimer` を一旦停止状態にし、現在ユーザーが作業しているフォアグラウンドウィンドウのハンドルを取得する。
- ③ 制御対象のデバイスオブジェクト `MyDevice` が存在する場合、`PMntRun`（実行中フラグ）を true に設定し、`Device_Mng(MyDevice, foreHandl)` を実行後、`PMntRun` を false に戻す。
- ④ `Application.DoEvents()` を呼び出してキューのメッセージを処理する。
- ⑤ 終了フラグ `EndOrder` が true の場合はタイマーを有効化せずに終了し、false の場合はタイマーを再起動する。
- ⑥ 処理中に例外が発生した場合は、デバイスログに例外エラーを出力する。

備考:
- -

#### Device_Mng
No: 2
戻り値: void | -
発生例外: -

引数:
- object | デバイスインスタンス | oDevice
- IntPtr | ウィンドウハンドル | foreHandl

処理内容:
- ① 処理は行わない。（派生クラスにてオーバーライドする）

備考:
- -

#### Data_Check
No: 3
戻り値: int | 結果コード（固定で -1）
発生例外: -

引数:
- string | 入力データ | sInData
- string | 出力データ（文字列） | sOutData
- int | 出力データ（数値） | lOutData

処理内容:
- ① 固定値 -1 を返す。

備考:
- -

#### PutLog
No: 4
戻り値: void | -
発生例外: -

引数:
- string | ログメッセージ | sMessage

処理内容:
- ① `DeviceLog.ProcessInfo(this, sMessage)` を呼び出してデバイスの実行ログを出力する。

備考:
- -

#### Device_Open
No: 5
戻り値: int | OPOSオープン結果コード（0:成功、-1:失敗）
発生例外: -

引数:
- dynamic | デバイス制御COM | oDevice

処理内容:
- ① デバイス情報リスト `KsDeviceInfo.KsDeviceInfoes` が存在することを確認する。
- ② リリストから `MyDeviceId` と一致するデバイス情報を探す。
- ③ シミュレータモードでない場合は、取得したデバイス名で `oDevice.Open(dev.DeviceName)` を実行する（シミュレータの場合は0を擬似返却）。
- ④ オープン成功後、デバイス情報の `IsOpened` を true に設定する。
- ⑤ 実行結果コードを返す。

備考:
- -

#### Device_Close
No: 6
戻り値: int | OPOSクローズ結果コード（0:成功、-1:失敗）
発生例外: -

引数:
- dynamic | デバイス制御COM | oDevice

処理内容:
- ① デバイス情報リストから `MyDeviceId` と一致するデバイス情報を探す。
- ② デバイスがオープン状態 (`IsOpened` = true) の場合、排他占有中 (`IsClaimed` = true) であれば `Device_Release(oDevice)` を呼び出して占有を解放する。
- ③ デバイス情報の `IsOpened` を false に更新する。
- ④ シミュレータモードでない場合は `oDevice.Close()` を実行して接続を閉じ、実行結果を返す（シミュレータの場合は0）。

備考:
- -

#### Device_Claim
No: 7
戻り値: int | OPOS排他結果コード（0:成功、-1:失敗）
発生例外: -

引数:
- dynamic | デバイス制御COM | oDevice

処理内容:
- ① デバイス情報リストから `MyDeviceId` と一致するデバイス情報を探す。
- ② シミュレータモードでない場合は、`IsClaimDeviceReleaseDevice` フラグに応じて `oDevice.ClaimDevice(0)` または `oDevice.Claim(0)` を実行し排他処理を行う（シミュレータの場合は0）。
- ③ 排た取得に成功した場合 (`iRet` = 0), デバイス情報の `IsClaimed` を true に更新し, 結果を返す。

備考:
- -

#### Device_Release
No: 8
戻り値: int | OPOS解放結果コード（0:成功、-1:失敗）
発生例外: -

引数:
- dynamic | デバイス制御COM | oDevice

処理内容:
- ① デバイス情報リストから `MyDeviceId` と一致するデバイス情報を探す。
- ② デバイスが排他占有中 (`IsClaimed` = true) の場合、`IsClaimed` を false に更新する。
- ③ シミュレータモードでない場合は、`IsClaimDeviceReleaseDevice` フラグに応じて `oDevice.ReleaseDevice()` または `oDevice.Release()` を実行して占有を解放し、結果を返す（シミュレータの場合は0）。

備考:
- -

#### Device_Start
No: 9
戻り値: int | 実行結果コード（0:成功、else:エラー）
発生例外: -

引数:
- dynamic | デバイス制御COM | oDevice
- bool | データイベント有効化フラグ | bEventStart
- bool | 自動無効化フラグ | bAutoDisable

処理内容:
- ① シミュレータモードの場合は 0 を返却する.
- ② `Device_Claim(oDevice)` を呼び出して排他権を取得し、失敗した場合はその結果コードを返す。
- ③ `bAutoDisable` が true の場合、`oDevice.AutoDisable = true` に設定し、`ResultCode` が 0 以外の場合はそれを返す。
- ④ `oDevice.DeviceEnabled = true` を設定してデバイスを有効化し、`ResultCode` が 0 以外の場合はそれを返す。
- ⑤ デバイス種別が `MSR`（磁気カードリーダー）の場合、`oDevice.ClearInput()` を実行し入力をクリアする。
- ⑥ `bEventStart` が true の場合、`oDevice.DataEventEnabled = true` に設定する。失敗した場合は `DeviceEnabled` を false に戻してその結果コードを返す。
- ⑦ 正常終了時は 0 を返す。

備考:
- -

#### Device_End
No: 10
戻り値: int | 実行結果コード（0:成功、else:エラー）
発生例外: -

引数:
- dynamic | デバイス制御COM | oDevice
- bool | データイベント無効化フラグ | bEventStop
- bool | 排他解放フラグ | bRelease

処理内容:
- ① シミュレータモードの場合は 0 を返却する.
- ② `bEventStop` が true の場合、`oDevice.DataEventEnabled = false` に設定する。
- ③ `oDevice.DeviceEnabled` が true の場合、`false` に設定してデバイスを無効化する。
- ④ `bRelease` が true の場合、`Device_Release(oDevice)` を呼び出して占有を解放し、その結果コードを返す。

備考:
- -

#### Device_End_2
No: 11
戻り値: int | 実行結果コード（0:成功、else:エラー）
発生例外: -

引数:
- dynamic | デバイス制御COM | oDevice
- bool | デバイス無効化フラグ | bDeviceStop
- bool | データイベント無効化フラグ | bEventStop
- bool | 排他解放フラグ | bRelease

処理内容:
- ① シミュレータモードの場合は 0 を返却する.
- ② `bEventStop` が true の場合、`oDevice.DataEventEnabled = false` に設定する.
- ③ `bDeviceStop` が true で、かつ `oDevice.DeviceEnabled` が true の場合、`false` に設定してデバイスを無効化する.
- ④ `bRelease` が true の場合、`Device_Release(oDevice)` を呼び出して占有を解放し、その結果コードを返す。

備考:
- 物理的には `Device_End` メソッドのオーバーロード。

#### StartDevice
No: 12
戻り値: void | -
発生例外: -

引数:
- KsDeviceId | デバイスID | devId

処理内容:
- ① クラス内部変数 `MyDeviceId` に指定された `devId` を保存する。
- ② 正常終了のデバッグログを出力する。

備考:
- -

#### StopDevice
No: 13
戻り値: void | -
発生例外: -

引数:
- -

処理内容:
- ① 終了フラグ `EndOrder` を true に設定し、`LoopTimer` を停止および無効化する.
- ② `PMntRun`（デバイス処理中）が true の間、最大 300 回（最大 3 秒間）、10ms スリープおよび `Application.DoEvents()` を呼び出して待機する。
- ③ 管理フォーム `MyForm` の `Close()` および `Dispose()` を実行してフォームを解放する.
- ④ 正常終了のデバッグログを出力する。

備考:
- -

#### DeviceMethod
No: 14
戻り値: int | 結果コード（固定で -1）
発生例外: -

引数:
- KsDeviceMethodID | メソッドID | methodId
- Dictionary\<string, string\> | メソッド引数 | arguments
- Dictionary\<string, string\> | 戻り値ディクショナリ | returns

処理内容:
- ① 固定値 -1 を返す。（派生クラスでオーバーライドされる）

備考:
- -

#### DeviceUse
No: 15
戻り値: int | 結果コード（固定で -1）
発生例外: -

引数:
- Dictionary\<string, string\> | メソッド引数 | arguments
- Dictionary\<string, string\> | 戻り値ディクショナリ | returns

処理内容:
- ① 固定値 -1 を返す。（派生クラスでオーバーライドされる）

備考:
- -

#### DeviceUnUse
No: 16
戻り値: int | 結果コード（固定で -1）
発生例外: -

引数:
- Dictionary\<string, string\> | メソッド引数 | arguments
- Dictionary\<string, string\> | 戻り値ディクショナリ | returns

処理内容:
- ① 固定値 -1 を返す。（派生クラスでオーバーライドされる）

備考:
- -
