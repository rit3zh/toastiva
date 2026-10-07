import { DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastivaMode, ToastivaProvider } from "toastiva";
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider value={DefaultTheme}>
          <ToastivaProvider mode={ToastivaMode.Morph}>
            <Stack>
              <Stack.Screen
                name="(toast-variants)"
                options={{
                  headerShown: false,
                }}
              />
            </Stack>
          </ToastivaProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
