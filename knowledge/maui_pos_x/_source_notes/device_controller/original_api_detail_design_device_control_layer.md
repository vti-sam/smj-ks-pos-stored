---
title: Original API Detail Design Device Control Layer
project: maui_pos_x
type: architecture
status: confirmed
source:
  - migrated from memory/maui_pos_x/device_controller/_source_notes/original_api_detail_design_device_control_layer.md
tags: [maui_pos_x, devices, device_controller, source_notes, original_api_detail_design_device_control_layer]
---

# Thiết kế chi tiết

## Thông tin cơ bản

| Mục | Nội dung |
| ---------------------- | -------------------------------------------------- |
| Class ID | DC-API-PUB-001 |
| Namespace | MauiPOSX.DeviceCtrl |
| Tên Class (Logical) | Danh sách API công khai lớp điều khiển thiết bị (Device Control Layer API Public Interfaces) |
| Tên Class (Physical) | DeviceManager / IXXXStrategy |
| Access Modifier | public |
| Base Class | - |
| Interface Class | - |

## Lịch sử chỉnh sửa

| No | Ngày chỉnh sửa | Người chỉnh sửa | Lý do chỉnh sửa | Tóm tắt nội dung chỉnh sửa |
| --- | --------- | ------- | -------- | -------- |
| 1 | 2026/4/14 | VTI_SAM | Tạo mới | Tạo mới tài liệu |

## Tổng quan

Đây là tài liệu thiết kế các "API công khai (các method)" được cung cấp để điều khiển các thiết bị ngoại vi như máy in hóa đơn và máy thối tiền (釣銭機 - Cash Changer) từ Application Layer (Giao diện người dùng UI hoặc ViewModel).\
Lập trình viên ứng dụng sẽ sử dụng các method lấy đối tượng của **DeviceManager** được mô tả trong tài liệu này để lấy interface của thiết bị tương ứng và thực hiện các thao tác đã định nghĩa.\
※ Tài liệu này được tổ chức giúp lập trình viên thao tác với thiết bị một cách dễ dàng mà không cần quan tâm đến các phương thức giao tiếp kỹ thuật phức tạp bên dưới (như NamedPipe, v.v.).

---

## Constructor

> ※ Không có định nghĩa constructor cụ thể do đây là việc gọi interface và singleton object. Truy cập thông qua `DeviceManager.Instance`.

---

## Danh sách Hằng số / Biến / Property

| Access Modifier | Tên thuộc tính (Logical) | Kiểu dữ liệu | Tên thuộc tính (Physical) | Tổng quan |
| ------ | -------------- | --- | -------------- | ---- |
| - | - | - | - | - |

---

## Danh sách Method

> ※ Trích xuất các API lấy đối tượng chính có thể gọi từ Application Layer.

| Access Modifier | Tên Method (Logical) | Tên Method (Physical) | Tổng quan |
| ------ | -------------------------------- | ------------------------------- | -------------------------------------------- |
| public | Đọc file cấu hình | LoadConfigAsync | Đọc file thiết lập thiết bị (`json`). |
| public | Khởi tạo thiết bị | InitializeFromConfig | Khởi tạo môi trường bằng thông tin thiết lập đã đọc. |
| public | Lấy I/F điều khiển máy in | GetPrinterStrategyAsync | Lấy interface dùng cho việc điều khiển máy in. |
| public | Lấy I/F điều khiển máy thối tiền | GetCashChangerStrategyAsync | Lấy interface dùng cho việc điều khiển máy thối tiền (Cash Changer). |
| public | Lấy I/F điều khiển thiết bị thanh toán | GetPaymentStrategyAsync | Lấy interface dùng cho việc điều khiển thiết bị thanh toán. |
| public | Lấy I/F điều khiển máy quét | GetScannerStrategyAsync | Lấy interface dùng cho máy quét barcode. |
| public | Lấy I/F điều khiển màn hình phụ | GetCustomerDisplayStrategyAsync | Lấy interface dùng cho màn hình hiển thị phụ phía khách hàng. |
| public | Lấy I/F điều khiển két tiền | GetDrawerStrategyAsync | Lấy interface dùng cho két tiền (Cash Drawer). |

