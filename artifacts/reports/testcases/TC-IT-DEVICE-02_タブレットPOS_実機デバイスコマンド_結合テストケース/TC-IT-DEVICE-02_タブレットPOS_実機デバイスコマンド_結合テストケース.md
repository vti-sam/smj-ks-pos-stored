# TC-IT-DEVICE-02 テストケース — タブレットPOS 実機デバイスコマンド 結合テスト

## @meta
プロジェクト名: タブレットPOS
モジュール: デバイステストワークベンチ
段階: 結合テスト
文書名: タブレットPOS 実機デバイスコマンド 結合テストケース
版数: 1.1.1
作成者: VTI-SAM
作成日: 2026/08/19
改訂者: VTI-SAM
改訂日: 2026/08/19
文書区分: テストケース
作成日時: 2026/08/19 15:20
環境: ローカル

## 実施方針

- 各テストケースで確認する対象は1コマンドとし、異常系や境界値は追加しない。
- 前提コマンドは対象コマンドの実行前に実施する。前提コマンドが失敗した場合は、対象コマンドを実行せず、当該テストを `Pending` とする。
- Host経由のコマンドは、画面の操作ログに加え、Hostログの `ResultCode=0` と相関IDを確認する。
- 釣銭機の入金テストでは現金を投入せず、入金額0円で確認する。払出・回収・強制復旧は周囲の安全を確認してから実行する。
- カスタマーディスプレイの機能依存コマンドは、必要な機能を持つ実機またはOPOSテストプロファイルで実施する。必要な機能を満たす環境がない場合は `Pending` とし、コマンド成功の代わりに画面表示だけで合格としない。

