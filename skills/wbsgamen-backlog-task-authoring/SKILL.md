---
name: wbsgamen-backlog-task-authoring
description: Soạn, rà soát và chuẩn bị tạo hoặc cập nhật task trong Backlog project WBSGAMEN (KsタブレットPOS WBS（UI・共通部品）) theo mẫu task đang dùng của dự án. Dùng khi User hỏi cách tạo WBSGAMEN task, cần viết description tiếng Nhật cho task/子タスク/レビュー, cần tránh tạo task trùng, hoặc cần chuẩn bị payload Backlog; không dùng để tự ghi Backlog khi chưa có approval và không dùng để tạo file WBS riêng.
---

# WBSGAMEN Backlog Task Authoring

## Mục tiêu

Quản lý WBS bằng task trong Backlog project WBSGAMEN. Giúp người đọc nhận ra
ngay công việc, deliverable, điều kiện hoàn thành, dependency và hành động tiếp
theo. Không biến WBS thành một file Excel/Word riêng nếu source hiện tại chỉ yêu
cầu task Backlog.

Skill này giữ facts và metadata theo `backlog-sync`. Skill
`japanese-workplace-communication` giữ mục đích giao tiếp, cấu trúc câu và cách
viết tiếng Nhật. Không để câu tiếng Nhật tự bổ sung scope, owner, deadline,
đường dẫn hoặc quyết định chưa có evidence.

## Quy tắc thuật ngữ và cập nhật Markdown

- Khi task liên quan đến tài liệu thiết kế hoặc program specification, lấy tên
  logic theo tài liệu owner mới nhất: Basic Design/architecture trước,
  Configuration Guide cho tên cấu hình, rồi Program Specification cho tên chức
  năng và xử lý. Nếu có khác nhau, ghi lại biến thể cũ và chọn tên có owner,
  revision hoặc phạm vi phù hợp; không tự trộn hai thuật ngữ.
- Với Device Manager, dùng các tên logic đã được tài liệu chuẩn hóa như
  `デバイスマネージャー`, `使用デバイス選択処理`, `ストラテジー生成`,
  `ストラテジーの取得・利用順序`, `名前付きパイプ`,
  `カスタマディスプレイ`, `実行時設定`, `組込み初期設定`.
- Tên class, method, interface, file và literal chỉ giữ ở vị trí mapping để
  truy vết; không dùng tên vật lý hoặc từ tiếng Anh làm tên logic của task.
- Khi cập nhật `project-store/management/*.md`, chỉ thay đổi nội dung dữ liệu
  cần phản ánh scope đã kiểm chứng. Giữ nguyên frontmatter, H1, header bảng,
  thứ tự cột, style Markdown và schema; không thêm cột metadata Backlog vào
  management nếu schema không có cột đó.
- Skill này không tự sửa source code, không tự đổi style tài liệu nguồn và
  không biến việc chuẩn hóa management Markdown thành yêu cầu refactor. Nếu
  cần sửa source/test, chỉ mô tả đó là phạm vi task khi ticket hoặc source có
  bằng chứng.

## Bằng chứng chuẩn từ WBSGAMEN

Đọc metadata live trước khi chọn giá trị. Project đã có các issue type như
`親タスク`, `子タスク` và `レビュー`; tên, ID, category, milestone, user và
custom field có thể thay đổi, nên không hardcode số ID trong skill.

Các task mẫu đang dùng description theo khung sau:

```text
■作業内容

----------------------------------
■成果物
成果物名：
格納先リンク：
版数／更新日：

----------------------------------
■完了条件

----------------------------------
■依存・待ち事項

----------------------------------
■PMO共有事項
現時点で期限影響なし

----------------------------------
```

Giữ nguyên tên section và dấu phân cách khi tạo task tương tự. Chỉ điền
`格納先リンク` khi URL/path đã được kiểm chứng. Không điền link giả hoặc để
link estimate vào task chỉ vì tên task có chữ `見積`.

### Tách scope theo source code

