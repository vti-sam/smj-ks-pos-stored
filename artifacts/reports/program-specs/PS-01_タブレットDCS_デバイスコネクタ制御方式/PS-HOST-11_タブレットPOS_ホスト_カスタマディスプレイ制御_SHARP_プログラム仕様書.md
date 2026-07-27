# PS-HOST-11 タブレットPOS ホスト カスタマディスプレイ制御 SHARP プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-HOST-11 |
| 文書名 | タブレットPOS ホスト カスタマディスプレイ制御 SHARP プログラム仕様書 |
| 対象 | タブレットPOS / カスタマディスプレイ制御 SHARP |
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
| 0.0.4 | 2026/07/23 | ARCH-HOST-01に合わせて、カスタマディスプレイとタブレットPOS端末アプリの表記を統一 | VTI サム |  |
| 0.0.3 | 2026/06/25 | 内部フォームの表示扱いを明確化 | VTI サム |  |
| 0.0.2 | 2026/06/21 | クラス仕様、フィールド/プロパティ、メソッド仕様を更新 | VTI サム |  |
| 0.0.1 | 2026/06/19 | 初版作成 | VTI サム |  |

## クラス情報

| 項目 | 内容 |
| --- | --- |
| 機能名 | カスタマディスプレイ制御 SHARP |
| 物理クラス名 | CustomerDisplayBySharp |
| 名前空間 | TabletOutProcess.TabletDeviceServer |
| アクセス修飾子 | public |
| 継承/実装 | DeviceBase |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/tabletposboilerplate/TabetPos.Host/src/TabletDevice/CustomerDisplay/CustomerDisplayBySharp/CustomerDisplayBySharp.cs |
| 対象クラス | CustomerDisplayBySharp |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

SHARP カスタマディスプレイへの表示制御を提供するデバイス制御部。タブレットPOS端末アプリの表示要求をディスプレイ制御部品へ渡し、文字表示、消去、スクロール、直接表示制御を実行する。

### 主な責務

- 表示器制御部品を準備し、操作可能な状態にする。
- 表示消去、文字表示、スクロールなどの表示要求を処理する。
- 操作前後の排他制御と結果通知を行う。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| フィールド | private | CustomerDisplayBySharpForm | _oFrm | デバイス制御用フォーム。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | public | void | StartDevice | 対象デバイスIDを保持し、OCXを配置したフォームとタイマー同期先を初期化する。 |
| ② | public | void | StopDevice | デバイス制御を終了し、タイマー停止とフォーム解放を実行する。 |
| ③ | public | int | DeviceMethod | 表示クリア、文字表示、スクロール、DirectIO 表示を methodId と引数に応じて実行する。 |
| ④ | public | void | Device_Mng | カスタマディスプレイは常時監視を行わないため、周期タイマーを停止する。 |
| ⑤ | private | int | LinDsp | 区分0では表示文字列を DirectIO 用データへ変換し、それ以外では表示をクリアする。 |

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
- ② CustomerDisplayBySharpForm を生成し、MyForm と MyDevice に CustomerDisplay OCX を設定する。
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

- ① EndOrder を true に設定する。
- ② 基底 StopDevice を呼び、タイマー停止、処理中待機、フォーム解放を実行する。

備考: -

### ③. DeviceMethod

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public override int DeviceMethod(TabletDeviceMethodID methodId, Dictionary<string, string> arguments, ref Dictionary<string, string> returns)` |
| 可視性 | public |
| 戻り値 | int |
| 戻り値内容 | 表示クリア、文字表示、スクロール、DirectIO 表示を methodId と引数に応じて実行した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| TabletDeviceMethodID | デバイスメソッドID | methodId |
| Dictionary<string, string> | 入力引数 | arguments |
| Dictionary<string, string> | 戻り値格納先 | returns |

処理内容:

- ① 命令ごとに Device_Start を実行し、ディスプレイを有効化する。
- ② methodId に応じて ClearDescriptors、ClearText、DisplayText、DisplayTextAt、ScrollText、LinDsp、LinDspTelop を実行する。
- ③ 必要な引数が不足する場合は初期値 ResultCode=-1 のまま返す。
- ④ Device_End で排他を解放し、ResultCode/ResultCodeExtended を returns に設定する。

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
- ③ カスタマディスプレイはイベント監視を継続しないため、追加処理は行わない。

備考: -

### ⑤. LinDsp

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int LinDsp(ref int kbn, string data)` |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | 区分0では表示文字列を DirectIO 用データへ変換し、それ以外では表示をクリアした結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | 表示区分 | kbn |
| string | 表示データ | data |

処理内容:

- ① kbn が 0 の場合は文字列を Unicode byte 配列から DirectIO 用文字列へ組み立てる。
- ② command=0、pData=0 で DirectIO を実行する。
- ③ kbn が 0 以外の場合は ClearDescriptors を呼んで表示をクリアする。

備考: -

## 処理フロー/注意事項

- StartDevice が CustomerDisplayBySharpForm を生成する。
- DeviceMethod が methodId と必要引数を確認して OCX 操作を実行する。
- Device_Mng はタイマーを停止する。
- LinDsp が DirectIO 用文字列または ClearDescriptors を実行する。

### 注意事項

- 引数不足時は該当操作を実行せず、初期値 resultCode=-1 を返す。
