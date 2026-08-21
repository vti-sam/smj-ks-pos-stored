// Generated from Markdown: ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
// Source contract SHA-256: ac501706a621f6572e3cdb581616e7aeae6f62e8fb44e22c23217490b43c90ce
// Generated output; do not edit. Change Markdown or the owning renderer and regenerate both scripts.

function main(workbook: ExcelScript.Workbook) {
  const anchorPosition = getRunAnchorPosition(workbook);
  const sheet = createRenderWorksheet(workbook, "05_論理構成図");
  sheet.activate();
  const anchor = sheet.getCell(anchorPosition.rowIndex, anchorPosition.columnIndex);
  const originTop = anchor.getTop();
  const canvasColumnCount = 98;
  const baselineCanvasRowCount = 20;
  formatDiagramGrid(anchor, baselineCanvasRowCount, canvasColumnCount);

  const laneRange1 = getAnchoredRange(anchor, 0, 0, 1, 61);
  const laneRange2 = getAnchoredRange(anchor, 0, 61, 1, 33);
  const laneRange3 = getAnchoredRange(anchor, 0, 94, 1, 4);

  addCellLaneTable(anchor, baselineCanvasRowCount - 1);

  const shape_d512_APP_APP_ACCESS_CONTRACT = addTextShape(sheet, "shape_d512_APP_APP_ACCESS_CONTRACT", "②-6 共通デバイス通信契約\nTabletPos.DeviceContracts\n要求・応答・イベント・識別子・既定値", 0, 0, 201, 51, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_APP_APP_ACCESS_CONTRACT, "②-6 共通デバイス通信契約 TabletPos.DeviceContracts 要求・応答・イベント・識別子・既定値", "");
  const shape_d512_HOST_HOST_EXEC_CONTROL = addTextShape(sheet, "shape_d512_HOST_HOST_EXEC_CONTROL", "②-2 要求変換・コマンド制御", 0, 0, 155.325, 28, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_HOST_HOST_EXEC_CONTROL, "②-2 要求変換・コマンド制御", "");
  const shape_d512_HOST_HOST_EXEC_HOST_SETTING = addTextShape(sheet, "shape_d512_HOST_HOST_EXEC_HOST_SETTING", "②-4 デバイスコネクタ側設定", 0, 0, 155.325, 28, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_HOST_HOST_EXEC_HOST_SETTING, "②-4 デバイスコネクタ側設定", "");
  const shape_d512_HOST_HOST_SERVICE_RUNTIME = addTextShape(sheet, "shape_d512_HOST_HOST_SERVICE_RUNTIME", "①-1 起動・停止管理\nMutexによる二重起動防止", 0, 0, 135.375, 36, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_HOST_HOST_SERVICE_RUNTIME, "①-1 起動・停止管理 Mutexによる二重起動防止", "");
  const shape_d512_DEVICE_DISPLAY = addTextShape(sheet, "shape_d512_DEVICE_DISPLAY", "③ カスタマディスプレイ\nSHARP RZ-4DP3", 0, 0, 133.275, 36, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_DEVICE_DISPLAY, "③ カスタマディスプレイ SHARP RZ-4DP3", "");
  const shape_d512_DEVICE_CASH = addTextShape(sheet, "shape_d512_DEVICE_CASH", "① 自動釣銭機\nGLORY RT-300／RAD-300", 0, 0, 132.225, 36, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_DEVICE_CASH, "① 自動釣銭機 GLORY RT-300／RAD-300", "");
  const shape_d512_DEVICE_PRINTER = addTextShape(sheet, "shape_d512_DEVICE_PRINTER", "⑤ レシートプリンター\nSHARP 80mm", 0, 0, 122.775, 36, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_DEVICE_PRINTER, "⑤ レシートプリンター SHARP 80mm", "");
  const shape_d512_APP_APP_COORD_PROCESS = addTextShape(sheet, "shape_d512_APP_APP_COORD_PROCESS", "①-3 デバイスコネクタ\nプロセス管理", 0, 0, 123.825, 36, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_APP_APP_COORD_PROCESS, "①-3 デバイスコネクタ プロセス管理", "");
  const shape_d512_HOST_HOST_ADAPTER_ADAPTER = addTextShape(sheet, "shape_d512_HOST_HOST_ADAPTER_ADAPTER", "③-1 ホスト内部実装\nOPOS／OCX／既存DLL", 0, 0, 113.325, 36, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_HOST_HOST_ADAPTER_ADAPTER, "③-1 ホスト内部実装 OPOS／OCX／既存DLL", "");
  const shape_d512_APP_APP_ACCESS_EVENT_RX = addTextShape(sheet, "shape_d512_APP_APP_ACCESS_EVENT_RX", "②-4 イベント受信\n現行：購読先未登録", 0, 0, 106.5, 36, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_APP_APP_ACCESS_EVENT_RX, "②-4 イベント受信 現行：購読先未登録", "");
  const shape_d512_DEVICE_DRAWER = addTextShape(sheet, "shape_d512_DEVICE_DRAWER", "② ドロア\nSHARP UP-J46DW3", 0, 0, 98.625, 36, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_DEVICE_DRAWER, "② ドロア SHARP UP-J46DW3", "");
  const shape_d512_DEVICE_PAYMENT = addTextShape(sheet, "shape_d512_DEVICE_PAYMENT", "④ 決済端末\nCAFIS Arch Saturn", 0, 0, 110.175, 36, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_DEVICE_PAYMENT, "④ 決済端末 CAFIS Arch Saturn", "");
  const shape_d512_APP_APP_COORD_LIFECYCLE = addTextShape(sheet, "shape_d512_APP_APP_COORD_LIFECYCLE", "①-2 アプリライフサイクル", 0, 0, 144.825, 28, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_APP_APP_COORD_LIFECYCLE, "①-2 アプリライフサイクル", "");
  const shape_d512_HOST_HOST_EXEC_ORDER = addTextShape(sheet, "shape_d512_HOST_HOST_EXEC_ORDER", "②-1 デバイスID別順序制御", 0, 0, 145.875, 28, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_HOST_HOST_EXEC_ORDER, "②-1 デバイスID別順序制御", "");
  const shape_d512_APP_APP_ACCESS_SELECT = addTextShape(sheet, "shape_d512_APP_APP_ACCESS_SELECT", "②-1 設定・制御方式選択", 0, 0, 134.325, 28, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_APP_APP_ACCESS_SELECT, "②-1 設定・制御方式選択", "");
  const shape_d512_APP_APP_COORD_BUSINESS = addTextShape(sheet, "shape_d512_APP_APP_COORD_BUSINESS", "①-1 画面・業務処理", 0, 0, 113.325, 28, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_APP_APP_COORD_BUSINESS, "①-1 画面・業務処理", "");
  const shape_d512_APP_APP_ACCESS_COMMAND = addTextShape(sheet, "shape_d512_APP_APP_ACCESS_COMMAND", "②-2 コマンド通信", 0, 0, 102.825, 28, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_APP_APP_ACCESS_COMMAND, "②-2 コマンド通信", "");
  const shape_d512_APP_APP_ACCESS_SYNC_RESULT = addTextShape(sheet, "shape_d512_APP_APP_ACCESS_SYNC_RESULT", "②-3 同期結果変換", 0, 0, 102.825, 28, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_APP_APP_ACCESS_SYNC_RESULT, "②-3 同期結果変換", "");
  const shape_d512_APP_APP_ACCESS_APP_SETTING = addTextShape(sheet, "shape_d512_APP_APP_ACCESS_APP_SETTING", "②-5 アプリ側設定", 0, 0, 102.825, 28, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_APP_APP_ACCESS_APP_SETTING, "②-5 アプリ側設定", "");
  const shape_d512_HOST_HOST_SERVICE_SERVER = addTextShape(sheet, "shape_d512_HOST_HOST_SERVICE_SERVER", "①-2 コマンド受付", 0, 0, 102.825, 28, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_HOST_HOST_SERVICE_SERVER, "①-2 コマンド受付", "");
  const shape_d512_HOST_HOST_SERVICE_EVENT = addTextShape(sheet, "shape_d512_HOST_HOST_SERVICE_EVENT", "①-3 イベント配信", 0, 0, 102.825, 28, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_HOST_HOST_SERVICE_EVENT, "①-3 イベント配信", "");
  const shape_d512_HOST_HOST_EXEC_MANAGER = addTextShape(sheet, "shape_d512_HOST_HOST_EXEC_MANAGER", "②-3 デバイス管理", 0, 0, 102.825, 28, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d512_HOST_HOST_EXEC_MANAGER, "②-3 デバイス管理", "");

  const geometryBottom = placeMermaidGeometry([shape_d512_APP_APP_ACCESS_CONTRACT, shape_d512_HOST_HOST_EXEC_CONTROL, shape_d512_HOST_HOST_EXEC_HOST_SETTING, shape_d512_HOST_HOST_SERVICE_RUNTIME, shape_d512_DEVICE_DISPLAY, shape_d512_DEVICE_CASH, shape_d512_DEVICE_PRINTER, shape_d512_APP_APP_COORD_PROCESS, shape_d512_HOST_HOST_ADAPTER_ADAPTER, shape_d512_APP_APP_ACCESS_EVENT_RX, shape_d512_DEVICE_DRAWER, shape_d512_DEVICE_PAYMENT, shape_d512_APP_APP_COORD_LIFECYCLE, shape_d512_HOST_HOST_EXEC_ORDER, shape_d512_APP_APP_ACCESS_SELECT, shape_d512_APP_APP_COORD_BUSINESS, shape_d512_APP_APP_ACCESS_COMMAND, shape_d512_APP_APP_ACCESS_SYNC_RESULT, shape_d512_APP_APP_ACCESS_APP_SETTING, shape_d512_HOST_HOST_SERVICE_SERVER, shape_d512_HOST_HOST_SERVICE_EVENT, shape_d512_HOST_HOST_EXEC_MANAGER], [100.5, 2732.821042, 2732.821042, 3293.604167, 3450.6375, 3450.6375, 3450.6375, 1952.766667, 2252.6625, 362.302292, 3450.6375, 3450.6375, 2111.433125, 2897.462708, 1952.766667, 2111.433125, 1687.571875, 1447.820833, 2111.433125, 3053.853125, 2252.6625, 2489.140833], [249.013333, 97.826667, 157.933333, 279.066667, 186.213333, 66, 306.426667, 92, 92, 267.106667, 126.106667, 246.32, 92, 97.826667, 297.16, 138, 297.16, 260.053333, 297.16, 279.066667, 319.24, 127.88], anchor.getLeft(), originTop);

  addSectionBackground(sheet, "section_bg_d512_1_1", "① アプリケーション層\n（業務・プロセス管理）", [shape_d512_APP_APP_COORD_PROCESS, shape_d512_APP_APP_COORD_LIFECYCLE, shape_d512_APP_APP_COORD_BUSINESS], laneRange1.getLeft(), laneRange1.getWidth(), 0, "", 1, "#ED7D31", 2, "#111111");
  addSectionBackground(sheet, "section_bg_d512_1_2", "② デバイス制御層", [shape_d512_APP_APP_ACCESS_CONTRACT, shape_d512_APP_APP_ACCESS_EVENT_RX, shape_d512_APP_APP_ACCESS_SELECT, shape_d512_APP_APP_ACCESS_COMMAND, shape_d512_APP_APP_ACCESS_SYNC_RESULT, shape_d512_APP_APP_ACCESS_APP_SETTING], laneRange1.getLeft(), laneRange1.getWidth(), 0, "", 1, "#ED7D31", 2, "#111111");
  addSectionBackground(sheet, "section_bg_d512_2_1", "① プロセス・通信サービス", [shape_d512_HOST_HOST_SERVICE_RUNTIME, shape_d512_HOST_HOST_SERVICE_SERVER, shape_d512_HOST_HOST_SERVICE_EVENT], laneRange2.getLeft(), laneRange2.getWidth(), 0, "", 1, "#ED7D31", 2, "#111111");
  addSectionBackground(sheet, "section_bg_d512_2_2", "② コマンド実行", [shape_d512_HOST_HOST_EXEC_CONTROL, shape_d512_HOST_HOST_EXEC_HOST_SETTING, shape_d512_HOST_HOST_EXEC_ORDER, shape_d512_HOST_HOST_EXEC_MANAGER], laneRange2.getLeft(), laneRange2.getWidth(), 0, "", 1, "#ED7D31", 2, "#111111");
  addSectionBackground(sheet, "section_bg_d512_2_3", "③ 既存デバイス資源呼出し", [shape_d512_HOST_HOST_ADAPTER_ADAPTER], laneRange2.getLeft(), laneRange2.getWidth(), 0, "", 1, "#ED7D31", 2, "#111111");
  const diagramBottom = Math.max(originTop + 48, geometryBottom);
  const bodyEndRowOffset = Math.max(11, Math.ceil((diagramBottom - originTop + 24) / 18) - 1);
  const canvasRowCount = Math.max(baselineCanvasRowCount, bodyEndRowOffset + 1);
  formatDiagramGrid(anchor, canvasRowCount, canvasColumnCount);
  if (bodyEndRowOffset >= baselineCanvasRowCount) {
    addCellLaneTable(anchor, bodyEndRowOffset);
  }

  const edge_d512_01_APP_APP_COORD_LIFECYCLE_to_APP_APP_COORD_PROCESS = addConnector(sheet, "edge_d512_01_APP_APP_COORD_LIFECYCLE_to_APP_APP_COORD_PROCESS", shape_d512_APP_APP_COORD_LIFECYCLE, shape_d512_APP_APP_COORD_PROCESS, false, false, "①-2 アプリライフサイクル → ①-3 デバイスコネクタ", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d512_02_APP_APP_ACCESS_APP_SETTING_to_APP_APP_ACCESS_SELECT = addConnector(sheet, "edge_d512_02_APP_APP_ACCESS_APP_SETTING_to_APP_APP_ACCESS_SELECT", shape_d512_APP_APP_ACCESS_APP_SETTING, shape_d512_APP_APP_ACCESS_SELECT, true, false, "②-5 アプリ側設定 → ②-1 設定・制御方式選択", "", "elbow", "left", "left", "#7F7F7F", 2);
  const edge_d512_03_APP_APP_ACCESS_SELECT_to_APP_APP_ACCESS_COMMAND = addConnector(sheet, "edge_d512_03_APP_APP_ACCESS_SELECT_to_APP_APP_ACCESS_COMMAND", shape_d512_APP_APP_ACCESS_SELECT, shape_d512_APP_APP_ACCESS_COMMAND, false, false, "②-1 設定・制御方式選択 → ②-2 コマンド通信", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d512_04_APP_APP_ACCESS_COMMAND_to_APP_APP_ACCESS_SYNC_RESULT = addConnector(sheet, "edge_d512_04_APP_APP_ACCESS_COMMAND_to_APP_APP_ACCESS_SYNC_RESULT", shape_d512_APP_APP_ACCESS_COMMAND, shape_d512_APP_APP_ACCESS_SYNC_RESULT, false, false, "②-2 コマンド通信 → ②-3 同期結果変換", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d512_05_APP_APP_COORD_BUSINESS_to_APP_APP_ACCESS_SELECT = addConnector(sheet, "edge_d512_05_APP_APP_COORD_BUSINESS_to_APP_APP_ACCESS_SELECT", shape_d512_APP_APP_COORD_BUSINESS, shape_d512_APP_APP_ACCESS_SELECT, false, false, "①-1 画面・業務処理 → ②-1 設定・制御方式選択", "", "elbow", "right", "right", "#1F4E79", 2);
  const edge_d512_06_APP_APP_ACCESS_SYNC_RESULT_to_APP_APP_COORD_BUSINESS = addConnector(sheet, "edge_d512_06_APP_APP_ACCESS_SYNC_RESULT_to_APP_APP_COORD_BUSINESS", shape_d512_APP_APP_ACCESS_SYNC_RESULT, shape_d512_APP_APP_COORD_BUSINESS, false, false, "②-3 同期結果変換 → ①-1 画面・業務処理", "", "elbow", "left", "left", "#1F4E79", 2);
  const edge_d512_07_HOST_HOST_SERVICE_RUNTIME_to_HOST_HOST_SERVICE_SERVER = addConnector(sheet, "edge_d512_07_HOST_HOST_SERVICE_RUNTIME_to_HOST_HOST_SERVICE_SERVER", shape_d512_HOST_HOST_SERVICE_RUNTIME, shape_d512_HOST_HOST_SERVICE_SERVER, false, false, "①-1 起動・停止管理 → ①-2 コマンド受付", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d512_08_HOST_HOST_EXEC_HOST_SETTING_to_HOST_HOST_EXEC_MANAGER = addConnector(sheet, "edge_d512_08_HOST_HOST_EXEC_HOST_SETTING_to_HOST_HOST_EXEC_MANAGER", shape_d512_HOST_HOST_EXEC_HOST_SETTING, shape_d512_HOST_HOST_EXEC_MANAGER, true, false, "②-4 デバイスコネクタ側設定 → ②-3 デバイス管理", "", "elbow", "", "", "#7F7F7F", 2);
  const edge_d512_09_HOST_HOST_EXEC_ORDER_to_HOST_HOST_EXEC_CONTROL = addConnector(sheet, "edge_d512_09_HOST_HOST_EXEC_ORDER_to_HOST_HOST_EXEC_CONTROL", shape_d512_HOST_HOST_EXEC_ORDER, shape_d512_HOST_HOST_EXEC_CONTROL, false, false, "②-1 デバイスID別順序制御 → ②-2 要求変換・コマンド制御", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d512_10_HOST_HOST_EXEC_CONTROL_to_HOST_HOST_EXEC_MANAGER = addConnector(sheet, "edge_d512_10_HOST_HOST_EXEC_CONTROL_to_HOST_HOST_EXEC_MANAGER", shape_d512_HOST_HOST_EXEC_CONTROL, shape_d512_HOST_HOST_EXEC_MANAGER, false, false, "②-2 要求変換・コマンド制御 → ②-3 デバイス管理", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d512_11_HOST_HOST_SERVICE_SERVER_to_HOST_HOST_EXEC_ORDER = addConnector(sheet, "edge_d512_11_HOST_HOST_SERVICE_SERVER_to_HOST_HOST_EXEC_ORDER", shape_d512_HOST_HOST_SERVICE_SERVER, shape_d512_HOST_HOST_EXEC_ORDER, false, false, "①-2 コマンド受付 → ②-1 デバイスID別順序制御", "", "elbow", "left", "left", "#1F4E79", 2);
  const edge_d512_12_HOST_HOST_EXEC_MANAGER_to_HOST_HOST_ADAPTER_ADAPTER = addConnector(sheet, "edge_d512_12_HOST_HOST_EXEC_MANAGER_to_HOST_HOST_ADAPTER_ADAPTER", shape_d512_HOST_HOST_EXEC_MANAGER, shape_d512_HOST_HOST_ADAPTER_ADAPTER, false, false, "②-3 デバイス管理 → ③-1 ホスト内部実装", "", "elbow", "right", "right", "#1F4E79", 2);
  const edge_d512_13_HOST_HOST_EXEC_MANAGER_to_HOST_HOST_SERVICE_EVENT = addConnector(sheet, "edge_d512_13_HOST_HOST_EXEC_MANAGER_to_HOST_HOST_SERVICE_EVENT", shape_d512_HOST_HOST_EXEC_MANAGER, shape_d512_HOST_HOST_SERVICE_EVENT, true, false, "デバイス処理結果", "デバイス処理結果", "elbow", "left", "left", "#C65911", 2);
  const edge_d512_14_APP_APP_COORD_PROCESS_to_HOST_HOST_SERVICE_RUNTIME = addConnector(sheet, "edge_d512_14_APP_APP_COORD_PROCESS_to_HOST_HOST_SERVICE_RUNTIME", shape_d512_APP_APP_COORD_PROCESS, shape_d512_HOST_HOST_SERVICE_RUNTIME, false, false, "OSプロセス制御", "OSプロセス制御", "elbow", "right", "left", "#548235", 2);
  const edge_d512_15_APP_APP_ACCESS_COMMAND_to_HOST_HOST_SERVICE_SERVER = addConnector(sheet, "edge_d512_15_APP_APP_ACCESS_COMMAND_to_HOST_HOST_SERVICE_SERVER", shape_d512_APP_APP_ACCESS_COMMAND, shape_d512_HOST_HOST_SERVICE_SERVER, false, true, "コマンド通信用パイプ 要求／同期応答", "コマンド通信用パイプ 要求／同期応答", "elbow", "right", "left", "#1F4E79", 3);
  const edge_d512_16_HOST_HOST_SERVICE_EVENT_to_APP_APP_ACCESS_EVENT_RX = addConnector(sheet, "edge_d512_16_HOST_HOST_SERVICE_EVENT_to_APP_APP_ACCESS_EVENT_RX", shape_d512_HOST_HOST_SERVICE_EVENT, shape_d512_APP_APP_ACCESS_EVENT_RX, true, false, "イベント通知用パイプ 非同期イベント", "イベント通知用パイプ 非同期イベント", "elbow", "left", "right", "#C65911", 2);
  const edge_d512_17_APP_APP_ACCESS_COMMAND_to_APP_APP_ACCESS_CONTRACT = addConnector(sheet, "edge_d512_17_APP_APP_ACCESS_COMMAND_to_APP_APP_ACCESS_CONTRACT", shape_d512_APP_APP_ACCESS_COMMAND, shape_d512_APP_APP_ACCESS_CONTRACT, true, false, "要求・応答契約を参照", "要求・応答契約を参照", "elbow", "right", "right", "#7F7F7F", 2);
  const edge_d512_18_APP_APP_ACCESS_EVENT_RX_to_APP_APP_ACCESS_CONTRACT = addConnector(sheet, "edge_d512_18_APP_APP_ACCESS_EVENT_RX_to_APP_APP_ACCESS_CONTRACT", shape_d512_APP_APP_ACCESS_EVENT_RX, shape_d512_APP_APP_ACCESS_CONTRACT, true, false, "イベント契約を参照", "イベント契約を参照", "elbow", "left", "left", "#7F7F7F", 2);
  const edge_d512_19_HOST_HOST_SERVICE_SERVER_to_APP_APP_ACCESS_CONTRACT = addConnector(sheet, "edge_d512_19_HOST_HOST_SERVICE_SERVER_to_APP_APP_ACCESS_CONTRACT", shape_d512_HOST_HOST_SERVICE_SERVER, shape_d512_APP_APP_ACCESS_CONTRACT, true, false, "要求・応答契約を参照", "要求・応答契約を参照", "elbow", "left", "right", "#7F7F7F", 2);
  const edge_d512_20_HOST_HOST_SERVICE_EVENT_to_APP_APP_ACCESS_CONTRACT = addConnector(sheet, "edge_d512_20_HOST_HOST_SERVICE_EVENT_to_APP_APP_ACCESS_CONTRACT", shape_d512_HOST_HOST_SERVICE_EVENT, shape_d512_APP_APP_ACCESS_CONTRACT, true, false, "イベント契約を参照", "イベント契約を参照", "elbow", "left", "right", "#7F7F7F", 2);
  const edge_d512_21_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_CASH = addConnector(sheet, "edge_d512_21_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_CASH", shape_d512_HOST_HOST_ADAPTER_ADAPTER, shape_d512_DEVICE_CASH, false, true, "制御／結果", "制御／結果", "elbow", "right", "left", "#7030A0", 2);
  const edge_d512_22_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_DRAWER = addConnector(sheet, "edge_d512_22_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_DRAWER", shape_d512_HOST_HOST_ADAPTER_ADAPTER, shape_d512_DEVICE_DRAWER, false, true, "制御／結果", "制御／結果", "elbow", "right", "left", "#7030A0", 2);
  const edge_d512_23_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_DISPLAY = addConnector(sheet, "edge_d512_23_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_DISPLAY", shape_d512_HOST_HOST_ADAPTER_ADAPTER, shape_d512_DEVICE_DISPLAY, false, true, "制御／結果", "制御／結果", "elbow", "right", "left", "#7030A0", 2);
  const edge_d512_24_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_PAYMENT = addConnector(sheet, "edge_d512_24_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_PAYMENT", shape_d512_HOST_HOST_ADAPTER_ADAPTER, shape_d512_DEVICE_PAYMENT, false, true, "制御／結果", "制御／結果", "elbow", "right", "left", "#7030A0", 2);
  const edge_d512_25_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_PRINTER = addConnector(sheet, "edge_d512_25_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_PRINTER", shape_d512_HOST_HOST_ADAPTER_ADAPTER, shape_d512_DEVICE_PRINTER, false, true, "制御／結果", "制御／結果", "elbow", "right", "left", "#7030A0", 2);

  configurePdfReview(workbook, sheet, anchor, canvasRowCount, canvasColumnCount, false);
}

function addCellLaneTable(anchor: ExcelScript.Range, bodyEndRowOffset: number) {
  addLaneColumns(anchor, 0, 61, bodyEndRowOffset, "（1） タブレットPOS端末アプリ（アプリプロセス）", "#F7FBFF", 0, "#4472C4", 2, "#111111");
  addLaneColumns(anchor, 61, 33, bodyEndRowOffset, "（2） デバイスコネクタ（Windows別プロセス）", "#FCE4D6", 0, "#ED7D31", 2, "#111111");
  addLaneColumns(anchor, 94, 4, bodyEndRowOffset, "（3） 周辺機器", "#E4DFEC", 0, "#8064A2", 2, "#111111");
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
  connector.getLineFormat().setVisible(true);
  connector.getLineFormat().setColor(color);
  connector.getLineFormat().setWeight(lineWeight);
  if (dashed) {
    connector.getLineFormat().setDashStyle(ExcelScript.ShapeLineDashStyle.dash);
  }
  if (bidirectional) {
    line.setBeginArrowheadStyle(ExcelScript.ArrowheadStyle.triangle);
  }
  line.setEndArrowheadStyle(ExcelScript.ArrowheadStyle.triangle);
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

function addLaneColumns(anchor: ExcelScript.Range, columnOffset: number, columnCount: number, bodyEndRowOffset: number, title: string, fill: string, fillTransparency: number, stroke: string, lineWeight: number, textColor: string) {
  const titleRange = getAnchoredRange(anchor, 0, columnOffset, 1, columnCount);
  mergeLaneRange(titleRange);
  titleRange.setValue(title);
  titleRange.getFormat().setRowHeight(24);
  formatLaneRange(titleRange, fill, fillTransparency, stroke, lineWeight, textColor, true, 13);
}

function addSectionBackground(sheet: ExcelScript.Worksheet, shapeName: string, title: string, members: ExcelScript.Shape[], laneLeft: number, laneWidth: number, ancestorTitlePadding: number, fill: string, fillTransparency: number, stroke: string, lineWeight: number, textColor: string) {
  if (members.length === 0) {
    return;
  }
  let top = members[0].getTop();
  let bottom = members[0].getTop() + members[0].getHeight();
  for (let i = 1; i < members.length; i++) {
    top = Math.min(top, members[i].getTop());
    bottom = Math.max(bottom, members[i].getTop() + members[i].getHeight());
  }
  const titleLineCount = Math.max(1, title.split("\n").length);
  const titlePadding = Math.max(42, 10 + titleLineCount * 18);
  const bottomPadding = 16;
  const sidePadding = 12;
  const background = sheet.addGeometricShape(ExcelScript.GeometricShapeType.rectangle);
  background.setName(shapeName);
  background.setLeft(laneLeft + sidePadding);
  background.setTop(Math.max(0, top - titlePadding - ancestorTitlePadding));
  background.setWidth(Math.max(1, laneWidth - sidePadding * 2));
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
  if (shape.getWidth() < 96) {
    shape.setWidth(96);
  }
  if (shape.getHeight() < 28) {
    shape.setHeight(28);
  }
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
