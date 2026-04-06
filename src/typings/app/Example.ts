interface IExampleButton {
  color: string;
  label: string;
  onPress: () => void;
}

interface IExampleSection {
  buttons: IExampleButton[];
  title: string;
}

export type { IExampleButton, IExampleSection };
