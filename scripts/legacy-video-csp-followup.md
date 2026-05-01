# Legacy Listing Video CSP Follow-up

**Discovered during:** Krisumi Waterside Residences launch (2026-05-01)

## Symptom
Videos on these production listings still don't play after the Waterside CSP media-src fix:

- Forest Reserve (`/properties/krisumi-forest-reserve`)
- Sobha Aranya (`/properties/sobha-aranya`)
- Downtown 66 (`/properties/downtown66`)

## Root cause
Each of these listings hotlinks video from a domain other than `r2.dev`. The Waterside CSP fix whitelisted `r2.dev` (where Waterside's video lives), but the legacy domains used by these listings are not in the `media-src` whitelist.

## Special case: Downtown 66
Downtown 66's video shows "Sorry, This video does not exist" — Vimeo source is dead. Needs replacement video URL or video section removal.

## Action items
1. For Forest Reserve and Sobha Aranya: identify the video source domain (open each listing, F12 → Console → click play → read the blocked URL in the CSP error). Add those domains to `media-src` directive.
2. For Downtown 66: contact developer for replacement video, or remove the video section from the listing.
3. Re-deploy and verify all videos play on production.

## Priority
Medium. These videos have been broken for an unknown duration with no user complaints. Fix in a dedicated PR, do not bundle with feature work.
