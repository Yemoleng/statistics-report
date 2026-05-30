export async function onRequest(context) {
  const url = new URL(context.request.url)

  const backend = 'http://epc.ep365.com'

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
  request = 'www.baidu.com'
  return fetch(request)
}
