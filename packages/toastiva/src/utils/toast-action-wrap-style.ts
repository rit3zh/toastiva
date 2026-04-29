import type { ValueOf } from "../global-ts/value-of";
import styles from "../styles/toast.styles";
import { IToastMeasureBodyProps, ToastivaBodyLayout } from "../typings";

function getActionWrapStyle(
  layout: ValueOf<IToastMeasureBodyProps, "bodyLayout">,
) {
  if (layout === ToastivaBodyLayout.Center) return styles.actionWrapCenter;
  if (layout === ToastivaBodyLayout.Right) return styles.actionWrapRight;
  return null;
}

export { getActionWrapStyle };
