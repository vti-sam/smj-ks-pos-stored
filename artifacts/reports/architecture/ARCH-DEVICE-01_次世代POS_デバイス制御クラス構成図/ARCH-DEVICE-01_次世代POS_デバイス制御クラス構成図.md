# ARCH-DEVICE-01 次世代POS デバイス制御クラス構成図

次世代POS
ARCH-DEVICE-01 デバイス制御クラス構成図
文書ID: ARCH-DEVICE-01
第0.1.0版
2026年8月24日

## 表紙

文書情報を以下に示す。

| 項目 | 内容 |
|---|---|
| PJ名 | 次世代POS |
| システム名 | 次世代POS |
| 文書ID | ARCH-DEVICE-01 |
| 文書名 | 次世代POS デバイス制御クラス構成図 |
| 成果物名 | 次世代POS デバイス制御クラス構成図 |
| 対象 | タブレットPOS端末アプリのアプリケーション層とデバイス制御層の関係 |
| 版数 | 0.1.0 |
| 作成日 | 2026/08/24 |
| 作成者 | VTI サム |
| レビュー担当 | SMJ 蒲田 |
| 承認者 | SMJ 蒲田 |
| 目的 | 業務処理の呼出元、デバイスマネージャー、設定サービス、設定ストレージ、ストラテジーパターン、公開デバイス契約、およびプラットフォーム別処理の責務と関係を明確にする。 |
| 期待成果 | 開発者が利用すべきクラスとインターフェースを判断でき、業務処理をベンダー、OS、およびデバイス接続方式から独立させられること。 |

## 変更履歴

文書の改訂履歴を以下に示す。

| No. | 版数 | 変更日 | 区分 | 変更箇所（項番等） | 変更内容 | 担当者 |
|---|---|---|---|---|---|---|
| 1 | 0.1.0 | 2026/08/24 | 新規 | 全体 | デバイス制御クラス構成図を新規作成。責務領域、構成要素、および関連プログラム仕様書の対応を整理。 | VTI サム |

## 目次

本書のシート一覧を以下に示す。

```text
1. 表紙
2. 変更履歴
3. 目次
4. 概要
5. 対象範囲
6. 関連資料
7. クラス構成図
8. 責務領域・構成要素
```

## 02_概要

目的、結論、および設計方針を以下に示す。

### 2.1 目的と結論

タブレットPOS端末アプリは、画面状態管理、アプリケーションサービス、デバイス制御層の順にデバイス操作を呼び出す。アプリケーション層は公開デバイス契約だけに依存し、ベンダー、OS、および接続方式に固有の処理を持たない。

デバイス制御層は設定から有効なデバイスを選択し、ストラテジーパターンによってプラットフォーム別実装を切り替える。設定の読込・保存と、デバイスコネクタ、SDK、またはOS APIへの接続処理をアプリケーション層から分離する。

WindowsのOPOS／OCX系はデバイスコネクタを経由し、Windows直接接続とiOSはプラットフォーム別ストラテジーから周辺機器へ接続する。Android向け実装は構成上存在するが、現在は利用できない。この構成により、デバイス機種またはプラットフォームを変更しても、業務処理は同じ呼出方法を維持できる。

### 2.2 本書の設計領域

| 設計領域 | 本書で定義する内容 | 本書で定義しない内容 |
|---|---|---|
| システム構造設計 | アプリケーション層、デバイス制御層、デバイスコネクタ、および周辺機器の責務と依存関係。 | 画面ごとの業務ルールと取引判断。 |
| 設定設計 | device_controller_config.jsonの所有、読込、フォールバック、保存、および適用。 | 店舗での設定変更手順、監視、バックアップ、復旧、およびリリース作業。 |
| 実装対応 | 論理構成要素と実装識別子、および関連プログラム仕様書との対応。 | 各クラス／インターフェースのメソッド仕様、入出力、例外、および詳細処理。 |

監視、ログ運用、バックアップ、計画停止、リリース、障害復旧、運用体制、および運用日程は、別の運用設計書で管理する。

### 2.3 設計方針

