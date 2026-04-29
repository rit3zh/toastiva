import { BODY_PADDING_BOTTOM, PH } from "../constants";
import { getBodyRevealProgress } from "../math/toast-body+content-math";
import { IUseToastAnimatedStylesParams } from "../typings";
import { useAnimatedStyle } from "react-native-reanimated";

const useAnimatedToastBodyStyles = <T extends IUseToastAnimatedStylesParams>(
  params: T,
) => {
  const { values } = params;

  const bodyStyle = useAnimatedStyle(() => {
    const progress = values.morphProgress.value;

    const t =
      progress < 0 ? 0
      : progress > 1 ? 1
      : progress;

    const revealT = getBodyRevealProgress<number>(t);

    const expandedHeight = values.expandedHeight.value;
    const bodyOpacity = values.bodyOpacity.value;
    const bodyWidth = values.bodyWidth.value;

    const expandedBodyHeight = expandedHeight > PH ? expandedHeight - PH : 0;

    // Body element fills the SVG path's body width exactly. Horizontal padding
    // lives in `styles.body.paddingHorizontal` inside this box, which keeps
    // the text inset symmetrical from both edges of the rendered shape. The
    // earlier `bodyWidth - BODY_PADDING_H * 2` made the element 28px narrower
    // than the path, leaving an asymmetric gap on the right that became
    // obvious once the canvas was locked to a constant width.
    return {
      opacity: bodyOpacity * revealT,
      height: expandedBodyHeight * revealT,
      overflow: "hidden" as const,
      paddingTop: 6 * revealT,
      paddingBottom: BODY_PADDING_BOTTOM * revealT,
      width: bodyWidth,
    };
  }, []);

  return bodyStyle;
};

export { useAnimatedToastBodyStyles };
