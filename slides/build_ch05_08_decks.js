// MFAA Chapter 5-8 lecture decks — Midnight Executive palette, faithful
// to the book's teaching maps and laboratory sections.
const pptxgen = require("pptxgenjs");

const NAVY = "1E2761", ICE = "CADCFC", WHITE = "FFFFFF", DARK = "22283B",
      ACC = "F2B23E", GREY = "5A6378";
const F = "Arial";

function makeDeck(spec, outPath) {
  const p = new pptxgen();
  p.layout = "LAYOUT_16x9";
  p.author = "Samir Asaf";
  p.title = spec.title;

  function darkSlide(kicker, title, sub) {
    const s = p.addSlide();
    s.background = { color: NAVY };
    s.addShape(p.shapes.RECTANGLE, { x: 0, y: 5.32, w: 10, h: 0.3, fill: { color: ACC } });
    if (kicker) s.addText(kicker, { x: 0.6, y: 0.7, w: 8.8, h: 0.4, fontFace: F, fontSize: 14, color: ICE, charSpacing: 3, bold: true });
    s.addText(title, { x: 0.6, y: 1.35, w: 8.8, h: 1.9, fontFace: F, fontSize: 32, color: WHITE, bold: true, valign: "top" });
    if (sub) s.addText(sub, { x: 0.6, y: 3.5, w: 8.6, h: 1.6, fontFace: F, fontSize: 15, color: ICE, valign: "top" });
    return s;
  }
  function contentSlide(title, kicker) {
    const s = p.addSlide();
    s.background = { color: WHITE };
    s.addShape(p.shapes.RECTANGLE, { x: 0, y: 0, w: 0.22, h: 5.625, fill: { color: NAVY } });
    if (kicker) s.addText(kicker, { x: 0.55, y: 0.28, w: 9, h: 0.3, fontFace: F, fontSize: 11, color: GREY, charSpacing: 3, bold: true });
    s.addText(title, { x: 0.55, y: 0.55, w: 9.1, h: 0.7, fontFace: F, fontSize: 23, color: DARK, bold: true });
    s.addShape(p.shapes.LINE, { x: 0.58, y: 1.32, w: 9.0, h: 0, line: { color: ACC, width: 2.5 } });
    return s;
  }
  function bullets(s, items, opts = {}) {
    const arr = items.map((t, i) => {
      const o = (typeof t === "string") ? { text: t } : t;
      return { text: o.text, options: { bullet: o.sub ? { code: "2013" } : { code: "2022" },
        indentLevel: o.sub ? 1 : 0, breakLine: i < items.length - 1,
        fontSize: (opts.fontSize || 14.5) - (o.sub ? 1.5 : 0),
        color: o.color || DARK, bold: !!o.bold } };
    });
    s.addText(arr, { x: opts.x ?? 0.6, y: opts.y ?? 1.55, w: opts.w ?? 8.9, h: opts.h ?? 3.7,
      fontFace: F, valign: "top", lineSpacingMultiple: 1.12 });
  }

  darkSlide(spec.kicker, spec.titleLine, spec.subtitle);
  let s = contentSlide("Teaching map: what this chapter must accomplish", spec.mapKicker);
  bullets(s, spec.teachingMap, { fontSize: 14 });
  s = contentSlide("Learning outcomes", spec.losRange);
  bullets(s, spec.los, { fontSize: 13.5 });
  spec.contentSlides.forEach(cs => {
    const sl = contentSlide(cs.title, cs.kicker);
    bullets(sl, cs.bullets, { fontSize: cs.fontSize || 14 });
    if (cs.callout) {
      sl.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 4.35, w: 8.9, h: 0.85, fill: { color: ICE }, rectRadius: 0.1 });
      sl.addText(cs.callout, { x: 0.85, y: 4.35, w: 8.4, h: 0.85, fontFace: F, fontSize: 13, italic: true, color: NAVY, valign: "middle" });
    }
  });
  s = contentSlide("The laboratory: " + spec.labTitle, "BOOK §" + spec.labSection);
  bullets(s, spec.labBullets, { fontSize: 13 });
  darkSlide(spec.nextKicker, spec.nextTitle, spec.nextSub);
  return p.writeFile({ fileName: outPath });
}

