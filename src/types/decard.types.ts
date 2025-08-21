// Payment without using a payment form
interface IdData {
  cc: string;
  cvv: string;
  expire: string;
  owner?: string;
}

//Card payments with passing personal data
interface PaymentAccountData {
  country_code: string;
  city: string;
  address: string;
  street: string;
  post_code: string;
  phone_code: string;
  phone: string;
  date_of_birth: string;
  email: string;
}

//Payment with using a Decard payment form (via redirect)
export interface CreatePaymentPayload {
  amount: number;
  order_currency: string;
  payment_currency: string;
  payment_method: "card" | "papara" | "crypto" | "online_bank_transfer";

  payment_method_details?: {
    first_name: string;
    last_name: string;
    user_id: string;
  };

  order_number?: string;
  payment_details?: string;
  success_url?: string;
  fail_url?: string;
  return_url?: string; // higher prioritet than success/fail_url
  callback_url?: string;
  lang?: string;
  user_id?: string;
  ip?: string;

  payment_account?: number;
  custom_data?: Record<string, any>;
  extra_params?: Record<string, any>;
  payment_account_data?: PaymentAccountData;
  id_data?: IdData;
}

// interfaces/payout.ts
export interface PayoutInitializationRequest {
  shop_key: string;
  amount: number;
  currency: string;
  card_token?: string;
  card_pan?: string;
  card_expire?: string;
  card_holder?: string;
  order_number?: string;
  description?: string;
  callback_url?: string;
  user_id?: string;
  user_account?: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  birth_date?: string;
  phone?: string;
  email?: string;
  country_code?: string;
  city?: string;
  address?: string;
  document_number?: string;
  document_issue_date?: string;
  document_issues_by?: string;
  document_devision_code?: string;
  additional_data?: any;
  custom_data?: any;
}

export interface PayoutInitializationResponse {
  order_token: string;
  priority_token: string;
  priority_mask: string;
  available_cards?: any;
}

export interface PayoutConfirmationRequest {
  shop_key: string;
  order_token: string;
  card_token?: string;
}

export interface PayoutConfirmationResponse {
  order_token: string;
  status: string;
}