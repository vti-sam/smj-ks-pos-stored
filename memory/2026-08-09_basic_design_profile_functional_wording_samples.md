---
title: Basic Design profile functional wording and sample workbooks
project: smj-ks-pos
type: decision
status: archived
source:
  - Codex session 2026-08-09 Basic Design MAUI and device connector sample task
  - outputs/basic-design-profile-samples-20260809/MAUI_POS_システム機能一覧_サンプル.xlsx
  - outputs/basic-design-profile-samples-20260809/DeviceConnector_POS_システム機能一覧_サンプル.xlsx
tags:
  - basic-design
  - maui-pos
  - device-connector
  - terminology
  - excel
  - identifier-policy
scope: historical
captured_at: 2026-08-09
validity: historical_context
promote_to_knowledge: false
---

# Basic Design profile functional wording and sample workbooks

## Outcome

The reusable MAUI POS and device-connector Basic Design profiles keep the TIP
worksheet topology, main titles and table headers wherever the design concept
is homologous. Platform-specific content uses purpose-level Japanese function
names such as `ローカル状態保存` and `ログファイル送信` instead of assuming a
storage product, API server, HTTP method or device protocol.

`tabletposboilerplate` is not an authority for migrating these generic profile
templates. The templates do not generate sample identifier values or new ID
prefixes. Sample rows use `-`; a project deliverable may use only identifiers
from an approved project naming convention and the owning list.

The identifier audit classifies Basic Design identifiers as follows:

- Source-defined IDs such as `機能ID`, `取引ID`, `リクエストID`, `画面ID`,
  `バッチ処理ID`, `API ID`, `ファイルID`, `電文ID`, `メッセージID` and
  `コードID` are retained when the selected deliverable owns the concept.
- `バックグラウンド処理ID` and `通信ID` are conditional. They are used only
  when the project needs a stable cross-document key and has approved an owner
  and naming convention.
- `画面操作ID`, `ローカルデータ項目ID`, `コネクタ機能ID`, `操作ID`,
  `コマンドID`, `イベントID`, `デバイスID`, `設定ID` and `ログID` are not
  generic profile identifiers. The templates use the homologous TIP ID,
  logical name, document/section reference or local `No.` instead.

This policy is now part of `basic-design-authoring` and is enforced by both the
Markdown gate and the Excel renderer. Reusable templates with a forbidden
profile-added ID category or a fabricated value such as `SCR-001` fail before
workbook creation.

The policy also separates three layers. A business ID supports stable
cross-document traceability. A ViewModel property, `Command`, or `x:Name` is an
implementation reference. `AutomationId` is a UI automation test hook. The
screen template keeps the TIP header `画面項目名（物理）`, but its placeholder now
requires an existing implementation reference or `-`; it no longer asks for a
fabricated camelCase name. For MAUI/MVVM, `x:Name` is recorded only when code or
XAML directly references the element. `AutomationId` is limited to approved UI
automation targets and is managed by the test specification or test code.

Reusable profiles express storage and log behavior at purpose level. Once the
project approves a concrete mechanism, the owning Basic/Data/Interface Design
must name that mechanism; Program Specification owns class, method, file, and
code-path detail. This avoids both premature SQLite/API assumptions and vague
final designs after a decision has already been made.

Two `システム機能一覧` sample workbooks were rendered. The MAUI sample covers
local state storage, log-file transmission and conditional API invocation. The
connector sample covers device connection, command transmission, response and
asynchronous-event reception, device disconnection, local state storage and
log-file transmission.

## Evidence

- The User explicitly selected `ローカル状態保存` and `ログファイル送信` as
  understandable purpose-level terms and prohibited invented IDs or unverified
  SQLite assumptions.
- Both sample Markdown sources passed `basic_design_gate.py`.
- Both workbooks passed the Basic Design renderer semantic read-back and ZIP
  integrity checks.
- Both workbooks contain exactly `表紙`, `変更履歴`, `目次` and `1`; all pages
  were visually checked through A4 landscape PDF projections.
- The final workbook scan found every required functional term and no `TODO`,
  `TBD`, `SQLite`, `OPOS`, `USB`, `Bluetooth` or generated code-like ID value.
- The strict gate passed all 26 deliverables in each of the Spring/Web, MAUI POS
  and device-connector profiles after the identifier cleanup.
- Identifier-policy gate tests passed 38/38, profile topology tests 5/5,
  derived-profile boundary tests 10/10 and Excel renderer tests 19/19.
- The strict gate passed all 78 deliverables (26 per profile). Skill validation,
  skill-quality ratchets, rule lint and workspace verification passed.
- Both sample workbooks were regenerated after the rule change and read back
  with no forbidden profile-added ID terms.

## Unresolved

The generic samples do not decide a storage product, physical storage path,
log destination, API endpoint, HTTP method, device model or communication
protocol. A project-specific owner document must record those facts after an
approved implementation decision.

## Retrieval keys

- TIP-compatible Basic Design MAUI POS sample
- device connector system function list sample
- ローカル状態保存
- ログファイル送信
- no invented identifiers
- Basic Design identifier necessity gate
- conditional communication ID
- no unverified SQLite or device protocol
