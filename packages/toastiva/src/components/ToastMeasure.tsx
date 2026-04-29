import { styles } from "../styles/toast.styles";
import type { IToastMeasureProps } from "../typings";
import React, { memo } from "react";
import { View } from "react-native";
import { ToastHeader } from "./ToastHeader";
import { ToastMeasureBody } from "./ToastMeasureBody";

const ToastMeasure: React.MemoExoticComponent<React.FC<IToastMeasureProps>> =
  memo(
    ({
      ...props
    }: IToastMeasureProps): (React.ReactNode & React.ReactElement) | null => {
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
              headerContent={props.toast.headerContent}
              icon={props.toast.icon}
              Icon={props.Icon}
              measure
              onLayout={props.onMeasureHeader}
              title={props.toast.title}
              type={props.toast.type}
            />
            {props.measureBody ?
              <ToastMeasureBody
                bodyLayout={props.bodyLayout}
                meta={props.meta}
                toast={props.toast}
              />
            : null}
          </View>
        </View>
      );
    },
  );

export { ToastMeasure };
