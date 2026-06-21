---
title: POS-HOST-09 タブレットPOS ホスト 自動釣銭機UIスレッドフォーム RT-300 プログラム仕様書
project: tablet_pos_host
type: program-spec
status: draft
source:
  - sources/KsPosBoilerplate/TabetPos.Host/src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs
tags:
  - tablet-host
  - cash-changer
  - rt-300
  - form
  - program-spec
---

# POS-HOST-09 タブレットPOS ホスト 自動釣銭機UIスレッドフォーム RT-300 プログラム仕様書

<!-- spec-evidence
document_id: POS-HOST-09
status: verified
sources:
  - path: sources/KsPosBoilerplate/TabetPos.Host/src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs
    symbol: CashChangerByRt300Form
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
| 文書ID | POS-HOST-09 |
| プロジェクト名 | タブレットPOS |
| 機能名 | 自動釣銭機UIスレッドフォーム RT-300 |
| 物理クラス名 | CashChangerByRt300Form |
| 名前空間 | KsOutProcess.KsDeviceServer |
| アクセス修飾子 | public partial |
| 継承/実装 | Form |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| CodeGraph project | sources/KsPosBoilerplate/TabetPos.Host |
| 主要ソース | sources/KsPosBoilerplate/TabetPos.Host/src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs |
| 検証状態 | CodeGraph sync/status と source read により確認済み |
| 対象外 | Excel workbook、Designer 自動生成部分、source code の変更 |

## クラス概要

RT-300 CashChanger OCX を UI スレッド上で保持し、イベント、タイマー、ファイル連携を処理するフォームクラス。

### 主な責務

