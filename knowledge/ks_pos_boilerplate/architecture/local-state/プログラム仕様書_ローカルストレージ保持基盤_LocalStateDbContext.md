---
project: ks_host
source:
- migrated from management/program-specs/local-state/プログラム仕様書_ローカルストレージ保持基盤_LocalStateDbContext.md
status: confirmed
tags:
- ks_host
- architecture
- local-state
- プログラム仕様書_ローカルストレージ保持基盤_localstatedbcontext
title: プログラム仕様書_ローカルストレージ保持基盤_LocalStateDbContext
type: architecture
---

# プログラム仕様書_ローカルストレージ保持基盤_LocalStateDbContext

## 1. 変更履歴

| バージョン | 作成者 | 更新者 | 更新日 | 変更理由 | 更新内容 |
|---|---|---|---|---|---|
| 0.0.1 | VTI | VTI | 2026年05月27日 | 初版作成 | local state DbContext仕様を記載 |

## 2. 表紙

| 項目 | 内容 |
|---|---|
| 名前空間 | `KsPos.Applications.Infrastructure.State` |
| クラス名（論理） | Local state DbContext |
| クラス名（物理） | `LocalStateDbContext` |
| 種別 | class |
| 役割 / 概要 | EF Coreを使用してlocal state snapshot用SQLite tableを管理する |

## 3. クラス定義

| 項目 | 内容 |
|---|---|
| アクセス修飾子 | `public sealed` |
| 継承 / 実装 | `DbContext` |
| static / instance | instance |
| コンストラクタ | `LocalStateDbContext(DbContextOptions<LocalStateDbContext> options)` |

## 4. DbSet一覧

| No | 型 | プロパティ名 | 対応table |
|---:|---|---|---|
| 1 | `DbSet<LocalStateSessionEntity>` | `LocalStateSessions` | `local_state_sessions` |
| 2 | `DbSet<ViewModelSnapshotEntity>` | `ViewModelSnapshots` | `view_model_snapshots` |

## 5. メソッド一覧

| No | 修飾子 | static | 戻り値 | メソッド名 | 概要 |
|---:|---|---|---|---|---|
| 1 | protected override | no | `void` | `OnModelCreating` | collationとentity configurationを設定する |

## 6. DB接続設定

| 項目 | 内容 |
|---|---|
| DB種別 | SQLite |
| DBファイル | `FileSystem.AppDataDirectory/kspos_local_state.db` |
| DbContext生成 | `AddPooledDbContextFactory<LocalStateDbContext>` |
| Migration | `LocalStateDbContextInitializer.ApplyMigrationsAsync` |
| Journal mode | `SqliteJournalModeSettingInterceptor`でWALを設定 |

## 7. Entity設定

| Entity | Configuration | 主な設定 |
|---|---|---|
| `LocalStateSessionEntity` | `LocalStateSessionConfiguration` | table名、PK、session_key unique、status index |
| `ViewModelSnapshotEntity` | `ViewModelSnapshotConfiguration` | table名、PK、FK、session_id + snapshot_key unique、cascade delete |

## 8. 注意事項

- `OnModelCreating`では`BINARY` collationを使用する。
- entity設定は`ApplyConfigurationsFromAssembly`で自動適用する。
- Migration fileは`Infrastructure/State/Migrations`配下で管理する。
