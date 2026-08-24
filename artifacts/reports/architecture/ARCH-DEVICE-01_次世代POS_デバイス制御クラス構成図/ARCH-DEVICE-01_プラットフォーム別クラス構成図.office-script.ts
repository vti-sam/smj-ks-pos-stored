// Generated from Markdown: ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図.md
// Source contract SHA-256: 0b78890f438502401f65a6f211586b2656f8438693f53703809ae956abed9766
// Generated output; do not edit. Change Markdown or the owning renderer and regenerate both scripts.

function main(workbook: ExcelScript.Workbook) {
  const anchorPosition = getRunAnchorPosition(workbook);
  const sheet = createRenderWorksheet(workbook, "07_プラットフォーム別クラス構成図_01");
  sheet.activate();
  const anchor = sheet.getCell(anchorPosition.rowIndex, anchorPosition.columnIndex);
  const originTop = anchor.getTop();
  const canvasColumnCount = 39;
  const baselineCanvasRowCount = 31;
  formatDiagramGrid(anchor, baselineCanvasRowCount, canvasColumnCount);

  const laneRange1 = getAnchoredRange(anchor, 0, 0, 1, 32);
  const laneRange2 = getAnchoredRange(anchor, 0, 32, 1, 7);

  addCellLaneTable(anchor, baselineCanvasRowCount - 1);

  const shape_d71_PLATFORM_DOMAIN_CONTRACT = addTextShape(sheet, "shape_d71_PLATFORM_DOMAIN_CONTRACT", "① 《インターフェース》\n公開デバイス契約群\n1. IPrinterStrategy\n2. IBarcodeScannerStrategy\n3. ICashChangerStrategy\n4. ICustomerDisplayStrategy\n5. IDrawerStrategy\n6. IPaymentStrategy\n7. IKeyboardStrategy", 0, 0, 200.637, 226.874146, 10, true, "#DDEBF7", 0, "#4472C4", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d71_PLATFORM_DOMAIN_CONTRACT, "① 《インターフェース》 公開デバイス契約群 1. IPrinterStrategy 2. IBarcodeScannerStrategy 3. ICashChangerStrategy 4. ICustomerDisplayStrategy 5. IDrawerStrategy 6. IPaymentStrategy 7. IKeyboardStrategy", "");
  const shape_d71_PLATFORM_DOMAIN_ANDROID = addTextShape(sheet, "shape_d71_PLATFORM_DOMAIN_ANDROID", "⑥ Android直接接続\nAndroidBluetoothPrinterStrategy等\n現在は利用不可", 0, 0, 236.375466, 97.231777, 10, true, "#F2F2F2", 0, "#7F7F7F", 2, "#666666", true, "center", "rectangle", true);
  setShapeAltText(shape_d71_PLATFORM_DOMAIN_ANDROID, "⑥ Android直接接続 AndroidBluetoothPrinterStrategy等 現在は利用不可", "");
  const shape_d71_PLATFORM_DOMAIN_OPOS_COMM = addTextShape(sheet, "shape_d71_PLATFORM_DOMAIN_OPOS_COMM", "⑦ OPOS通信クラス群\nOposNamedPipeCommandClient\nNamedPipeClient /\nNamedPipeEventReceiver", 0, 0, 230.34671, 97.231777, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d71_PLATFORM_DOMAIN_OPOS_COMM, "⑦ OPOS通信クラス群 OposNamedPipeCommandClient NamedPipeClient / NamedPipeEventReceiver", "");
  const shape_d71_EXTERNAL_DOMAIN_IOS_API = addTextShape(sheet, "shape_d71_EXTERNAL_DOMAIN_IOS_API", "③ 《接続境界》\niOS SDK / OS API\nTCP/IP・Bluetooth / カメラ・BLE", 0, 0, 200.637, 97.231777, 10, true, "#FCE4D6", 0, "#ED7D31", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d71_EXTERNAL_DOMAIN_IOS_API, "③ 《接続境界》 iOS SDK / OS API TCP/IP・Bluetooth / カメラ・BLE", "");
  const shape_d71_PLATFORM_DOMAIN_WIN_DIRECT = addTextShape(sheet, "shape_d71_PLATFORM_DOMAIN_WIN_DIRECT", "④ Windows直接接続\nSerialHandyScannerStrategy等", 0, 0, 208.558785, 78.711438, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d71_PLATFORM_DOMAIN_WIN_DIRECT, "④ Windows直接接続 SerialHandyScannerStrategy等", "");
  const shape_d71_EXTERNAL_DOMAIN_ANDROID_API = addTextShape(sheet, "shape_d71_EXTERNAL_DOMAIN_ANDROID_API", "④ 《接続境界》\nAndroid API\nBluetooth / カメラ / USB", 0, 0, 186.348848, 78.711438, 10, true, "#F2F2F2", 0, "#7F7F7F", 2, "#666666", true, "center", "rectangle", true);
  setShapeAltText(shape_d71_EXTERNAL_DOMAIN_ANDROID_API, "④ 《接続境界》 Android API Bluetooth / カメラ / USB", "");
  const shape_d71_EXTERNAL_DOMAIN_WIN_API = addTextShape(sheet, "shape_d71_EXTERNAL_DOMAIN_WIN_API", "② 《接続境界》\nWindows API\nSerialPort / Raw Input", 0, 0, 172.591227, 78.711438, 10, true, "#FCE4D6", 0, "#ED7D31", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d71_EXTERNAL_DOMAIN_WIN_API, "② 《接続境界》 Windows API SerialPort / Raw Input", "");
  const shape_d71_PLATFORM_DOMAIN_DEVICE_CONTRACTS = addTextShape(sheet, "shape_d71_PLATFORM_DOMAIN_DEVICE_CONTRACTS", "⑧ 共通デバイス通信契約\nTabletPos.DeviceContracts", 0, 0, 199.129811, 60.1911, 10, true, "#FFF2CC", 0, "#BF9000", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d71_PLATFORM_DOMAIN_DEVICE_CONTRACTS, "⑧ 共通デバイス通信契約 TabletPos.DeviceContracts", "");
  const shape_d71_PLATFORM_DOMAIN_IOS = addTextShape(sheet, "shape_d71_PLATFORM_DOMAIN_IOS", "⑤ iOS直接接続\nIosEpsonPrinterStrategy等", 0, 0, 196.416871, 60.1911, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d71_PLATFORM_DOMAIN_IOS, "⑤ iOS直接接続 IosEpsonPrinterStrategy等", "");
  const shape_d71_EXTERNAL_DOMAIN_CONNECTOR = addTextShape(sheet, "shape_d71_EXTERNAL_DOMAIN_CONNECTOR", "① 《接続境界》\nデバイスコネクタ\nTabletPos.Host", 0, 0, 144.219901, 78.711438, 10, true, "#FCE4D6", 0, "#ED7D31", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d71_EXTERNAL_DOMAIN_CONNECTOR, "① 《接続境界》 デバイスコネクタ TabletPos.Host", "");
  const shape_d71_PLATFORM_DOMAIN_OPOS = addTextShape(sheet, "shape_d71_PLATFORM_DOMAIN_OPOS", "③ Windows OPOS／OCX\nOposPrinterStrategy等", 0, 0, 178.788788, 60.1911, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d71_PLATFORM_DOMAIN_OPOS, "③ Windows OPOS／OCX OposPrinterStrategy等", "");
  const shape_d71_PLATFORM_DOMAIN_PLATFORM = addTextShape(sheet, "shape_d71_PLATFORM_DOMAIN_PLATFORM", "② プラットフォーム別\nストラテジー群", 0, 0, 173.121758, 60.1911, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d71_PLATFORM_DOMAIN_PLATFORM, "② プラットフォーム別 ストラテジー群", "");

  const geometryBottom = placeMermaidGeometry([shape_d71_PLATFORM_DOMAIN_CONTRACT, shape_d71_PLATFORM_DOMAIN_ANDROID, shape_d71_PLATFORM_DOMAIN_OPOS_COMM, shape_d71_EXTERNAL_DOMAIN_IOS_API, shape_d71_PLATFORM_DOMAIN_WIN_DIRECT, shape_d71_EXTERNAL_DOMAIN_ANDROID_API, shape_d71_EXTERNAL_DOMAIN_WIN_API, shape_d71_PLATFORM_DOMAIN_DEVICE_CONTRACTS, shape_d71_PLATFORM_DOMAIN_IOS, shape_d71_EXTERNAL_DOMAIN_CONNECTOR, shape_d71_PLATFORM_DOMAIN_OPOS, shape_d71_PLATFORM_DOMAIN_PLATFORM], [118.453591, 664.948266, 1018.691554, 1278, 664.948266, 1270.855924, 1263.977114, 683.571093, 664.948266, 1249.791451, 664.948266, 425.47402], [302.056419, 196.336154, 120.711438, 294.339612, 474.912912, 183.217581, 405.461642, 94.474292, 382.311219, 81.355719, 298.198015, 339.868777], anchor.getLeft(), originTop);

  const diagramBottom = Math.max(originTop + 42, geometryBottom, originTop + 532.403722);
  const bodyEndRowOffset = Math.max(11, Math.ceil((diagramBottom - originTop + 18) / 18) - 1);
  const canvasRowCount = Math.max(baselineCanvasRowCount, bodyEndRowOffset + 1);
  formatDiagramGrid(anchor, canvasRowCount, canvasColumnCount);
  if (bodyEndRowOffset >= baselineCanvasRowCount) {
    addCellLaneTable(anchor, bodyEndRowOffset);
  }

  const edge_d71_01_PLATFORM_DOMAIN_CONTRACT_to_PLATFORM_DOMAIN_PLATFORM = addMermaidConnectorRoute(sheet, "edge_d71_01_PLATFORM_DOMAIN_CONTRACT_to_PLATFORM_DOMAIN_PLATFORM", [218.772091, 335.826418], [339.868777, 339.868777], anchor.getLeft(), originTop, true, false, "実装クラス群", "実装クラス群", "#7F7F7F", 2);
  const edge_d71_02_PLATFORM_DOMAIN_PLATFORM_to_PLATFORM_DOMAIN_OPOS = addMermaidConnectorRoute(sheet, "edge_d71_02_PLATFORM_DOMAIN_PLATFORM_to_PLATFORM_DOMAIN_OPOS", [512.034899, 529.728715, 535.185322, 535.185322, 540.641929, 572.467149], [329.836927, 329.836927, 324.38032, 303.654622, 298.198015, 298.198015], anchor.getLeft(), originTop, false, false, "② プラットフォーム別 → ③ Windows OPOS／OCX", "", "#4472C4", 2);
  const edge_d71_03_PLATFORM_DOMAIN_PLATFORM_to_PLATFORM_DOMAIN_WIN_DIRECT = addMermaidConnectorRoute(sheet, "edge_d71_03_PLATFORM_DOMAIN_PLATFORM_to_PLATFORM_DOMAIN_WIN_DIRECT", [512.034899, 518.153503, 523.61011, 523.61011, 529.066717, 557.58215], [359.932477, 359.932477, 365.389084, 469.456304, 474.912912, 474.912912], anchor.getLeft(), originTop, false, false, "② プラットフォーム別 → ④ Windows直接接続", "", "#4472C4", 2);
  const edge_d71_04_PLATFORM_DOMAIN_PLATFORM_to_PLATFORM_DOMAIN_IOS = addMermaidConnectorRoute(sheet, "edge_d71_04_PLATFORM_DOMAIN_PLATFORM_to_PLATFORM_DOMAIN_IOS", [512.034899, 529.728715, 535.185322, 535.185322, 540.641929, 563.653108], [349.900627, 349.900627, 355.357234, 376.854612, 382.311219, 382.311219], anchor.getLeft(), originTop, false, false, "② プラットフォーム別 → ⑤ iOS直接接続", "", "#4472C4", 2);
  const edge_d71_05_PLATFORM_DOMAIN_PLATFORM_to_PLATFORM_DOMAIN_ANDROID = addMermaidConnectorRoute(sheet, "edge_d71_05_PLATFORM_DOMAIN_PLATFORM_to_PLATFORM_DOMAIN_ANDROID", [512.034899, 518.153503, 523.61011, 523.61011, 529.066717, 543.67381], [319.805077, 319.805077, 314.34847, 201.792761, 196.336154, 196.336154], anchor.getLeft(), originTop, true, false, "② プラットフォーム別 → ⑥ Android直接接続", "", "#7F7F7F", 2);
  const edge_d71_06_PLATFORM_DOMAIN_OPOS_to_PLATFORM_DOMAIN_OPOS_COMM = addMermaidConnectorRoute(sheet, "edge_d71_06_PLATFORM_DOMAIN_OPOS_to_PLATFORM_DOMAIN_OPOS_COMM", [754.34266, 886.48638, 891.942987, 891.942987, 896.187232, 900.431476], [298.198015, 298.198015, 292.741408, 141.160979, 136.916735, 136.916735], anchor.getLeft(), originTop, false, false, "コマンド変換", "コマンド変換", "#4472C4", 2);
  const edge_d71_07_PLATFORM_DOMAIN_DEVICE_CONTRACTS_to_PLATFORM_DOMAIN_OPOS_COMM = addMermaidConnectorRoute(sheet, "edge_d71_07_PLATFORM_DOMAIN_DEVICE_CONTRACTS_to_PLATFORM_DOMAIN_OPOS_COMM", [783.135999, 900.431476], [104.506142, 104.506142], anchor.getLeft(), originTop, true, false, "共通DTO", "共通DTO", "#7F7F7F", 2);
  const edge_d71_08_PLATFORM_DOMAIN_OPOS_COMM_to_EXTERNAL_DOMAIN_CONNECTOR = addMermaidConnectorRoute(sheet, "edge_d71_08_PLATFORM_DOMAIN_OPOS_COMM_to_EXTERNAL_DOMAIN_CONNECTOR", [1133.864909, 1136.430745, 1155.773204, 1162.342921, 1163.273342, 1163.273342, 1164.203762, 1171.168223, 1174.777359, 1175.70778, 1175.70778, 1176.431477, 1177.155175], [120.711438, 120.711438, 120.711438, 120.711438, 126.168046, 176.217612, 181.674219, 181.674219, 181.674219, 176.217612, 98.718537, 94.474292, 94.474292], anchor.getLeft(), originTop, false, false, "名前付きパイプ通信", "名前付きパイプ通信", "#4472C4", 2);
  const edge_d71_09_PLATFORM_DOMAIN_WIN_DIRECT_to_EXTERNAL_DOMAIN_WIN_API = addMermaidConnectorRoute(sheet, "edge_d71_09_PLATFORM_DOMAIN_WIN_DIRECT_to_EXTERNAL_DOMAIN_WIN_API", [769.227659, 1136.430745, 1155.773204, 1162.342921, 1163.273342, 1163.273342, 1164.203762, 1171.168223, 1177.155175], [474.912912, 474.912912, 474.912912, 474.912912, 469.456304, 410.918249, 405.461642, 405.461642, 405.461642], anchor.getLeft(), originTop, false, false, "直接接続", "直接接続", "#4472C4", 2);
  const edge_d71_10_PLATFORM_DOMAIN_IOS_to_EXTERNAL_DOMAIN_IOS_API = addMermaidConnectorRoute(sheet, "edge_d71_10_PLATFORM_DOMAIN_IOS_to_EXTERNAL_DOMAIN_IOS_API", [763.156702, 1136.430745, 1155.773204, 1164.974548, 1165.904969, 1165.904969, 1166.835389, 1171.168223, 1177.155175], [382.311219, 382.311219, 382.311219, 382.311219, 376.854612, 316.001515, 310.544908, 310.544908, 310.544908], anchor.getLeft(), originTop, false, false, "直接接続", "直接接続", "#4472C4", 2);
  const edge_d71_11_PLATFORM_DOMAIN_ANDROID_to_EXTERNAL_DOMAIN_ANDROID_API = addMermaidConnectorRoute(sheet, "edge_d71_11_PLATFORM_DOMAIN_ANDROID_to_EXTERNAL_DOMAIN_ANDROID_API", [783.135999, 1136.430745, 1155.773204, 1171.168223, 1177.155175], [196.336154, 196.336154, 196.336154, 196.336154, 196.336154], anchor.getLeft(), originTop, true, false, "現在は接続しない", "現在は接続しない", "#7F7F7F", 2);

  configurePdfReview(workbook, sheet, anchor, canvasRowCount, canvasColumnCount, false);
}

function addCellLaneTable(anchor: ExcelScript.Range, bodyEndRowOffset: number) {
  addLaneColumns(anchor, 0, 0, 32, bodyEndRowOffset, "（1）デバイス制御層（プラットフォーム別処理）", "#E2F0D9", 0, "#70AD47", 2, "#111111");
  addLaneColumns(anchor, 0, 32, 7, bodyEndRowOffset, "（2）外部境界", "#FCE4D6", 0, "#ED7D31", 2, "#111111");
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
