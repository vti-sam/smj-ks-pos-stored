# PS-HOST-04 タブレットPOS ホスト デバイスコマンドハンドラー プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-HOST-04 |
| 文書名 | タブレットPOS ホスト デバイスコマンドハンドラー プログラム仕様書 |
| 対象 | タブレットPOS / デバイスコマンドハンドラー |
| 版数 | 1.0.0 |
| 作成日 | 2026/06/19 |
| 作成者 | VTI サム |
| レビュー担当 | SMJ 蒲田 |
| 承認者 | SMJ 蒲田 |
| 目的 | 対象クラスの構造、フィールド／プロパティ及びメソッド仕様を定義する。 |
| 期待成果 | 実装及びレビューで参照するクラス単位の仕様を明確にする。 |

## 01_改訂履歴

| 版数 | 日付 | 変更内容 | 作成者 | 承認者 |
| --- | --- | --- | --- | --- |
| 1.0.0 | 2026/08/24 | 正式版として初版を作成。 | VTI サム | SMJ 蒲田 |

## クラス情報

| 項目 | 内容 |
| --- | --- |
| 機能名 | デバイスコマンドハンドラー |
| 物理クラス名 | DeviceCommandHandler |
| 名前空間 | TabletOutProcess.TabletDeviceServer |
| アクセス修飾子 | internal sealed |
| 継承/実装 | IDeviceCommandHandler |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/pos-integration/Pos.DeviceConnector/src/DeviceConnector/DeviceConnector/DeviceCommandCore.cs |
| 対象クラス | DeviceCommandHandler |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

デバイスコネクタが受け取ったデバイス操作要求を判定し、実際のデバイス制御またはデバイスコネクタ制御へ振り分けるコマンド実行部。要求内容の妥当性確認、使用状態の更新、実行結果の整形を担当する。

### 主な責務

- デバイスコネクタ停止・再起動などの制御要求を判定する。
- デバイスコネクタの準備状態を確認し、利用可能状態を応答する。
- デバイス使用開始・終了に伴う処理状態を更新する。
- 対象デバイスと操作種別を確認して実行結果を返す。
- 実行結果の成否と詳細を、状態と矛盾しない正常／異常ログとして記録する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| コンストラクタ引数 | internal | IDeviceRegistry | deviceRegistry | DeviceId から IFDevice を検索する依存先。 |
| コンストラクタ引数 | internal | IProcessInfoStore | processInfoStore | DeviceUse/DeviceUnUse のプロセス情報更新先。 |
| コンストラクタ引数 | internal | Func<bool> | readinessProbe | デバイスコネクタの準備状態を返す任意指定の確認関数。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | internal | - | DeviceCommandHandler | レジストリとプロセス情報ストアを受け取ってハンドラーを構成する。 |
| ② | public | DeviceCommandResult | Handle | デバイスコネクタ制御アクション、デバイス利用開始/終了、デバイスメソッドを判定し、対象 IFDevice へ処理を委譲する。 |
| ③ | private static | DeviceCommandResult | Failure | 検証エラーまたは未対応コマンドを、既存互換キーを含む失敗結果に変換する。 |
| ④ | private static | void | EnsureLegacyReturnKeys | 戻りペイロードに ResultCode/ReturnValue が無い場合だけ、戻り値で補完する。 |
| ⑤ | private static | void | LogDeviceResult | デバイス実行結果を成否に応じたログ種別で記録する。 |

## メソッド詳細

### ①. DeviceCommandHandler

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `internal sealed class DeviceCommandHandler(IDeviceRegistry deviceRegistry, IProcessInfoStore processInfoStore, Func<bool> readinessProbe = null)` |
| 可視性 | internal |
| 戻り値 | - |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IDeviceRegistry | デバイスレジストリ | deviceRegistry |
| IProcessInfoStore | プロセス情報ストア | processInfoStore |
| Func<bool> | デバイスコネクタ準備状態確認関数 | readinessProbe |

処理内容:

- ① IDeviceRegistry を保持し、DeviceId から IFDevice を検索できるようにする。
- ② IProcessInfoStore を保持し、DeviceUse/DeviceUnUse の既存互換プロセス情報更新先にする。
- ③ 任意指定の準備状態確認関数を保持し、ヘルスチェック要求時に使用する。
- ④ Handle実行時はこれらの依存先を通してデバイス、プロセス情報、デバイスコネクタ準備状態を操作する。

