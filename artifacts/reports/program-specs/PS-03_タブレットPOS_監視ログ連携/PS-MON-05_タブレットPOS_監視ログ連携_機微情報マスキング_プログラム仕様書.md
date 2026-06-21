# PS-MON-05 タブレットPOS 監視ログ連携 機微情報マスキング プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.1 | 2026/06/21 | VTI | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-MON-05 |
| プロジェクト名 | タブレットPOS |
| 機能名 | 機微情報マスキング |
| 物理クラス名 | SensitiveDataMasker |
| 名前空間 | TabetPos.Core.Monitoring |
| アクセス修飾子 | public static partial |
| 継承/実装 | - |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/KsPosBoilerplate/TabetPos.Core/Monitoring/SensitiveDataMasker.cs |
| 対象クラス | SensitiveDataMasker |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

監視ログへ送信する文字列からカード番号候補、会員番号候補、電話番号候補、メールアドレスを検出して伏字化する共通処理である。

### 主な責務

- 入力文字列に含まれる機微情報候補を検出する。
- 検出した値を用途別の伏字形式へ変換する。
- 空文字やnullはそのまま返す。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| - | - | - | - | フィールド/プロパティ定義なし。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | public static | string? | Mask | 対象文字列に含まれる機微情報候補をマスキングする。 |
| 2 | private static | string | MaskAllButLastFour | カード番号候補を末尾4桁だけ残して伏字化する。 |
| 3 | private static | string | MaskMemberCard | 会員番号候補を先頭と末尾だけ残して伏字化する。 |
| 4 | private static partial | Regex | CreditCardRegex | カード番号候補を検出する正規表現を返す。 |
| 5 | private static partial | Regex | MemberCardRegex | 会員番号候補を検出する正規表現を返す。 |
| 6 | private static partial | Regex | PhoneRegex | 電話番号候補を検出する正規表現を返す。 |
| 7 | private static partial | Regex | EmailRegex | メールアドレスを検出する正規表現を返す。 |
| 8 | private static partial | Regex | DigitsRegex | 数字以外を検出する正規表現を返す。 |

## メソッド詳細

### 1. Mask

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public static string? Mask(string? value)` |
| 可視性 | public static |
| 戻り値 | string? |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string? | 対象文字列 | value |

処理内容:

- ① 入力がnullまたは空文字の場合はそのまま返す。
- ② カード番号候補を末尾4桁以外の伏字へ変換する。
- ③ 会員番号候補を先頭4桁と末尾4桁以外の伏字へ変換する。
- ④ 電話番号候補を中間部伏字へ変換する。
- ⑤ メールアドレスを固定の伏字形式へ変換して返す。

備考: -

### 2. MaskAllButLastFour

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static string MaskAllButLastFour(Match match)` |
| 可視性 | private static |
| 戻り値 | string |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Match | 正規表現一致結果 | match |

処理内容:

- ① 一致した文字列から数字以外を除去する。
- ② 数字が4桁未満の場合は元の文字列を返す。
- ③ 末尾4桁以外を伏字にして返す。

備考: -

### 3. MaskMemberCard

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static string MaskMemberCard(Match match)` |
| 可視性 | private static |
| 戻り値 | string |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| Match | 正規表現一致結果 | match |

処理内容:

- ① 一致した文字列を取得する。
- ② 8文字以下の場合は元の文字列を返す。
- ③ 先頭4文字と末尾4文字を残し、中間部を伏字にして返す。

備考: -

### 4. CreditCardRegex

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static partial Regex CreditCardRegex()` |
| 可視性 | private static partial |
| 戻り値 | Regex |

処理内容:

- ① 13から16桁相当の数字列を検出する正規表現を生成する。
- ② 空白またはハイフン区切りを許容する。

備考: -

### 5. MemberCardRegex

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static partial Regex MemberCardRegex()` |
| 可視性 | private static partial |
| 戻り値 | Regex |

処理内容:

- ① 先頭4桁、中間4から8桁、末尾4桁の数字列を検出する正規表現を生成する。

備考: -

### 6. PhoneRegex

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static partial Regex PhoneRegex()` |
| 可視性 | private static partial |
| 戻り値 | Regex |

処理内容:

- ① 0始まりの市外局番、番号中間部、末尾4桁を検出する正規表現を生成する。
- ② ハイフン、ドット、空白区切りを許容する。

備考: -

### 7. EmailRegex

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static partial Regex EmailRegex()` |
| 可視性 | private static partial |
| 戻り値 | Regex |

処理内容:

- ① 一般的なメールアドレス形式を検出する正規表現を生成する。

備考: -

### 8. DigitsRegex

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static partial Regex DigitsRegex()` |
| 可視性 | private static partial |
| 戻り値 | Regex |

処理内容:

- ① 数字以外の文字を検出する正規表現を生成する。
- ② カード番号候補の桁数判定に使用する。

備考: -

## 処理フロー/注意事項

- マスキングは正規表現ベースであり、送信前の安全対策として使用する。
- カード番号候補は区切り文字を除いた桁数で判定する。
- 複数の機微情報候補が1文字列内に含まれる場合も順にマスキングされる。
