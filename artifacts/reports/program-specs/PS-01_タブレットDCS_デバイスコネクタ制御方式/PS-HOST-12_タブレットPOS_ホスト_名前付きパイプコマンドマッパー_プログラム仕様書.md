# PS-HOST-12 タブレットPOS ホスト 名前付きパイプコマンドマッパー プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-HOST-12 |
| 文書名 | タブレットPOS ホスト 名前付きパイプコマンドマッパー プログラム仕様書 |
| 対象 | タブレットPOS / 名前付きパイプコマンドマッパー |
| 版数 | 0.0.2 |
| 作成日 | 2026/07/23 |
| 作成者 | VTI サム, VTI 吉田 |
| レビュー担当 | SMJ 蒲田 |
| 承認者 | SMJ 蒲田 |
| 目的 | 対象クラスの構造、フィールド／プロパティ及びメソッド仕様を定義する。 |
| 期待成果 | 実装及びレビューで参照するクラス単位の仕様を明確にする。 |

## 01_改訂履歴

| 版数 | 日付 | 変更内容 | 作成者 | 承認者 |
| --- | --- | --- | --- | --- |
| 0.0.2 | 2026/07/23 | ARCH-HOST-01に合わせて、デバイスコネクタと通信経路の表記を統一 | VTI サム |  |
| 0.0.1 | 2026/07/23 | 初版作成 | VTI サム |  |

## クラス情報

| 項目 | 内容 |
| --- | --- |
| 機能名 | 名前付きパイプコマンドマッパー |
| 物理クラス名 | NamedPipeCommandMapper |
| 名前空間 | TabletOutProcess.TabletDeviceServer |
| アクセス修飾子 | internal sealed |
| 継承/実装 | INamedPipeCommandMapper |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/tabletposboilerplate/TabetPos.Host/src/TabletHost/DeviceHost/DeviceCommandMapping.cs |
| 対象クラス | NamedPipeCommandMapper |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

コマンド通信用パイプで受け付けた新形式または既存形式の要求をデバイスコネクタ内部のデバイスコマンドへ変換し、処理結果を外部応答へ戻す変換部。要求の形式差を吸収し、デバイス単位の順序制御に使用するキーも提供する。

### 主な責務

- 新形式要求と既存形式メッセージからルーティングキーを決定する。
- 外部要求を既存互換の項目一覧へ整形し、内部コマンドへ変換する。
- 内部処理結果を名前付きパイプ応答へ変換する。
- 新形式要求に不足する既定メッセージとハンドル値を補完する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| コンストラクタ引数 | internal | ILegacyMessageParser | legacyMessageParser | タブ区切りの既存形式メッセージを項目一覧へ変換する依存先。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | internal | - | NamedPipeCommandMapper | 既存形式メッセージ解析部を受け取って初期化する。 |
| ② | public | string | GetRoutingKey | 要求形式に応じてデバイスIDまたは`Host`をルーティングキーとして返す。 |
| ③ | public | DeviceCommand | ToCommand | 外部要求を内部デバイスコマンドへ変換する。 |
| ④ | public | NamedPipeDeviceCommandResponse | ToResponse | 内部処理結果を外部応答へ変換する。 |
| ⑤ | private static | Dictionary<string, string> | BuildItemList | 新形式要求から既存互換の項目一覧を構築する。 |

## メソッド詳細

### ①. NamedPipeCommandMapper

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `internal sealed class NamedPipeCommandMapper(ILegacyMessageParser legacyMessageParser)` |
| 可視性 | internal |
| 戻り値 | - |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| ILegacyMessageParser | 既存形式メッセージ解析部 | legacyMessageParser |

処理内容:

- ① 既存形式メッセージ解析部を受け取る。
- ② 既存形式要求のルーティングキー取得と内部コマンド変換に使用する。
- ③ 新形式と既存形式を同じ内部コマンド処理へ接続できる状態にする。

備考: 既定構成ではLegacyMessageParserが使用される。

