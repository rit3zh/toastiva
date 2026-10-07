import { Feather } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { DarkTheme, Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toastiva } from "toastiva";

const PFPS: string[] = [
  "https://e1.pxfuel.com/desktop-wallpaper/1014/922/desktop-wallpaper-emojivip-memoji-boy.jpg",
  "https://i.pinimg.com/736x/81/b1/bc/81b1bcdb3f9f6ac035c066529185aa37.jpg",
  "https://i.pinimg.com/474x/46/8b/2c/468b2cba31341e09d7d91bbf8ab60d5e.jpg",
  "https://i.pinimg.com/originals/e9/cf/6e/e9cf6e9a54faea2fd3659a415fcb0ad9.jpg",
  "https://pbs.twimg.com/media/FUF_4icX0AEpADE.jpg",
  "https://i.pinimg.com/736x/f9/db/2e/f9db2e40a11f4b9eba825a0e2ba525ba.jpg",
];

type FamilyMember = {
  name: string;
  subtitle: string;
  avatar: string;
};

const FAMILY: FamilyMember[] = [
  { name: "Jake", subtitle: "Age 7", avatar: PFPS[0] },
  { name: "Jesse", subtitle: "Age 11", avatar: PFPS[1] },
  { name: "Marisa", subtitle: "Age 15", avatar: PFPS[2] },
  { name: "Elizabeth", subtitle: "Adult", avatar: PFPS[3] },
  { name: "Michael", subtitle: "Parent/Guardian", avatar: PFPS[4] },
  { name: "Karina (Me)", subtitle: "Organizer", avatar: PFPS[5] },
];

const AVATAR_SIZE = 76;
const RING_SIZE = 64;
const OVERLAP = 14;
const ROW_AVATAR = 40;

const Chevron = () => <Text style={styles.chevron}>›</Text>;

