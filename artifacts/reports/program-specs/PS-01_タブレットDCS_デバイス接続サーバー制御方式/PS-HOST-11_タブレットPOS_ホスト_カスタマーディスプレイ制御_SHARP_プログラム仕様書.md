# PS-HOST-11 タブレットPOS ホスト カスタマーディスプレイ制御 SHARP プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.2 | 2026/06/21 | VTI サム | クラス仕様、フィールド/プロパティ、メソッド仕様を更新 |
| 0.0.1 | 2026/06/19 | VTI サム | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-HOST-11 |
| プロジェクト名 | タブレットPOS |
| 機能名 | カスタマーディスプレイ制御 SHARP |
| 物理クラス名 | CustomerDisplayBySharp |
| 名前空間 | KsOutProcess.KsDeviceServer |
| アクセス修飾子 | public |
| 継承/実装 | DeviceBase |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/KsPosBoilerplate/TabetPos.Host/src/KsDevice/CustomerDisplay/CustomerDisplayBySharp/CustomerDisplayBySharp.cs |
| 対象クラス | CustomerDisplayBySharp |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

SHARP カスタマーディスプレイへの表示制御を提供するデバイス制御部。POS 側の表示要求をディスプレイ制御部品へ渡し、文字表示、消去、スクロール、直接表示制御を実行する。

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
| 1 | public | void | StartDevice | 対象デバイスIDを保持し、OCXを配置したフォームとタイマー同期先を初期化する。 |
| 2 | public | void | StopDevice | デバイス制御を終了し、タイマー停止とフォーム解放を実行する。 |
| 3 | public | int | DeviceMethod | 表示クリア、文字表示、スクロール、DirectIO 表示を methodId と引数に応じて実行する。 |
| 4 | public | void | Device_Mng | カスタマーディスプレイは常時監視を行わないため、周期タイマーを停止する。 |
| 5 | private | int | LinDsp | 区分0では表示文字列を DirectIO 用データへ変換し、それ以外では表示をクリアする。 |

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
- ② CustomerDisplayBySharpForm を生成し、MyForm と MyDevice に CustomerDisplay OCX を設定する。
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

- ① EndOrder を true に設定する。
- ② 基底 StopDevice を呼び、タイマー停止、処理中待機、フォーム解放を実行する。

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

- ① 命令ごとに Device_Start を実行し、ディスプレイを有効化する。
- ② methodId に応じて ClearDescriptors、ClearText、DisplayText、DisplayTextAt、ScrollText、LinDsp、LinDspTelop を実行する。
- ③ 必要な引数が不足する場合は初期値 ResultCode=-1 のまま返す。
- ④ Device_End で排他を解放し、ResultCode/ResultCodeExtended を returns に設定する。

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
- ③ カスタマーディスプレイはイベント監視を継続しないため、追加処理は行わない。

備考: -

### 5. LinDsp

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private int LinDsp(ref int kbn, string data)` |
| 可視性 | private |
| 戻り値 | int |

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
