// Generated from Markdown: ARCH-HOST-01_タブレットPOS_デバイスコネクタ基本設計書.md
// Source contract SHA-256: a39dd9aa2b736b2818c59ce07fc18e912f2cef033362af28346380a7458e4c37
// Generated output; do not edit. Change Markdown or the owning renderer and regenerate both scripts.

function main(workbook: ExcelScript.Workbook) {
  const sheet = workbook.getActiveWorksheet();
  const expectedSheetBase = "05_論理構成図";
  if (!isExpectedRenderSheet(sheet.getName(), expectedSheetBase)) {
    throw new Error("Activate the render sheet created by the matching main script before running labels.");
  }
  const shapePrefix = "shape_d512_";
  const edgePrefix = "edge_d512_";
  const sectionPrefix = "section_bg_d512_";
  const edgeLabelPrefix = "edge_label_d512_";
  const shapeGroupPrefix = "shape_group_d512_";
  const shapeCommentPrefix = "shape_comment_d512_";
  const edgeLabelAnchors: { [key: string]: number[] } = { "edge_d512_01_APP_APP_COORD_LIFECYCLE_to_APP_APP_COORD_PROCESS": [0.5, 0.5], "edge_d512_02_APP_APP_ACCESS_APP_SETTING_to_APP_APP_ACCESS_SELECT": [0.576923, 0.532731], "edge_d512_03_APP_APP_ACCESS_SELECT_to_APP_APP_ACCESS_COMMAND": [0.5, 0.5], "edge_d512_04_APP_APP_ACCESS_COMMAND_to_APP_APP_ACCESS_SYNC_RESULT": [0.5, 0.5], "edge_d512_05_APP_APP_COORD_BUSINESS_to_APP_APP_ACCESS_SELECT": [0.260434, 0], "edge_d512_06_APP_APP_ACCESS_SYNC_RESULT_to_APP_APP_COORD_BUSINESS": [0.5, 0.311419], "edge_d512_07_HOST_HOST_SERVICE_RUNTIME_to_HOST_HOST_SERVICE_SERVER": [0.576923, 0.534154], "edge_d512_08_HOST_HOST_EXEC_HOST_SETTING_to_HOST_HOST_EXEC_MANAGER": [0.576923, 0.472437], "edge_d512_09_HOST_HOST_EXEC_ORDER_to_HOST_HOST_EXEC_CONTROL": [0.5, 0.5], "edge_d512_10_HOST_HOST_EXEC_CONTROL_to_HOST_HOST_EXEC_MANAGER": [0.576923, 0.519396], "edge_d512_11_HOST_HOST_SERVICE_SERVER_to_HOST_HOST_EXEC_ORDER": [0.50842, 0.5], "edge_d512_12_HOST_HOST_EXEC_MANAGER_to_HOST_HOST_ADAPTER_ADAPTER": [0.654545, 1], "edge_d512_13_HOST_HOST_EXEC_MANAGER_to_HOST_HOST_SERVICE_EVENT": [0.5, 0], "edge_d512_14_APP_APP_COORD_PROCESS_to_HOST_HOST_SERVICE_RUNTIME": [0.487537, 0], "edge_d512_15_APP_APP_ACCESS_COMMAND_to_HOST_HOST_SERVICE_SERVER": [0.334815, 0.684932], "edge_d512_16_HOST_HOST_SERVICE_EVENT_to_APP_APP_ACCESS_EVENT_RX": [0.817949, 0.382369], "edge_d512_17_APP_APP_ACCESS_COMMAND_to_APP_APP_ACCESS_CONTRACT": [0.512433, 0.719363], "edge_d512_18_APP_APP_ACCESS_EVENT_RX_to_APP_APP_ACCESS_CONTRACT": [0.5, 0.5], "edge_d512_19_HOST_HOST_SERVICE_SERVER_to_APP_APP_ACCESS_CONTRACT": [0.823041, 0.444938], "edge_d512_20_HOST_HOST_SERVICE_EVENT_to_APP_APP_ACCESS_CONTRACT": [0.817512, 0.336429], "edge_d512_21_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_CASH": [0.98263, 0.30199], "edge_d512_22_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_DRAWER": [0.297166, 0.0625], "edge_d512_23_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_DISPLAY": [0.98263, 0.387246], "edge_d512_24_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_PAYMENT": [0.612333, 0.447368], "edge_d512_25_HOST_HOST_ADAPTER_ADAPTER_to_DEVICE_PRINTER": [0.580751, 0.346939] };
  const shapes = sheet.getShapes();
  const existingNames: { [key: string]: boolean } = {};
  const edgeCandidates: { shapeIndex: number; name: string; title: string; description: string; left: number; top: number; width: number; height: number }[] = [];
  const shapeCandidates: { shapeIndex: number; name: string; title: string; description: string; left: number; top: number; width: number; height: number }[] = [];
  const obstacleBounds: number[][] = [];
  let reviewLeft = Number.POSITIVE_INFINITY;
  let reviewTop = Number.POSITIVE_INFINITY;
  let reviewRight = Number.NEGATIVE_INFINITY;

  for (let i = 0; i < shapes.length; i++) {
    const shape = shapes[i];
    const name = shape.getName();
    existingNames[name] = true;
    const isEdge = name.indexOf(edgePrefix) === 0;
    const isNode = name.indexOf(shapePrefix) === 0;
    const isSection = name.indexOf(sectionPrefix) === 0;
    const isOwnedGroup = name.indexOf(shapeGroupPrefix) === 0;
    if (!isEdge && !isNode && !isSection && !isOwnedGroup) {
      continue;
    }
    const left = shape.getLeft();
    const top = shape.getTop();
    const width = shape.getWidth();
    const height = shape.getHeight();
    reviewLeft = Math.min(reviewLeft, left);
    reviewTop = Math.min(reviewTop, top);
    reviewRight = Math.max(reviewRight, left + width);
    if (isEdge) {
      const description = shape.getAltTextDescription().trim();
      if (description) {
        edgeCandidates.push({ shapeIndex: i, name, title: shape.getAltTextTitle().trim(), description, left, top, width, height });
      }
      continue;
    }
    if (isSection) {
      const sectionText = shape.getTextFrame().getTextRange().getText();
      const titleLineCount = Math.max(1, sectionText.split("\n").length);
      obstacleBounds.push([left, top, width, Math.max(42, 10 + titleLineCount * 18)]);
      continue;
    }
    obstacleBounds.push([left, top, width, height]);
    if (isNode) {
      const description = shape.getAltTextDescription().trim();
      if (description) {
        shapeCandidates.push({ shapeIndex: i, name, title: shape.getAltTextTitle().trim(), description, left, top, width, height });
      }
    }
  }

  if (!Number.isFinite(reviewLeft) || !Number.isFinite(reviewRight)) {
    throw new Error("No matching diagram objects were found on the active worksheet.");
  }
  reviewLeft = Math.max(0, reviewLeft - 36);
  reviewTop = Math.max(0, reviewTop - 36);
  reviewRight = reviewRight + 180;
  const failedOverlayIds: string[] = [];

  for (let i = 0; i < edgeCandidates.length; i++) {
    const candidate = edgeCandidates[i];
    const suffix = candidate.name.slice(edgePrefix.length);
    const labelName = edgeLabelPrefix + suffix;
    if (existingNames[labelName]) {
      continue;
    }
    const anchorRatio = edgeLabelAnchors[candidate.name];
    const centerX = candidate.left + candidate.width * (anchorRatio ? anchorRatio[0] : 0.5);
    const centerY = candidate.top + candidate.height * (anchorRatio ? anchorRatio[1] : 0.5);
    if (!addConnectorLabel(sheet, obstacleBounds, labelName, candidate.title, candidate.description, centerX, centerY, candidate.width, candidate.height, reviewLeft, reviewRight, reviewTop)) {
      failedOverlayIds.push(candidate.name);
    } else {
      existingNames[labelName] = true;
    }
  }

  for (let i = 0; i < shapeCandidates.length; i++) {
    const candidate = shapeCandidates[i];
    const suffix = candidate.name.slice(shapePrefix.length);
    const groupName = shapeGroupPrefix + suffix;
    if (existingNames[groupName]) {
      continue;
    }
    const commentName = shapeCommentPrefix + suffix;
    if (!addShapeComment(sheet, obstacleBounds, commentName, groupName, candidate.title, suffix, candidate.description, shapes[candidate.shapeIndex], candidate.left, candidate.top, candidate.width, candidate.height, reviewLeft, reviewRight, reviewTop)) {
      failedOverlayIds.push(candidate.name);
    } else {
      existingNames[groupName] = true;
    }
  }

  if (failedOverlayIds.length > 0) {
    throw new Error("Unable to place all diagram-owned overlays. Missing IDs: " + failedOverlayIds.join(", "));
  }
}