| 項番 | 原則 | 設計内容 |
|---|---|---|
| 1 | アプリケーションサービス経由で呼び出す | 画面状態管理はアプリケーションサービスを呼び出し、アプリケーションサービスだけがストラテジーを取得して、デバイス種別ごとの公開デバイス契約を使用する。 |
| 2 | 設定から選択する | デバイス種別、OS、および有効デバイス設定から、使用するデバイスとストラテジーを決定する。 |
| 3 | プラットフォーム固有処理を分離する | OPOS／OCX向けの名前付きパイプ通信、シリアル通信、SDK、およびOS APIをデバイス制御層のプラットフォーム別実装に閉じ込める。 |
| 4 | デバイス制御層が設定を管理する | デバイス制御層が設定の読込、フォールバック、保存、および適用を行い、アプリケーション層は公開ファサードだけを呼び出す。 |
| 5 | ライフサイクルを明確に管理する | デバイス操作の開始・終了を公開デバイス契約で管理し、アプリの起動・終了に合わせてイベント受信を開始・停止する。 |
| 6 | ベンダーに依存しない | ベンダーまたは機種の変更はストラテジーと設定で行い、業務コードにベンダー別分岐を追加しない。 |

### 2.4 対象読者

| 利用者 | 利用目的 |
|---|---|
| アプリケーション層の開発者 | デバイス制御層の呼出を担当するアプリケーションサービスと、画面状態管理がユースケース経由で結果を受け取る方法を確認する。 |
| デバイス制御層の開発者 | デバイスマネージャー、設定サービス、設定ストレージ、デバイス構成、ストラテジーファクトリー、デバイス仕様モデル、およびストラテジーの責務を確認する。 |
| 複数ベンダー対応の開発者 | 業務フローを変更せずに、プラットフォーム別クラスとデバイス設定を追加する。 |
| レビュー担当者・テスト担当者 | 責務境界、構成要素の関係、実装識別子、およびプラットフォーム範囲を確認する。 |

### 2.5 本書の読み方

① 03_対象範囲で、デバイス制御層の対象と他文書で管理する対象を確認する。

② 05_クラス構成_01で、（1）アプリケーション層、（2）デバイス制御層、および（3）外部境界の関係を確認する。

③ 05_クラス構成_02の5.2で、図中の（1）〜（3）が担当する責務と、詳細を定義する関連資料を確認する。

④ 05_クラス構成_02の5.3で、各構成要素の実装識別子、主な連携・利用条件、および関連プログラム仕様書を確認する。

## 03_対象範囲

本書の対象範囲と対象外を以下に示す。

### 3.1 対象範囲

① ファイルI/OまたはJSON解析をアプリケーション層へ持ち込まず、構成ルートからデバイス制御層を初期化する処理。

② デバイス種別とOSに基づく有効デバイスの選択。

③ ストラテジーの生成とアプリケーション層への公開デバイス契約の返却。

④ スキャナー、レシートプリンター、カスタマディスプレイ、ドロア、自動釣銭機、決済端末、および専用キーボード。

⑤ Windowsのデバイスコネクタ経由の制御と、デバイス制御層から周辺機器への直接制御の境界。

⑥ 論理構成要素、実装識別子、および関連プログラム仕様書の対応。

### 3.2 対象外

① 各画面の業務ルール、メッセージ内容、および取引の続行または中止の判断。

② デバイスコネクタ内部の構造、OPOSサービスオブジェクト、ドライバー、および店舗でのデバイス設置手順。

③ ベンダー別・デバイス機種別SDKの詳細設計。

④ A4印刷。本機能はデバイス制御層のレシート向けインターフェースを使用せず、別の文書印刷設計で管理する。

⑤ 決済端末の取引判断、売上業務フロー、およびCAFIS Arch固有の電文詳細。デバイス制御層の公開契約、ストラテジー選択、およびデバイスコネクタとの接続関係は本書で定義する。

## 04_関連資料

関連文書を以下に示す。

