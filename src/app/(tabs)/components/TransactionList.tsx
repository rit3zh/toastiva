import {
  PresentationTransactionId,
  ToastBodyLayout,
  ToastType,
  type IPresentationTransactionItem,
  type IPresentationTransactionRowProps,
} from "@/typings";
import { showAllActivityToast, showTransactionToast } from "@/utils";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, ClipPath, Defs, G, Rect } from "react-native-svg";

const transactions: IPresentationTransactionItem[] = [
  {
    bodyLayout: ToastBodyLayout.Left,
    description:
      "Your same-day conversion settled and is ready for card spend.",
    from: "SGD",
    id: PresentationTransactionId.FxTransfer,
    meta: "FX booked",
    primaryAmount: "+US$1.49",
    secondaryAmount: "-S$2.00",
    time: "Today, 23:27",
    title: "FX transfer completed",
    to: "USD",
    type: ToastType.Success,
  },
  {
    bodyLayout: ToastBodyLayout.Spread,
    description:
      "Your salary sweep is queued with your favorite allocation rules.",
    from: "Salary",
    id: PresentationTransactionId.SalarySweep,
    meta: "Recurring rule",
    primaryAmount: "-S$2.00",
    secondaryAmount: "+US$1.49",
    time: "Tomorrow, 08:30",
    title: "Sweep scheduled",
    to: "USD",
    type: ToastType.Info,
  },
];

function FlagIcon() {
  return (
    <View style={styles.flagStack}>
      <View style={[styles.flag, { zIndex: 2 }]}>
        <Svg width={32} height={32} viewBox="0 0 32 32">
          <Defs>
            <ClipPath id="flagClip1">
              <Circle cx="16" cy="16" r="14" />
            </ClipPath>
          </Defs>
          <G clipPath="url(#flagClip1)">
            <Rect x="0" y="0" width="32" height="16" fill="#ED2939" />
            <Rect x="0" y="16" width="32" height="16" fill="white" />
            <Circle cx="11" cy="16" r="5" fill="white" />
          </G>
          <Circle
            cx="16"
            cy="16"
            r="14"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
            fill="none"
          />
        </Svg>
      </View>
      <View style={[styles.flag, styles.flagOverlap]}>
        <Svg width={32} height={32} viewBox="0 0 32 32">
          <Defs>
            <ClipPath id="flagClip2">
              <Circle cx="16" cy="16" r="14" />
            </ClipPath>
          </Defs>
          <G clipPath="url(#flagClip2)">
            <Rect x="0" y="0" width="32" height="11" fill="#B22234" />
            <Rect x="0" y="11" width="32" height="10" fill="white" />
            <Rect x="0" y="21" width="32" height="11" fill="#B22234" />
            <Rect x="0" y="0" width="13" height="16" fill="#3C3B6E" />
          </G>
          <Circle
            cx="16"
            cy="16"
            r="14"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
            fill="none"
          />
        </Svg>
      </View>
    </View>
  );
}

function TransactionRow(props: IPresentationTransactionRowProps) {
  return (
    <Pressable onPress={() => props.onPress(props.item)} style={styles.row}>
      <FlagIcon />
      <View style={styles.rowInfo}>
        <Text style={styles.rowTitle}>
          {props.item.from} → {props.item.to}
        </Text>
        <Text style={styles.rowTime}>{props.item.time}</Text>
      </View>
      <View style={styles.rowAmounts}>
        <Text style={styles.primaryAmount}>{props.item.primaryAmount}</Text>
        <Text style={styles.secondaryAmount}>{props.item.secondaryAmount}</Text>
      </View>
    </Pressable>
  );
}

function TransactionList() {
  return (
    <View style={styles.container}>
      {transactions.map((item, index) => (
        <React.Fragment key={item.id}>
          <TransactionRow
            item={item}
            onPress={(selectedItem) => {
              showTransactionToast({ item: selectedItem });
            }}
          />
          {index === 0 ?
            <View style={styles.divider} />
          : null}
        </React.Fragment>
      ))}
      <Pressable onPress={showAllActivityToast} style={styles.seeAllContainer}>
        <Text style={styles.seeAll}>See all</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    marginHorizontal: 16,
    paddingVertical: 6,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  flagStack: {
    width: 44,
    height: 32,
  },
  flag: {
    position: "absolute",
    top: 0,
  },
  flagOverlap: {
    left: 14,
    top: 2,
  },
  rowInfo: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  rowTime: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 13,
  },
  rowAmounts: {
    alignItems: "flex-end",
    gap: 2,
  },
  primaryAmount: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryAmount: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 13,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginHorizontal: 16,
  },
  seeAllContainer: {
    alignItems: "center",
    paddingVertical: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(255,255,255,0.1)",
    marginTop: 4,
  },
  seeAll: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 15,
    fontWeight: "600",
  },
});

export { TransactionList };
