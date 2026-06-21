---
title: POS-HOST-11 タブレットPOS ホスト カスタマーディスプレイ制御 SHARP プログラム仕様書
project: tablet_pos_host
type: architecture
status: draft
source:
  - sources/KsPosBoilerplate/TabetPos.Host/src/KsDevice/CustomerDisplay/CustomerDisplayBySharp/CustomerDisplayBySharp.cs
tags:
  - tablet-host
  - opos
---

# POS-HOST-11 タブレットPOS ホスト カスタマーディスプレイ制御 SHARP プログラム仕様書

<!-- spec-evidence
document_id: POS-HOST-11
status: verified
sources:
  - symbol: CustomerDisplayBySharp
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
| 機能名 | カスタマーディスプレイ制御(Sharp) |
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
| クラス名(論理) | カスタマーディスプレイ制御(Sharp) |
| クラス名(物理) | CustomerDisplayBySharp |
| 役割/概要 | OPOSインターフェースを介してSharp製カスタマーディスプレイ（Customer Display）へのテキスト表示およびクリア操作を制御するクラス。 |
| 備考 | - |

## クラス定義 {grid=24}

### {kv:6,18}
| 項目 | 内容 |
| --- | --- |
| アクセス修飾子 | public |
| 継承関係(Base/Interfaces) | DeviceBase |
| 静的/インスタンス | インスタンス |

### コンストラクタ引数 {table:8,8,8}
| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| - | - | - |

### クラスプロパティ {table:5,4,3,3,3,6}
| 型 | 論理名 | 物理名 | getter | setter | 初期値 |
| --- | --- | --- | --- | --- | --- |
| - | - | - | - | - | - |

## メソッド一覧 {grid=40}

### {table:2,5,4,5,8,12,4}
| No | 修飾子 | static | 戻り値 | メソッド名 | 概要 | 備考 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | public | - | override void | StartDevice | デバイスの制御を開始します。 | - |
| 2 | public | - | override void | StopDevice | デバイスの制御を終了します。 | - |
| 3 | public | - | override int | DeviceMethod | デバイスのメソッドを実行します。 | - |
| 4 | public | - | override void | Device_Mng | ラインディスプレイ処理を行います。 | - |
| 5 | private | - | int | LinDsp | ラインディスプレイ処理を行います（文字成形とDirectIO送信）。 | - |

## メソッド定義 {grid=40}

### {methoddef:2,2,6,4,4,4,4,4,6,2,2}

#### StartDevice
No: 1
戻り値: override void | -
発生例外: -

引数:
- KsDeviceId | - | devId

処理内容:
- ① 基底クラスのStartDeviceメソッドを呼び出す。
- ② デバイスIDをMyDeviceIdに設定する。
- ③ CustomerDisplayBySharpFormのインスタンスを生成して_oFrmに設定する。
- ④ ログ出力処理「_oFrm.Name + "のロード終了"」を実行する。
- ⑤ MyFormに_oFrmを設定する。
- ⑥ MyDeviceに_oFrm.AxCustomerDisplay1を設定する。
- ⑦ _oFrm.Deviceに自身（this）を設定する。
- ⑧ _oFrm.DeviceIdにdevIdを設定する。
- ⑨ LoopTimer.SynchronizingObjectに_oFrmを設定する。
- ⑩ _oFrm.Showメソッドを呼び出してフォームを表示する。

備考:
- -

#### StopDevice
No: 2
戻り値: override void | -
発生例外: -

引数:
- -

処理内容:
- ① 終了要求フラグEndOrderをTrueに設定する。
- ② 基底クラスのStopDeviceメソッドを呼び出す。

備考:
- -

#### DeviceMethod
No: 3
戻り値: override int | -
発生例外: -

引数:
- KsDeviceMethodID | - | methodId
- Dictionary<string, string> | - | arguments
- ref Dictionary<string, string> | - | returns

処理内容:
- ① 戻り値resultCodeを-1、resultCodeExtendedを-1で初期化する。
- ② Device_Startメソッドを呼び出して、_oFrm.AxCustomerDisplay1の排他制御と有効化を開始する。
- ③ methodIdがClearDescriptorsと等しい場合、_oFrm.AxCustomerDisplay1.ClearDescriptorsメソッドを実行し、結果をresultCodeおよびresultCodeExtendedに設定する。
- ④ methodIdがClearTextと等しい場合、_oFrm.AxCustomerDisplay1.ClearTextメソッドを実行し、結果をresultCodeおよびresultCodeExtendedに設定する。
- ⑤ methodIdがDisplayTextと等しい場合、引数からDataとAttributeを取得し、_oFrm.AxCustomerDisplay1.DisplayTextメソッドを実行して結果を設定する。
- ⑥ methodIdがDisplayTextAtと等しい場合、引数からRow、Column、Data、Attributeを取得し、_oFrm.AxCustomerDisplay1.DisplayTextAtメソッドを実行して結果を設定する。
- ⑦ methodIdがScrollTextと等しい場合、引数からDirectionとUnitsを取得し、_oFrm.AxCustomerDisplay1.ScrollTextメソッドを実行して結果を設定する。
- ⑧ methodIdがLinDspと等しい場合、引数からCommandとDataを取得し、内部メソッドLinDspを実行して結果を設定する。
- ⑨ methodIdがLinDspTelopと等しい場合、引数からCommand、Speed、Dataを取得し、_oFrm.AxCustomerDisplay1.DirectIOメソッドを実行して結果を設定する。
- ⑩ Device_Endメソッドを呼び出して、_oFrm.AxCustomerDisplay1の排他制御を開放し無効化する。
- ⑪ 引数のreturnsにResultCodeとResultCodeExtendedを追加し、resultCodeを戻り値として返す。

備考:
- -

#### Device_Mng
No: 4
戻り値: override void | -
発生例外: -

引数:
- object | - | oDevice
- IntPtr | - | foreHandl

処理内容:
- ① LoopTimerを停止（Stop）する。
- ② LoopTimerのEnabledをFalseに設定する。

備考:
- -

#### LinDsp
No: 5
戻り値: int | -
発生例外: -

引数:
- ref int | - | kbn
- string | - | data

処理内容:
- ① kbnが0と等しい場合、dataのUnicodeバイト配列を取得し、指定サイズ分の文字成形処理（空き領域は0x20で補完）を行ってString型の変数sに復元する。
- ② _oFrm.AxCustomerDisplay1.DirectIO(0, ref 0, ref s)メソッドを実行した戻り値を返す。
- ③ kbnが0以外の場合、_oFrm.AxCustomerDisplay1.ClearDescriptors()メソッドを実行した戻り値を返す。

備考:
- -
