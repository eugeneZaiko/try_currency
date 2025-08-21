import express from "express";
import bodyParser from "body-parser";
import { verifyWebhookSignature } from "./utils/signature";
import "dotenv/config";

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.DECARD_SECRET_KEY as string;

if (!SECRET_KEY) {
  console.error("FATAL: DECARD_SECRET_KEY is not defined in .env file.");
  process.exit(1);
}

app.post("/webhook/decard", (req, res) => {
  console.log("Received webhook:", JSON.stringify(req.body, null, 2));
  const isSignatureValid = verifyWebhookSignature(SECRET_KEY, req.body);

  if (!isSignatureValid) {
    return res.status(403).send("Invalid signature.");
  }

  const { status, type, number: orderNumber, amount, currency } = req.body;
  console.log(`Successfully processed webhook for order ${orderNumber}:
    Type: ${type}, Status: ${status}, Amount: ${amount / 100} ${currency}`);

  res.status(200).send("Webhook received successfully.");
});

app.listen(PORT, () => {
  console.log(`Webhook server is listening on port ${PORT}`);
});
