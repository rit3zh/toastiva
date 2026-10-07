import { MaterialIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import {
  toastiva,
  ToastivaMode,
  ToastivaPosition,
  ToastivaProvider,
} from "toastiva";
import {
  STACK_SECTIONS,
  type ToastDemoSection,
} from "../../../components/toast-demos";
import { SquircleView } from "../../../reacticx-components/squircle-view";

const ROW_HEIGHT = 60;

export default function StackPlayground() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    toastiva.dismissAll();
    return () => toastiva.dismissAll();
  }, []);

  const sections = useMemo<ToastDemoSection[]>(
    () => [
      ...STACK_SECTIONS,
      {
        title: "Layout",
        footer: "Fan the whole stack out like Sonner's expanded mode.",
        items: [
          {
            title: expanded ? "Collapse stack" : "Fan out stack",
            description: expanded
              ? "Stack toasts back into a pile."
              : "Show every toast at full height.",
            symbol: expanded
              ? "rectangle.compress.vertical"
              : "rectangle.expand.vertical",
            icon: expanded ? "unfold-less" : "unfold-more",
            tint: "#5E5CE6",
            onPress: () => setExpanded((value) => !value),
          },
        ],
      },
    ],
    [expanded],
  );

  return (
    <ToastivaProvider
      mode={ToastivaMode.Stack}
      position={ToastivaPosition.BottomCenter}
      expand={expanded}
      visibleToasts={4}
    >
      <Stack.Screen options={{ headerTitle: "Stack" }} />
      <FlatList
        data={sections}
        keyExtractor={(section) => section.title}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        renderItem={({ item: section }) => (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>
              {section.title.toUpperCase()}
            </Text>
            <SquircleView
              style={styles.card}
              height={section.items.length * ROW_HEIGHT}
              cornerRadius={28}
              cornerSmoothing={0.98}
              backgroundColor="#fff"
            >
              {section.items.map((item, index) => (
                <Pressable
                  key={item.title}
                  onPress={item.onPress}
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
                        fallback={
                          <MaterialIcons
                            name={item.icon}
                            size={18}
                            color="#FFFFFF"
                          />
                        }
                      />
                    </View>
                  </SquircleView>
                  <View style={styles.rowText}>
                    <Text style={styles.rowTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.rowDescription} numberOfLines={1}>
                      {item.description}
                    </Text>
                  </View>
                  {index < section.items.length - 1 ? (
                    <View style={styles.separator} />
                  ) : null}
                </Pressable>
              ))}
            </SquircleView>
            {section.footer ? (
              <Text style={styles.sectionFooter}>{section.footer}</Text>
            ) : null}
          </View>
        )}
        ListFooterComponent={<View style={styles.bottomSpacer} />}
      />
    </ToastivaProvider>
  );
}

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
  separator: {
    position: "absolute",
    left: 60,
    right: 0,
    bottom: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#C6C6C8",
  },
  bottomSpacer: {
    height: 160,
  },
});
