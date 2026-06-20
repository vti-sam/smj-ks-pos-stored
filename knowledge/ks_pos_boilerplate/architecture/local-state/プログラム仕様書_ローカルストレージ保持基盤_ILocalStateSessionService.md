---
project: ks_host
source:
- migrated from management/program-specs/local-state/プログラム仕様書_ローカルストレージ保持基盤_ILocalStateSessionService.md
status: confirmed
tags:
- ks_host
- architecture
- local-state
- プログラム仕様書_ローカルストレージ保持基盤_ilocalstatesessionservice
title: プログラム仕様書_ローカルストレージ保持基盤_ILocalStateSessionService
type: architecture
---

# プログラム仕様書_ローカルストレージ保持基盤_ILocalStateSessionService

## 1. 変更履歴

| バージョン | 作成者 | 更新者 | 更新日 | 変更理由 | 更新内容 |
|---|---|---|---|---|---|
| 0.0.1 | VTI | VTI | 2026年05月27日 | 初版作成 | local state session service interface仕様を記載 |

## 2. 表紙

| 項目 | 内容 |
|---|---|
| 名前空間 | `KsPos.Applications.Ports.State` |
| クラス名（論理） | Local state session service interface |
| クラス名（物理） | `ILocalStateSessionService` |
| 種別 | interface |
| 役割 / 概要 | `session_key`単位でViewModel snapshotを束ねるlocal state sessionを管理する |

## 3. Interface定義

| 項目 | 内容 |
|---|---|
| アクセス修飾子 | `public` |
| 継承 / 実装 | なし |
| static / instance | instance |

## 4. メソッド一覧

| No | 修飾子 | static | 戻り値 | メソッド名 | 概要 |
|---:|---|---|---|---|---|
| 1 | public | no | `Task<LocalStateSession>` | `GetOrCreateActiveSessionAsync` | active sessionを取得または作成する |
| 2 | public | no | `Task<IReadOnlyList<LocalStateSession>>` | `GetActiveSessionsAsync` | active session一覧を取得する |
| 3 | public | no | `Task` | `MarkCompletedAsync` | sessionをcompletedへ更新する |
| 4 | public | no | `Task` | `MarkAbandonedAsync` | sessionをabandonedへ更新する |
| 5 | public | no | `Task` | `UpdateLastRouteAsync` | 最終routeを更新する |

## 5. 状態定義

| status | 概要 |
|---|---|
| `active` | 復元対象の有効session |
| `completed` | flow完了済みsession |
| `abandoned` | 中断扱いsession |

## 6. 注意事項

- 複数flowを保持する場合は、flowごとに異なる`session_key`を使用する。
- 既定sessionは`default`とする。
- session有効期限は実装上24時間としている。
