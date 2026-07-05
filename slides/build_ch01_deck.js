// MFAA Chapter 1 lecture deck — built from the instructor's manual's
// teaching map and LOS guides. Midnight Executive palette.
const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_16x9";
p.author = "Samir Asaf";
p.title = "MFAA Ch.1 — Alternative Assets and the Limits of Classical Financial Engineering";

const NAVY = "1E2761", ICE = "CADCFC", WHITE = "FFFFFF", DARK = "22283B",
      ACC = "F2B23E", GREY = "5A6378";
const F = "Arial";

function darkSlide(kicker, title, sub) {
  const s = p.addSlide();
  s.background = { color: NAVY };
  s.addShape(p.shapes.RECTANGLE, { x: 0, y: 5.32, w: 10, h: 0.3, fill: { color: ACC } });
  if (kicker) s.addText(kicker, { x: 0.6, y: 0.7, w: 8.8, h: 0.4, fontFace: F, fontSize: 14, color: ICE, charSpacing: 3, bold: true });
  s.addText(title, { x: 0.6, y: 1.35, w: 8.8, h: 1.9, fontFace: F, fontSize: 34, color: WHITE, bold: true, valign: "top" });
  if (sub) s.addText(sub, { x: 0.6, y: 3.4, w: 8.6, h: 1.6, fontFace: F, fontSize: 16, color: ICE, valign: "top" });
  return s;
}

function contentSlide(title, kicker) {
  const s = p.addSlide();
  s.background = { color: WHITE };
  s.addShape(p.shapes.RECTANGLE, { x: 0, y: 0, w: 0.22, h: 5.625, fill: { color: NAVY } });
  if (kicker) s.addText(kicker, { x: 0.55, y: 0.28, w: 9, h: 0.3, fontFace: F, fontSize: 11, color: GREY, charSpacing: 3, bold: true });
  s.addText(title, { x: 0.55, y: 0.55, w: 9.1, h: 0.7, fontFace: F, fontSize: 24, color: DARK, bold: true });
  s.addShape(p.shapes.LINE, { x: 0.58, y: 1.32, w: 9.0, h: 0, line: { color: ACC, width: 2.5 } });
  return s;
}

function bullets(s, items, opts = {}) {
  const arr = items.map((t, i) => (typeof t === "string"
    ? { text: t, options: { bullet: { code: "2022" }, breakLine: i < items.length - 1, fontSize: opts.fontSize || 14.5, color: DARK } }
    : { text: t.text, options: { bullet: t.sub ? { code: "2013" } : { code: "2022" }, indentLevel: t.sub ? 1 : 0, breakLine: i < items.length - 1, fontSize: (opts.fontSize || 14.5) - (t.sub ? 1.5 : 0), color: t.color || DARK, bold: !!t.bold } }));
  s.addText(arr, { x: opts.x ?? 0.6, y: opts.y ?? 1.55, w: opts.w ?? 8.9, h: opts.h ?? 3.7, fontFace: F, valign: "top", lineSpacingMultiple: 1.12 });
}

// ---------------------------------------------------------------- 1 title
darkSlide("MATHEMATICAL FINANCE OF ALTERNATIVE ASSETS · LECTURE 1",
  "Alternative Assets and the Limits of\nClassical Financial Engineering",
  "Chapter 1 · Why the standard toolkit fails, what replaces it, and the book's first laboratory\nSamir Asaf");

// ------------------------------------------------------- 2 teaching map
let s = contentSlide("Teaching map: what this chapter must accomplish", "CHAPTER 1 · ORIENTATION");
bullets(s, [
  { text: "The object: an alternative asset is a stochastic cash-flow claim — not a label.", bold: true },
  "Five classifying properties (A1)–(A5): restricted tradability; sparse, noisy observation; unspanned risk; contractual nonlinearity; controlled timing.",
  "The rupture: a non-traded claim has no gains process \u222B\u03B8 dS — no replication, no delta, no marking to market.",
  "First theorem: the arbitrage-free valuation interval for a non-replicable claim.",
  "Master formula: SDF valuation with premia as covariation terms — every premium at exactly one address (D, M, or the operator).",
  "Two filtrations: reported moments are computed on the observed filtration; smoothing distorts them predictably.",
  "The habit to install week one: report valuation distributions, never points.",
]);

// -------------------------------------------------------- 3 LOS overview
s = contentSlide("Seven learning outcomes", "LOS 1.1 – 1.7");
bullets(s, [
  { text: "1.1  Define an alternative asset as a stochastic cash-flow claim; classify by (A1)–(A5).", bold: true },
  "1.2  Distinguish a traded price system from a non-traded claim; why gains-from-trade calculus fails.",
  "1.3  Derive the one-period interval of arbitrage-free values; interpret bounds as super-/sub-replication.",
  "1.4  Value a claim under an SDF; decompose expected return into premia, including illiquidity.",
  "1.5  Distinguish full-information from observed filtration; how smoothing distorts measured risk.",
  "1.6  Map each failed classical assumption to the book's replacement tool.",
  "1.7  Run the liquidity-adjusted stochastic DCF in the laboratory; interpret the valuation distribution.",
], { fontSize: 13.5 });

