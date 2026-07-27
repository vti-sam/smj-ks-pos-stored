function main(workbook: ExcelScript.Workbook) {
  const anchorPosition = getRunAnchorPosition(workbook);
  const sheet = createRenderWorksheet(workbook, "06_運用シナリオ図");
  sheet.activate();
  const anchor = sheet.getCell(anchorPosition.rowIndex, anchorPosition.columnIndex);
  const originTop = anchor.getTop();
  const canvasColumnCount = 36;
  const baselineCanvasRowCount = 44;
  formatDiagramGrid(anchor, baselineCanvasRowCount, canvasColumnCount);

  const laneRange1 = getAnchoredRange(anchor, 0, 0, 1, 12);
  const laneRange2 = getAnchoredRange(anchor, 0, 12, 1, 12);
  const laneRange3 = getAnchoredRange(anchor, 0, 24, 1, 12);

  addCellLaneTable(anchor, baselineCanvasRowCount - 1);

  const shape_d61_OPERATION_O6 = addTextShape(sheet, "shape_d61_OPERATION_O6", "⑦ 運用を継続するか", 0, 0, 140, 52, 10, true, "#FFF2CC", 0, "#BF9000", 2, "#111111", true, "center", "diamond", false);
  setShapeAltText(shape_d61_OPERATION_O6, "⑦ 運用を継続するか", "");
  const shape_d61_STOP_T2 = addTextShape(sheet, "shape_d61_STOP_T2", "② 所有プロセスか", 0, 0, 140, 52, 10, true, "#FFF2CC", 0, "#BF9000", 2, "#111111", true, "center", "diamond", false);
  setShapeAltText(shape_d61_STOP_T2, "② 所有プロセスか", "");
  const shape_d61_STOP_T5 = addTextShape(sheet, "shape_d61_STOP_T5", "⑤ 10秒以内に\n終了したか", 0, 0, 140, 52, 10, true, "#FFF2CC", 0, "#BF9000", 2, "#111111", true, "center", "diamond", false);
  setShapeAltText(shape_d61_STOP_T5, "⑤ 10秒以内に 終了したか", "");
  const shape_d61_OPERATION_O4 = addTextShape(sheet, "shape_d61_OPERATION_O4", "④ 同期結果を\n確定できたか", 0, 0, 140, 52, 10, true, "#FFF2CC", 0, "#BF9000", 2, "#111111", true, "center", "diamond", false);
  setShapeAltText(shape_d61_OPERATION_O4, "④ 同期結果を 確定できたか", "");
  const shape_d61_START_S6 = addTextShape(sheet, "shape_d61_START_S6", "⑥ 起動準備が\n完了したか", 0, 0, 140, 52, 10, true, "#FFF2CC", 0, "#BF9000", 2, "#111111", true, "center", "diamond", false);
  setShapeAltText(shape_d61_START_S6, "⑥ 起動準備が 完了したか", "");
  const shape_d61_OPERATION_O3 = addTextShape(sheet, "shape_d61_OPERATION_O3", "③ 順序制御して\n対象デバイスを制御\n決済端末はOPOS CAT／OCXを利用", 0, 0, 170.025, 51, 10, true, "#FCE4D6", 0, "#ED7D31", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_OPERATION_O3, "③ 順序制御して 対象デバイスを制御 決済端末はOPOS CAT／OCXを利用", "");
  const shape_d61_START_S2 = addTextShape(sheet, "shape_d61_START_S2", "② 設定を準備\nランタイム設定 → デフォルト設定", 0, 0, 181.05, 36, 10, true, "#DDEBF7", 0, "#5B9BD5", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_START_S2, "② 設定を準備 ランタイム設定 → デフォルト設定", "");
  const shape_d61_START_S5 = addTextShape(sheet, "shape_d61_START_S5", "⑤ 通信・対象デバイスを準備", 0, 0, 154.275, 28, 10, true, "#FCE4D6", 0, "#ED7D31", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_START_S5, "⑤ 通信・対象デバイスを準備", "");
  const shape_d61_START_S3 = addTextShape(sheet, "shape_d61_START_S3", "③ 既存プロセスを確認し\n未起動時だけ起動", 0, 0, 133.275, 36, 10, true, "#DDEBF7", 0, "#5B9BD5", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_START_S3, "③ 既存プロセスを確認し 未起動時だけ起動", "");
  const shape_d61_STOP_T6 = addTextShape(sheet, "shape_d61_STOP_T6", "⑥ 所有プロセスツリーを\n強制終了", 0, 0, 133.275, 36, 10, true, "#F4CCCC", 0, "#C00000", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_STOP_T6, "⑥ 所有プロセスツリーを 強制終了", "");
  const shape_d61_STOP_T4 = addTextShape(sheet, "shape_d61_STOP_T4", "④ デバイスコネクタが\n接続とデバイスを停止", 0, 0, 122.775, 36, 10, true, "#FCE4D6", 0, "#ED7D31", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_STOP_T4, "④ デバイスコネクタが 接続とデバイスを停止", "");
  const shape_d61_START_S4 = addTextShape(sheet, "shape_d61_START_S4", "④ デバイスコネクタは\nMutexで二重起動防止", 0, 0, 122.775, 36, 10, true, "#FCE4D6", 0, "#ED7D31", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_START_S4, "④ デバイスコネクタは Mutexで二重起動防止", "");
  const shape_d61_OPERATION_COMM_ERROR = addTextShape(sheet, "shape_d61_OPERATION_COMM_ERROR", "⑥ 通信失敗を返却\n送信後は自動再送なし", 0, 0, 117, 36, 10, true, "#F4CCCC", 0, "#C00000", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_OPERATION_COMM_ERROR, "⑥ 通信失敗を返却 送信後は自動再送なし", "");
  const shape_d61_OPERATION_EVENT = addTextShape(sheet, "shape_d61_OPERATION_EVENT", "⑧ 非同期イベントを\nアプリへ通知", 0, 0, 112.275, 36, 10, true, "#FCE4D6", 0, "#ED7D31", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_OPERATION_EVENT, "⑧ 非同期イベントを アプリへ通知", "");
  const shape_d61_OPERATION_O2 = addTextShape(sheet, "shape_d61_OPERATION_O2", "② 接続を確認して\nコマンド要求を送信", 0, 0, 106.5, 36, 10, true, "#E2F0D9", 0, "#70AD47", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_OPERATION_O2, "② 接続を確認して コマンド要求を送信", "");
  const shape_d61_OPERATION_O5 = addTextShape(sheet, "shape_d61_OPERATION_O5", "⑤ 正常応答または\n失敗応答を返却", 0, 0, 101.775, 36, 10, true, "#E2F0D9", 0, "#70AD47", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_OPERATION_O5, "⑤ 正常応答または 失敗応答を返却", "");
  const shape_d61_START_START_ERROR = addTextShape(sheet, "shape_d61_START_START_ERROR", "⑧ 起動を中止して\n異常を記録", 0, 0, 101.775, 36, 10, true, "#F4CCCC", 0, "#C00000", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_START_START_ERROR, "⑧ 起動を中止して 異常を記録", "");
  const shape_d61_STOP_T1 = addTextShape(sheet, "shape_d61_STOP_T1", "① アプリ停止・強制終了", 0, 0, 133.275, 28, 10, true, "#DDEBF7", 0, "#5B9BD5", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_STOP_T1, "① アプリ停止・強制終了", "");
  const shape_d61_OPERATION_O1 = addTextShape(sheet, "shape_d61_OPERATION_O1", "① デバイス操作を依頼", 0, 0, 122.775, 28, 10, true, "#E2F0D9", 0, "#70AD47", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_OPERATION_O1, "① デバイス操作を依頼", "");
  const shape_d61_STOP_T3 = addTextShape(sheet, "shape_d61_STOP_T3", "③ 停止要求を送信", 0, 0, 101.775, 28, 10, true, "#DDEBF7", 0, "#5B9BD5", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_STOP_T3, "③ 停止要求を送信", "");
  const shape_d61_STOP_T7 = addTextShape(sheet, "shape_d61_STOP_T7", "⑦ 終了処理完了", 0, 0, 96, 28, 10, true, "#DDEBF7", 0, "#5B9BD5", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_STOP_T7, "⑦ 終了処理完了", "");
  const shape_d61_START_S1 = addTextShape(sheet, "shape_d61_START_S1", "① アプリ起動", 0, 0, 96, 28, 10, true, "#DDEBF7", 0, "#5B9BD5", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_START_S1, "① アプリ起動", "");
  const shape_d61_START_S7 = addTextShape(sheet, "shape_d61_START_S7", "⑦ 運用開始", 0, 0, 96, 28, 10, true, "#DDEBF7", 0, "#5B9BD5", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d61_START_S7, "⑦ 運用開始", "");

  let groupBottom1 = placeDiagramRow([shape_d61_START_S1], [0.48539], laneRange1.getLeft(), originTop + 90, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeDiagramRow([shape_d61_START_S2], [0.48539], laneRange1.getLeft(), groupBottom1 + 60, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeDiagramRow([shape_d61_START_S3], [0.48539], laneRange1.getLeft(), groupBottom1 + 60, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeDiagramRow([shape_d61_START_S4], [0.48539], laneRange1.getLeft(), groupBottom1 + 60, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeDiagramRow([shape_d61_START_S5], [0.48539], laneRange1.getLeft(), groupBottom1 + 60, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeDiagramRow([shape_d61_START_S6], [0.707522], laneRange1.getLeft(), groupBottom1 + 60, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeDiagramRow([shape_d61_START_S7, shape_d61_START_START_ERROR], [0.276272, 0.694508], laneRange1.getLeft(), groupBottom1 + 60, laneRange1.getWidth(), 30, 28);
  let groupBottom2 = placeDiagramRow([shape_d61_OPERATION_O1], [0.619554], laneRange2.getLeft(), originTop + 90, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeDiagramRow([shape_d61_OPERATION_O2], [0.510595], laneRange2.getLeft(), groupBottom2 + 60, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeDiagramRow([shape_d61_OPERATION_O3], [0.510595], laneRange2.getLeft(), groupBottom2 + 60, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeDiagramRow([shape_d61_OPERATION_O4], [0.491606], laneRange2.getLeft(), groupBottom2 + 60, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeDiagramRow([shape_d61_OPERATION_EVENT], [0.67995], laneRange2.getLeft(), groupBottom2 + 60, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeDiagramRow([shape_d61_OPERATION_O5, shape_d61_OPERATION_COMM_ERROR], [0.191779, 0.513076], laneRange2.getLeft(), groupBottom2 + 60, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeDiagramRow([shape_d61_OPERATION_O6], [0.754385], laneRange2.getLeft(), groupBottom2 + 60, laneRange2.getWidth(), 30, 28);
  let groupBottom3 = placeDiagramRow([shape_d61_STOP_T1], [0.403086], laneRange3.getLeft(), originTop + 90, laneRange3.getWidth(), 30, 28);
  groupBottom3 = placeDiagramRow([shape_d61_STOP_T2], [0.614277], laneRange3.getLeft(), groupBottom3 + 60, laneRange3.getWidth(), 30, 28);
  groupBottom3 = placeDiagramRow([shape_d61_STOP_T3], [0.5402], laneRange3.getLeft(), groupBottom3 + 60, laneRange3.getWidth(), 30, 28);
  groupBottom3 = placeDiagramRow([shape_d61_STOP_T4], [0.5402], laneRange3.getLeft(), groupBottom3 + 60, laneRange3.getWidth(), 30, 28);
  groupBottom3 = placeDiagramRow([shape_d61_STOP_T5], [0.743231], laneRange3.getLeft(), groupBottom3 + 60, laneRange3.getWidth(), 30, 28);
  groupBottom3 = placeDiagramRow([shape_d61_STOP_T6], [0.705433], laneRange3.getLeft(), groupBottom3 + 60, laneRange3.getWidth(), 30, 28);
  groupBottom3 = placeDiagramRow([shape_d61_STOP_T7], [0.403086], laneRange3.getLeft(), groupBottom3 + 60, laneRange3.getWidth(), 30, 28);

  const diagramBottom = Math.max(originTop + 90, groupBottom1, groupBottom2, groupBottom3);
  const bodyEndRowOffset = Math.max(11, Math.ceil((diagramBottom - originTop + 48) / 18) - 1);
  const canvasRowCount = Math.max(baselineCanvasRowCount, bodyEndRowOffset + 1);
  formatDiagramGrid(anchor, canvasRowCount, canvasColumnCount);
  if (bodyEndRowOffset >= baselineCanvasRowCount) {
    addCellLaneTable(anchor, bodyEndRowOffset);
  }

  const edge_d61_01_OPERATION_O6_to_STOP_T1 = addConnector(sheet, "edge_d61_01_OPERATION_O6_to_STOP_T1", shape_d61_OPERATION_O6, shape_d61_STOP_T1, false, false, "いいえ", "いいえ", "elbow", "right", "left", "#548235", 2);
  const edge_d61_02_START_S7_to_OPERATION_O1 = addConnector(sheet, "edge_d61_02_START_S7_to_OPERATION_O1", shape_d61_START_S7, shape_d61_OPERATION_O1, false, false, "⑦ 運用開始 → ① デバイス操作を依頼", "", "elbow", "right", "left", "#548235", 2);
  const edge_d61_03_STOP_T1_to_STOP_T2 = addConnector(sheet, "edge_d61_03_STOP_T1_to_STOP_T2", shape_d61_STOP_T1, shape_d61_STOP_T2, false, false, "① アプリ停止・強制終了 → ② 所有プロセスか", "", "elbow", "", "", "#548235", 2);
  const edge_d61_04_STOP_T2_to_STOP_T7 = addConnector(sheet, "edge_d61_04_STOP_T2_to_STOP_T7", shape_d61_STOP_T2, shape_d61_STOP_T7, false, false, "いいえ", "いいえ", "elbow", "left", "left", "#548235", 2);
  const edge_d61_05_STOP_T2_to_STOP_T3 = addConnector(sheet, "edge_d61_05_STOP_T2_to_STOP_T3", shape_d61_STOP_T2, shape_d61_STOP_T3, false, false, "はい", "はい", "elbow", "", "", "#548235", 2);
  const edge_d61_06_STOP_T3_to_STOP_T4 = addConnector(sheet, "edge_d61_06_STOP_T3_to_STOP_T4", shape_d61_STOP_T3, shape_d61_STOP_T4, false, false, "③ 停止要求を送信 → ④ デバイスコネクタが", "", "elbow", "", "", "#548235", 2);
  const edge_d61_07_STOP_T4_to_STOP_T5 = addConnector(sheet, "edge_d61_07_STOP_T4_to_STOP_T5", shape_d61_STOP_T4, shape_d61_STOP_T5, false, false, "④ デバイスコネクタが → ⑤ 10秒以内に", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d61_08_STOP_T5_to_STOP_T7 = addConnector(sheet, "edge_d61_08_STOP_T5_to_STOP_T7", shape_d61_STOP_T5, shape_d61_STOP_T7, false, false, "はい", "はい", "elbow", "right", "right", "#1F4E79", 2);
  const edge_d61_09_STOP_T5_to_STOP_T6 = addConnector(sheet, "edge_d61_09_STOP_T5_to_STOP_T6", shape_d61_STOP_T5, shape_d61_STOP_T6, true, false, "いいえ", "いいえ", "elbow", "", "", "#C00000", 2);
  const edge_d61_10_STOP_T6_to_STOP_T7 = addConnector(sheet, "edge_d61_10_STOP_T6_to_STOP_T7", shape_d61_STOP_T6, shape_d61_STOP_T7, false, false, "⑥ 所有プロセスツリーを → ⑦ 終了処理完了", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d61_11_OPERATION_O1_to_OPERATION_O2 = addConnector(sheet, "edge_d61_11_OPERATION_O1_to_OPERATION_O2", shape_d61_OPERATION_O1, shape_d61_OPERATION_O2, false, false, "① デバイス操作を依頼 → ② 接続を確認して", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d61_12_OPERATION_O2_to_OPERATION_O3 = addConnector(sheet, "edge_d61_12_OPERATION_O2_to_OPERATION_O3", shape_d61_OPERATION_O2, shape_d61_OPERATION_O3, false, false, "② 接続を確認して → ③ 順序制御して", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d61_13_OPERATION_O3_to_OPERATION_O4 = addConnector(sheet, "edge_d61_13_OPERATION_O3_to_OPERATION_O4", shape_d61_OPERATION_O3, shape_d61_OPERATION_O4, false, false, "③ 順序制御して → ④ 同期結果を", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d61_14_OPERATION_O4_to_OPERATION_O5 = addConnector(sheet, "edge_d61_14_OPERATION_O4_to_OPERATION_O5", shape_d61_OPERATION_O4, shape_d61_OPERATION_O5, false, false, "はい", "はい", "elbow", "left", "left", "#1F4E79", 2);
  const edge_d61_15_OPERATION_O5_to_OPERATION_O6 = addConnector(sheet, "edge_d61_15_OPERATION_O5_to_OPERATION_O6", shape_d61_OPERATION_O5, shape_d61_OPERATION_O6, false, false, "⑤ 正常応答または → ⑦ 運用を継続するか", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d61_16_OPERATION_O4_to_OPERATION_COMM_ERROR = addConnector(sheet, "edge_d61_16_OPERATION_O4_to_OPERATION_COMM_ERROR", shape_d61_OPERATION_O4, shape_d61_OPERATION_COMM_ERROR, true, false, "いいえ", "いいえ", "elbow", "right", "right", "#C65911", 2);
  const edge_d61_17_OPERATION_COMM_ERROR_to_OPERATION_O6 = addConnector(sheet, "edge_d61_17_OPERATION_COMM_ERROR_to_OPERATION_O6", shape_d61_OPERATION_COMM_ERROR, shape_d61_OPERATION_O6, false, false, "⑥ 通信失敗を返却 → ⑦ 運用を継続するか", "", "elbow", "", "", "#548235", 2);
  const edge_d61_18_OPERATION_O6_to_OPERATION_O1 = addConnector(sheet, "edge_d61_18_OPERATION_O6_to_OPERATION_O1", shape_d61_OPERATION_O6, shape_d61_OPERATION_O1, false, false, "はい", "はい", "elbow", "left", "left", "#548235", 2);
  const edge_d61_19_OPERATION_O3_to_OPERATION_EVENT = addConnector(sheet, "edge_d61_19_OPERATION_O3_to_OPERATION_EVENT", shape_d61_OPERATION_O3, shape_d61_OPERATION_EVENT, false, false, "デバイス処理結果", "デバイス処理結果", "elbow", "right", "right", "#548235", 2);
  const edge_d61_20_START_S1_to_START_S2 = addConnector(sheet, "edge_d61_20_START_S1_to_START_S2", shape_d61_START_S1, shape_d61_START_S2, false, false, "① アプリ起動 → ② 設定を準備", "", "elbow", "", "", "#548235", 2);
  const edge_d61_21_START_S2_to_START_S3 = addConnector(sheet, "edge_d61_21_START_S2_to_START_S3", shape_d61_START_S2, shape_d61_START_S3, false, false, "② 設定を準備 → ③ 既存プロセスを確認し", "", "elbow", "", "", "#548235", 2);
  const edge_d61_22_START_S3_to_START_S4 = addConnector(sheet, "edge_d61_22_START_S3_to_START_S4", shape_d61_START_S3, shape_d61_START_S4, false, false, "③ 既存プロセスを確認し → ④ デバイスコネクタは", "", "elbow", "", "", "#548235", 2);
  const edge_d61_23_START_S4_to_START_S5 = addConnector(sheet, "edge_d61_23_START_S4_to_START_S5", shape_d61_START_S4, shape_d61_START_S5, false, false, "④ デバイスコネクタは → ⑤ 通信・対象デバイスを準備", "", "elbow", "", "", "#1F4E79", 2);
  const edge_d61_24_START_S5_to_START_S6 = addConnector(sheet, "edge_d61_24_START_S5_to_START_S6", shape_d61_START_S5, shape_d61_START_S6, false, false, "⑤ 通信・対象デバイスを準備 → ⑥ 起動準備が", "", "elbow", "", "", "#548235", 2);
  const edge_d61_25_START_S6_to_START_S7 = addConnector(sheet, "edge_d61_25_START_S6_to_START_S7", shape_d61_START_S6, shape_d61_START_S7, false, false, "はい", "はい", "elbow", "", "", "#548235", 2);
  const edge_d61_26_START_S6_to_START_START_ERROR = addConnector(sheet, "edge_d61_26_START_S6_to_START_START_ERROR", shape_d61_START_S6, shape_d61_START_START_ERROR, false, false, "いいえ", "いいえ", "elbow", "", "", "#548235", 2);

  configurePdfReview(workbook, sheet, anchor, canvasRowCount, canvasColumnCount, false);
}

function addCellLaneTable(anchor: ExcelScript.Range, bodyEndRowOffset: number) {
  addLaneColumns(anchor, 0, 12, bodyEndRowOffset, "（1） 起動フェーズ", "#FFFFFF", 0, "#4472C4", 2, "#111111");
  addLaneColumns(anchor, 12, 12, bodyEndRowOffset, "（2） デバイス操作フェーズ", "#FFFFFF", 0, "#4472C4", 2, "#111111");
  addLaneColumns(anchor, 24, 12, bodyEndRowOffset, "（3） 終了フェーズ", "#FFFFFF", 0, "#4472C4", 2, "#111111");
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

function addSectionBackground(sheet: ExcelScript.Worksheet, shapeName: string, title: string, members: ExcelScript.Shape[], laneLeft: number, laneWidth: number, fill: string, fillTransparency: number, stroke: string, lineWeight: number, textColor: string) {
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
  background.setTop(Math.max(0, top - titlePadding));
  background.setWidth(Math.max(1, laneWidth - sidePadding * 2));
  background.setHeight(Math.max(28, bottom - top + titlePadding + bottomPadding));
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

function placeDiagramRow(shapes: ExcelScript.Shape[], ratios: number[], laneLeft: number, rowTop: number, laneWidth: number, inset: number, gap: number): number {
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