| 文書ID | 文書名 | 本書との関係 |
|---|---|---|
| ARCH-01 | タブレットPOS ソフトウェア構造設計書 | POSシステム全体の構造を定義する。 |
| ARCH-02 | タブレットPOS 端末アプリケーション構造設計書 | アプリケーション層の構造とデバイス制御層の呼出箇所を定義する。 |
| ARCH-HOST-01 | タブレットPOS デバイスコネクタ基本設計書 | Windows上のデバイスコネクタのプロセス境界と通信を定義する。 |
| CFG-01 | タブレットPOS デバイス制御層設定ファイル記載要領 | デバイスの定義方法と有効デバイス設定を定義する。 |
| EX-DEVICE-01 | 次世代POS デバイス制御実装例集 | 本書で示すインターフェースを使用したC#の実装例を提供する。 |
| PS-DEVICE-01〜11 | タブレットPOS デバイス制御 プログラム仕様書 | 本書の論理構成要素に対応するクラス、インターフェース、およびメソッドの詳細を定義する。構成要素ごとの対応は5.3に示す。 |
| - | デバイス制御層_ドキュメント一覧 | デバイス制御層文書群の位置付けと目的を示す。 |

## 05_クラス構成_01

以下の図は、業務処理の呼出元からプラットフォーム別ストラテジーおよび周辺機器までの関係を示す。

#### 凡例

矢印の向きは関係の方向を示し、色と線種は関係の意味を示す。要求と同期応答、または実機制御と結果を同じ経路で送受信する関係のみを双方向で示し、非同期イベントと設定参照は独立した一方向の関係として示す。

| 表示 | 色 | 意味 |
|---|---|---|
| タブレットPOS端末アプリ領域 | 背景:#F7FBFF / 枠線:#4472C4 / 文字:#111111 / 太さ:2 | アプリケーション層、デバイス制御層、およびプラットフォーム別ストラテジーがタブレットPOS端末アプリ内に属することを示す。 |
| 構成要素 | 背景:#F8FBFD / 枠線:#0D32B2 / 文字:#111111 / 太さ:2 | タブレットPOS端末アプリ内の論理構成要素、設定元、および処理を示す。 |
| デバイスコネクタ | 背景:#FCE4D6 / 枠線:#ED7D31 / 文字:#111111 / 太さ:2 | OPOS／OCXを利用するWindows別プロセスを示す。 |
| 周辺機器 | 背景:#E4DFEC / 枠線:#8064A2 / 文字:#111111 / 太さ:2 | デバイスコネクタまたはプラットフォーム別ストラテジーから制御される機器を示す。 |
| 責務領域 | 背景:透明 / 枠線:#ED7D31 / 文字:#111111 / 太さ:2 | 同じ責務を持つ要素のグループを示す。背景は透明とし、オレンジ色の枠線を使用する。 |
| コネクターラベル | 背景:#FFFFFF / 枠線:透明 / 文字:#111111 / 太さ:0 | コネクター中央に重ね、背後の線を隠して関係を読みやすくする折返し可能なラベルを示す。 |
| 補足コメント | 背景:#FFF2CC / 枠線:#BF9000 / 文字:#404040 / 太さ:2 / 透過率:70% | 明示した構成要素の設計上の補足を示す。 |
| ━━▶ 主処理 | 線:#1F4E79 / 線種:実線 / 太さ:2 | 主な呼出または依存関係を示す。 |
| ◀━━▶ コマンド通信 | 線:#1F4E79 / 線種:実線 / 太さ:3 | デバイス制御層からの要求とデバイスコネクタからの同期応答をコマンド通信用パイプで送受信する関係を示す。 |
| ━━▶ ライフサイクル | 線:#548235 / 線種:実線 / 太さ:2 | 初期化、開始、および終了に関する呼出を示す。 |
| ◀━━▶ 実機制御 | 線:#7030A0 / 線種:実線 / 太さ:2 | プラットフォーム別ストラテジーまたはデバイスコネクタと周辺機器間の制御と結果を示す。 |
| ┄┄▶ 非同期イベント | 線:#C65911 / 線種:破線 / 太さ:2 | 同期応答とは別にデバイスコネクタから通知されるイベントを示す。 |
| ┈┈▶ 設定参照 | 線:#7F7F7F / 線種:破線 / 太さ:2 | 設定情報を参照、フォールバック、保存、または適用する関係を示す。 |

