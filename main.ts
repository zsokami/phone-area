Deno.serve((req) => {
  const url = new URL(req.url)
  if (url.pathname === '/') {
    const html = Deno.readTextFileSync('index.html')
    return new Response(html, { headers: { 'content-type': 'text/html' } })
  }
  return new Response(null, { status: 404 })
})
