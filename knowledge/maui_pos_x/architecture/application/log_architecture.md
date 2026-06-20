---
title: Log Architecture
project: maui_pos_x
type: architecture
status: confirmed
source:
  - migrated from memory/maui_pos_x/application_architecture/log_architecture.md
tags: [maui_pos_x, architecture, application_architecture, log_architecture]
---

# ログアーキテクチャ設計書

**対象:** POS MAUI Mobile App（Android / iOS / Windows）

---

## 1. 背景と方針

KSNEWSYS-155（リモートクラッシュ/ログアクセスの調査）にて、小山さんの調査結果に基づき**Sentryの採用が推奨・承認済み**です。また、KSNEWSYS-209（ログ処理）にて、実運用後の障害対応・原因特定を目的としたログ出力の整備が求められています。

本設計では、この2つのチケットの要件を統合し、以下の方針でログ基盤を構築します。

- アプリの3層アーキテクチャ（Application / Core / DeviceCtrl）に沿った責務分離
- ログレベルの切替により、本番ではDebugログを出力せず、調査時のみ有効化
- **Sentryとの連携を前提とした設計**（KSNEWSYS-155の決定事項）
- ログの永続化として**AWS S3またはOCI Object Storage**への転送を想定（KSNEWSYS-155の推奨事項）
- 開発者が個別にログ処理を実装する必要を最小限にする仕組み

---

## 2. 全体構成

ログ基盤はCoreレイヤーに集約し、ApplicationレイヤーとDeviceCtrlレイヤーはILoggerを受け取って使うだけの構成とします。

```
MauiProgram.cs（DI登録・ログProvider構成）
        │
        ├── Application Layer
        │     ViewModelBase
        │       └─ 画面表示/終了/復帰を自動ログ
        │     各ViewModel
        │       └─ 業務上重要な処理のみ手動ログ
        │
        ├── DeviceCtrl Layer
        │     StrategyBase
        │       └─ コマンド送受信を自動ログ
        │     各Strategy実装
        │       └─ プラットフォーム固有処理の詳細ログ
        │
        └── Core Layer（ログ基盤）
              ├─ LogConstants           ログカテゴリ定義
              ├─ LoggingConfiguration   ファイル出力・レベル設定
              ├─ SentryConfiguration    クラッシュ監視連携設定
              └─ HttpLoggingHandler     API通信の自動ログ
                          │
                   出力先（Provider）
                   ├─ ローカルファイル（端末内保存）
                   ├─ コンソール（開発時のみ）
                   ├─ Sentry（クラッシュ監視・リアルタイム）
                   └─ AWS S3 / OCI Object Storage（長期保存）
```

依存関係のルールとして、CoreレイヤーはUIやDeviceCtrlに依存しません。Application・DeviceCtrlの両方からCoreのログ基盤を利用する形になります。

---

## 3. ログカテゴリ

ログは以下のカテゴリで分類します。各カテゴリにはフィルタを適用でき、出力レベルを個別に制御できます。

| カテゴリ | 対象 | 出力例 |
|---------|------|-------|
| Lifecycle | 画面のライフサイクル | 画面表示: 商品登録画面 |
| Navigation | ページ遷移 | 遷移: 商品登録 → 決済 |
| API | HTTP通信 | GET /api/products → 200 (312ms) |
| DeviceCtrl.Printer | プリンター制御 | 印刷コマンド送信: 2048bytes |
| DeviceCtrl.Scanner | スキャナー制御 | スキャン受信: 4901234567890 |
| DeviceCtrl.CashChanger | 釣銭機制御 | 出金処理: ¥500 |
| DeviceCtrl.Display | カスタマーディスプレイ | 表示更新: 合計金額 |
| DeviceCtrl.MSR | 磁気カードリーダー | カード読取開始 |
| DeviceCtrl.PaymentTerminal | 決済端末 | 決済要求送信: ¥1,280 |
| Business | 業務処理 | 決済処理開始 / バーコードスキャン |

---

## 4. 各レイヤーの設計

### 4.1 Application Layer — ViewModelのログ

画面のライフサイクルログはStepViewModelBase（基底クラス）で一括処理します。個別のViewModelでは、業務上重要な箇所のみ手動でログを追加します。

**StepViewModelBase（自動ログ）の対象:**

| イベント | ログ内容 |
|---------|---------|
| OnAppearing | 画面表示: {画面名} |
| OnDisappearing | 画面終了: {画面名} |
| OnResumingAsync | 画面復帰: {画面名} |

すべてのViewModelはStepViewModelBaseを継承しているため、個別に実装する必要はありません。

**手動ログの対象（業務上重要な処理）:**

小山さんのご指摘の通り、すべての処理分岐にログを出す必要はなく、処理上重要な部分にだけ出力します。具体的には以下のような処理です。

- バーコードスキャン結果
- 決済処理の開始・結果
- 在庫関連の警告
- ユーザー操作による重要な状態変更

### 4.2 Core Layer — ログ基盤

