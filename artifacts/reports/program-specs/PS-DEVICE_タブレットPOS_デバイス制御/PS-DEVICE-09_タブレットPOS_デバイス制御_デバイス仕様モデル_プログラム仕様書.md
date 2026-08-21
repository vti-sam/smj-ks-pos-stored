# PS-DEVICE-09 タブレットPOS デバイス制御 デバイス仕様モデル プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-DEVICE-09 |
| 文書名 | タブレットPOS デバイス制御 デバイス仕様モデル プログラム仕様書 |
| 対象 | タブレットPOS / デバイス仕様モデル |
| 版数 | 0.0.2 |
| 作成日 | 2026/08/24 |
| 作成者 | VTI サム |
| レビュー担当 | SMJ 中田 |
| 承認者 | SMJ 中田 |
| 目的 | デバイスの識別情報、制御方式および接続設定を保持するモデル仕様を定義する。 |
| 期待成果 | 設定変換、デバイス選択およびストラテジー生成で共通利用するデータ定義を明確にする。 |

## 01_改訂履歴

| 版数 | 日付 | 変更内容 | 作成者 | 承認者 |
| --- | --- | --- | --- | --- |
| 0.0.2 | 2026/08/24 | 同一モデル境界のDeviceConfigプロパティと接続値変換メソッドを追加し、ソースとの対応を完全化 | VTI サム | SMJ 中田 |
| 0.0.1 | 2026/08/24 | 初版作成 | VTI サム | SMJ 中田 |

## クラス情報

| 項目 | 内容 |
| --- | --- |
| 機能名 | デバイス仕様モデル |
| 物理クラス名 | DeviceSpec / DeviceConfig |
| 名前空間 | TabletPos.DeviceCtrl.Models.Device |
| アクセス修飾子 | public |
| 継承/実装 | - |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/TabletPosBoilerplate/TabletPos.DeviceCtrl/Models/Device/DeviceSpec.cs |
| 対象クラス | DeviceSpec / DeviceConfig |
| 設計対象 | デバイス識別情報、ストラテジー指定、接続設定参照、識別子生成 |

## クラス概要

設定JSONから読み込んだデバイスの識別情報、名称、種別、ベンダー、シリーズ、言語、対象プラットフォーム、ストラテジークラス名および接続設定を保持するモデル境界である。デバイス種別の比較、管理用識別子の生成、接続値の数値変換、および接続先の選択機能を提供する。

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
| 関連モデルのプロパティ | public | string? | DeviceConfig.ConnectionType | 接続種別を保持する。JSON項目connectiontypeに対応する。 |
| 関連モデルのプロパティ | public | string? | DeviceConfig.IpAddress | IPアドレスを保持する。JSON項目ipaddressに対応する。 |
| 関連モデルのプロパティ | public | string? | DeviceConfig.Port | ポート番号を文字列で保持する。JSON項目portに対応する。 |
| 関連モデルのプロパティ | public | string? | DeviceConfig.ComPort | COMポート名を保持する。JSON項目comportに対応する。 |
| 関連モデルのプロパティ | public | string? | DeviceConfig.MacAddress | MACアドレスを保持する。JSON項目macaddressに対応する。 |
| 関連モデルのプロパティ | public | string? | DeviceConfig.BtMacAddress | Bluetooth MACアドレスを保持する。JSON項目bluetoothaddressに対応する。 |
| 関連モデルのプロパティ | public | string? | DeviceConfig.BaudRate | シリアル通信のボーレートを文字列で保持する。JSON項目baudrateに対応する。 |
| 関連モデルのプロパティ | public | string? | DeviceConfig.Parity | シリアル通信のパリティを保持する。JSON項目parityに対応する。 |
| 関連モデルのプロパティ | public | string? | DeviceConfig.DataBits | シリアル通信のデータビット数を文字列で保持する。JSON項目databitsに対応する。 |
| 関連モデルのプロパティ | public | string? | DeviceConfig.StopBits | シリアル通信のストップビットを保持する。JSON項目stopbitsに対応する。 |
| 関連モデルのプロパティ | public | string? | DeviceConfig.Handshake | シリアル通信のハンドシェイクを保持する。JSON項目handshakeに対応する。 |
| 関連モデルのプロパティ | public | bool? | DeviceConfig.IsPrioritize | 決済端末利用時の優先フラグを保持する。JSON項目prioritizeに対応する。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | public | bool | IsType | 指定された種別と現在のデバイス種別が一致するか判定する。 |
| ② | public | string | GetId | デバイス属性から管理用IDを生成する。 |
| ③ | public | string | GetActiveId | ベンダーとシリーズから有効デバイス選択用IDを生成する。 |
| ④ | public | int | DeviceConfig.GetPortAsInt | ポート番号を整数で取得する。 |
| ⑤ | public | int | DeviceConfig.GetBaudRate | ボーレートを整数で取得する。 |
| ⑥ | public | int | DeviceConfig.GetDataBits | データビット数を整数で取得する。 |
| ⑦ | public | string? | DeviceConfig.GetConnectTarget | 接続種別に対応する接続先を取得する。 |

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

### ④. DeviceConfig.GetPortAsInt

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int GetPortAsInt()` |
| 可視性 | public |
| 戻り値 | int |
| 戻り値内容 | 変換できたポート番号。変換できない場合は0。 |

処理内容:

- ① Portを整数へ変換する。
- ② 変換できた場合は変換値、変換できない場合は0を返す。

備考: 例外は送出しない。

### ⑤. DeviceConfig.GetBaudRate

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int GetBaudRate()` |
| 可視性 | public |
| 戻り値 | int |
| 戻り値内容 | 変換できたボーレート。変換できない場合は9600。 |

処理内容:

- ① BaudRateを整数へ変換する。
- ② 変換できた場合は変換値、変換できない場合は9600を返す。

備考: 例外は送出しない。

### ⑥. DeviceConfig.GetDataBits

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public int GetDataBits()` |
| 可視性 | public |
| 戻り値 | int |
| 戻り値内容 | 変換できたデータビット数。変換できない場合は8。 |

処理内容:

- ① DataBitsを整数へ変換する。
- ② 変換できた場合は変換値、変換できない場合は8を返す。

備考: 例外は送出しない。

### ⑦. DeviceConfig.GetConnectTarget

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public string? GetConnectTarget()` |
| 可視性 | public |
| 戻り値 | string? |
| 戻り値内容 | 接続種別に応じた接続先。設定がない場合はnull。 |

処理内容:

- ① ConnectionTypeを小文字へ変換する。
- ② bluetoothの場合はBtMacAddressを返す。
- ③ lanまたはtcpの場合はIpAddressを返す。
- ④ その他の場合はBtMacAddress、IpAddress、MacAddressの順で最初の非null値を返す。

備考: ConnectionTypeがnullの場合は④の順序で接続先を選択する。

## 処理フロー/注意事項

- DeviceConfigurationはJSONから本モデルを生成する。
- DeviceManagerはId、Type、OSおよびGetActiveIdの結果を使用して有効なデバイスを選択する。
- StrategyFactoryはStrategyClassとDeviceSpecを使用して対象ストラテジーを生成し、初期化する。
- 接続種別や通信パラメーターの詳細はDeviceConfigに保持する。
- DeviceConfigはポート、ボーレート、データビットの既定値変換と、接続種別に応じた接続先の選択を行う。
