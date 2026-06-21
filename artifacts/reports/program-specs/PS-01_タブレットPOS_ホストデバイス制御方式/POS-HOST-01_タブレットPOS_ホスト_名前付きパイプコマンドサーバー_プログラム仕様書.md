---
title: POS-HOST-01 タブレットPOS ホスト 名前付きパイプコマンドサーバー プログラム仕様書
project: tablet_pos_host
type: program-spec
status: draft
source:
  - sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/NamedPipeCommandServer.cs
tags:
  - tablet-host
  - named-pipe
  - program-spec
---

# POS-HOST-01 タブレットPOS ホスト 名前付きパイプコマンドサーバー プログラム仕様書

<!-- spec-evidence
document_id: POS-HOST-01
status: verified
sources:
  - path: sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/NamedPipeCommandServer.cs
    symbol: NamedPipeCommandServer
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
| 文書ID | POS-HOST-01 |
| プロジェクト名 | タブレットPOS |
| 機能名 | 名前付きパイプコマンドサーバー |
| 物理クラス名 | NamedPipeCommandServer |
| 名前空間 | KsOutProcess.KsDeviceServer |
| アクセス修飾子 | internal |
| 継承/実装 | IDisposable |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| CodeGraph project | sources/KsPosBoilerplate/TabetPos.Host |
| 主要ソース | sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/NamedPipeCommandServer.cs |
| 検証状態 | CodeGraph sync/status と source read により確認済み |
| 対象外 | Excel workbook、Designer 自動生成部分、source code の変更 |

## クラス概要

Named Pipe `TabetPos.Host.Command` 側の低レベルサーバーであり、1行単位の command request を受け付け、JSON response を返却する。

### 主な責務

- 待受 thread と接続中 pipe を管理する。
- JSON request と legacy message の両形式を受け付ける。
- handler 例外を失敗 response に変換する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 | Evidence |
| --- | --- | --- | --- | --- | --- |
| フィールド | private static readonly | JsonSerializerOptions | JsonOptions | JSON deserialize/serialize の大文字小文字非依存設定。 | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:15 |
| フィールド | private | CancellationTokenSource | _cancellationTokenSource | 待受停止を通知するキャンセルトークン発行元。 | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:20 |
| フィールド | private | Thread | _listenThread | Named Pipe 待受用バックグラウンドスレッド。 | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:21 |
| フィールド | private readonly | Lock | _pipeLock | 接続中 pipe リストの排他制御。 | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:22 |
| フィールド | private readonly | List<NamedPipeServerStream> | _activePipes | 停止時に破棄する接続中 pipe リスト。 | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:23 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 | Evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | internal | - | NamedPipeCommandServer | Named Pipe 名と command handler を受け取ってサーバーを構成する。 | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:12-14 |
| 2 | public | void | Start | 待受スレッドを開始する。 | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:25-36 |
| 3 | private | void | Stop | キャンセル通知、pipe 破棄、待受スレッド終了を実行する。 | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:38-54 |
| 4 | private | void | Listen | Named Pipe 接続を待受し、接続ごとに処理スレッドを起動する。 | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:56-83 |
| 5 | private | void | HandleClient | クライアント要求を読み取り、handler 結果を JSON で返却する。 | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:85-114 |
| 6 | private static | NamedPipeDeviceCommandRequest | ParseRequest | JSON または legacy message のリクエストを解析する。 | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:116-128 |
| 7 | public | void | Dispose | Stop を呼び出してリソースを解放する。 | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:130-133 |
| 8 | private | void | TrackPipe | 接続中 pipe を管理リストへ追加する。 | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:135-139 |
| 9 | private | void | UntrackPipe | 接続中 pipe を管理リストから削除する。 | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:141-145 |
| 10 | private | void | DisposeActivePipes | 接続中 pipe を全て破棄する。 | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:147-155 |

## メソッド詳細

### 1. NamedPipeCommandServer

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `internal class NamedPipeCommandServer(string pipeName, Func<NamedPipeDeviceCommandRequest, Task<NamedPipeDeviceCommandResponse>> handler)` |
| 可視性 | internal |
| 戻り値 | - |
| Evidence | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:12-14 |