Khi phạm vi có cả program specification, source code và test, phải đọc source
thật trước khi chia task. Tách theo boundary trách nhiệm/cohesive module, không
gộp toàn bộ thành một task “thiết kế・phát triển・test” và cũng không tách một
task cho từng method nhỏ. Với Device Manager, các nhóm điển hình là:

- configuration/initialization và persistence;
- active-device selection và OS/device mapping;
- strategy registration/factory;
- strategy access và lifecycle;
- platform integration (ví dụ 名前付きパイプ/event) cùng phần verification còn thiếu.

Chỉ giữ các nhóm thực sự có deliverable hoặc điểm kiểm chứng riêng. Nếu User
cho biết đã hoàn thành một phần, giữ status đang xử lý và nêu rõ phần còn phải
kiểm tra/sửa/test; không tự điền `end_date` khi chưa có evidence hoàn thành.

## Quy trình

### 1. Xác định task đích

1. Đọc root `AGENTS.md`, `project-store/AGENTS.md` và
   `skills/project-ops/backlog-sync/SKILL.md`.
2. Nếu request phụ thuộc ticket, lịch sử hoặc quyết định trước đó, chạy query
   của `skills/knowledge-code/knowledge-memory-sync/` và đọc source trực tiếp.
   Nếu FalkorDB không kết nối được, báo degraded state và không suy luận thay
   cho evidence.
3. Đọc issue liên quan bằng full issue reader. Đánh giá description, comment,
   changeLog, attachment, external link và shared-file result; nếu collector
   dừng vì giới hạn quyền, ghi rõ proof gap.
4. Tìm issue cùng parent, summary, category hoặc milestone trước khi tạo mới.
   Ưu tiên cập nhật task hiện có; chỉ tạo task mới khi không có task phù hợp.

Read-only discovery cho project chưa có binding riêng có thể dùng connection
đã cấu hình và project key lấy từ source hiện tại:

```bash
rtk uv run --with pyyaml python skills/project-ops/backlog-sync/scripts/manage.py \
  issues --connection <backlog-connection> --project-key <project-key> \
  --keyword "<từ khóa>" --count 20

rtk uv run --with pyyaml python skills/project-ops/backlog-sync/scripts/manage.py \
  get-issue <ISSUE-KEY> --role customer
```

### 2. Chốt semantic và metadata

Tách rõ bốn loại thông tin:

- `事実`: nội dung đã có trong ticket, tài liệu hoặc source;
- `認識`: cách hiểu hiện tại cần được xác nhận;
- `依頼`: việc người nhận phải làm;
- `決定`: effort, scope, owner hoặc deadline đã được chấp thuận.

Đọc live metadata trước khi render: issue type, parent issue, assignee,
category, milestone, priority, start/due date và các custom field như
`対象／グループ`, `成果物種別`, `完了基準`, `Ks様承認要否`, `遅延／影響度`,
`保留理由`. Nếu có nhiều ứng viên hoặc thiếu trường bắt buộc, dừng và hỏi
User; không chọn theo tên gần giống.

`Ks様承認要否` là custom field bắt buộc của WBSGAMEN. Payload không được bỏ
trống field này: dùng `○：Ks様承認必要` khi deliverable/source/test được gửi
hoặc cần Ks xác nhận; dùng `×：提出＆承認不要` chỉ khi có evidence rõ rằng task
không gửi và không cần Ks duyệt. Field này thuộc Backlog metadata, không được
thêm thành cột mới trong `project-store/management/WBS.md`.

Không tự chuyển MM sang `estimatedHours`. Chỉ ghi giờ khi project rule hoặc
User cung cấp công thức chuyển đổi. Effort phải truy nguyên về estimate hoặc
quyết định đã được chấp thuận.

### 3. Soạn description tiếng Việt để review

Trước khi viết tiếng Nhật gửi KH, tạo bản tiếng Việt ngắn cho User duyệt.
Giữ các facts đã xác minh và đánh dấu phần còn thiếu; không tự điền placeholder
thành sự thật.

