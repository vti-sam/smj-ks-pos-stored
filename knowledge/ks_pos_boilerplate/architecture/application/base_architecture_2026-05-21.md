---
title: Base Architecture
project: ks_host
type: architecture
status: confirmed
source:
  - migrated from memory/ks_pos_boilerplate/application_architecture/base_architecture_2026-05-21.md
tags: [ks_host, architecture, ks_pos_boilerplate, application_architecture, base_architecture_2026_05_21]
---

# Kiến trúc base KsPos.Applications - 2026-05-21

## Mục tiêu

`KsPos.Applications` đã được refactor sang kiến trúc tối giản để phát triển tiếp app POS lớn, dùng Command/Query Handler thay cho folder `UseCases` chung chung.

Không đụng `KsPos.Host`; scope chỉ nằm trong `sources/KsPosBoilerplate/KsPos.Applications`.

## Cấu trúc hiện tại

```text
KsPos.Applications/
  Application/
    Abstractions/
      ICommandHandler.cs
      IQueryHandler.cs
      GlobalUsings.cs
    Common/
      Result.cs

  Composition/
    DependencyInjection.cs

  Ports/
    Navigation/
      INavigationAware.cs
      INavigationService.cs
      IRouteRegistry.cs

  Infrastructure/
    Navigation/
      MauiNavigationService.cs
      MauiRouteRegistry.cs

  Presentation/
    ViewModels/
      Base/
      MainPageViewModel.cs
    Views/
      Base/
      UserControls/
      MainPage.xaml
      MainPage.xaml.cs
```

## Dependency rule

- `Presentation` được gọi `Application` và `Ports`.
- `Application` chứa command/query abstractions và result object, không phụ thuộc MAUI UI.
- `Ports` chứa interface boundary.
- `Infrastructure` implement `Ports`.
- `Composition` wire DI, được phép reference các layer để đăng ký service.
- `Domain` chưa tạo vì boilerplate chưa có nghiệp vụ thật. Khi có nghiệp vụ đầu tiên, tạo theo module như `Domain/Sales`, `Domain/Returns`.

## Command/Query convention

Khi triển khai nghiệp vụ, dùng cấu trúc theo module:

```text
Application/
  Sales/
    Commands/
      CompleteSale/
        CompleteSaleCommand.cs
        CompleteSaleCommandHandler.cs
    Queries/
      GetSales/
        GetSalesQuery.cs
        GetSalesQueryHandler.cs
```

Không tạo thêm folder `UseCases` song song với `Commands/Queries`.

## Navigation base

- `IRouteRegistry` nằm ở `Ports/Navigation`, chịu trách nhiệm contract register route và resolve route theo ViewModel.
- `MauiRouteRegistry` nằm ở `Infrastructure/Navigation`, gọi `Routing.RegisterRoute` và lưu mapping `ViewModel -> route`.
- `INavigationService` nằm ở `Ports/Navigation`.
- `MauiNavigationService` nằm ở `Infrastructure/Navigation`, chỉ điều hướng qua Shell và resolve route qua `IRouteRegistry`.
- DI registration nằm trong `Composition/DependencyInjection.cs`.

## Verify

Command đã chạy:

```powershell
rtk dotnet build KsPos.Applications.csproj -v:m
rtk dotnet build KsPos.Applications.slnx -v:m
```

Kết quả: pass, 0 errors.

Warnings còn lại là warning có sẵn ở sample `MainPageViewModel`/control code: nullable và MVVMTK AOT warning.

## Build configuration note

- `KsPos.Applications.csproj` và `KsPos.ApplicationControls.csproj` dùng target framework theo platform, giống pattern của `MauiPOSX.Application`.
- Trên Windows dùng:

```xml
<TargetFramework Condition="$([MSBuild]::IsOSPlatform('windows'))">net10.0-windows10.0.19041.0</TargetFramework>
```

- Ngoài Windows tạm dùng:

```xml
<TargetFramework Condition="!$([MSBuild]::IsOSPlatform('windows'))">net10.0-ios</TargetFramework>
```

- Không dùng cấu hình trộn `TargetFramework=net10.0-android` với `TargetFrameworks` append Windows/iOS vì restore có thể tạo `project.assets.json` thiếu target runtime Windows hoặc kéo runtime Windows vào Android.
