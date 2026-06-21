---
title: POS-HOST-02 タブレットPOS ホスト 名前付きパイプデバイスホストアダプター プログラム仕様書
project: tablet_pos_host
type: program-spec
status: draft
source:
  - sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs
tags:
  - tablet-host
  - named-pipe
  - adapter
  - program-spec
---

# POS-HOST-02 タブレットPOS ホスト 名前付きパイプデバイスホストアダプター プログラム仕様書

<!-- spec-evidence
document_id: POS-HOST-02
status: verified
sources:
  - path: sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs
    symbol: NamedPipeDeviceHostAdapter
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
| 文書ID | POS-HOST-02 |
| プロジェクト名 | タブレットPOS |
| 機能名 | 名前付きパイプデバイスホストアダプター |
| 物理クラス名 | NamedPipeDeviceHostAdapter |
| 名前空間 | KsOutProcess.KsDeviceServer |
| アクセス修飾子 | internal sealed |
| 継承/実装 | IDisposable |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| CodeGraph project | sources/KsPosBoilerplate/TabetPos.Host |
| 主要ソース | sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs |
| 検証状態 | CodeGraph sync/status と source read により確認済み |
| 対象外 | Excel workbook、Designer 自動生成部分、source code の変更 |

## クラス概要

ホスト内の command handler と Named Pipe transport を接続する adapter であり、command pipe と event pipe の開始・停止、command 変換、event publish を担当する。

### 主な責務

- command request を mapper で内部 command に変換する。
- DeviceCommandRouter によりデバイス単位で順序制御する。
- Kill/ReStart は host action handler へ遅延通知する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 | Evidence |
| --- | --- | --- | --- | --- | --- |
| フィールド | private | string | NamedPipeCommandPipeName | string 型の内部状態。 | src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs:9 |
| フィールド | private | string | NamedPipeEventPipeName | string 型の内部状態。 | src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs:10 |
| フィールド | private | IDeviceCommandHandler | _commandHandler | デバイスコマンド処理の委譲先。 | src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs:12 |
| フィールド | private | Action<DeviceHostAction> | _hostActionHandler | Kill/ReStart などホスト制御アクションの通知先。 | src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs:13 |
| フィールド | private | INamedPipeCommandMapper | _commandMapper | Named Pipe request/response と内部 command/result の変換担当。 | src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs:14 |
| フィールド | private | string | _commandPipeName | string 型の内部状態。 | src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs:15 |
| フィールド | private | string | _eventPipeName | string 型の内部状態。 | src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs:16 |
| フィールド | private | DeviceCommandRouter | _commandRouter | デバイス単位のコマンドキュー制御。 | src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs:17 |
| フィールド | private | NamedPipeCommandServer | _commandServer | コマンド受信用 Named Pipe サーバー。 | src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs:18 |
| フィールド | private | NamedPipeEventPublisher | _eventPublisher | イベント送信用 Named Pipe publisher。 | src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs:19 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 | Evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | public | - | NamedPipeDeviceHostAdapter | インスタンスを初期化する。 | src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs:21-27 |
| 2 | internal | - | NamedPipeDeviceHostAdapter | インスタンスを初期化する。 | src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs:29-36 |
| 3 | internal | - | NamedPipeDeviceHostAdapter | インスタンスを初期化する。 | src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs:38-50 |
| 4 | public | void | Start | command router、event publisher、command server を準備し、Named Pipe 通信を開始する。 | src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs:52-60 |
| 5 | public | void | Dispose | command server、router、event publisher を停止・破棄し、再開始可能な状態へ戻す。 | src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs:62-70 |
| 6 | public | void | PublishDeviceReply | デバイス側の非同期応答を event pipe 用の NamedPipeDeviceEvent に変換して送信する。 | src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs:72-84 |
| 7 | private | NamedPipeDeviceCommandResponse | ProcessCommand | Named Pipe request を内部 command に変換し、handler 実行後に response へ戻す。 | src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs:86-101 |

