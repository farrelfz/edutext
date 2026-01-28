import crypto from 'crypto';

type SnapResponse = {
  token: string;
  redirect_url: string;
};

type MidtransPayload = {
  transaction_details: {
    order_id: string;
    gross_amount: number;
  };
  customer_details: {
    first_name: string;
    email: string;
  };
  item_details: Array<{ id: string; price: number; quantity: number; name: string }>;
};

export function getMidtransConfig() {
  const serverKey = process.env.MIDTRANS_SERVER_KEY ?? '';
  const clientKey = process.env.MIDTRANS_CLIENT_KEY ?? '';
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';
  const baseUrl = isProduction
    ? 'https://app.midtrans.com'
    : 'https://app.sandbox.midtrans.com';

  return { serverKey, clientKey, baseUrl, snapJsUrl: `${baseUrl}/snap/snap.js` };
}

export async function createSnapTransaction(payload: MidtransPayload) {
  const { serverKey, baseUrl } = getMidtransConfig();
  const response = await fetch(`${baseUrl}/snap/v1/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${serverKey}:`).toString('base64')}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Midtrans error: ${response.status} ${text}`);
  }

  return (await response.json()) as SnapResponse;
}

export function verifyMidtransSignature({
  orderId,
  statusCode,
  grossAmount,
  signatureKey
}: {
  orderId: string;
  statusCode: string;
  grossAmount: string;
  signatureKey: string;
}) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY ?? '';
  const signature = crypto
    .createHash('sha512')
    .update(`${orderId}${statusCode}${grossAmount}${serverKey}`)
    .digest('hex');

  return signature === signatureKey;
}
