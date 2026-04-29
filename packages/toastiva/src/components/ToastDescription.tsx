import { styles } from "../styles/toast.styles";
import type { IToastDescriptionProps } from "../typings";
import { ToastivaBodyLayout } from "../typings";
import React, { memo } from "react";
import { Text, View } from "react-native";

const ToastDescription: React.MemoExoticComponent<
  React.FC<IToastDescriptionProps>
> = memo(
  ({
    ...props
  }: IToastDescriptionProps): (React.ReactNode & React.ReactElement) | null => {
    if (
      props.layout === ToastivaBodyLayout.Spread ||
      props.layout === ToastivaBodyLayout.Right
    ) {
      return (
        <View style={styles.descRow}>
          <View style={styles.descTextWrap}>
            <Text style={[styles.descText, styles.textLeft]}>
              {props.description}
            </Text>
          </View>
          {props.meta ?
            <Text style={styles.descMeta}>{props.meta}</Text>
          : null}
        </View>
      );
    }

    const alignStyle =
      props.layout === ToastivaBodyLayout.Center ?
        styles.textCenter
      : styles.textLeft;

    return (
      <View>
        <Text style={[styles.descText, alignStyle]}>{props.description}</Text>
        {props.meta ?
          <Text style={[styles.descMetaInline, alignStyle]}>{props.meta}</Text>
        : null}
      </View>
    );
  },
);

export { ToastDescription };
