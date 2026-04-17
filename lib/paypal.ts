/**
 * Thin server-side PayPal REST client.
 *
 * We only use three endpoints:
 *   - POST /v1/oauth2/token              (OAuth access token)
 *   - POST /v2/checkout/orders           (create order)
 *   - POST /v2/checkout/orders/:id/capture
 *   - POST /v1/notifications/verify-webhook-signature
 *
 * No dependency — plain fetch. Sandbox vs live is controlled by
 * PAYPAL_ENV ("sandbox" | "live").
 */

export function paypalBaseUrl(): string {
  const env = process.env.PAYPAL_ENV;
  return env === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

export function paypalConfig(): {
  clientId: string;
  clientSecret: string;
  baseUrl: string;
  webhookId: string | null;
} | null {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;
  return {
    clientId,
    clientSecret,
    baseUrl: paypalBaseUrl(),
    webhookId: process.env.PAYPAL_WEBHOOK_ID || null,
  };
}

let tokenCache: { token: string; expiresAt: number } | null = null;

export async function getAccessToken(): Promise<string | null> {
  const cfg = paypalConfig();
  if (!cfg) return null;
  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt > now + 30_000) {
    return tokenCache.token;
  }
  const basic = Buffer.from(`${cfg.clientId}:${cfg.clientSecret}`).toString(
    "base64"
  );
  const res = await fetch(`${cfg.baseUrl}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!res.ok) {
    console.error("[paypal] oauth failed", res.status, await res.text());
    return null;
  }
  const data = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!data.access_token) return null;
  tokenCache = {
    token: data.access_token,
    expiresAt: now + (data.expires_in ?? 300) * 1000,
  };
  return data.access_token;
}

export type CreateOrderInput = {
  amountUsd: number;
  description: string;
  customId: string;
  returnUrl?: string;
  cancelUrl?: string;
};

export type PaypalOrder = {
  id: string;
  status: string;
  links?: Array<{ href: string; rel: string; method: string }>;
};

export async function createOrder(
  input: CreateOrderInput
): Promise<PaypalOrder | null> {
  const token = await getAccessToken();
  const cfg = paypalConfig();
  if (!token || !cfg) return null;
  const body = {
    intent: "CAPTURE" as const,
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: input.amountUsd.toFixed(2),
        },
        description: input.description.slice(0, 127),
        custom_id: input.customId.slice(0, 127),
      },
    ],
    application_context: {
      brand_name: "FinalsPrep",
      user_action: "PAY_NOW",
      shipping_preference: "NO_SHIPPING",
      ...(input.returnUrl ? { return_url: input.returnUrl } : {}),
      ...(input.cancelUrl ? { cancel_url: input.cancelUrl } : {}),
    },
  };
  const res = await fetch(`${cfg.baseUrl}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) {
    console.error("[paypal] createOrder failed", res.status, await res.text());
    return null;
  }
  return (await res.json()) as PaypalOrder;
}

export type PaypalCapture = {
  id: string;
  status: string;
  purchase_units?: Array<{
    payments?: {
      captures?: Array<{
        id: string;
        status: string;
        custom_id?: string;
        amount?: { currency_code: string; value: string };
      }>;
    };
  }>;
};

export async function captureOrder(
  orderId: string
): Promise<PaypalCapture | null> {
  const token = await getAccessToken();
  const cfg = paypalConfig();
  if (!token || !cfg) return null;
  const res = await fetch(
    `${cfg.baseUrl}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) {
    console.error("[paypal] captureOrder failed", res.status, await res.text());
    return null;
  }
  return (await res.json()) as PaypalCapture;
}

export async function getOrder(orderId: string): Promise<PaypalCapture | null> {
  const token = await getAccessToken();
  const cfg = paypalConfig();
  if (!token || !cfg) return null;
  const res = await fetch(
    `${cfg.baseUrl}/v2/checkout/orders/${encodeURIComponent(orderId)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  );
  if (!res.ok) return null;
  return (await res.json()) as PaypalCapture;
}

export async function verifyWebhookSignature(headers: {
  transmissionId: string | null;
  transmissionTime: string | null;
  certUrl: string | null;
  authAlgo: string | null;
  transmissionSig: string | null;
  body: any;
}): Promise<boolean> {
  const token = await getAccessToken();
  const cfg = paypalConfig();
  if (!token || !cfg || !cfg.webhookId) return false;
  if (
    !headers.transmissionId ||
    !headers.transmissionTime ||
    !headers.certUrl ||
    !headers.authAlgo ||
    !headers.transmissionSig
  ) {
    return false;
  }
  const res = await fetch(
    `${cfg.baseUrl}/v1/notifications/verify-webhook-signature`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_algo: headers.authAlgo,
        cert_url: headers.certUrl,
        transmission_id: headers.transmissionId,
        transmission_sig: headers.transmissionSig,
        transmission_time: headers.transmissionTime,
        webhook_id: cfg.webhookId,
        webhook_event: headers.body,
      }),
      cache: "no-store",
    }
  );
  if (!res.ok) return false;
  const data = (await res.json()) as { verification_status?: string };
  return data.verification_status === "SUCCESS";
}

/** Encode a PayPal `custom_id` so we can round-trip uid/plan/coupon. */
export function encodeCustomId(parts: {
  uid: string;
  sku: string;
  coupon?: string | null;
}): string {
  const base = `${parts.uid}|${parts.sku}`;
  return parts.coupon ? `${base}|${parts.coupon}` : base;
}

export function decodeCustomId(customId: string | undefined | null): {
  uid: string;
  sku: string;
  coupon: string | null;
} | null {
  if (!customId) return null;
  const [uid, sku, coupon] = customId.split("|");
  if (!uid || !sku) return null;
  return { uid, sku, coupon: coupon ?? null };
}
