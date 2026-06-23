# PS-HOST-08 タブレットPOS ホスト 釣銭機制御 RT-300 プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.2 | 2026/06/21 | VTI | クラス仕様、フィールド/プロパティ、メソッド仕様を更新 |
| 0.0.1 | 2026/06/19 | VTI | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-HOST-08 |
| プロジェクト名 | タブレットPOS |
| 機能名 | 釣銭機制御 RT-300 |
| 物理クラス名 | CashChangerByRt300 |
| 名前空間 | TabletOutProcess.TabletDeviceServer |
| アクセス修飾子 | public |
| 継承/実装 | CashChangerBase |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/tabletposboilerplate/TabetPos.Host/src/TabletDevice/CashChanger/CashChangerByRT300/CashChangerByRT300.cs |
| 対象クラス | CashChangerByRt300 |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

RT-300 釣銭機に対する入出金、精算、状態照会、エラー案内などの業務操作を提供するデバイス制御部。POS 側の操作要求を釣銭機向けの OPOS 制御へ変換し、同期・非同期の処理結果を返す。

### 主な責務

- 入金、出金、精算、在高照会などの釣銭機操作を受け付ける。
- 釣銭機の状態取得とエラー案内表示を制御する。
- UI スレッド上の釣銭機制御部品と連携して実機操作を行う。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| フィールド | private | CashChangerByRt300 | _instance | RT-300 釣銭機制御 singleton instance。 |
| フィールド | private | CashChangerByRt300Form | _oFrm | デバイス制御用フォーム。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | public | int | UpdateWindow | user32 UpdateWindow を呼び出し、指定したウィンドウハンドルの描画更新を要求する。 |
| 2 | public | CashChangerByRt300 | GetInstance | Singleton インスタンスを返却する。 |
| 3 | public | void | StartDevice | 対象デバイスIDを保持し、OCXを配置したフォームとタイマー同期先を初期化する。 |
| 4 | public | void | StopDevice | デバイス制御を終了し、タイマー停止とフォーム解放を実行する。 |
| 5 | public | int | DeviceMethod | RT-300 の methodId、handle、同期区分を判定し、同期/非同期の OPOS 操作と戻り値生成を制御する。 |
| 6 | public | int | OPOSCash_EndDeposit_FlagON | EndDeposit 完了フラグを立て、入金終了処理が完了した状態を記録する。 |
| 7 | public | int | OPOSCash_Seisa | 精査 DirectIO を実行し、収納庫・回収ボックス別の収納データを返却する。 |
| 8 | public | int | OPOSCash_DepositMode | 計数機/釣銭機モードの照会または設定を DirectIO で実行する。 |
| 9 | public | int | OPOSCash_DepositDataRead | 計数中データを DirectIO で取得し、金種別の枚数文字列へ整形する。 |
| 10 | public | int | OPOSCash_BillStatus | 紙幣部の収納状態を DirectIO で取得し、金種別 status 文字列へ整形する。 |
| 11 | public | int | OPOSCash_CoinStatus | 硬貨部の収納状態を DirectIO で取得し、金種別 status 文字列へ整形する。 |
| 12 | public | int | OPOSCash_Enq | 釣銭機全体の状態を取得し、状態コードとエラー情報を更新する。 |
| 13 | public | int | OPOSCash_DepositAmount | BeginDeposit 後の入金額と金種別枚数を取得する。 |
| 14 | public | int | OPOSCash_DirectIO | 指定 command、pData、pString で CashChanger DirectIO を同期実行する。 |
| 15 | public | int | OPOSCash_ClearInput | 釣銭機の入力状態を ClearInput でクリアする。 |
| 16 | public | int | OPOSCash_DispenseCash | 払出口と金種別枚数を指定して払出を実行する。 |
| 17 | public | int | OPOSCash_DispenseChange | 払出口と金額を指定して払出を実行する。 |
| 18 | public | int | OPOSCash_Collect | 指定された回収 command で紙幣/硬貨の回収処理を実行する。 |
| 19 | public | int | OPOSCash_ReadCashCounts | 釣銭機内の現金在高を取得し、不一致有無も返却する。 |
| 20 | public | int | OPOSCash_PauseDeposit | 計数処理の一時停止または再開を実行する。 |
| 21 | public | int | OPOSCash_BeginDeposit | 排他取得と DeviceEnabled 設定後、入金計数を開始する。 |
| 22 | public | int | OPOSCash_FixDeposit | 入金を確定し、確定金額と金種別枚数を取得する。 |
| 23 | public | int | OPOSCash_EndDeposit | 入金終了区分に従って EndDeposit を実行し、Begin/End 間の排他状態を解除する。 |
| 24 | public | int | OPOSCash_OpenDrawer | 釣銭機側の棒金ドロア制御 command を実行する。 |
| 25 | public | int | OPOSCash_FullStatus | CashChanger の FullStatus を取得する。 |
| 26 | private | int | PGetFullStatus | FullStatus を取得し、ログ出力する。 |
| 27 | private | int | PGetDepositStatus | DepositStatus を取得し、ログ出力する。 |
| 28 | private | int | PGetDepositAmount | DepositAmount を取得し、ログ出力する。 |
| 29 | private | string | PGetDepositCounts | DepositCounts を取得し、ログ出力する。 |
| 30 | private | int | PGetResultCode | ResultCode を取得し、ログ出力する。 |
| 31 | private | int | PGetResultCodeExtended | ResultCodeExtended を取得し、ログ出力する。 |
| 32 | private | void | PPowerNotify | PowerNotify プロパティを設定する。 |
| 33 | private | void | PDeviceEnabled | DeviceEnabled プロパティを設定し、結果コードを保持する。 |
| 34 | private | void | PDataEventEnabled | DataEventEnabled プロパティを設定する。 |
| 35 | private | void | PFreezeEvents | FreezeEvents プロパティを設定する。 |
| 36 | private | void | PCurrentExit | CurrentExit プロパティを設定する。 |
| 37 | private | void | PAsyncMode | AsyncMode プロパティを設定する。 |
| 38 | private | void | PDirectIo | OPOS CashChanger の DirectIO を呼び出す。 |
| 39 | public | void | pDirectIO_Async | 非同期 DirectIO を実行し、非同期完了イベントで結果を受ける。 |
| 40 | public | void | GOposCashOpen | 互換用に定義された空実装 method。 |
| 41 | public | void | GOposCashClose | 互換用に定義された空実装 method。 |
| 42 | private | void | PClaimDevice | CashChanger の排他取得を実行し、結果コードを保持する。 |
| 43 | private | void | PReleaseDevice | CashChanger の排他を解放する。 |
| 44 | private | void | PClearInput | CashChanger の ClearInput を呼び出す。 |
| 45 | private | void | PBeginDeposit | CashChanger の BeginDeposit を呼び出す。 |
| 46 | private | void | PFixDeposit | CashChanger の FixDeposit を呼び出す。 |
| 47 | private | void | PEndDeposit | CashChanger の EndDeposit を呼び出す。 |
| 48 | private | void | PPauseDeposit | CashChanger の PauseDeposit を呼び出す。 |
| 49 | private | void | PReadCashCounts | CashChanger の ReadCashCounts を呼び出す。 |
| 50 | private | void | PDispenseChange | CashChanger の DispenseChange を呼び出す。 |
| 51 | private | void | PDispenseCash | CashChanger の DispenseCash を呼び出す。 |
| 52 | private | void | PDeviceEnabled2 | 異常時の復旧用に DeviceEnabled を再設定する。 |
| 53 | public | string | OposCashResltMsg | ResultCode/ResultCodeExtended とデバイス状態から表示用エラーメッセージを決定する。 |
| 54 | public | bool | Write_IconFile | 外部連携用の INI またはアイコン状態ファイルを読み書きする。 |
| 55 | public | string | Read_IconFile | 外部連携用の INI またはアイコン状態ファイルを読み書きする。 |
| 56 | private | string | GetIni | 外部連携用の INI またはアイコン状態ファイルを読み書きする。 |
| 57 | private | bool | SetIni | 外部連携用の INI またはアイコン状態ファイルを読み書きする。 |
| 58 | public | int | OPOSCash_ErrGuidance | エラーガイダンス表示 command を実行し、必要に応じて guide window を前面へ出す。 |
| 59 | public | int | OPOSCash_AsyncStart | 非同期処理用に排他と DeviceEnabled を設定し、AsyncMode 開始状態へ移行する。 |
| 60 | public | long | OPOSCash_AsyncEnd | 非同期処理を終了し、DeviceEnabled を無効化して排他を解放する。 |
| 61 | public | int | OPOSCash_DispenseCashAsync | 非同期モードで金種別払出を実行し、結果を async result として受け取る。 |
| 62 | public | int | OPOSCash_DirectIOAsync | 非同期モードで DirectIO を実行し、イベント結果を後続取得へ渡す。 |

