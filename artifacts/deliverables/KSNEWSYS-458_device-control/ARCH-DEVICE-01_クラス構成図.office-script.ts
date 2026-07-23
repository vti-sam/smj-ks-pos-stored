function main(workbook: ExcelScript.Workbook) {
  const anchorPosition = getRunAnchorPosition(workbook);
  const sheet = createRenderWorksheet(workbook, "05_クラス構成_01");
  sheet.activate();
  const anchor = sheet.getCell(anchorPosition.rowIndex, anchorPosition.columnIndex);
  const originTop = anchor.getTop();
  const canvasColumnCount = 34;
  const baselineCanvasRowCount = 43;
  formatDiagramGrid(anchor, baselineCanvasRowCount, canvasColumnCount);

  const laneRange1 = getAnchoredRange(anchor, 0, 0, 1, 9);
  const laneRange2 = getAnchoredRange(anchor, 0, 9, 1, 7);
  const laneRange3 = getAnchoredRange(anchor, 0, 16, 1, 8);
  const laneRange4 = getAnchoredRange(anchor, 0, 24, 1, 10);

  addCellLaneTable(anchor, baselineCanvasRowCount - 1);

  const shape_d51_CORE_CONFIG_GROUP_CONFIG = addTextShape(sheet, "shape_d51_CORE_CONFIG_GROUP_CONFIG", "DeviceControllerConfigService\n設定の読込・フォールバック・保存", 0, 0, 180, 36, 10, true, "#E2F0D9", 0, "#548235", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_CORE_CONFIG_GROUP_CONFIG, "DeviceControllerConfigService 設定の読込・フォールバック・保存", "");
  const shape_d51_PLATFORM_IOS = addTextShape(sheet, "shape_d51_PLATFORM_IOS", "iOS直接接続\nTCP/IP・Bluetooth / カメラ・BLE", 0, 0, 185.775, 36, 10, true, "#FFF2CC", 0, "#BF9000", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_PLATFORM_IOS, "iOS直接接続 TCP/IP・Bluetooth / カメラ・BLE", "");
  const shape_d51_PLATFORM_ANDROID = addTextShape(sheet, "shape_d51_PLATFORM_ANDROID", "Android直接接続\nBluetooth・カメラ・USB / 現在は利用不可", 0, 0, 224.625, 36, 10, true, "#FFF2CC", 0, "#BF9000", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_PLATFORM_ANDROID, "Android直接接続 Bluetooth・カメラ・USB / 現在は利用不可", "");
  const shape_d51_CORE_CONFIG_GROUP_MODEL = addTextShape(sheet, "shape_d51_CORE_CONFIG_GROUP_MODEL", "DeviceConfig /\nActiveDevice / DeviceSpec\n設定モデル", 0, 0, 156.375, 51, 10, true, "#E2F0D9", 0, "#548235", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_CORE_CONFIG_GROUP_MODEL, "DeviceConfig / ActiveDevice / DeviceSpec 設定モデル", "");
  const shape_d51_CORE_MANAGER = addTextShape(sheet, "shape_d51_CORE_MANAGER", "DeviceManager\n初期化と有効デバイスの選択", 0, 0, 148.5, 36, 10, true, "#E2F0D9", 0, "#548235", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_CORE_MANAGER, "DeviceManager 初期化と有効デバイスの選択", "");
  const shape_d51_CORE_CONTRACT = addTextShape(sheet, "shape_d51_CORE_CONTRACT", "公開ストラテジーインターフェース\nおよびDeviceStrategyBase", 0, 0, 180, 36, 10, true, "#E2F0D9", 0, "#548235", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_CORE_CONTRACT, "公開ストラテジーインターフェース およびDeviceStrategyBase", "");
  const shape_d51_APP_SERVICE = addTextShape(sheet, "shape_d51_APP_SERVICE", "アプリケーションサービス\nデバイス呼出を管理", 0, 0, 138, 36, 10, true, "#D9EAF7", 0, "#4472C4", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_APP_SERVICE, "アプリケーションサービス デバイス呼出を管理", "");
  const shape_d51_APP_BOOT = addTextShape(sheet, "shape_d51_APP_BOOT", "MauiProgram\nDeviceCtrlの初期化を起動", 0, 0, 143.25, 36, 10, true, "#D9EAF7", 0, "#4472C4", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_APP_BOOT, "MauiProgram DeviceCtrlの初期化を起動", "");
  const shape_d51_EXTERNAL_WIN_OPOS_DEVICE = addTextShape(sheet, "shape_d51_EXTERNAL_WIN_OPOS_DEVICE", "Windows OPOS・OCX機器\nUSB / COM", 0, 0, 130.125, 36, 10, true, "#FCE4D6", 0, "#C55A11", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_EXTERNAL_WIN_OPOS_DEVICE, "Windows OPOS・OCX機器 USB / COM", "");
  const shape_d51_PLATFORM_WIN_DIRECT = addTextShape(sheet, "shape_d51_PLATFORM_WIN_DIRECT", "Windows直接接続\nSerialPort / Raw Input", 0, 0, 139.05, 36, 10, true, "#FFF2CC", 0, "#BF9000", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_PLATFORM_WIN_DIRECT, "Windows直接接続 SerialPort / Raw Input", "");
  const shape_d51_EXTERNAL_WIN_DIRECT_DEVICE = addTextShape(sheet, "shape_d51_EXTERNAL_WIN_DIRECT_DEVICE", "Windows直接接続機器\nCOM / Raw Input", 0, 0, 115.425, 36, 10, true, "#FCE4D6", 0, "#C55A11", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_EXTERNAL_WIN_DIRECT_DEVICE, "Windows直接接続機器 COM / Raw Input", "");
  const shape_d51_CORE_CONFIG_GROUP_DEFAULT = addTextShape(sheet, "shape_d51_CORE_CONFIG_GROUP_DEFAULT", "デフォルト設定\nDeviceCtrlのリソース", 0, 0, 122.25, 36, 10, true, "#EDEDED", 0, "#7F7F7F", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_CORE_CONFIG_GROUP_DEFAULT, "デフォルト設定 DeviceCtrlのリソース", "");
  const shape_d51_PLATFORM_WIN_CONNECTOR = addTextShape(sheet, "shape_d51_PLATFORM_WIN_CONNECTOR", "Windows OPOS・OCX\nストラテジー", 0, 0, 109.125, 36, 10, true, "#FFF2CC", 0, "#BF9000", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_PLATFORM_WIN_CONNECTOR, "Windows OPOS・OCX ストラテジー", "");
  const shape_d51_CORE_FACTORY = addTextShape(sheet, "shape_d51_CORE_FACTORY", "StrategyFactory<T>\nストラテジーを生成", 0, 0, 115.95, 36, 10, true, "#E2F0D9", 0, "#548235", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_CORE_FACTORY, "StrategyFactory<T> ストラテジーを生成", "");
  const shape_d51_EXTERNAL_CONNECTOR = addTextShape(sheet, "shape_d51_EXTERNAL_CONNECTOR", "デバイスコネクター\nWindows別プロセス", 0, 0, 106.5, 36, 10, true, "#FCE4D6", 0, "#C55A11", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_EXTERNAL_CONNECTOR, "デバイスコネクター Windows別プロセス", "名前付きパイプはDeviceCtrlとの通信に使用する。周辺機器との物理接続はOPOS・OCX側で管理する。");
  const shape_d51_CORE_CONFIG_GROUP_RUNTIME = addTextShape(sheet, "shape_d51_CORE_CONFIG_GROUP_RUNTIME", "ランタイム設定\nアプリデータ領域", 0, 0, 96, 36, 10, true, "#EDEDED", 0, "#7F7F7F", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_CORE_CONFIG_GROUP_RUNTIME, "ランタイム設定 アプリデータ領域", "");
  const shape_d51_APP_VIEW = addTextShape(sheet, "shape_d51_APP_VIEW", "ViewModel\n業務要求を送信", 0, 0, 96, 36, 10, true, "#D9EAF7", 0, "#4472C4", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_APP_VIEW, "ViewModel 業務要求を送信", "");
  const shape_d51_EXTERNAL_ANDROID_DEVICE = addTextShape(sheet, "shape_d51_EXTERNAL_ANDROID_DEVICE", "Android周辺機器", 0, 0, 96, 28, 10, true, "#FCE4D6", 0, "#C55A11", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_EXTERNAL_ANDROID_DEVICE, "Android周辺機器", "");
  const shape_d51_EXTERNAL_IOS_DEVICE = addTextShape(sheet, "shape_d51_EXTERNAL_IOS_DEVICE", "iOS周辺機器", 0, 0, 96, 28, 10, true, "#FCE4D6", 0, "#C55A11", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_EXTERNAL_IOS_DEVICE, "iOS周辺機器", "");

  let groupBottom1 = placeDiagramRow([shape_d51_APP_BOOT], [0.772444], laneRange1.getLeft(), originTop + 90, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeDiagramRow([shape_d51_APP_VIEW, shape_d51_APP_SERVICE], [0.167076, 0.772444], laneRange1.getLeft(), groupBottom1 + 60, laneRange1.getWidth(), 30, 28);
  let groupBottom2 = placeDiagramRow([shape_d51_CORE_CONFIG_GROUP_RUNTIME], [0.5], laneRange2.getLeft(), originTop + 90, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeDiagramRow([shape_d51_CORE_CONFIG_GROUP_DEFAULT], [0.5], laneRange2.getLeft(), groupBottom2 + 60, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeDiagramRow([shape_d51_CORE_CONFIG_GROUP_CONFIG], [0.5], laneRange2.getLeft(), groupBottom2 + 60, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeDiagramRow([shape_d51_CORE_CONFIG_GROUP_MODEL], [0.5], laneRange2.getLeft(), groupBottom2 + 60, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeDiagramRow([shape_d51_CORE_MANAGER], [0.5], laneRange2.getLeft(), groupBottom2 + 60, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeDiagramRow([shape_d51_CORE_FACTORY], [0.5], laneRange2.getLeft(), groupBottom2 + 60, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeDiagramRow([shape_d51_CORE_CONTRACT], [0.5], laneRange2.getLeft(), groupBottom2 + 60, laneRange2.getWidth(), 30, 28);
  let groupBottom3 = placeDiagramRow([shape_d51_PLATFORM_WIN_CONNECTOR], [0.5], laneRange3.getLeft(), originTop + 90, laneRange3.getWidth(), 30, 28);
  groupBottom3 = placeDiagramRow([shape_d51_PLATFORM_WIN_DIRECT], [0.5], laneRange3.getLeft(), groupBottom3 + 60, laneRange3.getWidth(), 30, 28);
  groupBottom3 = placeDiagramRow([shape_d51_PLATFORM_IOS], [0.5], laneRange3.getLeft(), groupBottom3 + 60, laneRange3.getWidth(), 30, 28);
  groupBottom3 = placeDiagramRow([shape_d51_PLATFORM_ANDROID], [0.5], laneRange3.getLeft(), groupBottom3 + 60, laneRange3.getWidth(), 30, 28);
  let groupBottom4 = placeDiagramRow([shape_d51_EXTERNAL_CONNECTOR, shape_d51_EXTERNAL_WIN_OPOS_DEVICE], [0.231485, 0.731485], laneRange4.getLeft(), originTop + 90, laneRange4.getWidth(), 30, 28);
  groupBottom4 = placeDiagramRow([shape_d51_EXTERNAL_WIN_DIRECT_DEVICE], [0.731485], laneRange4.getLeft(), groupBottom4 + 60, laneRange4.getWidth(), 30, 28);
  groupBottom4 = placeDiagramRow([shape_d51_EXTERNAL_IOS_DEVICE], [0.731485], laneRange4.getLeft(), groupBottom4 + 60, laneRange4.getWidth(), 30, 28);
  groupBottom4 = placeDiagramRow([shape_d51_EXTERNAL_ANDROID_DEVICE], [0.731485], laneRange4.getLeft(), groupBottom4 + 60, laneRange4.getWidth(), 30, 28);

  addSectionBackground(sheet, "section_bg_d51_2_1", "設定管理", [shape_d51_CORE_CONFIG_GROUP_CONFIG, shape_d51_CORE_CONFIG_GROUP_MODEL, shape_d51_CORE_CONFIG_GROUP_DEFAULT, shape_d51_CORE_CONFIG_GROUP_RUNTIME], laneRange2.getLeft(), laneRange2.getWidth(), "", 1, "#ED7D31", 2, "#111111");
  const diagramBottom = Math.max(originTop + 90, groupBottom1, groupBottom2, groupBottom3, groupBottom4);
  const bodyEndRowOffset = Math.max(11, Math.ceil((diagramBottom - originTop + 48) / 18) - 1);
  const canvasRowCount = Math.max(baselineCanvasRowCount, bodyEndRowOffset + 1);
  formatDiagramGrid(anchor, canvasRowCount, canvasColumnCount);
  if (bodyEndRowOffset >= baselineCanvasRowCount) {
    addCellLaneTable(anchor, bodyEndRowOffset);
  }

  const reviewLeft = anchor.getLeft();
  const reviewTop = anchor.getTop();
  const reviewRight = reviewLeft + canvasColumnCount * 36;
  const obstacleBounds: number[][] = [];
  collectDiagramObstacleBounds(sheet.getShapes(), obstacleBounds);
  const failedOverlayIds: string[] = [];

  const edge_d51_01_PLATFORM_WIN_CONNECTOR_to_EXTERNAL_CONNECTOR = addConnector(sheet, "edge_d51_01_PLATFORM_WIN_CONNECTOR_to_EXTERNAL_CONNECTOR", shape_d51_PLATFORM_WIN_CONNECTOR, shape_d51_EXTERNAL_CONNECTOR, false, false, "名前付きパイプ", "名前付きパイプ", "elbow", "right", "left", "#1F4E79", 2);
  if (!addConnectorLabel(sheet, obstacleBounds, "edge_label_d51_01_PLATFORM.WIN_CONNECTOR_to_EXTERNAL.CONNECTOR", "edge_group_d51_01_PLATFORM.WIN_CONNECTOR_to_EXTERNAL.CONNECTOR", edge_d51_01_PLATFORM_WIN_CONNECTOR_to_EXTERNAL_CONNECTOR, "名前付きパイプ", edge_d51_01_PLATFORM_WIN_CONNECTOR_to_EXTERNAL_CONNECTOR.getLeft() + edge_d51_01_PLATFORM_WIN_CONNECTOR_to_EXTERNAL_CONNECTOR.getWidth() / 2, edge_d51_01_PLATFORM_WIN_CONNECTOR_to_EXTERNAL_CONNECTOR.getTop() + edge_d51_01_PLATFORM_WIN_CONNECTOR_to_EXTERNAL_CONNECTOR.getHeight() / 2, reviewLeft, reviewRight, reviewTop)) {
    failedOverlayIds.push("edge_d51_01_PLATFORM_WIN_CONNECTOR_to_EXTERNAL_CONNECTOR");
  }
  const edge_d51_02_PLATFORM_WIN_DIRECT_to_EXTERNAL_WIN_DIRECT_DEVICE = addConnector(sheet, "edge_d51_02_PLATFORM_WIN_DIRECT_to_EXTERNAL_WIN_DIRECT_DEVICE", shape_d51_PLATFORM_WIN_DIRECT, shape_d51_EXTERNAL_WIN_DIRECT_DEVICE, false, false, "Windows直接接続 → Windows直接接続機器", "", "elbow", "right", "left", "#1F4E79", 2);
  const edge_d51_03_PLATFORM_IOS_to_EXTERNAL_IOS_DEVICE = addConnector(sheet, "edge_d51_03_PLATFORM_IOS_to_EXTERNAL_IOS_DEVICE", shape_d51_PLATFORM_IOS, shape_d51_EXTERNAL_IOS_DEVICE, false, false, "iOS直接接続 → iOS周辺機器", "", "elbow", "right", "left", "#1F4E79", 2);
  const edge_d51_04_PLATFORM_ANDROID_to_EXTERNAL_ANDROID_DEVICE = addConnector(sheet, "edge_d51_04_PLATFORM_ANDROID_to_EXTERNAL_ANDROID_DEVICE", shape_d51_PLATFORM_ANDROID, shape_d51_EXTERNAL_ANDROID_DEVICE, false, false, "Android直接接続 → Android周辺機器", "", "elbow", "right", "left", "#1F4E79", 2);
  const edge_d51_05_CORE_CONTRACT_to_PLATFORM_WIN_CONNECTOR = addConnector(sheet, "edge_d51_05_CORE_CONTRACT_to_PLATFORM_WIN_CONNECTOR", shape_d51_CORE_CONTRACT, shape_d51_PLATFORM_WIN_CONNECTOR, false, false, "公開ストラテジーインターフェース → Windows OPOS・OCX", "", "elbow", "right", "left", "#1F4E79", 2);
  const edge_d51_06_CORE_CONTRACT_to_PLATFORM_WIN_DIRECT = addConnector(sheet, "edge_d51_06_CORE_CONTRACT_to_PLATFORM_WIN_DIRECT", shape_d51_CORE_CONTRACT, shape_d51_PLATFORM_WIN_DIRECT, false, false, "公開ストラテジーインターフェース → Windows直接接続", "", "elbow", "right", "left", "#1F4E79", 2);
  const edge_d51_07_CORE_CONTRACT_to_PLATFORM_IOS = addConnector(sheet, "edge_d51_07_CORE_CONTRACT_to_PLATFORM_IOS", shape_d51_CORE_CONTRACT, shape_d51_PLATFORM_IOS, false, false, "公開ストラテジーインターフェース → iOS直接接続", "", "elbow", "right", "left", "#1F4E79", 2);
  const edge_d51_08_CORE_CONTRACT_to_PLATFORM_ANDROID = addConnector(sheet, "edge_d51_08_CORE_CONTRACT_to_PLATFORM_ANDROID", shape_d51_CORE_CONTRACT, shape_d51_PLATFORM_ANDROID, false, false, "公開ストラテジーインターフェース → Android直接接続", "", "elbow", "right", "left", "#1F4E79", 2);
  const edge_d51_09_APP_BOOT_to_CORE_MANAGER = addConnector(sheet, "edge_d51_09_APP_BOOT_to_CORE_MANAGER", shape_d51_APP_BOOT, shape_d51_CORE_MANAGER, false, false, "InitializeAsync", "InitializeAsync", "elbow", "right", "left", "#1F4E79", 2);
  if (!addConnectorLabel(sheet, obstacleBounds, "edge_label_d51_09_APP.BOOT_to_CORE.MANAGER", "edge_group_d51_09_APP.BOOT_to_CORE.MANAGER", edge_d51_09_APP_BOOT_to_CORE_MANAGER, "InitializeAsync", edge_d51_09_APP_BOOT_to_CORE_MANAGER.getLeft() + edge_d51_09_APP_BOOT_to_CORE_MANAGER.getWidth() / 2, edge_d51_09_APP_BOOT_to_CORE_MANAGER.getTop() + edge_d51_09_APP_BOOT_to_CORE_MANAGER.getHeight() / 2, reviewLeft, reviewRight, reviewTop)) {
    failedOverlayIds.push("edge_d51_09_APP_BOOT_to_CORE_MANAGER");
  }
  const edge_d51_10_APP_SERVICE_to_CORE_MANAGER = addConnector(sheet, "edge_d51_10_APP_SERVICE_to_CORE_MANAGER", shape_d51_APP_SERVICE, shape_d51_CORE_MANAGER, false, false, "Get...StrategyAsync", "Get...StrategyAsync", "elbow", "right", "left", "#1F4E79", 2);
  if (!addConnectorLabel(sheet, obstacleBounds, "edge_label_d51_10_APP.SERVICE_to_CORE.MANAGER", "edge_group_d51_10_APP.SERVICE_to_CORE.MANAGER", edge_d51_10_APP_SERVICE_to_CORE_MANAGER, "Get...StrategyAsync", edge_d51_10_APP_SERVICE_to_CORE_MANAGER.getLeft() + edge_d51_10_APP_SERVICE_to_CORE_MANAGER.getWidth() / 2, edge_d51_10_APP_SERVICE_to_CORE_MANAGER.getTop() + edge_d51_10_APP_SERVICE_to_CORE_MANAGER.getHeight() / 2, reviewLeft, reviewRight, reviewTop)) {
    failedOverlayIds.push("edge_d51_10_APP_SERVICE_to_CORE_MANAGER");
  }
  const edge_d51_11_APP_SERVICE_to_CORE_CONTRACT = addConnector(sheet, "edge_d51_11_APP_SERVICE_to_CORE_CONTRACT", shape_d51_APP_SERVICE, shape_d51_CORE_CONTRACT, false, false, "Start / デバイス操作 / End", "Start / デバイス操作 / End", "elbow", "right", "left", "#1F4E79", 2);
  if (!addConnectorLabel(sheet, obstacleBounds, "edge_label_d51_11_APP.SERVICE_to_CORE.CONTRACT", "edge_group_d51_11_APP.SERVICE_to_CORE.CONTRACT", edge_d51_11_APP_SERVICE_to_CORE_CONTRACT, "Start / デバイス操作 / End", edge_d51_11_APP_SERVICE_to_CORE_CONTRACT.getLeft() + edge_d51_11_APP_SERVICE_to_CORE_CONTRACT.getWidth() / 2, edge_d51_11_APP_SERVICE_to_CORE_CONTRACT.getTop() + edge_d51_11_APP_SERVICE_to_CORE_CONTRACT.getHeight() / 2, reviewLeft, reviewRight, reviewTop)) {
    failedOverlayIds.push("edge_d51_11_APP_SERVICE_to_CORE_CONTRACT");
  }
  const edge_d51_12_EXTERNAL_CONNECTOR_to_EXTERNAL_WIN_OPOS_DEVICE = addConnector(sheet, "edge_d51_12_EXTERNAL_CONNECTOR_to_EXTERNAL_WIN_OPOS_DEVICE", shape_d51_EXTERNAL_CONNECTOR, shape_d51_EXTERNAL_WIN_OPOS_DEVICE, false, false, "デバイスコネクター → Windows OPOS・OCX機器", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d51_13_CORE_MANAGER_to_CORE_FACTORY = addConnector(sheet, "edge_d51_13_CORE_MANAGER_to_CORE_FACTORY", shape_d51_CORE_MANAGER, shape_d51_CORE_FACTORY, false, false, "DeviceManager → StrategyFactory<T>", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d51_14_CORE_FACTORY_to_CORE_CONTRACT = addConnector(sheet, "edge_d51_14_CORE_FACTORY_to_CORE_CONTRACT", shape_d51_CORE_FACTORY, shape_d51_CORE_CONTRACT, false, false, "StrategyFactory<T> → 公開ストラテジーインターフェース", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d51_15_CORE_MANAGER_to_CORE_CONFIG_GROUP_MODEL = addConnector(sheet, "edge_d51_15_CORE_MANAGER_to_CORE_CONFIG_GROUP_MODEL", shape_d51_CORE_MANAGER, shape_d51_CORE_CONFIG_GROUP_MODEL, true, false, "適用", "適用", "elbow", "", "", "#7F7F7F", 2);
  if (!addConnectorLabel(sheet, obstacleBounds, "edge_label_d51_15_CORE.MANAGER_to_CORE.CONFIG_GROUP.MODEL", "edge_group_d51_15_CORE.MANAGER_to_CORE.CONFIG_GROUP.MODEL", edge_d51_15_CORE_MANAGER_to_CORE_CONFIG_GROUP_MODEL, "適用", edge_d51_15_CORE_MANAGER_to_CORE_CONFIG_GROUP_MODEL.getLeft() + edge_d51_15_CORE_MANAGER_to_CORE_CONFIG_GROUP_MODEL.getWidth() / 2, edge_d51_15_CORE_MANAGER_to_CORE_CONFIG_GROUP_MODEL.getTop() + edge_d51_15_CORE_MANAGER_to_CORE_CONFIG_GROUP_MODEL.getHeight() / 2, reviewLeft, reviewRight, reviewTop)) {
    failedOverlayIds.push("edge_d51_15_CORE_MANAGER_to_CORE_CONFIG_GROUP_MODEL");
  }
  const edge_d51_16_CORE_MANAGER_to_CORE_CONFIG_GROUP_CONFIG = addConnector(sheet, "edge_d51_16_CORE_MANAGER_to_CORE_CONFIG_GROUP_CONFIG", shape_d51_CORE_MANAGER, shape_d51_CORE_CONFIG_GROUP_CONFIG, false, false, "DeviceManager → DeviceControllerConfigService", "", "elbow", "left", "left", "#1F4E79", 2);
  const edge_d51_17_CORE_CONFIG_GROUP_RUNTIME_to_CORE_CONFIG_GROUP_CONFIG = addConnector(sheet, "edge_d51_17_CORE_CONFIG_GROUP_RUNTIME_to_CORE_CONFIG_GROUP_CONFIG", shape_d51_CORE_CONFIG_GROUP_RUNTIME, shape_d51_CORE_CONFIG_GROUP_CONFIG, true, false, "ランタイム設定 → DeviceControllerConfigService", "", "elbow", "right", "right", "#7F7F7F", 2);
  const edge_d51_18_CORE_CONFIG_GROUP_DEFAULT_to_CORE_CONFIG_GROUP_CONFIG = addConnector(sheet, "edge_d51_18_CORE_CONFIG_GROUP_DEFAULT_to_CORE_CONFIG_GROUP_CONFIG", shape_d51_CORE_CONFIG_GROUP_DEFAULT, shape_d51_CORE_CONFIG_GROUP_CONFIG, true, false, "フォールバック", "フォールバック", "elbow", "", "", "#7F7F7F", 2);
  if (!addConnectorLabel(sheet, obstacleBounds, "edge_label_d51_18_CORE.CONFIG_GROUP.DEFAULT_to_CORE.CONFIG_GROUP.CONFIG", "edge_group_d51_18_CORE.CONFIG_GROUP.DEFAULT_to_CORE.CONFIG_GROUP.CONFIG", edge_d51_18_CORE_CONFIG_GROUP_DEFAULT_to_CORE_CONFIG_GROUP_CONFIG, "フォールバック", edge_d51_18_CORE_CONFIG_GROUP_DEFAULT_to_CORE_CONFIG_GROUP_CONFIG.getLeft() + edge_d51_18_CORE_CONFIG_GROUP_DEFAULT_to_CORE_CONFIG_GROUP_CONFIG.getWidth() / 2, edge_d51_18_CORE_CONFIG_GROUP_DEFAULT_to_CORE_CONFIG_GROUP_CONFIG.getTop() + edge_d51_18_CORE_CONFIG_GROUP_DEFAULT_to_CORE_CONFIG_GROUP_CONFIG.getHeight() / 2, reviewLeft, reviewRight, reviewTop)) {
    failedOverlayIds.push("edge_d51_18_CORE_CONFIG_GROUP_DEFAULT_to_CORE_CONFIG_GROUP_CONFIG");
  }
  const edge_d51_19_CORE_CONFIG_GROUP_CONFIG_to_CORE_CONFIG_GROUP_RUNTIME = addConnector(sheet, "edge_d51_19_CORE_CONFIG_GROUP_CONFIG_to_CORE_CONFIG_GROUP_RUNTIME", shape_d51_CORE_CONFIG_GROUP_CONFIG, shape_d51_CORE_CONFIG_GROUP_RUNTIME, true, false, "DeviceControllerConfigService → ランタイム設定", "", "elbow", "left", "left", "#7F7F7F", 2);
  const edge_d51_20_CORE_CONFIG_GROUP_CONFIG_to_CORE_CONFIG_GROUP_MODEL = addConnector(sheet, "edge_d51_20_CORE_CONFIG_GROUP_CONFIG_to_CORE_CONFIG_GROUP_MODEL", shape_d51_CORE_CONFIG_GROUP_CONFIG, shape_d51_CORE_CONFIG_GROUP_MODEL, false, false, "デシリアライズ", "デシリアライズ", "elbow", "", "", "#1F4E79", 2);
  if (!addConnectorLabel(sheet, obstacleBounds, "edge_label_d51_20_CORE.CONFIG_GROUP.CONFIG_to_CORE.CONFIG_GROUP.MODEL", "edge_group_d51_20_CORE.CONFIG_GROUP.CONFIG_to_CORE.CONFIG_GROUP.MODEL", edge_d51_20_CORE_CONFIG_GROUP_CONFIG_to_CORE_CONFIG_GROUP_MODEL, "デシリアライズ", edge_d51_20_CORE_CONFIG_GROUP_CONFIG_to_CORE_CONFIG_GROUP_MODEL.getLeft() + edge_d51_20_CORE_CONFIG_GROUP_CONFIG_to_CORE_CONFIG_GROUP_MODEL.getWidth() / 2, edge_d51_20_CORE_CONFIG_GROUP_CONFIG_to_CORE_CONFIG_GROUP_MODEL.getTop() + edge_d51_20_CORE_CONFIG_GROUP_CONFIG_to_CORE_CONFIG_GROUP_MODEL.getHeight() / 2, reviewLeft, reviewRight, reviewTop)) {
    failedOverlayIds.push("edge_d51_20_CORE_CONFIG_GROUP_CONFIG_to_CORE_CONFIG_GROUP_MODEL");
  }
  const edge_d51_21_APP_VIEW_to_APP_SERVICE = addConnector(sheet, "edge_d51_21_APP_VIEW_to_APP_SERVICE", shape_d51_APP_VIEW, shape_d51_APP_SERVICE, false, false, "ユースケースを呼出", "ユースケースを呼出", "elbow", "", "", "#1F4E79", 2);
  if (!addConnectorLabel(sheet, obstacleBounds, "edge_label_d51_21_APP.VIEW_to_APP.SERVICE", "edge_group_d51_21_APP.VIEW_to_APP.SERVICE", edge_d51_21_APP_VIEW_to_APP_SERVICE, "ユースケースを呼出", edge_d51_21_APP_VIEW_to_APP_SERVICE.getLeft() + edge_d51_21_APP_VIEW_to_APP_SERVICE.getWidth() / 2, edge_d51_21_APP_VIEW_to_APP_SERVICE.getTop() + edge_d51_21_APP_VIEW_to_APP_SERVICE.getHeight() / 2, reviewLeft, reviewRight, reviewTop)) {
    failedOverlayIds.push("edge_d51_21_APP_VIEW_to_APP_SERVICE");
  }
  if (!addShapeComment(sheet, obstacleBounds, "shape_comment_d51_EXTERNAL.CONNECTOR", "shape_group_d51_EXTERNAL.CONNECTOR", "デバイスコネクター Windows別プロセス", "EXTERNAL.CONNECTOR", "名前付きパイプはDeviceCtrlとの通信に使用する。周辺機器との物理接続はOPOS・OCX側で管理する。", shape_d51_EXTERNAL_CONNECTOR, reviewLeft, reviewRight, reviewTop)) {
    failedOverlayIds.push("EXTERNAL.CONNECTOR");
  }

  if (failedOverlayIds.length > 0) {
    throw new Error("Unable to place all diagram-owned overlays. Missing IDs: " + failedOverlayIds.join(", "));
  }
  configurePdfReview(workbook, sheet, anchor, canvasRowCount, canvasColumnCount, false);
}

function addCellLaneTable(anchor: ExcelScript.Range, bodyEndRowOffset: number) {
  addLaneColumns(anchor, 0, 9, bodyEndRowOffset, "アプリケーション層", "", 1, "#ED7D31", 2, "#111111");
  addLaneColumns(anchor, 9, 7, bodyEndRowOffset, "DeviceCtrl", "", 1, "#ED7D31", 2, "#111111");
  addLaneColumns(anchor, 16, 8, bodyEndRowOffset, "プラットフォーム別ストラテジー", "", 1, "#ED7D31", 2, "#111111");
  addLaneColumns(anchor, 24, 10, bodyEndRowOffset, "外部境界", "", 1, "#ED7D31", 2, "#111111");
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

function addSectionBackground(sheet: ExcelScript.Worksheet, shapeName: string, title: string, members: ExcelScript.Shape[], laneLeft: number, laneWidth: number, fill: string, fillTransparency: number, stroke: string, lineWeight: number, textColor: string) {
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
  background.setTop(Math.max(0, top - titlePadding));
  background.setWidth(Math.max(1, laneWidth - sidePadding * 2));
  background.setHeight(Math.max(28, bottom - top + titlePadding + bottomPadding));
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

function placeDiagramRow(shapes: ExcelScript.Shape[], ratios: number[], laneLeft: number, rowTop: number, laneWidth: number, inset: number, gap: number): number {
  const leftLimit = laneLeft + inset;
  const rightLimit = laneLeft + laneWidth - inset;
  const availableWidth = Math.max(1, rightLimit - leftLimit);
  const positions: number[] = [];
  let previousRight = leftLimit - gap;
  let rowBottom = rowTop;
  for (let i = 0; i < shapes.length; i++) {
    const shape = shapes[i];
    const ratio = i < ratios.length ? Math.max(0, Math.min(1, ratios[i])) : 0.5;
    const desiredLeft = leftLimit + ratio * availableWidth - shape.getWidth() / 2;
    const nextLeft = Math.max(leftLimit, desiredLeft, previousRight + gap);
    positions.push(nextLeft);
    previousRight = nextLeft + shape.getWidth();
  }
  if (positions.length > 0) {
    const finalShape = shapes[shapes.length - 1];
    const overflow = positions[positions.length - 1] + finalShape.getWidth() - rightLimit;
    if (overflow > 0) {
      for (let i = 0; i < positions.length; i++) {
        positions[i] -= overflow;
      }
    }
    const underflow = leftLimit - positions[0];
    if (underflow > 0) {
      for (let i = 0; i < positions.length; i++) {
        positions[i] += underflow;
      }
    }
  }
  for (let i = 0; i < shapes.length; i++) {
    const shape = shapes[i];
    shape.setLeft(positions[i]);
    shape.setTop(rowTop);
    rowBottom = Math.max(rowBottom, shape.getTop() + shape.getHeight());
  }
  return rowBottom;
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
function labelWidth(text: string): number {
  const normalized = text.replace(/\n/g, " ");
  const width = normalized.length * 5 + 8;
  if (width < 28) {
    return 28;
  }
  if (width > 144) {
    return 144;
  }
  return width;
}

function labelHeight(text: string, width: number): number {
  const lineCount = text.split("\n").length;
  const estimatedLines = Math.ceil((text.length * 5) / Math.max(width - 6, 18));
  const height = Math.max(lineCount, estimatedLines) * 12 + 2;
  if (height < 16) {
    return 16;
  }
  if (height > 36) {
    return 36;
  }
  return height;
}

function addConnectorLabel(sheet: ExcelScript.Worksheet, obstacleBounds: number[][], shapeName: string, groupName: string, connector: ExcelScript.Shape, text: string, centerX: number, centerY: number, reviewLeft: number, reviewRight: number, reviewTop: number): boolean {
  const width = labelWidth(text);
  const height = labelHeight(text, width);
  const box = sheet.addTextBox(text);
  box.setName(shapeName);
  box.setWidth(width);
  box.setHeight(height);
  applyConnectorLabelView(box, "", 1, "", 0);

  const frame = box.getTextFrame();
  frame.getTextRange().setText(text);
  frame.setHorizontalAlignment(ExcelScript.ShapeTextHorizontalAlignment.center);
  frame.setVerticalAlignment(ExcelScript.ShapeTextVerticalAlignment.middle);
  frame.setLeftMargin(3);
  frame.setRightMargin(3);
  frame.setTopMargin(1);
  frame.setBottomMargin(1);
  const font = frame.getTextRange().getFont();
  font.setName("Meiryo UI");
  font.setSize(9);
  font.setBold(isBranchConnectorLabel(text));
  font.setColor("#111111");
  if (!placeConnectorLabel(box, centerX, centerY, reviewLeft, reviewRight, reviewTop)) {
    box.delete();
    return false;
  }
  box.setZOrder(ExcelScript.ShapeZOrder.bringToFront);
  appendObstacleBounds(obstacleBounds, box);
  const group = sheet.addGroup([connector, box]);
  group.setName(groupName);
  group.setAltTextTitle(text);
  group.setAltTextDescription(text);
  return true;
}

function placeConnectorLabel(box: ExcelScript.Shape, centerX: number, centerY: number, reviewLeft: number, reviewRight: number, reviewTop: number): boolean {
  const width = box.getWidth();
  const height = box.getHeight();
  const left = Math.max(reviewLeft, Math.min(centerX - width / 2, reviewRight - width));
  const top = Math.max(reviewTop, centerY - height / 2);
  box.setLeft(left);
  box.setTop(top);
  return left + width <= reviewRight;
}

function commentWidth(text: string): number {
  const normalized = text.replace(/\n/g, " ");
  const width = normalized.length * 5.4 + 24;
  if (width < 120) {
    return 120;
  }
  if (width > 160) {
    return 160;
  }
  return width;
}

function commentHeight(text: string, width: number): number {
  const lineCount = text.split("\n").length;
  const estimatedLines = Math.ceil((text.length * 5.4) / Math.max(width - 20, 30));
  const height = Math.max(lineCount, estimatedLines) * 15 + 14;
  if (height < 44) {
    return 44;
  }
  if (height > 110) {
    return 110;
  }
  return height;
}

function addShapeComment(sheet: ExcelScript.Worksheet, obstacleBounds: number[][], shapeName: string, groupName: string, targetTitle: string, sourceId: string, text: string, target: ExcelScript.Shape, reviewLeft: number, reviewRight: number, reviewTop: number): boolean {
  const width = commentWidth(text);
  const height = commentHeight(text, width);
  const box = sheet.addGeometricShape(ExcelScript.GeometricShapeType.wedgeRRectCallout);
  box.setName(shapeName);
  box.setWidth(width);
  box.setHeight(height);
  applyCommentView(box, "#FFF2CC", 0.15, "#BF9000", 2);

  const frame = box.getTextFrame();
  frame.getTextRange().setText(text);
  frame.setHorizontalAlignment(ExcelScript.ShapeTextHorizontalAlignment.left);
  frame.setVerticalAlignment(ExcelScript.ShapeTextVerticalAlignment.middle);
  frame.setLeftMargin(7);
  frame.setRightMargin(7);
  frame.setTopMargin(4);
  frame.setBottomMargin(4);
  const font = frame.getTextRange().getFont();
  font.setName("Meiryo UI");
  font.setSize(9);
  font.setBold(false);
  font.setColor("#404040");
  if (!placeShapeComment(obstacleBounds, box, sourceId, target, reviewLeft, reviewRight, reviewTop)) {
    box.delete();
    return false;
  }
  box.setZOrder(ExcelScript.ShapeZOrder.bringToFront);
  appendObstacleBounds(obstacleBounds, box);
  const group = sheet.addGroup([target, box]);
  group.setName(groupName);
  group.setAltTextTitle(targetTitle);
  group.setAltTextDescription(text);
  return true;
}

function placeShapeComment(obstacleBounds: number[][], box: ExcelScript.Shape, sourceId: string, target: ExcelScript.Shape, reviewLeft: number, reviewRight: number, reviewTop: number): boolean {
  const gap = 10;
  const width = box.getWidth();
  const height = box.getHeight();
  const targetLeft = target.getLeft();
  const targetTop = target.getTop();
  const targetRight = targetLeft + target.getWidth();
  const targetBottom = targetTop + target.getHeight();
  const preferLeft = targetLeft + target.getWidth() / 2 >= reviewLeft + (reviewRight - reviewLeft) / 2;
  const positionOrder = shapeCommentPositionOrder(sourceId, preferLeft);
  for (let i = 0; i < positionOrder.length; i++) {
    const position = shapeCommentPosition(positionOrder[i], targetLeft, targetTop, targetRight, targetBottom, target.getWidth(), target.getHeight(), width, height, gap);
    const left = position[0];
    const top = Math.max(0, position[1]);
    if (left < reviewLeft || left + width > reviewRight) {
      continue;
    }
    if (!overlapsObstacleBounds(obstacleBounds, left, top, width, height)) {
      box.setLeft(left);
      box.setTop(top);
      return true;
    }
  }
  return placeOverlayInReviewGrid(obstacleBounds, box, reviewLeft, reviewRight, reviewTop);
}
