import {
  Button,
  ContentUnavailableView,
  Host,
  HStack,
  Image,
  List,
  Section,
  Spacer,
  Text as SwiftText,
  VStack,
  type ImageProps,
} from "@expo/ui/swift-ui";
import {
  background,
  buttonBorderShape,
  buttonStyle,
  controlSize,
  font,
  foregroundStyle,
  frame,
  lineLimit,
  listRowBackground,
  listRowInsets,
  listRowSeparator,
  listRowSeparatorTint,
  listRowSpacing,
  listSectionMargins,
  listSectionSpacing,
  listStyle,
  multilineTextAlignment,
  opacity,
  padding,
  shapes,
} from "@expo/ui/swift-ui/modifiers";
import { Stack, useRouter, type Href } from "expo-router";
import { SymbolView, type SymbolViewProps } from "expo-symbols";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { toastiva } from "toastiva";
import AirPodsModel from "../../../components/models/3d-airpods";
import { ANIMATION_SECTIONS } from "../../../components/toast-demos";

type SFSymbol = NonNullable<ImageProps["systemName"]>;

type ToastivaShowcaseItem = {
  title: string;
  description: string;
  symbol: SymbolViewProps["name"];
  tint: string;
  route?: Href;
  onPress?: () => void;
};

type ToastivaShowcaseSection = {
  title: string;
  footer?: string;
  items: ToastivaShowcaseItem[];
};

const fakeWait = (ms: number, shouldReject = false) =>
  new Promise<{ id: string }>((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) reject(new Error("Network error"));
      else resolve({ id: "tx_8821" });
    }, ms);
  });

