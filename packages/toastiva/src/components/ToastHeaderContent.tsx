import React, { memo } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { ICON_SIZE } from "../constants";
import { useToastTheme } from "../context";
import { styles } from "../styles/toast.styles";
import type { IToastHeaderContentProps } from "../typings";
import { ToastivaHorizontalAlign } from "../typings";
const ToastHeaderContent: React.NamedExoticComponent<IToastHeaderContentProps> =
  memo(function ToastHeaderContent({
    ...props
  }: IToastHeaderContentProps): (React.ReactNode & React.ReactElement) | null {
    const theme = useToastTheme();
    return (
      <>
        <View
          style={[
            styles.iconWrap,
            { backgroundColor: theme.badgeBgColors[props.layer.type] },
          ]}
        >
          {props.layer.icon ?? (
            <props.layer.Icon size={ICON_SIZE} color={props.layer.color} />
          )}
        </View>
        <Animated.View style={titleWrapStyle}>
          <Animated.Text
            style={[
              styles.titleText,
              props.align === ToastivaHorizontalAlign.Center
                ? styles.textCenter
                : null,
              props.align === ToastivaHorizontalAlign.Right
                ? styles.textRight
                : styles.textLeft,
              { color: props.layer.color },
              props.titleStyle,
            ]}
            numberOfLines={1}
            ellipsizeMode="clip"
          >
            {props.layer.title}
          </Animated.Text>
        </Animated.View>
      </>
    );
  });

// Natural width — no flexShrink. The text inside has `numberOfLines={1}` +
// `ellipsizeMode="clip"`, so it stays a single line at its intrinsic width.
// Letting this wrap shrink would force RN to re-measure the Text every frame
// the parent's maxWidth/shellWidth animates, which reads as the "rigid jump".
const titleWrapStyle = {
  justifyContent: "center" as const,
};

export { ToastHeaderContent };
