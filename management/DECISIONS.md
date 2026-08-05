---
schema_version: 4
table: decisions
key: id
mode: replace
---

# 決定事項

| id | title | status | date | context | decision | reason | impact | related_items | notes | category | related_wbs | related_knowledge | related_memory | verification | audit_notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| D-001 | デバイス制御関連資料の構成 | Confirmed | 2026-07-29 | デバイス制御関連資料が個別Issueや納品資料に分散し、利用者が必要資料を判断しづらかった。 | アーキテクチャ、基本設計、デバイス制御クラス構成図・実装例集およびプログラム仕様書を役割別に分け、正式採用資料はドキュメント一覧に掲載する。 | 同一内容の重複を避け、端末アプリ開発者と共通部品開発者が参照先を判断できるようにする。 | レビュー対象、納品先および後続WBSの参照関係が明確になる。 | KSNEWSYS-458、KSNEWSYS-472、WBSGAMEN-209、WBSGAMEN-210、WBSGAMEN-266 | VTI提出資料の名称・用語は納品時に統一済みと報告されている。 | Scope | PS-DEVICE-01 |  |  | BacklogのIssue・コメントを再確認済み。 | 2026-08-04時点で確認。 |
| D-002 | Device ConnectorとDevice Managerの対象分離 | Confirmed | 2026-07-29 | WBSGAMEN-266のレビューで、資料の対象がDevice Connectorと混同される懸念が判明した。 | Device Connectorの対応方針・基本設計と、Device Control／Device Managerのプログラム仕様書・クラス構成資料を別の対象として管理する。 | レビュー対象と成果物の誤認を防止し、格納先と完了条件を明確にする。 | WBSGAMEN-209、WBSGAMEN-210、WBSGAMEN-266のレビュー・格納先対応が明確になる。 | WBSGAMEN-209、WBSGAMEN-210、WBSGAMEN-266、KSNEWSYS-424 | WBSGAMEN-266 comment 784869164で対象資料の違いを確認。 | Scope | PS-DEVICE-01 |  |  | BacklogのIssue・コメントを再確認済み。 | 2026-08-04時点で確認。 |
| D-003 | レビュー回付と承認条件 | Confirmed | 2026-07-18 | 設計書レビューで、指摘対応と最終確認の責任者が不明確になりやすかった。 | レビューはチームリーダー（小山）→PMO（小林）→責任者（鎌田）→PM（菅原）の回付を基本とし、WBS側ではレビュー完了とKs様承認要否を記録する。 | 指摘対応、承認および完了判定を一貫させる。 | WBSGAMEN-45、WBSGAMEN-46および後続文書の完了判定が追跡しやすくなる。 | KSNEWSYS-568、WBSGAMEN-45、WBSGAMEN-46、WBSGAMEN-266 | KSNEWSYS-568の回付ルートとWBSの完了条件を根拠とする。 | Governance | WBSGAMEN-45、WBSGAMEN-46 |  |  | BacklogのIssue・コメントを再確認済み。 | 2026-08-04時点で確認。 |
