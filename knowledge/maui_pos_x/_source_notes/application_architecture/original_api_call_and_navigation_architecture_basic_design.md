---
title: Original API Call And Navigation Architecture Basic Design
project: maui_pos_x
type: architecture
status: confirmed
source:
  - migrated from memory/maui_pos_x/application_architecture/_source_notes/original_api_call_and_navigation_architecture_basic_design.md
tags: [maui_pos_x, architecture, application_architecture, source_notes, original_api_call_and_navigation_architecture_basic_design]
---

# API呼び出し・画面遷移 アーキテクチャ基本設計書 — MauiPOSX

| 項目           | 内容                                          |
| -------------- | --------------------------------------------- |
| 文書番号       | タブレットPOS-API-NAV-BD-001                          |
| 作成日         | 2026年03月26日                                |
| プロジェクト名 | MauiPOSX - API呼び出し・画面遷移アーキテクチャ |

---

## 1. API アーキテクチャ（端末からAPIを呼び出し）

### 1.1. アーキテクチャ概要と Request Pipeline

Typed HttpClient と Dependency Injection を組み合わせたモデルを採用している。各リクエストは以下のレイヤーを順に通過する。

```mermaid
sequenceDiagram
    box Application
    participant UI as 画面 (UI)
    participant SVC as 業務処理
    participant API as API Client
    end
    participant EXT as HttpClientExtensions
    participant SVR as APIサーバー

    UI->>SVC: Serviceを呼び出す
    SVC->>API: API Client を呼び出す
    API->>EXT: リクエスト作成
    EXT->>EXT: 認証トークン付与
    EXT->>EXT: リクエスト/レスポンスのログ記録
    EXT->>SVR: HTTPリクエスト送信
    SVR-->>EXT: HTTPレスポンス
    EXT-->>API: ApiResponse<T> 返却
    API-->>SVC: 結果返却
    SVC-->>UI: UI状態更新
```

各レイヤーの役割:

| 説明 | 技術用語 | 役割 | 特徴 |
| --- | --- | --- | --- |
| 画面 (UI) | ViewModel | Serviceを呼び出し、UI状態を処理 | HTTPを意識しない |
| 業務処理 | Service | ビジネスロジックの統括 | 1つまたは複数のAPI Clientを呼び出す |
| API Client | API Client | 1ドメインのEndpointをカプセル化 | Typed HttpClient, DI注入 |
| リクエスト作成 + トークン付与 | HttpClientExtensions | リクエスト構築、レスポンス解析 | GET (query string) / POST (JSON body) |

各ApiClientは1つの業務ドメインを担当し、`CoreServiceCollectionExtensions.AddCoreLayer` でDIコンテナに登録される。

#### デフォルト設定

| 設定 | 値 |
| --- | --- |
| Default Timeout | 30 秒 |
| Connection Timeout | 5 秒 |
| Max Retry Attempts | 3 |

---

### 1.2. Request Flow — GET と POST

```mermaid
sequenceDiagram
    participant UI as 画面
    participant SVC as 業務処理
    participant API as API Client
    participant EXT as HttpClientExtensions
    participant SVR as APIサーバー

    UI->>SVC: 業務処理を呼び出す
    SVC->>API: APIを呼び出す

    alt データ取得 (GET)
        API->>EXT: GetAsync<TResponse>(endpoint)
    else データ送信 (POST)
        API->>EXT: PostAsync<TRequest, TResponse>(endpoint, data)
    end

    EXT->>EXT: 認証トークン付与
    EXT->>SVR: HTTPリクエスト送信
```

- データ取得 (GET): エンドポイントURLに直接リクエストを送信する。
- データ送信 (POST): データはJSON形式に自動変換される。null値は自動的にスキップされる。
- 認証: `IAuthenticationService` 経由でトークンを取得し、`Authorization: Bearer` ヘッダーに自動付与する。
- Endpoint: `ApiConfiguration.Endpoints` で集中定義する。

---

### 1.3. Response Flow

全ての戻り値は `ApiResponse<T>` で統一的にラップされる:

```mermaid
sequenceDiagram
    participant SVR as APIサーバー
    participant EXT as HttpClientExtensions
    participant API as API Client
    participant APP as 呼び出し元

    SVR-->>EXT: HTTPレスポンス

    alt HTTPステータス成功
        EXT->>EXT: JSONデシリアライズ
    else HTTPステータスエラー
        EXT->>EXT: ErrorResponse にマッピング
    end

    alt 成功
        EXT-->>API: ApiResponse.Success(data)
    else 失敗
        EXT-->>API: ApiResponse.Failure(error)
    end

    API-->>APP: ApiResponse<T>

    Note over APP: 統一結果:<br/>・成功 or 失敗<br/>・戻りデータ<br/>・エラー情報（存在する場合）<br/>・HTTPステータスコード
```

> エラーは `HttpClientExtensions` 内部で処理され、`ApiException` として throw される。呼び出し元は常に `ApiResponse<T>` を受け取り、成功/失敗のみ確認すればよい。

---

### 1.4. エラーハンドリング

`HttpClientExtensions` 内で以下のエラーを一元処理する:

