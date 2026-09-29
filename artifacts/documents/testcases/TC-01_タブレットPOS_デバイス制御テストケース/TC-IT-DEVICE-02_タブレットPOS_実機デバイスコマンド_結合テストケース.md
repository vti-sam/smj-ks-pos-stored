# TC-IT-DEVICE-02 テストケース — タブレットPOS 実機デバイスコマンド 結合テストケース

## @meta
プロジェクト名: タブレットPOS
モジュール: デバイステストワークベンチ
段階: 結合テスト
文書名: タブレットPOS 実機デバイスコマンド 結合テストケース
版数: 1.1.2
作成者: VTI-SAM
作成日: 2026/08/19
改訂者: VTI-SAM
改訂日: 2026/08/24
文書区分: テストケース
作成日時: 2026/08/19
環境: ローカル

## 概要

本書は、現行のDeviceIntegrationTest画面から実機デバイスコマンドを実行し、アプリケーション表示、同期応答、実機動作、操作ログ、およびHostログの整合性を確認する90件の結合テストケースを定義する。

## テストケース {sheet=釣銭機コマンド}

### IT-DEVICE-001 接続 (Start)
ID: IT-DEVICE-001
画面/機能カテゴリ: 釣銭機
大項目: 接続管理
中項目: 接続 (Start)
前提条件:
Hostが起動済みで、RT300が接続され、他のプロセスがデバイスを占有していない。
実行手順:
1. 「接続 (Start)」を実行する。
2. 操作ログとHostログを確認する。
期待される結果:
Open、Claim、DeviceEnabledが成功し、状態が「準備完了」になる。`Start`の実行結果が成功で、Hostログの`ResultCode=0`を確認できる。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-002 切断 (End)
ID: IT-DEVICE-002
画面/機能カテゴリ: 釣銭機
大項目: 接続管理
中項目: 切断 (End)
前提条件:
`Start`が成功し、入金処理中ではない。
実行手順:
1. 「切断 (End)」を実行する。
2. 操作ログとHostログを確認する。
期待される結果:
ReleaseとCloseが成功し、状態が「未接続」になる。`End`の実行結果が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-003 入金額取得 (GetDepositAmount)
ID: IT-DEVICE-003
画面/機能カテゴリ: 釣銭機
大項目: 入金情報
中項目: 入金額取得 (GetDepositAmount)
前提条件:
`Start`→`BeginDeposit`が成功し、現金を投入していない。
実行手順:
1. 「入金額取得 (GetDepositAmount)」を実行する。
2. 返却値と操作ログを確認する。
期待される結果:
入金額`0`が返却され、`GetDepositAmount`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-004 入金データ取得 (DepositData)
ID: IT-DEVICE-004
画面/機能カテゴリ: 釣銭機
大項目: 入金情報
中項目: 入金データ取得 (DepositData)
前提条件:
`Start`→`BeginDeposit`が成功し、現金を投入していない。
実行手順:
1. 「入金データ取得 (DepositData)」を実行する。
2. 返却された金種別データとログを確認する。
期待される結果:
全金種の入金枚数が0の形式化データが返却され、`DepositDataRead`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-005 金種別枚数取得 (GetCashCounts)
ID: IT-DEVICE-005
画面/機能カテゴリ: 釣銭機
大項目: 在高情報
中項目: 金種別枚数取得 (GetCashCounts)
前提条件:
`Start`が成功している。
実行手順:
1. 「金種別枚数取得 (GetCashCounts)」を実行する。
2. 金種別枚数、差異フラグ、ログを確認する。
期待される結果:
金種別枚数と差異フラグが返却され、`ReadCashCounts`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-006 状態照会 (Enq)
ID: IT-DEVICE-006
画面/機能カテゴリ: 釣銭機
大項目: 状態確認
中項目: 状態照会 (Enq)
前提条件:
`Start`が成功している。
実行手順:
1. 「状態照会 (Enq)」を実行する。
2. 応答とログを確認する。
期待される結果:
`ENQ`が正常終了し、現在の実機状態に対応する応答が記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-007 硬貨状態取得 (GetCoinStatusData)
ID: IT-DEVICE-007
画面/機能カテゴリ: 釣銭機
大項目: 状態確認
中項目: 硬貨状態取得 (GetCoinStatusData)
前提条件:
`Start`が成功している。
実行手順:
1. 「硬貨状態取得 (GetCoinStatusData)」を実行する。
2. 返却値とログを確認する。
期待される結果:
硬貨部の状態データが返却され、`GetCoinStatus`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-008 紙幣状態取得 (GetBillStatus)
ID: IT-DEVICE-008
画面/機能カテゴリ: 釣銭機
大項目: 状態確認
中項目: 紙幣状態取得 (GetBillStatus)
前提条件:
`Start`が成功している。
実行手順:
1. 「紙幣状態取得 (GetBillStatus)」を実行する。
2. 返却値とログを確認する。
期待される結果:
紙幣部の状態データが返却され、`ReadBillStatus`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-009 全体状態取得 (GetFullStatus)
ID: IT-DEVICE-009
画面/機能カテゴリ: 釣銭機
大項目: 状態確認
中項目: 全体状態取得 (GetFullStatus)
前提条件:
`Start`が成功している。
実行手順:
1. 「全体状態取得 (GetFullStatus)」を実行する。
2. 返却値とログを確認する。
期待される結果:
全体状態値が返却され、`GetFullStatus`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-010 小計 (SubTotal)
ID: IT-DEVICE-010
画面/機能カテゴリ: 釣銭機
大項目: 入金情報
中項目: 小計 (SubTotal)
前提条件:
`Start`→`BeginDeposit`が成功し、現金を投入していない。
実行手順:
1. 「小計 (SubTotal)」を実行する。
2. 操作ログとHostログを確認する。
期待される結果:
入金額0円の取得が成功し、`SubTotal`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-011 エラー案内 (GuidanceError)
ID: IT-DEVICE-011
画面/機能カテゴリ: 釣銭機
大項目: エラー対応
中項目: エラー案内 (GuidanceError)
前提条件:
`Start`が成功している。ベンダーDirectIOのハング回避機能が有効である。
実行手順:
1. 「エラー案内 (GuidanceError)」を実行する。
2. 応答時間とログを確認する。
期待される結果:
処理がハングせずすぐに終了し、`ResultCode=-2`と安全のため無効化されている旨が操作ログに記録される。操作ログの実行結果は「失敗」となり、「成功」として記録されない。デバイスの利用可能状態は「準備完了」を維持する。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-012 非同期状態取得 (GetAsyncStatus)
ID: IT-DEVICE-012
画面/機能カテゴリ: 釣銭機
大項目: 非同期処理
中項目: 非同期状態取得 (GetAsyncStatus)
前提条件:
`Start`→`AsyncStart`が成功している。
実行手順:
1. 「非同期状態取得 (GetAsyncStatus)」を実行する。
2. RC、RCEx、メッセージを確認する。
期待される結果:
非同期実行状態が返却され、`AsyncStatus`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-013 非同期イベント取得 (GetAsyncEvents)
ID: IT-DEVICE-013
画面/機能カテゴリ: 釣銭機
大項目: 非同期処理
中項目: 非同期イベント取得 (GetAsyncEvents)
前提条件:
`Start`→`AsyncStart`が成功している。
実行手順:
1. 「非同期イベント取得 (GetAsyncEvents)」を実行する。
2. DirectIOイベント数と状態更新イベント数を確認する。
期待される結果:
イベント数が返却され、`AsyncEvents`が成功として記録される。
種別: N

