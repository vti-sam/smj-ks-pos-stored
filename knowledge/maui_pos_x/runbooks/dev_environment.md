---
title: Dev Environment
project: maui_pos_x
type: runbook
status: confirmed
source:
  - migrated from memory/maui_pos_x/dev_environment.md
tags: [maui_pos_x, maintenance, dev_environment]
---

# 端末アプリ開発環境情報

## POS端末環境

| 項目                   | 内容                                |
| ---------------------- | ----------------------------------- |
| **OS**                 | Windows 10 IoT Enterprise 2021 LTSC |
| **対応フレームワーク** | .NET Framework 4.8.1                |
| **POSデバイス制御**    | OPOS-J OCX                          |

## 1. Windows

| 項目                  | 内容                                                       |
| --------------------- | ---------------------------------------------------------- |
| **OS**                | Windows 11 Insider Preview (Build 26200)                   |
| **ターゲットOS(SDK)** | Windows 10 SDK 10.0.19041.0 (最小バージョン: 10.0.17763.0) |
| **.NET SDK**          | .NET 10.0.103 / .NET 10.0.200-preview                      |
| **.NET MAUI**         | 10.0.0                                                     |
| **IDE**               | JetBrains Rider 2025.3.3                                   |

## 2. Android

| 項目                  | 内容                                                    |
| --------------------- | ------------------------------------------------------- |
| **ターゲットOS(SDK)** | Android 5.0（API 21）以上（SupportedOSPlatformVersion） |
| **.NET SDK**          | .NET 10.0（Android workload 36.1.30）                   |
| **.NET MAUI**         | 10.0.0                                                  |
| **IDE**               | JetBrains Rider 2025.3.3                                |

## 3. iOS

| 項目                  | 内容                                       |
| --------------------- | ------------------------------------------ |
| **ビルドマシンOS**    | macOS Tahoe 26.3                           |
| **Xcode**             | Xcode 26.3                                 |
| **ターゲットOS(SDK)** | iOS 15.0以上（SupportedOSPlatformVersion） |
| **.NET SDK**          | .NET 10.0（iOS workload 26.2.10197）       |
| **.NET MAUI**         | 10.0.0                                     |
| **ランタイム**        | ios-arm64 (AOTコンパイル有効)              |
| **IDE**               | JetBrains Rider 2025.3.3 (macOS上で実行)   |

## 4. サードパーティ製ライブラリの使用状況

以下のサードパーティ製NuGetパッケージを使用しています（Windows/Android/iOS共通）。

### UI・MVVMフレームワーク

| ライブラリ名          | バージョン | 用途                       |
| --------------------- | ---------- | -------------------------- |
| CommunityToolkit.Mvvm | 8.4.0      | MVVMパターン実装           |
| CommunityToolkit.Maui | 9.0.0      | MAUI用UIコンポーネント拡張 |

### データベース

| ライブラリ名                         | バージョン | 用途                               |
| ------------------------------------ | ---------- | ---------------------------------- |
| Microsoft.EntityFrameworkCore.Sqlite | 10.0.0     | SQLiteデータベースアクセス         |
| Microsoft.EntityFrameworkCore.Tools  | 10.0.0     | EFCoreツール（マイグレーション等） |

### ログ・監視

| ライブラリ名               | バージョン | 用途                             |
| -------------------------- | ---------- | -------------------------------- |
| Serilog                    | 4.2.0      | 構造化ログ基盤                   |
| Serilog.Extensions.Logging | 8.0.0      | Microsoft.Extensions.Logging統合 |
| Serilog.Extensions.Hosting | 10.0.0     | ホスティング統合                 |
| Serilog.Sinks.File         | 7.0.0      | ファイル出力シンク               |
| Serilog.Sinks.Debug        | 3.0.0      | デバッグ出力シンク               |
| Serilog.Sinks.Map          | 2.0.0      | 条件別シンクルーティング         |
| Serilog.Formatting.Compact | 3.0.0      | コンパクトJSONフォーマッタ       |
| Serilog.Exceptions         | 8.4.0      | 例外詳細ログ                     |
| Sentry                     | 5.6.0      | エラー監視（Sentry）             |
| Sentry.Serilog             | 5.6.0      | Sentry-Serilog統合               |

### 通信・JSON

| ライブラリ名                         | バージョン | 用途                            |
| ------------------------------------ | ---------- | ------------------------------- |
| Newtonsoft.Json                      | 13.0.3     | JSONシリアライズ/デシリアライズ |
| Microsoft.Extensions.Http.Resilience | 10.0.0     | HTTP通信の回復性（リトライ等）  |

### ハードウェア・デバイス（Windows）

| ライブラリ名    | バージョン | 用途               |
| --------------- | ---------- | ------------------ |
| System.IO.Ports | 10.0.0     | シリアルポート通信 |

### ネイティブバインディング（プラットフォーム固有）

| ライブラリ名         | プラットフォーム | 形式                 | 用途                                   |
| -------------------- | ---------------- | -------------------- | -------------------------------------- |
| libepos2.xcframework | iOS              | ネイティブライブラリ | EPSON ePOS SDK（レシートプリンタ制御） |
| ePOS2.jar            | Android          | Javaバインディング   | EPSON ePOS SDK（レシートプリンタ制御） |

### テスト

| ライブラリ名       | バージョン | 用途                         |
| ------------------ | ---------- | ---------------------------- |
| xunit              | 2.9.3      | ユニットテストフレームワーク |
| FluentAssertions   | 8.8.0      | アサーション拡張             |
| Moq                | 4.20.72    | モックライブラリ             |
| coverlet.collector | 6.0.4      | コードカバレッジ             |