// ----------------------------------------------- 4 A1-A5 checklist slide
s = contentSlide("The five-question checklist (A1)–(A5)", "LOS 1.1");
const rows = [
  ["A1", "Can you trade it freely — or only rarely, with friction?", "Liquidity states constrain actions (Chs. 5, 13, 14)"],
  ["A2", "Do you observe value continuously — or via occasional, noisy appraisals?", "Two filtrations; filtering (Ch. 6)"],
  ["A3", "Does it carry risks no traded security spans?", "Price bounds, SDF selection, nonlinear operators (Chs. 3–4, 7)"],
  ["A4", "Are payoffs bent by contracts — waterfalls, covenants, preferences?", "Contractual payoff maps (Chs. 8–12)"],
  ["A5", "Does the holder control the timing of key cash flows?", "Optimal stopping and control (Ch. 14)"],
];
let y = 1.55;
rows.forEach(r => {
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 0.6, y, w: 0.62, h: 0.62, fill: { color: NAVY }, rectRadius: 0.08 });
  s.addText(r[0], { x: 0.6, y, w: 0.62, h: 0.62, fontFace: F, fontSize: 15, color: WHITE, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addText([{ text: r[1], options: { bold: true, breakLine: true, fontSize: 12.5, color: DARK } },
             { text: r[2], options: { fontSize: 11, color: GREY } }],
    { x: 1.4, y: y - 0.04, w: 8.1, h: 0.72, fontFace: F, valign: "middle" });
  y += 0.76;
});

// ------------------------------------------------ 5 wrapper vs claim
s = contentSlide("Classify the claim, not the wrapper", "LOS 1.1 · THE STANDING TRAP");
bullets(s, [
  { text: "A listed REIT share fails all five properties — the share trades by the second.", bold: true },
  "The buildings are illiquid; the share is not. Wrapping changes the mathematical object.",
  "Board drill: run unfamiliar assets through the checklist live — music royalties and litigation finance work well; the skill is profiling, not recall.",
  "Grading rule: reward the wrapper/underlying distinction explicitly (Exercise 1.1).",
]);
s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 3.9, w: 8.9, h: 1.15, fill: { color: ICE }, rectRadius: 0.1 });
s.addText("Diagnostic: \u201Cwhat does the sample path of this cash flow look like?\u201D — and \u201Cwhich object would you actually be buying?\u201D",
  { x: 0.85, y: 3.95, w: 8.4, h: 1.05, fontFace: F, fontSize: 14, italic: true, color: NAVY, valign: "middle" });

// ------------------------------------------------ 6 traded vs non-traded
s = contentSlide("Why the classical calculus fails at the root", "LOS 1.2");
bullets(s, [
  { text: "Classical engineering runs on one object: a price you can trade against continuously.", bold: true },
  "Given S, a strategy \u03B8 generates gains \u222B\u03B8 dS — from that single integral: replication, deltas, hedging, marking to market.",
  "A non-traded claim has no price path: the integral cannot even be written down.",
  "It is not that hedging is expensive — the object the calculus operates on does not exist.",
  "Honest picture: a claim to future cash flows sitting beside a market of traded prices, connected only by shared risks.",
  { text: "Friendly framing: you cannot continuously hedge with something you cannot continuously buy or sell.", color: NAVY, bold: true },
]);

// ------------------------------------------------ 7 valuation interval
s = contentSlide("The first theorem: an interval, not a price", "LOS 1.3");
bullets(s, [
  { text: "Incomplete markets: many state-price vectors \u03C8 are consistent with traded prices.", bold: true },
  "Each values the claim as \u03C8\u1D40X; convexity of the admissible set \u03A8 makes the value set an interval.",
  "Upper endpoint = cheapest traded portfolio dominating the claim in every state (super-replication).",
  "Lower endpoint = mirror-image sub-replication value. Both are linear programs (Exercises 1.5–1.6).",
  { text: "The interval exists with ZERO transaction costs: it measures missing markets, not friction.", color: NAVY, bold: true },
  "Quiz that sorts the room: \u201Cdoes the interval close if trading becomes free?\u201D",
]);

// ------------------------------------------------ 8 master formula
s = contentSlide("The master formula and premium location", "LOS 1.4");
s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.55, w: 8.9, h: 0.85, fill: { color: NAVY }, rectRadius: 0.08 });
s.addText("V\u209C = E[ \u222B (M\u209B / M\u209C) dD\u209B | F\u209C ]   —   both cash flows and discount weights are stochastic",
  { x: 0.85, y: 1.55, w: 8.5, h: 0.85, fontFace: F, fontSize: 16, color: WHITE, valign: "middle", bold: true });
bullets(s, [
  "Expected return = riskless rate + covariation terms: premia are covariances, not add-ons.",
  { text: "Premium-location discipline: every premium lives in exactly one of D (cash flows), M (the SDF), or the valuation operator — never two.", bold: true },
  "The \u201Cbuild-up method\u201D (stack liquidity + size + risk premia in the rate) is double counting wearing a spreadsheet.",
  "Class ritual: every time a premium is mentioned — where does it live? (Exercises 1.4, 1.8)",
], { y: 2.6, h: 2.7 });

