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

function main(workbook: ExcelScript.Workbook) {
  const anchor = workbook.getActiveCell();
  const sheet = anchor.getWorksheet();
  const reviewLeft = anchor.getLeft();
  const reviewTop = anchor.getTop();
  const reviewRight = reviewLeft + 25 * 36;
  const reviewBottom = reviewTop + 38 * 18;
  const edgeSourcePrefix = "edge_d512_";
  const shapeSourcePrefix = "shape_d512_";
  const edgeLabelPrefix = "edge_label_d512_";
  const shapeCommentPrefix = "shape_comment_d512_";

  const oldLabels = sheet.getShapes();
  for (let i = 0; i < oldLabels.length; i++) {
    const name = oldLabels[i].getName();
    const legacyOverlay = (name.indexOf("edge_label_") === 0 && name.indexOf("edge_label_d") !== 0) || (name.indexOf("shape_comment_") === 0 && name.indexOf("shape_comment_d") !== 0);
    const centerX = oldLabels[i].getLeft() + oldLabels[i].getWidth() / 2;
    const centerY = oldLabels[i].getTop() + oldLabels[i].getHeight() / 2;
    const insideReview = centerX >= reviewLeft && centerX <= reviewRight && centerY >= reviewTop && centerY <= reviewBottom;
    if (name.indexOf(edgeLabelPrefix) === 0 || name.indexOf(shapeCommentPrefix) === 0 || (legacyOverlay && insideReview)) {
      oldLabels[i].delete();
    }
  }

  const diagramShapes = sheet.getShapes();
  const shapeIndexById: { [key: string]: number } = {};
  const edgeIds: string[] = [];
  const shapeIds: string[] = [];
  const obstacleBounds: number[][] = [];
  collectDiagramReviewData(diagramShapes, edgeSourcePrefix, shapeSourcePrefix, shapeIndexById, edgeIds, shapeIds, obstacleBounds);
  edgeIds.sort((left, right) => left.localeCompare(right));
  shapeIds.sort((left, right) => left.localeCompare(right));
  const failedOverlayIds: string[] = [];
  let expectedEdgeOverlayCount = 0;
  let createdEdgeOverlayCount = 0;
  for (let i = 0; i < edgeIds.length; i++) {
    const sourceId = edgeIds[i];
    const sourceIndex = shapeIndexById[sourceId];
    if (sourceIndex === undefined) {
      continue;
    }
    const rawLabel = connectorLabel(diagramShapes[sourceIndex]);
    if (rawLabel !== "") {
      expectedEdgeOverlayCount++;
      const label = reviewConnectorText(rawLabel);
      const centerX = diagramShapes[sourceIndex].getLeft() + diagramShapes[sourceIndex].getWidth() / 2;
      const centerY = diagramShapes[sourceIndex].getTop() + diagramShapes[sourceIndex].getHeight() / 2;
      const overlayName = edgeLabelPrefix + sourceId.substring(edgeSourcePrefix.length);
      if (addConnectorLabel(sheet, obstacleBounds, overlayName, sourceId, label, centerX, centerY, reviewLeft, reviewRight, reviewTop)) {
        createdEdgeOverlayCount++;
      } else {
        failedOverlayIds.push(sourceId);
      }
    }
  }

  let expectedShapeOverlayCount = 0;
  let createdShapeOverlayCount = 0;
  for (let i = 0; i < shapeIds.length; i++) {
    const sourceId = shapeIds[i];
    const sourceIndex = shapeIndexById[sourceId];
    if (sourceIndex === undefined) {
      continue;
    }
    const comment = reviewShapeText(diagramShapes[sourceIndex]);
    if (comment !== "") {
      expectedShapeOverlayCount++;
      const overlayName = shapeCommentPrefix + sourceId.substring(shapeSourcePrefix.length);
      if (addShapeComment(sheet, obstacleBounds, overlayName, sourceId, comment, diagramShapes[sourceIndex], reviewLeft, reviewRight, reviewTop)) {
        createdShapeOverlayCount++;
      } else {
        failedOverlayIds.push(sourceId);
      }
    }
  }

  if (createdEdgeOverlayCount !== expectedEdgeOverlayCount || createdShapeOverlayCount !== expectedShapeOverlayCount || failedOverlayIds.length > 0) {
    throw new Error("Unable to place all review overlays. Missing IDs: " + failedOverlayIds.join(", "));
  }

}