Khi phạm vi có program specification, source code và test, ghi tách rõ từng
việc. Ví dụ semantic (chưa phải nội dung cố định của mọi ticket):

```text
■Phạm vi
- Tạo Program Specification.
- Kiểm tra và sửa source code.
- Thực hiện test.
```

Sau khi User duyệt facts, dùng Japanese Workplace Communication với audience,
relationship, medium và required action đã chốt. Đọc:

- `skills/doc-authoring/japanese-workplace-communication/SKILL.md`;
- `skills/doc-authoring/japanese-workplace-communication/references/core-communication-logic.md`;
- `skills/doc-authoring/japanese-workplace-communication/references/backlog-issue-writing.md`;
- `skills/doc-authoring/japanese-workplace-communication/references/authoring-handoff.md`.

Với description của Backlog task, viết tiếng Nhật trực tiếp, ngắn và trung tính; không thêm
greeting, closing, email ceremony hoặc lặp lại cùng một yêu cầu ở nhiều section.
Giữ nguyên stable ID đã được xác minh, URL, path, tên file, API/class và thuật
ngữ chính thức. Không tự tạo stable ID để đưa vào summary Backlog; issue key do
Backlog cấp là identifier của task. Stable ID ngắn chỉ dùng trong management
Markdown khi schema yêu cầu.

### 4. Chuẩn bị payload, chưa ghi online

Khi project binding đã tồn tại trong `project-store/config/project.yaml`, dùng
workflow của `backlog-sync`:

```bash
rtk uv run --with pyyaml python skills/project-ops/backlog-sync/scripts/issue_authoring.py \
  context --project <stored-project-id> --role customer \
  --keyword "<keyword>" --output scratch/backlog_context.yaml

rtk uv run --with pyyaml python skills/project-ops/backlog-sync/scripts/issue_authoring.py \
  validate --data-file scratch/backlog_intake.yaml \
  --context-file scratch/backlog_context.yaml \
  --project <stored-project-id> --role customer

rtk uv run --with pyyaml python skills/project-ops/backlog-sync/scripts/issue_authoring.py \
  render --data-file scratch/backlog_intake.yaml \
  --context-file scratch/backlog_context.yaml \
  --project <stored-project-id> --role customer \
  --output scratch/backlog_issue.yaml
```

Chạy `--print-request` trước create/update. Chờ User approval riêng cho
online write. Sau write, đọc lại đúng issue key và kiểm tra summary,
description, metadata, attachment/link, encoding UTF-8 và parent relation.

Nếu WBSGAMEN chưa có binding trong config, chỉ được làm discovery và draft;
không dùng nhầm binding của project khác và không tự sửa config trong skill này.

### 5. Kiểm tra hoàn tất

Chỉ báo task đã sẵn sàng khi:

- đã xác định create hay update bằng evidence;
- title và section đầu nói rõ hành động cần làm;
- scope gồm đủ spec/source/test khi nguồn yêu cầu;
- metadata bắt buộc đã được chốt hoặc đánh dấu chưa áp dụng có lý do;
- `格納先リンク` và deliverable chỉ dùng thông tin đã kiểm chứng;
- description không còn TODO, placeholder hoặc mojibake;
- dry-run đúng project/key và read-back sau write khớp payload.

Nếu thiếu quyền Shared Files, thiếu binding, thiếu assignee/category rõ ràng,
hoặc scope thay đổi trong lúc soạn, dừng ở draft và báo chính xác phần chưa
chứng minh được.

## Ranh giới

- Không tạo file WBS riêng chỉ vì User nói “WBS”.
- Không tạo/cập nhật Backlog nếu chưa có approval online write.
- Không gán estimate file từ ticket KSNEWSYS sang WBSGAMEN nếu chưa có link hoặc
  yêu cầu trực tiếp.
- Không lưu lịch sử xử lý một lần, transcript, secret hoặc task history vào
  skill. Historical outcome chỉ thuộc `project-store/memory/` khi đạt memory
  relevance gate và được User cho phép ghi.
