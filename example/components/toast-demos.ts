import type { MaterialIcons } from "@expo/vector-icons";
import type { Href } from "expo-router";
import type { SymbolViewProps } from "expo-symbols";
import type React from "react";
import {
  toastiva,
  ToastivaAnimationPreset,
  ToastivaPosition,
  type IToastivaOptions,
} from "toastiva";

type ToastDemoItem = {
  title: string;
  description: string;
  symbol: SymbolViewProps["name"];
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  tint: string;
  route?: Href;
  onPress?: () => void;
};

type ToastDemoSection = {
  title: string;
  footer?: string;
  items: ToastDemoItem[];
};

const sampleCard: Omit<IToastivaOptions, "title" | "type"> = {
  description: "Your changes are synced across every device.",
  action: { label: "View", onPress: () => toastiva.success("Opened") },
  showProgress: false,
};

const wait = (ms: number) =>
  new Promise<{ id: string }>((resolve) =>
    setTimeout(() => resolve({ id: "tx_8821" }), ms),
  );

const presetDemo = (
  title: string,
  preset: ToastivaAnimationPreset,
): (() => void) => {
  return () => toastiva.info(title, { ...sampleCard, animationPreset: preset });
};

const ANIMATION_SECTIONS: ToastDemoSection[] = [
  {
    title: "Animation presets",
    footer:
      "Built-in motion presets. Pass animationPreset per toast or on the provider.",
    items: [
      {
        title: "Smooth",
        description: "Default. Soft spring with a gentle bounce.",
        symbol: "sparkles",
        icon: "auto-awesome",
        tint: "#5E5CE6",
        onPress: presetDemo("Smooth preset", ToastivaAnimationPreset.Smooth),
      },
      {
        title: "Snappy",
        description: "Quick and tight for frequent feedback.",
        symbol: "hare.fill",
        icon: "bolt",
        tint: "#FF9F0A",
        onPress: presetDemo("Snappy preset", ToastivaAnimationPreset.Snappy),
      },
      {
        title: "Gentle",
        description: "Slower, heavier and calm.",
        symbol: "tortoise.fill",
        icon: "spa",
        tint: "#30B0C7",
        onPress: presetDemo("Gentle preset", ToastivaAnimationPreset.Gentle),
      },
      {
        title: "Minimal",
        description: "No drop-in, critically damped morph.",
        symbol: "minus.circle.fill",
        icon: "remove-circle",
        tint: "#8E8E93",
        onPress: presetDemo("Minimal preset", ToastivaAnimationPreset.Minimal),
      },
    ],
  },
  {
    title: "Springs",
    footer:
      "Tune any spring through animation.springs on a toast or the provider.",
    items: [
      {
        title: "Bouncy",
        description: "Low damping for a playful overshoot.",
        symbol: "waveform.path",
        icon: "graphic-eq",
        tint: "#FF2D55",
        onPress: () =>
          toastiva.success("Bouncy morph", {
            ...sampleCard,
            animation: {
              springs: { morph: { stiffness: 200, damping: 16, mass: 1 } },
            },
          }),
      },
      {
        title: "Soft & slow",
        description: "Low stiffness, unhurried settle.",
        symbol: "cloud.fill",
        icon: "cloud",
        tint: "#64D2FF",
        onPress: () =>
          toastiva.info("Soft morph", {
            ...sampleCard,
            animation: {
              springs: {
                morph: { stiffness: 110, damping: 15, mass: 1 },
                morphCollapse: { stiffness: 110, damping: 21, mass: 1 },
              },
            },
          }),
      },
      {
        title: "Crisp",
        description: "Critically damped, no bounce at all.",
        symbol: "bolt.fill",
        icon: "flash-on",
        tint: "#FFD60A",
        onPress: () =>
          toastiva.warning("Crisp morph", {
            ...sampleCard,
            animation: {
              springs: { morph: { stiffness: 320, damping: 36, mass: 1 } },
            },
          }),
      },
      {
        title: "Jelly squish",
        description: "Re-enable the card squish on expand.",
        symbol: "drop.fill",
        icon: "water-drop",
        tint: "#34C759",
        onPress: () =>
          toastiva.success("Jelly squish", {
            ...sampleCard,
            animation: {
              morph: {
                squishDuration: 90,
                squishScaleX: 1.04,
                squishScaleY: 0.93,
              },
            },
          }),
      },
      {
        title: "Heavy drop",
        description: "Longer, weightier entrance spring.",
        symbol: "arrow.down.circle.fill",
        icon: "arrow-circle-down",
        tint: "#AF52DE",
        onPress: () =>
          toastiva.info("Heavy drop", {
            animation: {
              mount: { axis: "y", offset: 80 },
              springs: { mount: { stiffness: 140, damping: 13, mass: 1.3 } },
            },
          }),
      },
    ],
  },
  {
    title: "Shape",
    footer: "Corner radius, squircle smoothing, and card width.",
    items: [
      {
        title: "Squircle",
        description: "Larger radius with full corner smoothing.",
        symbol: "app.fill",
        icon: "crop-square",
        tint: "#0A84FF",
        onPress: () =>
          toastiva.info("Squircle card", {
            ...sampleCard,
            bodyRadius: 26,
            cornerSmoothing: 1,
          }),
      },
      {
        title: "Tight corners",
        description: "Small radius, plain circular corners.",
        symbol: "square.fill",
        icon: "square",
        tint: "#636366",
        onPress: () =>
          toastiva.info("Tight corners", {
            ...sampleCard,
            bodyRadius: 8,
            cornerSmoothing: 0,
          }),
      },
      {
        title: "Narrow card",
        description: "Constrain the expanded width.",
        symbol: "rectangle.compress.vertical",
        icon: "unfold-less",
        tint: "#FF6482",
        onPress: () =>
          toastiva.info("Narrow card", { ...sampleCard, expandedWidth: 280 }),
      },
      {
        title: "Light fill",
        description: "Custom fill and stroke.",
        symbol: "sun.max.fill",
        icon: "wb-sunny",
        tint: "#FFCC00",
        onPress: () =>
          toastiva.success("Light toast", {
            ...sampleCard,
            fill: "#FFFFFF",
            stroke: "rgba(0,0,0,0.08)",
          }),
      },
    ],
  },
  {
    title: "Positions",
    footer: "Each position morphs from its own edge.",
    items: [
      {
        title: "Top left",
        description: "Pill hugs the left edge.",
        symbol: "arrow.up.left.square.fill",
        icon: "north-west",
        tint: "#5856D6",
        onPress: () =>
          toastiva.info("Top left", {
            ...sampleCard,
            position: ToastivaPosition.TopLeft,
          }),
      },
      {
        title: "Top right",
        description: "Pill hugs the right edge.",
        symbol: "arrow.up.right.square.fill",
        icon: "north-east",
        tint: "#5856D6",
        onPress: () =>
          toastiva.info("Top right", {
            ...sampleCard,
            position: ToastivaPosition.TopRight,
            cornerSmoothing: 10,
            bodyRadius: 30,
          }),
      },
      {
        title: "Bottom center",
        description: "Rises from the bottom edge.",
        symbol: "arrow.down.square.fill",
        icon: "south",
        tint: "#5856D6",
        onPress: () =>
          toastiva.success("Bottom center", {
            ...sampleCard,
            position: ToastivaPosition.BottomCenter,
          }),
      },
    ],
  },
  {
    title: "Stack",
    footer: "Opens a screen running Toastiva in stack mode.",
    items: [
      {
        title: "Stack playground",
        description: "Bursts, fan-out, and promises in a stack.",
        symbol: "square.stack.3d.up.fill",
        icon: "layers",
        tint: "#FF9500",
        route: "/(toast-variants)/stack",
      },
    ],
  },
];

