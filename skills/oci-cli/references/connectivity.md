# Kiểm chứng đường kết nối API

## Public, private và Bastion

- Public Gateway có endpoint public; không đồng nghĩa API được phép gọi từ mọi IP
  hoặc đã có deployment/backend hoạt động.
- Private Gateway cần đường mạng tới private endpoint. Bastion là một phương án
  truy cập, không phải bằng chứng rằng phải xóa mọi public Gateway.
- Phân biệt OCI managed Bastion với VM làm jump server. Session configuration,
  thời hạn và cách SSH tới hai loại có thể khác nhau.
- Xác nhận client/source IP được phép, session active, target host/port, subnet
  ingress/egress, hostname/TLS và API authentication riêng từng bước.
- Dùng endpoint đọc/health check đã được xác nhận không có tác động nghiệp vụ.
  Không gọi thanh toán hay thay đổi dữ liệu chỉ để thử connectivity.

## PC và thiết bị thật

Local forwarding trên PC chỉ phục vụ địa chỉ/cổng mà SSH client đang lắng nghe;
phát Wi-Fi không tự route iPad qua tunnel. Trung chuyển qua PC cần cấu hình listen,
firewall, đường gọi và TLS; mở cổng cho thiết bị khác là thay đổi mạng cần đúng quyền.

iPad có thể chạy SSH tunnel bằng ứng dụng hỗ trợ. Không nói iOS không thể tunnel.
Trước khi chốt cho dự án, xác minh app/version hỗ trợ phương thức cần dùng, khả năng
ứng dụng POS sử dụng tunnel, chuyển app/background, sleep/reconnect, hostname/TLS,
thời hạn OCI session và quyền cài/cấu hình VPN trên thiết bị quản lý.

WebSSH công bố local/dynamic forwarding và VPN-Over-SSH cho sử dụng ngoài WebSSH;
không gán remote forwarding cho WebSSH. Termius có hướng dẫn local forwarding trên
mobile; không suy ra mọi chế độ desktop đều hoạt động trên iOS. Tính năng có thể đổi
theo version: đọc tài liệu chính thức ở thời điểm triển khai.

Không tắt kiểm tra chứng chỉ để biến phép thử lỗi thành thành công. Gọi được từ PC,
trình duyệt iPad và app POS là ba bằng chứng riêng; thử thành công tạm thời chưa chứng
minh phù hợp cho nhiều vendor hay giống mạng vận hành.

## Báo cáo ngắn

Ghi rõ đã kiểm tra tới đâu: tài nguyên tồn tại → TCP/tunnel → TLS → API auth/route →
backend → app thật. Nêu bước lỗi, phạm vi, mã lỗi đã lọc và bên cần xác nhận; không
tự gán trách nhiệm hoặc coi ticket đóng là kiểm thử xong.

## Tài liệu chính thức

- [OCI Bastion port forwarding](https://docs.oracle.com/en-us/iaas/Content/Bastion/Tasks/connect-port-forwarding.htm)
- [OCI Bastion troubleshooting](https://docs.oracle.com/en-us/iaas/Content/Bastion/Tasks/troubleshooting_connect_session_failed.htm)
- [WebSSH iOS forwarding](https://webssh.net/documentation/guides/port-forwarding-ios/)
- [Termius mobile local forwarding](https://termius.com/blog/8-tips-for-using-ai-agents-on-mobile-in-termius)
- [Apple HTTPS requirements](https://developer.apple.com/documentation/security/preventing-insecure-network-connections)
