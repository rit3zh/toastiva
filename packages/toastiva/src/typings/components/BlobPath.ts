import type { IToastAnimatedStylesResult } from "../styles/AnimatedStyles";

interface IBlobPathProps {
  animatedProps: IToastAnimatedStylesResult["animatedPathProps"];
  fill: string;
  filter?: string;
  stroke?: string;
  strokeWidth?: number;
  transform?: string;
}

export type { IBlobPathProps };
