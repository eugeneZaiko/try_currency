import "dotenv/config";
import { DecardApiService } from "../services/DecardApiService";
import { GetInfoRequest } from "../interfaces/common.types";

const shopKey = process.env.DECARD_SHOP_KEY as string;
const secretKey = process.env.DECARD_SECRET_KEY as string;

const decardService = new DecardApiService(secretKey);

// Раним 1_createPayin.ts, получаем ответ с "order_token"
// "order_token" вставляем здесь
const ORDER_TOKEN_TO_CHECK = "paste_your_order_token_here";

const checkPaymentStatus = async () => {
  if (ORDER_TOKEN_TO_CHECK === "paste_your_order_token_here") {
    console.error(
      'Please replace "ORDER_TOKEN_TO_CHECK" in src/examples/3_checkStatus.ts'
    );
    return;
  }

  try {
    const params: GetInfoRequest = {
      shop_key: shopKey,
      order_token: ORDER_TOKEN_TO_CHECK,
    };
    const result = await decardService.getPaymentInfo(params);
    console.log("Status check successful!", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Status check failed.");
  }
};

checkPaymentStatus();
