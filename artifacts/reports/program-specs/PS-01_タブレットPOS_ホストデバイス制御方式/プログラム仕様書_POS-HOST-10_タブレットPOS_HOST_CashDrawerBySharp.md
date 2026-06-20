---
title: Tablet Host CashDrawerBySharp Program Specification
project: tablet_pos_host
type: architecture
status: draft
source:
  - sources/KsPosBoilerplate/TabetPos.Host/src/KsDevice/CashDrawer/CashDrawerBySharp/CashDrawerBySharp.cs
tags:
  - tablet-host
  - opos
---

# プログラム仕様書 CashDrawerBySharp

<!-- spec-evidence
document_id: POS-HOST-10
status: verified
sources:
  - path: sources/KsPosBoilerplate/TabetPos.Host/src/KsDevice/CashDrawer/CashDrawerBySharp/CashDrawerBySharp.cs
    symbol: CashDrawerBySharp
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
| 機能名 | キャッシュドロア制御(Sharp) |
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
| クラス名(論理) | キャッシュドロア制御(Sharp) |
| クラス名(物理) | CashDrawerBySharp |
| 役割/概要 | OPOSインターフェースを介してSharp製キャッシュドロアのオープンおよび状態確認を制御するクラス。 |
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
| 4 | public | - | override void | Device_Mng | ドロア処理を行います。 | - |

## メソッド定義 {grid=40}

### {methoddef:2,2,6,4,4,4,4,4,6,2,2}

#### StartDevice
No: 1
戻り値: override void | -
発生例外: -

引数:
- KsDeviceId | - | devId

処理内容:
- ① 基底クラスの `StartDevice(devId)` を呼び出して、デバイスIDなどの共通初期化を行う。
- ② `MyDeviceId` に引数 `devId` を設定する。
- ③ `CashDrawerBySharpForm` を新規作成して `_oFrm` に設定し、フォームロード完了ログを出力する。
- ④ `MyForm` に `_oFrm`、`MyDevice` に `_oFrm.AxDrawer1` を設定する。
- ⑤ `_oFrm.Device` に自身を、`_oFrm.DeviceId` に `devId` を設定する。
- ⑥ `LoopTimer.SynchronizingObject` に `_oFrm` を設定し、OCXを保持するフォームスレッド上でタイマー処理を同期実行できるようにする。
- ⑦ `_oFrm.Show()` を呼び出して、キャッシュドロア制御用フォームを表示する。

備考:
- -

#### StopDevice
No: 2
戻り値: override void | -
発生例外: -

引数:
- -

処理内容:
- ① 基底クラスの `StopDevice()` を呼び出し、タイマー停止、フォームクローズ、フォーム破棄を実行する。

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
- ① `resultCode` と `resultCodeExtended` を -1 で初期化する。
- ② `methodId` が `OpenDrawer` の場合、`Device_Start(_oFrm.AxDrawer1, false, false)` を呼び出して排他取得およびデバイス有効化を行う。
- ③ `Device_Start` が正常終了した場合、`_oFrm.AxDrawer1.OpenDrawer()` を実行し、戻り値を `resultCode` に設定する。
- ④ `_oFrm.AxDrawer1.ResultCodeExtended` を `resultCodeExtended` に設定する。
- ⑤ `Device_End(_oFrm.AxDrawer1, false, true)` を呼び出して、デバイス無効化および排他解放を行う。
- ⑥ `returns` に `ResultCode` と `ResultCodeExtended` を追加し、`resultCode` を返す。

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
- ① `LoopTimer.Stop()` を呼び出してタイマー処理を停止する。
- ② `LoopTimer.Enabled` を `false` に設定する。

備考:
- -
