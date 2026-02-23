export default {
  async fetch(request) {
    return new Response("Worker Active", {
      status: 200,
      headers: {
        "content-type": "text/plain"
      }
    });
  }
};
