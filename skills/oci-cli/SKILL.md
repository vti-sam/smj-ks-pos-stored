---
name: oci-cli
description: Kiểm tra và thao tác OCI của project bằng CLI, gồm API Gateway, compartment, mạng, Bastion và quyền triển khai Functions/Container Registry. Dùng khi cần xác minh tài nguyên hoặc chuẩn bị thay đổi hạ tầng có phạm vi rõ.
---

# OCI CLI

## Phạm vi

Ưu tiên OCI CLI thay cho thao tác console lặp lại. Đọc trạng thái hiện tại trước
khi giải thích hoặc thay đổi. Skill không tự cấp quyền tạo, xóa, triển khai,
đổi IAM, mở mạng hay cài CLI; authorization theo yêu cầu hiện tại và rule workspace.

## Chuẩn bị

1. Xác định workspace thực sự có `project-store`. Đọc `config/project.yaml`
   để lấy binding OCI nếu có; không dump toàn bộ config hay secret.
2. Xác định CLI executable, config file, profile, auth mode, region và compartment.
   Dùng binding đã có hoặc giá trị user cung cấp. Không suy ra OCID từ tên hiển thị.
   Nếu chưa có binding, truyền tham số cho lần chạy; không tự thêm nguồn config mới.
3. Kiểm tra `oci --version` và help của command cần dùng. CLI không có trong PATH
   chưa chứng minh chưa cài; kiểm tra runtime/path đã khai báo trước khi đề nghị cài.
4. Với session token, validate profile theo reference. Browser đăng nhập được
   không chứng minh CLI còn phiên hợp lệ. Khi cần đăng nhập/MFA, dùng flow chính thức
   và để user hoàn tất phần tương tác. Không lấy token từ URL callback hoặc browser storage.

Đọc [references/commands.md](references/commands.md) cho cú pháp PowerShell.
Đọc [references/connectivity.md](references/connectivity.md) khi làm Bastion,
public/private Gateway hoặc kiểm thử từ iPad/Android.

## Kiểm tra tài nguyên

- Query đúng region và compartment; list có phân trang phải dùng `--all`.
- Lấy OCID từ kết quả list rồi get đúng tài nguyên. Tên có chữ `temp`, tên người,
  hoặc Public không chứng minh chủ sở hữu, tài nguyên bỏ được hay truy cập API được.
- Phân biệt `Authorization failed or requested resource not found` với danh sách
  rỗng thành công. Lỗi ở root compartment không chứng minh compartment con không có Gateway.
- Kiểm tra Gateway và deployment riêng: Active Gateway chưa chứng minh route,
  backend Functions, TLS, auth và mạng đã hoạt động.
- Chỉ xuất các trường cần trả lời: tên, compartment, region, endpoint type,
  trạng thái, thời điểm tạo nếu cần. Không dump credentials, request headers,
  function configuration, tag nhạy cảm hoặc toàn bộ deployment specification.
- Dừng khi có evidence đủ trả lời. Nếu thiếu quyền, báo đúng scope không đọc được;
  không tự tăng quyền hoặc thử quét toàn tenancy.

## Thay đổi có yêu cầu

Trước mutation, chuẩn bị target OCID, region, compartment, diff cấu hình,
tác động, dependency và cách phục hồi. Thực hiện khi yêu cầu đã cho phép chính
action/target đó; không hỏi lại approval đã rõ. Thiếu phạm vi hoặc action mở rộng
security access thì xử lý theo gate hiện hành.

Chuyển phương án public sang private cần kiểm tra khả năng update của phiên bản CLI/API
và lập phương án tài nguyên/deployment tương ứng; không giả định đổi một flag là đủ.
Không tự xóa public Gateway vì đã tạo private. Sau write, get/list read-back đúng OCID;
khi lỗi giữa chừng dừng chuỗi và báo phần đã chạy. Không retry create/delete mù quáng.

Quyền gọi API, quyền tạo Functions và quyền push image vào Container Registry là
những khả năng riêng. Tunnel hoạt động không chứng minh đủ quyền deploy.

## Kết quả và kiểm chứng

Trả lời: phạm vi đã kiểm tra → evidence hiện tại → kết luận → phần chưa kiểm chứng.
Phân biệt kết quả CLI trực tiếp, lời người dùng/Backlog và suy luận.
Nếu CLI bị chặn, chỉ chuyển sang console khi cần và có phiên hợp lệ; ghi rõ nguồn
console, không mô tả thành CLI đã chạy thành công.

Kiểm tra skill bằng `quick_validate.py` của skill-creator hoặc kiểm tra tương đương
frontmatter và link tương đối. Khi dùng command, exit code và JSON chọn lọc là evidence;
chưa chạy live thì chỉ ghi cú pháp đã đối chiếu, không ghi kiểm thử OCI thành công.

Không lưu credential, token, private key, URL callback đăng nhập hoặc raw terminal log
vào skill/Git. Nơi lưu secret theo `project-store/AGENTS.md`; output tạm đã lọc nằm
trong workspace `scratch/oci/` khi thực sự cần file. Không lưu lịch sử task vào skill.
