---
title: POS-HOST-04 タブレットPOS ホスト デバイスコマンドハンドラー プログラム仕様書
project: tablet_pos_host
type: program-spec
status: draft
source:
  - sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/DeviceCommandCore.cs
tags:
  - tablet-host
  - command-handler
  - program-spec
---

# POS-HOST-04 タブレットPOS ホスト デバイスコマンドハンドラー プログラム仕様書

<!-- spec-evidence
document_id: POS-HOST-04
status: verified
sources:
  - path: sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/DeviceCommandCore.cs
    symbol: DeviceCommandHandler
notes: CodeGraph local index and source code checked on 2026/06/21. Excel export compatibility is intentionally not preserved in this Pure Markdown rewrite.
-->

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.2 | 2026/06/21 | VTI-SAM | CodeGraph とソースコードに基づき、Pure Markdown 形式へ再構成し、内容を更新 |
| 0.0.1 | 2026/06/19 | VTI-SAM | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | POS-HOST-04 |
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
| CodeGraph project | sources/KsPosBoilerplate/TabetPos.Host |
| 主要ソース | sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/DeviceCommandCore.cs |
| 検証状態 | CodeGraph sync/status と source read により確認済み |
| 対象外 | Excel workbook、Designer 自動生成部分、source code の変更 |

## クラス概要

内部 DeviceCommand を検証し、ホスト制御、使用開始/終了、デバイスメソッド実行へ振り分ける中核処理。

### 主な責務

- Kill/ReStart を host action として返却する。
- DeviceUse/DeviceUnUse は process info store を更新する。
- DeviceMethod は MethodId を検証して IFDevice へ委譲する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 | Evidence |
| --- | --- | --- | --- | --- | --- |
| コンストラクタ引数 | internal | IDeviceRegistry | deviceRegistry | DeviceId から IFDevice を検索する依存先。 | src/KsHost/DeviceHost/DeviceCommandCore.cs:80 |
| コンストラクタ引数 | internal | IProcessInfoStore | processInfoStore | DeviceUse/DeviceUnUse の process info 更新先。 | src/KsHost/DeviceHost/DeviceCommandCore.cs:81 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 | Evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | internal | - | DeviceCommandHandler | registry と process info store を受け取って handler を構成する。 | src/KsHost/DeviceHost/DeviceCommandCore.cs:79-81 |
| 2 | public | DeviceCommandResult | Handle | host action、device use/unuse、device method を判定し、対象 IFDevice へ処理を委譲する。 | src/KsHost/DeviceHost/DeviceCommandCore.cs:82-154 |
| 3 | private static | DeviceCommandResult | Failure | 検証エラーまたは未対応 command を、legacy key を含む失敗 result に変換する。 | src/KsHost/DeviceHost/DeviceCommandCore.cs:156-174 |
| 4 | private static | void | EnsureLegacyReturnKeys | 戻り payload に ResultCode/ReturnValue が無い場合だけ、return value で補完する。 | src/KsHost/DeviceHost/DeviceCommandCore.cs:176-183 |

## メソッド詳細

### 1. DeviceCommandHandler

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `internal sealed class DeviceCommandHandler(IDeviceRegistry deviceRegistry, IProcessInfoStore processInfoStore)` |
| 可視性 | internal |
| 戻り値 | - |
| Evidence | src/KsHost/DeviceHost/DeviceCommandCore.cs:79-81 |

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
| Evidence | src/KsHost/DeviceHost/DeviceCommandCore.cs:82-154 |

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
| Evidence | src/KsHost/DeviceHost/DeviceCommandCore.cs:156-174 |

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
| Evidence | src/KsHost/DeviceHost/DeviceCommandCore.cs:176-183 |

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