## メソッド詳細

### 1. NamedPipeDeviceHostAdapter

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public NamedPipeDeviceHostAdapter( IDeviceCommandHandler commandHandler, Action<DeviceHostAction> hostActionHandler)` |
| 可視性 | public |
| 戻り値 | - |
| Evidence | src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs:21-27 |

処理内容:

- ① 対象 method の実行条件を確認する。
- ② インスタンスを初期化する。
- ③ 必要な戻り値または内部状態を更新する。

備考: -

### 2. NamedPipeDeviceHostAdapter

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `internal NamedPipeDeviceHostAdapter( IDeviceCommandHandler commandHandler, Action<DeviceHostAction> hostActionHandler, INamedPipeCommandMapper commandMapper)` |
| 可視性 | internal |
| 戻り値 | - |
| Evidence | src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs:29-36 |

処理内容:

- ① 対象 method の実行条件を確認する。
- ② インスタンスを初期化する。
- ③ 必要な戻り値または内部状態を更新する。

備考: -

### 3. NamedPipeDeviceHostAdapter

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `internal NamedPipeDeviceHostAdapter( IDeviceCommandHandler commandHandler, Action<DeviceHostAction> hostActionHandler, INamedPipeCommandMapper commandMapper, string commandPipeName, string eventPipeName)` |
| 可視性 | internal |
| 戻り値 | - |
| Evidence | src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs:38-50 |

処理内容:

- ① 対象 method の実行条件を確認する。
- ② インスタンスを初期化する。
- ③ 必要な戻り値または内部状態を更新する。

備考: -

### 4. Start

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Start()` |
| 可視性 | public |
| 戻り値 | void |
| Evidence | src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs:52-60 |

処理内容:

- ① 未生成の DeviceCommandRouter、NamedPipeEventPublisher、NamedPipeCommandServer を作成する。
- ② event pipe publisher を開始する。
- ③ command pipe server を開始し、request を router の enqueue に接続する。

備考: -

### 5. Dispose

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Dispose()` |
| 可視性 | public |
| 戻り値 | void |
| Evidence | src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs:62-70 |

処理内容:

- ① command server を dispose し、参照を null にする。
- ② router を dispose して worker queue を停止する。
- ③ event publisher を dispose し、参照を null にする。

備考: -

### 6. PublishDeviceReply

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void PublishDeviceReply(KsDeviceId deviceId, KsDeviceMethodID methodId, IntPtr handle, Dictionary<string, string> payload)` |
| 可視性 | public |
| 戻り値 | void |
| Evidence | src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs:72-84 |

処理内容:

- ① deviceId、methodId、payload から NamedPipeDeviceEvent を生成する。
- ② EventId を GUID で採番し、EventType/Message に ReplyDevice を設定する。
- ③ event publisher が存在する場合のみ publish する。

備考: -

### 7. ProcessCommand

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private NamedPipeDeviceCommandResponse ProcessCommand(NamedPipeDeviceCommandRequest request)` |
| 可視性 | private |
| 戻り値 | NamedPipeDeviceCommandResponse |
| Evidence | src/KsHost/DeviceHost/NamedPipeDeviceHostAdapter.cs:86-101 |

処理内容:

- ① request を command mapper で内部 DeviceCommand に変換する。
- ② DeviceCommandHandler.Handle を呼び、処理結果を取得する。
- ③ Kill/Restart の場合は 500ms 遅延して host action handler を実行する。
- ④ 処理結果を Named Pipe response へ変換して返却する。

備考: -

## 処理フロー/注意事項

- Start が command router、event publisher、command server を生成して開始する。
- ProcessCommand が request -> command -> result -> response を変換する。
- PublishDeviceReply が device event を event pipe へ送信する。
- Dispose が transport 関連リソースを解放する。

### 注意事項

- 既定 pipe 名は `TabetPos.Host.Command` と `TabetPos.Host.Event`。
