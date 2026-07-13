function main(workbook: ExcelScript.Workbook, sheetName: string = "06_運用シナリオ_01", anchorAddress: string = "B7", pdfReviewMode: boolean = false) {
  const sheet = workbook.getWorksheet(sheetName);
  if (!sheet) {
    throw new Error("Worksheet not found: " + sheetName);
  }
  const anchor = sheet.getRange(anchorAddress);
  const originTop = anchor.getTop();
  const shapePrefix = "shape_d61_";
  const edgePrefix = "edge_d61_";
  const sectionPrefix = "section_bg_d61_";
  const canvasColumnCount = 36;
  const baselineCanvasRowCount = 31;
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

  const laneRange1 = getAnchoredRange(anchor, 0, 0, 1, 12);
  const laneRange2 = getAnchoredRange(anchor, 0, 12, 1, 12);
  const laneRange3 = getAnchoredRange(anchor, 0, 24, 1, 12);

  addCellLaneTable(anchor, baselineCanvasRowCount - 1);

  const shape_d61_STOP_T2 = addTextShape(sheet, "shape_d61_STOP_T2", "② 所有プロセスか", 0, 0, 140, 52, 10, true, "#FFF2CC", true, "center", "diamond", false);
  setShapeAltText(shape_d61_STOP_T2, "② 所有プロセスか", "アプリが起動した所有\nプロセスだけを停止対象とします。\n既存プロセスは停止しません。");
  const shape_d61_OPERATION_O6 = addTextShape(sheet, "shape_d61_OPERATION_O6", "運用を継続するか", 0, 0, 140, 52, 10, true, "#FFF2CC", true, "center", "diamond", false);
  setShapeAltText(shape_d61_OPERATION_O6, "運用を継続するか", "失敗応答と通信失敗を区別します。\n同期結果を確定できない\n要求は自動再送しません。");
  const shape_d61_STOP_T4 = addTextShape(sheet, "shape_d61_STOP_T4", "④ 10秒以内に\n終了したか", 0, 0, 140, 52, 10, true, "#FFF2CC", true, "center", "diamond", false);
  setShapeAltText(shape_d61_STOP_T4, "④ 10秒以内に 終了したか", "");
  const shape_d61_OPERATION_O4 = addTextShape(sheet, "shape_d61_OPERATION_O4", "④ 同期結果を\n確定できたか", 0, 0, 140, 52, 10, true, "#FFF2CC", true, "center", "diamond", false);
  setShapeAltText(shape_d61_OPERATION_O4, "④ 同期結果を 確定できたか", "");
  const shape_d61_START_S4 = addTextShape(sheet, "shape_d61_START_S4", "④ 起動準備が\n完了したか", 0, 0, 140, 52, 10, true, "#FFF2CC", true, "center", "diamond", false);
  setShapeAltText(shape_d61_START_S4, "④ 起動準備が 完了したか", "");
  const shape_d61_STOP_T3 = addTextShape(sheet, "shape_d61_STOP_T3", "③ 停止要求を送信して\n終了を監視", 0, 0, 122.775, 36, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_STOP_T3, "③ 停止要求を送信して 終了を監視", "");
  const shape_d61_START_S3 = addTextShape(sheet, "shape_d61_START_S3", "③ デバイスコネクタと\n通信・デバイスを準備", 0, 0, 122.775, 36, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_START_S3, "③ デバイスコネクタと 通信・デバイスを準備", "");
  const shape_d61_OPERATION_COMM_ERROR = addTextShape(sheet, "shape_d61_OPERATION_COMM_ERROR", "通信失敗を返却\n送信後は自動再送なし", 0, 0, 117, 36, 10, true, "#F4CCCC", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_OPERATION_COMM_ERROR, "通信失敗を返却 送信後は自動再送なし", "");
  const shape_d61_STOP_T5 = addTextShape(sheet, "shape_d61_STOP_T5", "所有プロセスツリーを\n強制終了", 0, 0, 117, 36, 10, true, "#F4CCCC", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_STOP_T5, "所有プロセスツリーを 強制終了", "");
  const shape_d61_START_S2 = addTextShape(sheet, "shape_d61_START_S2", "② 設定を準備\n運用設定 → 初期設定", 0, 0, 118.05, 36, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_START_S2, "② 設定を準備 運用設定 → 初期設定", "");
  const shape_d61_OPERATION_O2 = addTextShape(sheet, "shape_d61_OPERATION_O2", "② 接続を確認して\nコマンド要求を送信", 0, 0, 106.5, 36, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_OPERATION_O2, "② 接続を確認して コマンド要求を送信", "");
  const shape_d61_OPERATION_O3 = addTextShape(sheet, "shape_d61_OPERATION_O3", "③ 順序制御して\n対象デバイスを制御", 0, 0, 106.5, 36, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_OPERATION_O3, "③ 順序制御して 対象デバイスを制御", "設計上の役割：デバイス操作フェーズ。\n入力は② 接続を確認して、出力先は④\n同期結果を、非同期イベントをです。");
  const shape_d61_OPERATION_EVENT = addTextShape(sheet, "shape_d61_OPERATION_EVENT", "非同期イベントを\nアプリへ通知", 0, 0, 96, 36, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_OPERATION_EVENT, "非同期イベントを アプリへ通知", "");
  const shape_d61_OPERATION_O5 = addTextShape(sheet, "shape_d61_OPERATION_O5", "正常応答または\n失敗応答を返却", 0, 0, 96, 36, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_OPERATION_O5, "正常応答または 失敗応答を返却", "");
  const shape_d61_START_START_ERROR = addTextShape(sheet, "shape_d61_START_START_ERROR", "起動を中止して\n異常を記録", 0, 0, 96, 36, 10, true, "#F4CCCC", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_START_START_ERROR, "起動を中止して 異常を記録", "");
  const shape_d61_OPERATION_O1 = addTextShape(sheet, "shape_d61_OPERATION_O1", "① デバイス操作を依頼", 0, 0, 122.775, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_OPERATION_O1, "① デバイス操作を依頼", "");
  const shape_d61_STOP_T1 = addTextShape(sheet, "shape_d61_STOP_T1", "① アプリ停止・破棄", 0, 0, 112.275, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_STOP_T1, "① アプリ停止・破棄", "");
  const shape_d61_START_S1 = addTextShape(sheet, "shape_d61_START_S1", "① アプリ起動", 0, 0, 96, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_START_S1, "① アプリ起動", "");
  const shape_d61_STOP_T6 = addTextShape(sheet, "shape_d61_STOP_T6", "終了処理完了", 0, 0, 96, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_STOP_T6, "終了処理完了", "");
  const shape_d61_START_S5 = addTextShape(sheet, "shape_d61_START_S5", "運用開始", 0, 0, 96, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_START_S5, "運用開始", "");

  let groupBottom1 = placeD2Row([shape_d61_START_S1], [0.483321], laneRange1.getLeft(), originTop + 90, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeD2Row([shape_d61_START_S2], [0.483321], laneRange1.getLeft(), groupBottom1 + 24, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeD2Row([shape_d61_START_S3], [0.483321], laneRange1.getLeft(), groupBottom1 + 24, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeD2Row([shape_d61_START_S4], [0.736918], laneRange1.getLeft(), groupBottom1 + 24, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeD2Row([shape_d61_START_S5, shape_d61_START_START_ERROR], [0.274116, 0.692525], laneRange1.getLeft(), groupBottom1 + 24, laneRange1.getWidth(), 30, 28);
  let groupBottom2 = placeD2Row([shape_d61_OPERATION_O1], [0.604322], laneRange2.getLeft(), originTop + 90, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeD2Row([shape_d61_OPERATION_O2], [0.510735], laneRange2.getLeft(), groupBottom2 + 24, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeD2Row([shape_d61_OPERATION_O3], [0.510735], laneRange2.getLeft(), groupBottom2 + 24, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeD2Row([shape_d61_OPERATION_O4], [0.49497], laneRange2.getLeft(), groupBottom2 + 24, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeD2Row([shape_d61_OPERATION_EVENT], [0.688481], laneRange2.getLeft(), groupBottom2 + 24, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeD2Row([shape_d61_OPERATION_O5, shape_d61_OPERATION_COMM_ERROR], [0.181767, 0.509319], laneRange2.getLeft(), groupBottom2 + 24, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeD2Row([shape_d61_OPERATION_O6], [0.727597], laneRange2.getLeft(), groupBottom2 + 24, laneRange2.getWidth(), 30, 28);
  let groupBottom3 = placeD2Row([shape_d61_STOP_T1], [0.392943], laneRange3.getLeft(), originTop + 90, laneRange3.getWidth(), 30, 28);
  groupBottom3 = placeD2Row([shape_d61_STOP_T2], [0.612624], laneRange3.getLeft(), groupBottom3 + 24, laneRange3.getWidth(), 30, 28);
  groupBottom3 = placeD2Row([shape_d61_STOP_T3], [0.556156], laneRange3.getLeft(), groupBottom3 + 24, laneRange3.getWidth(), 30, 28);
  groupBottom3 = placeD2Row([shape_d61_STOP_T4], [0.767348], laneRange3.getLeft(), groupBottom3 + 24, laneRange3.getWidth(), 30, 28);
  groupBottom3 = placeD2Row([shape_d61_STOP_T5], [0.715795], laneRange3.getLeft(), groupBottom3 + 24, laneRange3.getWidth(), 30, 28);
  groupBottom3 = placeD2Row([shape_d61_STOP_T6], [0.392943], laneRange3.getLeft(), groupBottom3 + 24, laneRange3.getWidth(), 30, 28);

  const diagramBottom = Math.max(originTop + 90, groupBottom1, groupBottom2, groupBottom3);
  const bodyEndRowOffset = Math.max(11, Math.ceil((diagramBottom - originTop + 48) / 18) - 1);
  const canvasRowCount = Math.max(baselineCanvasRowCount, bodyEndRowOffset + 1);
  formatDiagramGrid(anchor, canvasRowCount, canvasColumnCount);
  if (bodyEndRowOffset >= baselineCanvasRowCount) {
    addCellLaneTable(anchor, bodyEndRowOffset);
  }

  addConnector(sheet, "edge_d61_01_OPERATION_O6_to_STOP_T1", shape_d61_OPERATION_O6, shape_d61_STOP_T1, false, false, "いいえ", "elbow", "right", "left", "#548235");
  addConnector(sheet, "edge_d61_02_START_S5_to_OPERATION_O1", shape_d61_START_S5, shape_d61_OPERATION_O1, false, false, "", "elbow", "right", "left", "#548235");
  addConnector(sheet, "edge_d61_03_STOP_T1_to_STOP_T2", shape_d61_STOP_T1, shape_d61_STOP_T2, false, false, "", "elbow", "", "", "#548235");
  addConnector(sheet, "edge_d61_04_STOP_T2_to_STOP_T6", shape_d61_STOP_T2, shape_d61_STOP_T6, false, false, "いいえ", "elbow", "left", "left", "#548235");
  addConnector(sheet, "edge_d61_05_STOP_T2_to_STOP_T3", shape_d61_STOP_T2, shape_d61_STOP_T3, false, false, "はい", "elbow", "", "", "#548235");
  addConnector(sheet, "edge_d61_06_STOP_T3_to_STOP_T4", shape_d61_STOP_T3, shape_d61_STOP_T4, false, false, "", "elbow", "", "", "#548235");
  addConnector(sheet, "edge_d61_07_STOP_T4_to_STOP_T6", shape_d61_STOP_T4, shape_d61_STOP_T6, false, false, "はい", "elbow", "right", "right", "#548235");
  addConnector(sheet, "edge_d61_08_STOP_T4_to_STOP_T5", shape_d61_STOP_T4, shape_d61_STOP_T5, true, false, "いいえ", "elbow", "", "", "#C00000");
  addConnector(sheet, "edge_d61_09_STOP_T5_to_STOP_T6", shape_d61_STOP_T5, shape_d61_STOP_T6, false, false, "", "elbow", "", "", "#C00000");
  addConnector(sheet, "edge_d61_10_OPERATION_O1_to_OPERATION_O2", shape_d61_OPERATION_O1, shape_d61_OPERATION_O2, false, false, "", "elbow", "", "", "#548235");
  addConnector(sheet, "edge_d61_11_OPERATION_O2_to_OPERATION_O3", shape_d61_OPERATION_O2, shape_d61_OPERATION_O3, false, false, "", "elbow", "", "", "#548235");
  addConnector(sheet, "edge_d61_12_OPERATION_O3_to_OPERATION_O4", shape_d61_OPERATION_O3, shape_d61_OPERATION_O4, false, false, "", "elbow", "", "", "#548235");
  addConnector(sheet, "edge_d61_13_OPERATION_O4_to_OPERATION_O5", shape_d61_OPERATION_O4, shape_d61_OPERATION_O5, false, false, "はい", "elbow", "left", "left", "#548235");
  addConnector(sheet, "edge_d61_14_OPERATION_O5_to_OPERATION_O6", shape_d61_OPERATION_O5, shape_d61_OPERATION_O6, false, false, "", "elbow", "", "", "#548235");
  addConnector(sheet, "edge_d61_15_OPERATION_O4_to_OPERATION_COMM_ERROR", shape_d61_OPERATION_O4, shape_d61_OPERATION_COMM_ERROR, true, false, "いいえ", "elbow", "right", "right", "#C00000");
  addConnector(sheet, "edge_d61_16_OPERATION_COMM_ERROR_to_OPERATION_O6", shape_d61_OPERATION_COMM_ERROR, shape_d61_OPERATION_O6, false, false, "", "elbow", "", "", "#C00000");
  addConnector(sheet, "edge_d61_17_OPERATION_O6_to_OPERATION_O1", shape_d61_OPERATION_O6, shape_d61_OPERATION_O1, false, false, "はい", "elbow", "left", "left", "#548235");
  addConnector(sheet, "edge_d61_18_OPERATION_O3_to_OPERATION_EVENT", shape_d61_OPERATION_O3, shape_d61_OPERATION_EVENT, true, false, "デバイス処理結果", "elbow", "right", "right", "#C65911");
  addConnector(sheet, "edge_d61_19_START_S1_to_START_S2", shape_d61_START_S1, shape_d61_START_S2, false, false, "", "elbow", "", "", "#548235");
  addConnector(sheet, "edge_d61_20_START_S2_to_START_S3", shape_d61_START_S2, shape_d61_START_S3, false, false, "", "elbow", "", "", "#548235");
  addConnector(sheet, "edge_d61_21_START_S3_to_START_S4", shape_d61_START_S3, shape_d61_START_S4, false, false, "", "elbow", "", "", "#548235");
  addConnector(sheet, "edge_d61_22_START_S4_to_START_S5", shape_d61_START_S4, shape_d61_START_S5, false, false, "はい", "elbow", "", "", "#548235");
  addConnector(sheet, "edge_d61_23_START_S4_to_START_START_ERROR", shape_d61_START_S4, shape_d61_START_START_ERROR, true, false, "いいえ", "elbow", "", "", "#C00000");

  configurePdfReview(workbook, sheet, anchor, canvasRowCount, canvasColumnCount, pdfReviewMode);
}

function addCellLaneTable(anchor: ExcelScript.Range, bodyEndRowOffset: number) {
  addLaneColumns(anchor, 0, 12, bodyEndRowOffset, "起動フェーズ", "#FFFFFF");
  addLaneColumns(anchor, 12, 12, bodyEndRowOffset, "デバイス操作フェーズ", "#FFFFFF");
  addLaneColumns(anchor, 24, 12, bodyEndRowOffset, "終了フェーズ", "#FFFFFF");
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

function isBranchConnectorLabel(text: string): boolean {
  return text === "はい" || text === "いいえ";
}

function connectorEndpointShapeIds(sourceId: string, edgeSourcePrefix: string, shapeSourcePrefix: string): string[] {
  if (sourceId.indexOf(edgeSourcePrefix) !== 0) {
    return [];
  }
  const suffix = sourceId.substring(edgeSourcePrefix.length);
  const numberSeparator = suffix.indexOf("_");
  if (numberSeparator < 0) {
    return [];
  }
  const route = suffix.substring(numberSeparator + 1);
  const routeSeparator = route.indexOf("_to_");
  if (routeSeparator < 0) {
    return [];
  }
  return [
    shapeSourcePrefix + route.substring(0, routeSeparator),
    shapeSourcePrefix + route.substring(routeSeparator + 4),
  ];
}

function branchConnectorLabelPositions(sourceBounds: number[], targetBounds: number[], width: number, height: number): number[][] {
  if (sourceBounds.length !== 4 || targetBounds.length !== 4) {
    return [];
  }
  const sourceCenterX = sourceBounds[0] + sourceBounds[2] / 2;
  const sourceCenterY = sourceBounds[1] + sourceBounds[3] / 2;
  const targetCenterX = targetBounds[0] + targetBounds[2] / 2;
  const targetCenterY = targetBounds[1] + targetBounds[3] / 2;
  const dx = targetCenterX - sourceCenterX;
  const dy = targetCenterY - sourceCenterY;
  if (Math.abs(dx) >= Math.abs(dy)) {
    const direction = dx >= 0 ? 1 : -1;
    const branchSide = Math.abs(dy) > 1 ? (dy >= 0 ? 1 : -1) : -1;
    const centerX = direction > 0
      ? sourceBounds[0] + sourceBounds[2] + width / 2 + 8
      : sourceBounds[0] - width / 2 - 8;
    const preferredCenterY = sourceCenterY + branchSide * (height / 2 + 7);
    const oppositeCenterY = sourceCenterY - branchSide * (height / 2 + 7);
    return [
      [centerX - width / 2, preferredCenterY - height / 2],
      [centerX - width / 2, oppositeCenterY - height / 2],
      [centerX - width / 2, sourceCenterY - height / 2],
      [centerX + direction * 18 - width / 2, preferredCenterY - height / 2],
    ];
  }
  const direction = dy >= 0 ? 1 : -1;
  const branchSide = Math.abs(dx) > 1 ? (dx >= 0 ? 1 : -1) : 1;
  const centerY = direction > 0
    ? sourceBounds[1] + sourceBounds[3] + height / 2 + 8
    : sourceBounds[1] - height / 2 - 8;
  const preferredCenterX = sourceCenterX + branchSide * (width / 2 + 7);
  const oppositeCenterX = sourceCenterX - branchSide * (width / 2 + 7);
  return [
    [preferredCenterX - width / 2, centerY - height / 2],
    [oppositeCenterX - width / 2, centerY - height / 2],
    [sourceCenterX - width / 2, centerY - height / 2],
    [preferredCenterX - width / 2, centerY + direction * 18 - height / 2],
  ];
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