## テストケース {sheet=釣銭機コマンド}
| ID | 画面/機能カテゴリ | 大項目 | 中項目 | 前提条件 | 実行手順 | 期待される結果 | 種別 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| IT-DEVICE-001 | 釣銭機 | 接続管理 | 接続 (Start) | Hostが起動済みで、RT300が接続され、他のプロセスがデバイスを占有していない。 | 1. 「接続 (Start)」を実行する。<br>2. 操作ログとHostログを確認する。 | Open、Claim、DeviceEnabledが成功し、状態が「準備完了」になる。`Start`の実行結果が成功で、Hostログの`ResultCode=0`を確認できる。 | N |
| IT-DEVICE-002 | 釣銭機 | 接続管理 | 切断 (End) | `Start`が成功し、入金処理中ではない。 | 1. 「切断 (End)」を実行する。<br>2. 操作ログとHostログを確認する。 | ReleaseとCloseが成功し、状態が「未接続」になる。`End`の実行結果が成功として記録される。 | N |
| IT-DEVICE-003 | 釣銭機 | 入金情報 | 入金額取得 (GetDepositAmount) | `Start`→`BeginDeposit`が成功し、現金を投入していない。 | 1. 「入金額取得 (GetDepositAmount)」を実行する。<br>2. 返却値と操作ログを確認する。 | 入金額`0`が返却され、`GetDepositAmount`が成功として記録される。 | N |
| IT-DEVICE-004 | 釣銭機 | 入金情報 | 入金データ取得 (DepositData) | `Start`→`BeginDeposit`が成功し、現金を投入していない。 | 1. 「入金データ取得 (DepositData)」を実行する。<br>2. 返却された金種別データとログを確認する。 | 全金種の入金枚数が0の形式化データが返却され、`DepositDataRead`が成功として記録される。 | N |
| IT-DEVICE-005 | 釣銭機 | 在高情報 | 金種別枚数取得 (GetCashCounts) | `Start`が成功している。 | 1. 「金種別枚数取得 (GetCashCounts)」を実行する。<br>2. 金種別枚数、差異フラグ、ログを確認する。 | 金種別枚数と差異フラグが返却され、`ReadCashCounts`が成功として記録される。 | N |
| IT-DEVICE-006 | 釣銭機 | 状態確認 | 状態照会 (Enq) | `Start`が成功している。 | 1. 「状態照会 (Enq)」を実行する。<br>2. 応答とログを確認する。 | `ENQ`が正常終了し、現在の実機状態に対応する応答が記録される。 | N |
| IT-DEVICE-007 | 釣銭機 | 状態確認 | 硬貨状態取得 (GetCoinStatusData) | `Start`が成功している。 | 1. 「硬貨状態取得 (GetCoinStatusData)」を実行する。<br>2. 返却値とログを確認する。 | 硬貨部の状態データが返却され、`GetCoinStatus`が成功として記録される。 | N |
| IT-DEVICE-008 | 釣銭機 | 状態確認 | 紙幣状態取得 (GetBillStatus) | `Start`が成功している。 | 1. 「紙幣状態取得 (GetBillStatus)」を実行する。<br>2. 返却値とログを確認する。 | 紙幣部の状態データが返却され、`ReadBillStatus`が成功として記録される。 | N |
| IT-DEVICE-009 | 釣銭機 | 状態確認 | 全体状態取得 (GetFullStatus) | `Start`が成功している。 | 1. 「全体状態取得 (GetFullStatus)」を実行する。<br>2. 返却値とログを確認する。 | 全体状態値が返却され、`GetFullStatus`が成功として記録される。 | N |
| IT-DEVICE-010 | 釣銭機 | 入金情報 | 小計 (SubTotal) | `Start`→`BeginDeposit`が成功し、現金を投入していない。 | 1. 「小計 (SubTotal)」を実行する。<br>2. 操作ログとHostログを確認する。 | 入金額0円の取得が成功し、`SubTotal`が成功として記録される。 | N |
| IT-DEVICE-011 | 釣銭機 | エラー対応 | エラー案内 (GuidanceError) | `Start`が成功している。ベンダーDirectIOのハング回避機能が有効である。 | 1. 「エラー案内 (GuidanceError)」を実行する。<br>2. 応答時間とログを確認する。 | 処理がハングせずすぐに終了し、`ResultCode=-2`と安全のため無効化されている旨が操作ログに記録される。 | N |
| IT-DEVICE-012 | 釣銭機 | 非同期処理 | 非同期状態取得 (GetAsyncStatus) | `Start`→`AsyncStart`が成功している。 | 1. 「非同期状態取得 (GetAsyncStatus)」を実行する。<br>2. RC、RCEx、メッセージを確認する。 | 非同期実行状態が返却され、`AsyncStatus`が成功として記録される。 | N |
| IT-DEVICE-013 | 釣銭機 | 非同期処理 | 非同期イベント取得 (GetAsyncEvents) | `Start`→`AsyncStart`が成功している。 | 1. 「非同期イベント取得 (GetAsyncEvents)」を実行する。<br>2. DirectIOイベント数と状態更新イベント数を確認する。 | イベント数が返却され、`AsyncEvents`が成功として記録される。 | N |
| IT-DEVICE-014 | 釣銭機 | 入金処理 | 入金開始 (BeginDeposit) | `Start`が成功し、入金処理中ではない。 | 1. 「入金開始 (BeginDeposit)」を実行する。<br>2. 実機状態とログを確認する。 | 入金受付状態になり、`BeginDeposit`の`ResultCode=0`と状態遷移「準備完了→入金中」が記録される。 | N |
| IT-DEVICE-015 | 釣銭機 | 入金処理 | 入金一時停止 (PauseDeposit) | `Start`→`BeginDeposit`が成功し、現金を投入していない。 | 1. 「入金一時停止 (PauseDeposit)」を実行する。<br>2. 実機状態とログを確認する。 | 入金受付が一時停止し、`PauseDeposit`の`ResultCode=0`と状態遷移「入金中→一時停止」が記録される。 | N |
| IT-DEVICE-016 | 釣銭機 | 入金処理 | 入金確定 (FixDeposit) | `Start`→`BeginDeposit`が成功し、現金を投入していない（入金額0円）。 | 1. 「入金確定 (FixDeposit)」を実行する。<br>2. 入金額、金種別枚数、操作ログ、Hostログを確認する。 | `FixDeposit`が正常終了し、`ResultCode=0`、入金額0円、全金種0枚が返却される。状態が「入金確定済み」になり、操作ログの実行結果が成功となる。 | N |
| IT-DEVICE-017 | 釣銭機 | 入金処理 | 入金終了 (EndDeposit) | `Start`→`BeginDeposit`→`FixDeposit`が成功し、入金額が0円である。 | 1. 「入金終了 (EndDeposit)」を実行する。<br>2. 実機状態とログを確認する。 | `EndDeposit`の`ResultCode=0`が返却され、入金処理が終了して状態が「準備完了」に戻る。 | N |
| IT-DEVICE-018 | 釣銭機 | 入金処理 | 入金復旧 (RecoveryDeposit) | `Start`→`BeginDeposit`が成功し、現金を投入していない。 | 1. 「入金復旧 (RecoveryDeposit)」を実行する。<br>2. FixDeposit、EndDeposit、EndDepositFlagOnの実行結果をログで確認する。 | 復旧シーケンスの各処理が成功し、投入金がない状態で「準備完了」に戻る。`RecoveryDeposit`が成功として記録される。 | N |
| IT-DEVICE-019 | 釣銭機 | 払出処理 | 釣銭払出 (DispenseChange) | `Start`が成功し、払出口番号に`0`、払出金額に`10`円が設定され、10円硬貨を1枚以上払い出せる在高がある。 | 1. 周囲の安全を確認する。<br>2. 「釣銭払出 (DispenseChange)」を実行する。<br>3. 払出金額とログを確認する。 | 10円硬貨が1枚払い出され、`DispenseChange`の`ResultCode=0`と成功ログが記録される。 | N |
| IT-DEVICE-020 | 釣銭機 | 精査 | 精査 (Seisa) | `Start`が成功している。 | 1. 「精査 (Seisa)」を実行する。<br>2. 精査データとログを確認する。 | 精査データが返却され、`Seisa`が成功として記録される。 | N |
| IT-DEVICE-021 | 釣銭機 | ドロア操作 | ドロア開放 (OpenDrawer) | `Start`が成功し、ドロアの周囲に障害物がない。 | 1. 「ドロア開放 (OpenDrawer)」を実行する。<br>2. 実機動作とログを確認する。 | 釣銭機のドロアが開き、`OpenDrawer`が成功として記録される。 | N |
| IT-DEVICE-022 | 釣銭機 | 入金設定 | 入金モード設定 (SetDepositMode) | `Start`が成功し、入金モードに`0`が設定されている。 | 1. 「入金モード設定 (SetDepositMode)」を実行する。<br>2. 返却された状態とログを確認する。 | 入金モード0の設定が正常終了し、`SetDepositMode`が成功として記録される。 | N |
| IT-DEVICE-023 | 釣銭機 | 入金処理 | 投入金取消 (ClearInput) | `Start`→`BeginDeposit`が成功し、現金を投入していない。 | 1. 「投入金取消 (ClearInput)」を実行する。<br>2. 実機状態とログを確認する。 | 入力バッファが消去され、`ClearInput`が成功として記録される。返却対象の現金はない。 | N |
| IT-DEVICE-024 | 釣銭機 | 回収処理 | 現金回収 (Collect) | `Start`が成功し、実機の取扱説明で安全と確認したテスト用回収指示文字列が設定されている。 | 1. 周囲の安全を確認する。<br>2. 「現金回収 (Collect)」を実行する。<br>3. 実機動作とログを確認する。 | 指定したテスト用回収処理が正常終了し、`Collect`が成功として記録される。 | N |
| IT-DEVICE-025 | 釣銭機 | 払出処理 | 金種別払出 (DispenseCash) | `Start`が成功し、払出口番号に`0`、金種別枚数データに全金種0枚が設定されている。 | 1. 「金種別払出 (DispenseCash)」を実行する。<br>2. 実機から現金が払い出されないこととログを確認する。 | 全金種0枚の払出要求が正常終了し、`DispenseCash`が成功として記録される。現金は払い出されない。 | N |
| IT-DEVICE-026 | 釣銭機 | 会計連携 | 釣銭計算・払出 (CashDispenseChange) | `Start`→`BeginDeposit`が成功し、現金を投入していない。会計金額に`0`円が設定されている。 | 1. 「釣銭計算・払出 (CashDispenseChange)」を実行する。<br>2. 計算結果とログを確認する。 | 入金額0円、会計金額0円、釣銭額0円が表示され、払出を行わずに`CashDispenseChange`が成功として記録される。 | N |
| IT-DEVICE-027 | 釣銭機 | 非同期処理 | 非同期処理開始 (AsyncStart) | `Start`が成功し、非同期処理中ではない。 | 1. 「非同期処理開始 (AsyncStart)」を実行する。<br>2. 操作ログとHostログを確認する。 | 非同期処理が開始され、`AsyncStart`が成功として記録される。 | N |
| IT-DEVICE-028 | 釣銭機 | 非同期処理 | 非同期処理終了 (AsyncEnd) | `Start`→`AsyncStart`が成功している。 | 1. 「非同期処理終了 (AsyncEnd)」を実行する。<br>2. 操作ログとHostログを確認する。 | 非同期処理が終了し、`AsyncEnd`が成功として記録される。 | N |
| IT-DEVICE-029 | 釣銭機 | 直接制御 | 直接制御 (DirectIO) | `Start`が成功し、RT300の取扱説明で安全と確認したコマンド番号、数値データ、文字列データが設定されている。 | 1. 入力値を再確認する。<br>2. 「直接制御 (DirectIO)」を実行する。<br>3. 返却データとログを確認する。 | 指定した安全なDirectIOコマンドが正常終了し、数値データと文字列データが記録される。 | N |
| IT-DEVICE-030 | 釣銭機 | 保守操作 | 強制復旧 (ForceRecovery) | RT300が接続され、投入中の現金がない。通常の入金処理を終了し、強制復旧を安全に実行できる。 | 1. 「強制復旧 (ForceRecovery)」を選択する。<br>2. 2回の確認画面で実行を承認する。<br>3. 各復旧ステップと全体状態をログで確認する。 | 強制復旧の各処理がすべて成功し、再接続後の全体状態が正常となる。`ForceRecovery`が成功として記録される。 | N |
| IT-DEVICE-069 | 釣銭機 | 入金処理 | 入金終了宣言 (EndDepositFlagOn) | `Start`→`BeginDeposit`→`FixDeposit`→`EndDeposit`が成功している。 | 1. 「入金終了宣言 (EndDepositFlagOn)」を実行する。<br>2. 操作ログとHostログを確認する。 | `CashChangerEndDeposit_FlagOn`の`ResultCode=0`が返却され、`EndDepositFlagOn`が成功として記録される。 | N |
| IT-DEVICE-070 | 釣銭機 | 保守操作 | 入金ハンドル解放 (ClearHandle) | `Start`が成功し、入金処理中ではない。 | 1. 「入金ハンドル解放 (ClearHandle)」を実行する。<br>2. 操作ログとHostログを確認する。 | 入金ハンドルとセッション管理情報が解放され、`ClearHandle`の`ResultCode=0`が記録される。 | N |
| IT-DEVICE-071 | 釣銭機 | イベント管理 | イベント数取得 (DataEventCount) | `Start`が成功している。 | 1. 「イベント数取得 (DataEventCount)」を実行する。<br>2. 返却値とログを確認する。 | 0以上のDataEvent発生回数が返却され、`DataEventCount`が成功として記録される。 | N |
| IT-DEVICE-072 | 釣銭機 | 非同期処理 | 処理結果取得 (Answer) | `Start`が成功し、処理中のコマンドがない。 | 1. 「処理結果取得 (Answer)」を実行する。<br>2. 返却コマンドとログを確認する。 | `CashChangerAnswer`が正常終了し、現在の処理結果または処理依頼なしの状態が返却される。 | N |
| IT-DEVICE-073 | 釣銭機 | 在高管理 | 在高枚数補正 (AdjustCashCounts) | `Start`が成功し、実機仕様に適合するテスト用金種別枚数データが入力されている。 | 1. 入力した枚数と実機在高を確認する。<br>2. 「在高枚数補正 (AdjustCashCounts)」を実行し、確認画面で承認する。<br>3. `GetCashCounts`を実行する。 | `AdjustCashCounts`の`ResultCode=0`が返却され、補正後の枚数が入力値と一致する。 | N |
| IT-DEVICE-074 | 釣銭機 | 稼働確認 | 稼働状態確認 (CheckHealth) | `Start`が成功し、稼働確認レベルに`1`が設定されている。 | 1. 「稼働状態確認 (CheckHealth)」を実行する。<br>2. `CheckHealthText`とログを確認する。 | `CheckHealth`の`ResultCode=0`が返却され、稼働状態の説明が表示される。 | N |
| IT-DEVICE-075 | 釣銭機 | 統計情報 | 統計情報取得 (RetrieveStatistics) | `Start`が成功し、`CapStatisticsReporting=true`である。 | 1. 「統計情報取得 (RetrieveStatistics)」を実行する。<br>2. 統計情報バッファーとログを確認する。 | `RetrieveStatistics`が成功し、実機の統計情報がバッファーに表示される。 | N |
| IT-DEVICE-076 | 釣銭機 | 統計情報 | 統計情報リセット (ResetStatistics) | `Start`が成功し、`CapUpdateStatistics=true`である。リセット対象を示す有効なバッファーが入力されている。 | 1. 「統計情報リセット (ResetStatistics)」を実行し、確認画面で承認する。<br>2. 対象の統計情報を再取得する。 | `ResetStatistics`の`ResultCode=0`が返却され、対象の統計値がリセットされる。 | N |
| IT-DEVICE-077 | 釣銭機 | 統計情報 | 統計情報更新 (UpdateStatistics) | `Start`が成功し、`CapUpdateStatistics=true`である。テスト用の統計情報バッファーが入力されている。 | 1. 「統計情報更新 (UpdateStatistics)」を実行し、確認画面で承認する。<br>2. 対象の統計情報を再取得する。 | `UpdateStatistics`の`ResultCode=0`が返却され、再取得した統計値が入力値と一致する。 | N |
| IT-DEVICE-078 | 釣銭機 | OPOS情報 | OPOSプロパティ取得 (GetProperties) | `Start`が成功している。 | 1. 「OPOSプロパティ取得 (GetProperties)」を実行する。<br>2. 取得件数と取得失敗件数を確認する。 | Cash ChangerのOPOSプロパティ55項目が表示され、取得失敗が0件である。 | N |
| IT-DEVICE-079 | 釣銭機 | ファームウェア | バージョン比較 (CompareFirmwareVersion) | `Start`が成功し、`CapCompareFirmwareVersion=true`である。対象機種用のテスト済みファームウェアファイルが用意されている。 | 1. ファームウェアファイルパスを入力する。<br>2. 「バージョン比較 (CompareFirmwareVersion)」を実行する。 | `CompareFirmwareVersion`の`ResultCode=0`が返却され、比較結果値が表示される。 | N |
| IT-DEVICE-080 | 釣銭機 | ファームウェア | ファームウェア更新 (UpdateFirmware) | `Start`が成功し、`CapUpdateFirmware=true`である。対象機種と完全に一致する検証済みファームウェアが用意され、更新中の電源が確保されている。 | 1. 対象機種とファイルを再確認する。<br>2. 「ファームウェア更新 (UpdateFirmware)」を実行し、2回の確認画面で承認する。<br>3. 完了まで電源を切らずに待機する。 | `UpdateFirmware`の`ResultCode=0`が返却され、再接続後の稼働状態が正常である。 | N |

