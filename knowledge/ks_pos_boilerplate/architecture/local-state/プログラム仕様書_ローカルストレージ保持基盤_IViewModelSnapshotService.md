---
project: ks_host
source:
- migrated from management/program-specs/local-state/プログラム仕様書_ローカルストレージ保持基盤_IViewModelSnapshotService.md
status: confirmed
tags:
- ks_host
- architecture
- local-state
- プログラム仕様書_ローカルストレージ保持基盤_iviewmodelsnapshotservice
title: プログラム仕様書_ローカルストレージ保持基盤_IViewModelSnapshotService
type: architecture
---

# プログラム仕様書_ローカルストレージ保持基盤_IViewModelSnapshotService

## 1. 変更履歴

| バージョン | 作成者 | 更新者 | 更新日 | 変更理由 | 更新内容 |
|---|---|---|---|---|---|
| 0.0.1 | VTI | VTI | 2026年05月27日 | 初版作成 | ViewModel snapshot service interface仕様を記載 |

## 2. 表紙

| 項目 | 内容 |
|---|---|
| 名前空間 | `KsPos.Applications.Ports.State` |
| クラス名（論理） | ViewModel snapshot service interface |
| クラス名（物理） | `IViewModelSnapshotService` |
| 種別 | interface |
| 役割 / 概要 | ViewModel snapshotの保存、取得、削除をPresentation層から利用するための抽象化 |

## 3. Interface定義

| 項目 | 内容 |
|---|---|
| アクセス修飾子 | `public` |
| 継承 / 実装 | なし |
| static / instance | instance |

## 4. メソッド一覧

| No | 修飾子 | static | 戻り値 | メソッド名 | 概要 |
|---:|---|---|---|---|---|
| 1 | public | no | `Task` | `SaveSnapshotAsync` | ViewModel snapshotを保存する |
| 2 | public | no | `Task<Dictionary<string, object?>?>` | `GetSnapshotAsync` | ViewModel snapshotを取得する |
| 3 | public | no | `Task` | `ClearSnapshotAsync` | 指定snapshotを削除する |
| 4 | public | no | `Task` | `ClearSessionSnapshotsAsync` | session配下のsnapshotを削除する |

## 5. メソッド定義

| No | メソッド名 | 引数 | 戻り値 | 処理内容 | 備考 |
|---:|---|---|---|---|---|
| 1 | `SaveSnapshotAsync` | `sessionKey`, `snapshotKey`, `viewModelType`, `properties`, `route`, `cancellationToken` | `Task` | 指定ViewModelの保存対象propertyをsnapshotとして保存する | `route`は任意 |
| 2 | `GetSnapshotAsync` | `sessionKey`, `snapshotKey`, `cancellationToken` | `Task<Dictionary<string, object?>?>` | 保存済みsnapshotを取得する | 未保存の場合は`null` |
| 3 | `ClearSnapshotAsync` | `sessionKey`, `snapshotKey`, `cancellationToken` | `Task` | 指定snapshotだけを削除する | flow内の特定画面を初期化する場合に使用 |
| 4 | `ClearSessionSnapshotsAsync` | `sessionKey`, `cancellationToken` | `Task` | session配下の全snapshotを削除する | flow完了時に使用 |

## 6. 注意事項

- 呼び出し側はDB実装を意識しない。
- snapshot payloadは業務確定データではなく、画面入力途中stateとして扱う。
