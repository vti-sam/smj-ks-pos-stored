# PS-HOST-07 タブレットPOS ホスト デバイスベース プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.2 | 2026/06/21 | VTI サム | クラス仕様、フィールド/プロパティ、メソッド仕様を更新 |
| 0.0.1 | 2026/06/19 | VTI サム | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-HOST-07 |
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
| ソースファイル | sources/KsPosBoilerplate/TabetPos.Host/src/KsDevice/DeviceBase/DeviceBase.cs |
| 対象クラス | DeviceBase |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

OPOS/OCX デバイス制御に共通する接続、占有、解放、監視の基本機能を提供する基底部品。個別デバイスの実装はこの共通機能を利用し、機種固有の操作だけを補う構成とする。

### 主な責務

- デバイス接続、占有、解放などの共通手順を提供する。
- 周期監視によりデバイス状態確認と継続動作を支援する。
- 派生デバイスが固有操作を実装できる共通の受け口を用意する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| フィールド | protected | bool | EndOrder | デバイス制御終了要求を示すフラグ。 |
| フィールド | protected | Timer | LoopTimer | デバイス周期処理用タイマー。 |
| フィールド | protected | Form | MyForm | OCX を保持するフォーム。 |
| フィールド | protected | dynamic | MyDevice | OPOS/OCX デバイスインスタンス。 |
| フィールド | protected | KsDeviceId | MyDeviceId | 対象デバイスID。 |
| フィールド | protected | bool | IsSimulator | 実機ではなく simulator として動作するかを示すフラグ。 |
| フィールド | protected | bool | IsClaimDeviceReleaseDevice | Claim/Release 操作を ClaimDevice/ReleaseDevice として扱うかを示すフラグ。 |
| フィールド | protected | DateTime | _keepAliveDateTime | device manager の応答監視で参照する最終処理継続時刻。 |
| フィールド | protected | bool | PMntRun | timer_tick 内で Device_Mng 実行中であることを示すフラグ。 |
| プロパティ | public | KsDeviceId | KsDeviceId | MyDeviceId を公開するデバイス識別 ID。 |
| プロパティ | public | DateTime | KeepAliveDateTime | 最終 keep-alive 時刻を公開し、device manager の応答監視に使用する。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | public | int | GetForegroundWindow | Windows の foreground window handle を取得する。 |
| 2 | protected | - | DeviceBase | 100ms timer を設定し、派生デバイス共通の周期処理基盤を初期化する。 |
| 3 | public | void | timer_tick | keep-alive を更新し、timer を止めて Device_Mng を実行した後、終了指示がなければ timer を再開する。 |
| 4 | public | void | Device_Mng | 基底クラスでは周期監視処理を行わず、派生クラスで必要な処理を実装する。 |
| 5 | public | int | Data_Check | 基底クラスでは読込データ検証を実装せず、既定値 -1 を返す。 |
| 6 | public | void | PutLog | DeviceLog.ProcessInfo へデバイスログメッセージを出力する。 |
| 7 | public | int | Device_Open | OPOS デバイスを Open し、管理状態を opened に更新する。 |
| 8 | public | int | Device_Close | 必要に応じて Release したうえで OPOS デバイスを Close する。 |
| 9 | public | int | Device_Claim | OPOS デバイスの排他取得を実行する。 |
| 10 | public | int | Device_Release | OPOS デバイスの排他を解放する。 |
| 11 | public | int | Device_Start | Claim、DeviceEnabled、DataEventEnabled など読込開始状態を設定する。 |
| 12 | public | int | Device_End | DataEventEnabled、DeviceEnabled、Release など読込終了状態を設定する。 |
| 13 | public | int | Device_End | DataEventEnabled、DeviceEnabled、Release など読込終了状態を設定する。 |
| 14 | public | void | StartDevice | 対象デバイスIDを保持し、OCXを配置したフォームとタイマー同期先を初期化する。 |
| 15 | public | void | StopDevice | 終了指示を立て、実行中の Device_Mng を最大約3秒待ち、フォームを close/dispose する。 |
| 16 | public | int | DeviceMethod | 基底クラスではデバイス固有メソッドを実行せず、既定値 -1 を返す。 |
| 17 | public | int | DeviceUse | 基底クラスでは使用開始処理を実装せず、既定値 -1 を返す。 |
| 18 | public | int | DeviceUnUse | 基底クラスでは使用終了処理を実装せず、既定値 -1 を返す。 |

## メソッド詳細

### 1. GetForegroundWindow

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public static extern int GetForegroundWindow();` |
| 可視性 | public |
| 戻り値 | int |

処理内容:

- ① user32.dll の GetForegroundWindow API を呼び出す。
- ② 現在ユーザーが操作している foreground window handle を取得する。
- ③ 取得した handle を timer_tick から Device_Mng へ渡すための値として返す。

備考: -

### 2. DeviceBase

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `protected DeviceBase()` |
| 可視性 | protected |
| 戻り値 | - |

処理内容:

- ① LoopTimer の Elapsed event に timer_tick を登録する。
- ② interval=100ms、AutoReset=true、Enabled=true に設定し、周期処理を開始できる状態にする。
- ③ keep-alive 時刻を初期化し、device manager の応答監視に備える。

備考: -

### 3. timer_tick

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public virtual void timer_tick(object sender, EventArgs e)` |
| 可視性 | public |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| object | イベント発生元 | sender |
| EventArgs | イベント情報 | e |

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

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| object | デバイスオブジェクト | oDevice |
| IntPtr | 前面ウィンドウハンドル | foreHandl |

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

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | 入力文字列 | sInData |
| string | 出力文字列 | sOutData |
| int | 出力数値 | lOutData |

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

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | ログメッセージ | sMessage |

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

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| dynamic | デバイスオブジェクト | oDevice |

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

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| dynamic | デバイスオブジェクト | oDevice |

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

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| dynamic | デバイスオブジェクト | oDevice |

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

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| dynamic | デバイスオブジェクト | oDevice |

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

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| dynamic | デバイスオブジェクト | oDevice |
| bool | イベント開始フラグ | bEventStart |
| bool | 自動無効化フラグ | bAutoDisable |

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

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| dynamic | デバイスオブジェクト | oDevice |
| bool | イベント停止フラグ | bEventStop |
| bool | 解放実行フラグ | bRelease |

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

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| dynamic | デバイスオブジェクト | oDevice |
| bool | デバイス停止フラグ | bDeviceStop |
| bool | イベント停止フラグ | bEventStop |
| bool | 解放実行フラグ | bRelease |

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

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| KsDeviceId | デバイスID | devId |

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

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| KsDeviceMethodID | デバイスメソッドID | methodId |
| Dictionary<string, string> | 入力引数 | arguments |
| Dictionary<string, string> | 戻り値格納先 | returns |

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

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Dictionary<string, string> | 入力引数 | arguments |
| Dictionary<string, string> | 戻り値格納先 | returns |

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

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Dictionary<string, string> | 入力引数 | arguments |
| Dictionary<string, string> | 戻り値格納先 | returns |

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
