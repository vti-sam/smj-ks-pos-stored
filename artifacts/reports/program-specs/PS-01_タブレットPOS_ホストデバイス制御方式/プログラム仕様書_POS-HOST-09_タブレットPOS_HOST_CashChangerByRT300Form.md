---
title: Tablet Host CashChangerByRT300Form Program Specification
project: tablet_pos_host
type: architecture
status: draft
source:
  - sources/KsPosBoilerplate/TabetPos.Host/src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs
tags:
  - tablet-host
  - opos
---

# プログラム仕様書 CashChangerByRt300Form

<!-- spec-evidence
document_id: POS-HOST-09
status: verified
sources:
  - path: sources/KsPosBoilerplate/TabetPos.Host/src/KsDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs
    symbol: KsOutProcess.KsDeviceServer.CashChangerByRt300Form
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
| 機能名 | 自動釣銭機UIスレッドフォーム(RT-300) |
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
| クラス名(論理) | 自動釣銭機UIスレッドフォーム(RT-300) |
| クラス名(物理) | CashChangerByRt300Form |
| 役割/概要 | COMコンポーネントおよびActiveXコントロールをSTA（Single Threaded Apartment）スレッドでホストするためのダミーフォームクラス。 |
| 備考 | - |

## クラス定義 {grid=24}

### {kv:6,18}
| 項目 | 内容 |
| --- | --- |
| アクセス修飾子 | public |
| 継承関係(Base/Interfaces) | Form |
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
| 1 | private | - | void | DevForm_Load | フォームロード時の初期化処理を行います。 | - |
| 2 | private | - | void | DevForm_Shown | フォーム表示時のデバイス初期化および有効化処理を行います。 | - |
| 3 | private | - | void | DevForm_FormClosing | フォームクローズ時のデバイス終了およびクリーンアップ処理を行います。 | - |
| 4 | private | - | void | AxOPOSCashChanger1_DataEvent | 釣銭機からデータイベントを受信した際の処理を行います。 | - |
| 5 | private | - | void | AxOPOSCashChanger1_DirectIOEvent | 釣銭機からDirectIOイベントを受信した際の処理を行います。 | - |
| 6 | private | - | void | AxOPOSCashChanger1_StatusUpdateEvent | 釣銭機からステータスアップデートイベントを受信した際の処理を行います。 | - |
| 7 | private | - | void | OnThreadException | UIスレッド例外をログ出力します。 | - |
| 8 | private | - | void | OnUnhandledThreadException | 未処理例外をログ出力します。 | - |
| 9 | public | - | bool | IsArrayEx | 文字列配列が利用可能か判定します。 | - |
| 10 | public | - | void | OposCashMng | 非同期入金処理およびイベント情報の解析を行います。 | - |
| 11 | private | - | void | Timer1_Tick | タイマー実行時の入金監視処理を行います。 | - |
| 12 | private | - | int | File_Method | 共通ファイル連携経由の釣銭機コマンドを振り分けます。 | - |
| 13 | private | - | int | OPOSCash_DepositAmount | 入金計数金額および枚数データを取得します。 | - |
| 14 | private | - | int | OPOSCash_DirectIO | DirectIO命令を同期実行します。 | - |
| 15 | private | - | int | OPOSCash_Seisa | 収納庫精査処理を実行します。 | - |
| 16 | private | - | string | OposCashResltMsg | OPOS結果コードからメッセージを生成します。 | - |
| 17 | private | - | int | OPOSCash_FullStatus | 収納庫の満杯状態を取得します。 | - |
| 18 | private | - | int | OPOSCash_ErrGuidance | エラーガイダンス表示処理を実行します。 | - |
| 19 | private | - | long | OPOSCash_AsyncEnd | 非同期処理の終了状態を取得します。 | - |

## メソッド定義 {grid=40}

### {methoddef:2,2,6,4,4,4,4,4,6,2,2}

#### DevForm_Load
No: 1
戻り値: void | -
発生例外: -

引数:
- object | 送信元 | sender
- EventArgs | イベント引数 | e

処理内容:
- ① ロードフラグ_loadflgを0に初期化する。
- ② スレッド例外および未処理例外ハンドラーを登録する。
- ③ フォームの表示位置（Top, Left）を画面外に移動して非表示化する。
- ④ 釣銭機結果コードなどのグローバル変数を初期化する。
- ⑤ メモリ共有用のインスタンス（TURIREQ、TURIANS）を作成して初期化する。
- ⑥ ファイルチェックタイマーのインターバルを設定し、タイマーを初期化する。

備考:
- -

#### DevForm_Shown
No: 2
戻り値: void | -
発生例外: -

引数:
- object | 送信元 | sender
- EventArgs | イベント引数 | e

