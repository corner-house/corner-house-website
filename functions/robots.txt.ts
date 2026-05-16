// Cloudflare Pages Function — serves a custom robots.txt that explicitly
// allows every major AI crawler. This runs at the edge for every /robots.txt
// request, so even if Cloudflare's "managed robots.txt" feature is enabled
// at the zone level, our response takes precedence.

const ROBOTS = `# The Corner House — robots.txt
# We explicitly allow AI crawlers so our listings and journal articles
# are discoverable in ChatGPT, Claude, Gemini, Perplexity, and similar tools.

# --- Search engines ---
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: YandexBot
Allow: /

# --- AI crawlers (training + real-time search) ---
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: GoogleOther
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

# --- X (Grok) ---
User-agent: FacebookExternalHit
Allow: /

# --- Default: allow everything else ---
User-agent: *
Allow: /

Sitemap: https://www.cornerhouse.co.in/sitemap.xml
`;

export const onRequest: PagesFunction = () =>
  new Response(ROBOTS, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      // Belt and braces: tell CF not to transform this response.
      'CF-Skip-Robots-Rewrite': '1',
    },
  });
