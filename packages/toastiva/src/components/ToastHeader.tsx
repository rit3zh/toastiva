import { BlurView } from "expo-blur";
import React, { memo } from "react";
import { Platform, View } from "react-native";
import Animated from "react-native-reanimated";
import { useToastHeaderMorph } from "../hooks/use-toast-header-morph";
import { styles } from "../styles/toast.styles";
import type { IToastHeaderProps } from "../typings";
import { ToastivaHorizontalAlign } from "../typings";
import {
  createHeaderLayer,
  getHeaderTitleStyle,
  headerContentStyle,
  headerOverlayContentStyle,
  headerRootStyle,
} from "../utils/toast-header-animation";
import { ToastHeaderContent } from "./ToastHeaderContent";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const ToastHeader: React.NamedExoticComponent<IToastHeaderProps> = memo(
  function ToastHeader(
    props: IToastHeaderProps,
  ): (React.ReactNode & React.ReactElement) | null {
    const baseStyle = [
      props.measure ? styles.measureHeader : styles.header,
      props.align === ToastivaHorizontalAlign.Center
        ? styles.headerCentered
        : null,
      props.showIcon === false ? styles.headerNoIcon : null,
      props.align === ToastivaHorizontalAlign.Right ? styles.headerRight : null,
      props.styleOverrides?.header,
      headerRootStyle,
    ];

    const liveStyle = [styles.headerClip, ...baseStyle, props.maxWidthStyle];
    const morph = useToastHeaderMorph({
      color: props.color,
      headerContent: props.headerContent,
      Icon: props.Icon,
      icon: props.icon,
      measure: props.measure,
      morphSpringConfig: props.morphSpringConfig,
      showIcon: props.showIcon,
      showIconBadge: props.showIconBadge,
      title: props.title,
      type: props.type,
    });
    const hasPrevLayer = Boolean(morph.headerLayer.prev);
    const renderHeaderLayer = (
      layer: typeof morph.headerLayer.current,
      titleStyle = getHeaderTitleStyle(props),
    ) =>
      layer.headerContent ?? (
        <ToastHeaderContent
          align={props.align}
          layer={layer}
          styleOverrides={props.styleOverrides}
          titleStyle={titleStyle}
        />
      );

    if (props.measure) {
      return (
        <View style={baseStyle} onLayout={props.onLayout}>
          {props.headerContent ?? (
            <ToastHeaderContent
              align={props.align}
              layer={createHeaderLayer(props)}
              styleOverrides={props.styleOverrides}
              titleStyle={getHeaderTitleStyle(props)}
            />
          )}
        </View>
      );
    }

    return (
      <Animated.View
        style={[
          liveStyle,
          morph.animatedFilterStyle,
          {
            backgroundColor: "transparent",
          },
        ]}
        onLayout={props.onLayout}
        collapsable={false}
      >
        {hasPrevLayer ? (
          <Animated.View
            key={morph.headerLayer.prev!.key}
            pointerEvents="none"
            style={[
              headerOverlayContentStyle,
              props.showIcon === false ? styles.headerOverlayNoIcon : null,
              morph.prevHeaderStyle,
            ]}
          >
            {renderHeaderLayer(morph.headerLayer.prev!)}
          </Animated.View>
        ) : null}

        <Animated.View
          key="current"
          style={[
            headerContentStyle,
            props.showIcon === false ? styles.headerContentNoIcon : null,
            morph.currentHeaderStyle,
          ]}
        >
          {renderHeaderLayer(morph.headerLayer.current)}
        </Animated.View>
        {Platform.OS === "ios" && !props.disableIOSBlur ? (
          <AnimatedBlurView
            animatedProps={morph.animatedBlurProps}
            pointerEvents="none"
            style={styles.headerBlur}
            tint={props.iosBlurTint}
          />
        ) : null}
      </Animated.View>
    );
  },
);

export { ToastHeader };
