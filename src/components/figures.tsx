// Shared SVG "figure grammar" ported from the validated mockup
// (/tmp/forge-skill-library-mockup.html): every agent figure is nodes
// (traits/joints) + edges (relationships) on the same dark canvas, one
// accent hue per agent, colored via `currentColor` so the figure inherits
// whatever `color` the surrounding element sets (card / modal both set
// `color: var(--card-accent)`).
//
// All coordinates below are ported 1:1 from the mockup's JS builder
// functions (orchestratorFace / orchestratorBody / seedGraph) — this is
// deliberately not "re-art directed", just re-expressed as JSX.

import type { JSX } from "react";

let keyCounter = 0;
function nextKey() {
  keyCounter += 1;
  return keyCounter;
}

function Edge({
  x1,
  y1,
  x2,
  y2,
  ghost,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  ghost?: boolean;
}) {
  return (
    <line
      className={`fig-edge${ghost ? " ghost" : ""}`}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
    />
  );
}

function Node({
  cx,
  cy,
  r,
  variant,
}: {
  cx: number;
  cy: number;
  r: number;
  variant?: "crest" | "head" | "eye" | "jaw" | "neck" | "joint" | "ghost";
}) {
  return <circle className={`fig-node${variant ? ` ${variant}` : ""}`} cx={cx} cy={cy} r={r} />;
}

/** A shallow horizontal arc from (x1,y) to (x2,y), bowing down by `bow` at
 * its midpoint. Introduced for BackendBody/BackendFace's stacked-rib torso
 * (see their doc comments) — the only figure whose torso isn't the shared
 * straight spine, so this is the one primitive Edge/Node can't express. */
function Rib({
  x1,
  y,
  x2,
  bow,
  cap,
}: {
  x1: number;
  y: number;
  x2: number;
  bow: number;
  cap?: boolean;
}) {
  const midX = (x1 + x2) / 2;
  return <path className={`fig-rib${cap ? " cap" : ""}`} d={`M ${x1} ${y} Q ${midX} ${y + bow} ${x2} ${y}`} />;
}

/** Small "face" graph used on the badge card (10-12 nodes). Only the
 * orchestrator has one this round. */
export function OrchestratorFace() {
  return (
    <svg
      viewBox="48 18 44 92"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <Edge x1={70} y1={32} x2={58} y2={40} />
      <Edge x1={70} y1={32} x2={82} y2={40} />
      <Edge x1={70} y1={58} x2={58} y2={74} />
      <Edge x1={70} y1={58} x2={70} y2={80} />
      <Edge x1={70} y1={58} x2={82} y2={74} />
      <Edge x1={70} y1={58} x2={70} y2={96} />
      <Node cx={58} cy={40} r={3} variant="crest" />
      <Node cx={70} cy={32} r={3.5} variant="crest" />
      <Node cx={82} cy={40} r={3} variant="crest" />
      <Edge x1={58} y1={40} x2={70} y2={58} />
      <Edge x1={82} y1={40} x2={70} y2={58} />
      <Node cx={70} cy={58} r={7} variant="head" />
      <Node cx={64} cy={56} r={2} variant="eye" />
      <Node cx={76} cy={56} r={2} variant="eye" />
      <Node cx={58} cy={74} r={3} variant="jaw" />
      <Node cx={70} cy={80} r={3} variant="jaw" />
      <Node cx={82} cy={74} r={3} variant="jaw" />
      <Node cx={70} cy={96} r={3} variant="neck" />
    </svg>
  );
}

/** Full-body graph (32 nodes / 30 edges) used in the modal. Each of the 4
 * arms is one <g> holding BOTH its nodes and its connecting edges, pivoting
 * with `transform-box: view-box` on its own shoulder coordinate — see the
 * `.arm-*` rules in globals.css for why (never `fill-box`, or the limb
 * visually detaches from the torso on every rotate() frame). */
export function OrchestratorBody() {
  return (
    <svg
      viewBox="0 -20 212 312"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <g className="figure-group">
        {/* torso + head */}
        <Edge x1={100} y1={10} x2={84} y2={18} />
        <Edge x1={100} y1={10} x2={116} y2={18} />
        <Edge x1={84} y1={18} x2={100} y2={38} />
        <Edge x1={116} y1={18} x2={100} y2={38} />
        <Edge x1={100} y1={38} x2={100} y2={58} />
        <Edge x1={100} y1={58} x2={100} y2={82} />
        <Edge x1={100} y1={82} x2={66} y2={72} />
        <Edge x1={100} y1={82} x2={134} y2={72} />
        <Edge x1={100} y1={82} x2={100} y2={112} />
        <Edge x1={100} y1={112} x2={62} y2={108} />
        <Edge x1={100} y1={112} x2={138} y2={108} />
        <Edge x1={100} y1={112} x2={100} y2={150} />
        <Edge x1={100} y1={150} x2={86} y2={152} />
        <Edge x1={86} y1={152} x2={80} y2={215} />
        <Edge x1={80} y1={215} x2={75} y2={278} />
        <Edge x1={100} y1={150} x2={114} y2={152} />
        <Edge x1={114} y1={152} x2={120} y2={215} />
        <Edge x1={120} y1={215} x2={125} y2={278} />

        <Node cx={84} cy={18} r={3} variant="crest" />
        <Node cx={100} cy={10} r={3.5} variant="crest" />
        <Node cx={116} cy={18} r={3} variant="crest" />
        <Node cx={100} cy={38} r={6} variant="head" />
        <Node cx={94} cy={36} r={2} variant="eye" />
        <Node cx={106} cy={36} r={2} variant="eye" />
        <Node cx={100} cy={58} r={3.5} variant="joint" />
        <Node cx={100} cy={82} r={4.5} variant="joint" />
        <Node cx={66} cy={72} r={4.5} variant="joint" />
        <Node cx={134} cy={72} r={4.5} variant="joint" />
        <Node cx={100} cy={112} r={4.5} variant="joint" />
        <Node cx={62} cy={108} r={4.5} variant="joint" />
        <Node cx={138} cy={108} r={4.5} variant="joint" />
        <Node cx={100} cy={150} r={4.5} variant="joint" />
        <Node cx={86} cy={152} r={3.5} variant="joint" />
        <Node cx={114} cy={152} r={3.5} variant="joint" />
        <Node cx={80} cy={215} r={3.5} variant="joint" />
        <Node cx={120} cy={215} r={3.5} variant="joint" />
        <Node cx={75} cy={278} r={4} variant="joint" />
        <Node cx={125} cy={278} r={4} variant="joint" />

        {/* Four arms, each reaching outward and away from the torso
            centerline and from each other, so none of the four ever
            cross — diagonal up-left, near-vertical up-right,
            near-vertical down-left, diagonal down-right. Each ends in
            its own short dashed "ghost" fingertip. */}
        <g className="arm-ul">
          <Edge x1={66} y1={72} x2={46} y2={48} />
          <Node cx={46} cy={48} r={3.5} />
          <Edge x1={46} y1={48} x2={28} y2={20} />
          <Node cx={28} cy={20} r={4} />
          <Edge x1={28} y1={20} x2={16} y2={2} ghost />
          <Node cx={16} cy={2} r={2.5} variant="ghost" />
        </g>
        <g className="arm-ur">
          <Edge x1={134} y1={72} x2={142} y2={40} />
          <Node cx={142} cy={40} r={3.5} />
          <Edge x1={142} y1={40} x2={150} y2={10} />
          <Node cx={150} cy={10} r={4} />
          <Edge x1={150} y1={10} x2={155} y2={-8} ghost />
          <Node cx={155} cy={-8} r={2.5} variant="ghost" />
        </g>
        <g className="arm-ll">
          <Edge x1={62} y1={108} x2={52} y2={140} />
          <Node cx={52} cy={140} r={3.5} />
          <Edge x1={52} y1={140} x2={46} y2={172} />
          <Node cx={46} cy={172} r={4} />
          <Edge x1={46} y1={172} x2={42} y2={190} ghost />
          <Node cx={42} cy={190} r={2.5} variant="ghost" />
        </g>
        <g className="arm-lr">
          <Edge x1={138} y1={108} x2={162} y2={128} />
          <Node cx={162} cy={128} r={3.5} />
          <Edge x1={162} y1={128} x2={182} y2={152} />
          <Node cx={182} cy={152} r={4} />
          <Edge x1={182} y1={152} x2={196} y2={170} ghost />
          <Node cx={196} cy={170} r={2.5} variant="ghost" />
        </g>
      </g>
    </svg>
  );
}

