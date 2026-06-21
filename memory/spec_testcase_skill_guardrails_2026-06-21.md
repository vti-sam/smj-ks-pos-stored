---
title: Spec And Testcase Skill Guardrails
project: smj-ks-pos
type: gotcha
status: archived
source:
  - Codex session 2026-06-21 skill hardening after customer-document Excel review
tags:
  - program-spec-excel
  - testcase-excel
  - validator
  - excel
scope: historical
captured_at: 2026-06-21
validity: historical_context
promote_to_knowledge: false
---

# Spec And Testcase Skill Guardrails

Sau khi review tài liệu Excel gửi khách hàng, hai skill `program-spec-excel` và `testcase-excel` đã được harden để tránh tái phát các lỗi trong phiên:

- Excel renderer phải convert `<br>` và literal `\n` thành newline thật trong cell.
- Testcase official author mặc định là `VTI-SAM`.
- Testcase official environment mặc định là `ローカル`; điều kiện Windows/OPOS/実機 ghi trong `前提条件`, không ghi ở header môi trường.
- Testcase sheet name phải là tiếng Nhật tự nhiên, không dùng `_` hoặc mã nội bộ như `HOST_DEVICE_IT_TC`; `更新履歴` cột `シート名` phải khớp `{sheet=...}`.
- Testcase Excel dashboard dùng `第1回（ローカル）` và `第2回（ローカル）`, không dùng `Round 1 (VDEV)` / `Round 2 (STG)`.
- Program Spec validator không được cấm `VTI-SAM`; đây là official author, không phải internal term.

Verify đã chạy:

- `rtk uv run --with openpyxl python test_testcase_excel.py` trong `skills/testcase-excel/scripts`
- `rtk uv run --with openpyxl --with pyyaml python test_program_spec.py` trong `skills/program-spec-excel/scripts`
- `rtk uv run python skills/testcase-excel/scripts/testcase_validate.py project-store/artifacts/reports/testcases/**/*.md`
- `rtk uv run python skills/program-spec-excel/scripts/spec_validate.py --profile japanese-class ...` cho 33 Program Spec Markdown
- `rtk uv run --with pyyaml python ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py` cho cả hai skill
