---
title: ARCH-HOST-01 target design and code alignment
project: smj-ks-pos
type: architecture
status: archived
source:
  - Codex session 2026-07-11 ARCH-HOST-01 target-design review
  - project-store/artifacts/reports/architecture/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書/ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
  - sources/tabletposboilerplate/TabetPos.Applications/Application/Devices/HostProcessManager.cs
  - sources/tabletposboilerplate/TabetPos.DeviceCtrl/Platforms/Windows/Modules/NamedPipeClient.cs
  - sources/tabletposboilerplate/TabetPos.DeviceCtrl/Platforms/Windows/Modules/NamedPipeEventReceiver.cs
  - sources/tabletposboilerplate/TabetPos.Host/src/TabletHost/DeviceHost/NamedPipeCommandServer.cs
tags:
  - ARCH-HOST-01
  - basic design
  - target design
  - named pipe
  - process lifecycle
scope: historical
captured_at: 2026-07-11
validity: historical_context
promote_to_knowledge: false
---

# Kết quả

ARCH-HOST-01 được nâng lên bản 0.2.24 theo nguyên tắc Basic Design mục tiêu là chuẩn trước, mã nguồn phải theo thiết kế. Tài liệu chính thức không còn sheet xác nhận, trạng thái đã/chưa triển khai, câu hỏi mở hoặc memo nội bộ. Các quyết định được nhập trực tiếp vào chương chức năng, lifecycle, interface, config, error và log; bảng mapping chuyển thành `19_実装対応表`.

Thiết kế lifecycle quy định ứng dụng chỉ dừng và force-kill process do chính ứng dụng khởi động. Sau khi khởi động process, ứng dụng gửi `HealthCheck` tối đa 10 giây và chỉ hoàn tất xác nhận khi command pipe cùng device manager đã sẵn sàng. `Kill` và `ReStart` chỉ được thực thi sau khi response đã được ghi xong và chờ 500 ms.

Luồng IPC mục tiêu tách communication exception khỏi Host/device failure response. Kết nối command pipe chỉ retry trước khi ghi request, tối đa 3 lần, cách 500 ms; sau khi đã gửi request thì không tự retry để tránh chạy thiết bị hai lần. Legacy request được parse DeviceId trước khi chọn queue và được Host gán RequestId để trace.

DeviceCtrl có event receiver cho `TabetPos.Host.Event`, tự reconnect mỗi giây và phát event cho application subscriber. Log communication chỉ ghi metadata, không ghi raw Payload/request/response. Windows printer bị bỏ khỏi `activeDevices` của phạm vi ban đầu; nhánh MSR bị bỏ khỏi KeepAlive. Runtime config lỗi sẽ warning và fallback về package config; package config lỗi làm dừng khởi tạo ứng dụng.

# Kiểm tra

- Markdown lint, ARCH-HOST strict gate và Excel validate đều đạt.
- Hai SVG 5.1.2 và 9.1 được render lại bằng Mermaid Dagre, parse XML thành công và đã kiểm tra trực quan.
- Workbook gốc có 24 sheet, không chứa Mermaid thô, sheet xác nhận cũ, trạng thái triển khai hoặc lỗi công thức; toàn bộ sheet đã được render để kiểm tra trực quan.
- Host core test project và DeviceCtrl Windows build thành công, không có compile error.
- Test assembly không chạy được trên macOS vì thiếu `Microsoft.WindowsDesktop.App 10.0`; đây là giới hạn runtime của môi trường, không phải lỗi compile.
- Workspace rule/knowledge lint và workspace verify đều đạt.
