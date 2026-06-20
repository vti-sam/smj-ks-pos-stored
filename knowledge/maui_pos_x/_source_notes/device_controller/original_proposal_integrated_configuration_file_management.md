---
title: Original Proposal Integrated Configuration File Management
project: maui_pos_x
type: architecture
status: confirmed
source:
  - migrated from memory/maui_pos_x/device_controller/_source_notes/original_proposal_integrated_configuration_file_management.md
tags: [maui_pos_x, devices, device_controller, source_notes, original_proposal_integrated_configuration_file_management]
---

# 提案：config.json による統合設定管理の導入

## 1. 目的

アプリケーション全体の設定パラメータを `config.json` 1ファイルで集中管理する仕組みを構築します。これにより、コード修正なしにデバイス構成の変更、環境切り替え、将来的にはリモート同期によるバージョン管理まで対応可能な基盤を整備します。

---

## 2. 構成設計

### 2.1 設定ファイルの全体構造

```json
{
  "devices": [ ... ],
  "activeDevices": { ... },
  "appSettings": { ... }
}
```

| セクション | 役割 |
|-----------|------|
| `devices` | 全デバイスの定義（識別・接続・固有設定） |
| `activeDevices` | OS別に使用するデバイスの選択 |
| `appSettings` | アプリ全体の共通設定（通信、バージョン、API等） |

### 2.2 デバイス設定の3層構造

各デバイスは **Identity / Connection / Config** の3層で定義します。

```
Device
├── Identity ─── id, strategyClass
├── Connection ── type, ipAddress, port, btMacAddress, ...
└── Config ────── series, lang, その他デバイス固有パラメータ
```

#### 設定例

```json
{
  "id": "printer_epson_tcpip_ios",
  "strategyClass": "IosEpsonPrinterStrategy",
  "connection": {
    "type": "tcpip",
    "ipAddress": "10.1.38.52"
  },
  "config": {
    "series": "TM_P80",
    "lang": "ja"
  }
}
```

- **Identity**: `id` でデバイスを一意に識別し、`strategyClass` で処理を決定
- **Connection**: 接続方式ごとに必要なパラメータのみを定義
- **Config**: 各ストラテジーが必要とする固有設定を自由に定義可能

### 2.3 接続タイプ別フィールド

| type | フィールド |
|------|----------|
| `opos` | なし |
| `camera` | なし |
| `bluetooth` | `btMacAddress` |
| `tcpip` | `ipAddress`, `port` |
| `control_box` | `ipAddress`, `port` |
| `serial` | `port`, `baudRate`, `parity`, `dataBits`, `stopBits` |

### 2.4 デバイスID命名規則

```
{デバイス種別}_{ベンダー}_{接続タイプ}_{OS}
```

例：`printer_epson_tcpip_ios`、`drawer_sharp_opos_windows`、`scanner_camera_ios`

---

## 3. 提案するconfig.json全体像

