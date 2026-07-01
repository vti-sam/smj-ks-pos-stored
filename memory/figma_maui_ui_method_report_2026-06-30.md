---
title: Figma MAUI UI method report artifact
project: smj-ks-pos
type: architecture
status: archived
source:
  - Session 2026-06-29 report creation
  - Session 2026-06-30 wording cleanup
  - project-store/artifacts/reports/architecture/ARCH-UI-01_タブレットPOS_Figma_UI実装検証/ARCH-UI-01_タブレットPOS_Figma_UI実装検証_構造検証報告書.docx
  - scratch/render-ARCH-UI-01/rendered-pages-contact.png
tags:
  - figma
  - maui
  - xaml
  - ui-method
  - report
scope: historical
captured_at: 2026-06-30
validity: historical_context
promote_to_knowledge: false
---

Created the Vietnamese review DOCX report for validating feasibility of the Figma-to-.NET-MAUI-XAML UI workflow.

Main deliverable:

- `project-store/artifacts/reports/architecture/ARCH-UI-01_タブレットPOS_Figma_UI実装検証/ARCH-UI-01_タブレットPOS_Figma_UI実装検証_構造検証報告書.docx`

Supporting files in the same report bundle:

- Markdown source with the same basename.
- Comparison contact sheet PNG copied from `scratch/demo-figma-compare-patched/contact-content-no-system-bars-preview.png`.
- Metrics CSV copied from `scratch/demo-figma-compare-patched/metrics.csv`.

The report uses the existing architecture report template and covers: context, security controls, Figma/MCP workflow, MAUI integration, automatic simulator/capture/visual-diff workflow, current free/Starter Figma limitation, paid-plan scaling benefit, 50-70% UI coding effort reduction target, and a controlled bulk-conversion strategy before manual commonization.

After user review, the commercial wording was softened and reframed as opening a suitable mini team size, without stating a concrete MM number. It frames the scope as a small implementation check to see how far the Figma-to-MAUI-XAML UI method can go for one representative flow before deciding broader scope.

DOCX render QA succeeded using the documents renderer. It produced 12 page PNGs plus a QA PDF under `scratch/render-ARCH-UI-01/`; after the first render, a terminology table was changed to prose to avoid an awkward page split.

Later customer-facing cleanup converted workflow and process descriptions in the Markdown/DOCX from long inline prose or normal numbered lists to explicit `① ② ③...` step lines, then rebuilt and rendered the DOCX again. The final render produced 9 page PNGs under `scratch/render-ARCH-UI-01/`.

Final naming cleanup replaced raw Figma node IDs and ambiguous frame labels with meaningful screen/dialog names for the SMJ-facing report: `見積操作選択ダイアログ`, `商品入力画面`, and `見積書検索ダイアログ`. The wording `khách hàng` was changed to `phía SMJ様`, and the DOCX builder skill now includes a guardrail to avoid raw node IDs or `A or B` labels in SMJ-facing documents.

Final 2026-06-30 wording pass set the DOCX author/revision author to `VTI-SAM`, removed all `3MM` wording, and emphasized that the POC ran unattended after workflow preparation: first automatic loop about 2 hours, visual review/kaizen, then a second automatic loop about 30 minutes. The report now states the observed result as nearly 100% for simple screens and over 90% for the complex list-item screen, with future loops improving by enriching app/screen context and reducing manual dependency.

Later Japanese-facing cleanup converted the report body to Japanese and reframed it as a `検証提案`, not a development proposal. It added the smallest approval option: 2 weeks, 1 representative route, 5-10 screens, with report, comparison images, issue list, and estimate basis as outputs. Visible body wording was also normalized so casual English terms such as app/capture/estimate/pattern/workflow/component/layout became Japanese or katakana, while proper technical names such as Figma, .NET MAUI, XAML, ViewModel, DI, API, SVG, iOS, and Windows were kept.

The same wording guardrails were added to `skills/docx-builder/SKILL.md`: Japanese SMJ-facing documents must convert casual English operational terms to Japanese/katakana before build/render, keep only official proper technical names, frame POC proposals as `検証提案`, include a smallest concrete verification option, and avoid unsupported headline reduction rates such as `50-70%`.
