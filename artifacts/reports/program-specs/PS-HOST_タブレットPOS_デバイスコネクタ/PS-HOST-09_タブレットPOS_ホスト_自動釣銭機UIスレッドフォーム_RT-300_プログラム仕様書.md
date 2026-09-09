# PS-HOST-09 タブレットPOS ホスト 自動釣銭機UIスレッドフォーム RT-300 プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-HOST-09 |
| 文書名 | タブレットPOS ホスト 自動釣銭機UIスレッドフォーム RT-300 プログラム仕様書 |
| 対象 | タブレットPOS / 自動釣銭機UIスレッドフォーム RT-300 |
| 版数 | 1.0.0 |
| 作成日 | 2026/06/19 |
| 作成者 | VTI サム |
| レビュー担当 | SMJ 蒲田 |
| 承認者 | SMJ 蒲田 |
| 目的 | 対象クラスの構造、フィールド／プロパティ及びメソッド仕様を定義する。 |
| 期待成果 | 実装及びレビューで参照するクラス単位の仕様を明確にする。 |

## 01_改訂履歴

| 版数 | 日付 | 変更内容 | 作成者 | 承認者 |
| --- | --- | --- | --- | --- |
| 1.0.0 | 2026/07/23 | 正式版として初版を作成。 | VTI サム | SMJ 蒲田 |

## クラス情報

| 項目 | 内容 |
| --- | --- |
| 機能名 | 自動釣銭機UIスレッドフォーム RT-300 |
| 物理クラス名 | CashChangerByRt300Form |
| 名前空間 | TabletOutProcess.TabletDeviceServer |
| アクセス修飾子 | public partial |
| 継承/実装 | Form |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/pos-integration/Pos.DeviceConnector/src/TabletDevice/CashChanger/CashChangerByRT300/CashChangerByRT300Form.cs |
| 対象クラス | CashChangerByRt300Form |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

RT-300 自動釣銭機の制御部品を UI スレッド上で保持し、自動釣銭機イベント、周期監視、外部要求ファイルを処理するフォーム部品。管理画面ではなく、OPOS／OCX を UI スレッド上で扱うための内部フォームである。通常運用時は画面としてユーザーに操作させることを前提とせず、デバイス制御部からの要求を実機操作へつなぎ、結果を応答データとして返す。

### 主な責務

