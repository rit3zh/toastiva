import { useFonts } from "expo-font";
import { Stack, useRouter, type Href } from "expo-router";
import { SymbolView, type SymbolViewProps } from "expo-symbols";
import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInputFocusEventData,
  View,
} from "react-native";
import { toastiva } from "toastiva";
import AirPodsModel from "../../../components/models/3d-airpods";
import { ANIMATION_SECTIONS } from "../../../components/toast-demos";
import { SquircleView } from "../../../reacticx-components/squircle-view";

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

const ROW_HEIGHT = 60;

const fakeWait = (ms: number, shouldReject = false) =>
  new Promise<{ id: string }>((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) reject(new Error("Network error"));
      else resolve({ id: "tx_8821" });
    }, ms);
  });

const SECTIONS: ToastivaShowcaseSection[] = [
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
  {
    title: "Variants",
    footer: "The four built-in tones. Tap any row to preview.",
    items: [
      {
        title: "Success",
        description: "Confirms a completed action.",
        symbol: "checkmark.circle.fill",
        tint: "#34C759",
        onPress: () => toastiva.success("Success"),
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
  ...ANIMATION_SECTIONS,
];

const Index = () => {
  const [fontsLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/SF-Pro-Rounded-Regular.otf"),
    SfProMedium: require("@/assets/fonts/SF-Pro-Rounded-Medium.otf"),
  });

  const router = useRouter();
  const [query, setQuery] = useState("");

  const fontFamily = fontsLoaded ? "SfProRounded" : undefined;
  const fontStyle = useMemo(() => ({ fontFamily }), [fontFamily]);

  const toastSections = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return SECTIONS;

    return SECTIONS.map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.title.toLowerCase().includes(search) ||
          item.description.toLowerCase().includes(search),
      ),
    })).filter((section) => section.items.length > 0);
  }, [query]);

  const onChangeText = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setQuery(event.nativeEvent.text);
    },
    [],
  );

  const renderSection = useCallback(
    ({ item: section }: { item: ToastivaShowcaseSection }) => (
      <View style={styles.section}>
        <Text style={[styles.sectionHeader, fontStyle]}>
          {section.title.toUpperCase()}
        </Text>

        <SquircleView
          style={styles.card}
          height={section.items.length * ROW_HEIGHT}
          cornerRadius={28}
          cornerSmoothing={0.98}
          backgroundColor="#fff"
        >
          {section?.items.map((item, index) => {
            const isLast = index === section.items.length - 1;
            return (
              <Pressable
                key={item.title}
                onPress={() => {
                  if (item.route) router.push(item.route);
                  else item.onPress?.();
                }}
                style={({ pressed }) => [
                  styles.row,
                  pressed && styles.rowPressed,
                ]}
              >
                <SquircleView
                  style={styles.iconTile}
                  width={30}
                  height={30}
                  cornerSmoothing={0.88}
                  backgroundColor={item.tint}
                >
                  <View style={styles.iconTileInner}>
                    <SymbolView
                      name={item.symbol}
                      size={18}
                      tintColor="#FFFFFF"
                      resizeMode="scaleAspectFit"
                    />
                  </View>
                </SquircleView>

                <View style={styles.rowText}>
                  <Text style={[styles.rowTitle, fontStyle]} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text
                    style={[styles.rowDescription, fontStyle]}
                    numberOfLines={1}
                  >
                    {item.description}
                  </Text>
                </View>

                <SymbolView
                  name="chevron.right"
                  size={14}
                  tintColor="#C7C7CC"
                  resizeMode="scaleAspectFit"
                  style={styles.chevron}
                />

                {!isLast && <View style={styles.separator} />}
              </Pressable>
            );
          })}
        </SquircleView>

        {section.footer ?
          <Text style={[styles.sectionFooter, fontStyle]}>
            {section.footer}
          </Text>
        : null}
      </View>
    ),
    [fontStyle],
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
      <FlatList
        data={toastSections}
        renderItem={renderSection}
        keyExtractor={(section) => section.title}
        style={styles.scroll}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={[styles.emptyText, fontStyle]}>No matching toasts.</Text>
        }
        ListFooterComponent={<View style={styles.bottomSpacer} />}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      />
    </React.Fragment>
  );
};

export default Index;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  scrollContent: {
    paddingTop: 8,
    paddingBottom: 32,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "500",
    color: "#6D6D72",
    letterSpacing: 0.4,
    marginBottom: 8,
    marginLeft: 16,
  },
  sectionFooter: {
    fontSize: 13,
    color: "#6D6D72",
    marginTop: 8,
    marginHorizontal: 16,
    lineHeight: 18,
  },
  card: {
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: ROW_HEIGHT,
    minHeight: 60,
  },
  rowPressed: {
    backgroundColor: "#E5E5EA",
  },
  iconTile: {
    marginRight: 14,
  },
  iconTileInner: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },
  rowText: {
    flex: 1,
    justifyContent: "center",
  },
  rowTitle: {
    fontSize: 17,
    color: "#000000",
    marginBottom: 2,
  },
  rowDescription: {
    fontSize: 13,
    color: "#8E8E93",
  },
  chevron: {
    width: 14,
    height: 14,
    marginLeft: 8,
  },
  separator: {
    position: "absolute",
    left: 60,
    right: 0,
    bottom: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#C6C6C8",
  },
  bottomSpacer: {
    height: 24,
  },
  emptyText: {
    color: "#8E8E93",
    fontSize: 15,
    marginHorizontal: 32,
    marginTop: 24,
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
