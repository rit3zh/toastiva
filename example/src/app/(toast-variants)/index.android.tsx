import { MaterialIcons } from "@expo/vector-icons";
import { Stack, useRouter, type Href } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  NativeSyntheticEvent,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInputFocusEventData,
  View,
} from "react-native";
import { toastiva } from "toastiva";
import AirPodsModel from "../../../components/models/3d-airpods";
import { ANIMATION_SECTIONS } from "../../../components/toast-demos";

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>["name"];

type ToastivaShowcaseItem = {
  title: string;
  description: string;
  icon: MaterialIconName;
  tint: string;
  route?: Href;
  onPress?: () => void;
};

type ToastivaShowcaseSection = {
  title: string;
  footer?: string;
  items: ToastivaShowcaseItem[];
};

const ROW_HEIGHT = 72;

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
    footer: "The four built-in tones. Tap any row to preview.",
    items: [
      {
        title: "Success",
        description: "Confirms a completed action.",
        icon: "check-circle",
        tint: "#1E8E3E",
        onPress: () => toastiva.success("Success"),
      },
      {
        title: "Error",
        description: "Surfaces a failure that needs attention.",
        icon: "error",
        tint: "#D93025",
        onPress: () =>
          toastiva.error("Couldn't sync", {
            description: "Check your connection and try again.",
          }),
      },
      {
        title: "Info",
        description: "Shares a neutral status update.",
        icon: "info",
        tint: "#1A73E8",
        onPress: () =>
          toastiva.info("New update available", {
            description: "Version 1.2 is ready to install.",
          }),
      },
      {
        title: "Warning",
        description: "Flags something to double-check.",
        icon: "warning",
        tint: "#F9AB00",
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
        icon: "undo",
        tint: "#5E35B1",
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
        icon: "format-align-left",
        tint: "#5F6368",
        onPress: () => toastiva.success("Copied"),
      },
      {
        title: "Long copy",
        description: "Multiline body that morphs gracefully.",
        icon: "format-align-justify",
        tint: "#0097A7",
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
        icon: "verified",
        tint: "#1E8E3E",
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
        icon: "cancel",
        tint: "#D93025",
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
        icon: "headphones",
        tint: "#202124",
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
              fill: "#202124",
              stroke: "rgba(255,255,255,0.12)",
              showProgress: false,
              bodyLayout: "spread",
            },
          ),
      },
      {
        title: "Dismiss all",
        description: "Clear every toast on screen.",
        icon: "delete",
        tint: "#5F6368",
        onPress: () => toastiva.dismissAll(),
      },
    ],
  },
  ...ANIMATION_SECTIONS,
];

const Index = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

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
        <Text style={styles.sectionHeader}>{section.title}</Text>

        <View style={styles.card}>
          {section?.items.map((item, index) => {
            const isLast = index === section.items.length - 1;
            return (
              <Pressable
                key={item.title}
                onPress={() => {
                  if (item.route) router.push(item.route);
                  else item.onPress?.();
                }}
                android_ripple={{ color: "rgba(0,0,0,0.08)" }}
                style={styles.row}
              >
                <View style={[styles.iconTile, { backgroundColor: item.tint }]}>
                  <MaterialIcons name={item.icon} size={20} color="#FFFFFF" />
                </View>

                <View style={styles.rowText}>
                  <Text style={styles.rowTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.rowDescription} numberOfLines={1}>
                    {item.description}
                  </Text>
                </View>

                <MaterialIcons name="chevron-right" size={24} color="#9AA0A6" />

                {!isLast && <View style={styles.separator} />}
              </Pressable>
            );
          })}
        </View>

        {section.footer ? (
          <Text style={styles.sectionFooter}>{section.footer}</Text>
        ) : null}
      </View>
    ),
    [router],
  );

  return (
    <React.Fragment>
      <StatusBar barStyle={"dark-content"} />

      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placement: "integrated",
            onChangeText,
          },
          headerTitleAlign: "center",
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
          <Text style={styles.emptyText}>No matching toasts.</Text>
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
    backgroundColor: "#FBF8FE",
  },
  scrollContent: {
    paddingTop: 12,
    paddingBottom: 40,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    fontFamily: "sans-serif-medium",
    fontSize: 13,
    fontWeight: "500",
    color: "#65558F",
    marginBottom: 10,
    marginLeft: 20,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  sectionFooter: {
    fontFamily: "sans-serif",
    fontSize: 12,
    color: "#79747E",
    marginTop: 10,
    marginHorizontal: 20,
    lineHeight: 18,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    overflow: "hidden",
    elevation: 0,
    borderWidth: 1,
    borderColor: "#ECE6F0",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
    minHeight: ROW_HEIGHT,
  },
  iconTile: {
    width: 40,
    height: 40,
    borderRadius: 12,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  rowText: {
    flex: 1,
    justifyContent: "center",
  },
  rowTitle: {
    fontFamily: "sans-serif-medium",
    fontSize: 16,
    color: "#1D1B20",
    marginBottom: 2,
    letterSpacing: 0.15,
  },
  rowDescription: {
    fontFamily: "sans-serif",
    fontSize: 13,
    color: "#79747E",
    letterSpacing: 0.1,
  },
  separator: {
    position: "absolute",
    left: 74,
    right: 18,
    bottom: 0,
    height: 1,
    backgroundColor: "#F3EDF7",
  },
  bottomSpacer: {
    height: 24,
  },
  emptyText: {
    fontFamily: "sans-serif",
    color: "#79747E",
    fontSize: 14,
    marginHorizontal: 32,
    marginTop: 24,
    textAlign: "center",
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
    fontFamily: "sans-serif-medium",
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 16,
  },
  airpodsToastMeta: {
    fontFamily: "sans-serif",
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
    fontFamily: "sans-serif",
    color: "rgba(255,255,255,0.74)",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
  },
});
