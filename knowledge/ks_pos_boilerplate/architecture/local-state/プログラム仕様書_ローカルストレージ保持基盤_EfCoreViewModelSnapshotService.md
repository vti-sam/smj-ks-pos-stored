---
project: ks_host
source:
- migrated from management/program-specs/local-state/プログラム仕様書_ローカルストレージ保持基盤_EfCoreViewModelSnapshotService.md
status: confirmed
tags:
- ks_host
- architecture
- local-state
- プログラム仕様書_ローカルストレージ保持基盤_efcoreviewmodelsnapshotservice
title: プログラム仕様書_ローカルストレージ保持基盤_EfCoreViewModelSnapshotService
type: architecture
---

# プログラム仕様書_ローカルストレージ保持基盤_EfCoreViewModelSnapshotService

## 1. 変更履歴

| バージョン | 作成者 | 更新者 | 更新日 | 変更理由 | 更新内容 |
|---|---|---|---|---|---|
| 0.0.1 | VTI | VTI | 2026年05月27日 | 初版作成 | EF Core ViewModel snapshot service実装仕様を記載 |

## 2. 表紙

| 項目 | 内容 |
|---|---|
| 名前空間 | `KsPos.Applications.Infrastructure.State` |
| クラス名（論理） | EF Core ViewModel snapshot service |
| クラス名（物理） | `EfCoreViewModelSnapshotService` |
| 種別 | class |
| 役割 / 概要 | `IViewModelSnapshotService`を実装し、ViewModel snapshotをJSON化してSQLiteへ保存する |

## 3. クラス定義

| 項目 | 内容 |
|---|---|
| アクセス修飾子 | `public sealed` |
| 継承 / 実装 | `IViewModelSnapshotService` |
| static / instance | instance |
| コンストラクタ | `EfCoreViewModelSnapshotService(IDbContextFactory<LocalStateDbContext> dbFactory, ILocalStateSessionService sessions)` |

## 4. フィールド一覧

| No | 修飾子 | 型 | フィールド名 | 概要 |
|---:|---|---|---|---|
| 1 | private static readonly | `JsonSerializerOptions` | `JsonOptions` | snapshot JSON serialize設定 |
| 2 | private readonly | `ConcurrentDictionary<string, Dictionary<string, object?>>` | `_cache` | sessionKey + snapshotKey単位のmemory cache |

## 5. メソッド一覧

| No | 修飾子 | static | 戻り値 | メソッド名 | 概要 |
|---:|---|---|---|---|---|
| 1 | public | no | `Task` | `SaveSnapshotAsync` | snapshotをupsertし、memory cacheも更新する |
| 2 | public | no | `Task<Dictionary<string, object?>?>` | `GetSnapshotAsync` | cacheまたはSQLiteからsnapshotを取得する |
| 3 | public | no | `Task` | `ClearSnapshotAsync` | 指定snapshotを削除しcacheも削除する |
| 4 | public | no | `Task` | `ClearSessionSnapshotsAsync` | session配下のsnapshotを削除しcacheも削除する |
| 5 | private | yes | `string` | `BuildCacheKey` | memory cache keyを作成する |

## 6. メソッド定義

| No | メソッド名 | 引数 | 戻り値 | 処理内容 | 例外 |
|---:|---|---|---|---|---|
| 1 | `SaveSnapshotAsync` | `sessionKey`, `snapshotKey`, `viewModelType`, `properties`, `route`, `cancellationToken` | `Task` | active sessionを取得または作成し、`view_model_snapshots`をupsertする。保存後にlast_routeとmemory cacheを更新する | DB例外は呼び出し元へ伝播 |
| 2 | `GetSnapshotAsync` | `sessionKey`, `snapshotKey`, `cancellationToken` | `Task<Dictionary<string, object?>?>` | memory cacheを優先し、未存在の場合はSQLiteの`payload_json`を読み込んでdictionary化する | JSON parse失敗は呼び出し元へ伝播 |
| 3 | `ClearSnapshotAsync` | `sessionKey`, `snapshotKey`, `cancellationToken` | `Task` | 指定snapshot rowを削除し、該当cacheを削除する | DB例外は呼び出し元へ伝播 |
| 4 | `ClearSessionSnapshotsAsync` | `sessionKey`, `cancellationToken` | `Task` | session配下のsnapshot rowを一括削除し、session prefixのcacheを削除する | DB例外は呼び出し元へ伝播 |

## 7. 注意事項

- `payload_json`は`JsonSerializerDefaults.Web`でserializeする。
- cacheはプロセス内最適化であり、app restart後はSQLiteから復元する。
- `GetSnapshotAsync`はsessionが存在しない場合にactive sessionを作成する。