### IT-DEVICE-014 入金開始 (BeginDeposit)
ID: IT-DEVICE-014
画面/機能カテゴリ: 釣銭機
大項目: 入金処理
中項目: 入金開始 (BeginDeposit)
前提条件:
`Start`が成功し、入金処理中ではない。
実行手順:
1. 「入金開始 (BeginDeposit)」を実行する。
2. 実機状態とログを確認する。
期待される結果:
入金受付状態になり、`BeginDeposit`の`ResultCode=0`と状態遷移「準備完了→入金中」が記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-015 入金一時停止 (PauseDeposit)
ID: IT-DEVICE-015
画面/機能カテゴリ: 釣銭機
大項目: 入金処理
中項目: 入金一時停止 (PauseDeposit)
前提条件:
`Start`→`BeginDeposit`が成功し、現金を投入していない。
実行手順:
1. 「入金一時停止 (PauseDeposit)」を実行する。
2. 実機状態とログを確認する。
期待される結果:
入金受付が一時停止し、`PauseDeposit`の`ResultCode=0`と状態遷移「入金中→一時停止」が記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-016 入金確定 (FixDeposit)
ID: IT-DEVICE-016
画面/機能カテゴリ: 釣銭機
大項目: 入金処理
中項目: 入金確定 (FixDeposit)
前提条件:
`Start`→`BeginDeposit`が成功し、現金を投入していない（入金額0円）。
実行手順:
1. 「入金確定 (FixDeposit)」を実行する。
2. 入金額、金種別枚数、操作ログ、Hostログを確認する。
期待される結果:
`FixDeposit`が正常終了し、`ResultCode=0`、入金額0円、全金種0枚が返却される。状態が「入金確定」になり、操作ログの実行結果が成功となる。
種別: N

### IT-DEVICE-017 入金終了 (EndDeposit)
ID: IT-DEVICE-017
画面/機能カテゴリ: 釣銭機
大項目: 入金処理
中項目: 入金終了 (EndDeposit)
前提条件:
`Start`→`BeginDeposit`→`FixDeposit`が成功し、入金額が0円である。
実行手順:
1. 「入金終了 (EndDeposit)」を実行する。
2. 実機状態とログを確認する。
期待される結果:
`EndDeposit`の`ResultCode=0`が返却され、入金処理が終了して状態が「準備完了」に戻る。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-018 入金復旧 (RecoveryDeposit)
ID: IT-DEVICE-018
画面/機能カテゴリ: 釣銭機
大項目: 入金処理
中項目: 入金復旧 (RecoveryDeposit)
前提条件:
`Start`→`BeginDeposit`が成功し、現金を投入していない。画面の「復旧時EndDeposit引数」に既定値`3`が表示されている。
実行手順:
1. 「入金復旧 (RecoveryDeposit)」を実行する。
2. `FixDepositDetails`、`EndDeposit(3)`、`EndDepositFlagOn`の実行結果をログで確認する。
期待される結果:
復旧シーケンスの各処理が成功し、`EndDeposit`の`Success=3`で入金処理が終了して「準備完了」に戻る。`RecoveryDeposit`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-019 釣銭払出 (DispenseChange)
ID: IT-DEVICE-019
画面/機能カテゴリ: 釣銭機
大項目: 払出処理
中項目: 釣銭払出 (DispenseChange)
前提条件:
`Start`が成功し、払出口番号に`0`、払出金額に`10`円が設定され、10円硬貨を1枚以上払い出せる在高がある。
実行手順:
1. 周囲の安全を確認する。
2. 「釣銭払出 (DispenseChange)」を実行する。
3. 払出金額とログを確認する。
期待される結果:
10円硬貨が1枚払い出され、`DispenseChange`の`ResultCode=0`と成功ログが記録される。
種別: N

### IT-DEVICE-020 精査 (Seisa)
ID: IT-DEVICE-020
画面/機能カテゴリ: 釣銭機
大項目: 精査
中項目: 精査 (Seisa)
前提条件:
`Start`が成功している。
実行手順:
1. 「精査 (Seisa)」を実行する。
2. 精査データとログを確認する。
期待される結果:
精査データが返却され、`Seisa`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-021 ドロア開放 (OpenDrawer)
ID: IT-DEVICE-021
画面/機能カテゴリ: 釣銭機
大項目: ドロア操作
中項目: ドロア開放 (OpenDrawer)
前提条件:
`Start`が成功し、ドロアの周囲に障害物がない。
実行手順:
1. 「ドロア開放 (OpenDrawer)」を実行する。
2. 実機動作とログを確認する。
期待される結果:
釣銭機のドロアが開き、`OpenDrawer`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-022 入金モード設定 (SetDepositMode)
ID: IT-DEVICE-022
画面/機能カテゴリ: 釣銭機
大項目: 入金設定
中項目: 入金モード設定 (SetDepositMode)
前提条件:
`Start`が成功し、入金モードに`0`が設定されている。
実行手順:
1. 「入金モード設定 (SetDepositMode)」を実行する。
2. 返却された状態とログを確認する。
期待される結果:
入金モード0の設定が正常終了し、`SetDepositMode`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-023 投入金取消 (ClearInput)
ID: IT-DEVICE-023
画面/機能カテゴリ: 釣銭機
大項目: 入金処理
中項目: 投入金取消 (ClearInput)
前提条件:
`Start`→`BeginDeposit`が成功し、現金を投入していない。
実行手順:
1. 「投入金取消 (ClearInput)」を実行する。
2. 実機状態とログを確認する。
期待される結果:
入力バッファが消去され、`ClearInput`が成功として記録される。返却対象の現金はない。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-024 現金回収 (Collect)
ID: IT-DEVICE-024
画面/機能カテゴリ: 釣銭機
大項目: 回収処理
中項目: 現金回収 (Collect)
前提条件:
`Start`が成功し、実機の取扱説明で安全と確認したテスト用回収指示文字列が設定されている。
実行手順:
1. 周囲の安全を確認する。
2. 「現金回収 (Collect)」を実行する。
3. 実機動作とログを確認する。
期待される結果:
指定したテスト用回収処理が正常終了し、`Collect`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-025 金種別払出 (DispenseCash)
ID: IT-DEVICE-025
画面/機能カテゴリ: 釣銭機
大項目: 払出処理
中項目: 金種別払出 (DispenseCash)
前提条件:
`Start`が成功し、払出口番号に`0`、金種別枚数データに全金種0枚が設定されている。
実行手順:
1. 「金種別払出 (DispenseCash)」を実行する。
2. 実機から現金が払い出されないこととログを確認する。
期待される結果:
全金種0枚の払出要求が正常終了し、`DispenseCash`が成功として記録される。現金は払い出されない。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-026 釣銭計算・払出 (CashDispenseChange)
ID: IT-DEVICE-026
画面/機能カテゴリ: 釣銭機
大項目: 会計連携
中項目: 釣銭計算・払出 (CashDispenseChange)
前提条件:
`Start`→`BeginDeposit`が成功し、現金を投入していない。会計金額に`0`円が設定されている。
実行手順:
1. 「釣銭計算・払出 (CashDispenseChange)」を実行する。
2. 計算結果とログを確認する。
期待される結果:
入金額0円、会計金額0円、釣銭額0円が表示され、払出を行わずに`CashDispenseChange`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-027 非同期処理開始 (AsyncStart)
ID: IT-DEVICE-027
画面/機能カテゴリ: 釣銭機
大項目: 非同期処理
中項目: 非同期処理開始 (AsyncStart)
前提条件:
`Start`が成功し、非同期処理中ではない。
実行手順:
1. 「非同期処理開始 (AsyncStart)」を実行する。
2. 操作ログとHostログを確認する。
期待される結果:
非同期処理が開始され、`AsyncStart`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-028 非同期処理終了 (AsyncEnd)
ID: IT-DEVICE-028
画面/機能カテゴリ: 釣銭機
大項目: 非同期処理
中項目: 非同期処理終了 (AsyncEnd)
前提条件:
`Start`→`AsyncStart`が成功している。
実行手順:
1. 「非同期処理終了 (AsyncEnd)」を実行する。
2. 操作ログとHostログを確認する。
期待される結果:
非同期処理が終了し、`AsyncEnd`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-029 直接制御 (DirectIO)
ID: IT-DEVICE-029
画面/機能カテゴリ: 釣銭機
大項目: 直接制御
中項目: 直接制御 (DirectIO)
前提条件:
`Start`が成功し、入金・払出処理を実行していない。状態読取用として、コマンド番号に`10`、数値データに`128`、文字列データに空文字が設定されている。
実行手順:
1. コマンド番号、数値データ、文字列データを確認する。
2. 「直接制御 (DirectIO)」を実行する。
3. 返却データとログを確認する。
期待される結果:
状態読取のDirectIOコマンドが正常終了し、`ResultCode=0`、返却された数値データと文字列データが表示される。操作ログの実行結果が成功となる。
種別: N

