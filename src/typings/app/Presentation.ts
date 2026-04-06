import type { ReactNode } from "react";
import type { TGooeyToastType, TToastBodyLayout } from "../toast";

enum PresentationProfileActionId {
  TravelMode = "travel-mode",
  FreezeCard = "freeze-card",
  ShareRecap = "share-recap",
}

enum PresentationQuickActionId {
  AddMoney = "add-money",
  Move = "move",
  Details = "details",
  More = "more",
}

enum PresentationSearchCardId {
  SmartSearch = "smart-search",
  TravelPerks = "travel-perks",
  MerchantDigest = "merchant-digest",
}

enum PresentationTransactionId {
  FxTransfer = "fx-transfer",
  SalarySweep = "salary-sweep",
}

interface IAddMoneyToastArgs {
  amount: string;
}

interface IIconButtonProps {
  children: ReactNode;
  onPress?: () => void;
}

interface IPresentationProfileActionCardProps {
  item: IPresentationProfileActionItem;
  onPress: (id: PresentationProfileActionId) => void;
}

interface IPresentationProfileActionItem {
  caption: string;
  id: PresentationProfileActionId;
  subtitle: string;
  title: string;
}

interface IPresentationProfileToastArgs {
  actionId: PresentationProfileActionId;
}

interface IPresentationQuickActionItem {
  icon: ReactNode;
  id: PresentationQuickActionId;
  label: string;
}

interface IPresentationQuickActionToastArgs {
  actionId: PresentationQuickActionId;
}

interface IPresentationSearchCardItem {
  badge: string;
  body: string;
  id: PresentationSearchCardId;
  title: string;
  value: string;
}

interface IPresentationSearchCardProps {
  item: IPresentationSearchCardItem;
  onPress: (id: PresentationSearchCardId) => void;
}

interface IPresentationSearchToastArgs {
  cardId: PresentationSearchCardId;
}

interface IPresentationTransactionItem {
  bodyLayout: TToastBodyLayout;
  description: string;
  from: string;
  id: PresentationTransactionId;
  meta: string;
  primaryAmount: string;
  secondaryAmount: string;
  time: string;
  title: string;
  to: string;
  type: TGooeyToastType;
}

interface IPresentationTransactionRowProps {
  item: IPresentationTransactionItem;
  onPress: (item: IPresentationTransactionItem) => void;
}

interface IPresentationTransactionToastArgs {
  item: IPresentationTransactionItem;
}

interface IQuickActionButtonProps {
  item: IPresentationQuickActionItem;
  onPress: (id: PresentationQuickActionId) => void;
}

export {
  PresentationProfileActionId,
  PresentationQuickActionId,
  PresentationSearchCardId,
  PresentationTransactionId,
};
export type {
  IAddMoneyToastArgs,
  IIconButtonProps,
  IPresentationProfileActionCardProps,
  IPresentationProfileActionItem,
  IPresentationProfileToastArgs,
  IPresentationQuickActionItem,
  IPresentationQuickActionToastArgs,
  IPresentationSearchCardItem,
  IPresentationSearchCardProps,
  IPresentationSearchToastArgs,
  IPresentationTransactionItem,
  IPresentationTransactionRowProps,
  IPresentationTransactionToastArgs,
  IQuickActionButtonProps,
};
