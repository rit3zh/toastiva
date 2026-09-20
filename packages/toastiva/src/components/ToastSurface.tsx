import React, { memo } from "react";
import { Platform, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import Svg from "react-native-svg";
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
            fill="none"
            style={[
              styles.svgBg,
              Platform.OS === "web" ? svgShapeShadowStyle : null,
            ]}
          >
            <BlobPath
              animatedProps={props.animatedPathProps}
              fill={props.surfaceFill}
              stroke={props.stroke}
              strokeWidth={0.6}
            />
          </Svg>

          <Animated.View
            style={[
              styles.content,
              { width: props.bodyWidth },
              props.styleOverrides?.content,
              props.contentStyle,
            ]}
            pointerEvents="box-none"
          >
            {props.noHeader ? null : (
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
                  iosBlurTint={props.iosBlurTint}
                  maxWidthStyle={props.headerMaxWidthStyle}
                  morphSpringConfig={props.morphSpringConfig}
                  disableIOSBlur={props.disableIOSBlur}
                  showIcon={props.toast.showIcon}
                  showIconBadge={props.toast.showIconBadge}
                  styleOverrides={props.styleOverrides}
                  title={props.toast.title}
                  type={props.toast.type}
                />
              </Animated.View>
            )}

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
              styleOverrides={props.styleOverrides}
              toast={props.toast}
            />
          </Animated.View>

          {!hasBodyContent && !props.toast.isLoading && props.showProgress ? (
            <View>
              <ToastProgress
                backgroundColor={`${props.color}40`}
                fillStyle={props.styleOverrides?.progressFill}
                trackStyle={props.styleOverrides?.progressTrack}
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