### IT-DEVICE-030 強制復旧 (ForceRecovery)
ID: IT-DEVICE-030
画面/機能カテゴリ: 釣銭機
大項目: 保守操作
中項目: 強制復旧 (ForceRecovery)
前提条件:
RT300が接続され、投入中の現金がない。通常の入金処理を終了し、強制復旧を安全に実行できる。
実行手順:
1. 「強制復旧 (ForceRecovery)」を選択する。
2. 2回の確認画面で実行を承認する。
3. 各復旧ステップと全体状態をログで確認する。
期待される結果:
強制復旧の各処理がすべて成功し、再接続後の全体状態が正常となる。`ForceRecovery`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-069 入金終了宣言 (EndDepositFlagOn)
ID: IT-DEVICE-069
画面/機能カテゴリ: 釣銭機
大項目: 入金処理
中項目: 入金終了宣言 (EndDepositFlagOn)
前提条件:
`Start`→`BeginDeposit`→`FixDeposit`→`EndDeposit`が成功している。
実行手順:
1. 「入金終了宣言 (EndDepositFlagOn)」を実行する。
2. 操作ログとHostログを確認する。
期待される結果:
`CashChangerEndDeposit_FlagOn`の`ResultCode=0`が返却され、`EndDepositFlagOn`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-070 入金ハンドル解放 (ClearHandle)
ID: IT-DEVICE-070
画面/機能カテゴリ: 釣銭機
大項目: 保守操作
中項目: 入金ハンドル解放 (ClearHandle)
前提条件:
`Start`が成功し、入金処理中ではない。
実行手順:
1. 「入金ハンドル解放 (ClearHandle)」を実行する。
2. 操作ログとHostログを確認する。
期待される結果:
入金ハンドルとセッション管理情報が解放され、`ClearHandle`の`ResultCode=0`が記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-071 イベント数取得 (DataEventCount)
ID: IT-DEVICE-071
画面/機能カテゴリ: 釣銭機
大項目: イベント管理
中項目: イベント数取得 (DataEventCount)
前提条件:
`Start`が成功している。
実行手順:
1. 「イベント数取得 (DataEventCount)」を実行する。
2. 返却値とログを確認する。
期待される結果:
0以上のDataEvent発生回数が返却され、`DataEventCount`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-072 処理結果取得 (Answer)
ID: IT-DEVICE-072
画面/機能カテゴリ: 釣銭機
大項目: 非同期処理
中項目: 処理結果取得 (Answer)
前提条件:
`Start`が成功し、処理中のコマンドがない。
実行手順:
1. 「処理結果取得 (Answer)」を実行する。
2. 返却コマンドとログを確認する。
期待される結果:
`CashChangerAnswer`が正常終了し、現在の処理結果または処理依頼なしの状態が返却される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-073 在高枚数補正 (AdjustCashCounts)
ID: IT-DEVICE-073
画面/機能カテゴリ: 釣銭機
大項目: 在高管理
中項目: 在高枚数補正 (AdjustCashCounts)
前提条件:
`Start`が成功し、入金・払出処理を実行していない。
実行手順:
1. 「在高枚数補正 (AdjustCashCounts)」を実行し、確認画面で承認する。
2. アプリが表示した補正値とログを確認する。
3. `GetCashCounts`を実行する。
期待される結果:
アプリが実行直前に`GetCashCounts`で取得した金種別枚数を変更せずに`AdjustCashCounts`へ渡し、`ResultCode=0`が返却される。再取得した金種別枚数が補正値と一致し、実機在高が変更されていない。
種別: N

### IT-DEVICE-074 稼働状態確認 (CheckHealth)
ID: IT-DEVICE-074
画面/機能カテゴリ: 釣銭機
大項目: 稼働確認
中項目: 稼働状態確認 (CheckHealth)
前提条件:
`Start`が成功し、稼働確認レベルに`1`が設定されている。
実行手順:
1. 「稼働状態確認 (CheckHealth)」を実行する。
2. `CheckHealthText`とログを確認する。
期待される結果:
`CheckHealth`の`ResultCode=0`が返却され、稼働状態の説明が表示される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-075 統計情報取得 (RetrieveStatistics)
ID: IT-DEVICE-075
画面/機能カテゴリ: 釣銭機
大項目: 統計情報
中項目: 統計情報取得 (RetrieveStatistics)
前提条件:
`Start`が成功し、`CapStatisticsReporting=true`である。
実行手順:
1. 「統計情報取得 (RetrieveStatistics)」を実行する。
2. 統計情報バッファーとログを確認する。
期待される結果:
`RetrieveStatistics`が成功し、実機の統計情報がバッファーに表示される。
種別: N
ラウンド1結果:
N/A
ラウンド1テスター:
Dat
ラウンド1メモ:
現在のテスト機器（RT300）では`CapStatisticsReporting=true`であるが、Service Objectから統計情報バッファーが返却されず、本機能を確認できないため、本試験は対象外とする。

