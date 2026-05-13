// Payment feature constants
export const PAYMENT_ROUTES = {
  PAYMENT: "/payment",
  SUCCESS: "/payment/success",
  CANCEL: "/payment/cancel",
} as const;

export const PAYMENT_AMOUNT = 10; // USDT

export const SUPPORTED_NETWORKS = ["polygon", "tron", "ethereum"] as const;
