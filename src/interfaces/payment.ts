/**
 * Интерфейс для данных карты при проведении платежа.
 */
export interface IdData {
  cc: string;
  cvv: string;
  expire: string;
  owner?: string;
}

/**
 * Интерфейс для дополнительных персональных данных плательщика.
 */
export interface PaymentAccountData {
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

/**
 * Интерфейс для запроса на создание платежа.
 */
export interface PaymentCreationRequest {
  shop_key: string;
  amount: number;
  order_currency: string;
  payment_currency: string;
  payment_method: string;
  order_number?: string;
  payment_details?: string;
  return_url?: string;
  callback_url?: string;
  lang?: string;
  user_id?: string;
  payment_account?: number;
  custom_data?: any;
  ip?: string;
  extra_params?: any;
  payment_account_data?: PaymentAccountData;
  id_data?: IdData;
  success_url?: string;
  fail_url?: string;
}

/**
 * Интерфейс для ответа на запрос создания платежа.
 */
export interface PaymentCreationResponse {
  redirect_url: string;
  order_token: string;
}
