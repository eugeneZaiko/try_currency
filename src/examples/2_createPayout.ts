import "dotenv/config";
import { DecardApiService } from "../services/DecardApiService";
import { PayoutInitializationRequest } from "../interfaces/payout";

const shopKey = process.env.DECARD_SHOP_KEY as string;
const secretKey = process.env.DECARD_SECRET_KEY as string;

const decardService = new DecardApiService(secretKey);

const createTryPayout = async () => {
  const orderNumber = `ORDER-PAYOUT-${Date.now()}`;
  console.log(`Creating Payout for order: ${orderNumber}`);
  try {
    const payoutPayload: PayoutInitializationRequest = {
      shop_key: shopKey,
      amount: 25000,
      currency: "TRY",
      order_number: orderNumber,
      user_id: "user-12345",
      first_name: "Jane",
      last_name: "Doe",
      user_account: "1234567890",
    };

    const result = await decardService.createPayout("papara", payoutPayload);
    console.log(
      "Payout initialization successful!",
      JSON.stringify(result, null, 2)
    );
  } catch (error) {
    console.error("Payout initialization failed.");
  }
};

createTryPayout();
