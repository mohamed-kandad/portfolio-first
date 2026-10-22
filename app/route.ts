export function GET(request: Request) {
  const url = new URL(request.url);
  url.pathname = "/en";
  return Response.redirect(url, 307);
}
