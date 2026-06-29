# PS-STATE-07 タブレットPOS ローカル状態管理 セッション情報モデル プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.1 | 2026/06/21 | VTI | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-STATE-07 |
| プロジェクト名 | タブレットPOS |
| 機能名 | セッション情報モデル |
| 物理クラス名 | LocalStateSession |
| 名前空間 | TabetPos.Core.State |
| アクセス修飾子 | public sealed |
| 継承/実装 | record |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/tabletposboilerplate/TabetPos.Core/State/LocalStateSession.cs |
| 対象クラス | LocalStateSession |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

端末内に保持しているセッションの状態を呼び出し側へ返すための読み取り用データである。DB行のうち、画面状態管理で必要な識別子、状態、業務フロー、最終ルート、日時を保持する。

### 主な責務

- セッションの識別情報を保持する。
- セッション状態と業務フローを保持する。
- 作成日時、更新日時、有効期限を保持する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| プロパティ | public | Guid | Id | セッションID。 |
| プロパティ | public | string | SessionKey | 呼び出し側が指定するセッションキー。 |
| プロパティ | public | string | Status | セッション状態。 |
| プロパティ | public | string? | BusinessFlow | 業務フロー名。 |
| プロパティ | public | string? | LastRoute | 最後に保存された画面ルート。 |
| プロパティ | public | DateTime | CreatedAtUtc | 作成日時UTC。 |
| プロパティ | public | DateTime | UpdatedAtUtc | 更新日時UTC。 |
| プロパティ | public | DateTime? | ExpiresAtUtc | 有効期限UTC。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | public | - | LocalStateSession | セッション情報を保持する読み取り用データを生成する。 |

## メソッド詳細

### 1. LocalStateSession

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public LocalStateSession(Guid Id, string SessionKey, string Status, string? BusinessFlow, string? LastRoute, DateTime CreatedAtUtc, DateTime UpdatedAtUtc, DateTime? ExpiresAtUtc)` |
| 可視性 | public |
| 戻り値 | - |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Guid | セッションID | Id |
| string | セッションキー | SessionKey |
| string | セッション状態 | Status |
| string? | 業務フロー名 | BusinessFlow |
| string? | 最終ルート | LastRoute |
| DateTime | 作成日時UTC | CreatedAtUtc |
| DateTime | 更新日時UTC | UpdatedAtUtc |
| DateTime? | 有効期限UTC | ExpiresAtUtc |

処理内容:

- ① セッション識別子とキーを受け取る。
- ② 状態、業務フロー、最終ルートを受け取る。
- ③ 作成日時、更新日時、有効期限を受け取り、読み取り用データとして保持する。

備考: -

## 処理フロー/注意事項

- DB行を外部へ直接返さず、この読み取り用データへ変換して返す。
