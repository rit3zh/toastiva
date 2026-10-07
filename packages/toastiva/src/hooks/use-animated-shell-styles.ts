import { MORPH_OVERSHOOT, PH } from "../constants";
import { getMorphExtents } from "../morph";
import { IUseToastAnimatedStylesParams } from "../typings";
import { useAnimatedStyle } from "react-native-reanimated";

const useAnimatedShellStyle = <T extends IUseToastAnimatedStylesParams>(
  params: T,
) => {
  const { values, morphAlign, bodyWidth } = params;

  const shellStyle = useAnimatedStyle(() => {
    const progress = values.morphProgress.value;

    const max = 1 + MORPH_OVERSHOOT;
    const t = progress < 0 ? 0 : progress > max ? max : progress;

    const collapsedHeight = values.collapsedHeight.value;
    const expandedHeight = values.expandedHeight.value;

    const extents = getMorphExtents(
      bodyWidth,
      values.pillWidth.value,
      values.bodyWidth.value,
      (expandedHeight - PH) * t,
      expandedHeight - PH,
      morphAlign,
    );
    const left = Math.min(extents.pillLeft, extents.bodyLeft);
    const right = Math.max(extents.pillRight, extents.bodyRight);

    return {
      width: right - left,
      height: collapsedHeight + (expandedHeight - collapsedHeight) * t,
    };
  }, [bodyWidth, morphAlign]);

  return shellStyle;
};

export { useAnimatedShellStyle };