## メソッド詳細

### 1. UpdateWindow

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public static extern int UpdateWindow(int hwnd);` |
| 可視性 | public |
| 戻り値 | int |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | ウィンドウハンドル | hwnd |

処理内容:

- ① 呼出元から window handle を受け取る。
- ② user32.dll の UpdateWindow を呼び、対象 window の再描画を要求する。
- ③ Win32 API の戻り値をそのまま返す。

備考: -

### 2. GetInstance

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public static CashChangerByRt300 GetInstance()` |
| 可視性 | public |
| 戻り値 | CashChangerByRt300 |

処理内容:

- ① _instance が null の場合だけ CashChangerByRt300 を生成する。
- ② 生成済みの場合は既存 instance を再利用する。
- ③ singleton instance を返す。

備考: -

### 3. StartDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public override void StartDevice(TabletDeviceId devId)` |
| 可視性 | public |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| TabletDeviceId | デバイスID | devId |

処理内容:

- ① 基底 StartDevice を呼び、対象 DeviceId を保持する。
- ② CashChangerByRt300Form を生成し、PMyForm と PMyDevice にフォーム/OCX を設定する。
- ③ フォーム側へ Device と DeviceId を渡す。
- ④ timer の SynchronizingObject を OCX を持つフォームへ設定し、フォームを表示する。

