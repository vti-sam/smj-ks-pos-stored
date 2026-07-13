function main(workbook: ExcelScript.Workbook) {
  const anchor = workbook.getActiveCell();
  const sheet = anchor.getWorksheet();
  const pdfReviewMode = false;
  const originTop = anchor.getTop();
  const shapePrefix = "shape_d511_";
  const edgePrefix = "edge_d511_";
  const sectionPrefix = "section_bg_d511_";
  const canvasColumnCount = 25;
  const baselineCanvasRowCount = 12;
  const canvasLeft = anchor.getLeft();
  const canvasTop = anchor.getTop();
  const canvasRight = canvasLeft + canvasColumnCount * 36;
  const canvasBottom = canvasTop + baselineCanvasRowCount * 18;

  const oldShapes = sheet.getShapes();
  for (let i = 0; i < oldShapes.length; i++) {
    const name = oldShapes[i].getName();
    const legacyGenerated = (name.indexOf("shape_") === 0 && name.indexOf("shape_d") !== 0) || (name.indexOf("edge_") === 0 && name.indexOf("edge_d") !== 0) || (name.indexOf("section_bg_") === 0 && name.indexOf("section_bg_d") !== 0);
    const centerX = oldShapes[i].getLeft() + oldShapes[i].getWidth() / 2;
    const centerY = oldShapes[i].getTop() + oldShapes[i].getHeight() / 2;
    const insideCanvas = centerX >= canvasLeft && centerX <= canvasRight && centerY >= canvasTop && centerY <= canvasBottom;
    if (name.indexOf(shapePrefix) === 0 || name.indexOf(edgePrefix) === 0 || name.indexOf(sectionPrefix) === 0 || (legacyGenerated && insideCanvas)) {
      oldShapes[i].delete();
    }
  }
  const canvasRange = getAnchoredRange(anchor, 0, 0, baselineCanvasRowCount, canvasColumnCount);
  unmergeLaneRange(canvasRange);
  canvasRange.clear(ExcelScript.ClearApplyTo.all);
  formatDiagramGrid(anchor, baselineCanvasRowCount, canvasColumnCount);

  const laneRange1 = getAnchoredRange(anchor, 0, 0, 1, 25);

  const shape_d511_APP = addTextShape(sheet, "shape_d511_APP", "（1） タブレットPOS端末アプリ\n業務判断／デバイス操作の依頼", 0, 0, 166.875, 36, 10, true, "#F7FBFF", true, "center", "roundRect", false);
  setShapeAltText(shape_d511_APP, "（1） タブレットPOS端末アプリ 業務判断／デバイス操作の依頼", "");
  const shape_d511_DEVICE = addTextShape(sheet, "shape_d511_DEVICE", "（3） 周辺機器\n釣銭機／キャッシュドロア／\nカスタマーディスプレイ", 0, 0, 148.5, 51, 10, true, "#E4DFEC", true, "center", "roundRect", false);
  setShapeAltText(shape_d511_DEVICE, "（3） 周辺機器 釣銭機／キャッシュドロア／ カスタマーディスプレイ", "周辺機器はデバイスコネクタ経由で\nのみ制御します。\nアプリから実機を直接呼び出しません。");
  const shape_d511_HOST = addTextShape(sheet, "shape_d511_HOST", "（2） デバイスコネクタ\n要求制御／実機制御", 0, 0, 128.55, 36, 10, true, "#FCE4D6", true, "center", "roundRect", false);
  setShapeAltText(shape_d511_HOST, "（2） デバイスコネクタ 要求制御／実機制御", "");

  let groupBottom1 = placeD2Row([shape_d511_APP, shape_d511_HOST, shape_d511_DEVICE], [0.15, 0.5, 0.85], laneRange1.getLeft(), originTop + 24, laneRange1.getWidth(), 30, 28);

  const diagramBottom = Math.max(originTop + 90, groupBottom1);
  const bodyEndRowOffset = Math.max(11, Math.ceil((diagramBottom - originTop + 48) / 18) - 1);
  const canvasRowCount = Math.max(baselineCanvasRowCount, bodyEndRowOffset + 1);
  formatDiagramGrid(anchor, canvasRowCount, canvasColumnCount);

  addConnector(sheet, "edge_d511_01_APP_to_HOST", shape_d511_APP, shape_d511_HOST, false, true, "コマンド通信用パイプ\n要求（アプリ→コネクタ）\n同期応答（コネクタ→アプリ）", "elbow", "", "", "#1F4E79");
  addConnector(sheet, "edge_d511_02_HOST_to_APP", shape_d511_HOST, shape_d511_APP, true, false, "イベント通知用パイプ\n非同期イベント（コネクタ→アプリ）", "elbow", "", "", "#C65911");
  addConnector(sheet, "edge_d511_03_HOST_to_DEVICE", shape_d511_HOST, shape_d511_DEVICE, false, true, "実機制御（コネクタ→機器）\n結果（機器→コネクタ）", "elbow", "", "", "#7030A0");

  configurePdfReview(workbook, sheet, anchor, canvasRowCount, canvasColumnCount, pdfReviewMode);
}

