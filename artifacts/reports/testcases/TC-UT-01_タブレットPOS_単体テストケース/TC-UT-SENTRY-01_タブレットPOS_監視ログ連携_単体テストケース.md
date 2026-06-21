# TC-UT-SENTRY-01 テストケース — タブレットPOS 監視ログ連携 単体テスト

## @meta
プロジェクト名: タブレットPOS
モジュール: 監視ログ連携
段階: 単体テスト
作成者: VTI-SAM
作成日: 2026/06/21
作成日時: 2026/06/21 00:00
環境: ローカル

## テストケース {sheet=監視ログ連携単体テスト}
| ID | 画面/機能カテゴリ | 大項目 | 中項目 | 前提条件 | 実行手順 | 期待される結果 | 種別 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| UT-SENTRY-001 | 監視ログ連携 | 機微情報マスキング | 対応済み値の変換 | null、空文字、通常文字列、カード番号、会員番号、電話番号、メールアドレスの入力値を用意する。 | 1. 各入力値に対してマスキング処理を実行する。<br>2. 変換結果を期待値と比較する。 | nullと空文字と通常文字列はそのまま返り、カード番号、会員番号、電話番号、メールアドレスは期待される伏字形式へ変換される。 | N |
| UT-SENTRY-002 | 監視ログ連携 | 機微情報マスキング | 複数機微情報の一括変換 | 1つの文字列内にカード番号、メールアドレス、電話番号が含まれている。 | 1. 対象文字列に対してマスキング処理を実行する。 | 文字列内のすべての機微情報候補がそれぞれ期待される伏字形式へ変換される。 | N |
| UT-SENTRY-003 | 監視ログ連携 | Sentry初期化設定 | 送信前イベントメッセージのマスク | 設定値からSentry設定を生成し、インメモリtransport付きでSentry SDKを初期化している。 | 1. カード番号を含むメッセージをSentryへcaptureする。<br>2. flush後に送信payloadを取得する。 | payloadには伏字化されたカード番号が含まれ、元のカード番号は含まれない。 | N |
| UT-SENTRY-004 | 監視ログ連携 | Sentry初期化設定 | 操作履歴メッセージのマスク | インメモリtransport付きでSentry SDKが初期化されている。 | 1. メールアドレスを含むbreadcrumbを追加する。<br>2. 任意のメッセージをcaptureしてpayloadを取得する。 | payloadには伏字化されたメールアドレスが含まれ、元のメールアドレスは含まれない。 | N |
| UT-SENTRY-005 | 監視ログ連携 | Sentry監視サービス | 監視コンテキストのタグ設定 | Noop transport付きでSentry SDKを初期化し、画面名、業務フロー、店舗、端末、デバイス、API情報を持つコンテキストを用意する。 | 1. 監視コンテキスト設定処理を実行する。<br>2. Sentry scope の tag を確認する。 | screen_name、business_flow、store_code、terminal_id、device_type、api_endpoint が期待値で設定される。 | N |
| UT-SENTRY-006 | 監視ログ連携 | Sentry監視サービス | null値コンテキストの安全処理 | Noop transport付きでSentry SDKを初期化し、すべて未設定のコンテキストを用意する。 | 1. 監視コンテキスト設定処理を実行する。<br>2. Sentry scope の tag を確認する。 | 例外が発生せず、空値のtagは設定されない。 | B |
| UT-SENTRY-007 | 監視ログ連携 | Sentry監視サービス | breadcrumb追加 | Noop transport付きでSentry SDKを初期化し、カテゴリ、メッセージ、Infoレベルを持つ監視イベントを用意する。 | 1. breadcrumb追加処理を実行する。<br>2. Sentry scope のbreadcrumbを確認する。 | breadcrumbのカテゴリ、メッセージ、レベルが監視イベントの内容と一致する。 | N |
| UT-SENTRY-008 | 監視ログ連携 | Sentry監視サービス | メッセージイベント送信 | Noop transport付きでSentry SDKを初期化し、Infoレベルの監視イベントを用意する。 | 1. メッセージcapture処理を実行する。<br>2. 戻り値を確認する。 | 空でない文字列のイベントIDが返る。 | N |
| UT-SENTRY-009 | 監視ログ連携 | Sentry監視サービス | 例外イベント送信 | Noop transport付きでSentry SDKを初期化し、例外を用意する。 | 1. 例外capture処理を実行する。<br>2. 戻り値を確認する。 | 空でない文字列のイベントIDが返る。 | N |
| UT-SENTRY-010 | 監視ログ連携 | Sentry監視サービス | 補足イベント付き例外送信 | Noop transport付きでSentry SDKを初期化し、例外とWarningレベルの補足監視イベントを用意する。 | 1. 補足監視イベント付きで例外capture処理を実行する。<br>2. 戻り値を確認する。 | 補足イベントを持つ例外送信が行われ、空でない文字列のイベントIDが返る。 | N |
| UT-SENTRY-011 | 監視ログ連携 | Sentry監視サービス | 送信キューflush | Noop transport付きでSentry SDKが有効になっている。 | 1. 5秒のtimeoutを指定してflush処理を実行する。 | flush処理が完了し、Sentry SDKは有効状態のままである。 | N |
| UT-SENTRY-012 | 監視ログ連携 | Sentry監視サービス | カスタムタグ設定 | 追加タグを2件持つ監視コンテキストを用意する。 | 1. 監視コンテキスト設定処理を実行する。<br>2. Sentry scope のtagを確認する。 | 追加タグ2件が期待値でscopeへ設定される。 | N |
| UT-SENTRY-013 | 監視ログ連携 | Sentry監視サービス | 複数ログレベルのbreadcrumb変換 | Debug、Info、Warning、Error の監視レベルを持つイベントを用意する。 | 1. 各レベルのイベントでbreadcrumb追加処理を実行する。<br>2. Sentry scope のbreadcrumbレベル一覧を確認する。 | Debug、Info、Warning、Error の各レベルが対応するbreadcrumbレベルとして記録される。 | B |

## 基本情報
| 項目 | 内容 |
| --- | --- |
| 文書ID | TC-UT-SENTRY-01 |
| プロジェクト名 | タブレットPOS |
| モジュール名 | 監視ログ連携 |
| テスト段階 | Unit Test |
| 作成者 | VTI-SAM |
| 作成日 | 2026/06/21 |
| 環境 | ローカル |

## 更新履歴
| バージョン | 依頼者 | 更新者 | 更新日時 | 変更理由 | シート名 | 更新内容 |
| --- | --- | --- | --- | --- | --- | --- |
| 1.0.0 | - | VTI-SAM | 2026/06/21 | 新規作成 | 監視ログ連携単体テスト | 現行ソースのSentry/監視ログ関連テストから単体テストケースを作成 |
