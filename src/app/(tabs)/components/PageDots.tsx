import React from "react";
import { StyleSheet, View } from "react-native";

export const PageDots = ({
  count = 3,
  active = 0,
}: {
  count?: number;
  active?: number;
}) => (
  <View style={styles.container}>
    {Array.from({ length: count }).map((_, i) => (
      <View key={i} style={[styles.dot, i === active && styles.activeDot]} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 16,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  activeDot: {
    backgroundColor: "white",
  },
});
