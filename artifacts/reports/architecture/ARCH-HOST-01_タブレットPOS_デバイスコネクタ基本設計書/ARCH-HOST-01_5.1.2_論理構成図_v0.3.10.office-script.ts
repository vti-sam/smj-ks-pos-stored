// Generated from Markdown: ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
// Source contract SHA-256: a39dd9aa2b736b2818c59ce07fc18e912f2cef033362af28346380a7458e4c37
// Generated output; do not edit. Change Markdown or the owning renderer and regenerate both scripts.

function main(workbook: ExcelScript.Workbook) {
  const anchorPosition = getRunAnchorPosition(workbook);
  const sheet = createRenderWorksheet(workbook, "05_論理構成図");
  sheet.activate();
  const anchor = sheet.getCell(anchorPosition.rowIndex, anchorPosition.columnIndex);
  const originTop = anchor.getTop();
  const canvasColumnCount = 97;
  const baselineCanvasRowCount = 45;
  formatDiagramGrid(anchor, baselineCanvasRowCount, canvasColumnCount);

  const laneRange1 = getAnchoredRange(anchor, 0, 0, 1, 44);
  const laneRange2 = getAnchoredRange(anchor, 0, 44, 1, 46);
  const laneRange3 = getAnchoredRange(anchor, 0, 90, 1, 7);

  addCellLaneTable(anchor, baselineCanvasRowCount - 1);

  const shape_d512_APP_APP_ACCESS_CONTRACT = addTextShape(sheet, "shape_d512_APP_APP_ACCESS_CONTRACT", "②-6 共通デバイス通信契約\nTabletPos.DeviceContracts\n要求・応答・イベント・識別子・既定値", 0, 0, 217.08, 118.922087, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_APP_APP_ACCESS_CONTRACT, "②-6 共通デバイス通信契約 TabletPos.DeviceContracts 要求・応答・イベント・識別子・既定値", "");
  const shape_d512_HOST_HOST_EXEC_CONTROL = addTextShape(sheet, "shape_d512_HOST_HOST_EXEC_CONTROL", "②-2 要求変換・コマンド制御", 0, 0, 217.08, 73.618435, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_HOST_HOST_EXEC_CONTROL, "②-2 要求変換・コマンド制御", "");
  const shape_d512_HOST_HOST_EXEC_HOST_SETTING = addTextShape(sheet, "shape_d512_HOST_HOST_EXEC_HOST_SETTING", "②-4 デバイスコネクタ側設定", 0, 0, 217.08, 73.618435, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_HOST_HOST_EXEC_HOST_SETTING, "②-4 デバイスコネクタ側設定", "");
  const shape_d512_HOST_HOST_SERVICE_RUNTIME = addTextShape(sheet, "shape_d512_HOST_HOST_SERVICE_RUNTIME", "①-1 起動・停止管理\nMutexによる二重起動防止", 0, 0, 204.530062, 73.618435, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_HOST_HOST_SERVICE_RUNTIME, "①-1 起動・停止管理 Mutexによる二重起動防止", "");
  const shape_d512_DEVICE_DISPLAY = addTextShape(sheet, "shape_d512_DEVICE_DISPLAY", "③ カスタマディスプレイ\nSHARP RZ-4DP3", 0, 0, 197.92328, 73.618435, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_DEVICE_DISPLAY, "③ カスタマディスプレイ SHARP RZ-4DP3", "");
  const shape_d512_DEVICE_CASH = addTextShape(sheet, "shape_d512_DEVICE_CASH", "① 自動釣銭機\nGLORY RT-300／RAD-300", 0, 0, 193.204149, 73.618435, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_DEVICE_CASH, "① 自動釣銭機 GLORY RT-300／RAD-300", "");
  const shape_d512_DEVICE_PRINTER = addTextShape(sheet, "shape_d512_DEVICE_PRINTER", "⑤ レシートプリンター\nSHARP 80mm", 0, 0, 183.883867, 73.618435, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_DEVICE_PRINTER, "⑤ レシートプリンター SHARP 80mm", "");
  const shape_d512_APP_APP_COORD_PROCESS = addTextShape(sheet, "shape_d512_APP_APP_COORD_PROCESS", "①-3 デバイスコネクタ\nプロセス管理", 0, 0, 181.185114, 73.618435, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_APP_APP_COORD_PROCESS, "①-3 デバイスコネクタ プロセス管理", "");
  const shape_d512_HOST_HOST_ADAPTER_ADAPTER = addTextShape(sheet, "shape_d512_HOST_HOST_ADAPTER_ADAPTER", "③-1 ホスト内部実装\nOPOS／OCX／既存DLL", 0, 0, 176.923149, 73.618435, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_HOST_HOST_ADAPTER_ADAPTER, "③-1 ホスト内部実装 OPOS／OCX／既存DLL", "");
  const shape_d512_APP_APP_ACCESS_EVENT_RX = addTextShape(sheet, "shape_d512_APP_APP_ACCESS_EVENT_RX", "②-4 イベント受信\n現行：購読先未登録", 0, 0, 164.225739, 73.618435, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_APP_APP_ACCESS_EVENT_RX, "②-4 イベント受信 現行：購読先未登録", "");
  const shape_d512_DEVICE_DRAWER = addTextShape(sheet, "shape_d512_DEVICE_DRAWER", "② ドロア\nSHARP UP-J46DW3", 0, 0, 152.693364, 73.618435, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_DEVICE_DRAWER, "② ドロア SHARP UP-J46DW3", "");
  const shape_d512_DEVICE_PAYMENT = addTextShape(sheet, "shape_d512_DEVICE_PAYMENT", "④ 決済端末\nCAFIS Arch Saturn", 0, 0, 147.974234, 73.618435, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_DEVICE_PAYMENT, "④ 決済端末 CAFIS Arch Saturn", "");
  const shape_d512_APP_APP_COORD_LIFECYCLE = addTextShape(sheet, "shape_d512_APP_APP_COORD_LIFECYCLE", "①-2 アプリライフサイクル", 0, 0, 211.697242, 50.966609, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_APP_APP_COORD_LIFECYCLE, "①-2 アプリライフサイクル", "");
  const shape_d512_HOST_HOST_EXEC_ORDER = addTextShape(sheet, "shape_d512_HOST_HOST_EXEC_ORDER", "②-1 デバイスID別順序制御", 0, 0, 210.355239, 50.966609, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_HOST_HOST_EXEC_ORDER, "②-1 デバイスID別順序制御", "");
  const shape_d512_APP_APP_ACCESS_SELECT = addTextShape(sheet, "shape_d512_APP_APP_ACCESS_SELECT", "②-1 設定・制御方式選択", 0, 0, 197.348136, 50.966609, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_APP_APP_ACCESS_SELECT, "②-1 設定・制御方式選択", "");
  const shape_d512_APP_APP_COORD_BUSINESS = addTextShape(sheet, "shape_d512_APP_APP_COORD_BUSINESS", "①-1 画面・業務処理", 0, 0, 167.145701, 50.966609, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_APP_APP_COORD_BUSINESS, "①-1 画面・業務処理", "");
  const shape_d512_APP_APP_ACCESS_COMMAND = addTextShape(sheet, "shape_d512_APP_APP_ACCESS_COMMAND", "②-2 コマンド通信", 0, 0, 152.044484, 50.966609, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_APP_APP_ACCESS_COMMAND, "②-2 コマンド通信", "");
  const shape_d512_APP_APP_ACCESS_SYNC_RESULT = addTextShape(sheet, "shape_d512_APP_APP_ACCESS_SYNC_RESULT", "②-3 同期結果変換", 0, 0, 152.044484, 50.966609, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_APP_APP_ACCESS_SYNC_RESULT, "②-3 同期結果変換", "");
  const shape_d512_APP_APP_ACCESS_APP_SETTING = addTextShape(sheet, "shape_d512_APP_APP_ACCESS_APP_SETTING", "②-5 アプリ側設定", 0, 0, 152.044484, 50.966609, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_APP_APP_ACCESS_APP_SETTING, "②-5 アプリ側設定", "");
  const shape_d512_HOST_HOST_SERVICE_SERVER = addTextShape(sheet, "shape_d512_HOST_HOST_SERVICE_SERVER", "①-2 コマンド受付", 0, 0, 152.044484, 50.966609, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_HOST_HOST_SERVICE_SERVER, "①-2 コマンド受付", "");
  const shape_d512_HOST_HOST_SERVICE_EVENT = addTextShape(sheet, "shape_d512_HOST_HOST_SERVICE_EVENT", "①-3 イベント配信", 0, 0, 152.044484, 50.966609, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_HOST_HOST_SERVICE_EVENT, "①-3 イベント配信", "");
  const shape_d512_HOST_HOST_EXEC_MANAGER = addTextShape(sheet, "shape_d512_HOST_HOST_EXEC_MANAGER", "②-3 デバイス管理", 0, 0, 151.587318, 50.966609, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_HOST_HOST_EXEC_MANAGER, "②-3 デバイス管理", "");

  const geometryBottom = placeMermaidGeometry([shape_d512_APP_APP_ACCESS_CONTRACT, shape_d512_HOST_HOST_EXEC_CONTROL, shape_d512_HOST_HOST_EXEC_HOST_SETTING, shape_d512_HOST_HOST_SERVICE_RUNTIME, shape_d512_DEVICE_DISPLAY, shape_d512_DEVICE_CASH, shape_d512_DEVICE_PRINTER, shape_d512_APP_APP_COORD_PROCESS, shape_d512_HOST_HOST_ADAPTER_ADAPTER, shape_d512_APP_APP_ACCESS_EVENT_RX, shape_d512_DEVICE_DRAWER, shape_d512_DEVICE_PAYMENT, shape_d512_APP_APP_COORD_LIFECYCLE, shape_d512_HOST_HOST_EXEC_ORDER, shape_d512_APP_APP_ACCESS_SELECT, shape_d512_APP_APP_COORD_BUSINESS, shape_d512_APP_APP_ACCESS_COMMAND, shape_d512_APP_APP_ACCESS_SYNC_RESULT, shape_d512_APP_APP_ACCESS_APP_SETTING, shape_d512_HOST_HOST_SERVICE_SERVER, shape_d512_HOST_HOST_SERVICE_EVENT, shape_d512_HOST_HOST_EXEC_MANAGER], [1445.857643, 2584.314624, 2584.314624, 1726.51681, 3366, 3363.640435, 3358.980293, 360.206939, 3068.814473, 1004.05855, 3343.385042, 3341.025477, 135.450978, 2342.282221, 794.95683, 142.876235, 1007.712927, 1204.665836, 591.945738, 1933.118865, 1735.264406, 2796.963065], [678.705078, 449.166574, 552.043617, 398.199965, 417.5484, 315.615183, 723.348052, 312.878087, 501.548922, 714.381704, 519.481617, 621.414835, 312.878087, 449.166574, 550.722261, 392.159478, 550.722261, 555.818922, 519.576, 440.672139, 307.592661, 500.133183], anchor.getLeft(), originTop);

  addMermaidSectionBackground(sheet, "section_bg_d512_1_1", "① アプリケーション層\n（業務・プロセス管理）", anchor.getLeft() + 18.276444, originTop + 216.607826, 443.848965, 212.36087, "", 1, "#ED7D31", 2, "#111111");
  addMermaidSectionBackground(sheet, "section_bg_d512_1_2", "② デバイス制御層", anchor.getLeft() + 504.597583, originTop + 457.283478, 1061.125973, 305.233357, "", 1, "#ED7D31", 2, "#111111");
  addMermaidSectionBackground(sheet, "section_bg_d512_2_1", "① プロセス・通信サービス", anchor.getLeft() + 1612.925865, originTop + 245.300139, 407.541155, 232.181217, "", 1, "#ED7D31", 2, "#111111");
  addMermaidSectionBackground(sheet, "section_bg_d512_2_2", "② コマンド実行", anchor.getLeft() + 2225.778689, originTop + 375.548139, 686.618731, 224.630609, "", 1, "#ED7D31", 2, "#111111");
  addMermaidSectionBackground(sheet, "section_bg_d512_2_3", "③ 既存デバイス資源呼出し", anchor.getLeft() + 2969.026985, originTop + 427.930487, 242.047149, 121.753565, "", 1, "#ED7D31", 2, "#111111");
  const diagramBottom = Math.max(originTop + 42, geometryBottom, originTop + 787.19563);
  const bodyEndRowOffset = Math.max(11, Math.ceil((diagramBottom - originTop + 18) / 18) - 1);
  const canvasRowCount = Math.max(baselineCanvasRowCount, bodyEndRowOffset + 1);
  formatDiagramGrid(anchor, canvasRowCount, canvasColumnCount);
  if (bodyEndRowOffset >= baselineCanvasRowCount) {
    addCellLaneTable(anchor, bodyEndRowOffset);
  }

  const edge_d512_01_APP_APP_COORD_LIFECYCLE_to_APP_APP_COORD_PROCESS = addMermaidConnectorRoute(sheet, "edge_d512_01_APP_APP_COORD_LIFECYCLE_to_APP_APP_COORD_PROCESS", [241.299599, 265.839077], [312.878087, 312.878087], anchor.getLeft(), originTop, false, false, "①-2 アプリライフサイクル → ①-3 デバイスコネクタ", "", "#1F4E79", 2);
  const edge_d512_02_APP_APP_ACCESS_APP_SETTING_to_APP_APP_ACCESS_SELECT = addMermaidConnectorRoute(sheet, "edge_d512_02_APP_APP_ACCESS_APP_SETTING_to_APP_APP_ACCESS_SELECT", [667.96798, 675.451513, 682.125371, 682.125371, 687.316414, 692.507458], [519.576, 519.576, 526.249858, 537.036783, 542.227826, 542.227826], anchor.getLeft(), originTop, true, false, "②-5 アプリ側設定 → ②-1 設定・制御方式選択", "", "#7F7F7F", 2);
  const edge_d512_03_APP_APP_ACCESS_SELECT_to_APP_APP_ACCESS_COMMAND = addMermaidConnectorRoute(sheet, "edge_d512_03_APP_APP_ACCESS_SELECT_to_APP_APP_ACCESS_COMMAND", [893.630898, 927.915381], [550.722261, 550.722261], anchor.getLeft(), originTop, false, false, "②-1 設定・制御方式選択 → ②-2 コマンド通信", "", "#1F4E79", 2);
  const edge_d512_04_APP_APP_ACCESS_COMMAND_to_APP_APP_ACCESS_SYNC_RESULT = addMermaidConnectorRoute(sheet, "edge_d512_04_APP_APP_ACCESS_COMMAND_to_APP_APP_ACCESS_SYNC_RESULT", [1083.735169, 1124.868289], [555.818922, 555.818922], anchor.getLeft(), originTop, false, false, "②-2 コマンド通信 → ②-3 同期結果変換", "", "#1F4E79", 2);
  const edge_d512_05_APP_APP_COORD_BUSINESS_to_APP_APP_ACCESS_SELECT = addMermaidConnectorRoute(sheet, "edge_d512_05_APP_APP_COORD_BUSINESS_to_APP_APP_ACCESS_SELECT", [226.449086, 469.204105, 476.687638, 483.361496, 483.361496, 490.035354, 497.518887, 692.507458], [400.653913, 400.653913, 400.653913, 407.327771, 552.542837, 559.216696, 559.216696, 559.216696], anchor.getLeft(), originTop, false, false, "①-1 画面・業務処理 → ②-1 設定・制御方式選択", "", "#1F4E79", 2);
  const edge_d512_06_APP_APP_ACCESS_SYNC_RESULT_to_APP_APP_COORD_BUSINESS = addMermaidConnectorRoute(sheet, "edge_d512_06_APP_APP_ACCESS_SYNC_RESULT_to_APP_APP_COORD_BUSINESS", [1280.688077, 1572.802251, 1580.285784, 1586.959643, 1586.959643, 1580.285784, 3.714216, -2.959643, -2.959643, 3.714216, 11.197749, 55.52808], [555.818922, 555.818922, 555.818922, 549.145063, 449.799945, 443.126087, 443.126087, 436.452229, 398.833337, 392.159478, 392.159478, 392.159478], anchor.getLeft(), originTop, false, false, "②-3 同期結果変換 → ①-1 画面・業務処理", "", "#1F4E79", 2);
  const edge_d512_07_HOST_HOST_SERVICE_RUNTIME_to_HOST_HOST_SERVICE_SERVER = addMermaidConnectorRoute(sheet, "edge_d512_07_HOST_HOST_SERVICE_RUNTIME_to_HOST_HOST_SERVICE_SERVER", [1828.781841, 1836.265374, 1842.939232, 1842.939232, 1848.130276, 1853.321319], [410.469704, 410.469704, 417.143563, 426.986661, 432.177704, 432.177704], anchor.getLeft(), originTop, false, false, "①-1 起動・停止管理 → ①-2 コマンド受付", "", "#1F4E79", 2);
  const edge_d512_08_HOST_HOST_EXEC_HOST_SETTING_to_HOST_HOST_EXEC_MANAGER = addMermaidConnectorRoute(sheet, "edge_d512_08_HOST_HOST_EXEC_HOST_SETTING_to_HOST_HOST_EXEC_MANAGER", [2692.854624, 2700.338157, 2707.012015, 2707.012015, 2712.203058, 2717.394102], [539.773878, 539.773878, 533.10002, 518.065878, 512.874835, 512.874835], anchor.getLeft(), originTop, true, false, "②-4 デバイスコネクタ側設定 → ②-3 デバイス管理", "", "#7F7F7F", 2);
  const edge_d512_09_HOST_HOST_EXEC_ORDER_to_HOST_HOST_EXEC_CONTROL = addMermaidConnectorRoute(sheet, "edge_d512_09_HOST_HOST_EXEC_ORDER_to_HOST_HOST_EXEC_CONTROL", [2447.459841, 2471.999319], [449.166574, 449.166574], anchor.getLeft(), originTop, false, false, "②-1 デバイスID別順序制御 → ②-2 要求変換・コマンド制御", "", "#1F4E79", 2);
  const edge_d512_10_HOST_HOST_EXEC_CONTROL_to_HOST_HOST_EXEC_MANAGER = addMermaidConnectorRoute(sheet, "edge_d512_10_HOST_HOST_EXEC_CONTROL_to_HOST_HOST_EXEC_MANAGER", [2692.854624, 2700.338157, 2707.012015, 2707.012015, 2712.203058, 2717.394102], [449.166574, 449.166574, 455.840432, 482.200487, 487.39153, 487.39153], anchor.getLeft(), originTop, false, false, "②-2 要求変換・コマンド制御 → ②-3 デバイス管理", "", "#1F4E79", 2);
  const edge_d512_11_HOST_HOST_SERVICE_SERVER_to_HOST_HOST_EXEC_ORDER = addMermaidConnectorRoute(sheet, "edge_d512_11_HOST_HOST_SERVICE_SERVER_to_HOST_HOST_EXEC_ORDER", [2009.141107, 2027.545716, 2218.699993, 2233.329298], [449.166574, 449.166574, 449.166574, 449.166574], anchor.getLeft(), originTop, false, false, "①-2 コマンド受付 → ②-1 デバイスID別順序制御", "", "#1F4E79", 2);
  const edge_d512_12_HOST_HOST_EXEC_MANAGER_to_HOST_HOST_ADAPTER_ADAPTER = addMermaidConnectorRoute(sheet, "edge_d512_12_HOST_HOST_EXEC_MANAGER_to_HOST_HOST_ADAPTER_ADAPTER", [2872.756724, 2886.206246, 2886.914115, 2887.621985, 2919.476115, 2961.948289, 2976.577594], [500.133183, 500.133183, 500.841052, 501.548922, 501.548922, 501.548922, 501.548922], anchor.getLeft(), originTop, false, false, "②-3 デバイス管理 → ③-1 ホスト内部実装", "", "#1F4E79", 2);
  const edge_d512_13_HOST_HOST_EXEC_MANAGER_to_HOST_HOST_SERVICE_EVENT = addMermaidConnectorRoute(sheet, "edge_d512_13_HOST_HOST_EXEC_MANAGER_to_HOST_HOST_SERVICE_EVENT", [2872.756724, 2885.498376, 2886.914115, 2888.329855, 2919.476115, 2941.11704, 2947.790898, 2947.790898, 2941.11704, 1598.363637, 1591.689779, 1591.689779, 1598.363637, 1605.84717, 1655.46686], [512.874835, 512.874835, 514.290574, 515.706313, 515.706313, 515.706313, 509.032455, 237.816606, 231.142748, 231.142748, 237.816606, 300.918803, 307.592661, 307.592661, 307.592661], anchor.getLeft(), originTop, true, false, "デバイス処理結果", "デバイス処理結果", "#C65911", 2);
  const edge_d512_14_APP_APP_COORD_PROCESS_to_HOST_HOST_SERVICE_RUNTIME = addMermaidConnectorRoute(sheet, "edge_d512_14_APP_APP_COORD_PROCESS_to_HOST_HOST_SERVICE_RUNTIME", [450.799496, 469.204105, 1572.917491, 1589.324711, 1602.315308, 1603.207743, 1603.207743, 1604.100178, 1605.731931, 1611.979295, 1620.476474], [312.878087, 312.878087, 312.878087, 312.878087, 312.878087, 319.551945, 379.256368, 385.930226, 385.930226, 385.930226, 385.930226], anchor.getLeft(), originTop, false, false, "OSプロセス制御", "OSプロセス制御", "#548235", 2);
  const edge_d512_15_APP_APP_ACCESS_COMMAND_to_HOST_HOST_SERVICE_SERVER = addMermaidConnectorRoute(sheet, "edge_d512_15_APP_APP_ACCESS_COMMAND_to_HOST_HOST_SERVICE_SERVER", [1087.510473, 1107.812344, 1114.486202, 1114.486202, 1121.160061, 1566.670126, 1572.917491, 1574.549243, 1575.441678, 1575.441678, 1576.334113, 1589.324711, 1599.79112, 1600.683555, 1600.683555, 1601.57599, 1605.731931, 1609.193719, 1610.086154, 1610.086154, 1610.978589, 1611.979295, 1853.321319], [545.6256, 545.6256, 538.951742, 521.908258, 515.2344, 515.2344, 515.2344, 515.2344, 521.908258, 536.403411, 543.07727, 543.07727, 543.07727, 536.403411, 520.964432, 514.290574, 514.290574, 514.290574, 507.616716, 455.840432, 449.166574, 449.166574, 449.166574], anchor.getLeft(), originTop, false, true, "コマンド通信用パイプ 要求／同期応答", "コマンド通信用パイプ 要求／同期応答", "#1F4E79", 3);
  const edge_d512_16_HOST_HOST_SERVICE_EVENT_to_APP_APP_ACCESS_EVENT_RX = addMermaidConnectorRoute(sheet, "edge_d512_16_HOST_HOST_SERVICE_EVENT_to_APP_APP_ACCESS_EVENT_RX", [1811.286648, 2027.545716, 3215.564578, 3224.367332, 3225.54334, 3225.54334, 3224.367332, 2397.842609, 1589.324711, 792, -85.47735, -92.151208, -92.151208, -85.47735, -35.521643, 497.518887, 918.170376], [299.098226, 299.098226, 299.098226, 299.098226, 292.424368, 48.673858, 42, 42, 42, 42, 42, 48.673858, 707.707846, 714.381704, 714.381704, 714.381704, 714.381704], anchor.getLeft(), originTop, true, false, "イベント通知用パイプ 非同期イベント", "イベント通知用パイプ 非同期イベント", "#C65911", 2);
  const edge_d512_17_APP_APP_ACCESS_COMMAND_to_APP_APP_ACCESS_CONTRACT = addMermaidConnectorRoute(sheet, "edge_d512_17_APP_APP_ACCESS_COMMAND_to_APP_APP_ACCESS_CONTRACT", [1083.735169, 1093.654953, 1100.328811, 1100.328811, 1107.002669, 1316.486393, 1323.160251, 1323.160251, 1328.351295, 1333.542338], [566.012243, 566.012243, 572.686102, 614.740977, 621.414835, 621.414835, 628.088693, 637.837409, 643.028452, 643.028452], anchor.getLeft(), originTop, true, false, "要求・応答契約を参照", "要求・応答契約を参照", "#7F7F7F", 2);
  const edge_d512_18_APP_APP_ACCESS_EVENT_RX_to_APP_APP_ACCESS_CONTRACT = addMermaidConnectorRoute(sheet, "edge_d512_18_APP_APP_ACCESS_EVENT_RX_to_APP_APP_ACCESS_CONTRACT", [1086.17142, 1333.542338], [714.381704, 714.381704], anchor.getLeft(), originTop, true, false, "イベント契約を参照", "イベント契約を参照", "#7F7F7F", 2);
  const edge_d512_19_HOST_HOST_SERVICE_SERVER_to_APP_APP_ACCESS_CONTRACT = addMermaidConnectorRoute(sheet, "edge_d512_19_HOST_HOST_SERVICE_SERVER_to_APP_APP_ACCESS_CONTRACT", [2009.141107, 2027.545716, 2049.18664, 2055.860499, 2055.860499, 2062.534357, 3215.564578, 3221.041077, 3222.217086, 3222.217086, 3221.041077, 2397.842609, 1589.324711, 792, -66.600828, -73.274686, -73.274686, -66.600828, -35.521643, 497.518887, 1288.17161, 1294.845469, 1294.845469, 1301.519327, 1333.542338], [432.177704, 432.177704, 432.177704, 425.503846, 367.12078, 360.446922, 360.446922, 360.446922, 353.773063, 102.471945, 95.798087, 95.798087, 95.798087, 95.798087, 95.798087, 102.471945, 655.797411, 662.47127, 662.47127, 662.47127, 662.47127, 669.145128, 683.923429, 690.597287, 690.597287], anchor.getLeft(), originTop, true, false, "要求・応答契約を参照", "要求・応答契約を参照", "#7F7F7F", 2);
  const edge_d512_20_HOST_HOST_SERVICE_EVENT_to_APP_APP_ACCESS_CONTRACT = addMermaidConnectorRoute(sheet, "edge_d512_20_HOST_HOST_SERVICE_EVENT_to_APP_APP_ACCESS_CONTRACT", [1811.286648, 2027.545716, 3215.564578, 3217.714823, 3218.890832, 3218.890832, 3217.714823, 2397.842609, 1589.324711, 792, -47.724306, -54.398164, -54.398164, -47.724306, -35.521643, 497.518887, 1302.329002, 1309.00286, 1309.00286, 1315.676718, 1333.542338], [316.087096, 316.087096, 316.087096, 316.087096, 309.413237, 144.944119, 138.270261, 138.270261, 138.270261, 138.270261, 138.270261, 144.944119, 640.696194, 647.370052, 647.370052, 647.370052, 647.370052, 654.04391, 660.139011, 666.81287, 666.81287], anchor.getLeft(), originTop, true, false, "イベント契約を参照", "イベント契約を参照", "#7F7F7F", 2);
  const edge_d512_21_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_CASH = addMermaidConnectorRoute(sheet, "edge_d512_21_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_CASH", [3161.051352, 3212.32148, 3215.564578, 3239.056247, 3254.303619, 3255.479627, 3255.479627, 3256.655635, 3258.805881, 3263.367661, 3264.543669, 3264.543669, 3265.458389, 3266.373109], [477.009443, 477.009443, 477.009443, 477.009443, 477.009443, 470.335585, 426.10991, 419.436052, 419.436052, 419.436052, 412.762194, 333.075965, 327.884922, 327.884922], anchor.getLeft(), originTop, false, true, "制御／結果", "制御／結果", "#7030A0", 2);
  const edge_d512_22_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_DRAWER = addMermaidConnectorRoute(sheet, "edge_d512_22_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_DRAWER", [3161.051352, 3170.489613, 3171.433439, 3172.377265, 3212.32148, 3215.564578, 3231.01984, 3232.195848, 3232.195848, 3233.371857, 3239.056247, 3258.805881, 3266.373109], [489.279183, 489.279183, 490.223009, 491.166835, 491.166835, 491.166835, 491.166835, 497.840693, 512.807759, 519.481617, 519.481617, 519.481617, 519.481617], anchor.getLeft(), originTop, false, true, "制御／結果", "制御／結果", "#7030A0", 2);
  const edge_d512_23_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_DISPLAY = addMermaidConnectorRoute(sheet, "edge_d512_23_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_DISPLAY", [3161.051352, 3169.545787, 3171.433439, 3173.321091, 3212.32148, 3215.564578, 3227.693586, 3228.869594, 3228.869594, 3230.045602, 3239.056247, 3250.977364, 3252.153373, 3252.153373, 3253.329381, 3258.805881, 3263.367661, 3264.543669, 3264.543669, 3265.458389, 3266.373109], [501.548922, 501.548922, 503.436574, 505.324226, 505.324226, 505.324226, 505.324226, 511.998084, 555.279933, 561.953791, 561.953791, 561.953791, 555.279933, 540.312867, 533.639009, 533.639009, 533.639009, 526.96515, 435.009183, 429.818139, 429.818139], anchor.getLeft(), originTop, false, true, "制御／結果", "制御／結果", "#7030A0", 2);
  const edge_d512_24_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_PAYMENT = addMermaidConnectorRoute(sheet, "edge_d512_24_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_PAYMENT", [3161.051352, 3182.759352, 3185.59083, 3188.422308, 3212.32148, 3215.564578, 3224.367332, 3225.54334, 3225.54334, 3226.719348, 3239.056247, 3250.977364, 3252.153373, 3252.153373, 3253.329381, 3258.805881, 3266.373109], [513.818661, 513.818661, 516.650139, 519.481617, 519.481617, 519.481617, 519.481617, 526.155476, 597.752107, 604.425965, 604.425965, 604.425965, 611.099823, 614.740977, 621.414835, 621.414835, 621.414835], anchor.getLeft(), originTop, false, true, "制御／結果", "制御／結果", "#7030A0", 2);
  const edge_d512_25_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_PRINTER = addMermaidConnectorRoute(sheet, "edge_d512_25_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_PRINTER", [3161.051352, 3167.658135, 3171.433439, 3175.208743, 3212.32148, 3215.564578, 3221.041077, 3222.217086, 3222.217086, 3223.393094, 3239.056247, 3254.303619, 3255.479627, 3255.479627, 3256.655635, 3258.805881, 3266.373109], [526.0884, 526.0884, 529.863704, 533.639009, 533.639009, 533.639009, 533.639009, 540.312867, 640.224281, 646.898139, 646.898139, 646.898139, 653.571997, 704.404455, 711.078313, 711.078313, 711.078313], anchor.getLeft(), originTop, false, true, "制御／結果", "制御／結果", "#7030A0", 2);

  configurePdfReview(workbook, sheet, anchor, canvasRowCount, canvasColumnCount, false);
}

