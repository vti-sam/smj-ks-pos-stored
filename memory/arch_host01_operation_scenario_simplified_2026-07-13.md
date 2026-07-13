---
title: ARCH-HOST-01 operation scenario diagram simplified
project: smj-ks-pos
type: decision
status: archived
source:
  - User decision 2026-07-13
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.xlsx
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_6.1_運用シナリオ図.png
tags:
  - ARCH-HOST-01
  - operational scenario
  - Mermaid
  - Excel
  - diagram simplification
scope: historical
captured_at: 2026-07-13
validity: historical_context
promote_to_knowledge: false
---

# Kết quả

Sơ đồ `6.1 運用シナリオ図` được rút gọn từ 30 khối xử lý/quyết định xuống 20 khối, giữ ba pha `起動`, `デバイス操作`, `終了` và 23 quan hệ có hướng.

Sơ đồ chỉ giữ luồng chính và các điểm làm thay đổi control flow:

- Chuẩn bị setting, connector, communication và device trước khi bắt đầu vận hành.
- Phân biệt response bình thường/thất bại với communication failure.
- Chỉ dừng process do app sở hữu và force-terminate khi quá thời gian chờ.

Các giá trị retry, timeout, no-resend, event reconnect và nhánh lỗi chi tiết tiếp tục được quản lý trong `図の補足` và mục 6.2, không đưa trở lại thành các node riêng trong 6.1 trừ khi chúng làm thay đổi luồng chính.

# Verify

- Markdown lint, generic Basic Design gate và profile `arch-host` đều đạt.
- Mermaid audit đạt `shapes=23/23`, `edges=23/23`.
- Hai Office Script đều qua validator với 3 lane và 0 nested section.
- Offline PDF/PNG đã được render và kiểm tra trực quan.

# Sửa vị trí nhãn nhánh

Sau khi rút gọn, các nhãn `はい／いいえ` bị trôi ra giữa connector dài hoặc đầu lane do renderer dùng trung điểm connector và thứ tự vị trí theo hash ID.

Renderer được sửa để nhận diện riêng `はい／いいえ`, suy ra source/target của edge và neo nhãn gần đoạn đầu rời khỏi decision source. Các nhãn nghiệp vụ khác tiếp tục dùng thuật toán cũ. Quy tắc này được áp dụng đồng nhất cho offline PNG/PDF và Office Script.

Kiểm tra sau sửa:

- 16 unit/regression test của pipeline đều đạt.
- Ba Mermaid template catalog đều đạt audit.
- Artifact 6.1 được render lại và kiểm tra trực quan tại các decision `S4`, `O4`, `O6`, `T2`, `T4`.

# Render Excel Basic Design

Theo xác nhận của User, workbook Basic Design chỉ được render từ Markdown, không chèn sơ đồ bằng hình ảnh hoặc Office Script. Các sheet sơ đồ `_01` giữ nguyên vùng trống dự phòng theo template.

Workbook phiên bản `0.3.2` có 15 sheet, `images=0` và `charts=0`. Markdown validation, ZIP integrity, read-back metadata và kiểm tra trực quan bản PDF A4 ngang đều đạt.
