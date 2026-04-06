import { useCallback, useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { PH } from "../constants";

function useToastMeasurements(
  headerKey: string,
  cardKey: string,
  toastId: string,
  onHeightChange: (id: string, height: number) => void,
) {
  const [measuredHeight, setMeasuredHeight] = useState<number>(PH);
  const [measuredPillWidth, setMeasuredPillWidth] = useState<number>(0);
  const [measuredCardKey, setMeasuredCardKey] = useState<string>("");
  const [measuredHeaderKey, setMeasuredHeaderKey] = useState<string>("");

  const onMeasureCard = useCallback(
    (event: LayoutChangeEvent) => {
      const nextHeight = Math.max(event.nativeEvent.layout.height, PH);
      setMeasuredHeight((current) =>
        Math.abs(current - nextHeight) < 1 ? current : nextHeight,
      );
      setMeasuredCardKey(cardKey);
      onHeightChange(toastId, nextHeight);
    },
    [cardKey, onHeightChange, toastId],
  );

  const onMeasureHeader = useCallback(
    (event: LayoutChangeEvent) => {
      const nextWidth = Math.max(event.nativeEvent.layout.width, PH);
      setMeasuredPillWidth((current) =>
        Math.abs(current - nextWidth) < 1 ? current : nextWidth,
      );
      setMeasuredHeaderKey(headerKey);
    },
    [headerKey],
  );

  return {
    measuredHeight,
    measuredPillWidth,
    isCardHeightCurrent: measuredCardKey === cardKey,
    isPillWidthCurrent: measuredHeaderKey === headerKey,
    onMeasureCard,
    onMeasureHeader,
  };
}

export { useToastMeasurements };
