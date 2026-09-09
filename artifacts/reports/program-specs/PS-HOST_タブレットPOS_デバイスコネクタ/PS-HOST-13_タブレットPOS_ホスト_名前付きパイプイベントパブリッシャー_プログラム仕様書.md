# PS-HOST-13 タブレットPOS ホスト 名前付きパイプイベントパブリッシャー プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-HOST-13 |
| 文書名 | タブレットPOS ホスト 名前付きパイプイベントパブリッシャー プログラム仕様書 |
| 対象 | タブレットPOS / 名前付きパイプイベントパブリッシャー |
| 版数 | 1.0.0 |
| 作成日 | 2026/07/23 |
| 作成者 | VTI サム |
| レビュー担当 | SMJ 蒲田 |
| 承認者 | SMJ 蒲田 |
| 目的 | 対象クラスの構造、フィールド／プロパティ及びメソッド仕様を定義する。 |
| 期待成果 | 実装及びレビューで参照するクラス単位の仕様を明確にする。 |

## 01_改訂履歴

| 版数 | 日付 | 変更内容 | 作成者 | 承認者 |
| --- | --- | --- | --- | --- |
| 1.0.0 | 2026/08/24 | 正式版として初版を作成。 | VTI サム | SMJ 蒲田 |

## クラス情報

| 項目 | 内容 |
| --- | --- |
| 機能名 | 名前付きパイプイベントパブリッシャー |
| 物理クラス名 | NamedPipeEventPublisher |
| 名前空間 | TabletOutProcess.TabletDeviceServer |
| アクセス修飾子 | internal |
| 継承/実装 | IDisposable |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/pos-integration/Pos.DeviceConnector/src/DeviceConnector/DeviceConnector/NamedPipeEventPublisher.cs |
| 対象クラス | NamedPipeEventPublisher |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

デバイスコネクタで発生したデバイスイベントを、接続中のDeviceCtrlイベント受信部へイベント通知用パイプで配信する送信部である。イベント接続の待受、複数クライアントの管理、JSON形式の非同期送信、未接続時イベントの保留、クライアント単位の送信順序保証、および切断クライアントの除外を担当する。

### 主な責務

- イベント受信用クライアントの接続を非同期で待ち受ける。
- 接続済みクライアントの送信先を排他制御して管理する。
- デバイスイベントをJSONへ変換して全クライアントへ送信する。
- クライアント未接続時のイベントを保留し、次に接続したクライアントへ順番に送信する。
- クライアントごとの送信タスクを直列化し、同じ接続に対するイベント順序を保つ。
- 送信失敗または待受失敗を記録し、利用できない接続を解放する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| コンストラクタ引数 | internal | string | pipeName | イベント配信用の名前付きパイプ名。 |
| フィールド | private readonly | Lock | _syncObject | クライアント一覧の排他制御。 |
| フィールド | private readonly | List<EventClient> | _clients | 接続済みクライアントと送信タスクの一覧。 |
| フィールド | private readonly | Queue<string> | _pendingEvents | クライアント未接続時にJSONイベントを保留するキュー。 |
| フィールド | private | CancellationTokenSource | _cancellationTokenSource | 待受停止を通知するキャンセルトークン発行元。 |
| フィールド | private | NamedPipeServerStream | _acceptingPipe | 接続待受中のパイプ。停止時に破棄して待受を解除する。 |
| フィールド | private | Task | _listenTask | クライアント接続を待ち受ける非同期処理。 |
| 関連型のコンストラクタ引数 | private | StreamWriter | EventClient.writer | 対象クライアントへのイベント送信先。 |
| 関連型のフィールド | private readonly | Lock | EventClient._syncObject | クライアント単位の送信タスクを排他制御する。 |
| 関連型のフィールド | private | Task | EventClient._sendTask | 直前の送信タスクを保持し、次の送信を連結する。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | internal | - | NamedPipeEventPublisher | イベント配信用パイプ名を受け取って初期化する。 |
| ② | public | void | Start | クライアント接続の非同期待受を開始する。 |
| ③ | private | void | Stop | 待受を停止し、接続済みクライアントと内部リソースを解放する。 |
| ④ | public | void | Publish | デバイスイベントをJSON形式で接続中の全クライアントへ送信する。 |
| ⑤ | private | Task | SendEventAsync | 1クライアントへの送信を予約し、失敗時は接続を除外する。 |
| ⑥ | private | Task | ListenAsync | イベント通知用パイプへの接続を待ち、保留イベント送信後に送信先一覧へ登録する。 |
| ⑦ | public | void | Dispose | Stopを呼び出して配信処理のリソースを解放する。 |
| ⑧ | public | Task | EventClient.EnqueueAsync | クライアント単位の送信タスクへイベントを連結する。 |
| ⑨ | private | Task | EventClient.SendAfterAsync | 直前の送信完了後に1行JSONを書き込み、フラッシュする。 |
| ⑩ | public | void | EventClient.Dispose | クライアントの基底ストリームを解放する。 |

