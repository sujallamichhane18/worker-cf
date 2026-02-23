export default {
  async fetch(request) {

    const userAgent = request.headers.get("User-Agent") || "";

    // Block curl requests
    if (userAgent.toLowerCase().includes("curl")) {
      return new Response("Access Denied", {
        status: 403,
        headers: {
          "content-type": "text/plain"
        }
      });
    }

    // Allow everything else
    return fetch(request);
  }
};