function connectorLabel(shape: ExcelScript.Shape): string {
  const title = shape.getAltTextTitle();
  if (title && title.trim() !== "") {
    return title.trim();
  }
  const description = shape.getAltTextDescription();
  if (description && description.trim() !== "") {
    return description.trim();
  }
  return "";
}

function shapeComment(shape: ExcelScript.Shape): string {
  const description = shape.getAltTextDescription();
  return description && description.trim() !== "" ? description.trim() : "";
}

function reviewConnectorText(label: string): string {
  return label;
}

function reviewShapeText(shape: ExcelScript.Shape): string {
  return shapeComment(shape);
}

function labelWidth(text: string): number {
  const normalized = text.replace(/\n/g, " ");
  const width = normalized.length * 5 + 12;
  if (width < 56) {
    return 56;
  }
  if (width > 160) {
    return 160;
  }
  return width;
}

function labelHeight(text: string, width: number): number {
  const lineCount = text.split("\n").length;
  const estimatedLines = Math.ceil((text.length * 5) / Math.max(width - 8, 20));
  const height = Math.max(lineCount, estimatedLines) * 13 + 4;
  if (height < 18) {
    return 18;
  }
  if (height > 42) {
    return 42;
  }
  return height;
}

function addConnectorLabel(sheet: ExcelScript.Worksheet, obstacleBounds: number[][], shapeName: string, sourceId: string, text: string, centerX: number, centerY: number, reviewLeft: number, reviewRight: number, reviewTop: number): boolean {
  const width = labelWidth(text);
  const height = labelHeight(text, width);
  const box = sheet.addTextBox(text);
  box.setName(shapeName);
  box.setWidth(width);
  box.setHeight(height);
  applyConnectorLabelView(box);

  const frame = box.getTextFrame();
  frame.getTextRange().setText(text);
  frame.setHorizontalAlignment(ExcelScript.ShapeTextHorizontalAlignment.center);
  frame.setVerticalAlignment(ExcelScript.ShapeTextVerticalAlignment.middle);
  frame.setLeftMargin(5);
  frame.setRightMargin(5);
  frame.setTopMargin(2);
  frame.setBottomMargin(2);
  const font = frame.getTextRange().getFont();
  font.setName("Meiryo UI");
  font.setSize(9);
  font.setBold(false);
  font.setColor("#000000");
  frame.setAutoSizeSetting(ExcelScript.ShapeAutoSize.autoSizeShapeToFitText);
  if (!placeConnectorLabel(obstacleBounds, box, sourceId, centerX, centerY, reviewLeft, reviewRight, reviewTop)) {
    box.delete();
    return false;
  }
  box.setZOrder(ExcelScript.ShapeZOrder.bringToFront);
  appendObstacleBounds(obstacleBounds, box);
  return true;
}

function placeConnectorLabel(obstacleBounds: number[][], box: ExcelScript.Shape, sourceId: string, centerX: number, centerY: number, reviewLeft: number, reviewRight: number, reviewTop: number): boolean {
  const width = box.getWidth();
  const height = box.getHeight();
  const positionOrder = connectorLabelPositionOrder(sourceId);
  for (let i = 0; i < positionOrder.length; i++) {
    const position = connectorLabelPosition(positionOrder[i], centerX, centerY, width, height);
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

function addShapeComment(sheet: ExcelScript.Worksheet, obstacleBounds: number[][], shapeName: string, sourceId: string, text: string, target: ExcelScript.Shape, reviewLeft: number, reviewRight: number, reviewTop: number): boolean {
  const width = commentWidth(text);
  const height = commentHeight(text, width);
  const box = sheet.addGeometricShape(ExcelScript.GeometricShapeType.wedgeRRectCallout);
  box.setName(shapeName);
  box.setWidth(width);
  box.setHeight(height);
  applyCommentView(box);

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
  font.setColor(commentFontColor());
  if (!placeShapeComment(obstacleBounds, box, sourceId, target, reviewLeft, reviewRight, reviewTop)) {
    box.delete();
    return false;
  }
  box.setZOrder(ExcelScript.ShapeZOrder.bringToFront);
  appendObstacleBounds(obstacleBounds, box);
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
