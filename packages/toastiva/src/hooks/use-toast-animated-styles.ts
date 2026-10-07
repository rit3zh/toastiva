import type { IUseToastAnimatedStylesParams } from "../typings";
import { useAnimatedActionStyle } from "./use-animated-action-styles";
import { useAnimatedCardStyles } from "./use-animated-card-styles";
import { useAnimatedContentStyle } from "./use-animated-content-styles";
import { useAnimatedDescriptionStyle } from "./use-animated-description-styles";
import { useAnimatedHeaderMaxWidthStyle } from "./use-animated-header-max-styles";
import { useAnimatedPathProps } from "./use-animated-path-props";
import { useAnimatedProgressStyle } from "./use-animated-progress-styles";
import { useAnimatedShellStyle } from "./use-animated-shell-styles";
import { useAnimatedToastBodyStyles } from "./use-animated-toast-body-styles";

function useToastAnimatedStyles<T extends IUseToastAnimatedStylesParams>(
  params: T,
) {
  const cardStyle =
    useAnimatedCardStyles<IUseToastAnimatedStylesParams>(params);
  const bodyStyle =
    useAnimatedToastBodyStyles<IUseToastAnimatedStylesParams>(params);
  const shellStyle =
    useAnimatedShellStyle<IUseToastAnimatedStylesParams>(params);
  const animatedPathProps =
    useAnimatedPathProps<IUseToastAnimatedStylesParams>(params);
  const descriptionStyle =
    useAnimatedDescriptionStyle<IUseToastAnimatedStylesParams>(params);
  const actionStyle =
    useAnimatedActionStyle<IUseToastAnimatedStylesParams>(params);
  const contentStyle =
    useAnimatedContentStyle<IUseToastAnimatedStylesParams>(params);
  const headerMaxWidthStyle =
    useAnimatedHeaderMaxWidthStyle<IUseToastAnimatedStylesParams>(params);
  const progressStyle =
    useAnimatedProgressStyle<IUseToastAnimatedStylesParams>(params);

  return {
    animatedPathProps,
    descriptionStyle,
    actionStyle,
    contentStyle,
    headerMaxWidthStyle,
    progressStyle,
    cardStyle,
    bodyStyle,
    shellStyle,
  } as const;
}

export { useToastAnimatedStyles };
