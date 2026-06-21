# POS-HOST-06 タブレットPOS ホスト デバイスマネージャー プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.2 | 2026/06/21 | VTI | クラス仕様、フィールド/プロパティ、メソッド仕様を更新 |
| 0.0.1 | 2026/06/19 | VTI | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | POS-HOST-06 |
| プロジェクト名 | タブレットPOS |
| 機能名 | デバイスマネージャー |
| 物理クラス名 | KsDeviceManager |
| 名前空間 | KsOutProcess.KsDeviceServer |
| アクセス修飾子 | public |
| 継承/実装 | - |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/KsPosBoilerplate/TabetPos.Host/src/KsDeviceManager/KsDeviceManager.cs |
| 対象クラス | KsDeviceManager |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

設定に基づいて利用対象デバイスを生成・起動し、ホスト内で一元管理するデバイス管理部。起動済みデバイスの検索、停止、応答通知、稼働監視を担当する。

### 主な責務

- 設定から起動対象デバイスを取得し、初期化を試行する。
- 起動済みデバイスの一覧を保持し、要求元から検索できるようにする。
- 応答転送と一部デバイスの稼働監視を行う。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| フィールド | private | IFSettingDevice | _deviceSetting | 起動対象デバイス一覧と device instance 生成を提供する設定インスタンス。 |
| フィールド | private | IFDeviceReply | _deviceReply | デバイス処理結果を host transport へ返却するための reply 先。 |
| フィールド | private | bool | _stopFlg | device manager の監視ループを終了させる停止フラグ。 |
| フィールド | private | KsDeviceManager | _singleton | device manager singleton instance。 |
| フィールド | private | List<IFDevice> | _deviceList | 起動済み IFDevice の保持リスト。 |
| プロパティ | public | IReadOnlyList<IFDevice> | Devices | 起動済みデバイスの読み取り専用 snapshot。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | private | - | KsDeviceManager | インスタンスコンストラクタ |
| 2 | public | KsDeviceManager | GetInstance | Singleton インスタンスを返却する。 |
| 3 | public | void | StartDeviceManager | 設定から対象デバイスを生成し、起動後は停止要求まで keep-alive 監視ループを維持する。 |
| 4 | public | void | StopDeviceManager | 停止フラグを立て、保持中の全デバイスへ StopDevice を呼び出して list を空にする。 |
| 5 | public | IFDevice | FindDevice | 起動済みデバイス list から DeviceId が一致する IFDevice を返す。 |
| 6 | public | void | ReplyDevice | legacy process info の client/handle/method を使い、ホストの ReplyDevice へ応答を渡す。 |

## メソッド詳細

### 1. KsDeviceManager

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private KsDeviceManager()` |
| 可視性 | private |
| 戻り値 | - |

処理内容:

- ① private constructor として生成経路を singleton に限定する。
- ② 生成された instance を _singleton に設定する。
- ③ GetInstance から同一 instance を返却できる状態にする。

備考: -

### 2. GetInstance

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public static KsDeviceManager GetInstance()` |
| 可視性 | public |
| 戻り値 | KsDeviceManager |

処理内容:

- ① 現在保持している _singleton を参照する。
- ② 新規生成は行わず、初期化済み device manager instance を返す。
- ③ 呼出元は返却 instance 経由で device start/stop/find を実行する。

備考: -

### 3. StartDeviceManager

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void StartDeviceManager(IFSettingDevice deviceSetting, IFDeviceReply deviceReply)` |
| 可視性 | public |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IFSettingDevice | デバイス設定 | deviceSetting |
| IFDeviceReply | デバイス応答先 | deviceReply |

処理内容:

- ① 停止フラグを false にし、設定と応答先を保持する。
- ② 設定から起動対象 DeviceId list を取得する。
- ③ 各 device を最大3回まで生成・StartDevice し、成功したものを list に追加する。
- ④ 停止要求まで 10ms 間隔で DoEvents し、60秒ごとに MSR/CashChanger の keep-alive を確認する。
- ⑤ 30秒以上応答がない対象は状態監視ログへ出力する。

備考: -

### 4. StopDeviceManager

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void StopDeviceManager()` |
| 可視性 | public |
| 戻り値 | void |

処理内容:

- ① 停止フラグを true にする。
- ② list 内の各 IFDevice へ StopDevice を呼ぶ。
- ③ device list を clear する。

備考: -

### 5. FindDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public IFDevice FindDevice(KsDeviceId deviceId)` |
| 可視性 | public |
| 戻り値 | IFDevice |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| KsDeviceId | デバイスID | deviceId |

処理内容:

- ① 起動済み device list を走査する。
- ② 指定された KsDeviceId と一致する device を検索する。
- ③ 該当 device が存在する場合は返却し、存在しない場合は null を返す。

備考: -

### 6. ReplyDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void ReplyDevice(ref KsProcessInfo proc, ref Dictionary<string, string> dic)` |
| 可視性 | public |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| KsProcessInfo | プロセス情報 | proc |
| Dictionary<string, string> | 応答データ | dic |

処理内容:

- ① KsProcessInfo と戻り値 dictionary を受け取る。
- ② proc から client、deviceId、methodId、handle を取得する。
- ③ _deviceReply.ReplyDevice に委譲し、client へ device 処理結果を返却する。

備考: -
## 処理フロー/注意事項

- StartDeviceManager が device list を構築し、停止フラグまで監視ループを維持する。
- StopDeviceManager が全デバイス StopDevice を実行して list をクリアする。
- FindDevice が command handler からの検索口になる。

### 注意事項

- `Devices` は内部 list の配列コピーを返す。
