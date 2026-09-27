export type SubscribeResult =
  | "subscribed"
  | "already-subscribed";

export async function subscribeToAlerts(
  email: string
): Promise<SubscribeResult> {
  const response = await fetch("/api/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Failed to subscribe");
  }

  const data: { status: SubscribeResult } = await response.json();

  return data.status;
}
