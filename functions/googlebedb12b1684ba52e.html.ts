// Cloudflare Pages Function — serves the Google Search Console HTML file
// verification token at the exact .html URL Google expects.
//
// Why a Function rather than a static public/ file:
// Cloudflare Pages auto-redirects requests for `.html` paths to their
// extension-less counterparts with HTTP 308. GSC's HTML file verification
// fails on 3xx responses. Pages Functions bypass the auto-redirect, so we
// can return HTTP 200 directly at /googlebedb12b1684ba52e.html.

const BODY = 'google-site-verification: googlebedb12b1684ba52e.html\n';

export const onRequestGet = (): Response => {
  return new Response(BODY, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