- OPOSCashChanger OCX のイベントを受け取る。
- MemoryMappedFile と request/answer file による連携を扱う。
- フォームタイマーで釣銭機状態とファイル要求を処理する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 | Evidence |
| --- | --- | --- | --- | --- | --- |
| フィールド | public | CashChangerBase | Device | フォームから参照するデバイス制御インスタンス。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:33 |
| フィールド | public | KsDeviceId | DeviceId | フォームに紐づくデバイスID。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:35 |
| フィールド | public | int | DiStatus | int 型の内部状態。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:38 |
| フィールド | public | int | DiEvent | int 型の内部状態。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:40 |
| フィールド | public | int | EnqStatus | int 型の内部状態。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:42 |
| フィールド | private | int | _loadflg | int 型の内部状態。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:45 |
| フィールド | private | string | NameTurireqMem | string 型の内部状態。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:48 |
| フィールド | private | string | NameTuriansMem | string 型の内部状態。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:49 |
| フィールド | private | KsMemoryMappedFile | _mmfTuriReq | KsMemoryMappedFile 型の内部状態。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:52 |
| フィールド | private | KsMemoryMappedFile | _mmfTuriAns | KsMemoryMappedFile 型の内部状態。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:53 |
| フィールド | private | int | ChkTimeInterval | int 型の内部状態。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:55 |
| フィールド | private | int | FileChkTime | int 型の内部状態。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:56 |
| フィールド | private | Dictionary<string, string> | _mFileStock | Dictionary<string, string> 型の内部状態。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:57 |
| フィールド | private | string | NameReqfile | string 型の内部状態。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:60 |
| フィールド | private | string | NameAnsfile | string 型の内部状態。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:61 |
| フィールド | private | string | NameReqfileOk | string 型の内部状態。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:62 |
| フィールド | private | string | NameAnsfileOk | string 型の内部状態。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:63 |
| フィールド | private | string | NameAnsfileNg | string 型の内部状態。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:65 |
| フィールド | private | int | _piFileUse | int 型の内部状態。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:68 |
| フィールド | private | string | _psNameReqFile | string 型の内部状態。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:70 |
| フィールド | private | string | _psNameAnsFile | string 型の内部状態。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:71 |
| フィールド | private | string | _psNameReqFileOk | string 型の内部状態。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:72 |
| フィールド | private | string | _psNameAnsFileOk | string 型の内部状態。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:73 |
| フィールド | private | string | _psNameAnsFileNg | string 型の内部状態。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:74 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 | Evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | public | - | CashChangerByRt300Form | インスタンスを初期化する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:76-82 |
| 2 | private | void | DevForm_Load | 例外 handler、非表示配置、共有メモリ、要求/応答ファイルパス、timer 初期値を設定する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:90-131 |
| 3 | private | void | DevForm_Shown | KsDeviceInfo 登録、OPOS Open/Claim/DeviceEnabled、画面表示判定、監視 timer 起動を行う。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:132-202 |
| 4 | private | void | DevForm_FormClosing | 共有メモリを破棄し、対象 OPOS CashChanger が opened の場合は close する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:204-240 |
| 5 | private | void | OnThreadException | COM 呼び出し競合の既知 ExternalException は無視し、それ以外は再throwする。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:242-252 |
| 6 | private | void | OnUnhandledThreadException | 未処理例外でも同じ COM 競合だけを無視し、それ以外は再throwする。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:254-264 |
| 7 | private | void | AxOPOSCashChanger1_DataEvent | DataEvent 発生回数を加算し、イベント status を釣銭機ログへ出力する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:266-277 |
| 8 | private | void | AxOPOSCashChanger1_DirectIOEvent | DirectIOEvent を記録し、非同期中は重複を避けて event list に保持する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:279-319 |
| 9 | private | void | AxOPOSCashChanger1_StatusUpdateEvent | StatusUpdateEvent を記録し、非同期完了・ジャムなどの状態を内部結果へ反映する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:321-430 |
| 10 | public | bool | IsArrayEx | 非同期イベント配列が利用可能な状態か確認する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:432-452 |
| 11 | public | void | OposCashMng | OPOS CashChanger の管理処理と状態確認を実行する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:457-664 |
| 12 | private | void | Timer1_Tick | 釣銭機が非同期実行中でない場合だけ管理処理を呼び、監視 timer を再開する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:666-687 |
| 13 | private | int | OPOSCash_DepositAmount | BeginDeposit 後の入金額と金種別枚数を取得する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:697-791 |
| 14 | private | int | OPOSCash_DirectIO | 指定 command、pData、pString で CashChanger DirectIO を同期実行する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:802-869 |
| 15 | private | void | PDirectIo | OPOS CashChanger の DirectIO を呼び出す。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:873-878 |
| 16 | private | int | OPOSCash_Seisa | 精査 DirectIO を実行し、収納庫・回収ボックス別の収納データを返却する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:886-971 |
| 17 | private | string | OposCashResltMsg | ResultCode/ResultCodeExtended とデバイス状態から表示用エラーメッセージを決定する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:979-1151 |
| 18 | private | void | PReleaseDevice | CashChanger の排他を解放する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1156-1158 |
| 19 | private | string | PGetDepositCounts | DepositCounts を取得し、ログ出力する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1163-1172 |
| 20 | private | int | PGetDepositAmount | DepositAmount を取得し、ログ出力する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1177-1186 |
| 21 | private | void | PDeviceEnabled2 | 異常時の復旧用に DeviceEnabled を再設定する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1191-1203 |
| 22 | private | void | PFreezeEvents | FreezeEvents プロパティを設定する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1208-1213 |
| 23 | private | void | PDataEventEnabled | DataEventEnabled プロパティを設定する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1218-1225 |
| 24 | private | void | PDeviceEnabled | DeviceEnabled プロパティを設定し、結果コードを保持する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1230-1247 |
| 25 | private | void | PClaimDevice | CashChanger の排他取得を実行し、結果コードを保持する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1252-1272 |
| 26 | private | int | OPOSCash_FullStatus | CashChanger の FullStatus を取得する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1277-1292 |
| 27 | private | int | PGetFullStatus | FullStatus を取得し、ログ出力する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1297-1306 |
| 28 | private | void | TmrErrGuide_Tick | エラーガイダンス表示中だけ guide window を前面へ戻し、timer を元の間隔で再開する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1321-1339 |
| 29 | private | void | TimFile_Tick | 共有メモリまたは要求ファイルを監視し、再送要求またはデバイスメソッド要求を処理して応答を書き戻す。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1341-1638 |
| 30 | private | int | File_Method | ファイル/メモリ連携から来た釣銭機 command を DeviceMethod と同等の分岐で実行する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1647-2161 |
| 31 | private | int | OPOSCash_EndDeposit_FlagON | EndDeposit 完了フラグを立て、入金終了処理が完了した状態を記録する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2167-2184 |
| 32 | private | int | OPOSCash_EndDeposit | 入金終了区分に従って EndDeposit を実行し、Begin/End 間の排他状態を解除する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2193-2282 |
| 33 | private | void | PEndDeposit | CashChanger の EndDeposit を呼び出す。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2287-2292 |
| 34 | private | int | OPOSCash_FixDeposit | 入金を確定し、確定金額と金種別枚数を取得する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2302-2377 |
| 35 | private | void | PFixDeposit | CashChanger の FixDeposit を呼び出す。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2382-2387 |
| 36 | private | int | OPOSCash_DispenseCashAsync | 非同期モードで金種別払出を実行し、結果を async result として受け取る。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2395-2432 |
| 37 | private | int | OPOSCash_DispenseCash | 払出口と金種別枚数を指定して払出を実行する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2442-2521 |
| 38 | private | void | PDispenseCash | CashChanger の DispenseCash を呼び出す。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2526-2533 |
| 39 | private | int | OPOSCash_DispenseChange | 払出口と金額を指定して払出を実行する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2543-2633 |
| 40 | private | void | PDispenseChange | CashChanger の DispenseChange を呼び出す。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2638-2643 |
| 41 | private | void | PCurrentExit | CurrentExit プロパティを設定する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2648-2653 |
| 42 | private | int | OPOSCash_DepositDataRead | 計数中データを DirectIO で取得し、金種別の枚数文字列へ整形する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2662-2764 |
| 43 | private | int | OPOSCash_CoinStatus | 硬貨部の収納状態を DirectIO で取得し、金種別 status 文字列へ整形する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2773-3010 |
| 44 | private | string | Read_IconFile | 外部連携用の INI またはアイコン状態ファイルを読み書きする。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:3016-3025 |
| 45 | private | string | GetIni | 外部連携用の INI またはアイコン状態ファイルを読み書きする。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:3035-3049 |
| 46 | private | int | OPOSCash_Enq | 釣銭機全体の状態を取得し、状態コードとエラー情報を更新する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:3058-3238 |
| 47 | private | int | OPOSCash_ClearInput | 釣銭機の入力状態を ClearInput でクリアする。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:3246-3324 |
| 48 | private | void | PClearInput | CashChanger の ClearInput を呼び出す。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:3328-3333 |
| 49 | private | int | OPOSCash_ErrGuidance | エラーガイダンス表示 command を実行し、必要に応じて guide window を前面へ出す。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:3343-3459 |
| 50 | private | void | pDirectIO_Async | 非同期 DirectIO を実行し、非同期完了イベントで結果を受ける。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:3464-3498 |
| 51 | private | void | PAsyncMode | AsyncMode プロパティを設定する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:3502-3507 |
| 52 | private | long | OPOSCash_AsyncEnd | 非同期処理を終了し、DeviceEnabled を無効化して排他を解放する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:3513-3525 |
| 53 | private | void | PPowerNotify | PowerNotify プロパティを設定する。 | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:3530-3535 |

