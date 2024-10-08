import { acceptsLanguages } from 'jsr:@std/http/negotiation'

let count = 0

Deno.serve((req, { remoteAddr }) => {
  const url = new URL(req.url)
  if (!url.pathname.includes('.')) {
    let html = Deno.readTextFileSync('assets/index.html')
    const toReplace: Record<string, string> = {
      lang: acceptsLanguages(req, 'zh', 'en') ?? 'en',
      url: req.url,
      count: `${++count}`,
      remoteAddr: `${remoteAddr.hostname}:${remoteAddr.port}`,
    }
    html = html.replace(/{{(\w+)}}/g, (_, k) => toReplace[k] ?? k)
    return new Response(html, { headers: { 'content-type': 'text/html' } })
  }
  return new Response(null, { status: 404 })
})
