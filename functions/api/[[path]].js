export async function onRequest(context) {
  const url = new URL(context.request.url)

  // 你的真实后端地址
  const backend = 'http://epc.ep365.com'

  // 去掉 /api 前缀
  const path = url.pathname.replace('/api', '')

  const target = backend + path + url.search

  const request = new Request(target, {
    method: context.request.method,
    headers: context.request.headers,
    body:
      context.request.method === 'GET' || context.request.method === 'HEAD'
        ? undefined
        : context.request.body,
  })

  return fetch(request)
}