## メソッド詳細

### 1. CashChangerByRt300Form

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public CashChangerByRt300Form()` |
| 可視性 | public |
| 戻り値 | - |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:76-82 |

処理内容:

- ① InitializeComponent を呼び、OPOS CashChanger OCX とフォーム component を生成する。
- ② Load、FormClosing、Shown の各イベントへ handler を登録する。
- ③ 以後の初期化処理は DevForm_Load/DevForm_Shown で実行する。

備考: -

### 2. DevForm_Load

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void DevForm_Load(object sender, EventArgs e)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:90-131 |

処理内容:

- ① load flag を初期化し、UI thread と AppDomain の例外 handler を登録する。
- ② フォームを画面外へ移動し、釣銭機関連の global result を初期化する。
- ③ 共有メモリ TURIREQ/TURIANS を作成し、既存内容を clear する。
- ④ 要求/応答ファイルの path と timer interval を設定し、timer は停止状態にする。

備考: -

### 3. DevForm_Shown

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void DevForm_Shown(object sender, EventArgs e)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:132-202 |

処理内容:

- ① 初回表示だけ処理し、フォームを hide する。
- ② DeviceId/DeviceName を KsDeviceInfo に登録し、Device_Open を実行する。
- ③ Visible 設定に応じて taskbar 表示とフォーム位置を調整する。
- ④ Claim、PowerNotify、DeviceEnabled を順に実行し、初回排他エラーはログに残す。
- ⑤ 釣銭機監視 timer とファイル連携 timer を開始する。

備考: -

### 4. DevForm_FormClosing

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void DevForm_FormClosing(object sender, FormClosingEventArgs e)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:204-240 |

処理内容:

- ① 終了ログを出力する。
- ② 共有メモリ TURIREQ/TURIANS を dispose する。
- ③ KsDeviceInfo から対象 DeviceId を探す。
- ④ 対象 OPOS CashChanger が opened の場合は Device_Close を実行する。

備考: -

### 5. OnThreadException

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void OnThreadException(object sender, ThreadExceptionEventArgs t)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:242-252 |

処理内容:

- ① 例外が ExternalException か確認する。
- ② error code が -2147417843 の場合は既知の COM 呼び出し競合として無視する。
- ③ それ以外は元例外を inner exception にして再throwする。

備考: -

### 6. OnUnhandledThreadException

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void OnUnhandledThreadException(object sender, UnhandledExceptionEventArgs t)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:254-264 |

処理内容:

- ① UnhandledException の ExceptionObject を ExternalException として確認する。
- ② error code が -2147417843 の場合は既知の COM 呼び出し競合として無視する。
- ③ それ以外は元例外を inner exception にして再throwする。

備考: -

### 7. AxOPOSCashChanger1_DataEvent

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void AxOPOSCashChanger1_DataEvent(object sender, _IOPOSCashChangerEvents_DataEventEvent e)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:266-277 |

処理内容:

- ① ログ抑制フラグを一時退避する。
- ② DataEvent 発生回数を加算する。
- ③ event status を釣銭機ログへ出力する。
- ④ ログ抑制フラグを元に戻す。

備考: -

### 8. AxOPOSCashChanger1_DirectIOEvent

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void AxOPOSCashChanger1_DirectIOEvent(object sender, _IOPOSCashChangerEvents_DirectIOEventEvent e)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:279-319 |

処理内容:

- ① ログ抑制フラグを一時退避し、event number を DiEvent に保持する。
- ② DirectIOEvent の内容を釣銭機ログへ出力する。
- ③ AsyncMode 中は event number を GsAsyncDirectIoEvents へ重複なしで追加する。
- ④ ログ抑制フラグを元に戻す。

備考: -

### 9. AxOPOSCashChanger1_StatusUpdateEvent

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void AxOPOSCashChanger1_StatusUpdateEvent(object sender, _IOPOSCashChangerEvents_StatusUpdateEventEvent e)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:321-430 |

処理内容:

- ① status data を DiStatus に保持し、釣銭機ログへ出力する。
- ② AsyncMode 中は status を GsAsyncStatusUpdateEvents へ重複なしで追加する。
- ③ 非同期完了 status の場合は AsyncResultCode/Extended を保存し、GbAsyncResult を true にする。
- ④ jam 等の異常 status は追加状態取得と戻り値保存へつなげる。

備考: -

### 10. IsArrayEx

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public bool IsArrayEx(ref string[] sPrm)` |
| 可視性 | public |
| 戻り値 | bool |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:432-452 |

