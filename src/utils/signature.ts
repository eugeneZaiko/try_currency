import { SHA256 } from "crypto-js";

export const generateApiSign = (
  secretKey: string,
  payload: Record<string, any>
): string => {
  const sorted = Object.entries(payload).sort(([a], [b]) => a.localeCompare(b));

  const values = sorted.map(([_, value]) => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return JSON.stringify(value);
    }
    return String(value);
  });

  const signStr = secretKey + values.join("");
  const signHash = SHA256(signStr).toString();
  return signHash;
};

export const verifyWebhookSignature = (
  secretKey: string,
  webhookBody: Record<string, any>
): boolean => {
  if (!webhookBody.sign) {
    console.error('Webhook verification failed: "sign" field is missing.');
    return false;
  }

  const receivedSign = webhookBody.sign;
  const payloadToSign = { ...webhookBody };
  delete payloadToSign.sign;

  const expectedSign = generateApiSign(secretKey, payloadToSign);

  if (receivedSign !== expectedSign) {
    console.warn(`Webhook verification failed: Signature mismatch.`);
    return false;
  }

  return true;
};