function addCellLaneTable(anchor: ExcelScript.Range, bodyEndRowOffset: number) {
  addLaneColumns(anchor, 0, 0, 44, bodyEndRowOffset, "（1） タブレットPOS端末アプリ（アプリプロセス）", "#F7FBFF", 0, "#4472C4", 2, "#111111");
  addLaneColumns(anchor, 0, 44, 46, bodyEndRowOffset, "（2） デバイスコネクタ（Windows別プロセス）", "#FCE4D6", 0, "#ED7D31", 2, "#111111");
  addLaneColumns(anchor, 0, 90, 7, bodyEndRowOffset, "（3） 周辺機器", "#E4DFEC", 0, "#8064A2", 2, "#111111");
}

function placeMermaidGeometry(shapes: ExcelScript.Shape[], centerOffsetsX: number[], centerOffsetsY: number[], originLeft: number, originTop: number): number {
  if (shapes.length !== centerOffsetsX.length || shapes.length !== centerOffsetsY.length) {
    throw new Error("Mermaid geometry arrays must have identical lengths.");
  }
  let diagramBottom = originTop;
  for (let i = 0; i < shapes.length; i++) {
    const shape = shapes[i];
    shape.setLeft(originLeft + centerOffsetsX[i] - shape.getWidth() / 2);
    shape.setTop(originTop + centerOffsetsY[i] - shape.getHeight() / 2);
    diagramBottom = Math.max(diagramBottom, shape.getTop() + shape.getHeight());
  }
  return diagramBottom;
}