処理内容:

- ① 対象 method の実行条件を確認する。
- ② 非同期イベント配列が利用可能な状態か確認する。
- ③ 必要な戻り値または内部状態を更新する。

備考: -

### 11. OposCashMng

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void OposCashMng()` |
| 可視性 | public |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:457-664 |

処理内容:

- ① 対象 method の実行条件を確認する。
- ② OPOS CashChanger の管理処理と状態確認を実行する。
- ③ 必要な戻り値または内部状態を更新する。

備考: -

### 12. Timer1_Tick

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void Timer1_Tick(object sender, EventArgs e)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:666-687 |

処理内容:

- ① Timer1 を停止する。
- ② GlOposCashReslt が 107 の場合はフォームを close して終了する。
- ③ AsyncMode でない場合だけ OposCashMng を呼び、釣銭機管理処理を実行する。
- ④ timer interval を既定値に戻し、Timer1 を再開する。

備考: -

### 13. OPOSCash_DepositAmount

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_DepositAmount(ref int lDepositAmount, ref string sDepostCounts, ref int lErr, ref string sErr, [Optional, DefaultParameterValue(true)] ref bool bLogPut)` |
| 可視性 | private |
| 戻り値 | int |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:697-791 |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### 14. OPOSCash_DirectIO

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_DirectIO(int lCommand, ref int pData, ref string pString, ref int lErr, ref string sErr)` |
| 可視性 | private |
| 戻り値 | int |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:802-869 |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### 15. PDirectIo

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PDirectIo(int lCmd, ref int pData, ref string pString)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:873-878 |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 16. OPOSCash_Seisa

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_Seisa(ref string sSeisaData, ref int lErr, ref string sErr)` |
| 可視性 | private |
| 戻り値 | int |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:886-971 |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### 17. OposCashResltMsg

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private string OposCashResltMsg(ref int lRlt, ref int lRsltEx)` |
| 可視性 | private |
| 戻り値 | string |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:979-1151 |

処理内容:

- ① 対象 method の実行条件を確認する。
- ② ResultCode/ResultCodeExtended とデバイス状態から表示用エラーメッセージを決定する。
- ③ 必要な戻り値または内部状態を更新する。

備考: -

### 18. PReleaseDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PReleaseDevice()` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1156-1158 |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 19. PGetDepositCounts

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private string PGetDepositCounts(bool bLogPut)` |
| 可視性 | private |
| 戻り値 | string |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1163-1172 |

処理内容:

- ① 対象プロパティを OPOS CashChanger または内部状態から取得する。
- ② 取得値を必要に応じてログへ出力する。
- ③ 取得値を呼出元へ返す。

備考: -

### 20. PGetDepositAmount

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int PGetDepositAmount(bool bLogPut)` |
| 可視性 | private |
| 戻り値 | int |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1177-1186 |