### 5.1 クラス構成図

```mermaid
---
config:
  layout: elk
  elk:
    mergeEdges: false
    nodePlacementStrategy: BRANDES_KOEPF
    cycleBreakingStrategy: GREEDY
  flowchart:
    curve: linear
    nodeSpacing: 30
    rankSpacing: 60
---
flowchart LR
    %% diagram-profile=logical-architecture
    %% legend-bind container=責務領域
    %% legend-bind container.APP=タブレットPOS端末アプリ領域
    %% legend-bind container.DEVICE_CTRL=責務領域
    %% legend-bind container.CORE=タブレットPOS端末アプリ領域
    %% legend-bind container.STRATEGY_PATTERN=責務領域
    %% legend-bind container.PLATFORM=タブレットPOS端末アプリ領域
    %% legend-bind container.CONFIG_GROUP=責務領域
    %% legend-bind container.EXTERNAL=責務領域
    %% legend-bind class.component=構成要素
    %% legend-bind class.connector=デバイスコネクタ
    %% legend-bind class.peripheral=周辺機器
    %% legend-bind edge.default=━━▶ 主処理
    %% legend-bind edge.dashed=┈┈▶ 設定参照
    %% legend-bind edge.7=━━▶ ライフサイクル
    %% legend-bind edge.8=━━▶ ライフサイクル
    %% legend-bind edge.27=◀━━▶ コマンド通信
    %% legend-bind edge.28=┄┄▶ 非同期イベント
    %% legend-bind edge.30=◀━━▶ 実機制御
    %% legend-bind edge.31=◀━━▶ 実機制御
    %% legend-bind edge.32=◀━━▶ 実機制御
    %% legend-bind edge.33=◀━━▶ 実機制御
    %% legend-bind label=コネクターラベル
    %% legend-bind comment=補足コメント
    %% alt-text shape.CONNECTOR=コマンド通信用パイプとイベント通知用パイプはデバイス制御層との通信に使用する。周辺機器との物理接続はデバイスコネクタ側で管理する。
    subgraph APP["（1） アプリケーション層"]
        BOOT("① 構成ルート・ライフサイクル<br/>（MauiProgram / App）")
        VIEW("② 画面状態管理<br/>（ViewModel）")
        SERVICE("③ アプリケーションサービス<br/>デバイス呼出を管理")
        VIEW -->|ユースケースを呼出| SERVICE
    end

    subgraph DEVICE_CTRL["（2） デバイス制御層（DeviceCtrl）"]
        subgraph CORE["① 共通制御・設定"]
            subgraph CONFIG_GROUP["①-1 設定サービス・ストレージ"]
                RUNTIME("①-1-1 ランタイム設定<br/>アプリデータ領域")
                DEFAULT("①-1-2 デフォルト設定<br/>デバイス制御層のリソース")
                CONFIG("①-1-3 設定サービス<br/>（DeviceControllerConfigService）")
                MODEL("①-1-4 デバイス仕様モデル<br/>（DeviceConfig / ActiveDevice / DeviceSpec）")
                RUNTIME -.-> CONFIG
                DEFAULT -.->|フォールバック| CONFIG
                CONFIG -.-> RUNTIME
                CONFIG -->|デシリアライズ| MODEL
            end
            MANAGER("①-2 デバイスマネージャー<br/>（DeviceManager）")
            OPOS_CLIENT("①-3 OPOSコマンド変換<br/>（OposNamedPipeCommandClient）")
            PIPE_CLIENT("①-4 名前付きパイプクライアント<br/>（INamedPipeClient / NamedPipeClient）")
            EVENT_RECEIVER("①-5 名前付きパイプイベント受信<br/>（IDeviceEventReceiver / NamedPipeEventReceiver）")
            CONTRACTS("①-6 共通デバイス通信契約<br/>（TabletPos.DeviceContracts）")
            MANAGER -.->|適用| MODEL
        end

        subgraph STRATEGY_PATTERN["② ストラテジーパターン"]
            FACTORY("②-1 ストラテジーファクトリー<br/>（StrategyFactory&lt;T&gt;）")
            CONTRACT("②-2 公開デバイス契約<br/>（IPrinterStrategy等）")
            subgraph PLATFORM["②-3 プラットフォーム別ストラテジー<br/>公開デバイス契約を実装"]
                WIN_CONNECTOR("②-3-1 Windows OPOS／OCX<br/>ストラテジー")
                WIN_DIRECT("②-3-2 Windows直接接続<br/>SerialPort / Raw Input")
                IOS("②-3-3 iOS直接接続<br/>TCP/IP・Bluetooth / カメラ・BLE")
                ANDROID("②-3-4 Android直接接続<br/>Bluetooth・カメラ・USB / 現在は利用不可")
            end
        end
        MANAGER --> FACTORY
    end

    subgraph EXTERNAL["（3） 外部境界"]
        CONNECTOR("① デバイスコネクタ<br/>Windows別プロセス")
        WIN_OPOS_DEVICE("② Windows OPOS／OCX機器<br/>USB / COM")
        WIN_DIRECT_DEVICE("③ Windows直接接続機器<br/>COM / Raw Input")
        MOBILE_DEVICE("④ iOS／Android周辺機器<br/>プラットフォームから直接接続")
    end

    BOOT -->|InitializeAsync| MANAGER
    BOOT -->|StartAsync / StopAsync| EVENT_RECEIVER
    MANAGER --> CONFIG
    MANAGER -.->|通信設定を適用| PIPE_CLIENT
    MANAGER -.->|通信設定を適用| EVENT_RECEIVER
    SERVICE -->|Get...StrategyAsync| MANAGER
    SERVICE -->|Start / デバイス操作 / End| CONTRACT
    FACTORY -->|生成| WIN_CONNECTOR
    FACTORY -->|生成| WIN_DIRECT
    FACTORY -->|生成| IOS
    FACTORY -->|生成| ANDROID
    WIN_CONNECTOR -->|実装| CONTRACT
    WIN_DIRECT -->|実装| CONTRACT
    IOS -->|実装| CONTRACT
    ANDROID -->|実装| CONTRACT
    WIN_CONNECTOR -->|コマンドと結果を変換| OPOS_CLIENT
    OPOS_CLIENT -->|要求を送信| PIPE_CLIENT
    CONTRACTS -.->|要求・応答DTO| OPOS_CLIENT
    CONTRACTS -.->|パイプ名・既定値| PIPE_CLIENT
    CONTRACTS -.->|イベントDTO・既定値| EVENT_RECEIVER
    PIPE_CLIENT <-->|要求／同期応答<br/>コマンド通信用パイプ| CONNECTOR
    CONNECTOR -.->|イベント通知用パイプ<br/>非同期イベント| EVENT_RECEIVER
    CONTRACTS -.->|共通DTO・識別子| CONNECTOR
    CONNECTOR <-->|実機制御／結果| WIN_OPOS_DEVICE
    WIN_DIRECT <-->|実機制御／結果| WIN_DIRECT_DEVICE
    IOS <-->|実機制御／結果| MOBILE_DEVICE
    ANDROID <-->|実機制御／結果| MOBILE_DEVICE

    BOOT ~~~ MANAGER ~~~ CONNECTOR
    VIEW ~~~ FACTORY ~~~ WIN_OPOS_DEVICE
    SERVICE ~~~ ANDROID ~~~ MOBILE_DEVICE

    class BOOT,VIEW,SERVICE,RUNTIME,DEFAULT,CONFIG,MODEL,MANAGER,OPOS_CLIENT,PIPE_CLIENT,EVENT_RECEIVER,CONTRACTS,FACTORY,CONTRACT,WIN_CONNECTOR,WIN_DIRECT,IOS,ANDROID component
    class CONNECTOR connector
    class WIN_OPOS_DEVICE,WIN_DIRECT_DEVICE,MOBILE_DEVICE peripheral
```

