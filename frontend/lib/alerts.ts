export type SubscribeResult =
  | "subscribed"
  | "already-subscribed";

export async function submitReportProfile(
  name: string,
  email: string,
  sendSub: boolean
) {
  const response = await fetch(
    "http://127.0.0.1:5000/api/subscribe",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        send_sub: sendSub,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to save profile");
  }

  return response.json();
}

export async function subscribeToAlerts(
  email: string
): Promise<SubscribeResult> {
  const response = await fetch(
    "http://127.0.0.1:5000/api/subscribe",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to subscribe");
  }

  const data = await response.json();

  return data.status;
}