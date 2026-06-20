---
title: OCX OPOS Active X
project: ks_host
type: architecture
status: confirmed
source:
  - migrated from memory/ks_pos_boilerplate/ks_host/devices/ocx_opos_active_x.md
tags: [ks_host, devices, ks_pos_boilerplate, ocx_opos_active_x]
---

# COM / OCX / ActiveX / OPOS

## Ý nghĩa

- COM: Mô hình nhị phân component/interface của Windows với registry, CLSID/ProgID, HRESULT, và apartment threading.
- OCX/ActiveX: Các control COM có thể nhúng trong WinForms; repo này sử dụng các assembly `AxInterop.*` và `Interop.*` được tạo tự động.
- OPOS: Tiêu chuẩn API ngoại vi POS; OPOS classic trên Windows thường dựa trên COM/OCX.

## Bề mặt thiết bị hiện tại

- CashChanger RT300:
  - `AxInterop.OposCashChanger_CCO.dll`
  - Tín hiệu OPOS CCO mạnh nhất.
  - Bề mặt lớn: nạp tiền, rút tiền, DirectIO, kết quả bất đồng bộ, sự kiện trạng thái.
- CashDrawer Sharp:
  - `AxInterop.DRAWERLib.dll`, `Interop.DRAWERLib.dll`
  - Bề mặt nhỏ, chủ yếu là `OpenDrawer`.
- LineDisplay Sharp:
  - `AxInterop.LINEDISPLAYLib.dll`, `Interop.LINEDISPLAYLib.dll`
  - Hiển thị, xóa, cuộn, DirectIO.
- Scanner DENSO:
  - `AxInterop.SCANNERLibDENSO.dll`
  - Hướng sự kiện/dữ liệu; dữ liệu quét được ghi nhận và đọc lại bằng lệnh sau đó.

## Kiến thức về lỗi

- Các trường public hiện tại là raw: `ResultCode`, `ResultCodeExtended`, `ErrorMessage`, `ReturnValue`.
- Các hằng số OPOS nằm trong `KsDeviceConst`.
- COM HRESULT đã biết: `0x8001010D` / `RPC_E_CANTCALLOUT_ININPUTSYNCCALL`; xuất hiện xung quanh các cuộc gọi đồng bộ đầu vào COM/OLE.
- Các giá trị trả về magic như `-1`, `-3`, `-9` xuất hiện trong code thiết bị; không diễn giải lại trên phạm vi toàn cục mà không có bằng chứng cục bộ.

## Quy tắc ranh giới

- Giữ các ngoại lệ `AxInterop.*`, `Interop.*`, COM, HRESULT, mã OPOS và trạng thái đặc thù của nhà cung cấp bên trong code hạ tầng/adapter thiết bị.
- Mô hình hướng tới ứng dụng/core cuối cùng nên sử dụng các kết quả/lỗi thiết bị đã được chuẩn hóa.
- Thứ tự di trú đề xuất:
  - CashDrawer: nhỏ nhất, hướng lệnh.
  - LineDisplay: lớn hơn nhưng hầu hết vẫn đồng bộ.
  - Scanner: hướng sự kiện, có trạng thái.
  - CashChanger: lớn nhất và nhiều rủi ro nhất.
