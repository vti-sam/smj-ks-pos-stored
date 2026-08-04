---
schema_version: 3
table: communications
key: id
mode: replace
---

# 連絡管理

| id | type | title | expectations | communication_channel | frequency | format | owner | notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C-001 | Communication Rule | KSNEWSYS：対象範囲・判断事項の連絡 | 対象範囲、成果物名称、用語および顧客確認事項をIssue上で確定する。 | Backlog KH（KSNEWSYS） | 判断・変更発生時 | Issueコメント、明示的な宛先、関連Issueリンク | SMJ 南 | 参照: KSNEWSYS-424、KSNEWSYS-458、KSNEWSYS-472、KSNEWSYS-568。 |
| C-002 | Communication Rule | WBSGAMEN：成果物・レビュー進捗 | 作業内容、成果物の格納先、レビュー状態、完了条件およびKs様承認要否を更新する。 | Backlog KH（WBSGAMEN） | 成果物共有・状態変更時 | Issueフィールド、コメント、成果物格納先 | SMJ 南 | 参照: WBSGAMEN-209、WBSGAMEN-210、WBSGAMEN-211、WBSGAMEN-266。 |
| C-003 | Communication Rule | SHARP_MULTI_DEVICE_POS：実装・テスト進捗 | ソースコード確認・修正、設計書作成、テスト計画および実施結果を内部で共有する。 | Backlog VTI（SHARP_MULTI_DEVICE_POS） | 作業開始・阻害要因・成果物更新時 | Issueコメント、実装・テスト結果、関連KH/WBSリンク | VTI サム | 参照: SHARP_MULTI_DEVICE_POS-541、-550、-552、-555、-623、-544。 |
| C-004 | Key Notes | 成果物の随時連携 | 作成済み資料をまとめて待たず、完成したものから格納先とともに連携する。 | Backlogコメント＋納品フォルダ | 成果物完成時 | 納品先パス、資料名、レビュー依頼 | VTI サム | 格納先: KsTabletPOS\\8000_受取資料\\VTI\\納品成果物\\2026年\\7月\\0387-603007_0387-604401。参照: WBSGAMEN-209、WBSGAMEN-266、KSNEWSYS-458。 |
| C-005 | Communication Rule | レビュー回付ルート | 起票後、チームリーダー、PMO、責任者、PMの順に確認し、レビュー完了と承認状態を記録する。 | Backlog Issue | レビュー依頼・指摘対応時 | コメント、担当者変更、ステータス変更 | SMJ 南 | KSNEWSYS-568に記載された回付ルートを現行レビューの基準とする。 |
