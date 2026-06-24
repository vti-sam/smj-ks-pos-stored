---
title: Draw.io Device Connection Server Control Diagram
project: smj-ks-pos
type: lesson
status: archived
source:
  - Codex session 2026-06-23
  - project-store/artifacts/reports/architecture/ARCH-03_タブレットPOS_デバイス接続サーバー構造設計書/ARCH-03_タブレットPOS_デバイス接続サーバー制御方式構造図.yaml
tags:
  - drawio
  - architecture
  - device-connection-server
  - host
scope: historical
captured_at: 2026-06-23
validity: historical_context
promote_to_knowledge: false
---

Created a structured YAML based Draw.io diagram for the DeviceCtrl and device connection server control architecture.

Artifacts:

- `project-store/artifacts/reports/architecture/ARCH-03_タブレットPOS_デバイス接続サーバー構造設計書/ARCH-03_タブレットPOS_デバイス接続サーバー制御方式構造図.yaml`
- `project-store/artifacts/reports/architecture/ARCH-03_タブレットPOS_デバイス接続サーバー構造設計書/ARCH-03_タブレットPOS_デバイス接続サーバー制御方式構造図.drawio`
- `project-store/artifacts/reports/architecture/ARCH-03_タブレットPOS_デバイス接続サーバー構造設計書/ARCH-03_タブレットPOS_デバイス接続サーバー制御方式構造図.png`
- `project-store/artifacts/reports/architecture/ARCH-03_タブレットPOS_デバイス接続サーバー構造設計書/ARCH-03_タブレットPOS_デバイス接続サーバー制御方式構造図.svg`

The first structured render used column/row optimization and bundled device lines, but the user later clarified that the goal was to preserve the Mermaid/Markdown shape instead of merging lines. The skill and YAML were updated to support `layout: manual`, where frames, nodes, and edge waypoints are explicit and separate source lines are kept separate.

The final YAML keeps the reviewed shape: Tablet POS app and DeviceCtrl on the left, device connection server on the right, and peripheral devices in the lower band. The style uses the script palette while preserving the source layout.

After manual Draw.io refinement, the diagram convention was folded into the skill:

- Parent block titles use 20px bold.
- Child block titles use 16px bold.
- Normal nodes stay 12px.
- Parent frames use `#F8FAFC` / `#94A3B8`.
- Child frames use `#FFFFFF` / `#CBD5E1`.
- Technical edge labels can use code/bold 12px, represented in YAML as `label_format: technical`.
- Edges may target a device group frame when the intended meaning is a relationship to the whole group.

The original Mermaid source was preserved at:

- `project-store/artifacts/reports/architecture/ARCH-03_タブレットPOS_デバイス接続サーバー構造設計書/ARCH-03_タブレットPOS_デバイス接続サーバー制御方式構造図.original.md`

Verification:

- `rtk uv run --with pyyaml python skills/drawio-create/scripts/structured_diagram.py ... --fail-on-lint`
- `rtk python skills/drawio-convert/scripts/convert_drawio.py ... .svg`
- `rtk python skills/drawio-convert/scripts/convert_drawio.py ... .png`
- Visual QA opened the exported PNG and confirmed the main routes do not cross boxes.
