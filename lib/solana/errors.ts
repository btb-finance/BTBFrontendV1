export const ERROR_MESSAGES = {
  UNAUTHORIZED: "Unauthorized: Only owner can perform this action",
  ZERO_PRICE: "Price must be greater than 0",
  INVALID_TOKEN: "Invalid token type selected",
  CALCULATION_ERROR: "Calculation error occurred",
  INVALID_MINT: "Invalid token mint address",
  INVALID_AMOUNT: "Amount must be greater than zero",
  AMOUNT_TOO_SMALL: "Amount is too small. Minimum amount is 0.001 tokens",
  AMOUNT_TOO_LARGE: "Amount exceeds maximum limit",
  SALE_INACTIVE: "Sale is not currently active",
  INSUFFICIENT_BALANCE: "Insufficient balance in wallet",
  TRANSACTION_FAILED: "Transaction failed. Please try again",
  WALLET_NOT_CONNECTED: "Please connect your wallet first",
};

export function getErrorMessage(error: any): string {
  const code = error?.code || error?.message;
  return ERROR_MESSAGES[code as keyof typeof ERROR_MESSAGES] || "An unexpected error occurred";
}