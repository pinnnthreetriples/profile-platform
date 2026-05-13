import type {
  CreateBtcpayInvoiceInput,
  CreateBtcpayInvoiceResult,
} from "./types";

// BTCPay client stub - Stage 0 placeholder
export async function createBtcpayInvoice(
  input: CreateBtcpayInvoiceInput
): Promise<CreateBtcpayInvoiceResult> {
  console.log("BTCPay invoice placeholder:", input);

  // Return mock data
  return {
    invoiceId: "placeholder-invoice-id",
    checkoutUrl: "/payment",
    status: "new",
  };
}