### IT-DEVICE-076 統計情報リセット (ResetStatistics)
ID: IT-DEVICE-076
画面/機能カテゴリ: 釣銭機
大項目: 統計情報
中項目: 統計情報リセット (ResetStatistics)
前提条件:
`Start`が成功し、`CapUpdateStatistics=true`である。リセット対象を示す有効なバッファーが入力されている。
実行手順:
1. 「統計情報リセット (ResetStatistics)」を実行し、確認画面で承認する。
2. 対象の統計情報を再取得する。
期待される結果:
`ResetStatistics`の`ResultCode=0`が返却され、対象の統計値がリセットされる。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-077 統計情報更新 (UpdateStatistics)
ID: IT-DEVICE-077
画面/機能カテゴリ: 釣銭機
大項目: 統計情報
中項目: 統計情報更新 (UpdateStatistics)
前提条件:
`Start`が成功し、`CapUpdateStatistics=true`である。テスト用の統計情報バッファーが入力されている。
実行手順:
1. 「統計情報更新 (UpdateStatistics)」を実行し、確認画面で承認する。
2. 対象の統計情報を再取得する。
期待される結果:
`UpdateStatistics`の`ResultCode=0`が返却され、再取得した統計値が入力値と一致する。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-078 OPOSプロパティ取得 (GetProperties)
ID: IT-DEVICE-078
画面/機能カテゴリ: 釣銭機
大項目: OPOS情報
中項目: OPOSプロパティ取得 (GetProperties)
前提条件:
`Start`が成功している。
実行手順:
1. 「OPOSプロパティ取得 (GetProperties)」を実行する。
2. 取得件数と取得失敗件数を確認する。
期待される結果:
Cash ChangerのOPOSプロパティ55項目が表示され、取得失敗が0件である。
種別: N
ラウンド1結果:
N/A
ラウンド1テスター:
Dat
ラウンド1メモ:
現在のテスト機器（RT300）では、Service ObjectからOPOSプロパティ55項目を取得失敗0件で安定して取得できないため、本試験は対象外とする。

### IT-DEVICE-079 バージョン比較 (CompareFirmwareVersion)
ID: IT-DEVICE-079
画面/機能カテゴリ: 釣銭機
大項目: ファームウェア
中項目: バージョン比較 (CompareFirmwareVersion)
前提条件:
`Start`が成功し、`CapCompareFirmwareVersion=true`である。ベンダーから提供されたRT300用の確認済みファームウェアファイルがPOS端末内に配置され、読み取り可能な絶対パスを確認している。
実行手順:
1. POS端末内のファームウェアファイルの絶対パスを入力する。
2. 「バージョン比較 (CompareFirmwareVersion)」を実行する。
期待される結果:
`CompareFirmwareVersion`の`ResultCode=0`が返却され、現在のバージョンとの比較結果値が表示される。ファームウェアは更新されない。
種別: N
ラウンド1結果:
N/A
ラウンド1テスター:
Dat
ラウンド1メモ:
現在、テスト機器用の確認済みファームウェアファイルを用意できないため、本試験は一時的に対象外とする。

### IT-DEVICE-080 ファームウェア更新 (UpdateFirmware)
ID: IT-DEVICE-080
画面/機能カテゴリ: 釣銭機
大項目: ファームウェア
中項目: ファームウェア更新 (UpdateFirmware)
前提条件:
`Start`が成功し、`CapUpdateFirmware=true`である。対象機種と完全に一致する検証済みファームウェアが用意され、更新中の電源が確保されている。
実行手順:
1. 対象機種とファイルを再確認する。
2. 「ファームウェア更新 (UpdateFirmware)」を実行し、2回の確認画面で承認する。
3. 完了まで電源を切らずに待機する。
期待される結果:
`UpdateFirmware`の`ResultCode=0`が返却され、再接続後の稼働状態が正常である。
種別: N

## テストケース {sheet=カスタマーディスプレイ}

### IT-DEVICE-031 接続 (Start)
ID: IT-DEVICE-031
画面/機能カテゴリ: カスタマーディスプレイ
大項目: 接続管理
中項目: 接続 (Start)
前提条件:
Hostが起動済みで、表示器が接続され、他のプロセスが占有していない。
実行手順:
1. 「接続 (Start)」を実行する。
2. 操作ログと機能対応状況を確認する。
期待される結果:
Open、Claim、DeviceEnabledが成功し、状態が「準備完了」になる。CapDescriptors、マーキー対応、DeviceWindows、行数、桁数が画面に反映される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-032 切断 (End)
ID: IT-DEVICE-032
画面/機能カテゴリ: カスタマーディスプレイ
大項目: 接続管理
中項目: 切断 (End)
前提条件:
`Start`が成功し、追加ウィンドウが残っていない。
実行手順:
1. 「切断 (End)」を実行する。
2. 状態とログを確認する。
期待される結果:
ReleaseとCloseが成功し、状態が「未接続」になる。`End`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-033 文字列表示 (DisplayText)
ID: IT-DEVICE-033
画面/機能カテゴリ: カスタマーディスプレイ
大項目: 文字列表示
中項目: 文字列表示 (DisplayText)
前提条件:
`Start`が成功し、画面に表示文字列`TABLETPOS TEST`、属性値`0`が表示されている。
実行手順:
1. 「文字列表示 (DisplayText)」を実行する。
2. 実機の表示とログを確認する。
期待される結果:
属性値`0`で`TABLETPOS TEST`が表示され、`DisplayText`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-034 位置指定表示 (DisplayTextAt)
ID: IT-DEVICE-034
画面/機能カテゴリ: カスタマーディスプレイ
大項目: 文字列表示
中項目: 位置指定表示 (DisplayTextAt)
前提条件:
`Start`が成功し、画面に表示文字列`TABLETPOS TEST`、行番号`1`、桁番号`1`、属性値`0`が表示されている。
実行手順:
1. 「位置指定表示 (DisplayTextAt)」を実行する。
2. 表示位置とログを確認する。
期待される結果:
行番号`1`、桁番号`1`に属性値`0`で`TABLETPOS TEST`が表示され、`DisplayTextAt`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-035 表示消去 (ClearText)
ID: IT-DEVICE-035
画面/機能カテゴリ: カスタマーディスプレイ
大項目: 文字列表示
中項目: 表示消去 (ClearText)
前提条件:
`Start`→`DisplayText`が成功し、文字列が表示されている。
実行手順:
1. 「表示消去 (ClearText)」を実行する。
2. 実機の表示とログを確認する。
期待される結果:
表示文字列が消去され、`ClearText`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-036 ディスクリプター消去 (ClearDescriptors)
ID: IT-DEVICE-036
画面/機能カテゴリ: カスタマーディスプレイ
大項目: ディスクリプター
中項目: ディスクリプター消去 (ClearDescriptors)
前提条件:
CapDescriptors=trueの実機またはOPOSテストプロファイルを使用する。`Start`→`SetDescriptor`が成功し、少なくとも1つのディスクリプターが設定済みである。
実行手順:
1. 「ディスクリプター消去 (ClearDescriptors)」を実行する。
2. 実機表示、操作ログ、Hostログを確認する。
期待される結果:
設定済みのディスクリプターがすべて消去され、`ClearDescriptors`の`ResultCode=0`と成功ログが記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-037 文字列スクロール (ScrollText)
ID: IT-DEVICE-037
画面/機能カテゴリ: カスタマーディスプレイ
大項目: 文字列表示
中項目: 文字列スクロール (ScrollText)
前提条件:
CapHMarquee=trueまたはCapVMarquee=trueの実機またはOPOSテストプロファイルを使用する。`Start`→`DisplayText`が成功し、画面のスクロール方向とスクロール量に既定値`1`が表示されている。
実行手順:
1. 「文字列スクロール (ScrollText)」を実行する。
2. 実機動作とログを確認する。
期待される結果:
表示文字列が方向`1`へ1単位スクロールし、`ScrollText`の`ResultCode=0`と成功ログが記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-038 ディスクリプター設定 (SetDescriptor)
ID: IT-DEVICE-038
画面/機能カテゴリ: カスタマーディスプレイ
大項目: ディスクリプター
中項目: ディスクリプター設定 (SetDescriptor)
前提条件:
CapDescriptors=trueの実機またはOPOSテストプロファイルを使用する。`Start`が成功し、ベンダー仕様で定義された有効なディスクリプター番号と属性値が設定されている。
実行手順:
1. 「ディスクリプター設定 (SetDescriptor)」を実行する。
2. 実機表示、操作ログ、Hostログを確認する。
期待される結果:
指定したディスクリプターが設定され、`SetDescriptor`の`ResultCode=0`と成功ログが記録される。
種別: N
ラウンド1結果:
N/A
ラウンド1テスター:
Dat
ラウンド1メモ:
現在のテスト機器では`CapDescriptors=false`であり、`SetDescriptor`に対応していないため、本試験は対象外とする。

