export async function GET(request: Request) {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    return new Response("Backend URL is not configured", { status: 500 });
  }

  const email = new URL(request.url).searchParams.get("email");

  try {
    const target = new URL("/api/unsubscribe", backendUrl);
    if (email) target.searchParams.set("email", email);

    const backendResponse = await fetch(target, { cache: "no-store" });
    const body = await backendResponse.text();

    return new Response(body, {
      status: backendResponse.status,
      headers: {
        "Content-Type":
          backendResponse.headers.get("content-type") ??
          "text/plain; charset=utf-8",
      },
    });
  } catch {
    return new Response("Could not reach the backend", { status: 502 });
  }
}