// ============================================================ CHAPTER 5
makeDeck({
  title: "MFAA Ch.5 — Illiquidity and Non-Tradability",
  kicker: "MATHEMATICAL FINANCE OF ALTERNATIVE ASSETS · LECTURE 5",
  titleLine: "Illiquidity and Non-Tradability",
  subtitle: "Chapter 5 · From premium to constraint: liquidity states, the search-model discount, the option value of waiting, and the operator L\nSamir Asaf",
  mapKicker: "CHAPTER 5 · ORIENTATION",
  teachingMap: [
    { text: "Illiquidity is not a premium bolted onto a discount rate — it is a constraint on the action set.", bold: true },
    "Liquidity as a finite-state process (Frozen / Thin / Liquid) with state-dependent market depth.",
    "The secondary-market discount from a search model: the reservation value solving equation (5.1).",
    "The optimal-sale policy is a threshold in urgency; waiting has option value that shrinks near the forced-sale boundary.",
    "The illiquidity valuation operator L prices realizable — not fundamental — value.",
    { text: "The friction address: illiquidity lives in the operator here, so lambda_L = 0 — the double-count detector again.", bold: true },
  ],
  losRange: "LOS 5.1 – 5.7",
  los: [
    { text: "5.1 Model liquidity as a finite-state process constraining the action set.", bold: true },
    "5.2 Classify transaction-cost structures: proportional, fixed, impact.",
    "5.3 Derive the secondary-market discount from a search model with a reservation value.",
    "5.4 Characterize the holding-period distribution and its power-law tail.",
    "5.5 Establish the comparative statics of the discount in urgency and depth.",
    "5.6 Define and analyze the illiquidity valuation operator L.",
    "5.7 Locate illiquidity at exactly one address and audit against double counting.",
  ],
  contentSlides: [
    { title: "The reservation value and the discount surface", kicker: "LOS 5.3 – 5.5 · PROPOSITION 5.5",
      bullets: [
        { text: "Facing i.i.d. offers, the seller holds out for a reservation value S* solving rho S = -u + nu integral (p - S) dF.", bold: true },
        "The secondary discount is delta* = 1 - S*; it rises with urgency u and falls with market depth nu.",
        "October to November: the approaching deadline raises urgency, the reservation value falls, the accepted discount deepens.",
        "The same asset trades at different discounts across states because depth differs by an order of magnitude.",
      ],
      callout: "The lab computes the discount surface delta*(u, nu) live — the chapter's quantitative signature." },
    { title: "The option value of waiting", kicker: "LOS 5.4 · POWER-LAW TAIL",
      bullets: [
        { text: "The optimal policy is a threshold in urgency: sell when u exceeds a state-dependent trigger u*(ell).", bold: true },
        "Waiting has option value — a forced-only policy is dominated by every admissible threshold policy.",
        "Raise the funding-call intensity and the optimum shifts toward earlier sales: precautionary behavior from the model.",
        { text: "Exponential waiting against lognormal growth gives realizable value a power-law tail (Exercise 5.7).", bold: true },
        "The Mellin transform E[(e^{-rho sigma} V_sigma)^theta] = nu/(nu + k(theta)); variance finite iff nu + 2(rho-g) - sigma_V^2 > 0.",
      ], fontSize: 13.5 },
  ],
  labTitle: "Liquidity Shock Simulator",
  labSection: "5.9",
  labBullets: [
    { text: "Manage an illiquid position through liquidity cycles and funding shocks; price the divergence with L.", bold: true },
    "E1 replay the fading bid: decompose the discount path into urgency (along a curve) and state transition (across curves).",
    "E2 option value of waiting: sweep the threshold policy, locate the interior optimum, watch precautionary behavior emerge.",
    "E3 depth versus urgency: trace iso-discount curves; how much depth compensates one unit of urgency?",
    "E4 tail pricing: verify the variance-finiteness boundary of the holding-period proposition numerically.",
    { text: "Validation: reservation values solve (5.1); Mellin closed forms 0.9346, 0.9281 reproduced; forced-only dominated; identical seeds reproduce bit-for-bit.", color: NAVY, bold: true },
  ],
  nextKicker: "NEXT: CHAPTER 6",
  nextTitle: "Sparse Observation, NAV Smoothing,\nand Filtering",
  nextSub: "The measurement chapter · appraisal smoothing and its moment distortions · the Kalman and particle filters · value as a posterior distribution",
}, "/home/claude/mfaa-course/downloads/MFAA_Ch05_Slides.pptx")

