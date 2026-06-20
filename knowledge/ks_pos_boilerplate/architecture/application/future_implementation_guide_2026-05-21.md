---
title: Future Implementation Guide
project: ks_host
type: architecture
status: confirmed
source:
  - migrated from memory/ks_pos_boilerplate/application_architecture/future_implementation_guide_2026-05-21.md
tags: [ks_host, architecture, ks_pos_boilerplate, application_architecture, future_implementation_guide_2026_05_21]
---

# Hướng triển khai tiếp kiến trúc KsPos.Applications - 2026-05-21

## Nguyên tắc chung

Khi thêm feature mới, không đưa logic nghiệp vụ hoặc integration trực tiếp vào `ViewModel`.

Luồng chuẩn:

```text
Presentation/ViewModels
  -> Application/{Module}/Commands hoặc Queries
    -> Domain nếu có nghiệp vụ thuần
    -> Ports/* để gọi API/device/storage
      -> Infrastructure/* implementation thật
```

`ViewModel` chỉ nhận input từ UI, gọi command/query handler, rồi cập nhật state hiển thị.

## Convention Command/Query

Với thao tác có side effect, dùng Command:

```text
Application/
  Sales/
    Commands/
      PrintReceipt/
        PrintReceiptCommand.cs
        PrintReceiptCommandHandler.cs
```

Với thao tác chỉ đọc dữ liệu, dùng Query:

```text
Application/
  Sales/
    Queries/
      GetSales/
        GetSalesQuery.cs
        GetSalesQueryHandler.cs
```

Không tạo thêm folder `UseCases` song song với `Commands/Queries`; command/query handler chính là application use case.

## Khi tích hợp device control từ MauiPOSX

Ví dụ cần đưa chức năng in receipt, mở cash drawer, đọc scanner, hoặc giao tiếp thiết bị từ `MauiPOSX` sang boilerplate.

Không copy trực tiếp device code vào `ViewModel`.

Triển khai theo các bước:

1. Xác định capability thiết bị cần dùng.
   - Ví dụ: print receipt, open drawer, read barcode, connect payment terminal.

2. Tạo port interface trong `Ports/Device`.
   - Ví dụ:

```text
Ports/
  Device/
    IReceiptPrinter.cs
    ICashDrawer.cs
    IBarcodeScanner.cs
```

3. Tạo implementation trong `Infrastructure/Device`.
   - Nếu code lấy từ `MauiPOSX`, chỉ copy phần adapter/integration cần thiết.
   - Không copy business flow, Host-specific code, hoặc code phụ thuộc app shell cũ.

```text
Infrastructure/
  Device/
    MauiReceiptPrinter.cs
    MauiCashDrawer.cs
    MauiBarcodeScanner.cs
```

4. Tạo command trong `Application/{Module}/Commands`.
   - Ví dụ in receipt thuộc module `Sales`:

```text
Application/
  Sales/
    Commands/
      PrintReceipt/
        PrintReceiptCommand.cs
        PrintReceiptCommandHandler.cs
```

5. Command handler inject port interface, không inject implementation.

Ví dụ:

```csharp
public sealed record PrintReceiptCommand(string SaleId);

public sealed class PrintReceiptCommandHandler(
    IReceiptPrinter receiptPrinter,
    ISalesRepository salesRepository)
    : ICommandHandler<PrintReceiptCommand>
{
    public async Task<Result> HandleAsync(
        PrintReceiptCommand command,
        CancellationToken cancellationToken = default)
    {
        var sale = await salesRepository.GetByIdAsync(command.SaleId, cancellationToken);
        if (sale == null)
            return Result.Failure("Sale not found.");

        await receiptPrinter.PrintAsync(sale, cancellationToken);
        return Result.Success();
    }
}
```

6. `ViewModel` gọi command handler.

```csharp
var result = await printReceiptHandler.HandleAsync(new PrintReceiptCommand(SaleId));
if (result.IsFailure)
{
    // update UI state / show message
}
```

7. Đăng ký DI trong `Composition/DependencyInjection.cs`.

```csharp
services.AddSingleton<IReceiptPrinter, MauiReceiptPrinter>();
services.AddTransient<ICommandHandler<PrintReceiptCommand>, PrintReceiptCommandHandler>();
```

## Mapping từ MauiPOSX sang kiến trúc mới

Khi đọc code `MauiPOSX`, phân loại trước khi copy:

- UI/page/viewmodel cũ -> chỉ tham khảo, không copy nguyên nếu không cần.
- Base MVVM/lifecycle/navigation -> đã port một phần vào boilerplate.
- Device adapter -> chuyển vào `Infrastructure/Device`.
- Device interface hoặc contract -> chuyển vào `Ports/Device`.
- Business flow -> chuyển thành `Application/{Module}/Commands` hoặc `Workflows` nếu flow dài nhiều bước.
- Pure domain rule -> chuyển vào `Domain/{Module}` khi có nghiệp vụ thật.
- API DTO/request/response -> chuyển vào `Contracts/Api`.
- API client implementation -> chuyển vào `Infrastructure/Api`.
- Local DB/repository implementation -> chuyển vào `Infrastructure/Storage`.
- Repository interface -> chuyển vào `Ports/Storage`.

## Khi nào tạo Domain

Chỉ tạo `Domain` khi có nghiệp vụ thuần cần bảo vệ khỏi UI/API/device.

Ví dụ nên tạo:

```text
Domain/
  Sales/
    Sale.cs
    SaleLine.cs
    Payment.cs
    DiscountPolicy.cs
```

Không tạo `Domain` chỉ để chứa DTO hoặc model bind UI.

## Khi nào tạo Workflows

Chỉ tạo `Application/{Module}/Workflows` khi một flow gồm nhiều command/query hoặc nhiều bước nghiệp vụ.

Ví dụ:

- checkout nhiều bước
- return/refund nhiều bước
- end-of-day settlement
- offline sync nhiều bước

Nếu chỉ là một hành động đơn, dùng `Commands`.

## Rule cần giữ

- `Presentation` không gọi trực tiếp `Infrastructure`.
- `ViewModel` không gọi trực tiếp device/API/storage implementation.
- `Application` chỉ phụ thuộc `Domain` và `Ports`.
- `Infrastructure` implement `Ports`.
- `Composition` là nơi wire DI.
- Không đưa Host-specific code vào `KsPos.Applications`; `KsPos.Host` là phần riêng.

## Verify khi thêm feature

Tối thiểu build lại:

```powershell
rtk dotnet build KsPos.Applications.csproj -f net10.0-windows10.0.19041.0 -v:m
```

Nếu thêm command/query có logic nghiệp vụ, ưu tiên thêm unit test cho handler hoặc domain rule trước khi nối UI.
