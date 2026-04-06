import { styles } from "@/styles/toast.styles";
import type { IToastHeaderProps } from "@/typings";
import { ToastHorizontalAlign } from "@/typings";
import { Text, View } from "react-native";
import { ICON_SIZE } from "../constants";

function ToastHeader(props: IToastHeaderProps) {
  const style = [
    props.measure ? styles.measureHeader : styles.header,
    props.align === ToastHorizontalAlign.Center ? styles.headerCentered : null,
    props.align === ToastHorizontalAlign.Right ? styles.headerRight : null,
  ];

  return (
    <View style={style} onLayout={props.onLayout}>
      <View style={styles.iconWrap}>
        {props.icon ?? <props.Icon size={ICON_SIZE} color={props.color} />}
      </View>
      <Text
        style={[
          styles.titleText,
          props.align === ToastHorizontalAlign.Center
            ? styles.textCenter
            : null,
          props.align === ToastHorizontalAlign.Right
            ? styles.textRight
            : styles.textLeft,
          { color: props.color },
        ]}
        numberOfLines={1}
      >
        {props.title}
      </Text>
    </View>
  );
}

export { ToastHeader };