/** Small "face" graph used on the badge card (10 nodes / 6 edges). Ported
 * 1:1 from the validated design harness (/tmp/product-figure-test.html): a
 * head-and-shoulders bust with one asymmetric raised-brow node and a short
 * ghost reach toward a small halo'd/pulsing node — the same
 * skeptical-attention read as the full body, compressed to badge size. */
export function ProductFace() {
  return (
    <svg
      viewBox="46 32 68 62"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <Edge x1={76} y1={56} x2={86} y2={44} />
      <Edge x1={70} y1={58} x2={70} y2={80} />
      <Edge x1={70} y1={58} x2={58} y2={74} />
      <Edge x1={70} y1={58} x2={82} y2={74} />
      <Edge x1={82} y1={74} x2={94} y2={64} />
      <Edge x1={94} y1={64} x2={104} y2={50} ghost />

      <Node cx={70} cy={58} r={7} variant="head" />
      <Node cx={64} cy={56} r={2} variant="eye" />
      <Node cx={76} cy={56} r={2} variant="eye" />
      <Node cx={86} cy={44} r={2.5} variant="crest" />
      <Node cx={70} cy={80} r={3} variant="jaw" />
      <Node cx={58} cy={74} r={3} variant="jaw" />
      <Node cx={82} cy={74} r={3} variant="jaw" />
      <Node cx={94} cy={64} r={2} variant="joint" />
      <Node cx={104} cy={50} r={5} variant="ghost" />
      <Node cx={104} cy={50} r={2.5} variant="ghost" />
    </svg>
  );
}

/** Full-body graph (28 nodes / 24 edges) used in the modal. Deliberately TWO
 * arms, not four — the contrast with the Orchestrator's four-armed
 * conducting pose: this figure holds a position rather than gestures
 * broadly. Same limb convention as the Orchestrator (one <g> per arm holding
 * both its nodes and edges, pivoting with `transform-box: view-box` at its
 * true shoulder coordinate) but with two different arms instead of four
 * symmetric ones — see the `.arm-raise` / `.arm-lower` rules in globals.css.
 *
 * Raised arm (screen-right) reaches via a dashed/ghost edge toward an
 * isolated, two-layer-halo'd node: the riskiest assumption, pointed at, not
 * held. Lowered arm (screen-left) fans into four dim ghost nodes: discarded
 * assumptions. */
export function ProductBody() {
  return (
    <svg
      viewBox="0 -20 212 312"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <g className="figure-group">
        {/* torso + head */}
        <Edge x1={106} y1={36} x2={118} y2={20} />
        <Edge x1={94} y1={36} x2={90} y2={26} />
        <Edge x1={100} y1={38} x2={100} y2={58} />
        <Edge x1={100} y1={58} x2={100} y2={82} />
        <Edge x1={100} y1={82} x2={66} y2={72} />
        <Edge x1={100} y1={82} x2={134} y2={72} />
        <Edge x1={100} y1={82} x2={100} y2={112} />
        <Edge x1={100} y1={112} x2={100} y2={150} />
        <Edge x1={100} y1={150} x2={86} y2={152} />
        <Edge x1={100} y1={150} x2={114} y2={152} />
        <Edge x1={86} y1={152} x2={78} y2={196} />
        <Edge x1={78} y1={196} x2={72} y2={262} />
        <Edge x1={114} y1={152} x2={124} y2={206} />
        <Edge x1={124} y1={206} x2={130} y2={272} />
        <Edge x1={72} y1={262} x2={60} y2={266} ghost />

        <Node cx={118} cy={20} r={2.5} variant="crest" />
        <Node cx={90} cy={26} r={1.8} variant="crest" />
        <Node cx={100} cy={38} r={6.5} variant="head" />
        <Node cx={94} cy={36} r={2} variant="eye" />
        <Node cx={106} cy={36} r={2} variant="eye" />
        <Node cx={100} cy={58} r={3.5} variant="joint" />
        <Node cx={100} cy={82} r={4.5} variant="joint" />
        <Node cx={66} cy={72} r={4.5} variant="joint" />
        <Node cx={134} cy={72} r={4.5} variant="joint" />
        <Node cx={100} cy={112} r={4.5} variant="joint" />
        <Node cx={100} cy={150} r={4.5} variant="joint" />
        <Node cx={86} cy={152} r={3.5} variant="joint" />
        <Node cx={114} cy={152} r={3.5} variant="joint" />
        <Node cx={78} cy={196} r={3.5} variant="joint" />
        <Node cx={124} cy={206} r={3.5} variant="joint" />
        <Node cx={72} cy={262} r={4} variant="joint" />
        <Node cx={130} cy={272} r={4} variant="joint" />
        <Node cx={60} cy={266} r={1.5} variant="ghost" />

        {/* raised arm (screen-right): reaches toward an isolated, halo'd
            node via a dashed ghost edge — the riskiest assumption, pointed
            at, not held. */}
        <g className="arm-raise">
          <Edge x1={134} y1={72} x2={158} y2={48} />
          <Node cx={158} cy={48} r={3.5} />
          <Edge x1={158} y1={48} x2={176} y2={22} />
          <Node cx={176} cy={22} r={4} />
          <Edge x1={176} y1={22} x2={194} y2={-4} ghost />
          <Node cx={194} cy={-4} r={8} variant="ghost" />
          <Node cx={194} cy={-4} r={4.5} variant="ghost" />
        </g>

        {/* lowered arm (screen-left): fans into four dim ghost nodes —
            discarded assumptions. */}
        <g className="arm-lower">
          <Edge x1={66} y1={72} x2={46} y2={98} />
          <Node cx={46} cy={98} r={3.5} />
          <Edge x1={46} y1={98} x2={34} y2={128} />
          <Node cx={34} cy={128} r={4} />
          <Edge x1={34} y1={128} x2={20} y2={148} ghost />
          <Edge x1={34} y1={128} x2={26} y2={160} ghost />
          <Edge x1={34} y1={128} x2={40} y2={164} ghost />
          <Edge x1={34} y1={128} x2={46} y2={150} ghost />
          <Node cx={20} cy={148} r={2.5} variant="ghost" />
          <Node cx={26} cy={160} r={2} variant="ghost" />
          <Node cx={40} cy={164} r={2} variant="ghost" />
          <Node cx={46} cy={150} r={2} variant="ghost" />
        </g>
      </g>
    </svg>
  );
}

/** Small "face" graph used on the badge card. Ported from the validated v2
 * design harness (/tmp/design-face-v2-test.html) — a beret'd head-and-
 * shoulders bust, deliberately distinct from ProductFace's silhouette: only
 * ONE shoulder (screen-left) trails off into a dim ghost node, an unfinished
 * sketch line rather than a symmetric jaw fan. The other shoulder
 * (screen-right) becomes an arm — shoulder -> elbow -> wrist. Beret, eyes,
 * and the left-shoulder trailing ghost are unchanged from the original
 * round and untouched by the square-gesture rework below.
 *
 * The wrist has gone through two motifs since: first a right-angle frame/
 * viewfinder corner, then a small spiral curl echoing the body's (since
 * retired) coil hand. Now it echoes the body's current "large square"
 * gesture instead (see DesignBody) -- but only a two-solid-side corner of
 * it, not the full four-sided shape: a full square drawn small enough to
 * fit a badge either reads as a meaningless tiny box or has to shrink its
 * line weight/gaps to the point of mush at this render size, whereas a
 * single solid "L" corner completed by two dashed ghost edges reads
 * cleanly as "this is a square, mostly implied" even at 70x74 viewBox
 * units -- the same solid-vs-implied grammar as the body, just cropped to
 * the one corner that still reads at badge scale. The leading corner
 * (where the two solid sides meet, i.e. where the "drawing" currently is)
 * gets the halo'd/pulsing emphasis the wrist tip used to carry. */
