# PS-STATE-10 タブレットPOS ローカル状態管理 ローカル状態DBコンテキスト プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.1 | 2026/06/21 | VTI | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-STATE-10 |
| プロジェクト名 | タブレットPOS |
| 機能名 | ローカル状態DBコンテキスト |
| 物理クラス名 | LocalStateDbContext |
| 名前空間 | TabetPos.Core.State |
| アクセス修飾子 | public sealed |
| 継承/実装 | DbContext |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/KsPosBoilerplate/TabetPos.Core/State/LocalStateDbContext.cs |
| 対象クラス | LocalStateDbContext |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

ローカル状態管理で使用する端末内DBへのアクセス入口である。セッション情報と画面状態のテーブルを公開し、モデル定義を組み込んでSQLite向けの照合順序を設定する。

### 主な責務

- セッション情報テーブルへのアクセス口を提供する。
- 画面状態テーブルへのアクセス口を提供する。
- モデル作成時にテーブル定義と照合順序を適用する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| プロパティ | public | DbSet<LocalStateSessionEntity> | LocalStateSessions | セッション情報テーブル。 |
| プロパティ | public | DbSet<ViewModelSnapshotEntity> | ViewModelSnapshots | 画面状態テーブル。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | public | - | LocalStateDbContext | DB接続設定を受け取ってコンテキストを生成する。 |
| 2 | protected override | void | OnModelCreating | モデル作成時に照合順序とエンティティ設定を適用する。 |

## メソッド詳細

### 1. LocalStateDbContext

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public LocalStateDbContext(DbContextOptions<LocalStateDbContext> options)` |
| 可視性 | public |
| 戻り値 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| DbContextOptions<LocalStateDbContext> | DB接続設定 | options |

処理内容:

- ① 呼び出し元からDB接続設定を受け取る。
- ② 受け取った設定を基底コンテキストへ渡す。

備考: -

### 2. OnModelCreating

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `protected override void OnModelCreating(ModelBuilder builder)` |
| 可視性 | protected override |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| ModelBuilder | モデル構築情報 | builder |

処理内容:

- ① 文字列比較の照合順序としてBINARYを指定する。
- ② 同一アセンブリ内のエンティティ設定をまとめて適用する。
- ③ 基底コンテキストのモデル作成処理を呼び出す。

備考: -

## 処理フロー/注意事項

- 端末内DBファイルはDI登録側でアプリデータフォルダ配下に指定される。
- テーブル定義は個別の設定クラスから適用される。