function diagramLineColor(): string {
  return "#1F4E79";
}

function diagramLineWeight(): number {
  return 2;
}

function commentFillColor(): string {
  return "#FFF2CC";
}

function commentBorderColor(): string {
  return "#BF9000";
}

function commentFontColor(): string {
  return "#404040";
}

function commentTransparency(): number {
  return 0.7;
}

function appFillColor(): string {
  return "#F7FBFF";
}

function hostFillColor(): string {
  return "#FCE4D6";
}

function applicationLayerFillColor(): string {
  return "#DDEBF7";
}

function deviceControlFillColor(): string {
  return "#E2F0D9";
}

function deviceFillColor(): string {
  return "#E4DFEC";
}

function normalFillColor(): string {
  return "#F8FBFD";
}

function decisionFillColor(): string {
  return "#FFF2CC";
}

function errorFillColor(): string {
  return "#F4CCCC";
}

function connectorColor(semantic: string): string {
  if (semantic === "lifecycle") {
    return "#548235";
  }
  if (semantic === "deviceControl") {
    return "#7030A0";
  }
  if (semantic === "asyncEvent") {
    return "#C65911";
  }
  if (semantic === "configReference") {
    return "#7F7F7F";
  }
  if (semantic === "errorPath") {
    return "#C00000";
  }
  return diagramLineColor();
}

function connectorIsDashed(semantic: string): boolean {
  return semantic === "asyncEvent" || semantic === "configReference" || semantic === "errorPath";
}

function connectorIsBidirectional(semantic: string): boolean {
  return semantic === "commandCommunication" || semantic === "deviceControl";
}

function connectorLineColor(color: string): string {
  return color && color.length > 0 ? color : diagramLineColor();
}

function applyShapeView(shape: ExcelScript.Shape, fill: string, bordered: boolean, dashed: boolean) {
  if (bordered) {
    shape.getFill().setSolidColor(fill);
    shape.getLineFormat().setVisible(true);
    shape.getLineFormat().setColor(diagramLineColor());
    shape.getLineFormat().setWeight(diagramLineWeight());
    if (dashed) {
      shape.getLineFormat().setDashStyle(ExcelScript.ShapeLineDashStyle.dash);
    }
    return;
  }
  shape.getFill().setTransparency(1);
  shape.getLineFormat().setVisible(true);
  shape.getLineFormat().setColor(diagramLineColor());
  shape.getLineFormat().setWeight(diagramLineWeight());
}

