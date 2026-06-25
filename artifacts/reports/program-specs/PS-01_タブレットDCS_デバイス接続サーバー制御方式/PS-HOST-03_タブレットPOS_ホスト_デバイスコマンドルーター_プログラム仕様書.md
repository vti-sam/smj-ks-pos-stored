# PS-HOST-03 タブレットPOS ホスト デバイスコマンドルーター プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.2 | 2026/06/21 | VTI サム | クラス仕様、フィールド/プロパティ、メソッド仕様を更新 |
| 0.0.1 | 2026/06/19 | VTI サム | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-HOST-03 |
| プロジェクト名 | タブレットPOS |
| 機能名 | デバイスコマンドルーター |
| 物理クラス名 | DeviceCommandRouter |
| 名前空間 | KsOutProcess.KsDeviceServer |
| アクセス修飾子 | internal partial |
| 継承/実装 | IDisposable |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/DeviceCommandRouter.cs |
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

- ① Named Pipe コマンドを処理する関数を受け取る。
- ② デバイスキーごとのワーカーを管理する辞書と排他ロックを初期化する。
- ③ EnqueueAsync でデバイス単位のワーカーキューへ要求を投入できる状態にする。

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

- ① 要求からキューキーを決定する。
- ② キーに対応するワーカーを取得または生成する。
- ③ 要求をワーカーキューに追加し、応答タスクを返す。

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

- ① ワーカー辞書をロックする。
- ② キーが未登録の場合は processor を持つ Worker を生成して登録する。
- ③ 登録済みワーカーを返す。

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

- ① 要求が null の場合はホスト制御コマンドとして `Host` を返す。
- ② DeviceId が設定されている場合は DeviceId をルーティングキーとする。
- ③ DeviceId が空の場合はホスト制御コマンドとして `Host` を返す。

備考: -

### 5. Dispose

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Dispose()` |
| 可視性 | public |
| 戻り値 | void |

処理内容:

- ① ワーカー辞書をロックする。
- ② すべてのワーカーへ dispose を呼び、キューの受け付けを終了する。
- ③ ワーカー辞書をクリアする。

備考: -
## 処理フロー/注意事項

- EnqueueAsync がデバイスキーを決定して Worker に投入する。
- Worker が BlockingCollection を STA スレッドで順次処理する。
- Dispose が全 Worker を停止する。

### 注意事項

- 内部クラス `Worker` と `WorkItem` は実装詳細として扱い、メインメソッド一覧からは分離する。
