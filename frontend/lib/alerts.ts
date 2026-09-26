export type SubscribeResult = "subscribed" | "already-subscribed";

/**
 * Signs an email up for new-incident alerts.
 *
 * Placeholder until the backend endpoint exists. Expected contract:
 *   POST /subscribers  { "email": string }
 *   201 → subscribed, 409 → already subscribed, anything else → throw
 */
export async function subscribeToAlerts(
  email: string,
): Promise<SubscribeResult> {
  void email;
  await new Promise((resolve) => setTimeout(resolve, 800));
  return "subscribed";
}
