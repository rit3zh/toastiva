import { useAnimatedStyle } from "react-native-reanimated";
import type { IUseToastAnimatedStylesParams } from "../typings";

const OFFSET = 50;

const useAnimatedCardStyles = <T extends IUseToastAnimatedStylesParams>(
  params: T,
) => {
  const { values, totalCount, index, isTop } = params;

  const DIRECTION = isTop ? -1 : 1;

  const animatedCardStyles = useAnimatedStyle(() => {
    const mount = values.mountProgress.value;
    const remove = values.removeProgress.value;

    const baseTranslate = DIRECTION * OFFSET;
    const opacity = mount * (1 - remove) * values.stackOpacity.value;

    return {
      opacity: opacity > 0 ? opacity : 0,
      zIndex: totalCount - index,
      transform: [
        {
          translateY:
            (1 - mount) * baseTranslate +
            remove * baseTranslate +
            values.stackY.value +
            values.swipeY.value,
        },
        {
          translateX: values.shakeX.value + values.swipeX.value,
        },
        {
          scaleX: values.stackScale.value * values.squishX.value,
        },
        {
          scaleY: values.stackScale.value * values.squishY.value,
        },
      ],
    };
  }, []);

  return animatedCardStyles;
};

export { useAnimatedCardStyles };