### IT-DEVICE-039 ウィンドウ作成 (CreateWindow)
ID: IT-DEVICE-039
画面/機能カテゴリ: カスタマーディスプレイ
大項目: ウィンドウ制御
中項目: ウィンドウ作成 (CreateWindow)
前提条件:
DeviceWindows&gt;1の実機またはOPOSテストプロファイルを使用する。`Start`が成功し、開始行`0`、開始桁`0`、表示領域`2×20`、ウィンドウ`2×20`が設定されている。
実行手順:
1. 「ウィンドウ作成 (CreateWindow)」を実行する。
2. 実機表示、操作ログ、Hostログを確認する。
期待される結果:
指定領域の追加ウィンドウが作成され、`CreateWindow`の`ResultCode=0`と成功ログが記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-040 ウィンドウ破棄 (DestroyWindow)
ID: IT-DEVICE-040
画面/機能カテゴリ: カスタマーディスプレイ
大項目: ウィンドウ制御
中項目: ウィンドウ破棄 (DestroyWindow)
前提条件:
`Start`→`CreateWindow`が成功し、追加ウィンドウが存在する。
実行手順:
1. 「ウィンドウ破棄 (DestroyWindow)」を実行する。
2. 実機状態とログを確認する。
期待される結果:
作成済みの追加ウィンドウが破棄され、`DestroyWindow`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-041 ウィンドウ再表示 (RefreshWindow)
ID: IT-DEVICE-041
画面/機能カテゴリ: カスタマーディスプレイ
大項目: ウィンドウ制御
中項目: ウィンドウ再表示 (RefreshWindow)
前提条件:
`Start`→`CreateWindow`が成功し、追加ウィンドウが存在する。画面の「再表示ウィンドウ番号」に既定値`1`が表示されている。
実行手順:
1. 「ウィンドウ再表示 (RefreshWindow)」を実行する。
2. 実機表示とログを確認する。
期待される結果:
作成済みのウィンドウ番号`1`が再表示され、`RefreshWindow`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-042 直接制御 (DirectIO)
ID: IT-DEVICE-042
画面/機能カテゴリ: カスタマーディスプレイ
大項目: 直接制御
中項目: 直接制御 (DirectIO)
前提条件:
`Start`が成功し、画面にコマンド番号`0`、数値データ`0`、文字列`TABLETPOS TEST`が表示されている。
実行手順:
1. 「直接制御 (DirectIO)」を実行する。
2. 返却データ、実機表示、ログを確認する。
期待される結果:
DirectIOコマンドが正常終了し、`DirectIO`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-043 表示制御 (LinDsp)
ID: IT-DEVICE-043
画面/機能カテゴリ: カスタマーディスプレイ
大項目: 表示制御
中項目: 表示制御 (LinDsp)
前提条件:
`Start`が成功し、画面にコマンド番号`0`、文字列`TABLETPOS TEST`が表示されている。
実行手順:
1. 「表示制御 (LinDsp)」を実行する。
2. 実機表示とログを確認する。
期待される結果:
指定文字列が表示され、`LinDsp`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-044 テロップ表示 (LinDspTelop)
ID: IT-DEVICE-044
画面/機能カテゴリ: カスタマーディスプレイ
大項目: 表示制御
中項目: テロップ表示 (LinDspTelop)
前提条件:
`Start`が成功し、画面にコマンド番号`0`、文字列`TABLETPOS TEST`、テロップ速度`1`が表示されている。
実行手順:
1. 「テロップ表示 (LinDspTelop)」を実行する。
2. 実機動作とログを確認する。
期待される結果:
指定文字列が速度1でテロップ表示され、`LinDspTelop`が成功として記録される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-082 統計情報取得 (RetrieveStatistics)
ID: IT-DEVICE-082
画面/機能カテゴリ: カスタマーディスプレイ
大項目: 統計情報
中項目: 統計情報取得 (RetrieveStatistics)
前提条件:
`Start`が成功し、`CapStatisticsReporting=true`である。
実行手順:
1. 「統計情報取得 (RetrieveStatistics)」を実行する。
2. 統計情報バッファーを確認する。
期待される結果:
`RetrieveStatistics`が成功し、実機の統計情報がバッファーに表示される。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-083 統計情報リセット (ResetStatistics)
ID: IT-DEVICE-083
画面/機能カテゴリ: カスタマーディスプレイ
大項目: 統計情報
中項目: 統計情報リセット (ResetStatistics)
前提条件:
`Start`が成功し、`CapUpdateStatistics=true`である。リセット対象の有効なバッファーが入力されている。
実行手順:
1. 「統計情報リセット (ResetStatistics)」を実行し、確認画面で承認する。
2. 対象の統計情報を再取得する。
期待される結果:
`ResetStatistics`の`ResultCode=0`が返却され、対象の統計値がリセットされる。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-084 統計情報更新 (UpdateStatistics)
ID: IT-DEVICE-084
画面/機能カテゴリ: カスタマーディスプレイ
大項目: 統計情報
中項目: 統計情報更新 (UpdateStatistics)
前提条件:
`Start`が成功し、`CapUpdateStatistics=true`である。テスト用の統計情報バッファーが入力されている。
実行手順:
1. 「統計情報更新 (UpdateStatistics)」を実行し、確認画面で承認する。
2. 対象の統計情報を再取得する。
期待される結果:
`UpdateStatistics`の`ResultCode=0`が返却され、再取得した統計値が入力値と一致する。
種別: N
ラウンド1結果:
Pass
ラウンド1テスター:
Dat

