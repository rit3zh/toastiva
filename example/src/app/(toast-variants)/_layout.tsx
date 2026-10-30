import * as React from 'react';
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerLargeTitleEnabled: false,
          headerLargeTitleShadowVisible: false,
          headerTitle: 'Toastiva',
          headerTitleStyle: { color: "#000" },
          headerShown: true,
          freezeOnBlur: false,
        
        }}
      />
      <Stack.Screen
        name="check-balance"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerBackVisible: false,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="create-room"
        options={{
          presentation: "formSheet",
        }}
      />

      <Stack.Screen
        name="edit-profile"
        options={{
          presentation: "formSheet",
        }}
      />
    </Stack>
  );
}
