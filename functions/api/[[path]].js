export default {
  async fetch(request) {
    return Response.json({
      success: true,
      method: request.method,
      url: request.url,
    })
  },
}