## 05_クラス構成_02

クラス構成図に示す責務領域、責務グループ、および論理構成要素の関係を説明する。

### 5.2 責務領域

クラス構成図の最上位に示す（1）〜（3）を、本書における責務境界とする。各責務領域の詳細を定義する関連資料は、同じ行から確認できる。

| 図中番号 | 責務領域 | 主な責務 | 主な構成要素 | 関連資料 |
|---|---|---|---|---|
| （1） | アプリケーション層 | 業務要求を受け付け、アプリケーションサービスからデバイス制御層の公開窓口と公開デバイス契約を呼び出す。アプリの起動・終了に合わせて初期化とイベント受信のライフサイクルを管理する。 | 構成ルート・ライフサイクル、画面状態管理、アプリケーションサービス | ARCH-02_タブレットPOS_端末アプリケーション構造設計書.xlsx<br>EX-DEVICE-01_次世代POS_デバイス制御実装例集.xlsx |
| （2） | デバイス制御層（DeviceCtrl） | 設定を読み込んで有効なデバイスを選択し、公開デバイス契約を実装するストラテジーを生成する。プラットフォーム固有の通信とデバイス操作をアプリケーション層から分離する。 | 共通制御・設定、ストラテジーパターン | CFG-01_タブレットPOS_デバイス制御層設定ファイル記載要領.xlsx<br>EX-DEVICE-01_次世代POS_デバイス制御実装例集.xlsx |
| （3） | 外部境界 | タブレットPOS端末アプリの外側で実行するデバイスコネクタと周辺機器を示し、名前付きパイプ、OPOS／OCX、SDK、およびOS APIの責務境界を明確にする。 | デバイスコネクタ、Windows OPOS／OCX機器、Windows直接接続機器、iOS／Android周辺機器 | ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.xlsx |

