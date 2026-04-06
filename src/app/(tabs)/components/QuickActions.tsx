import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";
import {
  PresentationQuickActionId,
  type IPresentationQuickActionItem,
  type IQuickActionButtonProps,
} from "@/typings";
import { showQuickActionToast } from "@/utils";

const actions: IPresentationQuickActionItem[] = [
  {
    id: PresentationQuickActionId.AddMoney,
    label: "Add money",
    icon: (
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Line
          x1="12"
          y1="5"
          x2="12"
          y2="19"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <Line
          x1="5"
          y1="12"
          x2="19"
          y2="12"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </Svg>
    ),
  },
  {
    id: PresentationQuickActionId.Move,
    label: "Move",
    icon: (
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Path
          d="M4 17l4-4-4-4"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M20 7l-4 4 4 4"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Line
          x1="8"
          y1="13"
          x2="16"
          y2="11"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </Svg>
    ),
  },
  {
    id: PresentationQuickActionId.Details,
    label: "Details",
    icon: (
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Path
          d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
          stroke="white"
          strokeWidth="2"
        />
        <Path
          d="M7 9h4M7 12h2"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <Path d="M3 9l18 0" stroke="white" strokeWidth="1.5" />
      </Svg>
    ),
  },
  {
    id: PresentationQuickActionId.More,
    label: "More",
    icon: (
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Circle cx="6" cy="12" r="2" fill="white" />
        <Circle cx="12" cy="12" r="2" fill="white" />
        <Circle cx="18" cy="12" r="2" fill="white" />
      </Svg>
    ),
  },
];

function QuickActionButton(props: IQuickActionButtonProps) {
  return (
    <Pressable
      style={styles.action}
      onPress={() => props.onPress(props.item.id)}
    >
      <View style={styles.iconCircle}>{props.item.icon}</View>
      <Text style={styles.label}>{props.item.label}</Text>
    </Pressable>
  );
}

function QuickActions() {
  const router = useRouter();

  const handlePress = (actionId: PresentationQuickActionId) => {
    if (actionId === PresentationQuickActionId.AddMoney) {
      router.push("/add-money");
      return;
    }
    showQuickActionToast({ actionId });
  };

  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <QuickActionButton
          key={action.id}
          item={action}
          onPress={handlePress}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  action: {
    alignItems: "center",
    gap: 8,
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "white",
    fontSize: 13,
    fontWeight: "500",
  },
});

export { QuickActions };
