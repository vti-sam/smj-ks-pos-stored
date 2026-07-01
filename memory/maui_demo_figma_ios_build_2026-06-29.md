---
title: MAUI Demo Figma iOS build and provisioning notes
project: smj-ks-pos
type: gotcha
status: archived
source:
  - Codex session 2026-06-29 demo Figma MAUI iOS build/install
tags:
  - maui
  - ios
  - figma-demo
  - provisioning
scope: historical
captured_at: 2026-06-29
validity: historical_context
promote_to_knowledge: false
---

Demo Figma flow in `sources/tabletposboilerplate` builds for iOS. A non-signing build passes with:

```sh
rtk dotnet build sources/tabletposboilerplate/TabetPos.Applications/TabetPos.Applications.csproj -f net10.0-ios -c Debug -p:RuntimeIdentifier=ios-arm64 -p:ValidateXcodeVersion=false -p:EnableCodeSigning=false
```

The local .NET iOS SDK `26.2.10233` expects Xcode `26.3`, while the machine uses Xcode `26.4.1`, so CLI build needs `-p:ValidateXcodeVersion=false` unless the SDK/Xcode pair is aligned.

For the 2026-06-29 device demo, the usable profile was Xcode's wildcard profile:

- Profile UUID: `18380c76-b175-448b-b5ff-6a79ed916259`
- Profile name: `iOS Team Provisioning Profile: *`
- App ID: `9K325FD2A2.*`
- Device UDID in profile: `00008110-001049340CB8801E`
- CoreDevice identifier: `A3F063F0-546C-53E1-84D0-F8D1DB557614`
- Matching local certificate: `Apple Development: BAC Vuong Toan (8QVARQU43R)`

The profile was present under `~/Library/Developer/Xcode/UserData/Provisioning Profiles/` but not under `~/Library/MobileDevice/Provisioning Profiles/`, which is where the .NET/Xamarin signing task detected profiles. Copying the profile there unblocked signing:

```sh
/bin/cp "$HOME/Library/Developer/Xcode/UserData/Provisioning Profiles/18380c76-b175-448b-b5ff-6a79ed916259.mobileprovision" "$HOME/Library/MobileDevice/Provisioning Profiles/18380c76-b175-448b-b5ff-6a79ed916259.mobileprovision"
```

Signed build command that passed:

```sh
rtk dotnet build sources/tabletposboilerplate/TabetPos.Applications/TabetPos.Applications.csproj -f net10.0-ios -c Debug -p:RuntimeIdentifier=ios-arm64 -p:ValidateXcodeVersion=false -p:CodesignProvision=18380c76-b175-448b-b5ff-6a79ed916259 '-p:CodesignKey=Apple Development: BAC Vuong Toan (8QVARQU43R)'
```

Install and launch commands that succeeded:

```sh
rtk xcrun devicectl device install app --device A3F063F0-546C-53E1-84D0-F8D1DB557614 sources/tabletposboilerplate/TabetPos.Applications/bin/Debug/net10.0-ios/ios-arm64/TabetPos.Applications.app
rtk xcrun devicectl device process launch --device A3F063F0-546C-53E1-84D0-F8D1DB557614 com.companyname.tabetpos.applications
```

`son.nguyenhong1@vti.com.vn` certificate exists in the keychain, but no available provisioning profile in this session matched that certificate. To use that exact cert, create/download a development profile for `com.companyname.tabetpos.applications` or a wildcard profile that includes that cert and the iPad UDID.

## Simulator capture follow-up

On the same day, the fake in-app status bar row was removed from `DemoFigmaPage.xaml`; the real iOS system status bar remains above the app content.

Simulator build passed with:

```sh
rtk dotnet build sources/tabletposboilerplate/TabetPos.Applications/TabetPos.Applications.csproj -f net10.0-ios -c Debug -p:RuntimeIdentifier=iossimulator-arm64 -p:ValidateXcodeVersion=false
```

