import type {
  IAddMoneyToastArgs,
  IPresentationProfileToastArgs,
  IPresentationQuickActionToastArgs,
  IPresentationSearchToastArgs,
  IPresentationTransactionToastArgs,
} from "../typings";
import {
  PresentationProfileActionId,
  PresentationQuickActionId,
  PresentationSearchCardId,
  ToastivaBodyLayout,
  ToastivaType,
  ToastivaVerticalPosition,
} from "../typings";
import React from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { toastiva } from "../index";

function SignalIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Rect x="1" y="1" width="14" height="14" rx="7" fill="#F0FDF4" />
      <Path
        d="M4.5 9.5c.9-1.7 2.1-2.5 3.5-2.5s2.6.8 3.5 2.5"
        stroke="#22C55E"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Circle cx="8" cy="10.5" r="1.2" fill="#22C55E" />
    </Svg>
  );
}

function StackIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Rect x="2" y="2" width="12" height="8" rx="3" fill="#E0E7FF" />
      <Rect x="3.5" y="6" width="9" height="7" rx="2.5" fill="#818CF8" />
      <Rect x="5.5" y="4" width="5" height="1.8" rx="0.9" fill="#fff" />
    </Svg>
  );
}

function SparkIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Rect x="1" y="1" width="14" height="14" rx="7" fill="#FFF7ED" />
      <Path
        d="M8 3.2 9.3 6.7 12.8 8l-3.5 1.3L8 12.8 6.7 9.3 3.2 8l3.5-1.3L8 3.2Z"
        fill="#F97316"
      />
    </Svg>
  );
}

function ShieldIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M8 1.9 13 3.7v3.6c0 3-1.9 5.3-5 6.8-3.1-1.5-5-3.8-5-6.8V3.7l5-1.8Z"
        fill="#FEE2E2"
      />
      <Path
        d="M8 4.8v4.5M5.8 7h4.4"
        stroke="#EF4444"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </Svg>
  );
}

function WalletIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Rect x="2" y="4" width="12" height="8.5" rx="2.5" fill="#F0FDF4" />
      <Path
        d="M4 5.5V4.8C4 3.8 4.8 3 5.8 3H11"
        stroke="#22C55E"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <Circle cx="11.2" cy="8.3" r="1.1" fill="#22C55E" />
    </Svg>
  );
}

function getPresentationTiming() {
  return {
    displayDuration: 4800,
    expandDuration: 660,
    collapseDuration: 660,
  };
}

function getPresentationOptions() {
  return {
    expandedWidth: 344,
    horizontalInset: 22,
    timing: getPresentationTiming(),
  };
}

function getCompactPresentationOptions() {
  return {
    duration: 3200,
    horizontalInset: 22,
    showTimestamp: false,
    timing: getPresentationTiming(),
  };
}

function showAccountsToast() {
  toastiva("Accounts overview", {
    ...getPresentationOptions(),
    action: {
      label: "Preview",
      onPress: () => {
        toastiva.success("Switcher opened", {
          ...getCompactPresentationOptions(),
          icon: <StackIcon />,
          position: ToastivaVerticalPosition.Bottom,
        });
      },
    },
    bodyLayout: ToastivaBodyLayout.Center,
    description:
      "Cash, travel, and bills are grouped into one stack for the walkthrough.",
    icon: <WalletIcon />,
    meta: "3 active",
    showTimestamp: false,
  });
}

function showAddMoneyToast(props: IAddMoneyToastArgs) {
  toastiva.promise(
    new Promise((resolve) => {
      setTimeout(resolve, 1800);
    }),
    {
      ...getPresentationOptions(),
      action: {
        success: {
          label: "Done",
          onPress: () => {
            toastiva.info("Funds are live", {
              bodyLayout: ToastivaBodyLayout.Center,
              duration: 2400,
              icon: <WalletIcon />,
              position: ToastivaVerticalPosition.Bottom,
              showTimestamp: false,
            });
          },
        },
      },
      bodyLayout: ToastivaBodyLayout.Center,
      description: {
        loading: "Processing your deposit with your linked bank account.",
        success: `$${props.amount} is ready to spend across cards and transfers.`,
        error: "The bank could not verify this deposit. Try another source.",
      },
      duration: 5200,
      icon: {
        error: <ShieldIcon />,
        loading: <SignalIcon />,
        success: <WalletIcon />,
      },
      loading: "Adding funds…",
      showTimestamp: true,
      success: `$${props.amount} added successfully`,
      error: "Deposit not completed",
    },
  );
}

