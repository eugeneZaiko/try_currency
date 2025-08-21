import "dotenv/config";
import { DecardApiService } from "../services/DecardApiService";
import { AmountAgreeRequest } from "../interfaces/common.types";

const shopKey = process.env.DECARD_SHOP_KEY as string;
const secretKey = process.env.DECARD_SECRET_KEY as string;
const decardService = new DecardApiService(secretKey);

// Раним 1_createPayin.ts, получаем ответ с "order_token"
// Раним3_checkStatus.ts, получаем ответ с "token"
const MISMATCH_ORDER_TOKEN = "paste_mismatch_order_token_here";

const handleMismatch = async () => {
  if (MISMATCH_ORDER_TOKEN === "paste_mismatch_order_token_here") {
    console.error(
      'Please replace "MISMATCH_ORDER_TOKEN" in src/examples/5_handleMismatch.ts'
    );
    return;
  }

  try {
    const payload: AmountAgreeRequest = {
      shop_key: shopKey,
      order_token: MISMATCH_ORDER_TOKEN,
    };
    const result = await decardService.approveAmountMismatch(payload);
    console.log(
      "Amount mismatch approved successfully!",
      JSON.stringify(result, null, 2)
    );
  } catch (error) {
    console.error("Failed to approve amount mismatch.");
  }
};

handleMismatch();
