import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";

const { width, height } = Dimensions.get("window");

export const GradientBackground = () => (
  <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
    <Defs>
      <LinearGradient id="bg" x1="0.5" y1="0" x2="0.5" y2="1">
        <Stop offset="0" stopColor="#333333" stopOpacity="1" />
        <Stop offset="0.3" stopColor="#1A1A1A" stopOpacity="1" />
        <Stop offset="0.6" stopColor="#0F0F0F" stopOpacity="1" />
        <Stop offset="1" stopColor="#000000" stopOpacity="1" />
      </LinearGradient>
    </Defs>
    <Rect x="0" y="0" width={width} height={height} fill="url(#bg)" />
  </Svg>
);
