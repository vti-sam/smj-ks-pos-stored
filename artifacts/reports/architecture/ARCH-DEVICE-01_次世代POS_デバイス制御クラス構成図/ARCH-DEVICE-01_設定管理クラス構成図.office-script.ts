// Generated from Markdown: ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図.md
// Source contract SHA-256: 47fe955fe86b78bcf1963b86aaca9add8189b497a6ebfd78b37f1ad6e2fab066
// Generated output; do not edit. Change Markdown or the owning renderer and regenerate both scripts.

function main(workbook: ExcelScript.Workbook) {
  const anchorPosition = getRunAnchorPosition(workbook);
  const sheet = createRenderWorksheet(workbook, "06_設定管理クラス構成図_01");
  sheet.activate();
  const anchor = sheet.getCell(anchorPosition.rowIndex, anchorPosition.columnIndex);
  const originTop = anchor.getTop();
  const canvasColumnCount = 36;
  const baselineCanvasRowCount = 23;
  formatDiagramGrid(anchor, baselineCanvasRowCount, canvasColumnCount);

  const laneRange1 = getAnchoredRange(anchor, 0, 0, 1, 36);

  addCellLaneTable(anchor, baselineCanvasRowCount - 1);

  const shape_d61_CONFIG_DOMAIN_DEFAULT = addTextShape(sheet, "shape_d61_CONFIG_DOMAIN_DEFAULT", "④ 《設定資源》\nデフォルト設定\nTabletPos.DeviceCtrl組込みリソース", 0, 0, 217.08, 105.200308, 10, true, "#FFF2CC", 0, "#BF9000", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d61_CONFIG_DOMAIN_DEFAULT, "④ 《設定資源》 デフォルト設定 TabletPos.DeviceCtrl組込みリソース", "");
  const shape_d61_CONFIG_DOMAIN_RUNTIME = addTextShape(sheet, "shape_d61_CONFIG_DOMAIN_RUNTIME", "③ 《設定資源》\nランタイム設定\ndevice_controller_config.json", 0, 0, 238.174853, 85.162154, 10, true, "#FFF2CC", 0, "#BF9000", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d61_CONFIG_DOMAIN_RUNTIME, "③ 《設定資源》 ランタイム設定 device_controller_config.json", "");
  const shape_d61_CONFIG_DOMAIN_CONFIG = addTextShape(sheet, "shape_d61_CONFIG_DOMAIN_CONFIG", "② 設定サービス\nDeviceControllerConfigService", 0, 0, 241.188404, 65.124, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d61_CONFIG_DOMAIN_CONFIG, "② 設定サービス DeviceControllerConfigService", "");
  const shape_d61_CONFIG_DOMAIN_MANAGER = addTextShape(sheet, "shape_d61_CONFIG_DOMAIN_MANAGER", "① デバイスマネージャー\nDeviceManager", 0, 0, 199.337885, 65.124, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d61_CONFIG_DOMAIN_MANAGER, "① デバイスマネージャー DeviceManager", "");
  const shape_d61_CONFIG_DOMAIN_ACTIVE = addTextShape(sheet, "shape_d61_CONFIG_DOMAIN_ACTIVE", "⑥ 有効デバイス\nActiveDevice", 0, 0, 147.233466, 65.124, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d61_CONFIG_DOMAIN_ACTIVE, "⑥ 有効デバイス ActiveDevice", "");
  const shape_d61_CONFIG_DOMAIN_SPEC = addTextShape(sheet, "shape_d61_CONFIG_DOMAIN_SPEC", "⑦ デバイス仕様\nDeviceSpec", 0, 0, 147.233466, 65.124, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d61_CONFIG_DOMAIN_SPEC, "⑦ デバイス仕様 DeviceSpec", "");
  const shape_d61_CONFIG_DOMAIN_MODEL = addTextShape(sheet, "shape_d61_CONFIG_DOMAIN_MODEL", "⑤ 設定モデル\nDeviceConfig", 0, 0, 134.279113, 65.124, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d61_CONFIG_DOMAIN_MODEL, "⑤ 設定モデル DeviceConfig", "");

  const geometryBottom = placeMermaidGeometry([shape_d61_CONFIG_DOMAIN_DEFAULT, shape_d61_CONFIG_DOMAIN_RUNTIME, shape_d61_CONFIG_DOMAIN_CONFIG, shape_d61_CONFIG_DOMAIN_MANAGER, shape_d61_CONFIG_DOMAIN_ACTIVE, shape_d61_CONFIG_DOMAIN_SPEC, shape_d61_CONFIG_DOMAIN_MODEL], [908.919984, 919.467411, 523.655167, 133.067715, 1188.984494, 1188.984494, 936.783368], [195.625846, 315.854769, 101.697, 101.697, 74.562, 164.733692, 85.416], anchor.getLeft(), originTop);

  const diagramBottom = Math.max(originTop + 42, geometryBottom, originTop + 391.834619);
  const bodyEndRowOffset = Math.max(11, Math.ceil((diagramBottom - originTop + 18) / 18) - 1);
  const canvasRowCount = Math.max(baselineCanvasRowCount, bodyEndRowOffset + 1);
  formatDiagramGrid(anchor, canvasRowCount, canvasColumnCount);
  if (bodyEndRowOffset >= baselineCanvasRowCount) {
    addCellLaneTable(anchor, bodyEndRowOffset);
  }

  const edge_d61_01_CONFIG_DOMAIN_MANAGER_to_CONFIG_DOMAIN_CONFIG = addMermaidConnectorRoute(sheet, "edge_d61_01_CONFIG_DOMAIN_MANAGER_to_CONFIG_DOMAIN_CONFIG", [232.736657, 399.721273], [101.697, 101.697], anchor.getLeft(), originTop, false, false, "初期化・保存を委譲", "初期化・保存を委譲", "#4472C4", 2);
  const edge_d61_02_CONFIG_DOMAIN_CONFIG_to_CONFIG_DOMAIN_RUNTIME = addMermaidConnectorRoute(sheet, "edge_d61_02_CONFIG_DOMAIN_CONFIG_to_CONFIG_DOMAIN_RUNTIME", [644.249369, 650.869417, 656.773215, 656.773215, 662.677013, 797.040292], [117.978, 117.978, 123.881798, 309.950972, 315.854769, 315.854769], anchor.getLeft(), originTop, false, false, "優先読込・保存", "優先読込・保存", "#4472C4", 2);
  const edge_d61_03_CONFIG_DOMAIN_CONFIG_to_CONFIG_DOMAIN_DEFAULT = addMermaidConnectorRoute(sheet, "edge_d61_03_CONFIG_DOMAIN_CONFIG_to_CONFIG_DOMAIN_DEFAULT", [644.249369, 663.393264, 669.297061, 669.297061, 675.200859, 797.040292], [101.697, 101.697, 107.600798, 189.722048, 195.625846, 195.625846], anchor.getLeft(), originTop, true, false, "フォールバック", "フォールバック", "#7F7F7F", 2);
  const edge_d61_04_CONFIG_DOMAIN_CONFIG_to_CONFIG_DOMAIN_MODEL = addMermaidConnectorRoute(sheet, "edge_d61_04_CONFIG_DOMAIN_CONFIG_to_CONFIG_DOMAIN_MODEL", [644.249369, 866.304119], [85.416, 85.416], anchor.getLeft(), originTop, false, false, "デシリアライズ", "デシリアライズ", "#4472C4", 2);
  const edge_d61_05_CONFIG_DOMAIN_MODEL_to_CONFIG_DOMAIN_ACTIVE = addMermaidConnectorRoute(sheet, "edge_d61_05_CONFIG_DOMAIN_MODEL_to_CONFIG_DOMAIN_ACTIVE", [1003.922924, 1112.028069], [74.562, 74.562], anchor.getLeft(), originTop, false, false, "保持", "保持", "#4472C4", 2);
  const edge_d61_06_CONFIG_DOMAIN_MODEL_to_CONFIG_DOMAIN_SPEC = addMermaidConnectorRoute(sheet, "edge_d61_06_CONFIG_DOMAIN_MODEL_to_CONFIG_DOMAIN_SPEC", [1003.922924, 1045.174886, 1051.078684, 1051.078684, 1056.982482, 1112.028069], [96.27, 96.27, 102.173798, 158.829895, 164.733692, 164.733692], anchor.getLeft(), originTop, false, false, "保持", "保持", "#4472C4", 2);

  configurePdfReview(workbook, sheet, anchor, canvasRowCount, canvasColumnCount, false);
}

function addCellLaneTable(anchor: ExcelScript.Range, bodyEndRowOffset: number) {
  addLaneColumns(anchor, 0, 0, 36, bodyEndRowOffset, "（1）設定管理", "#E2F0D9", 0, "#70AD47", 2, "#111111");
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
