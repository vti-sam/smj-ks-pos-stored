# PS-CONNECTOR-10 タブレットPOS デバイスコネクタ ドロア制御 SHARP プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-CONNECTOR-10 |
| 文書名 | タブレットPOS デバイスコネクタ ドロア制御 SHARP プログラム仕様書 |
| 対象 | タブレットPOS / ドロア制御 SHARP |
| 版数 | 0.1.1 |
| 作成日 | 2026/06/19 |
| 作成者 | SMJサム |
| レビュー担当 | SMJ 蒲田 |
| 承認者 | - |
| 目的 | 対象クラスの構造、フィールド／プロパティ及びメソッド仕様を定義する。 |
| 期待成果 | 実装及びレビューで参照するクラス単位の仕様を明確にする。 |

## 01_改訂履歴

| 版数 | 日付 | 変更内容 | 作成者 | 承認者 |
| --- | --- | --- | --- | --- |
| 0.1.1 | 2026/09/11 | システム名、資料名と参照先を統一しました。 | SMJサム | - |
| 0.1.0 | 2026/09/10 | POS統合構成のクラス、引数、処理内容に合わせて改訂。 | SMJサム | - |
| 0.0.0 | 2026/08/24 | 初版を作成しました。 | VTI サム | SMJ 蒲田 |

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
| ソースファイル | sources/pos-integration/Pos.DeviceConnector/src/TabletDevice/CashDrawer/CashDrawerBySharp/CashDrawerBySharp.cs |
| 対象クラス | CashDrawerBySharp |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

SHARPドロアの開放、状態確認、OPOS共通操作、および保守操作を提供するデバイス制御部。タブレットPOS端末アプリの要求をドロア制御部品へ渡し、排他制御と実行結果の返却を行う。

### 主な責務

- ドロア制御部品を準備し、操作可能な状態にする。
- ドロア開放要求を受け付けて実機操作を実行する。
- 使用開始と終了、開閉状態確認、稼働確認、直接制御、および閉鎖待機を処理する。
- 操作前後の排他制御と結果通知を行う。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| フィールド | private | CashDrawerBySharpForm | _oFrm | デバイス制御用フォーム。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | public | void | StartDevice | 対象デバイスIDを保持し、OCXを配置したフォームとタイマー同期先を初期化する。 |
| ② | public | void | StopDevice | デバイス制御を終了し、タイマー停止とフォーム解放を実行する。 |
| ③ | public | int | DeviceUse | Open状態を使用開始結果として返す。 |
| ④ | public | int | DeviceUnUse | 使用終了の正常結果を返す。 |
| ⑤ | public | int | DeviceMethod | ドロアの開放、状態確認、閉鎖待機と直接制御を実行する。 |
| ⑥ | private | int | GetResultCodeExtended | OPOS拡張結果コードを安全に取得する。 |
| ⑦ | public | void | Device_Mng | ドロアは常時監視を行わないため、周期タイマーを停止する。 |

## メソッド詳細

### ①. StartDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | public override void StartDevice(TabletDeviceId devId) |
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
| シグネチャ | public override void StopDevice() |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

処理内容:

- ① 基底 StopDevice を呼び、タイマー停止、処理中待機、フォーム解放を実行する。
- ② ドロア固有の追加終了処理はこのメソッドでは行わない。

備考: -

### ③. DeviceUse

| 項目 | 内容 |
| --- | --- |
| シグネチャ | public override int DeviceUse(Dictionary<string, string> arguments, ref Dictionary<string, string> returns) |
| 可視性 | public |
| 戻り値 | int |
| 戻り値内容 | Open済みの場合はOPOS正常、未Openの場合はClosedエラー。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Dictionary<string, string> | 入力引数 | arguments |
| ref Dictionary<string, string> | 戻り値格納先 | returns |

処理内容:

- ① 共通管理状態からOpen済みか判定する。
- ② Open済みの場合は正常結果、未Openの場合はClosedエラーを設定する。
- ③ 結果コードと安全に取得した拡張結果コードを戻り値辞書へ設定し、結果コードを返す。

備考: 本メソッドは新たなOpenやClaimを実行しない。

### ④. DeviceUnUse

| 項目 | 内容 |
| --- | --- |
| シグネチャ | public override int DeviceUnUse(Dictionary<string, string> arguments, ref Dictionary<string, string> returns) |
| 可視性 | public |
| 戻り値 | int |
| 戻り値内容 | OPOS正常結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Dictionary<string, string> | 入力引数 | arguments |
| ref Dictionary<string, string> | 戻り値格納先 | returns |

処理内容:

- ① 正常結果と安全に取得した拡張結果コードを戻り値辞書へ設定する。
- ② 正常結果を返す。

備考: 実際の排他解放は各操作の終了処理またはデバイスコネクタ停止時に行う。

### ⑤. DeviceMethod

| 項目 | 内容 |
| --- | --- |
| シグネチャ | public override int DeviceMethod(TabletDeviceMethodID methodId, Dictionary<string, string> arguments, ref Dictionary<string, string> returns) |
| 可視性 | public |
| 戻り値 | int |
| 戻り値内容 | 機器操作の結果コード。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| TabletDeviceMethodID | デバイスメソッドID | methodId |
| Dictionary<string, string> | 入力引数 | arguments |
| ref Dictionary<string, string> | 戻り値格納先 | returns |

処理内容:

- ① ドロア開放の場合は機器を使用可能にし、開放処理後に使用を終了する。
- ② 開閉状態確認の場合は開閉状態を戻り値へ設定し、終了処理で使用を解放する。
- ③ 稼働確認、直接制御、閉鎖待機の場合は機器の使用開始結果を確認する。
- ④ 稼働確認には確認レベル、直接制御にはコマンド、数値、文字列を使用する。直接制御の更新値を戻り値へ設定する。
- ⑤ 閉鎖待機には警告音の待機時間、周波数、鳴動時間、間隔を使用する。必要な引数がない場合は不正引数の結果を設定する。
- ⑥ これらの処理の終了時は使用を解放し、結果コードと拡張結果コードを戻り値辞書へ設定する。

備考: -

### ⑥. GetResultCodeExtended

| 項目 | 内容 |
| --- | --- |
| シグネチャ | private int GetResultCodeExtended() |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | OCXの拡張結果コード。取得例外時は0。 |

処理内容:

- ① ドロアOCXから拡張結果コードを取得する。
- ② 取得時に例外が発生した場合は0を返す。

備考: 使用開始・終了およびデバイス開始失敗時の応答生成で使用する。

### ⑦. Device_Mng

| 項目 | 内容 |
| --- | --- |
| シグネチャ | public override void Device_Mng(object oDevice, IntPtr foreHandl) |
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
