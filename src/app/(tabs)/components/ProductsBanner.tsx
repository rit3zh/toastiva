import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { showProductToast } from "@/utils";

function ProductsBanner() {
  return (
    <Pressable onPress={showProductToast} style={styles.container}>
      <Text style={styles.text}>Products for you</Text>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: 14,
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    fontWeight: "600",
  },
  chevron: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 22,
    fontWeight: "600",
  },
});

export { ProductsBanner };