```mermaid
sequenceDiagram
    participant REQ as リクエスト
    participant EXT as HttpClientExtensions
    participant SVR as APIサーバー

    REQ->>EXT: リクエスト送信
    EXT->>SVR: HTTPリクエスト

    alt HttpRequestException
        Note over EXT: ServiceUnavailable (503) として<br/>ApiException を throw
    else TaskCanceledException (Timeout)
        Note over EXT: RequestTimeout (408) として<br/>ApiException を throw
    else 成功 but デシリアライズ失敗
        Note over EXT: ApiResponse.Failure 返却
    else 成功
        Note over EXT: ApiResponse.Success 返却
    end
```

アーキテクチャの結果: 各APIメソッドにはエラーハンドリングがない。コア・ロジックのみで構成される（リクエスト作成 → 送信 → 結果解析）。

#### エラーハンドリング対応

| 種類 | 処理 | 目的 |
| --- | --- | --- |
| HTTP通信エラー | `ApiException(503)` をthrow | ネットワーク障害時 |
| タイムアウト | `ApiException(408)` をthrow | リクエストタイムアウト |
| デシリアライズ失敗 | `ApiResponse.Failure` を返却 | JSONパースエラー |

---

### 1.5. 環境切替 (Mock / Production)

APIサーバーのアドレスは `ApiConfiguration.cs` のコメントで切り替える:

| 環境 | ベースURL |
| --- | --- |
| VTI (Mock) | `https://mock-api-combined-542799931692.asia-northeast1.run.app` |
| Sharp (本番) | `https://api.ks-internal.local` |

> 現在はソースコード内のコメントで切り替えており、ビルド構成による自動切替は未実装。`MockDataLoader` は `#if DEBUG` で登録される。

---

## 2. Navigation アーキテクチャ（画面遷移）

### 2.1. 処理フロー概要

.NET MAUI Shell Navigation と INavigationService パターンを採用している:

```mermaid
sequenceDiagram
    participant P as 画面
    participant NAV as INavigationService
    participant SH as Shell
    participant D as 遷移先画面

    P->>NAV: 画面遷移要求
    NAV->>SH: Shell.GoToAsync(route)
    SH->>D: 遷移先画面を表示
```

---

### 2.2. Navigation Flow

```mermaid
sequenceDiagram
    participant P as 画面 (ViewModel)
    participant NAV as INavigationService
    participant SH as Shell

    rect rgb(230, 245, 255)
    Note over P, SH: 新画面への遷移
    P->>NAV: NavigateToAsync(route, params)
    NAV->>SH: Shell.GoToAsync(route)
    SH->>SH: 遷移先画面を表示
    NAV->>NAV: INavigationAware.OnNavigatedTo(params)
    NAV-->>P: 遷移完了
    end

    rect rgb(255, 240, 230)
    Note over P, SH: 前画面への戻り
    P->>NAV: GoBackAsync()
    NAV->>SH: Shell.GoToAsync("..")
    SH->>SH: 1つ前の画面に戻る
    end
```

- パラメータなし: ルート名またはViewModel型で遷移先を指定する
- パラメータあり: Dictionary形式で渡し、遷移先は `OnNavigatedToAsync(parameter)` で受け取る（`BaseViewModel` を継承）

---

### 2.3. Route 登録

新規画面の登録は2箇所で行う:

```mermaid
sequenceDiagram
    participant AS as AppShell.xaml.cs
    participant PS as IPageService
    participant MP as MauiProgram.cs

    Note over AS: ステップ1 — Shell ルート登録
    AS->>AS: Routing.RegisterRoute(name, typeof(Page))
    Note over AS: ステップ2 — Page ↔ ViewModel 紐付け
    AS->>PS: PageService.RegisterRoute<Page, ViewModel>(name)
    Note over MP: ステップ3 — DIコンテナ登録
    MP->>MP: Singleton / Transient
```

- Singleton: 頻繁にアクセスする画面 — 状態を保持する（例: `HomeMenuPage`）
- Transient: 毎回新しい状態が必要な画面
- メイン画面は `HomeMenuPage`。ナビゲーションバーは非表示（カスタムヘッダーを使用）、スライドメニューは無効。

---

### 2.4. ライフサイクルイベント

全ViewModel は `BaseViewModel` を継承し、`App.xaml.cs` のグローバルイベント経由でライフサイクルイベントを自動受信する:

```mermaid
stateDiagram-v2
    [*] --> 画面表示中: 画面表示
    画面表示中 --> [*]: 画面非表示

    state 画面表示中 {
        [*] --> 初回ロード: InitializeAsync (1回のみ)
        初回ロード --> 表示時: OnAppearingAsync
        表示時 --> 非表示時: OnDisappearingAsync
    }

    画面表示中 --> バックグラウンド: App バックグラウンドへ
    バックグラウンド --> 画面表示中: App フォアグラウンドへ
```

| イベント | Handler | 説明 |
| --- | --- | --- |
| 初回ロード | `InitializeAsync()` | 初回表示時に1度だけ実行。重い初期化処理に使用 |
| 画面表示 | `HandleAppearingAsync()` → `OnAppearingAsync()` | `viewDidAppear` (iOS) 相当 |
| 画面非表示 | `HandleDisappearingAsync()` → `OnDisappearingAsync()` | 画面が非表示になった時 |
| App バックグラウンド | `HandleStoppingAsync()` → `OnStoppingAsync()` | App がバックグラウンドに移行 |
| App フォアグラウンド | `HandleResumingAsync()` → `OnResumingAsync()` | App がフォアグラウンドに復帰 |
| 画面遷移受信 | `OnNavigatedToAsync(parameter)` | 前画面からのパラメータ受信 |
