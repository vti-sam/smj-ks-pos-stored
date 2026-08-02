---
schema_version: 3
table: risks
key: id
mode: replace
---

# リスク管理

| id | risk_type | title | description | status | priority | owner | probability | impact | mitigation | contingency | related_items | notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R-001 | Technical | KSNEWSYS-424は単純移行ではなくStrategy構成への再設計が必要 | KSNEWSYS-424は単純な1対1移行ではなく、Device/Receiptの責務分離とStrategy構成への再設計が必要です。 | Open | Critical | VTI_SAM | High | High | 対象資産、Device/Receipt責務、代表Adapter pathを早期に確定し、必要な決定事項を記録します。 | 計画を超える場合は、non-critical範囲をdeferredまたはchange requestとして分離します。 | S-424, OI-001 | KSNEWSYS-424は単純なmigrationではなくStrategyに基づく再設計が必要。 |
| R-002 | Technical | Device/OCX/terminal環境によりテスト結果が不安定になる可能性 | Device、OCX、terminal環境の差異により、テスト結果が不安定になる可能性があります。 | Open | High | VTI_SAM | Medium | High | 代表デバイス／環境をお客様と早期に確認し、ログとエビデンスを残し、unit checkとactual device checkを分けて扱います。 | 十分な環境がない場合は制約事項として記録し、UAT条件をお客様／onsiteに確認します。 | S-424, OI-001 | Device/OCX/terminal環境の差異によりtest結果が不安定になる可能性。 |
| R-003 | Scope | 0.50MMの軽微調整範囲を超えるscope creep | 0.50MMの軽微な関連調整範囲を超えるscope creepが発生する可能性があります。 | Open | High | VTI_SAM | Medium | High | WBSとDecisionsでchange controlを適用し、見積外の大きな変更を自動吸収しません。 | impact analysisを作成し、追加工数またはscope trade-offを提案します。 | OI-004 | Scope creepがminor adjustment 0.50MMの範囲を超える可能性。 |
| R-004 | Schedule | 7月末にUAT/レビューfeedbackが集中するリスク | UATまたはレビューfeedbackが7月後半に集中し、修正期間が不足する可能性があります。 | Open | High | VTI_SAM | Medium | High | 2026-07-15をcheckpointとしてお客様と調整し、7月はdaily triageで優先度を整理します。 | non-critical項目はdeferし、fix/workaround/release noteの判断を依頼します。 | OI-002, MS-003, MS-004 | UAT/review feedbackが7月末に集中する可能性。 |
| R-005 | Cost | 0.40MM吸収により実質bufferが薄い | 0.40MMをVTI側で吸収しているため、実質的なcost/schedule bufferが薄くなっています。 | Open | Medium | VTI_SAM | Medium | Medium | actual/remainingを週次で確認し、deadline基準でrisk/actionを優先します。 | 早めにescalateし、scope調整またはresource allocationを検討します。 | OI-004 | 0.40MMの吸収により実質的なbufferが薄くなる。 |
| R-006 | Technical | KSNEWSYS-426 Sentry DSNがDebug確認用に一時hardcodeされている | KSNEWSYS-426のSentry基盤で、Debug確認用のDSNが一時的にhardcodeされています。 | Open | High | VTI_SAM | Medium | High | test-onlyであることを明記し、release前にfallback DSNを削除してKSPOS_SENTRY_DSNまたはruntime secretを使用します。 | releaseをblockし、設定hotfixを完了してからdeliverします。 | S-426, OI-003 | Sentry DSNのhardcodeはDebug test用の一時利用に限定。 |
| R-007 | Technical | masking regexのfalse positive/false negativeリスク | 実際のログ形式が増えた場合、masking regexにfalse positiveまたはfalse negativeが発生する可能性があります。 | Open | Medium | VTI_SAM | Medium | Medium | 現時点のregex baseを維持し、実フロー確定後にkey-based maskingとunit testを追加します。 | 一時的にbody/raw objectのログ出力を制限し、dashboard eventサンプルをレビューします。 | S-426, OI-003 | 実際のlog formatが変わるとregex maskingが不正確になる可能性。 |
| R-008 | Technical | Sentry基盤が実API/device commandに未接続 | Sentry基盤は現時点でlifecycle/navigation/manual event中心で、実API/device commandにはまだhookされていません。 | Open | Medium | VTI_SAM | Medium | Medium | 現scopeを明確に説明し、実フロー確定後にAPI/device hookを追加します。 | HttpClient handlerまたはdevice adapter base向けの追加Backlog/actionを作成します。 | S-426, OI-003 | Sentry基盤は実際のAPI/device commandに未接続。 |
| R-009 | Technical | Sentry資料・code review遅延によるcoding/unit test遅延 | お客様のSentry資料またはcode reviewが遅れると、coding/unit testへの移行が遅れる可能性があります。 | Open | Medium | VTI_SAM | Medium | Medium | 短く確認しやすい資料を送付し、basic design/class designの早期合意を促します。 | feedbackが遅い場合は争点の少ない部分を先行し、必要に応じてchange requestに分離します。 | S-426, OI-003 | 顧客のSentry reviewが遅れるとcoding/unit testが遅延する可能性。 |
| R-010 | Technical | crash復元時のSQLite破損またはschema差異によるboot loopリスク | crash後の復元時にSQLite local fileが破損している、またはapp upgradeでDB schemaが変わっている場合、restore失敗によりboot loopが発生する可能性があります。 | Open | High | VTI_SAM | Medium | High | SQLite schema versionを確認し、corruptionまたはversion不一致時にlocal DBをresetできる設計とunit testを用意します。 | 復元できない場合はappをdefault状態へresetし、再loginを促します。 | S-427, T-427-01, T-427-02, T-427-03, T-427-04, T-427-05, T-427-06, T-427-07 | crash後のrestore時にSQLite破損またはschema不一致でboot loopが発生する可能性。 |
