import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { showAccountsToast } from "@/utils";

function BalanceCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Personal · All accounts</Text>
      <View style={styles.balanceRow}>
        <Text style={styles.balanceDollar}>$19</Text>
        <Text style={styles.balanceCents}>.98</Text>
      </View>
      <Pressable onPress={showAccountsToast} style={styles.accountsButton}>
        <Text style={styles.accountsText}>Accounts</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
  },
  label: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 15,
    marginBottom: 4,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  balanceDollar: {
    color: "white",
    fontSize: 52,
    fontFamily: "SfProRounded",
  },
  balanceCents: {
    color: "white",
    fontSize: 28,
    fontWeight: "600",
  },
  accountsButton: {
    marginTop: 14,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 8,
  },
  accountsText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
});

export { BalanceCard };
