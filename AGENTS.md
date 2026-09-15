# AGENTS.md

File này kế thừa root `AGENTS.md` và chỉ bổ sung boundary cho toàn bộ
`project-store/`. Không tạo `AGENTS.md` trong folder con; boundary đặc thù phải
được bổ sung tại đúng section này. Approval, secret, destructive action, online
write và packaging gate của root luôn còn hiệu lực.

Link nội bộ dùng path từ workspace root với prefix `project-store/`.

## Stored project

- `project-store/` là nested Git repo chứa snapshot portable riêng của project.
- Chỉ `config/`, `artifacts/`, `management/` và
  `skills/` là top-level data folder cho dữ liệu mới; knowledge/memory cũ tuân theo mục lưu trữ bên dưới.
- Application source nằm ngoài nested repo dưới `sources/<project>/`. Cache,
  index, build output, secret tracked và draft một lần không được lưu trong
  snapshot; dùng `scratch/` hoặc ignored path do owner skill quy định.
- Bootstrap bình thường chỉ kiểm tra repo stored hiện có; không tự fetch, pull,
  reset, stage, commit hoặc push. Flow `--init-stored` chỉ khởi tạo local từ rule
  mẫu, không tạo remote/commit/push. Clone/pull phải là action cụ thể đã được
  User duyệt.
- Sau thay đổi, kiểm tra status của cả root repo và nested repo. Không stage,
  commit hoặc push nếu User chưa yêu cầu.

## Source-of-truth map

| Dữ liệu | Source-of-truth hoặc đích hợp lệ |
|---|---|
| Project ID, resource binding, backend và endpoint không bí mật | `config/project.yaml` |
| Credential, token và key material | Environment hoặc local ignored config |
| WBS, risks, decisions, stakeholders, communications | `management/*.md`; Google Sheets chỉ là projection |
| Raw customer file và artifact portable | `artifacts/` |
| Workflow deterministic riêng của project | `skills/` |
| Draft, candidate, cache, index và output tạm | Workspace `scratch/` hoặc ignored path do owner skill quy định |

## config/

- `config/project.yaml` là source-of-truth portable duy nhất cho project ID,
  resource binding và backend dùng chung. Không đưa secret thật vào file này.
- `config/management.override.yaml` chỉ tồn tại khi owner workflow có một
  khác biệt đã được xác định; không dùng nó để nhân bản template chung.
- Secret thật chỉ nằm trong environment, `config/secrets.local.yaml` hoặc
  `config/keystore.local/`; các path local phải bị nested Git ignore.
- Không lưu cache hoặc index trong `config/`.
- Binding source-intelligence nếu có phải lấy từ `config/project.yaml` và
  route qua owner skill; rule này không tự tạo index.
- Khi đổi project ID, endpoint hoặc binding, chạy bootstrap dry-run và smoke
  test read-only của workflow liên quan trước online write.

## management/

- Markdown trong `management/` là source-of-truth duy nhất. Google Sheets chỉ
  là projection có thể xoá và dựng lại từ Markdown; `.sync-state.json` chỉ là
  metadata disposable, còn YAML cũ không còn là nguồn dữ liệu.
- Mọi mutation dùng completion contract của owner skill:
  `validate MD → plan → approval → publish/rebuild → read-back`.
  Không định danh record bằng row number hoặc row order.
- `watch-fast` chỉ được dùng khi User đã chủ động bắt đầu watcher và chấp nhận
  auto-projection sau mỗi lần lưu. Nó là approval scope hẹp cho thay đổi nội
  dung có stable ID/thứ tự không đổi: dùng sync-state local, ghi đúng một batch
  values và read-back. Bất kỳ thay đổi structural nào phải dừng, không tự
  rebuild hoặc tự sửa Sheet.
- Google Sheets chỉ phản ánh ngược vào Markdown khi chạy trực tiếp lệnh
  `management-google-sheets import`; lệnh này tạo candidate trước, chỉ
  `--apply` mới cập nhật Markdown chính, và không tự publish lại. Schema và
  authoring gate thuộc `management-authoring`.
