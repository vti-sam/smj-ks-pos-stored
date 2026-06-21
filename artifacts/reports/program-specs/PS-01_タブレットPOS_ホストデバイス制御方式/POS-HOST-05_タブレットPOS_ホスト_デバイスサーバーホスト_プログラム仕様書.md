---
title: POS-HOST-05 タブレットPOS ホスト デバイスサーバーホスト プログラム仕様書
project: tablet_pos_host
type: program-spec
status: draft
source:
  - sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/KsHost.cs
tags:
  - tablet-host
  - host-lifecycle
  - program-spec
---

# POS-HOST-05 タブレットPOS ホスト デバイスサーバーホスト プログラム仕様書

<!-- spec-evidence
document_id: POS-HOST-05
status: verified
sources:
  - path: sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/KsHost.cs
    symbol: KsHost
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
| 文書ID | POS-HOST-05 |
| プロジェクト名 | タブレットPOS |
| 機能名 | デバイスサーバーホスト |
| 物理クラス名 | KsHost |
| 名前空間 | KsOutProcess.KsDeviceServer |
| アクセス修飾子 | public sealed partial |
| 継承/実装 | IFDeviceReply |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| CodeGraph project | sources/KsPosBoilerplate/TabetPos.Host |
| 主要ソース | sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/KsHost.cs |
| 検証状態 | CodeGraph sync/status と source read により確認済み |
| 対象外 | Excel workbook、Designer 自動生成部分、source code の変更 |

## クラス概要

Host process の起動・停止とデバイスマネージャー接続を担当する常駐ホストクラス。

### 主な責務

- transport と command handler を構成する。
- 設定ファクトリから対象デバイス設定を作成する。
- Kill/ReStart action を受けて停止または再起動する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 | Evidence |
| --- | --- | --- | --- | --- | --- |
| フィールド | private | IDeviceHostTransport | _transport | WindowMessage/Named Pipe transport の抽象化。 | src/KsHost/DeviceHost/KsHost.cs:15 |
| フィールド | private | IDeviceSettingFactory | _deviceSettingFactory | IDeviceSettingFactory 型の内部状態。 | src/KsHost/DeviceHost/KsHost.cs:16 |
| フィールド | private | KsDeviceManager | _mDevmanager | 起動済みデバイスを管理するマネージャー。 | src/KsHost/DeviceHost/KsHost.cs:17 |
| フィールド | private | IDeviceCommandHandler | _commandHandler | デバイスコマンド処理の委譲先。 | src/KsHost/DeviceHost/KsHost.cs:18 |
| フィールド | private | int | _mMode | int 型の内部状態。 | src/KsHost/DeviceHost/KsHost.cs:21 |
| プロパティ | public | bool | IsEndOrder | 終了命令受付状態。 | src/KsHost/DeviceHost/KsHost.cs:26 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 | Evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | public | - | KsHost | インスタンスを初期化する。 | src/KsHost/DeviceHost/KsHost.cs:28-33 |
| 2 | public | - | KsHost | インスタンスを初期化する。 | src/KsHost/DeviceHost/KsHost.cs:35-41 |
| 3 | public | void | StartHost | transport と command handler を初期化し、設定に基づいて KsDeviceManager を起動する。 | src/KsHost/DeviceHost/KsHost.cs:44-65 |
| 4 | public | void | StopHost | transport を停止し、起動済みデバイスを KsDeviceManager 経由で終了する。 | src/KsHost/DeviceHost/KsHost.cs:68-81 |
| 5 | private | void | HandleHostAction | Kill は停止後に終了フラグを立て、Restart は停止後に再起動する。 | src/KsHost/DeviceHost/KsHost.cs:83-96 |
| 6 | public | void | ReplyDevice | デバイスからの応答 payload を transport の publish 処理へ渡す。 | src/KsHost/DeviceHost/KsHost.cs:106-110 |

## メソッド詳細

### 1. KsHost

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public KsHost()` |
| 可視性 | public |
| 戻り値 | - |
| Evidence | src/KsHost/DeviceHost/KsHost.cs:28-33 |

処理内容:

- ① 対象 method の実行条件を確認する。
- ② インスタンスを初期化する。
- ③ 必要な戻り値または内部状態を更新する。

備考: -

### 2. KsHost

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public KsHost(int mode)` |
| 可視性 | public |
| 戻り値 | - |
| Evidence | src/KsHost/DeviceHost/KsHost.cs:35-41 |

処理内容:

- ① 対象 method の実行条件を確認する。
- ② インスタンスを初期化する。
- ③ 必要な戻り値または内部状態を更新する。

備考: -

### 3. StartHost

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void StartHost()` |
| 可視性 | public |
| 戻り値 | void |
| Evidence | src/KsHost/DeviceHost/KsHost.cs:44-65 |

処理内容:

- ① 開始ログを出力し、KsDeviceManager singleton を取得する。
- ② DeviceCommandHandler を DeviceManagerRegistry と LegacyProcessInfoStore で構成する。
- ③ transport を開始し、command handler を通信経路へ接続する。
- ④ mode に応じた device setting を作成し、device manager を起動する。
- ⑤ 例外時は開始異常ログを出力する。

備考: -

### 4. StopHost

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void StopHost()` |
| 可視性 | public |
| 戻り値 | void |
| Evidence | src/KsHost/DeviceHost/KsHost.cs:68-81 |

処理内容:

- ① transport を停止する。
- ② device manager が存在する場合は StopDeviceManager を呼ぶ。
- ③ 停止ログを出力し、例外時は停止異常ログを出力する。

備考: -

### 5. HandleHostAction

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void HandleHostAction(DeviceHostAction action)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsHost/DeviceHost/KsHost.cs:83-96 |

処理内容:

- ① 対象 method の実行条件を確認する。
- ② Kill は停止後に終了フラグを立て、Restart は停止後に再起動する。
- ③ 必要な戻り値または内部状態を更新する。

備考: -

### 6. ReplyDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void ReplyDevice(IDeviceServiceCallBack client, KsDeviceId deviceId, KsDeviceMethodID ksDeviceMethodId, IntPtr handle, Dictionary<string, string> dic)` |
| 可視性 | public |
| 戻り値 | void |
| Evidence | src/KsHost/DeviceHost/KsHost.cs:106-110 |

処理内容:

- ① 対象 method の実行条件を確認する。
- ② デバイスからの応答 payload を transport の publish 処理へ渡す。
- ③ 必要な戻り値または内部状態を更新する。

備考: -

## 処理フロー/注意事項

- StartHost が transport を開始し、KsDeviceManager.StartDeviceManager を呼び出す。
- StopHost が transport と device manager を停止する。
- ReplyDevice が transport へ device event publish を委譲する。

### 注意事項

- `StartDeviceManager` は停止要求までループするため、ホスト起動フローのブロッキング要素である。