- 自動釣銭機から通知されるイベントと状態変化を受け取る。
- 共有メモリおよび要求・応答ファイルによる外部連携を処理する。
- 周期タイマーで自動釣銭機状態と未処理要求を確認する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| フィールド | public | CashChangerBase | Device | フォームから参照するデバイス制御インスタンス。 |
| フィールド | public | TabletDeviceId | DeviceId | フォームに紐づくデバイスID。 |
| フィールド | public | int | DiStatus | OPOS 自動釣銭機イベントの DI_STATUS 値。 |
| フィールド | public | int | DiEvent | OPOS 自動釣銭機イベントの DI_EVENT 値。 |
| フィールド | public | int | EnqStatus | OPOS 自動釣銭機イベントの ENQ_STATUS 値。 |
| フィールド | private | int | _loadflg | Shown/Activated 初回処理を一度だけ通すためのロードフラグ。 |
| フィールド | private | string | NameTurireqMem | 自動釣銭機要求用 memory mapped file 名（TURIREQ）。 |
| フィールド | private | string | NameTuriansMem | 自動釣銭機応答用 memory mapped file 名（TURIANS）。 |
| フィールド | private | KsMemoryMappedFile | _mmfTuriReq | 自動釣銭機共通 DLL からの要求を受信する共有メモリ。 |
| フィールド | private | KsMemoryMappedFile | _mmfTuriAns | 自動釣銭機サーバーから応答を書き込む共有メモリ。 |
| フィールド | private | int | ChkTimeInterval | Timer1 の監視間隔（500ms）。 |
| フィールド | private | int | FileChkTime | ファイル連携の監視待機間隔（50ms）。 |
| フィールド | private | Dictionary<string, string> | _mFileStock | ファイル連携で読み取った要求/応答情報を保持する辞書。 |
| フィールド | private | string | NameReqfile | 自動釣銭機共通 DLL から自動釣銭機サーバーへの要求ファイル名。 |
| フィールド | private | string | NameAnsfile | 自動釣銭機サーバーから自動釣銭機共通 DLL への応答ファイル名。 |
| フィールド | private | string | NameReqfileOk | 要求ファイル受信確認用の OK ファイル名。 |
| フィールド | private | string | NameAnsfileOk | 応答ファイル処理正常完了を示す OK ファイル名。 |
| フィールド | private | string | NameAnsfileNg | 応答ファイル処理異常を示す NG ファイル名。 |
| フィールド | private | int | _piFileUse | ファイル連携を使用するかを示す区分値（0: 未使用、1: 使用）。 |
| フィールド | private | string | _psNameReqFile | 要求ファイルの実パス。 |
| フィールド | private | string | _psNameAnsFile | 応答ファイルの実パス。 |
| フィールド | private | string | _psNameReqFileOk | 要求 OK ファイルの実パス。 |
| フィールド | private | string | _psNameAnsFileOk | 応答 OK ファイルの実パス。 |
| フィールド | private | string | _psNameAnsFileNg | 応答 NG ファイルの実パス。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | public | - | CashChangerByRt300Form | インスタンスを初期化する。 |
| ② | private | void | DevForm_Load | 例外ハンドラー、非表示配置、共有メモリ、要求/応答ファイルパス、タイマー初期値を設定する。 |
| ③ | private | void | DevForm_Shown | TabletDeviceInfo 登録、OPOS Open/Claim/DeviceEnabled、内部フォームの表示可否判定、監視タイマー起動を行う。 |
| ④ | private | void | DevForm_FormClosing | 共有メモリを破棄し、対象 OPOS CashChanger が opened の場合は close する。 |
| ⑤ | private | void | OnThreadException | COM 呼び出し競合の既知 ExternalException は無視し、それ以外は再throwする。 |
| ⑥ | private | void | OnUnhandledThreadException | 未処理例外でも同じ COM 競合だけを無視し、それ以外は再throwする。 |
| ⑦ | private | void | AxOPOSCashChanger1_DataEvent | DataEvent 発生回数を加算し、イベント状態を自動釣銭機ログへ出力する。 |
| ⑧ | private | void | AxOPOSCashChanger1_DirectIOEvent | DirectIOEvent を記録し、非同期中は重複を避けてイベントリストに保持する。 |
| ⑨ | private | void | AxOPOSCashChanger1_StatusUpdateEvent | StatusUpdateEvent を記録し、非同期完了・ジャムなどの状態を内部結果へ反映する。 |
| ⑩ | public | bool | IsArrayEx | 非同期イベント配列が利用可能な状態か確認する。 |
| ⑪ | public | void | OposCashMng | OPOS CashChanger の管理処理と状態確認を実行する。 |
| ⑫ | private | void | Timer1_Tick | 自動釣銭機が非同期実行中でない場合だけ管理処理を呼び、監視タイマーを再開する。 |
| ⑬ | private | int | OPOSCash_DepositAmount | BeginDeposit 後の入金額と金種別枚数を取得する。 |
| ⑭ | private | int | OPOSCash_DirectIO | 指定 command、pData、pString で CashChanger DirectIO を同期実行する。 |
| ⑮ | private | void | PDirectIo | OPOS CashChanger の DirectIO を呼び出す。 |
| ⑯ | private | int | OPOSCash_Seisa | 精査 DirectIO を実行し、収納庫・回収ボックス別の収納データを返却する。 |
| ⑰ | private | string | OposCashResltMsg | ResultCode/ResultCodeExtended とデバイス状態から表示用エラーメッセージを決定する。 |
| ⑱ | private | void | PReleaseDevice | CashChanger の排他を解放する。 |
| ⑲ | private | string | PGetDepositCounts | DepositCounts を取得し、ログ出力する。 |
| ⑳ | private | int | PGetDepositAmount | DepositAmount を取得し、ログ出力する。 |
| ㉑ | private | void | PDeviceEnabled2 | 異常時の復旧用に DeviceEnabled を再設定する。 |
| ㉒ | private | void | PFreezeEvents | FreezeEvents プロパティを設定する。 |
| ㉓ | private | void | PDataEventEnabled | DataEventEnabled プロパティを設定する。 |
| ㉔ | private | void | PDeviceEnabled | DeviceEnabled プロパティを設定し、結果コードを保持する。 |
| ㉕ | private | void | PClaimDevice | CashChanger の排他取得を実行し、結果コードを保持する。 |
| ㉖ | private | int | OPOSCash_FullStatus | CashChanger の FullStatus を取得する。 |
| ㉗ | private | int | PGetFullStatus | FullStatus を取得し、ログ出力する。 |
| ㉘ | private | void | TmrErrGuide_Tick | エラーガイダンス表示中だけガイダンスウィンドウを前面へ戻し、タイマーを元の間隔で再開する。 |
| ㉙ | private | void | TimFile_Tick | 共有メモリまたは要求ファイルを監視し、再送要求またはデバイスメソッド要求を処理して応答を書き戻す。 |
| ㉚ | private | int | File_Method | ファイル/メモリ連携から来た自動釣銭機コマンドをデバイスメソッド（DeviceMethod）と同等の分岐で実行する。 |
| ㉛ | private | int | OPOSCash_EndDeposit_FlagON | EndDeposit 完了フラグを立て、入金終了処理が完了した状態を記録する。 |
| ㉜ | private | int | OPOSCash_EndDeposit | 入金終了区分に従って EndDeposit を実行し、Begin/End 間の排他状態を解除する。 |
| ㉝ | private | void | PEndDeposit | CashChanger の EndDeposit を呼び出す。 |
| ㉞ | private | int | OPOSCash_FixDeposit | 入金を確定し、確定金額と金種別枚数を取得する。 |
| ㉟ | private | void | PFixDeposit | CashChanger の FixDeposit を呼び出す。 |
| ㊱ | private | int | OPOSCash_DispenseCashAsync | 非同期モードで金種別払出を実行し、結果を async result として受け取る。 |
| ㊲ | private | int | OPOSCash_DispenseCash | 払出口と金種別枚数を指定して払出を実行する。 |
| ㊳ | private | void | PDispenseCash | CashChanger の DispenseCash を呼び出す。 |
| ㊴ | private | int | OPOSCash_DispenseChange | 払出口と金額を指定して払出を実行する。 |
| ㊵ | private | void | PDispenseChange | CashChanger の DispenseChange を呼び出す。 |
| ㊶ | private | void | PCurrentExit | CurrentExit プロパティを設定する。 |
| ㊷ | private | int | OPOSCash_DepositDataRead | 計数中データを DirectIO で取得し、金種別の枚数文字列へ整形する。 |
| ㊸ | private | int | OPOSCash_CoinStatus | 硬貨部の収納状態を DirectIO で取得し、金種別 status 文字列へ整形する。 |
| ㊹ | private | string | Read_IconFile | 外部連携用の INI またはアイコン状態ファイルを読み書きする。 |
| ㊺ | private | string | GetIni | 外部連携用の INI またはアイコン状態ファイルを読み書きする。 |
| ㊻ | private | int | OPOSCash_Enq | 自動釣銭機全体の状態を取得し、状態コードとエラー情報を更新する。 |
| ㊼ | private | int | OPOSCash_ClearInput | 自動釣銭機の入力状態を ClearInput でクリアする。 |
| ㊽ | private | void | PClearInput | CashChanger の ClearInput を呼び出す。 |
| ㊾ | private | int | OPOSCash_ErrGuidance | エラーガイダンス表示コマンドを実行し、必要に応じてガイダンスウィンドウを前面へ出す。 |
| ㊿ | private | void | pDirectIO_Async | 非同期 DirectIO を実行し、非同期完了イベントで結果を受ける。 |
| ⑤① | private | void | PAsyncMode | AsyncMode プロパティを設定する。 |
| ⑤② | private | long | OPOSCash_AsyncEnd | 非同期処理を終了し、DeviceEnabled を無効化して排他を解放する。 |
| ⑤③ | private | void | PPowerNotify | PowerNotify プロパティを設定する。 |