const SECTIONS: ToastivaShowcaseSection[] = [
  {
    title: "Variants",
    footer: "The built-in tones. Tap any row to preview.",
    items: [
      {
        title: "Default",
        description: "A neutral, untinted notification.",
        symbol: "bell.fill",
        tint: "#8E8E93",
        onPress: () =>
          toastiva("Notification", {
            description: "The plain default tone.",
          }),
      },
      {
        title: "Success",
        description: "Confirms a completed action.",
        symbol: "checkmark.circle.fill",
        tint: "#34C759",
        onPress: () =>
          toastiva.success("Changes saved", {
            description: "Everything is up to date.",
          }),
      },
      {
        title: "Error",
        description: "Surfaces a failure that needs attention.",
        symbol: "xmark.octagon.fill",
        tint: "#FF3B30",
        onPress: () =>
          toastiva.error("Couldn't sync", {
            description: "Check your connection and try again.",
          }),
      },
      {
        title: "Info",
        description: "Shares a neutral status update.",
        symbol: "info.circle.fill",
        tint: "#0A84FF",
        onPress: () =>
          toastiva.info("New update available", {
            description: "Version 1.2 is ready to install.",
          }),
      },
      {
        title: "Warning",
        description: "Flags something to double-check.",
        symbol: "exclamationmark.triangle.fill",
        tint: "#FF9F0A",
        onPress: () =>
          toastiva.warning("Storage almost full", {
            description: "Free up space to keep syncing.",
          }),
      },
    ],
  },
  {
    title: "Patterns",
    footer: "Common compositions you can build on top of the core API.",
    items: [
      {
        title: "With action",
        description: "Pair a toast with a primary action.",
        symbol: "arrow.uturn.backward.circle.fill",
        tint: "#5E5CE6",
        onPress: () =>
          toastiva.success("Message archived", {
            description: "It's tucked away in Archive.",
            action: {
              label: "Undo",
              onPress: () => toastiva.info("Restored to Inbox"),
            },
          }),
      },
      {
        title: "Title only",
        description: "Short, glanceable confirmation.",
        symbol: "text.alignleft",
        tint: "#8E8E93",
        onPress: () => toastiva.success("Copied"),
      },
      {
        title: "Long copy",
        description: "Multiline body that morphs gracefully.",
        symbol: "text.justify",
        tint: "#30B0C7",
        onPress: () =>
          toastiva.info("Heads up", {
            description:
              "Toastiva morphs between sizes when content changes — descriptions, actions, even type can update mid-flight without remounting the toast.",
          }),
      },
    ],
  },
  {
    title: "Live updates",
    footer:
      "toastiva.update(id, …) morphs an existing toast in place — no remount.",
    items: [
      {
        title: "Multi-step task",
        description: "Loading → progress → done, one toast.",
        symbol: "list.bullet.clipboard.fill",
        tint: "#5E5CE6",
        onPress: () => {
          const id = toastiva.info("Preparing export", {
            description: "Gathering 128 files…",
            isLoading: true,
            dismissible: false,
            duration: 10000,
          });
          setTimeout(
            () =>
              toastiva.update(id, {
                title: "Compressing",
                description: "Packing everything into a .zip…",
              }),
            1300,
          );
          setTimeout(
            () =>
              toastiva.update(id, {
                title: "Export ready",
                type: "success",
                description: "toastiva-export.zip · 24 MB",
                isLoading: false,
                dismissible: true,
                duration: 3500,
                action: {
                  label: "Share",
                  onPress: () => toastiva.success("Shared"),
                },
              }),
            2800,
          );
        },
      },
      {
        title: "Download progress",
        description: "Updates the meta label as it ticks.",
        symbol: "arrow.down.circle.fill",
        tint: "#0A84FF",
        onPress: () => {
          const id = toastiva.info("Downloading", {
            description: "Toastiva Sample Pack · 48 MB",
            meta: "0%",
            isLoading: true,
            duration: 10000,
          });
          let progress = 0;
          const timer = setInterval(() => {
            progress += 20;
            if (progress < 100) {
              toastiva.update(id, { meta: `${progress}%` });
              return;
            }
            clearInterval(timer);
            toastiva.update(id, {
              title: "Download complete",
              type: "success",
              meta: "100%",
              isLoading: false,
              duration: 3000,
            });
          }, 500);
        },
      },
      {
        title: "Change tone",
        description: "Warning that resolves into success.",
        symbol: "wifi",
        tint: "#FF9F0A",
        onPress: () => {
          const id = toastiva.warning("Connection unstable", {
            description: "Trying to reconnect…",
            duration: 6000,
          });
          setTimeout(
            () =>
              toastiva.update(id, {
                title: "Back online",
                type: "success",
                description: "All changes are synced.",
                duration: 2500,
              }),
            1800,
          );
        },
      },
    ],
  },
  {
    title: "Content",
    footer: "Meta labels, timestamps, icons, and timing per toast.",
    items: [
      {
        title: "Meta label",
        description: "A small trailing label in the header.",
        symbol: "tag.fill",
        tint: "#30B0C7",
        onPress: () =>
          toastiva.info("New message", {
            description: "Are we still on for tonight?",
            meta: "now",
          }),
      },
      {
        title: "Timestamp",
        description: "Show when the toast appeared.",
        symbol: "clock.fill",
        tint: "#64D2FF",
        onPress: () =>
          toastiva.success("Draft saved", {
            description: "Your note is stored locally.",
            showTimestamp: true,
          }),
      },
      {
        title: "Custom icon",
        description: "Any React node as the icon.",
        symbol: "music.note",
        tint: "#FF2D55",
        onPress: () =>
          toastiva("Now playing", {
            description: "Midnight City · M83",
            icon: (
              <SymbolView name="music.note" size={14} tintColor="#FF2D55" />
            ),
          }),
      },
      {
        title: "Progress bar",
        description: "Visualise the remaining time.",
        symbol: "timer",
        tint: "#34C759",
        onPress: () =>
          toastiva.info("Auto-dismissing", {
            description: "Watch the bar run down.",
            showProgress: true,
            duration: 5000,
          }),
      },
      {
        title: "Sticky",
        description: "Stays until you act on it.",
        symbol: "pin.fill",
        tint: "#FF9F0A",
        onPress: () => {
          const id: string = toastiva.warning("Unsaved changes", {
            description: "You have edits that haven't been saved.",
            duration: 60000,
            dismissible: false,
            action: {
              label: "Save",
              onPress: () => {
                toastiva.dismiss(id);
                toastiva.success("Saved");
              },
            },
          });
        },
      },
    ],
  },
  {
    title: "Callbacks",
    footer: "React to a toast closing with onAutoClose and onDismiss.",
    items: [
      {
        title: "Chained toasts",
        description: "Each one opens the next on close.",
        symbol: "link",
        tint: "#5856D6",
        onPress: () =>
          toastiva.info("Step 1 of 3", {
            description: "Connecting your account.",
            duration: 1600,
            onAutoClose: () =>
              toastiva.info("Step 2 of 3", {
                description: "Importing your contacts.",
                duration: 1600,
                onAutoClose: () =>
                  toastiva.success("All set", {
                    description: "Your workspace is ready.",
                  }),
              }),
          }),
      },
      {
        title: "On dismiss",
        description: "Swipe it away to trigger a follow-up.",
        symbol: "hand.draw.fill",
        tint: "#AF52DE",
        onPress: () =>
          toastiva("Swipe me away", {
            description: "A follow-up appears once I'm gone.",
            duration: 8000,
            onDismiss: () => toastiva.success("Dismissed"),
          }),
      },
    ],
  },
  {
    title: "Real world",
    footer: "Everyday moments, straight out of a real app.",
    items: [
      {
        title: "Incoming message",
        description: "Sender, preview, and a quick reply.",
        symbol: "message.fill",
        tint: "#34C759",
        onPress: () =>
          toastiva("Maya Chen", {
            description: "Sent you the final designs.",
            meta: "now",
            icon: (
              <SymbolView name="message.fill" size={14} tintColor="#34C759" />
            ),
            action: {
              label: "Reply",
              onPress: () => toastiva.success("Reply sent"),
            },
          }),
      },
      {
        title: "Order shipped",
        description: "Delivery update with tracking.",
        symbol: "shippingbox.fill",
        tint: "#A2845E",
        onPress: () =>
          toastiva.success("Order shipped", {
            description: "Arrives Thursday · 2 items",
            action: {
              label: "Track",
              onPress: () => toastiva.info("Out for delivery"),
            },
          }),
      },
      {
        title: "Payment declined",
        description: "Error with a retry that resolves.",
        symbol: "creditcard.trianglebadge.exclamationmark",
        tint: "#FF3B30",
        onPress: () =>
          toastiva.error("Payment declined", {
            description: "Your card ending in 4242 was declined.",
            action: {
              label: "Retry",
              onPress: () =>
                toastiva.promise(fakeWait(1400), {
                  loading: "Retrying payment…",
                  success: "Payment complete",
                  error: "Still declined",
                }),
            },
          }),
      },
      {
        title: "Low battery",
        description: "A gentle nudge with an action.",
        symbol: "battery.25percent",
        tint: "#FFCC00",
        onPress: () =>
          toastiva.warning("Battery at 10%", {
            description: "Turn on Low Power Mode to keep going.",
            action: {
              label: "Enable",
              onPress: () => toastiva.success("Low Power Mode on"),
            },
          }),
      },
      {
        title: "Link copied",
        description: "Tiny confirmation, nothing more.",
        symbol: "link.circle.fill",
        tint: "#8E8E93",
        onPress: () => toastiva.success("Link copied", { meta: "Clipboard" }),
      },
    ],
  },
  {
    title: "Promise",
    footer: "Toastiva tracks a promise from loading to settled state.",
    items: [
      {
        title: "Resolves",
        description: "Loading → success after 1.4s.",
        symbol: "checkmark.seal.fill",
        tint: "#34C759",
        onPress: () =>
          toastiva.promise(fakeWait(1400), {
            loading: "Uploading…",
            success: (result) => `Uploaded · ${result.id}`,
            error: "Upload failed",
            description: {
              loading: "Hang tight, this won't take long.",
              success: "Available in your library.",
            },
          }),
      },
      {
        title: "Rejects",
        description: "Loading → error after 1.4s.",
        symbol: "xmark.seal.fill",
        tint: "#FF3B30",
        onPress: () =>
          toastiva.promise<{ id: string }, Error>(fakeWait(1400, true), {
            loading: "Submitting…",
            success: "Submitted",
            error: (err) => `Failed · ${err.message}`,
          }),
      },
    ],
  },
  {
    title: "Custom",
    footer: "Override fill, stroke, and styles per toast.",
    items: [
      {
        title: "AirPods Pro",
        description: "Custom header with a 3D model.",
        symbol: "airpodspro",
        tint: "#111214",
        onPress: () =>
          toastiva.custom(
            <View style={styles.airpodsToastBody}>
              <Text style={[styles.airpodsToastDescription]}>
                Spatial audio is ready. Your AirPods Pro are connected.
              </Text>
            </View>,
            {
              headerContent: (
                <View style={styles.airpodsToastHeader}>
                  <AirPodsModel />
                  <View style={styles.airpodsToastTitleWrap}>
                    <Text style={styles.airpodsToastTitle}>AirPods Pro</Text>
                    <Text style={styles.airpodsToastMeta}>Connected</Text>
                  </View>
                </View>
              ),
              title: "AirPods Pro",
              fill: "#111214",
              stroke: "rgba(255,255,255,0.12)",
              showProgress: false,
              bodyLayout: "spread",
            },
          ),
      },
      {
        title: "Dismiss all",
        description: "Clear every toast on screen.",
        symbol: "trash.fill",
        tint: "#8E8E93",
        onPress: () => toastiva.dismissAll(),
      },
    ],
  },
  {
    title: "Screens",
    footer: "Demo flows that live alongside this index in (toast-variants).",
    items: [
      {
        title: "Check Balance",
        description: "Account balance flow.",
        symbol: "creditcard.fill",
        tint: "#FF3B30",
        route: "/(toast-variants)/check-balance",
      },
      {
        title: "Create Room",
        description: "Spin up a new room.",
        symbol: "plus.circle.fill",
        tint: "#FF2D55",
        route: "/(toast-variants)/create-room",
      },
      {
        title: "Edit Profile",
        description: "Update profile details.",
        symbol: "person.crop.circle.fill",
        tint: "#0A84FF",
        route: "/(toast-variants)/edit-profile",
      },
      {
        title: "Family Sharing",
        description: "Invite or manage family members.",
        symbol: "checkmark.seal.fill",
        tint: "#34C759",
        route: "/(toast-variants)/success",
      },
    ],
  },
  ...ANIMATION_SECTIONS,
];

