---
title: TC-IT-DEVICE-02 90-case testcase replacement
project: smj-ks-pos
type: lesson
status: archived
source:
  - project-store/artifacts/reports/testcases/TC-01_タブレットPOS_デバイス制御テストケース/TC-IT-DEVICE-02_タブレットPOS_実機デバイスコマンド_結合テストケース.md
  - sources/TabletPosBoilerplate/TabletPos.Applications/Presentation/ViewModels/DeviceIntegrationTestViewModel.cs
  - sources/TabletPosBoilerplate/TabletPos.Applications/Presentation/Views/DeviceIntegrationTestPage.xaml
  - sources/TabletPosBoilerplate/TabletPos.DeviceContracts/DeviceProtocol.cs
  - sources/TabletPosBoilerplate/TabletPos.DeviceContracts/NamedPipeContracts.cs
  - sources/TabletPosBoilerplate/TabletPos.DeviceContracts/OposReceiptEncoding.cs
  - sources/TabletPosBoilerplate/TabletPos.DeviceCtrl/Platforms/Windows/Modules/OposNamedPipeCommandClient.cs
  - sources/TabletPosBoilerplate/TabletPos.Host/src/TabletDevice/DeviceBase/DeviceBase.cs
tags:
  - tabletpos
  - testcase
  - device-command
  - integration-test
  - id-mapping
scope: historical
captured_at: 2026-08-20
validity: historical_context
promote_to_knowledge: false
---

# TC-IT-DEVICE-02 90-case testcase replacement

## Outcome

- `TC-IT-DEVICE-01` cũ không còn là testcase hiện hành và đã được thay thế bằng `TC-IT-DEVICE-02`.
- Markdown canonical mới chứa 90 testcase của bộ lệnh thiết bị thật, chia thành 7 sheet: `釣銭機コマンド` 42 case, `カスタマーディスプレイ` 18 case, `プリンターコマンド` 9 case, `キャッシュドロア` 10 case, `決済端末コマンド` 5 case, `バーコードスキャナー` 3 case và `専用キーボード` 3 case.
- ID được giữ nguyên theo workbook nguồn; không renumber theo vị trí sheet và không ghép mapping với bộ `TC-IT-DEVICE-01` cũ.
- Snapshot thực thi giữ 49 kết quả `Pass`; `IT-DEVICE-038`, `IT-DEVICE-075`, `IT-DEVICE-078`, `IT-DEVICE-079` và `IT-DEVICE-085` là `N/A`; tester `Dat` được ghi cho cả 54 dòng có kết quả. 36 case còn lại để trống, không tự ghi `Pass` khi chưa chạy trên thiết bị thật.
- Nội dung `IT-DEVICE-016` được sửa expected state từ `入金確定済み` thành `入金確定`; `IT-DEVICE-038` ghi rõ nút bị vô hiệu hóa vì thiết bị hiện tại có `CapDescriptors=false` và không hỗ trợ `SetDescriptor`.
- Setup của `IT-DEVICE-029` được chốt thành DirectIO đọc trạng thái với command `10`, numeric data `128`, string rỗng. Với `IT-DEVICE-073`, màn hình test App tự gọi `GetCashCounts` ngay trước khi chạy và truyền nguyên chuỗi vừa nhận sang `AdjustCashCounts` để không đổi tồn quỹ. `IT-DEVICE-079` là `N/A` tạm thời vì chưa có firmware đã xác nhận dành cho thiết bị test.
- `IT-DEVICE-038`, `075`, `078` và `085` ghi rõ lý do `N/A` theo giới hạn hoặc điều kiện xác nhận của thiết bị test và Service Object hiện tại; `079` ghi rõ chưa có firmware đã xác nhận.
- Các thay đổi Host từng thử cho `RetrieveStatistics` và `GetProperties` đã được revert để không thay đổi hành vi runtime. `IT-DEVICE-052` chỉ kiểm tra absolute path, định dạng BMP không nén và dùng width OPOS `-11` trong màn hình test App; DeviceCtrl, Host và runner không đổi cho case này. `IT-DEVICE-073` cũng chỉ đổi luồng màn hình test App. Lỗi mất Named Pipe hoặc OPOS `ResultCode=101` làm riêng màn hình test xóa session cũ và chuyển về `Disconnected`; kết quả log test hiển thị nhất quán `成功` hoặc `失敗`.
- Ngày 2026-08-21, boundary tham số test được rà lại trên luồng caller → DeviceCtrl → Host. `DisplayText`/`DisplayTextAt` nhận `attribute`, `ScrollText` nhận cả `direction` và `units` từ caller; App giữ default testcase. DeviceCtrl không còn overload tự gán descriptor, cửa sổ hoặc DirectIO mẫu. Dữ liệu ảnh mock và chuỗi demo iOS đã được xóa khỏi DeviceCtrl; ảnh iOS phải do caller truyền bằng Base64 và kích thước được đọc từ PNG. Host không còn fallback `CheckHealth=1`, DirectIO/WaitForClose về `0` hoặc chuỗi rỗng khi thiếu payload mà trả `OPOS_E_ILLEGAL`.
- Màn hình `DeviceIntegrationTest` hiện hiển thị và truyền trực tiếp các default test thay cho literal ẩn: recovery `EndDeposit Success=3`; Customer Display `ScrollText direction=1`, `units=1`, `RefreshWindow window=1`; printer station `2`, JAN13 `4901234567894/104`, JAN8 `49012347/103`, barcode `height=80`, `width=2`, `alignment=-2`, `textPosition=-12`, bitmap `width=-11`, cut `100%`, QR data `TABLETPOS-DEVICE-TEST`. `CashDispenseChange` dùng default an toàn `totalAmount=0`; DirectIO của `IT-DEVICE-029` mở sẵn `command=10`, `data=128`, string rỗng.
- Markdown testcase đã được đồng bộ với các default nhìn thấy trên App; các lỗi chính tả `TABETPOS` trong dữ liệu Customer Display/Printer được sửa thành `TABLETPOS`. `IT-DEVICE-052` ghi đúng BMP không nén, absolute path, station `2`, width `-11` và alignment `-2` mà không yêu cầu kiểm tra chi tiết nội dung ảnh.
- Ngày 2026-08-21, timeout command mặc định được chốt tại một source chung là `DeviceCommandDefaults.CommandTimeoutMilliseconds=30000`. Timeout kết nối Named Pipe giữ riêng `5000`; nghiệp vụ in receipt và CAFIS giữ override có tên `300000`. Claim OPOS, Host health/stop response, DeviceCtrl và integration runner đều dùng contract này; không còn `OposClaimTimeoutMilliseconds=5000`, `Claim(0)` hoặc cộng chồng timeout thiết bị với timeout mặc định.
- Project trung lập `TabletPos.DeviceContracts` hiện sở hữu Named Pipe DTO, pipe name, message/device/method ID, payload key, timeout và OPOS printer values. DeviceCtrl, Application, Host, AppStopServer và runner tham chiếu cùng contract thay vì giữ literal/DTO riêng.
- Các clone an toàn đã được gom: năm Windows OPOS strategy dùng `OposNamedPipeCommandClient`; hai wrapper COM reflection dùng `LateBoundComObject`; ba bộ OPOS property dùng common property set; result/failure metadata dùng writer chung; receipt text/QR encoding dùng chung giữa App và Host. `CashChangerBase` kế thừa `DeviceBase` và chỉ giữ timer/log/alias đặc thù; drawer strategy clone và iOS Epson SDK file không còn sử dụng đã bị xóa.
- Sau commonization, quét SHA-256 trên toàn bộ file C# không còn file trùng nội dung; raw Named Pipe/method/payload literal được giữ ở contract. `5000` còn lại ngoài contract chỉ là timeout đọc serial có tên rõ và chuỗi mệnh giá 5.000 yên, không phải timeout command.