備考: -

### 4. StopDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public override void StopDevice()` |
| 可視性 | public |
| 戻り値 | void |

処理内容:

- ① 基底 StopDevice を呼び、timer 停止、処理中待機、フォーム解放を実行する。
- ② 釣銭機固有の追加終了処理はこの method では行わない。

備考: -

### 5. DeviceMethod

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public override int DeviceMethod(TabletDeviceMethodID methodId, Dictionary<string, string> arguments, ref Dictionary<string, string> returns)` |
| 可視性 | public |
| 戻り値 | int |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| TabletDeviceMethodID | デバイスメソッドID | methodId |
| Dictionary<string, string> | 入力引数 | arguments |
| Dictionary<string, string> | 戻り値格納先 | returns |

処理内容:

- ① 対象釣銭機が opened 状態か確認し、未 open の場合は ResultCode=-1 を返す。
- ② handle、同期区分、program id を arguments から取得し、既存処理中 handle と競合する場合は async 状態を解除する。
- ③ Answer/DataEventCount/AsyncStatusGet/AsyncEventGet は実行中状態または保持済み結果を返す。
- ④ 通常 command は GtOposCashRslt に command/handle/params を保持し、同期指定なら methodId ごとに OPOSCash_* を実行する。
- ⑤ 非同期指定なら AsyncStart/AsyncEnd/DirectIO/DispenseCash/DepositAmount だけを処理し、未対応は -2 を返す。
- ⑥ ResultCode、ResultCodeExtended、ErrorMessage と各 command 固有の戻り値を returns に設定する。
- ⑦ エラー時は必要に応じてエラーガイダンスを表示し、内部処理状態を終了状態へ戻す。

備考: -

### 6. OPOSCash_EndDeposit_FlagON

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int OPOSCash_EndDeposit_FlagON()` |
| 可視性 | public |
| 戻り値 | int |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### 7. OPOSCash_Seisa

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int OPOSCash_Seisa(ref string sSeisaData, ref int lErr, ref string sErr)` |
| 可視性 | public |
| 戻り値 | int |

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

### 8. OPOSCash_DepositMode

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int OPOSCash_DepositMode(int lMode, ref string sStatus, ref int lErr, ref string sErr)` |
| 可視性 | public |
| 戻り値 | int |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | 入金モード | lMode |
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

