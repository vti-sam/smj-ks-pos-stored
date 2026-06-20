---
title: Application Base Port
project: ks_host
type: architecture
status: confirmed
source:
  - migrated from memory/ks_pos_boilerplate/application_base_port_2026-05-21.md
tags: [ks_host, architecture, ks_pos_boilerplate, application_base_port_2026_05_21]
---

# Port Application base cho KsPosBoilerplate - 2026-05-21

## Bối cảnh

- Nguồn base: `sources/MauiPOSX/MauiPOSX.Application`.
- Đích: `sources/KsPosBoilerplate/KsPos.Applications`.
- Scope user đã confirm: chỉ lấy base code ở tầng Application. `KsPos.Host` là phần riêng, không copy.

## Đã triển khai

- Thêm hạ tầng base ở tầng Application:
  - abstraction và MAUI implementation cho navigation/page service
  - `BaseViewModel`
  - `BaseContentPage`
  - loading overlay
  - dictionary style dùng chung cho dimension/font/style
- Wire DI trong `MauiProgram`, `App`, và `AppShell`.
- Register `MainPage` và `MainPageViewModel` qua `IPageService`.
- Đổi `MainPage` sang kế thừa `BaseContentPage`.
- Sửa project reference hardcoded trong `KsPos.Applications` và `KsPos.ApplicationControls` sang relative path trong boilerplate.
- Sửa binding sample XAML có sẵn từ `InnerReturnCommand` sang `ReturnCommand`.

## Verify

- Command: `rtk dotnet build KsPos.Applications.csproj -f net10.0-windows10.0.19041.0 -v:m`
- Kết quả: pass, 0 errors, 14 warnings.
- Warning còn lại là nullable/AOT warning có sẵn ở sample ViewModel/control code.

## Refactor navigation base

- Đổi `IPageService`/`MauiPageService` thành `IRouteRegistry`/`MauiRouteRegistry`.
- `MauiRouteRegistry` chịu trách nhiệm register Shell route và lưu mapping `ViewModel -> route`.
- `MauiNavigationService` chỉ inject `IRouteRegistry` để resolve route khi gọi `NavigateToAsync<TViewModel>()`.
- Bỏ cast ngược từ page service sang `MauiNavigationService`.
- Bỏ hardcode xử lý `MainPage` trong navigation service.
- Verify lại cùng command build ở trên: pass, 0 errors, 14 warnings.
