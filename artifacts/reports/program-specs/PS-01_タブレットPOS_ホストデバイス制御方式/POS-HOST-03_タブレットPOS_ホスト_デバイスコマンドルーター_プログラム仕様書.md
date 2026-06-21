---
title: POS-HOST-03 タブレットPOS ホスト デバイスコマンドルーター プログラム仕様書
project: tablet_pos_host
type: program-spec
status: draft
source:
  - sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/DeviceCommandRouter.cs
tags:
  - tablet-host
  - routing
  - program-spec
---

# POS-HOST-03 タブレットPOS ホスト デバイスコマンドルーター プログラム仕様書

<!-- spec-evidence
document_id: POS-HOST-03
status: verified
sources:
  - path: sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/DeviceCommandRouter.cs
    symbol: DeviceCommandRouter
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
| 文書ID | POS-HOST-03 |
| プロジェクト名 | タブレットPOS |
| 機能名 | デバイスコマンドルーター |
| 物理クラス名 | DeviceCommandRouter |
| 名前空間 | KsOutProcess.KsDeviceServer |
| アクセス修飾子 | internal partial |
| 継承/実装 | IDisposable |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| CodeGraph project | sources/KsPosBoilerplate/TabetPos.Host |
| 主要ソース | sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/DeviceCommandRouter.cs |
| 検証状態 | CodeGraph sync/status と source read により確認済み |
| 対象外 | Excel workbook、Designer 自動生成部分、source code の変更 |

## クラス概要

Named Pipe command をデバイス単位の STA worker queue に振り分け、同一デバイスの処理順序を維持する。

### 主な責務

- DeviceId ごとに Worker を生成する。
- DeviceId 未指定または request null は Host キューとして扱う。
- Worker 内で例外が発生した場合は失敗 response を返却する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 | Evidence |
| --- | --- | --- | --- | --- | --- |
| フィールド | private readonly | Lock | _syncObject | Worker 辞書更新用の排他制御。 | src/KsHost/DeviceHost/DeviceCommandRouter.cs:12 |
| フィールド | private readonly | Dictionary<string, Worker> | _workers | DeviceId/Host キーごとの Worker 管理辞書。 | src/KsHost/DeviceHost/DeviceCommandRouter.cs:13 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 | Evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | internal | - | DeviceCommandRouter | 処理関数を受け取り、デバイス単位のワーカーキューを管理する。 | src/KsHost/DeviceHost/DeviceCommandRouter.cs:9-11 |
| 2 | public | Task<NamedPipeDeviceCommandResponse> | EnqueueAsync | リクエストを対象デバイスのワーカーへ投入する。 | src/KsHost/DeviceHost/DeviceCommandRouter.cs:14-18 |
| 3 | private | Worker | GetWorker | デバイスキーに対応する Worker を取得または生成する。 | src/KsHost/DeviceHost/DeviceCommandRouter.cs:20-28 |
| 4 | private static | string | GetDeviceKey | DeviceId があればそれを、未指定なら Host をキューキーにする。 | src/KsHost/DeviceHost/DeviceCommandRouter.cs:30-35 |
| 5 | public | void | Dispose | 全 Worker を破棄し、キュー管理辞書をクリアする。 | src/KsHost/DeviceHost/DeviceCommandRouter.cs:37-45 |

## メソッド詳細

### 1. DeviceCommandRouter

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `internal partial class DeviceCommandRouter(Func<NamedPipeDeviceCommandRequest, NamedPipeDeviceCommandResponse> processor)` |
| 可視性 | internal |
| 戻り値 | - |
| Evidence | src/KsHost/DeviceHost/DeviceCommandRouter.cs:9-11 |

処理内容:

- ① 対象 method の実行条件を確認する。
- ② 処理関数を受け取り、DeviceId 単位の STA worker queue を持つ router を構成する。
- ③ 必要な戻り値または内部状態を更新する。

備考: -

### 2. EnqueueAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public Task<NamedPipeDeviceCommandResponse> EnqueueAsync(NamedPipeDeviceCommandRequest request)` |
| 可視性 | public |
| 戻り値 | Task<NamedPipeDeviceCommandResponse> |
| Evidence | src/KsHost/DeviceHost/DeviceCommandRouter.cs:14-18 |

処理内容:

- ① request から queue key を決定する。
- ② key に対応する worker を取得または生成する。
- ③ request を worker queue に追加し、response task を返す。

備考: -

### 3. GetWorker

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private Worker GetWorker(string key)` |
| 可視性 | private |
| 戻り値 | Worker |
| Evidence | src/KsHost/DeviceHost/DeviceCommandRouter.cs:20-28 |

処理内容:

- ① worker dictionary を lock する。
- ② key が未登録の場合は processor を持つ Worker を生成して登録する。
- ③ 登録済み worker を返す。

備考: -

### 4. GetDeviceKey

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static string GetDeviceKey(NamedPipeDeviceCommandRequest request)` |
| 可視性 | private static |
| 戻り値 | string |
| Evidence | src/KsHost/DeviceHost/DeviceCommandRouter.cs:30-35 |

処理内容:

- ① 対象 method の実行条件を確認する。
- ② DeviceId がある要求はその値を、未指定または null の要求は Host を queue key にする。
- ③ 必要な戻り値または内部状態を更新する。

備考: -

### 5. Dispose

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void Dispose()` |
| 可視性 | public |
| 戻り値 | void |
| Evidence | src/KsHost/DeviceHost/DeviceCommandRouter.cs:37-45 |

処理内容:

- ① worker dictionary を lock する。
- ② すべての worker へ dispose を呼び、queue の受け付けを終了する。
- ③ worker dictionary を clear する。

備考: -

## 処理フロー/注意事項

- EnqueueAsync が device key を決定して Worker に投入する。
- Worker が BlockingCollection を STA thread で順次処理する。
- Dispose が全 Worker を停止する。

### 注意事項

- 内部クラス `Worker` と `WorkItem` は実装詳細として扱い、メイン method 一覧からは分離する。