## メソッド詳細

### ①. NamedPipeEventPublisher

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `internal class NamedPipeEventPublisher(string pipeName)` |
| 可視性 | internal |
| 戻り値 | - |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | イベント通知用パイプ名 | pipeName |

処理内容:

- ① イベント配信用の名前付きパイプ名を受け取る。
- ② クライアント一覧と排他制御オブジェクトを初期化する。
- ③ Startで接続待受を開始できる状態にする。

備考: -

### ②. Start

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Start()` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

処理内容:

- ① 待受タスクが既に存在する場合は何もせず終了する。
- ② キャンセルトークン発行元を生成する。
- ③ ListenAsyncをバックグラウンドタスクとして開始する。

備考: 同一インスタンスでの重複開始を防止する。

### ③. Stop

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void Stop()` |
| 可視性 | private |
| 戻り値 | void |
| 戻り値内容 | - |

処理内容:

- ① キャンセルトークン発行元、待受タスク、接続待受中のパイプ、および接続済みクライアントのスナップショットを取得する。
- ② キャンセルトークン発行元へ停止を通知する。
- ③ 排他制御内で接続待受中のパイプをnullへ更新し、クライアント一覧をクリアする。
- ④ 接続待受中のパイプと取得済みの全クライアントを破棄する。
- ⑤ 待受タスクが完了済みの場合はキャンセルトークン発行元を直ちに破棄する。実行中の場合は継続処理で待受タスク完了後に破棄する。
- ⑥ 待受タスクとキャンセルトークン発行元への参照をnullへ更新する。

備考: 停止処理は待受タスクを同期的に待たず、接続待受中のパイプを破棄してキャンセル完了後に資源を解放する。

### ④. Publish

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Publish(NamedPipeDeviceEvent deviceEvent)` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| NamedPipeDeviceEvent | デバイスイベント | deviceEvent |

処理内容:

- ① デバイスイベントをJSON文字列へ変換する。
- ② クライアント一覧をロックする。
- ③ クライアントが存在しない場合はJSONを_pendingEventsへ追加して終了する。
- ④ クライアントが存在する場合は一覧のスナップショットを取得する。
- ⑤ 各クライアントについてSendEventAsyncを開始する。

備考: Publishは送信完了を待たない。クライアントごとのEventClientが送信順序を保持する。

### ⑤. SendEventAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private async Task SendEventAsync(EventClient client, string json, NamedPipeDeviceEvent deviceEvent)` |
| 可視性 | private |
| 戻り値 | Task |
| 戻り値内容 | 対象クライアントへの送信処理を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| EventClient | 送信先クライアント | client |
| string | イベントJSON | json |
| NamedPipeDeviceEvent | ログ用デバイスイベント | deviceEvent |

処理内容:

- ① EventClient.EnqueueAsyncで送信を予約し、完了を待つ。
- ② 例外が発生した場合は排他制御内で対象クライアントを一覧から削除する。
- ③ 対象クライアントを破棄する。
- ④ イベントID、デバイスID、および例外内容を含む異常ログを出力する。