## メソッド詳細

### ①. CashChangerByRt300Form

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public CashChangerByRt300Form()` |
| 可視性 | public |
| 戻り値 | - |
| 戻り値内容 | - |

処理内容:

- ① InitializeComponent を呼び、OPOS CashChanger OCX とフォーム部品を生成する。
- ② Load、FormClosing、Shown の各イベントへハンドラーを登録する。
- ③ 以後の初期化処理は DevForm_Load/DevForm_Shown で実行する。

備考: -

### ②. DevForm_Load

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void DevForm_Load(object sender, EventArgs e)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| object | イベント発生元 | sender |
| EventArgs | イベント情報 | e |

処理内容:

- ① ロードフラグを初期化し、UI スレッドと AppDomain の例外ハンドラーを登録する。
- ② フォームを画面外へ移動し、自動釣銭機関連のグローバル結果を初期化する。
- ③ 共有メモリ TURIREQ/TURIANS を作成し、既存内容をクリアする。
- ④ 要求/応答ファイルのパスとタイマー間隔を設定し、タイマーは停止状態にする。

備考: -

### ③. DevForm_Shown

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void DevForm_Shown(object sender, EventArgs e)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| object | イベント発生元 | sender |
| EventArgs | イベント情報 | e |

処理内容:

- ① 初回表示だけ処理し、フォームを hide する。
- ② DeviceId/DeviceName を TabletDeviceInfo に登録し、Device_Open を実行する。
- ③ Visible 設定に応じて taskbar 表示とフォーム位置を調整する。
- ④ Claim、PowerNotify、DeviceEnabled を順に実行し、初回排他エラーはログに残す。
- ⑤ 自動釣銭機監視タイマーとファイル連携タイマーを開始する。

備考: -

### ④. DevForm_FormClosing

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void DevForm_FormClosing(object sender, FormClosingEventArgs e)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| object | イベント発生元 | sender |
| FormClosingEventArgs | イベント情報 | e |

処理内容:

- ① 終了ログを出力する。
- ② 共有メモリ TURIREQ/TURIANS を破棄する。
- ③ TabletDeviceInfo から対象 DeviceId を探す。
- ④ 対象 OPOS CashChanger が opened の場合は Device_Close を実行する。

備考: -

### ⑤. OnThreadException

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void OnThreadException(object sender, ThreadExceptionEventArgs t)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| object | イベント発生元 | sender |
| ThreadExceptionEventArgs | スレッド例外情報 | t |

処理内容:

- ① 例外が ExternalException か確認する。
- ② error code が -2147417843 の場合は既知の COM 呼び出し競合として無視する。
- ③ それ以外は元例外を inner exception にして再throwする。

備考: -

### ⑥. OnUnhandledThreadException

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void OnUnhandledThreadException(object sender, UnhandledExceptionEventArgs t)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| object | イベント発生元 | sender |
| UnhandledExceptionEventArgs | 未処理例外情報 | t |

処理内容:

- ① UnhandledException の ExceptionObject を ExternalException として確認する。
- ② error code が -2147417843 の場合は既知の COM 呼び出し競合として無視する。
- ③ それ以外は元例外を inner exception にして再throwする。

備考: -

### ⑦. AxOPOSCashChanger1_DataEvent

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void AxOPOSCashChanger1_DataEvent(object sender, _IOPOSCashChangerEvents_DataEventEvent e)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| object | イベント発生元 | sender |
| _IOPOSCashChangerEvents_DataEventEvent | イベント情報 | e |

処理内容:

- ① ログ抑制フラグを一時退避する。
- ② DataEvent 発生回数を加算する。
- ③ イベント状態を自動釣銭機ログへ出力する。
- ④ ログ抑制フラグを元に戻す。

備考: -

### ⑧. AxOPOSCashChanger1_DirectIOEvent

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void AxOPOSCashChanger1_DirectIOEvent(object sender, _IOPOSCashChangerEvents_DirectIOEventEvent e)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| object | イベント発生元 | sender |
| _IOPOSCashChangerEvents_DirectIOEventEvent | イベント情報 | e |

処理内容:

- ① ログ抑制フラグを一時退避し、イベント番号を DiEvent に保持する。
- ② DirectIOEvent の内容を自動釣銭機ログへ出力する。
- ③ AsyncMode 中はイベント番号を GsAsyncDirectIoEvents へ重複なしで追加する。
- ④ ログ抑制フラグを元に戻す。

備考: -

### ⑨. AxOPOSCashChanger1_StatusUpdateEvent

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void AxOPOSCashChanger1_StatusUpdateEvent(object sender, _IOPOSCashChangerEvents_StatusUpdateEventEvent e)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| object | イベント発生元 | sender |
| _IOPOSCashChangerEvents_StatusUpdateEventEvent | イベント情報 | e |

処理内容:

- ① status data を DiStatus に保持し、自動釣銭機ログへ出力する。
- ② AsyncMode 中は status を GsAsyncStatusUpdateEvents へ重複なしで追加する。
- ③ 非同期完了 status の場合は AsyncResultCode/Extended を保存し、GbAsyncResult を true にする。
- ④ jam 等の異常 status は追加状態取得と戻り値保存へつなげる。

備考: -

### ⑩. IsArrayEx

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public bool IsArrayEx(ref string[] sPrm)` |
| 可視性 | public |
| 戻り値 | bool |
| 戻り値内容 | 非同期イベント配列が利用可能な状態か確認した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string[] | パラメータ配列 | sPrm |