const PLAYABLE_ITEMS = SECTIONS.flatMap((section) =>
  section.items.filter((item) => !item.route && item.onPress),
).filter((item) => item.title !== "Dismiss all");

const playRandomToast = () => {
  const item =
    PLAYABLE_ITEMS[Math.floor(Math.random() * PLAYABLE_ITEMS.length)];
  item?.onPress?.();
};

const ShowcaseHeader = () => (
  <Section>
    <VStack
      spacing={8}
      modifiers={[frame({ maxWidth: Infinity }), padding({ vertical: 12 })]}
    >
      <Image
        systemName="bell.badge.fill"
        size={26}
        color="#FFFFFF"
        modifiers={[
          frame({ width: 60, height: 60 }),
          background(
            {
              type: "linearGradient",
              colors: ["#FF9F0A", "#FF375F"],
              startPoint: { x: 0, y: 0 },
              endPoint: { x: 1, y: 1 },
            },
            shapes.roundedRectangle({
              cornerRadius: 16,
              roundedCornerStyle: "continuous",
            }),
          ),
        ]}
      />
      <SwiftText
        modifiers={[
          font({ textStyle: "title2", weight: "bold", design: "rounded" }),
          padding({ top: 4 }),
        ]}
      >
        Toastiva
      </SwiftText>
     
      <Button
        label="Surprise me"
        systemImage="sparkles"
        onPress={playRandomToast}
        modifiers={[
          buttonStyle("borderedProminent"),
          buttonBorderShape("capsule"),
          controlSize("large"),
          padding({ top: 8 }),
        ]}
      />
    </VStack>
  </Section>
);