### 9. OPOSCash_DepositDataRead

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int OPOSCash_DepositDataRead(ref string sDepositData, ref int lErr, ref string sErr)` |
| 可視性 | public |
| 戻り値 | int |

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

### 10. OPOSCash_BillStatus

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int OPOSCash_BillStatus(ref string sStatus, ref int lErr, ref string sErr)` |
| 可視性 | public |
| 戻り値 | int |

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

### 11. OPOSCash_CoinStatus

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int OPOSCash_CoinStatus(ref string sStatus, ref int lErr, ref string sErr)` |
| 可視性 | public |
| 戻り値 | int |

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

### 12. OPOSCash_Enq

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int OPOSCash_Enq(ref int lErr, ref string sErr)` |
| 可視性 | public |
| 戻り値 | int |

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

### 13. OPOSCash_DepositAmount

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int OPOSCash_DepositAmount(ref int lDepositAmount, ref string sDepostCounts, ref int lErr, ref string sErr, [Optional, DefaultParameterValue(true)] ref bool bLogPut)` |
| 可視性 | public |
| 戻り値 | int |

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

### 14. OPOSCash_DirectIO

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int OPOSCash_DirectIO(int lCommand, ref int pData, ref string pString, ref int lErr, ref string sErr)` |
| 可視性 | public |
| 戻り値 | int |

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

### 15. OPOSCash_ClearInput

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int OPOSCash_ClearInput(ref int lErr, ref string sErr)` |
| 可視性 | public |
| 戻り値 | int |

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

### 16. OPOSCash_DispenseCash

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int OPOSCash_DispenseCash(int lCurrentExit, string sCashCounts, ref int lErr, ref string sErr)` |
| 可視性 | public |
| 戻り値 | int |

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

### 17. OPOSCash_DispenseChange

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int OPOSCash_DispenseChange(int lCurrentExit, int lAmount, ref int lErr, ref string sErr)` |
| 可視性 | public |
| 戻り値 | int |

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

### 18. OPOSCash_Collect

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int OPOSCash_Collect(string sCmd, ref int lErr, ref string sErr)` |
| 可視性 | public |
| 戻り値 | int |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | 回収コマンド | sCmd |
| int | エラーコード | lErr |
| string | エラーメッセージ | sErr |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### 19. OPOSCash_ReadCashCounts

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int OPOSCash_ReadCashCounts(ref string sCashCounts, ref bool bDiscrepancy, ref int lErr, ref string sErr)` |
| 可視性 | public |
| 戻り値 | int |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | 金種別枚数文字列 | sCashCounts |
| bool | 不一致有無 | bDiscrepancy |
| int | エラーコード | lErr |
| string | エラーメッセージ | sErr |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### 20. OPOSCash_PauseDeposit

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int OPOSCash_PauseDeposit(int lControl, ref int lErr, ref string sErr)` |
| 可視性 | public |
| 戻り値 | int |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | 制御値 | lControl |
| int | エラーコード | lErr |
| string | エラーメッセージ | sErr |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### 21. OPOSCash_BeginDeposit

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int OPOSCash_BeginDeposit(ref int lErr, ref string sErr)` |
| 可視性 | public |
| 戻り値 | int |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | エラーコード | lErr |
| string | エラーメッセージ | sErr |

処理内容:

- ① 処理開始ログを出力する。
- ② Claim と DeviceEnabled を順に実行する。
- ③ BeginDeposit を呼び、ResultCode/ResultCodeExtended を取得する。
- ④ BeginDeposit 中の排他状態を保持し、結果とエラーメッセージを返す。

備考: -

### 22. OPOSCash_FixDeposit

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int OPOSCash_FixDeposit(ref int lErr, ref string sErr, ref int lDepositAmount, ref string sDepositCounts)` |
| 可視性 | public |
| 戻り値 | int |

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