処理内容:
- ① ログ出力処理を実行する。
- ② ロードフラグ_loadflgが0以外の場合は処理を抜ける。
- ③ ロードフラグ_loadflgを1に設定し、フォームを非表示にする。
- ④ デバイス情報インスタンスを生成し、リストに追加する。
- ⑤ Device.Device_Open(OPOSCashChanger1)メソッドを実行してデバイスをオープンする。
- ⑥ PClaimDeviceメソッドを呼び出して初回排他制御を要求する。
- ⑦ 排他制御成功時、PPowerNotifyおよびPDeviceEnabledメソッドを呼び出してデバイスを有効化する。
- ⑧ タイマーTimer1およびTimFileを有効化（Enabled = True）にする。

備考:
- -

#### DevForm_FormClosing
No: 3
戻り値: void | -
発生例外: -

引数:
- object | 送信元 | sender
- FormClosingEventArgs | クローズイベント引数 | e

処理内容:
- ① ログ出力処理を実行する。
- ② 共有メモリ用インスタンス（_mmfTuriReq、_mmfTuriAns）を破棄（Dispose）する。
- ③ デバイス情報リストから対象デバイスがオープン状態か確認し、オープンの場合はDevice.Device_Close(OPOSCashChanger1)を呼び出してクローズする。

備考:
- -

#### AxOPOSCashChanger1_DataEvent
No: 4
戻り値: void | -
発生例外: -

引数:
- object | 送信元 | sender
- _IOPOSCashChangerEvents_DataEventEvent | イベントデータ | e

処理内容:
- ① ログ出力用のフラグ制御を行う。
- ② イベントカウンタGlDataEventCountを1増加させる。
- ③ 釣銭機ログ出力処理を実行する。

備考:
- -

#### AxOPOSCashChanger1_DirectIOEvent
No: 5
戻り値: void | -
発生例外: -

引数:
- object | 送信元 | sender
- _IOPOSCashChangerEvents_DirectIOEventEvent | イベントデータ | e

処理内容:
- ① イベント番号e.eventNumberを取得してDiEventに設定する。
- ② 釣銭機ダイレクトIOイベントのログを出力する。
- ③ 非同期モード中である場合、発生したイベント番号を非同期イベント管理配列GsAsyncDirectIoEventsに追加保持する。

備考:
- -

#### AxOPOSCashChanger1_StatusUpdateEvent
No: 6
戻り値: void | -
発生例外: -

引数:
- object | 送信元 | sender
- _IOPOSCashChangerEvents_StatusUpdateEventEvent | イベントデータ | e

処理内容:
- ① イベントデータe.dataを取得してDiStatusに設定する。
- ② 釣銭機ステータスアップデートイベントのログを出力する。
- ③ 非同期モード中である場合、発生したステータスを非同期ステータス管理配列GsAsyncStatusUpdateEventsに追加保持する。
- ④ DiStatusがChanStatusAsync（非同期動作終了）の場合、AsyncResultCodeを取得しログ出力して、GbAsyncResultをTrueに設定する。
- ⑤ DiStatusがChanStatusJam（機器障害）の場合、DirectIOによる状態リードを実行し、カセット外れ等のエラー時は在庫精査や管理ファイルへの書き込みを行う。
- ⑥ DiStatusが機器障害または電源OFFの場合は、排他および有効化関連のグローバル変数を-1でリセットする。

備考:
- -

#### OnThreadException
No: 7
戻り値: void | -
発生例外: -

引数:
- object | 送信元 | sender
- ThreadExceptionEventArgs | 例外イベント | t

処理内容:
- ① UIスレッド例外を受け取り、釣銭機ログへ例外内容を出力する。

備考:
- -

#### OnUnhandledThreadException
No: 8
戻り値: void | -
発生例外: -

引数:
- object | 送信元 | sender
- UnhandledExceptionEventArgs | 例外イベント | t

処理内容:
- ① 未処理例外を受け取り、釣銭機ログへ例外内容を出力する。

備考:
- -

#### IsArrayEx
No: 9
戻り値: bool | 配列が利用可能な場合 true
発生例外: -

引数:
- ref string[] | 判定対象配列 | sPrm

処理内容:
- ① 引数の文字列配列が null でなく、要素参照可能な状態か確認する。
- ② 利用可能な場合は true、利用不可の場合は false を返す。

備考:
- -

#### OposCashMng
No: 10
戻り値: void | -
発生例外: -

引数:
- -

