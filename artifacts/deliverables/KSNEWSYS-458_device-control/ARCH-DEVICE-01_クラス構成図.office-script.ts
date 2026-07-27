function main(workbook: ExcelScript.Workbook) {
  const anchorPosition = getRunAnchorPosition(workbook);
  const sheet = createRenderWorksheet(workbook, "05_クラス構成_01");
  sheet.activate();
  const anchor = sheet.getCell(anchorPosition.rowIndex, anchorPosition.columnIndex);
  const originTop = anchor.getTop();
  const canvasColumnCount = 36;
  const baselineCanvasRowCount = 43;
  formatDiagramGrid(anchor, baselineCanvasRowCount, canvasColumnCount);

  const laneRange1 = getAnchoredRange(anchor, 0, 0, 1, 10);
  const laneRange2 = getAnchoredRange(anchor, 0, 10, 1, 8);
  const laneRange3 = getAnchoredRange(anchor, 0, 18, 1, 8);
  const laneRange4 = getAnchoredRange(anchor, 0, 26, 1, 10);

  addCellLaneTable(anchor, baselineCanvasRowCount - 1);

  const shape_d51_EXTERNAL_WIN_OPOS_DEVICE = addTextShape(sheet, "shape_d51_EXTERNAL_WIN_OPOS_DEVICE", "② Windows OPOS／OCX機器\nUSB / COM", 0, 0, 146.4, 36, 10, true, "#E4DFEC", 0, "#8064A2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_EXTERNAL_WIN_OPOS_DEVICE, "② Windows OPOS／OCX機器 USB / COM", "");
  const shape_d51_PLATFORM_IOS = addTextShape(sheet, "shape_d51_PLATFORM_IOS", "③ iOS直接接続\nTCP/IP・Bluetooth / カメラ・BLE", 0, 0, 185.775, 36, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_PLATFORM_IOS, "③ iOS直接接続 TCP/IP・Bluetooth / カメラ・BLE", "");
  const shape_d51_PLATFORM_ANDROID = addTextShape(sheet, "shape_d51_PLATFORM_ANDROID", "④ Android直接接続\nBluetooth・カメラ・USB / 現在は利用不可", 0, 0, 224.625, 36, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_PLATFORM_ANDROID, "④ Android直接接続 Bluetooth・カメラ・USB / 現在は利用不可", "");
  const shape_d51_CORE_CONFIG_GROUP_MODEL = addTextShape(sheet, "shape_d51_CORE_CONFIG_GROUP_MODEL", "①-4 設定モデル\n（DeviceConfig /\nActiveDevice / DeviceSpec）", 0, 0, 166.875, 51, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_CORE_CONFIG_GROUP_MODEL, "①-4 設定モデル （DeviceConfig / ActiveDevice / DeviceSpec）", "");
  const shape_d51_CORE_CONTRACT = addTextShape(sheet, "shape_d51_CORE_CONTRACT", "④ 公開デバイス契約\n（I...Strategy / DeviceStrategyBase）", 0, 0, 223.575, 36, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_CORE_CONTRACT, "④ 公開デバイス契約 （I...Strategy / DeviceStrategyBase）", "");
  const shape_d51_APP_SERVICE = addTextShape(sheet, "shape_d51_APP_SERVICE", "③ アプリケーションサービス\nデバイス呼出を管理", 0, 0, 154.275, 36, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_APP_SERVICE, "③ アプリケーションサービス デバイス呼出を管理", "");
  const shape_d51_CORE_CONFIG_GROUP_CONFIG = addTextShape(sheet, "shape_d51_CORE_CONFIG_GROUP_CONFIG", "①-3 設定管理\n（DeviceControllerConfigService）", 0, 0, 200.475, 36, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_CORE_CONFIG_GROUP_CONFIG, "①-3 設定管理 （DeviceControllerConfigService）", "");
  const shape_d51_CORE_CONFIG_GROUP_DEFAULT = addTextShape(sheet, "shape_d51_CORE_CONFIG_GROUP_DEFAULT", "①-2 デフォルト設定\nデバイス制御層のリソース", 0, 0, 138, 36, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_CORE_CONFIG_GROUP_DEFAULT, "①-2 デフォルト設定 デバイス制御層のリソース", "");
  const shape_d51_EXTERNAL_WIN_DIRECT_DEVICE = addTextShape(sheet, "shape_d51_EXTERNAL_WIN_DIRECT_DEVICE", "③ Windows直接接続機器\nCOM / Raw Input", 0, 0, 131.7, 36, 10, true, "#E4DFEC", 0, "#8064A2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_EXTERNAL_WIN_DIRECT_DEVICE, "③ Windows直接接続機器 COM / Raw Input", "");
  const shape_d51_PLATFORM_WIN_CONNECTOR = addTextShape(sheet, "shape_d51_PLATFORM_WIN_CONNECTOR", "① Windows OPOS／OCX\nストラテジー", 0, 0, 125.4, 36, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_PLATFORM_WIN_CONNECTOR, "① Windows OPOS／OCX ストラテジー", "");
  const shape_d51_CORE_FACTORY = addTextShape(sheet, "shape_d51_CORE_FACTORY", "③ ストラテジー生成\n（StrategyFactory<T>）", 0, 0, 136.95, 36, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_CORE_FACTORY, "③ ストラテジー生成 （StrategyFactory<T>）", "");
  const shape_d51_PLATFORM_WIN_DIRECT = addTextShape(sheet, "shape_d51_PLATFORM_WIN_DIRECT", "② Windows直接接続\nSerialPort / Raw Input", 0, 0, 139.05, 36, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_PLATFORM_WIN_DIRECT, "② Windows直接接続 SerialPort / Raw Input", "");
  const shape_d51_EXTERNAL_CONNECTOR = addTextShape(sheet, "shape_d51_EXTERNAL_CONNECTOR", "① デバイスコネクタ\nWindows別プロセス", 0, 0, 112.275, 36, 10, true, "#FCE4D6", 0, "#ED7D31", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_EXTERNAL_CONNECTOR, "① デバイスコネクタ Windows別プロセス", "コマンド通信用パイプとイベント通知用パイプはデバイス制御層との通信に使用する。周辺機器との物理接続はOPOS／OCX側で管理する。");
  const shape_d51_CORE_CONFIG_GROUP_RUNTIME = addTextShape(sheet, "shape_d51_CORE_CONFIG_GROUP_RUNTIME", "①-1 ランタイム設定\nアプリデータ領域", 0, 0, 113.325, 36, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_CORE_CONFIG_GROUP_RUNTIME, "①-1 ランタイム設定 アプリデータ領域", "");
  const shape_d51_CORE_MANAGER = addTextShape(sheet, "shape_d51_CORE_MANAGER", "② デバイス管理\n（DeviceManager）", 0, 0, 108.075, 36, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_CORE_MANAGER, "② デバイス管理 （DeviceManager）", "");
  const shape_d51_APP_BOOT = addTextShape(sheet, "shape_d51_APP_BOOT", "① 構成ルート\n（MauiProgram）", 0, 0, 96.525, 36, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_APP_BOOT, "① 構成ルート （MauiProgram）", "");
  const shape_d51_APP_VIEW = addTextShape(sheet, "shape_d51_APP_VIEW", "② 画面状態管理\n（ViewModel）", 0, 0, 96, 36, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_APP_VIEW, "② 画面状態管理 （ViewModel）", "");
  const shape_d51_EXTERNAL_ANDROID_DEVICE = addTextShape(sheet, "shape_d51_EXTERNAL_ANDROID_DEVICE", "⑤ Android周辺機器", 0, 0, 110.7, 28, 10, true, "#E4DFEC", 0, "#8064A2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_EXTERNAL_ANDROID_DEVICE, "⑤ Android周辺機器", "");
  const shape_d51_EXTERNAL_IOS_DEVICE = addTextShape(sheet, "shape_d51_EXTERNAL_IOS_DEVICE", "④ iOS周辺機器", 0, 0, 96, 28, 10, true, "#E4DFEC", 0, "#8064A2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_EXTERNAL_IOS_DEVICE, "④ iOS周辺機器", "");

  let groupBottom1 = placeDiagramRow([shape_d51_APP_BOOT], [0.770841], laneRange1.getLeft(), originTop + 90, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeDiagramRow([shape_d51_APP_VIEW, shape_d51_APP_SERVICE], [0.167478, 0.770841], laneRange1.getLeft(), groupBottom1 + 60, laneRange1.getWidth(), 30, 28);
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
  let groupBottom4 = placeDiagramRow([shape_d51_EXTERNAL_CONNECTOR, shape_d51_EXTERNAL_WIN_OPOS_DEVICE], [0.226352, 0.726352], laneRange4.getLeft(), originTop + 90, laneRange4.getWidth(), 30, 28);
  groupBottom4 = placeDiagramRow([shape_d51_EXTERNAL_WIN_DIRECT_DEVICE], [0.726352], laneRange4.getLeft(), groupBottom4 + 60, laneRange4.getWidth(), 30, 28);
  groupBottom4 = placeDiagramRow([shape_d51_EXTERNAL_IOS_DEVICE], [0.726352], laneRange4.getLeft(), groupBottom4 + 60, laneRange4.getWidth(), 30, 28);
  groupBottom4 = placeDiagramRow([shape_d51_EXTERNAL_ANDROID_DEVICE], [0.726352], laneRange4.getLeft(), groupBottom4 + 60, laneRange4.getWidth(), 30, 28);

  addSectionBackground(sheet, "section_bg_d51_2_1", "① 設定管理", [shape_d51_CORE_CONFIG_GROUP_MODEL, shape_d51_CORE_CONFIG_GROUP_CONFIG, shape_d51_CORE_CONFIG_GROUP_DEFAULT, shape_d51_CORE_CONFIG_GROUP_RUNTIME], laneRange2.getLeft(), laneRange2.getWidth(), "", 1, "#ED7D31", 2, "#111111");
  const diagramBottom = Math.max(originTop + 90, groupBottom1, groupBottom2, groupBottom3, groupBottom4);
  const bodyEndRowOffset = Math.max(11, Math.ceil((diagramBottom - originTop + 48) / 18) - 1);
  const canvasRowCount = Math.max(baselineCanvasRowCount, bodyEndRowOffset + 1);
  formatDiagramGrid(anchor, canvasRowCount, canvasColumnCount);
  if (bodyEndRowOffset >= baselineCanvasRowCount) {
    addCellLaneTable(anchor, bodyEndRowOffset);
  }

  const edge_d51_01_PLATFORM_WIN_CONNECTOR_to_EXTERNAL_CONNECTOR = addConnector(sheet, "edge_d51_01_PLATFORM_WIN_CONNECTOR_to_EXTERNAL_CONNECTOR", shape_d51_PLATFORM_WIN_CONNECTOR, shape_d51_EXTERNAL_CONNECTOR, false, false, "コマンド通信用／ イベント通知用パイプ", "コマンド通信用／ イベント通知用パイプ", "elbow", "right", "left", "#1F4E79", 2);
  const edge_d51_02_PLATFORM_WIN_DIRECT_to_EXTERNAL_WIN_DIRECT_DEVICE = addConnector(sheet, "edge_d51_02_PLATFORM_WIN_DIRECT_to_EXTERNAL_WIN_DIRECT_DEVICE", shape_d51_PLATFORM_WIN_DIRECT, shape_d51_EXTERNAL_WIN_DIRECT_DEVICE, false, false, "② Windows直接接続 → ③ Windows直接接続機器", "", "elbow", "right", "left", "#7030A0", 2);
  const edge_d51_03_PLATFORM_IOS_to_EXTERNAL_IOS_DEVICE = addConnector(sheet, "edge_d51_03_PLATFORM_IOS_to_EXTERNAL_IOS_DEVICE", shape_d51_PLATFORM_IOS, shape_d51_EXTERNAL_IOS_DEVICE, false, false, "③ iOS直接接続 → ④ iOS周辺機器", "", "elbow", "right", "left", "#7030A0", 2);
  const edge_d51_04_PLATFORM_ANDROID_to_EXTERNAL_ANDROID_DEVICE = addConnector(sheet, "edge_d51_04_PLATFORM_ANDROID_to_EXTERNAL_ANDROID_DEVICE", shape_d51_PLATFORM_ANDROID, shape_d51_EXTERNAL_ANDROID_DEVICE, false, false, "④ Android直接接続 → ⑤ Android周辺機器", "", "elbow", "right", "left", "#7030A0", 2);
  const edge_d51_05_CORE_CONTRACT_to_PLATFORM_WIN_CONNECTOR = addConnector(sheet, "edge_d51_05_CORE_CONTRACT_to_PLATFORM_WIN_CONNECTOR", shape_d51_CORE_CONTRACT, shape_d51_PLATFORM_WIN_CONNECTOR, false, false, "④ 公開デバイス契約 → ① Windows OPOS／OCX", "", "elbow", "right", "left", "#1F4E79", 2);
  const edge_d51_06_CORE_CONTRACT_to_PLATFORM_WIN_DIRECT = addConnector(sheet, "edge_d51_06_CORE_CONTRACT_to_PLATFORM_WIN_DIRECT", shape_d51_CORE_CONTRACT, shape_d51_PLATFORM_WIN_DIRECT, false, false, "④ 公開デバイス契約 → ② Windows直接接続", "", "elbow", "right", "left", "#1F4E79", 2);
  const edge_d51_07_CORE_CONTRACT_to_PLATFORM_IOS = addConnector(sheet, "edge_d51_07_CORE_CONTRACT_to_PLATFORM_IOS", shape_d51_CORE_CONTRACT, shape_d51_PLATFORM_IOS, false, false, "④ 公開デバイス契約 → ③ iOS直接接続", "", "elbow", "right", "left", "#1F4E79", 2);
  const edge_d51_08_CORE_CONTRACT_to_PLATFORM_ANDROID = addConnector(sheet, "edge_d51_08_CORE_CONTRACT_to_PLATFORM_ANDROID", shape_d51_CORE_CONTRACT, shape_d51_PLATFORM_ANDROID, false, false, "④ 公開デバイス契約 → ④ Android直接接続", "", "elbow", "right", "left", "#1F4E79", 2);
  const edge_d51_09_APP_BOOT_to_CORE_MANAGER = addConnector(sheet, "edge_d51_09_APP_BOOT_to_CORE_MANAGER", shape_d51_APP_BOOT, shape_d51_CORE_MANAGER, false, false, "InitializeAsync", "InitializeAsync", "elbow", "right", "left", "#1F4E79", 2);
  const edge_d51_10_APP_SERVICE_to_CORE_MANAGER = addConnector(sheet, "edge_d51_10_APP_SERVICE_to_CORE_MANAGER", shape_d51_APP_SERVICE, shape_d51_CORE_MANAGER, false, false, "Get...StrategyAsync", "Get...StrategyAsync", "elbow", "right", "left", "#1F4E79", 2);
  const edge_d51_11_APP_SERVICE_to_CORE_CONTRACT = addConnector(sheet, "edge_d51_11_APP_SERVICE_to_CORE_CONTRACT", shape_d51_APP_SERVICE, shape_d51_CORE_CONTRACT, false, false, "Start / デバイス操作 / End", "Start / デバイス操作 / End", "elbow", "right", "left", "#1F4E79", 2);
  const edge_d51_12_EXTERNAL_CONNECTOR_to_EXTERNAL_WIN_OPOS_DEVICE = addConnector(sheet, "edge_d51_12_EXTERNAL_CONNECTOR_to_EXTERNAL_WIN_OPOS_DEVICE", shape_d51_EXTERNAL_CONNECTOR, shape_d51_EXTERNAL_WIN_OPOS_DEVICE, false, false, "① デバイスコネクタ → ② Windows OPOS／OCX機器", "", "elbow", "", "", "#7030A0", 2);
  const edge_d51_13_CORE_MANAGER_to_CORE_FACTORY = addConnector(sheet, "edge_d51_13_CORE_MANAGER_to_CORE_FACTORY", shape_d51_CORE_MANAGER, shape_d51_CORE_FACTORY, false, false, "② デバイス管理 → ③ ストラテジー生成", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d51_14_CORE_FACTORY_to_CORE_CONTRACT = addConnector(sheet, "edge_d51_14_CORE_FACTORY_to_CORE_CONTRACT", shape_d51_CORE_FACTORY, shape_d51_CORE_CONTRACT, false, false, "③ ストラテジー生成 → ④ 公開デバイス契約", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d51_15_CORE_MANAGER_to_CORE_CONFIG_GROUP_MODEL = addConnector(sheet, "edge_d51_15_CORE_MANAGER_to_CORE_CONFIG_GROUP_MODEL", shape_d51_CORE_MANAGER, shape_d51_CORE_CONFIG_GROUP_MODEL, true, false, "適用", "適用", "elbow", "", "", "#7F7F7F", 2);
  const edge_d51_16_CORE_MANAGER_to_CORE_CONFIG_GROUP_CONFIG = addConnector(sheet, "edge_d51_16_CORE_MANAGER_to_CORE_CONFIG_GROUP_CONFIG", shape_d51_CORE_MANAGER, shape_d51_CORE_CONFIG_GROUP_CONFIG, false, false, "② デバイス管理 → ①-3 設定管理", "", "elbow", "left", "left", "#1F4E79", 2);
  const edge_d51_17_CORE_CONFIG_GROUP_RUNTIME_to_CORE_CONFIG_GROUP_CONFIG = addConnector(sheet, "edge_d51_17_CORE_CONFIG_GROUP_RUNTIME_to_CORE_CONFIG_GROUP_CONFIG", shape_d51_CORE_CONFIG_GROUP_RUNTIME, shape_d51_CORE_CONFIG_GROUP_CONFIG, true, false, "①-1 ランタイム設定 → ①-3 設定管理", "", "elbow", "right", "right", "#7F7F7F", 2);
  const edge_d51_18_CORE_CONFIG_GROUP_DEFAULT_to_CORE_CONFIG_GROUP_CONFIG = addConnector(sheet, "edge_d51_18_CORE_CONFIG_GROUP_DEFAULT_to_CORE_CONFIG_GROUP_CONFIG", shape_d51_CORE_CONFIG_GROUP_DEFAULT, shape_d51_CORE_CONFIG_GROUP_CONFIG, true, false, "フォールバック", "フォールバック", "elbow", "", "", "#7F7F7F", 2);
  const edge_d51_19_CORE_CONFIG_GROUP_CONFIG_to_CORE_CONFIG_GROUP_RUNTIME = addConnector(sheet, "edge_d51_19_CORE_CONFIG_GROUP_CONFIG_to_CORE_CONFIG_GROUP_RUNTIME", shape_d51_CORE_CONFIG_GROUP_CONFIG, shape_d51_CORE_CONFIG_GROUP_RUNTIME, true, false, "①-3 設定管理 → ①-1 ランタイム設定", "", "elbow", "left", "left", "#7F7F7F", 2);
  const edge_d51_20_CORE_CONFIG_GROUP_CONFIG_to_CORE_CONFIG_GROUP_MODEL = addConnector(sheet, "edge_d51_20_CORE_CONFIG_GROUP_CONFIG_to_CORE_CONFIG_GROUP_MODEL", shape_d51_CORE_CONFIG_GROUP_CONFIG, shape_d51_CORE_CONFIG_GROUP_MODEL, false, false, "デシリアライズ", "デシリアライズ", "elbow", "", "", "#1F4E79", 2);
  const edge_d51_21_APP_VIEW_to_APP_SERVICE = addConnector(sheet, "edge_d51_21_APP_VIEW_to_APP_SERVICE", shape_d51_APP_VIEW, shape_d51_APP_SERVICE, false, false, "ユースケースを呼出", "ユースケースを呼出", "elbow", "", "", "#1F4E79", 2);

  configurePdfReview(workbook, sheet, anchor, canvasRowCount, canvasColumnCount, false);
}

function addCellLaneTable(anchor: ExcelScript.Range, bodyEndRowOffset: number) {
  addLaneColumns(anchor, 0, 10, bodyEndRowOffset, "（1） アプリケーション層", "#F7FBFF", 0, "#4472C4", 2, "#111111");
  addLaneColumns(anchor, 10, 8, bodyEndRowOffset, "（2） デバイス制御層（DeviceCtrl）", "#F7FBFF", 0, "#4472C4", 2, "#111111");
  addLaneColumns(anchor, 18, 8, bodyEndRowOffset, "（3） プラットフォーム別ストラテジー", "#F7FBFF", 0, "#4472C4", 2, "#111111");
  addLaneColumns(anchor, 26, 10, bodyEndRowOffset, "（4） 外部境界", "", 1, "#ED7D31", 2, "#111111");
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
