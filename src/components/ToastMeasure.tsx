import { styles } from "@/styles/toast.styles";
import type { IToastMeasureProps } from "@/typings";
import { View } from "react-native";
import { ToastHeader } from "./ToastHeader";
import { ToastMeasureBody } from "./ToastMeasureBody";

function ToastMeasure(props: IToastMeasureProps) {
  return (
    <View
      style={styles.measureLayer}
      pointerEvents="none"
      onLayout={props.onMeasureCard}
    >
      <View style={[styles.measureCard, { width: props.bodyWidth }]}>
        <ToastHeader
          align={props.headerAlign}
          color={props.color}
          icon={props.toast.icon}
          Icon={props.Icon}
          measure
          onLayout={props.onMeasureHeader}
          title={props.toast.title}
        />
        <ToastMeasureBody
          bodyLayout={props.bodyLayout}
          meta={props.meta}
          toast={props.toast}
        />
      </View>
    </View>
  );
}

export { ToastMeasure };