// ============================================================ CHAPTER 6
.then(() => makeDeck({
  title: "MFAA Ch.6 — Sparse Observation, NAV Smoothing, and Filtering",
  kicker: "MATHEMATICAL FINANCE OF ALTERNATIVE ASSETS · LECTURE 6",
  titleLine: "Sparse Observation, NAV Smoothing,\nand Filtering",
  subtitle: "Chapter 6 · The measurement instrument: appraisal smoothing, the moment distortions it induces, and reconstruction by filtering\nSamir Asaf",
  mapKicker: "CHAPTER 6 · ORIENTATION",
  teachingMap: [
    { text: "Private value is latent. What is observed are smoothed appraisals, selected transactions, and kinked marks.", bold: true },
    "Appraisal smoothing understates variance and manufactures autocorrelation — a mechanical distortion, provable in closed form.",
    "The linear-Gaussian state space: latent value with factor loadings and mixed-frequency observations.",
    "The Kalman filter from Gaussian conditioning; the particle filter for nonlinear observation maps (waterfalls, selection).",
    "Geltner inversion recovers latent returns — but amplifies noise, an overcorrection risk.",
    { text: "The discipline: report reconstructed value as a posterior distribution — a filtration and a band, never a point.", bold: true },
  ],
  losRange: "LOS 6.1 – 6.7",
  los: [
    { text: "6.1 Characterize the private-market data-generating process.", bold: true },
    "6.2 Derive, with proof, the moment distortions of appraisal smoothing.",
    "6.3 Perform Geltner unsmoothing and quantify the noise amplification of naive inversion.",
    "6.4 Formulate latent value as a linear-Gaussian state space and estimate it by prediction-error likelihood.",
    "6.5 Derive the Kalman filter; extend it to irregular times and missing data.",
    "6.6 Implement the SIR particle filter and diagnose degeneracy.",
    "6.7 Report reconstructed value as a posterior distribution with credible bands.",
  ],
  contentSlides: [
    { title: "The mechanics of smoothing (Proposition 6.3)", kicker: "LOS 6.2 · THE FACTOR OF TWO",
      bullets: [
        { text: "Reported returns follow r_hat_n = alpha r_hat_{n-1} + (1-alpha) r_n + eps_n - eps_{n-1}.", bold: true },
        "Means survive — smoothing does not bias average returns.",
        "But variance is understated by (1 - alpha)/(1 + alpha), and autocorrelation is manufactured: Corr = alpha^k.",
        "Beta attenuates to (1 - alpha) beta contemporaneously, but lagged betas aggregate back to the truth.",
      ],
      callout: "At alpha = 0.6 the variance-correction factor (1+alpha)/(1-alpha) is 4.0 — the committee's factor of two, squared." },
    { title: "Reconstruction, honestly reported", kicker: "LOS 6.5 – 6.7",
      bullets: [
        { text: "The Kalman filter reconstructs latent value from reported NAV, with a credible band that is the point of the exercise.", bold: true },
        "Missing-report periods widen the band monotonically; the smoother's band is never wider than the filter's.",
        "The carry kink makes the observation map nonlinear — the Kalman filter centers incorrectly; the particle filter tracks the skew.",
        { text: "Naive Geltner inversion with a misestimated alpha_hat manufactures volatility — the overcorrection region of Section 6.8.", bold: true },
        "Innovations must pass whiteness tests; a visible failure under seeded misspecification is the diagnostic working.",
      ], fontSize: 13.5 },
  ],
  labTitle: "NAV Unsmoothing and Hidden-Value Reconstruction",
  labSection: "6.9",
  labBullets: [
    { text: "Reconstruct latent value by Kalman and particle filtering with joint parameter estimation.", bold: true },
    "E1 recover the truth: generate synthetic data with known parameters; verify credible-band coverage over seeds.",
    "E2 reproduce the committee: the three volatilities (reported, reconstructed, proxy) and the factor of two.",
    "E3 the kink: compare Kalman and particle reconstructions around a carry threshold.",
    "E4 overcorrection stress: naive inversion with a misestimated alpha_hat, mapping the manufactured-volatility region.",
    { text: "Validation: particle matches Kalman on LGSS; smoothed bands no wider than filtered; Proposition 6.3 moments verified; identical seeds reproduce bit-for-bit.", color: NAVY, bold: true },
  ],
  nextKicker: "NEXT: CHAPTER 7",
  nextTitle: "Nonlinear Valuation",
  nextSub: "Indifference prices · good-deal bounds · convex risk measures · the operator ladder narrowing Chapter 3's ambiguity by declared assumptions",
}, "/home/claude/mfaa-course/downloads/MFAA_Ch06_Slides.pptx"))

