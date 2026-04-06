import { styles } from "@/styles/toast.styles";
import type { IToastMeasureBodyProps } from "@/typings";
import { ToastBodyLayout } from "@/typings";
import { Text, View } from "react-native";
import { typeActionColors, typeActionTextColors } from "../icons";
import { ToastDescription } from "./ToastDescription";

function getActionWrapStyle(layout: IToastMeasureBodyProps["bodyLayout"]) {
  if (layout === ToastBodyLayout.Center) return styles.actionWrapCenter;
  if (layout === ToastBodyLayout.Right) return styles.actionWrapRight;
  return null;
}

function ToastMeasureBody(props: IToastMeasureBodyProps) {
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
        <View style={[styles.actionWrap, getActionWrapStyle(props.bodyLayout)]}>
          <View
            style={[
              styles.actionBtn,
              { backgroundColor: typeActionColors[props.toast.type] },
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
          </View>
        </View>
      ) : null}
      <View style={styles.measureInlineProgress} />
    </View>
  );
}

export { ToastMeasureBody };