### ②. GetRoutingKey

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public string GetRoutingKey(NamedPipeDeviceCommandRequest request)` |
| 可視性 | public |
| 戻り値 | string |
| 戻り値内容 | デバイス単位の順序制御に使用するキー。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| NamedPipeDeviceCommandRequest | デバイスコマンド要求 | request |

処理内容:

- ① 要求がnullの場合は`Host`を返す。
- ② 既存形式メッセージが空の場合は新形式要求として扱う。
- ③ 新形式要求のDeviceIdが設定されている場合はその値を返し、未設定の場合は`Host`を返す。
- ④ 既存形式メッセージがある場合は項目一覧へ変換する。
- ⑤ 項目一覧に空でないDeviceIdがある場合はその値を返し、それ以外は`Host`を返す。

備考: `Host`はデバイスIDを持たないデバイスコネクタ制御要求の共通キーとして使用する。

### ③. ToCommand

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public DeviceCommand ToCommand(NamedPipeDeviceCommandRequest request)` |
| 可視性 | public |
| 戻り値 | DeviceCommand |
| 戻り値内容 | 外部要求から変換した内部デバイスコマンド。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| NamedPipeDeviceCommandRequest | デバイスコマンド要求 | request |

処理内容:

- ① 要求がnullの場合はArgumentNullExceptionを送出する。
- ② 既存形式メッセージがある場合は解析部で項目一覧へ変換する。
- ③ 新形式要求の場合はBuildItemListで既存互換の項目一覧を構築する。
- ④ DeviceCommandFactoryを使用して項目一覧を内部デバイスコマンドへ変換する。
- ⑤ 外部要求のRequestIdを内部デバイスコマンドへ設定して返す。

備考: DeviceId、MethodId、Handleの型変換はDeviceCommandFactoryが担当する。

### ④. ToResponse

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public NamedPipeDeviceCommandResponse ToResponse(NamedPipeDeviceCommandRequest request, DeviceCommandResult result)` |
| 可視性 | public |
| 戻り値 | NamedPipeDeviceCommandResponse |
| 戻り値内容 | 内部処理結果から変換した名前付きパイプ応答。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| NamedPipeDeviceCommandRequest | デバイスコマンド要求 | request |
| DeviceCommandResult | デバイスコマンド処理結果 | result |

処理内容:

- ① 要求のRequestIdを応答へ設定する。
- ② 処理結果のSuccessとReturnValueを応答の成功状態とResultCodeへ設定する。
- ③ メッセージがnullの場合は空文字を設定する。
- ④ ペイロードがnullの場合は空の辞書を設定する。
- ⑤ 変換した名前付きパイプ応答を返す。

備考: デバイスコネクタ制御用のPostWriteActionは呼出元のアダプターが変換後の応答へ設定する。

### ⑤. BuildItemList

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static Dictionary<string, string> BuildItemList(NamedPipeDeviceCommandRequest request)` |
| 可視性 | private static |
| 戻り値 | Dictionary<string, string> |
| 戻り値内容 | 新形式要求から構築した既存互換の項目一覧。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| NamedPipeDeviceCommandRequest | デバイスコマンド要求 | request |

処理内容:

- ① Messageが空の場合はDeviceMethodを既定値として設定する。
- ② DeviceIdとMethodIdを既存互換キーへ設定する。
- ③ Handleが空の場合は0を設定し、それ以外は受信値を設定する。
- ④ ペイロードがある場合は全項目を項目一覧へ追加する。
- ⑤ 同じキーがある場合はペイロードの値で更新する。
- ⑥ 構築した項目一覧を返す。

備考: -

## 処理フロー/注意事項

- DeviceCommandRouterはGetRoutingKeyを使用して新形式と既存形式の要求を同じデバイスキューへ振り分ける。
- ToCommandは要求形式の差を既存互換の項目一覧で吸収してから内部コマンドを生成する。
- ToResponseは内部処理結果の戻り値を外部応答のResultCodeへ設定する。

### 注意事項

- NamedPipeDeviceCommandRequestはRequestId、Message、DeviceId、MethodId、Handle、LegacyMessage、Payloadを保持する。
- NamedPipeDeviceCommandResponseはRequestId、Success、ResultCode、Message、Payloadを保持する。内部用のPostWriteActionはJSONへ出力しない。
- DeviceCommandは型変換後のデバイスID、メソッドID、ハンドル、引数を保持し、DeviceCommandResultは成功状態、戻り値、デバイスコネクタ制御アクション、応答ペイロードを保持する。
- ILegacyMessageParser、INamedPipeCommandMapper、LegacyMessageParserは本クラスの変換責務を支える小規模な関連型として同じ設計範囲で扱う。
- LegacyMessageParserは既存形式メッセージをタブで分割し、キーと値の組を先頭から順に辞書へ設定する。値を持たない末尾要素は使用しない。
- DeviceCommandFactoryはDeviceIdとMethodIdが既存グループに登録されている場合だけ型変換し、Handleは整数へ変換できる場合だけ設定する。
