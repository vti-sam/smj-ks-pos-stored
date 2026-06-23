# PS-STATE-14 タブレットPOS ローカル状態管理 スナップショットテーブル定義 プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.1 | 2026/06/21 | VTI | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-STATE-14 |
| プロジェクト名 | タブレットPOS |
| 機能名 | スナップショットテーブル定義 |
| 物理クラス名 | ViewModelSnapshotConfiguration |
| 名前空間 | TabetPos.Core.State |
| アクセス修飾子 | public sealed |
| 継承/実装 | IEntityTypeConfiguration<ViewModelSnapshotEntity> |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/tabletposboilerplate/TabetPos.Core/State/ViewModelSnapshotConfiguration.cs |
| 対象クラス | ViewModelSnapshotConfiguration |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

画面状態を端末内DBへ保存するためのテーブル名、列名、制約、親子関係を定義する設定である。

### 主な責務

- 画面状態テーブルの物理名を設定する。
- 保存キー、画面種別、JSONデータなどの列制約を設定する。
- セッションとの親子関係と削除連動を設定する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| - | - | - | - | フィールド/プロパティ定義なし。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | public | void | Configure | 画面状態テーブルのDBマッピングを設定する。 |

## メソッド詳細

### 1. Configure

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Configure(EntityTypeBuilder<ViewModelSnapshotEntity> builder)` |
| 可視性 | public |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| EntityTypeBuilder<ViewModelSnapshotEntity> | テーブル構築情報 | builder |

処理内容:

- ① テーブル名を viewModelSnapshots に設定する。
- ② 主キー名と各列名を設定する。
- ③ 画面状態キー、画面種別、JSONデータ、更新日時の必須条件を設定する。
- ④ セッションIDと画面状態キーの組み合わせに一意インデックスを設定する。
- ⑤ セッションとの外部キーと削除連動を設定する。

備考: -

## 処理フロー/注意事項

- 同一セッション内で同じ画面状態キーの保存データは1件に限定する。
- 親セッション削除時は配下の画面状態も削除される。
