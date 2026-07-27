# PS-HOST-03 タブレットPOS ホスト デバイスコマンドルーター プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-HOST-03 |
| 文書名 | タブレットPOS ホスト デバイスコマンドルーター プログラム仕様書 |
| 対象 | タブレットPOS / デバイスコマンドルーター |
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
| 0.0.4 | 2026/07/23 | ARCH-HOST-01に合わせて、通信経路とデバイスコネクタ制御要求の表記を統一 | VTI サム |  |
| 0.0.3 | 2026/07/23 | ルーティングキー選択関数とワーカー例外処理を現行実装に合わせて更新 | VTI サム |  |
| 0.0.2 | 2026/06/21 | クラス仕様、フィールド/プロパティ、メソッド仕様を更新 | VTI サム |  |
| 0.0.1 | 2026/06/19 | 初版作成 | VTI サム |  |

## クラス情報

| 項目 | 内容 |
| --- | --- |
| 機能名 | デバイスコマンドルーター |
| 物理クラス名 | DeviceCommandRouter |
| 名前空間 | TabletOutProcess.TabletDeviceServer |
| アクセス修飾子 | internal partial |
| 継承/実装 | IDisposable |

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
| フィールド | private readonly | Dictionary<string, Worker> | _workers | DeviceIdまたは`Host`をキーとするWorker管理辞書。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | internal | - | DeviceCommandRouter | 処理関数を受け取り、デバイス単位のワーカーキューを管理する。 |
| ② | public | Task<NamedPipeDeviceCommandResponse> | EnqueueAsync | リクエストを対象デバイスのワーカーへ投入する。 |
| ③ | private | Worker | GetWorker | デバイスキーに対応する Worker を取得または生成する。 |
| ④ | private | string | GetDeviceKey | 選択関数、DeviceId、`Host`の優先順でキューキーを決定する。 |
| ⑤ | public | void | Dispose | 全 Worker を破棄し、キュー管理辞書をクリアする。 |

## メソッド詳細

### ①. DeviceCommandRouter

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `internal partial class DeviceCommandRouter(Func<NamedPipeDeviceCommandRequest, NamedPipeDeviceCommandResponse> processor, Func<NamedPipeDeviceCommandRequest, string> keySelector = null)` |
| 可視性 | internal |
| 戻り値 | - |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Func<NamedPipeDeviceCommandRequest, NamedPipeDeviceCommandResponse> | コマンド処理関数 | processor |
| Func<NamedPipeDeviceCommandRequest, string> | ルーティングキー選択関数 | keySelector |

処理内容:

- ① コマンド通信用パイプから受信したコマンドを処理する関数を受け取る。
- ② 任意指定のルーティングキー選択関数を受け取る。
- ③ デバイスキーごとのワーカーを管理する辞書と排他ロックを初期化する。
- ④ EnqueueAsync でデバイス単位のワーカーキューへ要求を投入できる状態にする。

備考: -

### ②. EnqueueAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public Task<NamedPipeDeviceCommandResponse> EnqueueAsync(NamedPipeDeviceCommandRequest request)` |
| 可視性 | public |
| 戻り値 | Task<NamedPipeDeviceCommandResponse> |
| 戻り値内容 | リクエストを対象デバイスのワーカーへ投入した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| NamedPipeDeviceCommandRequest | デバイスコマンド要求 | request |

処理内容:

- ① 要求からキューキーを決定する。
- ② キーに対応するワーカーを取得または生成する。
- ③ 要求をワーカーキューに追加し、応答タスクを返す。

備考: -

### ③. GetWorker

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private Worker GetWorker(string key)` |
| 可視性 | private |
| 戻り値 | Worker |
| 戻り値内容 | デバイスキーに対応する Worker を取得または生成した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | キー | key |

処理内容:

- ① ワーカー辞書をロックする。
- ② キーが未登録の場合は processor を持つ Worker を生成して登録する。
- ③ 登録済みワーカーを返す。

備考: -

### ④. GetDeviceKey

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private string GetDeviceKey(NamedPipeDeviceCommandRequest request)` |
| 可視性 | private |
| 戻り値 | string |
| 戻り値内容 | 選択関数、DeviceId、`Host`の優先順で決定したキューキー。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| NamedPipeDeviceCommandRequest | デバイスコマンド要求 | request |

処理内容:

- ① ルーティングキー選択関数が指定されている場合は要求を渡してキーを取得する。
- ② 選択関数が空でないキーを返した場合は、そのキーを使用する。
- ③ 選択関数でキーを決定できず、要求が null の場合は `Host` を返す。
- ④ DeviceId が設定されている場合は DeviceId を使用し、未設定の場合は `Host` を返す。

備考: `Host`はデバイスIDを持たないデバイスコネクタ制御要求の共通キーとして使用する。

### ⑤. Dispose

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Dispose()` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

処理内容:

- ① ワーカー辞書をロックする。
- ② すべてのワーカーへ dispose を呼び、キューの受け付けを終了する。
- ③ ワーカー辞書をクリアする。

備考: -

## 処理フロー/注意事項

- EnqueueAsync がデバイスキーを決定して Worker に投入する。
- Worker が BlockingCollection を STA スレッドで順次処理する。
- Worker の処理例外時は要求IDと例外内容をログへ出力し、ResultCode=-1 の失敗応答を返す。
- Dispose が全 Worker を停止する。

### 注意事項

- 内部クラス `Worker` と `WorkItem` は実装詳細として扱い、メインメソッド一覧からは分離する。
