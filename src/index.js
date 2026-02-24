export default {
  async fetch(request, env, ctx) {

    const country = request.cf?.country || "unknown"

    // Countries to block
    const blockedCountries = ["CN", "RU"]

    if (blockedCountries.includes(country)) {
      return new Response("Access Denied", {
        status: 403,
        headers: {
          "content-type": "text/plain",
          "X-Blocked-Country": country
        }
      })
    }

    return new Response("Request Allowed", {
      headers: {
        "content-type": "text/plain",
        "X-Visitor-Country": country
      }
    })
  }
}
