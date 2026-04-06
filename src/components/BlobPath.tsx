import type { ComponentProps } from "react";
import type { IBlobPathProps } from "@/typings";
import Animated from "react-native-reanimated";
import { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

function BlobPath(props: IBlobPathProps) {
  const animatedProps = props.animatedProps as ComponentProps<
    typeof AnimatedPath
  >["animatedProps"];

  return (
    <AnimatedPath
      animatedProps={animatedProps}
      fill={props.fill}
      filter={props.filter}
      stroke={props.stroke}
      strokeWidth={props.strokeWidth}
      transform={props.transform}
    />
  );
}

export { BlobPath };
