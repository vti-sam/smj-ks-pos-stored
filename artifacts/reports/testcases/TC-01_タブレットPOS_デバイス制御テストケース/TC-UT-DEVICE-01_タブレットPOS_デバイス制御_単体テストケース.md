# TC-UT-DEVICE-01 テストケース — タブレットPOS デバイス制御 単体テスト

## @meta
プロジェクト名: タブレットPOS
モジュール: デバイス制御 / Host / ローカル状態 / Monitoring
段階: 単体テスト
作成者: VTI-SAM
作成日: 2026/06/19
作成日時: 2026/06/19 16:00
環境: ローカル

## テストケース {sheet=デバイス制御単体テスト}
| ID | 画面/機能カテゴリ | 大項目 | 中項目 | 前提条件 | 実行手順 | 期待される結果 | 種別 |
| UT-DEVICE-001 | DeviceCtrl Host Mapping | NamedPipe cấu hình | Chuyển pipe name legacy | Có `NamedPipeSettings.PipeName = KsPOSPipeMessage`. | 1. Khởi tạo `NamedPipeClient`\n2. Gọi `Configure(settings)` | `PipeName` được đổi sang `TabetPos.Host.Command`. | N |
| UT-DEVICE-002 | DeviceCtrl Host Mapping | Customer Display | Map `DisplayTextAt` sang host contract | Có `RecordingPipeClient` và `OposCustomerDisplayStrategy`. | 1. Gọi `DisplayTextAt("hello", 2, 3)`\n2. Đọc request đã gửi | Request có DeviceId `CustomerDisplay`, Message `DeviceMethod`, MethodId `DisplayTextAt`, payload Data Row Column Attribute đúng giá trị. | N |
| UT-DEVICE-003 | DeviceCtrl Host Mapping | Cash Drawer | Map lệnh mở ngăn kéo | Có `RecordingPipeClient` và `OposDrawerStrategy`. | 1. Gọi `OpenDrawer()`\n2. Đọc kết quả và request đã gửi | Kết quả trả về true, DeviceId `CashDrawer`, MethodId `OpenDrawer`. | N |
| UT-DEVICE-004 | DeviceCtrl Host Mapping | Cash Changer | Map payload trả tiền thừa | Có `RecordingPipeClient` và `OposCashChangerStrategy`. | 1. Gọi `DispenseChange("1250")`\n2. Đọc request đã gửi | DeviceId `CashChanger`, MethodId `CashChangerDispenseChange`, Amount `1250`, CurrentExit `0`, Sync `True`. | N |
| UT-DEVICE-005 | DeviceCtrl Host Mapping | Cash Changer | Nhận số tiền đã nạp từ host payload | Pipe client giả lập trả payload `DepositAmount = 980`. | 1. Gọi `GetDepositAmount()` | Giá trị trả về là `980`. | N |
| UT-DEVICE-006 | Local State | SQLite file database | Migrate và restart khôi phục snapshot | Có database file tạm, service local state và migration. | 1. Khởi tạo database\n2. Lưu snapshot\n3. Tạo service instance mới như sau restart\n4. Đọc lại snapshot | Database dùng WAL và snapshot được khôi phục sau restart service. | N |
| UT-DEVICE-007 | Local State Session | Session active | Tạo session active mới | Không có session active phù hợp trong database. | 1. Gọi `GetOrCreateActiveSessionAsync` với business flow mới | Session mới được lưu và trả về ở trạng thái active. | N |
| UT-DEVICE-008 | Local State Session | Session active | Dùng lại session active hiện có | Có session active cùng business flow. | 1. Gọi `GetOrCreateActiveSessionAsync` | Không tạo session mới và business flow hiện có không bị đổi. | N |
| UT-DEVICE-009 | Local State Session | Reactivate session | Kích hoạt lại session inactive với flow mới | Có session inactive đã tồn tại. | 1. Gọi `GetOrCreateActiveSessionAsync` với business flow mới | Session được chuyển lại active và flow được cập nhật theo yêu cầu. | N |
| UT-DEVICE-010 | Local State Session | Danh sách active | Lọc session active chưa hết hạn | Có nhiều session gồm active, inactive và expired. | 1. Gọi `GetActiveSessionsAsync` | Chỉ trả về session active và chưa hết hạn. | N |
| UT-DEVICE-011 | Local State Session | Route | Cập nhật route cuối | Có session đang tồn tại. | 1. Gọi `UpdateLastRouteAsync` với route mới\n2. Đọc lại session | `LastRoute` được cập nhật đúng. | N |
| UT-DEVICE-012 | Local State Session | Hoàn tất session | Đổi trạng thái completed | Có session đang active. | 1. Gọi `MarkCompletedAsync` | Session chuyển sang trạng thái completed. | N |
| UT-DEVICE-013 | Local State Session | Hủy bỏ session | Đổi trạng thái abandoned | Có session đang active. | 1. Gọi `MarkAbandonedAsync` | Session chuyển sang trạng thái abandoned. | N |
| UT-DEVICE-014 | Local State Session | Missing session | Không tạo mới khi mark/update session không tồn tại | Không tồn tại session theo id truyền vào. | 1. Gọi mark hoặc update cho session không tồn tại\n2. Kiểm tra database | Không tạo thêm session mới. | A |
| UT-DEVICE-015 | Local State Session | Sắp xếp active | Include null expiration và sort theo updated time | Có session active gồm session không có expiration và nhiều thời điểm cập nhật khác nhau. | 1. Gọi `GetActiveSessionsAsync` | Session null expiration vẫn được trả về và danh sách sắp xếp theo thời điểm cập nhật. | B |
| UT-DEVICE-016 | Local State Session | Reactivate giữ flow | Reactivate không truyền flow mới | Có session inactive đã có business flow. | 1. Gọi `GetOrCreateActiveSessionAsync` không truyền flow mới | Session active lại, giữ flow cũ và refresh expiration. | B |
| UT-DEVICE-017 | Monitoring | Masking | Mask giá trị nhạy cảm được hỗ trợ | Có dữ liệu chứa token, password, email hoặc phone theo pattern hỗ trợ. | 1. Gọi `SensitiveDataMasker.Mask` cho từng input | Output che đúng phần nhạy cảm theo expected của unit test. | N |
| UT-DEVICE-018 | Monitoring | Masking | Mask nhiều giá trị nhạy cảm trong cùng chuỗi | Chuỗi input có nhiều giá trị nhạy cảm. | 1. Gọi `SensitiveDataMasker.Mask` | Tất cả giá trị nhạy cảm trong chuỗi đều bị che. | N |
| UT-DEVICE-019 | Sentry Configuration | BeforeSend | Mask raw Sentry message | Có Sentry options dùng transport giả lập. | 1. Configure Sentry\n2. Gửi event có message chứa dữ liệu nhạy cảm | Message trước khi gửi envelope đã được mask. | N |
| UT-DEVICE-020 | Sentry Configuration | Breadcrumb | Mask raw breadcrumb | Có Sentry options dùng transport giả lập. | 1. Configure Sentry\n2. Thêm breadcrumb chứa dữ liệu nhạy cảm | Breadcrumb đã được mask trước khi capture. | N |
| UT-DEVICE-021 | Sentry Monitoring | Context | Set context hợp lệ | Có `SentryMonitoringService` và context đầy đủ. | 1. Gọi `SetContext` | Scope Sentry được cấu hình các tag/context hợp lệ. | N |
| UT-DEVICE-022 | Sentry Monitoring | Context | Xử lý null value | Context có một số field null. | 1. Gọi `SetContext` | Không phát sinh exception và bỏ qua hoặc xử lý an toàn field null. | B |
| UT-DEVICE-023 | Sentry Monitoring | Breadcrumb | Add breadcrumb hợp lệ | Có monitoring event hợp lệ. | 1. Gọi `AddBreadcrumb` | Breadcrumb được thêm vào Sentry scope. | N |
| UT-DEVICE-024 | Sentry Monitoring | Message | Capture message trả event id | Có monitoring event hợp lệ. | 1. Gọi `CaptureMessage` | Trả về event id hợp lệ từ Sentry SDK. | N |
| UT-DEVICE-025 | Sentry Monitoring | Exception | Capture exception only | Có exception không kèm monitoring event. | 1. Gọi `CaptureException(exception)` | Exception được capture và trả về event id. | N |
| UT-DEVICE-026 | Sentry Monitoring | Exception | Capture exception kèm monitoring event | Có exception và monitoring event. | 1. Gọi `CaptureException(exception, event)` | Exception được capture cùng metadata của monitoring event. | N |
| UT-DEVICE-027 | Sentry Monitoring | Flush | Flush async timeout hợp lệ | Sentry SDK đã khởi tạo. | 1. Gọi `FlushAsync` với timeout hợp lệ | Task hoàn tất không lỗi. | N |
| UT-DEVICE-028 | Sentry Monitoring | Custom tags | Set context với custom tags | Context có nhiều tag tùy chỉnh. | 1. Gọi `SetContext` | Tất cả custom tags được cấu hình vào scope. | N |
| UT-DEVICE-029 | Sentry Monitoring | Breadcrumb level | Add breadcrumb nhiều level | Có nhiều monitoring event với level khác nhau. | 1. Gọi `AddBreadcrumb` cho từng event | Service xử lý được các level khác nhau và không lỗi. | B |
| UT-DEVICE-030 | ViewModel Snapshot | Restore | Appearing và resuming khôi phục persisted properties | Có ViewModel test với property có và không có `[PersistSnapshot]`. | 1. Lưu snapshot giả lập\n2. Trigger `OnAppearingAsync`\n3. Trigger `OnResumingAsync` | Chỉ property được đánh dấu persist được khôi phục. | N |
| UT-DEVICE-031 | ViewModel Snapshot | Save | Disappearing lưu persisted properties | Có ViewModel test với persisted property. | 1. Thay đổi property\n2. Trigger `OnDisappearingAsync` | Snapshot service nhận dữ liệu của persisted property, bỏ qua non-persisted property. | N |
| UT-DEVICE-032 | ViewModel Snapshot | Throttle | Disappearing rồi stopping trong throttle window | Có ViewModel test và snapshot service giả lập đếm số lần save. | 1. Trigger `OnDisappearingAsync`\n2. Trigger `OnStoppingAsync` trong throttle window | Snapshot chỉ được save một lần. | B |
| UT-DEVICE-033 | ViewModel Snapshot | Concurrency | Concurrent stopping serialize và throttle save | Có nhiều trigger stopping song song. | 1. Gọi `OnStoppingAsync` đồng thời nhiều lần | Save được serialize và throttle, không ghi trùng ngoài kiểm soát. | B |
| UT-DEVICE-034 | ViewModel Snapshot Service | Save | Lưu snapshot vào DB và cache | Có session id, snapshot key và data hợp lệ. | 1. Gọi `SaveSnapshotAsync`\n2. Gọi `GetSnapshotAsync` | Data được lưu vào DB và đọc lại từ cache. | N |
| UT-DEVICE-035 | ViewModel Snapshot Service | Update | Update snapshot hiện có | Đã có snapshot cùng session và key. | 1. Gọi `SaveSnapshotAsync` với data mới\n2. Đọc lại snapshot | Snapshot được update bằng data mới. | N |
| UT-DEVICE-036 | ViewModel Snapshot Service | Clear one | Xóa một snapshot | Có snapshot đã lưu. | 1. Gọi `ClearSnapshotAsync`\n2. Đọc lại snapshot | Snapshot bị xóa khỏi DB và cache. | N |
| UT-DEVICE-037 | ViewModel Snapshot Service | Clear session | Xóa toàn bộ snapshot của session | Có nhiều snapshot thuộc cùng session. | 1. Gọi `ClearSessionSnapshotsAsync`\n2. Đọc lại từng snapshot | Tất cả snapshot của session bị xóa. | N |
| UT-DEVICE-038 | ViewModel Snapshot Service | Missing snapshot | Đọc snapshot không tồn tại | Không có snapshot theo session/key. | 1. Gọi `GetSnapshotAsync` | Trả về null. | A |
| UT-DEVICE-039 | ViewModel Snapshot Service | Cascade delete | Xóa session kéo theo snapshot | Có session và snapshot liên quan. | 1. Xóa session\n2. Đọc lại snapshot | Snapshot liên quan bị xóa theo cascade. | N |
| UT-DEVICE-040 | ViewModel Snapshot Service | Restart service | Instance mới đọc lại DB | Snapshot đã lưu bằng service instance cũ. | 1. Tạo service instance mới\n2. Gọi `GetSnapshotAsync` | Snapshot được khôi phục từ database. | N |
| UT-DEVICE-041 | ViewModel Snapshot Service | Cache isolation | Mutation dictionary trả về không làm bẩn cache | Đã có snapshot trong cache. | 1. Đọc snapshot\n2. Sửa dictionary trả về\n3. Đọc lại snapshot | Cache nội bộ không bị mutate bởi dictionary bên ngoài. | B |
| UT-DEVICE-042 | ViewModel Snapshot Service | Session isolation | Cùng snapshot key ở session khác nhau | Có hai session dùng cùng snapshot key. | 1. Lưu data khác nhau cho từng session\n2. Đọc lại từng session | Giá trị được tách biệt theo session. | B |
| UT-DEVICE-043 | Device Pipeline | NamedPipe và host in-memory | Tất cả command hỗ trợ chạy qua pipe và host | Có `PipelineContext` dùng host adapter và device giả lập. | 1. Chạy các command CustomerDisplay, Drawer, CashChanger\n2. Kiểm tra số call và method id | CustomerDisplay có 7 call, CashDrawer có 6 call, CashChanger có 18 call và method id đúng tập hỗ trợ. | N |
| UT-DEVICE-044 | Device Pipeline | Coverage classification | Tất cả method interface được phân loại coverage | Có interface CustomerDisplay, Drawer, CashChanger. | 1. Reflection lấy danh sách method\n2. So sánh với danh sách supported/unsupported | Không có method thiếu phân loại hoặc phân loại trùng. | B |
| UT-DEVICE-045 | Device Pipeline | Host failure | Host trả lỗi qua NamedPipe về strategy | Pipeline đang chạy, CashDrawer device giả lập trả result code 91. | 1. Gọi `OpenDrawer()`\n2. Capture exception | Strategy nhận `InvalidOperationException` có message `Host command failed (91)`. | A |
| UT-DEVICE-046 | Device Pipeline | Unsupported command | Lệnh chưa hỗ trợ fail trước transport | Có pipe client không được phép gọi. | 1. Gọi các method unsupported trên display, drawer, sharp drawer, cash changer | Tất cả trả `NotSupportedException` và pipe không bị gọi. | A |
| UT-DEVICE-047 | Host Device Setting | Cấu hình resource | Đọc danh sách device từ host config | Có resource cấu hình host device trong test project. | 1. Khởi tạo `KsDeviceSettingBase`\n2. Gọi `GetDeviceSettingList()` | Trả về 3 device CustomerDisplay, CashDrawer, CashChanger với class id và device name đúng. | N |
| UT-DEVICE-048 | OPOS Runtime | COM registration | OPOS control được đăng ký và tạo instance | Máy test có registry OPOS 32-bit tương ứng. | 1. Duyệt CashChanger, CustomerDisplay, CashDrawer\n2. Kiểm tra CLSID/ProgID/InprocServer32\n3. Tạo COM instance STA | COM server tồn tại, path file tồn tại và tạo instance không lỗi. | N |
| UT-DEVICE-049 | OPOS Runtime | ServiceOPOS mapping | Mapping ServiceOPOS đúng | Máy test có registry `SOFTWARE\OLEforRetail\ServiceOPOS`. | 1. Duyệt các device OPOS\n2. Kiểm tra category, logical alias và service object ProgID | ServiceOPOS key và service object mapping khớp cấu hình kỳ vọng. | N |
| UT-DEVICE-050 | OPOS Runtime | Hardware open flag | `Open(logicalName)` khi bật flag code hóa | Biến môi trường `TABETPOS_OPOS_RUN_HARDWARE_OPEN_TESTS=1`, OPOS runtime và thiết bị đã sẵn sàng. | 1. Tạo OPOS COM object\n2. Gọi `Open(logicalName)` cho từng device\n3. Đọc ResultCode/ResultCodeExtended | `Open` trả 0, không có exception. Vì đây là testcase đã code hóa nên vẫn đưa vào bộ UT theo chỉ đạo. | N |

## 基本情報
| 項目 | 内容 |
| --- | --- |
| 文書ID | TC-UT-DEVICE-01 |
| プロジェクト名 | Tablet POS |
| モジュール名 | Device Control / Host / Local State / Monitoring |
| テスト段階 | Unit Test |
| 作成者 | VTI-SAM |
| 作成日 | 2026/06/19 |
| 環境 | ローカル |

## 更新履歴
| バージョン | 依頼者 | 更新者 | 更新日時 | 変更理由 | シート名 | 更新内容 |
| --- | --- | --- | --- | --- | --- | --- |
| 1.0.0 | - | VTI-SAM | 2026/06/19 | 新規作成 | デバイス制御単体テスト | Code hóa hiện có được gom thành bộ UT theo chỉ đạo |
