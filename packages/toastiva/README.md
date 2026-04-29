# toastiva

> [!CAUTION]
> THIS PACKAGE IS STILL IN A TESTING PHASE. DO NOT CLONE OR SUBMIT PULL REQUEST. AS IT IS STILL A WIP.

Morphing toast notifications for React Native and React Native Web.

## Install

For Expo apps, install the native peer dependencies with Expo so Reanimated and
Worklets stay on the versions supported by your SDK:

```bash
npx expo install react-native-gesture-handler react-native-reanimated react-native-worklets react-native-safe-area-context react-native-svg expo-blur
npm install toastiva
```

For bare React Native apps, install `toastiva` with the native peers required by
your React Native version:

```bash
npm install toastiva react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-svg expo-blur
```

If you use Reanimated 4, install the `react-native-worklets` version required
by your Reanimated version. For example, Reanimated `4.2.1` supports
`react-native-worklets@0.7.x`, while Reanimated `4.3.0` requires
`react-native-worklets@0.8.x`.

## Usage

Wrap your app root with `GestureHandlerRootView`, then render `ToastivaProvider`
inside your safe area provider. Toastive does not add the gesture root for you.

```tsx
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastivaProvider, toastiva } from "toastiva";

export function App() {
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

toastiva.success("Saved", {
  description: "Your changes are ready.",
});
```

## Build

```bash
pnpm --filter toastiva build
pnpm --filter toastiva typecheck
pnpm --filter toastiva pack:dry-run
```
