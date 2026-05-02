# Video Follow-up Tickets

Date: 2026-05-01

## Ticket 1: Sobha Aranya video optimization

Priority: Low

Background: Sobha Aranya walkthrough shipped to R2 unoptimized at 84.5 MB. ffmpeg optimization was skipped during initial migration due to local homebrew x265 ABI mismatch breaking ffmpeg.

Action when ffmpeg is available:
- Pull current video: pub-f00f91c779cf4225a9881062b14b46d3.r2.dev/sobha-aranya/video/walkthrough.mp4
- Re-encode to 720p, libx264 preset slow, crf 24, AAC 96k, faststart
- Target size: under 10 MB
- Re-upload to same R2 path (overwrites). No code change needed.

Also worth optimizing while at it: Krisumi Forest Reserve (31.5 MB on R2).
Krisumi Waterside Residences (3.2 MB) is already optimized.

## Ticket 2: Downtown 66 walkthrough video broken

Priority: Medium

Background: Downtown 66 listing's walkthrough video shows "Sorry, This video does not exist" (YouTube error). Source video has been deleted, made private, or URL is malformed. The BPTP official site (bptpdowntown66.com) has a working walkthrough video, suggesting the source video exists somewhere just not at our listing's current URL.

Action:
1. Visit https://www.bptpdowntown66.com/ and identify the working walkthrough video
2. Capture the URL: if YouTube embed, note the video ID; if direct .mp4, note the URL
3. Decide hosting strategy:
   - If YouTube: update Downtown 66 source.json with the new video ID. Confirm site supports iframe embeds.
   - If direct .mp4: download, push to R2 under `downtown66/video/walkthrough.mp4`, update source.json. Same pattern as today's hotfix.
4. Build, preview, verify in browser, ship through staging to main.
5. Out of scope for today's R2 video migration (different bug class: source content missing, not CSP).
