function main(workbook: ExcelScript.Workbook, sheetName: string = "05_全体構成_01", anchorAddress: string = "B68", pdfReviewMode: boolean = false) {
  const sheet = workbook.getWorksheet(sheetName);
  if (!sheet) {
    throw new Error("Worksheet not found: " + sheetName);
  }
  const anchor = sheet.getRange(anchorAddress);
  const originTop = anchor.getTop();

  const oldShapes = sheet.getShapes();
  for (let i = 0; i < oldShapes.length; i++) {
    const name = oldShapes[i].getName();
    if (name.indexOf("shape_") === 0 || name.indexOf("edge_") === 0 || name.indexOf("section_bg_") === 0) {
      oldShapes[i].delete();
    }
  }
  const canvasColumnCount = 25;
  const baselineCanvasRowCount = 38;
  const canvasRange = getAnchoredRange(anchor, 0, 0, baselineCanvasRowCount, canvasColumnCount);
  unmergeLaneRange(canvasRange);
  canvasRange.clear(ExcelScript.ClearApplyTo.all);
  formatDiagramGrid(anchor, baselineCanvasRowCount, canvasColumnCount);

  const laneRange1 = getAnchoredRange(anchor, 0, 0, 1, 9);
  const laneRange2 = getAnchoredRange(anchor, 0, 9, 1, 8);
  const laneRange3 = getAnchoredRange(anchor, 0, 17, 1, 8);

  addCellLaneTable(anchor, baselineCanvasRowCount - 1);

  const shape_DEVICE_DRAWER = addTextShape(sheet, "shape_DEVICE_DRAWER", "② キャッシュドロア（SHARP）", 0, 0, 162.15, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_DEVICE_DRAWER, "② キャッシュドロア（SHARP）", "");
  const shape_DEVICE_DISPLAY = addTextShape(sheet, "shape_DEVICE_DISPLAY", "③ カスタマーディスプレイ（SHARP）", 0, 0, 193.65, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_DEVICE_DISPLAY, "③ カスタマーディスプレイ（SHARP）", "");
  const shape_HOST_HOST_EXEC_CONTROL = addTextShape(sheet, "shape_HOST_HOST_EXEC_CONTROL", "②-2 要求変換・コマンド制御", 0, 0, 155.325, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_HOST_HOST_EXEC_CONTROL, "②-2 要求変換・コマンド制御", "");
  const shape_APP_APP_COORD_PROCESS = addTextShape(sheet, "shape_APP_APP_COORD_PROCESS", "①-3 デバイスコネクタ\nプロセス管理", 0, 0, 123.825, 36, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_APP_APP_COORD_PROCESS, "①-3 デバイスコネクタ プロセス管理", "デバイスコネクタはアプリと\nは別プロセスで管理します。\n起動・停止はアプリのライフサイクルに\n合わせて制御します。");
  const shape_APP_APP_COORD_LIFECYCLE = addTextShape(sheet, "shape_APP_APP_COORD_LIFECYCLE", "①-2 アプリライフサイクル", 0, 0, 144.825, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_APP_APP_COORD_LIFECYCLE, "①-2 アプリライフサイクル", "");
  const shape_HOST_HOST_EXEC_ORDER = addTextShape(sheet, "shape_HOST_HOST_EXEC_ORDER", "②-1 デバイスID別順序制御", 0, 0, 145.875, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_HOST_HOST_EXEC_ORDER, "②-1 デバイスID別順序制御", "同一デバイスへの要求は\nデバイスID単位で順序制御し、\n並行実行による競合を防止します。");
  const shape_APP_APP_ACCESS_SELECT = addTextShape(sheet, "shape_APP_APP_ACCESS_SELECT", "②-1 設定・制御方式選択", 0, 0, 134.325, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_APP_APP_ACCESS_SELECT, "②-1 設定・制御方式選択", "");
  const shape_APP_APP_ACCESS_RESULT = addTextShape(sheet, "shape_APP_APP_ACCESS_RESULT", "②-3 結果・イベント連携", 0, 0, 134.325, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_APP_APP_ACCESS_RESULT, "②-3 結果・イベント連携", "");
  const shape_HOST_HOST_EXEC_HOST_SETTING = addTextShape(sheet, "shape_HOST_HOST_EXEC_HOST_SETTING", "デバイスコネクタ側設定", 0, 0, 127.5, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_HOST_HOST_EXEC_HOST_SETTING, "デバイスコネクタ側設定", "");
  const shape_HOST_HOST_ADAPTER_ADAPTER = addTextShape(sheet, "shape_HOST_HOST_ADAPTER_ADAPTER", "③-1 個別デバイス実装", 0, 0, 123.825, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_HOST_HOST_ADAPTER_ADAPTER, "③-1 個別デバイス実装", "");
  const shape_DEVICE_CASH = addTextShape(sheet, "shape_DEVICE_CASH", "① 釣銭機（RT-300）", 0, 0, 115.425, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_DEVICE_CASH, "① 釣銭機（RT-300）", "");
  const shape_HOST_HOST_SERVICE_RUNTIME = addTextShape(sheet, "shape_HOST_HOST_SERVICE_RUNTIME", "①-1 起動・停止管理", 0, 0, 113.325, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_HOST_HOST_SERVICE_RUNTIME, "①-1 起動・停止管理", "");
  const shape_APP_APP_COORD_BUSINESS = addTextShape(sheet, "shape_APP_APP_COORD_BUSINESS", "①-1 画面・業務処理", 0, 0, 113.325, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_APP_APP_COORD_BUSINESS, "①-1 画面・業務処理", "");
  const shape_HOST_HOST_SERVICE_SERVER = addTextShape(sheet, "shape_HOST_HOST_SERVICE_SERVER", "①-2 コマンド受付", 0, 0, 102.825, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_HOST_HOST_SERVICE_SERVER, "①-2 コマンド受付", "");
  const shape_APP_APP_ACCESS_COMMAND = addTextShape(sheet, "shape_APP_APP_ACCESS_COMMAND", "②-2 コマンド通信", 0, 0, 102.825, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_APP_APP_ACCESS_COMMAND, "②-2 コマンド通信", "");
  const shape_HOST_HOST_SERVICE_EVENT = addTextShape(sheet, "shape_HOST_HOST_SERVICE_EVENT", "①-3 イベント配信", 0, 0, 102.825, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_HOST_HOST_SERVICE_EVENT, "①-3 イベント配信", "デバイス処理結果は同期応答と\nは別経路で配信し、\nアプリの購読処理へ通知します。");
  const shape_HOST_HOST_EXEC_MANAGER = addTextShape(sheet, "shape_HOST_HOST_EXEC_MANAGER", "②-3 デバイス管理", 0, 0, 102.825, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_HOST_HOST_EXEC_MANAGER, "②-3 デバイス管理", "");
  const shape_APP_APP_ACCESS_APP_SETTING = addTextShape(sheet, "shape_APP_APP_ACCESS_APP_SETTING", "アプリ側設定", 0, 0, 96, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_APP_APP_ACCESS_APP_SETTING, "アプリ側設定", "");

  let groupBottom1 = placeD2Row([shape_APP_APP_COORD_BUSINESS], [0.5], laneRange1.getLeft(), originTop + 90, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeD2Row([shape_APP_APP_COORD_LIFECYCLE], [0.5], laneRange1.getLeft(), groupBottom1 + 24, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeD2Row([shape_APP_APP_COORD_PROCESS], [0.5], laneRange1.getLeft(), groupBottom1 + 24, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeD2Row([shape_APP_APP_ACCESS_APP_SETTING], [0.5], laneRange1.getLeft(), groupBottom1 + 96, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeD2Row([shape_APP_APP_ACCESS_SELECT], [0.5], laneRange1.getLeft(), groupBottom1 + 24, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeD2Row([shape_APP_APP_ACCESS_COMMAND], [0.5], laneRange1.getLeft(), groupBottom1 + 24, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeD2Row([shape_APP_APP_ACCESS_RESULT], [0.5], laneRange1.getLeft(), groupBottom1 + 24, laneRange1.getWidth(), 30, 28);
  let groupBottom2 = placeD2Row([shape_HOST_HOST_SERVICE_RUNTIME], [0.5], laneRange2.getLeft(), originTop + 90, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeD2Row([shape_HOST_HOST_SERVICE_SERVER], [0.5], laneRange2.getLeft(), groupBottom2 + 24, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeD2Row([shape_HOST_HOST_SERVICE_EVENT], [0.5], laneRange2.getLeft(), groupBottom2 + 24, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeD2Row([shape_HOST_HOST_EXEC_HOST_SETTING], [0.5], laneRange2.getLeft(), groupBottom2 + 96, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeD2Row([shape_HOST_HOST_EXEC_ORDER], [0.5], laneRange2.getLeft(), groupBottom2 + 24, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeD2Row([shape_HOST_HOST_EXEC_CONTROL], [0.5], laneRange2.getLeft(), groupBottom2 + 24, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeD2Row([shape_HOST_HOST_EXEC_MANAGER], [0.5], laneRange2.getLeft(), groupBottom2 + 24, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeD2Row([shape_HOST_HOST_ADAPTER_ADAPTER], [0.5], laneRange2.getLeft(), groupBottom2 + 96, laneRange2.getWidth(), 30, 28);
  let groupBottom3 = placeD2Row([shape_DEVICE_CASH], [0.5], laneRange3.getLeft(), originTop + 90, laneRange3.getWidth(), 30, 28);
  groupBottom3 = placeD2Row([shape_DEVICE_DRAWER], [0.5], laneRange3.getLeft(), groupBottom3 + 24, laneRange3.getWidth(), 30, 28);
  groupBottom3 = placeD2Row([shape_DEVICE_DISPLAY], [0.5], laneRange3.getLeft(), groupBottom3 + 24, laneRange3.getWidth(), 30, 28);

  addSectionBackground(sheet, "section_bg_1_1", "① 業務・プロセス管理", [shape_APP_APP_COORD_PROCESS, shape_APP_APP_COORD_LIFECYCLE, shape_APP_APP_COORD_BUSINESS], laneRange1.getLeft(), laneRange1.getWidth(), "#FFFFFF");
  addSectionBackground(sheet, "section_bg_1_2", "② デバイスアクセス", [shape_APP_APP_ACCESS_SELECT, shape_APP_APP_ACCESS_RESULT, shape_APP_APP_ACCESS_COMMAND, shape_APP_APP_ACCESS_APP_SETTING], laneRange1.getLeft(), laneRange1.getWidth(), "#FFFFFF");
  addSectionBackground(sheet, "section_bg_2_1", "① プロセス・通信サービス", [shape_HOST_HOST_SERVICE_RUNTIME, shape_HOST_HOST_SERVICE_SERVER, shape_HOST_HOST_SERVICE_EVENT], laneRange2.getLeft(), laneRange2.getWidth(), "#FFFFFF");
  addSectionBackground(sheet, "section_bg_2_2", "② コマンド実行", [shape_HOST_HOST_EXEC_CONTROL, shape_HOST_HOST_EXEC_ORDER, shape_HOST_HOST_EXEC_HOST_SETTING, shape_HOST_HOST_EXEC_MANAGER], laneRange2.getLeft(), laneRange2.getWidth(), "#FFFFFF");
  addSectionBackground(sheet, "section_bg_2_3", "③ デバイスアダプター", [shape_HOST_HOST_ADAPTER_ADAPTER], laneRange2.getLeft(), laneRange2.getWidth(), "#FFFFFF");
  const diagramBottom = Math.max(originTop + 90, groupBottom1, groupBottom2, groupBottom3);
  const bodyEndRowOffset = Math.max(11, Math.ceil((diagramBottom - originTop + 48) / 18) - 1);
  const canvasRowCount = Math.max(baselineCanvasRowCount, bodyEndRowOffset + 1);
  formatDiagramGrid(anchor, canvasRowCount, canvasColumnCount);
  if (bodyEndRowOffset >= baselineCanvasRowCount) {
    addCellLaneTable(anchor, bodyEndRowOffset);
  }

  addConnector(sheet, "edge_01_DEVICE_CASH_to_HOST_HOST_ADAPTER_ADAPTER", shape_DEVICE_CASH, shape_HOST_HOST_ADAPTER_ADAPTER, false, true, "制御／結果", "elbow", "left", "right", "#7030A0");
  addConnector(sheet, "edge_02_DEVICE_DRAWER_to_HOST_HOST_ADAPTER_ADAPTER", shape_DEVICE_DRAWER, shape_HOST_HOST_ADAPTER_ADAPTER, false, true, "制御／結果", "elbow", "left", "right", "#7030A0");
  addConnector(sheet, "edge_03_DEVICE_DISPLAY_to_HOST_HOST_ADAPTER_ADAPTER", shape_DEVICE_DISPLAY, shape_HOST_HOST_ADAPTER_ADAPTER, false, true, "制御／結果", "elbow", "left", "right", "#7030A0");
  addConnector(sheet, "edge_04_APP_APP_COORD_PROCESS_to_HOST_HOST_SERVICE_RUNTIME", shape_APP_APP_COORD_PROCESS, shape_HOST_HOST_SERVICE_RUNTIME, false, false, "OSプロセス制御", "elbow", "right", "left", "#548235");
  addConnector(sheet, "edge_05_APP_APP_ACCESS_COMMAND_to_HOST_HOST_SERVICE_SERVER", shape_APP_APP_ACCESS_COMMAND, shape_HOST_HOST_SERVICE_SERVER, false, true, "コマンド通信用パイプ\n要求／同期応答", "elbow", "right", "left", "#1F4E79");
  addConnector(sheet, "edge_06_HOST_HOST_SERVICE_EVENT_to_APP_APP_ACCESS_RESULT", shape_HOST_HOST_SERVICE_EVENT, shape_APP_APP_ACCESS_RESULT, true, false, "イベント通知用パイプ\n非同期イベント", "elbow", "left", "right", "#C65911");
  addConnector(sheet, "edge_07_HOST_HOST_EXEC_MANAGER_to_HOST_HOST_ADAPTER_ADAPTER", shape_HOST_HOST_EXEC_MANAGER, shape_HOST_HOST_ADAPTER_ADAPTER, false, false, "", "elbow", "", "", "#7030A0");
  addConnector(sheet, "edge_08_HOST_HOST_SERVICE_SERVER_to_HOST_HOST_EXEC_ORDER", shape_HOST_HOST_SERVICE_SERVER, shape_HOST_HOST_EXEC_ORDER, false, false, "", "elbow", "left", "left", "#1F4E79");
  addConnector(sheet, "edge_09_HOST_HOST_EXEC_MANAGER_to_HOST_HOST_SERVICE_EVENT", shape_HOST_HOST_EXEC_MANAGER, shape_HOST_HOST_SERVICE_EVENT, true, false, "デバイス処理結果", "elbow", "right", "right", "#C65911");
  addConnector(sheet, "edge_10_HOST_HOST_EXEC_HOST_SETTING_to_HOST_HOST_EXEC_MANAGER", shape_HOST_HOST_EXEC_HOST_SETTING, shape_HOST_HOST_EXEC_MANAGER, true, false, "", "elbow", "left", "left", "#7F7F7F");
  addConnector(sheet, "edge_11_HOST_HOST_EXEC_ORDER_to_HOST_HOST_EXEC_CONTROL", shape_HOST_HOST_EXEC_ORDER, shape_HOST_HOST_EXEC_CONTROL, false, false, "", "elbow", "", "", "#1F4E79");
  addConnector(sheet, "edge_12_HOST_HOST_EXEC_CONTROL_to_HOST_HOST_EXEC_MANAGER", shape_HOST_HOST_EXEC_CONTROL, shape_HOST_HOST_EXEC_MANAGER, false, false, "", "elbow", "", "", "#1F4E79");
  addConnector(sheet, "edge_13_HOST_HOST_SERVICE_RUNTIME_to_HOST_HOST_SERVICE_SERVER", shape_HOST_HOST_SERVICE_RUNTIME, shape_HOST_HOST_SERVICE_SERVER, false, false, "", "elbow", "", "", "#1F4E79");
  addConnector(sheet, "edge_14_APP_APP_COORD_BUSINESS_to_APP_APP_ACCESS_SELECT", shape_APP_APP_COORD_BUSINESS, shape_APP_APP_ACCESS_SELECT, false, false, "", "elbow", "left", "left", "#1F4E79");
  addConnector(sheet, "edge_15_APP_APP_ACCESS_RESULT_to_APP_APP_COORD_BUSINESS", shape_APP_APP_ACCESS_RESULT, shape_APP_APP_COORD_BUSINESS, true, false, "", "elbow", "right", "right", "#1F4E79");
  addConnector(sheet, "edge_16_APP_APP_ACCESS_APP_SETTING_to_APP_APP_ACCESS_SELECT", shape_APP_APP_ACCESS_APP_SETTING, shape_APP_APP_ACCESS_SELECT, true, false, "", "elbow", "", "", "#7F7F7F");
  addConnector(sheet, "edge_17_APP_APP_ACCESS_SELECT_to_APP_APP_ACCESS_COMMAND", shape_APP_APP_ACCESS_SELECT, shape_APP_APP_ACCESS_COMMAND, false, false, "", "elbow", "", "", "#1F4E79");
  addConnector(sheet, "edge_18_APP_APP_ACCESS_COMMAND_to_APP_APP_ACCESS_RESULT", shape_APP_APP_ACCESS_COMMAND, shape_APP_APP_ACCESS_RESULT, false, false, "", "elbow", "", "", "#1F4E79");
  addConnector(sheet, "edge_19_APP_APP_COORD_LIFECYCLE_to_APP_APP_COORD_PROCESS", shape_APP_APP_COORD_LIFECYCLE, shape_APP_APP_COORD_PROCESS, false, false, "", "elbow", "", "", "#1F4E79");

  configurePdfReview(workbook, sheet, anchor, canvasRowCount, canvasColumnCount, pdfReviewMode);
}

function addCellLaneTable(anchor: ExcelScript.Range, bodyEndRowOffset: number) {
  addLaneColumns(anchor, 0, 9, bodyEndRowOffset, "（1） タブレットPOS端末アプリ（アプリプロセス）", "#F7FBFF");
  addLaneColumns(anchor, 9, 8, bodyEndRowOffset, "（2） デバイスコネクタ（独立プロセス）", "#FCE4D6");
  addLaneColumns(anchor, 17, 8, bodyEndRowOffset, "（3） 周辺機器", "#E4DFEC");
}


function diagramLineColor(): string {
  return "#1F4E79";
}

function diagramLineWeight(): number {
  return 2;
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
  background.getFill().setSolidColor(fill);
  background.getLineFormat().setColor(diagramLineColor());
  background.getLineFormat().setWeight(diagramLineWeight());
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
  if (bordered) {
    shape.getFill().setSolidColor(fill);
    shape.getLineFormat().setColor(diagramLineColor());
    shape.getLineFormat().setWeight(diagramLineWeight());
    if (dashed) {
      shape.getLineFormat().setDashStyle(ExcelScript.ShapeLineDashStyle.dash);
    }
  } else {
    shape.getFill().setTransparency(1);
    shape.getLineFormat().setVisible(true);
    shape.getLineFormat().setColor(diagramLineColor());
    shape.getLineFormat().setWeight(diagramLineWeight());
  }
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
  connector.getLineFormat().setColor(connectorLineColor(color));
  connector.getLineFormat().setWeight(diagramLineWeight());
  if (dashed) {
    connector.getLineFormat().setDashStyle(ExcelScript.ShapeLineDashStyle.dash);
  }
  const inferredBeginSide = preferredSide(fromShape, toShape);
  const beginSide = requestedFromSide === "left" || requestedFromSide === "top" || requestedFromSide === "right" || requestedFromSide === "bottom" ? requestedFromSide : inferredBeginSide;
  const endSide = requestedToSide === "left" || requestedToSide === "top" || requestedToSide === "right" || requestedToSide === "bottom" ? requestedToSide : oppositeSide(beginSide);
  const line = connector.getLine();
  line.connectBeginShape(fromShape, connectionSite(fromShape, beginSide));
  line.connectEndShape(toShape, connectionSite(toShape, endSide));
  line.setConnectorType(connectorType(kind));
  if (bidirectional) {
    line.setBeginArrowheadStyle(ExcelScript.ArrowheadStyle.triangle);
  }
  line.setEndArrowheadStyle(ExcelScript.ArrowheadStyle.triangle);
  if (label !== "") {
    connector.setAltTextTitle(label);
    connector.setAltTextDescription(label);
  }
  return connector;
}

function connectorLineColor(color: string): string {
  return color && color.length > 0 ? color : diagramLineColor();
}
