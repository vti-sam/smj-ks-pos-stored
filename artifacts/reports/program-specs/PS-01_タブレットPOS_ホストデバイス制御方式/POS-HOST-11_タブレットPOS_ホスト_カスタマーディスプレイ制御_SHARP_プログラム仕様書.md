---
title: POS-HOST-11 タブレットPOS ホスト カスタマーディスプレイ制御 SHARP プログラム仕様書
project: tablet_pos_host
type: program-spec
status: draft
source:
  - sources/KsPosBoilerplate/TabetPos.Host/src/KsDevice/CustomerDisplay/CustomerDisplayBySharp/CustomerDisplayBySharp.cs
tags:
  - tablet-host
  - customer-display
  - sharp
  - opos
  - program-spec
---

# POS-HOST-11 タブレットPOS ホスト カスタマーディスプレイ制御 SHARP プログラム仕様書

<!-- spec-evidence
document_id: POS-HOST-11
status: verified
sources:
  - path: sources/KsPosBoilerplate/TabetPos.Host/src/KsDevice/CustomerDisplay/CustomerDisplayBySharp/CustomerDisplayBySharp.cs
    symbol: CustomerDisplayBySharp
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
| 文書ID | POS-HOST-11 |
| プロジェクト名 | タブレットPOS |
| 機能名 | カスタマーディスプレイ制御 SHARP |
| 物理クラス名 | CustomerDisplayBySharp |
| 名前空間 | KsOutProcess.KsDeviceServer |
| アクセス修飾子 | public |
| 継承/実装 | DeviceBase |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| CodeGraph project | sources/KsPosBoilerplate/TabetPos.Host |
| 主要ソース | sources/KsPosBoilerplate/TabetPos.Host/src/KsDevice/CustomerDisplay/CustomerDisplayBySharp/CustomerDisplayBySharp.cs |
| 検証状態 | CodeGraph sync/status と source read により確認済み |
| 対象外 | Excel workbook、Designer 自動生成部分、source code の変更 |

## クラス概要

SHARP CustomerDisplay OCX を保持し、表示クリア、テキスト表示、スクロール、DirectIO 表示を実行するデバイス制御クラス。

### 主な責務

- 命令ごとに Device_Start/Device_End で排他制御する。
- ClearDescriptors/ClearText/DisplayText/DisplayTextAt/ScrollText/LinDsp/LinDspTelop を処理する。
- LinDsp は DirectIO 用データを構築して送信する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 | Evidence |
| --- | --- | --- | --- | --- | --- |
| フィールド | private | CustomerDisplayBySharpForm | _oFrm | デバイス制御用フォーム。 | src/KsDevice/CustomerDisplay/CustomerDisplayBySharp/CustomerDisplayBySharp.cs:20 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 | Evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | public | void | StartDevice | 対象デバイスIDを保持し、OCXを配置したフォームとタイマー同期先を初期化する。 | src/KsDevice/CustomerDisplay/CustomerDisplayBySharp/CustomerDisplayBySharp.cs:25-38 |
| 2 | public | void | StopDevice | デバイス制御を終了し、タイマー停止とフォーム解放を実行する。 | src/KsDevice/CustomerDisplay/CustomerDisplayBySharp/CustomerDisplayBySharp.cs:43-47 |
| 3 | public | int | DeviceMethod | 表示クリア、文字表示、スクロール、DirectIO 表示を methodId と引数に応じて実行する。 | src/KsDevice/CustomerDisplay/CustomerDisplayBySharp/CustomerDisplayBySharp.cs:56-157 |
| 4 | public | void | Device_Mng | カスタマーディスプレイは常時監視を行わないため、周期 timer を停止する。 | src/KsDevice/CustomerDisplay/CustomerDisplayBySharp/CustomerDisplayBySharp.cs:160-165 |
| 5 | private | int | LinDsp | 区分0では表示文字列を DirectIO 用データへ変換し、それ以外では表示をクリアする。 | src/KsDevice/CustomerDisplay/CustomerDisplayBySharp/CustomerDisplayBySharp.cs:167-190 |

## メソッド詳細

### 1. StartDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public override void StartDevice(KsDeviceId devId)` |
| 可視性 | public |
| 戻り値 | void |
| Evidence | src/KsDevice/CustomerDisplay/CustomerDisplayBySharp/CustomerDisplayBySharp.cs:25-38 |

処理内容:

- ① 基底 StartDevice を呼び、対象 DeviceId を保持する。
- ② CustomerDisplayBySharpForm を生成し、MyForm と MyDevice に CustomerDisplay OCX を設定する。
- ③ フォーム側へ Device と DeviceId を渡す。
- ④ timer の SynchronizingObject をフォームへ設定し、フォームを表示する。

備考: -

### 2. StopDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public override void StopDevice()` |
| 可視性 | public |
| 戻り値 | void |
| Evidence | src/KsDevice/CustomerDisplay/CustomerDisplayBySharp/CustomerDisplayBySharp.cs:43-47 |

処理内容:

- ① EndOrder を true に設定する。
- ② 基底 StopDevice を呼び、timer 停止、処理中待機、フォーム解放を実行する。

備考: -

### 3. DeviceMethod

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public override int DeviceMethod(KsDeviceMethodID methodId, Dictionary<string, string> arguments, ref Dictionary<string, string> returns)` |
| 可視性 | public |
| 戻り値 | int |
| Evidence | src/KsDevice/CustomerDisplay/CustomerDisplayBySharp/CustomerDisplayBySharp.cs:56-157 |

処理内容:

- ① 命令ごとに Device_Start を実行し、ディスプレイを有効化する。
- ② methodId に応じて ClearDescriptors、ClearText、DisplayText、DisplayTextAt、ScrollText、LinDsp、LinDspTelop を実行する。
- ③ 必要な引数が不足する場合は初期値 ResultCode=-1 のまま返す。
- ④ Device_End で排他を解放し、ResultCode/ResultCodeExtended を returns に設定する。

備考: -

### 4. Device_Mng

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public override void Device_Mng(object oDevice, IntPtr foreHandl)` |
| 可視性 | public |
| 戻り値 | void |
| Evidence | src/KsDevice/CustomerDisplay/CustomerDisplayBySharp/CustomerDisplayBySharp.cs:160-165 |

処理内容:

- ① 周期 timer を停止する。
- ② timer enabled を false にする。
- ③ カスタマーディスプレイはイベント監視を継続しないため、追加処理は行わない。

備考: -

### 5. LinDsp

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int LinDsp(ref int kbn, string data)` |
| 可視性 | private |
| 戻り値 | int |
| Evidence | src/KsDevice/CustomerDisplay/CustomerDisplayBySharp/CustomerDisplayBySharp.cs:167-190 |

処理内容:

- ① kbn が 0 の場合は文字列を Unicode byte 配列から DirectIO 用文字列へ組み立てる。
- ② command=0、pData=0 で DirectIO を実行する。
- ③ kbn が 0 以外の場合は ClearDescriptors を呼んで表示をクリアする。

備考: -

## 処理フロー/注意事項

- StartDevice が CustomerDisplayBySharpForm を生成する。
- DeviceMethod が methodId と必要引数を確認して OCX 操作を実行する。
- Device_Mng はタイマーを停止する。
- LinDsp が DirectIO 用文字列または ClearDescriptors を実行する。

### 注意事項

- 引数不足時は該当操作を実行せず、初期値 resultCode=-1 を返す。
