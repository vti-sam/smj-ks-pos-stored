---
project: ks_host
source:
- migrated from management/program-specs/local-state/プログラム仕様書_ローカルストレージ保持基盤_SnapshotViewModelBase.md
status: confirmed
tags:
- ks_host
- architecture
- local-state
- プログラム仕様書_ローカルストレージ保持基盤_snapshotviewmodelbase
title: プログラム仕様書_ローカルストレージ保持基盤_SnapshotViewModelBase
type: architecture
---

# プログラム仕様書_ローカルストレージ保持基盤_SnapshotViewModelBase

## 1. 変更履歴

| バージョン | 作成者 | 更新者 | 更新日 | 変更理由 | 更新内容 |
|---|---|---|---|---|---|
| 0.0.1 | VTI | VTI | 2026年05月27日 | 初版作成 | Snapshot ViewModel基底クラス仕様を記載 |
| 0.0.2 | VTI | VTI | 2026年05月27日 | 重複保存抑止 | `SemaphoreSlim`と500ms throttleによる重複save抑止を追記 |

## 2. 表紙

| 項目 | 内容 |
|---|---|
| 名前空間 | `KsPos.Applications.Presentation.ViewModels.Base` |
| クラス名（論理） | Snapshot対応ViewModel基底 |
| クラス名（物理） | `SnapshotViewModelBase` |
| 種別 | abstract class |
| 役割 / 概要 | `BaseViewModel`の画面ライフサイクルhookを利用し、ViewModel snapshotの保存・復元を共通化する |

## 3. クラス定義

| 項目 | 内容 |
|---|---|
| アクセス修飾子 | `public abstract` |
| 継承 / 実装 | `BaseViewModel` |
| static / instance | instance |
| コンストラクタ | `SnapshotViewModelBase(IMonitoringService monitoring, IViewModelSnapshotService snapshots)` |

## 4. プロパティ一覧

| No | 修飾子 | 型 | プロパティ名 | 概要 |
|---:|---|---|---|---|
| 1 | protected virtual | `string` | `SnapshotSessionKey` | session識別子。既定値は`default` |
| 2 | protected virtual | `string` | `SnapshotKey` | ViewModel snapshot識別子。既定値はViewModelのFullName |

## 4.1 フィールド一覧

| No | 修飾子 | 型 | フィールド名 | 概要 |
|---:|---|---|---|---|
| 1 | private static readonly | `ConcurrentDictionary<Type, PropertyInfo[]>` | `PersistPropertyCache` | `[PersistSnapshot]`対象propertyのreflection cache |
| 2 | private static readonly | `TimeSpan` | `SnapshotSaveThrottle` | 重複保存抑止時間。500ms |
| 3 | private readonly | `SemaphoreSlim` | `_snapshotSaveLock` | snapshot saveの並列実行を防止する |
| 4 | private | `DateTime` | `_lastSnapshotSavedAtUtc` | 最終保存時刻UTC |

## 5. メソッド一覧

| No | 修飾子 | static | 戻り値 | メソッド名 | 概要 |
|---:|---|---|---|---|---|
| 1 | protected override | no | `Task` | `OnAppearingAsync` | snapshotを復元してから基底処理を実行する |
| 2 | protected override | no | `Task` | `OnDisappearingAsync` | snapshotを保存してから基底処理を実行する |
| 3 | protected override | no | `Task` | `OnResumingAsync` | app復帰時にsnapshotを復元する |
| 4 | protected override | no | `Task` | `OnStoppingAsync` | app停止時にsnapshotを保存する |
| 5 | private | no | `Task` | `SavePropertiesToSnapshotAsync` | 重複保存を抑止してsnapshot保存本体を呼び出す |
| 6 | private | no | `Task` | `SavePropertiesToSnapshotCoreAsync` | `[PersistSnapshot]`対象propertyを抽出して保存する |
| 7 | private | no | `Task` | `RestorePropertiesFromSnapshotAsync` | snapshot値をproperty型へ変換して復元する |
| 8 | private | no | `PropertyInfo[]` | `GetPersistableProperties` | 保存対象propertyをreflectionで取得しcacheする |
| 9 | private | yes | `object?` | `ConvertSnapshotValue` | `JsonElement`等をproperty型へ変換する |

## 6. メソッド定義

| No | メソッド名 | 引数 | 戻り値 | 処理内容 | 例外 |
|---:|---|---|---|---|---|
| 1 | `SavePropertiesToSnapshotAsync` | なし | `Task` | 500ms以内に保存済みの場合はskipする。`SemaphoreSlim`で並列saveを防止し、lock取得後にも再度throttle判定する | なし |
| 2 | `SavePropertiesToSnapshotCoreAsync` | なし | `Task` | 保存対象propertyを取得し、property名と値をdictionary化して`IViewModelSnapshotService.SaveSnapshotAsync`へ渡す | property getter例外は無視する |
| 3 | `RestorePropertiesFromSnapshotAsync` | なし | `Task` | `IViewModelSnapshotService.GetSnapshotAsync`で取得した値をproperty型へ変換し、ViewModelへ反映する | 古いsnapshot値の変換失敗は無視する |
| 4 | `GetPersistableProperties` | なし | `PropertyInfo[]` | type単位にreflection結果をcacheし、次回以降の探索コストを下げる | なし |

## 7. 注意事項

- 保存対象がないViewModelでは保存処理を実行しない。
- `SnapshotSessionKey`をoverrideすることで業務flow単位の独立したsnapshotを保持できる。
- 復元失敗時は画面表示を止めない方針とする。
- `PageDisappearing`、`Window.Deactivated`、`Window.Stopped`などが連続発火しても、500ms throttleによりSQLiteへの重複書き込みを抑える。
