---
title: POS-HOST-08 タブレットPOS ホスト 釣銭機制御 RT-300 プログラム仕様書
project: tablet_pos_host
type: architecture
status: draft
source:
  - sources/KsPosBoilerplate/TabetPos.Host/src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300.cs
tags:
  - tablet-host
  - opos
---

# POS-HOST-08 タブレットPOS ホスト 釣銭機制御 RT-300 プログラム仕様書

<!-- spec-evidence
document_id: POS-HOST-08
status: verified
sources:
  - path: sources/KsPosBoilerplate/TabetPos.Host/src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300.cs
    symbol: KsOutProcess.KsDeviceServer.CashChangerByRt300
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
| 機能名 | 釣銭機制御(RT-300) |
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
| クラス名(論理) | 釣銭機制御(RT-300) |
| クラス名(物理) | CashChangerByRt300 |
| 役割/概要 | グローリー製釣銭機（RT-300）の制御を行うクラスであり、入出金、精査、棒金ドロア等の各種操作コマンドを NamedPipe/WindowMessage 経由で受信し、COMインターフェースを介してデバイスに指示する。 |
| 備考 | - |

## クラス定義 {grid=24}

### {kv:6,18}
| 項目 | 内容 |
| --- | --- |
| アクセス修飾子 | public |
| 継承関係(Base/Interfaces) | CashChangerBase |
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
| 1 | public | static | CashChangerByRt300 | GetInstance | Singleton インスタンスを取得 | - |
| 2 | public | override | void | StartDevice | 釣銭機制御の開始およびフォームの起動 | - |
| 3 | public | override | void | StopDevice | 釣銭機制御の終了処理 | - |
| 4 | public | override | int | DeviceMethod | 受信したデバイス操作コマンドの解析と振り分け実行 | - |
| 5 | public | - | int | OPOSCash_EndDeposit_FlagON | 入金完了ステータスフラグのON設定 | - |
| 6 | public | - | int | OPOSCash_Seisa | 収納庫精査処理の実行 | - |
| 7 | public | - | int | OPOSCash_DepositMode | 計数・釣銭モードの照会と設定 | - |
| 8 | public | - | int | OPOSCash_DepositDataRead | 計数中の一時保留データの取得 | - |
| 9 | public | - | int | OPOSCash_BillStatus | 紙幣収納庫の状態取得 | - |
| 10 | public | - | int | OPOSCash_CoinStatus | 硬貨収納庫の状態取得 | - |
| 11 | public | - | int | OPOSCash_Enq | 釣銭機本体のステータス取得 | - |
| 12 | public | - | int | OPOSCash_DepositAmount | 入金計数金額および枚数データの取得 | - |
| 13 | public | - | int | OPOSCash_DirectIO | デバイスへの直接I/O命令の実行（同期） | - |
| 14 | public | - | int | OPOSCash_ClearInput | 釣銭機入力バッファのクリア | - |
| 15 | public | - | int | OPOSCash_DispenseCash | 金種指定による硬貨・紙幣の払出実行 | - |
| 16 | public | - | int | OPOSCash_DispenseChange | 金額指定による釣銭払出実行 | - |
| 17 | public | - | int | OPOSCash_Collect | 回収庫への回収処理実行 | - |
| 18 | public | - | int | OPOSCash_ReadCashCounts | 在庫枚数データの取得 | - |
| 19 | public | - | int | OPOSCash_PauseDeposit | 入金計数動作の一時停止と再開 | - |
| 20 | public | - | int | OPOSCash_BeginDeposit | 入金計数動作の開始指示 | - |
| 21 | public | - | int | OPOSCash_FixDeposit | 入金額の確定計数処理 | - |
| 22 | public | - | int | OPOSCash_EndDeposit | 入金計数動作の終了処理（確定/返金） | - |
| 23 | public | - | int | OPOSCash_OpenDrawer | 棒金ドロアのオープン制御 | - |
| 24 | public | - | int | OPOSCash_FullStatus | 収納庫の満杯状態チェック | - |
| 25 | public | - | int | OPOSCash_ErrGuidance | エラーガイダンス表示処理 | - |
| 26 | public | - | int | OPOSCash_AsyncStart | 非同期動作モードの開始指示 | - |
| 27 | public | - | long | OPOSCash_AsyncEnd | 非同期動作結果取得の終了判定 | - |
| 28 | public | - | int | OPOSCash_DispenseCashAsync | 金種指定払出の非同期実行指示 | - |
| 29 | public | - | int | OPOSCash_DirectIOAsync | 直接I/O命令の非同期実行指示 | - |