---

## Chi tiết Method (IPrinterStrategy - Liên quan đến máy in)

Đây là các thao tác thực tế có thể gọi từ mỗi interface. Ở đây, chúng tôi trình bày các method chính của máy in và máy thối tiền làm đại diện.

### Tên Method: In hóa đơn (In receipt)

#### Giá trị trả về

| Kiểu dữ liệu | Tổng quan |
| ------------------------ | -------------- |
| Task\<PrinterResponse\> | Trạng thái in thành công/thất bại |

#### Tham số

| Access Modifier | Kiểu dữ liệu | Tên tham số (Logical) | Tên tham số (Physical) | Tổng quan |
| ------ | -------- | -------------- | -------------- | ------------------ |
| - | Receipt? | Thông tin hóa đơn | receipt | Nội dung dữ liệu cần in |

#### Exception xảy ra

| Kiểu dữ liệu | Tổng quan |
| --- | ---- |
| - | - |

#### Tóm tắt xử lý

| Số thứ tự | Tóm tắt xử lý |
| ---- | -------------------------------------------------------------------------------------------- |
| 1 | Gửi dữ liệu in đến máy in và phát hành hóa đơn (receipt) vật lý. |

---

### Tên Method: Mở két tiền (Open Drawer)

#### Giá trị trả về

| Kiểu dữ liệu | Tổng quan |
| ------------------------ | -------------- |
| Task\<PrinterResponse\> | Trạng thái xử lý thành công/thất bại |

#### Tham số

| Access Modifier | Kiểu dữ liệu | Tên tham số (Logical) | Tên tham số (Physical) | Tổng quan |
| ------ | --- | -------------- | -------------- | ------------------ |
| - | int | Số hiệu két tiền | drawer | Số hiệu của két tiền mục tiêu |
| - | int | Thời gian xung mạch | time | Độ dài của xung mạch (pulse) gửi đi |

#### Exception xảy ra

| Kiểu dữ liệu | Tổng quan |
| --- | ---- |
| - | - |

#### Tóm tắt xử lý

| Số thứ tự | Tóm tắt xử lý |
| ---- | -------------------------------------------------------------- |
| 1 | Gửi tín hiệu đến két tiền được kết nối thông qua máy in để mở ngăn kéo. |

---

## Chi tiết Method (ICashChangerStrategy - Liên quan đến máy thối tiền tự động)

### Tên Method: Bắt đầu giao dịch (Begin Transaction)

#### Giá trị trả về

| Kiểu dữ liệu | Tổng quan |
| ---- | ---- |
| Task | - |

#### Tham số

| Access Modifier | Kiểu dữ liệu | Tên tham số (Logical) | Tên tham số (Physical) | Tổng quan |
| ------ | --- | -------------- | -------------- | ---- |
| - | - | - | - | - |

#### Exception xảy ra

| Kiểu dữ liệu | Tổng quan |
| --- | ---- |
| - | - |

#### Tóm tắt xử lý

| Số thứ tự | Tóm tắt xử lý |
| ---- | ------------------------------------------------------------ |
| 1 | Bắt đầu "trạng thái giao dịch" chấp nhận tiền mặt từ khách hàng trên máy thối tiền. |

---

### Tên Method: Thối tiền (Dispense Change)

#### Giá trị trả về

| Kiểu dữ liệu | Tổng quan |
| ---- | ---- |
| Task | - |

#### Tham số

| Access Modifier | Kiểu dữ liệu | Tên tham số (Logical) | Tên tham số (Physical) | Tổng quan |
| ------ | ------- | -------------- | -------------- | -------------- |
| - | string? | Số tiền xuất ra | amount | Số tiền thối được chỉ định |

#### Exception xảy ra

| Kiểu dữ liệu | Tổng quan |
| --- | ---- |
| - | - |

#### Tóm tắt xử lý

| Số thứ tự | Tóm tắt xử lý |
| ---- | ---------------------------------------------------------- |
| 1 | Thối tiền vật lý từ máy thối tiền tự động với số tiền chỉ định trong tham số. |