The iPad mini (A17 Pro) simulator UDID used for captures was `884BC066-A08A-4AE7-9364-F0454F946239`. Captures were saved under `scratch/demo-figma-sim/`:

- `00-main.png`
- `01-staff-entry.png`
- `02-choice-dialog.png`
- `03-product-entry.png`
- `04-search-dialog.png`

`simctl` supports screenshot but not tap. For local interactive flow capture, Computer Use was used to click Simulator accessibility elements such as `DEMO FIGMA`, `進む`, `新規見積`, and `見積書検索`.

## Noto Sans JP font follow-up

Figma text for the demo nodes uses `Noto Sans JP` mostly at Medium 500 and Bold 700. iOS fallback rendered Japanese text too thin when the MAUI demo page only used the app default OpenSans/system fallback.

The app now registers local font aliases in `TabetPos.Applications/MauiProgram.cs`:

```csharp
fonts.AddFont("NotoSansJP-Medium.ttf", "NotoSansJPMedium");
fonts.AddFont("NotoSansJP-Bold.ttf", "NotoSansJPBold");
```

Those files were generated from Google Fonts' `NotoSansJP[wght].ttf` variable font, using `fonttools varLib.instancer` at `wght=500` and `wght=700`. `DemoFigmaPage.xaml` applies `NotoSansJPMedium` to labels/entries and switches labels with `FontAttributes="Bold"` to `NotoSansJPBold`; demo buttons use `NotoSansJPBold`.

After the font update, simulator and non-signing device builds passed:

```sh
rtk dotnet build sources/tabletposboilerplate/TabetPos.Applications/TabetPos.Applications.csproj -f net10.0-ios -c Debug -p:RuntimeIdentifier=iossimulator-arm64 -p:ValidateXcodeVersion=false
rtk dotnet build sources/tabletposboilerplate/TabetPos.Applications/TabetPos.Applications.csproj -f net10.0-ios -c Debug -p:RuntimeIdentifier=ios-arm64 -p:EnableCodeSigning=false -p:ValidateXcodeVersion=false
```

The latest simulator captures after the font update are in `scratch/demo-figma-sim/`; the generated visual contact sheet is `scratch/demo-figma-compare/contact-after-notojp-ttf.png`.

## Figma SVG icon follow-up

Figma icon nodes were exported as SVG assets into `TabetPos.Applications/Resources/Images/` using lowercase MAUI-safe names such as `figma_demo_camera.svg`, `figma_demo_grid.svg`, and `figma_demo_sort.svg`. The SVG files intentionally omit `width`/`height`; icon dimensions are controlled only in `DemoFigmaPage.xaml` with `WidthRequest` and `HeightRequest`.

MAUI iOS rendered these SVG assets correctly only when XAML referenced the resource name without the `.svg` extension, for example:

```xml
<Image Source="figma_demo_camera" WidthRequest="24" HeightRequest="24" />
```

Using `Source="figma_demo_camera.svg"` built successfully but produced blank image areas on the simulator.

After replacing glyph placeholders with SVG `Image` elements, simulator and non-signing device builds passed. The latest comparison contact sheet is `scratch/demo-figma-compare/contact-after-svg-icons.png`.

## System bar and footer rule follow-up

For the demo flow, do not try to make the iOS system time/date match Figma. The iOS status bar and bottom home/navigation area are system-owned and should remain visible. Visual comparison should focus on app content.

The demo root no longer uses a negative bottom margin. Dialog overlays also should not use negative margins to cover the status bar or bottom system area.

Footer styling is state-dependent:

- Normal view footer: white bottom container with a shadow/top elevation at its top edge.
- Dialog footer/action area: use a horizontal divider line above the bottom action buttons, not a top shadow.

The product screen JAN/code input group should be anchored to the end of the product input pane. A `Grid` with a trailing `Auto` column was used so the radio buttons, code box, camera icon, and grid icon stay aligned at the far end instead of drifting inward.