### IT-DEVICE-085 OPOSプロパティ取得 (GetProperties)
ID: IT-DEVICE-085
画面/機能カテゴリ: カスタマーディスプレイ
大項目: OPOS情報
中項目: OPOSプロパティ取得 (GetProperties)
前提条件:
`Start`が成功している。
実行手順:
1. 「OPOSプロパティ取得 (GetProperties)」を実行する。
2. 取得件数と取得失敗件数を確認する。
期待される結果:
Line DisplayのOPOSプロパティ46項目が表示され、取得失敗が0件である。
種別: N
ラウンド1結果:
N/A
ラウンド1テスター:
Dat
ラウンド1メモ:
現在のテスト機器（Line Display）では、Service Objectが提供するOPOSプロパティ数が期待値の46項目と一致せず、本機能を確認できないため、本試験は対象外とする。

## テストケース {sheet=プリンターコマンド}

### IT-DEVICE-045 接続 (Start)
ID: IT-DEVICE-045
画面/機能カテゴリ: プリンター
大項目: 接続管理
中項目: 接続 (Start)
前提条件:
Hostが起動済みで、プリンターの電源が入り、用紙がセットされている。
実行手順:
1. 「接続 (Start)」を実行する。
2. 状態とログを確認する。
期待される結果:
Open、Claim、DeviceEnabledが成功し、状態が「準備完了」になる。`Start`の`ResultCode=0`が記録される。
種別: N

### IT-DEVICE-046 切断 (End)
ID: IT-DEVICE-046
画面/機能カテゴリ: プリンター
大項目: 接続管理
中項目: 切断 (End)
前提条件:
`Start`が成功し、印字処理中ではない。
実行手順:
1. 「切断 (End)」を実行する。
2. 状態とログを確認する。
期待される結果:
ReleaseとCloseが成功し、状態が「未接続」になる。`End`が成功として記録される。
種別: N

### IT-DEVICE-047 文字列・書式印字 (PrintNormal)
ID: IT-DEVICE-047
画面/機能カテゴリ: プリンター
大項目: 印字
中項目: 文字列・書式印字 (PrintNormal)
前提条件:
`Start`が成功し、画面に印字ステーション`2`、印字文字列`TABLETPOS DEVICE TEST`が表示されている。
実行手順:
1. 「文字列・書式印字 (PrintNormal)」を実行する。
2. 印字結果とログを確認する。
期待される結果:
`TABLETPOS DEVICE TEST`と改行が印字ステーション`2`へ出力され、`PrintText`が成功として記録される。
種別: N

### IT-DEVICE-048 JAN13印字 (PrintBarCode)
ID: IT-DEVICE-048
画面/機能カテゴリ: プリンター
大項目: バーコード印字
中項目: JAN13印字 (PrintBarCode)
前提条件:
`Start`が成功し、画面に印字ステーション`2`、JAN13データ`4901234567894`、種別`104`、高さ`80`、幅`2`、配置`-2`、文字印字位置`-12`が表示されている。
実行手順:
1. 「JAN13印字 (PrintBarCode)」を実行する。
2. 印字されたコードをスキャンする。
3. ログを確認する。
期待される結果:
画面に表示されたパラメーターで`4901234567894`のJAN13が印字され、スキャン値が一致する。`PrintJAN13`が成功として記録される。
種別: N

### IT-DEVICE-049 JAN8印字 (PrintBarCode)
ID: IT-DEVICE-049
画面/機能カテゴリ: プリンター
大項目: バーコード印字
中項目: JAN8印字 (PrintBarCode)
前提条件:
`Start`が成功し、画面に印字ステーション`2`、JAN8データ`49012347`、種別`103`、高さ`80`、幅`2`、配置`-2`、文字印字位置`-12`が表示されている。
実行手順:
1. 「JAN8印字 (PrintBarCode)」を実行する。
2. 印字されたコードをスキャンする。
3. ログを確認する。
期待される結果:
画面に表示されたパラメーターで`49012347`のJAN8が印字され、スキャン値が一致する。`PrintJAN8`が成功として記録される。
種別: N

### IT-DEVICE-050 QRコード印字 (PrintQR)
ID: IT-DEVICE-050
画面/機能カテゴリ: プリンター
大項目: コード印字
中項目: QRコード印字 (PrintQR)
前提条件:
`Start`が成功し、画面のQRコードデータに`TABLETPOS-DEVICE-TEST`が表示されている。アプリケーション層のQRコード印字設定は、印字ステーション`2`、種別`504`、高さ`0`、幅`0`、配置`-2`、文字印字位置`-11`である。
実行手順:
1. 「QRコード印字 (PrintBarCode)」を実行する。
2. 印字されたQRコードを読み取る。
3. ログを確認する。
期待される結果:
`TABLETPOS-DEVICE-TEST`のQRコードが完全に印字され、読取値が一致する。`PrintQR`が成功として記録される。
種別: N

### IT-DEVICE-051 用紙カット (CutPaper)
ID: IT-DEVICE-051
画面/機能カテゴリ: プリンター
大項目: 用紙操作
中項目: 用紙カット (CutPaper)
前提条件:
`Start`が成功し、確認用の文字列を印字済みである。画面のカット率に既定値`100`が表示されている。
実行手順:
1. 「用紙カット (CutPaper)」を実行する。
2. 用紙の切断状態とログを確認する。
期待される結果:
画面に表示されたカット率`100%`で用紙がカットされ、`CutPaper`が成功として記録される。
種別: N

### IT-DEVICE-052 画像印字 (PrintBitmap)
ID: IT-DEVICE-052
画面/機能カテゴリ: プリンター
大項目: 画像印字
中項目: 画像印字 (PrintBitmap)
前提条件:
`Start`が成功し、画面に印字ステーション`2`、画像幅`-11`（原寸）、配置`-2`が表示されている。非圧縮Windows BMP形式のテスト画像について、存在するファイルの絶対パスが設定されている。
実行手順:
1. 「画像印字 (PrintBitmap)」を実行する。
2. 印字された画像とログを確認する。
期待される結果:
指定したBMP画像が原寸で欠けずに印字され、`PrintBitmap`が成功として記録される。
種別: N

### IT-DEVICE-053 レシート一括印字 (PrintFullReceipt)
ID: IT-DEVICE-053
画面/機能カテゴリ: プリンター
大項目: レシート印字
中項目: レシート一括印字 (PrintFullReceipt)
前提条件:
`Start`が成功し、用紙が十分にセットされている。画面に印字文字列`TABLETPOS DEVICE TEST`、JAN13データ`4901234567894`、JAN8データ`49012347`、QRコードデータ`TABLETPOS-DEVICE-TEST`が表示されている。
実行手順:
1. 「レシート一括印字 (PrintFullReceipt)」を実行する。
2. 文字列、JAN13、JAN8、QRコード、送り、カットを確認する。
3. ログを確認する。
期待される結果:
画面に表示された文字列、JAN13、JAN8、QRコードと実行時刻が欠けずに印字される。最終行がカッターの手前に残らず、用紙が完全に排出・カットされ、`PrintFullReceipt`が成功として記録される。
種別: N

