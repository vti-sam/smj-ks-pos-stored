---
title: Chuẩn hóa thuật ngữ, chiều cao dòng và độ rộng cột ngày cho Program Spec và Basic Design 2026-07-30
project: smj-ks-pos
type: lesson
status: archived
source:
  - project-store/artifacts/reports/program-specs/PS-01_タブレットDCS_デバイスコネクタ制御方式/
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
  - project-store/artifacts/reports/architecture/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図.md
tags:
  - program-spec
  - basic-design
  - customer-display
  - terminology
  - excel-row-height
  - revision-history
  - date-span3
scope: historical
captured_at: 2026-07-30
validity: historical_context
promote_to_knowledge: false
---

# Chuẩn hóa thuật ngữ, chiều cao dòng và độ rộng cột ngày cho Program Spec và Basic Design 2026-07-30

## Kết quả

- `PS-DEVICE-01` phiên bản 0.0.2 dùng thống nhất `カスタマディスプレイ` theo `ARCH-HOST-01`; cách viết cũ `カスタマーディスプレイ` đã được loại bỏ khỏi bundle PS-01 gồm 17 tài liệu.
- `PS-DEVICE-04` phiên bản 0.0.2 thay cụm `アクセス契約` chưa tự nhiên bằng mô tả giao diện định nghĩa phương thức truy cập kho lưu trữ cấu hình.
- Đã render 17 workbook PS-01 thành batch candidate mới với quy tắc tính chiều cao dòng wrap tương đương Basic Design. Read-back xác nhận 5.482 ô nội dung có wrap và đủ chiều cao dòng.
- Quy tắc fixed-span dùng chung của Basic Design Excel đã đổi cột `日付` từ 2 thành 3 ô. Program Spec kế thừa quy tắc này; riêng header trang `作成日` và `改訂日` được giữ nguyên.
- Đã render thêm batch candidate `2026-07-30_date-span3` gồm 17 Program Spec và 2 Basic Design (`ARCH-HOST-01`, `ARCH-DEVICE-01`).

## Bằng chứng

- `project-store/artifacts/reports/program-specs/PS-01_タブレットDCS_デバイスコネクタ制御方式/PS-DEVICE-01_タブレットPOS_デバイス制御_デバイスマネージャー_プログラム仕様書.md`
- `project-store/artifacts/reports/program-specs/PS-01_タブレットDCS_デバイスコネクタ制御方式/PS-DEVICE-04_タブレットPOS_デバイス制御_設定ストレージインターフェース_プログラム仕様書.md`
- `project-store/artifacts/reports/program-specs/PS-01_タブレットDCS_デバイスコネクタ制御方式/draft/2026-07-30_wrap-fix/`
- `project-store/artifacts/reports/program-specs/PS-01_タブレットDCS_デバイスコネクタ制御方式/draft/2026-07-30_date-span3/`
- `project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/draft/2026-07-30_date-span3/`
- `project-store/artifacts/reports/architecture/ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図/draft/2026-07-30_date-span3/`
- Validation Program Spec đạt 17/17 tài liệu Markdown; audit thuật ngữ đạt cho toàn bộ 17 target so với `ARCH-HOST-01`.
- Read-back batch wrap đạt cho 17 file và 85 sheet: không còn thuật ngữ cũ, comment, marker xuống dòng, lỗi print setup hoặc dòng wrap thiếu chiều cao.
- Visual review batch wrap đã kiểm tra 133 trang PDF và không thấy nội dung ô bị cắt.
- Read-back batch date-span3 đạt trên 19 workbook và 112 sheet: 19 tiêu đề `日付` cùng 92 giá trị ngày đều merge đúng 3 ô; 118 vùng header trang giữ nguyên.
- Visual review đã kiểm tra trang `01_改訂履歴` của đủ 19 workbook date-span3 và không phát hiện lỗi layout.

## Chưa xử lý

- Các workbook mới vẫn là candidate trong `draft/2026-07-30_wrap-fix/` và `draft/2026-07-30_date-span3/`; chưa thay thế workbook đã review hoặc bản chính thức.

## Từ khóa truy xuất

- PS-DEVICE-01
- PS-DEVICE-04
- PS-01_タブレットDCS_デバイスコネクタ制御方式
- ARCH-HOST-01
- ARCH-DEVICE-01
- カスタマディスプレイ
- カスタマーディスプレイ
- アクセス契約
- 日付
- D5:F5
- date-span3
- 2026-07-30_wrap-fix
- 2026-07-30_date-span3