処理内容:

- ① 対象 method の実行条件を確認する。
- ② Named Pipe 名と request handler を受け取り、コマンド受信サーバーを構成する。
- ③ 必要な戻り値または内部状態を更新する。

備考: -

### 2. Start

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Start()` |
| 可視性 | public |
| 戻り値 | void |
| Evidence | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:25-36 |

処理内容:

- ① 待受スレッドが既に存在する場合は何もせず終了する。
- ② CancellationTokenSource を生成し、Listen を実行する background thread を作成する。
- ③ スレッド名を設定し、command pipe の待受を開始する。

備考: -

### 3. Stop

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void Stop()` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:38-54 |

処理内容:

- ① CancellationTokenSource に cancel を通知する。
- ② 接続中 pipe をすべて dispose して WaitForConnection/通信待ちを解除する。
- ③ 待受スレッドを最大3秒待ち、token source を dispose して参照をクリアする。

備考: -

### 4. Listen

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void Listen(CancellationToken cancellationToken)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:56-83 |

処理内容:

- ① キャンセルされるまで NamedPipeServerStream を作成し、管理リストへ登録する。
- ② client 接続を待ち、接続済み pipe を client thread へ渡す。
- ③ 待受中の例外では pipe を管理リストから外し、キャンセル中でなければ短時間待って再試行する。

備考: -

### 5. HandleClient

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void HandleClient(NamedPipeServerStream pipe)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:85-114 |

処理内容:

- ① UTF-8 reader/writer を作成し、client から1行の request を読み取る。
- ② ParseRequest の結果を handler に渡し、同期的に response を取得する。
- ③ 例外時は ResultCode=-1 の失敗 response を生成する。
- ④ response を JSON で書き戻し、pipe を管理リストから外す。

備考: -

### 6. ParseRequest

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static NamedPipeDeviceCommandRequest ParseRequest(string line)` |
| 可視性 | private static |
| 戻り値 | NamedPipeDeviceCommandRequest |
| Evidence | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:116-128 |

処理内容:

- ① 空または空白のみの request は ArgumentException とする。
- ② 先頭が `{` の場合は JSON として NamedPipeDeviceCommandRequest へ deserialize する。
- ③ JSON 以外は legacy message として request に保持する。

備考: -

### 7. Dispose

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Dispose()` |
| 可視性 | public |
| 戻り値 | void |
| Evidence | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:130-133 |

処理内容:

- ① 保持しているサーバー、ルーター、publisher またはフォームを停止する。
- ② 対象インスタンスを破棄し、参照を null または解放済み状態へ更新する。
- ③ 以後の再開始時に新規生成できる状態に戻す。

備考: -

### 8. TrackPipe

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void TrackPipe(NamedPipeServerStream pipe)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:135-139 |

処理内容:

- ① 対象 method の実行条件を確認する。
- ② 接続中 pipe を管理リストへ追加する。
- ③ 必要な戻り値または内部状態を更新する。

備考: -

### 9. UntrackPipe

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void UntrackPipe(NamedPipeServerStream pipe)` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:141-145 |

処理内容:

- ① 対象 method の実行条件を確認する。
- ② 接続中 pipe を管理リストから削除する。
- ③ 必要な戻り値または内部状態を更新する。

備考: -

### 10. DisposeActivePipes

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private void DisposeActivePipes()` |
| 可視性 | private |
| 戻り値 | void |
| Evidence | src/KsHost/DeviceHost/NamedPipeCommandServer.cs:147-155 |

処理内容:

- ① 対象 method の実行条件を確認する。
- ② 接続中 pipe を全て破棄し、管理リストをクリアする。
- ③ 必要な戻り値または内部状態を更新する。

備考: -

## 処理フロー/注意事項

- Start が待受 thread を起動する。
- Listen が接続ごとに client thread を作成する。
- HandleClient が request を解析して handler を呼び出し、response を書き戻す。
- Dispose/Stop が cancel、pipe dispose、thread join を実行する。

### 注意事項

- CodeGraph 0.9.2 は本 primary-constructor class の method node を生成しないため、file node と source line を直接 evidence として使用する。
