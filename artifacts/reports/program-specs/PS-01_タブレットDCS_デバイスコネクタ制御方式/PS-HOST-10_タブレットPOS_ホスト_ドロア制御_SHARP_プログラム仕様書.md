# PS-HOST-10 タブレットPOS ホスト ドロア制御 SHARP プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-HOST-10 |
| 文書名 | タブレットPOS ホスト ドロア制御 SHARP プログラム仕様書 |
| 対象 | タブレットPOS / ドロア制御 SHARP |
| 版数 | 0.0.4 |
| 作成日 | 2026/06/19 |
| 作成者 | VTI サム, VTI 吉田 |
| レビュー担当 | SMJ 蒲田 |
| 承認者 | SMJ 蒲田 |
| 目的 | 対象クラスの構造、フィールド／プロパティ及びメソッド仕様を定義する。 |
| 期待成果 | 実装及びレビューで参照するクラス単位の仕様を明確にする。 |

## 01_改訂履歴

| 版数 | 日付 | 変更内容 | 作成者 | 承認者 |
| --- | --- | --- | --- | --- |
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
| ソースファイル | sources/tabletposboilerplate/TabetPos.Host/src/TabletDevice/CashDrawer/CashDrawerBySharp/CashDrawerBySharp.cs |
| 対象クラス | CashDrawerBySharp |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

SHARP ドロアの開放操作を提供するデバイス制御部。タブレットPOS端末アプリの要求をドロア制御部品へ渡し、排他制御と実行結果の返却を行う。

### 主な責務

- ドロア制御部品を準備し、操作可能な状態にする。
- ドロア開放要求を受け付けて実機操作を実行する。
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
| ③ | public | int | DeviceMethod | OpenDrawer だけを処理し、実行結果を ResultCode/ResultCodeExtended として返す。 |
| ④ | public | void | Device_Mng | ドロアは常時監視を行わないため、周期タイマーを停止する。 |

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
| 戻り値内容 | OpenDrawer だけを処理し、実行結果を ResultCode/ResultCodeExtended。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| TabletDeviceMethodID | デバイスメソッドID | methodId |
| Dictionary<string, string> | 入力引数 | arguments |
| Dictionary<string, string> | 戻り値格納先 | returns |

処理内容:

- ① resultCode/resultCodeExtended を -1 で初期化する。
- ② methodId が OpenDrawer の場合だけ Device_Start を実行する。
- ③ Device_Start 成功時に OCX OpenDrawer を呼び、ResultCodeExtended を取得する。
- ④ Device_End で排他を解放し、returns に ResultCode/ResultCodeExtended を設定する。

備考: -

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
- ② タイマー有効状態を false にする。
- ③ ドロアはイベント監視を継続しないため、追加処理は行わない。

備考: -

## 処理フロー/注意事項

- StartDevice が CashDrawerBySharpForm を生成する。
- DeviceMethod が OpenDrawer を検出して OCX OpenDrawer を呼び出す。
- Device_Mng はタイマーを停止して常時監視処理を行わない。

### 注意事項

- 未対応 methodId の場合、既定の resultCode=-1 を返却する。