（2）に含まれる各構成要素とプログラム仕様書の対応は、5.3に示す。

### 5.3 責務領域と構成要素

5.1の図が構成要素間の関係と接続方向を示し、本項が各構成要素の責務、主な連携・利用条件、実装識別子、および関連プログラム仕様書を一覧化する。設定項目と値はCFG-01、アプリケーション層からの具体的な利用方法はEX-DEVICE-01、デバイスコネクタ内部の処理はARCH-HOST-01で定義する。

<!-- excel-render table-grid=wide -->
| 図中番号 | 論理構成要素 | 実装識別子 | 責務 | 主な連携・利用条件 | 関連プログラム仕様書 |
|---|---|---|---|---|---|
| （1） | アプリケーション層 |  |  |  |  |
| （1）① | 構成ルート・ライフサイクル | MauiProgram、App | デバイス制御層のサービスを登録し、アプリの起動・終了に合わせてデバイス制御層の初期化、デバイスコネクタの起動・停止、およびイベント受信の開始・停止を管理する。 | 初期化はDeviceManagerへ委譲し、設定ファイルを直接読み込まない。 | PS-DEVICE-05_タブレットPOS_デバイス制御_サービス登録_プログラム仕様書.xlsx |
| （1）② | 画面状態管理 | DeviceIntegrationTestViewModel等 | 画面から受け付けた業務要求をアプリケーションサービスへ渡し、返された結果を画面状態へ反映する。 | DeviceManager、ストラテジー、通信API、およびSDKを直接呼び出さない。 | － |
| （1）③ | アプリケーションサービス | IDeviceIntegrationTestStrategyProvider、DeviceIntegrationTestStrategyProvider等 | デバイス種別に対応するストラテジーを取得し、Start、デバイス操作、およびEndを公開デバイス契約経由で呼び出す。 | ベンダー、OS、および接続方式による分岐を業務処理へ持ち込まない。 | － |
| （2） | デバイス制御層（DeviceCtrl） |  |  |  |  |
| （2）①-1-1 | ランタイム設定 | device_controller_config.json | アプリデータ領域に保存されたデバイス制御設定を保持する。 | ファイルが存在し、有効なデバイス仕様へ変換できる場合に優先して使用する。 | PS-DEVICE-03_タブレットPOS_デバイス制御_組込み設定ストレージ_プログラム仕様書.xlsx |
| （2）①-1-2 | デフォルト設定 | TabletPos.DeviceCtrlの埋め込みリソース | ランタイム設定を使用できない場合の初期設定を保持する。 | ランタイム設定が存在しない、または無効な場合に使用する。 | PS-DEVICE-03_タブレットPOS_デバイス制御_組込み設定ストレージ_プログラム仕様書.xlsx |
| （2）①-1-3 | 設定サービス | DeviceControllerConfigService | 設定ストレージインターフェースを介して組込み設定ストレージへアクセスし、設定を読み込み、デシリアライズし、保存後に新しい設定を適用する。 | ランタイム設定を優先し、読込・変換に失敗した場合はデフォルト設定へ切り替える。保存先はランタイム設定とする。取消時は切り替えず、保存失敗時は現在の設定を維持する。 | PS-DEVICE-02_タブレットPOS_デバイス制御_設定サービス_プログラム仕様書.xlsx<br>PS-DEVICE-04_タブレットPOS_デバイス制御_設定ストレージインターフェース_プログラム仕様書.xlsx |
| （2）①-1-4 | デバイス仕様モデル | DeviceConfig、ActiveDevice、DeviceSpec | デバイスID、種別、OS、ストラテジー名、接続情報、および有効デバイスの対応を保持する。 | devices、activeDevices、およびappSettings.namedPipeから実行時の選択と通信設定に必要な情報を提供する。 | PS-DEVICE-06_タブレットPOS_デバイス制御_デバイス構成_プログラム仕様書.xlsx<br>PS-DEVICE-09_タブレットPOS_デバイス制御_デバイス仕様モデル_プログラム仕様書.xlsx |
| （2）①-2 | デバイスマネージャー | DeviceManager | 設定を初期化・保存し、デバイス種別、OS、および有効デバイスIDに対応するデバイス仕様を選択する。 | シングルトンとして現在の設定を保持し、選択したデバイス仕様からストラテジーの生成を要求する。 | PS-DEVICE-01_タブレットPOS_デバイス制御_デバイスマネージャー_プログラム仕様書.xlsx |
| （2）①-3 | OPOSコマンド変換 | OposNamedPipeCommandClient | Windows OPOS／OCXストラテジーの操作を共通要求へ変換し、デバイスコネクタの応答をストラテジーの結果へ変換する。 | 名前付きパイプクライアントを介してデバイスコネクタへ同期コマンドを送信する。 | PS-DEVICE-10_タブレットPOS_デバイス制御_名前付きパイプクライアント_プログラム仕様書.xlsx |
| （2）①-4 | 名前付きパイプクライアント | INamedPipeClient、NamedPipeClient | 共通要求をコマンド通信用パイプへ送信し、同期応答を受信する。 | デバイスマネージャーが適用したパイプ名、タイムアウト、および再試行設定を使用する。 | PS-DEVICE-10_タブレットPOS_デバイス制御_名前付きパイプクライアント_プログラム仕様書.xlsx |
| （2）①-5 | 名前付きパイプイベント受信 | IDeviceEventReceiver、NamedPipeEventReceiver | イベント通知用パイプから共通イベントを継続受信する。 | Appのライフサイクルで開始・停止する。現行ソースではEventReceivedの購読者がなく、受信イベントをアプリケーションユースケースへ引き渡さない。 | PS-DEVICE-11_タブレットPOS_デバイス制御_名前付きパイプイベント受信_プログラム仕様書.xlsx |
| （2）①-6 | 共通デバイス通信契約 | TabletPos.DeviceContracts | デバイス制御層とデバイスコネクタが共有する要求、応答、イベント、識別子、および通信既定値を定義する。 | 両者は同じDTOを参照し、同名の通信モデルを個別に保持しない。 | PS-DEVICE-10_タブレットPOS_デバイス制御_名前付きパイプクライアント_プログラム仕様書.xlsx<br>PS-DEVICE-11_タブレットPOS_デバイス制御_名前付きパイプイベント受信_プログラム仕様書.xlsx |
| （2）②-1 | ストラテジーファクトリー | StrategyFactory&lt;TBase&gt; | 選択されたデバイス仕様に対応するプラットフォーム別ストラテジーを生成する。 | 生成したインスタンスへデバイス仕様とロガーを設定し、公開デバイス契約として返す。 | PS-DEVICE-07_タブレットPOS_デバイス制御_ストラテジーファクトリー_プログラム仕様書.xlsx |
| （2）②-2 | 公開デバイス契約 | IPrinterStrategy、IBarcodeScannerStrategy、ICashChangerStrategy、ICustomerDisplayStrategy、IDrawerStrategy、IPaymentStrategy、IKeyboardStrategy | デバイス種別ごとに共通のStart、デバイス操作、およびEndをアプリケーションサービスへ公開する。 | プラットフォーム別ストラテジーが契約を実装し、呼出側は具象クラスに依存しない。 | PS-DEVICE-08_タブレットPOS_デバイス制御_デバイスストラテジー基底_プログラム仕様書.xlsx |
| （2）②-3-1 | Windows OPOS／OCXストラテジー | OposPrinterStrategy、OposCashChangerStrategy、OposCustomerDisplayStrategy、OposDrawerStrategy、OposCafisArchPaymentStrategy等 | 公開デバイス契約を実装し、OPOSコマンド変換と名前付きパイプ通信を介してデバイスコネクタへ操作を渡す。 | WindowsのOPOS／OCXまたはCAFIS Arch環境を必要とするデバイスで使用する。 | PS-DEVICE-08_タブレットPOS_デバイス制御_デバイスストラテジー基底_プログラム仕様書.xlsx |
| （2）②-3-2 | Windows直接接続ストラテジー | SerialHandyScannerStrategy、WindowsRawKeyboardStrategy、SerialCashChangerStrategy等 | SerialPort・COMまたはRaw Input APIを使用し、Windows周辺機器を直接制御する。 | スキャナーと専用キーボードは利用可能である。シリアル自動釣銭機は公開デバイス契約の必須操作を満たさないため利用対象外とする。 | PS-DEVICE-08_タブレットPOS_デバイス制御_デバイスストラテジー基底_プログラム仕様書.xlsx |
| （2）②-3-3 | iOS直接接続ストラテジー | IosEpsonPrinterStrategy、IosCameraBarcodeScannerStrategy、IosBleBarcodeScannerStrategy、IosCustomerDisplayStrategy | SDKまたはOS APIを使用し、iOS上の周辺機器へ直接接続する。 | レシートプリンター、スキャナー、およびカスタマディスプレイで利用可能である。 | PS-DEVICE-08_タブレットPOS_デバイス制御_デバイスストラテジー基底_プログラム仕様書.xlsx |
| （2）②-3-4 | Android直接接続ストラテジー | AndroidBluetoothPrinterStrategy、AndroidCameraBarcodeScannerStrategy、AndroidEpsonDm70DCustomerDisplayStrategy | Bluetooth、カメラ、またはUSBを使用するAndroid向けの公開デバイス契約を実装する。 | 設定と登録は存在するが、現在は周辺機器を操作する必須処理を提供していないため利用不可とする。 | PS-DEVICE-08_タブレットPOS_デバイス制御_デバイスストラテジー基底_プログラム仕様書.xlsx |
| （3） | 外部境界 |  |  |  |  |
| （3）① | デバイスコネクタ | TabletPos.Host | Windows別プロセスとしてOPOS／OCXおよびCAFIS Arch資源を保持し、対象デバイスを制御する。 | コマンド通信用パイプで要求と同期応答を送受信し、イベント通知用パイプから非同期イベントを送信する。 | － |
| （3）② | Windows OPOS／OCX機器 | OPOS／OCX機器、CAFIS Arch対応機器 | デバイスコネクタからドライバーを介して物理操作を実行し、結果またはイベントを返す。 | USBまたはCOMの物理接続はデバイスコネクタ側で管理する。 | － |
| （3）③ | Windows直接接続機器 | シリアル機器、専用キーボード | Windows直接接続ストラテジーから物理操作を受け付ける。 | COM、USBシリアル変換、またはRaw Inputで接続する。 | － |
| （3）④ | iOS／Android周辺機器 | プリンター、カメラ・BLEスキャナー、カスタマディスプレイ | 各プラットフォーム別ストラテジーからSDKまたはOS APIを介して物理操作を受け付ける。 | iOSは利用可能である。Androidは現在のストラテジーが必須操作を提供していないため接続を実行しない。 | － |