## テストケース {sheet=カスタマーディスプレイ}
| ID | 画面/機能カテゴリ | 大項目 | 中項目 | 前提条件 | 実行手順 | 期待される結果 | 種別 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| IT-DEVICE-031 | カスタマーディスプレイ | 接続管理 | 接続 (Start) | Hostが起動済みで、表示器が接続され、他のプロセスが占有していない。 | 1. 「接続 (Start)」を実行する。<br>2. 操作ログと機能対応状況を確認する。 | Open、Claim、DeviceEnabledが成功し、状態が「準備完了」になる。CapDescriptors、マーキー対応、DeviceWindows、行数、桁数が画面に反映される。 | N |
| IT-DEVICE-032 | カスタマーディスプレイ | 接続管理 | 切断 (End) | `Start`が成功し、追加ウィンドウが残っていない。 | 1. 「切断 (End)」を実行する。<br>2. 状態とログを確認する。 | ReleaseとCloseが成功し、状態が「未接続」になる。`End`が成功として記録される。 | N |
| IT-DEVICE-033 | カスタマーディスプレイ | 文字列表示 | 文字列表示 (DisplayText) | `Start`が成功し、表示文字列に`TABETPOS TEST`が設定されている。 | 1. 「文字列表示 (DisplayText)」を実行する。<br>2. 実機の表示とログを確認する。 | `TABETPOS TEST`が表示され、`DisplayText`が成功として記録される。 | N |
| IT-DEVICE-034 | カスタマーディスプレイ | 文字列表示 | 位置指定表示 (DisplayTextAt) | `Start`が成功し、表示文字列に`TABETPOS TEST`、行番号と桁番号に表示範囲内の値が設定されている。 | 1. 「位置指定表示 (DisplayTextAt)」を実行する。<br>2. 表示位置とログを確認する。 | 指定した行・桁に文字列が表示され、`DisplayTextAt`が成功として記録される。 | N |
| IT-DEVICE-035 | カスタマーディスプレイ | 文字列表示 | 表示消去 (ClearText) | `Start`→`DisplayText`が成功し、文字列が表示されている。 | 1. 「表示消去 (ClearText)」を実行する。<br>2. 実機の表示とログを確認する。 | 表示文字列が消去され、`ClearText`が成功として記録される。 | N |
| IT-DEVICE-036 | カスタマーディスプレイ | ディスクリプター | ディスクリプター消去 (ClearDescriptors) | CapDescriptors=trueの実機またはOPOSテストプロファイルを使用する。`Start`→`SetDescriptor`が成功し、少なくとも1つのディスクリプターが設定済みである。 | 1. 「ディスクリプター消去 (ClearDescriptors)」を実行する。<br>2. 実機表示、操作ログ、Hostログを確認する。 | 設定済みのディスクリプターがすべて消去され、`ClearDescriptors`の`ResultCode=0`と成功ログが記録される。 | N |
| IT-DEVICE-037 | カスタマーディスプレイ | 文字列表示 | 文字列スクロール (ScrollText) | CapHMarquee=trueまたはCapVMarquee=trueの実機またはOPOSテストプロファイルを使用する。`Start`→`DisplayText`が成功し、スクロール量に`1`が設定されている。 | 1. 「文字列スクロール (ScrollText)」を実行する。<br>2. 実機動作とログを確認する。 | 表示文字列が1単位スクロールし、`ScrollText`の`ResultCode=0`と成功ログが記録される。 | N |
| IT-DEVICE-038 | カスタマーディスプレイ | ディスクリプター | ディスクリプター設定 (SetDescriptor) | CapDescriptors=trueの実機またはOPOSテストプロファイルを使用する。`Start`が成功し、ベンダー仕様で定義された有効なディスクリプター番号と属性値が設定されている。 | 1. 「ディスクリプター設定 (SetDescriptor)」を実行する。<br>2. 実機表示、操作ログ、Hostログを確認する。 | 指定したディスクリプターが設定され、`SetDescriptor`の`ResultCode=0`と成功ログが記録される。 | N |
| IT-DEVICE-039 | カスタマーディスプレイ | ウィンドウ制御 | ウィンドウ作成 (CreateWindow) | DeviceWindows&gt;1の実機またはOPOSテストプロファイルを使用する。`Start`が成功し、開始行`0`、開始桁`0`、表示領域`2×20`、ウィンドウ`2×20`が設定されている。 | 1. 「ウィンドウ作成 (CreateWindow)」を実行する。<br>2. 実機表示、操作ログ、Hostログを確認する。 | 指定領域の追加ウィンドウが作成され、`CreateWindow`の`ResultCode=0`と成功ログが記録される。 | N |
| IT-DEVICE-040 | カスタマーディスプレイ | ウィンドウ制御 | ウィンドウ破棄 (DestroyWindow) | `Start`→`CreateWindow`が成功し、追加ウィンドウが存在する。 | 1. 「ウィンドウ破棄 (DestroyWindow)」を実行する。<br>2. 実機状態とログを確認する。 | 作成済みの追加ウィンドウが破棄され、`DestroyWindow`が成功として記録される。 | N |
| IT-DEVICE-041 | カスタマーディスプレイ | ウィンドウ制御 | ウィンドウ再表示 (RefreshWindow) | `Start`→`CreateWindow`が成功し、追加ウィンドウが存在する。 | 1. 「ウィンドウ再表示 (RefreshWindow)」を実行する。<br>2. 実機表示とログを確認する。 | 作成済みのウィンドウが再表示され、`RefreshWindow`が成功として記録される。 | N |
| IT-DEVICE-042 | カスタマーディスプレイ | 直接制御 | 直接制御 (DirectIO) | `Start`が成功し、コマンド番号`0`、数値データ`0`、文字列`TABETPOS TEST`が設定されている。 | 1. 「直接制御 (DirectIO)」を実行する。<br>2. 返却データ、実機表示、ログを確認する。 | DirectIOコマンドが正常終了し、`DirectIO`が成功として記録される。 | N |
| IT-DEVICE-043 | カスタマーディスプレイ | 表示制御 | 表示制御 (LinDsp) | `Start`が成功し、コマンド番号`0`、文字列`TABETPOS TEST`が設定されている。 | 1. 「表示制御 (LinDsp)」を実行する。<br>2. 実機表示とログを確認する。 | 指定文字列が表示され、`LinDsp`が成功として記録される。 | N |
| IT-DEVICE-044 | カスタマーディスプレイ | 表示制御 | テロップ表示 (LinDspTelop) | `Start`が成功し、コマンド番号`0`、文字列`TABETPOS TEST`、テロップ速度`1`が設定されている。 | 1. 「テロップ表示 (LinDspTelop)」を実行する。<br>2. 実機動作とログを確認する。 | 指定文字列が速度1でテロップ表示され、`LinDspTelop`が成功として記録される。 | N |
| IT-DEVICE-082 | カスタマーディスプレイ | 統計情報 | 統計情報取得 (RetrieveStatistics) | `Start`が成功し、`CapStatisticsReporting=true`である。 | 1. 「統計情報取得 (RetrieveStatistics)」を実行する。<br>2. 統計情報バッファーを確認する。 | `RetrieveStatistics`が成功し、実機の統計情報がバッファーに表示される。 | N |
| IT-DEVICE-083 | カスタマーディスプレイ | 統計情報 | 統計情報リセット (ResetStatistics) | `Start`が成功し、`CapUpdateStatistics=true`である。リセット対象の有効なバッファーが入力されている。 | 1. 「統計情報リセット (ResetStatistics)」を実行し、確認画面で承認する。<br>2. 対象の統計情報を再取得する。 | `ResetStatistics`の`ResultCode=0`が返却され、対象の統計値がリセットされる。 | N |
| IT-DEVICE-084 | カスタマーディスプレイ | 統計情報 | 統計情報更新 (UpdateStatistics) | `Start`が成功し、`CapUpdateStatistics=true`である。テスト用の統計情報バッファーが入力されている。 | 1. 「統計情報更新 (UpdateStatistics)」を実行し、確認画面で承認する。<br>2. 対象の統計情報を再取得する。 | `UpdateStatistics`の`ResultCode=0`が返却され、再取得した統計値が入力値と一致する。 | N |
| IT-DEVICE-085 | カスタマーディスプレイ | OPOS情報 | OPOSプロパティ取得 (GetProperties) | `Start`が成功している。 | 1. 「OPOSプロパティ取得 (GetProperties)」を実行する。<br>2. 取得件数と取得失敗件数を確認する。 | Line DisplayのOPOSプロパティ46項目が表示され、取得失敗が0件である。 | N |

