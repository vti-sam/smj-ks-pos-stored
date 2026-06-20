---
title: Sentry Monitoring
project: ks_host
type: architecture
status: confirmed
source:
  - migrated from memory/ks_pos_boilerplate/application_architecture/sentry_monitoring_2026-05-22.md
tags: [ks_host, architecture, ks_pos_boilerplate, application_architecture, sentry_monitoring_2026_05_22]
---

# Sentry monitoring base cho KsPos.Applications

## Bối cảnh

- Ngày ghi: 2026-05-22.
- Scope: `sources/KsPosBoilerplate/KsPos.Applications`.
- Liên quan: KSNEWSYS-426 terminal app logging/crash monitoring.
- KH đã chốt dùng Sentry trong kiến trúc monitoring; OCI Webhook/Functions/Object Storage là downstream ngoài app.

## Quyết định kỹ thuật

- Dùng `Sentry.Maui` cho MAUI app.
- Đặt code SDK Sentry ở `Infrastructure/Monitoring`, không để Application/Ports phụ thuộc SDK vendor.
- Dùng port monitoring duy nhất để tránh gọi `SentrySdk` trực tiếp trong ViewModel/navigation:
  - `Ports/Monitoring/IMonitoringService.cs`
  - `Ports/Monitoring/MonitoringEvent.cs`
  - `Ports/Monitoring/MonitoringContext.cs`
  - `Ports/Monitoring/MonitoringLevel.cs`
  - `Infrastructure/Monitoring/SentryMonitoringService.cs`
- Startup (`MauiProgram.cs`) wire Sentry cả Debug/Release trong giai đoạn test Sentry.
- DSN chuẩn về lâu dài không commit vào repo; dùng runtime config hoặc environment variables:
  - `KSPOS_SENTRY_ENABLED`
  - `KSPOS_SENTRY_DSN`
  - `KSPOS_SENTRY_ENVIRONMENT`
- Trạng thái tạm thời ngày 2026-05-22: đang hardcode fallback DSN trong `SentrySettings` để test Debug theo yêu cầu. Cần gỡ trước khi commit/release chính thức.
- Nếu không có `KSPOS_SENTRY_ENABLED` hoặc config `Sentry:EnableSentry`, trạng thái test hiện tại mặc định bật Sentry.
- `Info/Warn` được dùng như breadcrumb context; `Error` gửi event.
- Không gửi request body/response body vào Sentry trong v1.

## Code đã thêm

- `KsPos.Applications/Infrastructure/Monitoring/SentrySettings.cs`
- `KsPos.Applications/Infrastructure/Monitoring/SensitiveDataMasker.cs`
- `KsPos.Applications/Infrastructure/Monitoring/SentryConfiguration.cs`
- `KsPos.Applications/Infrastructure/Monitoring/SentryMonitoringService.cs`
- `KsPos.Applications/Ports/Monitoring/IMonitoringService.cs`
- `KsPos.Applications/Ports/Monitoring/MonitoringEvent.cs`
- `KsPos.Applications/Ports/Monitoring/MonitoringContext.cs`
- `KsPos.Applications/Ports/Monitoring/MonitoringLevel.cs`
- `KsPos.Applications/MauiProgram.cs` wire `UseSentry(...)`.
- `KsPos.Applications/Presentation/Views/MainPage.xaml` là màn test `結合テスト` tạm thời.
- `KsPos.Applications/Presentation/ViewModels/MainPageViewModel.cs` có command gửi Sentry smoke test và masking test.
- `KsPos.Applications.csproj` thêm package `Sentry.Maui` version `6.5.0`.

## Lưu ý triển khai