## テストケース {sheet=キャッシュドロア}

### IT-DEVICE-054 接続 (Start)
ID: IT-DEVICE-054
画面/機能カテゴリ: キャッシュドロア
大項目: 接続管理
中項目: 接続 (Start)
前提条件:
Hostが起動済みで、キャッシュドロアが接続されている。
実行手順:
1. 「接続 (Start)」を実行する。
2. 状態とログを確認する。
期待される結果:
Open、Claim、DeviceEnabledが成功し、状態が「準備完了」になる。`Start`が成功として記録される。
種別: N

### IT-DEVICE-055 切断 (End)
ID: IT-DEVICE-055
画面/機能カテゴリ: キャッシュドロア
大項目: 接続管理
中項目: 切断 (End)
前提条件:
`Start`が成功している。
実行手順:
1. 「切断 (End)」を実行する。
2. 状態とログを確認する。
期待される結果:
ReleaseとCloseが成功し、状態が「未接続」になる。`End`が成功として記録される。
種別: N

### IT-DEVICE-056 状態確認 (CheckDrawerStatus)
ID: IT-DEVICE-056
画面/機能カテゴリ: キャッシュドロア
大項目: 状態確認
中項目: 状態確認 (CheckDrawerStatus)
前提条件:
`Start`が成功している。
実行手順:
1. ドロアを閉じた状態で「状態確認 (CheckDrawerStatus)」を実行する。
2. 画面表示とログを確認する。
期待される結果:
画面に「現在の状態：閉鎖」が表示され、`CheckStatus`が成功として記録される。
種別: N

### IT-DEVICE-057 ドロア開放 (OpenDrawer)
ID: IT-DEVICE-057
画面/機能カテゴリ: キャッシュドロア
大項目: ドロア操作
中項目: ドロア開放 (OpenDrawer)
前提条件:
`Start`が成功し、ドロアの周囲に障害物がない。
実行手順:
1. 「ドロア開放 (OpenDrawer)」を実行する。
2. 実機動作とログを確認する。
期待される結果:
ドロアが開き、`OpenDrawer`が成功として記録される。
種別: N

### IT-DEVICE-087 統計情報取得 (RetrieveStatistics)
ID: IT-DEVICE-087
画面/機能カテゴリ: キャッシュドロア
大項目: 統計情報
中項目: 統計情報取得 (RetrieveStatistics)
前提条件:
`Start`が成功し、`CapStatisticsReporting=true`である。
実行手順:
1. 「統計情報取得 (RetrieveStatistics)」を実行する。
2. 統計情報バッファーを確認する。
期待される結果:
`RetrieveStatistics`が成功し、実機の統計情報がバッファーに表示される。
種別: N

### IT-DEVICE-088 統計情報リセット (ResetStatistics)
ID: IT-DEVICE-088
画面/機能カテゴリ: キャッシュドロア
大項目: 統計情報
中項目: 統計情報リセット (ResetStatistics)
前提条件:
`Start`が成功し、`CapUpdateStatistics=true`である。リセット対象の有効なバッファーが入力されている。
実行手順:
1. 「統計情報リセット (ResetStatistics)」を実行し、確認画面で承認する。
2. 対象の統計情報を再取得する。
期待される結果:
`ResetStatistics`の`ResultCode=0`が返却され、対象の統計値がリセットされる。
種別: N

### IT-DEVICE-089 統計情報更新 (UpdateStatistics)
ID: IT-DEVICE-089
画面/機能カテゴリ: キャッシュドロア
大項目: 統計情報
中項目: 統計情報更新 (UpdateStatistics)
前提条件:
`Start`が成功し、`CapUpdateStatistics=true`である。テスト用の統計情報バッファーが入力されている。
実行手順:
1. 「統計情報更新 (UpdateStatistics)」を実行し、確認画面で承認する。
2. 対象の統計情報を再取得する。
期待される結果:
`UpdateStatistics`の`ResultCode=0`が返却され、再取得した統計値が入力値と一致する。
種別: N

### IT-DEVICE-090 OPOSプロパティ取得 (GetProperties)
ID: IT-DEVICE-090
画面/機能カテゴリ: キャッシュドロア
大項目: OPOS情報
中項目: OPOSプロパティ取得 (GetProperties)
前提条件:
`Start`が成功している。
実行手順:
1. 「OPOSプロパティ取得 (GetProperties)」を実行する。
2. 取得件数と取得失敗件数を確認する。
期待される結果:
Cash DrawerのOPOSプロパティ24項目が表示され、取得失敗が0件である。
種別: N

### IT-DEVICE-091 直接制御 (DirectIO)
ID: IT-DEVICE-091
画面/機能カテゴリ: キャッシュドロア
大項目: 直接制御
中項目: 直接制御 (DirectIO)
前提条件:
`Start`が成功し、ベンダー仕様で安全と確認したコマンド番号、数値データ、文字列データが入力されている。
実行手順:
1. 入力値を再確認する。
2. 「直接制御 (DirectIO)」を実行する。
3. 返却データとログを確認する。
期待される結果:
`DirectIO`の`ResultCode=0`が返却され、返却された数値データと文字列データが表示される。
種別: N

### IT-DEVICE-092 ドロア閉鎖待機 (WaitForDrawerClose)
ID: IT-DEVICE-092
画面/機能カテゴリ: キャッシュドロア
大項目: ドロア操作
中項目: ドロア閉鎖待機 (WaitForDrawerClose)
前提条件:
`Start`→`OpenDrawer`が成功し、実機仕様の範囲内で鳴動タイムアウト、周波数、鳴動時間、鳴動間隔が設定されている。
実行手順:
1. 「ドロア閉鎖待機 (WaitForDrawerClose)」を実行する。
2. ドロアを閉じる。
3. 実機動作とログを確認する。
期待される結果:
設定に従って閉鎖待機が行われ、ドロアを閉じると`WaitForDrawerClose`の`ResultCode=0`が返却される。
種別: N

## テストケース {sheet=決済端末コマンド}

### IT-DEVICE-058 接続 (Start)
ID: IT-DEVICE-058
画面/機能カテゴリ: CAFIS Arch決済端末
大項目: 接続管理
中項目: 接続 (Start)
前提条件:
Hostが起動済みで、CAFIS Archテスト環境と決済端末が利用可能である。
実行手順:
1. 「接続 (Start)」を実行する。
2. 状態とログを確認する。
期待される結果:
CAFIS Archの初期化が成功し、状態が「準備完了」になる。`Start`が成功として記録される。
種別: N

### IT-DEVICE-059 切断 (End)
ID: IT-DEVICE-059
画面/機能カテゴリ: CAFIS Arch決済端末
大項目: 接続管理
中項目: 切断 (End)
前提条件:
`Start`が成功し、決済処理中ではない。
実行手順:
1. 「切断 (End)」を実行する。
2. 状態とログを確認する。
期待される結果:
CAFIS Archの終了処理が成功し、状態が「未接続」になる。`End`が成功として記録される。
種別: N

