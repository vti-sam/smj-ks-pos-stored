// Generated from Markdown: EX-DEVICE-01_次世代POS_デバイス制御実装例集.md
// Source contract SHA-256: 6165cc00adf077bfeecfdea5895e4b582aedfe5e8a25554d855027d324a6e140
// Generated output; do not edit. Change Markdown or the owning renderer and regenerate both scripts.

function main(workbook: ExcelScript.Workbook) {
  const anchorPosition = getRunAnchorPosition(workbook);
  const sheet = createRenderWorksheet(workbook, "05_共通利用フロー_01");
  sheet.activate();
  const anchor = sheet.getCell(anchorPosition.rowIndex, anchorPosition.columnIndex);
  const originTop = anchor.getTop();
  const canvasColumnCount = 77;
  const baselineCanvasRowCount = 15;
  formatDiagramGrid(anchor, baselineCanvasRowCount, canvasColumnCount);

  const laneRange1 = getAnchoredRange(anchor, 0, 0, 1, 22);
  const laneRange2 = getAnchoredRange(anchor, 0, 22, 1, 17);
  const laneRange3 = getAnchoredRange(anchor, 0, 39, 1, 17);
  const laneRange4 = getAnchoredRange(anchor, 0, 56, 1, 14);
  const laneRange5 = getAnchoredRange(anchor, 0, 70, 1, 7);

  addCellLaneTable(anchor, baselineCanvasRowCount - 1);

  const shape_d51_PREPARE_PREPARE_EXISTS = addTextShape(sheet, "shape_d51_PREPARE_PREPARE_EXISTS", "④ ストラテジーがあるか", 0, 0, 157.2645, 52, 10, true, "#FFF2CC", 0, "#BF9000", 2, "#111111", true, "center", "diamond", false);
  setShapeAltText(shape_d51_PREPARE_PREPARE_EXISTS, "④ ストラテジーがあるか", "");
  const shape_d51_FINISH_FINISH_ERROR = addTextShape(sheet, "shape_d51_FINISH_FINISH_ERROR", "③ 操作エラーがあるか", 0, 0, 144.8745, 52, 10, true, "#FFF2CC", 0, "#BF9000", 2, "#111111", true, "center", "diamond", false);
  setShapeAltText(shape_d51_FINISH_FINISH_ERROR, "③ 操作エラーがあるか", "");
  const shape_d51_START_PHASE_START_OK = addTextShape(sheet, "shape_d51_START_PHASE_START_OK", "③ Startが成功したか", 0, 0, 141.777, 52, 10, true, "#FFF2CC", 0, "#BF9000", 2, "#111111", true, "center", "diamond", false);
  setShapeAltText(shape_d51_START_PHASE_START_OK, "③ Startが成功したか", "");
  const shape_d51_DEVICE_ACTION_ACTION_OK = addTextShape(sheet, "shape_d51_DEVICE_ACTION_ACTION_OK", "③ 結果が有効か", 0, 0, 140, 52, 10, true, "#FFF2CC", 0, "#BF9000", 2, "#111111", true, "center", "diamond", false);
  setShapeAltText(shape_d51_DEVICE_ACTION_ACTION_OK, "③ 結果が有効か", "");
  const shape_d51_RESULT_RESULT_SUCCESS = addTextShape(sheet, "shape_d51_RESULT_RESULT_SUCCESS", "① 結果をユースケースへ返す", 0, 0, 154.275, 28, 10, true, "#DDEBF7", 0, "#5B9BD5", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d51_RESULT_RESULT_SUCCESS, "① 結果をユースケースへ返す", "");
  const shape_d51_PREPARE_PREPARE_SELECT = addTextShape(sheet, "shape_d51_PREPARE_PREPARE_SELECT", "③ 有効デバイスを選択し\nストラテジーを生成する", 0, 0, 133.275, 36, 10, true, "#E2F0D9", 0, "#70AD47", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d51_PREPARE_PREPARE_SELECT, "③ 有効デバイスを選択し ストラテジーを生成する", "");
  const shape_d51_PREPARE_PREPARE_UNAVAILABLE = addTextShape(sheet, "shape_d51_PREPARE_PREPARE_UNAVAILABLE", "⑤ デバイスなしの分岐で\n処理を終了する", 0, 0, 133.275, 36, 10, true, "#F4CCCC", 0, "#C00000", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d51_PREPARE_PREPARE_UNAVAILABLE, "⑤ デバイスなしの分岐で 処理を終了する", "");
  const shape_d51_DEVICE_ACTION_ACTION_EXECUTE = addTextShape(sheet, "shape_d51_DEVICE_ACTION_ACTION_EXECUTE", "② プラットフォーム別の\n処理を実行する", 0, 0, 133.275, 36, 10, true, "#E2F0D9", 0, "#70AD47", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d51_DEVICE_ACTION_ACTION_EXECUTE, "② プラットフォーム別の 処理を実行する", "");
  const shape_d51_START_PHASE_START_ERROR = addTextShape(sheet, "shape_d51_START_PHASE_START_ERROR", "④ Start失敗の分岐で\n処理を終了する", 0, 0, 120.15, 36, 10, true, "#F4CCCC", 0, "#C00000", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d51_START_PHASE_START_ERROR, "④ Start失敗の分岐で 処理を終了する", "");
  const shape_d51_FINISH_FINISH_DEVICE = addTextShape(sheet, "shape_d51_FINISH_FINISH_DEVICE", "② 処理を終了または\nリソースを解放する", 0, 0, 112.275, 36, 10, true, "#E2F0D9", 0, "#70AD47", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d51_FINISH_FINISH_DEVICE, "② 処理を終了または リソースを解放する", "");
  const shape_d51_START_PHASE_START_DEVICE = addTextShape(sheet, "shape_d51_START_PHASE_START_DEVICE", "② デバイスを初期化\nまたは接続する", 0, 0, 112.275, 36, 10, true, "#E2F0D9", 0, "#70AD47", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d51_START_PHASE_START_DEVICE, "② デバイスを初期化 または接続する", "");
  const shape_d51_PREPARE_PREPARE_GET = addTextShape(sheet, "shape_d51_PREPARE_PREPARE_GET", "② ストラテジーを要求する", 0, 0, 143.775, 28, 10, true, "#DDEBF7", 0, "#5B9BD5", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d51_PREPARE_PREPARE_GET, "② ストラテジーを要求する", "");
  const shape_d51_RESULT_RESULT_FAILURE = addTextShape(sheet, "shape_d51_RESULT_RESULT_FAILURE", "② エラーを業務処理へ渡す", 0, 0, 143.775, 28, 10, true, "#F4CCCC", 0, "#C00000", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d51_RESULT_RESULT_FAILURE, "② エラーを業務処理へ渡す", "");
  const shape_d51_DEVICE_ACTION_ACTION_CALL = addTextShape(sheet, "shape_d51_DEVICE_ACTION_ACTION_CALL", "① デバイス操作を呼び出す", 0, 0, 143.775, 28, 10, true, "#DDEBF7", 0, "#5B9BD5", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d51_DEVICE_ACTION_ACTION_CALL, "① デバイス操作を呼び出す", "");
  const shape_d51_FINISH_FINISH_CALL = addTextShape(sheet, "shape_d51_FINISH_FINISH_CALL", "① finallyでEndを呼び出す", 0, 0, 149.025, 28, 10, true, "#DDEBF7", 0, "#5B9BD5", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d51_FINISH_FINISH_CALL, "① finallyでEndを呼び出す", "");
  const shape_d51_PREPARE_PREPARE_REQUEST = addTextShape(sheet, "shape_d51_PREPARE_PREPARE_REQUEST", "① 業務要求を受け付ける", 0, 0, 133.275, 28, 10, true, "#DDEBF7", 0, "#5B9BD5", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d51_PREPARE_PREPARE_REQUEST, "① 業務要求を受け付ける", "");
  const shape_d51_DEVICE_ACTION_ACTION_ERROR = addTextShape(sheet, "shape_d51_DEVICE_ACTION_ACTION_ERROR", "④ 操作エラーを記録する", 0, 0, 133.275, 28, 10, true, "#DDEBF7", 0, "#5B9BD5", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d51_DEVICE_ACTION_ACTION_ERROR, "④ 操作エラーを記録する", "");
  const shape_d51_START_PHASE_START_CALL = addTextShape(sheet, "shape_d51_START_PHASE_START_CALL", "① Startを呼び出す", 0, 0, 109.65, 28, 10, true, "#DDEBF7", 0, "#5B9BD5", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d51_START_PHASE_START_CALL, "① Startを呼び出す", "");
  const shape_d51_RESULT_RESULT_COMPLETE = addTextShape(sheet, "shape_d51_RESULT_RESULT_COMPLETE", "③ 完了", 0, 0, 96, 28, 10, true, "#DDEBF7", 0, "#5B9BD5", 2, "#111111", true, "center", "rectangle", false);
  setShapeAltText(shape_d51_RESULT_RESULT_COMPLETE, "③ 完了", "");

  const geometryBottom = placeMermaidGeometry([shape_d51_PREPARE_PREPARE_EXISTS, shape_d51_FINISH_FINISH_ERROR, shape_d51_START_PHASE_START_OK, shape_d51_DEVICE_ACTION_ACTION_OK, shape_d51_RESULT_RESULT_SUCCESS, shape_d51_PREPARE_PREPARE_SELECT, shape_d51_PREPARE_PREPARE_UNAVAILABLE, shape_d51_DEVICE_ACTION_ACTION_EXECUTE, shape_d51_START_PHASE_START_ERROR, shape_d51_FINISH_FINISH_DEVICE, shape_d51_START_PHASE_START_DEVICE, shape_d51_PREPARE_PREPARE_GET, shape_d51_RESULT_RESULT_FAILURE, shape_d51_DEVICE_ACTION_ACTION_CALL, shape_d51_FINISH_FINISH_CALL, shape_d51_PREPARE_PREPARE_REQUEST, shape_d51_DEVICE_ACTION_ACTION_ERROR, shape_d51_START_PHASE_START_CALL, shape_d51_RESULT_RESULT_COMPLETE], [580.240745, 2424.399241, 1184.650558, 1816.27489, 2597.1375, 372.732369, 704.833834, 1641.55796, 1313.342577, 2233.1625, 1000.198668, 219.746979, 2597.1375, 1475.8875, 2090.5125, 66.6375, 1928.182908, 846.825, 2718.268113], [74, 74, 74, 74, 62, 134.159016, 145.431076, 148.61135, 183.558338, 130.060085, 162.060967, 134.159016, 123.590039, 148.61135, 130.060085, 134.159016, 168.699714, 162.060967, 218.333784], anchor.getLeft(), originTop);

  const diagramBottom = Math.max(originTop + 48, geometryBottom);
  const bodyEndRowOffset = Math.max(11, Math.ceil((diagramBottom - originTop + 24) / 18) - 1);
  const canvasRowCount = Math.max(baselineCanvasRowCount, bodyEndRowOffset + 1);
  formatDiagramGrid(anchor, canvasRowCount, canvasColumnCount);
  if (bodyEndRowOffset >= baselineCanvasRowCount) {
    addCellLaneTable(anchor, bodyEndRowOffset);
  }

  const edge_d51_01_PREPARE_PREPARE_REQUEST_to_PREPARE_PREPARE_GET = addConnector(sheet, "edge_d51_01_PREPARE_PREPARE_REQUEST_to_PREPARE_PREPARE_GET", shape_d51_PREPARE_PREPARE_REQUEST, shape_d51_PREPARE_PREPARE_GET, false, false, "① 業務要求を受け付ける → ② ストラテジーを要求する", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d51_02_PREPARE_PREPARE_GET_to_PREPARE_PREPARE_SELECT = addConnector(sheet, "edge_d51_02_PREPARE_PREPARE_GET_to_PREPARE_PREPARE_SELECT", shape_d51_PREPARE_PREPARE_GET, shape_d51_PREPARE_PREPARE_SELECT, false, false, "② ストラテジーを要求する → ③ 有効デバイスを選択し", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d51_03_PREPARE_PREPARE_SELECT_to_PREPARE_PREPARE_EXISTS = addConnector(sheet, "edge_d51_03_PREPARE_PREPARE_SELECT_to_PREPARE_PREPARE_EXISTS", shape_d51_PREPARE_PREPARE_SELECT, shape_d51_PREPARE_PREPARE_EXISTS, false, false, "③ 有効デバイスを選択し → ④ ストラテジーがあるか", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d51_04_PREPARE_PREPARE_EXISTS_to_START_PHASE_START_CALL = addConnector(sheet, "edge_d51_04_PREPARE_PREPARE_EXISTS_to_START_PHASE_START_CALL", shape_d51_PREPARE_PREPARE_EXISTS, shape_d51_START_PHASE_START_CALL, false, false, "はい", "はい", "elbow", "right", "left", "#1F4E79", 2);
  const edge_d51_05_PREPARE_PREPARE_EXISTS_to_PREPARE_PREPARE_UNAVAILABLE = addConnector(sheet, "edge_d51_05_PREPARE_PREPARE_EXISTS_to_PREPARE_PREPARE_UNAVAILABLE", shape_d51_PREPARE_PREPARE_EXISTS, shape_d51_PREPARE_PREPARE_UNAVAILABLE, false, false, "いいえ", "いいえ", "elbow", "", "", "#1F4E79", 2);
  const edge_d51_06_PREPARE_PREPARE_UNAVAILABLE_to_RESULT_RESULT_COMPLETE = addConnector(sheet, "edge_d51_06_PREPARE_PREPARE_UNAVAILABLE_to_RESULT_RESULT_COMPLETE", shape_d51_PREPARE_PREPARE_UNAVAILABLE, shape_d51_RESULT_RESULT_COMPLETE, false, false, "⑤ デバイスなしの分岐で → ③ 完了", "", "elbow", "right", "left", "#1F4E79", 2);
  const edge_d51_07_START_PHASE_START_CALL_to_START_PHASE_START_DEVICE = addConnector(sheet, "edge_d51_07_START_PHASE_START_CALL_to_START_PHASE_START_DEVICE", shape_d51_START_PHASE_START_CALL, shape_d51_START_PHASE_START_DEVICE, false, false, "① Startを呼び出す → ② デバイスを初期化", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d51_08_START_PHASE_START_DEVICE_to_START_PHASE_START_OK = addConnector(sheet, "edge_d51_08_START_PHASE_START_DEVICE_to_START_PHASE_START_OK", shape_d51_START_PHASE_START_DEVICE, shape_d51_START_PHASE_START_OK, false, false, "② デバイスを初期化 → ③ Startが成功したか", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d51_09_START_PHASE_START_OK_to_DEVICE_ACTION_ACTION_CALL = addConnector(sheet, "edge_d51_09_START_PHASE_START_OK_to_DEVICE_ACTION_ACTION_CALL", shape_d51_START_PHASE_START_OK, shape_d51_DEVICE_ACTION_ACTION_CALL, false, false, "はい", "はい", "elbow", "right", "left", "#1F4E79", 2);
  const edge_d51_10_START_PHASE_START_OK_to_START_PHASE_START_ERROR = addConnector(sheet, "edge_d51_10_START_PHASE_START_OK_to_START_PHASE_START_ERROR", shape_d51_START_PHASE_START_OK, shape_d51_START_PHASE_START_ERROR, false, false, "いいえ", "いいえ", "elbow", "left", "left", "#1F4E79", 2);
  const edge_d51_11_START_PHASE_START_DEVICE_to_START_PHASE_START_ERROR = addConnector(sheet, "edge_d51_11_START_PHASE_START_DEVICE_to_START_PHASE_START_ERROR", shape_d51_START_PHASE_START_DEVICE, shape_d51_START_PHASE_START_ERROR, true, false, "② デバイスを初期化 → ④ Start失敗の分岐で", "", "elbow", "", "", "#C00000", 2);
  const edge_d51_12_START_PHASE_START_ERROR_to_RESULT_RESULT_COMPLETE = addConnector(sheet, "edge_d51_12_START_PHASE_START_ERROR_to_RESULT_RESULT_COMPLETE", shape_d51_START_PHASE_START_ERROR, shape_d51_RESULT_RESULT_COMPLETE, false, false, "④ Start失敗の分岐で → ③ 完了", "", "elbow", "right", "left", "#1F4E79", 2);
  const edge_d51_13_DEVICE_ACTION_ACTION_CALL_to_DEVICE_ACTION_ACTION_EXECUTE = addConnector(sheet, "edge_d51_13_DEVICE_ACTION_ACTION_CALL_to_DEVICE_ACTION_ACTION_EXECUTE", shape_d51_DEVICE_ACTION_ACTION_CALL, shape_d51_DEVICE_ACTION_ACTION_EXECUTE, false, false, "① デバイス操作を呼び出す → ② プラットフォーム別の", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d51_14_DEVICE_ACTION_ACTION_EXECUTE_to_DEVICE_ACTION_ACTION_OK = addConnector(sheet, "edge_d51_14_DEVICE_ACTION_ACTION_EXECUTE_to_DEVICE_ACTION_ACTION_OK", shape_d51_DEVICE_ACTION_ACTION_EXECUTE, shape_d51_DEVICE_ACTION_ACTION_OK, false, false, "② プラットフォーム別の → ③ 結果が有効か", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d51_15_DEVICE_ACTION_ACTION_OK_to_FINISH_FINISH_CALL = addConnector(sheet, "edge_d51_15_DEVICE_ACTION_ACTION_OK_to_FINISH_FINISH_CALL", shape_d51_DEVICE_ACTION_ACTION_OK, shape_d51_FINISH_FINISH_CALL, false, false, "はい", "はい", "elbow", "right", "left", "#1F4E79", 2);
  const edge_d51_16_DEVICE_ACTION_ACTION_OK_to_DEVICE_ACTION_ACTION_ERROR = addConnector(sheet, "edge_d51_16_DEVICE_ACTION_ACTION_OK_to_DEVICE_ACTION_ACTION_ERROR", shape_d51_DEVICE_ACTION_ACTION_OK, shape_d51_DEVICE_ACTION_ACTION_ERROR, false, false, "いいえ", "いいえ", "elbow", "left", "left", "#1F4E79", 2);
  const edge_d51_17_DEVICE_ACTION_ACTION_EXECUTE_to_DEVICE_ACTION_ACTION_ERROR = addConnector(sheet, "edge_d51_17_DEVICE_ACTION_ACTION_EXECUTE_to_DEVICE_ACTION_ACTION_ERROR", shape_d51_DEVICE_ACTION_ACTION_EXECUTE, shape_d51_DEVICE_ACTION_ACTION_ERROR, true, false, "② プラットフォーム別の → ④ 操作エラーを記録する", "", "elbow", "", "", "#C00000", 2);
  const edge_d51_18_DEVICE_ACTION_ACTION_ERROR_to_FINISH_FINISH_CALL = addConnector(sheet, "edge_d51_18_DEVICE_ACTION_ACTION_ERROR_to_FINISH_FINISH_CALL", shape_d51_DEVICE_ACTION_ACTION_ERROR, shape_d51_FINISH_FINISH_CALL, false, false, "④ 操作エラーを記録する → ① finallyでEndを呼び出す", "", "elbow", "right", "left", "#1F4E79", 2);
  const edge_d51_19_FINISH_FINISH_CALL_to_FINISH_FINISH_DEVICE = addConnector(sheet, "edge_d51_19_FINISH_FINISH_CALL_to_FINISH_FINISH_DEVICE", shape_d51_FINISH_FINISH_CALL, shape_d51_FINISH_FINISH_DEVICE, false, false, "① finallyでEndを呼び出す → ② 処理を終了または", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d51_20_FINISH_FINISH_DEVICE_to_FINISH_FINISH_ERROR = addConnector(sheet, "edge_d51_20_FINISH_FINISH_DEVICE_to_FINISH_FINISH_ERROR", shape_d51_FINISH_FINISH_DEVICE, shape_d51_FINISH_FINISH_ERROR, false, false, "② 処理を終了または → ③ 操作エラーがあるか", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d51_21_FINISH_FINISH_ERROR_to_RESULT_RESULT_SUCCESS = addConnector(sheet, "edge_d51_21_FINISH_FINISH_ERROR_to_RESULT_RESULT_SUCCESS", shape_d51_FINISH_FINISH_ERROR, shape_d51_RESULT_RESULT_SUCCESS, false, false, "いいえ", "いいえ", "elbow", "right", "left", "#1F4E79", 2);
  const edge_d51_22_FINISH_FINISH_ERROR_to_RESULT_RESULT_FAILURE = addConnector(sheet, "edge_d51_22_FINISH_FINISH_ERROR_to_RESULT_RESULT_FAILURE", shape_d51_FINISH_FINISH_ERROR, shape_d51_RESULT_RESULT_FAILURE, false, false, "はい", "はい", "elbow", "right", "left", "#1F4E79", 2);
  const edge_d51_23_RESULT_RESULT_SUCCESS_to_RESULT_RESULT_COMPLETE = addConnector(sheet, "edge_d51_23_RESULT_RESULT_SUCCESS_to_RESULT_RESULT_COMPLETE", shape_d51_RESULT_RESULT_SUCCESS, shape_d51_RESULT_RESULT_COMPLETE, false, false, "① 結果をユースケースへ返す → ③ 完了", "", "elbow", "left", "left", "#1F4E79", 2);
  const edge_d51_24_RESULT_RESULT_FAILURE_to_RESULT_RESULT_COMPLETE = addConnector(sheet, "edge_d51_24_RESULT_RESULT_FAILURE_to_RESULT_RESULT_COMPLETE", shape_d51_RESULT_RESULT_FAILURE, shape_d51_RESULT_RESULT_COMPLETE, false, false, "② エラーを業務処理へ渡す → ③ 完了", "", "elbow", "", "", "#1F4E79", 2);

  configurePdfReview(workbook, sheet, anchor, canvasRowCount, canvasColumnCount, false);
}

function addCellLaneTable(anchor: ExcelScript.Range, bodyEndRowOffset: number) {
  addLaneColumns(anchor, 0, 22, bodyEndRowOffset, "（1） 準備", "", 1, "#4472C4", 2, "#111111");
  addLaneColumns(anchor, 22, 17, bodyEndRowOffset, "（2） 開始", "", 1, "#4472C4", 2, "#111111");
  addLaneColumns(anchor, 39, 17, bodyEndRowOffset, "（3） デバイス操作", "", 1, "#4472C4", 2, "#111111");
  addLaneColumns(anchor, 56, 14, bodyEndRowOffset, "（4） 終了", "", 1, "#4472C4", 2, "#111111");
  addLaneColumns(anchor, 70, 7, bodyEndRowOffset, "（5） 結果返却", "", 1, "#4472C4", 2, "#111111");
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

function addSectionBackground(sheet: ExcelScript.Worksheet, shapeName: string, title: string, members: ExcelScript.Shape[], laneLeft: number, laneWidth: number, ancestorTitlePadding: number, fill: string, fillTransparency: number, stroke: string, lineWeight: number, textColor: string) {
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
  background.setTop(Math.max(0, top - titlePadding - ancestorTitlePadding));
  background.setWidth(Math.max(1, laneWidth - sidePadding * 2));
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
