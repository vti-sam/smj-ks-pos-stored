# PS-HOST-04 タブレットPOS ホスト デバイスコマンドハンドラー プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.2 | 2026/06/21 | VTI サム | クラス仕様、フィールド/プロパティ、メソッド仕様を更新 |
| 0.0.1 | 2026/06/19 | VTI サム | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-HOST-04 |
| プロジェクト名 | タブレットPOS |
| 機能名 | デバイスコマンドハンドラー |
| 物理クラス名 | DeviceCommandHandler |
| 名前空間 | KsOutProcess.KsDeviceServer |
| アクセス修飾子 | internal sealed |
| 継承/実装 | IDeviceCommandHandler |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/DeviceCommandCore.cs |
| 対象クラス | DeviceCommandHandler |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

ホストが受け取ったデバイス操作要求を判定し、実際のデバイス制御またはホスト制御へ振り分ける業務処理層。要求内容の妥当性確認、使用状態の更新、実行結果の整形を担当する。

### 主な責務

- ホスト停止・再起動などの制御要求を判定する。
- デバイス使用開始・終了に伴う処理状態を更新する。
- 対象デバイスと操作種別を確認して実行結果を返す。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| コンストラクタ引数 | internal | IDeviceRegistry | deviceRegistry | DeviceId から IFDevice を検索する依存先。 | src/KsHost/DeviceHost/DeviceCommandCore.cs:80 |
| コンストラクタ引数 | internal | IProcessInfoStore | processInfoStore | DeviceUse/DeviceUnUse の process info 更新先。 | src/KsHost/DeviceHost/DeviceCommandCore.cs:81 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | internal | - | DeviceCommandHandler | registry と process info store を受け取って handler を構成する。 |
| 2 | public | DeviceCommandResult | Handle | host action、device use/unuse、device method を判定し、対象 IFDevice へ処理を委譲する。 |
| 3 | private static | DeviceCommandResult | Failure | 検証エラーまたは未対応 command を、legacy key を含む失敗 result に変換する。 |
| 4 | private static | void | EnsureLegacyReturnKeys | 戻り payload に ResultCode/ReturnValue が無い場合だけ、return value で補完する。 |

## メソッド詳細

### 1. DeviceCommandHandler

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `internal sealed class DeviceCommandHandler(IDeviceRegistry deviceRegistry, IProcessInfoStore processInfoStore)` |
| 可視性 | internal |
| 戻り値 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IDeviceRegistry | デバイスレジストリ | deviceRegistry |
| IProcessInfoStore | プロセス情報ストア | processInfoStore |

処理内容:

- ① IDeviceRegistry を保持し、DeviceId から IFDevice を検索できるようにする。
- ② IProcessInfoStore を保持し、DeviceUse/DeviceUnUse の legacy process info 更新先にする。
- ③ Handle 実行時はこの2つの依存先だけを通して device と process info を操作する。

備考: -

### 2. Handle

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public DeviceCommandResult Handle(DeviceCommand command)` |
| 可視性 | public |
| 戻り値 | DeviceCommandResult |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| DeviceCommand | デバイスコマンド | command |

処理内容:

- ① command が null の場合は ArgumentNullException を送出する。
- ② Kill/ReStart は host action を設定して即時返却する。
- ③ DeviceId 未指定または device 未登録の場合は Failure を返す。
- ④ DeviceUse/DeviceUnUse/DeviceUnUseComplete では process info を更新し、対象 device の use/unuse を呼ぶ。
- ⑤ DeviceMethod では MethodId を必須確認し、対象 device の DeviceMethod を呼ぶ。
- ⑥ 戻り値、成功判定、payload を result に設定し、legacy key を補完する。

備考: -

### 3. Failure

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static DeviceCommandResult Failure(DeviceCommand command, string message)` |
| 可視性 | private static |
| 戻り値 | DeviceCommandResult |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| DeviceCommand | デバイスコマンド | command |
| string | メッセージ | message |

処理内容:

- ① command から request/device/method/handle 情報を可能な範囲で引き継ぐ。
- ② Success=false、ReturnValue=-1、Message=エラー内容を設定する。
- ③ Payload に ResultCode=-1 と ReturnValue=-1 を入れ、legacy response と互換にする。

備考: -

### 4. EnsureLegacyReturnKeys

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static void EnsureLegacyReturnKeys(Dictionary<string, string> payload, int returnValue)` |
| 可視性 | private static |
| 戻り値 | void |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Dictionary<string, string> | ペイロード | payload |
| int | 戻り値 | returnValue |

処理内容:

- ① payload に ResultCode が無い場合は returnValue を文字列化して追加する。
- ② payload に ReturnValue が無い場合も同じ returnValue を追加する。
- ③ 既に設定済みの key は上書きしない。

備考: -
## 処理フロー/注意事項

- Handle が message 種別を判定する。
- deviceRegistry から対象 IFDevice を取得する。
- 実行結果を DeviceCommandResult と legacy payload key へ反映する。

### 注意事項

- 同一ファイル内の `DeviceCommand`、`DeviceCommandResult`、`DeviceManagerRegistry`、`LegacyProcessInfoStore` は関連 DTO/adapter として参照する。