function applyShapeView(shape: ExcelScript.Shape, fill: string, bordered: boolean, dashed: boolean, stroke: string, fillTransparency: number, lineWeight: number) {
  if (fill && fillTransparency < 1) {
    shape.getFill().setSolidColor(fill);
    shape.getFill().setTransparency(fillTransparency);
  } else {
    shape.getFill().setTransparency(1);
  }
  const lineVisible = bordered && stroke.length > 0 && lineWeight > 0;
  shape.getLineFormat().setVisible(lineVisible);
  if (!lineVisible) {
    return;
  }
  shape.getLineFormat().setColor(stroke);
  shape.getLineFormat().setWeight(lineWeight);
  if (dashed) {
    shape.getLineFormat().setDashStyle(ExcelScript.ShapeLineDashStyle.dash);
  }
}

function applyConnectorView(connector: ExcelScript.Shape, line: ExcelScript.Line, dashed: boolean, bidirectional: boolean, color: string, lineWeight: number) {
  applyConnectorSegmentView(connector, line, dashed, bidirectional, true, color, lineWeight);
}

function applyConnectorSegmentView(connector: ExcelScript.Shape, line: ExcelScript.Line, dashed: boolean, beginArrow: boolean, endArrow: boolean, color: string, lineWeight: number) {
  connector.getLineFormat().setVisible(true);
  connector.getLineFormat().setColor(color);
  connector.getLineFormat().setWeight(lineWeight);
  if (dashed) {
    connector.getLineFormat().setDashStyle(ExcelScript.ShapeLineDashStyle.dash);
  }
  if (beginArrow) {
    line.setBeginArrowheadStyle(ExcelScript.ArrowheadStyle.triangle);
  }
  if (endArrow) {
    line.setEndArrowheadStyle(ExcelScript.ArrowheadStyle.triangle);
  }
}

