---
title: POS-HOST-07 タブレットPOS ホスト デバイスベース プログラム仕様書
project: tablet_pos_host
type: program-spec
status: draft
source:
  - sources/KsPosBoilerplate/TabetPos.Host/src/KsDevice/DeviceBase/DeviceBase.cs
tags:
  - tablet-host
  - device-base
  - opos
  - program-spec
---

# POS-HOST-07 タブレットPOS ホスト デバイスベース プログラム仕様書

<!-- spec-evidence
document_id: POS-HOST-07
status: verified
sources:
  - path: sources/KsPosBoilerplate/TabetPos.Host/src/KsDevice/DeviceBase/DeviceBase.cs
    symbol: DeviceBase
notes: CodeGraph local index and source code checked on 2026/06/21. Excel export compatibility is intentionally not preserved in this Pure Markdown rewrite.
-->

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.2 | 2026/06/21 | VTI-SAM | CodeGraph とソースコードに基づき、Pure Markdown 形式へ再構成し、内容を更新 |
| 0.0.1 | 2026/06/19 | VTI-SAM | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | POS-HOST-07 |
| プロジェクト名 | タブレットPOS |
| 機能名 | デバイスベース |
| 物理クラス名 | DeviceBase |
| 名前空間 | KsOutProcess.KsDeviceServer |
| アクセス修飾子 | public |
| 継承/実装 | IFDevice |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| CodeGraph project | sources/KsPosBoilerplate/TabetPos.Host |
| 主要ソース | sources/KsPosBoilerplate/TabetPos.Host/src/KsDevice/DeviceBase/DeviceBase.cs |
| 検証状態 | CodeGraph sync/status と source read により確認済み |
| 対象外 | Excel workbook、Designer 自動生成部分、source code の変更 |

## クラス概要

OPOS/OCX デバイス制御クラスの共通基底であり、タイマー、Open/Close、Claim/Release、読込開始/終了、keep-alive を提供する。

### 主な責務

