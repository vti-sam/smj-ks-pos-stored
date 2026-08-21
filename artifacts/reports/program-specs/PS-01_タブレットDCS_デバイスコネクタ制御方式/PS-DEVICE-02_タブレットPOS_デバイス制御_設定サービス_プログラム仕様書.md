# PS-DEVICE-02 タブレットPOS デバイス制御 設定サービス プログラム仕様書

タブレットPOS

## 00_表紙

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-DEVICE-02 |
| 文書名 | タブレットPOS デバイス制御 設定サービス プログラム仕様書 |
| 対象 | タブレットPOS / デバイス制御設定サービス |
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
| 0.0.2 | 2026/08/24 | ソースコードの名称変更に伴い、名前空間、およびソースファイルパスの表記をTabletPos.*に統一。責務、処理フロー、および設計上の動作に変更なし。 | VTI サム |  |
| 0.0.1 | 2026/07/23 | 初版作成 | VTI サム |  |

## クラス情報

| 項目 | 内容 |
| --- | --- |
| 機能名 | デバイス制御設定サービス |
| 物理クラス名 | DeviceControllerConfigService |
| 名前空間 | TabletPos.DeviceCtrl.Configuration |
| アクセス修飾子 | internal sealed |
| 継承/実装 | - |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/TabletPosBoilerplate/TabletPos.DeviceCtrl/Configuration/DeviceControllerConfigService.cs |
| 対象クラス | DeviceControllerConfigService |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

端末別に保存されたデバイス設定を優先して読み込み、使用できない場合はアプリに同梱された初期設定へ切り替える設定管理部。設定内容の変換、実行時設定の保存、異常内容のログ出力を担当する。

### 主な責務

- 実行時設定が存在する場合は優先して読み込む。
- 実行時設定が不正な場合は警告を記録し、組込み初期設定へ切り替える。
- 組込み初期設定を読み込めない場合はエラーを記録して呼出元へ通知する。
- 設定を整形済みJSONとしてUTF-8（BOMなし）で保存する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| コンストラクタ引数 | internal | IDeviceControllerConfigStorage | storage | 実行時設定と組込み初期設定の読込・保存先。 |
| コンストラクタ引数 | internal | IAppLogger | logger | 設定読込失敗時の警告およびエラー出力先。 |
| フィールド | private static readonly | Encoding | Utf8NoBom | 設定ファイルの読込・保存に使用するUTF-8（BOMなし）エンコーディング。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| ① | internal | - | DeviceControllerConfigService | 設定ストレージとログ出力先を受け取って初期化する。 |
| ② | public | Task<DeviceConfig> | LoadAsync | 実行時設定を優先し、必要に応じて組込み初期設定へ切り替えて読み込む。 |
| ③ | public | Task | SaveAsync | 設定を整形済みJSONへ変換して実行時設定として保存する。 |
| ④ | private static | DeviceConfig | Deserialize | JSON文字列をデバイス設定へ変換し、空の結果をエラーとする。 |

## メソッド詳細

### ①. DeviceControllerConfigService

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `internal sealed class DeviceControllerConfigService(IDeviceControllerConfigStorage storage, IAppLogger logger)` |
| 可視性 | internal |
| 戻り値 | - |
| 戻り値内容 | - |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IDeviceControllerConfigStorage | 設定ストレージ | storage |
| IAppLogger | アプリケーションログ出力先 | logger |

処理内容:

- ① 設定ストレージを受け取り、実行時設定と組込み初期設定へアクセスできるようにする。
- ② アプリケーションログ出力先を受け取る。
- ③ 読込失敗時に設定の切替理由または処理中断理由を記録できる状態にする。

備考: 依存性注入コンテナーへシングルトンとして登録される。

### ②. LoadAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public async Task<DeviceConfig> LoadAsync(CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task<DeviceConfig> |
| 戻り値内容 | 読み込みとJSON変換が完了したデバイス設定。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① 実行時設定ファイルが存在するか確認する。
- ② 存在する場合はUTF-8（BOMなし）で内容を読み込み、デバイス設定へ変換して返す。
- ③ 実行時設定の読込または変換に失敗した場合は、対象パスを含む警告ログを出力する。
- ④ 実行時設定が存在しない場合、または使用できない場合は組込み初期設定を読み込む。
- ⑤ 組込み初期設定をデバイス設定へ変換して返す。
- ⑥ 組込み初期設定の読込または変換に失敗した場合は、リソース名を含むエラーログを出力して例外を再送出する。
- ⑦ キャンセル例外は警告またはエラーへ変換せず、そのまま再送出する。

備考: 実行時設定が不正でも組込み初期設定が正常であれば初期化を継続する。

### ③. SaveAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `public Task SaveAsync(DeviceConfig config, CancellationToken cancellationToken = default)` |
| 可視性 | public |
| 戻り値 | Task |
| 戻り値内容 | 実行時設定の保存完了を表すタスク。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| DeviceConfig | 保存対象設定 | config |
| CancellationToken | キャンセル制御トークン | cancellationToken |

処理内容:

- ① 保存対象設定がnullの場合はArgumentNullExceptionを送出する。
- ② 設定をインデント付きJSON文字列へ変換する。
- ③ UTF-8（BOMなし）を指定して設定ストレージへ保存を依頼する。
- ④ 設定ストレージが返す保存タスクを呼出元へ返す。

備考: 保存先ディレクトリの準備とファイル書込は設定ストレージが担当する。

### ④. Deserialize

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static DeviceConfig Deserialize(string json, string source)` |
| 可視性 | private static |
| 戻り値 | DeviceConfig |
| 戻り値内容 | JSON文字列から変換したデバイス設定。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| string | 設定JSON | json |
| string | 設定取得元 | source |

処理内容:

- ① JSON文字列をデバイス設定（DeviceConfig）へ変換する。
- ② 変換結果が存在する場合は返却する。
- ③ 変換結果が存在しない場合は、設定取得元を含むJSONシリアル化例外（JsonSerializationException）を送出する。

備考: JSON形式不正時の例外は呼出元のLoadAsyncで処理される。

## 処理フロー/注意事項

- LoadAsyncは実行時設定を最優先し、失敗時だけ組込み初期設定へ切り替える。
- SaveAsyncは端末別の実行時設定だけを更新し、組込み初期設定は変更しない。
- Deserializeは実行時設定と組込み初期設定の両方で共通使用する。

### 注意事項

- キャンセル要求は設定切替の対象とせず、呼出元へ伝播する。
- 組込み初期設定も使用できない場合は初期化を継続しない。
- 本サービスの登録はServiceCollectionExtensions、呼出しはDeviceManagerが担当する。
