# PS-STATE-01 タブレットPOS ローカル状態管理 スナップショット対応ビューモデル基底 プログラム仕様書

## 改訂履歴

| バージョン | 更新日 | 更新者 | 変更内容 |
| --- | --- | --- | --- |
| 0.0.1 | 2026/06/21 | VTI | 初版作成 |

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | PS-STATE-01 |
| プロジェクト名 | タブレットPOS |
| 機能名 | スナップショット対応ビューモデル基底 |
| 物理クラス名 | SnapshotViewModelBase |
| 名前空間 | TabetPos.Applications.Presentation.ViewModels.Base |
| アクセス修飾子 | public abstract |
| 継承/実装 | BaseViewModel |
| 更新日 | 2026/06/21 |

## ソース対応

| 項目 | 内容 |
| --- | --- |
| ソースファイル | sources/tabletposboilerplate/TabetPos.Applications/Presentation/ViewModels/Base/SnapshotViewModelBase.cs |
| 対象クラス | SnapshotViewModelBase |
| 設計対象 | クラス本体、フィールド/プロパティ、メソッド仕様 |

## クラス概要

画面の表示、非表示、アプリ停止、復帰に合わせて入力途中の画面状態を保存し、再表示時に復元するための共通基底である。保存対象を明示した項目だけを扱い、失敗しても画面起動を妨げない方針で動作する。

### 主な責務

- 保存対象項目を型ごとに抽出して再利用する。
- 画面ライフサイクルに合わせて保存と復元を行う。
- 短時間の重複保存と並列保存を抑止する。

## フィールド/プロパティ

| 区分 | 可視性 | 型 | 名前 | 用途 |
| --- | --- | --- | --- | --- |
| フィールド | private static readonly | ConcurrentDictionary<Type, PropertyInfo[]> | PersistPropertyCache | 保存対象プロパティの探索結果を型単位で保持する。 |
| フィールド | private static readonly | TimeSpan | SnapshotSaveThrottle | 短時間に連続する保存要求を抑止する間隔。 |
| フィールド | private readonly | SemaphoreSlim | _snapshotSaveLock | 保存処理が同時に複数走らないよう制御する。 |
| フィールド | private | DateTime | _lastSnapshotSavedAtUtc | 最後に保存したUTC時刻。 |
| プロパティ | protected virtual | string | SnapshotSessionKey | セッションを識別するキー。既定値は default。 |
| プロパティ | protected virtual | string | SnapshotKey | 画面単位の保存データを識別するキー。 |

## メソッド一覧

| No | 可視性 | 戻り値 | メソッド名 | 概要 |
| --- | --- | --- | --- | --- |
| 1 | protected override | Task | OnAppearingAsync | 画面表示時に保存済み状態を復元してから基底処理を実行する。 |
| 2 | protected override | Task | OnDisappearingAsync | 画面非表示時に現在状態を保存してから基底処理を実行する。 |
| 3 | protected override | Task | OnResumingAsync | アプリ復帰時に保存済み状態を再取得する。 |
| 4 | protected override | Task | OnStoppingAsync | アプリ停止時に現在状態を保存する。 |
| 5 | private | Task | SavePropertiesToSnapshotAsync | 重複保存を抑止しながら保存本体を実行する。 |
| 6 | private | Task | SavePropertiesToSnapshotCoreAsync | 保存対象項目を収集してスナップショット保存サービスへ渡す。 |
| 7 | private | Task | RestorePropertiesFromSnapshotAsync | 保存済み値を取得し、対象項目へ反映する。 |
| 8 | private | PropertyInfo[] | GetPersistableProperties | 保存対象として指定された項目を抽出してキャッシュする。 |
| 9 | private static | object? | ConvertSnapshotValue | 保存済み値を復元先の型へ変換する。 |

## メソッド詳細

### 1. OnAppearingAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `protected override async Task OnAppearingAsync()` |
| 可視性 | protected override |
| 戻り値 | Task |
| 戻り値内容 | 非同期処理の完了を表すタスク。 |

処理内容:

- ① 保存済み状態の取得と反映を実行する。
- ② 復元後に画面表示時の基底処理を呼び出す。

備考: -

### 2. OnDisappearingAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `protected override async Task OnDisappearingAsync()` |
| 可視性 | protected override |
| 戻り値 | Task |
| 戻り値内容 | 非同期処理の完了を表すタスク。 |

