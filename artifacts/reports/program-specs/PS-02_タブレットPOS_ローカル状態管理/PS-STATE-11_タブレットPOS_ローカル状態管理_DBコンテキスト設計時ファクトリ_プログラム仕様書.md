# PS-STATE-11 タブレットPOS ローカル状態管理 DBコンテキスト設計時ファクトリ プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.1 | 2026/06/21 | VTI | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-STATE-11 |
| プロジェクト名 | タブレットPOS |
| 機能名 | DBコンテキスト設計時ファクトリ |
| 物理クラス名 | LocalStateDbContextFactory |
| 名前空間 | TabetPos.Core.State |
| アクセス修飾子 | public sealed |
| 継承/実装 | IDesignTimeDbContextFactory<LocalStateDbContext> |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/tabletposboilerplate/TabetPos.Core/State/LocalStateDbContextFactory.cs |
| 対象クラス | LocalStateDbContextFactory |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

開発時のDBマイグレーション作成で使用するコンテキスト生成口である。実行時の保存先とは分離された設計時DB接続文字列を使い、マイグレーション操作を可能にする。

### 主な責務

- 設計時に必要なDB接続設定を組み立てる。
- SQLite向けのコンテキストを生成する。
- マイグレーション作成時のエントリポイントを提供する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| - | - | - | - | フィールド/プロパティ定義なし。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | public | LocalStateDbContext | CreateDbContext | 設計時DB接続設定を持つコンテキストを生成する。 |

## メソッド詳細

### 1. CreateDbContext

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public LocalStateDbContext CreateDbContext(string[] args)` |
| 可視性 | public |
| 戻り値 | LocalStateDbContext |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string[] | 起動引数 | args |

処理内容:

- ① DB接続設定のビルダーを作成する。
- ② 設計時用SQLiteファイルへの接続文字列を設定する。
- ③ 作成した接続設定でDBコンテキストを生成して返す。

備考: -

## 処理フロー/注意事項

- このファクトリはマイグレーション作成など設計時用途で使用する。
- 実行時のDBファイルパスはDI登録側で設定される。
