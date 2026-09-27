export type SubscribeResult =
  | "subscribed"
  | "already-subscribed";

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
        email: email,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to subscribe");
  }

  const data = await response.json();

  return data.status;
}