備考: -

### ②. Handle

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public DeviceCommandResult Handle(DeviceCommand command)` |
| 可視性 | public |
| 戻り値 | DeviceCommandResult |
| 戻り値内容 | デバイスコネクタ制御アクション、デバイス利用開始/終了、デバイスメソッドを判定し、対象 IFDevice へ処理を委譲した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| DeviceCommand | デバイスコマンド | command |

処理内容:

- ① コマンドが null の場合は ArgumentNullException を送出する。
- ② Kill/ReStart はデバイスコネクタ制御アクションを設定して即時返却する。
- ③ HealthCheck は準備状態確認関数が false 以外の場合に `Ready` を返し、false の場合は `Host is not ready.` の失敗結果を返す。
- ④ DeviceId 未指定の場合は Failure を返す。デバイス未登録の場合は、起動失敗詳細があればそれを失敗メッセージに付加する。
- ⑤ DeviceUse/DeviceUnUse/DeviceUnUseComplete ではプロセス情報を更新し、対象デバイスの use/unuse を呼ぶ。
- ⑥ DeviceMethod では MethodId の指定を確認し、対象デバイスの DeviceMethod を呼ぶ。
- ⑦ 戻り値、成功判定、ペイロードを結果に設定し、既存互換キーを補完する。
- ⑧ LogDeviceResult で成否に応じた実行結果ログを出力する。

備考: -

### ③. Failure

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static DeviceCommandResult Failure(DeviceCommand command, string message)` |
| 可視性 | private static |
| 戻り値 | DeviceCommandResult |
| 戻り値内容 | 検証エラーまたは未対応コマンドを、既存互換キーを含む失敗結果に変換した結果。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| DeviceCommand | デバイスコマンド | command |
| string | メッセージ | message |

処理内容:

- ① コマンドから要求/デバイス/メソッド/ハンドル情報を可能な範囲で引き継ぐ。
- ② 要求ID、メッセージ、デバイスID、詳細を含む異常ログを出力する。
- ③ Success=false、ReturnValue=-1、Message=エラー内容を設定する。
- ④ Payload に ResultCode=-1 と ReturnValue=-1 を入れ、既存形式応答と互換にする。

備考: -

### ④. EnsureLegacyReturnKeys

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static void EnsureLegacyReturnKeys(Dictionary<string, string> payload, int returnValue)` |
| 可視性 | private static |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Dictionary<string, string> | ペイロード | payload |
| int | 戻り値 | returnValue |

処理内容:

- ① ペイロードに ResultCode が無い場合は戻り値を文字列化して追加する。
- ② ペイロードに ReturnValue が無い場合も同じ戻り値を追加する。
- ③ 既に設定済みのキーは上書きしない。

備考: -

### ⑤. LogDeviceResult

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static void LogDeviceResult(DeviceCommand command, DeviceCommandResult result)` |
| 可視性 | private static |
| 戻り値 | void |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| DeviceCommand | 実行対象コマンド | command |
| DeviceCommandResult | デバイス実行結果 | result |

処理内容:

- ① 要求ID、メッセージ、デバイスID、メソッドID、ResultCode、ResultCodeExtended、操作ステージ、例外種別を実行結果として整形する。
- ② `result.Success=true` の場合はデバッグログとして出力する。
- ③ `result.Success=false` の場合は異常メッセージを付加し、異常ログとして出力する。

備考: メッセージ内容と実行結果の正常／異常区分を一致させるための共通処理。

## 処理フロー/注意事項

- Handle がメッセージ種別を判定する。
- HealthCheck は準備状態確認関数の結果に基づいて利用可否を返す。
- deviceRegistry から対象 IFDevice を取得する。
- 実行結果を DeviceCommandResult と既存互換ペイロードキーへ反映する。
- 正常結果はデバッグログ、失敗結果は異常ログとして記録する。

### 注意事項

- 同一ファイル内の `DeviceCommand`、`DeviceCommandResult`、`DeviceManagerRegistry`、`LegacyProcessInfoStore` は関連 DTO/アダプターとして参照する。