### 23. OPOSCash_EndDeposit

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int OPOSCash_EndDeposit(int lSuccess, ref int lErr, ref string sErr)` |
| 可視性 | public |
| 戻り値 | int |

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

### 24. OPOSCash_OpenDrawer

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int OPOSCash_OpenDrawer(int lControl, ref int lErr, ref string sErr)` |
| 可視性 | public |
| 戻り値 | int |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | 制御値 | lControl |
| int | エラーコード | lErr |
| string | エラーメッセージ | sErr |

処理内容:

- ① 処理開始ログを出力する。
- ② 必要な引数、排他状態、DeviceEnabled 状態を確認する。
- ③ 対象の OPOS メソッドまたは DirectIO を実行する。
- ④ ResultCode/ResultCodeExtended と必要な戻り値を取得する。
- ⑤ 異常時は復旧用の DeviceEnabled 操作やエラーメッセージ設定を行い、結果を返す。

備考: -

### 25. OPOSCash_FullStatus

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int OPOSCash_FullStatus([Optional, DefaultParameterValue(true)] ref bool bLogPut)` |
| 可視性 | public |
| 戻り値 | int |

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

### 26. PGetFullStatus

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int PGetFullStatus([Optional, DefaultParameterValue(true)] ref bool bLogPut)` |
| 可視性 | private |
| 戻り値 | int |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| bool | ログ出力フラグ | bLogPut |

処理内容:

- ① 対象プロパティを OPOS CashChanger または内部状態から取得する。
- ② 取得値を必要に応じてログへ出力する。
- ③ 取得値を呼出元へ返す。

備考: -

### 27. PGetDepositStatus

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int PGetDepositStatus()` |
| 可視性 | private |
| 戻り値 | int |

処理内容:

- ① 対象プロパティを OPOS CashChanger または内部状態から取得する。
- ② 取得値を必要に応じてログへ出力する。
- ③ 取得値を呼出元へ返す。

備考: -

### 28. PGetDepositAmount

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int PGetDepositAmount(bool bLogPut)` |
| 可視性 | private |
| 戻り値 | int |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| bool | ログ出力フラグ | bLogPut |

処理内容:

- ① 対象プロパティを OPOS CashChanger または内部状態から取得する。
- ② 取得値を必要に応じてログへ出力する。
- ③ 取得値を呼出元へ返す。

備考: -

### 29. PGetDepositCounts

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private string PGetDepositCounts(bool bLogPut)` |
| 可視性 | private |
| 戻り値 | string |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| bool | ログ出力フラグ | bLogPut |

処理内容:

- ① 対象プロパティを OPOS CashChanger または内部状態から取得する。
- ② 取得値を必要に応じてログへ出力する。
- ③ 取得値を呼出元へ返す。

備考: -

### 30. PGetResultCode

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int PGetResultCode()` |
| 可視性 | private |
| 戻り値 | int |

処理内容:

- ① 対象プロパティを OPOS CashChanger または内部状態から取得する。
- ② 取得値を必要に応じてログへ出力する。
- ③ 取得値を呼出元へ返す。

備考: -

