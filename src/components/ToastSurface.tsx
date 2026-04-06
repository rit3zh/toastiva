import { styles } from "@/styles/toast.styles";
import type { IToastSurfaceProps } from "@/typings";
import { View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import Svg from "react-native-svg";
import { typeSurfaceColors, typeSurfaceStrokeColors } from "../icons";
import { BlobPath } from "./BlobPath";
import { ToastBody } from "./ToastBody";
import { ToastHeader } from "./ToastHeader";
import { ToastProgress } from "./ToastProgress";

function ToastSurface(props: IToastSurfaceProps) {
  const hasBody =
    props.showBody && Boolean(props.toast.description || props.toast.action);

  return (
    <View
      style={[
        styles.surfaceCanvas,
        props.mirrored ? styles.flipX : null,
        { width: props.bodyWidth, height: props.renderHeight },
      ]}
    >
      <Svg
        width={props.bodyWidth}
        height={props.renderHeight}
        viewBox={`0 0 ${props.bodyWidth} ${props.renderHeight}`}
        style={styles.svgBg}
      >
        <BlobPath
          animatedProps={props.animatedPathProps}
          fill={typeSurfaceColors[props.toast.type]}
          stroke={typeSurfaceStrokeColors[props.toast.type]}
          strokeWidth={0.9}
        />
      </Svg>
      <Animated.View
        style={[
          styles.content,
          props.mirrored ? styles.flipX : null,
          { width: props.bodyWidth },
          props.contentStyle,
        ]}
        pointerEvents="box-none"
      >
        <Animated.View
          entering={hasBody ? undefined : FadeIn.duration(160)}
          exiting={hasBody ? undefined : FadeOut.duration(110)}
        >
          <ToastHeader
            align={props.headerAlign}
            color={props.color}
            icon={props.toast.icon}
            Icon={props.Icon}
            title={props.toast.title}
          />
        </Animated.View>
        <ToastBody
          actionStyle={props.actionStyle}
          bodyLayout={props.bodyLayout}
          bodyStyle={props.bodyStyle}
          canInteract={props.canInteract}
          color={props.color}
          descriptionStyle={props.descriptionStyle}
          meta={props.meta}
          onAction={props.onAction}
          progressStyle={props.progressStyle}
          showBody={props.showBody}
          toast={props.toast}
        />
      </Animated.View>
      {!hasBody ? (
        <View style={props.mirrored ? styles.flipX : null}>
          <ToastProgress
            backgroundColor={`${props.color}40`}
            style={props.progressStyle}
          />
        </View>
      ) : null}
    </View>
  );
}

export { ToastSurface };
