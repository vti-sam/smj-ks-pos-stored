# PS-CONNECTOR-11 タブレットPOS デバイスコネクタ カスタマディスプレイ制御 SHARP プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-CONNECTOR-11 |
| 文書名 | タブレットPOS デバイスコネクタ カスタマディスプレイ制御 SHARP プログラム仕様書 |
| 対象 | タブレットPOS / カスタマディスプレイ制御 SHARP |
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
| 機能名 | カスタマディスプレイ制御 SHARP |
| 物理クラス名 | CustomerDisplayBySharp |
| 名前空間 | TabletOutProcess.TabletDeviceServer |
| アクセス修飾子 | public |
| 継承/実装 | DeviceBase |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/pos-integration/Pos.DeviceConnector/src/TabletDevice/CustomerDisplay/CustomerDisplayBySharp/CustomerDisplayBySharp.cs |
| 対象クラス | CustomerDisplayBySharp |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

SHARPカスタマディスプレイへの表示制御を提供するデバイス制御部。使用開始と終了、対応能力の確認、文字表示、消去、スクロール、表示記号と表示領域の操作、および直接表示制御を実行する。

### 主な責務

- 表示器制御部品を準備し、操作可能な状態にする。
- 表示消去、文字表示、スクロールなどの表示要求を処理する。
- 操作前後の排他制御と結果通知を行う。
- 実機能力に対応しない操作は失敗扱いにせず、未対応能力を明示した正常結果として返す。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| フィールド | private | CustomerDisplayBySharpForm | _oFrm | デバイス制御用フォーム。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | public | void | StartDevice | 対象デバイスIDを保持し、OCXを配置したフォームとタイマー同期先を初期化する。 |
| ② | public | void | StopDevice | デバイス制御を終了し、タイマー停止とフォーム解放を実行する。 |
| ③ | public | int | DeviceUse | デバイスを使用可能状態へ移行し、主要能力を返す。 |
| ④ | public | int | DeviceUnUse | デバイスを使用終了状態へ移行する。 |
| ⑤ | private | int | EnsureDeviceStarted | Open・Claim・DeviceEnabled状態を確認し、必要な開始処理だけを実行する。 |
| ⑥ | private | void | AddCapabilities | 表示器の主要能力を戻り値辞書へ追加する。 |
| ⑦ | private | int | Complete | 結果コードと拡張結果コードを共通形式へ設定して返す。 |
| ⑧ | public | int | DeviceMethod | 表示、表示領域、稼働確認と直接制御を実行する。 |
| ⑨ | public | void | Device_Mng | カスタマディスプレイは常時監視を行わないため、周期タイマーを停止する。 |
| ⑩ | private | int | LinDsp | 区分0では表示文字列を DirectIO 用データへ変換し、それ以外では表示をクリアする。 |

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
- ② CustomerDisplayBySharpForm を生成し、MyForm と MyDevice に CustomerDisplay OCX を設定する。
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

- ① EndOrder を true に設定する。
- ② 基底 StopDevice を呼び、タイマー停止、処理中待機、フォーム解放を実行する。

備考: -

### ③. DeviceUse

| 項目 | 内容 |
| --- | --- |
| シグネチャ | public override int DeviceUse(Dictionary<string, string> arguments, ref Dictionary<string, string> returns) |
| 可視性 | public |
| 戻り値 | int |
| 戻り値内容 | 使用開始結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Dictionary<string, string> | 入力引数 | arguments |
| ref Dictionary<string, string> | 戻り値格納先 | returns |

処理内容:

- ① EnsureDeviceStartedで使用可能状態へ移行する。
- ② 成功時はDescriptor、横・縦Marquee、Window数、行数、および列数の能力を追加する。
- ③ 能力取得で例外が発生した場合は失敗結果とし、処理段階ReadCapabilitiesと例外型名を設定してデバイスを終了する。
- ④ Completeで結果コードを返す。

備考: 使用開始時に実機能力を返し、UIの対応可否判定に使用できる。

### ④. DeviceUnUse

