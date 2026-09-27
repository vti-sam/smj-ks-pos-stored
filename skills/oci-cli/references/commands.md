# Lệnh đọc OCI bằng PowerShell

Các biến dưới đây là tham số đã resolve từ binding/user, không phải giá trị mặc định.
Không chạy nguyên ví dụ khi còn placeholder. `$ociExe` là executable OCI đã xác nhận;
gọi trực tiếp bằng `&` để giữ nguyên JSON, exit code và không qua shell khác.

```powershell
$ociExe = '<OCI executable>'
$ociConfig = '<local config path>'
$ociProfile = '<profile name>'
$ociRegion = '<region>'
$ociCompartment = '<compartment OCID>'
$ociAuth = 'security_token' # Chỉ dùng nếu profile thực sự là session-token.
$ociArgs = @('--config-file', $ociConfig, '--profile', $ociProfile,
             '--auth', $ociAuth, '--region', $ociRegion)
& $ociExe --version
& $ociExe session validate @ociArgs
```

Với API-key profile dùng auth mode tương ứng, không chạy session validate như thể
đó là token profile. Không in file config/private key/token. Nếu phiên hết hạn,
xem `oci session authenticate --help` và quy trình chính thức trước khi chạy;
authentication có thể mở browser và ghi local profile/key nên phải giữ đúng đích local.

## Gateway và deployment

```powershell
& $ociExe api-gateway gateway list @ociArgs --compartment-id $ociCompartment --all --query 'data.items[].{id:id,name:"display-name",type:"endpoint-type",state:"lifecycle-state"}' --output json
if ($LASTEXITCODE -ne 0) { throw 'Gateway list failed; do not treat as empty.' }

# Chọn OCID từ kết quả trên, không suy ra từ tên.
$ociGateway = '<gateway OCID from list>'
& $ociExe api-gateway gateway get @ociArgs --gateway-id $ociGateway --query 'data.{id:id,name:"display-name",compartment:"compartment-id",type:"endpoint-type",state:"lifecycle-state",subnet:"subnet-id",created:"time-created"}' --output json
if ($LASTEXITCODE -ne 0) { throw 'Gateway get failed.' }

& $ociExe api-gateway deployment list @ociArgs --compartment-id $ociCompartment --gateway-id $ociGateway --all --query 'data.items[].{id:id,name:"display-name",state:"lifecycle-state",prefix:"path-prefix"}' --output json
if ($LASTEXITCODE -ne 0) { throw 'Deployment list failed.' }
```

Kiểm tra envelope JSON theo CLI đang cài. Nếu query trả null, không kết luận không có
tài nguyên: kiểm tra help/schema và envelope trong bộ nhớ, không dump raw payload.
Nếu không biết compartment OCID, dùng IAM compartment list trong scope được phép
và lọc tên; không tự dùng tenancy root làm compartment đích. Query rỗng chỉ chứng minh
không có kết quả trong region/compartment/filter hiện tại và quyền hiện tại.

## Mạng, Bastion và quyền deploy

Chỉ đọc phần cần cho đường kết nối đang chẩn đoán. Dùng help để xác nhận flag:

- `oci network subnet get --subnet-id`: route table, security lists và subnet target.
- `oci network route-table get --rt-id`: đường đi của subnet đã chọn.
- `oci network security-list get --security-list-id`: rule ingress/egress liên quan.
- `oci network nsg rules list --nsg-id`: rule của NSG gắn vào tài nguyên.
- `oci bastion bastion list --compartment-id`: Bastion trong compartment đã chọn.
- `oci bastion session list --bastion-id`: trạng thái và thời hạn session cần dùng.
- `oci fn application list --compartment-id`: application Functions cần triển khai.
- `oci artifacts container repository list --compartment-id`: repository image đích.

Thêm cùng bộ auth/region/config arguments; xử lý phân trang theo help của từng command.
List thành công không chứng minh có quyền write/push. Không tạo repository hoặc đẩy
image chỉ để thử quyền khi user mới yêu cầu kiểm tra.

## Nguồn cú pháp

- [OCI CLI reference](https://docs.oracle.com/en-us/iaas/tools/oci-cli/latest/oci_cli_docs/)
- [Session authentication](https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/clitoken.htm)
- [Gateway commands](https://docs.oracle.com/en-us/iaas/tools/oci-cli/latest/oci_cli_docs/cmdref/api-gateway/gateway.html)
- [Listing Gateways](https://docs.oracle.com/en-us/iaas/Content/APIGateway/Tasks/apigatewaylisting.htm)

Đối chiếu command help trước mutation; reference không thay thế quyền thực hiện.