const SuccessToast = () => {
  const insets = useSafeAreaInsets();

  const [familyMembers, setFamilyMembers] =
    React.useState<FamilyMember[]>(FAMILY);

  const [fontsLoaded] = useFonts({
    SfProRounded: require("../../../assets/fonts/SF-Pro-Rounded-Regular.otf"),
    SfProMedium: require("../../../assets/fonts/SF-Pro-Rounded-Medium.otf"),
  });

  const onButtonSend = <T extends string>(text: T) => {
    if (!text) return;

    setFamilyMembers((prev) => [
      ...prev,
      {
        name: text,
        subtitle: "Invited - Awaiting Response",
        avatar: `https://pbs.twimg.com/profile_images/2018442567407583232/LCIqE-R__400x400.jpg`,
      },
    ]);

    toastiva.success(`${text} has been invited!`, {
      fill: "#fff",
    });
  };

  return (
    <React.Fragment>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerBackButtonDisplayMode: "generic",
        }}
      />

      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          icon="person.badge.plus"
          onPress={() =>
            Alert.prompt(
              "Who would you like to invite?",
              "Type a name or email address to send an invite.",
              [
                {
                  style: "default",
                  text: "Invite",
                  onPress: (text: any) => {
                    return onButtonSend(text);
                  },
                },
              ],
              "plain-text",
              "",
              "",
              { userInterfaceStyle: "light" },
            )
          }
        />
      </Stack.Toolbar>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
      >
        <View
          style={[
            styles.headerContainer,
            {
              paddingTop: insets.top * 2.5,
            },
          ]}
        >
          <View style={styles.row}>
            {PFPS.map((uri, i) => (
              <View
                key={i}
                style={[
                  styles.ring,
                  {
                    marginLeft: i === 0 ? 0 : -OVERLAP,
                    zIndex: PFPS.length - i,
                  },
                ]}
              >
                <Image
                  source={{ uri }}
                  style={styles.avatar}
                  contentFit="cover"
                />
              </View>
            ))}
          </View>
          <Text style={styles.headingText}>Family</Text>
        </View>

        <View style={styles.listSection}>
          {familyMembers.map((member, i) => (
            <React.Fragment key={member.name}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.listRow}
                onPress={() => {
                  toastiva.success(`${member.name} has been invited!`, {
                    fill: "#1c1c1c",
                    showTimestamp: false,
                    showProgress: false,
                    showIcon: true,
                    animationPreset: "smooth",

                    bodyLayout: "center",

                    iosBlurTint: "extraLight",
                    icon: (
                      <View
                        style={{
                          backgroundColor: "#def7dc",
                          width: 20,
                          height: 20,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 100,
                        }}
                      >
                        <Feather name="check" size={12} color="#39c531" />
                      </View>
                    ),
                    description: `${member.name} is part of your family group. You can manage their permissions or remove them at any time.`,
                    styles: {
                      description: {
                        color: "#fff",
                        fontWeight: "500",
                        fontFamily: fontsLoaded ? "SfProMedium" : undefined,
                        marginBottom: 15,
                        top: 10,
                      },
                      action: {
                        bottom: 0,
                      },
                    },
                    showIconBadge: false,
                    action: {
                      label: "Manage",
                      onPress: () => {
                        Alert.alert(
                          "Manage Family Member",
                          `What would you like to do with ${member.name}?`,
                          [
                            {
                              text: "Remove from Family",
                              style: "destructive",
                              onPress: () => {
                                setFamilyMembers((prev) =>
                                  prev.filter((m) => m.name !== member.name),
                                );
                                toastiva.success(
                                  `${member.name} has been removed from your family group.`,
                                  {
                                    fill: "#fff",
                                  },
                                );
                              },
                            },
                            {
                              text: "Cancel",
                              style: "cancel",
                            },
                          ],
                        );
                      },
                    },
                  });
                }}
              >
                <Image
                  source={{ uri: member.avatar }}
                  style={styles.rowAvatar}
                  contentFit="cover"
                />
                <View style={styles.rowText}>
                  <Text
                    style={[
                      styles.rowTitle,
                      {
                        fontFamily: fontsLoaded ? "SfProMedium" : undefined,
                      },
                    ]}
                  >
                    {member.name}
                  </Text>
                  <Text
                    style={[
                      styles.rowSubtitle,
                      {
                        fontFamily: fontsLoaded ? "SfProRounded" : undefined,
                      },
                    ]}
                  >
                    {member.subtitle}
                  </Text>
                </View>
                <Chevron />
              </TouchableOpacity>
              {i < familyMembers.length - 1 && (
                <View style={styles.separator} />
              )}
            </React.Fragment>
          ))}
        </View>

        <Text style={styles.footerText}>
          See what family members can access and share, and manage child account
          settings and parental controls.
        </Text>

        <View style={styles.listSection}>
          <TouchableOpacity activeOpacity={0.4} style={styles.listRow}>
            <View style={[styles.iconTile, { backgroundColor: "#FF9F0A" }]}>
              <SymbolView
                name={"sparkles.rectangle.stack.fill"}
                tintColor={"#fff"}
              />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Family Checklist</Text>
              <Text style={styles.rowSubtitle}>All set</Text>
            </View>
            <Chevron />
          </TouchableOpacity>
        </View>

        <View style={styles.listSection}>
          <TouchableOpacity activeOpacity={0.4} style={styles.listRow}>
            <View style={[styles.iconTile, { backgroundColor: "#FF3B30" }]}>
              <SymbolView
                name={"plus.arrow.trianglehead.clockwise"}
                tintColor={"#fff"}
              />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Subscriptions</Text>
              <Text style={styles.rowSubtitle}>3 subscriptions</Text>
            </View>
            <Chevron />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default SuccessToast;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkTheme.colors.background,
  },
  headerContainer: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  ring: {
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: "#fff",
  },
  headingText: {
    marginTop: 32,
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  listSection: {
    marginTop: 24,
    marginHorizontal: 16,
    backgroundColor: "#1C1C1E",
    borderRadius: 12,
    overflow: "hidden",
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    minHeight: 60,
  },
  rowAvatar: {
    width: ROW_AVATAR,
    height: ROW_AVATAR,
    borderRadius: ROW_AVATAR / 2,
    backgroundColor: "#2C2C2E",
  },
  rowText: {
    flex: 1,
    marginLeft: 12,
  },
  rowTitle: {
    fontSize: 17,
    color: "#FFFFFF",
  },
  rowSubtitle: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 2,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#38383A",
    marginLeft: 66,
  },
  chevron: {
    fontSize: 22,
    color: "#48484A",
    marginLeft: 8,
    fontWeight: "300",
  },
  footerText: {
    fontSize: 13,
    color: "#8E8E93",
    marginTop: 8,
    marginHorizontal: 32,
    lineHeight: 18,
    textAlign: "center",
  },
  iconTile: {
    width: ROW_AVATAR,
    height: ROW_AVATAR,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  iconGlyph: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
});
