# TC-UT-DEVICE-01 テストケース — タブレットPOS デバイス制御 単体テスト（廃止）

## @meta
プロジェクト名: タブレットPOS
モジュール: デバイス制御
段階: 単体テスト
作成者: VTI-SAM
作成日: 2026/06/19
作成日時: 2026/06/19 16:00
環境: ローカル

## 位置づけ

本書は現行コードの単体テストケースとしては使用しない。

現行 source の `TestProperty("TestCaseId", ...)` には `UT-DEVICE` 系のテストケースIDは存在しない。旧版で本書に記載していた Host 連携、ローカル状態管理、監視ログ連携の単体テストは、現在は下記の各文書へ統合済みである。

## 統合先

| 対象範囲 | 統合先文書 | 現行テストケースID |
| --- | --- | --- |
| DeviceCtrl から Host へ送る command mapping、Named Pipe migration、Host pipeline | `TC-UT-HOST-01_タブレットPOS_ホストデバイス制御_単体テストケース.md` | `UT-HOST-001` 〜 `UT-HOST-034` |
| ローカル状態管理、session、ViewModel snapshot | `TC-UT-STATE-01_タブレットPOS_ローカル状態管理_単体テストケース.md` | `UT-STATE-001` 〜 `UT-STATE-024` |
| 監視ログ連携、Sentry 設定、機微情報マスキング | `TC-UT-SENTRY-01_タブレットPOS_監視ログ連携_単体テストケース.md` | `UT-SENTRY-001` 〜 `UT-SENTRY-013` |
| OPOS runtime、COM registration、実機 open 確認 | 結合テストまたは実機確認観点として扱う | 必要時に `TC-IT-HOST-01` または `TC-IT-DEVICE-01` へ追加する |

## 扱い

本書には実行対象のテストケース行を定義しない。テスト計画、Excel 出力、実施管理では統合先文書を参照する。

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 文書ID | TC-UT-DEVICE-01 |
| プロジェクト名 | Tablet POS |
| モジュール名 | Device Control |
| テスト段階 | Unit Test |
| 作成者 | VTI-SAM |
| 作成日 | 2026/06/19 |
| 環境 | ローカル |

## 更新履歴

| バージョン | 依頼者 | 更新者 | 更新日時 | 変更理由 | シート名 | 更新内容 |
| --- | --- | --- | --- | --- | --- | --- |
| 1.0.0 | - | VTI-SAM | 2026/06/19 | 新規作成 | デバイス制御単体テスト | Code hóa hiện có được gom thành bộ UT theo chỉ đạo |
| 1.1.0 | - | VTI-SAM | 2026/06/23 | 現行 source の testcase ID と照合 | デバイス制御単体テスト | `UT-DEVICE` 系を実行対象外とし、HOST / STATE / SENTRY の各単体テスト文書への統合済み文書として整理 |