export function DesignFace() {
  return (
    <svg
      viewBox="44 26 90 78"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      {/* beret */}
      <Edge x1={70} y1={51} x2={58} y2={44} />
      <Edge x1={70} y1={51} x2={78} y2={36} />
      {/* single left shoulder trailing off (sketch fading) */}
      <Edge x1={70} y1={58} x2={56} y2={76} />
      <Edge x1={56} y1={76} x2={50} y2={92} ghost />
      {/* right shoulder -> elbow -> wrist */}
      <Edge x1={70} y1={58} x2={88} y2={70} />
      <Edge x1={88} y1={70} x2={104} y2={66} />
      {/* small square-corner gesture off the wrist -- badge-scale echo of
          DesignBody's large square: two solid sides tracing an "L" down and
          across, closed by two dashed ghost sides implying the rest. */}
      <Edge x1={104} y1={66} x2={104} y2={84} />
      <Edge x1={104} y1={84} x2={122} y2={84} />
      <Edge x1={122} y1={84} x2={122} y2={66} ghost />
      <Edge x1={122} y1={66} x2={104} y2={66} ghost />

      <Node cx={70} cy={58} r={7} variant="head" />
      <Node cx={64} cy={56} r={2} variant="eye" />
      <Node cx={76} cy={56} r={2} variant="eye" />
      <Node cx={58} cy={44} r={3.2} variant="crest" />
      <Node cx={78} cy={36} r={2.2} variant="crest" />
      <Node cx={56} cy={76} r={3.2} variant="jaw" />
      <Node cx={50} cy={92} r={2} variant="ghost" />
      <Node cx={88} cy={70} r={3.2} variant="joint" />
      <Node cx={104} cy={66} r={2.5} variant="joint" />
      <Node cx={104} cy={84} r={2.4} variant="joint" />
      <Node cx={122} cy={84} r={2.8} variant="joint" />
      <Node cx={122} cy={66} r={1.6} variant="ghost" />
    </svg>
  );
}

/** Full-body graph used in the modal. Both hands hold two OPPOSITE corners
 * of one shared square traced in front of the figure -- Felipe's reference:
 * "gesto de formar um quadrado grande com as mãos, referência ao símbolo do
 * Itaú." This replaces a first attempt whose left hand traced most of the
 * square's own edges (left side + most of the bottom) while the right hand
 * bent through two extra joints on a diagonal cutting across the square's
 * interior back up to the top-right corner -- direct feedback from Felipe
 * after seeing it: "n ficou legal, tem q ser um braço segurando no canto
 * direito superior e o outro no canto esquerdo inferior, segurando um
 * quadrado com dois lados com linhas continuas e 2 lados com linhas
 * dashed." The diagonal-through-the-middle path read as an arm awkwardly
 * folding across the shape, not two hands cleanly holding two corners.
 *
 * This version keeps the square as its own self-contained shape -- exactly
 * 4 corner nodes, 4 edges -- geometrically separate from the arms. Each arm
 * is a plain 3-joint path (shoulder -> elbow -> wrist) that terminates AT
 * one corner and goes no further; the two arm-paths and the square's edges
 * only ever share coordinates at those two corner points, never cross or
 * double for one another elsewhere.
 *
 * Right arm (pivot 134,72) ends at the top-right corner (161,64). Left arm
 * (pivot 66,72) ends at the bottom-left corner (45,142) -- two opposite
 * corners, per Felipe's correction. Top-left (45,64) and bottom-right
 * (161,142) are free-standing, touched by neither arm.
 *
 * Solid vs dashed: the LEFT edge and the BOTTOM edge -- the pair that meets
 * AT the held bottom-left corner -- are solid (fully drawn/committed). The
 * TOP edge and RIGHT edge -- meeting at the held top-right corner -- are
 * dashed ghost lines (implied, still being sketched). (Flipped from an
 * earlier pass that had this backwards -- top+right solid, left+bottom
 * dashed -- per Felipe's direct correction once he saw it described.)
 *
 * The square sits between y=64 (a few px below the neck node at y=58,
 * clear of its r=3.5) and y=142 (a few px above the pelvis node at y=150 /
 * hip joints at y=152), spanning x=45-161 -- clear of the legs
 * (which stay within x=70-138 below y=150). It's 116x78 rather than a
 * mathematically perfect square, the same clearance trade-off the first
 * draft of this figure already had to make (that version landed on
 * ~100x82 for the same reason). The top/bottom edges do cross the torso's
 * own spine (x=100) since the square spans the torso's full width -- the
 * same way the earlier version's hand-drawn lines already crossed the
 * spine without reading as broken.
 *
 * Left arm shape: a single elbow at (70,130), bowed toward the torso and
 * off the square's left edge -- Felipe tried a 4-segment outward hook/loop
 * variant after this and asked to revert back to this simpler version, so
 * this is the confirmed shape.
 *
 * Both arms are STATIC -- no `.arm-*` rotate class. Reason: each arm's
 * wrist coordinate IS a square corner shared with two fixed <line> edges
 * that terminate there; rotating the shoulder pivot would carry that
 * corner away from those edges, tearing the shape apart every frame (the
 * same "wrong pivot" bug class the .arm-ul etc. CSS comments warn about,
 * here triggered by an arm/shape coupling instead of a bad
 * transform-origin). Life instead comes from the square's own
 * `.square-breathe` scale/rise and from the dash march on its two ghost
 * sides, which travels the same way the corners are drawn: top-left ->
 * top-right -> bottom-right.
 *
 * The 4 corners used to be staggered pulse-nodes re-tracing the outline as
 * a glow. Retired with every other pulsing node in the set (see the node
 * fill rules in globals.css): a node's opacity now states what it's
 * attached to -- solid where it meets a solid line, dim where it only meets
 * dashed ones -- and can't also be spending that opacity on an animation.
 * All 4 corners are solid: the two held ones meet a solid arm edge, the
 * other two the square's solid left/bottom sides. */
export function DesignBody() {
  return (
    <svg
      viewBox="0 -20 212 312"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <g className="figure-group">
        {/* torso + head */}
        <Edge x1={98} y1={34} x2={80} y2={20} />
        <Edge x1={98} y1={34} x2={118} y2={16} />
        <Edge x1={100} y1={38} x2={100} y2={58} />
        <Edge x1={100} y1={58} x2={100} y2={82} />
        <Edge x1={100} y1={82} x2={66} y2={72} />
        <Edge x1={100} y1={82} x2={134} y2={72} />
        <Edge x1={100} y1={82} x2={100} y2={112} />
        <Edge x1={100} y1={112} x2={100} y2={150} />
        <Edge x1={100} y1={150} x2={86} y2={152} />
        <Edge x1={100} y1={150} x2={114} y2={152} />
        <Edge x1={86} y1={152} x2={76} y2={198} />
        <Edge x1={76} y1={198} x2={70} y2={266} />
        <Edge x1={114} y1={152} x2={126} y2={192} />
        <Edge x1={126} y1={192} x2={138} y2={258} />

        <Node cx={80} cy={20} r={3.5} variant="crest" />
        <Node cx={118} cy={16} r={2.6} variant="crest" />
        <Node cx={100} cy={38} r={6.5} variant="head" />
        <Node cx={94} cy={36} r={2} variant="eye" />
        <Node cx={106} cy={36} r={2} variant="eye" />
        <Node cx={100} cy={58} r={3.5} variant="joint" />
        <Node cx={100} cy={82} r={4.5} variant="joint" />
        <Node cx={66} cy={72} r={4.5} variant="joint" />
        <Node cx={134} cy={72} r={4.5} variant="joint" />
        <Node cx={100} cy={112} r={4.5} variant="joint" />
        <Node cx={100} cy={150} r={4.5} variant="joint" />
        <Node cx={86} cy={152} r={3.5} variant="joint" />
        <Node cx={114} cy={152} r={3.5} variant="joint" />
        <Node cx={76} cy={198} r={3.5} variant="joint" />
        <Node cx={126} cy={192} r={3.5} variant="joint" />
        <Node cx={70} cy={266} r={4} variant="joint" />
        <Node cx={138} cy={258} r={4} variant="joint" />

        {/* Right arm: shoulder -> elbow -> top-right corner (held). Ends
            exactly at the corner node declared below with the rest of the
            square -- no extra joints past the elbow, no path across the
            square's interior. */}
        <g className="hand-square-right">
          <Edge x1={134} y1={72} x2={145} y2={120} />
          <Node cx={145} cy={120} r={3.5} />
          <Edge x1={145} y1={120} x2={161} y2={64} />
        </g>

        {/* Left arm: shoulder -> elbow -> bottom-left corner (held). Same
            shape as the right arm: one elbow, then straight to its corner. */}
        <g className="hand-square-left">
          <Edge x1={66} y1={72} x2={70} y2={130} />
          <Node cx={70} cy={130} r={3.5} />
          <Edge x1={70} y1={130} x2={45} y2={142} />
        </g>

        {/* The square: 4 corners, 4 edges, self-contained. Left + bottom are
            solid (the pair meeting at the held bottom-left corner); top +
            right are dashed ghost (the pair meeting at the held top-right
            corner). All 4 corners are solid nodes -- each meets at least one
            solid line (the two held ones via their arm edge). The whole
            shape is wrapped in `.square-breathe` -- a subtle independent
            grow/shrink + rise/fall, on the same rhythm as `.figure-group`'s
            own breathe but offset by its own animation-delay so the square
            doesn't move in lockstep with the body (see globals.css). */}
        <g className="square-breathe">
          <Edge x1={45} y1={64} x2={161} y2={64} ghost />
          <Edge x1={161} y1={64} x2={161} y2={142} ghost />
          <Edge x1={161} y1={142} x2={45} y2={142} />
          <Edge x1={45} y1={142} x2={45} y2={64} />

          <Node cx={45} cy={142} r={4.5} variant="joint" />
          <Node cx={45} cy={64} r={4.5} variant="joint" />
          <Node cx={161} cy={64} r={4.5} variant="joint" />
          <Node cx={161} cy={142} r={4.5} variant="joint" />
        </g>
      </g>
    </svg>
  );
}