## テストケース {sheet=プリンターコマンド}
| ID | 画面/機能カテゴリ | 大項目 | 中項目 | 前提条件 | 実行手順 | 期待される結果 | 種別 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| IT-DEVICE-045 | プリンター | 接続管理 | 接続 (Start) | Hostが起動済みで、プリンターの電源が入り、用紙がセットされている。 | 1. 「接続 (Start)」を実行する。<br>2. 状態とログを確認する。 | Open、Claim、DeviceEnabledが成功し、状態が「準備完了」になる。`Start`の`ResultCode=0`が記録される。 | N |
| IT-DEVICE-046 | プリンター | 接続管理 | 切断 (End) | `Start`が成功し、印字処理中ではない。 | 1. 「切断 (End)」を実行する。<br>2. 状態とログを確認する。 | ReleaseとCloseが成功し、状態が「未接続」になる。`End`が成功として記録される。 | N |
| IT-DEVICE-047 | プリンター | 印字 | 文字列・書式印字 (PrintNormal) | `Start`が成功し、印字文字列に`TABETPOS DEVICE TEST`が設定されている。 | 1. 「文字列・書式印字 (PrintNormal)」を実行する。<br>2. 印字結果とログを確認する。 | 文字列が欠けずに印字され、`PrintText`が成功として記録される。 | N |
| IT-DEVICE-048 | プリンター | バーコード印字 | JAN13印字 (PrintBarCode) | `Start`が成功している。 | 1. 「JAN13印字 (PrintBarCode)」を実行する。<br>2. 印字されたコードをスキャンする。<br>3. ログを確認する。 | `4901234567894`のJAN13が欠けずに印字され、スキャン値が一致する。`PrintJAN13`が成功として記録される。 | N |
| IT-DEVICE-049 | プリンター | バーコード印字 | JAN8印字 (PrintBarCode) | `Start`が成功している。 | 1. 「JAN8印字 (PrintBarCode)」を実行する。<br>2. 印字されたコードをスキャンする。<br>3. ログを確認する。 | `49012347`のJAN8が欠けずに印字され、スキャン値が一致する。`PrintJAN8`が成功として記録される。 | N |
| IT-DEVICE-050 | プリンター | コード印字 | QRコード印字 (PrintQR) | `Start`が成功している。 | 1. 「QRコード印字 (PrintBarCode)」を実行する。<br>2. 印字されたQRコードを読み取る。<br>3. ログを確認する。 | `TABETPOS-DEVICE-TEST`のQRコードが完全に印字され、読取値が一致する。`PrintQR`が成功として記録される。 | N |
| IT-DEVICE-051 | プリンター | 用紙操作 | 用紙カット (CutPaper) | `Start`が成功し、確認用の文字列を印字済みである。 | 1. 「用紙カット (CutPaper)」を実行する。<br>2. 用紙の切断状態とログを確認する。 | 用紙が100%カットされ、`CutPaper`が成功として記録される。 | N |
| IT-DEVICE-052 | プリンター | 画像印字 | 画像印字 (PrintBitmap) | `Start`が成功し、プリンターが読み込み可能なテスト用ビットマップファイルの絶対パスが設定されている。 | 1. 「画像印字 (PrintBitmap)」を実行する。<br>2. 印字された画像とログを確認する。 | 指定した画像が欠けずに印字され、`PrintBitmap`が成功として記録される。 | N |
| IT-DEVICE-053 | プリンター | レシート印字 | レシート一括印字 (PrintFullReceipt) | `Start`が成功し、用紙が十分にセットされている。 | 1. 「レシート一括印字 (PrintFullReceipt)」を実行する。<br>2. 文字列、JAN13、JAN8、QRコード、送り、カットを確認する。<br>3. ログを確認する。 | レシートの全要素が欠けずに印字され、QRコードを含む最終行がカッターの手前に残らない。用紙が完全に排出・カットされ、`PrintFullReceipt`が成功として記録される。 | N |

