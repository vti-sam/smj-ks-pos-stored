# PS-MON-03 タブレットPOS 監視ログ連携 Sentry設定値 プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.1 | 2026/06/21 | VTI | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-MON-03 |
| プロジェクト名 | タブレットPOS |
| 機能名 | Sentry設定値 |
| 物理クラス名 | SentrySettings |
| 名前空間 | TabetPos.Core.Monitoring |
| アクセス修飾子 | public sealed |
| 継承/実装 | - |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/KsPosBoilerplate/TabetPos.Core/Monitoring/SentrySettings.cs |
| 対象クラス | SentrySettings |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

Sentry初期化に必要な接続先、環境名、有効化フラグを保持する設定値である。アプリ設定と環境変数の両方から値を読み取り、初期化可能かどうかを判定する。

### 主な責務

- 接続先と環境名を保持する。
- 有効化フラグと初期化可否を判定する。
- アプリ設定になければ環境変数から値を取得する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| 定数 | private const | string | SectionName | 設定セクション名。 |
| プロパティ | public | string? | Dsn | Sentry接続先。 |
| プロパティ | public | string | Environment | Sentry環境名。既定値は production。 |
| プロパティ | public | bool | EnableSentry | Sentry有効化フラグ。 |
| プロパティ | public | bool | ShouldInitialize | 初期化条件を満たすかどうか。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | public static | SentrySettings | FromConfiguration | アプリ設定または環境変数からSentry設定値を生成する。 |
| 2 | private static | string? | Read | 設定値を優先し、未設定の場合は環境変数を読み取る。 |

## メソッド詳細

### 1. FromConfiguration

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public static SentrySettings FromConfiguration(IConfiguration configuration)` |
| 可視性 | public static |
| 戻り値 | SentrySettings |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IConfiguration | アプリ設定 | configuration |

処理内容:

- ① 接続先、環境名、有効化フラグを設定値または環境変数から読み取る。
- ② 有効化フラグ文字列を真偽値へ変換する。
- ③ 環境名が空の場合は production を使用する。
- ④ 読み取った値で設定値を生成して返す。

備考: -

### 2. Read

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static string? Read(IConfiguration configuration, string key, string environmentVariable)` |
| 可視性 | private static |
| 戻り値 | string? |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IConfiguration | アプリ設定 | configuration |
| string | 設定キー | key |
| string | 環境変数名 | environmentVariable |

処理内容:

- ① 指定セクションとキーから設定値を読み取る。
- ② 設定値が空または空白でなければその値を返す。
- ③ 設定値がない場合は指定された環境変数を読み取って返す。

備考: -

## 処理フロー/注意事項

- 初期化可否は有効化フラグがtrueで、接続先が空でない場合にtrueとなる。
- 環境変数は接続先、環境名、有効化フラグの3種類を使用する。
