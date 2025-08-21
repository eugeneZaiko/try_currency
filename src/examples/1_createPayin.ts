import "dotenv/config";
import { DecardApiService } from "../services/DecardApiService";
import { PaymentCreationRequest } from "../interfaces/payment";

const shopKey = process.env.DECARD_SHOP_KEY as string;
const secretKey = process.env.DECARD_SECRET_KEY as string;
const webhookBaseUrl = process.env.WEBHOOK_BASE_URL as string;

const decardService = new DecardApiService(secretKey);

const createTryPayin = async () => {
  const orderNumber = `ORDER-PAYIN-${Date.now()}`;
  console.log(`Creating Pay-in for order: ${orderNumber}`);
  try {
    const paymentPayload: PaymentCreationRequest = {
      shop_key: shopKey,
      amount: 30000,
      order_currency: "TRY",
      payment_currency: "TRY",
      payment_method: "papara",
      order_number: orderNumber,
      success_url: `${webhookBaseUrl}/success`,
      fail_url: `${webhookBaseUrl}/fail`,
      extra_params: {
        payment_method_details: {
          first_name: "John",
          last_name: "Doe",
          user_id: "user-12345",
        },
      },
    };

    const result = await decardService.createPayment(paymentPayload);
    console.log("Pay-in creation successful!", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Pay-in creation failed.");
  }
};

createTryPayin();