処理内容:

- ① 対象配列の Length にアクセスし、配列参照が有効か確認する。
- ② 正常に参照できた場合は true を返却する。
- ③ 例外が発生した場合は Err をクリアし、false を返却する。

備考: -

### ⑪. OposCashMng

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void OposCashMng()` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

処理内容:

- ① OPOSCashChanger1 の状態、共有メモリ、ファイル連携要求を確認する。
- ② 受信した自動釣銭機コマンド、DirectIO、イベント結果、エラーガイダンスを処理する。
- ③ 処理結果を共有メモリ/応答ファイルまたは内部状態へ反映し、次回監視に備える。

備考: -

### ⑫. Timer1_Tick

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void Timer1_Tick(object sender, EventArgs e)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| object | イベント発生元 | sender |
| EventArgs | イベント情報 | e |

処理内容:

- ① Timer1 を停止する。
- ② GlOposCashReslt が 107 の場合はフォームを close して終了する。
- ③ AsyncMode でない場合だけ OposCashMng を呼び、自動釣銭機管理処理を実行する。
- ④ タイマー間隔を既定値に戻し、Timer1 を再開する。

備考: -

### ⑬. OPOSCash_DepositAmount

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_DepositAmount(ref int lDepositAmount, ref string sDepostCounts, ref int lErr, ref string sErr, [Optional, DefaultParameterValue(true)] ref bool bLogPut)` |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | BeginDeposit 後の入金額と金種別枚数を取得した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | 入金金額 | lDepositAmount |
| string | 入金枚数データ | sDepostCounts |
| int | エラーコード | lErr |
| string | エラーメッセージ | sErr |
| bool | ログ出力フラグ | bLogPut |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### ⑭. OPOSCash_DirectIO

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_DirectIO(int lCommand, ref int pData, ref string pString, ref int lErr, ref string sErr)` |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | 指定 command、pData、pString で CashChanger DirectIO を同期実行した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | DirectIOコマンド | lCommand |
| int | DirectIOデータ | pData |
| string | DirectIO文字列 | pString |
| int | エラーコード | lErr |
| string | エラーメッセージ | sErr |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### ⑮. PDirectIo

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PDirectIo(int lCmd, ref int pData, ref string pString)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | DirectIOコマンド | lCmd |
| int | DirectIOデータ | pData |
| string | DirectIO文字列 | pString |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### ⑯. OPOSCash_Seisa

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_Seisa(ref string sSeisaData, ref int lErr, ref string sErr)` |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | 精査 DirectIO を実行し、収納庫・回収ボックス別の収納データ。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | 精算データ | sSeisaData |
| int | エラーコード | lErr |
| string | エラーメッセージ | sErr |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### ⑰. OposCashResltMsg

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private string OposCashResltMsg(ref int lRlt, ref int lRsltEx)` |
| 可視性 | private |
| 戻り値 | string |
| 戻り値内容 | ResultCode/ResultCodeExtended とデバイス状態から表示用エラーメッセージを決定した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | 結果コード | lRlt |
| int | 拡張結果コード | lRsltEx |

処理内容:

- ① ResultCode、ResultCodeExtended、および OPOSCashChanger の DeviceStatus/FullStatus を参照する。
- ② OPOS 標準エラーと自動釣銭機固有エラーを判定し、表示用メッセージを選択する。
- ③ 必要に応じて lRsltEx を自動釣銭機固有エラーへ補正し、メッセージ文字列を返却する。

備考: -

### ⑱. PReleaseDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PReleaseDevice()` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### ⑲. PGetDepositCounts

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private string PGetDepositCounts(bool bLogPut)` |
| 可視性 | private |
| 戻り値 | string |
| 戻り値内容 | DepositCounts を取得し、ログ出力した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| bool | ログ出力フラグ | bLogPut |

処理内容:

- ① 対象プロパティを OPOS CashChanger または内部状態から取得する。
- ② 取得値を必要に応じてログへ出力する。
- ③ 取得値を呼出元へ返す。

備考: -

### ⑳. PGetDepositAmount

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int PGetDepositAmount(bool bLogPut)` |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | DepositAmount を取得し、ログ出力した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| bool | ログ出力フラグ | bLogPut |