備考: 保留イベント送信時はdeviceEventがnullのため、異常ログのイベントIDとデバイスIDは空文字とする。

### ⑥. ListenAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private async Task ListenAsync(CancellationToken cancellationToken)` |
| 可視性 | private |
| 戻り値 | Task |
| 戻り値内容 | 接続待受処理の完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① キャンセルされるまでイベント送信専用のNamedPipeServerStreamを作成する。
- ② クライアントの接続を非同期で待つ。
- ③ 接続待受中のパイプを_acceptingPipeへ保持する。
- ④ 接続後、UTF-8（BOMなし）のStreamWriterとEventClientを生成する。
- ⑤ 排他制御内で_acceptingPipeをnullへ更新する。
- ⑥ _pendingEventsを先頭から取り出し、接続したEventClientへ非同期送信する。
- ⑦ EventClientをクライアント一覧へ追加する。
- ⑧ キャンセル例外時は作成中のパイプを破棄して待受ループを終了する。
- ⑨ 停止によるObjectDisposedExceptionの場合は待受ループを終了する。
- ⑩ その他の例外時は作成中のパイプを破棄し、異常ログを出力して200ミリ秒後に再試行する。
- ⑪ finallyで対象パイプが_acceptingPipeに残っている場合はnullへ更新する。

備考: 1件のクライアント接続を登録した後も、後続のクライアント接続を引き続き待ち受ける。

### ⑦. Dispose

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Dispose()` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

処理内容:

- ① Stopを呼び出す。
- ② クライアント接続の待受を停止する。
- ③ 接続済み送信先、待受タスク、キャンセルトークン発行元を解放する。

備考: -

### ⑧. EventClient.EnqueueAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public Task EnqueueAsync(string message)` |
| 可視性 | public |
| 戻り値 | Task |
| 戻り値内容 | 対象メッセージの送信処理を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | イベントJSON | message |

処理内容:

- ① 排他制御内で現在の_sendTaskを取得する。
- ② SendAfterAsyncへ直前の送信タスクとイベントJSONを渡し、新しい送信タスクを生成する。
- ③ 新しい送信タスクを_sendTaskへ保持して返す。

備考: 同じクライアントに対する送信を呼出順に直列化する。

### ⑨. EventClient.SendAfterAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private async Task SendAfterAsync(Task previousSend, string message)` |
| 可視性 | private |
| 戻り値 | Task |
| 戻り値内容 | 1行JSONの書込とフラッシュを表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Task | 直前の送信タスク | previousSend |
| string | イベントJSON | message |

処理内容:

- ① 直前の送信タスク完了を待つ。
- ② StreamWriterへイベントJSONを1行で書き込む。
- ③ StreamWriterをフラッシュする。

備考: 直前の送信が失敗した場合は例外を呼び出し元へ通知する。

### ⑩. EventClient.Dispose

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Dispose()` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

処理内容:

- ① StreamWriterの基底ストリームを破棄する。
- ② クライアント切断中に例外が発生した場合は停止処理を継続するため無視する。

備考: EventClientはNamedPipeEventPublisherのprivate sealed関連型である。

## 処理フロー/注意事項

- Startがイベント通知用パイプの接続待受を開始する。
- Publishは接続がない場合にイベントを保留し、接続がある場合は全送信先へ非同期送信する。
- ListenAsyncは接続したクライアントへ保留イベントを順番に送信してから送信先一覧へ追加する。
- EventClientは同じ接続に対するイベント送信を直列化する。
- SendEventAsyncは送信失敗した接続を一覧から削除して破棄する。
- Dispose/Stopが待受と全クライアント接続を終了する。

### 注意事項

- NamedPipeDeviceEventはイベントID、関連要求ID、デバイスID、メソッドID、ハンドル、イベント種別、メッセージ、ペイロードを持つデータ契約として扱う。
- イベント送信はUTF-8（BOMなし）の1行JSON形式で行う。
- Appで開始されたNamedPipeEventReceiverがイベント通知用パイプへ接続する。現行コードにはEventReceived購読先がなく、Applicationユースケースへの引渡しは受信側の現行対象外である。
