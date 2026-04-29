import React, { memo } from "react";
import { Platform, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import Svg from "react-native-svg";
import { useToastTheme } from "../context";
import { styles } from "../styles/toast.styles";
import type { IToastSurfaceProps } from "../typings";
import { BlobPath } from "./BlobPath";
import { ToastBody } from "./ToastBody";
import { ToastHeader } from "./ToastHeader";
import { ToastProgress } from "./ToastProgress";

const ToastSurface: React.MemoExoticComponent<React.FC<IToastSurfaceProps>> =
  memo(
    ({
      ...props
    }: IToastSurfaceProps): (React.ReactNode & React.ReactElement) | null => {
      const theme = useToastTheme();
      const hasBodyContent = Boolean(
        props.toast.description || props.toast.action || props.toast.content,
      );

      return (
        <View
          style={[
            styles.surfaceCanvas,
            { width: props.bodyWidth, height: props.renderHeight },
          ]}
        >
          <Svg
            width={props.bodyWidth}
            height={props.renderHeight}
            viewBox={`0 0 ${props.bodyWidth} ${props.renderHeight}`}
            // Sileo: SVG canvas stays a stable container; pill geometry animates
            // inside it. With overflow="visible", a path drawn at a width that
            // exceeds the static canvas (e.g. while pillWidth.value is still
            // springing toward a smaller measured bodyWidth) still renders its
            // full rounded right edge — the clipContainer above handles all
            // visual cropping at the animated shell width.
            style={[
              styles.svgBg,
              Platform.OS === "web" ? svgShapeShadowStyle : null,
            ]}
          >
            <BlobPath
              animatedProps={props.animatedPathProps}
              fill={theme.surfaceColors[props.toast.type]}
              stroke={theme.surfaceStrokeColors[props.toast.type]}
              strokeWidth={0.6}
            />
          </Svg>

          <Animated.View
            style={[
              styles.content,
              { width: props.bodyWidth },
              props.contentStyle,
            ]}
            pointerEvents="box-none"
          >
            {/* Outer wrapper: preserves original toast-level FadeIn/FadeOut */}

            <Animated.View
              entering={hasBodyContent ? undefined : FadeIn.duration(500)}
              exiting={hasBodyContent ? undefined : FadeOut.duration(500)}
            >
              <ToastHeader
                align={props.headerAlign}
                color={props.color}
                headerContent={props.toast.headerContent}
                Icon={props.Icon}
                icon={props.toast.icon}
                maxWidthStyle={props.headerMaxWidthStyle}
                morphSpringConfig={props.morphSpringConfig}
                title={props.toast.title}
                type={props.toast.type}
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
              showProgress={props.showProgress}
              toast={props.toast}
            />
          </Animated.View>

          {!hasBodyContent && !props.toast.isLoading && props.showProgress ? (
            <View>
              <ToastProgress
                backgroundColor={`${props.color}40`}
                style={props.progressStyle}
              />
            </View>
          ) : null}
        </View>
      );
    },
  );

const svgShapeShadowStyle = {
  filter: "drop-shadow(0px 12px 24px rgba(0,0,0,0.22))" as const,
};

export { ToastSurface };