処理内容:

- ① 対象プロパティを OPOS CashChanger または内部状態から取得する。
- ② 取得値を必要に応じてログへ出力する。
- ③ 取得値を呼出元へ返す。

備考: -

### ㉑. PDeviceEnabled2

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PDeviceEnabled2(bool bVal, [Optional, DefaultParameterValue(true)] ref bool bLogPut)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| bool | 設定フラグ | bVal |
| bool | ログ出力フラグ | bLogPut |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### ㉒. PFreezeEvents

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PFreezeEvents(bool bVal)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| bool | 設定フラグ | bVal |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### ㉓. PDataEventEnabled

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PDataEventEnabled(bool bVal)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| bool | 設定フラグ | bVal |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### ㉔. PDeviceEnabled

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PDeviceEnabled(bool bVal, [Optional, DefaultParameterValue(true)] ref bool bLogPut)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| bool | 設定フラグ | bVal |
| bool | ログ出力フラグ | bLogPut |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### ㉕. PClaimDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PClaimDevice([Optional, DefaultParameterValue(true)] ref bool bLogPut)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| bool | ログ出力フラグ | bLogPut |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### ㉖. OPOSCash_FullStatus

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_FullStatus([Optional, DefaultParameterValue(true)] ref bool bLogPut)` |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | CashChanger の FullStatus を取得した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| bool | ログ出力フラグ | bLogPut |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### ㉗. PGetFullStatus

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int PGetFullStatus([Optional, DefaultParameterValue(true)] ref bool bLogPut)` |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | FullStatus を取得し、ログ出力した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| bool | ログ出力フラグ | bLogPut |

