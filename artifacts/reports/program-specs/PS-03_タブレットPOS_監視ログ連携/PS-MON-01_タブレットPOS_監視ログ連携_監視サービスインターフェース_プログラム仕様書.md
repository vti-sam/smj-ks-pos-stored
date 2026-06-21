# PS-MON-01 タブレットPOS 監視ログ連携 監視サービスインターフェース プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.1 | 2026/06/21 | VTI | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-MON-01 |
| プロジェクト名 | タブレットPOS |
| 機能名 | 監視サービスインターフェース |
| 物理クラス名 | IMonitoringService |
| 名前空間 | TabetPos.Core.Monitoring |
| アクセス修飾子 | public |
| 継承/実装 | - |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/KsPosBoilerplate/TabetPos.Core/Monitoring/IMonitoringService.cs |
| 対象クラス | IMonitoringService |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

アプリ内の監視情報を記録するための共通窓口である。呼び出し側は監視基盤の実装を意識せず、画面コンテキスト、操作履歴、メッセージ、例外、送信完了待ちを扱う。

### 主な責務

- 画面や端末などの調査用コンテキストを設定する契約を定義する。
- 操作履歴と調査用イベントを記録する契約を定義する。
- 保留中イベントの送信完了待ちを定義する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| - | - | - | - | フィールド/プロパティ定義なし。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | public | void | SetContext | 監視スコープへ画面や端末の情報を設定する。 |
| 2 | public | void | AddBreadcrumb | 後続調査用の操作履歴を追加する。 |
| 3 | public | string | CaptureMessage | 調査対象メッセージをイベントとして送信する。 |
| 4 | public | string | CaptureException | 例外をイベントとして送信する。 |
| 5 | public | Task | FlushAsync | 指定時間内で保留中イベントの送信完了を待つ。 |

## メソッド詳細

### 1. SetContext

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `void SetContext(MonitoringContext context)` |
| 可視性 | public |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| MonitoringContext | 監視コンテキスト | context |

処理内容:

- ① 調査用コンテキストを受け付ける。
- ② 実装側で有効な値だけを監視スコープへ設定する。

備考: -

### 2. AddBreadcrumb

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `void AddBreadcrumb(MonitoringEvent monitoringEvent)` |
| 可視性 | public |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| MonitoringEvent | 監視イベント | monitoringEvent |

処理内容:

- ① 監視イベントを操作履歴として受け付ける。
- ② 実装側でカテゴリ、メッセージ、補足データ、レベルを記録する。

備考: -

### 3. CaptureMessage

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `string CaptureMessage(MonitoringEvent monitoringEvent)` |
| 可視性 | public |
| 戻り値 | string |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| MonitoringEvent | 監視イベント | monitoringEvent |

処理内容:

- ① 監視イベントを送信対象として受け付ける。
- ② 実装側で送信し、送信IDを文字列で返す。

備考: -

### 4. CaptureException

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `string CaptureException(Exception exception, MonitoringEvent? monitoringEvent = null)` |
| 可視性 | public |
| 戻り値 | string |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Exception | 例外情報 | exception |
| MonitoringEvent? | 補足監視イベント | monitoringEvent |

処理内容:

- ① 例外情報と任意の補足イベントを受け付ける。
- ② 実装側で補足イベントを操作履歴化し、例外イベントを送信する。
- ③ 送信IDを文字列で返す。

備考: -

### 5. FlushAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `Task FlushAsync(TimeSpan timeout)` |
| 可視性 | public |
| 戻り値 | Task |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| TimeSpan | 送信完了待ち時間 | timeout |

処理内容:

- ① 送信完了待ち時間を受け付ける。
- ② 実装側で監視基盤の送信キューをflushする。

備考: -

## 処理フロー/注意事項

- アプリ側は監視SDKを直接呼び出さず、この契約を経由する。