- 100ms timer で Device_Mng を呼び出す。
- OPOS の Open/Close/Claim/Release を共通化する。
- 派生クラスが DeviceMethod/DeviceUse/DeviceUnUse を実装する前提の既定値を持つ。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 | Evidence |
| --- | --- | --- | --- | --- | --- |
| フィールド | protected | bool | EndOrder | bool 型の内部状態。 | src/KsDevice/DeviceBase/DeviceBase.cs:34 |
| フィールド | protected | Timer | LoopTimer | デバイス周期処理用タイマー。 | src/KsDevice/DeviceBase/DeviceBase.cs:37 |
| フィールド | protected | Form | MyForm | OCX を保持するフォーム。 | src/KsDevice/DeviceBase/DeviceBase.cs:40 |
| フィールド | protected | dynamic | MyDevice | OPOS/OCX デバイスインスタンス。 | src/KsDevice/DeviceBase/DeviceBase.cs:43 |
| フィールド | protected | KsDeviceId | MyDeviceId | 対象デバイスID。 | src/KsDevice/DeviceBase/DeviceBase.cs:46 |
| フィールド | protected | bool | IsSimulator | bool 型の内部状態。 | src/KsDevice/DeviceBase/DeviceBase.cs:49 |
| フィールド | protected | bool | IsClaimDeviceReleaseDevice | bool 型の内部状態。 | src/KsDevice/DeviceBase/DeviceBase.cs:53 |
| フィールド | protected | DateTime | _keepAliveDateTime | DateTime 型の内部状態。 | src/KsDevice/DeviceBase/DeviceBase.cs:56 |
| フィールド | protected | bool | PMntRun | bool 型の内部状態。 | src/KsDevice/DeviceBase/DeviceBase.cs:59 |
| プロパティ | public | - | KsDeviceId | - 型の内部状態。 | src/KsDevice/DeviceBase/DeviceBase.cs:406 |
| プロパティ | public | - | KeepAliveDateTime | - 型の内部状態。 | src/KsDevice/DeviceBase/DeviceBase.cs:421 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 | Evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | public | int | GetForegroundWindow | Windows の foreground window handle を取得する。 | src/KsDevice/DeviceBase/DeviceBase.cs:30-31 |
| 2 | protected | - | DeviceBase | 100ms timer を設定し、派生デバイス共通の周期処理基盤を初期化する。 | src/KsDevice/DeviceBase/DeviceBase.cs:62-69 |
| 3 | public | void | timer_tick | keep-alive を更新し、timer を止めて Device_Mng を実行した後、終了指示がなければ timer を再開する。 | src/KsDevice/DeviceBase/DeviceBase.cs:72-107 |
| 4 | public | void | Device_Mng | 基底クラスでは周期監視処理を行わず、派生クラスで必要な処理を実装する。 | src/KsDevice/DeviceBase/DeviceBase.cs:111-114 |
| 5 | public | int | Data_Check | 基底クラスでは読込データ検証を実装せず、既定値 -1 を返す。 | src/KsDevice/DeviceBase/DeviceBase.cs:121-124 |
| 6 | public | void | PutLog | DeviceLog.ProcessInfo へデバイスログメッセージを出力する。 | src/KsDevice/DeviceBase/DeviceBase.cs:128-131 |
| 7 | public | int | Device_Open | OPOS デバイスを Open し、管理状態を opened に更新する。 | src/KsDevice/DeviceBase/DeviceBase.cs:136-162 |
| 8 | public | int | Device_Close | 必要に応じて Release したうえで OPOS デバイスを Close する。 | src/KsDevice/DeviceBase/DeviceBase.cs:167-194 |
| 9 | public | int | Device_Claim | OPOS デバイスの排他取得を実行する。 | src/KsDevice/DeviceBase/DeviceBase.cs:199-226 |
| 10 | public | int | Device_Release | OPOS デバイスの排他を解放する。 | src/KsDevice/DeviceBase/DeviceBase.cs:231-260 |
| 11 | public | int | Device_Start | Claim、DeviceEnabled、DataEventEnabled など読込開始状態を設定する。 | src/KsDevice/DeviceBase/DeviceBase.cs:267-328 |
| 12 | public | int | Device_End | DataEventEnabled、DeviceEnabled、Release など読込終了状態を設定する。 | src/KsDevice/DeviceBase/DeviceBase.cs:335-363 |
| 13 | public | int | Device_End | DataEventEnabled、DeviceEnabled、Release など読込終了状態を設定する。 | src/KsDevice/DeviceBase/DeviceBase.cs:371-401 |
| 14 | public | void | StartDevice | 対象デバイスIDを保持し、OCXを配置したフォームとタイマー同期先を初期化する。 | src/KsDevice/DeviceBase/DeviceBase.cs:436-441 |
| 15 | public | void | StopDevice | 終了指示を立て、実行中の Device_Mng を最大約3秒待ち、フォームを close/dispose する。 | src/KsDevice/DeviceBase/DeviceBase.cs:446-472 |
| 16 | public | int | DeviceMethod | 基底クラスではデバイス固有メソッドを実行せず、既定値 -1 を返す。 | src/KsDevice/DeviceBase/DeviceBase.cs:481-484 |
| 17 | public | int | DeviceUse | 基底クラスでは使用開始処理を実装せず、既定値 -1 を返す。 | src/KsDevice/DeviceBase/DeviceBase.cs:492-495 |
| 18 | public | int | DeviceUnUse | 基底クラスでは使用終了処理を実装せず、既定値 -1 を返す。 | src/KsDevice/DeviceBase/DeviceBase.cs:503-506 |

## メソッド詳細

### 1. GetForegroundWindow

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public static extern int GetForegroundWindow();` |
| 可視性 | public |
| 戻り値 | int |
| Evidence | src/KsDevice/DeviceBase/DeviceBase.cs:30-31 |

処理内容:

- ① 対象 method の実行条件を確認する。
- ② Windows の foreground window handle を取得する。
- ③ 必要な戻り値または内部状態を更新する。

備考: -

### 2. DeviceBase

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `protected DeviceBase()` |
| 可視性 | protected |
| 戻り値 | - |
| Evidence | src/KsDevice/DeviceBase/DeviceBase.cs:62-69 |

処理内容:

- ① 対象 method の実行条件を確認する。
- ② 100ms timer を設定し、派生デバイス共通の周期処理基盤を初期化する。
- ③ 必要な戻り値または内部状態を更新する。

備考: -

### 3. timer_tick

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public virtual void timer_tick(object sender, EventArgs e)` |
| 可視性 | public |
| 戻り値 | void |
| Evidence | src/KsDevice/DeviceBase/DeviceBase.cs:72-107 |