**ファイル出力の設定:**

| 設定項目 | 値 |
|---------|-----|
| ファイル名 | pos-{日付}.log |
| 保持期間 | 30日分（自動ローテーション） |
| ファイルサイズ上限 | 10MB/ファイル |
| 出力フォーマット | `HH:mm:ss.fff [レベル] [カテゴリ] メッセージ` |

ログファイルはアプリのローカルストレージに保存します。Windows端末ではリモート接続で取得可能であり、小山さんのご指示通り、まずはローカル保存で進めます。

**API通信の自動ログ:**

HttpClientのパイプラインにログ用Handlerを組み込むことで、すべてのAPI通信を自動的に記録します。開発者がAPI呼び出しごとにログを書く必要はありません。

記録内容: HTTPメソッド、URL、ステータスコード、レスポンス時間、例外情報

### 4.3 DeviceCtrl Layer — デバイスログ

DeviceCtrlレイヤーでは、既存のExecuteCommandパターンを活用します。StrategyBaseにILoggerを注入し、コマンドの送受信を自動的にログ出力します。

**自動ログの対象:**

| タイミング | ログ内容 |
|-----------|---------|
| コマンド送信時 | デバイス種別、コマンド内容、データサイズ |
| コマンド成功時 | 処理結果、応答時間 |
| コマンド失敗時 | エラー内容、例外情報 |

各プラットフォーム固有の実装（Windows OPOS、iOS Bluetooth等）では、Debugレベルで詳細なプロトコル情報を記録します。このログは本番環境では出力されず、調査時にのみ有効化します。

**ILoggerの注入方法:**

既存のStrategyFactory.Createの流れに`SetLogger()`を追加します。FactoryがStrategyインスタンスを生成した後、DI経由で取得したILoggerを渡す形です。既存のデバイス制御コードへの影響は最小限です。

---

## 5. ログレベルの運用ルール

| レベル | 用途 | 本番環境 | クラッシュ監視 |
|--------|------|---------|-------------|
| Debug | 開発中の詳細情報（プロトコル内部、変数値） | 出力しない | — |
| Information | 通常の処理フロー（画面遷移、API通信、デバイス送受信） | 出力する | 操作履歴として蓄積 |
| Warning | 想定外だが継続可能（API遅延、リトライ発生） | 出力する | 操作履歴として蓄積 |
| Error | 障害・例外（API失敗、デバイスエラー） | 出力する | 即時通知 |
| Critical | 致命的（アプリ停止レベル） | 出力する | 即時通知 |

ログレベルの切替は設定ファイルで行います。本番リリース時はDebugログを出力しない設定とし、障害調査が必要な場合のみDebugに切り替えて詳細ログを取得します。

---

## 6. クラッシュ監視（Sentry）との連携

KSNEWSYS-155にて、小山さんの調査に基づき以下が確認・承認されています。

| 決定事項 | 内容 |
|---------|------|
| 採用ツール | **Sentry**（予算的に許容できるなら推奨 — 小山さん結論） |
| 選定理由 | .NET MAUIに公式SDKで組込可能、Firebase CrashlyticsはiOSで動作不安定 |
| ログ永続化 | **AWS S3またはOCI Object Storageに転送**（Sentryの保持期間に依存しないため） |
| 通信セキュリティ | 端末→Sentry間はTLS暗号化、追加実装不要 |
| オフライン対応 | Sentryにオフラインキャッシュ機能あり、再接続時に自動転送（追加実装不要） |

本ログ設計はILoggerを一貫して使用しているため、Sentryを追加する際は起動時の設定を1箇所変更するだけで連携が可能です。既存のログコードを修正する必要はありません。

**連携後の動作イメージ:**

開発者が書いた1行のログが、同時に3つの出力先に送られます。

| 出力先 | 対象 | 目的 |
|--------|------|------|
| ローカルファイル | すべてのログ（Information以上） | 端末上での調査 |
| コンソール | すべてのログ（開発時のみ） | 開発中のデバッグ |
| Sentry | Information以上は操作履歴として蓄積、Error以上は即時送信 | リモート監視・障害検知 |

**操作履歴（Breadcrumb）と障害通知（Event）の関係:**

通常のログ（Information / Warning）は「操作履歴」としてアプリ内に一時的に蓄積されます。これだけではSentryに送信されません。

Error以上のログが発生した時点で、そのエラー情報に加えて、それまでに蓄積された操作履歴が一括でSentryに送信されます。これにより、障害発生前にユーザーがどのような操作をしていたかを時系列で確認できます。

**なぜこの仕組みがコスト最適化につながるか:**

Sentryの課金対象は「Event（送信されたエラー件数）」です。Breadcrumbはアプリ内に蓄積されるだけで、Sentryへの送信は発生しません。つまり課金対象外です。

仮にすべてのログをEventとして送信した場合と、Breadcrumb＋Eventの仕組みを使った場合を比較すると：

