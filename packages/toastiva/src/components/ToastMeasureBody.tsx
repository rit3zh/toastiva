import React, { memo } from "react";
import { Text, View } from "react-native";
import { useToastTheme } from "../context";
import { styles } from "../styles/toast.styles";
import type { IToastMeasureBodyProps } from "../typings";
import { getActionWrapStyle } from "../utils/toast-action-wrap-style";
import { ToastDescription } from "./ToastDescription";

const ToastMeasureBody: React.MemoExoticComponent<
  React.FC<IToastMeasureBodyProps>
> = memo(
  ({
    ...props
  }: IToastMeasureBodyProps): (React.ReactNode & React.ReactElement) | null => {
    const theme = useToastTheme();

    if (props.toast.content) {
      return <View style={styles.measureBody}>{props.toast.content}</View>;
    }

    if (!props.toast.description && !props.toast.action) return null;

    return (
      <View style={styles.measureBody}>
        {props.toast.description ? (
          <View style={props.toast.action ? styles.descWithAction : null}>
            <ToastDescription
              description={props.toast.description}
              meta={props.meta}
              layout={props.bodyLayout}
            />
          </View>
        ) : null}
        {props.toast.action ? (
          <View
            style={[styles.actionWrap, getActionWrapStyle(props.bodyLayout)]}
          >
            <View
              style={[
                styles.actionBtn,
                { backgroundColor: theme.actionColors[props.toast.type] },
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
            </View>
          </View>
        ) : null}
        {!props.toast.isLoading ? (
          <View style={styles.measureInlineProgress} />
        ) : null}
      </View>
    );
  },
);

export { ToastMeasureBody };