### 31. PGetResultCodeExtended

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int PGetResultCodeExtended()` |
| 可視性 | private |
| 戻り値 | int |

処理内容:

- ① 対象プロパティを OPOS CashChanger または内部状態から取得する。
- ② 取得値を必要に応じてログへ出力する。
- ③ 取得値を呼出元へ返す。

備考: -

### 32. PPowerNotify

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PPowerNotify(int lVal)` |
| 可視性 | private |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | 設定値 | lVal |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 33. PDeviceEnabled

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PDeviceEnabled(bool bVal, [Optional, DefaultParameterValue(true)] ref bool bLogPut)` |
| 可視性 | private |
| 戻り値 | void |

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

### 34. PDataEventEnabled

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PDataEventEnabled(bool bVal)` |
| 可視性 | private |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| bool | 設定フラグ | bVal |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 35. PFreezeEvents

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PFreezeEvents(bool bVal)` |
| 可視性 | private |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| bool | 設定フラグ | bVal |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 36. PCurrentExit

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PCurrentExit(int lVal)` |
| 可視性 | private |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | 設定値 | lVal |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 37. PAsyncMode

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PAsyncMode(bool bVal)` |
| 可視性 | private |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| bool | 設定フラグ | bVal |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 38. PDirectIo

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PDirectIo(int lCmd, ref int pData, ref string pString)` |
| 可視性 | private |
| 戻り値 | void |

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

### 39. pDirectIO_Async

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void pDirectIO_Async(int lCmd, ref int pData, ref string pString, bool bErrGuide = false)` |
| 可視性 | public |
| 戻り値 | void |

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

### 40. GOposCashOpen

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void GOposCashOpen(string sVal)` |
| 可視性 | public |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | 設定文字列 | sVal |

処理内容:

- ① 呼出し引数を受け取る。
- ② 現行実装では OPOS CashChanger の Open 呼出しを行わない。
- ③ 互換用 method として戻り値なしで終了する。

備考: 現行実装では空実装。

### 41. GOposCashClose

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void GOposCashClose()` |
| 可視性 | public |
| 戻り値 | void |

処理内容:

- ① Close 要求を受け取る。
- ② 現行実装では OPOS CashChanger の Close 呼出しを行わない。
- ③ 互換用 method として戻り値なしで終了する。

備考: 現行実装では空実装。

### 42. PClaimDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PClaimDevice([Optional, DefaultParameterValue(true)] ref bool bLogPut)` |
| 可視性 | private |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| bool | ログ出力フラグ | bLogPut |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 43. PReleaseDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PReleaseDevice()` |
| 可視性 | private |
| 戻り値 | void |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 44. PClearInput

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PClearInput()` |
| 可視性 | private |
| 戻り値 | void |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 45. PBeginDeposit

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PBeginDeposit()` |
| 可視性 | private |
| 戻り値 | void |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 46. PFixDeposit

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PFixDeposit()` |
| 可視性 | private |
| 戻り値 | void |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 47. PEndDeposit

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PEndDeposit(int success)` |
| 可視性 | private |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | 処理成功区分 | success |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 48. PPauseDeposit

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PPauseDeposit(int control)` |
| 可視性 | private |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | 制御値 | control |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 49. PReadCashCounts

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PReadCashCounts(ref string pCashCounts, ref bool bDiscrepancy)` |
| 可視性 | private |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | 金種別枚数出力 | pCashCounts |
| bool | 不一致有無 | bDiscrepancy |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 50. PDispenseChange

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PDispenseChange(int amount)` |
| 可視性 | private |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | 金額 | amount |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 51. PDispenseCash

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PDispenseCash(string cashCounts)` |
| 可視性 | private |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | 金種別枚数 | cashCounts |

処理内容:

- ① 設定値または呼出引数を受け取る。
- ② 対応する OPOS プロパティ設定または低レベルメソッドを実行する。
- ③ ResultCode/ResultCodeExtended やログ出力用状態を更新する。

備考: -

### 52. PDeviceEnabled2

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void PDeviceEnabled2(bool bVal, [Optional, DefaultParameterValue(true)] ref bool bLogPut)` |
| 可視性 | private |
| 戻り値 | void |

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