function showAllActivityToast() {
  toastiva.info("Activity feed loaded", {
    ...getCompactPresentationOptions(),
    icon: <StackIcon />,
    position: ToastivaVerticalPosition.Bottom,
  });
}

function showConnectionToast() {
  toastiva.error("Sync failed", {
    ...getPresentationOptions(),
    action: {
      label: "Retry",
      onPress: () => {
        toastiva.success("Back online", {
          ...getCompactPresentationOptions(),
          icon: <SignalIcon />,
          position: ToastivaVerticalPosition.Bottom,
        });
      },
    },
    bodyLayout: ToastivaBodyLayout.Right,
    description:
      "Balances still reflect your last refresh while we reconnect in the background.",
    icon: <SignalIcon />,
    meta: "2m ago",
    showTimestamp: false,
  });
}

function showProductToast() {
  toastiva("Travel card preview", {
    ...getPresentationOptions(),
    action: {
      label: "Save",
      onPress: () => {
        toastiva.success("Pinned to your feed", {
          ...getCompactPresentationOptions(),
          icon: <SparkIcon />,
          position: ToastivaVerticalPosition.Bottom,
        });
      },
    },
    bodyLayout: ToastivaBodyLayout.Spread,
    description: "No FX markups, lounge passes, and one-tap freeze controls.",
    icon: <SparkIcon />,
    meta: "New drop",
    showTimestamp: false,
  });
}

function showProfileActionToast(props: IPresentationProfileToastArgs) {
  if (props.actionId === PresentationProfileActionId.TravelMode) {
    toastiva("Travel mode enabled", {
      ...getPresentationOptions(),
      bodyLayout: ToastivaBodyLayout.Center,
      description:
        "Rate alerts stay on while risky merchants are muted abroad.",
      dismissible: false,
      duration: 4200,
      icon: <SparkIcon />,
      meta: "12 hours",
      onAutoClose: () => {
        toastiva.success("Smart alerts routed", {
          ...getCompactPresentationOptions(),
          icon: <SignalIcon />,
          position: ToastivaVerticalPosition.Bottom,
        });
      },
      position: ToastivaVerticalPosition.Bottom,
      showTimestamp: false,
      type: ToastivaType.Info,
    });
    return;
  }

  if (props.actionId === PresentationProfileActionId.FreezeCard) {
    toastiva.warning("Virtual card frozen", {
      ...getPresentationOptions(),
      bodyLayout: ToastivaBodyLayout.Right,
      description: "Tap to dismiss when you want the compact toast state back.",
      icon: <ShieldIcon />,
      onDismiss: () => {
        toastiva("Card controls restored", {
          ...getCompactPresentationOptions(),
          icon: <WalletIcon />,
          position: ToastivaVerticalPosition.Bottom,
        });
      },
      position: ToastivaVerticalPosition.Bottom,
      showTimestamp: true,
    });
    return;
  }

  toastiva.promise(
    new Promise((resolve) => {
      setTimeout(resolve, 1650);
    }),
    {
      ...getPresentationOptions(),
      bodyLayout: ToastivaBodyLayout.Center,
      description: {
        loading: "Preparing this week’s highlights for email and share sheet.",
        success: "Your recap is ready with spend, merchants, and savings wins.",
        error: "We could not assemble the recap right now.",
      },
      duration: 5000,
      icon: {
        error: <ShieldIcon />,
        loading: <SparkIcon />,
        success: <StackIcon />,
      },
      loading: "Building weekly recap",
      showTimestamp: true,
      success: "Recap shared",
      error: "Recap unavailable",
    },
  );
}

