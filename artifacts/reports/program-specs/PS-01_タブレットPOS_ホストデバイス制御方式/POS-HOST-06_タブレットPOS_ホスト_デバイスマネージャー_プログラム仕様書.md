---
title: POS-HOST-06 タブレットPOS ホスト デバイスマネージャー プログラム仕様書
project: tablet_pos_host
type: program-spec
status: draft
source:
  - sources/KsPosBoilerplate/TabetPos.Host/src/KsDeviceManager/KsDeviceManager.cs
tags:
  - tablet-host
  - device-manager
  - program-spec
---

# POS-HOST-06 タブレットPOS ホスト デバイスマネージャー プログラム仕様書

<!-- spec-evidence
document_id: POS-HOST-06
status: verified
sources:
  - path: sources/KsPosBoilerplate/TabetPos.Host/src/KsDeviceManager/KsDeviceManager.cs
    symbol: KsDeviceManager
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
| 文書ID | POS-HOST-06 |
| プロジェクト名 | タブレットPOS |
| 機能名 | デバイスマネージャー |
| 物理クラス名 | KsDeviceManager |
| 名前空間 | KsOutProcess.KsDeviceServer |
| アクセス修飾子 | public |
| 継承/実装 | - |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| CodeGraph project | sources/KsPosBoilerplate/TabetPos.Host |
| 主要ソース | sources/KsPosBoilerplate/TabetPos.Host/src/KsDeviceManager/KsDeviceManager.cs |
| 検証状態 | CodeGraph sync/status と source read により確認済み |
| 対象外 | Excel workbook、Designer 自動生成部分、source code の変更 |

## クラス概要

設定からデバイスクラスを生成・起動し、起動済みデバイスの検索、停止、応答転送を管理する Singleton。

### 主な責務

- 起動対象デバイスを設定から取得する。
- 各デバイス起動を最大3回試行する。
- MSR/CashChanger の keep-alive を周期監視する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 | Evidence |
| --- | --- | --- | --- | --- | --- |
| フィールド | private | IFSettingDevice | _deviceSetting | IFSettingDevice 型の内部状態。 | src/KsDeviceManager/KsDeviceManager.cs:18 |
| フィールド | private | IFDeviceReply | _deviceReply | IFDeviceReply 型の内部状態。 | src/KsDeviceManager/KsDeviceManager.cs:19 |
| フィールド | private | bool | _stopFlg | bool 型の内部状態。 | src/KsDeviceManager/KsDeviceManager.cs:20 |
| フィールド | private | KsDeviceManager | _singleton | KsDeviceManager 型の内部状態。 | src/KsDeviceManager/KsDeviceManager.cs:24 |
| フィールド | private | List<IFDevice> | _deviceList | 起動済み IFDevice の保持リスト。 | src/KsDeviceManager/KsDeviceManager.cs:32 |
| プロパティ | public | IReadOnlyList<IFDevice> | Devices | 起動済みデバイスの読み取り専用 snapshot。 | src/KsDeviceManager/KsDeviceManager.cs:34 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 | Evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | private | - | KsDeviceManager | インスタンスコンストラクタ | src/KsDeviceManager/KsDeviceManager.cs:27-30 |
| 2 | public | KsDeviceManager | GetInstance | Singleton インスタンスを返却する。 | src/KsDeviceManager/KsDeviceManager.cs:38-41 |
| 3 | public | void | StartDeviceManager | 設定から対象デバイスを生成し、起動後は停止要求まで keep-alive 監視ループを維持する。 | src/KsDeviceManager/KsDeviceManager.cs:48-110 |
| 4 | public | void | StopDeviceManager | 停止フラグを立て、保持中の全デバイスへ StopDevice を呼び出して list を空にする。 | src/KsDeviceManager/KsDeviceManager.cs:115-126 |
| 5 | public | IFDevice | FindDevice | 起動済みデバイス list から DeviceId が一致する IFDevice を返す。 | src/KsDeviceManager/KsDeviceManager.cs:128-131 |
| 6 | public | void | ReplyDevice | legacy process info の client/handle/method を使い、ホストの ReplyDevice へ応答を渡す。 | src/KsDeviceManager/KsDeviceManager.cs:138-141 |

## メソッド詳細

### 1. KsDeviceManager

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private KsDeviceManager()` |
| 可視性 | private |
| 戻り値 | - |
| Evidence | src/KsDeviceManager/KsDeviceManager.cs:27-30 |

処理内容:

- ① 対象 method の実行条件を確認する。
- ② インスタンスを初期化する。
- ③ 必要な戻り値または内部状態を更新する。

備考: -

### 2. GetInstance

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public static KsDeviceManager GetInstance()` |
| 可視性 | public |
| 戻り値 | KsDeviceManager |
| Evidence | src/KsDeviceManager/KsDeviceManager.cs:38-41 |

処理内容:

- ① 対象 method の実行条件を確認する。
- ② Singleton インスタンスを返却する。
- ③ 必要な戻り値または内部状態を更新する。

備考: -

### 3. StartDeviceManager

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void StartDeviceManager(IFSettingDevice deviceSetting, IFDeviceReply deviceReply)` |
| 可視性 | public |
| 戻り値 | void |
| Evidence | src/KsDeviceManager/KsDeviceManager.cs:48-110 |

処理内容:

- ① 停止フラグを false にし、設定と応答先を保持する。
- ② 設定から起動対象 DeviceId list を取得する。
- ③ 各 device を最大3回まで生成・StartDevice し、成功したものを list に追加する。
- ④ 停止要求まで 10ms 間隔で DoEvents し、60秒ごとに MSR/CashChanger の keep-alive を確認する。
- ⑤ 30秒以上応答がない対象は状態監視ログへ出力する。

備考: -

### 4. StopDeviceManager

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void StopDeviceManager()` |
| 可視性 | public |
| 戻り値 | void |
| Evidence | src/KsDeviceManager/KsDeviceManager.cs:115-126 |

処理内容:

- ① 停止フラグを true にする。
- ② list 内の各 IFDevice へ StopDevice を呼ぶ。
- ③ device list を clear する。

備考: -

### 5. FindDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public IFDevice FindDevice(KsDeviceId deviceId)` |
| 可視性 | public |
| 戻り値 | IFDevice |
| Evidence | src/KsDeviceManager/KsDeviceManager.cs:128-131 |

処理内容:

- ① 対象 method の実行条件を確認する。
- ② 起動済みデバイス list から DeviceId が一致する IFDevice を返す。
- ③ 必要な戻り値または内部状態を更新する。

備考: -

### 6. ReplyDevice

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public void ReplyDevice(ref KsProcessInfo proc, ref Dictionary<string, string> dic)` |
| 可視性 | public |
| 戻り値 | void |
| Evidence | src/KsDeviceManager/KsDeviceManager.cs:138-141 |

処理内容:

- ① 対象 method の実行条件を確認する。
- ② legacy process info の client/handle/method を使い、ホストの ReplyDevice へ応答を渡す。
- ③ 必要な戻り値または内部状態を更新する。

備考: -

## 処理フロー/注意事項

- StartDeviceManager が device list を構築し、停止フラグまで監視ループを維持する。
- StopDeviceManager が全デバイス StopDevice を実行して list をクリアする。
- FindDevice が command handler からの検索口になる。

### 注意事項

- `Devices` は内部 list の配列コピーを返す。
