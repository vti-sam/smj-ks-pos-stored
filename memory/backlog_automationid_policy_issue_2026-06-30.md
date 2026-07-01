---
title: Backlog AutomationId Policy Issue Created
project: smj-ks-pos
type: decision
status: archived
source:
  - Backlog issue KSNEWSYS-554 created on 2026-06-30
  - scratch/backlog_automationid_policy_issue.yaml
  - scratch/backlog_automationid_policy_issue_update.yaml
  - scratch/backlog_automationid_policy_issue_proposal_reason.yaml
tags:
  - backlog
  - maui
  - appium
  - nunit
  - automationid
scope: historical
captured_at: 2026-06-30
validity: historical_context
promote_to_knowledge: false
---

Tạo ticket KH `KSNEWSYS-554` để xác nhận phương châm gắn `AutomationId` cho MAUI XAML UI ngay từ đầu nếu dự án quyết định sử dụng .NET MAUI.

Thông tin đã tạo:

- Backlog role: customer
- Issue type: `QA（質問・確認）`
- Summary sau cập nhật: `MAUI XAML UIにおけるAutomationId付与方針の確認`
- Assignee: `VTI サム`
- Priority: `中`
- Category: `UI/UX`, `共通基盤`
- Status sau khi tạo: `未対応`
- Delay impact custom field: `なし`
- Target group custom field: `全体`

Nội dung ticket nêu rằng Appium + NUnit có thể hỗ trợ tự động test UI cho MAUI, gồm di chuyển màn hình, dialog, thao tác nhập và chụp screenshot; để tích hợp thuận lợi về sau, đề xuất đặt `AutomationId` cho Page, View chính và các component thao tác trong XAML từ giai đoạn đầu.

Cập nhật sau khi rà quy trình Backlog: trong 100 issue mới nhất chỉ có `KSNEWSYS-554` do `VTI サム` tạo, nên ticket được chỉnh lại nội dung theo hướng "VTI tạm起票, nhờ SMJ xác nhận nội dung, route và cách xử lý". Chưa đổi assignee, vẫn giữ `VTI サム` để User tự assign hỏi `SMJ 小林` sau.

Cập nhật nội dung cuối: description mở đầu bằng đề xuất tối ưu chi phí và chủ động tích hợp UI autotest sau này, không tách thành mục `提案理由`. Nội dung nêu lý do `AutomationId` dễ bị bỏ sót trong MAUI/Clean Architecture/MVVM vì không bắt buộc cho app chạy, rồi dừng ở mục `対応案`.
