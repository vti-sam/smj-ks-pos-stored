---
schema_version: 4
table: risks
key: id
mode: replace
---

# リスク管理

| id | risk_type | title | description | status | priority | owner | probability | impact | mitigation | contingency | related_items | notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R-001 | Schedule | 基本設計レビューの遅延 | WBSGAMEN-211は2026-08-03時点で対応中。KSNEWSYS-472の作業中かつVTIサムへ状況確認中として、期限を2026-08-31へ変更している。後続の詳細設計、仕様書レビューおよび開発・テストの開始に影響する可能性がある。 | At Risk | High | SMJ 南 | High | High | KSNEWSYS-472の対象文書と掲載状況を確認し、基本設計レビューの指摘、反映要否および再提出日をIssue上で確定する。 | レビュー対象を文書単位に分割し、確認済み資料から順次完了登録する。 | WBSGAMEN-211、WBSGAMEN-44、WBSGAMEN-45、WBSGAMEN-46、KSNEWSYS-472 | 根拠: WBSGAMEN-211 comment 787270418、787500096。 |
| R-002 | Scope | Device ConnectorとDevice Managerの範囲混同 | WBSGAMEN-266のレビューコメントで、Device Connectorとは別資料であることと、対象資料がデバイス制御クラス構成図およびデバイス制御実装例集であることが明確化された。名称や格納先を誤ると、レビュー対象と納品成果物の取り違えにつながる。 | Monitor | High | SMJ 南 | Medium | High | Issueごとに正式資料名、対象レイヤー、格納先およびレビュー完了条件を記載し、Device Connector、Device Control、Device Managerの用語を統一する。 | 誤りが判明した場合は該当Issueをレビューへ戻し、資料名、格納先および関連WBSを修正して再通知する。 | WBSGAMEN-209、WBSGAMEN-210、WBSGAMEN-266、KSNEWSYS-424、KSNEWSYS-458 | 根拠: WBSGAMEN-266 comment 784869164、784868086。 |
| R-003 | Technical | Legacy OCX・Host依存とデバイス競合 | KSNEWSYS-424で、旧VB.NETのScanner制御にスレッド競合・データ詰まりの可能性が指摘され、WindowsではKsHost、OPOS、OCX、ActiveXを使用する構成が整理されている。移行後の境界と例外処理を誤ると、実機連携時に不具合が残る。 | Monitor | High | VTI サム | Medium | High | ソースコードの確認・修正、Device Control・Host・アプリの責務確認、代表デバイスの統合テストを実施し、結果と証跡を残す。 | 問題デバイスを個別に切り分け、Device Control側での直接制御またはHost経由の対象を再整理する。 | KSNEWSYS-424、WBSGAMEN-44、WBSGAMEN-45、SHARP_MULTI_DEVICE_POS-541、SHARP_MULTI_DEVICE_POS-550、SHARP_MULTI_DEVICE_POS-552、SHARP_MULTI_DEVICE_POS-555、SHARP_MULTI_DEVICE_POS-623 | 代表デバイスとHost境界は設計・テストで再確認する。 |
| R-004 | Scope | 確定フォーマットと仕様内容の不整合 | KSNEWSYS-568のレビューで、サンプルコードと戻り値、ステートレス方針、API名称、DI、単位およびテスト期待値などの矛盾・不足が挙げられた。AI指摘をそのまま追加すると仕様書が過剰になるため、利用者視点と開発者視点で再精査が必要である。 | Monitor | High | SMJ 南 | Medium | High | 確定フォーマットに合わせ、端末アプリ開発者が実装できる最小十分な内容に絞り、サンプル、図およびテスト期待値を相互確認する。 | レビュー指摘を文書版ごとに一覧化し、矛盾のある版を再提出前に差し戻す。 | KSNEWSYS-568、WBSGAMEN-45、WBSGAMEN-46、WBSGAMEN-266 | 根拠: KSNEWSYS-568のレビュー結果および指摘対応コメント。 |
| R-005 | Resource | 統合テスト計画と実機証跡の不足 | VTI内部のSHARP_MULTI_DEVICE_POS-623では統合テストの実施計画が未確定で、2026年7月からオンサイト対応へ一時移管する旨が記録されている。WBSGAMEN-45の仕様書作成に加えてソース修正・テストが必要で、9月の完了判定に影響する可能性がある。 | Open | High | VTI サム | Medium | High | 代表デバイス、テストケース、担当、実施日、Pass/Failおよび証跡の保管場所を事前に固定し、成果物と同時に共有する。 | 未実施ケースを一覧化し、対象範囲を優先順位付けして後続の実機検証枠へ移す。 | SHARP_MULTI_DEVICE_POS-623、WBSGAMEN-45、WBSGAMEN-48、WBSGAMEN-49、WBSGAMEN-50、WBSGAMEN-51、WBSGAMEN-52、WBSGAMEN-53、WBSGAMEN-54 | 統合テストIssueでは実施計画と証跡の更新を完了条件とする。 |
