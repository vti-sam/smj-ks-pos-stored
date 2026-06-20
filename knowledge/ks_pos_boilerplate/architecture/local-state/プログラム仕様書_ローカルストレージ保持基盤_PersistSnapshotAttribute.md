---
project: ks_host
source:
- migrated from management/program-specs/local-state/プログラム仕様書_ローカルストレージ保持基盤_PersistSnapshotAttribute.md
status: confirmed
tags:
- ks_host
- architecture
- local-state
- プログラム仕様書_ローカルストレージ保持基盤_persistsnapshotattribute
title: プログラム仕様書_ローカルストレージ保持基盤_PersistSnapshotAttribute
type: architecture
---

# プログラム仕様書_ローカルストレージ保持基盤_PersistSnapshotAttribute

## 1. 変更履歴

| バージョン | 作成者 | 更新者 | 更新日 | 変更理由 | 更新内容 |
|---|---|---|---|---|---|
| 0.0.1 | VTI | VTI | 2026年05月27日 | 初版作成 | snapshot保存対象Attribute仕様を記載 |

## 2. 表紙

| 項目 | 内容 |
|---|---|
| 名前空間 | `KsPos.Applications.Application.State` |
| クラス名（論理） | Snapshot保存対象Attribute |
| クラス名（物理） | `PersistSnapshotAttribute` |
| 種別 | class attribute |
| 役割 / 概要 | ViewModelのpropertyまたはfieldに付与し、snapshot保存対象であることを明示する |

## 3. クラス定義

| 項目 | 内容 |
|---|---|
| アクセス修飾子 | `public sealed` |
| 継承 / 実装 | `Attribute` |
| AttributeUsage | `AttributeTargets.Property | AttributeTargets.Field` |
| static / instance | instance |
| コンストラクタ | 既定コンストラクタ |

## 4. 利用方法

```csharp
[ObservableProperty]
[property: PersistSnapshot]
private string maskInput = string.Empty;
```

## 5. 注意事項

- Attributeが付与されていないpropertyは保存しない。
- password、token、PIN、secure credentialなどには付与しない。
- `ObservableProperty` fieldへ付与する場合は、生成propertyへ反映されるよう`[property: PersistSnapshot]`を使用する。