| 項目 | 内容 |
| --- | --- |
| シグネチャ | public override int DeviceUnUse(Dictionary<string, string> arguments, ref Dictionary<string, string> returns) |
| 可視性 | public |
| 戻り値 | int |
| 戻り値内容 | 使用終了結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Dictionary<string, string> | 入力引数 | arguments |
| ref Dictionary<string, string> | 戻り値格納先 | returns |

処理内容:

- ① 現在のClaim状態を確認してDevice_Endを実行する。
- ② Completeで結果コードと拡張結果コードを返す。

備考: Claim済みの場合だけ排他を解放する。

### ⑤. EnsureDeviceStarted

| 項目 | 内容 |
| --- | --- |
| シグネチャ | private int EnsureDeviceStarted() |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | デバイス使用可能状態の確認または開始結果。 |

処理内容:

- ① Openされていない場合はClosedエラーを返す。
- ② Claimされていない場合はDevice_Startを実行する。
- ③ Claim済みかつDeviceEnabled=trueの場合は正常結果を返す。
- ④ DeviceEnabled=falseの場合はtrueへ更新し、OCXの結果コードを返す。

備考: 重複Claimを行わず、現在状態に必要な処理だけを実行する。

### ⑥. AddCapabilities

| 項目 | 内容 |
| --- | --- |
| シグネチャ | private void AddCapabilities(Dictionary<string, string> returns) |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Dictionary<string, string> | 戻り値格納先 | returns |

処理内容:

- ① CapDescriptors、CapHMarquee、CapVMarqueeを真偽値文字列として追加する。
- ② DeviceWindows、Rows、Columnsを整数文字列として追加する。

備考: DeviceUse成功時にUIへ能力を返す。

### ⑦. Complete

| 項目 | 内容 |
| --- | --- |
| シグネチャ | private static int Complete(int resultCode, int resultCodeExtended, Dictionary<string, string> returns) |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | 引数の結果コード。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | 結果コード | resultCode |
| int | 拡張結果コード | resultCodeExtended |
| Dictionary<string, string> | 戻り値格納先 | returns |

処理内容:

- ① 共通結果ライターへ結果コード、拡張結果コード、および戻り値辞書を渡す。
- ② 結果コードを返す。

備考: ResultCodeとResultCodeExtendedの重複記述を共通化する。

### ⑧. DeviceMethod

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

- ① 機器の使用開始を確認する。失敗した場合は結果を設定して返す。
- ② 表示消去、文字表示、位置指定表示、スクロールを指定された引数で実行する。
- ③ 表示記号の指定は対応能力を確認する。非対応の場合は未対応を示す情報を戻り値へ設定する。
- ④ 表示領域の作成と破棄は複数領域への対応を確認する。作成時は開始行、開始列、表示寸法、仮想領域寸法を使用する。表示更新は対象領域番号を使用する。
- ⑤ 直接制御はコマンド、数値、文字列を受け取り、処理後の数値と文字列を戻り値へ設定する。稼働確認は確認レベルを使用し、確認結果の説明を返す。
- ⑥ 直接表示とテロップ表示は対応する直接制御を実行する。
- ⑦ 機器の使用を終了し、結果コードと拡張結果コードを戻り値へ設定する。

備考: -

### ⑨. Device_Mng

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
- ② タイマー有効状態を false にする。
- ③ カスタマディスプレイはイベント監視を継続しないため、追加処理は行わない。

備考: -

### ⑩. LinDsp

| 項目 | 内容 |
| --- | --- |
| シグネチャ | private int LinDsp(ref int kbn, string data) |
| 可視性 | private |
| 戻り値 | int |
| 戻り値内容 | 区分0では表示文字列を DirectIO 用データへ変換し、それ以外では表示をクリアした結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| ref int | 表示区分 | kbn |
| string | 表示データ | data |

処理内容:

- ① 処理区分（kbn）が「0」の場合は、Unicodeバイト配列から直接入出力（DirectIO）用文字列を組み立てる。
- ② コマンド番号（command）と付加データ（pData）に「0」を設定して直接入出力（DirectIO）を実行する。
- ③ 処理区分（kbn）が「0」以外の場合は、表示記述子クリア（ClearDescriptors）を呼んで表示をクリアする。

備考: -
