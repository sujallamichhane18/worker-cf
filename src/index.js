export default {
  async fetch(request, env, ctx) {

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const ua = request.headers.get("User-Agent") || "";
    const country = request.cf?.country || "unknown";
    const asn = request.cf?.asn || "unknown";
    const url = new URL(request.url);
    const path = url.pathname.toLowerCase();

    let score = 0;

    // Tool detection
    if (ua.toLowerCase().includes("curl")) score += 3;
    if (ua.toLowerCase().includes("wget")) score += 3;
    if (ua.toLowerCase().includes("python")) score += 3;

    // Suspicious path detection
    if (path.includes(".env")) score += 5;
    if (path.includes("wp-admin")) score += 3;
    if (path.includes("wp-login")) score += 3;
    if (path.includes("phpmyadmin")) score += 5;

    // Block if score high
    if (score >= 5) {
      console.log("Blocked:", { ip, country, asn, ua, path, score });

      return new Response("Forbidden", {
        status: 403,
        headers: { "content-type": "text/plain" }
      });
    }

    // Log normal traffic
    console.log("Allowed:", { ip, country, asn, path });

    return fetch(request);
  }
};