function applyConnectorView(connector: ExcelScript.Shape, line: ExcelScript.Line, dashed: boolean, bidirectional: boolean, color: string) {
  connector.getLineFormat().setVisible(true);
  connector.getLineFormat().setColor(connectorLineColor(color));
  connector.getLineFormat().setWeight(diagramLineWeight());
  if (dashed) {
    connector.getLineFormat().setDashStyle(ExcelScript.ShapeLineDashStyle.dash);
  }
  if (bidirectional) {
    line.setBeginArrowheadStyle(ExcelScript.ArrowheadStyle.triangle);
  }
  line.setEndArrowheadStyle(ExcelScript.ArrowheadStyle.triangle);
}

function applyConnectorLabelView(box: ExcelScript.Shape) {
  box.getFill().setSolidColor("#FFFFFF");
  box.getLineFormat().setVisible(true);
  box.getLineFormat().setColor(diagramLineColor());
  box.getLineFormat().setWeight(diagramLineWeight());
}

function applyCommentView(box: ExcelScript.Shape) {
  box.getFill().setSolidColor(commentFillColor());
  box.getFill().setTransparency(commentTransparency());
  box.getLineFormat().setVisible(true);
  box.getLineFormat().setColor(commentBorderColor());
  box.getLineFormat().setWeight(diagramLineWeight());
}

function stableIdBucket(sourceId: string, bucketCount: number): number {
  let value = 0;
  for (let i = 0; i < sourceId.length; i++) {
    value = (value * 31 + sourceId.charCodeAt(i)) % 2147483647;
  }
  return bucketCount > 0 ? value % bucketCount : 0;
}

function connectorLabelPositionOrder(sourceId: string): string[] {
  const preferredPositions = ["top", "bottom", "left", "right"];
  const preferred = preferredPositions[stableIdBucket(sourceId, preferredPositions.length)];
  const positions: string[] = [preferred];
  for (let i = 0; i < preferredPositions.length; i++) {
    if (preferredPositions[i] !== preferred) {
      positions.push(preferredPositions[i]);
    }
  }
  return positions;
}