- Duplicate stable `id` phải dừng; record mới chỉ được tạo khi request cho phép.
- Chỉ xóa record khi dry-run của owner workflow đánh dấu xóa từ authoritative
  snapshot đã được duyệt; thiếu record trong partial cache không tự là lệnh xóa.
- `deadline` là hạn kế hoạch; `end_date` chỉ ghi khi item hoàn thành có căn cứ.
- Tên cột và nội dung Markdown thuộc `management-authoring`; dropdown và
  generated view của WBS thuộc `management-google-sheets`; không tạo biến thể
  riêng trong rule này.
- Chỉ ghi Decisions khi task thực sự tạo hoặc thay đổi quyết định vận hành;
  không tạo decision store song song.
- Sau mọi online write, read-back đúng table và stable `id`, kiểm tra encoding
  UTF-8 và dừng nếu kết quả khác dry-run.

## Dữ liệu knowledge/memory cũ

- FalkorDB chỉ index `artifacts/`. Knowledge chuyển sang Codex Memories; không tạo
  hoặc index kho knowledge riêng trong workspace.
- `memory/` chỉ là bản lưu lịch sử; không tạo thêm hoặc index vào FalkorDB.
- Trước khi dùng lại kết luận cũ, đối chiếu evidence và trạng thái hiện tại.

## artifacts/

- File diagram riêng chỉ được quản lý nội bộ trong repo, cùng tài liệu gốc
  tương ứng. Không sao chép, đồng bộ hoặc bàn giao file diagram sang SVN hay
  bất kỳ đích nào ngoài repo. Khi chuẩn bị bộ bàn giao, kiểm tra danh sách file
  để loại file diagram riêng; sơ đồ nhúng trong tài liệu bàn giao vẫn được giữ.
- `artifacts/` lưu raw customer file và artifact portable ngoài workflow
  Google Sheets. Source/mục đích tái sử dụng phải được ghi trong metadata hoặc
  companion document; đổi tên/di chuyển phải cập nhật internal link.
- Draft/review/intermediate để trong `scratch/` hoặc output path do owner skill
  quy định; artifact chính chỉ promote sau acceptance theo workflow.
- Office projection do skill/renderer sinh không được lưu trong
  `project-store/`; luôn render vào workspace-root `scratch/<artifact-family>/`.
  Raw Office do User cung cấp vẫn được lưu như artifact nguồn; bản đã verify chỉ
  được promote vào `artifacts/` khi User yêu cầu rõ đích bàn giao.
- Naming, document ID, code, vocabulary, bundle layout và renderer thuộc
  skill tài liệu tương ứng; không copy danh sách convention vào rule này.

## skills/

- `skills/` chỉ chứa workflow portable đặc định cho project. Mỗi skill có
  `SKILL.md`; script phải deterministic, không tự gọi LLM và không hardcode
  secret.
- Script đọc binding không bí mật từ `config/project.yaml`; credential chỉ
  đọc từ environment hoặc local ignored config.
- Không lưu source, generated output, cache/index hoặc task history trong skill.
  Tài liệu bền ở `artifacts/`, candidate/draft ở `scratch/`.
- Mỗi skill phải có validator hoặc verification command tương xứng với artifact
  nó tạo.

## SCIP delta của SMJ KS POS

- `config/project.yaml` bật SCIP tường minh cho project
  `tabletposboilerplate` cùng với CodeGraph; indexer/consumer version và danh
  sách target `.csproj` trong config là binding bắt buộc của project này.
- SCIP chỉ phục vụ source-intelligence của project đã khai báo; không tự động
  index toàn bộ `sources/`, không thay thế CodeGraph và output index chỉ nằm ở
  `scratch/indexes/scip/`.

## Verification và hoàn tất

- Management và artifact phải pass completion contract của
  owner skill; verify ở phạm vi hẹp nhất chứng minh được thay đổi.
- Sau mỗi write, kiểm tra diff và status của root cùng nested `project-store/`.
