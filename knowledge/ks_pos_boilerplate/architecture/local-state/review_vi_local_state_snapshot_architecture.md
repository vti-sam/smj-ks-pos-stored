---
project: ks_host
source:
- migrated from management/program-specs/local-state/review_vi_local_state_snapshot_architecture.md
status: confirmed
tags:
- ks_host
- architecture
- local-state
- review_vi_local_state_snapshot_architecture
title: Review kiến trúc local snapshot persistence
type: architecture
---

# Review kiến trúc local snapshot persistence

## 1. Kết luận ngắn

Kiến trúc hiện tại khá ổn cho yêu cầu `端末アプリローカルストレージ保持基盤`.

Hướng làm chính là **opt-in snapshot**:

- Mặc định không lưu toàn bộ ViewModel.
- Property nào thật sự cần restore thì đánh dấu `[PersistSnapshot]`.
- Dữ liệu được lưu thành JSON trong SQLite local DB.
- Khi quay lại màn hình hoặc app restart/resume, hệ thống restore lại các property đã đánh dấu.

Cách này phù hợp với MVVM / Clean Architecture hơn so với opt-out, vì không ép base ViewModel phải hiểu và lọc toàn bộ trạng thái của mọi màn hình.

## 2. Vì sao opt-in hợp lý hơn opt-out

Trong ViewModel có nhiều loại state:

- Dữ liệu nhập liệu cần restore.
- UI state như hiển thị/ẩn, selected tab, loading state.
- Runtime object, command, service, object phụ thuộc lifecycle.
- Dữ liệu không nên lưu lâu dài như password, token, PIN.

Nếu dùng opt-out, tức là mặc định lưu tất cả rồi loại trừ những cái không cần, thì khi số màn hình tăng lên sẽ phải duy trì rule loại trừ liên tục. Việc này dễ phát sinh công review/maintain, và có rủi ro lưu nhầm dữ liệu không nên lưu.

Trong POC MauiPOSX, thống kê sơ bộ cho thấy:

| Hạng mục | Số lượng |
|---|---:|
| Tổng property / field trong ViewModel | 865 |
| Property / field đánh `[PersistSnapshot]` | 71 |
| Tỷ lệ cần lưu | khoảng 8.2% |

Tức là số dữ liệu cần lưu chỉ là một phần nhỏ. Vì vậy opt-in giúp quản lý ít hơn, rõ hơn, và ít rủi ro hơn.

## 3. Kiến trúc tổng thể

```text
ViewModel
  -> SnapshotViewModelBase
    -> IViewModelSnapshotService
      -> EfCoreViewModelSnapshotService
        -> LocalStateDbContext
          -> SQLite local DB
```

Các vai trò chính:

| Thành phần | Vai trò |
|---|---|
| `[PersistSnapshot]` | Đánh dấu property cần lưu |
| `SnapshotViewModelBase` | Tự save/restore theo lifecycle |
| `IViewModelSnapshotService` | Port lưu/đọc/xóa snapshot |
| `ILocalStateSessionService` | Quản lý session/flow bằng `session_key` |
| `EfCoreViewModelSnapshotService` | Serialize JSON và lưu SQLite |
| `LocalStateDbContext` | EF Core DbContext cho local DB |

## 4. Save / restore đang diễn ra khi nào

Save snapshot:

- Khi rời màn hình: `OnDisappearingAsync`
- Khi app stopping: `OnStoppingAsync`

Restore snapshot:

- Khi vào lại màn hình: `OnAppearingAsync`
- Khi app resume: `OnResumingAsync`

Flow:

```text
Page disappearing / app stopping
  -> lấy property có [PersistSnapshot]
  -> serialize thành JSON
  -> lưu vào SQLite

Page appearing / app resuming
  -> đọc snapshot từ memory cache hoặc SQLite
  -> deserialize
  -> set lại property vào ViewModel
```

## 5. DB design

DB file:

```text
FileSystem.AppDataDirectory/kspos_local_state.db
```

Hiện có 2 table:

### `local_state_sessions`

Quản lý session/flow theo `session_key`.

Ví dụ:

- `default`
- `sales:{guid}`
- `return:{guid}`

Các cột chính:

| Cột | Ý nghĩa |
|---|---|
| `id` | ID session |
| `session_key` | Khóa định danh flow/session |
| `business_flow` | Tên nghiệp vụ nếu có |
| `last_route` | Màn hình cuối |
| `status` | `active`, `completed`, `abandoned` |
| `expires_at_utc` | Hạn restore |

### `view_model_snapshots`

Lưu payload của từng ViewModel.

Các cột chính:

| Cột | Ý nghĩa |
|---|---|
| `session_id` | FK tới `local_state_sessions` |
| `snapshot_key` | Key của ViewModel snapshot |
| `view_model_type` | Tên ViewModel |
| `route` | Route khi lưu |
| `payload_json` | JSON các property cần restore |
| `payload_version` | Version payload |

## 6. Cách dùng với Entry text

Với `Entry.Text`, chỉ cần bind vào property và đánh `[PersistSnapshot]`.

```csharp
[ObservableProperty]
[property: PersistSnapshot]
private string customerCode = string.Empty;
```

```xml
<Entry Text="{Binding CustomerCode}" />
```

Không cần viết code riêng ở page/control.

## 7. Có lưu được object/list không?

Có.

Không bắt buộc property phải là `[ObservableProperty]`. Chỉ cần là property có getter/setter và có `[PersistSnapshot]`.

Ví dụ object:

```csharp
[PersistSnapshot]
public KokyakuInfoBase KokyakuInfo { get; set; } = new();
```

Ví dụ list:

```csharp
[PersistSnapshot]
public List<SaleLineInput> Lines { get; set; } = [];
```

Khi object/list phức tạp nhưng là một cụm dữ liệu cần restore, lưu theo object/list còn tự nhiên hơn tách thành nhiều property nhỏ.

## 8. Điều kiện để object/list lưu ổn định

Object cần serialize/deserialize JSON được.

Nên đảm bảo:

- Có public getter/setter.
- Có constructor mặc định hoặc dạng mà `System.Text.Json` deserialize được.
- Không chứa control UI, service, command, hardware handle.
- Không chứa dữ liệu nhạy cảm như password/token/PIN.

Với class kiểu:

```csharp
public partial class KokyakuInfoBase : ObservableObject
{
    [ObservableProperty]
    private string noShigaiA1 = string.Empty;
}
```

Nếu CommunityToolkit generate public property `NoShigaiA1` có getter/setter thì có thể serialize theo property được.

## 9. Những gì không nằm trong scope lần này

Không làm trong scope này:

- Không lưu `local_settings`.
- Không dùng Preferences.
- Không lưu toàn bộ ViewModel.
- Không thiết kế DB nghiệp vụ cho sales/payment/transaction.
- Không lưu master data/cache lớn.

Nếu sau này cần lưu sales/payment/transaction chính thức, nên thiết kế schema nghiệp vụ riêng, không dùng chung với ViewModel snapshot.

## 10. Đánh giá rủi ro còn lại

| Rủi ro | Cách kiểm soát |
|---|---|
| Lưu nhầm dữ liệu nhạy cảm | Chỉ opt-in, review property có `[PersistSnapshot]` |
| Object deserialize lỗi khi đổi model | Dùng `payload_version`, giữ object đơn giản |
| Ghi SQLite nhiều gây tải | Chỉ lưu property cần restore, có memory cache |
| Mobile responsiveness | Tránh lưu object quá lớn, nếu cần có thể thêm queue/background write |
| Flow nhiều màn hình | Dùng `session_key` riêng cho từng flow |

## 11. Câu trả lời ngắn cho KH

Có thể giải thích như sau:

```text
Opt-in方式で進めます。
POCのMauiPOSXでは、ViewModel内のproperty / field 865件中、保存対象は71件、約8.2%でした。
保持が必要なpropertyは全体の一部のため、opt-inの方が管理対象が少なく、誤保存のリスクも低いと判断しています。

また、必要に応じてListやObject単位で保存可能です。
共通部品で複数入力項目を1つのObjectとして扱う場合、そのObjectをsnapshot対象にする想定です。
ただし、JSON serialize / deserialize可能なproperty構成であること、runtime objectや画面controlを含めないことを前提とします。
```
