# PS-MON-02 タブレットPOS 監視ログ連携 Sentry監視サービス プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.1 | 2026/06/21 | VTI | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-MON-02 |
| プロジェクト名 | タブレットPOS |
| 機能名 | Sentry監視サービス |
| 物理クラス名 | SentryMonitoringService |
| 名前空間 | TabetPos.Core.Monitoring |
| アクセス修飾子 | public sealed |
| 継承/実装 | IMonitoringService |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/tabletposboilerplate/TabetPos.Core/Monitoring/SentryMonitoringService.cs |
| 対象クラス | SentryMonitoringService |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

アプリ内の監視イベントをSentryへ連携するサービスである。画面や端末のタグ設定、操作履歴、メッセージ、例外を扱い、送信前に文字列データをマスキングする。

### 主な責務

- 監視コンテキストをSentryタグへ変換する。
- 操作履歴とイベントをSentryへ連携する。
- 送信前にメッセージ、補足データ、タグ値をマスキングする。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| - | - | - | - | フィールド/プロパティ定義なし。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | public | void | SetContext | 監視コンテキストをSentryタグへ設定する。 |
| 2 | public | void | AddBreadcrumb | 監視イベントをSentryの操作履歴として追加する。 |
| 3 | public | string | CaptureMessage | 監視イベントのメッセージをSentryイベントとして送信する。 |
| 4 | public | string | CaptureException | 例外をSentryイベントとして送信する。 |
| 5 | public | Task | FlushAsync | 保留中イベントの送信完了を待つ。 |
| 6 | private static | void | SetTag | タグ値が有効な場合だけマスキングして設定する。 |
| 7 | private static | string | Mask | 文字列をマスキングし、nullの場合も空文字で扱う。 |
| 8 | private static | Dictionary<string, string>? | MaskData | 補足データの値をマスキングする。 |
| 9 | private static | BreadcrumbLevel | ToBreadcrumbLevel | 監視レベルを操作履歴レベルへ変換する。 |
| 10 | private static | SentryLevel | ToSentryLevel | 監視レベルをSentryイベントレベルへ変換する。 |

## メソッド詳細

### 1. SetContext

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void SetContext(MonitoringContext context)` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| MonitoringContext | 監視コンテキスト | context |

処理内容:

- ① Sentryのスコープ設定処理を開始する。
- ② 画面名、業務フロー、店舗コード、端末ID、デバイス種別、APIエンドポイントをタグ候補として設定する。
- ③ 追加タグが存在する場合は1件ずつタグ候補として設定する。
- ④ 空値は除外し、値はマスキングしてから設定する。

備考: -

### 2. AddBreadcrumb

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void AddBreadcrumb(MonitoringEvent monitoringEvent)` |
| 可視性 | public |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| MonitoringEvent | 監視イベント | monitoringEvent |

処理内容:

- ① メッセージをマスキングする。
- ② 補足データがある場合は値を1件ずつマスキングする。
- ③ 監視レベルを操作履歴レベルへ変換する。
- ④ カテゴリ、メッセージ、補足データ、レベルをSentryへ追加する。

備考: -

### 3. CaptureMessage

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public string CaptureMessage(MonitoringEvent monitoringEvent)` |
| 可視性 | public |
| 戻り値 | string |
| 戻り値内容 | 監視イベントのメッセージをSentryイベントとして送信した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| MonitoringEvent | 監視イベント | monitoringEvent |

処理内容:

- ① メッセージをマスキングする。
- ② 監視レベルをSentryイベントレベルへ変換する。
- ③ メッセージイベントを送信する。
- ④ 送信IDが空の場合は空文字、それ以外は送信ID文字列を返す。

備考: -

### 4. CaptureException

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public string CaptureException(Exception exception, MonitoringEvent? monitoringEvent = null)` |
| 可視性 | public |
| 戻り値 | string |
| 戻り値内容 | 例外をSentryイベントとして送信した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Exception | 例外情報 | exception |
| MonitoringEvent? | 補足監視イベント | monitoringEvent |

処理内容:

- ① 補足イベントが指定された場合はエラーレベルの操作履歴として追加する。
- ② 例外イベントをSentryへ送信する。
- ③ 送信IDが空の場合は空文字、それ以外は送信ID文字列を返す。

備考: -

### 5. FlushAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public Task FlushAsync(TimeSpan timeout)` |
| 可視性 | public |
| 戻り値 | Task |
| 戻り値内容 | 非同期処理の完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| TimeSpan | 送信完了待ち時間 | timeout |

処理内容:

- ① 呼び出し元から送信完了待ち時間を受け取る。
- ② Sentry SDKの送信キューflushを呼び出す。
- ③ SDK側の完了タスクを返す。

備考: -

### 6. SetTag

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static void SetTag(Scope scope, string key, string? value)` |
| 可視性 | private static |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Scope | Sentryスコープ | scope |
| string | タグキー | key |
| string? | タグ値 | value |

処理内容:

- ① タグ値が空または空白の場合は設定しない。
- ② タグ値をマスキングする。
- ③ マスキング済み値を指定キーのタグとして設定する。

備考: -

### 7. Mask

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static string Mask(string value)` |
| 可視性 | private static |
| 戻り値 | string |
| 戻り値内容 | 文字列をマスキングし、nullの場合も空文字として扱った結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | 対象文字列 | value |

処理内容:

- ① 共通マスキング処理へ文字列を渡す。
- ② 戻り値がnullの場合は空文字へ変換する。
- ③ マスキング済み文字列を返す。

備考: -

### 8. MaskData

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static Dictionary<string, string>? MaskData(IReadOnlyDictionary<string, string>? data)` |
| 可視性 | private static |
| 戻り値 | Dictionary<string, string>? |
| 戻り値内容 | 補足データの値をマスキングした結果。該当しない場合は null。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IReadOnlyDictionary<string, string>? | 補足データ | data |

処理内容:

- ① 補足データがnullまたは空の場合はnullを返す。
- ② 元の件数に合わせて結果用辞書を作成する。
- ③ 各キーの値をマスキングして結果へ格納する。
- ④ マスキング済み補足データを返す。

備考: -

### 9. ToBreadcrumbLevel

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static BreadcrumbLevel ToBreadcrumbLevel(MonitoringLevel level)` |
| 可視性 | private static |
| 戻り値 | BreadcrumbLevel |
| 戻り値内容 | 監視レベルを操作履歴レベルへ変換した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| MonitoringLevel | 監視レベル | level |

処理内容:

- ① DebugはDebugへ変換する。
- ② WarningはWarningへ変換する。
- ③ ErrorはErrorへ変換する。
- ④ その他はInfoへ変換する。

備考: -

### 10. ToSentryLevel

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static SentryLevel ToSentryLevel(MonitoringLevel level)` |
| 可視性 | private static |
| 戻り値 | SentryLevel |
| 戻り値内容 | 監視レベルをSentryイベントレベルへ変換した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| MonitoringLevel | 監視レベル | level |

処理内容:

- ① DebugはDebugへ変換する。
- ② WarningはWarningへ変換する。
- ③ ErrorはErrorへ変換する。
- ④ その他はInfoへ変換する。

備考: -

## 処理フロー/注意事項

- Debug、Info、Warning、Errorの4段階を扱う。
- メッセージ、補足データ、タグ値は送信前にマスキングする。
- アプリログのWarningは操作履歴、Errorはイベントとして連携される。
