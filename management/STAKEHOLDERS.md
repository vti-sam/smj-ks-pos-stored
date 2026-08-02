---
schema_version: 3
table: stakeholders
key: id
mode: replace
---

# 関係者管理

| id | type | name | email | organization | role | influence | interest | expectations | communication_strategy | notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SH-001 | Stakeholder | 菅原充仁 | sugawara.michihito@mail.sharp | Sharp | Sharp側管理責任者；顧客側の意思決定およびエスカレーション担当 | High | Medium | 全体状況、scope/riskの大きな影響、エスカレーションが必要な判断事項を把握すること。 | scope/cost/scheduleに影響がある場合は密に連携し、通常時はsummaryで状況を共有します。 | Sharp側の管理者。意思決定とescalationを担当。 |
| SH-002 | Stakeholder | 鎌田克 | kamata.katsu@mail.sharp | Sharp | Sharp側管理担当；顧客側の意思決定およびエスカレーション担当 | High | Medium | 全体状況、scope/riskの大きな影響、エスカレーションが必要な判断事項を把握すること。 | scope/cost/scheduleに影響がある場合は密に連携し、通常時はsummaryで状況を共有します。 | Sharp側の管理者。意思決定とescalationを追跡。 |
| SH-003 | Stakeholder | 小林智幸 | kobayashi.tomoyuki@mail.sharp | Sharp | Sharp側チームリード；app、UI/UX、POSに関する主要窓口 | High | High | reviewしやすい設計、明確なflow、確認事項への迅速な回答を期待します。 | 設計reviewと日次または短周期の確認で密に連携します。 | Sharp側のチームリード。app/UI/UX/POSの窓口。 |
| SH-004 | Stakeholder | 伊藤怜央馬 | ito.reoma@mail.sharp | Sharp | Sharp側主担当；app、UI/UX、POSに関する主要窓口 | High | High | reviewしやすい設計、明確なflow、確認事項への迅速な回答を期待します。 | 設計reviewと日次または短周期の確認で密に連携します。 | Sharp側のapp/UI/UX/POS主担当。 |
| SH-005 | Stakeholder | 小山 岳広 | ta-koyama@japannet.co.jp | Japannet | Japannet側主要技術担当 | High | High | 技術方針、integration point、技術制約の確定を支援すること。 | 技術判断や難しい問題が発生した際に密に連携します。 | Japannet側の主要技術窓口。 |
| SH-006 | Stakeholder | NGOC Pham Van (VJP) | ngoc.phamvan@vti.com.vn | VTI | VTI側上位管理者 / GM；VTI側実行管理 | High | Medium | deliverable、escalation、resource、costを管理すること。 | 重要なリスクやresource/cost判断が必要な場合に高頻度で共有します。 | VTI側GM。delivery、escalation、resource、costを管理。 |
| SH-007 | Stakeholder | VTI_SAM | son.nguyenhong1@vti.com.vn | VTI | VTI側Tech Lead / BrSE；技術および実行の主担当 | High | High | 技術調整、設計、coding、risk、お客様との技術コミュニケーションを主導すること。 | deliverableと技術確認の直接窓口として対応します。 | VTI側Tech Lead/BrSE。技術と主要コミュニケーションを担当。 |
| SH-008 | Stakeholder | VTI_NHUT | nhut.nguyenminh@vti.com.vn | VTI | BrSE支援；日本語・ベトナム語コミュニケーション支援 | Medium | High | 要求確認、meeting支援、review、日本語・ベトナム語の橋渡しを行うこと。 | お客様連携ではSAMと連携し、確認事項を短周期で整理します。 | 日越コミュニケーションを支援し、要求を明確化するBrSE。 |
| SH-009 | Stakeholder | VTI_ヒエップ | hiep.nguyendinh@vti.com.vn | VTI | VTI側PM；D8開発チーム調整担当 | High | High | task、deadline、resource、blockerを把握し、開発チームを調整すること。 | 計画、daily follow-up、内部escalationで密に連携します。 | VTI/D8側PM。task、deadline、blockerを調整。 |
| SH-010 | Stakeholder | Vu Van Canh | canh.vuvan@vti.com.vn | VTI | 開発メンバー | Medium | High | 明確なtask、完了条件、迅速な技術feedbackを受けて実装すること。 | PM/SAM経由で同期し、技術確認が必要な場合は直接連携します。 | VTI側developer。taskを担当し、技術feedbackに対応。 |
| SH-011 | Stakeholder | Đỗ Hoàng Nam VTI.D6 | nam.dohoang@vti.com.vn | VTI | 開発メンバー | Medium | High | 明確なtask、完了条件、迅速な技術feedbackを受けて実装すること。 | PM/SAM経由で同期し、技術確認が必要な場合は直接連携します。 | VTI側developer。taskを担当し、技術feedbackに対応。 |
