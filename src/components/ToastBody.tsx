import { styles } from "@/styles/toast.styles";
import type { IToastBodyProps } from "@/typings";
import { ToastBodyLayout } from "@/typings";
import { Pressable, Text } from "react-native";
import Animated from "react-native-reanimated";
import { typeActionColors, typeActionTextColors } from "../icons";
import { ToastDescription } from "./ToastDescription";
import { ToastProgress } from "./ToastProgress";

function getActionWrapStyle(layout: IToastBodyProps["bodyLayout"]) {
  if (layout === ToastBodyLayout.Center) return styles.actionWrapCenter;
  if (layout === ToastBodyLayout.Right) return styles.actionWrapRight;
  return null;
}

function ToastBody(props: IToastBodyProps) {
  if (!props.showBody || (!props.toast.description && !props.toast.action)) {
    return null;
  }

  return (
    <Animated.View
      style={[styles.body, props.bodyStyle]}
      pointerEvents={props.canInteract ? "auto" : "none"}
    >
      {props.toast.description ? (
        <Animated.View
          style={[
            props.toast.action ? styles.descWithAction : null,
            props.descriptionStyle,
          ]}
        >
          <ToastDescription
            description={props.toast.description}
            meta={props.meta}
            layout={props.bodyLayout}
          />
        </Animated.View>
      ) : null}
      {props.toast.action ? (
        <Animated.View
          style={[
            styles.actionWrap,
            getActionWrapStyle(props.bodyLayout),
            props.actionStyle,
          ]}
        >
          <Pressable
            onPress={props.onAction}
            style={({ pressed }) => [
              styles.actionBtn,
              {
                backgroundColor: typeActionColors[props.toast.type],
                opacity: pressed ? 0.84 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.actionLabel,
                { color: typeActionTextColors[props.toast.type] },
              ]}
            >
              {props.toast.action.label}
            </Text>
          </Pressable>
        </Animated.View>
      ) : null}
      <ToastProgress
        inline
        backgroundColor={`${props.color}55`}
        style={props.progressStyle}
      />
    </Animated.View>
  );
}

export { ToastBody };