## テストケース {sheet=キャッシュドロア}
| ID | 画面/機能カテゴリ | 大項目 | 中項目 | 前提条件 | 実行手順 | 期待される結果 | 種別 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| IT-DEVICE-054 | キャッシュドロア | 接続管理 | 接続 (Start) | Hostが起動済みで、キャッシュドロアが接続されている。 | 1. 「接続 (Start)」を実行する。<br>2. 状態とログを確認する。 | Open、Claim、DeviceEnabledが成功し、状態が「準備完了」になる。`Start`が成功として記録される。 | N |
| IT-DEVICE-055 | キャッシュドロア | 接続管理 | 切断 (End) | `Start`が成功している。 | 1. 「切断 (End)」を実行する。<br>2. 状態とログを確認する。 | ReleaseとCloseが成功し、状態が「未接続」になる。`End`が成功として記録される。 | N |
| IT-DEVICE-056 | キャッシュドロア | 状態確認 | 状態確認 (CheckDrawerStatus) | `Start`が成功している。 | 1. ドロアを閉じた状態で「状態確認 (CheckDrawerStatus)」を実行する。<br>2. 画面表示とログを確認する。 | 画面に「現在の状態：閉鎖」が表示され、`CheckStatus`が成功として記録される。 | N |
| IT-DEVICE-057 | キャッシュドロア | ドロア操作 | ドロア開放 (OpenDrawer) | `Start`が成功し、ドロアの周囲に障害物がない。 | 1. 「ドロア開放 (OpenDrawer)」を実行する。<br>2. 実機動作とログを確認する。 | ドロアが開き、`OpenDrawer`が成功として記録される。 | N |
| IT-DEVICE-087 | キャッシュドロア | 統計情報 | 統計情報取得 (RetrieveStatistics) | `Start`が成功し、`CapStatisticsReporting=true`である。 | 1. 「統計情報取得 (RetrieveStatistics)」を実行する。<br>2. 統計情報バッファーを確認する。 | `RetrieveStatistics`が成功し、実機の統計情報がバッファーに表示される。 | N |
| IT-DEVICE-088 | キャッシュドロア | 統計情報 | 統計情報リセット (ResetStatistics) | `Start`が成功し、`CapUpdateStatistics=true`である。リセット対象の有効なバッファーが入力されている。 | 1. 「統計情報リセット (ResetStatistics)」を実行し、確認画面で承認する。<br>2. 対象の統計情報を再取得する。 | `ResetStatistics`の`ResultCode=0`が返却され、対象の統計値がリセットされる。 | N |
| IT-DEVICE-089 | キャッシュドロア | 統計情報 | 統計情報更新 (UpdateStatistics) | `Start`が成功し、`CapUpdateStatistics=true`である。テスト用の統計情報バッファーが入力されている。 | 1. 「統計情報更新 (UpdateStatistics)」を実行し、確認画面で承認する。<br>2. 対象の統計情報を再取得する。 | `UpdateStatistics`の`ResultCode=0`が返却され、再取得した統計値が入力値と一致する。 | N |
| IT-DEVICE-090 | キャッシュドロア | OPOS情報 | OPOSプロパティ取得 (GetProperties) | `Start`が成功している。 | 1. 「OPOSプロパティ取得 (GetProperties)」を実行する。<br>2. 取得件数と取得失敗件数を確認する。 | Cash DrawerのOPOSプロパティ24項目が表示され、取得失敗が0件である。 | N |
| IT-DEVICE-091 | キャッシュドロア | 直接制御 | 直接制御 (DirectIO) | `Start`が成功し、ベンダー仕様で安全と確認したコマンド番号、数値データ、文字列データが入力されている。 | 1. 入力値を再確認する。<br>2. 「直接制御 (DirectIO)」を実行する。<br>3. 返却データとログを確認する。 | `DirectIO`の`ResultCode=0`が返却され、返却された数値データと文字列データが表示される。 | N |
| IT-DEVICE-092 | キャッシュドロア | ドロア操作 | ドロア閉鎖待機 (WaitForDrawerClose) | `Start`→`OpenDrawer`が成功し、実機仕様の範囲内で鳴動タイムアウト、周波数、鳴動時間、鳴動間隔が設定されている。 | 1. 「ドロア閉鎖待機 (WaitForDrawerClose)」を実行する。<br>2. ドロアを閉じる。<br>3. 実機動作とログを確認する。 | 設定に従って閉鎖待機が行われ、ドロアを閉じると`WaitForDrawerClose`の`ResultCode=0`が返却される。 | N |

