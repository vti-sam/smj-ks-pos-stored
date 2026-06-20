---
project: ks_host
source:
- migrated from management/program-specs/local-state/プログラム仕様書_ローカルストレージ保持基盤_EfCoreLocalStateSessionService.md
status: confirmed
tags:
- ks_host
- architecture
- local-state
- プログラム仕様書_ローカルストレージ保持基盤_efcorelocalstatesessionservice
title: プログラム仕様書_ローカルストレージ保持基盤_EfCoreLocalStateSessionService
type: architecture
---

# プログラム仕様書_ローカルストレージ保持基盤_EfCoreLocalStateSessionService

## 1. 変更履歴

| バージョン | 作成者 | 更新者 | 更新日 | 変更理由 | 更新内容 |
|---|---|---|---|---|---|
| 0.0.1 | VTI | VTI | 2026年05月27日 | 初版作成 | EF Core local state session service実装仕様を記載 |

## 2. 表紙

| 項目 | 内容 |
|---|---|
| 名前空間 | `KsPos.Applications.Infrastructure.State` |
| クラス名（論理） | EF Core local state session service |
| クラス名（物理） | `EfCoreLocalStateSessionService` |
| 種別 | class |
| 役割 / 概要 | `ILocalStateSessionService`を実装し、`session_key`単位のlocal state sessionをSQLiteへ保存する |

## 3. クラス定義

| 項目 | 内容 |
|---|---|
| アクセス修飾子 | `public sealed` |
| 継承 / 実装 | `ILocalStateSessionService` |
| static / instance | instance |
| コンストラクタ | `EfCoreLocalStateSessionService(IDbContextFactory<LocalStateDbContext> dbFactory)` |

## 4. フィールド一覧

| No | 修飾子 | 型 | フィールド名 | 概要 |
|---:|---|---|---|---|
| 1 | private static readonly | `TimeSpan` | `DefaultExpiration` | session有効期限。24時間 |

## 5. メソッド一覧

| No | 修飾子 | static | 戻り値 | メソッド名 | 概要 |
|---:|---|---|---|---|---|
| 1 | public | no | `Task<LocalStateSession>` | `GetOrCreateActiveSessionAsync` | active sessionを取得または作成する |
| 2 | public | no | `Task<IReadOnlyList<LocalStateSession>>` | `GetActiveSessionsAsync` | 有効なactive session一覧を取得する |
| 3 | public | no | `Task` | `MarkCompletedAsync` | completedへ更新する |
| 4 | public | no | `Task` | `MarkAbandonedAsync` | abandonedへ更新する |
| 5 | public | no | `Task` | `UpdateLastRouteAsync` | last_routeを更新する |
| 6 | private | no | `Task` | `MarkAsync` | status更新共通処理 |
| 7 | private | yes | `LocalStateSession` | `ToModel` | entityをPorts層DTOへ変換する |

## 6. メソッド定義

| No | メソッド名 | 引数 | 戻り値 | 処理内容 | 例外 |
|---:|---|---|---|---|---|
| 1 | `GetOrCreateActiveSessionAsync` | `sessionKey`, `businessFlow`, `cancellationToken` | `Task<LocalStateSession>` | sessionが存在しない場合は新規作成する。存在するがactive以外の場合はactiveへ戻す | DB例外は呼び出し元へ伝播 |
| 2 | `GetActiveSessionsAsync` | `cancellationToken` | `Task<IReadOnlyList<LocalStateSession>>` | `status = active`かつ有効期限内のsessionを更新日時降順で取得する | DB例外は呼び出し元へ伝播 |
| 3 | `UpdateLastRouteAsync` | `sessionKey`, `lastRoute`, `cancellationToken` | `Task` | sessionが存在する場合のみlast_routeとupdated_at_utcを更新する | DB例外は呼び出し元へ伝播 |
| 4 | `MarkAsync` | `sessionKey`, `status`, `cancellationToken` | `Task` | sessionが存在する場合のみstatusとupdated_at_utcを更新する | DB例外は呼び出し元へ伝播 |

## 7. 注意事項

- sessionが存在しない場合、mark/update系処理は何もしない。
- `session_key`は一意制約を持つ。
- 24時間を過ぎたactive sessionは`GetActiveSessionsAsync`の取得対象外となる。
