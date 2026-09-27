# Mẫu sổ công tháng 9/2026

`就業管理台帳_記載サンプル_202609.xlsx` là bản tham chiếu cấu trúc cho các kỳ tiếp theo. Nguồn nguyên bản là `\\10.48.196.61\99_fix管理-vtiジャパン\202609\202609_就業管理台帳_VTI_サム.xlsx`, được lưu trên share lúc 14:52 ngày 25/09/2026; người dùng cho biết quản lý đã sửa file này. SHA-256 của bản reference: `F36B243E5B71676243BB82D65436B4B0CCE655C97C565416150D6DFF1C12798F`. Bản reference trước khi thay được giữ tại `scratch/attendance-ledger/backups/就業管理台帳_記載サンプル_202609_before_manager_20260925.xlsx` (SHA-256 `E8D724F9483763D0D5E03DFC7BE953382F80E2B2FD627960314C3961EFC61276`).

So với bản Desktop của người dùng trước lần sửa này (`202609_就業管理台帳_VTI_サム.xlsx`, SHA-256 `6F366A5CB864E03C5E27C0B9FFB0BE8BCAE7AE43951F538AB00393CE6D4470EB`), các khác biệt đọc được bằng ô/thuộc tính Excel đều nằm ở sheet `派遣管理台帳`:

- `G1`: tiêu đề đổi thành `派遣先管理台帳－４（就業管理台帳）（20日締め用）`.
- 19 ô `AC26:AC57` có mã đơn hàng chuyển từ chuỗi `0387605022` sang số `387605022`; định dạng `0000"-"000000` vẫn cho hiển thị `0387-605022`. Khi nhập kỳ khác, đối chiếu cả giá trị lưu và định dạng hiển thị, không tự lấy chuỗi/số của kỳ mẫu.
- `AI72:AJ72`: xóa mã và nội dung `PGFL 受注活動` nằm ngoài vùng in `A1:AS70`.
- 89 ô đổi viền, chủ yếu ở vùng `Z21:AS25` của bảng nội dung công việc; ba ô `AC27:AC29` đổi chữ đỏ sang màu mặc định. Số ảnh nhúng, vị trí ảnh, kích thước hàng/cột và vùng in không đổi khi so với bản Desktop. Các phần media/thiết lập máy in có thay đổi nhị phân sau khi lưu bằng Excel, nhưng ảnh hiển thị trích xuất được có cùng nội dung; không suy ra đó là thay đổi nghiệp vụ.

So với bản reference cũ còn thấy `AV5` từ 4.800 thành 2.500; `E64` từ 1 thành 0, `G64` từ trống thành 0, và công thức `F65` được thay bằng số 0. Những khác biệt này **đã có ở bản Desktop** trước khi file trên share được sửa, nên không quy chúng cho quản lý. Đơn giá và ô cộng dồn là dữ liệu/điều chỉnh của kỳ này, không phải quy tắc cho kỳ sau.

Tham chiếu cách bố trí kỳ 21–20, phần tiếp nối đến cuối tháng, ô SDM INPUT, định dạng và vị trí dấu cá nhân. Đối chiếu công thức với cấu trúc kỳ mới, đặc biệt nơi bản tháng 9 có giá trị cố định thay công thức. Không sao chép ngày công, mã dự án, số tiền, ngưỡng tính tiền, tên người duyệt hoặc dấu người duyệt sang kỳ khác.