### IT-DEVICE-060 稼働確認 (HealthCheck)
ID: IT-DEVICE-060
画面/機能カテゴリ: CAFIS Arch決済端末
大項目: 稼働確認
中項目: 稼働確認 (HealthCheck)
前提条件:
`Start`が成功している。
実行手順:
1. 「稼働確認 (HealthCheck)」を実行する。
2. 応答とログを確認する。
期待される結果:
決済端末から正常応答が返却され、`HealthCheck`が成功として記録される。
種別: N

### IT-DEVICE-061 決済実行 (GenericPayment)
ID: IT-DEVICE-061
画面/機能カテゴリ: CAFIS Arch決済端末
大項目: 決済処理
中項目: 決済実行 (GenericPayment)
前提条件:
`Start`が成功し、CAFIS Archテスト環境向けの有効な決済要求JSONが設定されている。
実行手順:
1. 決済要求JSONを確認する。
2. 「決済実行 (GenericPayment)」を実行する。
3. 端末画面、応答、操作ログを確認する。
期待される結果:
テスト決済が正常終了し、`GenericPayment`が成功として記録される。決済要求・応答ペイロードは操作ログに出力されない。
種別: N

### IT-DEVICE-062 伝票再印字 (RePrint)
ID: IT-DEVICE-062
画面/機能カテゴリ: CAFIS Arch決済端末
大項目: 伝票印字
中項目: 伝票再印字 (RePrint)
前提条件:
`Start`が成功し、直前に再印字可能なテスト決済が1件正常終了している。
実行手順:
1. 「伝票再印字 (RePrint)」を実行する。
2. 再印字された伝票とログを確認する。
期待される結果:
直前のテスト決済の伝票が再印字され、`RePrint`が成功として記録される。
種別: N

## テストケース {sheet=バーコードスキャナー}

### IT-DEVICE-063 接続 (Start)
ID: IT-DEVICE-063
画面/機能カテゴリ: バーコードスキャナー
大項目: 接続管理
中項目: 接続 (Start)
前提条件:
DENSOスキャナーが指定のシリアルポートに接続され、ポートを他のプロセスが使用していない。
実行手順:
1. 「接続 (Start)」を実行する。
2. 状態とログを確認する。
期待される結果:
シリアルポートの初期化が成功し、状態が「準備完了」になる。`Start`が成功として記録される。
種別: N

### IT-DEVICE-064 1件読取待機 (Listen)
ID: IT-DEVICE-064
画面/機能カテゴリ: バーコードスキャナー
大項目: 読取り
中項目: 1件読取待機 (Listen)
前提条件:
`Start`が成功し、テスト用バーコード`4901234567894`を読み取れる状態である。
実行手順:
1. 「1件読取待機 (Listen)」を実行する。
2. テスト用バーコードを1回読み取る。
3. 画面表示とログを確認する。
期待される結果:
最終読取バーコードに`4901234567894`が表示され、`Listen`→`DataReceived`が成功として記録される。
種別: N

### IT-DEVICE-065 切断 (End)
ID: IT-DEVICE-065
画面/機能カテゴリ: バーコードスキャナー
大項目: 接続管理
中項目: 切断 (End)
前提条件:
`Start`が成功し、読取待機中ではない。
実行手順:
1. 「切断 (End)」を実行する。
2. 状態とログを確認する。
期待される結果:
シリアルポートが解放され、状態が「未接続」になる。`End`が成功として記録される。
種別: N

## テストケース {sheet=専用キーボード}

### IT-DEVICE-066 接続 (Start)
ID: IT-DEVICE-066
画面/機能カテゴリ: 専用キーボード
大項目: 初期化
中項目: 接続 (Start)
前提条件:
Windows端末に専用POSキーボードが接続されている。
実行手順:
1. 「接続 (Start)」を実行する。
2. 状態とログを確認する。
期待される結果:
Raw Inputの受信準備が完了し、状態が「準備完了」になる。`Start`が成功として記録される。
種別: N

### IT-DEVICE-067 キー入力待機 (Listen)
ID: IT-DEVICE-067
画面/機能カテゴリ: 専用キーボード
大項目: キー入力
中項目: キー入力待機 (Listen)
前提条件:
`Start`が成功し、専用POSキーボードの確認用キーを操作できる。
実行手順:
1. 「キー入力待機 (Listen)」を実行する。
2. 確認用の専用キーを1回押す。
3. 最終入力キーとログを確認する。
期待される結果:
専用キーが受信され、業務キー名またはVirtualKey・ScanCodeが画面に表示される。`Listen`と`KeyReceived`が成功として記録される。
種別: N

### IT-DEVICE-068 切断 (End)
ID: IT-DEVICE-068
画面/機能カテゴリ: 専用キーボード
大項目: 終了処理
中項目: 切断 (End)
前提条件:
`Start`が成功している。
実行手順:
1. 「切断 (End)」を実行する。
2. 状態とログを確認する。
期待される結果:
Raw Inputの受信処理が終了し、状態が「未接続」になる。`End`が成功として記録される。
種別: N

## 基本情報
| 項目 | 内容 |
| --- | --- |
| 文書ID | TC-IT-DEVICE-02 |
| 文書名 | タブレットPOS 実機デバイスコマンド 結合テストケース |
| プロジェクト名 | タブレットPOS |
| モジュール名 | デバイステストワークベンチ |
| テスト段階 | 結合テスト |
| 版数 | 1.1.2 |
| 作成者 | VTI-SAM |
| 作成日 | 2026/08/19 |
| 改訂者 | VTI-SAM |
| 改訂日 | 2026/08/24 |
| 文書区分 | テストケース |
| 環境 | ローカル |
| 件数 | 90件 |
| 対象デバイス | 釣銭機、カスタマーディスプレイ、プリンター、キャッシュドロア、CAFIS Arch決済端末、バーコードスキャナー、専用キーボード |
| 実施方式 | 手動結合テスト（実機動作、画面状態、操作ログ、Hostログを確認） |

## 更新履歴
| バージョン | 依頼者 | 更新者 | 更新日時 | 変更理由 | シート名 | 更新内容 |
| --- | --- | --- | --- | --- | --- | --- |
| 1.1.2 | - | VTI-SAM | 2026/08/24 | 実機確認結果と現行コードへの整合 | 釣銭機コマンド | 入金確定、払出、直接制御、在高補正、統計情報、OPOSプロパティ、ファームウェアの前提条件、期待結果およびN/A理由を現行実装と実機制約に合わせて更新。エラー応答時の実行結果とデバイス状態を区別する確認を追加 |
| 1.1.2 | - | VTI-SAM | 2026/08/24 | 実機確認結果と現行コードへの整合 | カスタマーディスプレイ | SetDescriptorとOPOSプロパティ取得のN/A条件および理由を現行サービスオブジェクトの対応範囲に合わせて明確化 |
| 1.1.2 | - | VTI-SAM | 2026/08/24 | アプリ既定値への整合 | プリンターコマンド | PrintBitmapの入力条件を画面の既定値と有効なBMPファイルパスに合わせて更新 |
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
