# Program Specification — pos-integration

Nguồn: sources/pos-integration, nhánh codex/pos-device-integration.

Bộ hiện hành gồm 26 tài liệu, mỗi class một bản MD và một workbook. Các tài liệu lưu trạng thái và Sentry không có class tương ứng trong checkout này được giữ tại reports/reference/program-specs, không thuộc bộ Excel hiện hành.

| Tài liệu | Class | Số hàm |
| --- | --- | --- |
| [PS-DEVICE-01](../device-control/40_プログラム仕様書/デバイス制御/プログラム仕様書_端末アプリ_デバイス制御_デバイスマネージャー.md) | DeviceManager | 18 |
| [PS-DEVICE-02](../device-control/40_プログラム仕様書/デバイス制御/プログラム仕様書_端末アプリ_デバイス制御_設定サービス.md) | DeviceControllerConfigService | 5 |
| [PS-DEVICE-03](../device-control/40_プログラム仕様書/デバイス制御/プログラム仕様書_端末アプリ_デバイス制御_設定ストレージ実装.md) | SqliteDeviceControllerConfigStorage | 24 |
| [PS-DEVICE-04](../device-control/40_プログラム仕様書/デバイス制御/プログラム仕様書_端末アプリ_デバイス制御_設定ストレージインターフェース.md) | IDeviceControllerConfigStorage | 5 |
| [PS-DEVICE-05](../device-control/40_プログラム仕様書/デバイス制御/プログラム仕様書_端末アプリ_デバイス制御_サービス登録.md) | ServiceCollectionExtensions | 1 |
| [PS-DEVICE-06](../device-control/40_プログラム仕様書/デバイス制御/プログラム仕様書_端末アプリ_デバイス制御_デバイス構成変換.md) | DeviceConfiguration | 1 |
| [PS-DEVICE-07](../device-control/40_プログラム仕様書/デバイス制御/プログラム仕様書_端末アプリ_デバイス制御_デバイスストラテジー生成.md) | StrategyFactory<TBase> | 2 |
| [PS-DEVICE-08](../device-control/40_プログラム仕様書/デバイス制御/プログラム仕様書_端末アプリ_デバイス制御_デバイスストラテジー共通制御.md) | DeviceStrategyBase | 12 |
| [PS-DEVICE-09](../device-control/40_プログラム仕様書/デバイス制御/プログラム仕様書_端末アプリ_デバイス制御_デバイス仕様モデル.md) | DeviceSpec | 3 |
| [PS-DEVICE-10](../device-control/40_プログラム仕様書/デバイス制御/プログラム仕様書_端末アプリ_デバイス制御_コマンド通信.md) | NamedPipeClient | 10 |
| [PS-DEVICE-11](../device-control/40_プログラム仕様書/デバイス制御/プログラム仕様書_端末アプリ_デバイス制御_イベント受信.md) | NamedPipeEventReceiver | 6 |
| [PS-CONNECTOR-01](../device-control/40_プログラム仕様書/デバイスコネクタ/プログラム仕様書_端末アプリ_デバイスコネクタ_名前付きパイプコマンドサーバー.md) | NamedPipeCommandServer | 11 |
| [PS-CONNECTOR-02](../device-control/40_プログラム仕様書/デバイスコネクタ/プログラム仕様書_端末アプリ_デバイスコネクタ_名前付きパイプ接続アダプター.md) | NamedPipeDeviceConnectorAdapter | 7 |
| [PS-CONNECTOR-03](../device-control/40_プログラム仕様書/デバイスコネクタ/プログラム仕様書_端末アプリ_デバイスコネクタ_デバイスコマンドルーター.md) | DeviceCommandRouter | 5 |
| [PS-CONNECTOR-04](../device-control/40_プログラム仕様書/デバイスコネクタ/プログラム仕様書_端末アプリ_デバイスコネクタ_デバイスコマンドハンドラー.md) | DeviceCommandHandler | 5 |
| [PS-CONNECTOR-05](../device-control/40_プログラム仕様書/デバイスコネクタ/プログラム仕様書_端末アプリ_デバイスコネクタ_実行管理.md) | DeviceConnector | 5 |
| [PS-CONNECTOR-06](../device-control/40_プログラム仕様書/デバイスコネクタ/プログラム仕様書_端末アプリ_デバイスコネクタ_デバイスマネージャー.md) | TabletDeviceManager | 7 |
| [PS-CONNECTOR-07](../device-control/40_プログラム仕様書/デバイスコネクタ/プログラム仕様書_端末アプリ_デバイスコネクタ_デバイスベース.md) | DeviceBase | 21 |
| [PS-CONNECTOR-08](../device-control/40_プログラム仕様書/デバイスコネクタ/プログラム仕様書_端末アプリ_デバイスコネクタ_自動釣銭機制御_RT-300.md) | CashChangerByRt300 | 66 |
| [PS-CONNECTOR-09](../device-control/40_プログラム仕様書/デバイスコネクタ/プログラム仕様書_端末アプリ_デバイスコネクタ_自動釣銭機UIスレッドフォーム_RT-300.md) | CashChangerByRt300Form | 53 |
| [PS-CONNECTOR-10](../device-control/40_プログラム仕様書/デバイスコネクタ/プログラム仕様書_端末アプリ_デバイスコネクタ_ドロア制御_SHARP.md) | CashDrawerBySharp | 7 |
| [PS-CONNECTOR-11](../device-control/40_プログラム仕様書/デバイスコネクタ/プログラム仕様書_端末アプリ_デバイスコネクタ_カスタマディスプレイ制御_SHARP.md) | CustomerDisplayBySharp | 10 |
| [PS-CONNECTOR-12](../device-control/40_プログラム仕様書/デバイスコネクタ/プログラム仕様書_端末アプリ_デバイスコネクタ_名前付きパイプコマンドマッパー.md) | NamedPipeCommandMapper | 5 |
| [PS-CONNECTOR-13](../device-control/40_プログラム仕様書/デバイスコネクタ/プログラム仕様書_端末アプリ_デバイスコネクタ_名前付きパイプイベントパブリッシャー.md) | NamedPipeEventPublisher | 7 |
| [PS-DEVICE-12](../device-control/40_プログラム仕様書/デバイス制御/プログラム仕様書_端末アプリ_デバイス制御_デバイス接続設定モデル.md) | DeviceConfig | 4 |
| [PS-CONNECTOR-14](../device-control/40_プログラム仕様書/デバイスコネクタ/プログラム仕様書_端末アプリ_デバイスコネクタ_接続先別イベント送信.md) | EventClient | 4 |