/** Small "face" graph used on the badge card. Mobile's distinguishing prop
 * (analogous to Orchestrator's triple crest, Product's asymmetric brow,
 * Design's beret) is a centered antenna/status-light stalk rising off the
 * head, terminating in a halo'd/pulsing "signal" node with a small second
 * "notification badge" dot hanging off it -- the one unabashedly
 * mobile-specific visual cue (app icon badge counts), kept abstract rather
 * than literal. Below the head, the shoulders/hips are wired into a slim
 * rounded-rect "screen frame" (shoulder -> hip bezel edges on both sides,
 * closing a screen-shaped quad) instead of the plain diamond torso the other
 * three use, with a small pulsing "glow" node floating on the spine inside
 * it -- the figure's torso doubles as the device it builds for. Node/edge
 * count (14/10) is deliberately a notch above the other three faces'
 * 10-11/6-8 to fit both motifs in, but stays firmly badge-scale. */
export function MobileFace() {
  return (
    <svg
      viewBox="48 6 44 96"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      {/* antenna / status light + notification badge */}
      <Edge x1={70} y1={58} x2={70} y2={40} />
      <Edge x1={70} y1={40} x2={70} y2={26} ghost />
      <Edge x1={70} y1={26} x2={78} y2={20} ghost />
      <Node cx={70} cy={40} r={2.6} variant="crest" />
      <Node cx={70} cy={26} r={4} variant="ghost" />
      <Node cx={70} cy={26} r={2} variant="ghost" />
      <Node cx={78} cy={20} r={1.6} variant="ghost" />

      {/* head */}
      <Node cx={70} cy={58} r={7} variant="head" />
      <Node cx={64} cy={56} r={2} variant="eye" />
      <Node cx={76} cy={56} r={2} variant="eye" />

      {/* screen frame: shoulders -> bezels -> base, plus a glow floating on
          the spine inside the frame (a faint ghost edge anchors it to the
          head rather than leaving it looking like a stray dot) */}
      <Edge x1={70} y1={58} x2={58} y2={74} />
      <Edge x1={70} y1={58} x2={82} y2={74} />
      <Edge x1={58} y1={74} x2={58} y2={90} />
      <Edge x1={82} y1={74} x2={82} y2={90} />
      <Edge x1={58} y1={90} x2={70} y2={96} />
      <Edge x1={82} y1={90} x2={70} y2={96} />
      <Edge x1={70} y1={58} x2={70} y2={82} ghost />
      <Node cx={58} cy={74} r={3} variant="joint" />
      <Node cx={82} cy={74} r={3} variant="joint" />
      <Node cx={58} cy={90} r={2.5} variant="joint" />
      <Node cx={82} cy={90} r={2.5} variant="joint" />
      <Node cx={70} cy={96} r={3} variant="neck" />
      <Node cx={70} cy={82} r={2.2} variant="ghost" />
    </svg>
  );
}

/** Full-body graph (34 nodes / 31 edges) used in the modal. Shares
 * Orchestrator's fixed head/neck/chest/hip/leg skeleton coordinates (that
 * base skeleton -- 66,72 / 134,72 / 62,108 / 138,108 joints, same spine --
 * is common to all four bodies; Product and Design don't diverge it either,
 * only their arms differ), plus this figure's own screen-frame bezel edges
 * and antenna/badge head motif carried over from the first round.
 *
 * The FIRST round of this figure gave all 4 limbs Orchestrator's exact
 * symmetric outward-reaching arm-ul/ur/ll/lr pose, which read as a recolored
 * Orchestrator rather than its own figure -- reusing a validated skeleton is
 * fine (Product and Design do it too), but reusing the *pose* wasn't. This
 * round replaces all 4 outward limbs with a completely different two-arm,
 * asymmetric gesture -- the same order of divergence Product (raised
 * pointing arm / lowered fanning arm) and Design (spiral brush arm / L-frame
 * arm) already take from Orchestrator's 4-arm conducting spread:
 *
 *  - Right arm (`.arm-raise`, pivot 134,72 -- reusing Product's raise-hold
 *    animation registers as the same "holding a position" tremor, which
 *    fits a hand holding a device steady): bends sharply inward and up,
 *    ending in a small rounded-rect "phone" held beside the head, like
 *    checking/using it -- a miniature echo of the torso's own screen-frame
 *    motif, with a pulsing glow at its center.
 *  - Left arm (`.arm-lower`, pivot 66,72): hangs down relaxed at the torso's
 *    side, ending in a dim, only-three-sided ghost rectangle sketch -- a
 *    second, idle/backgrounded screen, deliberately less resolved than the
 *    bright one actively being held. (Same "unfinished ghost rectangle"
 *    language as Design's arm-frame, in spirit, not copied 1:1.)
 *
 * Both arms stay clear of the torso, each other, and the legs by
 * construction (right arm's x stays >=116, left arm's x stays <=58, well
 * outside the 66-134 torso band and the 75-125 leg band) -- same
 * non-crossing discipline as every other figure's limbs, just checked
 * against a new pose instead of Orchestrator's. Each arm is still one <g>
 * with `transform-box: view-box` pivoting at its true shoulder joint --
 * never `fill-box` (see the shared comment on `.arm-ul` etc. in globals.css
 * for why: fill-box's bounding-box-relative pivot tears the limb loose from
 * the torso on every rotate() frame). */
