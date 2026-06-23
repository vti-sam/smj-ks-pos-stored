# TC-IT-DEVICE-01 テストケース — タブレットPOS デバイス制御 結合テスト

## @meta
プロジェクト名: タブレットPOS
モジュール: デバイス制御 / Host / OPOS / Hardware
段階: 結合テスト
作成者: VTI-SAM
作成日: 2026/06/19
作成日時: 2026/06/19 16:00
環境: ローカル

## テストケース {sheet=デバイス制御結合テスト}
| ID | 画面/機能カテゴリ | 大項目 | 中項目 | 前提条件 | 実行手順 | 期待される結果 | 種別 |
| IT-DEVICE-001 | Host Process | Khởi động host | Host khởi động với cấu hình thực tế | Máy POS đã cài runtime .NET, OPOS/driver cần thiết và file cấu hình host đúng. | 1. Khởi động host executable trên máy POS\n2. Quan sát log khởi động\n3. Kiểm tra command pipe được mở | Host khởi động không lỗi, log có thông tin start, command pipe sẵn sàng nhận kết nối. | N |
| IT-DEVICE-002 | Host Process | Dừng host | Stop host giải phóng tài nguyên | Host đang chạy và có ít nhất một device đã load. | 1. Thực hiện thao tác stop host\n2. Kiểm tra log stop\n3. Khởi động lại host | Device được stop/unuse, pipe được đóng, host có thể khởi động lại không bị kẹt handle. | N |
| IT-DEVICE-003 | Host Process | Restart sau lỗi | Restart host sau khi process bị kill | Host đang chạy và app client đã kết nối trước đó. | 1. Kill process host\n2. Khởi động lại host\n3. Từ app gửi lại command đơn giản | App có thể kết nối lại sau restart, không cần restart toàn bộ Windows. | A |
| IT-DEVICE-004 | NamedPipe liên process | Kết nối thật | App kết nối tới host pipe thật | App và host chạy ở hai process khác nhau trên cùng máy. | 1. Mở app\n2. Gửi command CustomerDisplay hoặc CashDrawer\n3. Theo dõi log hai phía | App kết nối đúng pipe `TabetPos.Host.Command`, host nhận request và trả response. | N |
| IT-DEVICE-005 | NamedPipe liên process | Timeout | Host chưa chạy khi app gửi command | App chạy nhưng host process chưa start. | 1. Đảm bảo host đã tắt\n2. Từ app gửi command mở drawer hoặc display text\n3. Chờ hết timeout | App nhận lỗi timeout rõ ràng, không treo UI, log ghi nhận không kết nối được host. | A |
| IT-DEVICE-006 | NamedPipe liên process | Payload tiếng Việt/Japanese | Truyền text non-ASCII qua pipe | Host đang chạy, customer display hoặc stub log payload có thể kiểm tra. | 1. Gửi text có tiếng Việt và tiếng Nhật từ app tới display\n2. Kiểm tra payload host nhận\n3. Kiểm tra hiển thị hoặc log | Payload không bị mojibake, ký tự non-ASCII giữ nguyên khi đi qua pipe. | B |
| IT-DEVICE-007 | Config thực tế | Load device config | App load cấu hình active device thực tế | File `device_controller_config.json` có activeDevices đúng OS và device id. | 1. Khởi động app\n2. Gọi luồng initialize device manager\n3. Kiểm tra strategy được chọn | DeviceManager chọn đúng strategy theo OS và active device, không rơi vào unknown/null. | N |
| IT-DEVICE-008 | Config thực tế | Config sai device id | Cấu hình trỏ tới device không tồn tại | Sao lưu config gốc, sửa bản test để active device id không tồn tại. | 1. Khởi động app với config lỗi\n2. Gọi initialize device manager\n3. Quan sát thông báo/log | App báo lỗi cấu hình rõ ràng, không crash không kiểm soát, có thể rollback config. | A |
| IT-DEVICE-009 | OPOS Runtime | Registry 32-bit | Kiểm tra registry runtime trên máy POS | Máy POS cài OPOS Common Control, Service Object Sharp/Glory. | 1. Kiểm tra CLSID/ProgID 32-bit cho CashDrawer, LineDisplay, CashChanger\n2. Kiểm tra file InprocServer32 tồn tại | Các registry key và file runtime đúng như cấu hình triển khai. | N |
| IT-DEVICE-010 | OPOS Runtime | ServiceOPOS logical name | Kiểm tra logical name thực tế | OPOS setup tool đã khai báo logical name cho thiết bị. | 1. Mở registry ServiceOPOS\n2. Kiểm tra logical name SHARPUPJ36DW3, SHARPRZ4DP1B, GloryRAD/RT-300\n3. So sánh service object ProgID | Logical name map đúng service object, không lệch alias giữa máy dev và máy POS. | N |
| IT-DEVICE-011 | Customer Display | DisplayText | Hiển thị text một dòng | Customer display Sharp đã kết nối và host đã chạy. | 1. Từ app gửi lệnh DisplayText với nội dung test\n2. Quan sát màn hình khách hàng | Nội dung hiển thị đúng, không mất ký tự, command trả success. | N |
| IT-DEVICE-012 | Customer Display | DisplayTextAt | Hiển thị tại row/column | Customer display Sharp đã kết nối. | 1. Gửi `DisplayTextAt` với row 2 column 3\n2. Quan sát vị trí hiển thị | Text xuất hiện đúng vị trí row/column theo device spec. | N |
| IT-DEVICE-013 | Customer Display | Clear và scroll | Xóa và scroll text | Display đang có nội dung nhiều ký tự. | 1. Gửi `ScrollText`\n2. Gửi `ClearText`\n3. Quan sát display | Text scroll theo hướng/đơn vị kỳ vọng, sau ClearText màn hình được xóa. | N |
| IT-DEVICE-014 | Customer Display | Device bị ngắt | Mất kết nối display khi gửi lệnh | Có thể tháo cáp hoặc tắt display trong môi trường test. | 1. Ngắt display\n2. Gửi lệnh DisplayText\n3. Cắm lại và gửi lại lệnh | Lỗi được trả về/log rõ, app không treo, sau khi kết nối lại có thể gửi lệnh thành công. | A |
| IT-DEVICE-015 | Cash Drawer | OpenDrawer | Mở ngăn kéo Sharp | Cash drawer kết nối với POS và OPOS setup đúng. | 1. Từ app gửi lệnh OpenDrawer\n2. Quan sát ngăn kéo\n3. Kiểm tra response/log | Ngăn kéo mở, command trả success hoặc result code 0. | N |
| IT-DEVICE-016 | Cash Drawer | Lặp mở drawer | Mở drawer liên tiếp | Cash drawer đang hoạt động bình thường. | 1. Gửi OpenDrawer 3 lần cách nhau vài giây\n2. Quan sát log và trạng thái drawer | Mỗi lần command xử lý ổn định, không kẹt device use/unuse. | B |
| IT-DEVICE-017 | Cash Drawer | Drawer offline | Gửi lệnh khi drawer không sẵn sàng | Drawer bị ngắt kết nối hoặc OPOS logical name bị disable trong môi trường test. | 1. Đưa drawer về trạng thái không sẵn sàng\n2. Gửi OpenDrawer | App nhận lỗi có kiểm soát, host log result code hoặc exception đủ để điều tra. | A |
| IT-DEVICE-018 | Cash Changer RT-300 | Start/Use | Khởi tạo và chiếm dụng thiết bị | RT-300 kết nối, OPOS/service object hoạt động. | 1. Khởi động host\n2. Gửi Start hoặc Use cash changer\n3. Kiểm tra log và trạng thái thiết bị | Cash changer được open/claim/enable thành công, không lỗi OPOS. | N |
| IT-DEVICE-019 | Cash Changer RT-300 | Begin deposit | Bắt đầu nhập tiền | RT-300 đã start và ở trạng thái sẵn sàng. | 1. Gửi BeginDeposit\n2. Đưa tiền test vào thiết bị\n3. Theo dõi event/log | Thiết bị chuyển sang trạng thái nhận tiền, event/data được host ghi nhận. | N |
| IT-DEVICE-020 | Cash Changer RT-300 | Deposit amount/count | Đọc số tiền và số lượng đã nạp | Đã thực hiện nhập tiền test. | 1. Gửi GetDepositAmount\n2. Gửi GetDepositCount hoặc đọc deposit data\n3. So sánh với tiền test | Amount và count trả về khớp số tiền đã nạp trong phạm vi sai số thiết bị cho phép. | N |
| IT-DEVICE-021 | Cash Changer RT-300 | Fix/End deposit | Xác nhận và kết thúc nhập tiền | Đã có tiền deposit pending. | 1. Gửi FixDeposit\n2. Gửi EndDeposit\n3. Kiểm tra trạng thái thiết bị và log | Giao dịch deposit được xác nhận/kết thúc, không còn pending bất thường. | N |
| IT-DEVICE-022 | Cash Changer RT-300 | Cancel/Pause deposit | Hủy hoặc tạm dừng nhập tiền | Đang trong luồng deposit. | 1. Gửi PauseDeposit hoặc CancelTransaction\n2. Quan sát trạng thái RT-300\n3. Đọc lại amount/status | Thiết bị dừng nhận tiền theo lệnh, app/host nhận response phù hợp. | A |
| IT-DEVICE-023 | Cash Changer RT-300 | Dispense change | Trả tiền thừa bình thường | RT-300 có tồn quỹ đủ cho amount test. | 1. Gửi DispenseChange với amount hợp lệ\n2. Quan sát tiền trả ra\n3. Kiểm tra response/log | Thiết bị trả đúng số tiền, command success, tồn quỹ thay đổi phù hợp. | N |
| IT-DEVICE-024 | Cash Changer RT-300 | Dispense thiếu tồn quỹ | Trả tiền khi không đủ tồn quỹ | Cấu hình amount lớn hơn tồn quỹ hoặc denomination không thể trả. | 1. Gửi DispenseChange amount không thể trả\n2. Kiểm tra response và guidance | Host trả lỗi/guidance rõ, app không coi là success. | A |
| IT-DEVICE-025 | Cash Changer RT-300 | Read cash counts | Đọc tồn quỹ | RT-300 đang online và đã có dữ liệu tồn quỹ. | 1. Gửi ReadCashCounts\n2. So sánh với màn hình/tool thiết bị nếu có | Payload tồn quỹ đầy đủ, format parse được ở app. | N |
| IT-DEVICE-026 | Cash Changer RT-300 | Enq/status | Truy vấn trạng thái | RT-300 đang online. | 1. Gửi Enq\n2. Gửi GetCoinStatus\n3. Kiểm tra log/response | Trả về trạng thái thiết bị hiện tại, không timeout. | N |
| IT-DEVICE-027 | Cash Changer RT-300 | Open changer drawer | Mở drawer của cash changer | RT-300 có drawer hỗ trợ mở qua command. | 1. Gửi OpenDrawer của cash changer\n2. Quan sát drawer | Drawer của cash changer mở đúng, response success. | N |
| IT-DEVICE-028 | Cash Changer RT-300 | Event bất thường | Thiết bị báo lỗi trong lúc giao dịch | Có thể tạo tình huống lỗi như cửa mở, kẹt tiền hoặc offline theo quy trình onsite. | 1. Tạo lỗi thiết bị trong lúc deposit hoặc dispense\n2. Quan sát event/log\n3. Gửi GuidanceError nếu cần | Host ghi nhận event/status, app nhận lỗi/guidance có ý nghĩa, không treo giao dịch. | A |
| IT-DEVICE-029 | App UI + Local State | Kill app và restore | App đang ở màn hình nghiệp vụ có trạng thái cần giữ | App chạy bản thực tế, local database dùng file thật. | 1. Nhập dữ liệu trên màn hình\n2. Kill app process\n3. Mở lại app | Trạng thái đã đánh dấu persist được khôi phục, dữ liệu không persist không bị phục hồi sai. | N |
| IT-DEVICE-030 | Monitoring thực tế | Sentry/log tích hợp | Có cấu hình DSN/log endpoint của môi trường test | App và host chạy luồng gây message/exception test. | 1. Gây lỗi có kiểm soát\n2. Kiểm tra log local\n3. Kiểm tra Sentry hoặc sink test nếu bật | Log/event được gửi hoặc lưu đúng, dữ liệu nhạy cảm đã bị mask trước khi ra ngoài. | N |
| IT-DEVICE-031 | App + Host | NamedPipe lifecycle | Host stop bằng AppStopServer | App đang mở, Host đang chạy, app đã gửi thành công ít nhất một command qua `TabetPos.Host.Command`. | 1. Từ app gửi command nhẹ như CustomerDisplay hoặc CashDrawer\n2. Chạy `TabletDeviceServer.AppStopServer.exe` để stop Host\n3. Từ app gửi lại command sau khi Host đã dừng | App không treo UI. Command sau khi Host dừng trả lỗi kết nối hoặc timeout rõ ràng, log app ghi pipe `TabetPos.Host.Command` không kết nối được. | A |
| IT-DEVICE-032 | App + Host | NamedPipe lifecycle | Host restart sau AppStopServer | Host đã được dừng bằng AppStopServer, app vẫn đang chạy hoặc vừa được mở lại. | 1. Khởi động lại Host\n2. Từ app gửi lại command CustomerDisplay hoặc CashDrawer\n3. Kiểm tra response app và log hai phía | App kết nối lại được tới `TabetPos.Host.Command` sau khi Host restart. Command mới xử lý thành công, không cần restart Windows. | N |
| IT-DEVICE-033 | App + Host | NamedPipe lifecycle | Stop trong lúc command đang xử lý | App và Host đang chạy, có thể tạo command mất thời gian hoặc command liên tiếp. | 1. Từ app gửi command thiết bị\n2. Trong lúc hoặc ngay sau đó chạy AppStopServer\n3. Quan sát app response, Host log, rồi restart Host và gửi lại command | Command đang xử lý hoặc command kế tiếp kết thúc bằng success hoặc lỗi có kiểm soát. App không treo, sau khi Host restart có thể gửi command lại bình thường. | B |

## 基本情報
| 項目 | 内容 |
| --- | --- |
| 文書ID | TC-IT-DEVICE-01 |
| プロジェクト名 | Tablet POS |
| モジュール名 | Device Control / Host / OPOS / Hardware |
| テスト段階 | Integration Test |
| 作成者 | VTI-SAM |
| 作成日 | 2026/06/19 |
| 環境 | ローカル |

## 更新履歴
| バージョン | 依頼者 | 更新者 | 更新日時 | 変更理由 | シート名 | 更新内容 |
| --- | --- | --- | --- | --- | --- | --- |
| 1.0.0 | - | VTI-SAM | 2026/06/19 | 新規作成 | デバイス制御結合テスト | UT không cover được phần runtime, liên process, OPOS và phần cứng thực tế |
| 1.1.0 | - | VTI-SAM | 2026/06/23 | テスト追加 | デバイス制御結合テスト | AppStopServerでHostを停止した場合のApp側timeout、再接続、処理中停止の確認を追加 |
