import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GooeyToaster } from "..";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="add-money"
          options={{
            presentation: "formSheet",
            headerShown: false,
            sheetAllowedDetents: [0.6],
          }}
        />
      </Stack>
      <GooeyToaster
        position="top-center"
        duration={5000}
        visibleToasts={3}
        gap={14}
        bodyLayout="center"
        expandedWidth={344}
        horizontalInset={20}
        offset={14}
        springConfig={{
          damping: 17,
          stiffness: 205,
          mass: 0.82,
        }}
        showTimestamp
        swipeToDismiss
      />
    </GestureHandlerRootView>
  );
}