function connectorLabelPosition(position: string, centerX: number, centerY: number, width: number, height: number): number[] {
  if (position === "bottom") {
    return [centerX - width / 2, centerY + 6];
  }
  if (position === "left") {
    return [centerX - width - 6, centerY - height / 2];
  }
  if (position === "right") {
    return [centerX + 6, centerY - height / 2];
  }
  return [centerX - width / 2, centerY - height - 6];
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

function collectDiagramReviewData(
  shapes: ExcelScript.Shape[],
  edgeSourcePrefix: string,
  shapeSourcePrefix: string,
  shapeIndexById: { [key: string]: number },
  edgeIds: string[],
  shapeIds: string[],
  obstacleBounds: number[][]
) {
  for (let i = 0; i < shapes.length; i++) {
    const id = shapes[i].getName();
    shapeIndexById[id] = i;
    if (id.indexOf(edgeSourcePrefix) === 0) {
      edgeIds.push(id);
    }
    if (id.indexOf(shapeSourcePrefix) === 0) {
      shapeIds.push(id);
    }
    if (id.indexOf("section_bg_") === 0 || shapes[i].getType() === ExcelScript.ShapeType.line) {
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

function addLaneColumns(anchor: ExcelScript.Range, columnOffset: number, columnCount: number, bodyEndRowOffset: number, title: string, fill: string) {
  const titleRange = getAnchoredRange(anchor, 0, columnOffset, 1, columnCount);
  mergeLaneRange(titleRange);
  titleRange.setValue(title);
  titleRange.getFormat().setRowHeight(24);
  formatLaneRange(titleRange, fill, true, 13);
}

function addSectionBackground(sheet: ExcelScript.Worksheet, shapeName: string, title: string, members: ExcelScript.Shape[], laneLeft: number, laneWidth: number, fill: string) {
  if (members.length === 0) {
    return;
  }
  let top = members[0].getTop();
  let bottom = members[0].getTop() + members[0].getHeight();
  for (let i = 1; i < members.length; i++) {
    top = Math.min(top, members[i].getTop());
    bottom = Math.max(bottom, members[i].getTop() + members[i].getHeight());
  }
  const titlePadding = 42;
  const bottomPadding = 16;
  const sidePadding = 12;
  const background = sheet.addGeometricShape(ExcelScript.GeometricShapeType.rectangle);
  background.setName(shapeName);
  background.setLeft(laneLeft + sidePadding);
  background.setTop(Math.max(0, top - titlePadding));
  background.setWidth(Math.max(1, laneWidth - sidePadding * 2));
  background.setHeight(Math.max(28, bottom - top + titlePadding + bottomPadding));
  applyShapeView(background, fill, true, false);
  const frame = background.getTextFrame();
  frame.getTextRange().setText(title);
  frame.setHorizontalAlignment(ExcelScript.ShapeTextHorizontalAlignment.center);
  frame.setVerticalAlignment(ExcelScript.ShapeTextVerticalAlignment.top);
  const font = frame.getTextRange().getFont();
  font.setName("Meiryo UI");
  font.setSize(13);
  font.setBold(true);
  font.setColor("#111111");
  background.setZOrder(ExcelScript.ShapeZOrder.sendToBack);
}

function mergeLaneRange(range: ExcelScript.Range) {
  unmergeLaneRange(range);
  range.merge(false);
}

function unmergeLaneRange(range: ExcelScript.Range) {
  try {
    range.unmerge();
  } catch (error) {
  }
}

function formatLaneRange(range: ExcelScript.Range, fill: string, bold: boolean, fontSize: number) {
  const format = range.getFormat();
  format.getFill().setColor(fill);
  format.setHorizontalAlignment(ExcelScript.HorizontalAlignment.center);
  format.setVerticalAlignment(ExcelScript.VerticalAlignment.center);
  format.setWrapText(true);
  const font = format.getFont();
  font.setName("Meiryo UI");
  font.setSize(fontSize);
  font.setBold(bold);
  font.setColor("#111111");
  setGrayBorders(range);
}

function setGrayBorders(range: ExcelScript.Range) {
  setBorder(range, ExcelScript.BorderIndex.edgeTop);
  setBorder(range, ExcelScript.BorderIndex.edgeBottom);
  setBorder(range, ExcelScript.BorderIndex.edgeLeft);
  setBorder(range, ExcelScript.BorderIndex.edgeRight);
}

function setBorder(range: ExcelScript.Range, index: ExcelScript.BorderIndex) {
  const border = range.getFormat().getRangeBorder(index);
  border.setStyle(ExcelScript.BorderLineStyle.continuous);
  border.setColor(diagramLineColor());
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

function placeD2Row(shapes: ExcelScript.Shape[], ratios: number[], laneLeft: number, rowTop: number, laneWidth: number, inset: number, gap: number): number {
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

function addTextShape(sheet: ExcelScript.Worksheet, shapeName: string, text: string, left: number, top: number, width: number, height: number, fontSize: number, bold: boolean, fill: string, bordered: boolean, align: string, shapeKind: string, dashed: boolean): ExcelScript.Shape {
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
  applyShapeView(shape, fill, bordered, dashed);
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
  font.setColor("#111111");
  frame.setAutoSizeSetting(ExcelScript.ShapeAutoSize.autoSizeShapeToFitText);
  if (shape.getWidth() < 96) {
    shape.setWidth(96);
  }
  if (shape.getHeight() < 28) {
    shape.setHeight(28);
  }
  return shape;
}

function addConnector(sheet: ExcelScript.Worksheet, shapeName: string, fromShape: ExcelScript.Shape, toShape: ExcelScript.Shape, dashed: boolean, bidirectional: boolean, label: string, kind: string, requestedFromSide: string, requestedToSide: string, color: string): ExcelScript.Shape {
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
  applyConnectorView(connector, line, dashed, bidirectional, color);
  if (label !== "") {
    connector.setAltTextTitle(label);
    connector.setAltTextDescription(label);
  }
  return connector;
}
