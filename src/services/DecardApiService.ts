import axios, { AxiosInstance } from "axios";
import { generateApiSign } from "../utils/signature";
import {
  PaymentCreationRequest,
  PaymentCreationResponse,
} from "../interfaces/payment";
import {
  PayoutInitializationRequest,
  PayoutInitializationResponse,
  PayoutConfirmationRequest,
  PayoutConfirmationResponse,
} from "../interfaces/payout";
import {
  GetInfoRequest,
  GetInfoResponse,
  AmountAgreeRequest,
  AmountAgreeResponse,
} from "../interfaces/common.types";

export class DecardApiService {
  private readonly client: AxiosInstance;
  private readonly secretKey: string;
  private readonly baseUrl: string = "https://decard.me";

  constructor(secretKey: string) {
    if (!secretKey) {
      throw new Error("Secret Key is required.");
    }
    this.secretKey = secretKey;
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async createPayment(
    payload: PaymentCreationRequest
  ): Promise<PaymentCreationResponse> {
    const endpoint = "/rest/paymentgate/simple/";
    const apiSign = generateApiSign(this.secretKey, payload);
    try {
      const response = await this.client.post(endpoint, payload, {
        headers: { "Api-sign": apiSign },
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error creating payment:",
        error.response?.data || error.message
      );
      throw error.response?.data || error;
    }
  }

  async createPayout(
    payoutMethod: string,
    payload: PayoutInitializationRequest
  ): Promise<PayoutInitializationResponse> {
    const endpoint = `/rest/payoutgate/${payoutMethod}/`;
    const apiSign = generateApiSign(this.secretKey, payload);
    try {
      const response = await this.client.post(endpoint, payload, {
        headers: { "Api-sign": apiSign },
      });
      return response.data;
    } catch (error: any) {
      console.error(
        `Error creating ${payoutMethod} payout:`,
        error.response?.data || error.message
      );
      throw error.response?.data || error;
    }
  }

  async getPaymentInfo(params: GetInfoRequest): Promise<GetInfoResponse> {
    const endpoint = "/rest/paymentgate/order/info/";
    const apiSign = generateApiSign(this.secretKey, params);
    try {
      const response = await this.client.get(endpoint, {
        params,
        headers: { "Api-sign": apiSign },
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error getting payment info:",
        error.response?.data || error.message
      );
      throw error.response?.data || error;
    }
  }

  async confirmPayout(
    payload: PayoutConfirmationRequest
  ): Promise<PayoutConfirmationResponse> {
    const endpoint = "/rest/payoutgate/confirm/";
    const apiSign = generateApiSign(this.secretKey, payload);
    try {
      const response = await this.client.put(endpoint, payload, {
        headers: { "Api-sign": apiSign },
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error confirming payout:",
        error.response?.data || error.message
      );
      throw error.response?.data || error;
    }
  }

  async approveAmountMismatch(
    payload: AmountAgreeRequest
  ): Promise<AmountAgreeResponse> {
    const endpoint = "/rest/paymentgate/order/amount-agree/";
    const apiSign = generateApiSign(this.secretKey, payload);
    try {
      const response = await this.client.post(endpoint, payload, {
        headers: { "Api-sign": apiSign },
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error approving amount mismatch:",
        error.response?.data || error.message
      );
      throw error.response?.data || error;
    }
  }
}
