---
title: API Call And Navigation Guide
project: maui_pos_x
type: architecture
status: confirmed
source:
  - migrated from memory/maui_pos_x/application_architecture/api_call_and_navigation_guide.md
tags: [maui_pos_x, architecture, application_architecture, api_call_and_navigation_guide]
---

# Hướng dẫn gọi API và chuyển màn hình - MauiPOSX

## Mục lục

- [1. Cách gọi API từ Terminal (端末)](#1-cách-gọi-api-từ-terminal-端末)
  - [1.1. Cách thiết lập Request Parameter](#11-cách-thiết-lập-request-parameter)
  - [1.2. Cách nhận Response](#12-cách-nhận-response)
  - [1.3. Xử lý lỗi HTTP Status](#13-xử-lý-lỗi-http-status)
  - [1.4. Chuyển đổi môi trường kết nối (Mock/Dev/Staging)](#14-chuyển-đổi-môi-trường-kết-nối-mockdevstaging)
- [2. Cách chuyển màn hình (画面遷移)](#2-cách-chuyển-màn-hình-画面遷移)
  - [2.1. Cách thiết lập parameter khi chuyển màn hình](#21-cách-thiết-lập-parameter-khi-chuyển-màn-hình)
  - [2.2. Cách định nghĩa chuyển màn hình (Route Registration)](#22-cách-định-nghĩa-chuyển-màn-hình-route-registration)

---

## 1. Cách gọi API từ Terminal (端末)

### Tổng quan kiến trúc

Hệ thống sử dụng mô hình **Typed HttpClient** kết hợp **Dependency Injection (DI)**, **Handler Pipeline** và **Resilience (Polly)** để gọi API. Kiến trúc được chia thành các layer:

```
ViewModel → Service → ApiClient → HttpClientExtensions
                                        ↓
                              [ApiExceptionHandler]  ← Exception filter
                              [HttpLoggingHandler]   ← Auto logging
                              [Resilience/Polly]     ← Retry + Circuit Breaker
                                        ↓
                                   HttpClient → API Server
```

Có **9 API Client chuyên biệt**, mỗi client phụ trách một domain nghiệp vụ:

| API Client | Chức năng |
|---|---|
| `InventoryApiClient` | Quản lý tồn kho |
| `SalesApiClient` | Giao dịch bán hàng |
| `ProductApiClient` | Tra cứu sản phẩm |
| `CustomerApiClient` | Dữ liệu khách hàng |
| `DeliveryApiClient` | Thông tin giao hàng/lắp đặt |
| `MobileApiClient` | Hợp đồng di động |
| `OptionApiClient` | Dịch vụ tùy chọn |
| `TerminalApiClient` | Khởi tạo terminal |
| `EmployeeApiClient` | Dữ liệu nhân viên |

**File liên quan chính:**

- `src/MauiPOSX.Core/Http/Configuration/ApiConfiguration.cs` — Định nghĩa Base URL và Endpoint
- `src/MauiPOSX.Core/Http/Extensions/HttpClientExtensions.cs` — Extension method GET/POST
- `src/MauiPOSX.Core/Http/Extensions/QueryStringBuilder.cs` — Tự động tạo query string từ object/tuples
- `src/MauiPOSX.Core/Http/Extensions/HttpClientRegistrationExtensions.cs` — Auto-register API Client
- `src/MauiPOSX.Core/Http/Handlers/ApiExceptionHandler.cs` — Exception filter (DelegatingHandler)
- `src/MauiPOSX.Core/Http/Attributes/ApiClientAttribute.cs` — Attribute đánh dấu API Client
- `src/MauiPOSX.Core/Http/Clients/` — Các API Client
- `src/MauiPOSX.Core/ServiceCollectionExtensions.cs` — Đăng ký DI

---

### 1.1. Cách thiết lập Request Parameter

#### 1.1.1. Đăng ký HttpClient trong DI Container (Tự động)

API Client được **tự động đăng ký** thông qua attribute `[ApiClient]` và assembly scanning. Không cần đăng ký thủ công trong `ServiceCollectionExtensions.cs`.

**Cách thêm API Client mới — chỉ 2 bước:**

**Bước 1:** Tạo interface và gắn attribute `[ApiClient]`:

```csharp
using MauiPOSX.Core.Http.Attributes;

namespace MauiPOSX.Core.Http.Clients.Member;

[ApiClient]                        // Mặc định: Sales API base URL
// [ApiClient(ApiBaseUrlType.Inventory)]  // Nếu dùng Inventory API base URL
public interface IMemberInfoClient
{
    Task<ApiResponse<MemberInfoResponse>> GetMemberInfoAsync(
        string memberId, CancellationToken cancellationToken = default);
}
```

**Bước 2:** Tạo class implementation theo naming convention `IXxx → Xxx`:

```csharp
namespace MauiPOSX.Core.Http.Clients.Member;

public class MemberInfoClient : IMemberInfoClient
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<MemberInfoClient> _logger;
    private readonly IAuthenticationService? _authService;

    public MemberInfoClient(HttpClient httpClient, ILogger<MemberInfoClient> logger,
        IAuthenticationService? authService = null)
    {
        _httpClient = httpClient;
        _logger = logger;
        _authService = authService;
    }

    public async Task<ApiResponse<MemberInfoResponse>> GetMemberInfoAsync(
        string memberId, CancellationToken cancellationToken = default)
    {
        return await _httpClient.GetAsync<MemberInfoResponse>(
            "/member-info",
            _authService, _logger, cancellationToken,
            ("member_id", memberId));
    }
}
```

**Vậy là xong!** Hệ thống tự động scan assembly, tìm interface có `[ApiClient]`, match implementation theo tên, và đăng ký HttpClient với đầy đủ Base URL, Timeout, Logging Handler, và Resilience.

**Cơ chế hoạt động** (trong `ServiceCollectionExtensions.cs`):

```csharp
// Tự động đăng ký tất cả API Client có [ApiClient] attribute
services.AddApiClientsFromAssembly();
```

**ApiBaseUrlType enum:**

| Giá trị | Base URL |
|---|---|
| `Sales` (mặc định) | `ApiConfiguration.SalesApiBaseUrl` |
| `Inventory` | `ApiConfiguration.InventoryApiBaseUrl` |

**Các cấu hình mặc định** (từ `ApiConfiguration.cs`):

| Cấu hình | Giá trị |
|---|---|
| Default Timeout | 30 giây |
| Connection Timeout | 5 giây |
| Max Retry Attempts | 3 |
| User-Agent | `MauiPOSX/1.0` |
| Accept | `application/json` |
| Accept-Encoding | `gzip, deflate, br` |
| Cache-Control | `no-cache` |

#### 1.1.2. Request GET — Truyền parameter (Tự động tạo Query String)

Tất cả API Client đều sử dụng `QueryStringBuilder` để **tự động tạo query string**. Có 2 cách truyền parameter:

**Cách 1: Key-value Tuples (khuyến nghị)** — tất cả API Client hiện tại đang dùng cách này:

```csharp
// Ví dụ thực tế: CustomerApiClient.GetCustomerSearchAsync()
public async Task<ApiResponse<CustomerSearchResponse>> GetCustomerSearchAsync(
    string? corporateCode = null,
    string? storeCode = null,
    string? name = null,
    string? nameKana = null,
    string? phoneNumber = null,
    string? mobilePhoneNumber = null,
    string? zipCode = null,
    string? addressKeyword = null,
    CancellationToken cancellationToken = default)
{
    return await _httpClient.GetAsync<CustomerSearchResponse>(
        ApiConfiguration.Endpoints.CustomerSearch,
        _authService, _logger, cancellationToken,
        ("corporate_code", corporateCode),       // null → tự động bỏ qua
        ("store_code", storeCode),
        ("name", name),
        ("name_kana", nameKana),
        ("phone_number", phoneNumber),
        ("mobile_phone_number", mobilePhoneNumber),
        ("zip_code", zipCode),
        ("address_keyword", addressKeyword));
}
// Kết quả: GET /customer-search?corporate_code=001&store_code=S01&name=田中
// (các field null/empty tự động bỏ qua)
```

**Ví dụ với endpoint có path parameter** (`InventoryApiClient`):

```csharp
// Path parameter dùng .Replace(), query parameter dùng tuples
public async Task<ApiResponse<StoreStockResponse>> GetStoreStockAsync(
    string storeCode,
    string? janCode = null,
    string? instoreCode = null,
    string corporateCode = "001",
    string? dcDisplayMode = null,
    CancellationToken cancellationToken = default)
{
    var endpoint = ApiConfiguration.Endpoints.InventoryStoreStock
        .Replace("{store_code}", Uri.EscapeDataString(storeCode));

    return await _httpClient.GetAsync<StoreStockResponse>(
        endpoint,
        _authService, _logger, cancellationToken,
        ("corporate_code", corporateCode),
        ("jan_code", janCode),
        ("instore_code", instoreCode),
        ("dc_display_mode", dcDisplayMode));
}
```

**Ví dụ đơn giản** — 1 parameter:

```csharp
// EmployeeApiClient
public async Task<ApiResponse<EmployeeResponse>> GetEmployeesAsync(
    string? employeeCode = null,
    CancellationToken cancellationToken = default)
{
    return await _httpClient.GetAsync<EmployeeResponse>(
        ApiConfiguration.Endpoints.Employees,
        _authService, _logger, cancellationToken,
        ("employeeCode", employeeCode));
}
```

**Cách 2: Truyền Object** — phù hợp khi muốn tái sử dụng query model dưới dạng class:

```csharp
// Định nghĩa request model
public class CustomerSearchQuery
{
    public string? CorporateCode { get; set; }    // → corporate_code (auto snake_case)
    public string? StoreCode { get; set; }         // → store_code
    public string? Name { get; set; }              // → name
    public int? Page { get; set; }                 // → page
    public bool? IsActive { get; set; }            // → is_active (true/false)

    [JsonPropertyName("jan_code")]                 // Custom tên parameter
    public string? JanCode { get; set; }

    [QueryStringIgnore]                            // Bỏ qua property này
    public string? InternalNote { get; set; }
}

// Gọi API
return await _httpClient.GetAsync<CustomerSearchResponse>(
    ApiConfiguration.Endpoints.CustomerSearch,
    query,          // ← Object tự động convert thành query string
    _authService, _logger, cancellationToken);
```

> **Lưu ý:** Không truyền kiểu nguyên thủy trực tiếp vào overload object (ví dụ: `ToQueryString("990015")`).
> Kiểu nguyên thủy (`string`, `int`, `bool`...) sẽ được bỏ qua an toàn (trả về empty string).

**Quy tắc chuyển đổi:**

| Quy tắc | Ví dụ |
|---|---|
| Key giữ nguyên (Tuples) | `"employee_code"` → `employee_code` |
| Property name → snake_case (Object) | `CorporateCode` → `corporate_code` |
| `[JsonPropertyName]` → tên custom (Object) | `[JsonPropertyName("jan_code")]` |
| `[QueryStringIgnore]` → bỏ qua (Object) | Không đưa vào query string |
| Null/empty → bỏ qua | `null` hoặc `""` → không có trong query |
| bool → lowercase | `true` → `"true"` |
| Tất cả giá trị → URI-escaped | `田中` → `%E7%94%B0%E4%B8%AD` |

#### 1.1.3. Request POST — Truyền parameter qua Request Body (JSON)

Đối với request POST, parameter được truyền dưới dạng object và tự động serialize thành JSON:

```csharp
// Ví dụ: SalesApiClient.PostSalesEntryAsync()
public async Task<ApiResponse<SalesEntryResponse>> PostSalesEntryAsync(
    SalesEntryRequest request,
    CancellationToken cancellationToken = default)
{
    return await _httpClient.PostAsync<SalesEntryRequest, SalesEntryResponse>(
        ApiConfiguration.Endpoints.SalesEntry, request, _authService, _logger, cancellationToken);
}
```

Bên trong `HttpClientExtensions.PostAsync()`, object request được serialize như sau:

```csharp
var json = JsonSerializer.Serialize(request, DefaultJsonOptions);
var content = new StringContent(json, Encoding.UTF8, "application/json");
```

**Cấu hình JSON Serialization** (`DefaultJsonOptions`):

```csharp
private static readonly JsonSerializerOptions DefaultJsonOptions = new()
{
    PropertyNameCaseInsensitive = true,          // Không phân biệt hoa/thường khi deserialize
    PropertyNamingPolicy = null,                 // Giữ nguyên tên property
    Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping, // Cho phép ký tự Unicode
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull, // Bỏ qua null
    ReadCommentHandling = JsonCommentHandling.Skip,   // Bỏ qua comment trong JSON
    AllowTrailingCommas = true                   // Cho phép dấu phẩy cuối
};
```

#### 1.1.4. Authentication — Bearer Token

Token được tự động gắn vào header `Authorization` cho mỗi request thông qua helper method chung `AttachAuthTokenAsync`:

```csharp
// Helper chung cho cả GET và POST (trong HttpClientExtensions)
private static async Task AttachAuthTokenAsync(
    HttpRequestMessage httpRequest,
    IAuthenticationService? authService,
    CancellationToken cancellationToken)
{
    if (authService == null) return;

    var token = await authService.GetTokenAsync(cancellationToken);
    if (!string.IsNullOrEmpty(token))
    {
        httpRequest.Headers.Authorization =
            new AuthenticationHeaderValue("Bearer", token);
    }
}
```

Token được lưu trữ an toàn trong **SecureStorage** (platform-specific) thông qua `AuthenticationService`:

```csharp
// Lưu token
await authService.SetTokenAsync("your-bearer-token");

// Lấy token
var token = await authService.GetTokenAsync();

// Xóa token
await authService.ClearTokenAsync();

// Kiểm tra có token không
bool hasToken = await authService.HasTokenAsync();
```

#### 1.1.5. Danh sách Endpoint

**Inventory API:**

| Constant | Endpoint |
|---|---|
| `InventoryOwnStock` | `/inventory/stock/own` |
| `InventoryStoreStock` | `/inventory/stock/store/{store_code}` |
| `InventoryAreaStock` | `/inventory/stock/area/{area_code}` |
| `InventoryCorporateStock` | `/inventory/stock/corporate` |
| `InventoryDcStock` | `/inventory/stock/dc/{dc_code}` |
| `Product` | `/product` |
| `StoreProfile` | `/store/{store_code}` |

**Sales API:**

| Constant | Endpoint |
|---|---|
| `ProductLookup` | `/product-lookup` |
| `CustomerLookup` | `/customer-lookup` |
| `CustomerSearch` | `/customer-search` |
| `SalesEntry` | `/sales-entry` |
| `SalesCancel` | `/sales-cancel` |
| `SalesCancelValidate` | `/sales-cancel/validate` |
| `SalesPayment` | `/sales-payment` |
| `DeliveryInstallation` | `/delivery-installation` |
| `InstallationEnvironment` | `/installation-environment` |
| `WebOrderReturns` | `/web-order-returns` |
| `MobileContract` | `/mobile-contract` |
| `OptionServices` | `/option-services` |
| `TerminalInitialize` | `/terminal-initialize` |
| `StockCheck` | `/stock-check` |
| `StockReserve` | `/stock-reserve` |
| `StockRelease` | `/stock-release` |
| `PaymentValidate` | `/payment/validate` |
| `Employees` | `/employees` |

---

### 1.2. Cách nhận Response

#### 1.2.1. Cấu trúc ApiResponse\<T\>

Tất cả response đều được wrap trong class generic `ApiResponse<T>`:

```csharp
public class ApiResponse<T>
{
    public bool IsSuccess { get; set; }   // true nếu HTTP 2xx
    public T? Data { get; set; }          // Dữ liệu response (đã deserialize)
    public ErrorResponse? Error { get; set; } // Thông tin lỗi (nếu có)
    public int StatusCode { get; set; }   // HTTP Status Code
}
```

#### 1.2.2. Cách xử lý response trong code

```csharp
// Ví dụ gọi API và xử lý response
var response = await _productApiClient.GetProductLookupAsync("4901234567890");

if (response.IsSuccess)
{
    // Truy cập dữ liệu đã deserialize
    var product = response.Data;
    // Sử dụng product...
}
else
{
    // Xử lý lỗi
    var errorCode = response.Error?.Code;
    var errorMessage = response.Error?.Message;
    var httpStatusCode = response.StatusCode;
}
```

#### 1.2.3. Cấu trúc ErrorResponse

Khi API trả về lỗi, thông tin được đóng gói trong `ErrorResponse`:

```csharp
public class ErrorResponse
{
    [JsonPropertyName("code")]
    public int Code { get; set; }        // Error code từ server

    [JsonPropertyName("message")]
    public string Message { get; set; }  // Thông báo lỗi
}
```

#### 1.2.4. Quy trình xử lý Response (ProcessResponseAsync)

Luồng xử lý response trong `HttpClientExtensions.ProcessResponseAsync()`:

```
HTTP Response nhận được
  ├── IsSuccessStatusCode = true (2xx)
  │   ├── Body rỗng → Failure("Empty response body")
  │   ├── Body = "null" → Failure("Response content is null")
  │   ├── JSON parse thất bại → Failure("Invalid JSON format")
  │   ├── Deserialize ra null → Failure("Deserialized data is null")
  │   └── Thành công → Success(data)
  │
  └── IsSuccessStatusCode = false (4xx/5xx)
      ├── Body có JSON hợp lệ → Failure(ErrorResponse từ body)
      └── Body không parse được → Failure(ErrorResponse với raw content)
```

---

### 1.3. Xử lý lỗi HTTP Status

#### 1.3.1. Kiến trúc xử lý lỗi — Handler Pipeline

Xử lý lỗi HTTP được tách thành **lớp filter riêng biệt** (`ApiExceptionHandler`) nằm trong HttpClient pipeline, thay vì viết try-catch trong mỗi method GET/POST:

```
ApiClient.GetAsync() / PostAsync()
    │
    ▼
┌─────────────────────┐   Bắt HttpRequestException → trả 503 response
│  ApiExceptionHandler │   Bắt TaskCanceledException (timeout) → trả 408 response
│  (Exception Filter)  │   User cancellation → rethrow (không nuốt)
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│  HttpLoggingHandler  │   Log request/response tự động
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│  Resilience (Polly)  │   Retry + Circuit Breaker
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│     HttpClient       │ → Server
└─────────────────────┘
```

**Cơ chế hoạt động:**

Thay vì throw `ApiException`, `ApiExceptionHandler` chuyển exception thành `HttpResponseMessage` lỗi với JSON body. Response lỗi này được xử lý bình thường qua `ProcessResponseAsync` → trả về `ApiResponse<T>.Failure(...)`.

```csharp
// Trong ApiExceptionHandler (DelegatingHandler)
protected override async Task<HttpResponseMessage> SendAsync(
    HttpRequestMessage request, CancellationToken cancellationToken)
{
    try
    {
        return await base.SendAsync(request, cancellationToken);
    }
    catch (HttpRequestException ex)
    {
        // Kết nối thất bại → trả về 503 response (không throw)
        return CreateErrorResponse(HttpStatusCode.ServiceUnavailable,
            "Service unavailable", ex.Message);
    }
    catch (TaskCanceledException ex) when (ex.InnerException is TimeoutException)
    {
        // Timeout → trả về 408 response (không throw)
        return CreateErrorResponse(HttpStatusCode.RequestTimeout,
            "Request timeout", "The request timed out.");
    }
    catch (TaskCanceledException) when (cancellationToken.IsCancellationRequested)
    {
        throw; // User cancel → rethrow bình thường
    }
    catch (TaskCanceledException ex)
    {
        // HttpClient internal timeout → trả về 408 response
        return CreateErrorResponse(HttpStatusCode.RequestTimeout,
            "Request timeout", ex.Message);
    }
}
```

**Kết quả:** `GetAsync` và `PostAsync` không còn try-catch, chỉ còn logic chính:

```csharp
// GET — gọn gàng, không try-catch
public static async Task<ApiResponse<TResponse>> GetAsync<TResponse>(...)
{
    var requestId = GenerateRequestId();
    logger.LogInformation("[Request {RequestId}] GET {Endpoint}", requestId, endpoint);

    var httpRequest = new HttpRequestMessage(HttpMethod.Get, endpoint);
    await AttachAuthTokenAsync(httpRequest, authService, cancellationToken);

    var response = await httpClient.SendAsync(httpRequest, cancellationToken);
    return await ProcessResponseAsync<TResponse>(response, ...);
}
```

**File liên quan:**
- `src/MauiPOSX.Core/Http/Handlers/ApiExceptionHandler.cs` — Exception filter
- `src/MauiPOSX.Core/Http/Extensions/HttpClientExtensions.cs` — GET/POST methods (đã loại bỏ try-catch)
- `src/MauiPOSX.Core/Http/Extensions/HttpClientRegistrationExtensions.cs` — Đăng ký handler vào pipeline

#### 1.3.2. Các loại lỗi được xử lý

| Exception | Xử lý bởi | Kết quả |
|---|---|---|
| `HttpRequestException` (lỗi kết nối) | `ApiExceptionHandler` | HTTP 503 response → `ApiResponse.Failure` |
| `TaskCanceledException` + `TimeoutException` | `ApiExceptionHandler` | HTTP 408 response → `ApiResponse.Failure` |
| `TaskCanceledException` (HttpClient timeout) | `ApiExceptionHandler` | HTTP 408 response → `ApiResponse.Failure` |
| `TaskCanceledException` (user cancel) | `ApiExceptionHandler` | Rethrow (caller xử lý) |
| HTTP 4xx/5xx từ server | `ProcessResponseAsync` | `ApiResponse.Failure(ErrorResponse)` |
| JSON parse/deserialize lỗi | `ProcessResponseAsync` | `ApiResponse.Failure("Invalid JSON")` |
| Response body rỗng hoặc "null" | `ProcessResponseAsync` | `ApiResponse.Failure("Empty response")` |

#### 1.3.3. ApiException — Custom Exception

```csharp
public class ApiException : Exception
{
    public int StatusCode { get; }       // HTTP Status Code
    public int? ErrorCode { get; }       // Error Code từ server
    public string? ErrorMessage { get; } // Thông báo lỗi
}
```

#### 1.3.4. Resilience — Retry và Circuit Breaker (Polly)

Hệ thống sử dụng `Microsoft.Extensions.Http.Resilience` (dựa trên Polly) với 3 chiến lược:

**a. Retry Strategy:**

```csharp
options.Retry = new HttpRetryStrategyOptions
{
    MaxRetryAttempts = 3,                    // Tối đa 3 lần retry
    BackoffType = DelayBackoffType.Exponential, // Tăng thời gian chờ theo cấp số nhân
    Delay = TimeSpan.FromSeconds(1),         // Delay ban đầu: 1s
    MaxDelay = TimeSpan.FromSeconds(15),     // Delay tối đa: 15s
    ShouldHandle = ...                       // Điều kiện retry (xem bên dưới)
};
```

**Điều kiện retry:**
- `HttpRequestException` (lỗi kết nối)
- `TaskCanceledException` (timeout)
- HTTP Status Code >= 500 (Server Error)
- HTTP 408 (Request Timeout)
- HTTP 429 (Too Many Requests)

**b. Circuit Breaker:**

```csharp
options.CircuitBreaker = new HttpCircuitBreakerStrategyOptions
{
    FailureRatio = 0.5,                 // Mở circuit khi tỷ lệ lỗi >= 50%
    MinimumThroughput = 10,             // Tối thiểu 10 request trước khi đánh giá
    SamplingDuration = TimeSpan.FromSeconds(30), // Trong khoảng 30s
    BreakDuration = TimeSpan.FromSeconds(60),    // Nghỉ 60s khi circuit mở
};
```

**c. Total Request Timeout:**

```csharp
options.TotalRequestTimeout = new HttpTimeoutStrategyOptions
{
    Timeout = TimeSpan.FromSeconds(30)  // Timeout tổng: 30s (bao gồm cả retry)
};
```

#### 1.3.5. HTTP Logging

Mọi request/response đều được log tự động qua `HttpLoggingHandler` (DelegatingHandler):
- Method, URL, Status Code, thời gian response
- Mỗi request có `RequestId` (8 ký tự) để tracking
- Log category: `MauiPOSX.Core.Http`

---

### 1.4. Chuyển đổi môi trường kết nối (Mock/Dev/Staging)

#### 1.4.1. Chuyển đổi Base URL (Tự động theo Build Configuration)

Base URL được **tự động chọn** dựa trên chế độ build thông qua preprocessor directive trong `ApiConfiguration.cs`:

```csharp
#if DEBUG
    // Debug → Mock API (VTI/SAM) cho phát triển
    public const string InventoryApiBaseUrl = "https://mock-api-combined-542799931692.asia-northeast1.run.app";
    public const string SalesApiBaseUrl = "https://mock-api-combined-542799931692.asia-northeast1.run.app";
#elif STAGING
    // Staging → Môi trường kiểm thử (Sharp internal)
    public const string InventoryApiBaseUrl = "https://staging-api.ks-internal.local";
    public const string SalesApiBaseUrl = "https://staging-api.ks-internal.local";
#else
    // Release → Môi trường production (Sharp internal)
    public const string InventoryApiBaseUrl = "https://api.ks-internal.local";
    public const string SalesApiBaseUrl = "https://api.ks-internal.local";
#endif
```

**Cách chuyển đổi:** Chỉ cần chọn Build Configuration trong IDE hoặc command line:

```bash
# Debug (Mock API)
dotnet build -c Debug

# Staging (Staging API)
dotnet build -c Staging

# Release (Production API)
dotnet build -c Release
```

Constant `STAGING` được định nghĩa trong `.csproj`:
```xml
<PropertyGroup Condition="'$(Configuration)' == 'Staging'">
    <DefineConstants>$(DefineConstants);STAGING</DefineConstants>
</PropertyGroup>
```

> **Lưu ý:** `DEBUG` được .NET SDK tự động định nghĩa cho configuration Debug. `STAGING` cần định nghĩa thủ công trong `.csproj` (đã được cấu hình sẵn).

#### 1.4.2. Build Configuration theo môi trường

Trong file `.csproj`, có 3 cấu hình build:

| Configuration | App ID | Version |
|---|---|---|
| Debug | `jp.co.sharp.sharppospocmaui.dev` | 100 |
| Staging | `jp.co.sharp.sharppospocmaui.stg` | 200 |
| Release | `jp.co.sharp.sharppospocmaui` | 1+ |

#### 1.4.3. Mock Data (chế độ DEBUG)

Trong chế độ DEBUG, hệ thống có thể load mock data từ các file JSON trong `Resources/Raw/`:

| File | Mô tả |
|---|---|
| `mock_customers.json` | Dữ liệu khách hàng giả |
| `mock_employees.json` | Dữ liệu nhân viên giả |
| `mock_products.json` | Dữ liệu sản phẩm giả |
| `mock_stores.json` | Dữ liệu cửa hàng giả |
| `mock_pos_detail.json` | Chi tiết POS giả |
| `mock_data_print.json` | Dữ liệu in giả |

Các Service tự động load từ mock data thông qua `MockDataLoader` khi build ở chế độ DEBUG.

#### 1.4.4. Tổng hợp cấu hình theo môi trường

| Cấu hình | Debug | Staging | Release |
|---|---|---|---|
| Base URL | Mock API (VTI/SAM) | staging-api.ks-internal.local | api.ks-internal.local |
| App ID | `*.dev` | `*.stg` | `jp.co.sharp.sharppospocmaui` |
| App Title | MauiPOSX-Dev | MauiPOSX-Stg | タブレットPOS |
| Mock Data | Co (MockDataLoader) | Khong | Khong |
| Define Constants | `DEBUG` | `STAGING` | (none) |

---

## 2. Cách chuyển màn hình (画面遷移)

### Tổng quan kiến trúc

Hệ thống sử dụng **.NET MAUI Shell Navigation** kết hợp với **Navigation Service pattern** (tương tự React Router nhưng cho MAUI):

```
ViewModel → INavigationService → Shell.Current.GoToAsync() → Page
```

**File liên quan chính:**

- `src/MauiPOSX.Application/AppShell.xaml` — Cấu hình Shell
- `src/MauiPOSX.Application/AppShell.xaml.cs` — Đăng ký route
- `src/MauiPOSX.Application/Services/Abstractions/INavigationService.cs` — Interface
- `src/MauiPOSX.Application/Services/Implementations/MauiNavigationService.cs` — Implementation
- `src/MauiPOSX.Application/Services/Abstractions/INavigationAware.cs` — Lifecycle interface
- `src/MauiPOSX.Application/ViewModels/Base/BaseViewModel.cs` — Base class cho ViewModel

---

### 2.1. Cách thiết lập parameter khi chuyển màn hình

#### 2.1.1. Chuyển màn hình KHÔNG có parameter

**Cách 1: Sử dụng route string**

```csharp
// Trong ViewModel hoặc View
await _navigationService.NavigateToAsync("CustomerRegistrationPage");
```

**Cách 2: Sử dụng ViewModel type (type-safe)**

```csharp
await _navigationService.NavigateToAsync<CustomerRegistrationPageViewModel>();
```

#### 2.1.2. Chuyển màn hình CÓ parameter

Parameter được truyền dưới dạng `IDictionary<string, object>`:

```csharp
// Tạo dictionary chứa parameter
var parameters = new Dictionary<string, object>
{
    { "CustomerId", "C001" },
    { "OrderData", orderObject },
    { "IsEditMode", true }
};

// Chuyển màn hình với parameter
await _navigationService.NavigateToAsync("PurchaseHistoryDetailPage", parameters);

// Hoặc sử dụng type-safe
await _navigationService.NavigateToAsync<PurchaseHistoryDetailPageViewModel>(parameters);
```

#### 2.1.3. Nhận parameter ở màn hình đích

ViewModel đích cần implement interface `INavigationAware` (đã được implement sẵn trong `BaseViewModel`):

```csharp
public interface INavigationAware
{
    void OnNavigatedTo(object? parameter);    // Được gọi khi navigate đến
    void OnNavigatedFrom();                   // Được gọi khi navigate ra khỏi
}
```

Trong ViewModel đích, override `OnNavigatedTo` để nhận parameter:

```csharp
public class PurchaseHistoryDetailPageViewModel : BaseViewModel
{
    public override void OnNavigatedTo(object? parameter)
    {
        if (parameter is IDictionary<string, object> dict)
        {
            if (dict.TryGetValue("CustomerId", out var customerId))
            {
                // Sử dụng customerId...
            }
        }
    }
}
```

#### 2.1.4. Quay lại màn hình trước (GoBack)

```csharp
// Quay lại 1 bước trong navigation stack
await _navigationService.GoBackAsync();

// Kiểm tra có thể quay lại hay không
if (_navigationService.CanGoBack)
{
    await _navigationService.GoBackAsync();
}
```

Nội bộ, `GoBackAsync()` gọi `Shell.Current.GoToAsync("..")` — tương đương nhấn nút Back.

#### 2.1.5. Lifecycle Event

Hệ thống quản lý lifecycle thông qua global event trong `App.xaml.cs`:

| Event | Handler | Mô tả |
|---|---|---|
| `PageAppearing` | `BaseViewModel.HandleAppearingAsync()` | Page hiện ra (tương đương `viewDidAppear` trên iOS) |
| `PageDisappearing` | `BaseViewModel.HandleDisappearingAsync()` | Page ẩn đi |
| `window.Stopped` | `BaseViewModel.HandleStoppingAsync()` | App chuyển sang background |
| `window.Resumed` | `BaseViewModel.HandleResumingAsync()` | App quay lại foreground |

---

### 2.2. Cách định nghĩa chuyển màn hình (Route Registration)

#### 2.2.1. So sánh với React Router

| Khái niệm | React Router | MAUI Shell Navigation |
|---|---|---|
| Route definition | `<Route path="/home" element={<Home/>}>` | `Routing.RegisterRoute("HomeMenuPage", typeof(HomeMenuPage))` |
| Navigation | `navigate("/home")` | `Shell.Current.GoToAsync("HomeMenuPage")` |
| Parameter passing | `useParams()`, `useSearchParams()` | `IDictionary<string, object>` |
| Go back | `navigate(-1)` | `Shell.Current.GoToAsync("..")` |
| Route config file | `router.tsx` | `AppShell.xaml.cs` |

#### 2.2.2. Đăng ký Route mới — 3 bước

**Bước 1: Đăng ký Shell Route trong `AppShell.xaml.cs`**

```csharp
// Trong phương thức RegisterRoutes()
Routing.RegisterRoute("NewPage", typeof(Views.XamlDemo.NewPage));
```

**Bước 2: Đăng ký mapping Page ↔ ViewModel trong `AppShell.xaml.cs`**

```csharp
_pageService.RegisterRoute<Views.XamlDemo.NewPage, ViewModels.XamlDemo.NewPageViewModel>("NewPage");
```

**Bước 3: Đăng ký DI trong `MauiProgram.cs`**

```csharp
// Singleton — cho page truy cập thường xuyên (ví dụ: HomeMenu)
services.AddSingleton<NewPageViewModel>();
services.AddSingleton<NewPage>();

// Hoặc Transient — cho page cần state mới mỗi lần mở
services.AddTransient<NewPageViewModel>();
services.AddTransient<NewPage>();
```

#### 2.2.3. Danh sách Route hiện tại

| Route Name | Page | ViewModel |
|---|---|---|
| `HomeMenuPage` | `HomeMenuPage` | `HomeMenuPageViewModel` |
| `EmployeeAuthenticationPage` | `EmployeeAuthenticationPage` | `EmployeeAuthenticationPageViewModel` |
| `SalesSlipSearchPage` | `SalesSlipSearchPage` | `SalesSlipSearchPageViewModel` |
| `EmployeeInformationPage` | `EmployeeInformationPage` | `EmployeeInformationPageViewModel` |
| `CustomerRegistrationPage` | `CustomerRegistrationPage` | `CustomerRegistrationPageViewModel` |
| `CustomerPurchaseHistoryPage` | `CustomerPurchaseHistoryPage` | `CustomerPurchaseHistoryPageViewModel` |
| `PurchaseHistoryDetailPage` | `PurchaseHistoryDetailPage` | `PurchaseHistoryDetailPageViewModel` |
| `PaymentMethodPage` | `PaymentMethodPage` | `PaymentMethodPageViewModel` |
| `PrintReceiptPage` | `PrintReceiptPage` | `PrintReceiptPageViewModel` |
| `LookUpInventoryPage` | `LookUpInventoryPage` | `LookUpInventoryPageViewModel` |
| `CommodityRegistrationPage` | `CommodityRegistrationPage` | `CommodityRegistrationViewModel` |
| `CashManagementPage` | `CashManagementPage` | `CashManagementPageViewModel` |
| `VoucherManagementPage` | `VoucherManagementPage` | `VoucherManagementPageViewModel` |
| `VoucherCountInputPage` | `VoucherCountInputPage` | `VoucherCountInputPageViewModel` |
| `CashCountInputPage` | `CashCountInputPage` | `CashCountInputPageViewModel` |
| `BankDepositPage` | `BankDepositPage` | `BankDepositPageViewModel` |
| `BankDepositCountItemPage` | `BankDepositCountItemPage` | `BankDepositCountItemPageViewModel` |
| `ItemCountInputPage` | `ItemCountInputPage` | `ItemCountInputPageViewModel` |
| `SettlementCompletionConfirmationPage` | `SettlementCompletionConfirmationPage` | `SettlementCompletionConfirmationPageViewModel` |
| `FinalPaymentPage` | `FinalPaymentPage` | `FinalPaymentPageViewModel` |

#### 2.2.4. AppShell.xaml — Cấu hình Root

```xml
<Shell xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
       NavBarIsVisible="False"
       FlyoutBehavior="Disabled">
    <ShellContent ContentTemplate="{DataTemplate local:HomeMenuPage}" Route="HomeMenuPage" />
</Shell>
```

- **NavBar ẩn**: Ứng dụng POS sử dụng custom header
- **Flyout tắt**: Không sử dụng menu drawer
- **Root page**: `HomeMenuPage` — màn hình chính

#### 2.2.5. NavigationService — Implementation chi tiết

```csharp
public class MauiNavigationService : INavigationService
{
    // Map ViewModel type → route string
    private readonly ConcurrentDictionary<Type, string> _viewModelToRoute;

    // Đăng ký route cho ViewModel type
    public void RegisterRoute<TViewModel>(string route) where TViewModel : class
    {
        _viewModelToRoute[typeof(TViewModel)] = route;
    }

    // Navigate bằng ViewModel type (type-safe)
    public async Task<bool> NavigateToAsync<TViewModel>(IDictionary<string, object>? parameters = null)
    {
        // Tìm route từ ViewModel type
        if (!_viewModelToRoute.TryGetValue(typeof(TViewModel), out var route))
            throw new InvalidOperationException($"Route not registered for {typeof(TViewModel).Name}");

        return await NavigateToAsync(route, parameters);
    }

    // Navigate bằng route string
    public async Task<bool> NavigateToAsync(string route, IDictionary<string, object>? parameters = null)
    {
        // 1. Gọi Shell.GoToAsync (có hoặc không có parameter)
        if (parameters != null && parameters.Count > 0)
            await Shell.Current.GoToAsync(route, parameters);
        else
            await Shell.Current.GoToAsync(route);

        // 2. Gọi OnNavigatedTo trên ViewModel đích (truyền parameter)
        if (Shell.Current.CurrentPage?.BindingContext is INavigationAware newViewModel)
            newViewModel.OnNavigatedTo(parameters);

        // 3. Phát event Navigated
        Navigated?.Invoke(this, new NavigatedEventArgs { Route = route, Parameter = parameters });

        return true;
    }

    // Quay lại
    public async Task<bool> GoBackAsync()
    {
        await Shell.Current.GoToAsync("..");
        return true;
    }
}
```

---

## Phụ lục: Sơ đồ luồng gọi API

### Request Pipeline

```
┌──────────────┐    ┌──────────────┐    ┌─────────────────────┐
│   ViewModel  │───>│   Service    │───>│    API Client        │
│              │    │ (Business)   │    │ (Product, Sales,...) │
└──────────────┘    └──────────────┘    └─────────┬───────────┘
                                                   │
                                                   ▼
                                        ┌─────────────────────┐
                                        │ GetAsync / PostAsync │  AttachAuthTokenAsync
                                        │ (HttpClientExt)      │  (Bearer Token)
                                        └─────────┬───────────┘
                                                   │  HttpClient Pipeline
                                                   ▼
                                        ┌─────────────────────┐
                                        │ ApiExceptionHandler  │  Bắt HttpRequestException → 503
                                        │ (Exception Filter)   │  Bắt Timeout → 408
                                        └─────────┬───────────┘
                                                   ▼
                                        ┌─────────────────────┐
                                        │ HttpLoggingHandler   │  Log request/response
                                        └─────────┬───────────┘
                                                   ▼
                                        ┌─────────────────────┐
                                        │ Resilience (Polly)   │  Retry + Circuit Breaker
                                        └─────────┬───────────┘
                                                   ▼
                                        ┌─────────────────────┐
                                        │     HttpClient       │ ──> API Server
                                        └─────────────────────┘
```

### Response Flow

```
API Server Response
        │
        ▼
┌───────────────────────────────────────────────────────┐
│              ApiExceptionHandler                       │
│  Exception xảy ra?                                    │
│  ├── HttpRequestException → tạo 503 Response          │
│  ├── Timeout              → tạo 408 Response          │
│  └── Không exception      → trả response gốc          │
└───────────────────────┬───────────────────────────────┘
                        ▼
┌───────────────────────────────────────────────────────┐
│              ProcessResponseAsync                      │
├───────────────────────────────────────────────────────┤
│  2xx + Valid JSON     → ApiResponse<T>.Success(data)  │
│  2xx + Empty body     → Failure("Empty response body")│
│  2xx + "null"         → Failure("Response is null")   │
│  2xx + Invalid JSON   → Failure("Invalid JSON format")│
│  4xx/5xx + JSON error → Failure(ErrorResponse)        │
│  4xx/5xx + raw text   → Failure(raw content)          │
│  503 (from handler)   → Failure("Service unavailable")│
│  408 (from handler)   → Failure("Request timeout")    │
└───────────────────────────────────────────────────────┘
```
