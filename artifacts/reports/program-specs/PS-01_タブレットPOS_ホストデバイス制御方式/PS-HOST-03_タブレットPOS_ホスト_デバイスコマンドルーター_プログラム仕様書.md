# PS-HOST-03 タブレットPOS ホスト デバイスコマンドルーター プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.2 | 2026/06/21 | VTI | クラス仕様、フィールド/プロパティ、メソッド仕様を更新 |
| 0.0.1 | 2026/06/19 | VTI | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-HOST-03 |
| プロジェクト名 | タブレットPOS |
| 機能名 | デバイスコマンドルーター |
| 物理クラス名 | DeviceCommandRouter |
| 名前空間 | TabletOutProcess.TabletDeviceServer |
| アクセス修飾子 | internal partial |
| 継承/実装 | IDisposable |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/tabletposboilerplate/TabetPos.Host/src/TabletHost/DeviceHost/DeviceCommandRouter.cs |
| 対象クラス | DeviceCommandRouter |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

デバイスごとにコマンド処理の順序を保つためのルーティング層。同一デバイスへの要求は同じ作業キューへ集約し、異なるデバイスの処理とは分離して実行する。

### 主な責務

- 要求内容から対象デバイスの処理単位を決定する。
- デバイス単位の作業キューを生成・再利用する。
- 処理中の例外を失敗応答に変換し、呼出元へ返す。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| フィールド | private readonly | Lock | _syncObject | Worker 辞書更新用の排他制御。 |
| フィールド | private readonly | Dictionary<string, Worker> | _workers | DeviceId/Host キーごとの Worker 管理辞書。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | internal | - | DeviceCommandRouter | 処理関数を受け取り、デバイス単位のワーカーキューを管理する。 |
| 2 | public | Task<NamedPipeDeviceCommandResponse> | EnqueueAsync | リクエストを対象デバイスのワーカーへ投入する。 |
| 3 | private | Worker | GetWorker | デバイスキーに対応する Worker を取得または生成する。 |
| 4 | private static | string | GetDeviceKey | DeviceId があればそれを、未指定なら Host をキューキーにする。 |
| 5 | public | void | Dispose | 全 Worker を破棄し、キュー管理辞書をクリアする。 |

## メソッド詳細

### 1. DeviceCommandRouter

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `internal partial class DeviceCommandRouter(Func<NamedPipeDeviceCommandRequest, NamedPipeDeviceCommandResponse> processor)` |
| 可視性 | internal |
| 戻り値 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Func<NamedPipeDeviceCommandRequest, NamedPipeDeviceCommandResponse> | コマンド処理関数 | processor |

処理内容:

- ① Named Pipe command を処理する processor delegate を受け取る。
- ② device key ごとの worker を管理する dictionary と排他 lock を初期化する。
- ③ EnqueueAsync で device 単位の worker queue へ request を投入できる状態にする。

備考: -

### 2. EnqueueAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public Task<NamedPipeDeviceCommandResponse> EnqueueAsync(NamedPipeDeviceCommandRequest request)` |
| 可視性 | public |
| 戻り値 | Task<NamedPipeDeviceCommandResponse> |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| NamedPipeDeviceCommandRequest | デバイスコマンド要求 | request |

処理内容:

- ① request から queue key を決定する。
- ② key に対応する worker を取得または生成する。
- ③ request を worker queue に追加し、response task を返す。

備考: -

### 3. GetWorker

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private Worker GetWorker(string key)` |
| 可視性 | private |
| 戻り値 | Worker |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | キー | key |

処理内容:

- ① worker dictionary を lock する。
- ② key が未登録の場合は processor を持つ Worker を生成して登録する。
- ③ 登録済み worker を返す。

備考: -

### 4. GetDeviceKey

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static string GetDeviceKey(NamedPipeDeviceCommandRequest request)` |
| 可視性 | private static |
| 戻り値 | string |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| NamedPipeDeviceCommandRequest | デバイスコマンド要求 | request |

処理内容:

- ① request が null の場合は host command として `Host` を返す。
- ② DeviceId が設定されている場合は DeviceId を routing key とする。
- ③ DeviceId が空の場合は host command として `Host` を返す。

備考: -

### 5. Dispose

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Dispose()` |
| 可視性 | public |
| 戻り値 | void |

処理内容:

- ① worker dictionary を lock する。
- ② すべての worker へ dispose を呼び、queue の受け付けを終了する。
- ③ worker dictionary を clear する。

備考: -
## 処理フロー/注意事項

- EnqueueAsync が device key を決定して Worker に投入する。
- Worker が BlockingCollection を STA thread で順次処理する。
- Dispose が全 Worker を停止する。

### 注意事項

- 内部クラス `Worker` と `WorkItem` は実装詳細として扱い、メイン method 一覧からは分離する。