処理内容:

- ① 保存対象の現在値を永続化する。
- ② 保存後に画面非表示時の基底処理を呼び出す。

備考: -

### 3. OnResumingAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `protected override async Task OnResumingAsync()` |
| 可視性 | protected override |
| 戻り値 | Task |
| 戻り値内容 | 非同期処理の完了を表すタスク。 |

処理内容:

- ① 端末内に残っている保存済み状態を取得する。
- ② 取得後に復帰時の基底処理を呼び出す。

備考: -

### 4. OnStoppingAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `protected override async Task OnStoppingAsync()` |
| 可視性 | protected override |
| 戻り値 | Task |
| 戻り値内容 | 非同期処理の完了を表すタスク。 |

処理内容:

- ① 停止直前の保存対象項目を永続化する。
- ② 保存後に停止時の基底処理を呼び出す。

備考: -

### 5. SavePropertiesToSnapshotAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private async Task SavePropertiesToSnapshotAsync()` |
| 可視性 | private |
| 戻り値 | Task |
| 戻り値内容 | 非同期処理の完了を表すタスク。 |

処理内容:

- ① 最終保存時刻との差が抑止間隔未満の場合は処理を終了する。
- ② 排他ロックを取得してから再度抑止判定を行う。
- ③ 保存本体を実行し、最後に保存時刻を更新する。
- ④ 処理終了時に排他ロックを解放する。

備考: -

### 6. SavePropertiesToSnapshotCoreAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private async Task SavePropertiesToSnapshotCoreAsync()` |
| 可視性 | private |
| 戻り値 | Task |
| 戻り値内容 | 非同期処理の完了を表すタスク。 |

処理内容:

- ① 保存対象項目がない場合は処理を終了する。
- ② 対象項目の値を読み取り、項目名と値の組にまとめる。
- ③ 値取得で例外が発生した項目は画面継続を優先して除外する。
- ④ セッションキー、画面キー、画面種別、現在ルートを付けて保存サービスへ渡す。

備考: -

### 7. RestorePropertiesFromSnapshotAsync

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private async Task RestorePropertiesFromSnapshotAsync()` |
| 可視性 | private |
| 戻り値 | Task |
| 戻り値内容 | 非同期処理の完了を表すタスク。 |

処理内容:

- ① 保存済み状態が存在しない場合は処理を終了する。
- ② 保存対象項目ごとに保存値の有無を確認する。
- ③ 保存値を対象項目の型へ変換する。
- ④ 変換できた値を項目へ設定し、古い値や不正値は無視する。

備考: -

### 8. GetPersistableProperties

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private PropertyInfo[] GetPersistableProperties()` |
| 可視性 | private |
| 戻り値 | PropertyInfo[] |
| 戻り値内容 | 保存対象として指定された項目を抽出してキャッシュした結果。 |

処理内容:

- ① 型ごとのキャッシュに探索結果があればそれを返す。
- ② 継承階層をたどり、保存対象属性が付いたプロパティを抽出する。
- ③ 生成されたフィールドに保存対象属性がある場合は対応するプロパティを探す。
- ④ 読み書き可能な項目だけを結果として保持する。

備考: -

### 9. ConvertSnapshotValue

| 項目 | 内容 |
| --- | --- |
| シグネチャ | `private static object? ConvertSnapshotValue(object? value, Type targetType)` |
| 可視性 | private static |
| 戻り値 | object? |
| 戻り値内容 | 保存済み値を復元先の型へ変換した結果。該当しない場合は null。 |

引数:

| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| object? | 保存値 | value |
| Type | 変換先型 | targetType |

処理内容:

- ① 保存値が null の場合は null を返す。
- ② null 許容型の場合は実体型を変換先として扱う。
- ③ JSON要素の場合は生JSONを対象型へデシリアライズする。
- ④ すでに対象型の値であればそのまま返し、それ以外は標準変換を行う。

備考: -

## 処理フロー/注意事項

- 保存対象は属性で明示された読み書き可能な項目のみとする。
- 保存処理は500ms以内の連続実行を抑止し、端末内DBへの過剰な書き込みを避ける。
- 復元失敗や古い形式の保存値は画面起動を止めずに無視する。
