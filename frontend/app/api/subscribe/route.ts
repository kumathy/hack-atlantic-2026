export async function POST(request: Request) {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    return Response.json(
      { success: false, message: "Backend URL is not configured" },
      { status: 500 },
    );
  }

  try {
    const body: unknown = await request.json();
    const response = await fetch(`${backendUrl.replace(/\/$/, "")}/api/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const result: unknown = await response.json();
    return Response.json(result, { status: response.status });
  } catch {
    return Response.json(
      { success: false, message: "Could not reach the backend" },
      { status: 502 },
    );
  }
}
