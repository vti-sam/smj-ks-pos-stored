---
title: Tablet Host DeviceCommandCore Program Specification
project: tablet_pos_host
type: architecture
status: draft
source:
  - sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/DeviceCommandCore.cs
tags:
  - tablet-host
  - opos
---

# プログラム仕様書 DeviceCommandHandler

<!-- spec-evidence
document_id: POS-HOST-04
status: verified
sources:
  - path: sources/KsPosBoilerplate/TabetPos.Host/src/KsHost/DeviceHost/DeviceCommandCore.cs
    symbol: KsOutProcess.KsDeviceServer.DeviceCommandHandler
notes: CodeGraph とソースコードで確認済み（2026-06-19）。
-->

## @meta
作成者: VTI-SAM
図番: -
更新日: 2026/06/19

## 変更履歴 {grid=21}

### 基本情報 {kv:6,15}
| 項目 | 内容 |
| --- | --- |
| プロジェクト名 | タブレットPOS |
| 機能名 | デバイスコマンドハンドラー |
| バージョン | 0.0.1 |
| 作成者 | VTI-SAM |
| 作成日 | 2026年06月19日 |

### 更新履歴 {table:3,3,3,3,3,3,3}
| バージョン | 依頼者 | 更新者 | 更新日時 | 変更理由 | シート名 | 更新内容 |
| --- | --- | --- | --- | --- | --- | --- |
| 0.0.1 | SMJ様 | VTI-SAM | 2026年06月19日 | - | 全体 | 初版作成 |

## 表紙 {grid=21}

### {kv:6,15}
| 項目 | 内容 |
| --- | --- |
| 名前空間 | KsOutProcess.KsDeviceServer |
| クラス名(論理) | デバイスコマンドハンドラー |
| クラス名(物理) | DeviceCommandHandler |
| 役割/概要 | 受信したコマンドを解釈し、対応するデバイス操作メソッドの呼び出し、プロセスの起動・停止制御、プロセス情報の管理を行うコマンドハンドラークラス。 |
| 備考 | - |

## クラス定義 {grid=24}

### {kv:6,18}
| 項目 | 内容 |
| --- | --- |
| アクセス修飾子 | internal sealed |
| 継承関係(Base/Interfaces) | IDeviceCommandHandler |
| 静的/インスタンス | インスタンス |

### コンストラクタ引数 {table:8,8,8}
| 型 | 論理名 | 物理名 |
| --- | --- | --- |
| IDeviceRegistry | デバイスレジストリ | deviceRegistry |
| IProcessInfoStore | プロセス情報ストア | processInfoStore |

### クラスプロパティ {table:5,4,3,3,3,6}
| 型 | 論理名 | 物理名 | getter | setter | 初期値 |
| --- | --- | --- | --- | --- | --- |
| - | - | - | - | - | - |

## メソッド一覧 {grid=40}

### {table:2,5,4,5,8,12,4}
| No | 修飾子 | static | 戻り値 | メソッド名 | 概要 | 備考 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | public | - | DeviceCommandResult | Handle | 受信コマンドの解析とデバイス処理の呼び出し実行 | - |
| 2 | private | static | DeviceCommandResult | Failure | エラー応答オブジェクトの生成 | - |
| 3 | private | static | void | EnsureLegacyReturnKeys | レガシー用応答パラメータキーの補正 | - |

## メソッド定義 {grid=40}

### {methoddef:2,2,6,4,4,4,4,4,6,2,2}

#### Handle
No: 1
戻り値: DeviceCommandResult | コマンドの実行結果情報
発生例外:
- ArgumentNullException | 引数 `command` が null の場合

引数:
- DeviceCommand | 実行コマンドオブジェクト | command

処理内容:
- ① `command` が null の場合、ArgumentNullException をスローする。
- ② 戻り値オブジェクト `DeviceCommandResult` を正常初期値で生成する。
- ③ コマンドメッセージ `command.Message` が "Kill" の場合はホスト制御アクションに `Kill` を、"ReStart" の場合は `Restart` を設定して即座に結果を返す。
- ④ コマンドのターゲットデバイスID `command.DeviceId` が未指定の場合、`Failure` を呼び出してエラー応答を返す。
- ⑤ デバイスレジストリ `deviceRegistry` からデバイスを検索し、見つからない場合は `Failure` を返す。
- ⑥ コマンドメッセージが "DeviceUse" の場合はプロセス情報ストアに新しい `KsProcessInfo` を追加登録し、デバイスの `DeviceUse` メソッドを実行する。
- ⑦ コマンドメッセージが "DeviceUnUse" の場合はストア内の該当プロセスを未使用（Unuse）に更新し、デバイスの `DeviceUnUse` を実行する。
- ⑧ コマンドメッセージが "DeviceUnUseComplete" の場合はストアからプロセス情報を削除し、デバイスの `DeviceUnUse` を実行する。
- ⑨ コマンドメッセージが "DeviceMethod" の場合は `command.MethodId` が指定されていることを確認し、デバイスの `DeviceMethod` を実行する。
- ⑩ 上記以外のメッセージの場合はサポート外エラーとして `Failure` を返す。
- ⑪ 応答ペイロードにレガシーキーが存在することを確認し (`EnsureLegacyReturnKeys`)、結果を返す。

備考:
- -

#### Failure
No: 2
戻り値: DeviceCommandResult | エラー結果オブジェクト
発生例外: -

引数:
- DeviceCommand | 実行コマンドオブジェクト | command
- string | エラーメッセージ | message

処理内容:
- ① 実行結果が失敗 (`Success = false`)、戻り値が -1、指定されたエラーメッセージ `message` を含む `DeviceCommandResult` を生成する。
- ② 応答の Payload にレガシー互換用の戻り値キー（"ResultCode" = "-1"、"ReturnValue" = "-1"）を格納して返す。

備考:
- -

#### EnsureLegacyReturnKeys
No: 3
戻り値: void | -
発生例外: -

引数:
- Dictionary\<string, string\> | 応答ペイロード | payload
- int | 実行戻り値 | returnValue

処理内容:
- ① 応答ディクショナリ `payload` に "ResultCode" キーが存在しない場合、`returnValue` の文字列値を登録する。
- ② 応答ディクショナリ `payload` に "ReturnValue" キーが存在しない場合、`returnValue` の文字列値を登録する。

備考:
- -