// ============================================================ CHAPTER 7
.then(() => makeDeck({
  title: "MFAA Ch.7 — Nonlinear Valuation",
  kicker: "MATHEMATICAL FINANCE OF ALTERNATIVE ASSETS · LECTURE 7",
  titleLine: "Nonlinear Valuation: Indifference Prices,\nGood-Deal Bounds, and Convex Risk Measures",
  subtitle: "Chapter 7 · Pricing the unspanned: exponential-utility indifference, Sharpe ceilings, convex risk measures, and the operator ladder\nSamir Asaf",
  mapKicker: "CHAPTER 7 · ORIENTATION",
  teachingMap: [
    { text: "When a claim is unspanned, linear pricing fails — holder-relevant valuation must become nonlinear.", bold: true },
    "Indifference pricing under exponential utility: the Gaussian certainty equivalent CE = m - (gamma/2) s^2.",
    "The buyer-seller gap is a variance bill gamma sigma_e^2 q^2 / R — a personalized bid-ask that grows with size.",
    "Good-deal bounds cap the attainable Sharpe ratio, narrowing the no-arbitrage interval by a declared statistic.",
    "Convex risk measures with dual representations; the entropic measure as the exponential-utility bridge.",
    { text: "The operator ladder: no-arbitrage ⊃ good-deal ⊃ indifference, collapsing to the Davis price as gamma → 0.", bold: true },
  ],
  losRange: "LOS 7.1 – 7.7",
  los: [
    { text: "7.1 Explain why holder-relevant valuation of unspanned claims must violate additivity.", bold: true },
    "7.2 Compute certainty equivalents under exponential utility; derive the entropic form.",
    "7.3 Derive buyer and seller indifference prices and the variance-bill gap.",
    "7.4 Show that only residual variance is charged — the hedgeable fraction is free.",
    "7.5 Construct good-deal bounds from a Sharpe ceiling.",
    "7.6 Represent convex risk measures by their penalty functions.",
    "7.7 Formulate dynamic valuation as a BSDE and reconcile static with dynamic.",
  ],
  contentSlides: [
    { title: "The variance bill: only the residual is charged", kicker: "LOS 7.3 – 7.4 · PROPOSITION 7.4",
      bullets: [
        { text: "Split the claim into spanned (hedgeable) and residual parts; the spanned part is priced linearly, for free.", bold: true },
        "Only the residual variance sigma_e^2 attracts a charge — better spanning moves value toward the linear benchmark.",
        "Buyer and seller indifference prices straddle the linear value by the half-bill (gamma/2) sigma_e^2 q^2 / R.",
        "The full buyer-seller gap is gamma sigma_e^2 q^2 / R — it grows quadratically in position size q.",
      ],
      callout: "The indifference apparatus prices exactly what Chapter 3 said was ambiguous, and nothing else." },
    { title: "The operator ladder", kicker: "LOS 7.5 – 7.7 · THE ORGANIZING DISPLAY",
      bullets: [
        { text: "For one claim, nested intervals: no-arbitrage (widest) ⊃ good-deal ⊃ indifference [p_b, p_s], around the Davis point.", bold: true },
        "The containment ordering: pi_low ≤ pi_gd ≤ p_b ≤ linear ≤ p_s ≤ pi_gd ≤ pi_bar.",
        "As risk aversion gamma → 0, the indifference band collapses to the Davis marginal price (the linear SDF value).",
        { text: "The dynamic BSDE value with a quadratic driver reconciles with the static entropic value — dynamic consistency.", bold: true },
        "Each rung is a declared worldview: no-arbitrage is preference-free; good-deal declares a Sharpe ceiling; indifference declares a gamma.",
      ], fontSize: 13.5 },
  ],
  labTitle: "Indifference Pricing Engine",
  labSection: "7.9",
  labBullets: [
    { text: "Price unspanned claims with indifference, good-deal, convex-risk, and BSDE operators side by side.", bold: true },
    "The operator ladder with numerical endpoints and containment checks is the organizing display.",
    "Buyer/seller price curves in gamma and in q, with the Davis asymptote and the optimal-size marker.",
    "E1 hedgeable-fraction sweep: move variance from residual to spanned; watch [p_b, p_s] collapse onto replication.",
    "The BSDE module returns Y_t and Z_t paths and checks static-vs-dynamic consistency.",
    { text: "Validation: the variance bill matches its formula; the ladder ordering holds across a randomized battery; the Davis limit collapses; MC certainty equivalents match the closed form.", color: NAVY, bold: true },
  ],
  nextKicker: "NEXT: CHAPTER 8",
  nextTitle: "Cash-Flow Modeling\nof Fund Structures",
  nextSub: "The contractual layer · calls and distributions as marked point processes · the waterfall as a map · IRR pathologies · commitment pacing",
}, "/home/claude/mfaa-course/downloads/MFAA_Ch07_Slides.pptx"))

