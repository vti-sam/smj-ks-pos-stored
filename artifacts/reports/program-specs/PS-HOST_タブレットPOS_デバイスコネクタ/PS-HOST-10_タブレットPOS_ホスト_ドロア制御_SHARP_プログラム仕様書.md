# PS-HOST-10 タブレットPOS ホスト ドロア制御 SHARP プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-HOST-10 |
| 文書名 | タブレットPOS ホスト ドロア制御 SHARP プログラム仕様書 |
| 対象 | タブレットPOS / ドロア制御 SHARP |
| 版数 | 0.0.5 |
| 作成日 | 2026/06/19 |
| 作成者 | VTI サム, VTI 吉田 |
| レビュー担当 | SMJ 蒲田 |
| 承認者 | SMJ 蒲田 |
| 目的 | 対象クラスの構造、フィールド／プロパティ及びメソッド仕様を定義する。 |
| 期待成果 | 実装及びレビューで参照するクラス単位の仕様を明確にする。 |

## 01_改訂履歴

| 版数 | 日付 | 変更内容 | 作成者 | 承認者 |
| --- | --- | --- | --- | --- |
| 0.0.5 | 2026/08/24 | 使用開始・終了、状態確認、OPOS共通操作、DirectIO、Close待機、プロパティ取得、および拡張結果取得を現行ソースへ反映 | VTI サム | SMJ 蒲田 |
| 0.0.4 | 2026/07/23 | ARCH-HOST-01に合わせて、ドロアとタブレットPOS端末アプリの表記を統一 | VTI サム |  |
| 0.0.3 | 2026/06/25 | 内部フォームの表示扱いを明確化 | VTI サム |  |
| 0.0.2 | 2026/06/21 | クラス仕様、フィールド/プロパティ、メソッド仕様を更新 | VTI サム |  |
| 0.0.1 | 2026/06/19 | 初版作成 | VTI サム |  |

## クラス情報

| 項目 | 内容 |
| --- | --- |
| 機能名 | ドロア制御 SHARP |
| 物理クラス名 | CashDrawerBySharp |
| 名前空間 | TabletOutProcess.TabletDeviceServer |
| アクセス修飾子 | public |
| 継承/実装 | DeviceBase |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/TabletPosBoilerplate/TabletPos.Host/src/TabletDevice/CashDrawer/CashDrawerBySharp/CashDrawerBySharp.cs |
| 対象クラス | CashDrawerBySharp |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

SHARPドロアの開放、状態確認、OPOS共通操作、および保守操作を提供するデバイス制御部。タブレットPOS端末アプリの要求をドロア制御部品へ渡し、排他制御と実行結果の返却を行う。

### 主な責務

- ドロア制御部品を準備し、操作可能な状態にする。
- ドロア開放要求を受け付けて実機操作を実行する。
- 使用開始・終了、開閉状態確認、ヘルスチェック、統計、プロパティ、DirectIO、およびClose待機を処理する。
- 操作前後の排他制御と結果通知を行う。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| フィールド | private static readonly | string[] | OposPropertyNames | 共通項目とドロア固有項目を含むOPOSプロパティ取得対象。 |
| フィールド | private | CashDrawerBySharpForm | _oFrm | デバイス制御用フォーム。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | public | void | StartDevice | 対象デバイスIDを保持し、OCXを配置したフォームとタイマー同期先を初期化する。 |
| ② | public | void | StopDevice | デバイス制御を終了し、タイマー停止とフォーム解放を実行する。 |
| ③ | public | int | DeviceMethod | ドロア開放、状態確認、OPOS共通操作、DirectIO、およびClose待機を実行する。 |
| ④ | public | void | Device_Mng | ドロアは常時監視を行わないため、周期タイマーを停止する。 |
| ⑤ | public | int | DeviceUse | Open状態を使用開始結果として返す。 |
| ⑥ | public | int | DeviceUnUse | 使用終了の正常結果を返す。 |
| ⑦ | private | int | GetResultCodeExtended | OPOS拡張結果コードを安全に取得する。 |

## メソッド詳細

### ①. StartDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public override void StartDevice(TabletDeviceId devId)` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| TabletDeviceId | デバイスID | devId |

処理内容:

- ① 基底 StartDevice を呼び、対象 DeviceId を保持する。
- ② CashDrawerBySharpForm を生成し、MyForm と MyDevice にフォーム/Drawer OCX を設定する。
- ③ フォーム側へ Device と DeviceId を渡す。
- ④ タイマーの SynchronizingObject を内部フォームへ設定し、表示有無は内部フォーム側の設定に従う。

備考: -

### ②. StopDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public override void StopDevice()` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

処理内容:

- ① 基底 StopDevice を呼び、タイマー停止、処理中待機、フォーム解放を実行する。
- ② ドロア固有の追加終了処理はこのメソッドでは行わない。

備考: -

