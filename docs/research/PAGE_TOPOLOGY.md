# Page Topology — lambdaautomations.com

Total document height (desktop 1440x900): **6160px**
Body background: `rgb(0, 10, 21)` (`#000A15`) — very dark navy
HTML class: `lenis` → uses Lenis smooth scroll
Sticky/floating pill nav anchored at top (translate Y, blur backdrop)

## Sections (top to bottom)

| # | Tag | id | Y | Height | Description |
|---|-----|----|----|--------|-------------|
| 1 | nav | — | 0 | 77 | Floating pill, logo + 3 anchor links + CTA |
| 2 | section | hero | 77 | 964 | Eyebrow + huge gradient headline + subtitle + CTA + animated curve waves left/right |
| 3 | section | benefits | 1041 | 500 | 3 cards: chart card, red glow card, video/error card |
| 4 | section | services | 1541 | 1318 | 3 cards laid out 2 + 1 wide; circular dial, chat bubble, document |
| 5 | section | process | 2859 | 997 | Circular lambda emblem + 3 horizontal numbered steps |
| 6 | section | contact | 3856 | 1122 | Centered form card with social icons row |
| 7 | section | cta | 4978 | 901 | "EMPIEZA AHORA" pill, big headline, image of robotic hands holding lambda, blue circuit bg |
| 8 | footer | — | 5879 | 282 | Big lambda logo + 4-column nav |

## Layout
- Single scroll container (body), no scroll-snap
- Max width content ~1200px centered
- Globally dark with subtle radial blue glows behind sections
- Each section has eyebrow pill (small uppercase tracked text), large heading, optional subtitle, then content

## Fonts (computed)
- **Hero H1**: Manrope, 500, 61px, lineHeight 67.1px, letter-spacing -1.22px — color transparent (gradient fill text)
- **Section H2**: "Host Grotesk", 500, 49px, lineHeight 68.6px — pure white
- **Eyebrow/labels**: Inter, 16px, color `#DFEEFF`
- **Body subtitle**: Inter, 16px, color `#B7DEFF` (light blue) lineHeight 25.6
- **CTA button label**: Host Grotesk, 18px, white
- **Nav links / small labels**: Inter, 13px
- Hero subtitle: Inter 18px white lineHeight 28.8

## Color palette
- `--bg-deep`: `#000A15` body
- `--text-soft`: `#B7DEFF` (light blue body text)
- `--text-eyebrow`: `#DFEEFF`
- `--accent-blue`: `#30A6FF` (primary blue, button, glow)
- `--accent-glow`: rgba(48,166,255, 0.5)
- `--danger`: `#FF2244`
- White: text/cta foreground

## Effects / behaviors
- Lenis smooth scroll on html
- Background curve waves (two SVG arcs, one each side of hero) — likely framer-motion animated
- Hero h1 has gradient text fill (white→blue gradient) since computed color is transparent
- "EMPIEZA AHORA"/"SOLICITA NUESTROS SERVICIOS" repeated 3x stacked with decreasing opacity → vertical fade label effect
- Sticky pill nav: backdrop-filter blur, semi-transparent dark bg
- Cards with subtle border + glassy gradient background
- Process section: line-connected circular icons with glow
- Hands image in CTA composited over circuit-pattern svg background