const ShowcaseRow = ({
  item,
  onPress,
}: {
  item: ToastivaShowcaseItem;
  onPress: (item: ToastivaShowcaseItem) => void;
}) => (
  <Button onPress={() => onPress(item)}>
    <HStack spacing={14}>
      <Image
        systemName={item.symbol as SFSymbol}
        size={15}
        color="#FFFFFF"
        modifiers={[
          frame({ width: 30, height: 30 }),
          background(
            item.tint,
            shapes.roundedRectangle({
              cornerRadius: 8,
              roundedCornerStyle: "continuous",
            }),
          ),
        ]}
      />
      <VStack alignment="leading" spacing={2}>
        <SwiftText
          modifiers={[
            font({ size: 17, design: "rounded" }),
            foregroundStyle("primary"),
          ]}
        >
          {item.title}
        </SwiftText>
        <SwiftText
          modifiers={[
            font({ textStyle: "footnote", design: "rounded" }),
            foregroundStyle("secondary"),
            lineLimit(1),
          ]}
        >
          {item.description}
        </SwiftText>
      </VStack>
      <Spacer />
      {item.route ? (
        <Image
          systemName="chevron.right"
          size={13}
          modifiers={[
            font({ size: 13, weight: "semibold" }),
            foregroundStyle("secondary"),
            opacity(0.5),
          ]}
        />
      ) : null}
    </HStack>
  </Button>
);