## テストケース {sheet=決済端末コマンド}
| ID | 画面/機能カテゴリ | 大項目 | 中項目 | 前提条件 | 実行手順 | 期待される結果 | 種別 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| IT-DEVICE-058 | CAFIS Arch決済端末 | 接続管理 | 接続 (Start) | Hostが起動済みで、CAFIS Archテスト環境と決済端末が利用可能である。 | 1. 「接続 (Start)」を実行する。<br>2. 状態とログを確認する。 | CAFIS Archの初期化が成功し、状態が「準備完了」になる。`Start`が成功として記録される。 | N |
| IT-DEVICE-059 | CAFIS Arch決済端末 | 接続管理 | 切断 (End) | `Start`が成功し、決済処理中ではない。 | 1. 「切断 (End)」を実行する。<br>2. 状態とログを確認する。 | CAFIS Archの終了処理が成功し、状態が「未接続」になる。`End`が成功として記録される。 | N |
| IT-DEVICE-060 | CAFIS Arch決済端末 | 稼働確認 | 稼働確認 (HealthCheck) | `Start`が成功している。 | 1. 「稼働確認 (HealthCheck)」を実行する。<br>2. 応答とログを確認する。 | 決済端末から正常応答が返却され、`HealthCheck`が成功として記録される。 | N |
| IT-DEVICE-061 | CAFIS Arch決済端末 | 決済処理 | 決済実行 (GenericPayment) | `Start`が成功し、CAFIS Archテスト環境向けの有効な決済要求JSONが設定されている。 | 1. 決済要求JSONを確認する。<br>2. 「決済実行 (GenericPayment)」を実行する。<br>3. 端末画面、応答、操作ログを確認する。 | テスト決済が正常終了し、`GenericPayment`が成功として記録される。決済要求・応答ペイロードは操作ログに出力されない。 | N |
| IT-DEVICE-062 | CAFIS Arch決済端末 | 伝票印字 | 伝票再印字 (RePrint) | `Start`が成功し、直前に再印字可能なテスト決済が1件正常終了している。 | 1. 「伝票再印字 (RePrint)」を実行する。<br>2. 再印字された伝票とログを確認する。 | 直前のテスト決済の伝票が再印字され、`RePrint`が成功として記録される。 | N |

