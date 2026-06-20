---
project: ks_host
source:
- migrated from management/program-specs/sentry/プログラム仕様書_ログ処理_Sentry_MonitoringLevel.md
status: confirmed
tags:
- ks_host
- architecture
- sentry
- プログラム仕様書_ログ処理_sentry_monitoringlevel
title: プログラム仕様書_ログ処理_Sentry_MonitoringLevel
type: architecture
---

# プログラム仕様書_ログ処理_Sentry_MonitoringLevel

## 1. 変更履歴

| バージョン | 作成者 | 更新者 | 更新日 | 変更理由 | 更新内容 |
|---|---|---|---|---|---|
| 0.0.1 | VTI | VTI | 2026年05月22日 | 初版作成 | ログレベルEnum仕様を記載 |

## 2. 表紙

| 項目 | 内容 |
|---|---|
| 名前空間 | `KsPos.Applications.Ports.Monitoring` |
| クラス名（論理） | 監視ログレベル |
| クラス名（物理） | `MonitoringLevel` |
| 種別 | `enum` |
| 役割 / 概要 | アプリ内のログレベルをSentryのEvent/Breadcrumbレベルへ変換するための共通定義 |

## 3. クラス定義

| 項目 | 内容 |
|---|---|
| アクセス修飾子 | `public` |
| 継承 / 実装 | なし |
| static / instance | - |
| コンストラクタ | なし |

## 4. 値一覧

| No | 値 | 使用目的 | Sentry連携 |
|---:|---|---|---|
| 1 | `Debug` | 開発時または調査時の詳細情報 | Debug Breadcrumb / Debug Event |
| 2 | `Info` | 正常な業務イベント、画面表示、画面遷移など | Info Breadcrumb / Info Event |
| 3 | `Warning` | 継続可能だが注意が必要な状態 | Warning Breadcrumb / Warning Event |
| 4 | `Error` | 業務タスクが失敗し調査が必要な状態 | Error Breadcrumb / Error Event |
| 5 | `Fatal` | クラッシュまたは致命的障害 | Fatal Breadcrumb / Fatal Event |

## 5. メソッド定義

該当なし。

## 6. 補足

現行運用では、通常の業務エラーは`Error`で扱う。
`Fatal`はSDKや未処理例外など、クラッシュ相当の重大障害を表現するための拡張値として保持する。
