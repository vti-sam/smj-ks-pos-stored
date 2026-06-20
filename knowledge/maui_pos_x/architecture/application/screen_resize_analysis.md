---
title: Screen Resize Analysis
project: maui_pos_x
type: architecture
status: confirmed
source:
  - migrated from memory/maui_pos_x/application_architecture/screen_resize_analysis.md
tags: [maui_pos_x, architecture, application_architecture, screen_resize_analysis]
---

# 画面リサイズ対応・解像度比率変更可否の確認結果

## 結論：対応済み

現在のPOSプロジェクト（MauiPOSX）にて、タブレット／POS／フル画面のリサイズ対応は**既に実装済み**です。

**SVN上に共有済みのアプリを実際に起動していただくことで、動作をご確認いただけます。**

---

## 確認事項への回答

### 1. 「タブレット／POS／フル画面」にリサイズ可能な設計か？

**→ はい。**

- 全画面の寸法・フォントサイズを `OnIdiom`（Phone / Tablet / Desktop）で3パターン定義済み
- Windowsでは起動時にフル画面モードを自動適用
- 同一画面が各デバイスの画面サイズに応じて自動的にスケーリングされる

### 2. 解像度比率に応じて同一画面を表示する設計か？

**→ はい。**

- レイアウトは比率ベース（Grid Star-Sizing `*`）で構築しており、解像度が変わっても同一画面が比率を維持して表示される
- 全20画面が統一的なレイアウトパターンで実装済み

### 3. プロトタイプ（モック）で実現可能か？

**→ 既に実現済みです。**

プロトタイプではなく、現行のPOSプロジェクト上で全20画面が上記の設計で動作しています。

---

## スケーリング比率

| デバイス          | スケール     |
| ----------------- | ------------ |
| **Tablet**        | 1.0x（基準） |
| **Desktop (POS)** | ~0.9x        |
| **Phone**         | ~0.7x        |

---

SVN上のアプリをWindows PC／タブレット等で起動いただければ、リサイズ対応の動作を直接ご確認いただけます。
