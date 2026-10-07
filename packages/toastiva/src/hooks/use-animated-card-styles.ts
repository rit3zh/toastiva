import { useAnimatedStyle } from "react-native-reanimated";
import type { IUseToastAnimatedStylesParams } from "../typings";

const useAnimatedCardStyles = <T extends IUseToastAnimatedStylesParams>(
  params: T,
) => {
  const { animationConfig, values, totalCount, index, isTop } = params;

  const DIRECTION = isTop ? -1 : 1;

  const animatedCardStyles = useAnimatedStyle(() => {
    const mount = values.mountProgress.value;
    const remove = values.removeProgress.value;

    const baseTranslate = DIRECTION * animationConfig.mount.offset;
    const mountTranslate =
      (1 - mount) * baseTranslate + remove * baseTranslate * EXIT_TRAVEL;

    const mountFade = mount > 1 ? 1 : mount;
    const opacity = mountFade * (1 - remove) * values.stackOpacity.value;
    const translateX = animationConfig.mount.axis === "x" ? mountTranslate : 0;
    const translateY = animationConfig.mount.axis === "y" ? mountTranslate : 0;
    const presence =
      (1 - (1 - mountFade) * (1 - MOUNT_SCALE)) *
      (1 - remove * (1 - EXIT_SCALE));
    const scale = values.stackScale.value * presence;

    return {
      opacity: opacity > 0 ? opacity : 0,
      zIndex: totalCount - index,
      transform: [
        {
          translateY: translateY + values.stackY.value + values.swipeY.value,
        },
        {
          translateX: translateX + values.shakeX.value + values.swipeX.value,
        },
        {
          scaleX: scale * values.squishX.value,
        },
        {
          scaleY: scale * values.squishY.value,
        },
      ],
    };
  }, []);

  return animatedCardStyles;
};

const EXIT_TRAVEL = 0.35;
const EXIT_SCALE = 0.94;
const MOUNT_SCALE = 0.95;

export { useAnimatedCardStyles };
