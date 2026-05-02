<p align="center">
  <img src="https://i.ibb.co/1tvtSW0Z/toastiva-cover-1x.png" alt="Toastiva" width="100%" />
</p>

<h1 align="center">Toastiva</h1>

<p align="center">
  Morphing toast notifications for React Native &mdash; iOS &amp; Android.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/toastiva" target="_blank">
    <img src="https://img.shields.io/npm/v/toastiva?style=flat-square&color=000" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/toastiva" target="_blank">
    <img src="https://img.shields.io/npm/dm/toastiva?style=flat-square&color=000" alt="npm downloads">
  </a>
  <a href="./LICENSE" target="_blank">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="MIT License">
  </a>
  <a href="https://github.com/rit3zh/expo-gooey-toast" target="_blank">
    <img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=flat-square" alt="Maintained">
  </a>
  <a href="https://github.com/rit3zh/expo-gooey-toast/releases" target="_blank">
    <img src="https://badgen.net/github/release/rit3zh/expo-gooey-toast" alt="Release">
  </a>
  <img src="https://img.shields.io/badge/platforms-iOS%20%7C%20Android-000?style=flat-square" alt="platforms">
</p>

<p align="center">
  <a href="https://www.buymeacoffee.com/rit3zh" target="_blank">
    <img src="https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png" alt="Buy Me a Coffee">
  </a>
</p>

---

## Preview

<table>
  <tr>
    <th align="center" width="50%">iOS</th>
    <th align="center" width="50%">Android</th>
  </tr>
  <tr>
    <td align="center">
      <video src="https://github.com/user-attachments/assets/fbfad5a6-e434-4a73-a3f7-cd528cb8ba2c" controls muted playsinline width="320"></video>
    </td>
    <td align="center">
      <video src="https://github.com/user-attachments/assets/0f16d216-9bad-4933-98e3-c2994a9a14dd" controls muted playsinline width="320"></video>
    </td>
  </tr>
</table>

> [!IMPORTANT]
> Toastiva targets **iOS and Android only** &mdash; it is not built for React Native Web.

> [!WARNING]
> The morphing blur header relies on the RN `filter: [{ blur }]` style. On **Android**, this requires **React Native 0.76+** with the **New Architecture (Fabric)** enabled. On lower versions, `filter` is a no-op on Android &mdash; toasts still render, but without the blur layer. iOS uses `expo-blur` and is unaffected.

## Install

```bash
npx expo install react-native-gesture-handler react-native-reanimated react-native-worklets react-native-safe-area-context react-native-svg expo-blur
npm install toastiva
```

## Quick start

```tsx
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastivaProvider, toastiva } from "toastiva";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ToastivaProvider position="top-center">
          <RootNavigator />
        </ToastivaProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

toastiva.success("Saved", { description: "Your changes are ready." });
```

## Documentation

<table>
  <tr>
    <td><a href="./docs/installation.md">Installation</a></td>
    <td>Peer dependencies and setup for Expo / bare RN.</td>
  </tr>
  <tr>
    <td><a href="./docs/usage.md">Usage</a></td>
    <td>Trigger toasts, update them, handle promises.</td>
  </tr>
  <tr>
    <td><a href="./docs/styling.md">Styling</a></td>
    <td>Fills, strokes, blur, and per-toast overrides.</td>
  </tr>
  <tr>
    <td><a href="./docs/animations.md">Animations</a></td>
    <td>Presets, springs, morph and mount tuning.</td>
  </tr>
  <tr>
    <td><a href="./docs/api.md">API reference</a></td>
    <td>Props, options, and exported types.</td>
  </tr>
</table>

The layout is inspired by: sileo.aaryan.design

## License

MIT &copy; [Ritesh](https://github.com/rit3zh)

---

<p align="center">
  <a href="https://github.com/rit3zh/expo-gooey-toast" target="_blank">
    <img src="http://forthebadge.com/images/badges/built-with-love.svg" alt="Built With Love">
  </a>
</p>