## テストケース {sheet=バーコードスキャナー}
| ID | 画面/機能カテゴリ | 大項目 | 中項目 | 前提条件 | 実行手順 | 期待される結果 | 種別 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| IT-DEVICE-063 | バーコードスキャナー | 接続管理 | 接続 (Start) | DENSOスキャナーが指定のシリアルポートに接続され、ポートを他のプロセスが使用していない。 | 1. 「接続 (Start)」を実行する。<br>2. 状態とログを確認する。 | シリアルポートの初期化が成功し、状態が「準備完了」になる。`Start`が成功として記録される。 | N |
| IT-DEVICE-064 | バーコードスキャナー | 読取り | 1件読取待機 (Listen) | `Start`が成功し、テスト用バーコード`4901234567894`を読み取れる状態である。 | 1. 「1件読取待機 (Listen)」を実行する。<br>2. テスト用バーコードを1回読み取る。<br>3. 画面表示とログを確認する。 | 最終読取バーコードに`4901234567894`が表示され、`Listen`→`DataReceived`が成功として記録される。 | N |
| IT-DEVICE-065 | バーコードスキャナー | 接続管理 | 切断 (End) | `Start`が成功し、読取待機中ではない。 | 1. 「切断 (End)」を実行する。<br>2. 状態とログを確認する。 | シリアルポートが解放され、状態が「未接続」になる。`End`が成功として記録される。 | N |

