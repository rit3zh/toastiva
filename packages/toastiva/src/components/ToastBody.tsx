import React, { memo } from "react";
import { Pressable, Text } from "react-native";
import Animated from "react-native-reanimated";
import { useToastTheme } from "../context";
import { styles } from "../styles/toast.styles";
import type { IToastBodyProps } from "../typings";
import { getActionWrapStyle } from "../utils/toast-action-wrap-style";
import { ToastDescription } from "./ToastDescription";
import { ToastProgress } from "./ToastProgress";

const ToastBody: React.MemoExoticComponent<React.FC<IToastBodyProps>> = memo(
  ({
    ...props
  }: IToastBodyProps): (React.ReactNode & React.ReactElement) | null => {
    const theme = useToastTheme();

    if (!props.showBody) return null;

    if (props.toast.content) {
      return (
        <Animated.View
          style={[styles.body, props.bodyStyle]}
          pointerEvents={props.canInteract ? "auto" : "none"}
        >
          {props.toast.content}
          {!props.toast.isLoading && props.showProgress ? (
            <ToastProgress
              inline
              backgroundColor={`${props.color}55`}
              style={props.progressStyle}
            />
          ) : null}
        </Animated.View>
      );
    }

    if (!props.toast.description && !props.toast.action) return null;

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
                  backgroundColor: theme.actionColors[props.toast.type],
                  opacity: pressed ? 0.84 : 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.actionLabel,
                  { color: theme.actionTextColors[props.toast.type] },
                ]}
              >
                {props.toast.action.label}
              </Text>
            </Pressable>
          </Animated.View>
        ) : null}
        {!props.toast.isLoading && props.showProgress ? (
          <ToastProgress
            inline
            backgroundColor={`${props.color}55`}
            style={props.progressStyle}
          />
        ) : null}
      </Animated.View>
    );
  },
);

export { ToastBody };
