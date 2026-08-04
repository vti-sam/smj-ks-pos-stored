---
schema_version: 3
table: stakeholders
key: id
mode: replace
---

# 関係者管理

| id | type | name | email | organization | role | influence | interest | expectations | communication_strategy | notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S-001 | Vendor reviewer | VTI サム | son.nguyenhong1@vti.com.vn | VTI | 納品責任者／技術窓口 | High | High | 確定フォーマットに沿った成果物、格納先、ソース確認・修正およびテスト結果を明示する。 | WBSGAMENコメントで成果物、格納先、レビュー依頼を連絡し、VTI内部Issueと相互参照する。 | 直接投稿: WBSGAMEN-209、WBSGAMEN-266、KSNEWSYS-424、KSNEWSYS-458、KSNEWSYS-472。 |
| S-002 | Vendor reviewer | VTI ニャット |  | VTI | 設計書作成／VTI内部レビュー | Medium | High | 設計書の論理名、構成、処理責務およびレビュー指摘を整理し、対外成果物へ反映する。 | VTI Backlogで内部レビューを行い、確定内容をKSNEWSYS/WBSGAMENの成果物へ反映する。 | 直接投稿: KSNEWSYS-424。関連内部Issue: SHARP_MULTI_DEVICE_POS-523。 |
| S-003 | WBS coordinator | SMJ 南 |  | SMJ | WBS管理／一次レビュー／顧客連絡 | High | High | 作業範囲、期限、レビュー状態、Ks様承認要否および完了条件を一貫して管理する。 | WBSGAMENのIssueフィールドとコメントを更新し、遅延・確認事項はKSNEWSYSと関連付ける。 | 直接投稿・担当: WBSGAMEN-40、-209、-211、-266、KSNEWSYS-472、-568。 |
| S-004 | Responsible reviewer | SMJ鎌田 |  | SMJ | 責任者レビュー／設計方針確認 | High | High | 設計方針、資料の対象範囲およびレビュー指摘への対応結果を確認する。 | Backlogコメントで対象資料と判断事項を明示し、レビュー完了前に再確認する。 | 直接投稿: KSNEWSYS-424、KSNEWSYS-458、KSNEWSYS-568、WBSGAMEN-266。 |
| S-005 | PMO reviewer | SMJ 小林 |  | SMJ | PMOレビュー／工数・進捗確認 | High | High | レビュー内容、工数、スケジュールおよび成果物の妥当性を確認する。 | レビュー依頼時に関連Issueと資料格納先を明記し、指摘・再提出・完了条件を追跡する。 | 直接投稿: KSNEWSYS-568。成果物レビュー通知: WBSGAMEN-209、WBSGAMEN-266。 |
| S-006 | Project manager | SMJ 菅原 |  | SMJ | PM／最終確認 | High | High | 責任者・PMOのレビュー結果を踏まえ、設計内容と完了判定を確認する。 | 回付ルートの最終確認者として、レビュー結果と未解決事項をIssue上で確認する。 | KSNEWSYS-568の回付ルートおよびレビューコメントで確認。 |
| S-007 | Team lead reviewer | 小山@ジャパンネット |  | JNET | チームリーダー／設計書フォーマット・範囲レビュー | High | High | 資料の位置付け、用語、フォーマット、責務分担および利用者視点の不足を確認する。 | VTIからの提出資料をBacklogで確認し、修正観点と正式文書への掲載要否を明示する。 | 直接投稿: KSNEWSYS-424、KSNEWSYS-458、KSNEWSYS-472。 |
