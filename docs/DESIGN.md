**[Leia em Português](DESIGN.pt-br.md)**

# Design

There is no visual identity name coined separately from the "FORGE" brand itself
(unlike, for example, Domo's "Armário Aberto") — the "FORGE" wordmark and the
"constellation"/dark graph aesthetic described below are the identity.
`TODO: confirm` if a dedicated name is ever adopted for this visual.

## Palette

Single, dark theme (`color-scheme: dark` on `:root`, `src/app/globals.css`) — there is no
light variant.

### Surfaces and text

| Token           | Value                   | Use                                   |
| --------------- | ------------------------ | -------------------------------------- |
| `--bg`          | `#0a0b0d`                 | page background                        |
| `--bg-raised`   | `#121418`                 | elevated element background (card photo, close button) |
| `--bg-panel`    | `#16191e`                 | panels (card, modal, toolbar)         |
| `--border`      | `rgba(255,255,255,0.09)`  | default borders                          |
| `--border-strong` | `rgba(255,255,255,0.18)` | higher-contrast borders             |
| `--text`        | `#f3f1ea`                 | primary text                        |
| `--text-dim`    | `#a2a8b3`                 | secondary text                       |
| `--text-faint`  | `#6b7280`                 | tertiary text (ids, uppercase labels) |

### Per-agent accent color

Each agent has its own accent color, stored as an HSL triplet (without the
`hsl()` function) so it can be composed with opacity via `hsl(var(--x) / <alpha>)`:

| Agent          | CSS var             | HSL              |
| -------------- | -------------------- | ----------------- |
| Orchestrator   | `--orchestrator`      | `38 85% 58%` (amber) |
| Product        | `--product`           | `165 60% 48%` (teal) |
| Design         | `--design`             | `320 68% 62%` (magenta) |
| Mobile         | `--mobile`             | `145 52% 48%` (green) |
| Backend        | `--backend`            | `250 58% 66%` (blue-violet) |
| Frontend Web   | `--frontend-web`       | `200 75% 58%` (cyan-blue) |
| DevOps         | `--devops`             | `220 14% 62%` (blue-gray) |
| QA             | `--qa`                 | `15 78% 56%` (red-orange) |
| Security       | `--security`           | `355 62% 50%` (red) |
| Analytics      | `--analytics`          | `275 58% 66%` (purple) |
| Docs           | `--docs`               | `100 38% 52%` (sage green) |

These colors become `--card-accent` (defined inline per component, never hardcoded in
CSS) and drive: the card's border/glow on hover/focus, the "role" color on the card and modal,
the copy button's background, the SVG figures' color (via `color: var(--card-accent)` +
`currentColor`, see below), and the glow behind the "FORGE" wordmark (fixed to
`--orchestrator`, since it's agent 01/the tech lead).

## Typography

- **Body**: a system font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI",
  Roboto, Helvetica, Arial, sans-serif`) — no webfont is loaded for running text,
  a deliberate decision (see the comment in `globals.css`).
- **"FORGE" wordmark**: the only exception — `Bebas_Neue` (weight 400, self-hosted via
  `next/font/google`, `latin` subset), applied only to the hero's `<h1>` via the
  `--font-display` CSS var. Fluid size `clamp(4rem, 16vw, 11rem)`.
- **Modal prompt** (`.prompt-body`): a monospace font
  (`ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`), 12.5px, to clearly
  differentiate the copyable content from the rest of the UI.
- Labels/ids (`.card-id`, `.gallery h2`, `.modal-id`) use uppercase + wide letter-spacing
  (0.1–0.14em) in `--text-faint`, a pattern repeated across the UI for "metadata".

## Layout and spacing

- Hero: `min-height: 100dvh` (the "hero always covers the full screen" rule from Café
  Labs' landing page standard — see `mind/cafelabs/padroes-landing.md`), centered content.
- Gallery: a responsive grid, `repeat(auto-fill, minmax(300px, 1fr))`, max-width 1180px.
- Cards: `border-radius: 18px` (`--radius-card`), with a decorative "tab"
  (`.card::before`) simulating a hanging tag at the top of the card.
- Modal: `width: min(980px, 100%)`, a two-column layout (figure on the left, content on the
  right) that collapses to a single column below 720px.

## "Constellation" background

`.stars` (applied to the hero) is a background generated entirely in CSS — two `radial-gradient`s of
white dots with different opacity and size, no image at all — creating a
starry-sky effect behind the wordmark.

## SVG figure system (per-agent portraits)

The most distinctive element of the identity: each `ready` agent has a portrait drawn
as an SVG graph — nodes (`.fig-node`, circles) linked by edges (`.fig-edge`, lines),
with all color inherited from `currentColor`/`--card-accent`.
Implemented in `src/components/figures.tsx`. As of this round, 8 of the 12 agents have
their own figure pair — `orchestrator`, `product`, `design`, `mobile`, `backend`,
`frontend-web`, `devops`, `qa` (see `FACE_COMPONENTS`/`BODY_COMPONENTS` at the bottom of
`figures.tsx`, and `docs/ARQUITETURA.md`'s "Data flow" section for how `ready` gates
which agents get one).

- **Face** (small, ~10–14 nodes) — used on the gallery card, cropped at the shoulders.
- **Body** (full body, 28–34 nodes) — used in the modal, with 2 or 4 animated "arms"
  (each its own `<g>`, pivoting via `transform-box: view-box` at its own
  shoulder coordinate) that give each agent its own, non-interchangeable pose. All 8
  bodies share the same base head/neck/hip/leg skeleton coordinates; individuality lives
  in the arms, the torso shape, and — where the agent has one — a head crest:
  - **Orchestrator**: 4 symmetric arms "conducting" (a coordinating posture); plain
    diamond torso.
  - **Product**: 2 asymmetric arms — one raised, pointing at an isolated node
    (the riskiest hypothesis), the other lowered, branching into 4 ghost nodes
    (discarded hypotheses); plain torso.
  - **Design**: both arms hold two opposite corners of one shared square traced in
    front of the body — 2 solid sides (committed) and 2 dashed ghost sides (still being
    sketched), a reference to "forming a large square with your hands" (Itaú's logo
    gesture, per Felipe's brief). The arms are static — rotating them would tear the
    square's shared corners apart.
  - **Mobile**: torso is a "screen frame" (rounded-rect bezel) instead of the plain
    diamond, with a pulsing glow on the spine inside it; head carries an antenna/status-
    light crest with a notification-badge dot. Right arm bends up holding a small
    phone-shaped rectangle beside the head; left arm hangs relaxed, ending in a dim,
    only-3-sided ghost rectangle (an idle second screen).
  - **Backend**: torso is 4 stacked horizontal ribs (`Rib`, an arc primitive — the only
    figure whose torso isn't the shared straight spine), echoing a database-cylinder icon
    ("as costelas do humanoide", per Felipe's brief); plain 2-arm pose (shoulder → elbow
    → wrist, no held object).
  - **Frontend Web**: torso is two large tag brackets (`<` `>`) cradling a dashed
    "blinking cursor" between them; the feet echo the same bracket angle at a smaller
    scale. Plain 2-arm pose.
  - **DevOps**: torso is one continuous circular arc with a visible arrowhead end (a
    "refresh"/cycle glyph), not two mirrored halves like the others. Right arm raised,
    reaching via a dashed edge toward a pulsing status-beacon node (monitoring/alerting);
    left arm relaxed at its own angle.
  - **QA**: torso is a 3-tier test pyramid (E2E / widget / unit, 1/3/5 dots per tier) —
    the only torso that widens downward. Right arm drops to a hinge and holds a
    horizontal "gate" boom across the body (solid behind the bar, dashed ahead of it);
    left arm cups the pyramid's wide base from below.
- **`SeedGraph`** — a deterministic generic graph (keyed by index `seed`, not random —
  avoiding a mismatch between server/client rendering) used for agents that don't have their own
  figure yet and for the "unavailable" state.

Each figure's coordinates were ported 1:1 from HTML mockups validated outside this
repo (noted in a comment at the top of `figures.tsx`) — they aren't "re-art directed" in the
conversion to JSX, just re-expressed. Every figure went through multiple discarded
drafts before landing on the version described above (documented as comments directly
above each component in `figures.tsx` — e.g. Backend's torso took 5 passes, DevOps' 3);
read those comments for the full design rationale/history behind a specific figure
rather than duplicating it here.

## Brand mark and favicon

The amber hexagon + 6-petal mark exists as two separate implementations, on purpose:

- **`ForgeIcon`** (`src/components/ForgeIcon.tsx`) — the in-page React component, used in
  the hero (animated) and `MiniNav` (static). Its petals use `currentColor` so they
  inherit `--text` instead of a static fill.
- **`src/app/icon.svg`** (`favicon`/browser-tab icon, resolved via Next.js's file-based
  metadata convention) — a separate, static SVG with the same shape, `prefers-color-scheme`
  used directly (`.petal { fill: #f3f1ea }`, swapped to `#16191e` in light mode) since it
  renders in a context with no access to this site's CSS custom properties or dark-only
  theme. It lives outside the `[locale]` segment specifically so it isn't locale-prefixed
  (fixed 2026-07-22, see git history).

## Motion

- `.scroll-cue` (the hero's scroll indicator): a subtle `bob` animation (translateY 6px,
  2.4s, infinite).
- Design's arm coil: continuous flow via `stroke-dashoffset`.
- Modal: opacity cross-fade + a slight scale/translate on open/close.
- All motion respects `prefers-reduced-motion: reduce` (checked explicitly in
  `AgentModal.tsx` via `prefersReducedMotion()`, and via `@media` in the relevant
  keyframes/transitions in CSS) — consistent with rule 2 of the Café Labs landing page standard.