## Evidence

- Validator `testcase_validate.py --expected-count 90` pass cho Markdown `TC-IT-DEVICE-02`.
- Lần import đầu được đối chiếu 90 case x 21 field, tổng 1.890 field khớp workbook nguồn; sau đó chỉ các field thực thi không phải `Pass` được làm sạch theo yêu cầu User.
- Workbook `clean_v6` có đúng 8 sheet gồm `変更履歴` và 7 sheet testcase, 90 ID duy nhất, `文書ID=TC-IT-DEVICE-02`, 49 `Pass`, 5 `N/A`, 36 case chưa chạy và 54 tester `Dat`; read-back xác nhận nội dung mới của `IT-DEVICE-073` và lý do `N/A` của `038`, `075`, `078`, `079`, `085` đã vào workbook.
- Excel native read-back trên bản `clean_v3` xác nhận formula `OR($AI18="N/A",$AW18="N/A")` làm toàn bộ dòng `IT-DEVICE-038` từ A đến BK có cả `Color` và `PatternColor` xám `#D9D9D9`, chữ xám `#595959`; dòng kế tiếp vẫn nền trắng.
- Excel native read-back xác nhận workbook mở được, style title/header/body đúng và conditional formatting `N/A` toàn dòng tồn tại trên cả 7 sheet testcase.
- Excel native read-back trên `clean_v6` xác nhận toàn bộ A:BK của các dòng `IT-DEVICE-038`, `075`, `078`, `079`, `085` đều hiển thị nền xám `#D9D9D9`.
- Test renderer đạt 10/10; Markdown validator đạt 90/90 mapping. Build Windows Application đạt 17 project, 0 error, 0 warning. Chưa gửi lệnh tới thiết bị thật.
- Sau audit boundary ngày 2026-08-21, build Windows Application đạt 17 project, runner đạt 3 project, và ba Host project CashChanger/CustomerDisplay/CashDrawer cùng đạt 0 error, 0 warning. CodeGraph parse lại 259 file và không còn pending change. Tìm kiếm source không còn `MockData`, chuỗi demo hoặc fallback tham số test trong `TabletPos.DeviceCtrl` và `TabletPos.Host`.
- Workbook `clean_v7` read-back khớp cả 90 case trong Markdown, giữ đúng 49 `Pass`, 5 `N/A`, 36 case trống và 5 lý do `N/A`. Công thức tô xám toàn dòng `A:BK` là `OR($AI11="N/A",$AW11="N/A")` với màu `#D9D9D9` trên cả 7 sheet testcase. Build Windows Application đạt 17 project, 0 error, 0 warning; runner đạt 3 project, 0 error, 0 warning; regression renderer đạt 10/10.
- Build sau commonization đạt Host 15 project, Windows Application 19 project và integration runner 4 project; cả ba đều `0 error, 0 warning`. Mapping-only runner xác nhận đủ 90 ID với `CoverageValid=true`, `Failed=0`, `CommandsSent=0`; không dùng kết quả này để tự đánh dấu testcase `Pass`.
- Final source scan xác nhận không còn raw `Claim(0)`/`ClaimDevice(0)`, constant timeout 30/300 giây ngoài shared contract, duplicated Named Pipe DTO, duplicated COM reflection implementation hoặc file C# trùng SHA-256.
- CodeGraph `ensure` sau refactor đồng bộ 54 file thay đổi, index đủ 261 file với 7.545 node, 15.736 edge và `pendingChanges=0`; query read-back tìm đúng `DeviceCommandDefaults`, `CashChangerBase`, `OposNamedPipeCommandClient` và `LateBoundComObject` tại source hiện hành.
- Ngày 2026-08-21, workbook chính thức mới được render từ Markdown vào `draft/2026-08-21-latest-source`. Read-back xác nhận 8 sheet, 90 ID duy nhất, 7 rule tô xám toàn dòng A:BK với công thức `OR($AI11="N/A",$AW11="N/A")`, `stopIfTrue=true`, nền `#D9D9D9` và chữ `#595959`.
- Thay đổi source đã được push lên `origin/develop` tại commit `860376b595e4c8c932bd9ebf2a40a69fbee3a668`. Thay đổi renderer/skill `N/A` đã pass 10 regression test, skill validator và workspace verify, sau đó được push lên `origin/main` tại commit `c2311ad2d1a07edfde05ad13699e9bb03c6bc3e9`.

