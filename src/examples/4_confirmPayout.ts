import "dotenv/config";
import { DecardApiService } from "../services/DecardApiService";
import { PayoutConfirmationRequest } from "../interfaces/payout";

const shopKey = process.env.DECARD_SHOP_KEY as string;
const secretKey = process.env.DECARD_SECRET_KEY as string;
const decardService = new DecardApiService(secretKey);

// Раним 2_createPayout.ts, получаем ответ с "payout_order_token"
// "order_token" вставляем здесь
const PAYOUT_ORDER_TOKEN = "paste_payout_order_token_here";

const confirmPayout = async () => {
  if (PAYOUT_ORDER_TOKEN === "paste_payout_order_token_here") {
    console.error(
      'Please replace "PAYOUT_ORDER_TOKEN" in src/examples/4_confirmPayout.ts'
    );
    return;
  }

  try {
    const payload: PayoutConfirmationRequest = {
      shop_key: shopKey,
      order_token: PAYOUT_ORDER_TOKEN,
    };

    const result = await decardService.confirmPayout(payload);
    console.log(
      "Payout confirmation sent successfully!",
      JSON.stringify(result, null, 2)
    );
  } catch (error) {
    console.error("Payout confirmation failed.");
  }
};

confirmPayout();