const STACK_SECTIONS: ToastDemoSection[] = [
  {
    title: "Push",
    footer: "Tap the stack itself to fan it out or collapse it.",
    items: [
      {
        title: "Single toast",
        description: "One title-only toast.",
        symbol: "plus.circle.fill",
        icon: "add-circle",
        tint: "#34C759",
        onPress: () => toastiva.success("Added to stack"),
      },
      {
        title: "Burst of three",
        description: "Three toasts in quick succession.",
        symbol: "square.stack.fill",
        icon: "layers",
        tint: "#FF9500",
        onPress: () => {
          toastiva.info("Uploading photos");
          setTimeout(() => toastiva.warning("Storage almost full"), 250);
          setTimeout(() => toastiva.success("Backup complete"), 500);
        },
      },
      {
        title: "Cards with bodies",
        description: "Front card expands once it settles.",
        symbol: "rectangle.stack.fill",
        icon: "view-agenda",
        tint: "#0A84FF",
        onPress: () => {
          toastiva.info("New comment", {
            description: "Maya replied to your design review.",
          });
          setTimeout(
            () =>
              toastiva.success("Payment received", {
                ...sampleCard,
                description: "$48.00 from Jordan for dinner.",
              }),
            300,
          );
        },
      },
      {
        title: "Mixed tones",
        description: "Success, error, warning, info.",
        symbol: "paintpalette.fill",
        icon: "palette",
        tint: "#AF52DE",
        onPress: () => {
          toastiva.success("Saved");
          setTimeout(() => toastiva.error("Couldn't sync"), 200);
          setTimeout(() => toastiva.warning("Low battery"), 400);
          setTimeout(() => toastiva.info("Update ready"), 600);
        },
      },
    ],
  },
  {
    title: "Motion",
    items: [
      {
        title: "Gentle stack",
        description: "Gentle preset for stacked cards.",
        symbol: "tortoise.fill",
        icon: "spa",
        tint: "#30B0C7",
        onPress: () => {
          toastiva.info("Gentle one", {
            animationPreset: ToastivaAnimationPreset.Gentle,
          });
          setTimeout(
            () =>
              toastiva.info("Gentle two", {
                animationPreset: ToastivaAnimationPreset.Gentle,
              }),
            300,
          );
        },
      },
      {
        title: "Snappy stack",
        description: "Snappy preset for stacked cards.",
        symbol: "hare.fill",
        icon: "bolt",
        tint: "#FF9F0A",
        onPress: () => {
          toastiva.success("Snappy one", {
            animationPreset: ToastivaAnimationPreset.Snappy,
          });
          setTimeout(
            () =>
              toastiva.success("Snappy two", {
                animationPreset: ToastivaAnimationPreset.Snappy,
              }),
            200,
          );
        },
      },
      {
        title: "Promise in stack",
        description: "Loading → success on top of the pile.",
        symbol: "arrow.triangle.2.circlepath",
        icon: "autorenew",
        tint: "#34C759",
        onPress: () =>
          toastiva.promise(wait(1400), {
            loading: "Uploading…",
            success: "Uploaded",
            error: "Upload failed",
            description: { success: "Available in your library." },
          }),
      },
      {
        title: "Dismiss all",
        description: "Clear the stack.",
        symbol: "trash.fill",
        icon: "delete",
        tint: "#8E8E93",
        onPress: () => toastiva.dismissAll(),
      },
    ],
  },
];

export { ANIMATION_SECTIONS, STACK_SECTIONS };
export type { ToastDemoItem, ToastDemoSection };