### 53. OposCashResltMsg

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public string OposCashResltMsg(ref int lRlt, ref int lRsltEx)` |
| 可視性 | public |
| 戻り値 | string |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | 結果コード | lRlt |
| int | 拡張結果コード | lRsltEx |

処理内容:

- ① ResultCode、ResultCodeExtended、および OPOSCashChanger の DeviceStatus/FullStatus を参照する。
- ② OPOS 標準エラーと釣銭機固有エラーを判定し、表示用メッセージを選択する。
- ③ 必要に応じて lRsltEx を釣銭機固有エラーへ補正し、メッセージ文字列を返却する。

備考: -

### 54. Write_IconFile

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public bool Write_IconFile(string sKey, string sValue)` |
| 可視性 | public |
| 戻り値 | bool |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | キー文字列 | sKey |
| string | 設定値 | sValue |

処理内容:

- ① 対象ファイル path と key/value を準備する。
- ② INI またはアイコン状態ファイルを読み書きする。
- ③ 結果値または成功可否を返す。

備考: -

### 55. Read_IconFile

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public string Read_IconFile(string sKey)` |
| 可視性 | public |
| 戻り値 | string |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | キー文字列 | sKey |

処理内容:

- ① 対象ファイル path と key/value を準備する。
- ② INI またはアイコン状態ファイルを読み書きする。
- ③ 結果値または成功可否を返す。

備考: -

### 56. GetIni

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private string GetIni(string apName, string keyName, string defaults, string filename)` |
| 可視性 | private |
| 戻り値 | string |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | アプリケーション名 | apName |
| string | キー名 | keyName |
| string | 既定値 | defaults |
| string | ファイル名 | filename |

処理内容:

- ① 対象ファイル path と key/value を準備する。
- ② INI またはアイコン状態ファイルを読み書きする。
- ③ 結果値または成功可否を返す。

備考: -

### 57. SetIni

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private bool SetIni(string apName, string keyName, string sValue, string filename)` |
| 可視性 | private |
| 戻り値 | bool |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | アプリケーション名 | apName |
| string | キー名 | keyName |
| string | 設定値 | sValue |
| string | ファイル名 | filename |

処理内容:

- ① 対象ファイル path と key/value を準備する。
- ② INI またはアイコン状態ファイルを読み書きする。
- ③ 結果値または成功可否を返す。

備考: -

### 58. OPOSCash_ErrGuidance

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int OPOSCash_ErrGuidance(int hwnd, int lControl, string sPointer, ref int lErr, ref string sErr)` |
| 可視性 | public |
| 戻り値 | int |

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

### 59. OPOSCash_AsyncStart

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int OPOSCash_AsyncStart()` |
| 可視性 | public |
| 戻り値 | int |

処理内容:

- ① 処理開始ログを出力する。
- ② Claim と DeviceEnabled を設定する。
- ③ AsyncMode 用の状態を開始状態にする。
- ④ 結果コードを保存して返す。

備考: -

### 60. OPOSCash_AsyncEnd

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public long OPOSCash_AsyncEnd()` |
| 可視性 | public |
| 戻り値 | long |

処理内容:

- ① 処理開始ログを出力する。
- ② DeviceEnabled を false に設定する。
- ③ 排他を解放する。
- ④ 処理終了ログを出力する。

備考: -

### 61. OPOSCash_DispenseCashAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int OPOSCash_DispenseCashAsync(int lCurrentExit, string sCashCounts, ref int lErr, ref string sErr)` |
| 可視性 | public |
| 戻り値 | int |

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

### 62. OPOSCash_DirectIOAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int OPOSCash_DirectIOAsync(int lCommand, ref int pData, ref string pString, ref int lErr, ref string sErr)` |
| 可視性 | public |
| 戻り値 | int |

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
## 処理フロー/注意事項

- StartDevice がフォームと OCX 参照を構成する。
- DeviceMethod が open 状態、同期フラグ、method ID を判定して処理を分岐する。
- OPOSCash_* が OPOS API 実行結果を payload に反映する。
- Async 系は非同期結果状態を保持して後続応答へ返す。

### 注意事項

- private P* method は OPOS プロパティ取得/設定の低レベル補助として document 化する。
