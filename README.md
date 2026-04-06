# 🫧 expo-gooey-toast

Morphing blob toasts for React Native — pill → card with gooey SVG transitions.

## 🎥 Preview

https://github.com/user-attachments/assets/example-gooey-toast

## ✨ Features

- 🫧 Gooey morphing blob animations (pill → card → pill)
- ⚡ Built with **Reanimated 4** + **SVG**
- 📱 Works on **iOS & Android**
- 🔄 Promise toasts with automatic spinner
- 🎨 4 body layouts — `left`, `center`, `right`, `spread`
- 🧩 Fully **TypeScript-ready**
- 🪄 Swipe to dismiss, timestamps, action buttons & meta labels

---

## ⚙️ Installation

```bash
git clone https://github.com/rit3zh/expo-gooey-toast
cd expo-gooey-toast
bun install
bun ios
```

---

## 🚀 Usage

Wrap your app with `<GooeyToaster />` and call `gooeyToast` anywhere.

```tsx
import { GooeyToaster, gooeyToast } from "@/src";

// In your root layout
<GooeyToaster position="top-center" visibleToasts={3} />;

// Trigger toasts
gooeyToast("Hello world");

gooeyToast.success("Saved");

gooeyToast.error("Connection lost", {
  description: "Check your internet and try again.",
  bodyLayout: "right",
});

gooeyToast.promise(fetchData(), {
  loading: "Loading…",
  success: "Done",
  error: "Failed",
  description: {
    loading: "Fetching your data…",
    success: "Everything is up to date.",
    error: "Something went wrong.",
  },
});
```

---

## 📖 API

| Method                                | Description              |
| ------------------------------------- | ------------------------ |
| `gooeyToast(title, options?)`         | Default toast            |
| `gooeyToast.success(title, options?)` | Success toast            |
| `gooeyToast.error(title, options?)`   | Error toast              |
| `gooeyToast.warning(title, options?)` | Warning toast            |
| `gooeyToast.info(title, options?)`    | Info toast               |
| `gooeyToast.promise(promise, data)`   | Async toast with spinner |
| `gooeyToast.dismiss(id)`              | Dismiss by ID            |
| `gooeyToast.dismissAll()`             | Dismiss all              |

### Options

| Prop            | Type                                        | Default  |
| --------------- | ------------------------------------------- | -------- |
| `description`   | `string`                                    | —        |
| `bodyLayout`    | `"left" \| "center" \| "right" \| "spread"` | `"left"` |
| `duration`      | `number`                                    | `4000`   |
| `icon`          | `ReactNode`                                 | —        |
| `action`        | `{ label, onClick }`                        | —        |
| `meta`          | `string`                                    | —        |
| `position`      | `"top" \| "bottom"`                         | `"top"`  |
| `dismissible`   | `boolean`                                   | `true`   |
| `showTimestamp` | `boolean`                                   | `false`  |

---

> [!NOTE]
> **PS** Works with React Native Reanimated V4 + Expo SDK 55

## Stack

Expo 55 · React Native 0.83 · Reanimated 4 · SVG · Expo Router
