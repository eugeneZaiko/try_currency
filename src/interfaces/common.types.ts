export interface OperationInfo {
  shop: string;
  token: string;
  status: string;
  amount: number;
  approved_amount: number;
  payment_currency: string;
  card_token: string;
  pan_bin: string;
  pan_mask_short: string;
  wallet: string;
  number: string;
  created_date: string;
  expires_at: string;
  pan_mask: string;
  payment_type: string;
  payment_account: string | null;
  payment_account_detail: Record<string, any>;
  billing_details: Record<string, any>;
  binding_token?: string;
  error_code?: string;
  error_message?: string;
  settlement?: Record<string, any>;
  status_description?: string | null;
}

export interface GetInfoRequest {
  shop_key: string;
  order_token?: string;
  order_number?: string;
}

export type GetInfoResponse = OperationInfo[];

export interface AmountAgreeRequest {
  shop_key: string;
  order_token: string;
}

export type AmountAgreeResponse = OperationInfo;