## Unresolved

- Chưa triển khai binary mới và chưa chạy lại 90 case trên POS; do đó 36 case đang trống không được tự động đổi thành `Pass`. Các case thao tác tiền mặt và thiết bị vật lý phải được chạy có giám sát sau khi phê duyệt deploy lên POS.
- Mapping-only chỉ chứng minh mapping/catalog và không gửi command; trạng thái pass 100% vẫn chưa được chứng minh trên thiết bị thật sau refactor.
- Target iOS chưa compile trên máy Windows vì `project.assets.json` không có target `net10.0-ios`; source iOS đã được CodeGraph parse nhưng cần CI/macOS có restore workload để xác nhận semantic build.

## Retrieval keys

- `TC-IT-DEVICE-02`
- `TC-IT-DEVICE-01 replaced`
- `90 testcase mới`
- `実機デバイスコマンド`
- `IT-DEVICE-001 IT-DEVICE-092 mapping`
- `IT-DEVICE-029 DirectIO 10 128`
- `IT-DEVICE-073 GetCashCounts AdjustCashCounts`
- `IT-DEVICE-075 RetrieveStatistics empty buffer`
- `IT-DEVICE-079 N/A firmware chưa có`
- `IT-DEVICE-085 Line Display 46 properties`
- `PrintBitmap OPOS width -11`
- `DeviceIntegrationTest UI defaults printer station symbology alignment`
- `Host restart stale session Disconnected`
- `test parameter ownership App DeviceCtrl Host`
- `OPOS_E_ILLEGAL missing payload`
- `MockData removed DeviceCtrl`
- `DeviceCommandDefaults CommandTimeoutMilliseconds 30000`
- `TabletPos.DeviceContracts NamedPipeContracts DevicePayloadKeys`
- `CashChangerBase inherits DeviceBase`
- `LateBoundComObject OposNamedPipeCommandClient OposReceiptEncoding`