処理内容:
- ① デバッグモードファイルがローカルに存在するか確認する。
- ② GtOposCashRsltの処理フラグFlgが1かつ同期実行フラグbSyncがFalse（非同期）の場合のみ処理を続行し、それ以外は終了処理（LBL_END）へ遷移する。
- ③ GtOposCashRsltのコマンドがCashChangerDepositAmountの場合、イベントを有効化し、保留されていたステータスおよびイベント（DiStatus, DiEvent）を処理する。
- ④ イベント内容（カセットフル、計数エラー、オフライン、満杯、セット外れ、機器障害）を判定し、それぞれのResultCodeおよびエラーメッセージを設定する。
- ⑤ 正常時またはエラー発生時において、OPOSCash_DepositAmountメソッドを呼び出して入金計数金額および枚数内訳を取得する。
- ⑥ 取得した入金額、枚数内訳、ResultCode等を戻り値ペイロードreturnsに追加設定し、GtOposCashRsltへ格納する。

備考:
- -

#### Timer1_Tick
No: 11
戻り値: void | -
発生例外: -

引数:
- object | 送信元 | sender
- EventArgs | イベント引数 | e

処理内容:
- ① タイマーTimer1を一時的に無効化する。
- ② 釣銭機リザルトコードが107の場合はフォームをクローズする。
- ③ 非同期モード中でない場合、OposCashMngメソッドを呼び出して入金監視処理を実行する。
- ④ タイマーTimer1のインターバルをChkTimeIntervalに設定し、タイマーを再度有効化する。

備考:
- -

#### File_Method
No: 12
戻り値: int | 結果コード
発生例外: -

引数:
- KsDeviceMethodID | メソッドID | methodId
- Dictionary<string, string> | メソッド引数 | arguments
- ref Dictionary<string, string> | 戻り値用ペイロード | returns

処理内容:
- ① ファイル連携で受け取った釣銭機コマンドを `KsDeviceMethodID` ごとに判定する。
- ② BeginDeposit、FixDeposit、EndDeposit、DispenseCash、DispenseChange、DirectIO、DepositAmount、Seisa などの内部OPOS処理へ振り分ける。
- ③ 実行結果を `returns` に格納して返す。

備考:
- -

#### OPOSCash_DepositAmount
No: 13
戻り値: int | 結果コード
発生例外: -

引数:
- ref int | 入金額 | lDepositAmount
- ref string | 入金枚数文字列 | sDepostCounts
- ref int | エラー詳細No | lErr
- ref string | エラーメッセージ | sErr
- ref bool | ログ出力有無 | bLogPut

処理内容:
- ① OPOS CashChanger の入金計数金額と枚数データを取得する。
- ② `ResultCode`、`ResultCodeExtended`、入金額、枚数文字列を呼び出し元へ返す。

備考:
- -

#### OPOSCash_DirectIO
No: 14
戻り値: int | 結果コード
発生例外: -

引数:
- int | DirectIOコマンド | lCommand
- ref int | 入出力データ | pData
- ref string | 入出力文字列 | pString
- ref int | エラー詳細No | lErr
- ref string | エラーメッセージ | sErr

処理内容:
- ① OPOS CashChanger の `DirectIO` を同期実行する。
- ② 実行後の `pData`、`pString`、結果コードを呼び出し元へ返す。

備考:
- -

#### OPOSCash_Seisa
No: 15
戻り値: int | 結果コード
発生例外: -

引数:
- ref string | 精査結果データ | sSeisaData
- ref int | エラー詳細No | lErr
- ref string | エラーメッセージ | sErr

処理内容:
- ① 収納庫精査コマンドを実行し、収納庫・回収庫別のデータを取得する。
- ② 精査結果文字列と結果コードを呼び出し元へ返す。

備考:
- -

#### OposCashResltMsg
No: 16
戻り値: string | 結果メッセージ
発生例外: -

引数:
- ref int | ResultCode | lRlt
- ref int | ResultCodeExtended | lRsltEx

処理内容:
- ① OPOSの `ResultCode` と `ResultCodeExtended` を判定し、表示・ログ用メッセージを生成する。

備考:
- -

#### OPOSCash_FullStatus
No: 17
戻り値: int | 満杯状態コード
発生例外: -

引数:
- ref bool | ログ出力有無 | bLogPut

処理内容:
- ① 釣銭機の収納庫状態を取得し、満杯または満杯以外の状態コードを返す。

備考:
- -

#### OPOSCash_ErrGuidance
No: 18
戻り値: int | 結果コード
発生例外: -

引数:
- int | ウィンドウハンドル | hwnd
- int | 制御値 | lControl
- string | ポインタ文字列 | sPointer
- ref int | エラー詳細No | lErr
- ref string | エラーメッセージ | sErr

処理内容:
- ① OPOSエラー状態を判定し、必要に応じてエラーガイダンス表示を制御する。
- ② 表示結果およびエラー情報を呼び出し元へ返す。

備考:
- -

#### OPOSCash_AsyncEnd
No: 19
戻り値: long | 非同期終了状態
発生例外: -

引数:
- -

処理内容:
- ① 非同期処理の終了判定を行い、非同期モードの終了状態を返す。

備考:
- -