## メソッド定義 {grid=40}

### {methoddef:2,2,6,4,4,4,4,4,6,2,2}

#### GetInstance
No: 1
戻り値: CashChangerByRt300 | Singleton インスタンス
発生例外: -

引数:
- -

処理内容:
- ① 内部静的変数 `_instance` が null の場合、新しい `CashChangerByRt300` オブジェクトをインスタンス化して設定する。
- ② `_instance` を返す。

備考:
- -

#### StartDevice
No: 2
戻り値: void | -
発生例外: -

引数:
- KsDeviceId | デバイスID | devId

処理内容:
- ① 基底クラスの `StartDevice(devId)` を呼び出して基本の初期設定を行う。
- ② `CashChangerByRt300Form` を新しくインスタンス化し、フォームオブジェクト `_oFrm` に設定する。
- ③ フォームの Device プロパティに自身を、DeviceId に `devId` を登録する。
- ④ ループタイマーの `SynchronizingObject` にフォームを設定し、UIスレッドと同期してタイマー処理が動作するように設定する。
- ⑤ `_oFrm.Show()` を呼び出し、隠しコントロールフォームを表示する。

備考:
- -

#### StopDevice
No: 3
戻り値: void | -
発生例外: -

引数:
- -

処理内容:
- ① 基底クラスの `StopDevice()` を呼び出して、タイマー停止、フォームの終了処理を行う。

備考:
- -

#### DeviceMethod
No: 4
戻り値: int | 結果コード（0:正常終了、else:エラーコード）
発生例外: -

引数:
- KsDeviceMethodID | メソッドID | methodId
- Dictionary\<string, string\> | メソッド引数 | arguments
- Dictionary\<string, string\> | 戻り値用ペイロード | returns

処理内容:
- ① デバイス情報リスト `KsDeviceInfo.KsDeviceInfoes` から該当のデバイスがオープン状態になっているか確認し、未オープンの場合は `returns` に `ResultCode=-1` と `ResultCodeExtended=-1` を設定し、メソッド戻り値として 2 を返す。
- ② 引数からウィンドウハンドル `hwnd`、同期実行フラグ `bSync` などの共通パラメータを読み出す。
- ③ 非同期処理結果の取得命令（CashChangerAnswerなど）において、非同期モード中であれば `GlAsyncResultCode` を返却する。
- ④ 同期中の場合は `GtOposCashRslt` 内の格納パラメータ（ResultCode等）を取得・補正し、エラーがある場合は `OPOSCash_ErrGuidance` を呼び出して表示制御を行う。
- ⑤ 上記以外の同期コマンド実行の場合、コマンドの種類（BeginDeposit, FixDeposit, EndDeposit, ReadCashCounts, DirectIO, DispenseChange, DispenseCash等）に応じて、対応するクラス内の実処理用 `OPOSCash_` メソッドを順次呼び出す。
- ⑥ 実行結果（ResultCode, ResultCodeExtended等）を戻り値ペイロード `returns` に追加格納し、エラー発生時は `OPOSCash_ErrGuidance` を表示制御する。
- ⑦ 非同期コマンド実行の場合（bSync = false）は、`OPOSCash_AsyncStart`, `OPOSCash_DispenseCashAsync`, `OPOSCash_DirectIOAsync` などの非同期用処理を呼び出す。