// ============================================================ CHAPTER 8
.then(() => makeDeck({
  title: "MFAA Ch.8 — Cash-Flow Modeling of Fund Structures",
  kicker: "MATHEMATICAL FINANCE OF ALTERNATIVE ASSETS · LECTURE 8",
  titleLine: "Cash-Flow Modeling of Fund Structures",
  subtitle: "Chapter 8 · The contractual layer: calls, fees, and an exactly tier-tracked waterfall; J-curves, IRR pathologies, and commitment pacing\nSamir Asaf",
  mapKicker: "CHAPTER 8 · ORIENTATION",
  teachingMap: [
    { text: "A fund interest is not a fraction of a portfolio — it is a claim on net distributions through a contractual waterfall.", bold: true },
    "Calls and distributions as marked point processes with age profiles; the Takahashi-Alexander deterministic limit.",
    "The J-curve and its decomposition into fee, timing, and appraisal-smoothing components.",
    "The waterfall as an exact piecewise-linear map: return of capital, preferred return, GP catch-up, carried interest.",
    "IRR pathologies (non-uniqueness, timing manipulability) versus TVPI, DPI, and PME as SDF statements.",
    { text: "Commitment pacing by Little's law: steady-state exposure = commitment rate × holding duration.", bold: true },
  ],
  losRange: "LOS 8.1 – 8.7",
  los: [
    { text: "8.1 Formalize fund mechanics — commitments, calls, distributions, fees, NAV.", bold: true },
    "8.2 Model calls and distributions as marked point processes with age profiles.",
    "8.3 Decompose the J-curve into fee, timing, and smoothing components.",
    "8.4 Write waterfalls as piecewise-linear maps; prove carried interest is option-like.",
    "8.5 State the pathologies of IRR; interpret TVPI, DPI, and PME as SDF statements.",
    "8.6 Design commitment-pacing policies via the Little's-law relation.",
    "8.7 Value an LP interest and a secondary stake, reconciled with Chapter 5.",
  ],
  contentSlides: [
    { title: "The waterfall as a contractual map", kicker: "LOS 8.4 · PROPOSITION 8.5",
      bullets: [
        { text: "Four tiers in order: return of capital to LP, preferred return, GP catch-up, then the carried-interest split.", bold: true },
        "Preference accrues on called (not committed) capital — the classic accounting bug the engine avoids.",
        "The conservation identity W_LP + W_GP = G holds to the cent on every path — asserted at every distribution date.",
        "Carried interest is a call option struck at the hurdle: it loves volatility, an incentive the preferred return blunts.",
      ],
      callout: "The American waterfall's excess over European is a path-dependent premium — the price of a term-sheet clause." },
    { title: "IRR lies; PME does not", kicker: "LOS 8.5 · PROPOSITION 8.6",
      bullets: [
        { text: "IRR can have multiple real roots and is manipulable by timing — a subscription line shifts it right at will.", bold: true },
        "TVPI and DPI are wealth multiples; PME is a multiple against a public index — a valuation under a specific SDF.",
        "The subscription-line demo: delay LP contributions and IRR rises while PME stands still (Proposition 8.6(ii) as theater).",
        { text: "Pacing obeys Little's law: steady-state exposure equals commitment rate times average holding duration.", bold: true },
      ], fontSize: 13.5 },
  ],
  labTitle: "Fund Cash-Flow Engine",
  labSection: "8.9",
  labBullets: [
    { text: "Push portfolio paths through calls, fees, and an exactly tier-tracked waterfall; report the LP's world.", bold: true },
    "E1 fee anatomy: decompose the J-curve trough into fee drag, timing, and reporting components.",
    "E2 the price of a clause: European vs American GP value gap across volatility, then clawback recovery.",
    "E3 manufacture an IRR: subscription-line delays shift IRR right while PME stands still.",
    "E4 the 82% verdict: breakeven on reported vs filtered NAV, reconciled with the Chapter 5 seller.",
    { text: "Validation: conservation to the cent on every path; Takahashi-Alexander limit reproduced; waterfall matches the closed form; IRR root counts bounded; identical seeds reproduce bit-for-bit.", color: NAVY, bold: true },
  ],
  nextKicker: "NEXT: CHAPTER 9",
  nextTitle: "Private Equity and\nBuyout Modeling",
  nextSub: "Leverage and the LBO · operational value creation · the equity as a call on enterprise value · the buyout laboratory",
}, "/home/claude/mfaa-course/downloads/MFAA_Ch08_Slides.pptx"))

.then(() => console.log("decks 5-8 written"));