処理内容:

- ① 対象プロパティを OPOS CashChanger または内部状態から取得する。
- ② 取得値を必要に応じてログへ出力する。
- ③ 取得値を呼出元へ返す。

備考: -

### ㉘. TmrErrGuide_Tick

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void TmrErrGuide_Tick(object sender, EventArgs e)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| object | イベント発生元 | sender |
| EventArgs | イベント情報 | e |

処理内容:

- ① 現在のタイマー間隔を退避し、タイマーを停止する。
- ② GbErrDisp が true の場合はエラーガイダンス window を前面に戻す。
- ③ 退避した間隔を戻し、タイマーを再開する。
- ④ VB Err 状態をクリアする。

備考: -

### ㉙. TimFile_Tick

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void TimFile_Tick(object sender, EventArgs e)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| object | イベント発生元 | sender |
| EventArgs | イベント情報 | e |

処理内容:

- ① タイマーを停止し、共有メモリ要求または要求ファイルの有無を確認する。
- ② 要求を読み取り、空データまたは読込エラーはログ出力して処理を抜ける。
- ③ ReplyMessage の場合は保存済み応答を再送する。
- ④ デバイスメソッド（DeviceMethod）の場合は DeviceId、methodId、handle を解析し、対象デバイスが起動済みであれば File_Method を実行する。
- ⑤ 戻りペイロードと ReturnValue を応答文字列へ追加し、共有メモリまたは応答ファイルへ書き込む。
- ⑥ 応答文字列を再送用ストックに保存し、タイマーを再開する。

備考: -