備考:
- -

#### OPOSCash_EndDeposit_FlagON
No: 5
戻り値: int | 結果コード（0:正常、else:例外発生）
発生例外: -

引数:
- -

処理内容:
- ① `GtOposCashRslt.BEndDp`（計数終了検知フラグ）を true に設定する。
- ② 正常終了コード 0 を返す。

備考:
- -

#### OPOSCash_Seisa
No: 6
戻り値: int | 結果コード（0:正常、else:エラーコード）
発生例外: -

引数:
- string | 精査結果データ（戻り値） | sSeisaData
- int | エラー詳細No | lErr
- string | エラーメッセージ | sErr

処理内容:
- ① フォームの `OPOSCash_Seisa` を呼び出し、内部の精査指示を実行して収納庫ごとの金種・枚数データを文字列として受け取り `sSeisaData` に設定する。

備考:
- -

#### OPOSCash_DepositMode
No: 7
戻り値: int | 結果コード（0:正常、else:エラー）
発生例外: -

引数:
- int | 設定モード値 | lMode
- string | 状態結果文字列 | sStatus
- int | エラー詳細No | lErr
- string | エラーメッセージ | sErr

処理内容:
- ① フォームを仲介して、釣銭機の動作モード（計数モード/釣銭モード）を設定または照会する。

備考:
- -

#### OPOSCash_DepositDataRead
No: 8
戻り値: int | 結果コード（0:正常、else:エラー）
発生例外: -

引数:
- string | 計数中データ文字列 | sDepositData
- int | エラー詳細No | lErr
- string | エラーメッセージ | sErr

処理内容:
- ① フォーム側の `OPOSCash_DepositDataRead` を実行し、現在入金口から投入されて一時保留（エスクロー）されている現金の枚数データを取得する。

備考:
- -

#### OPOSCash_BillStatus
No: 9
戻り値: int | 結果コード（0:正常、else:エラー）
発生例外: -

引数:
- string | 収納状態データ | sStatus
- int | エラー詳細No | lErr
- string | エラーメッセージ | sErr

処理内容:
- ① フォーム側の `OPOSCash_BillStatus` を呼び出し、紙幣各金種収納庫の状態（フル/ニアフル/エンプティ）を取得する。

備考:
- -

#### OPOSCash_CoinStatus
No: 10
戻り値: int | 結果コード（0:正常、else:エラー）
発生例外: -

引数:
- string | 収納状態データ | sStatus
- int | エラー詳細No | lErr
- string | エラーメッセージ | sErr

処理内容:
- ① フォーム側の `OPOSCash_CoinStatus` を呼び出し、硬貨各金種収納庫の状態（フル/ニアフル/エンプティ）を取得する。

備考:
- -

#### OPOSCash_Enq
No: 11
戻り値: int | 結果コード（0:正常、else:エラー）
発生例外: -

引数:
- int | エラー詳細No | lErr
- string | エラーメッセージ | sErr

処理内容:
- ① フォームの `OPOSCash_Enq` を実行し、現在の釣銭機のオンライン/オフライン等の機器基本ステータスを照会する。

備考:
- -

#### OPOSCash_DepositAmount
No: 12
戻り値: int | 結果コード（0:正常、else:エラー）
発生例外: -

引数:
- int | 計数完了金額 | lDepositAmount
- string | 金種別枚数内訳 | sDepostCounts
- int | エラー詳細No | lErr
- string | エラーメッセージ | sErr
- bool | ログ出力制御 | bLogPut

処理内容:
- ① フォームの `OPOSCash_DepositAmount` を呼び出し、入金開始から現在までに計数された現金の「総金額」および「金種ごとの枚数」を読み取り格納する。

備考:
- -

#### OPOSCash_DirectIO
No: 13
戻り値: int | 結果コード（0:正常、else:エラー）
発生例外: -