function applyConnectorLabelView(box: ExcelScript.Shape, fill: string, fillTransparency: number, stroke: string, lineWeight: number) {
  applyShapeView(box, fill, stroke.length > 0 && lineWeight > 0, false, stroke, fillTransparency, lineWeight);
}

function applyCommentView(box: ExcelScript.Shape, fill: string, fillTransparency: number, stroke: string, lineWeight: number) {
  applyShapeView(box, fill, true, false, stroke, fillTransparency, lineWeight);
}

function stableIdBucket(sourceId: string, bucketCount: number): number {
  let value = 0;
  for (let i = 0; i < sourceId.length; i++) {
    value = (value * 31 + sourceId.charCodeAt(i)) % 2147483647;
  }
  return bucketCount > 0 ? value % bucketCount : 0;
}

function isBranchConnectorLabel(text: string): boolean {
  const normalized = text.replace(/\s+/g, "").toLowerCase();
  return ["はい", "いいえ", "có", "không", "yes", "no"].indexOf(normalized) >= 0;
}

function shapeCommentPositionOrder(sourceId: string, preferLeft: boolean): string[] {
  const horizontalFirst = preferLeft ? ["left", "right"] : ["right", "left"];
  const allPositions = [horizontalFirst[0], horizontalFirst[1], "bottom", "top", "bottomRight", "bottomLeft", "topRight", "topLeft"];
  const offset = stableIdBucket(sourceId, allPositions.length);
  const positions: string[] = [];
  for (let i = 0; i < allPositions.length; i++) {
    positions.push(allPositions[(i + offset) % allPositions.length]);
  }
  return positions;
}

