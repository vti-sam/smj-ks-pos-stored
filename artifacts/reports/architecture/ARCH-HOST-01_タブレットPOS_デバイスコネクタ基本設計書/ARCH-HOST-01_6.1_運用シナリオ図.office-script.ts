function main(workbook: ExcelScript.Workbook, sheetName: string = "06_運用シナリオ_01", anchorAddress: string = "B7", pdfReviewMode: boolean = false) {
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
  const canvasColumnCount = 36;
  const baselineCanvasRowCount = 43;
  const canvasRange = getAnchoredRange(anchor, 0, 0, baselineCanvasRowCount, canvasColumnCount);
  unmergeLaneRange(canvasRange);
  canvasRange.clear(ExcelScript.ClearApplyTo.all);
  formatDiagramGrid(anchor, baselineCanvasRowCount, canvasColumnCount);

  const laneRange1 = getAnchoredRange(anchor, 0, 0, 1, 12);
  const laneRange2 = getAnchoredRange(anchor, 0, 12, 1, 12);
  const laneRange3 = getAnchoredRange(anchor, 0, 24, 1, 12);

  addCellLaneTable(anchor, baselineCanvasRowCount - 1);

  const shape_OPERATION_O3 = addTextShape(sheet, "shape_OPERATION_O3", "③ 送信前に接続できたか\n最大3回／500ミリ秒", 0, 0, 157.2645, 52, 10, true, "#FFF2CC", true, "center", "diamond", false);
  setShapeAltText(shape_OPERATION_O3, "③ 送信前に接続できたか 最大3回／500ミリ秒", "送信前に接続可否を確認します。\n接続は500ミリ秒間隔で\n最大3回試行します。");
  const shape_START_S5 = addTextShape(sheet, "shape_START_S5", "③ デバイスコネクタが\n起動済みか", 0, 0, 144.8745, 52, 10, true, "#FFF2CC", true, "center", "diamond", false);
  setShapeAltText(shape_START_S5, "③ デバイスコネクタが 起動済みか", "");
  const shape_START_S8 = addTextShape(sheet, "shape_START_S8", "⑥ 10秒以内に\n稼働確認できたか", 0, 0, 140, 52, 10, true, "#FFF2CC", true, "center", "diamond", false);
  setShapeAltText(shape_START_S8, "⑥ 10秒以内に 稼働確認できたか", "起動後10秒以内に稼働確認で\nきない場合は、起動異常として扱います。");
  const shape_STOP_T2 = addTextShape(sheet, "shape_STOP_T2", "② 所有プロセスか", 0, 0, 140, 52, 10, true, "#FFF2CC", true, "center", "diamond", false);
  setShapeAltText(shape_STOP_T2, "② 所有プロセスか", "アプリが起動した所有\nプロセスだけを停止対象とします。\n既存プロセスは停止しません。");
  const shape_OPERATION_O8 = addTextShape(sheet, "shape_OPERATION_O8", "運用を継続するか", 0, 0, 140, 52, 10, true, "#FFF2CC", true, "center", "diamond", false);
  setShapeAltText(shape_OPERATION_O8, "運用を継続するか", "");
  const shape_STOP_T5 = addTextShape(sheet, "shape_STOP_T5", "⑤ 10秒以内に\n終了したか", 0, 0, 140, 52, 10, true, "#FFF2CC", true, "center", "diamond", false);
  setShapeAltText(shape_STOP_T5, "⑤ 10秒以内に 終了したか", "");
  const shape_OPERATION_O6 = addTextShape(sheet, "shape_OPERATION_O6", "⑥ 同期結果を\n確定できたか", 0, 0, 140, 52, 10, true, "#FFF2CC", true, "center", "diamond", false);
  setShapeAltText(shape_OPERATION_O6, "⑥ 同期結果を 確定できたか", "");
  const shape_START_S2 = addTextShape(sheet, "shape_START_S2", "② 運用設定を\n使用できるか", 0, 0, 140, 52, 10, true, "#FFF2CC", true, "center", "diamond", false);
  setShapeAltText(shape_START_S2, "② 運用設定を 使用できるか", "");
  const shape_START_S4 = addTextShape(sheet, "shape_START_S4", "初期設定を\n使用できるか", 0, 0, 140, 52, 10, true, "#FFF2CC", true, "center", "diamond", false);
  setShapeAltText(shape_START_S4, "初期設定を 使用できるか", "");
  const shape_START_S7 = addTextShape(sheet, "shape_START_S7", "⑤ 通信・デバイス初期化\nデバイス開始：最大3回／50ミリ秒", 0, 0, 176.325, 36, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_START_S7, "⑤ 通信・デバイス初期化 デバイス開始：最大3回／50ミリ秒", "");
  const shape_OPERATION_O5 = addTextShape(sheet, "shape_OPERATION_O5", "⑤ 順序制御・コマンド実行\n対象デバイスを制御", 0, 0, 143.775, 36, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_OPERATION_O5, "⑤ 順序制御・コマンド実行 対象デバイスを制御", "");
  const shape_OPERATION_COMM_ERROR = addTextShape(sheet, "shape_OPERATION_COMM_ERROR", "通信失敗を返却\n送信後は自動再送なし", 0, 0, 117, 36, 10, true, "#F4CCCC", true, "center", "roundRect", false);
  setShapeAltText(shape_OPERATION_COMM_ERROR, "通信失敗を返却 送信後は自動再送なし", "");
  const shape_STOP_T6 = addTextShape(sheet, "shape_STOP_T6", "所有プロセスツリーを\n強制終了", 0, 0, 117, 36, 10, true, "#F4CCCC", true, "center", "roundRect", false);
  setShapeAltText(shape_STOP_T6, "所有プロセスツリーを 強制終了", "");
  const shape_STOP_T4 = addTextShape(sheet, "shape_STOP_T4", "④ 受付応答後に停止\n500ミリ秒待機", 0, 0, 112.275, 36, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_STOP_T4, "④ 受付応答後に停止 500ミリ秒待機", "");
  const shape_STOP_STOP_ERROR = addTextShape(sheet, "shape_STOP_STOP_ERROR", "停止要求失敗を記録\n終了監視を継続", 0, 0, 106.5, 36, 10, true, "#F4CCCC", true, "center", "roundRect", false);
  setShapeAltText(shape_STOP_STOP_ERROR, "停止要求失敗を記録 終了監視を継続", "");
  const shape_OPERATION_RECONNECT = addTextShape(sheet, "shape_OPERATION_RECONNECT", "切断時は1秒間隔で再接続", 0, 0, 133.275, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_OPERATION_RECONNECT, "切断時は1秒間隔で再接続", "");
  const shape_OPERATION_O2 = addTextShape(sheet, "shape_OPERATION_O2", "② 設定・制御方式を選択", 0, 0, 133.275, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_OPERATION_O2, "② 設定・制御方式を選択", "");
  const shape_OPERATION_O7 = addTextShape(sheet, "shape_OPERATION_O7", "正常応答または\n失敗応答を返却", 0, 0, 96, 36, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_OPERATION_O7, "正常応答または 失敗応答を返却", "");
  const shape_START_START_ERROR = addTextShape(sheet, "shape_START_START_ERROR", "起動を中止して\n異常を記録", 0, 0, 96, 36, 10, true, "#F4CCCC", true, "center", "roundRect", false);
  setShapeAltText(shape_START_START_ERROR, "起動を中止して 異常を記録", "");
  const shape_OPERATION_O4 = addTextShape(sheet, "shape_OPERATION_O4", "④ コマンド要求を送信", 0, 0, 122.775, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_OPERATION_O4, "④ コマンド要求を送信", "");
  const shape_STOP_T3 = addTextShape(sheet, "shape_STOP_T3", "③ Host停止要求を送信", 0, 0, 124.875, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_STOP_T3, "③ Host停止要求を送信", "");
  const shape_OPERATION_O1 = addTextShape(sheet, "shape_OPERATION_O1", "① デバイス操作を依頼", 0, 0, 122.775, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_OPERATION_O1, "① デバイス操作を依頼", "");
  const shape_OPERATION_NOTIFY = addTextShape(sheet, "shape_OPERATION_NOTIFY", "アプリ購読処理へ通知", 0, 0, 117, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_OPERATION_NOTIFY, "アプリ購読処理へ通知", "");
  const shape_OPERATION_EVENT = addTextShape(sheet, "shape_OPERATION_EVENT", "非同期イベントを配信", 0, 0, 117, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_OPERATION_EVENT, "非同期イベントを配信", "");
  const shape_STOP_T1 = addTextShape(sheet, "shape_STOP_T1", "① アプリ停止・破棄", 0, 0, 112.275, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_STOP_T1, "① アプリ停止・破棄", "");
  const shape_START_S6 = addTextShape(sheet, "shape_START_S6", "④ 別プロセスで起動", 0, 0, 112.275, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_START_S6, "④ 別プロセスで起動", "");
  const shape_START_S3 = addTextShape(sheet, "shape_START_S3", "初期設定へ切替", 0, 0, 96, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_START_S3, "初期設定へ切替", "");
  const shape_START_S1 = addTextShape(sheet, "shape_START_S1", "① アプリ起動", 0, 0, 96, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_START_S1, "① アプリ起動", "");
  const shape_STOP_T7 = addTextShape(sheet, "shape_STOP_T7", "終了処理完了", 0, 0, 96, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_STOP_T7, "終了処理完了", "");
  const shape_START_S9 = addTextShape(sheet, "shape_START_S9", "運用開始", 0, 0, 96, 28, 10, true, "#F8FBFD", true, "center", "roundRect", false);
  setShapeAltText(shape_START_S9, "運用開始", "");

  let groupBottom1 = placeD2Row([shape_START_S1], [0.56252], laneRange1.getLeft(), originTop + 90, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeD2Row([shape_START_S2], [0.698718], laneRange1.getLeft(), groupBottom1 + 24, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeD2Row([shape_START_S3], [0.827561], laneRange1.getLeft(), groupBottom1 + 24, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeD2Row([shape_START_S4], [0.85], laneRange1.getLeft(), groupBottom1 + 24, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeD2Row([shape_START_S5], [0.6351], laneRange1.getLeft(), groupBottom1 + 24, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeD2Row([shape_START_S6], [0.582495], laneRange1.getLeft(), groupBottom1 + 24, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeD2Row([shape_START_S7], [0.464047], laneRange1.getLeft(), groupBottom1 + 24, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeD2Row([shape_START_S8], [0.368084], laneRange1.getLeft(), groupBottom1 + 24, laneRange1.getWidth(), 30, 28);
  groupBottom1 = placeD2Row([shape_START_S9, shape_START_START_ERROR], [0.165495, 0.585904], laneRange1.getLeft(), groupBottom1 + 24, laneRange1.getWidth(), 30, 28);
  let groupBottom2 = placeD2Row([shape_OPERATION_O1], [0.424574], laneRange2.getLeft(), originTop + 90, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeD2Row([shape_OPERATION_O2], [0.525556], laneRange2.getLeft(), groupBottom2 + 24, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeD2Row([shape_OPERATION_O3], [0.684927], laneRange2.getLeft(), groupBottom2 + 24, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeD2Row([shape_OPERATION_O4], [0.625561], laneRange2.getLeft(), groupBottom2 + 24, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeD2Row([shape_OPERATION_O5], [0.625561], laneRange2.getLeft(), groupBottom2 + 24, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeD2Row([shape_OPERATION_O6], [0.602673], laneRange2.getLeft(), groupBottom2 + 24, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeD2Row([shape_OPERATION_EVENT], [0.757142], laneRange2.getLeft(), groupBottom2 + 24, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeD2Row([shape_OPERATION_COMM_ERROR, shape_OPERATION_O7], [0.244777, 0.492561], laneRange2.getLeft(), groupBottom2 + 24, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeD2Row([shape_OPERATION_NOTIFY], [0.831032], laneRange2.getLeft(), groupBottom2 + 24, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeD2Row([shape_OPERATION_O8], [0.356842], laneRange2.getLeft(), groupBottom2 + 24, laneRange2.getWidth(), 30, 28);
  groupBottom2 = placeD2Row([shape_OPERATION_RECONNECT], [0.757142], laneRange2.getLeft(), groupBottom2 + 24, laneRange2.getWidth(), 30, 28);
  let groupBottom3 = placeD2Row([shape_STOP_T1], [0.458328], laneRange3.getLeft(), originTop + 90, laneRange3.getWidth(), 30, 28);
  groupBottom3 = placeD2Row([shape_STOP_T2], [0.635524], laneRange3.getLeft(), groupBottom3 + 24, laneRange3.getWidth(), 30, 28);
  groupBottom3 = placeD2Row([shape_STOP_T3], [0.574371], laneRange3.getLeft(), groupBottom3 + 24, laneRange3.getWidth(), 30, 28);
  groupBottom3 = placeD2Row([shape_STOP_T4, shape_STOP_STOP_ERROR], [0.378599, 0.770143], laneRange3.getLeft(), groupBottom3 + 24, laneRange3.getWidth(), 30, 28);
  groupBottom3 = placeD2Row([shape_STOP_T5], [0.744721], laneRange3.getLeft(), groupBottom3 + 24, laneRange3.getWidth(), 30, 28);
  groupBottom3 = placeD2Row([shape_STOP_T6], [0.770366], laneRange3.getLeft(), groupBottom3 + 24, laneRange3.getWidth(), 30, 28);
  groupBottom3 = placeD2Row([shape_STOP_T7], [0.340662], laneRange3.getLeft(), groupBottom3 + 24, laneRange3.getWidth(), 30, 28);

  const diagramBottom = Math.max(originTop + 90, groupBottom1, groupBottom2, groupBottom3);
  const bodyEndRowOffset = Math.max(11, Math.ceil((diagramBottom - originTop + 48) / 18) - 1);
  const canvasRowCount = Math.max(baselineCanvasRowCount, bodyEndRowOffset + 1);
  formatDiagramGrid(anchor, canvasRowCount, canvasColumnCount);
  if (bodyEndRowOffset >= baselineCanvasRowCount) {
    addCellLaneTable(anchor, bodyEndRowOffset);
  }

  addConnector(sheet, "edge_01_OPERATION_O8_to_STOP_T1", shape_OPERATION_O8, shape_STOP_T1, false, false, "いいえ", "elbow", "right", "left", "#548235");
  addConnector(sheet, "edge_02_START_S9_to_OPERATION_O1", shape_START_S9, shape_OPERATION_O1, false, false, "", "elbow", "right", "left", "#548235");
  addConnector(sheet, "edge_03_STOP_T1_to_STOP_T2", shape_STOP_T1, shape_STOP_T2, false, false, "", "elbow", "", "", "#548235");
  addConnector(sheet, "edge_04_STOP_T2_to_STOP_T7", shape_STOP_T2, shape_STOP_T7, false, false, "いいえ", "elbow", "left", "left", "#548235");
  addConnector(sheet, "edge_05_STOP_T2_to_STOP_T3", shape_STOP_T2, shape_STOP_T3, false, false, "はい", "elbow", "", "", "#548235");
  addConnector(sheet, "edge_06_STOP_T3_to_STOP_T4", shape_STOP_T3, shape_STOP_T4, false, false, "受付成功", "elbow", "", "", "#548235");
  addConnector(sheet, "edge_07_STOP_T4_to_STOP_T5", shape_STOP_T4, shape_STOP_T5, false, false, "", "elbow", "", "", "#548235");
  addConnector(sheet, "edge_08_STOP_T3_to_STOP_STOP_ERROR", shape_STOP_T3, shape_STOP_STOP_ERROR, true, false, "接続失敗／応答タイムアウト", "elbow", "", "", "#C00000");
  addConnector(sheet, "edge_09_STOP_STOP_ERROR_to_STOP_T5", shape_STOP_STOP_ERROR, shape_STOP_T5, false, false, "", "elbow", "", "", "#C00000");
  addConnector(sheet, "edge_10_STOP_T5_to_STOP_T7", shape_STOP_T5, shape_STOP_T7, false, false, "はい", "elbow", "right", "right", "#548235");
  addConnector(sheet, "edge_11_STOP_T5_to_STOP_T6", shape_STOP_T5, shape_STOP_T6, true, false, "いいえ", "elbow", "", "", "#C00000");
  addConnector(sheet, "edge_12_STOP_T6_to_STOP_T7", shape_STOP_T6, shape_STOP_T7, false, false, "", "elbow", "", "", "#C00000");
  addConnector(sheet, "edge_13_OPERATION_O1_to_OPERATION_O2", shape_OPERATION_O1, shape_OPERATION_O2, false, false, "", "elbow", "", "", "#1F4E79");
  addConnector(sheet, "edge_14_OPERATION_O2_to_OPERATION_O3", shape_OPERATION_O2, shape_OPERATION_O3, false, false, "", "elbow", "", "", "#1F4E79");
  addConnector(sheet, "edge_15_OPERATION_O3_to_OPERATION_O4", shape_OPERATION_O3, shape_OPERATION_O4, false, false, "はい", "elbow", "", "", "#1F4E79");
  addConnector(sheet, "edge_16_OPERATION_O4_to_OPERATION_O5", shape_OPERATION_O4, shape_OPERATION_O5, false, false, "", "elbow", "", "", "#1F4E79");
  addConnector(sheet, "edge_17_OPERATION_O5_to_OPERATION_O6", shape_OPERATION_O5, shape_OPERATION_O6, false, false, "", "elbow", "", "", "#1F4E79");
  addConnector(sheet, "edge_18_OPERATION_O3_to_OPERATION_COMM_ERROR", shape_OPERATION_O3, shape_OPERATION_COMM_ERROR, true, false, "いいえ", "elbow", "left", "left", "#C00000");
  addConnector(sheet, "edge_19_OPERATION_O6_to_OPERATION_O7", shape_OPERATION_O6, shape_OPERATION_O7, false, false, "はい", "elbow", "right", "right", "#1F4E79");
  addConnector(sheet, "edge_20_OPERATION_O7_to_OPERATION_O8", shape_OPERATION_O7, shape_OPERATION_O8, false, false, "", "elbow", "left", "left", "#1F4E79");
  addConnector(sheet, "edge_21_OPERATION_O6_to_OPERATION_COMM_ERROR", shape_OPERATION_O6, shape_OPERATION_COMM_ERROR, true, false, "いいえ", "elbow", "right", "right", "#C00000");
  addConnector(sheet, "edge_22_OPERATION_COMM_ERROR_to_OPERATION_O8", shape_OPERATION_COMM_ERROR, shape_OPERATION_O8, false, false, "", "elbow", "left", "left", "#C00000");
  addConnector(sheet, "edge_23_OPERATION_O8_to_OPERATION_O1", shape_OPERATION_O8, shape_OPERATION_O1, false, false, "はい", "elbow", "right", "right", "#1F4E79");
  addConnector(sheet, "edge_24_OPERATION_O5_to_OPERATION_EVENT", shape_OPERATION_O5, shape_OPERATION_EVENT, true, false, "デバイス処理結果", "elbow", "left", "left", "#C65911");
  addConnector(sheet, "edge_25_OPERATION_EVENT_to_OPERATION_NOTIFY", shape_OPERATION_EVENT, shape_OPERATION_NOTIFY, true, false, "", "elbow", "right", "right", "#C65911");
  addConnector(sheet, "edge_26_OPERATION_NOTIFY_to_OPERATION_RECONNECT", shape_OPERATION_NOTIFY, shape_OPERATION_RECONNECT, true, false, "イベント接続切断", "elbow", "left", "left", "#C65911");
  addConnector(sheet, "edge_27_OPERATION_RECONNECT_to_OPERATION_EVENT", shape_OPERATION_RECONNECT, shape_OPERATION_EVENT, true, false, "", "elbow", "right", "right", "#C65911");
  addConnector(sheet, "edge_28_START_S1_to_START_S2", shape_START_S1, shape_START_S2, false, false, "", "elbow", "", "", "#548235");
  addConnector(sheet, "edge_29_START_S2_to_START_S5", shape_START_S2, shape_START_S5, false, false, "はい", "elbow", "left", "left", "#548235");
  addConnector(sheet, "edge_30_START_S2_to_START_S3", shape_START_S2, shape_START_S3, false, false, "いいえ", "elbow", "", "", "#548235");
  addConnector(sheet, "edge_31_START_S3_to_START_S4", shape_START_S3, shape_START_S4, false, false, "", "elbow", "", "", "#548235");
  addConnector(sheet, "edge_32_START_S4_to_START_S5", shape_START_S4, shape_START_S5, false, false, "はい", "elbow", "", "", "#548235");
  addConnector(sheet, "edge_33_START_S4_to_START_START_ERROR", shape_START_S4, shape_START_START_ERROR, true, false, "いいえ", "elbow", "right", "right", "#C00000");
  addConnector(sheet, "edge_34_START_S5_to_START_S8", shape_START_S5, shape_START_S8, false, false, "はい", "elbow", "left", "left", "#548235");
  addConnector(sheet, "edge_35_START_S5_to_START_S6", shape_START_S5, shape_START_S6, false, false, "いいえ", "elbow", "", "", "#548235");
  addConnector(sheet, "edge_36_START_S6_to_START_S7", shape_START_S6, shape_START_S7, false, false, "", "elbow", "", "", "#548235");
  addConnector(sheet, "edge_37_START_S7_to_START_S8", shape_START_S7, shape_START_S8, false, false, "", "elbow", "", "", "#548235");
  addConnector(sheet, "edge_38_START_S8_to_START_S9", shape_START_S8, shape_START_S9, false, false, "はい", "elbow", "", "", "#548235");
  addConnector(sheet, "edge_39_START_S8_to_START_START_ERROR", shape_START_S8, shape_START_START_ERROR, true, false, "いいえ", "elbow", "", "", "#C00000");
  addConnector(sheet, "edge_40_START_S6_to_START_START_ERROR", shape_START_S6, shape_START_START_ERROR, true, false, "実行ファイルなし／起動例外", "elbow", "right", "right", "#C00000");
  addConnector(sheet, "edge_41_START_S7_to_START_START_ERROR", shape_START_S7, shape_START_START_ERROR, true, false, "必須設定異常", "elbow", "left", "left", "#C00000");

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
