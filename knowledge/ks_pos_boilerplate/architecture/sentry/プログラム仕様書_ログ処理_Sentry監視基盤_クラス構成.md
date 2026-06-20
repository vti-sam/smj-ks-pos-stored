---
project: ks_host
source:
- migrated from management/program-specs/sentry/プログラム仕様書_ログ処理_Sentry監視基盤_クラス構成.md
status: confirmed
tags:
- ks_host
- architecture
- sentry
- プログラム仕様書_ログ処理_sentry監視基盤_クラス構成
title: プログラム仕様書_ログ処理_Sentry監視基盤_クラス構成
type: architecture
---

# プログラム仕様書_ログ処理_Sentry監視基盤_クラス構成

## 1. 変更履歴

| バージョン | 作成者 | 更新者 | 更新日 | 変更理由 | 更新内容 |
|---|---|---|---|---|---|
| 0.0.1 | VTI | VTI | 2026年05月22日 | 初版作成 | Sentry監視基盤のクラス構成、責務、処理フローを記載 |

## 2. 表紙

| 項目 | 内容 |
|---|---|
| プロジェクト名 | タブレットPOS |
| 機能名 | ログ処理 / Sentry監視基盤 |
| 対象アプリ | KsPos.Applications |
| 対象範囲 | アプリログ、画面ライフサイクル、画面遷移、例外送信、マスキング |
| 備考 | API通信、デバイス制御ログの自動連携は今後の実装対象 |

## 3. 全体方針

Sentry SDKへの直接依存はInfrastructure層に閉じ込める。
Presentation層および今後追加されるApplication層は、`IMonitoringService`のみを利用する。

`Info` / `Warning` はエラー調査用のBreadcrumbとして記録し、`Error` / `Fatal` はSentry Eventとして送信する。
個人情報または機微情報の可能性がある文字列は、Sentry送信前に`SensitiveDataMasker`でマスキングする。

## 4. クラス構成

```mermaid
flowchart TB
    subgraph Presentation["Presentation層"]
        MainPageViewModel["MainPageViewModel\n結合テスト画面"]
        BaseViewModel["BaseViewModel\n画面ライフサイクル連携"]
    end

    subgraph Ports["Ports層"]
        IMonitoringService["IMonitoringService"]
        MonitoringEvent["MonitoringEvent"]
        MonitoringContext["MonitoringContext"]
        MonitoringLevel["MonitoringLevel"]
    end

    subgraph Infrastructure["Infrastructure層"]
        SentryMonitoringService["SentryMonitoringService"]
        SentryConfiguration["SentryConfiguration"]
        SentrySettings["SentrySettings"]
        SensitiveDataMasker["SensitiveDataMasker"]
        MauiNavigationService["MauiNavigationService\n画面遷移Breadcrumb"]
    end

    subgraph Startup["Startup"]
        MauiProgram["MauiProgram"]
        DependencyInjection["DependencyInjection"]
    end

    ExternalSentry["Sentry"]

    MainPageViewModel --> IMonitoringService
    BaseViewModel --> IMonitoringService
    MauiNavigationService --> IMonitoringService
    IMonitoringService --> MonitoringEvent
    IMonitoringService --> MonitoringContext
    MonitoringEvent --> MonitoringLevel
    DependencyInjection --> SentryMonitoringService
    MauiProgram --> SentrySettings
    MauiProgram --> SentryConfiguration
    SentryMonitoringService --> SensitiveDataMasker
    SentryConfiguration --> SensitiveDataMasker
    SentryMonitoringService --> ExternalSentry
    SentryConfiguration --> ExternalSentry
```

## 5. イベント送信シーケンス

```mermaid
sequenceDiagram
    autonumber
    participant Page as 画面 / ViewModel
    participant Port as IMonitoringService
    participant Impl as SentryMonitoringService
    participant Masker as SensitiveDataMasker
    participant SDK as Sentry SDK
    participant Sentry as Sentry

    Page->>Port: CaptureMessage(MonitoringEvent)
    Port->>Impl: CaptureMessage(MonitoringEvent)
    Impl->>Masker: Mask(message)
    Masker-->>Impl: マスキング済み文字列
    Impl->>SDK: CaptureMessage(maskedMessage, level)
    SDK->>Sentry: Event送信
    Sentry-->>SDK: Event ID
    SDK-->>Impl: Event ID
    Impl-->>Page: Event ID文字列
```

## 6. 画面ライフサイクル / 画面遷移フロー

```mermaid
sequenceDiagram
    autonumber
    participant Base as BaseViewModel
    participant Nav as MauiNavigationService
    participant Mon as IMonitoringService
    participant Sentry as SentryMonitoringService

    Base->>Mon: SetContext(screen_name)
    Mon->>Sentry: SetContext(MonitoringContext)
    Base->>Mon: AddBreadcrumb(lifecycle / appearing)
    Mon->>Sentry: AddBreadcrumb(MonitoringEvent)

    Nav->>Mon: AddBreadcrumb(navigation / navigate_start)
    Nav->>Nav: Shell.Current.GoToAsync(route)
    Nav->>Mon: AddBreadcrumb(navigation / navigate_success)

    alt 画面遷移失敗
        Nav->>Mon: CaptureException(exception, navigate_failed)
        Mon->>Sentry: CaptureException(exception)
    end
```

## 7. クラス一覧

| No | クラス / Enum / Interface | 層 | 主な責務 |
|---:|---|---|---|
| 1 | `IMonitoringService` | Ports | 監視処理の抽象化 |
| 2 | `MonitoringEvent` | Ports | ログイベント情報の保持 |
| 3 | `MonitoringContext` | Ports | 画面、業務、端末などのコンテキスト保持 |
| 4 | `MonitoringLevel` | Ports | ログレベル定義 |
| 5 | `SentryMonitoringService` | Infrastructure | `IMonitoringService`のSentry実装 |
| 6 | `SentryConfiguration` | Infrastructure | Sentry SDK初期化オプション設定 |
| 7 | `SensitiveDataMasker` | Infrastructure | 機微情報の文字列マスキング |
| 8 | `SentrySettings` | Infrastructure | Sentry設定値の読み込み |

## 8. 補足

- 現在のDSN直書きは結合テスト用の一時対応であり、本番リリース前に環境変数または実行時設定へ移行する。
- API通信ログ、デバイス制御ログは、実際の通信基盤とデバイスAdapterが確定後に共通処理へ組み込む。
- Mermaid記法はMermaid 11系互換の`flowchart`および`sequenceDiagram`を使用する。
