# PS-HOST-10 タブレットPOS ホスト キャッシュドロア制御 SHARP プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.2 | 2026/06/21 | VTI サム | クラス仕様、フィールド/プロパティ、メソッド仕様を更新 |
| 0.0.1 | 2026/06/19 | VTI サム | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-HOST-10 |
| プロジェクト名 | タブレットPOS |
| 機能名 | キャッシュドロア制御 SHARP |
| 物理クラス名 | CashDrawerBySharp |
| 名前空間 | KsOutProcess.KsDeviceServer |
| アクセス修飾子 | public |
| 継承/実装 | DeviceBase |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/KsPosBoilerplate/TabetPos.Host/src/KsDevice/CashDrawer/CashDrawerBySharp/CashDrawerBySharp.cs |
| 対象クラス | CashDrawerBySharp |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

SHARP キャッシュドロアの開放操作を提供するデバイス制御部。POS 側の要求をドロア制御部品へ渡し、排他制御と実行結果の返却を行う。

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
| 1 | public | void | StartDevice | 対象デバイスIDを保持し、OCXを配置したフォームとタイマー同期先を初期化する。 |
| 2 | public | void | StopDevice | デバイス制御を終了し、タイマー停止とフォーム解放を実行する。 |
| 3 | public | int | DeviceMethod | OpenDrawer だけを処理し、実行結果を ResultCode/ResultCodeExtended として返す。 |
| 4 | public | void | Device_Mng | ドロアは常時監視を行わないため、周期タイマーを停止する。 |

## メソッド詳細

### 1. StartDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public override void StartDevice(KsDeviceId devId)` |
| 可視性 | public |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| KsDeviceId | デバイスID | devId |

処理内容:

- ① 基底 StartDevice を呼び、対象 DeviceId を保持する。
- ② CashDrawerBySharpForm を生成し、MyForm と MyDevice にフォーム/Drawer OCX を設定する。
- ③ フォーム側へ Device と DeviceId を渡す。
- ④ タイマーの SynchronizingObject をフォームへ設定し、フォームを表示する。

備考: -

### 2. StopDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public override void StopDevice()` |
| 可視性 | public |
| 戻り値 | void |

処理内容:

- ① 基底 StopDevice を呼び、タイマー停止、処理中待機、フォーム解放を実行する。
- ② ドロア固有の追加終了処理はこのメソッドでは行わない。

備考: -

### 3. DeviceMethod

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public override int DeviceMethod(KsDeviceMethodID methodId, Dictionary<string, string> arguments, ref Dictionary<string, string> returns)` |
| 可視性 | public |
| 戻り値 | int |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| KsDeviceMethodID | デバイスメソッドID | methodId |
| Dictionary<string, string> | 入力引数 | arguments |
| Dictionary<string, string> | 戻り値格納先 | returns |

処理内容:

- ① resultCode/resultCodeExtended を -1 で初期化する。
- ② methodId が OpenDrawer の場合だけ Device_Start を実行する。
- ③ Device_Start 成功時に OCX OpenDrawer を呼び、ResultCodeExtended を取得する。
- ④ Device_End で排他を解放し、returns に ResultCode/ResultCodeExtended を設定する。

備考: -

### 4. Device_Mng

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public override void Device_Mng(object oDevice, IntPtr foreHandl)` |
| 可視性 | public |
| 戻り値 | void |

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