| 方式 | 1台・1日あたりの送信数（目安） | 10台・30日 | 無料枠（5,000/月）|
|------|---------------------------|-----------|----------------|
| すべてEvent送信 | 約500〜1,000件 | 150,000〜300,000件 | 大幅超過 → 有料 |
| Breadcrumb＋Event | 約5〜20件（エラー時のみ） | 1,500〜6,000件 | **無料枠内で運用可能** |

POS端末は1日に数百回の画面遷移・API通信・デバイス操作を行いますが、実際にエラーが発生するのはごく一部です。正常な操作ログはBreadcrumbとして端末内に保持し、エラー発生時にのみまとめてSentryに送信することで、**情報量を維持したまま送信件数を最小限に抑える**ことができます。

さらに、エラー発生時にはBreadcrumbが自動的に添付されるため、障害の原因調査に必要な情報（直前の操作履歴）は失われません。「コストを下げたが情報も減った」ということにはなりません。

例:

```
10:00:01 [Info] 画面表示: 商品登録画面          ← 操作履歴として蓄積
10:00:05 [Info] バーコードスキャン: 4901234567890 ← 操作履歴として蓄積
10:00:06 [Info] API呼出: GET /api/products      ← 操作履歴として蓄積
10:00:07 [Warn] API応答遅延: 3,200ms            ← 操作履歴として蓄積
10:00:08 [Error] 決済処理で例外発生              ← Sentryに送信（上記の操作履歴も添付）
```

Sentryのダッシュボード上では、このエラーがどの端末・どのOSバージョンで発生したか、直前にどのような操作をしていたかがすべて確認できます。

---

## 7. 出力サンプル

実際のログファイルの出力イメージです。

```
10:00:01.123 [INF] [Lifecycle]       画面表示: CommodityRegistrationViewModel
10:00:03.456 [INF] [Business]        スキャン: 4901234567890
10:00:03.500 [INF] [API]             GET /api/products/4901234567890 開始
10:00:03.812 [INF] [API]             GET /api/products/4901234567890 → 200 (312ms)
10:00:15.100 [INF] [Business]        決済処理開始
10:00:15.200 [INF] [DeviceCtrl.Printer]  印刷コマンド送信: 2048bytes
10:00:15.350 [DBG] [DeviceCtrl.Printer]  OPOS ClaimDevice開始
10:00:15.500 [DBG] [DeviceCtrl.Printer]  OPOS PrintNormal実行
10:00:15.650 [INF] [DeviceCtrl.Printer]  印刷結果: 成功
10:00:16.000 [INF] [Lifecycle]       画面終了: CommodityRegistrationViewModel
```

DBG（Debug）レベルのログは本番環境では表示されません。設定変更で有効化した場合のみ出力されます。

---

## 8. 実装スケジュール案

| フェーズ | 内容 | 備考 |
|---------|------|------|
| Phase 1 | Core: ログ基盤構築（LogConstants, LoggingConfiguration, HttpLoggingHandler） | ログ出力の土台 |
| Phase 2 | Application: StepViewModelBaseにライフサイクル自動ログ追加 | 全画面に自動適用 |
| Phase 3 | DeviceCtrl: StrategyBaseにILogger注入、コマンドログ追加 | デバイス通信の可視化 |
| Phase 4 | 各ViewModel・Strategyの業務重要箇所に手動ログ追加 | 小山さん指摘の対応 |
| Phase 5 | Sentry導入（無料プランでPOC → 本番） | KSNEWSYS-155承認済み |
| Phase 6 | ログ永続化（AWS S3 / OCI Object Storageへの転送） | 後述※現時点では未実施 |

Phase 1〜3で基盤を固め、Phase 4で小山さんにご指摘いただいた「処理上重要な部分へのログ出力」を対応します。Phase 5のSentry導入は、KSNEWSYS-155で承認済みの方針に基づき、既存のログコードを変更することなく追加可能です。

### Phase 6（ログ永続化）について

KSNEWSYS-155にて、ログの永続化としてAWS S3またはOCI Object Storageへの転送が推奨されています。ただし、現時点では以下の理由により本フェーズは未実施とします。

**現時点で未実施とする理由:**

- KSNEWSYS-209での小山さんのご判断の通り、Windows端末はリモート接続でログ取得可能であり、クラウド転送の優先度は低い
- Sentryのダッシュボードでクラッシュ情報・操作履歴は十分に確認できるため、リアルタイムの障害対応には支障がない
- クラウド転送を実装する場合、バッチアップロード処理・リトライ・認証情報管理など相応の開発工数が必要となり、現在の優先タスクとのバランスを考慮する必要がある

**将来的に必要となるケース:**

- 監査目的でログの長期保存（1年以上等）が求められた場合
- Sentryの保持期間（プランにより30〜90日）を超えてログを参照する必要が出た場合
- iOS/Android端末の台数が増加し、リモート接続でのログ回収が現実的でなくなった場合

上記のいずれかに該当した段階で、Phase 6として改めて検討・実施いたします。
