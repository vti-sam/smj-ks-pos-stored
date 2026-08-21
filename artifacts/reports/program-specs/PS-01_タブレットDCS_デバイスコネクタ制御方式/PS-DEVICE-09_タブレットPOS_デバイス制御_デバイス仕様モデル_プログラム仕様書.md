# PS-DEVICE-09 タブレットPOS デバイス制御 デバイス仕様モデル プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-DEVICE-09 |
| 文書名 | タブレットPOS デバイス制御 デバイス仕様モデル プログラム仕様書 |
| 対象 | タブレットPOS / デバイス仕様モデル |
| 版数 | 0.0.1 |
| 作成日 | 2026/08/24 |
| 作成者 | VTI サム |
| レビュー担当 | SMJ 中田 |
| 承認者 | SMJ 中田 |
| 目的 | デバイスの識別情報、制御方式および接続設定を保持するモデル仕様を定義する。 |
| 期待成果 | 設定変換、デバイス選択およびストラテジー生成で共通利用するデータ定義を明確にする。 |

## 01_改訂履歴

| 版数 | 日付 | 変更内容 | 作成者 | 承認者 |
| --- | --- | --- | --- | --- |
| 0.0.1 | 2026/08/24 | 初版作成 | VTI サム | SMJ 中田 |

## クラス情報

| 項目 | 内容 |
| --- | --- |
| 機能名 | デバイス仕様モデル |
| 物理クラス名 | DeviceSpec |
| 名前空間 | TabletPos.DeviceCtrl.Models.Device |
| アクセス修飾子 | public |
| 継承/実装 | - |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/TabletPosBoilerplate/TabletPos.DeviceCtrl/Models/Device/DeviceSpec.cs |
| 対象クラス | DeviceSpec |
| 設計対象 | デバイス識別情報、ストラテジー指定、接続設定参照、識別子生成 |

## クラス概要

設定JSONから読み込んだデバイスの識別情報、名称、種別、ベンダー、シリーズ、言語、対象プラットフォーム、ストラテジークラス名および接続設定を保持するモデルクラスである。デバイス種別の比較と管理用識別子の生成機能を提供する。

### 主な責務

- デバイスの識別情報と表示情報を保持する。
- 対象OSおよび使用するストラテジークラス名を保持する。
- DeviceConfigを通じて接続設定を保持する。
- デバイス種別の比較と管理用IDの生成を行う。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| プロパティ | public | string? | Id | OS別のデバイスIDを保持する。JSON項目idに対応する。 |
| プロパティ | public | string? | Name | デバイス名を保持する。JSON項目nameに対応する。 |
| プロパティ | public | string? | Type | printer、scannerなどのデバイス種別を保持する。JSON項目typeに対応する。 |
| プロパティ | public | string? | Vendor | ベンダー名を保持する。JSON項目vendorに対応する。 |
| プロパティ | public | string? | Series | シリーズ名を保持する。JSON項目seriesに対応する。 |
| プロパティ | public | string? | Lang | 言語設定を保持する。JSON項目langに対応する。 |
| プロパティ | public | string? | OS | 対象OSを保持する。JSON項目osに対応する。 |
| プロパティ | public | string? | StrategyClass | 生成対象のストラテジークラス名を保持する。JSON項目strategyclassに対応する。 |
| プロパティ | public | DeviceConfig? | DeviceConfig | 接続種別、アドレスおよび通信条件を含むデバイス設定を保持する。JSON項目configに対応する。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | public | bool | IsType | 指定された種別と現在のデバイス種別が一致するか判定する。 |
| ② | public | string | GetId | デバイス属性から管理用IDを生成する。 |
| ③ | public | string | GetActiveId | ベンダーとシリーズから有効デバイス選択用IDを生成する。 |

## メソッド詳細

### ①. IsType

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public bool IsType(string type)` |
| 可視性 | public |
| 戻り値 | bool |
| 戻り値内容 | Typeと指定種別が大文字と小文字を区別せず一致する場合はtrue、それ以外はfalse。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | 比較対象のデバイス種別 | type |

処理内容:

- ① Typeが設定されているか確認する。
- ② Typeと指定種別を大文字と小文字を区別せず比較する。
- ③ 比較結果を返す。

備考: Typeがnullの場合はfalseを返す。

### ②. GetId

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public string GetId()` |
| 可視性 | public |
| 戻り値 | string |
| 戻り値内容 | Type、VendorおよびSeriesをハイフンで連結した管理用ID。 |

処理内容:

- ① Type、VendorおよびSeriesを順番に取得する。
- ② 各値をハイフンで連結する。
- ③ 生成した文字列を返す。

備考: 各プロパティがnullの場合も区切り文字を含む文字列として生成する。

### ③. GetActiveId

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public string GetActiveId()` |
| 可視性 | public |
| 戻り値 | string |
| 戻り値内容 | VendorとSeriesをアンダースコアで連結し、先頭と末尾のアンダースコアを除いた有効デバイス選択用ID。 |

処理内容:

- ① Vendorがnullの場合は空文字として扱う。
- ② Seriesがnullの場合は空文字として扱う。
- ③ VendorとSeriesをアンダースコアで連結する。
- ④ 先頭と末尾のアンダースコアを除いて返す。

備考: VendorとSeriesがともに未設定の場合は空文字を返す。

## 処理フロー/注意事項

- DeviceConfigurationはJSONから本モデルを生成する。
- DeviceManagerはId、Type、OSおよびGetActiveIdの結果を使用して有効なデバイスを選択する。
- StrategyFactoryはStrategyClassとDeviceSpecを使用して対象ストラテジーを生成し、初期化する。
- 接続種別や通信パラメーターの詳細はDeviceConfigに保持する。
