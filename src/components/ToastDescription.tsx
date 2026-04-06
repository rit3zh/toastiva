import { styles } from "@/styles/toast.styles";
import type { IToastDescriptionProps } from "@/typings";
import { ToastBodyLayout } from "@/typings";
import { Text, View } from "react-native";

function ToastDescription(props: IToastDescriptionProps) {
  if (
    props.layout === ToastBodyLayout.Spread ||
    props.layout === ToastBodyLayout.Right
  ) {
    return (
      <View style={styles.descRow}>
        <View style={styles.descTextWrap}>
          <Text style={[styles.descText, styles.textLeft]}>
            {props.description}
          </Text>
        </View>
        {props.meta ? <Text style={styles.descMeta}>{props.meta}</Text> : null}
      </View>
    );
  }

  const alignStyle =
    props.layout === ToastBodyLayout.Center
      ? styles.textCenter
      : styles.textLeft;

  return (
    <View>
      <Text style={[styles.descText, alignStyle]}>{props.description}</Text>
      {props.meta ? (
        <Text style={[styles.descMetaInline, alignStyle]}>{props.meta}</Text>
      ) : null}
    </View>
  );
}

export { ToastDescription };
