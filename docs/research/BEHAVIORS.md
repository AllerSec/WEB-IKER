# Behaviors — lambdaautomations.com

## Smooth scroll
- Uses Lenis (`html.lenis` class). Need `lenis` npm package + provider in app.
- Native scroll behavior: auto

## Hero
- Gradient text on h1 (white→blue) — `background-clip: text; color: transparent;`
- Two giant curve waves left/right of headline (SVG arcs) that subtly fade/move
- Centered logo emblem above title
- CTA button: solid blue gradient, soft glow shadow, slight scale on hover

## Nav (floating pill)
- Position: fixed (`position: fixed`), top offset
- backdrop-filter: blur, rgba dark background ~8% alpha
- Hover on link → underline animation or color brighten
- CTA button has subtle inner glow

## Cards (benefits + services)
- Soft border `1px solid rgba(255,255,255,0.06)`
- Gradient background ~ radial from top blend of `#001a35` to `#000A15`
- Inner subtle glow at certain corner
- On hover: slightly brighter border, gentle lift

## Repeated label triplet
- "EMPIEZA AHORA" / "SOLICITA NUESTROS SERVICIOS" repeated 3 times stacked
  - 1st (top): `color: #B7DEFF` opacity 1
  - 2nd (mid): `color: rgba(48,166,255,0.5)`
  - 3rd (bottom): transparent (probably -webkit-text-stroke or gradient mask)
- This forms a vertical fade-out effect; likely also has stagger reveal animation

## Process section
- Big circular lambda emblem centered above the 3 steps
- 3 numbered steps horizontally with connecting line behind
- Each step has small circular icon + number

## CTA section
- Robotic hands PNG floats centered, lambda emblem on palm
- Background: detailed blue circuit SVG (animated or static)
- Radial glow underneath hands
- Same 3x label fade effect

## Responsive
- Mobile (390px): all sections stack to 1 column, nav collapses to hamburger, type scales down ~70%

## Animations
- Section content fades up as it enters viewport (`opacity 0 → 1`, `y 24 → 0`, duration ~0.6s ease-out)
- Cards fade in with stagger
- Logo subtle pulse
