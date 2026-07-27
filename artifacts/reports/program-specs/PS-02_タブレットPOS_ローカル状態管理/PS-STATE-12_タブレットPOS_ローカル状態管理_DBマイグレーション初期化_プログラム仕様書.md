# PS-STATE-12 タブレットPOS ローカル状態管理 DBマイグレーション初期化 プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-STATE-12 |
| 文書名 | タブレットPOS ローカル状態管理 DBマイグレーション初期化 プログラム仕様書 |
| 対象 | タブレットPOS / DBマイグレーション初期化 |
| 版数 | 0.0.1 |
| 作成日 | 2026/06/21 |
| 作成者 | VTI サム, VTI 吉田 |
| レビュー担当 | SMJ 蒲田 |
| 承認者 | SMJ 蒲田 |
| 目的 | 対象クラスの構造、フィールド／プロパティ及びメソッド仕様を定義する。 |
| 期待成果 | 実装及びレビューで参照するクラス単位の仕様を明確にする。 |

## 01_改訂履歴

| 版数 | 日付 | 変更内容 | 作成者 | 承認者 |
| --- | --- | --- | --- | --- |
| 0.0.1 | 2026/06/21 | 初版作成 | VTI |  |

## クラス情報

| 項目 | 内容 |
| --- | --- |
| 機能名 | DBマイグレーション初期化 |
| 物理クラス名 | LocalStateDbContextInitializer |
| 名前空間 | TabetPos.Core.State |
| アクセス修飾子 | public static |
| 継承/実装 | - |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/tabletposboilerplate/TabetPos.Core/State/LocalStateDbContextInitializer.cs |
| 対象クラス | LocalStateDbContextInitializer |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

アプリ起動時や初期化時に端末内DBのマイグレーションを適用するためのユーティリティである。DBコンテキストを生成し、未適用の変更をDBへ反映する。

### 主な責務

- DBコンテキストを非同期で作成する。
- 未適用マイグレーションをDBへ反映する。
- 処理完了後にコンテキストを解放する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| - | - | - | - | フィールド/プロパティ定義なし。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | public static | Task | ApplyMigrationsAsync | 端末内DBへマイグレーションを適用する。 |

## メソッド詳細

### ①. ApplyMigrationsAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public static async Task ApplyMigrationsAsync(IDbContextFactory<LocalStateDbContext> dbFactory)` |
| 可視性 | public static |
| 戻り値 | Task |
| 戻り値内容 | 非同期処理の完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IDbContextFactory<LocalStateDbContext> | DBコンテキストファクトリ | dbFactory |

処理内容:

- ① DBコンテキストファクトリからコンテキストを非同期生成する。
- ② DBに未適用のマイグレーションを反映する。
- ③ 処理完了後にコンテキストを解放する。

備考: -

## 処理フロー/注意事項

- DBファイルの作成と更新はEF Coreのマイグレーション機構に委譲する。
