---
title: POS-HOST-10 タブレットPOS ホスト キャッシュドロア制御 SHARP プログラム仕様書
project: tablet_pos_host
type: program-spec
status: draft
source:
  - sources/KsPosBoilerplate/TabetPos.Host/src/KsDevice/CashDrawer/CashDrawerBySharp/CashDrawerBySharp.cs
tags:
  - tablet-host
  - cash-drawer
  - sharp
  - opos
  - program-spec
---

# POS-HOST-10 タブレットPOS ホスト キャッシュドロア制御 SHARP プログラム仕様書

<!-- spec-evidence
document_id: POS-HOST-10
status: verified
sources:
  - path: sources/KsPosBoilerplate/TabetPos.Host/src/KsDevice/CashDrawer/CashDrawerBySharp/CashDrawerBySharp.cs
    symbol: CashDrawerBySharp
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
| 文書ID | POS-HOST-10 |
| プロジェクト名 | タブレットPOS |
| 機能名 | キャッシュドロア制御 SHARP |
| 物理クラス名 | CashDrawerBySharp |
| 名前空間 | KsOutProcess.KsDeviceServer |
| アクセス修飾子 | public |
| 継承/実装 | DeviceBase |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| CodeGraph project | sources/KsPosBoilerplate/TabetPos.Host |
| 主要ソース | sources/KsPosBoilerplate/TabetPos.Host/src/KsDevice/CashDrawer/CashDrawerBySharp/CashDrawerBySharp.cs |
| 検証状態 | CodeGraph sync/status と source read により確認済み |
| 対象外 | Excel workbook、Designer 自動生成部分、source code の変更 |

## クラス概要

SHARP CashDrawer OCX を保持し、OpenDrawer 操作を実行するデバイス制御クラス。

### 主な責務

- StartDevice がフォームと Drawer OCX を構成する。
- DeviceMethod は OpenDrawer のみを処理対象とする。
- 操作時に Device_Start/Device_End で排他と有効状態を制御する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 | Evidence |
| --- | --- | --- | --- | --- | --- |
| フィールド | private | CashDrawerBySharpForm | _oFrm | デバイス制御用フォーム。 | src/KsDevice/CashDrawer/CashDrawerBySharp/CashDrawerBySharp.cs:14 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 | Evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | public | void | StartDevice | 対象デバイスIDを保持し、OCXを配置したフォームとタイマー同期先を初期化する。 | src/KsDevice/CashDrawer/CashDrawerBySharp/CashDrawerBySharp.cs:19-32 |
| 2 | public | void | StopDevice | デバイス制御を終了し、タイマー停止とフォーム解放を実行する。 | src/KsDevice/CashDrawer/CashDrawerBySharp/CashDrawerBySharp.cs:37-40 |
| 3 | public | int | DeviceMethod | OpenDrawer だけを処理し、実行結果を ResultCode/ResultCodeExtended として返す。 | src/KsDevice/CashDrawer/CashDrawerBySharp/CashDrawerBySharp.cs:49-67 |
| 4 | public | void | Device_Mng | ドロアは常時監視を行わないため、周期 timer を停止する。 | src/KsDevice/CashDrawer/CashDrawerBySharp/CashDrawerBySharp.cs:70-75 |

## メソッド詳細

### 1. StartDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public override void StartDevice(KsDeviceId devId)` |
| 可視性 | public |
| 戻り値 | void |
| Evidence | src/KsDevice/CashDrawer/CashDrawerBySharp/CashDrawerBySharp.cs:19-32 |

処理内容:

- ① 基底 StartDevice を呼び、対象 DeviceId を保持する。
- ② CashDrawerBySharpForm を生成し、MyForm と MyDevice にフォーム/Drawer OCX を設定する。
- ③ フォーム側へ Device と DeviceId を渡す。
- ④ timer の SynchronizingObject をフォームへ設定し、フォームを表示する。

備考: -

### 2. StopDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public override void StopDevice()` |
| 可視性 | public |
| 戻り値 | void |
| Evidence | src/KsDevice/CashDrawer/CashDrawerBySharp/CashDrawerBySharp.cs:37-40 |

処理内容:

- ① 基底 StopDevice を呼び、timer 停止、処理中待機、フォーム解放を実行する。
- ② ドロア固有の追加終了処理はこの method では行わない。

備考: -

### 3. DeviceMethod

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public override int DeviceMethod(KsDeviceMethodID methodId, Dictionary<string, string> arguments, ref Dictionary<string, string> returns)` |
| 可視性 | public |
| 戻り値 | int |
| Evidence | src/KsDevice/CashDrawer/CashDrawerBySharp/CashDrawerBySharp.cs:49-67 |

処理内容:

- ① resultCode/resultCodeExtended を -1 で初期化する。
- ② methodId が OpenDrawer の場合だけ Device_Start を実行する。
- ③ Device_Start 成功時に OCX OpenDrawer を呼び、ResultCodeExtended を取得する。
- ④ Device_End で排他を解放し、returns に ResultCode/ResultCodeExtended を設定する。

備考: -

### 4. Device_Mng

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public override void Device_Mng(object oDevice, IntPtr foreHandl)` |
| 可視性 | public |
| 戻り値 | void |
| Evidence | src/KsDevice/CashDrawer/CashDrawerBySharp/CashDrawerBySharp.cs:70-75 |

処理内容:

- ① 周期 timer を停止する。
- ② timer enabled を false にする。
- ③ ドロアはイベント監視を継続しないため、追加処理は行わない。

備考: -

## 処理フロー/注意事項

- StartDevice が CashDrawerBySharpForm を生成する。
- DeviceMethod が OpenDrawer を検出して OCX OpenDrawer を呼び出す。
- Device_Mng はタイマーを停止して常時監視処理を行わない。

### 注意事項

- 未対応 methodId の場合、既定の resultCode=-1 を返却する。