処理内容:

- ① 対象プロパティを OPOS CashChanger または内部状態から取得する。
- ② 取得値を必要に応じてログへ出力する。
- ③ 取得値を呼出元へ返す。

備考: -

### 21. PDeviceEnabled2

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PDeviceEnabled2(bool bVal, [Optional, DefaultParameterValue(true)] ref bool bLogPut)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1191-1203 |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 22. PFreezeEvents

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PFreezeEvents(bool bVal)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1208-1213 |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 23. PDataEventEnabled

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PDataEventEnabled(bool bVal)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1218-1225 |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 24. PDeviceEnabled

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PDeviceEnabled(bool bVal, [Optional, DefaultParameterValue(true)] ref bool bLogPut)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1230-1247 |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 25. PClaimDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PClaimDevice([Optional, DefaultParameterValue(true)] ref bool bLogPut)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1252-1272 |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 26. OPOSCash_FullStatus

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_FullStatus([Optional, DefaultParameterValue(true)] ref bool bLogPut)` |
| 可視性 | private |
| 戻り値 | int |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1277-1292 |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### 27. PGetFullStatus

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int PGetFullStatus([Optional, DefaultParameterValue(true)] ref bool bLogPut)` |
| 可視性 | private |
| 戻り値 | int |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1297-1306 |

処理内容:

- ① 対象プロパティを OPOS CashChanger または内部状態から取得する。
- ② 取得値を必要に応じてログへ出力する。
- ③ 取得値を呼出元へ返す。

備考: -

### 28. TmrErrGuide_Tick

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void TmrErrGuide_Tick(object sender, EventArgs e)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1321-1339 |

処理内容:

- ① 現在の timer interval を退避し、timer を停止する。
- ② GbErrDisp が true の場合はエラーガイダンス window を前面に戻す。
- ③ 退避した interval を戻し、timer を再開する。
- ④ VB Err 状態を clear する。

備考: -

### 29. TimFile_Tick

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void TimFile_Tick(object sender, EventArgs e)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1341-1638 |

処理内容:

- ① timer を停止し、共有メモリ要求または要求ファイルの有無を確認する。
- ② 要求を読み取り、空データまたは読込エラーはログ出力して処理を抜ける。
- ③ ReplyMessage の場合は保存済み応答を再送する。
- ④ DeviceMethod の場合は DeviceId/methodId/handle を解析し、対象 device が起動済みなら File_Method を実行する。
- ⑤ 戻り payload と ReturnValue を応答文字列へ追加し、共有メモリまたは応答ファイルへ書き込む。
- ⑥ 応答文字列を再送用 stock に保存し、timer を再開する。

備考: -

### 30. File_Method

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int File_Method(KsDeviceMethodID methodId, Dictionary<string, string> arguments, ref Dictionary<string, string> returns)` |
| 可視性 | private |
| 戻り値 | int |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:1647-2161 |

処理内容:

- ① handle、同期区分、program id を要求 dictionary から取得する。
- ② 別 handle の処理が残っている場合は async 状態と内部処理状態を解除する。
- ③ Answer/DataEventCount/AsyncStatusGet/AsyncEventGet は保持済み状態または実行中状態を返す。
- ④ 同期指定の場合は methodId ごとに OPOSCash_* を呼び、必要な戻り値を dictionary に設定する。
- ⑤ 非同期指定の場合は async 開始/終了、DirectIO、DispenseCash、DepositAmount など限定 command を処理する。
- ⑥ ResultCode、ResultCodeExtended、ErrorMessage を設定し、エラー時はエラーガイダンスを表示する。

備考: -

### 31. OPOSCash_EndDeposit_FlagON

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_EndDeposit_FlagON()` |
| 可視性 | private |
| 戻り値 | int |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2167-2184 |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### 32. OPOSCash_EndDeposit

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_EndDeposit(int lSuccess, ref int lErr, ref string sErr)` |
| 可視性 | private |
| 戻り値 | int |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2193-2282 |

処理内容:

- ① 処理開始ログを出力する。
- ② Claim と DeviceEnabled を実行する。
- ③ success 区分を指定して EndDeposit を呼ぶ。
- ④ 完了状態に応じて Begin/End フラグと handle を更新する。
- ⑤ 必要な場合は DeviceEnabled と排他を解除し、結果を返す。

備考: -

### 33. PEndDeposit

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PEndDeposit(int success)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2287-2292 |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 34. OPOSCash_FixDeposit

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_FixDeposit(ref int lErr, ref string sErr, ref int lDepositAmount, ref string sDepositCounts)` |
| 可視性 | private |
| 戻り値 | int |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2302-2377 |

処理内容:

- ① 処理開始ログを出力する。
- ② Claim と DeviceEnabled を実行する。
- ③ FixDeposit を呼び、確定金額と金種別枚数を取得する。
- ④ BeginDeposit 中でなければ DeviceEnabled と排他を解除し、結果を返す。

備考: -

