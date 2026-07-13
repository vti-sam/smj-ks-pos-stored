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

function main(workbook: ExcelScript.Workbook, sheetName: string = "05_全体構成_01", anchorAddress: string = "B68", downloadPdf: boolean = false, pdfFileName: string = "5.1.2 論理構成図.pdf") {
  const sheet = workbook.getWorksheet(sheetName);
  if (!sheet) {
    throw new Error("Worksheet not found: " + sheetName);
  }
  const anchor = sheet.getRange(anchorAddress);
  const reviewLeft = anchor.getLeft();
  const reviewRight = reviewLeft + 25 * 36;

  const oldLabels = sheet.getShapes();
  for (let i = 0; i < oldLabels.length; i++) {
    const name = oldLabels[i].getName();
    if (name.indexOf("edge_label_") === 0 || name.indexOf("shape_comment_") === 0) {
      oldLabels[i].delete();
    }
  }

  const shapes = sheet.getShapes();
  for (let i = 0; i < shapes.length; i++) {
    const shape = shapes[i];
    const name = shape.getName();
    if (name.indexOf("edge_") !== 0) {
      continue;
    }
    const label = connectorLabel(shape);
    if (label === "") {
      continue;
    }
    const centerX = shape.getLeft() + shape.getWidth() / 2;
    const centerY = shape.getTop() + shape.getHeight() / 2;
    addConnectorLabel(sheet, "edge_label_" + name, label, centerX, centerY, reviewLeft, reviewRight);
  }

  const commentTargets = sheet.getShapes();
  for (let i = 0; i < commentTargets.length; i++) {
    const target = commentTargets[i];
    const name = target.getName();
    if (name.indexOf("shape_") !== 0 || name.indexOf("shape_comment_") === 0) {
      continue;
    }
    const comment = shapeComment(target);
    if (comment === "") {
      continue;
    }
    addShapeComment(sheet, "shape_comment_" + name, comment, target, reviewLeft, reviewRight);
  }

  const foregroundLabels = sheet.getShapes();
  for (let i = 0; i < foregroundLabels.length; i++) {
    if (foregroundLabels[i].getName().indexOf("edge_label_") === 0) {
      foregroundLabels[i].setZOrder(ExcelScript.ShapeZOrder.bringToFront);
    }
  }

  if (downloadPdf) {
    const pdfObject = OfficeScript.convertToPdf();
    OfficeScript.downloadFile({ name: pdfFileName, content: pdfObject });
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

function addConnectorLabel(sheet: ExcelScript.Worksheet, shapeName: string, text: string, centerX: number, centerY: number, reviewLeft: number, reviewRight: number) {
  const width = labelWidth(text);
  const height = labelHeight(text, width);
  const box = sheet.addTextBox(text);
  box.setName(shapeName);
  box.setWidth(width);
  box.setHeight(height);
  box.getFill().setSolidColor("#FFFFFF");
  box.getLineFormat().setVisible(true);
  box.getLineFormat().setColor(diagramLineColor());
  box.getLineFormat().setWeight(diagramLineWeight());

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
  if (!placeConnectorLabel(sheet, box, centerX, centerY, reviewLeft, reviewRight)) {
    box.delete();
    return;
  }
  box.setZOrder(ExcelScript.ShapeZOrder.bringToFront);
}

function placeConnectorLabel(sheet: ExcelScript.Worksheet, box: ExcelScript.Shape, centerX: number, centerY: number, reviewLeft: number, reviewRight: number): boolean {
  const width = box.getWidth();
  const height = box.getHeight();
  const positions: number[][] = [
    [centerX - width / 2, centerY - height - 6],
    [centerX - width / 2, centerY + 6],
    [centerX - width - 6, centerY - height / 2],
    [centerX + 6, centerY - height / 2]
  ];
  for (let i = 0; i < positions.length; i++) {
    const left = positions[i][0];
    const top = Math.max(0, positions[i][1]);
    if (left < reviewLeft || left + width > reviewRight) {
      continue;
    }
    if (!overlapsExistingShape(sheet, box, box, left, top, width, height)) {
      box.setLeft(left);
      box.setTop(top);
      return true;
    }
  }
  return false;
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

function addShapeComment(sheet: ExcelScript.Worksheet, shapeName: string, text: string, target: ExcelScript.Shape, reviewLeft: number, reviewRight: number) {
  const width = commentWidth(text);
  const height = commentHeight(text, width);
  const box = sheet.addGeometricShape(ExcelScript.GeometricShapeType.wedgeRRectCallout);
  box.setName(shapeName);
  box.setWidth(width);
  box.setHeight(height);
  box.getFill().setSolidColor(commentFillColor());
  box.getFill().setTransparency(commentTransparency());
  box.getLineFormat().setVisible(true);
  box.getLineFormat().setColor(commentBorderColor());
  box.getLineFormat().setWeight(diagramLineWeight());

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
  if (!placeShapeComment(sheet, box, target, reviewLeft, reviewRight)) {
    box.delete();
    return;
  }
  box.setZOrder(ExcelScript.ShapeZOrder.bringToFront);
}

function placeShapeComment(sheet: ExcelScript.Worksheet, box: ExcelScript.Shape, target: ExcelScript.Shape, reviewLeft: number, reviewRight: number): boolean {
  const gap = 10;
  const width = box.getWidth();
  const height = box.getHeight();
  const targetLeft = target.getLeft();
  const targetTop = target.getTop();
  const targetRight = targetLeft + target.getWidth();
  const targetBottom = targetTop + target.getHeight();
  const rightPosition: number[] = [targetRight + gap, targetTop + (target.getHeight() - height) / 2];
  const leftPosition: number[] = [targetLeft - width - gap, targetTop + (target.getHeight() - height) / 2];
  const preferLeft = targetLeft + target.getWidth() / 2 >= reviewLeft + (reviewRight - reviewLeft) / 2;
  const horizontalPositions: number[][] = preferLeft ? [leftPosition, rightPosition] : [rightPosition, leftPosition];
  const positions: number[][] = [
    horizontalPositions[0],
    horizontalPositions[1],
    [targetLeft + (target.getWidth() - width) / 2, targetBottom + gap],
    [targetLeft + (target.getWidth() - width) / 2, Math.max(0, targetTop - height - gap)],
    [targetRight + gap, targetBottom + gap],
    [targetLeft - width - gap, targetBottom + gap],
    [targetRight + gap, Math.max(0, targetTop - height - gap)],
    [targetLeft - width - gap, Math.max(0, targetTop - height - gap)]
  ];
  for (let i = 0; i < positions.length; i++) {
    const left = positions[i][0];
    const top = Math.max(0, positions[i][1]);
    if (left < reviewLeft || left + width > reviewRight) {
      continue;
    }
    if (!overlapsExistingShape(sheet, box, target, left, top, width, height)) {
      box.setLeft(left);
      box.setTop(top);
      return true;
    }
  }
  return false;
}

function overlapsExistingShape(sheet: ExcelScript.Worksheet, box: ExcelScript.Shape, target: ExcelScript.Shape, left: number, top: number, width: number, height: number): boolean {
  const right = left + width;
  const bottom = top + height;
  const shapes = sheet.getShapes();
  for (let i = 0; i < shapes.length; i++) {
    const candidate = shapes[i];
    const name = candidate.getName();
    if (box.getName().indexOf("shape_comment_") === 0 && name.indexOf("edge_label_") === 0) {
      continue;
    }
    if (name === box.getName() || name === target.getName() || name.indexOf("section_bg_") === 0) {
      continue;
    }
    if (candidate.getType() === ExcelScript.ShapeType.line) {
      continue;
    }
    const candidateLeft = candidate.getLeft();
    const candidateTop = candidate.getTop();
    const candidateRight = candidateLeft + candidate.getWidth();
    const candidateBottom = candidateTop + candidate.getHeight();
    const separated = right + 4 <= candidateLeft || candidateRight + 4 <= left || bottom + 4 <= candidateTop || candidateBottom + 4 <= top;
    if (!separated) {
      return true;
    }
  }
  return false;
}