const Index = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const search = query.trim().toLowerCase();

  const toastSections = useMemo(() => {
    if (!search) return SECTIONS;

    return SECTIONS.map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.title.toLowerCase().includes(search) ||
          item.description.toLowerCase().includes(search),
      ),
    })).filter((section) => section.items.length > 0);
  }, [search]);

  const onChangeText = useCallback(
    (event: { nativeEvent: { text: string } }) => {
      setQuery(event.nativeEvent.text);
    },
    [],
  );

  const onRowPress = useCallback(
    (item: ToastivaShowcaseItem) => {
      if (item.route) router.push(item.route);
      else item.onPress?.();
    },
    [router],
  );

  return (
    <React.Fragment>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placement: "inline",
            onChangeText,
          },
        }}
      />
      <Host style={styles.host}>
        {toastSections.length === 0 ? (
          <ContentUnavailableView
            title="No Results"
            systemImage="magnifyingglass"
            description={`No toasts match "${query.trim()}".`}
          />
        ) : (
          <List
            modifiers={[
              listStyle("automatic"),
            
            ]}
          >
            {toastSections.map((section) => (
              <Section
                key={section.title}
                title={section.title}
                footer={
                  section.footer ? (
                    <SwiftText>{section.footer}</SwiftText>
                  ) : undefined
                }
              >
                {section.items.map((item) => (
                  <ShowcaseRow
                    key={item.title}
                    item={item}
                    onPress={onRowPress}
                  />
                ))}
              </Section>
            ))}
          </List>
        )}
      </Host>
    </React.Fragment>
  );
};

export default Index;

const styles = StyleSheet.create({
  host: {
    flex: 1,
  },
  airpodsToastHeader: {
    height: 40,
    minWidth: 190,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  airpodsToastTitleWrap: {
    justifyContent: "center",
  },
  airpodsToastTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 16,
  },
  airpodsToastMeta: {
    color: "rgba(255,255,255,0.58)",
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 13,
  },
  airpodsToastBody: {
    justifyContent: "center",
    alignItems: "center",
    top: 5,
  },
  airpodsToastDescription: {
    color: "rgba(255,255,255,0.74)",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
  },
});