export function MobileBody() {
  return (
    <svg
      viewBox="0 -20 212 312"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <g className="figure-group">
        {/* antenna / status light + notification badge */}
        <Edge x1={100} y1={38} x2={100} y2={18} />
        <Edge x1={100} y1={18} x2={100} y2={8} ghost />
        <Edge x1={100} y1={8} x2={108} y2={2} ghost />
        <Node cx={100} cy={18} r={3} variant="crest" />
        <Node cx={100} cy={8} r={4.5} variant="ghost" />
        <Node cx={100} cy={8} r={2.4} variant="ghost" />
        <Node cx={108} cy={2} r={2} variant="ghost" />

        {/* head */}
        <Node cx={100} cy={38} r={6.5} variant="head" />
        <Node cx={94} cy={36} r={2} variant="eye" />
        <Node cx={106} cy={36} r={2} variant="eye" />

        {/* torso as a screen frame: neck -> chest -> hip spine, shoulder/hip
            cross-edges, and the two bezel edges that close the frame */}
        <Edge x1={100} y1={38} x2={100} y2={58} />
        <Edge x1={100} y1={58} x2={100} y2={82} />
        <Edge x1={100} y1={82} x2={66} y2={72} />
        <Edge x1={100} y1={82} x2={134} y2={72} />
        <Edge x1={66} y1={72} x2={62} y2={108} />
        <Edge x1={134} y1={72} x2={138} y2={108} />
        <Edge x1={100} y1={82} x2={100} y2={112} />
        <Edge x1={100} y1={112} x2={62} y2={108} />
        <Edge x1={100} y1={112} x2={138} y2={108} />
        <Edge x1={100} y1={112} x2={100} y2={150} />

        <Node cx={100} cy={58} r={3.5} variant="joint" />
        <Node cx={100} cy={82} r={4.5} variant="joint" />
        <Node cx={66} cy={72} r={4.5} variant="joint" />
        <Node cx={134} cy={72} r={4.5} variant="joint" />
        {/* screen glow: floats directly on the chest->hip spine segment
            rather than at a vertex, reading as content glowing behind the
            frame */}
        <Node cx={100} cy={97} r={3} variant="joint" />
        <Node cx={100} cy={112} r={4.5} variant="joint" />
        <Node cx={62} cy={108} r={4.5} variant="joint" />
        <Node cx={138} cy={108} r={4.5} variant="joint" />

        {/* legs -- fixed, unanimated, identical shape to Orchestrator's */}
        <Edge x1={100} y1={150} x2={86} y2={152} />
        <Edge x1={86} y1={152} x2={80} y2={215} />
        <Edge x1={80} y1={215} x2={75} y2={278} />
        <Edge x1={100} y1={150} x2={114} y2={152} />
        <Edge x1={114} y1={152} x2={120} y2={215} />
        <Edge x1={120} y1={215} x2={125} y2={278} />
        <Node cx={100} cy={150} r={4.5} variant="joint" />
        <Node cx={86} cy={152} r={3.5} variant="joint" />
        <Node cx={114} cy={152} r={3.5} variant="joint" />
        <Node cx={80} cy={215} r={3.5} variant="joint" />
        <Node cx={120} cy={215} r={3.5} variant="joint" />
        <Node cx={75} cy={278} r={4} variant="joint" />
        <Node cx={125} cy={278} r={4} variant="joint" />

        {/* Right arm: bends sharply inward/up and holds a small "phone"
            rectangle beside the head -- checking/using a device. Reuses
            Product's `.arm-raise` pivot (134,72) and hold-steady tremor,
            which fits: a hand holding something up is also "holding a
            position." */}
        <g className="arm-raise">
          <Edge x1={134} y1={72} x2={148} y2={56} />
          <Node cx={148} cy={56} r={3.5} />
          <Edge x1={148} y1={56} x2={130} y2={36} />
          <Node cx={130} cy={36} r={4} />
          {/* small held "phone": a miniature rounded-rect echo of the torso's
              own screen-frame, with a pulsing glow at its center */}
          <Edge x1={130} y1={36} x2={132} y2={32} />
          <Edge x1={116} y1={16} x2={132} y2={16} />
          <Edge x1={132} y1={16} x2={132} y2={32} />
          <Edge x1={132} y1={32} x2={116} y2={32} />
          <Edge x1={116} y1={32} x2={116} y2={16} />
          <Node cx={116} cy={16} r={2} variant="joint" />
          <Node cx={132} cy={16} r={2} variant="joint" />
          <Node cx={132} cy={32} r={2} variant="joint" />
          <Node cx={116} cy={32} r={2} variant="joint" />
          <Node cx={124} cy={24} r={2.6} variant="joint" />
        </g>

        {/* Left arm: hangs relaxed at the torso's side, ending in a dim,
            only-three-sided ghost rectangle -- a second, idle/backgrounded
            screen, deliberately less resolved than the one actively held.
            Reuses Product's `.arm-lower` pivot (66,72) and calm tremor. */}
        <g className="arm-lower">
          <Edge x1={66} y1={72} x2={58} y2={98} />
          <Node cx={58} cy={98} r={3.5} />
          <Edge x1={58} y1={98} x2={50} y2={124} />
          <Node cx={50} cy={124} r={4} />
          <Edge x1={50} y1={124} x2={40} y2={136} ghost />
          <Edge x1={40} y1={136} x2={40} y2={148} ghost />
          <Edge x1={40} y1={148} x2={50} y2={148} ghost />
          <Node cx={40} cy={136} r={1.8} variant="ghost" />
          <Node cx={40} cy={148} r={1.8} variant="ghost" />
          <Node cx={50} cy={148} r={1.8} variant="ghost" />
        </g>
      </g>
    </svg>
  );
}

/** Small "face" graph used on the badge card. Fifth pass — confirmed. See
 * BackendBody's doc comment for the full history (four discarded attempts,
 * the last one 4-armed) and the ribcage concept. This is that same idea at
 * badge scale: 2 stacked ribs instead of 4 (a badge doesn't have the height
 * for more and still read as ribs, not stripes), no crest, no held object —
 * bust-only like every other face, the ribcage alone is the accent. */
export function BackendFace() {
  return (
    <svg
      viewBox="48 33 44 75"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      {/* key crest, badge scale */}
      <Edge x1={70} y1={51} x2={70} y2={40} />
      <circle className="fig-loop" cx={58} cy={40} r={4} fill="none" stroke="currentColor" strokeWidth={2} />
      <Node cx={58} cy={40} r={1.1} variant="joint" />
      <Edge x1={62} y1={40} x2={84} y2={40} />
      <Edge x1={77} y1={40} x2={77} y2={46} />
      <Edge x1={84} y1={40} x2={84} y2={46} />
      <Node cx={77} cy={46} r={1.2} variant="joint" />
      <Node cx={84} cy={46} r={1.2} variant="joint" />

      {/* head + neck */}
      <Edge x1={70} y1={58} x2={70} y2={76} />
      <Node cx={70} cy={58} r={7} variant="head" />
      <Node cx={64} cy={56} r={2} variant="eye" />
      <Node cx={76} cy={56} r={2} variant="eye" />
      <Node cx={70} cy={76} r={2.6} variant="joint" />

      {/* ribcage: 2 stacked arcs, sides connecting their endpoints */}
      <Rib x1={58} y={79} x2={82} bow={5} cap />
      <Rib x1={55} y={90} x2={85} bow={5} cap />
      <Edge x1={58} y1={79} x2={55} y2={90} />
      <Edge x1={82} y1={79} x2={85} y2={90} />
      <Node cx={70} cy={84} r={1.6} variant="joint" />
      <Node cx={70} cy={95} r={3} variant="joint" />
    </svg>
  );
}

/** Full-body graph used in the modal. Fifth pass — confirmed by Felipe
 * ("gostei do 2") after a side-by-side comparison. The first four attempts
 * (padlock; block+ziggurat; database-cylinder-legs + server-chassis torso +
 * crossed arms; then a 4-armed gesture holding a database cylinder, key,
 * table, and record stack) all got cut — the 4-arm version in particular
 * re-skinned Orchestrator's own conducting gesture instead of giving
 * Backend its own identity, and broke the "2 arms unless there's a specific
 * reason for 4" pattern every other figure holds to.
 *
 * Felipe's reference for this round: the database-cylinder icon itself
 * (stacked discs) — not as a held prop or a leg shape this time, but *as
 * the torso*: "as costelas do humanoide". Torso is 4 stacked horizontal
 * arcs (`Rib`, the one primitive besides Edge/Node this file needs) instead
 * of the straight spine every other figure uses, each arc bowing downward
 * like one ring of the cylinder. The side edges connect each arc's
 * endpoints to the next rather than running two straight barrel walls, so
 * the shape reads as ribs that happen to echo a cylinder, not a rigid
 * cylinder dropped onto a body. The 2nd and 4th arcs deliberately bow
 * through (100,82)/(100,112) — the exact torso/hip nodes every other
 * figure's shoulders/hips already branch from — so the ribcage doesn't add
 * new skeleton, it re-draws the existing one.
 *
 * Arms: back to 2, reusing Orchestrator's own arm-ul/arm-ur pivots and sway
 * unchanged (66,72)/(134,72) — plain shoulder -> elbow -> wrist, no held
 * object. Chosen over a "holds a key" variant compared side by side: with
 * the ribcage carrying the identity, a held object read as one accent too
 * many.
 *
 * Head/neck/hips/legs unchanged from Orchestrator/Product/Mobile. */
