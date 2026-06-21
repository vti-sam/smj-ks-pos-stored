# PS-STATE-13 タブレットPOS ローカル状態管理 セッションテーブル定義 プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.1 | 2026/06/21 | VTI | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-STATE-13 |
| プロジェクト名 | タブレットPOS |
| 機能名 | セッションテーブル定義 |
| 物理クラス名 | LocalStateSessionConfiguration |
| 名前空間 | TabetPos.Core.State |
| アクセス修飾子 | public sealed |
| 継承/実装 | IEntityTypeConfiguration<LocalStateSessionEntity> |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/KsPosBoilerplate/TabetPos.Core/State/LocalStateSessionConfiguration.cs |
| 対象クラス | LocalStateSessionConfiguration |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

セッション情報を端末内DBへ保存するためのテーブル名、列名、桁数、必須制約、インデックスを定義する設定である。

### 主な責務

- セッション情報テーブルの物理名を設定する。
- 各列の名前、必須条件、最大長を設定する。
- セッションキーの一意制約と状態検索用インデックスを設定する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| - | - | - | - | フィールド/プロパティ定義なし。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | public | void | Configure | セッション情報テーブルのDBマッピングを設定する。 |

## メソッド詳細

### 1. Configure

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Configure(EntityTypeBuilder<LocalStateSessionEntity> builder)` |
| 可視性 | public |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| EntityTypeBuilder<LocalStateSessionEntity> | テーブル構築情報 | builder |

処理内容:

- ① テーブル名を localStateSessions に設定する。
- ② 主キー名と各列名を設定する。
- ③ セッションキー、状態、日時などの必須条件と最大長を設定する。
- ④ セッションキーに一意インデックスを設定する。
- ⑤ 状態列に検索用インデックスを設定する。

備考: -

## 処理フロー/注意事項

- セッションキーは最大128文字で一意とする。
- 最終ルートは最大512文字、アプリバージョンは最大64文字で保持する。