### ㉚. File_Method

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int File_Method(TabletDeviceMethodID methodId, Dictionary<string, string> arguments, ref Dictionary<string, string> returns)` |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | ファイル/メモリ連携から来た自動釣銭機コマンドをデバイスメソッド（DeviceMethod）と同等の分岐で実行した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| TabletDeviceMethodID | デバイスメソッドID | methodId |
| Dictionary<string, string> | 入力引数 | arguments |
| Dictionary<string, string> | 戻り値格納先 | returns |

処理内容:

- ① ハンドル、同期区分、プログラムIDを要求辞書から取得する。
- ② 別 handle の処理が残っている場合は async 状態と内部処理状態を解除する。
- ③ Answer/DataEventCount/AsyncStatusGet/AsyncEventGet は保持済み状態または実行中状態を返す。
- ④ 同期指定の場合は methodId ごとに OPOSCash_* を呼び、必要な戻り値を辞書に設定する。
- ⑤ 非同期指定の場合は非同期開始/終了、DirectIO、DispenseCash、DepositAmount など限定コマンドを処理する。
- ⑥ ResultCode、ResultCodeExtended、ErrorMessage を設定し、エラー時はエラーガイダンスを表示する。

備考: -

### ㉛. OPOSCash_EndDeposit_FlagON

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_EndDeposit_FlagON()` |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | EndDeposit 完了フラグを立て、入金終了処理が完了した状態を記録した結果。 |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### ㉜. OPOSCash_EndDeposit

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_EndDeposit(int lSuccess, ref int lErr, ref string sErr)` |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | 入金終了区分に従って EndDeposit を実行し、Begin/End 間の排他状態を解除した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | 処理成功区分 | lSuccess |
| int | エラーコード | lErr |
| string | エラーメッセージ | sErr |

処理内容:

- ① 処理開始ログを出力する。
- ② Claim と DeviceEnabled を実行する。
- ③ success 区分を指定して EndDeposit を呼ぶ。
- ④ 完了状態に応じて Begin/End フラグと handle を更新する。
- ⑤ 必要な場合は DeviceEnabled と排他を解除し、結果を返す。

備考: -

### ㉝. PEndDeposit

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PEndDeposit(int success)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | 処理成功区分 | success |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### ㉞. OPOSCash_FixDeposit

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_FixDeposit(ref int lErr, ref string sErr, ref int lDepositAmount, ref string sDepositCounts)` |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | 入金を確定し、確定金額と金種別枚数を取得した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | エラーコード | lErr |
| string | エラーメッセージ | sErr |
| int | 入金金額 | lDepositAmount |
| string | 入金枚数データ | sDepositCounts |

処理内容:

- ① 処理開始ログを出力する。
- ② Claim と DeviceEnabled を実行する。
- ③ FixDeposit を呼び、確定金額と金種別枚数を取得する。
- ④ BeginDeposit 中でなければ DeviceEnabled と排他を解除し、結果を返す。

備考: -

### ㉟. PFixDeposit

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PFixDeposit()` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### ㊱. OPOSCash_DispenseCashAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_DispenseCashAsync(int lCurrentExit, string sCashCounts, ref int lErr, ref string sErr)` |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | 非同期モードで金種別払出を実行し、結果を async result として受け取った結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | 出金口 | lCurrentExit |
| string | 金種別枚数文字列 | sCashCounts |
| int | エラーコード | lErr |
| string | エラーメッセージ | sErr |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### ㊲. OPOSCash_DispenseCash

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_DispenseCash(int lCurrentExit, string sCashCounts, ref int lErr, ref string sErr)` |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | 払出口と金種別枚数を指定して払出を実行した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | 出金口 | lCurrentExit |
| string | 金種別枚数文字列 | sCashCounts |
| int | エラーコード | lErr |
| string | エラーメッセージ | sErr |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### ㊳. PDispenseCash

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PDispenseCash(string cashCounts)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | 金種別枚数 | cashCounts |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### ㊴. OPOSCash_DispenseChange

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_DispenseChange(int lCurrentExit, int lAmount, ref int lErr, ref string sErr)` |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | 払出口と金額を指定して払出を実行した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | 出金口 | lCurrentExit |
| int | 金額 | lAmount |
| int | エラーコード | lErr |
| string | エラーメッセージ | sErr |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### ㊵. PDispenseChange

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PDispenseChange(int amount)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | 金額 | amount |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### ㊶. PCurrentExit

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PCurrentExit(int lVal)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | 設定値 | lVal |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### ㊷. OPOSCash_DepositDataRead

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_DepositDataRead(ref string sDepositData, ref int lErr, ref string sErr)` |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | 計数中データを DirectIO で取得し、金種別の枚数文字列へ整形した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | 入金データ | sDepositData |
| int | エラーコード | lErr |
| string | エラーメッセージ | sErr |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### ㊸. OPOSCash_CoinStatus

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_CoinStatus(ref string sStatus, ref int lErr, ref string sErr)` |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | 硬貨部の収納状態を DirectIO で取得し、金種別 status 文字列へ整形した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | 状態文字列 | sStatus |
| int | エラーコード | lErr |
| string | エラーメッセージ | sErr |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### ㊹. Read_IconFile

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private string Read_IconFile(string sKey)` |
| 可視性 | private |
| 戻り値 | string |
| 戻り値内容 | 外部連携用の INI またはアイコン状態ファイルを読み書きした結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | キー文字列 | sKey |

処理内容:

- ① 対象ファイルパスと key/value を準備する。
- ② INI またはアイコン状態ファイルを読み書きする。
- ③ 結果値または成功可否を返す。

備考: -

### ㊺. GetIni

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private string GetIni(string apName, string keyName, string defaults, string filename)` |
| 可視性 | private |
| 戻り値 | string |
| 戻り値内容 | 外部連携用の INI またはアイコン状態ファイルを読み書きした結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | アプリケーション名 | apName |
| string | キー名 | keyName |
| string | 既定値 | defaults |
| string | ファイル名 | filename |

