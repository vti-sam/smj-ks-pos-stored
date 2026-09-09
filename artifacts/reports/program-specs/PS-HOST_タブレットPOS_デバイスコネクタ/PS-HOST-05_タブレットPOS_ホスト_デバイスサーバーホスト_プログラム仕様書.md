# PS-HOST-05 タブレットPOS ホスト デバイスサーバーホスト プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-HOST-05 |
| 文書名 | タブレットPOS ホスト デバイスサーバーホスト プログラム仕様書 |
| 対象 | タブレットPOS / デバイスサーバーホスト |
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
| 機能名 | デバイスサーバーホスト |
| 物理クラス名 | TabletHost |
| 名前空間 | TabletOutProcess.TabletDeviceServer |
| アクセス修飾子 | public sealed partial |
| 継承/実装 | IFDeviceReply |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/pos-integration/Pos.DeviceConnector/src/DeviceConnector/DeviceConnector/TabletHost.cs |
| 対象クラス | TabletHost |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

デバイスコネクタ（Host）内で、通信層、設定読込、デバイス管理をまとめて構成する常駐制御部。通常運用時はタブレットPOS端末アプリ側から自動起動され、ユーザーによる Start 操作を前提としない。アプリ停止時、終了時は Kill による停止要求を受け、管理対象を安全に終了させる。Start/Stop 画面はデバッグ／開発者向けの扱いとする。

### 主な責務

- 通信層とデバイス制御処理の接続を初期化する。
- 設定情報から起動対象デバイスを準備する。
- 停止・再起動要求に応じてデバイスコネクタ全体の終了制御を行う。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| フィールド | private readonly | IDeviceHostTransport | _transport | 名前付きパイプ通信部の抽象化。 |
| フィールド | private readonly | IDeviceSettingFactory | _deviceSettingFactory | 起動対象デバイス設定を生成するファクトリ。 |
| フィールド | private | TabletDeviceManager | _mDevmanager | 起動済みデバイスを管理するマネージャー。 |
| フィールド | private | IDeviceCommandHandler | _commandHandler | デバイスコマンド処理の委譲先。 |
| フィールド | private readonly | int | _mMode | 起動対象デバイスの種別を切り替えるモード値（0: 全デバイス、1: POSPrinter/EJournal、2: その他）。 |
| プロパティ | public | bool | IsEndOrder | 終了命令受付状態。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | public | - | TabletHost | インスタンスを初期化する。 |
| ② | public | - | TabletHost | インスタンスを初期化する。 |
| ③ | public | void | StartHost | 通信部とコマンド処理ハンドラーを初期化し、設定に基づいて TabletDeviceManager を起動する。 |
| ④ | public | void | StopHost | 通信部を停止し、起動済みデバイスを TabletDeviceManager 経由で終了する。 |
| ⑤ | private | void | HandleHostAction | Kill は停止後に終了フラグを立て、Restart は停止後に再起動する。 |
| ⑥ | public | void | ReplyDevice | デバイスからの応答ペイロードを通信部の送信処理へ渡す。 |

## メソッド詳細

### ①. TabletHost

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public TabletHost()` |
| 可視性 | public |
| 戻り値 | - |
| 戻り値内容 | - |

処理内容:

- ① DeviceHostTransport を生成し、デバイスコネクタ制御アクション通知先として HandleHostAction を設定する。
- ② LegacyDeviceSettingFactory を生成し、既定のデバイス設定読込手段を準備する。
- ③ IsEndOrderをfalseに初期化し、デバイスコネクタを起動可能状態にする。

備考: -

### ②. TabletHost

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public TabletHost(int mode)` |
| 可視性 | public |
| 戻り値 | - |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | 起動モード | mode |

処理内容:

- ① DeviceHostTransport と LegacyDeviceSettingFactory を生成する。
- ② 起動モードを _mMode に保持し、起動対象デバイス種別を指定できるようにする。
- ③ IsEndOrderをfalseに初期化し、起動モード指定付きデバイスコネクタを起動可能状態にする。

備考: -

### ③. StartHost

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void StartHost()` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

処理内容:

- ① 開始ログを出力し、TabletDeviceManager のシングルトンインスタンスを取得する。
- ② DeviceCommandHandler を DeviceManagerRegistry、LegacyProcessInfoStore、デバイス管理部の準備状態確認関数で構成する。
- ③ 通信部を開始し、コマンド処理ハンドラーを通信経路へ接続する。
- ④ 起動モードに応じたデバイス設定を作成し、デバイス管理部を起動する。
- ⑤ 例外時は開始異常ログを出力し、通信部を停止して IsEndOrder を true にする。

備考: -

### ④. StopHost

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void StopHost()` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

処理内容:

- ① 通信部を停止する。
- ② デバイス管理部が存在する場合は StopDeviceManager を呼ぶ。
- ③ 停止ログを出力し、例外時は停止異常ログを出力する。

備考: -

### ⑤. HandleHostAction

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void HandleHostAction(DeviceHostAction action)` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| DeviceHostAction | デバイスコネクタ制御アクション | action |

処理内容:

- ① 受信したデバイスコネクタ制御アクション（DeviceHostAction）を判定する。
- ② Kill の場合は StopHost を実行し、IsEndOrder を true に設定する。
- ③ Restartの場合はStopHost後にStartHostを実行し、デバイスコネクタ通信部とデバイス管理部を再起動する。

備考: -

### ⑥. ReplyDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void ReplyDevice(IDeviceServiceCallBack client, TabletDeviceId deviceId, TabletDeviceMethodID ksDeviceMethodId, IntPtr handle, Dictionary<string, string> dic)` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IDeviceServiceCallBack | コールバッククライアント | client |
| TabletDeviceId | デバイスID | deviceId |
| TabletDeviceMethodID | デバイスメソッドID | ksDeviceMethodId |
| IntPtr | ウィンドウハンドル | handle |
| Dictionary<string, string> | 応答データ | dic |

処理内容:

- ① deviceId、methodId、handle、応答ペイロードを受け取る。
- ② 通信部のPublishDeviceReplyを呼び、デバイス応答をイベント通知用パイプへ渡す。
- ③ 送信後の応答生成は通信部側に委譲し、本メソッドは戻り値なしで終了する。

備考: -

## 処理フロー/注意事項

- StartHost が通信部を開始し、TabletDeviceManager.StartDeviceManager を呼び出す。
- 通信開始からデバイス管理部の準備完了まで、HealthCheck は未準備状態を返す。
- StopHost が通信部とデバイス管理部を停止する。
- ReplyDevice が通信部へデバイスイベント送信を委譲する。

### 注意事項

- 通常運用時は、タブレットPOS端末アプリの起動時、画面作成時、復帰時にデバイスコネクタ（Host）が自動起動され、デバイスコネクタ起動処理から StartHost が呼ばれる。ユーザーによる Start 操作を前提としない。
- タブレットPOS端末アプリの停止時、終了時はデバイスコネクタへ Kill が送信され、StopHost により通信部とデバイス管理部を停止する。
- Start/Stop 画面からの操作はデバッグ／開発者向けに限定する。
- `StartDeviceManager`は停止要求までループするため、デバイスコネクタ起動フローのブロッキング要素である。
- 起動処理で例外が発生した場合は通信部を停止し、デバイスコネクタの終了状態へ移行する。
