# PS-MON-04 タブレットPOS 監視ログ連携 Sentry初期化設定 プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.1 | 2026/06/21 | VTI | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-MON-04 |
| プロジェクト名 | タブレットPOS |
| 機能名 | Sentry初期化設定 |
| 物理クラス名 | SentryConfiguration |
| 名前空間 | TabetPos.Core.Monitoring |
| アクセス修飾子 | public static |
| 継承/実装 | - |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/KsPosBoilerplate/TabetPos.Core/Monitoring/SentryConfiguration.cs |
| 対象クラス | SentryConfiguration |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

Sentry SDKの初期化オプションを設定するユーティリティである。個人情報送信を無効化し、送信前イベントと操作履歴にマスキング処理を組み込む。

### 主な責務

- Sentry SDKの接続先、環境、送信方針を設定する。
- 個人情報送信を無効化し、トレース送信率を0にする。
- イベント送信前と操作履歴記録前にマスキングを適用する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| - | - | - | - | フィールド/プロパティ定義なし。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | public static | void | Configure | Sentry SDKの初期化オプションを設定する。 |
| 2 | private static | SentryEvent | MaskEvent | 送信前イベントのメッセージをマスキングする。 |
| 3 | private static | Breadcrumb | MaskBreadcrumb | 操作履歴のメッセージをマスキングする。 |

## メソッド詳細

### 1. Configure

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public static void Configure(SentryOptions options, SentrySettings settings)` |
| 可視性 | public static |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| SentryOptions | Sentry初期化オプション | options |
| SentrySettings | Sentry設定値 | settings |

処理内容:

- ① 接続先と環境名を設定する。
- ② 個人情報送信を無効化し、トレース送信率を0にする。
- ③ 操作履歴数、セッション追跡、スタックトレース添付、起動時間検出を設定する。
- ④ イベント送信前のマスキング処理を登録する。
- ⑤ 操作履歴登録前のマスキング処理を登録する。

備考: -

### 2. MaskEvent

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static SentryEvent MaskEvent(SentryEvent sentryEvent)` |
| 可視性 | private static |
| 戻り値 | SentryEvent |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| SentryEvent | 送信前イベント | sentryEvent |

処理内容:

- ① イベントにメッセージ文字列がない場合はそのまま返す。
- ② メッセージ文字列を共通マスキング処理へ渡す。
- ③ マスキング済みメッセージを設定し直してイベントを返す。

備考: -

### 3. MaskBreadcrumb

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static Breadcrumb MaskBreadcrumb(Breadcrumb breadcrumb)` |
| 可視性 | private static |
| 戻り値 | Breadcrumb |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Breadcrumb | 操作履歴 | breadcrumb |

処理内容:

- ① 操作履歴メッセージが空の場合はそのまま返す。
- ② メッセージを共通マスキング処理へ渡す。
- ③ 種別、補足データ、カテゴリ、レベルを維持して操作履歴を再生成する。

備考: -

## 処理フロー/注意事項

- 個人情報送信は無効化する。
- トレースサンプリング率は0であり、性能トレースは送信しない。
- イベント本文と操作履歴のメッセージは送信前にマスキングされる。