## テストケース {sheet=専用キーボード}
| ID | 画面/機能カテゴリ | 大項目 | 中項目 | 前提条件 | 実行手順 | 期待される結果 | 種別 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| IT-DEVICE-066 | 専用キーボード | 初期化 | 接続 (Start) | Windows端末に専用POSキーボードが接続されている。 | 1. 「接続 (Start)」を実行する。<br>2. 状態とログを確認する。 | Raw Inputの受信準備が完了し、状態が「準備完了」になる。`Start`が成功として記録される。 | N |
| IT-DEVICE-067 | 専用キーボード | キー入力 | キー入力待機 (Listen) | `Start`が成功し、専用POSキーボードの確認用キーを操作できる。 | 1. 「キー入力待機 (Listen)」を実行する。<br>2. 確認用の専用キーを1回押す。<br>3. 最終入力キーとログを確認する。 | 専用キーが受信され、業務キー名またはVirtualKey・ScanCodeが画面に表示される。`Listen`と`KeyReceived`が成功として記録される。 | N |
| IT-DEVICE-068 | 専用キーボード | 終了処理 | 切断 (End) | `Start`が成功している。 | 1. 「切断 (End)」を実行する。<br>2. 状態とログを確認する。 | Raw Inputの受信処理が終了し、状態が「未接続」になる。`End`が成功として記録される。 | N |

## 基本情報
| 項目 | 内容 |
| --- | --- |
| 文書ID | TC-IT-DEVICE-02 |
| 文書名 | タブレットPOS 実機デバイスコマンド 結合テストケース |
| プロジェクト名 | タブレットPOS |
| モジュール名 | デバイステストワークベンチ |
| テスト段階 | 結合テスト |
| 版数 | 1.1.1 |
| 作成者 | VTI-SAM |
| 作成日 | 2026/08/19 |
| 改訂者 | VTI-SAM |
| 改訂日 | 2026/08/19 |
| 文書区分 | テストケース |
| 環境 | ローカル |
| 件数 | 90件 |
| 対象デバイス | 釣銭機、カスタマーディスプレイ、プリンター、キャッシュドロア、CAFIS Arch決済端末、バーコードスキャナー、専用キーボード |
| 実施方式 | 手動結合テスト（実機動作、画面状態、操作ログ、Hostログを確認） |

## 更新履歴
| バージョン | 依頼者 | 更新者 | 更新日時 | 変更理由 | シート名 | 更新内容 |
| --- | --- | --- | --- | --- | --- | --- |
| 1.1.1 | - | VTI-SAM | 2026/08/19 | 非対応コマンドの削除 | カスタマーディスプレイ | 実機のサービスオブジェクトが対応していないCheckHealthテストを削除 |
| 1.1.1 | - | VTI-SAM | 2026/08/19 | 非対応コマンドの削除 | キャッシュドロア | 実機のサービスオブジェクトが対応していないCheckHealthテストを削除 |
| 1.1.0 | - | VTI-SAM | 2026/08/19 | OPOSコマンドとプロパティ確認の追加 | 釣銭機コマンド | 個別実行できなかった4コマンド、稼働確認、統計情報、在高補正、ファームウェア、OPOSプロパティのテストを追加 |
| 1.1.0 | - | VTI-SAM | 2026/08/19 | OPOSコマンドとプロパティ確認の追加 | カスタマーディスプレイ | 稼働確認、統計情報、OPOSプロパティのテストを追加 |
| 1.1.0 | - | VTI-SAM | 2026/08/19 | OPOSコマンドとプロパティ確認の追加 | キャッシュドロア | 稼働確認、統計情報、OPOSプロパティ、直接制御、閉鎖待機のテストを追加 |
| 1.0.0 | - | VTI-SAM | 2026/08/19 | 新規作成 | 釣銭機コマンド | 釣銭機の全ワークベンチコマンドを、1コマンド1ケースで作成 |
| 1.0.0 | - | VTI-SAM | 2026/08/19 | 新規作成 | カスタマーディスプレイ | 表示・ディスクリプター・ウィンドウ・直接制御コマンドを作成 |
| 1.0.0 | - | VTI-SAM | 2026/08/19 | 新規作成 | プリンターコマンド | 文字列、バーコード、QRコード、画像、カット、レシート印字コマンドを作成 |
| 1.0.0 | - | VTI-SAM | 2026/08/19 | 新規作成 | キャッシュドロア | 接続、状態確認、開放、切断コマンドを作成 |
| 1.0.0 | - | VTI-SAM | 2026/08/19 | 新規作成 | 決済端末コマンド | 接続、稼働確認、決済、再印字、切断コマンドを作成 |
| 1.0.0 | - | VTI-SAM | 2026/08/19 | 新規作成 | バーコードスキャナー | 接続、1件読取待機、切断コマンドを作成 |
| 1.0.0 | - | VTI-SAM | 2026/08/19 | 新規作成 | 専用キーボード | 初期化、キー入力待機、終了コマンドを作成 |