```json
{
  "devices": [
    {
      "id": "printer_epson_tcpip_ios",
      "strategyClass": "IosEpsonPrinterStrategy",
      "connection": { "type": "tcpip", "ipAddress": "10.1.38.52" },
      "config": { "series": "TM_P80", "lang": "ja" }
    },
    {
      "id": "printer_epson_bluetooth_android",
      "strategyClass": "AndroidBluetoothPrinterStrategy",
      "connection": { "type": "bluetooth", "btMacAddress": "" },
      "config": { "series": "TM_P80", "lang": "ja" }
    },
    {
      "id": "printer_sharp_opos_windows",
      "strategyClass": "OposPrinterStrategy",
      "connection": { "type": "opos" }
    },
    {
      "id": "scanner_camera_ios",
      "strategyClass": "IosCameraBarcodeScannerStrategy",
      "connection": { "type": "camera" }
    },
    {
      "id": "scanner_camera_android",
      "strategyClass": "AndroidCameraBarcodeScannerStrategy",
      "connection": { "type": "camera" }
    },
    {
      "id": "scanner_opos_windows",
      "strategyClass": "OposScannerStrategy",
      "connection": { "type": "opos" }
    },
    {
      "id": "cash_changer_glory_opos_windows",
      "strategyClass": "OposCashChangerStrategy",
      "connection": {
        "type": "serial",
        "port": "COM1",
        "baudRate": 9600,
        "parity": "Even",
        "dataBits": 7,
        "stopBits": "One"
      }
    },
    {
      "id": "cash_changer_glory_serial_windows",
      "strategyClass": "SerialCashChangerStrategy",
      "connection": {
        "type": "serial",
        "port": "COM1",
        "baudRate": 9600,
        "parity": "Even",
        "dataBits": 7,
        "stopBits": "One"
      }
    },
    {
      "id": "cash_changer_glory_controlbox_ios",
      "strategyClass": "IosXmlCashChangerStrategy",
      "connection": { "type": "control_box", "ipAddress": "192.168.8.145", "port": "8009" }
    },
    {
      "id": "cash_changer_glory_controlbox_android",
      "strategyClass": "AndroidXmlCashChangerStrategy",
      "connection": { "type": "control_box", "ipAddress": "192.168.8.145", "port": "8009" }
    },
    {
      "id": "customer_display_sharp_opos_windows",
      "strategyClass": "OposCustomerDisplayStrategy",
      "connection": { "type": "opos" }
    },
    {
      "id": "customer_display_epson_controlbox_ios",
      "strategyClass": "IosXmlCustomerDisplayStrategy",
      "connection": { "type": "control_box", "ipAddress": "192.168.8.145", "port": "8009" },
      "config": { "lang": "ja" }
    },
    {
      "id": "drawer_sharp_opos_windows",
      "strategyClass": "OposDrawerStrategy",
      "connection": { "type": "opos" }
    },
    {
      "id": "drawer_epson_controlbox_ios",
      "strategyClass": "IosEpsonDrawerStrategy",
      "connection": { "type": "control_box", "ipAddress": "192.168.8.145", "port": "8009" }
    },
    {
      "id": "drawer_epson_controlbox_android",
      "strategyClass": "AndroidXmlEpsonDrawerStrategy",
      "connection": { "type": "control_box", "ipAddress": "192.168.8.145", "port": "8009" }
    },
    {
      "id": "keyboard_sharp_opos_windows",
      "strategyClass": "OposKeyboardStrategy",
      "connection": { "type": "opos" }
    }
  ],
  "activeDevices": {
    "printer": ["printer_epson_tcpip_ios", "printer_epson_bluetooth_android", "printer_sharp_opos_windows"],
    "scanner": ["scanner_camera_ios", "scanner_camera_android", "scanner_opos_windows"],
    "cash_changer": ["cash_changer_glory_opos_windows", "cash_changer_glory_controlbox_ios", "cash_changer_glory_controlbox_android"],
    "customer_display": ["customer_display_epson_controlbox_ios", "customer_display_sharp_opos_windows"],
    "drawer": ["drawer_sharp_opos_windows", "drawer_epson_controlbox_ios", "drawer_epson_controlbox_android"],
    "keyboard": ["keyboard_sharp_opos_windows"]
  },
  "appSettings": {
    "namedPipe": {
      "pipeName": "KsPOSPipeMessage",
      "connectionTimeoutMs": 5000
    }
  }
}
```

---

## 4. 将来の拡張

`appSettings` セクションを拡張することで、コード修正なしに以下の管理が可能になります。

### 4.1 バージョン管理・強制アップデート

```json
"version": {
  "current": "2.1.0",
  "minimumRequired": "2.0.0",
  "updateUrl": "https://api.example.com/updates"
}
```

### 4.2 API連携・リモート設定同期

```json
"remoteConfig": {
  "enabled": true,
  "syncEndpoint": "https://api.example.com/config/sync",
  "syncIntervalMinutes": 60
}
```

### 4.3 エンドポイント管理

```json
"endpoints": {
  "paymentGateway": "https://payment.example.com/api",
  "orderService": "https://order.example.com/api",
  "reportService": "https://report.example.com/api"
}
```

---

## 5. 対応スケジュール

| Phase | 内容 | 見積工数 |
|-------|------|---------|
| Phase 1 | `config.json`構造の再設計・モデルクラスの実装 | 2.0人日 |
| Phase 2 | 各ストラテジーの設定ファイル参照への移行 | 3.0人日 |
| Phase 3 | ユニットテスト作成・実機動作確認 | 3.0人日 |
| **合計** | | **8.0人日** |

---

## 6. ご確認事項

1. 本施策の実施時期について
2. 将来的な拡張機能（リモート同期、バージョン管理等）の優先度について
3. 対応デバイスの追加・変更予定の有無について