// ------------------------------------------------ 9 two filtrations
s = contentSlide("Two filtrations: what you know vs what you see", "LOS 1.5");
bullets(s, [
  { text: "F = full information; G \u2286 F = generated by appraisals and transactions. Reported numbers live in G.", bold: true },
  "Appraisals average old information into new marks — the smoothing recursion.",
  { text: "Three provable distortions:", bold: true },
  { text: "volatility looks too low (deflated variance);", sub: true },
  { text: "returns look persistent (spurious positive autocorrelation);", sub: true },
  { text: "correlation with public markets looks weaker (attenuated covariance).", sub: true },
  "None of this is bad data — it is a different filtration.",
  { text: "Reflex question: with respect to which filtration is this moment computed?", color: NAVY, bold: true },
]);

// ------------------------------------------------ 10 failure->tool map
s = contentSlide("The course map: failed assumption \u2192 replacement tool", "LOS 1.6");
const map = [
  ["Completeness fails", "Price bounds & SDF selection", "Chs. 3–4, 7"],
  ["Continuous tradability fails", "Liquidity states & optimal switching", "Chs. 5, 13"],
  ["Continuous observation fails", "Filtering & de-smoothing", "Ch. 6"],
  ["Linear pricing fails", "Indifference & nonlinear expectations", "Ch. 7"],
  ["Timing is controlled", "Optimal stopping & control", "Ch. 14"],
];
y = 1.6;
map.forEach(r => {
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 0.6, y, w: 3.9, h: 0.6, fill: { color: ICE }, rectRadius: 0.07 });
  s.addText(r[0], { x: 0.75, y, w: 3.7, h: 0.6, fontFace: F, fontSize: 12.5, color: NAVY, bold: true, valign: "middle", margin: 0 });
  s.addShape(p.shapes.RIGHT_ARROW, { x: 4.6, y: y + 0.14, w: 0.55, h: 0.32, fill: { color: ACC } });
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 5.3, y, w: 4.2, h: 0.6, fill: { color: NAVY }, rectRadius: 0.07 });
  s.addText([{ text: r[1] + "  ", options: { fontSize: 12.5, color: WHITE, bold: true } },
             { text: r[2], options: { fontSize: 11, color: ICE } }],
    { x: 5.45, y, w: 4.0, h: 0.6, fontFace: F, valign: "middle", margin: 0 });
  y += 0.74;
});

// ------------------------------------------------ 11 laboratory
s = contentSlide("The laboratory: from number to distribution", "LOS 1.7 · BOOK §1.9");
bullets(s, [
  { text: "Module: taxonomy · cash-flow visualizer · liquidity-adjusted stochastic DCF sandbox.", bold: true },
  "Model: CIR cash-flow rate; OU short rate (exact updating); exponential SDF in (r, \u03BB); exponential exit; two-state liquidity chain; sale at first liquid time at a state discount; antithetic variates.",
  "Output: the valuation distribution — mean, MC standard error, quantiles, risk-source decomposition.",
  { text: "Experiments: E1 number\u2192distribution · E2 covariation & premia (vary \u03C1) · E3 liquidity as timing risk · E4 the opening problem, first pass.", bold: true },
  "Validation V1–V4: deterministic limit = closed form; \u03BB = 0 equals plain discounting path-by-path; quantile stability; antithetic SE reduction.",
  { text: "Standing rule: a simulation that has not passed its anchors is not evidence of anything.", color: NAVY, bold: true },
], { fontSize: 13 });

// ------------------------------------------------ 12 assessment
s = contentSlide("Assessment map and common failure modes", "EXERCISES 1.1–1.13");
bullets(s, [
  { text: "Conceptual 1.1–1.4: taxonomy, the value gap, the allocator audit, the double-count memo.", bold: true },
  { text: "Mathematical 1.5–1.8: convexity of \u03A8; LP duality; smoothing moments; SDF covariation.", bold: true },
  { text: "Computational 1.9–1.11: implement Algorithm 1.9 + validation checks; risk decomposition; smoothing recursion.", bold: true },
  { text: "Extension 1.12 · Research 1.13.", bold: true },
  "Failure modes to pre-empt: classifying the wrapper; \u201Cit is riskier\u201D instead of \u201Cthe object does not exist\u201D; interval-as-bid-ask; additive premium stacking; smoothing as a data nuisance; reporting the MC mean as \u201Cthe value.\u201D",
], { fontSize: 13.5 });

// ------------------------------------------------ 13 close
darkSlide("NEXT: CHAPTER 2", "Probability, Processes, and Simulation\nfor Private Markets",
  "Filtrations and the usual conditions · conditional expectation as the primitive valuation operator · martingales and optional sampling · the four drivers · the cash-flow process D · simulation schemes with error diagnostics");

p.writeFile({ fileName: "/home/claude/mfaa-course/downloads/MFAA_Ch01_Slides.pptx" }).then(() => console.log("deck written"));
