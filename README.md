# Al Qanas Photography — Portfolio V4

A cinematic bilingual portfolio prototype for Yasser Ismail / Al Qanas Photography.

## V4 upgrades
- **Separate typography systems for each language**
  - English display: Space Grotesk
  - English body: Manrope
  - English editorial accent: Cormorant Garamond
  - English micro labels: IBM Plex Mono
  - Arabic display: Alexandria
  - Arabic body: IBM Plex Sans Arabic
  - Arabic accent / micro typography: Noto Kufi Arabic
- Palette-only extended color system generated from:
  - `#0A0908`
  - `#22333B`
  - `#EAE0D5`
  - `#C6AC8F`
  - `#5E503F`
- WebAudio UI sound effects for buttons, toggles, search, transitions and gallery controls
- Sound mute/unmute control with saved preference
- Fixed the WhatsApp contact CTA text/contrast issue in dark and light themes
- Smoother desktop wheel easing
- More blur/fade/reveal animation and staggered motion
- Spotlight hover cards and liquid-glass highlight movement
- Improved smooth custom cursor and pointer-reactive depth
- Top scroll progress indicator and progressive blur edges
- Animated loader progress inside the Al Qanas intro
- Quick action search / command palette (`Cmd/Ctrl + K`)
- Palette particle micro-bursts on selected actions
- Added **Gallery** page with a responsive bento collage
- Fullscreen Gallery lightbox with keyboard navigation and sounds
- Gallery is linked from the main site and every project page
- Existing project-specific pages, fullscreen transitions, horizontal gallery, before/after slider and parallax retained

## Preview
For best behavior, run the folder through a local web server instead of `file://`.

Example:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000/al-qanas-portfolio-v4/
```

## Placeholder images
Temporary demo photography is credited in `CREDITS.md` and may be loaded from Pexels CDN on the published preview.

When Yasser's real 2025–2026 photographs are ready, the placeholder files can be replaced and the final project sequencing/crops can be tuned without rebuilding the motion system.

## V4.1 fixes
- Increased Arabic display-heading line height to prevent diacritics and glyphs from clipping/overlapping.
- Custom cursor now activates only after the script confirms it can render; otherwise the normal OS cursor remains visible.
- Preserved the custom cursor's centering transform.
- Increased UI sound gain and added a more reliable WebAudio unlock flow after the first user gesture.
- Clicking the sound control now plays an audible test chirp when enabling sound.
- Added `.nojekyll` and `404.html` so the folder is ready for simple GitHub Pages/static hosting.
