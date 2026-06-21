---
title: Excel Line Break Rendering Gotcha
project: smj-ks-pos
type: gotcha
status: archived
source:
  - Codex session 2026-06-21 testcase/program-spec Excel review
tags:
  - excel
  - testcase-excel
  - program-spec-excel
  - renderer
scope: historical
captured_at: 2026-06-21
validity: historical_context
promote_to_knowledge: false
---

# Excel Line Break Rendering Gotcha

Testcase và Program Spec Excel không được hiển thị literal `<br>` hoặc `\n` trong cell. Renderer phải chuyển các marker Markdown/export như `<br>`, `<br/>`, `<br />`, literal `\n`, literal `\r\n` thành newline thật (`LF`) trước khi ghi cell Excel.

Ngày 2026-06-21 đã cập nhật:

- `skills/program-spec-excel/scripts/spec_render.py`: normalize tập trung trong `normalize_cell_text()` và dùng trong `sr()`/`est_h()`.
- `skills/testcase-excel/scripts/testcase_render.py`: dùng `S.normalize_cell_text()` trong `cell()`/`mcell()`.
- Skill docs của `program-spec-excel` và `testcase-excel` ghi rõ Excel output không được show marker line break dạng chữ.

Verify đã chạy:

- Program spec regression: `rtk uv run --with openpyxl --with pyyaml python test_program_spec.py` trong `skills/program-spec-excel/scripts`.
- Render lại 6 testcase workbook và 33 program spec workbook.
- Openpyxl scan 39 workbook: không còn literal `<br`, `\n`, `\r`; có 400 cell chứa newline thật và tất cả `wrap_text=True`.
