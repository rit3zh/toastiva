import { BODY_PADDING_BOTTOM, PH } from "../constants";
import { getBodyRevealProgress } from "../math/toast-body+content-math";
import type { IUseToastAnimatedStylesParams } from "../typings";
import { useAnimatedStyle } from "react-native-reanimated";

const useAnimatedToastBodyStyles = <T extends IUseToastAnimatedStylesParams>(
  params: T,
) => {
  const { values, noHeader = false } = params;

  const bodyStyle = useAnimatedStyle(() => {
    const progress = values.morphProgress.value;

    const t = progress < 0 ? 0 : progress > 1 ? 1 : progress;

    const revealT = getBodyRevealProgress<number>(t);

    const expandedHeight = values.expandedHeight.value;
    const bodyOpacity = values.bodyOpacity.value;
    const bodyWidth = values.bodyWidth.value;

    const expandedBodyHeight = noHeader
      ? expandedHeight
      : expandedHeight > PH
        ? expandedHeight - PH
        : 0;

    return {
      opacity: bodyOpacity * revealT,
      height: expandedBodyHeight * revealT,
      overflow: "hidden" as const,
      paddingTop: 6 * revealT,
      paddingBottom: BODY_PADDING_BOTTOM * revealT,
      width: bodyWidth,
    };
  }, [noHeader]);

  return bodyStyle;
};

export { useAnimatedToastBodyStyles };
