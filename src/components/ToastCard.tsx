import { styles } from "@/styles/toast.styles";
import type { IToastCardProps } from "@/typings";
import { ToastHorizontalAlign } from "@/typings";
import { Pressable } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { ToastMeasure } from "./ToastMeasure";
import { ToastSurface } from "./ToastSurface";

function ToastCard(props: IToastCardProps) {
  const mirrored = props.morphAlign === ToastHorizontalAlign.Right;
  const stackAlign =
    props.stackAlign === ToastHorizontalAlign.Center
      ? "center"
      : props.stackAlign === ToastHorizontalAlign.Right
        ? "flex-end"
        : "flex-start";
  const morphAlign =
    props.morphAlign === ToastHorizontalAlign.Center
      ? "center"
      : props.morphAlign === ToastHorizontalAlign.Right
        ? "flex-end"
        : "flex-start";

  return (
    <Animated.View
      style={[
        styles.toastOuter,
        props.isTop ? styles.anchorTop : styles.anchorBottom,
        { alignItems: stackAlign },
        props.animated.cardStyle,
      ]}
    >
      <GestureDetector gesture={props.gesture}>
        <Pressable onPress={props.onPress} style={styles.pressable}>
          <Animated.View
            style={[
              styles.surfaceShell,
              styles.surfaceShadow,
              props.animated.shellStyle,
            ]}
          >
            <Animated.View
              style={[
                styles.clipContainer,
                styles.clipFill,
                { alignItems: morphAlign },
              ]}
            >
              <ToastSurface
                toast={props.toast}
                Icon={props.Icon}
                actionStyle={props.animated.actionStyle}
                animatedPathProps={props.animated.animatedPathProps}
                bodyLayout={props.bodyLayout}
                bodyStyle={props.animated.bodyStyle}
                bodyWidth={props.widths.bodyWidth}
                headerAlign={props.headerAlign}
                color={props.color}
                canInteract={props.isFront || props.expanded}
                contentStyle={props.animated.contentStyle}
                descriptionStyle={props.animated.descriptionStyle}
                meta={props.meta}
                mirrored={mirrored}
                onAction={props.onAction}
                progressStyle={props.animated.progressStyle}
                renderHeight={props.heights.renderHeight}
                showBody={props.showBody}
              />
            </Animated.View>
          </Animated.View>
          <ToastMeasure
            bodyLayout={props.bodyLayout}
            bodyWidth={props.widths.bodyWidth}
            headerAlign={props.headerAlign}
            color={props.color}
            Icon={props.Icon}
            meta={props.meta}
            onMeasureCard={props.measure.onMeasureCard}
            onMeasureHeader={props.measure.onMeasureHeader}
            toast={props.toast}
          />
        </Pressable>
      </GestureDetector>
    </Animated.View>
  );
}

export { ToastCard };
