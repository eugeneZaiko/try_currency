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
