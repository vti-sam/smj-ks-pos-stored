# PS-STATE-15 タブレットPOS ローカル状態管理 SQLiteジャーナルモード設定 プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.1 | 2026/06/21 | VTI | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-STATE-15 |
| プロジェクト名 | タブレットPOS |
| 機能名 | SQLiteジャーナルモード設定 |
| 物理クラス名 | SqliteJournalModeSettingInterceptor |
| 名前空間 | TabetPos.Core.State |
| アクセス修飾子 | public sealed |
| 継承/実装 | DbConnectionInterceptor |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/KsPosBoilerplate/TabetPos.Core/State/SqliteJournalModeSettingInterceptor.cs |
| 対象クラス | SqliteJournalModeSettingInterceptor |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

SQLite接続開始時にジャーナルモードをWALへ設定するための接続インターセプタである。端末内DBの読み書き安定性を高める目的で、SQLite接続だけを対象に設定する。

### 主な責務

- SQLite接続開始時にジャーナルモードを設定する。
- SQLite以外の接続では処理しない。
- 同期接続と非同期接続の両方に対応する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| 定数 | private const | string | CommandText | 実行するPRAGMA文。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | public override | void | ConnectionOpened | 同期接続開始時にWAL設定を実行する。 |
| 2 | public override | Task | ConnectionOpenedAsync | 非同期接続開始時にWAL設定を実行する。 |

## メソッド詳細

### 1. ConnectionOpened

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public override void ConnectionOpened(DbConnection connection, ConnectionEndEventData eventData)` |
| 可視性 | public override |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| DbConnection | DB接続 | connection |
| ConnectionEndEventData | 接続イベント情報 | eventData |

処理内容:

- ① 接続がSQLiteでない場合は処理を終了する。
- ② 接続からコマンドを作成する。
- ③ ジャーナルモード設定用のPRAGMA文を実行する。
- ④ 基底処理を呼び出す。

備考: -

### 2. ConnectionOpenedAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public override async Task ConnectionOpenedAsync(DbConnection connection, ConnectionEndEventData eventData, CancellationToken cancellationToken = default)` |
| 可視性 | public override |
| 戻り値 | Task |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| DbConnection | DB接続 | connection |
| ConnectionEndEventData | 接続イベント情報 | eventData |
| CancellationToken | キャンセル通知 | cancellationToken |

処理内容:

- ① 接続がSQLiteでない場合は処理を終了する。
- ② 接続から非同期コマンドを作成する。
- ③ ジャーナルモード設定用のPRAGMA文を非同期実行する。
- ④ 基底の非同期処理を呼び出す。

備考: -

## 処理フロー/注意事項

- DI登録時にDBコンテキストへ接続インターセプタとして追加される。
- 結合テストではファイルDBを再起動後も復元できることとWAL設定を確認している。