export function BackendBody() {
  return (
    <svg
      viewBox="0 -20 212 312"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <g className="figure-group">
        {/* Key crest. A crest was deliberately absent here for several
            passes (one strong motif beats a hat bolted on); added on
            Felipe's request that every figure carry something on the head.
            A cloud was tried first, on the reasoning that this agent's own
            role subtitle is "Cloud Architect" -- rejected: "não tem nada a
            ver com backend", and even drawn correctly the three bumps read
            as a mountain range. The key instead points at auth and security
            rules, which are named in the agent's own description and are
            the thing it refuses to compromise on under time pressure.
            Chosen over a database cylinder, which reads faster but would
            repeat what the ribcage torso already says.

            Ring is r=5 against DevOps' r=7 gear, sits off the body's axis
            with a long horizontal shaft, and has pronounced teeth -- three
            separations kept on purpose, since a stroked ring above a head
            is otherwise that figure's signature. */}
        <Edge x1={100} y1={32} x2={100} y2={18} />
        <circle className="fig-loop" cx={86} cy={18} r={5} fill="none" stroke="currentColor" strokeWidth={2} />
        <Node cx={86} cy={18} r={1.3} variant="joint" />
        <Edge x1={91} y1={18} x2={118} y2={18} />
        <Edge x1={109} y1={18} x2={109} y2={26} />
        <Edge x1={118} y1={18} x2={118} y2={26} />
        <Node cx={109} cy={26} r={1.4} variant="joint" />
        <Node cx={118} cy={26} r={1.4} variant="joint" />

        {/* head + neck */}
        <Edge x1={100} y1={38} x2={100} y2={58} />
        <Node cx={100} cy={38} r={6.5} variant="head" />
        <Node cx={94} cy={36} r={2} variant="eye" />
        <Node cx={106} cy={36} r={2} variant="eye" />
        <Node cx={100} cy={58} r={3.5} variant="joint" />

        {/* ribcage: 4 stacked arcs, sides connecting consecutive endpoints.
            2nd/4th arcs bow exactly through the shared torso/hip nodes
            below, so shoulders/hips still branch from the same
            coordinates every other figure uses. */}
        <Rib x1={82} y={62} x2={118} bow={6} cap />
        <Rib x1={78} y={76} x2={122} bow={6} />
        <Rib x1={80} y={92} x2={120} bow={6} />
        <Rib x1={76} y={104} x2={124} bow={8} cap />
        <Edge x1={82} y1={62} x2={78} y2={76} />
        <Edge x1={78} y1={76} x2={80} y2={92} />
        <Edge x1={80} y1={92} x2={76} y2={104} />
        <Edge x1={118} y1={62} x2={122} y2={76} />
        <Edge x1={122} y1={76} x2={120} y2={92} />
        <Edge x1={120} y1={92} x2={124} y2={104} />
        <Node cx={100} cy={68} r={2} variant="joint" />
        <Node cx={100} cy={82} r={4.5} variant="joint" />
        <Node cx={100} cy={98} r={2} variant="joint" />
        <Node cx={100} cy={112} r={4.5} variant="joint" />

        {/* shoulders + hips + legs -- shared skeleton, unchanged from
            Orchestrator/Product/Mobile */}
        <Edge x1={100} y1={82} x2={66} y2={72} />
        <Edge x1={100} y1={82} x2={134} y2={72} />
        <Node cx={66} cy={72} r={4.5} variant="joint" />
        <Node cx={134} cy={72} r={4.5} variant="joint" />
        <Edge x1={100} y1={112} x2={62} y2={108} />
        <Edge x1={100} y1={112} x2={138} y2={108} />
        <Node cx={62} cy={108} r={4.5} variant="joint" />
        <Node cx={138} cy={108} r={4.5} variant="joint" />
        <Edge x1={100} y1={112} x2={100} y2={150} />
        <Edge x1={100} y1={150} x2={86} y2={152} />
        <Edge x1={100} y1={150} x2={114} y2={152} />
        <Edge x1={86} y1={152} x2={80} y2={215} />
        <Edge x1={80} y1={215} x2={75} y2={278} />
        <Edge x1={114} y1={152} x2={120} y2={215} />
        <Edge x1={120} y1={215} x2={125} y2={278} />

        <Node cx={100} cy={150} r={4.5} variant="joint" />
        <Node cx={86} cy={152} r={3.5} variant="joint" />
        <Node cx={114} cy={152} r={3.5} variant="joint" />
        <Node cx={80} cy={215} r={3.5} variant="joint" />
        <Node cx={120} cy={215} r={3.5} variant="joint" />
        <Node cx={75} cy={278} r={4} variant="joint" />
        <Node cx={125} cy={278} r={4} variant="joint" />

        {/* two neutral arms, reusing Orchestrator's arm-ul/arm-ur pivot + sway */}
        <g className="arm-ul">
          <Edge x1={66} y1={72} x2={50} y2={96} />
          <Node cx={50} cy={96} r={3} variant="joint" />
          <Edge x1={50} y1={96} x2={52} y2={120} />
          <Node cx={52} cy={120} r={3} variant="joint" />
        </g>
        <g className="arm-ur">
          <Edge x1={134} y1={72} x2={150} y2={96} />
          <Node cx={150} cy={96} r={3} variant="joint" />
          <Edge x1={150} y1={96} x2={148} y2={120} />
          <Node cx={148} cy={120} r={3} variant="joint" />
        </g>
      </g>
    </svg>
  );
}

/** Small "face" graph used on the badge card. Badge-scale echo of
 * FrontendWebBody's tag-bracket torso -- same two brackets, no crest (the
 * confirmed direction never had one), cropped at the shoulders like every
 * other face. */
export function FrontendWebFace() {
  return (
    <svg viewBox="43 30 54 72" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      {/* closing-tag slash crest, badge scale */}
      <Edge x1={70} y1={51} x2={70} y2={46} />
      <Node cx={70} cy={46} r={1.4} variant="joint" />
      <Edge x1={70} y1={46} x2={80} y2={33} />
      <Node cx={80} cy={33} r={2} variant="joint" />

      <Node cx={70} cy={58} r={7} variant="head" />
      <Node cx={64} cy={56} r={2} variant="eye" />
      <Node cx={76} cy={56} r={2} variant="eye" />
      <Edge x1={70} y1={58} x2={70} y2={74} />
      <Node cx={70} cy={74} r={2.8} variant="joint" />

      <Edge x1={60} y1={64} x2={52} y2={78} />
      <Edge x1={52} y1={78} x2={60} y2={92} />
      <Edge x1={80} y1={64} x2={88} y2={78} />
      <Edge x1={88} y1={78} x2={80} y2={92} />
      <Node cx={52} cy={78} r={1.8} variant="joint" />
      <Node cx={88} cy={78} r={1.8} variant="joint" />

      <Edge x1={70} y1={74} x2={60} y2={64} />
      <Edge x1={70} y1={74} x2={80} y2={64} />
      <Node cx={60} cy={64} r={3.2} variant="joint" />
      <Node cx={80} cy={64} r={3.2} variant="joint" />
    </svg>
  );
}

/** Full-body graph used in the modal. First pass, confirmed by Felipe --
 * but two earlier directions were tried and dropped first:
 *
 * v1: a browser-window crest (tab + chrome bar + address-bar pill) above
 * the head, plain torso. Felipe: "parece uma impressora" -- the
 * nested-rectangle chrome bar read as a printer's paper slot once shrunk to
 * crest scale, not a browser.
 *
 * v2: same crest redrawn without the 3-dot "traffic light" row (which read
 * as generic app/terminal chrome, not specifically web) -- still didn't
 * land. The printer read survived because the problem was the boxy
 * chrome-bar shape itself, not the dots.
 *
 * v3 (this one) drops the crest entirely -- the same lesson BackendBody's
 * ribcage already taught: one strong motif beats a hat bolted onto an
 * otherwise plain body. The torso becomes two large tag brackets (`<` `>`)
 * cradling the ribcage from inside the exact shoulder/hip attachment
 * points every other figure uses, with a small dashed "blinking cursor"
 * hinting at content between them. The feet pick up the same bracket angle
 * at a smaller scale, so the whole figure reads head-to-toe as one idea --
 * a body built out of markup -- instead of stitching an unrelated crest to
 * an unrelated foot detail.
 *
 * Arms: plain shoulder -> elbow -> wrist, reusing Orchestrator's arm-ul/
 * arm-ur pivot and sway (66,72)/(134,72) unchanged -- same restraint
 * Backend's arms landed on. Lengthened past the first draft on Felipe's
 * request, wrist reaching to about waist height (134) instead of stopping
 * mid-torso (120).
 *
 * Head/neck/shoulders/hips/thighs/knees unchanged from every other figure
 * -- only the torso interior and the feet diverge. */
