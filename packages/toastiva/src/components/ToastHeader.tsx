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
import { BlurView } from "expo-blur";
import React, { memo } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { ToastHeaderContent } from "./ToastHeaderContent";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const ToastHeader: React.NamedExoticComponent<IToastHeaderProps> = memo(
  function ToastHeader(
    props: IToastHeaderProps,
  ): (React.ReactNode & React.ReactElement) | null {
    const baseStyle = [
      props.measure ? styles.measureHeader : styles.header,
      props.align === ToastivaHorizontalAlign.Center ?
        styles.headerCentered
      : null,
      props.align === ToastivaHorizontalAlign.Right ? styles.headerRight : null,
      headerRootStyle,
    ];
    // maxWidthStyle (= { maxWidth: pillWidth.value }) constrains the header
    // to the animated pill width so content never bleeds past the rounded
    // pill boundary. The overlay layer has no `right` constraint, so it
    // won't compress/stretch as maxWidth changes (no "text input" feel).
    const liveStyle = [...baseStyle, props.maxWidthStyle];
    const morph = useToastHeaderMorph({
      color: props.color,
      Icon: props.Icon,
      icon: props.icon,
      measure: props.measure,
      morphSpringConfig: props.morphSpringConfig,
      title: props.title,
      type: props.type,
    });
    const hasPrevLayer = Boolean(morph.headerLayer.prev);

    if (props.measure) {
      return (
        <View style={baseStyle} onLayout={props.onLayout}>
          {props.headerContent ?? (
            <ToastHeaderContent
              align={props.align}
              layer={createHeaderLayer(props)}
              titleStyle={getHeaderTitleStyle(props)}
            />
          )}
        </View>
      );
    }

    // If caller supplies fully custom header content, skip the morph
    // cross-fade system and just render it directly. The pill still resizes
    // around the content via the container's onLayout measurement.
    if (props.headerContent) {
      return (
        <Animated.View
          style={liveStyle}
          onLayout={props.onLayout}
          collapsable={false}
        >
          {props.headerContent}
        </Animated.View>
      );
    }

    return (
      <Animated.View
        style={[liveStyle, morph.animatedFilterStyle]}
        onLayout={props.onLayout}
        collapsable={false}
      >
        {hasPrevLayer ?
          <Animated.View
            key={morph.headerLayer.prev!.key}
            pointerEvents="none"
            style={[headerOverlayContentStyle, morph.prevHeaderStyle]}
          >
            <ToastHeaderContent
              align={props.align}
              layer={morph.headerLayer.prev!}
              titleStyle={getHeaderTitleStyle(props)}
            />
          </Animated.View>
        : null}

        <Animated.View
          key={morph.headerLayer.current.key}
          style={[
            headerContentStyle,
            hasPrevLayer ? morph.currentHeaderStyle : null,
          ]}
        >
          <ToastHeaderContent
            align={props.align}
            layer={morph.headerLayer.current}
            titleStyle={getHeaderTitleStyle(props)}
          />
        </Animated.View>

        {Platform.OS === "ios" && (
          <AnimatedBlurView
            animatedProps={morph.animatedBlurProps}
            style={StyleSheet.absoluteFill}
          />
        )}
      </Animated.View>
    );
  },
);

export { ToastHeader };
