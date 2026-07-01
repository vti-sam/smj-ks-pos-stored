---
title: Appium NUnit MAUI UI Test Trial
project: smj-ks-pos
type: lesson
status: archived
source:
  - Codex session 2026-06-30 Appium + NUnit MAUI simulator trial
  - sources/tabletposboilerplate/TabetPos.UITests/
  - scratch/appium-figma-flow/
tags:
  - maui
  - appium
  - nunit
  - ios-simulator
  - figma-flow
scope: historical
captured_at: 2026-06-30
validity: historical_context
promote_to_knowledge: false
---

Trial result: Appium + NUnit works for automatically navigating the MAUI demo/Figma flow and capturing screenshots on the local iPad mini simulator.

Implemented scope:

- Added stable `AutomationId` values to `MainPage.xaml` and `DemoFigmaPage.xaml`.
- Added `TabetPos.UITests` with NUnit and `Appium.WebDriver` 8.3.0.
- Test flow captures main page, staff entry, choice dialog, search dialog, and product entry.
- Screenshot output was written to `scratch/appium-figma-flow/`.

Local runtime that passed:

- Appium server: 3.5.2 via `/opt/homebrew/bin/npx --yes appium`.
- XCUITest driver: 11.16.3 installed by `appium driver install xcuitest`.
- Simulator: iPad mini (A17 Pro), UDID `884BC066-A08A-4AE7-9364-F0454F946239`, iOS 26.4.
- App target: `net10.0-ios`, `iossimulator-arm64`.

Commands that passed:

```sh
rtk dotnet build sources/tabletposboilerplate/TabetPos.Applications/TabetPos.Applications.csproj -f net10.0-ios -c Debug -p:RuntimeIdentifier=iossimulator-arm64 -p:ValidateXcodeVersion=false -v:m
TABETPOS_SIMULATOR_UDID=884BC066-A08A-4AE7-9364-F0454F946239 TABETPOS_SCREENSHOT_DIR=/Users/vti-sam/pm-control/smj-ks-pos/scratch/appium-figma-flow rtk dotnet test sources/tabletposboilerplate/TabetPos.UITests/TabetPos.UITests.csproj --no-build -v:n
```

Gotcha:

- `rtk npx --yes appium --version` returned npm's version on this machine. Use `/opt/homebrew/bin/npx --yes appium ...` for Appium commands.
- The first XCUITest session spends time starting WebDriverAgent; repeated connection-refused lines for port 8100 can be normal until WDA is ready.
- Existing build warnings include package vulnerability warnings for `SQLitePCLRaw.lib.e_sqlite3.*` and `System.Security.Cryptography.Xml`; they did not block this UI test trial.
