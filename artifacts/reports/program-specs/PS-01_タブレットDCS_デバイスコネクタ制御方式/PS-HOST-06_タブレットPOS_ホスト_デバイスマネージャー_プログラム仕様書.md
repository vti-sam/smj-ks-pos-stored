# PS-HOST-06 タブレットPOS ホスト デバイスマネージャー プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-HOST-06 |
| 文書名 | タブレットPOS ホスト デバイスマネージャー プログラム仕様書 |
| 対象 | タブレットPOS / デバイスマネージャー |
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
| 0.0.4 | 2026/07/23 | ARCH-HOST-01に合わせて、デバイスコネクタと応答通信部の表記を統一 | VTI サム |  |
| 0.0.3 | 2026/07/23 | 準備状態管理、監視対象、応答引数型を現行実装に合わせて更新 | VTI サム |  |
| 0.0.2 | 2026/06/21 | クラス仕様、フィールド/プロパティ、メソッド仕様を更新 | VTI サム |  |
| 0.0.1 | 2026/06/19 | 初版作成 | VTI サム |  |

## クラス情報

| 項目 | 内容 |
| --- | --- |
| 機能名 | デバイスマネージャー |
| 物理クラス名 | TabletDeviceManager |
| 名前空間 | TabletOutProcess.TabletDeviceServer |
| アクセス修飾子 | public |
| 継承/実装 | - |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/tabletposboilerplate/TabetPos.Host/src/TabletDeviceManager/TabletDeviceManager.cs |
| 対象クラス | TabletDeviceManager |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

設定に基づいて利用対象デバイスを生成・起動し、デバイスコネクタ内で一元管理するデバイス管理部。起動済みデバイスの検索、停止、応答通知、稼働監視を担当する。

### 主な責務

- 設定から起動対象デバイスを取得し、初期化を試行する。
- 起動済みデバイスの一覧を保持し、要求元から検索できるようにする。
- 応答転送と一部デバイスの稼働監視を行う。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| フィールド | private | IFSettingDevice | _deviceSetting | 起動対象デバイス一覧とデバイスインスタンス生成を提供する設定インスタンス。 |
| フィールド | private | IFDeviceReply | _deviceReply | デバイス処理結果をデバイスコネクタ通信部へ返却するための応答先。 |
| フィールド | private | bool | _stopFlg | デバイス管理部の監視ループを終了させる停止フラグ。 |
| フィールド | private | bool | _isReady | デバイス初期化の完了状態。 |
| フィールド | private static | TabletDeviceManager | _singleton | デバイス管理部のシングルトンインスタンス。 |
| フィールド | private readonly | List<IFDevice> | _deviceList | 起動済み IFDevice の保持リスト。 |
| プロパティ | public | IReadOnlyList<IFDevice> | Devices | 起動済みデバイスの読み取り専用スナップショット。 |
| プロパティ | public | bool | IsReady | Volatile 読取で取得するデバイス管理部の準備状態。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | private | - | TabletDeviceManager | インスタンスコンストラクタ |
| ② | public | TabletDeviceManager | GetInstance | シングルトンインスタンスを返却する。 |
| ③ | public | void | StartDeviceManager | 設定から対象デバイスを生成し、起動後は停止要求まで keep-alive 監視ループを維持する。 |
| ④ | public | void | StopDeviceManager | 停止フラグを立て、保持中の全デバイスへ StopDevice を呼び出してリストを空にする。 |
| ⑤ | public | IFDevice | FindDevice | 起動済みデバイスリストから DeviceId が一致する IFDevice を返す。 |
| ⑥ | public | void | ReplyDevice | 既存互換プロセス情報のクライアント／ハンドル／メソッドを使い、デバイスコネクタのReplyDeviceへ応答を渡す。 |

## メソッド詳細

### ①. TabletDeviceManager

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private TabletDeviceManager()` |
| 可視性 | private |
| 戻り値 | - |
| 戻り値内容 | - |

処理内容:

- ① 非公開コンストラクターとして生成経路をシングルトンに限定する。
- ② 生成されたインスタンスを _singleton に設定する。
- ③ GetInstance から同一インスタンスを返却できる状態にする。

備考: -

### ②. GetInstance

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public static TabletDeviceManager GetInstance()` |
| 可視性 | public |
| 戻り値 | TabletDeviceManager |
| 戻り値内容 | シングルトンインスタンス。 |

処理内容:

- ① 現在保持している _singleton を参照する。
- ② 新規生成は行わず、初期化済みデバイス管理部インスタンスを返す。
- ③ 呼出元は返却インスタンスを使用してデバイスを操作する。

備考: -

### ③. StartDeviceManager

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void StartDeviceManager(IFSettingDevice deviceSetting, IFDeviceReply deviceReply)` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IFSettingDevice | デバイス設定 | deviceSetting |
| IFDeviceReply | デバイス応答先 | deviceReply |

処理内容:

- ① 停止フラグを false にし、設定と応答先を保持する。
- ② 準備状態を false にして、設定から起動対象 DeviceId リストを取得する。
- ③ 各デバイスを最大3回まで生成・StartDevice し、成功したものをリストに追加する。
- ④ 全デバイスの起動試行後、準備状態を true にする。
- ⑤ 停止要求まで 10ms 間隔で DoEvents し、60秒ごとに CashChanger の keep-alive を確認する。
- ⑥ 30秒以上応答がない CashChanger は状態監視ログへ出力する。

備考: -

### ④. StopDeviceManager

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void StopDeviceManager()` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

処理内容:

- ① 停止フラグを true にする。
- ② 準備状態を false にする。
- ③ リスト内の各 IFDevice へ StopDevice を呼ぶ。
- ④ デバイスリストをクリアする。

備考: -

### ⑤. FindDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public IFDevice FindDevice(TabletDeviceId deviceId)` |
| 可視性 | public |
| 戻り値 | IFDevice |
| 戻り値内容 | 起動済みデバイスリストから DeviceId が一致する IFDevice。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| TabletDeviceId | デバイスID | deviceId |

処理内容:

- ① 起動済みデバイスリストを走査する。
- ② 指定された TabletDeviceId と一致するデバイスを検索する。
- ③ 該当デバイスが存在する場合は返却し、存在しない場合は null を返す。

備考: -

### ⑥. ReplyDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void ReplyDevice(ref TabletProcessInfo proc, ref Dictionary<string, string> dic)` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| TabletProcessInfo | プロセス情報 | proc |
| Dictionary<string, string> | 応答データ | dic |

処理内容:

- ① TabletProcessInfo と戻り値辞書を受け取る。
- ② proc から client、deviceId、methodId、handle を取得する。
- ③ _deviceReply.ReplyDevice に委譲し、クライアントへデバイス処理結果を返却する。

備考: -

## 処理フロー/注意事項

- StartDeviceManager がデバイスリストを構築し、停止フラグまで監視ループを維持する。
- StartDeviceManager は起動開始時に IsReady を false、起動試行完了後に true へ更新する。
- StopDeviceManager が全デバイス StopDevice を実行してリストをクリアする。
- StopDeviceManager は停止開始時に IsReady を false へ更新する。
- FindDevice がコマンド処理ハンドラーからの検索口になる。

### 注意事項

- `Devices` は内部リストの配列コピーを返す。
- `IsReady`はVolatile.Readで取得し、デバイスコネクタのHealthCheck判定に使用される。
