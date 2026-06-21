# PS-STATE-12 タブレットPOS ローカル状態管理 DBマイグレーション初期化 プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.1 | 2026/06/21 | VTI | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-STATE-12 |
| プロジェクト名 | タブレットPOS |
| 機能名 | DBマイグレーション初期化 |
| 物理クラス名 | LocalStateDbContextInitializer |
| 名前空間 | TabetPos.Core.State |
| アクセス修飾子 | public static |
| 継承/実装 | - |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/KsPosBoilerplate/TabetPos.Core/State/LocalStateDbContextInitializer.cs |
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
| 1 | public static | Task | ApplyMigrationsAsync | 端末内DBへマイグレーションを適用する。 |

## メソッド詳細

### 1. ApplyMigrationsAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public static async Task ApplyMigrationsAsync(IDbContextFactory<LocalStateDbContext> dbFactory)` |
| 可視性 | public static |
| 戻り値 | Task |

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