function shapeCommentPosition(position: string, targetLeft: number, targetTop: number, targetRight: number, targetBottom: number, targetWidth: number, targetHeight: number, width: number, height: number, gap: number): number[] {
  if (position === "left") return [targetLeft - width - gap, targetTop + (targetHeight - height) / 2];
  if (position === "right") return [targetRight + gap, targetTop + (targetHeight - height) / 2];
  if (position === "bottom") return [targetLeft + (targetWidth - width) / 2, targetBottom + gap];
  if (position === "top") return [targetLeft + (targetWidth - width) / 2, targetTop - height - gap];
  if (position === "bottomRight") return [targetRight + gap, targetBottom + gap];
  if (position === "bottomLeft") return [targetLeft - width - gap, targetBottom + gap];
  if (position === "topRight") return [targetRight + gap, targetTop - height - gap];
  return [targetLeft - width - gap, targetTop - height - gap];
}

function collectDiagramObstacleBounds(shapes: ExcelScript.Shape[], obstacleBounds: number[][]) {
  for (let i = 0; i < shapes.length; i++) {
    const id = shapes[i].getName();
    if (id.indexOf("section_bg_") === 0) {
      const title = shapes[i].getTextFrame().getTextRange().getText();
      const titleLineCount = Math.max(1, title.split("\n").length);
      const titleHeight = Math.max(42, 10 + titleLineCount * 18);
      obstacleBounds.push([shapes[i].getLeft(), shapes[i].getTop(), shapes[i].getWidth(), titleHeight]);
      continue;
    }
    if (shapes[i].getType() === ExcelScript.ShapeType.line) {
      continue;
    }
    obstacleBounds.push([shapes[i].getLeft(), shapes[i].getTop(), shapes[i].getWidth(), shapes[i].getHeight()]);
  }
}

