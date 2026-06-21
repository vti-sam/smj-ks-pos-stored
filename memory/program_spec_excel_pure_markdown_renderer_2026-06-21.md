---
title: Program Spec Excel Pure Markdown Renderer Update
project: smj-ks-pos
type: gotcha
status: archived
source:
  - skills/program-spec-excel/scripts/spec_parse.py
  - skills/program-spec-excel/scripts/spec_validate.py
  - project-store/artifacts/reports/program-specs/PS-01_タブレットPOS_ホストデバイス制御方式/
tags:
  - program-spec
  - excel-render
  - pure-markdown
  - overload
  - argument-mapping
scope: historical
captured_at: 2026-06-21
validity: historical_context
promote_to_knowledge: false
---

# Program Spec Excel Pure Markdown Renderer Update

`skills/program-spec-excel` đã được mở rộng để parse Pure Markdown Program Specs và normalize về 5 sheet Excel cũ trước khi render. `spec_render.py` không đổi layout/style; phần tương thích mới nằm chủ yếu ở `spec_parse.py`.

Gotcha quan trọng: không dùng method name làm key duy nhất khi map `メソッド一覧` sang `メソッド詳細`, vì C# source có overloaded constructors/methods như `NamedPipeDeviceHostAdapter`, `KsHost`, `Device_End`. Mapping phải dựa trên `No + thứ tự`, còn validator vẫn kiểm tra method list và method definition khớp 1:1 theo thứ tự.

`Evidence` column và HTML comment `spec-evidence` chỉ dùng cho audit trong Markdown, không được render vào Excel.

Sau khi tài liệu PS-HOST được xác định là dữ liệu chính thức gửi khách hàng, `japanese-class` cần coi cả Markdown là customer-facing deliverable: không để `CodeGraph`, `Pure Markdown`, `Evidence`, `spec-evidence`, `status: draft`, `VTI-SAM`, source-read/generator notes hoặc câu placeholder kiểu `対象 method の実行条件を確認する` trong MD/XLSX. Evidence/source line nên giữ ở audit nội bộ ngoài tài liệu giao KH.

Với Excel `メソッド定義`, nhiều `引数` không nên nối bằng newline trong cùng một cell vì nhìn giống chữ rời (`object`, `sender`, `EventArgs`, `e`). Renderer nên tách riêng từng argument thành subrow chỉ trong 3 cột `型` / `論理名` / `物理名`; các cột còn lại của cùng method merge dọc để vẫn thể hiện một method là một khối.

`引数` の `論理名` và `物理名` phải là hai nghĩa khác nhau khi có thông tin nghiệp vụ. Pure Markdown parser ưu tiên bảng `引数` nếu method detail có bảng `型` / `論理名` / `物理名`; nếu chỉ có `シグネチャ`, parser chỉ fallback từ signature. Với event handler C# phổ biến, không được để `論理名=sender/e`; chuẩn hiện tại là `object / イベント発生元 / sender` và `EventArgs / イベント情報 / e`.

Layout chuẩn mới của `methoddef` trong sheet 40 cột là `2,1,4,3,3,3,3,3,8,2,8`: `型=H:J`, `論理名=K:M`, `物理名=N:P`. Không dùng lại span cũ `2,1,4,3,3,2,3,3,8,2,9` vì làm `物理名` hẹp hơn `論理名`.

Sau khi sửa triệt để tham số, 11 PS-HOST Markdown phải có bảng `引数` tường minh cho method có tham số. Không dựa vào signature để sinh logical name cho các biến như `processor`, `request`, `arguments`, `returns`. Validator `japanese-class` phải fail nếu `論理名` trống, `-`, hoặc giống hệt `物理名`; đây là guard bắt buộc để Excel khách hàng không hiển thị tên biến vật lý ở cột logical name.

`表紙` の `役割/概要` lấy từ đoạn đầu `クラス概要`. Đây phải là câu basic-design giải thích vai trò tổng thể cho người đọc lần đầu, không bắt đầu bằng tên class/method/field hoặc inline code. Chi tiết implementation như tên method/field nên để ở `メソッド一覧`, `メソッド詳細`, hoặc các section phía sau. Validator hiện fail nếu `役割/概要` chứa tên class/method/field vật lý đã khai báo trong cùng spec.
