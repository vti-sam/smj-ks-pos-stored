// Generated from Markdown: ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図.md
// Source contract SHA-256: 466b27d3871ac7be0e8486c8fcb26d31e99c4c544318323e85a3481dfe9b6b5b
// Generated output; do not edit. Change Markdown or the owning renderer and regenerate both scripts.

function main(workbook: ExcelScript.Workbook) {
  const anchorPosition = getRunAnchorPosition(workbook);
  const sheet = createRenderWorksheet(workbook, "05_全体クラス構成図_01");
  sheet.activate();
  const anchor = sheet.getCell(anchorPosition.rowIndex, anchorPosition.columnIndex);
  const originTop = anchor.getTop();
  const canvasColumnCount = 43;
  const baselineCanvasRowCount = 22;
  formatDiagramGrid(anchor, baselineCanvasRowCount, canvasColumnCount);

  const laneRange1 = getAnchoredRange(anchor, 0, 0, 1, 18);
  const laneRange2 = getAnchoredRange(anchor, 0, 18, 1, 25);

  addCellLaneTable(anchor, baselineCanvasRowCount - 1);

  const shape_d51_DEVICE_CTRL_CONTRACT = addTextShape(sheet, "shape_d51_DEVICE_CTRL_CONTRACT", "④ 《インターフェース》\n公開デバイス契約群\n1. IPrinterStrategy\n2. IBarcodeScannerStrategy\n3. ICashChangerStrategy\n4. ICustomerDisplayStrategy\n5. IDrawerStrategy\n6. IPaymentStrategy\n7. IKeyboardStrategy", 0, 0, 192.344149, 217.496846, 10, true, "#DDEBF7", 0, "#4472C4", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d51_DEVICE_CTRL_CONTRACT, "④ 《インターフェース》 公開デバイス契約群 1. IPrinterStrategy 2. IBarcodeScannerStrategy 3. ICashChangerStrategy 4. ICustomerDisplayStrategy 5. IDrawerStrategy 6. IPaymentStrategy 7. IKeyboardStrategy", "");
  const shape_d51_APP_SERVICE = addTextShape(sheet, "shape_d51_APP_SERVICE", "③ アプリケーションサービス\nIDeviceIntegrationTestStrategyProvider等", 0, 0, 261.306, 75.458089, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d51_APP_SERVICE, "③ アプリケーションサービス IDeviceIntegrationTestStrategyProvider等", "");
  const shape_d51_APP_VIEW = addTextShape(sheet, "shape_d51_APP_VIEW", "② 画面状態管理\nDeviceIntegrationTestViewModel等", 0, 0, 224.386095, 75.458089, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d51_APP_VIEW, "② 画面状態管理 DeviceIntegrationTestViewModel等", "");
  const shape_d51_DEVICE_CTRL_FACTORY = addTextShape(sheet, "shape_d51_DEVICE_CTRL_FACTORY", "③ ストラテジーファクトリー\nStrategyFactory<T>", 0, 0, 192.344149, 75.458089, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d51_DEVICE_CTRL_FACTORY, "③ ストラテジーファクトリー StrategyFactory<T>", "");
  const shape_d51_APP_BOOT = addTextShape(sheet, "shape_d51_APP_BOOT", "① 構成ルート・ライフサイクル\nMauiProgram / App", 0, 0, 192.344149, 75.458089, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d51_APP_BOOT, "① 構成ルート・ライフサイクル MauiProgram / App", "");
  const shape_d51_DEVICE_CTRL_EVENT = addTextShape(sheet, "shape_d51_DEVICE_CTRL_EVENT", "⑤ 《インターフェース》\nイベント受信\nIDeviceEventReceiver", 0, 0, 176.854897, 75.458089, 10, true, "#DDEBF7", 0, "#4472C4", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d51_DEVICE_CTRL_EVENT, "⑤ 《インターフェース》 イベント受信 IDeviceEventReceiver", "");
  const shape_d51_DEVICE_CTRL_CONFIG = addTextShape(sheet, "shape_d51_DEVICE_CTRL_CONFIG", "② 設定サービス\nDeviceControllerConfigService", 0, 0, 213.705447, 57.703245, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d51_DEVICE_CTRL_CONFIG, "② 設定サービス DeviceControllerConfigService", "");
  const shape_d51_DEVICE_CTRL_MANAGER = addTextShape(sheet, "shape_d51_DEVICE_CTRL_MANAGER", "① デバイスマネージャー\nDeviceManager", 0, 0, 176.623714, 57.703245, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d51_DEVICE_CTRL_MANAGER, "① デバイスマネージャー DeviceManager", "");

  const geometryBottom = placeMermaidGeometry([shape_d51_DEVICE_CTRL_CONTRACT, shape_d51_APP_SERVICE, shape_d51_APP_VIEW, shape_d51_DEVICE_CTRL_FACTORY, shape_d51_APP_BOOT, shape_d51_DEVICE_CTRL_EVENT, shape_d51_DEVICE_CTRL_CONFIG, shape_d51_DEVICE_CTRL_MANAGER], [1420.349837, 493.306776, 136.233272, 1066.755635, 527.787701, 767.905536, 1066.755635, 767.882418], [232.494686, 180.33983, 167.763482, 178.120475, 82.688185, 79.729045, 89.346252, 168.503267], anchor.getLeft(), originTop);

  const diagramBottom = Math.max(originTop + 42, geometryBottom, originTop + 372.721197);
  const bodyEndRowOffset = Math.max(11, Math.ceil((diagramBottom - originTop + 18) / 18) - 1);
  const canvasRowCount = Math.max(baselineCanvasRowCount, bodyEndRowOffset + 1);
  formatDiagramGrid(anchor, canvasRowCount, canvasColumnCount);
  if (bodyEndRowOffset >= baselineCanvasRowCount) {
    addCellLaneTable(anchor, bodyEndRowOffset);
  }

  const edge_d51_01_APP_VIEW_to_APP_SERVICE = addMermaidConnectorRoute(sheet, "edge_d51_01_APP_VIEW_to_APP_SERVICE", [248.426319, 359.694635], [180.33983, 180.33983], anchor.getLeft(), originTop, false, false, "ユースケース", "ユースケース", "#4472C4", 2);
  const edge_d51_02_DEVICE_CTRL_MANAGER_to_DEVICE_CTRL_CONFIG = addMermaidConnectorRoute(sheet, "edge_d51_02_DEVICE_CTRL_MANAGER_to_DEVICE_CTRL_CONFIG", [856.194275, 862.198692, 867.429763, 867.429763, 872.660834, 956.943771], [158.88606, 158.88606, 153.654989, 104.194531, 98.96346, 98.96346], anchor.getLeft(), originTop, false, false, "設定を委譲", "設定を委譲", "#4472C4", 2);
  const edge_d51_03_DEVICE_CTRL_MANAGER_to_DEVICE_CTRL_FACTORY = addMermaidConnectorRoute(sheet, "edge_d51_03_DEVICE_CTRL_MANAGER_to_DEVICE_CTRL_FACTORY", [856.194275, 967.624419], [178.120475, 178.120475], anchor.getLeft(), originTop, false, false, "生成を要求", "生成を要求", "#4472C4", 2);
  const edge_d51_04_DEVICE_CTRL_FACTORY_to_DEVICE_CTRL_CONTRACT = addMermaidConnectorRoute(sheet, "edge_d51_04_DEVICE_CTRL_FACTORY_to_DEVICE_CTRL_CONTRACT", [1162.92771, 1321.218622], [178.120475, 178.120475], anchor.getLeft(), originTop, false, false, "公開契約として返却", "公開契約として返却", "#4472C4", 2);
  const edge_d51_05_APP_SERVICE_to_DEVICE_CTRL_MANAGER = addMermaidConnectorRoute(sheet, "edge_d51_05_APP_SERVICE_to_DEVICE_CTRL_MANAGER", [623.959776, 626.543564, 633.55675, 634.49368, 634.49368, 635.43061, 651.718932, 673.316748, 674.244261, 675.171775, 676.8943, 678.964643], [161.475308, 161.475308, 161.475308, 166.706379, 188.055, 193.286071, 193.286071, 193.286071, 188.107575, 182.929079, 182.929079, 182.929079], anchor.getLeft(), originTop, false, false, "ストラテジーを取得", "ストラテジーを取得", "#4472C4", 2);
  const edge_d51_06_APP_SERVICE_to_DEVICE_CTRL_CONTRACT = addMermaidConnectorRoute(sheet, "edge_d51_06_APP_SERVICE_to_DEVICE_CTRL_CONTRACT", [623.959776, 626.543564, 630.906711, 631.843641, 631.843641, 632.780572, 651.718932, 673.714254, 674.244261, 674.774269, 676.8943, 1321.218622], [180.33983, 180.33983, 180.33983, 185.570902, 221.345334, 226.576405, 226.576405, 226.576405, 229.535546, 232.494686, 232.494686, 232.494686], anchor.getLeft(), originTop, false, false, "デバイス操作", "デバイス操作", "#4472C4", 2);
  const edge_d51_07_APP_BOOT_to_DEVICE_CTRL_MANAGER = addMermaidConnectorRoute(sheet, "edge_d51_07_APP_BOOT_to_DEVICE_CTRL_MANAGER", [623.959776, 626.543564, 638.856828, 639.793758, 639.793758, 640.730688, 651.718932, 673.307331, 674.244261, 674.244261, 675.181192, 676.8943, 678.964643], [82.688185, 82.688185, 82.688185, 87.919257, 130.351755, 135.582827, 135.582827, 135.582827, 140.813898, 148.846385, 154.077456, 154.077456, 154.077456], anchor.getLeft(), originTop, false, false, "デバイス制御の初期化 （InitializeAsync）", "デバイス制御の初期化 （InitializeAsync）", "#4472C4", 2);
  const edge_d51_08_APP_BOOT_to_DEVICE_CTRL_EVENT = addMermaidConnectorRoute(sheet, "edge_d51_08_APP_BOOT_to_DEVICE_CTRL_EVENT", [623.959776, 626.543564, 641.506866, 642.443796, 642.443796, 643.380727, 651.718932, 673.879881, 674.244261, 674.608642, 676.8943, 678.94808], [63.823663, 63.823663, 63.823663, 69.054734, 70.429155, 75.660226, 75.660226, 75.660226, 77.694635, 79.729045, 79.729045, 79.729045], anchor.getLeft(), originTop, false, false, "デバイスイベント受信の開始・停止 （StartAsync / StopAsync）", "デバイスイベント受信の開始・停止 （StartAsync / StopAsync）", "#4472C4", 2);

  configurePdfReview(workbook, sheet, anchor, canvasRowCount, canvasColumnCount, false);
}

function addCellLaneTable(anchor: ExcelScript.Range, bodyEndRowOffset: number) {
  addLaneColumns(anchor, 0, 0, 18, bodyEndRowOffset, "（1）アプリケーション層", "#DDEBF7", 0, "#4472C4", 2, "#111111");
  addLaneColumns(anchor, 0, 18, 25, bodyEndRowOffset, "（2）デバイス制御層（DeviceCtrl）", "#E2F0D9", 0, "#70AD47", 2, "#111111");
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