export function FrontendWebBody() {
  return (
    <svg viewBox="0 -20 212 312" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      <g className="figure-group">
        {/* Closing-tag slash crest. v1 and v2 of this figure both tried a
            browser-window crest and both died on the same note from Felipe
            ("parece uma impressora") -- the problem was the boxy
            nested-rectangle chrome bar, so this deliberately contains no
            rectangle at all: one diagonal on a short stalk. Read together
            with the two bracket halves of the torso below, the figure spells
            `</>` head to hip. */}
        <Edge x1={100} y1={32} x2={100} y2={26} />
        <Node cx={100} cy={26} r={1.5} variant="joint" />
        <Edge x1={100} y1={26} x2={114} y2={8} />
        <Node cx={114} cy={8} r={2.4} variant="joint" />

        {/* head + neck */}
        <Edge x1={100} y1={38} x2={100} y2={58} />
        <Node cx={100} cy={38} r={6.5} variant="head" />
        <Node cx={94} cy={36} r={2} variant="eye" />
        <Node cx={106} cy={36} r={2} variant="eye" />
        <Node cx={100} cy={58} r={3.5} variant="joint" />

        {/* torso: the plain shared skeleton, deliberately. The brackets
            moved out to the arms (see below), so nothing competes with them
            here -- same restraint that lets Product's and DevOps' poses
            carry those figures over an unremarkable torso. */}
        <Edge x1={100} y1={58} x2={100} y2={82} />
        <Edge x1={100} y1={82} x2={66} y2={72} />
        <Edge x1={100} y1={82} x2={134} y2={72} />
        <Node cx={100} cy={82} r={4.5} variant="joint" />
        <Node cx={66} cy={72} r={4.5} variant="joint" />
        <Node cx={134} cy={72} r={4.5} variant="joint" />
        <Edge x1={100} y1={82} x2={100} y2={112} />
        <Edge x1={100} y1={112} x2={62} y2={108} />
        <Edge x1={100} y1={112} x2={138} y2={108} />
        <Node cx={100} cy={112} r={4.5} variant="joint" />
        <Node cx={62} cy={108} r={4.5} variant="joint" />
        <Node cx={138} cy={108} r={4.5} variant="joint" />

        {/* pelvis -> thighs -> knees -- shared skeleton */}
        <Edge x1={100} y1={112} x2={100} y2={150} />
        <Node cx={100} cy={150} r={4.5} variant="joint" />
        <Edge x1={100} y1={150} x2={86} y2={152} />
        <Edge x1={100} y1={150} x2={114} y2={152} />
        <Node cx={86} cy={152} r={3.5} variant="joint" />
        <Node cx={114} cy={152} r={3.5} variant="joint" />
        <Edge x1={86} y1={152} x2={80} y2={215} />
        <Edge x1={114} y1={152} x2={120} y2={215} />
        <Node cx={80} cy={215} r={3.5} variant="joint" />
        <Node cx={120} cy={215} r={3.5} variant="joint" />

        {/* shins -> feet -- the plain shared skeleton every other figure
            uses. These used to be tag brackets echoing the torso at smaller
            scale, on the theory that the figure should read head-to-toe as
            one idea; dropped at Felipe's request. The bracket read never
            survived at foot scale anyway -- with the ankle inside the
            bracket rather than on the shin line, the leg looked broken. */}
        <Edge x1={80} y1={215} x2={75} y2={278} />
        <Edge x1={120} y1={215} x2={125} y2={278} />
        <Node cx={75} cy={278} r={4} variant="joint" />
        <Node cx={125} cy={278} r={4} variant="joint" />

        {/* THE motif: each arm bends into one tag bracket, so the body
            stands inside `< >`. Elbow swings out past the hips and the
            wrist comes back to sit directly under its own shoulder, which
            is what makes the angle read as a bracket instead of a bent
            limb. No other figure's arms spell anything, and it keeps the
            identity in the pose rather than in a shape parked in the torso
            slot -- the same objection that killed this figure's v1/v2
            browser-window crest and, later, the shrunken in-chest brackets.

            Still Orchestrator's arm-ul/arm-ur pivots and sway, unchanged.
            Those two keyframes are mirror-opposite in sign (swayA -4->3,
            swayB +4->-3), so the two brackets open and close symmetrically
            instead of shearing to one side. */}
        <g className="arm-ul">
          <Edge x1={66} y1={72} x2={42} y2={104} />
          <Node cx={42} cy={104} r={3.5} variant="joint" />
          <Edge x1={42} y1={104} x2={66} y2={136} />
          <Node cx={66} cy={136} r={3} variant="joint" />
        </g>
        <g className="arm-ur">
          <Edge x1={134} y1={72} x2={158} y2={104} />
          <Node cx={158} cy={104} r={3.5} variant="joint" />
          <Edge x1={158} y1={104} x2={134} y2={136} />
          <Node cx={134} cy={136} r={3} variant="joint" />
        </g>
      </g>
    </svg>
  );
}

/** Small "face" graph used on the badge card. Badge-scale echo of
 * DevOpsBody's gear crest, cropped at the shoulders like every other face --
 * no arms (there's no room to imply the asymmetric raised-arm pose at badge
 * scale without it just reading as noise), so the crest alone carries the
 * identity here.
 *
 * An earlier version also carried a badge-scale copy of DevOpsBody's
 * cycle-loop torso (the arc + arrowhead "refresh" glyph). Dropped at
 * Felipe's request: at badge size the arrowhead lost its direction and the
 * arc just read as a stray circle under the chin, competing with the gear
 * crest right above it for the same "ring" reading. The loop stays where it
 * has room to be legible -- the full body. viewBox re-cropped to the
 * remaining content (was "51 -4 44 108") so the crest+head fill the card
 * photo instead of floating in the empty space the loop used to occupy, and
 * the crest itself pulled down onto the head -- see the comment on it. */
export function DevOpsFace() {
  return (
    <svg viewBox="48 19 44 60" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      {/* gear crest -- sits just above the head. It used to float at cy=16
          on a 36-unit bare stalk, which only worked while the cycle-loop
          torso filled the bottom of the frame; once that came out and the
          viewBox tightened, the stalk became the longest line in the badge
          and the whole thing read as a lollipop with a small head at the
          bottom. Pulled down to cy=34, so the crest reads as a crest --
          same relationship Design's beret and Mobile's antenna have. */}
      <circle className="fig-loop" cx={70} cy={34} r={6} fill="none" stroke="currentColor" strokeWidth={2} />
      <Node cx={70} cy={34} r={1.3} variant="joint" />
      <Edge x1={70} y1={28} x2={70} y2={24} />
      <Node cx={70} cy={24} r={1.1} variant="joint" />
      <Edge x1={64} y1={34} x2={60} y2={34} />
      <Node cx={60} cy={34} r={1.1} variant="joint" />
      <Edge x1={76} y1={34} x2={80} y2={34} />
      <Node cx={80} cy={34} r={1.1} variant="joint" />
      <Edge x1={70} y1={40} x2={70} y2={58} />

      {/* head + neck */}
      <Node cx={70} cy={58} r={7} variant="head" />
      <Node cx={64} cy={56} r={2} variant="eye" />
      <Node cx={76} cy={56} r={2} variant="eye" />
      <Edge x1={70} y1={58} x2={70} y2={72} />
      <Node cx={70} cy={72} r={2.6} variant="joint" />

      {/* shoulder hint */}
      <Edge x1={70} y1={72} x2={60} y2={64} />
      <Edge x1={70} y1={72} x2={80} y2={64} />
      <Node cx={60} cy={64} r={3} variant="joint" />
      <Node cx={80} cy={64} r={3} variant="joint" />
    </svg>
  );
}

/** Full-body graph used in the modal. First pass, confirmed by Felipe --
 * but only after two rounds of "this still looks like the others":
 *
 * v1 was the classic infinity symbol -- two same-size circles overlapping
 * at the torso center, both arms hanging in the exact same neutral pose
 * BackendBody/FrontendWebBody already use, no crest. Felipe: "vc ta
 * seguindo um padrão" -- arms in the same position, torso always two
 * symmetric halves meeting in the middle (rings for Backend, brackets for
 * Frontend, now circles for DevOps), heads all identical. The complaint
 * wasn't wrong: swapping the icon inside an otherwise-identical torso slot
 * isn't individuality, it's a template.
 *
 * v2 added a gear crest (its own shape, not a repeat of the earlier
 * browser-window mistake) and broke the mirrored arm pose: right arm
 * raised, reaching via a dashed edge toward a pulsing status-beacon node --
 * reusing ProductBody's "point at, don't hold" idiom for the riskiest
 * assumption, applied here to monitoring/alerting (one of the domain's own
 * four pillars, see devops.md). Left arm relaxed at its own angle, not a
 * mirror of the right. Still not enough -- Felipe: torso and arms both
 * still read short/similar.
 *
 * v3 (this one): the torso itself stopped being two mirrored halves. It's
 * one continuous circular arc with a visible start and a visible
 * arrowhead end -- a "refresh"/cycle glyph, asymmetric by construction,
 * impossible to confuse with BackendBody's stacked rings or
 * FrontendWebBody's two brackets. Both arms lengthened noticeably past v2.
 * One more round of feedback: the near-horizontal hip-to-joint edges
 * (100,112)->(62,108)/(138,108) read as two flat rods sitting inside the
 * torso -- given a slight downward bend at their midpoint so they don't
 * compete with the loop's own horizontal reach. (An earlier guess bent the
 * shoulder edges instead -- wrong pair, reverted; the hip edges were the
 * ones Felipe meant.)
 *
 * Head/neck/shoulders/hips/thighs/knees/feet unchanged from every other
 * figure -- individuality here lives in the crest, the torso, and the
 * pose, not in re-deriving the whole skeleton. */
