import { useFonts } from "expo-font";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BalanceCard } from "./components/BalanceCard";
import { GradientBackground } from "./components/GradientBackground";
import { PageDots } from "./components/PageDots";
import { ProductsBanner } from "./components/ProductsBanner";
import { QuickActions } from "./components/QuickActions";
import { TopBar } from "./components/TopBar";
import { TransactionList } from "./components/TransactionList";

const Index = () => {
  const insets = useSafeAreaInsets();
  useFonts({
    SfProRounded: require("../../assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplayMedium: require("../../assets/fonts/HelveticaNowDisplayMedium.ttf"),
  });

  return (
    <View style={styles.container}>
      <GradientBackground />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <TopBar />
        <BalanceCard />
        <PageDots count={3} active={2} />
        <QuickActions />
        <TransactionList />
        <ProductsBanner />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default Index;