引数:
- int | コマンドコード | lCommand
- int | パラメータ数値 | pData
- string | パラメータ文字列 | pString
- int | エラー詳細No | lErr
- string | エラーメッセージ | sErr

処理内容:
- ① フォームの `OPOSCash_DirectIO` を呼び出して、デバイスドライバ（OPOS Service Object）へ直接コマンド・制御データを送信し、結果を受け取る。

備考:
- -

#### OPOSCash_ClearInput
No: 14
戻り値: int | 結果コード（0:正常、else:エラー）
発生例外: -

引数:
- int | エラー詳細No | lErr
- string | エラーメッセージ | sErr

処理内容:
- ① フォームの `OPOSCash_ClearInput` を呼び出し、デバイスバッファにたまっている入金イベントなどの未読データを一括クリアする。

備考:
- -

#### OPOSCash_DispenseCash
No: 15
戻り値: int | 結果コード（0:正常、else:エラー）
発生例外: -

引数:
- int | 出金口番号 | lCurrentExit
- string | 金種別払出枚数 | sCashCounts
- int | エラー詳細No | lErr
- string | エラーメッセージ | sErr

処理内容:
- ① フォームの `OPOSCash_DispenseCash` を呼び出し、指定された金種ごとの出金枚数に基づいて紙幣・硬貨を払い出す。

備考:
- -

#### OPOSCash_DispenseChange
No: 16
戻り値: int | 結果コード（0:正常、else:エラー）
発生例外: -

引数:
- int | 出金口番号 | lCurrentExit
- int | 出金総金額 | lAmount
- int | エラー詳細No | lErr
- string | エラーメッセージ | sErr

処理内容:
- ① フォームの `OPOSCash_DispenseChange` を呼び出し、指定された総金額に応じた最適な金種構成で釣銭を払い出す。

備考:
- -

#### OPOSCash_Collect
No: 17
戻り値: int | 結果コード（0:正常、else:エラー）
発生例外: -

引数:
- string | 回収コマンド | sCmd
- int | エラー詳細No | lErr
- string | エラーメッセージ | sErr

処理内容:
- ① フォームの `File_Method` に回収メソッドを通知し、収納庫から回収庫（回収ボックス）への現金の移動処理を実行する。

備考:
- -

#### OPOSCash_ReadCashCounts
No: 18
戻り値: int | 結果コード（0:正常、else:エラー）
発生例外: -

引数:
- string | 在庫枚数データ | sCashCounts
- bool | 在庫不一致フラグ | bDiscrepancy
- int | エラー詳細No | lErr
- string | エラーメッセージ | sErr

処理内容:
- ① フォームの `PReadCashCounts` を呼び出し、釣銭機の内部各金種収納庫に保管されている現金の現在在庫枚数を取得する。

備考:
- -

#### OPOSCash_PauseDeposit
No: 19
戻り値: int | 結果コード（0:正常、else:エラー）
発生例外: -

引数:
- int | 制御コード | lControl
- int | エラー詳細No | lErr
- string | エラーメッセージ | sErr

処理内容:
- ① フォームの `PPauseDeposit(lControl)` を呼び出して、入金計数動作の一時停止（Pause）または計数再開（Restart）を制御する。

備考:
- -

#### OPOSCash_BeginDeposit
No: 20
戻り値: int | 結果コード（0:正常、else:エラー）
発生例外: -

引数:
- int | エラー詳細No | lErr
- string | エラーメッセージ | sErr

処理内容:
- ① フォームの `PBeginDeposit()` を呼び出し、釣銭機のシャッターを開けて入金受入および計数監視状態を開始する。

備考:
- -

#### OPOSCash_FixDeposit
No: 21
戻り値: int | 結果コード（0:正常、else:エラー）
発生例外: -

引数:
- int | エラー詳細No | lErr
- string | エラーメッセージ | sErr
- int | 確定計数金額 | lDepositAmount
- string | 確定計数枚数内訳 | sDepositCounts