処理内容:

- ① 対象ファイルパスと key/value を準備する。
- ② INI またはアイコン状態ファイルを読み書きする。
- ③ 結果値または成功可否を返す。

備考: -

### ㊻. OPOSCash_Enq

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_Enq(ref int lErr, ref string sErr)` |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | 自動釣銭機全体の状態を取得し、状態コードとエラー情報を更新した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | エラーコード | lErr |
| string | エラーメッセージ | sErr |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### ㊼. OPOSCash_ClearInput

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_ClearInput(ref int lErr, ref string sErr)` |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | 自動釣銭機の入力状態を ClearInput でクリアした結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | エラーコード | lErr |
| string | エラーメッセージ | sErr |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### ㊽. PClearInput

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PClearInput()` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### ㊾. OPOSCash_ErrGuidance

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int OPOSCash_ErrGuidance(int hwnd, int lControl, string sPointer, ref int lErr, ref string sErr)` |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | エラーガイダンス表示コマンドを実行し、必要に応じてガイダンスウィンドウを前面へ出した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | ウィンドウハンドル | hwnd |
| int | 制御値 | lControl |
| string | ガイダンス参照文字列 | sPointer |
| int | エラーコード | lErr |
| string | エラーメッセージ | sErr |

処理内容:

- ① 表示位置の指定がない場合は既定位置を設定する。
- ② Claim と DeviceEnabled を実行する。
- ③ DirectIO/guide 表示に必要な制御値を渡す。
- ④ window 操作でガイダンスを前面表示し、結果とエラー内容を返す。

備考: -

### ㊿. pDirectIO_Async

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void pDirectIO_Async(int lCmd, ref int pData, ref string pString, bool bErrGuide = false)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | DirectIOコマンド | lCmd |
| int | DirectIOデータ | pData |
| string | DirectIO文字列 | pString |
| bool | エラーガイダンス表示フラグ | bErrGuide |

処理内容:

- ① 非同期結果保持用の GbAsyncResult、GlAsyncResultCode、GlAsyncResultCodeEx を初期化する。
- ② OPOSCashChanger が同期モードの場合は FreezeEvents を解除し、AsyncMode を true に切り替える。
- ③ DirectIO を実行し、DoEvents と待機を繰り返して非同期完了フラグを待つ。
- ④ 実行結果をログ出力し、元が同期モードだった場合は AsyncMode を false に戻す。

備考: -

### ⑤①. PAsyncMode

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PAsyncMode(bool bVal)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| bool | 設定フラグ | bVal |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### ⑤②. OPOSCash_AsyncEnd

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private long OPOSCash_AsyncEnd()` |
| 可視性 | private |
| 戻り値 | long |
| 戻り値内容 | 非同期処理を終了し、DeviceEnabled を無効化して排他を解放した結果。 |

処理内容:

- ① 処理開始ログを出力する。
- ② DeviceEnabled を false に設定する。
- ③ 排他を解放する。
- ④ 処理終了ログを出力する。

備考: -

### ⑤③. PPowerNotify

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PPowerNotify(int lVal)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | 設定値 | lVal |

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

- 本フォームはデバッグ／開発者向けの管理画面ではなく、OPOS／OCX 操作時のスレッド/COM 関連エラーを避けるための内部フォームとして扱う。
- 通常運用時は画面としてユーザーに操作させることを前提としない。
- Designer.cs の自動生成部品初期化は仕様記載範囲から除外する。