### 35. PFixDeposit

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PFixDeposit()` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2382-2387 |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 36. OPOSCash_DispenseCashAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_DispenseCashAsync(int lCurrentExit, string sCashCounts, ref int lErr, ref string sErr)` |
| 可視性 | private |
| 戻り値 | int |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2395-2432 |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### 37. OPOSCash_DispenseCash

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_DispenseCash(int lCurrentExit, string sCashCounts, ref int lErr, ref string sErr)` |
| 可視性 | private |
| 戻り値 | int |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2442-2521 |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### 38. PDispenseCash

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PDispenseCash(string cashCounts)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2526-2533 |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 39. OPOSCash_DispenseChange

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_DispenseChange(int lCurrentExit, int lAmount, ref int lErr, ref string sErr)` |
| 可視性 | private |
| 戻り値 | int |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2543-2633 |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### 40. PDispenseChange

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PDispenseChange(int amount)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2638-2643 |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 41. PCurrentExit

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PCurrentExit(int lVal)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2648-2653 |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 42. OPOSCash_DepositDataRead

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_DepositDataRead(ref string sDepositData, ref int lErr, ref string sErr)` |
| 可視性 | private |
| 戻り値 | int |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2662-2764 |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### 43. OPOSCash_CoinStatus

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_CoinStatus(ref string sStatus, ref int lErr, ref string sErr)` |
| 可視性 | private |
| 戻り値 | int |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:2773-3010 |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### 44. Read_IconFile

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private string Read_IconFile(string sKey)` |
| 可視性 | private |
| 戻り値 | string |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:3016-3025 |

処理内容:

- ① 対象ファイル path と key/value を準備する。
- ② INI またはアイコン状態ファイルを読み書きする。
- ③ 結果値または成功可否を返す。

備考: -

### 45. GetIni

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private string GetIni(string apName, string keyName, string defaults, string filename)` |
| 可視性 | private |
| 戻り値 | string |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:3035-3049 |

処理内容:

- ① 対象ファイル path と key/value を準備する。
- ② INI またはアイコン状態ファイルを読み書きする。
- ③ 結果値または成功可否を返す。

備考: -

### 46. OPOSCash_Enq

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_Enq(ref int lErr, ref string sErr)` |
| 可視性 | private |
| 戻り値 | int |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:3058-3238 |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### 47. OPOSCash_ClearInput

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_ClearInput(ref int lErr, ref string sErr)` |
| 可視性 | private |
| 戻り値 | int |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:3246-3324 |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### 48. PClearInput

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PClearInput()` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:3328-3333 |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 49. OPOSCash_ErrGuidance

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_ErrGuidance(int hwnd, int lControl, string sPointer, ref int lErr, ref string sErr)` |
| 可視性 | private |
| 戻り値 | int |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:3343-3459 |

処理内容:

- ① 表示位置の指定がない場合は既定位置を設定する。
- ② Claim と DeviceEnabled を実行する。
- ③ DirectIO/guide 表示に必要な制御値を渡す。
- ④ window 操作でガイダンスを前面表示し、結果とエラー内容を返す。

備考: -

### 50. pDirectIO_Async

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void pDirectIO_Async(int lCmd, ref int pData, ref string pString, bool bErrGuide = false)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:3464-3498 |

処理内容:

- ① 対象 method の実行条件を確認する。
- ② 非同期 DirectIO を実行し、非同期完了イベントで結果を受ける。
- ③ 必要な戻り値または内部状態を更新する。

備考: -

### 51. PAsyncMode

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PAsyncMode(bool bVal)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:3502-3507 |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 52. OPOSCash_AsyncEnd

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private long OPOSCash_AsyncEnd()` |
| 可視性 | private |
| 戻り値 | long |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:3513-3525 |

処理内容:

- ① 処理開始ログを出力する。
- ② DeviceEnabled を false に設定する。
- ③ 排他を解放する。
- ④ 処理終了ログを出力する。

備考: -

### 53. PPowerNotify

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PPowerNotify(int lVal)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs:3530-3535 |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

## 処理フロー/注意事項

- Load/Shown が OCX と例外ハンドラを初期化する。
- DataEvent/DirectIOEvent/StatusUpdateEvent が内部状態を更新する。
- Timer/File_Method がファイル要求を OPOSCash_* 処理へ振り分ける。
- FormClosing が終了時リソースを解放する。

### 注意事項

- Designer.cs の自動生成 component 初期化は spec scope から除外する。
