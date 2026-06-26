# PS-HOST-05 タブレットPOS ホスト デバイスサーバーホスト プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.4 | 2026/06/25 | VTI サム | アプリライフサイクルに合わせた自動起動・停止方針を追記 |
| 0.0.3 | 2026/06/25 | VTI サム | 通常運用時の自動起動方針とデバッグ用Start/Stop画面の扱いを追記 |
| 0.0.2 | 2026/06/21 | VTI サム | クラス仕様、フィールド/プロパティ、メソッド仕様を更新 |
| 0.0.1 | 2026/06/19 | VTI サム | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-HOST-05 |
| プロジェクト名 | タブレットPOS |
| 機能名 | デバイスサーバーホスト |
| 物理クラス名 | TabletHost |
| 名前空間 | TabletOutProcess.TabletDeviceServer |
| アクセス修飾子 | public sealed partial |
| 継承/実装 | IFDeviceReply |
| 更新日 | 2026/06/25 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/tabletposboilerplate/TabetPos.Host/src/TabletHost/DeviceHost/TabletHost.cs |
| 対象クラス | TabletHost |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

コネクタサーバー（Host）内で、通信層、設定読込、デバイス管理をまとめて構成する常駐制御部。通常運用時はタブレットPOSアプリ側から自動起動され、ユーザーによる Start 操作を前提としない。アプリ停止時、終了時は Kill による停止要求を受け、管理対象を安全に終了させる。Start/Stop 画面はデバッグ／開発者向けの扱いとする。

### 主な責務

- 通信層とデバイス制御処理の接続を初期化する。
- 設定情報から起動対象デバイスを準備する。
- 停止・再起動要求に応じてホスト全体の終了制御を行う。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| フィールド | private | IDeviceHostTransport | _transport | Named Pipe 通信部の抽象化。 |
| フィールド | private | IDeviceSettingFactory | _deviceSettingFactory | 起動対象デバイス設定を生成するファクトリ。 |
| フィールド | private | TabletDeviceManager | _mDevmanager | 起動済みデバイスを管理するマネージャー。 |
| フィールド | private | IDeviceCommandHandler | _commandHandler | デバイスコマンド処理の委譲先。 |
| フィールド | private | int | _mMode | 起動対象デバイスの種別を切り替えるモード値（0: 全デバイス、1: POSPrinter/EJournal、2: その他）。 |
| プロパティ | public | bool | IsEndOrder | 終了命令受付状態。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | public | - | TabletHost | インスタンスを初期化する。 |
| 2 | public | - | TabletHost | インスタンスを初期化する。 |
| 3 | public | void | StartHost | 通信部とコマンド処理ハンドラーを初期化し、設定に基づいて TabletDeviceManager を起動する。 |
| 4 | public | void | StopHost | 通信部を停止し、起動済みデバイスを TabletDeviceManager 経由で終了する。 |
| 5 | private | void | HandleHostAction | Kill は停止後に終了フラグを立て、Restart は停止後に再起動する。 |
| 6 | public | void | ReplyDevice | デバイスからの応答ペイロードを通信部の送信処理へ渡す。 |

## メソッド詳細

### 1. TabletHost

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public TabletHost()` |
| 可視性 | public |
| 戻り値 | - |

処理内容:

- ① DeviceHostTransport を生成し、ホスト制御アクション通知先として HandleHostAction を設定する。
- ② LegacyDeviceSettingFactory を生成し、既定のデバイス設定読込手段を準備する。
- ③ IsEndOrder を false に初期化し、Host を起動可能状態にする。

備考: -

### 2. TabletHost

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public TabletHost(int mode)` |
| 可視性 | public |
| 戻り値 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| int | 起動モード | mode |

処理内容:

- ① DeviceHostTransport と LegacyDeviceSettingFactory を生成する。
- ② 起動モードを _mMode に保持し、起動対象デバイス種別を指定できるようにする。
- ③ IsEndOrder を false に初期化し、起動モード指定付き Host を起動可能状態にする。

備考: -

### 3. StartHost

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void StartHost()` |
| 可視性 | public |
| 戻り値 | void |

処理内容:

- ① 開始ログを出力し、TabletDeviceManager のシングルトンインスタンスを取得する。
- ② DeviceCommandHandler を DeviceManagerRegistry と LegacyProcessInfoStore で構成する。
- ③ 通信部を開始し、コマンド処理ハンドラーを通信経路へ接続する。
- ④ 起動モードに応じたデバイス設定を作成し、デバイス管理部を起動する。
- ⑤ 例外時は開始異常ログを出力する。

備考: -

### 4. StopHost

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void StopHost()` |
| 可視性 | public |
| 戻り値 | void |

処理内容:

- ① 通信部を停止する。
- ② デバイス管理部が存在する場合は StopDeviceManager を呼ぶ。
- ③ 停止ログを出力し、例外時は停止異常ログを出力する。

備考: -

### 5. HandleHostAction

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void HandleHostAction(DeviceHostAction action)` |
| 可視性 | private |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| DeviceHostAction | ホストアクション | action |

処理内容:

- ① 受信したホスト制御アクション（DeviceHostAction）を判定する。
- ② Kill の場合は StopHost を実行し、IsEndOrder を true に設定する。
- ③ Restart の場合は StopHost 後に StartHost を実行し、Host 通信部とデバイス管理部を再起動する。

備考: -

### 6. ReplyDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void ReplyDevice(IDeviceServiceCallBack client, TabletDeviceId deviceId, TabletDeviceMethodID ksDeviceMethodId, IntPtr handle, Dictionary<string, string> dic)` |
| 可視性 | public |
| 戻り値 | void |

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
- ② 通信部の PublishDeviceReply を呼び、デバイス応答をイベント用通信経路へ渡す。
- ③ 送信後の応答生成は通信部側に委譲し、本メソッドは戻り値なしで終了する。

備考: -
## 処理フロー/注意事項

- StartHost が通信部を開始し、TabletDeviceManager.StartDeviceManager を呼び出す。
- StopHost が通信部とデバイス管理部を停止する。
- ReplyDevice が通信部へデバイスイベント送信を委譲する。

### 注意事項

- 通常運用時は、タブレットPOSアプリの起動時、画面作成時、復帰時にコネクタサーバー（Host）が自動起動され、コネクタサーバー起動処理から StartHost が呼ばれる。ユーザーによる Start 操作を前提としない。
- タブレットPOSアプリの停止時、終了時はコネクタサーバーへ Kill が送信され、StopHost により通信部とデバイス管理部を停止する。
- Start/Stop 画面からの操作はデバッグ／開発者向けに限定する。
- `StartDeviceManager` は停止要求までループするため、ホスト起動フローのブロッキング要素である。
