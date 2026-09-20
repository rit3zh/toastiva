<div align="center">

<img src="https://i.ibb.co/1tvtSW0Z/toastiva-cover-1x.png" width="100%" alt="Toastiva" />

<h1>Toastiva</h1>

<p>
  Morphing toast notifications for React Native.<br />
  iOS and Android.
</p>

<p>
  <a href="https://www.npmjs.com/package/toastiva"><img src="https://img.shields.io/npm/v/toastiva?style=flat-square&color=000" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/toastiva"><img src="https://img.shields.io/npm/dm/toastiva?style=flat-square&color=000" alt="npm downloads" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-000?style=flat-square" alt="MIT license" /></a>
  <img src="https://img.shields.io/badge/platforms-iOS%20%7C%20Android-000?style=flat-square" alt="platforms" />
</p>

<br />

<video src="https://github.com/user-attachments/assets/c4b06594-c2b5-4f97-8ed3-945a526c58f4" width="100%" controls muted playsinline></video>

</div>

<br />

## Install

```bash
npx expo install react-native-gesture-handler react-native-reanimated react-native-worklets react-native-safe-area-context react-native-svg expo-blur
npm install toastiva
```

Android needs React Native 0.76+ with the New Architecture for the blur header.
Below that, toasts still render, just without the blur layer. iOS uses
`expo-blur` and is unaffected. Not built for React Native Web.

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

## Docs

[Installation](./docs/installation.md) ·
[Usage](./docs/usage.md) ·
[Styling](./docs/styling.md) ·
[Animations](./docs/animations.md) ·
[API reference](./docs/api.md)

Layout inspired by [sileo.aaryan.design](https://sileo.aaryan.design).

<br />

<div align="center">
  <sub>MIT © <a href="https://github.com/rit3zh">Ritesh</a></sub>
</div>
