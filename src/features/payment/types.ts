import type { PaymentStatus, PaymentCurrency, PaymentNetwork } from "@/types/payment";

// Payment feature types
export type Payment = {
  id: string;
  userId: string;
  invoiceId: string;
  amount: number;
  currency: PaymentCurrency;
  network: PaymentNetwork;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreatePaymentInput = {
  userId: string;
  amount: number;
  currency: PaymentCurrency;
  network: PaymentNetwork;
};
