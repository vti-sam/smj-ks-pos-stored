---
title: Markdown là nguồn nội dung duy nhất của tài liệu
project: smj-ks-pos
type: decision
status: active
source:
  - User-approved decision in Codex task 2026-07-28
  - project-store/artifacts/reports/program-specs/PS-01_タブレットDCS_デバイスコネクタ制御方式/
  - skills/doc-authoring/program-spec-authoring/SKILL.md
  - skills/doc-authoring/document-quality-gate/SKILL.md
  - skills/doc-authoring/program-spec-excel/SKILL.md
  - skills/doc-authoring/mermaid-office-script/SKILL.md
tags:
  - document-authoring
  - markdown
  - source-of-truth
  - program-spec
scope: durable
updated_at: 2026-07-29
---

# Markdown là nguồn nội dung duy nhất của tài liệu

## Quyết định

Đối với tài liệu có Markdown chuẩn hóa, file `.md` là nguồn nội dung duy nhất.
Các file `.xlsx`, `.docx` và `.pdf` chỉ là bản được tạo từ Markdown để review
hoặc phát hành.

Mọi thay đổi về nội dung, thuật ngữ, bảng, mô tả, liên kết và sơ đồ phải được
phản ánh vào Markdown trước. Không sửa trực tiếp file Excel, Word hoặc PDF rồi
coi file đã sửa là nguồn chính thức.

Với sơ đồ Mermaid, Markdown cũng sở hữu cấu trúc nhóm, chỉ thị render, `凡例`
và quan hệ giữa các container. Main Office Script và labels Office Script phải
được regenerate cùng nhau từ đúng block Mermaid, mang cùng fingerprint nguồn
và không được sửa tay để thay đổi nội dung hoặc cấu trúc. Một thao tác trình bày
thủ công chỉ là bước review; nếu tạo ra quyết định layout có ý nghĩa thì phải
phản ánh quyết định đó về Markdown hoặc renderer trước khi phát hành.

## Quy trình bắt buộc

1. Thu thập feedback từ comment, thread hoặc ô ghi chú trong bản review.
2. Xác định section hoặc block tương ứng trong Markdown chuẩn.
3. Sửa Markdown và các tài liệu liên quan chịu ảnh hưởng.
4. Chạy kiểm tra schema, thuật ngữ và liên kết trên Markdown.
5. Render lại Excel hoặc Word vào vùng draft hoặc bản `指摘反映済み`.
6. Read-back để xác nhận nội dung file được tạo khớp Markdown.
7. Kiểm tra trực quan các sheet hoặc trang bị ảnh hưởng.
8. Chỉ sau khi toàn bộ gate đạt mới thay hoặc đổi tên file phát hành chính thức.

Nếu lỗi thuộc layout mà Markdown không biểu diễn trực tiếp, phải sửa renderer,
template hoặc contract sở hữu layout rồi render lại. Không vá layout trực tiếp
trên file phát hành như một nguồn thay thế.

## Xử lý bản đã được review

- Luôn giữ nguyên file review gốc.
- Nội dung chỉ摘 phải được đưa về Markdown trước.
- Bản `指摘反映済み` phải được tạo lại từ Markdown đã sửa.
- Chỉ xóa comment hoặc ô ghi chú trên bản được tạo lại sau khi đã xác nhận nội
  dung tương ứng tồn tại trong Markdown.
- Nếu workbook và Markdown khác nhau, chưa được coi review hoàn tất và chưa
  được phát hành.

## Điều kiện hoàn tất

Một tài liệu chỉ được coi là chính thức khi Markdown đã pass validator, file
được render thành công, read-back khớp nội dung Markdown, không còn ghi chú
review chưa phản ánh và phần trình bày bị ảnh hưởng đã được kiểm tra trực quan.
