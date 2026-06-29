# PS-MON-07 タブレットPOS 監視ログ連携 監視イベント プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.1 | 2026/06/21 | VTI | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-MON-07 |
| プロジェクト名 | タブレットPOS |
| 機能名 | 監視イベント |
| 物理クラス名 | MonitoringEvent |
| 名前空間 | TabetPos.Core.Monitoring |
| アクセス修飾子 | public sealed |
| 継承/実装 | record |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/tabletposboilerplate/TabetPos.Core/Monitoring/MonitoringEvent.cs |
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
| 1 | public | - | MonitoringEvent | 監視イベントを生成する。 |

## メソッド詳細

### 1. MonitoringEvent

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