### ③. DeviceMethod

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public override int DeviceMethod(TabletDeviceMethodID methodId, Dictionary<string, string> arguments, ref Dictionary<string, string> returns)` |
| 可視性 | public |
| 戻り値 | int |
| 戻り値内容 | 指定操作の結果コード（ResultCode）。拡張結果コード（ResultCodeExtended）および操作固有結果は戻り値辞書に設定する。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| TabletDeviceMethodID | デバイスメソッドID | methodId |
| Dictionary<string, string> | 入力引数 | arguments |
| Dictionary<string, string> | 戻り値格納先 | returns |

処理内容:

- ① 結果コード（resultCode）と拡張結果コード（resultCodeExtended）を「-1」で初期化する。
- ② ドロア開放（OpenDrawer）の場合はデバイスを開始し、OCXのドロア開放処理後に排他を解放する。
- ③ ドロア状態確認（CheckDrawerStatus）の場合はデバイスを開始し、DrawerOpened、結果コード、および拡張結果コードを取得してfinallyで排他を解放する。
- ④ ヘルスチェック、統計取得・リセット・更新、OPOSプロパティ取得、DirectIO、またはClose待機の場合はデバイスを開始する。
- ⑤ ヘルスチェックはLevelを必須とし、CheckHealthTextを返す。
- ⑥ 統計取得はCapStatisticsReportingがfalseの場合に未対応能力を設定して正常結果を返し、対応時はStatisticsBufferを返す。
- ⑦ 統計リセット・更新はCapUpdateStatisticsがfalseの場合に未対応能力を設定して正常結果を返し、対応時はStatisticsBufferを必須としてOPOS処理を呼ぶ。
- ⑧ OPOSプロパティ取得はOposPropertyNamesの値を戻り値辞書へ追加する。
- ⑨ DirectIOはCommand、pData_IN、およびpString_INを必須とし、pData_OUTとpString_OUTを返す。
- ⑩ Close待機はBeepTimeout、BeepFrequency、BeepDuration、およびBeepDelayを必須としてWaitForDrawerCloseを呼ぶ。
- ⑪ ④から⑩の操作はfinallyで排他を解放する。
- ⑫ 結果コードと拡張結果コードを戻り値辞書へ設定し、結果コードを返す。

備考: 必須引数がない場合はOPOSの不正引数結果を返す。能力未対応は通信失敗ではなく、未対応能力を明示した正常応答として返す。

### ④. Device_Mng

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public override void Device_Mng(object oDevice, IntPtr foreHandl)` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| object | デバイスオブジェクト | oDevice |
| IntPtr | 前面ウィンドウハンドル | foreHandl |

処理内容:

- ① 周期タイマーを停止する。
- ② タイマーを無効にする。
- ③ ドロアはイベント監視を継続しないため、追加処理は行わない。

備考: -

### ⑤. DeviceUse

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public override int DeviceUse(Dictionary<string, string> arguments, ref Dictionary<string, string> returns)` |
| 可視性 | public |
| 戻り値 | int |
| 戻り値内容 | Open済みの場合はOPOS正常、未Openの場合はClosedエラー。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Dictionary<string, string> | 入力引数 | arguments |
| Dictionary<string, string> | 戻り値格納先 | returns |

処理内容:

- ① 共通管理状態からOpen済みか判定する。
- ② Open済みの場合は正常結果、未Openの場合はClosedエラーを設定する。
- ③ 結果コードと安全に取得した拡張結果コードを戻り値辞書へ設定し、結果コードを返す。

備考: 本メソッドは新たなOpenやClaimを実行しない。

### ⑥. DeviceUnUse

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public override int DeviceUnUse(Dictionary<string, string> arguments, ref Dictionary<string, string> returns)` |
| 可視性 | public |
| 戻り値 | int |
| 戻り値内容 | OPOS正常結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Dictionary<string, string> | 入力引数 | arguments |
| Dictionary<string, string> | 戻り値格納先 | returns |

処理内容:

- ① 正常結果と安全に取得した拡張結果コードを戻り値辞書へ設定する。
- ② 正常結果を返す。

備考: 実際の排他解放は各操作の終了処理またはHost停止時に行う。

### ⑦. GetResultCodeExtended

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int GetResultCodeExtended()` |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | OCXの拡張結果コード。取得例外時は0。 |

処理内容:

- ① ドロアOCXから拡張結果コードを取得する。
- ② 取得時に例外が発生した場合は0を返す。

備考: 使用開始・終了およびデバイス開始失敗時の応答生成で使用する。

## 処理フロー/注意事項

- StartDevice が CashDrawerBySharpForm を生成する。
- DeviceUseとDeviceUnUseがHostの共通デバイスライフサイクル結果を返す。
- DeviceMethodがOpenDrawer、CheckDrawerStatus、OPOS共通操作、DirectIO、およびClose待機を処理する。
- Device_Mng はタイマーを停止して常時監視処理を行わない。

### 注意事項

- 未対応 methodId の場合、既定の resultCode=-1 を返却する。