function appendObstacleBounds(obstacleBounds: number[][], box: ExcelScript.Shape) {
  obstacleBounds.push([box.getLeft(), box.getTop(), box.getWidth(), box.getHeight()]);
}

function overlapsObstacleBounds(obstacleBounds: number[][], left: number, top: number, width: number, height: number): boolean {
  const right = left + width;
  const bottom = top + height;
  for (let i = 0; i < obstacleBounds.length; i++) {
    const candidateLeft = obstacleBounds[i][0];
    const candidateTop = obstacleBounds[i][1];
    const candidateRight = candidateLeft + obstacleBounds[i][2];
    const candidateBottom = candidateTop + obstacleBounds[i][3];
    const separated = right + 4 <= candidateLeft || candidateRight + 4 <= left || bottom + 4 <= candidateTop || candidateBottom + 4 <= top;
    if (!separated) {
      return true;
    }
  }
  return false;
}

function placeOverlayInReviewGrid(obstacleBounds: number[][], box: ExcelScript.Shape, reviewLeft: number, reviewRight: number, reviewTop: number): boolean {
  const width = box.getWidth();
  const height = box.getHeight();
  const horizontalStep = Math.max(72, width + 8);
  const verticalStep = height + 8;
  for (let row = 0; row < 80; row++) {
    const top = Math.max(0, reviewTop + row * verticalStep);
    for (let left = reviewLeft; left + width <= reviewRight; left += horizontalStep) {
      if (!overlapsObstacleBounds(obstacleBounds, left, top, width, height)) {
        box.setLeft(left);
        box.setTop(top);
        return true;
      }
    }
  }
  return false;
}

function getRunAnchorPosition(workbook: ExcelScript.Workbook): { rowIndex: number; columnIndex: number } {
  const fallback = { rowIndex: 1, columnIndex: 1 };
  try {
    const activeCell = workbook.getActiveCell();
    const rowIndex = activeCell.getRowIndex();
    const columnIndex = activeCell.getColumnIndex();
    if (rowIndex < 0 || columnIndex < 0) {
      return fallback;
    }
    if (rowIndex === 0 && columnIndex === 0) {
      return fallback;
    }
    return { rowIndex, columnIndex };
  } catch {
    return fallback;
  }
}

function createRenderWorksheet(workbook: ExcelScript.Workbook, requestedName: string): ExcelScript.Worksheet {
  if (!workbook.getWorksheet(requestedName)) {
    return workbook.addWorksheet(requestedName);
  }
  for (let index = 1; index <= 99; index++) {
    const suffix = "_R" + (index < 10 ? "0" : "") + index.toString();
    const prefix = requestedName.slice(0, Math.max(1, 31 - suffix.length));
    const candidate = prefix + suffix;
    if (!workbook.getWorksheet(candidate)) {
      return workbook.addWorksheet(candidate);
    }
  }
  throw new Error("Unable to allocate a new render worksheet for: " + requestedName);
}

function getAnchoredRange(anchor: ExcelScript.Range, rowOffset: number, columnOffset: number, rowCount: number, columnCount: number): ExcelScript.Range {
  return anchor
    .getOffsetRange(rowOffset, columnOffset)
    .getResizedRange(Math.max(1, rowCount) - 1, Math.max(1, columnCount) - 1);
}

function formatDiagramGrid(anchor: ExcelScript.Range, rowCount: number, columnCount: number) {
  const gridFormat = getAnchoredRange(anchor, 0, 0, rowCount, columnCount).getFormat();
  gridFormat.setRowHeight(18);
  gridFormat.setColumnWidth(36);
}

function configurePdfReview(workbook: ExcelScript.Workbook, sheet: ExcelScript.Worksheet, anchor: ExcelScript.Range, rowCount: number, columnCount: number, enabled: boolean) {
  if (!enabled) {
    return;
  }
  sheet.setVisibility(ExcelScript.SheetVisibility.visible);
  const sheets = workbook.getWorksheets();
  for (let i = 0; i < sheets.length; i++) {
    if (sheets[i].getName() !== sheet.getName()) {
      sheets[i].setVisibility(ExcelScript.SheetVisibility.hidden);
    }
  }
  const printRange = getAnchoredRange(anchor, 0, 0, rowCount, columnCount + 2);
  const pageLayout = sheet.getPageLayout();
  pageLayout.setPrintArea(printRange);
  pageLayout.setOrientation(rowCount > 28 ? ExcelScript.PageOrientation.portrait : ExcelScript.PageOrientation.landscape);
  pageLayout.setPaperSize(ExcelScript.PaperType.a3);
  pageLayout.setPrintGridlines(false);
  pageLayout.setZoom({ horizontalFitToPages: 1, verticalFitToPages: 1 });
}

