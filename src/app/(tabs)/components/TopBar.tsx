import type { IIconButtonProps } from "@/typings";
import {
  showAccountsToast,
  showConnectionToast,
  showSearchPreviewToast,
  showTopBarCardsToast,
} from "@/utils";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Path, Rect } from "react-native-svg";

function Avatar() {
  return (
    <Pressable onPress={showAccountsToast} style={styles.avatarContainer}>
      <View style={styles.avatar}>
        <Image
          source={{
            uri: "https://pbs.twimg.com/profile_images/2018442567407583232/LCIqE-R__400x400.jpg",
          }}
          style={styles.avatarImage}
        />
      </View>
      <View style={styles.notificationDot} />
    </Pressable>
  );
}

function SearchBar() {
  return (
    <Pressable onPress={showSearchPreviewToast} style={styles.searchBar}>
      <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
        <Circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2" />
        <Path
          d="M16 16l4 4"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </Svg>
      <Text style={styles.searchText}>Search</Text>
    </Pressable>
  );
}

function IconButton(props: IIconButtonProps) {
  return (
    <Pressable style={styles.iconButton} onPress={props.onPress}>
      {props.children}
    </Pressable>
  );
}

function TopBar() {
  return (
    <View style={styles.container}>
      <Avatar />
      <SearchBar />
      <IconButton onPress={showConnectionToast}>
        <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
          <Rect
            x="3"
            y="3"
            width="6"
            height="18"
            rx="1"
            fill="white"
            opacity={0.6}
          />
          <Rect x="11" y="8" width="6" height="13" rx="1" fill="white" />
          <Rect
            x="19"
            y="5"
            width="2"
            height="16"
            rx="1"
            fill="white"
            opacity={0.4}
          />
        </Svg>
      </IconButton>
      <IconButton onPress={showTopBarCardsToast}>
        <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
          <Rect
            x="2"
            y="4"
            width="20"
            height="14"
            rx="2"
            stroke="white"
            strokeWidth="2"
          />
          <Path d="M2 10h20" stroke="white" strokeWidth="2" />
        </Svg>
      </IconButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 10,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  notificationDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#888888",
    borderWidth: 1.5,
    borderColor: "#222222",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
  },
  searchText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { TopBar };
