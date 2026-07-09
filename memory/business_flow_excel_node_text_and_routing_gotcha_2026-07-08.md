---
title: Business Flow Excel node text must stay inside connector shapes
project: smj-ks-pos
type: gotcha
status: archived
source:
  - Codex session 2026-07-08 business-flow-excel 5.1 render review
  - skills/business-flow-excel/SKILL.md
  - skills/business-flow-excel/scripts/generate_office_script.py
  - skills/business-flow-excel/resources/sample_arch_host_5_1.semantic.json
tags:
  - business-flow-excel
  - office-script
  - excel-shapes
  - connector-routing
scope: historical
captured_at: 2026-07-08
validity: historical_context
promote_to_knowledge: false
---

For `skills/business-flow-excel`, every diagram component that can receive connector endpoints must be rendered as one bordered Excel shape with its text frame populated. Do not put labels such as `host_device_config.json`, `釣銭機`, `キャッシュドロア`, or `カスタマーディスプレイ` in worksheet cells while using a separate empty/transparent shape as the connector anchor.

This mistake occurred in an older 5.1 review workbook: the config/device labels appeared as cells (`U27`, `AK35`, `AK42`, `AK49`), while line endpoints were attached to blank rectangle shapes. The corrected skill rules require node text inside the same shape that receives `connectBeginShape` / `connectEndShape`.

Office Script / Excel JavaScript supports attached elbow connectors but does not expose a stable setter for arbitrary bend points or waypoints. The current approach is to keep one native connector per logical edge, use pre-layout Manhattan-style side selection, and use explicit side overrides when a vertical route would cut through device text. In the ARCH-HOST 5.1 sample, the three device-control edges use `right -> right` to keep the connector away from the device labels.