function addLaneColumns(anchor: ExcelScript.Range, rowOffset: number, columnOffset: number, columnCount: number, bodyEndRowOffset: number, title: string, fill: string, fillTransparency: number, stroke: string, lineWeight: number, textColor: string) {
  const titleRange = getAnchoredRange(anchor, rowOffset, columnOffset, 1, columnCount);
  mergeLaneRange(titleRange);
  titleRange.setValue(title);
  titleRange.getFormat().setRowHeight(24);
  formatLaneRange(titleRange, fill, fillTransparency, stroke, lineWeight, textColor, true, 13);
}

function addSectionBackground(sheet: ExcelScript.Worksheet, shapeName: string, title: string, members: ExcelScript.Shape[], laneLeft: number, laneWidth: number, ancestorTitlePadding: number, fill: string, fillTransparency: number, stroke: string, lineWeight: number, textColor: string) {
  if (members.length === 0) {
    return;
  }
  let left = members[0].getLeft();
  let right = members[0].getLeft() + members[0].getWidth();
  let top = members[0].getTop();
  let bottom = members[0].getTop() + members[0].getHeight();
  for (let i = 1; i < members.length; i++) {
    left = Math.min(left, members[i].getLeft());
    right = Math.max(right, members[i].getLeft() + members[i].getWidth());
    top = Math.min(top, members[i].getTop());
    bottom = Math.max(bottom, members[i].getTop() + members[i].getHeight());
  }
  const titleLineCount = Math.max(1, title.split("\n").length);
  const titlePadding = Math.max(42, 10 + titleLineCount * 18);
  const bottomPadding = 16;
  const sidePadding = 12;
  const laneInnerLeft = laneLeft + sidePadding;
  const laneInnerRight = laneLeft + laneWidth - sidePadding;
  const backgroundLeft = Math.max(laneInnerLeft, left - sidePadding);
  const backgroundRight = Math.min(laneInnerRight, right + sidePadding);
  const background = sheet.addGeometricShape(ExcelScript.GeometricShapeType.rectangle);
  background.setName(shapeName);
  background.setLeft(backgroundLeft);
  background.setTop(Math.max(0, top - titlePadding - ancestorTitlePadding));
  background.setWidth(Math.max(1, backgroundRight - backgroundLeft));
  background.setHeight(Math.max(28, bottom - top + titlePadding + ancestorTitlePadding + bottomPadding));
  applyShapeView(background, fill, true, false, stroke, fillTransparency, lineWeight);
  const frame = background.getTextFrame();
  frame.getTextRange().setText(title);
  frame.setHorizontalAlignment(ExcelScript.ShapeTextHorizontalAlignment.center);
  frame.setVerticalAlignment(ExcelScript.ShapeTextVerticalAlignment.top);
  const font = frame.getTextRange().getFont();
  font.setName("Meiryo UI");
  font.setSize(13);
  font.setBold(true);
  font.setColor(textColor);
  background.setZOrder(ExcelScript.ShapeZOrder.sendToBack);
}

function addMermaidSectionBackground(sheet: ExcelScript.Worksheet, shapeName: string, title: string, left: number, top: number, width: number, height: number, fill: string, fillTransparency: number, stroke: string, lineWeight: number, textColor: string) {
  const background = sheet.addGeometricShape(ExcelScript.GeometricShapeType.rectangle);
  background.setName(shapeName);
  background.setLeft(left);
  background.setTop(top);
  background.setWidth(Math.max(1, width));
  background.setHeight(Math.max(28, height));
  applyShapeView(background, fill, true, false, stroke, fillTransparency, lineWeight);
  const frame = background.getTextFrame();
  frame.getTextRange().setText(title);
  frame.setHorizontalAlignment(ExcelScript.ShapeTextHorizontalAlignment.center);
  frame.setVerticalAlignment(ExcelScript.ShapeTextVerticalAlignment.top);
  frame.setLeftMargin(6);
  frame.setRightMargin(6);
  frame.setTopMargin(3);
  frame.setBottomMargin(3);
  const font = frame.getTextRange().getFont();
  font.setName("Meiryo UI");
  font.setSize(13);
  font.setBold(true);
  font.setColor(textColor);
  background.setZOrder(ExcelScript.ShapeZOrder.sendToBack);
}

function mergeLaneRange(range: ExcelScript.Range) {
  range.merge(false);
}

function formatLaneRange(range: ExcelScript.Range, fill: string, fillTransparency: number, stroke: string, lineWeight: number, textColor: string, bold: boolean, fontSize: number) {
  const format = range.getFormat();
  if (fill && fillTransparency < 1) {
    format.getFill().setColor(fill);
  } else {
    format.getFill().clear();
  }
  format.setHorizontalAlignment(ExcelScript.HorizontalAlignment.center);
  format.setVerticalAlignment(ExcelScript.VerticalAlignment.center);
  format.setWrapText(true);
  const font = format.getFont();
  font.setName("Meiryo UI");
  font.setSize(fontSize);
  font.setBold(bold);
  font.setColor(textColor);
  setRangeBorders(range, stroke, lineWeight);
}

function setRangeBorders(range: ExcelScript.Range, color: string, lineWeight: number) {
  setBorder(range, ExcelScript.BorderIndex.edgeTop, color, lineWeight);
  setBorder(range, ExcelScript.BorderIndex.edgeBottom, color, lineWeight);
  setBorder(range, ExcelScript.BorderIndex.edgeLeft, color, lineWeight);
  setBorder(range, ExcelScript.BorderIndex.edgeRight, color, lineWeight);
}

function setBorder(range: ExcelScript.Range, index: ExcelScript.BorderIndex, color: string, lineWeight: number) {
  const border = range.getFormat().getRangeBorder(index);
  border.setStyle(color && lineWeight > 0 ? ExcelScript.BorderLineStyle.continuous : ExcelScript.BorderLineStyle.none);
  if (color && lineWeight > 0) {
    border.setColor(color);
  }
}

function preferredSide(fromShape: ExcelScript.Shape, toShape: ExcelScript.Shape): string {
  const fromLeft = fromShape.getLeft();
  const fromRight = fromLeft + fromShape.getWidth();
  const fromTop = fromShape.getTop();
  const fromBottom = fromTop + fromShape.getHeight();
  const toLeft = toShape.getLeft();
  const toRight = toLeft + toShape.getWidth();
  const toTop = toShape.getTop();
  const toBottom = toTop + toShape.getHeight();
  const fromCenterX = fromShape.getLeft() + fromShape.getWidth() / 2;
  const fromCenterY = fromShape.getTop() + fromShape.getHeight() / 2;
  const toCenterX = toShape.getLeft() + toShape.getWidth() / 2;
  const toCenterY = toShape.getTop() + toShape.getHeight() / 2;
  const dx = toCenterX - fromCenterX;
  const dy = toCenterY - fromCenterY;
  const separatedHorizontally = fromRight < toLeft || toRight < fromLeft;
  const separatedVertically = fromBottom < toTop || toBottom < fromTop;
  const horizontalGap = fromRight < toLeft ? toLeft - fromRight : (toRight < fromLeft ? fromLeft - toRight : 0);
  const verticalGap = fromBottom < toTop ? toTop - fromBottom : (toBottom < fromTop ? fromTop - toBottom : 0);
  if (separatedHorizontally && (!separatedVertically || horizontalGap >= verticalGap)) {
    return dx >= 0 ? "right" : "left";
  }
  if (separatedVertically) {
    return dy >= 0 ? "bottom" : "top";
  }
  return Math.abs(dx) >= Math.abs(dy) ? (dx >= 0 ? "right" : "left") : (dy >= 0 ? "bottom" : "top");
}