- `SensitiveDataMasker` độc lập Sentry SDK để sau này tách unit test dễ hơn.
- Masking hiện tại dùng regex để nhận diện sensitive text trong message/breadcrumb/data, không dựa vào login, user context hoặc metadata field.
- Luồng masking cấp SDK: Sentry event/breadcrumb -> `SentryConfiguration.SetBeforeSend(...)` / `SetBeforeBreadcrumb(...)` -> `SensitiveDataMasker.Mask(...)` -> gửi Sentry.
- Luồng masking cấp app: app code gọi `IMonitoringService` với `MonitoringEvent`/`MonitoringContext` -> `SentryMonitoringService` mask message/data/tag -> gọi Sentry SDK.
- Rule regex hiện có:
  - credit card: pattern 13-16 digit, có thể có dấu cách hoặc gạch ngang; output giữ 4 số cuối.
  - member card: chuỗi số dài dạng 4 + 4-8 + 4 digit; output giữ 4 đầu và 4 cuối.
  - phone: số điện thoại bắt đầu bằng `0`, giữ nhóm đầu và 4 số cuối, giữa thành `****`.
  - email: pattern email cơ bản, output `***@domain.com`.
- Ưu điểm: tự động áp dụng cho mọi message/breadcrumb đi qua Sentry hook.
- Nhược điểm: có thể false positive/false negative vì chỉ nhìn text. Khi có structured log/API context thật, nên bổ sung mask theo key name như `cardNo`, `memberNo`, `phone`, `email`, `token`, `msrData`.
- Sentry .NET 6.5.0 dùng `SetBeforeSend(...)` và `SetBeforeBreadcrumb(...)`, không dùng property `BeforeSend`/`BeforeBreadcrumb`.
- `Breadcrumb` là immutable trong API hiện tại; nếu cần mask breadcrumb message thì tạo breadcrumb mới.
- `BaseViewModel.HandleAppearingAsync()` tự set `screen_name` context và breadcrumb `lifecycle/appearing`.
- `BaseViewModel.HandleDisappearingAsync()` tự add breadcrumb `lifecycle/disappearing`.
- `MauiNavigationService.NavigateToAsync()` tự add breadcrumb `navigation/navigate_start`, `navigation/navigate_success`; khi fail thì capture exception qua `IMonitoringService`.
- `MainPageViewModel` không gọi `SentrySdk` trực tiếp; màn `結合テスト` dùng `IMonitoringService`.
- Chưa hook API/device command vì source mới chưa có flow thật; sau này thêm ở HttpClient handler/device adapter base.
- Khi NuGet bị lock ở `%LOCALAPPDATA%\Temp\NuGetScratch`, có thể build bằng temp riêng:
  - `rtk cmd /c "set TEMP=C:\tmp&& set TMP=C:\tmp&& dotnet build KsPos.Applications.csproj -v:m"`

## Test UI tạm thời

- Màn chính hiện đang được thay bằng `結合テスト` để test Sentry.
- Chức năng `Sentry テスト送信`: gửi `MonitoringEvent` smoke test qua `IMonitoringService` và flush trong 2 giây.
- Chức năng `Mask Preview`: nhập chuỗi mẫu và xem kết quả `SensitiveDataMasker.Mask(...)` ngay trên UI.
- Chức năng `Masking Event 送信`: gửi `MonitoringEvent` chứa dữ liệu nhạy cảm; kiểm tra dashboard để xác nhận message đã bị mask trước khi gửi.
- Đây là màn test tạm thời, không phải màn nghiệp vụ production.

## Verify

- Đã build pass bằng:
  - `rtk cmd /c "set TEMP=C:\tmp&& set TMP=C:\tmp&& dotnet build KsPos.Applications.csproj -v:m"`
- Warning còn lại chủ yếu là nullable/MVVM Toolkit AOT/source generator warning; build không lỗi.
- Sau refactor `IMonitoringService`, build Debug pass. Warning còn lại là MVVM Toolkit AOT warning ở màn test `MainPageViewModel`, không block build.

## Test gap

- Chưa có test project phù hợp trong `sources/KsPosBoilerplate` tại thời điểm ghi memory.
- Cần bổ sung unit test cho `SensitiveDataMasker` khi tạo test project chung hoặc khi có test project Application phù hợp.