function isExpectedRenderSheet(actualName: string, expectedBase: string): boolean {
  if (actualName === expectedBase) {
    return true;
  }
  if (!/_R\d{2}$/.test(actualName)) {
    return false;
  }
  const actualPrefix = actualName.slice(0, -4);
  return expectedBase.indexOf(actualPrefix) === 0;
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

function addConnectorLabel(sheet: ExcelScript.Worksheet, obstacleBounds: number[][], shapeName: string, altTextTitle: string, text: string, centerX: number, centerY: number, connectorWidth: number, connectorHeight: number, reviewLeft: number, reviewRight: number, reviewTop: number): boolean {
  const width = labelWidth(text);
  const height = labelHeight(text, width);
  const box = sheet.addTextBox(text);
  box.setName(shapeName);
  box.setWidth(width);
  box.setHeight(height);
  applyConnectorLabelView(box, "#FFFFFF", 0, "", 0);

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
  box.setAltTextTitle(altTextTitle || text);
  box.setAltTextDescription(text);
  if (!placeConnectorLabel(box, centerX, centerY, connectorWidth, connectorHeight, 0, reviewLeft, reviewRight, reviewTop)) {
    box.delete();
    return false;
  }
  box.setZOrder(ExcelScript.ShapeZOrder.bringToFront);
  appendObstacleBounds(obstacleBounds, box);
  return true;
}

function placeConnectorLabel(box: ExcelScript.Shape, centerX: number, centerY: number, connectorWidth: number, connectorHeight: number, gap: number, reviewLeft: number, reviewRight: number, reviewTop: number): boolean {
  const width = box.getWidth();
  const height = box.getHeight();
  const preferredLeft = gap > 0 && connectorHeight > connectorWidth ? centerX + gap : centerX - width / 2;
  const preferredTop = gap > 0 && connectorHeight <= connectorWidth ? centerY - gap - height : centerY - height / 2;
  const left = Math.max(reviewLeft, Math.min(preferredLeft, reviewRight - width));
  const top = Math.max(reviewTop, preferredTop);
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

function addShapeComment(sheet: ExcelScript.Worksheet, obstacleBounds: number[][], shapeName: string, groupName: string, targetTitle: string, sourceId: string, text: string, target: ExcelScript.Shape, targetLeft: number, targetTop: number, targetWidth: number, targetHeight: number, reviewLeft: number, reviewRight: number, reviewTop: number): boolean {
  const width = commentWidth(text);
  const height = commentHeight(text, width);
  const box = sheet.addGeometricShape(ExcelScript.GeometricShapeType.wedgeRRectCallout);
  box.setName(shapeName);
  box.setWidth(width);
  box.setHeight(height);
  applyCommentView(box, "", 1, "", 0);

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
  font.setColor("");
  box.setAltTextTitle(targetTitle);
  box.setAltTextDescription(text);
  if (!placeShapeComment(obstacleBounds, box, sourceId, targetLeft, targetTop, targetWidth, targetHeight, reviewLeft, reviewRight, reviewTop)) {
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

function placeShapeComment(obstacleBounds: number[][], box: ExcelScript.Shape, sourceId: string, targetLeft: number, targetTop: number, targetWidth: number, targetHeight: number, reviewLeft: number, reviewRight: number, reviewTop: number): boolean {
  const gap = 10;
  const width = box.getWidth();
  const height = box.getHeight();
  const targetRight = targetLeft + targetWidth;
  const targetBottom = targetTop + targetHeight;
  const preferLeft = targetLeft + targetWidth / 2 >= reviewLeft + (reviewRight - reviewLeft) / 2;
  const positionOrder = shapeCommentPositionOrder(sourceId, preferLeft);
  for (let i = 0; i < positionOrder.length; i++) {
    const position = shapeCommentPosition(positionOrder[i], targetLeft, targetTop, targetRight, targetBottom, targetWidth, targetHeight, width, height, gap);
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