function oppositeSide(side: string): string {
  if (side === "right") {
    return "left";
  }
  if (side === "left") {
    return "right";
  }
  if (side === "bottom") {
    return "top";
  }
  return "bottom";
}

function defaultSite(side: string): number {
  if (side === "top") {
    return 0;
  }
  if (side === "left") {
    return 1;
  }
  if (side === "bottom") {
    return 2;
  }
  return 3;
}

function connectionSite(shape: ExcelScript.Shape, side: string): number {
  const count = shape.getConnectionSiteCount();
  if (count <= 0) {
    return 0;
  }
  const preferred = defaultSite(side);
  if (preferred < count) {
    return preferred;
  }
  return count - 1;
}

function connectorType(kind: string): ExcelScript.ConnectorType {
  if (kind === "straight") {
    return ExcelScript.ConnectorType.straight;
  }
  if (kind === "curve") {
    return ExcelScript.ConnectorType.curve;
  }
  return ExcelScript.ConnectorType.elbow;
}

function setShapeAltText(shape: ExcelScript.Shape, title: string, description: string) {
  shape.setAltTextTitle(title);
  shape.setAltTextDescription(description);
}

function addTextShape(sheet: ExcelScript.Worksheet, shapeName: string, text: string, left: number, top: number, width: number, height: number, fontSize: number, bold: boolean, fill: string, fillTransparency: number, stroke: string, lineWeight: number, textColor: string, bordered: boolean, align: string, shapeKind: string, dashed: boolean): ExcelScript.Shape {
  let shape: ExcelScript.Shape;
  if (bordered) {
    const kind = shapeKind === "diamond" ? ExcelScript.GeometricShapeType.diamond : ExcelScript.GeometricShapeType.roundRectangle;
    shape = sheet.addGeometricShape(kind);
  } else {
    shape = sheet.addTextBox(text);
  }
  shape.setName(shapeName);
  shape.setLeft(left);
  shape.setTop(top);
  shape.setWidth(width);
  shape.setHeight(height);
  applyShapeView(shape, fill, bordered, dashed, stroke, fillTransparency, lineWeight);
  const frame = shape.getTextFrame();
  frame.getTextRange().setText(text);
  if (align === "left") {
    frame.setHorizontalAlignment(ExcelScript.ShapeTextHorizontalAlignment.left);
  } else if (align === "right") {
    frame.setHorizontalAlignment(ExcelScript.ShapeTextHorizontalAlignment.right);
  } else {
    frame.setHorizontalAlignment(ExcelScript.ShapeTextHorizontalAlignment.center);
  }
  frame.setVerticalAlignment(ExcelScript.ShapeTextVerticalAlignment.middle);
  frame.setLeftMargin(6);
  frame.setRightMargin(6);
  frame.setTopMargin(3);
  frame.setBottomMargin(3);
  const font = frame.getTextRange().getFont();
  font.setName("Meiryo UI");
  font.setSize(fontSize);
  font.setBold(bold);
  font.setColor(textColor);
  frame.setAutoSizeSetting(ExcelScript.ShapeAutoSize.autoSizeShapeToFitText);
  shape.setWidth(Math.max(96, width, shape.getWidth()));
  shape.setHeight(Math.max(28, height, shape.getHeight()));
  return shape;
}

function addConnector(sheet: ExcelScript.Worksheet, shapeName: string, fromShape: ExcelScript.Shape, toShape: ExcelScript.Shape, dashed: boolean, bidirectional: boolean, altTextTitle: string, altTextDescription: string, kind: string, requestedFromSide: string, requestedToSide: string, color: string, lineWeight: number): ExcelScript.Shape {
  const startLeft = fromShape.getLeft() + fromShape.getWidth() / 2;
  const startTop = fromShape.getTop() + fromShape.getHeight() / 2;
  const endLeft = toShape.getLeft() + toShape.getWidth() / 2;
  const endTop = toShape.getTop() + toShape.getHeight() / 2;
  const connector = sheet.addLine(startLeft, startTop, endLeft, endTop, connectorType(kind));
  connector.setName(shapeName);
  const inferredBeginSide = preferredSide(fromShape, toShape);
  const beginSide = requestedFromSide === "left" || requestedFromSide === "top" || requestedFromSide === "right" || requestedFromSide === "bottom" ? requestedFromSide : inferredBeginSide;
  const endSide = requestedToSide === "left" || requestedToSide === "top" || requestedToSide === "right" || requestedToSide === "bottom" ? requestedToSide : oppositeSide(beginSide);
  const line = connector.getLine();
  line.connectBeginShape(fromShape, connectionSite(fromShape, beginSide));
  line.connectEndShape(toShape, connectionSite(toShape, endSide));
  line.setConnectorType(connectorType(kind));
  applyConnectorView(connector, line, dashed, bidirectional, color, lineWeight);
  connector.setAltTextTitle(altTextTitle);
  connector.setAltTextDescription(altTextDescription);
  return connector;
}

function addMermaidConnectorRoute(sheet: ExcelScript.Worksheet, shapeName: string, routeOffsetsX: number[], routeOffsetsY: number[], originLeft: number, originTop: number, dashed: boolean, bidirectional: boolean, altTextTitle: string, altTextDescription: string, color: string, lineWeight: number): ExcelScript.Shape {
  if (routeOffsetsX.length < 2 || routeOffsetsX.length !== routeOffsetsY.length) {
    throw new Error("Mermaid connector route must contain matching X/Y arrays with at least two points: " + shapeName);
  }
  const connectorKind = routeOffsetsX.length > 2
    ? ExcelScript.ConnectorType.elbow
    : ExcelScript.ConnectorType.straight;
  const lastIndex = routeOffsetsX.length - 1;
  const connector = sheet.addLine(
    originLeft + routeOffsetsX[0],
    originTop + routeOffsetsY[0],
    originLeft + routeOffsetsX[lastIndex],
    originTop + routeOffsetsY[lastIndex],
    connectorKind
  );
  connector.setName(shapeName);
  const line = connector.getLine();
  line.setConnectorType(connectorKind);
  applyConnectorView(connector, line, dashed, bidirectional, color, lineWeight);
  connector.setAltTextTitle(altTextTitle);
  connector.setAltTextDescription(altTextDescription);
  return connector;
}
