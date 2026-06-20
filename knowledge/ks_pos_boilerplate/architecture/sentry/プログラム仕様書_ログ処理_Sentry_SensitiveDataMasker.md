---
project: ks_host
source:
- migrated from management/program-specs/sentry/プログラム仕様書_ログ処理_Sentry_SensitiveDataMasker.md
status: confirmed
tags:
- ks_host
- architecture
- sentry
- プログラム仕様書_ログ処理_sentry_sensitivedatamasker
title: プログラム仕様書_ログ処理_Sentry_SensitiveDataMasker
type: architecture
---

# プログラム仕様書_ログ処理_Sentry_SensitiveDataMasker

## 1. 変更履歴

| バージョン | 作成者 | 更新者 | 更新日 | 変更理由 | 更新内容 |
|---|---|---|---|---|---|
| 0.0.1 | VTI | VTI | 2026年05月22日 | 初版作成 | 機微情報マスキング処理仕様を記載 |

## 2. 表紙

| 項目 | 内容 |
|---|---|
| 名前空間 | `KsPos.Applications.Infrastructure.Monitoring` |
| クラス名（論理） | 機微情報マスキング処理 |
| クラス名（物理） | `SensitiveDataMasker` |
| 種別 | static partial class |
| 役割 / 概要 | Sentry送信前の文字列からカード番号、会員番号、電話番号、メールアドレスを検出しマスキングする |

## 3. クラス定義

| 項目 | 内容 |
|---|---|
| アクセス修飾子 | `public static partial` |
| 継承 / 実装 | なし |
| static / instance | static |
| コンストラクタ | なし |

## 4. メソッド一覧

| No | 修飾子 | static | 戻り値 | メソッド名 | 概要 |
|---:|---|---|---|---|---|
| 1 | public | yes | `string?` | `Mask` | 対象文字列をマスキングする |
| 2 | private | yes | `string` | `MaskAllButLastFour` | 数字列の末尾4桁以外を`*`にする |
| 3 | private | yes | `string` | `MaskMemberCard` | 会員番号の先頭4桁、末尾4桁以外を`*`にする |
| 4 | private | yes | `Regex` | `CreditCardRegex` | カード番号候補を検出する |
| 5 | private | yes | `Regex` | `MemberCardRegex` | 会員番号候補を検出する |
| 6 | private | yes | `Regex` | `PhoneRegex` | 電話番号候補を検出する |
| 7 | private | yes | `Regex` | `EmailRegex` | メールアドレス候補を検出する |
| 8 | private | yes | `Regex` | `DigitsRegex` | 数字以外を除去する |

## 5. メソッド定義

| No | メソッド名 | 引数 | 戻り値 | 処理内容 |
|---:|---|---|---|---|
| 1 | `Mask` | `string? value` | `string?` | nullまたは空文字はそのまま返す。カード番号、会員番号、電話番号、メールアドレスの順に正規表現で検出しマスキングする |
| 2 | `MaskAllButLastFour` | `Match match` | `string` | 数字以外を除去した桁数を基準に、末尾4桁のみ残す |
| 3 | `MaskMemberCard` | `Match match` | `string` | 8桁以下はそのまま返す。9桁以上は先頭4桁と末尾4桁のみ残す |

## 6. マスキング仕様

| 種別 | 検出パターン概要 | 変換例 |
|---|---|---|
| クレジットカード番号候補 | 13〜16桁、空白またはハイフン区切りを許容 | `4111-1111-1111-1111` → `************1111` |
| 会員番号候補 | 先頭4桁 + 中間4〜8桁 + 末尾4桁 | `123456789012` → `1234****9012` |
| 電話番号候補 | `0`開始、区切り文字あり/なしを許容 | `090-1234-5678` → `090****5678` |
| メールアドレス | 一般的なメール形式 | `test.user@example.com` → `***@domain.com` |

## 7. 注意事項

- 正規表現ベースのため、false positive / false negativeが発生する可能性がある。
- APIやデバイスの実ログ形式が確定した後、`cardNo`、`memberNo`、`phone`、`email`、`token`などのkey単位マスキングを追加する。
- 本クラスはSentry SDK非依存のため、単体テスト対象にしやすい。
