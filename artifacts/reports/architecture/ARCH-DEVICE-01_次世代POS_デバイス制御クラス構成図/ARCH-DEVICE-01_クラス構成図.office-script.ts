// Generated from Markdown: ARCH-DEVICE-01_次世代POS_デバイス制御クラス構成図.md
// Source contract SHA-256: 6da626232b5e200b816c574f8074c1d7d927180b14a666409095f6f03fff6560
// Generated output; do not edit. Change Markdown or the owning renderer and regenerate both scripts.

function main(workbook: ExcelScript.Workbook) {
  const anchorPosition = getRunAnchorPosition(workbook);
  const sheet = createRenderWorksheet(workbook, "05_クラス構成_01");
  sheet.activate();
  const anchor = sheet.getCell(anchorPosition.rowIndex, anchorPosition.columnIndex);
  const originTop = anchor.getTop();
  const canvasColumnCount = 141;
  const baselineCanvasRowCount = 62;
  formatDiagramGrid(anchor, baselineCanvasRowCount, canvasColumnCount);

  const laneRange1 = getAnchoredRange(anchor, 0, 0, 1, 19);
  const laneRange2 = getAnchoredRange(anchor, 0, 19, 1, 102);
  const laneRange3 = getAnchoredRange(anchor, 0, 121, 1, 20);

  addCellLaneTable(anchor, baselineCanvasRowCount - 1);

  const shape_d51_DEVICE_CTRL_CORE_PIPE_CLIENT = addTextShape(sheet, "shape_d51_DEVICE_CTRL_CORE_PIPE_CLIENT", "①-4 名前付きパイプクライアント\n（INamedPipeClient / NamedPipeClient）", 0, 0, 247.698, 135.695426, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_DEVICE_CTRL_CORE_PIPE_CLIENT, "①-4 名前付きパイプクライアント （INamedPipeClient / NamedPipeClient）", "");
  const shape_d51_DEVICE_CTRL_CORE_EVENT_RECEIVER = addTextShape(sheet, "shape_d51_DEVICE_CTRL_CORE_EVENT_RECEIVER", "①-5 名前付きパイプイベント受信\n（IDeviceEventReceiver /\nNamedPipeEventReceiver）", 0, 0, 247.698, 135.695426, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_DEVICE_CTRL_CORE_EVENT_RECEIVER, "①-5 名前付きパイプイベント受信 （IDeviceEventReceiver / NamedPipeEventReceiver）", "");
  const shape_d51_APP_BOOT = addTextShape(sheet, "shape_d51_APP_BOOT", "① 構成ルート・ライフサイクル\n（MauiProgram / App）", 0, 0, 247.698, 109.848678, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_APP_BOOT, "① 構成ルート・ライフサイクル （MauiProgram / App）", "");
  const shape_d51_APP_SERVICE = addTextShape(sheet, "shape_d51_APP_SERVICE", "③ アプリケーションサービス\nデバイス呼出を管理", 0, 0, 247.698, 109.848678, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_APP_SERVICE, "③ アプリケーションサービス デバイス呼出を管理", "");
  const shape_d51_DEVICE_CTRL_CORE_CONFIG_GROUP_MODEL = addTextShape(sheet, "shape_d51_DEVICE_CTRL_CORE_CONFIG_GROUP_MODEL", "①-1-4 デバイス仕様モデル\n（DeviceConfig /\nActiveDevice / DeviceSpec）", 0, 0, 247.698, 109.848678, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_DEVICE_CTRL_CORE_CONFIG_GROUP_MODEL, "①-1-4 デバイス仕様モデル （DeviceConfig / ActiveDevice / DeviceSpec）", "");
  const shape_d51_DEVICE_CTRL_STRATEGY_PATTERN_FACTORY = addTextShape(sheet, "shape_d51_DEVICE_CTRL_STRATEGY_PATTERN_FACTORY", "②-1 ストラテジーファクトリー\n（StrategyFactory<T>）", 0, 0, 247.698, 109.848678, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_DEVICE_CTRL_STRATEGY_PATTERN_FACTORY, "②-1 ストラテジーファクトリー （StrategyFactory<T>）", "");
  const shape_d51_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_WIN_CONNECTOR = addTextShape(sheet, "shape_d51_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_WIN_CONNECTOR", "②-3-1 Windows OPOS／OCX\nストラテジー", 0, 0, 247.698, 109.848678, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_WIN_CONNECTOR, "②-3-1 Windows OPOS／OCX ストラテジー", "");
  const shape_d51_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_IOS = addTextShape(sheet, "shape_d51_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_IOS", "②-3-3 iOS直接接続\nTCP/IP・Bluetooth / カメラ・BLE", 0, 0, 247.698, 109.848678, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_IOS, "②-3-3 iOS直接接続 TCP/IP・Bluetooth / カメラ・BLE", "");
  const shape_d51_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_ANDROID = addTextShape(sheet, "shape_d51_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_ANDROID", "②-3-4 Android直接接続\nBluetooth・カメラ・USB / 現在は利用不可", 0, 0, 247.698, 109.848678, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_ANDROID, "②-3-4 Android直接接続 Bluetooth・カメラ・USB / 現在は利用不可", "");
  const shape_d51_EXTERNAL_WIN_OPOS_DEVICE = addTextShape(sheet, "shape_d51_EXTERNAL_WIN_OPOS_DEVICE", "② Windows OPOS／OCX機器\nUSB / COM", 0, 0, 247.698, 109.848678, 10, true, "#E4DFEC", 0, "#8064A2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_EXTERNAL_WIN_OPOS_DEVICE, "② Windows OPOS／OCX機器 USB / COM", "");
  const shape_d51_EXTERNAL_MOBILE_DEVICE = addTextShape(sheet, "shape_d51_EXTERNAL_MOBILE_DEVICE", "④ iOS／Android周辺機器\nプラットフォームから直接接続", 0, 0, 247.698, 109.848678, 10, true, "#E4DFEC", 0, "#8064A2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_EXTERNAL_MOBILE_DEVICE, "④ iOS／Android周辺機器 プラットフォームから直接接続", "");
  const shape_d51_DEVICE_CTRL_CORE_OPOS_CLIENT = addTextShape(sheet, "shape_d51_DEVICE_CTRL_CORE_OPOS_CLIENT", "①-3 OPOSコマンド変換\n（OposNamedPipeCommandClient）", 0, 0, 312.449488, 84.00193, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_DEVICE_CTRL_CORE_OPOS_CLIENT, "①-3 OPOSコマンド変換 （OposNamedPipeCommandClient）", "");
  const shape_d51_DEVICE_CTRL_CORE_CONFIG_GROUP_CONFIG = addTextShape(sheet, "shape_d51_DEVICE_CTRL_CORE_CONFIG_GROUP_CONFIG", "①-1-3 設定サービス\n（DeviceControllerConfigService）", 0, 0, 300.586235, 84.00193, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_DEVICE_CTRL_CORE_CONFIG_GROUP_CONFIG, "①-1-3 設定サービス （DeviceControllerConfigService）", "");
  const shape_d51_DEVICE_CTRL_CORE_CONTRACTS = addTextShape(sheet, "shape_d51_DEVICE_CTRL_CORE_CONTRACTS", "①-6 共通デバイス通信契約\n（TabletPos.DeviceContracts）", 0, 0, 271.087961, 84.00193, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_DEVICE_CTRL_CORE_CONTRACTS, "①-6 共通デバイス通信契約 （TabletPos.DeviceContracts）", "");
  const shape_d51_DEVICE_CTRL_CORE_MANAGER = addTextShape(sheet, "shape_d51_DEVICE_CTRL_CORE_MANAGER", "①-2 デバイスマネージャー\n（DeviceManager）", 0, 0, 240.176193, 84.00193, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_DEVICE_CTRL_CORE_MANAGER, "①-2 デバイスマネージャー （DeviceManager）", "");
  const shape_d51_DEVICE_CTRL_CORE_CONFIG_GROUP_DEFAULT = addTextShape(sheet, "shape_d51_DEVICE_CTRL_CORE_CONFIG_GROUP_DEFAULT", "①-1-2 デフォルト設定\nデバイス制御層のリソース", 0, 0, 237.719405, 84.00193, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_DEVICE_CTRL_CORE_CONFIG_GROUP_DEFAULT, "①-1-2 デフォルト設定 デバイス制御層のリソース", "");
  const shape_d51_EXTERNAL_WIN_DIRECT_DEVICE = addTextShape(sheet, "shape_d51_EXTERNAL_WIN_DIRECT_DEVICE", "③ Windows直接接続機器\nCOM / Raw Input", 0, 0, 225.536433, 84.00193, 10, true, "#E4DFEC", 0, "#8064A2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_EXTERNAL_WIN_DIRECT_DEVICE, "③ Windows直接接続機器 COM / Raw Input", "");
  const shape_d51_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_WIN_DIRECT = addTextShape(sheet, "shape_d51_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_WIN_DIRECT", "②-3-2 Windows直接接続\nSerialPort / Raw Input", 0, 0, 221.80077, 84.00193, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_WIN_DIRECT, "②-3-2 Windows直接接続 SerialPort / Raw Input", "");
  const shape_d51_DEVICE_CTRL_STRATEGY_PATTERN_CONTRACT = addTextShape(sheet, "shape_d51_DEVICE_CTRL_STRATEGY_PATTERN_CONTRACT", "②-2 公開デバイス契約\n（IPrinterStrategy等）", 0, 0, 207.430248, 84.00193, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_DEVICE_CTRL_STRATEGY_PATTERN_CONTRACT, "②-2 公開デバイス契約 （IPrinterStrategy等）", "");
  const shape_d51_DEVICE_CTRL_CORE_CONFIG_GROUP_RUNTIME = addTextShape(sheet, "shape_d51_DEVICE_CTRL_CORE_CONFIG_GROUP_RUNTIME", "①-1-1 ランタイム設定\nアプリデータ領域", 0, 0, 205.747517, 84.00193, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_DEVICE_CTRL_CORE_CONFIG_GROUP_RUNTIME, "①-1-1 ランタイム設定 アプリデータ領域", "");
  const shape_d51_EXTERNAL_CONNECTOR = addTextShape(sheet, "shape_d51_EXTERNAL_CONNECTOR", "① デバイスコネクタ\nWindows別プロセス", 0, 0, 191.376994, 84.00193, 10, true, "#FCE4D6", 0, "#ED7D31", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_EXTERNAL_CONNECTOR, "① デバイスコネクタ Windows別プロセス", "コマンド通信用パイプとイベント通知用パイプはデバイス制御層との通信に使用する。周辺機器との物理接続はデバイスコネクタ側で管理する。");
  const shape_d51_APP_VIEW = addTextShape(sheet, "shape_d51_APP_VIEW", "② 画面状態管理\n（ViewModel）", 0, 0, 158.12623, 84.00193, 10, true, "#F8FBFD", 0, "#0D32B2", 2, "#111111", true, "center", "roundRect", false);
  setShapeAltText(shape_d51_APP_VIEW, "② 画面状態管理 （ViewModel）", "");

  const geometryBottom = placeMermaidGeometry([shape_d51_DEVICE_CTRL_CORE_PIPE_CLIENT, shape_d51_DEVICE_CTRL_CORE_EVENT_RECEIVER, shape_d51_APP_BOOT, shape_d51_APP_SERVICE, shape_d51_DEVICE_CTRL_CORE_CONFIG_GROUP_MODEL, shape_d51_DEVICE_CTRL_STRATEGY_PATTERN_FACTORY, shape_d51_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_WIN_CONNECTOR, shape_d51_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_IOS, shape_d51_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_ANDROID, shape_d51_EXTERNAL_WIN_OPOS_DEVICE, shape_d51_EXTERNAL_MOBILE_DEVICE, shape_d51_DEVICE_CTRL_CORE_OPOS_CLIENT, shape_d51_DEVICE_CTRL_CORE_CONFIG_GROUP_CONFIG, shape_d51_DEVICE_CTRL_CORE_CONTRACTS, shape_d51_DEVICE_CTRL_CORE_MANAGER, shape_d51_DEVICE_CTRL_CORE_CONFIG_GROUP_DEFAULT, shape_d51_EXTERNAL_WIN_DIRECT_DEVICE, shape_d51_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_WIN_DIRECT, shape_d51_DEVICE_CTRL_STRATEGY_PATTERN_CONTRACT, shape_d51_DEVICE_CTRL_CORE_CONFIG_GROUP_RUNTIME, shape_d51_EXTERNAL_CONNECTOR, shape_d51_APP_VIEW], [2866.507963, 1448.285467, 530.0536, 530.0536, 2455.113893, 3409.289667, 3841.68422, 3841.68422, 3841.68422, 4932.466513, 4499.533487, 1796.302279, 1910.60739, 866.346613, 871.498574, 1456.219544, 4488.452703, 3846.000425, 4205.482243, 2196.0827, 4493.901386, 109.160515], [326.421921, 468.579034, 861.81884, 1005.052901, 844.972299, 951.743984, 813.894662, 671.737549, 956.051775, 448.270875, 655.044858, 326.421921, 752.89326, 282.26706, 898.97354, 738.892938, 525.811118, 542.50381, 774.047592, 738.892938, 408.423805, 946.897718], anchor.getLeft(), originTop);

  addMermaidSectionBackground(sheet, "section_bg_d51_2_2", "①-1 設定サービス・\nストレージ", anchor.getLeft() + 1324.436467, originTop + 629.04426, 1267.4498, 283.775752, "", 1, "#ED7D31", 2, "#111111");
  addMermaidSectionBackground(sheet, "section_bg_d51_2_4", "②-3 プラットフォーム別ストラテジー", anchor.getLeft() + 3689.506444, originTop + 406.808384, 304.355552, 617.091104, "#F7FBFF", 0, "#4472C4", 2, "#111111");
  addMermaidSectionBackground(sheet, "section_bg_d51_2_1", "① 共通制御・設定", anchor.getLeft() + 717.879259, originTop + 161.002735, 2285.401078, 792.895144, "#F7FBFF", 0, "#4472C4", 2, "#111111");
  addMermaidSectionBackground(sheet, "section_bg_d51_2_3", "② ストラテジーパターン", anchor.getLeft() + 3272.517293, originTop + 347.576253, 1049.603448, 706.477774, "", 1, "#ED7D31", 2, "#111111");
  const diagramBottom = Math.max(originTop + 42, geometryBottom, originTop + 1090.07464);
  const bodyEndRowOffset = Math.max(11, Math.ceil((diagramBottom - originTop + 18) / 18) - 1);
  const canvasRowCount = Math.max(baselineCanvasRowCount, bodyEndRowOffset + 1);
  formatDiagramGrid(anchor, canvasRowCount, canvasColumnCount);
  if (bodyEndRowOffset >= baselineCanvasRowCount) {
    addCellLaneTable(anchor, bodyEndRowOffset);
  }

  const edge_d51_01_APP_VIEW_to_APP_SERVICE = addMermaidConnectorRoute(sheet, "edge_d51_01_APP_VIEW_to_APP_SERVICE", [188.22363, 196.762676, 204.377847, 204.377847, 211.993018, 401.896809], [960.89804, 960.89804, 968.513211, 997.43773, 1005.052901, 1005.052901], anchor.getLeft(), originTop, false, false, "ユースケースを呼出", "ユースケースを呼出", "#1F4E79", 2);
  const edge_d51_02_DEVICE_CTRL_CORE_CONFIG_GROUP_RUNTIME_to_DEVICE_CTRL_CORE_CONFIG_GROUP_CONFIG = addMermaidConnectorRoute(sheet, "edge_d51_02_DEVICE_CTRL_CORE_CONFIG_GROUP_RUNTIME_to_DEVICE_CTRL_CORE_CONFIG_GROUP_CONFIG", [2093.208942, 2065.208299], [752.89326, 752.89326], anchor.getLeft(), originTop, true, false, "①-1-1 ランタイム設定 → ①-1-3 設定サービス", "", "#7F7F7F", 2);
  const edge_d51_03_DEVICE_CTRL_CORE_CONFIG_GROUP_DEFAULT_to_DEVICE_CTRL_CORE_CONFIG_GROUP_CONFIG = addMermaidConnectorRoute(sheet, "edge_d51_03_DEVICE_CTRL_CORE_CONFIG_GROUP_DEFAULT_to_DEVICE_CTRL_CORE_CONFIG_GROUP_CONFIG", [1575.079246, 1756.006481], [738.892938, 738.892938], anchor.getLeft(), originTop, true, false, "フォールバック", "フォールバック", "#7F7F7F", 2);
  const edge_d51_04_DEVICE_CTRL_CORE_CONFIG_GROUP_CONFIG_to_DEVICE_CTRL_CORE_CONFIG_GROUP_RUNTIME = addMermaidConnectorRoute(sheet, "edge_d51_04_DEVICE_CTRL_CORE_CONFIG_GROUP_CONFIG_to_DEVICE_CTRL_CORE_CONFIG_GROUP_RUNTIME", [2060.900507, 2073.554644, 2077.054725, 2080.554805, 2088.901151], [731.892777, 731.892777, 728.392697, 724.892617, 724.892617], anchor.getLeft(), originTop, true, false, "①-1-3 設定サービス → ①-1-1 ランタイム設定", "", "#7F7F7F", 2);
  const edge_d51_05_DEVICE_CTRL_CORE_CONFIG_GROUP_CONFIG_to_DEVICE_CTRL_CORE_CONFIG_GROUP_MODEL = addMermaidConnectorRoute(sheet, "edge_d51_05_DEVICE_CTRL_CORE_CONFIG_GROUP_CONFIG_to_DEVICE_CTRL_CORE_CONFIG_GROUP_MODEL", [2060.900507, 2069.439553, 2077.054725, 2077.054725, 2084.669896, 2326.957102], [773.893743, 773.893743, 781.508914, 819.049015, 826.664186, 826.664186], anchor.getLeft(), originTop, false, false, "デシリアライズ", "デシリアライズ", "#1F4E79", 2);
  const edge_d51_06_DEVICE_CTRL_CORE_MANAGER_to_DEVICE_CTRL_CORE_CONFIG_GROUP_MODEL = addMermaidConnectorRoute(sheet, "edge_d51_06_DEVICE_CTRL_CORE_MANAGER_to_DEVICE_CTRL_CORE_CONFIG_GROUP_MODEL", [991.586671, 1075.046509, 1082.66168, 1082.66168, 1090.276851, 1316.359359, 2326.957102], [916.973954, 916.973954, 909.358783, 870.895583, 863.280412, 863.280412, 863.280412], anchor.getLeft(), originTop, true, false, "適用", "適用", "#7F7F7F", 2);
  const edge_d51_07_DEVICE_CTRL_CORE_MANAGER_to_DEVICE_CTRL_STRATEGY_PATTERN_FACTORY = addMermaidConnectorRoute(sheet, "edge_d51_07_DEVICE_CTRL_CORE_MANAGER_to_DEVICE_CTRL_STRATEGY_PATTERN_FACTORY", [991.586671, 3011.357446, 3246.055147, 3248.285967, 3250.516788, 3264.440185, 3281.132876], [928.97423, 928.97423, 928.97423, 931.20505, 933.435871, 933.435871, 933.435871], anchor.getLeft(), originTop, false, false, "①-2 デバイスマネージャー → ②-1 ストラテジーファクトリー", "", "#1F4E79", 2);
  const edge_d51_08_APP_BOOT_to_DEVICE_CTRL_CORE_MANAGER = addMermaidConnectorRoute(sheet, "edge_d51_08_APP_BOOT_to_DEVICE_CTRL_CORE_MANAGER", [653.9026, 657.280477, 660.571741, 660.744966, 660.91819, 685.89093, 699.950529, 701.076488, 702.202447, 708.005466, 713.552121, 728.470358, 747.138565], [861.81884, 861.81884, 861.81884, 862.895788, 863.972736, 863.972736, 863.972736, 870.972897, 877.973058, 877.973058, 877.973058, 880.397609, 882.822161], anchor.getLeft(), originTop, false, false, "InitializeAsync", "InitializeAsync", "#548235", 2);
  const edge_d51_09_APP_BOOT_to_DEVICE_CTRL_CORE_EVENT_RECEIVER = addMermaidConnectorRoute(sheet, "edge_d51_09_APP_BOOT_to_DEVICE_CTRL_CORE_EVENT_RECEIVER", [653.9026, 657.280477, 659.520084, 660.744966, 660.744966, 661.969848, 685.89093, 708.005466, 716.580076, 1320.128676], [834.356671, 834.356671, 834.356671, 826.741499, 489.763748, 482.148577, 482.148577, 482.148577, 482.148577, 482.148577], anchor.getLeft(), originTop, false, false, "StartAsync / StopAsync", "StartAsync / StopAsync", "#548235", 2);
  const edge_d51_10_DEVICE_CTRL_CORE_MANAGER_to_DEVICE_CTRL_CORE_CONFIG_GROUP_CONFIG = addMermaidConnectorRoute(sheet, "edge_d51_10_DEVICE_CTRL_CORE_MANAGER_to_DEVICE_CTRL_CORE_CONFIG_GROUP_CONFIG", [991.586671, 1058.892292, 1066.507463, 1066.507463, 1074.122634, 1276.435753, 1284.050924, 1284.050924, 1291.666095, 1316.359359, 1736.544884, 1744.160055, 1744.160055, 1750.083268, 1756.006481], [904.973678, 904.973678, 897.358507, 840.20257, 832.587399, 832.587399, 824.972228, 804.663292, 797.048121, 797.048121, 797.048121, 789.43295, 772.816795, 766.893582, 766.893582], anchor.getLeft(), originTop, false, false, "①-2 デバイスマネージャー → ①-1-3 設定サービス", "", "#1F4E79", 2);
  const edge_d51_11_DEVICE_CTRL_CORE_MANAGER_to_DEVICE_CTRL_CORE_PIPE_CLIENT = addMermaidConnectorRoute(sheet, "edge_d51_11_DEVICE_CTRL_CORE_MANAGER_to_DEVICE_CTRL_CORE_PIPE_CLIENT", [991.586671, 1026.583857, 1034.199028, 1034.199028, 1041.814199, 2718.889575, 2726.504746, 2726.504746, 2732.427959, 2738.351172], [880.973126, 880.973126, 873.357955, 589.812201, 582.19703, 582.19703, 574.581858, 366.26899, 360.345777, 360.345777], anchor.getLeft(), originTop, true, false, "通信設定を適用", "通信設定を適用", "#7F7F7F", 2);
  const edge_d51_12_DEVICE_CTRL_CORE_MANAGER_to_DEVICE_CTRL_CORE_EVENT_RECEIVER = addMermaidConnectorRoute(sheet, "edge_d51_12_DEVICE_CTRL_CORE_MANAGER_to_DEVICE_CTRL_CORE_EVENT_RECEIVER", [991.586671, 1010.42964, 1018.044811, 1018.044811, 1025.659982, 1276.435753, 1284.050924, 1284.050924, 1291.666095, 1320.128676], [868.972851, 868.972851, 861.35768, 560.196135, 552.580964, 552.580964, 544.965793, 516.902833, 509.287662, 509.287662], anchor.getLeft(), originTop, true, false, "通信設定を適用", "通信設定を適用", "#7F7F7F", 2);
  const edge_d51_13_APP_SERVICE_to_DEVICE_CTRL_CORE_MANAGER = addMermaidConnectorRoute(sheet, "edge_d51_13_APP_SERVICE_to_DEVICE_CTRL_CORE_MANAGER", [653.9026, 657.280477, 660.052068, 660.744966, 661.437864, 685.89093, 699.851606, 701.076488, 701.076488, 702.30137, 708.005466, 712.756827, 713.981709, 713.981709, 715.206591, 715.280892, 717.868438, 747.138565], [977.590731, 977.590731, 977.590731, 973.28294, 968.975149, 968.975149, 968.975149, 976.59032, 978.591143, 986.206314, 986.206314, 986.206314, 978.591143, 927.589194, 919.974023, 919.974023, 918.933737, 915.124919], anchor.getLeft(), originTop, false, false, "Get...StrategyAsync", "Get...StrategyAsync", "#1F4E79", 2);
  const edge_d51_14_APP_SERVICE_to_DEVICE_CTRL_STRATEGY_PATTERN_CONTRACT = addMermaidConnectorRoute(sheet, "edge_d51_14_APP_SERVICE_to_DEVICE_CTRL_STRATEGY_PATTERN_CONTRACT", [653.9026, 657.280477, 660.13868, 660.744966, 661.351251, 685.89093, 708.005466, 3264.440185, 4077.997731, 4085.612902, 4085.612902, 4091.536115, 4097.459328], [1032.515071, 1032.515071, 1032.515071, 1036.284388, 1040.053705, 1040.053705, 1040.053705, 1040.053705, 1040.053705, 1032.438534, 807.971449, 802.048236, 802.048236], anchor.getLeft(), originTop, false, false, "Start / デバイス操作 / End", "Start / デバイス操作 / End", "#1F4E79", 2);
  const edge_d51_15_DEVICE_CTRL_STRATEGY_PATTERN_FACTORY_to_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_WIN_CONNECTOR = addMermaidConnectorRoute(sheet, "edge_d51_15_DEVICE_CTRL_STRATEGY_PATTERN_FACTORY_to_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_WIN_CONNECTOR", [3533.138667, 3590.140366, 3597.755537, 3597.755537, 3605.370708, 3696.834737, 3713.527428], [970.052097, 970.052097, 962.436926, 821.509833, 813.894662, 813.894662, 813.894662], anchor.getLeft(), originTop, false, false, "生成", "生成", "#1F4E79", 2);
  const edge_d51_16_DEVICE_CTRL_STRATEGY_PATTERN_FACTORY_to_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_WIN_DIRECT = addMermaidConnectorRoute(sheet, "edge_d51_16_DEVICE_CTRL_STRATEGY_PATTERN_FACTORY_to_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_WIN_DIRECT", [3533.138667, 3557.831931, 3565.447102, 3565.447102, 3573.062273, 3656.911131, 3664.526302, 3664.526302, 3672.141473, 3696.834737, 3730.792248], [933.435871, 933.435871, 925.820699, 735.354007, 727.738836, 727.738836, 720.123665, 550.118981, 542.50381, 542.50381, 542.50381], anchor.getLeft(), originTop, false, false, "生成", "生成", "#1F4E79", 2);
  const edge_d51_17_DEVICE_CTRL_STRATEGY_PATTERN_FACTORY_to_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_IOS = addMermaidConnectorRoute(sheet, "edge_d51_17_DEVICE_CTRL_STRATEGY_PATTERN_FACTORY_to_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_IOS", [3533.138667, 3573.986148, 3581.60132, 3581.60132, 3589.216491, 3673.065348, 3680.68052, 3680.68052, 3688.295691, 3696.834737, 3713.527428], [951.743984, 951.743984, 944.128812, 778.43192, 770.816749, 770.816749, 763.201578, 679.35272, 671.737549, 671.737549, 671.737549], anchor.getLeft(), originTop, false, false, "生成", "生成", "#1F4E79", 2);
  const edge_d51_18_DEVICE_CTRL_STRATEGY_PATTERN_FACTORY_to_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_ANDROID = addMermaidConnectorRoute(sheet, "edge_d51_18_DEVICE_CTRL_STRATEGY_PATTERN_FACTORY_to_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_ANDROID", [3533.138667, 3656.911131, 3664.526302, 3664.526302, 3672.141473, 3696.834737, 3713.527428], [988.36021, 988.36021, 980.745039, 945.358833, 937.743662, 937.743662, 937.743662], anchor.getLeft(), originTop, false, false, "生成", "生成", "#1F4E79", 2);
  const edge_d51_19_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_WIN_CONNECTOR_to_DEVICE_CTRL_STRATEGY_PATTERN_CONTRACT = addMermaidConnectorRoute(sheet, "edge_d51_19_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_WIN_CONNECTOR_to_DEVICE_CTRL_STRATEGY_PATTERN_CONTRACT", [3965.53322, 3986.533702, 3995.072748, 4002.68792, 4002.68792, 4010.303091, 4097.459328], [795.586549, 795.586549, 795.586549, 787.971378, 781.662763, 774.047592, 774.047592], anchor.getLeft(), originTop, false, false, "実装", "実装", "#1F4E79", 2);
  const edge_d51_20_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_WIN_DIRECT_to_DEVICE_CTRL_STRATEGY_PATTERN_CONTRACT = addMermaidConnectorRoute(sheet, "edge_d51_20_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_WIN_DIRECT_to_DEVICE_CTRL_STRATEGY_PATTERN_CONTRACT", [3956.90081, 3986.533702, 4077.997731, 4085.612902, 4085.612902, 4091.536115, 4097.459328], [556.504131, 556.504131, 556.504131, 564.119303, 740.123736, 746.046949, 746.046949], anchor.getLeft(), originTop, false, false, "実装", "実装", "#1F4E79", 2);
  const edge_d51_21_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_IOS_to_DEVICE_CTRL_STRATEGY_PATTERN_CONTRACT = addMermaidConnectorRoute(sheet, "edge_d51_21_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_IOS_to_DEVICE_CTRL_STRATEGY_PATTERN_CONTRACT", [3965.53322, 3986.533702, 4061.843514, 4069.458685, 4069.458685, 4077.073856, 4097.459328], [690.045662, 690.045662, 690.045662, 697.660833, 752.432099, 760.047271, 760.047271], anchor.getLeft(), originTop, false, false, "実装", "実装", "#1F4E79", 2);
  const edge_d51_22_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_ANDROID_to_DEVICE_CTRL_STRATEGY_PATTERN_CONTRACT = addMermaidConnectorRoute(sheet, "edge_d51_22_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_ANDROID_to_DEVICE_CTRL_STRATEGY_PATTERN_CONTRACT", [3965.53322, 3986.533702, 4001.610972, 4002.68792, 4003.764867, 4061.843514, 4069.458685, 4069.458685, 4077.073856, 4097.459328], [928.589605, 928.589605, 928.589605, 927.512658, 926.43571, 926.43571, 918.820539, 795.663085, 788.047914, 788.047914], anchor.getLeft(), originTop, false, false, "実装", "実装", "#1F4E79", 2);
  const edge_d51_23_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_WIN_CONNECTOR_to_DEVICE_CTRL_CORE_OPOS_CLIENT = addMermaidConnectorRoute(sheet, "edge_d51_23_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_WIN_CONNECTOR_to_DEVICE_CTRL_CORE_OPOS_CLIENT", [3965.53322, 3986.533702, 4330.19785, 4338.736896, 4346.352067, 4346.352067, 4338.736896, 701.263104, 693.647933, 693.647933, 701.263104, 709.80215, 1635.769744], [832.202775, 832.202775, 832.202775, 832.202775, 824.587604, 152.463688, 144.848517, 144.848517, 152.463688, 332.807072, 340.422243, 340.422243, 340.422243], anchor.getLeft(), originTop, false, false, "コマンドと結果を変換", "コマンドと結果を変換", "#1F4E79", 2);
  const edge_d51_24_DEVICE_CTRL_CORE_OPOS_CLIENT_to_DEVICE_CTRL_CORE_PIPE_CLIENT = addMermaidConnectorRoute(sheet, "edge_d51_24_DEVICE_CTRL_CORE_OPOS_CLIENT_to_DEVICE_CTRL_CORE_PIPE_CLIENT", [1952.527023, 2738.351172], [326.421921, 326.421921], anchor.getLeft(), originTop, false, false, "要求を送信", "要求を送信", "#1F4E79", 2);
  const edge_d51_25_DEVICE_CTRL_CORE_CONTRACTS_to_DEVICE_CTRL_CORE_OPOS_CLIENT = addMermaidConnectorRoute(sheet, "edge_d51_25_DEVICE_CTRL_CORE_CONTRACTS_to_DEVICE_CTRL_CORE_OPOS_CLIENT", [1001.890593, 1042.738074, 1050.353246, 1050.353246, 1057.968417, 1292.58997, 1300.205141, 1300.205141, 1307.820312, 1635.769744], [290.667253, 290.667253, 283.052082, 272.004897, 264.389726, 264.389726, 272.004897, 304.806428, 312.421599, 312.421599], anchor.getLeft(), originTop, true, false, "要求・応答DTO", "要求・応答DTO", "#7F7F7F", 2);
  const edge_d51_26_DEVICE_CTRL_CORE_CONTRACTS_to_DEVICE_CTRL_CORE_PIPE_CLIENT = addMermaidConnectorRoute(sheet, "edge_d51_26_DEVICE_CTRL_CORE_CONTRACTS_to_DEVICE_CTRL_CORE_PIPE_CLIENT", [1001.890593, 1026.583857, 1034.199028, 1034.199028, 1041.814199, 2718.889575, 2726.504746, 2726.504746, 2732.427959, 2738.351172], [273.866867, 273.866867, 266.251696, 241.311884, 233.696713, 233.696713, 241.311884, 286.574851, 292.498064, 292.498064], anchor.getLeft(), originTop, true, false, "パイプ名・既定値", "パイプ名・既定値", "#7F7F7F", 2);
  const edge_d51_27_DEVICE_CTRL_CORE_CONTRACTS_to_DEVICE_CTRL_CORE_EVENT_RECEIVER = addMermaidConnectorRoute(sheet, "edge_d51_27_DEVICE_CTRL_CORE_CONTRACTS_to_DEVICE_CTRL_CORE_EVENT_RECEIVER", [1001.890593, 1276.435753, 1284.050924, 1284.050924, 1291.666095, 1320.128676], [307.467639, 307.467639, 315.08281, 420.255235, 427.870406, 427.870406], anchor.getLeft(), originTop, true, false, "イベントDTO・既定値", "イベントDTO・既定値", "#7F7F7F", 2);
  const edge_d51_28_DEVICE_CTRL_CORE_PIPE_CLIENT_to_EXTERNAL_CONNECTOR = addMermaidConnectorRoute(sheet, "edge_d51_28_DEVICE_CTRL_CORE_PIPE_CLIENT_to_EXTERNAL_CONNECTOR", [2994.664754, 3011.357446, 3020.857664, 3027.511663, 3034.165662, 4329.820952, 4336.971196, 4337.926437, 4337.926437, 4338.881677, 4348.902614, 4366.691307, 4367.646548, 4367.646548, 4368.601788, 4373.050204, 4393.905098], [326.421921, 326.421921, 326.421921, 319.767922, 313.113923, 313.113923, 313.113923, 320.729094, 373.884939, 381.50011, 381.50011, 381.50011, 389.115281, 400.808634, 408.423805, 408.423805, 408.423805], anchor.getLeft(), originTop, false, true, "要求／同期応答 コマンド通信用パイプ", "要求／同期応答 コマンド通信用パイプ", "#1F4E79", 3);
  const edge_d51_29_EXTERNAL_CONNECTOR_to_DEVICE_CTRL_CORE_EVENT_RECEIVER = addMermaidConnectorRoute(sheet, "edge_d51_29_EXTERNAL_CONNECTOR_to_DEVICE_CTRL_CORE_EVENT_RECEIVER", [4589.589883, 4631.921533, 4639.536704, 4639.536704, 4647.151875, 5077.315996, 5091.239781, 5098.854952, 5098.854952, 5091.239781, 4716, 4348.902614, 2520, 705.765859, 704.540977, 704.540977, 705.765859, 708.005466, 716.580076, 1320.128676], [394.423484, 394.423484, 386.808312, 383.730542, 376.115371, 376.115371, 376.115371, 368.500199, 49.615171, 42, 42, 42, 42, 42, 49.615171, 447.39432, 455.009491, 455.009491, 455.009491, 455.009491], anchor.getLeft(), originTop, true, false, "イベント通知用パイプ 非同期イベント", "イベント通知用パイプ 非同期イベント", "#C65911", 2);
  const edge_d51_30_DEVICE_CTRL_CORE_CONTRACTS_to_EXTERNAL_CONNECTOR = addMermaidConnectorRoute(sheet, "edge_d51_30_DEVICE_CTRL_CORE_CONTRACTS_to_EXTERNAL_CONNECTOR", [1001.890593, 1010.42964, 1018.044811, 1018.044811, 1025.659982, 3011.357446, 4329.820952, 4339.673024, 4340.628265, 4340.628265, 4341.583505, 4348.902614, 4369.393136, 4370.348376, 4370.348376, 4371.303617, 4373.050204, 4393.905098], [257.066481, 257.066481, 249.45131, 210.618871, 203.0037, 203.0037, 203.0037, 203.0037, 210.618871, 312.498912, 320.114084, 320.114084, 320.114084, 327.729255, 379.808152, 387.423323, 387.423323, 387.423323], anchor.getLeft(), originTop, true, false, "共通DTO・識別子", "共通DTO・識別子", "#7F7F7F", 2);
  const edge_d51_31_EXTERNAL_CONNECTOR_to_EXTERNAL_WIN_OPOS_DEVICE = addMermaidConnectorRoute(sheet, "edge_d51_31_EXTERNAL_CONNECTOR_to_EXTERNAL_WIN_OPOS_DEVICE", [4593.897675, 4788.693978, 4792.463296, 4796.232613, 4804.309722], [422.424127, 422.424127, 426.193444, 429.962762, 429.962762], anchor.getLeft(), originTop, false, true, "実機制御／結果", "実機制御／結果", "#7030A0", 2);
  const edge_d51_32_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_WIN_DIRECT_to_EXTERNAL_WIN_DIRECT_DEVICE = addMermaidConnectorRoute(sheet, "edge_d51_32_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_WIN_DIRECT_to_EXTERNAL_WIN_DIRECT_DEVICE", [3961.208601, 3986.533702, 4001.341735, 4002.68792, 4004.034104, 4323.133927, 4329.820952, 4348.902614, 4373.050204, 4375.144121], [528.503488, 528.503488, 528.503488, 527.157303, 525.811118, 525.811118, 525.811118, 525.811118, 525.811118, 525.811118], anchor.getLeft(), originTop, false, true, "実機制御／結果", "実機制御／結果", "#7030A0", 2);
  const edge_d51_33_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_IOS_to_EXTERNAL_MOBILE_DEVICE = addMermaidConnectorRoute(sheet, "edge_d51_33_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_IOS_to_EXTERNAL_MOBILE_DEVICE", [3969.841011, 3986.533702, 4323.133927, 4329.820952, 4331.56754, 4332.52278, 4332.52278, 4333.478021, 4348.902614, 4366.691307, 4367.646548, 4367.646548, 4368.601788, 4373.050204, 4375.144121], [653.429436, 653.429436, 653.429436, 653.429436, 653.429436, 645.814265, 606.658742, 599.043571, 599.043571, 599.043571, 606.658742, 619.967517, 627.582688, 627.582688, 627.582688], anchor.getLeft(), originTop, false, true, "実機制御／結果", "実機制御／結果", "#7030A0", 2);
  const edge_d51_34_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_ANDROID_to_EXTERNAL_MOBILE_DEVICE = addMermaidConnectorRoute(sheet, "edge_d51_34_DEVICE_CTRL_STRATEGY_PATTERN_PLATFORM_ANDROID_to_EXTERNAL_MOBILE_DEVICE", [3969.841011, 3986.533702, 4323.133927, 4329.820952, 4334.269368, 4335.224608, 4335.224608, 4336.179849, 4348.902614, 4367.173728, 4367.646548, 4368.119368, 4373.050204, 4375.144121], [956.051775, 956.051775, 956.051775, 956.051775, 956.051775, 948.436604, 655.121394, 647.506223, 647.506223, 647.506223, 651.27554, 655.044858, 655.044858, 655.044858], anchor.getLeft(), originTop, false, true, "実機制御／結果", "実機制御／結果", "#7030A0", 2);

  configurePdfReview(workbook, sheet, anchor, canvasRowCount, canvasColumnCount, false);
}

function addCellLaneTable(anchor: ExcelScript.Range, bodyEndRowOffset: number) {
  addLaneColumns(anchor, 0, 0, 19, bodyEndRowOffset, "（1） アプリケーション層", "#F7FBFF", 0, "#4472C4", 2, "#111111");
  addLaneColumns(anchor, 0, 19, 102, bodyEndRowOffset, "（2） デバイス制御層（DeviceCtrl）", "", 1, "#ED7D31", 2, "#111111");
  addLaneColumns(anchor, 0, 121, 20, bodyEndRowOffset, "（3） 外部境界", "", 1, "#ED7D31", 2, "#111111");
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