処理内容:

- ① keep-alive 時刻を現在時刻へ更新し、timer を一時停止する。
- ② foreground window handle を取得し、MyDevice がある場合は PMntRun を true にして Device_Mng を呼ぶ。
- ③ Device_Mng 終了後に PMntRun を false に戻し、DoEvents を実行する。
- ④ EndOrder が true なら timer を再開せず終了する。
- ⑤ 例外時はデバイスクラス内 timer 異常としてログ出力する。

備考: -

### 4. Device_Mng

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public virtual void Device_Mng(object oDevice, IntPtr foreHandl)` |
| 可視性 | public |
| 戻り値 | void |
| Evidence | src/KsDevice/DeviceBase/DeviceBase.cs:111-114 |

処理内容:

- ① 基底クラスでは処理を行わない。
- ② 周期監視が必要な派生クラスで override する。

備考: -

### 5. Data_Check

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public virtual int Data_Check(string sInData, ref string sOutData, int lOutData)` |
| 可視性 | public |
| 戻り値 | int |
| Evidence | src/KsDevice/DeviceBase/DeviceBase.cs:121-124 |

処理内容:

- ① 基底クラスでは入力データを検証しない。
- ② 既定値として -1 を返す。

備考: -

### 6. PutLog

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public virtual void PutLog(string sMessage)` |
| 可視性 | public |
| 戻り値 | void |
| Evidence | src/KsDevice/DeviceBase/DeviceBase.cs:128-131 |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 7. Device_Open

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public virtual int Device_Open(dynamic oDevice)` |
| 可視性 | public |
| 戻り値 | int |
| Evidence | src/KsDevice/DeviceBase/DeviceBase.cs:136-162 |

処理内容:

- ① KsDeviceInfo から MyDeviceId と一致する device info を探す。
- ② simulator でなければ device name を指定して OPOS Open を呼ぶ。
- ③ 対象 device info の IsOpened を true に更新し、結果コードを返す。

備考: -

### 8. Device_Close

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public virtual int Device_Close(dynamic oDevice)` |
| 可視性 | public |
| 戻り値 | int |
| Evidence | src/KsDevice/DeviceBase/DeviceBase.cs:167-194 |

処理内容:

- ① 対象 device が opened か確認する。
- ② claimed 状態なら Device_Release を先に実行する。
- ③ IsOpened を false にし、simulator でなければ OPOS Close を呼ぶ。

備考: -

### 9. Device_Claim

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public virtual int Device_Claim(dynamic oDevice)` |
| 可視性 | public |
| 戻り値 | int |
| Evidence | src/KsDevice/DeviceBase/DeviceBase.cs:199-226 |

処理内容:

- ① 対象 device info を探し、simulator でなければ ClaimDevice または Claim を呼ぶ。
- ② 結果が 0 の場合は IsClaimed を true にする。
- ③ 排他取得結果コードを返す。

備考: -

### 10. Device_Release

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public virtual int Device_Release(dynamic oDevice)` |
| 可視性 | public |
| 戻り値 | int |
| Evidence | src/KsDevice/DeviceBase/DeviceBase.cs:231-260 |

処理内容:

- ① 対象 device が claimed 状態の場合だけ release を実行する。
- ② IsClaimed を false に更新する。
- ③ simulator でなければ ReleaseDevice または Release を呼び、結果コードを返す。

備考: -

### 11. Device_Start

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public virtual int Device_Start(dynamic oDevice, bool bEventStart, bool bAutoDisable)` |
| 可視性 | public |
| 戻り値 | int |
| Evidence | src/KsDevice/DeviceBase/DeviceBase.cs:267-328 |

処理内容:

- ① simulator の場合は 0 を返す。
- ② Device_Claim を実行し、失敗時はログ出力してその結果を返す。
- ③ 指定があれば AutoDisable を true に設定する。
- ④ DeviceEnabled を true にし、MSR の場合は ClearInput を実行する。
- ⑤ 指定があれば DataEventEnabled を true にし、失敗時は DeviceEnabled を false に戻す。

備考: -

### 12. Device_End

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public virtual int Device_End(dynamic oDevice, bool bEventStop, bool bRelease)` |
| 可視性 | public |
| 戻り値 | int |
| Evidence | src/KsDevice/DeviceBase/DeviceBase.cs:335-363 |

処理内容:

- ① simulator の場合は 0 を返す。
- ② 指定があれば DataEventEnabled を false にする。
- ③ 指定または overload 条件に従って DeviceEnabled を false にする。
- ④ release 指定がある場合は Device_Release を実行し、結果コードを返す。

備考: -

### 13. Device_End

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public virtual int Device_End(dynamic oDevice, bool bDeviceStop, bool bEventStop, bool bRelease)` |
| 可視性 | public |
| 戻り値 | int |
| Evidence | src/KsDevice/DeviceBase/DeviceBase.cs:371-401 |

処理内容:

- ① simulator の場合は 0 を返す。
- ② 指定があれば DataEventEnabled を false にする。
- ③ 指定または overload 条件に従って DeviceEnabled を false にする。
- ④ release 指定がある場合は Device_Release を実行し、結果コードを返す。

備考: -

### 14. StartDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public virtual void StartDevice(KsDeviceId devId)` |
| 可視性 | public |
| 戻り値 | void |
| Evidence | src/KsDevice/DeviceBase/DeviceBase.cs:436-441 |

処理内容:

- ① 起動対象と内部状態を初期化する。
- ② 必要な transport、フォーム、デバイスインスタンス、または設定オブジェクトを生成する。
- ③ 起動結果を内部リストまたはログに反映する。

備考: -

### 15. StopDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public virtual void StopDevice()` |
| 可視性 | public |
| 戻り値 | void |
| Evidence | src/KsDevice/DeviceBase/DeviceBase.cs:446-472 |

処理内容:

- ① EndOrder を true にし、timer を停止する。
- ② Device_Mng 実行中の場合は最大約3秒待つ。
- ③ MyForm を close/dispose する。
- ④ デバイス制御終了ログを出力する。

備考: -

### 16. DeviceMethod

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public virtual int DeviceMethod(KsDeviceMethodID methodId, Dictionary<string, string> arguments, ref Dictionary<string, string> returns)` |
| 可視性 | public |
| 戻り値 | int |
| Evidence | src/KsDevice/DeviceBase/DeviceBase.cs:481-484 |

処理内容:

- ① メソッドIDと引数を確認する。
- ② 対象メソッドIDに対応する OPOS または内部処理を呼び出す。
- ③ ResultCode と ResultCodeExtended などの戻り値を payload に設定して返却する。

備考: -

### 17. DeviceUse

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public virtual int DeviceUse(Dictionary<string, string> arguments, ref Dictionary<string, string> returns)` |
| 可視性 | public |
| 戻り値 | int |
| Evidence | src/KsDevice/DeviceBase/DeviceBase.cs:492-495 |

処理内容:

- ① 基底クラスではデバイス固有処理を実行しない。
- ② 派生クラスで override する前提として -1 を返す。

備考: -

### 18. DeviceUnUse

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public virtual int DeviceUnUse(Dictionary<string, string> arguments, ref Dictionary<string, string> returns)` |
| 可視性 | public |
| 戻り値 | int |
| Evidence | src/KsDevice/DeviceBase/DeviceBase.cs:503-506 |

処理内容:

- ① 基底クラスではデバイス固有処理を実行しない。
- ② 派生クラスで override する前提として -1 を返す。

備考: -

## 処理フロー/注意事項

- constructor が timer を設定する。
- timer_tick が keep-alive 更新と Device_Mng 呼び出しを実行する。
- Device_Start/Device_End が OPOS 読込状態を制御する。
- StopDevice が実行中処理待機後にフォームを閉じる。

### 注意事項

- 基底の DeviceMethod/DeviceUse/DeviceUnUse は -1 を返すため、実デバイスでは override が必要。
