# PS-MON-07 タブレットPOS 監視ログ連携 監視イベント プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-MON-07 |
| 文書名 | タブレットPOS 監視ログ連携 監視イベント プログラム仕様書 |
| 対象 | タブレットPOS / 監視イベント |
| 版数 | 1.0.0 |
| 作成日 | 2026/06/21 |
| 作成者 | VTI サム |
| レビュー担当 | SMJ 蒲田 |
| 承認者 | SMJ 蒲田 |
| 目的 | 対象クラスの構造、フィールド／プロパティ及びメソッド仕様を定義する。 |
| 期待成果 | 実装及びレビューで参照するクラス単位の仕様を明確にする。 |

## 01_改訂履歴

| 版数 | 日付 | 変更内容 | 作成者 | 承認者 |
| --- | --- | --- | --- | --- |
| 1.0.0 | 2026/06/21 | 正式版として初版を作成。 | VTI サム | SMJ 蒲田 |

## クラス情報

| 項目 | 内容 |
| --- | --- |
| 機能名 | 監視イベント |
| 物理クラス名 | MonitoringEvent |
| 名前空間 | TabletPos.Core.Monitoring |
| アクセス修飾子 | public sealed |
| 継承/実装 | record |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/TabletPosBoilerplate/TabletPos.Core/Monitoring/MonitoringEvent.cs |
| 対象クラス | MonitoringEvent |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

監視ログへ記録または送信するカテゴリ、メッセージ、重要度、補足データをまとめて保持するデータである。

### 主な責務

- 監視イベントのカテゴリとメッセージを保持する。
- 重要度を保持し、操作履歴またはイベント送信時のレベル変換に使う。
- 必要に応じて補足データを保持する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| プロパティ | public | string | Category | イベントカテゴリ。 |
| プロパティ | public | string | Message | 監視メッセージ。 |
| プロパティ | public | MonitoringLevel | Level | 監視レベル。既定値はInfo。 |
| プロパティ | public | IReadOnlyDictionary<string, string>? | Data | 補足データ。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | public | - | MonitoringEvent | 監視イベントを生成する。 |

## メソッド詳細

### ①. MonitoringEvent

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public MonitoringEvent(string Category, string Message, MonitoringLevel Level = MonitoringLevel.Info, IReadOnlyDictionary<string, string>? Data = null)` |
| 可視性 | public |
| 戻り値 | - |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | イベントカテゴリ | Category |
| string | 監視メッセージ | Message |
| MonitoringLevel | 監視レベル | Level |
| IReadOnlyDictionary<string, string>? | 補足データ | Data |

処理内容:

- ① カテゴリとメッセージを受け取る。
- ② 監視レベルが指定されない場合はInfoとして保持する。
- ③ 補足データがある場合は保持する。

備考: -

## 処理フロー/注意事項

- 監視レベルはDebug、Info、Warning、Errorを使用する。
- メッセージと補足データは送信前にマスキングされる。
