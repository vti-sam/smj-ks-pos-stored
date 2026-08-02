---
schema_version: 3
table: communications
key: id
mode: replace
---

# 連絡管理

| id | type | title | expectations | communication_channel | frequency | format | owner | notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| COMM-001 | Communication Rule | Sharp管理者向け報告: 菅原充仁 / 鎌田克 | 全体状況を報告し、scope/cost/scheduleに影響がある場合は意思決定またはエスカレーションを依頼します。 | Teams / Email / 会議 | 必要時またはmilestoneごと | 短い報告 | VTI_SAM | Sharp管理者向けの全体報告。 |
| COMM-002 | Communication Rule | Sharp app/UI/UX/POS担当向け連携: 小林智幸 / 伊藤怜央馬 | 設計、flow、UI/UX、POS app挙動について主要確認を行います。 | Teams / Email / 会議 / Backlog | 日次、週2-3回、または必要時 | 設計memo、ticket、短い報告 | VTI_SAM | 設計、フロー、UI/UX、POSアプリに関する主な連携。 |
| COMM-003 | Communication Rule | Japannet技術窓口向け連携: 小山 岳広 | 技術方針、integration point、難しい技術課題を確認します。 | Teams / Email / 会議 | 問題発生時 | 技術memo、Q&A | VTI_SAM | 管理者向けよりも技術詳細に踏み込む場合があります。<br>Japannet技術窓口との技術連携。 |
| COMM-004 | Communication Rule | VTI内部調整 | deliverable、resource、risk、お客様feedback、next actionを内部で同期します。 | 内部chat / 会議 | 日次、週次、必要時 | 内部status | VTI_SAM | お客様向けescalationと回答準備に使用します。<br>VTI内部で納品、リソース、リスク、顧客フィードバックを調整。 |
| COMM-005 | Communication Rule | VTI開発チーム連携 | task詳細、完了条件、blocker、review feedback、deadlineを共有します。 | 内部chat / 会議 / Backlog | 日次、必要時 | task memo、Backlog ticket、内部status | VTI_SAM | D8担当PMおよび開発メンバーとの連携。<br>VTIチーム内の実装タスクを調整。 |
| COMM-006 | Escalation Rule | scope/cost/scheduleに大きな影響がある場合のescalation | 受信者: 顧客PM, 顧客担当, VTI窓口<br>回答目安: 1-2営業日以内 | Teams / Email / 会議 | 発生時 | 報告、会議 | VTI_SAM | SAMが影響summaryを事前に準備します。<br>scope/cost/scheduleへの大きな影響がある場合のエスカレーション。 |
| COMM-007 | Escalation Rule | 技術方針またはintegration未確定によるblocker escalation | 受信者: 顧客担当, VTI責任者<br>回答目安: できるだけ早く、当週中優先 | Teams / 会議 / Backlog | blocker発生時 | 選択肢提案 | VTI_SAM | optionとrecommendationを短く準備します。<br>技術方針またはintegrationがblockerとなった場合のエスカレーション。 |
| COMM-008 | Escalation Rule | 2026-07-31前にUAT/review feedbackが集中するリスクのescalation | 受信者: Sharp主要窓口, VTI窓口, VTI責任者<br>回答目安: 関連UAT/review milestone前 | Teams / Email | UAT/review milestone前 | リスク分類報告 | VTI_SAM | critical/non-criticalを分類し、対応案を提示します。<br>UAT/review feedbackが遅い時期に集中する懸念のエスカレーション。 |
| COMM-009 | Escalation Rule | offshore実装blockerまたはresource不足のescalation | 受信者: D8担当PM, VTI窓口, VTI責任者<br>回答目安: 当営業日中 | 内部chat / 会議 | 発生時 | 内部status | VTI_SAM | deadlineへ影響する前にblocker、owner、対応方針を明確にします。<br>オフショア側のblockerまたはresource不足時の内部エスカレーション。 |
| COMM-010 | Key Notes | Sharp窓口とJapannet技術窓口の使い分け | 管理者向け内容と技術設計内容を分け、深すぎるcode説明を避けながら判断に必要な情報を提示します。<br>対応: お客様向けには分かりやすいbasic design/flowを使い、詳細技術はinternal/design noteで管理します。 |  |  |  | VTI_SAM | 説明粒度を誤るとreview長期化または合意不足につながる可能性があります。<br>Sharp管理者向け内容とJapannet技術連携を区別。 |
