# AGENTS.md

File này kế thừa root `AGENTS.md` và chỉ bổ sung boundary cho toàn bộ
`project-store/`. Không tạo `AGENTS.md` trong folder con; boundary đặc thù phải
được bổ sung tại đúng section này. Approval, secret, destructive action, online
write và packaging gate của root luôn còn hiệu lực.

Link nội bộ dùng path từ workspace root với prefix `project-store/`.

## Stored project

- **Repo riêng**: `project-store/` là nested Git repo chứa snapshot portable riêng của project.
- **Folder hợp lệ**: Chỉ `config/`, `artifacts/`, `management/` và
  `skills/` là các top-level data folder của project-store.
- **Dữ liệu ngoài snapshot**: Application source nằm ngoài nested repo dưới `sources/<project>/`. Cache,
  index, build output, secret tracked và draft một lần không được lưu trong
  snapshot; dùng `scratch/` hoặc ignored path do owner skill quy định.
- **Bootstrap**: Bootstrap bình thường chỉ kiểm tra repo stored hiện có; không tự fetch, pull,
  reset, stage, commit hoặc push. Flow `--init-stored` chỉ khởi tạo local từ rule
  mẫu, không tạo remote/commit/push. Clone/pull phải là action cụ thể đã được
  User duyệt.

## config/

- **Cấu hình chính**: `config/project.yaml` là source-of-truth portable duy nhất cho project ID,
  resource binding và backend dùng chung. Không đưa secret thật vào file này.
- **Override**: `config/management.override.yaml` chỉ tồn tại khi owner workflow có một
  khác biệt đã được xác định; không dùng nó để nhân bản template chung.
- **Secret**: Secret thật chỉ nằm trong environment, `config/secrets.local.yaml` hoặc
  `config/keystore.local/`; các path local phải bị nested Git ignore.
- **Cache và index**: Không lưu cache hoặc index trong `config/`.
- **Binding source-intelligence**: Binding source-intelligence nếu có phải lấy từ `config/project.yaml` và
  route qua owner skill; rule này không tự tạo index.
- **Đổi binding**: Khi đổi project ID, endpoint hoặc binding, chạy bootstrap dry-run và smoke
  test read-only của workflow liên quan trước online write.

## management/

- **Nguồn Markdown**: Markdown trong `management/` là source-of-truth duy nhất. Google Sheets chỉ
  là projection có thể xoá và dựng lại từ Markdown; `.sync-state.json` chỉ là
  metadata disposable, còn YAML cũ không còn là nguồn dữ liệu.
- **Quy trình ghi**: Mọi mutation dùng completion contract của owner skill:
  `validate MD → plan → approval → publish/rebuild → read-back`.
  Không định danh record bằng row number hoặc row order.
- **Watch-fast**: `watch-fast` chỉ được dùng khi User đã chủ động bắt đầu watcher và chấp nhận
  auto-projection sau mỗi lần lưu. Nó là approval scope hẹp cho thay đổi nội
  dung có stable ID/thứ tự không đổi: dùng sync-state local, ghi đúng một batch
  values và read-back. Bất kỳ thay đổi structural nào phải dừng, không tự
  rebuild hoặc tự sửa Sheet.
- **Import từ Sheets**: Google Sheets chỉ phản ánh ngược vào Markdown khi chạy trực tiếp lệnh
  `management-google-sheets import`; lệnh này tạo candidate trước, chỉ
  `--apply` mới cập nhật Markdown chính, và không tự publish lại. Schema và
  authoring gate thuộc `management-authoring`.
- **Stable ID**: Duplicate stable `id` phải dừng; record mới chỉ được tạo khi request cho phép.
- **Xóa record**: Chỉ xóa record khi dry-run của owner workflow đánh dấu xóa từ authoritative
  snapshot đã được duyệt; thiếu record trong partial cache không tự là lệnh xóa.
- **Ngày kế hoạch và hoàn thành**: `deadline` là hạn kế hoạch; `end_date` chỉ ghi khi item hoàn thành có căn cứ.
- **Owner nội dung**: Tên cột và nội dung Markdown thuộc `management-authoring`; dropdown và
  generated view của WBS thuộc `management-google-sheets`; không tạo biến thể
  riêng trong rule này.
- **Decisions**: Chỉ ghi Decisions khi task thực sự tạo hoặc thay đổi quyết định vận hành;
  không tạo decision store song song.
- **Read-back**: Sau mọi online write, read-back đúng table và stable `id`, kiểm tra encoding
  UTF-8 và dừng nếu kết quả khác dry-run.

## Tra cứu artifact

- **Phạm vi index**: FalkorDB chỉ index `artifacts/`; quy tắc memory và đối chiếu nguồn theo root.

## artifacts/

- **Bàn giao diagram**: File diagram riêng chỉ được quản lý nội bộ trong repo, cùng tài liệu gốc
  tương ứng. Không sao chép, đồng bộ hoặc bàn giao file diagram sang SVN hay
  bất kỳ đích nào ngoài repo. Khi chuẩn bị bộ bàn giao, kiểm tra danh sách file
  để loại file diagram riêng; sơ đồ nhúng trong tài liệu bàn giao vẫn được giữ.
- **Artifact nguồn**: `artifacts/` lưu raw customer file và artifact portable ngoài workflow
  Google Sheets. Source/mục đích tái sử dụng phải được ghi trong metadata hoặc
  companion document; đổi tên/di chuyển phải cập nhật internal link.
- **Draft và review**: Draft/review/intermediate để trong `scratch/` hoặc output path do owner skill
  quy định; trạng thái chấp nhận của artifact theo workflow, không suy ra từ nơi lưu file.
- **Xuất Office**: Nơi render và điều kiện promote Office theo mục "Quy tắc nguồn và bàn giao
  tài liệu" ở root.
- **Convention tài liệu**: Naming, document ID, code, vocabulary, bundle layout và renderer thuộc
  skill tài liệu tương ứng; không copy danh sách convention vào rule này.

## skills/

- **Workflow riêng**: `skills/` chỉ chứa workflow portable đặc định cho project. Mỗi skill có
  `SKILL.md`; script phải deterministic, không tự gọi LLM và không hardcode
  secret.
- **Đọc cấu hình**: Script đọc binding và credential theo mục `config/` ở trên.
- **Dữ liệu ngoài skill**: Không lưu source, generated output, cache/index hoặc task history trong skill.
  Tài liệu bền ở `artifacts/`, candidate/draft ở `scratch/`.
- **Kiểm tra skill**: Mỗi skill phải có validator hoặc verification command tương xứng với artifact
  nó tạo.

## SCIP delta của SMJ KS POS

- **Binding SCIP**: `config/project.yaml` bật SCIP tường minh cho project
  `tabletposboilerplate` cùng với CodeGraph; indexer/consumer version và danh
  sách target `.csproj` trong config là binding bắt buộc của project này.
- **Phạm vi SCIP**: SCIP chỉ phục vụ source-intelligence của project đã khai báo; không tự động
  index toàn bộ `sources/`, không thay thế CodeGraph và output index chỉ nằm ở
  `scratch/indexes/scip/`.

## Verification và hoàn tất

- **Điều kiện hoàn tất**: Management và artifact phải pass completion contract của owner skill.
  Phạm vi kiểm tra, read-back, diff/status và Git tuân theo root.