function showQuickActionToast(props: IPresentationQuickActionToastArgs) {
  if (props.actionId === PresentationQuickActionId.Move) {
    toastiva.promise(
      new Promise((resolve) => {
        setTimeout(resolve, 1700);
      }),
      {
        ...getPresentationOptions(),
        action: {
          success: {
            label: "Receipt",
            onPress: () => {
              toastiva.info("Receipt saved", {
                ...getCompactPresentationOptions(),
                icon: <StackIcon />,
                position: ToastivaVerticalPosition.Bottom,
              });
            },
          },
        },
        bodyLayout: ToastivaBodyLayout.Spread,
        description: {
          loading: "Locking today’s spot rate for your same-day transfer.",
          success: "S$240 moved into your USD balance at a protected FX rate.",
          error: "We could not lock the transfer. Nothing has been sent.",
        },
        duration: 5200,
        icon: {
          error: <ShieldIcon />,
          loading: <SignalIcon />,
          success: <WalletIcon />,
        },
        loading: "Moving funds…",
        showTimestamp: true,
        success: "Transfer complete",
        error: "Transfer delayed",
      },
    );
    return;
  }

  if (props.actionId === PresentationQuickActionId.Details) {
    toastiva.info("Weekly insights ready", {
      ...getCompactPresentationOptions(),
      icon: <SparkIcon />,
    });
    return;
  }

  toastiva("More actions pinned", {
    ...getPresentationOptions(),
    action: {
      label: "Stack",
      onPress: () => {
        toastiva.success("Second layer added", {
          ...getPresentationOptions(),
          bodyLayout: ToastivaBodyLayout.Right,
          description: "Tap the stack again to collapse it back into place.",
          icon: <StackIcon />,
          showTimestamp: true,
        });
      },
    },
    bodyLayout: ToastivaBodyLayout.Center,
    description: "Budgets, statements, and card tools are ready for the demo.",
    icon: <StackIcon />,
    showTimestamp: true,
  });
}

function showSearchCardToast(props: IPresentationSearchToastArgs) {
  if (props.cardId === PresentationSearchCardId.SmartSearch) {
    toastiva("Smart search is live", {
      ...getCompactPresentationOptions(),
      dismissible: false,
      icon: <SparkIcon />,
      position: ToastivaVerticalPosition.Bottom,
    });
    return;
  }

  if (props.cardId === PresentationSearchCardId.TravelPerks) {
    toastiva.success("Perks unlocked", {
      ...getPresentationOptions(),
      bodyLayout: ToastivaBodyLayout.Right,
      description:
        "Airport lounge access and no-FX cards are now surfaced first.",
      icon: <WalletIcon />,
      position: ToastivaVerticalPosition.Bottom,
      showTimestamp: true,
    });
    return;
  }

  toastiva.promise(
    new Promise((resolve) => {
      setTimeout(resolve, 1550);
    }),
    {
      ...getPresentationOptions(),
      bodyLayout: ToastivaBodyLayout.Center,
      description: {
        loading:
          "Scanning your latest merchants for repeat patterns and trends.",
        success:
          "A clean digest is ready with wins, spikes, and top merchants.",
        error: "We could not assemble the digest yet.",
      },
      duration: 5000,
      icon: {
        error: <ShieldIcon />,
        loading: <SignalIcon />,
        success: <SparkIcon />,
      },
      loading: "Building digest",
      position: ToastivaVerticalPosition.Bottom,
      showTimestamp: true,
      success: "Merchant digest ready",
      error: "Digest unavailable",
    },
  );
}

function showSearchPreviewToast() {
  toastiva("Search shortcuts ready", {
    ...getCompactPresentationOptions(),
    icon: <SparkIcon />,
  });
}

function showTopBarCardsToast() {
  toastiva.success("Cards are stacked", {
    ...getCompactPresentationOptions(),
    icon: <StackIcon />,
    meta: "Presentation mode",
  });
}

function showTransactionToast(props: IPresentationTransactionToastArgs) {
  toastiva(props.item.title, {
    ...getPresentationOptions(),
    bodyLayout: props.item.bodyLayout,
    description: props.item.description,
    icon:
      props.item.type === ToastivaType.Success ?
        <WalletIcon />
      : <SignalIcon />,
    meta: props.item.meta,
    showTimestamp: false,
    type: props.item.type,
  });
}

export {
  showAccountsToast,
  showAddMoneyToast,
  showAllActivityToast,
  showConnectionToast,
  showProductToast,
  showProfileActionToast,
  showQuickActionToast,
  showSearchCardToast,
  showSearchPreviewToast,
  showTopBarCardsToast,
  showTransactionToast,
};