export function DevOpsBody() {
  return (
    <svg viewBox="10 -20 200 320" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      <g className="figure-group">
        {/* gear crest */}
        <circle className="fig-loop" cx={100} cy={18} r={7} fill="none" stroke="currentColor" strokeWidth={2} />
        <Node cx={100} cy={18} r={1.5} variant="joint" />
        <Edge x1={100} y1={11} x2={100} y2={7} />
        <Node cx={100} cy={7} r={1.3} variant="joint" />
        <Edge x1={93} y1={18} x2={89} y2={18} />
        <Node cx={89} cy={18} r={1.3} variant="joint" />
        <Edge x1={107} y1={18} x2={111} y2={18} />
        <Node cx={111} cy={18} r={1.3} variant="joint" />
        <Edge x1={100} y1={25} x2={100} y2={32} />

        {/* head + neck */}
        <Node cx={100} cy={38} r={6.5} variant="head" />
        <Node cx={94} cy={36} r={2} variant="eye" />
        <Node cx={106} cy={36} r={2} variant="eye" />
        <Edge x1={100} y1={38} x2={100} y2={58} />
        <Node cx={100} cy={58} r={3.5} variant="joint" />
        <Edge x1={100} y1={58} x2={100} y2={82} />

        {/* torso: single asymmetric cycle-loop -- a "refresh" arrow, not
            two mirrored halves */}
        <path className="fig-loop" d="M 96.2 112 A 22 22 0 1 1 120.7 96.8" fill="none" stroke="currentColor" strokeWidth={2} />
        <Edge x1={120.7} y1={96.8} x2={118.3} y2={90.2} />
        <Edge x1={120.7} y1={96.8} x2={126.7} y2={93.3} />
        <Node cx={120.7} cy={96.8} r={1.8} variant="joint" />

        {/* shoulders -- shared skeleton, unchanged */}
        <Edge x1={100} y1={82} x2={66} y2={72} />
        <Edge x1={100} y1={82} x2={134} y2={72} />
        <Node cx={100} cy={82} r={4.5} variant="joint" />
        <Node cx={66} cy={72} r={4.5} variant="joint" />
        <Node cx={134} cy={72} r={4.5} variant="joint" />

        {/* hips -- shared skeleton, with a slight downward bend at the
            midpoint of each edge so they don't read as two flat rods */}
        <Edge x1={100} y1={82} x2={100} y2={112} />
        <Edge x1={100} y1={112} x2={80} y2={116} />
        <Edge x1={80} y1={116} x2={62} y2={108} />
        <Edge x1={100} y1={112} x2={120} y2={116} />
        <Edge x1={120} y1={116} x2={138} y2={108} />
        <Node cx={100} cy={112} r={4.5} variant="joint" />
        <Node cx={62} cy={108} r={4.5} variant="joint" />
        <Node cx={138} cy={108} r={4.5} variant="joint" />

        {/* pelvis -> legs -> feet -- shared skeleton, unchanged */}
        <Edge x1={100} y1={112} x2={100} y2={150} />
        <Node cx={100} cy={150} r={4.5} variant="joint" />
        <Edge x1={100} y1={150} x2={86} y2={152} />
        <Edge x1={100} y1={150} x2={114} y2={152} />
        <Node cx={86} cy={152} r={3.5} variant="joint" />
        <Node cx={114} cy={152} r={3.5} variant="joint" />
        <Edge x1={86} y1={152} x2={80} y2={215} />
        <Edge x1={80} y1={215} x2={75} y2={278} />
        <Edge x1={114} y1={152} x2={120} y2={215} />
        <Edge x1={120} y1={215} x2={125} y2={278} />
        <Node cx={80} cy={215} r={3.5} variant="joint" />
        <Node cx={120} cy={215} r={3.5} variant="joint" />
        <Node cx={75} cy={278} r={4} variant="joint" />
        <Node cx={125} cy={278} r={4} variant="joint" />

        {/* left arm: relaxed, own angle, lengthened to waist -- wrapped in
            arm-ul for the same subtle sway every other figure's arms get,
            pivoting at the real shoulder joint like all the others */}
        <g className="arm-ul">
          <Edge x1={66} y1={72} x2={50} y2={100} />
          <Node cx={50} cy={100} r={3} variant="joint" />
          <Edge x1={50} y1={100} x2={54} y2={134} />
          <Node cx={54} cy={134} r={3} variant="joint" />
        </g>

        {/* right arm: raised, reaching (not holding) toward a dim status
            beacon -- ProductBody's "point at the riskiest
            assumption" idiom, applied to monitoring. Beacon lives inside
            the same arm-ur group as the arm, so it sways rigidly with the
            reach instead of tearing away from it. */}
        <g className="arm-ur">
          <Edge x1={134} y1={72} x2={152} y2={52} />
          <Node cx={152} cy={52} r={3.2} variant="joint" />
          <Edge x1={152} y1={52} x2={166} y2={30} />
          <Node cx={166} cy={30} r={3} variant="joint" />
          <Edge x1={166} y1={30} x2={178} y2={20} ghost />
          <Node cx={178} cy={20} r={5} variant="ghost" />
          <Node cx={178} cy={20} r={2.2} variant="pulse-node" />
        </g>
      </g>
    </svg>
  );
}

const READY_FACES: Record<string, () => JSX.Element> = {
  orchestrator: OrchestratorFace,
  product: ProductFace,
  design: DesignFace,
  mobile: MobileFace,
  backend: BackendFace,
  "frontend-web": FrontendWebFace,
  devops: DevOpsFace,
};

const READY_BODIES: Record<string, () => JSX.Element> = {
  orchestrator: OrchestratorBody,
  product: ProductBody,
  design: DesignBody,
  mobile: MobileBody,
  backend: BackendBody,
  "frontend-web": FrontendWebBody,
  devops: DevOpsBody,
};

/** Looks up the card/modal figure components for a given agent id. Callers
 * should only use the returned components when `agent.ready` is true —
 * unready/unavailable agents render `SeedGraph` instead (see AgentCard /
 * AgentModal). Kept here, next to the components themselves, so adding the
 * next ready agent's figures is a one-line addition to these two maps. */
export function getReadyFigures(id: string): {
  Face: (() => JSX.Element) | undefined;
  Body: (() => JSX.Element) | undefined;
} {
  return { Face: READY_FACES[id], Body: READY_BODIES[id] };
}

const SEED_POINTS: Array<[number, number]> = [
  [70, 30],
  [55, 50],
  [85, 50],
  [70, 65],
  [50, 85],
  [90, 85],
  [70, 100],
  [60, 120],
  [80, 120],
];

/** Generic small "seed" graph used for locked/coming-soon (and
 * unavailable) badges — deterministic per `seed` so server- and
 * client-rendered markup always match. */
export function SeedGraph({ seed }: { seed: number }) {
  const n = 6 + (seed % 3); // 6-8 nodes
  const elements: JSX.Element[] = [];
  for (let i = 1; i < n; i++) {
    const p = SEED_POINTS[i];
    const prev = SEED_POINTS[Math.max(0, i - 1 - (seed % 2))];
    elements.push(<Edge key={nextKey()} x1={prev[0]} y1={prev[1]} x2={p[0]} y2={p[1]} />);
  }
  for (let j = 0; j < n; j++) {
    elements.push(<Node key={nextKey()} cx={SEED_POINTS[j][0]} cy={SEED_POINTS[j][1]} r={j === 0 ? 5 : 3} />);
  }
  return (
    <svg viewBox="0 0 140 140" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      {elements}
    </svg>
  );
}
