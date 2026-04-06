import { showAddMoneyToast } from "@/utils";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AddMoneyModal() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [amount, setAmount] = useState("");

  const [fontsLoaded] = useFonts({
    SfProRounded: require("../assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplayMedium: require("../assets/fonts/HelveticaNowDisplayMedium.ttf"),
  });

  const quickAmounts = [10, 25, 50, 100];

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 16 }]}>
      <View style={styles.handle} />

      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            {
              fontFamily: fontsLoaded ? "SfProRounded" : undefined,
            },
          ]}
        >
          Add money
        </Text>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={styles.closeButton}
        >
          <SymbolView
            name="xmark"
            size={16}
            tintColor="rgba(255,255,255,0.4)"
          />
        </Pressable>
      </View>

      <View style={styles.inputSection}>
        <Text
          style={[
            styles.currency,
            {
              fontFamily: fontsLoaded ? "HelveticaNowDisplayMedium" : undefined,
            },
          ]}
        >
          $
        </Text>
        <TextInput
          style={[
            styles.amountInput,
            {
              fontFamily: fontsLoaded ? "HelveticaNowDisplayMedium" : undefined,
            },
          ]}
          value={amount}
          onChangeText={setAmount}
          placeholder="0"
          placeholderTextColor="rgba(255,255,255,0.2)"
          keyboardType="decimal-pad"
          selectionColor="rgba(255,255,255,0.4)"
        />
      </View>

      <View style={styles.quickAmounts}>
        {quickAmounts.map((val) => (
          <Pressable
            key={val}
            style={[
              styles.quickButton,
              amount === String(val) && styles.quickButtonActive,
            ]}
            onPress={() => setAmount(String(val))}
          >
            <Text
              style={[
                styles.quickText,
                amount === String(val) && styles.quickTextActive,
              ]}
            >
              ${val}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.divider} />

      <Pressable style={styles.methodRow}>
        <SymbolView
          name="building.columns"
          size={20}
          tintColor="rgba(255,255,255,0.5)"
        />
        <View style={styles.methodInfo}>
          <Text style={styles.methodName}>Bank Account</Text>
          <Text style={styles.methodDetail}>•••• 4289</Text>
        </View>
        <SymbolView
          name="chevron.right"
          size={12}
          tintColor="rgba(255,255,255,0.2)"
        />
      </Pressable>

      <View style={{ flex: 1 }} />

      <Pressable
        style={[styles.addButton, !amount && styles.addButtonDisabled]}
        disabled={!amount}
        onPress={() => {
          router.back();
          showAddMoneyToast({ amount });
        }}
      >
        <Text style={styles.addButtonText}>
          {amount ? `Add $${amount}` : "Add money"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 14,
  },
  handle: {
    width: 36,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "center",
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontFamily: "SfProRounded",

    letterSpacing: -0.3,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  inputSection: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginBottom: 28,
  },
  currency: {
    color: "white",
    fontSize: 56,

    opacity: 0.9,
  },
  amountInput: {
    color: "white",
    fontSize: 56,
    minWidth: 60,
    padding: 0,
  },
  quickAmounts: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 32,
  },
  quickButton: {
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  quickButtonActive: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderColor: "rgba(255,255,255,0.25)",
  },
  quickText: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 14,
    fontFamily: "SfProRounded",
  },
  quickTextActive: {
    color: "white",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginBottom: 16,
  },
  methodRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 4,
  },
  methodInfo: {
    flex: 1,
    gap: 1,
  },
  methodName: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 15,
    fontFamily: "SfProRounded",
    fontWeight: "500",
  },
  methodDetail: {
    color: "rgba(255,255,255,0.35)",
    fontSize: 13,
    fontFamily: "SfProRounded",
  },
  addButton: {
    backgroundColor: "white",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  addButtonDisabled: {
    opacity: 0.15,
  },
  addButtonText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "SfProRounded",
  },
});