処理内容:
- ① フォームの `PFixDeposit()` を呼び出し、現在投入されている現金の計数を完了して計数金額を確定する（入金口シャッターを閉じる）。
- ② 確定した金額および枚数内訳を取得する。

備考:
- -

#### OPOSCash_EndDeposit
No: 22
戻り値: int | 結果コード（0:正常、else:エラー）
発生例外: -

引数:
- int | 処理区分 | lSuccess
- int | エラー詳細No | lErr
- string | エラーメッセージ | sErr

処理内容:
- ① フォームの `PEndDeposit(lSuccess)` を呼び出し、計数確定後の終了処理を行う（1:売上金収納庫への収納、2:返金等）。

備考:
- -

#### OPOSCash_OpenDrawer
No: 23
戻り値: int | 結果コード（0:正常、else:エラー）
発生例外: -

引数:
- int | 制御値 | lControl
- int | エラー詳細No | lErr
- string | エラーメッセージ | sErr

処理内容:
- ① フォーム側のドロアオープン処理を実行し、釣銭機に付属または連動する棒金ドロアを強制解錠する。

備考:
- -

#### OPOSCash_FullStatus
No: 24
戻り値: int | 満杯状態ステータス値
発生例外: -

引数:
- bool | ログ出力制御 | bLogPut

処理内容:
- ① フォームの `PGetFullStatus(bLogPut)` を呼び出し、収納庫内の硬貨・紙幣のいずれかが満杯（Full）状態かどうかを判定する。

備考:
- -

#### OPOSCash_ErrGuidance
No: 25
戻り値: int | 結果コード
発生例外: -

引数:
- int | ウィンドウハンドル | hwnd
- int | 制御フラグ | lControl
- string | 指示用ポインタ | sPointer
- ref int | エラー詳細No | lErr
- ref string | エラーメッセージ | sErr

処理内容:
- ① `ErrGuidance.OPOSCash_ErrGuidance` メソッドを呼び出し、引数の `hwnd` の中心位置に障害箇所復旧復帰用の指示画面（エラーガイダンス）をポップアップ表示する。
- ② エラーガイダンス画面クローズ後、`UpdateWindow(hwnd)` を呼び出し、裏に隠れていた画面が白くなるのを防ぐため強制的に再描画を行う。

備考:
- -

#### OPOSCash_AsyncStart
No: 26
戻り値: int | 結果コード
発生例外: -

引数:
- -

処理内容:
- ① フォームの `OPOSCash_AsyncStart()` を実行し、COMインターフェースを非同期実行可能状態にする。

備考:
- -

#### OPOSCash_AsyncEnd
No: 27
戻り値: long | 結果
発生例外: -

引数:
- -

処理内容:
- ① フォームの `OPOSCash_AsyncEnd()` を実行し、現在並行で動作している非同期命令のステータスまたは終了結果を待機・取得する。

備考:
- -

#### OPOSCash_DispenseCashAsync
No: 28
戻り値: int | 結果コード
発生例外: -

引数:
- int | 出金口番号 | lCurrentExit
- string | 金種別払出枚数 | sCashCounts
- ref int | エラー詳細No | lErr
- ref string | エラーメッセージ | sErr

処理内容:
- ① フォームの `OPOSCash_DispenseCashAsync` を呼び出し、金種指定出金を非同期スレッド（非ブロッキング）で実行指示する。

備考:
- -

#### OPOSCash_DirectIOAsync
No: 29
戻り値: int | 結果コード
発生例外: -

引数:
- int | コマンドコード | lCommand
- ref int | パラメータ数値 | pData
- ref string | パラメータ文字列 | pString
- ref int | エラー詳細No | lErr
- ref string | エラーメッセージ | sErr

処理内容:
- ① フォームの `OPOSCash_DirectIOAsync` を呼び出し、DirectIO命令を非同期（非ブロッキング）で実行指示する。

備考:
- -
