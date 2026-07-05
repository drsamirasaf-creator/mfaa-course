// MFAA Chapter 13-17 lecture decks — Midnight Executive palette, faithful
// to the book's teaching maps and laboratory sections. The final batch.
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

// ============================================================ CHAPTER 13
makeDeck({
  title: "MFAA Ch.13 — From Alternative Assets to Tradable Exposures",
  kicker: "MATHEMATICAL FINANCE OF ALTERNATIVE ASSETS · LECTURE 13",
  titleLine: "From Alternative Assets\nto Tradable Exposures",
  subtitle: "Chapter 13 · Allocation, replication, and optimal switching: pricing every edge of the exposure graph\nSamir Asaf",
  mapKicker: "CHAPTER 13 · ORIENTATION",
  teachingMap: [
    { text: "Reframe a private book as tradable exposures: each edge — sell, overlay, wait, re-enter — carries a price.", bold: true },
    "L2 replication spans the private book with liquid proxies: a smoothing-corrected beta and a residual.",
    "The portfolio problem becomes optimal switching between exposure modes, with hysteresis from switching costs.",
    "The rebalancing band's half-width scales as the cube root of the proportional cost.",
    "Optimal transport measures how far one distribution must move to become another — tails have no twin.",
    { text: "The output is a policy map: for each (signal, regime, urgency) state, the optimal instrument.", bold: true },
  ],
  losRange: "LOS 13.1 – 13.7",
  los: [
    { text: "13.1 Reframe alternative allocations as tradable exposures on a graph.", bold: true },
    "13.2 Build the L2 replication with a smoothing-corrected beta (Proposition 13.3).",
    "13.3 Formulate dynamic exposure choice as an optimal-switching problem.",
    "13.4 Derive the switching bands and their monotonicities (Proposition 13.5).",
    "13.5 Establish the cube-root rebalancing-band law.",
    "13.6 Use optimal transport to compare private and proxy distributions.",
    "13.7 Assemble the (signal, regime, urgency) policy map.",
  ],
  contentSlides: [
    { title: "Replication and the cube-root band", kicker: "LOS 13.2 – 13.5 · PROPOSITIONS 13.3, 13.7",
      bullets: [
        { text: "Replication decomposes total variance into a spanned part (beta times proxy) and a residual (tracking error).", bold: true },
        "Smoothing attenuates the measured beta; the correction restores it, and the raw estimate undersizes the overlay.",
        "The rebalancing band's half-width scales as epsilon^{1/3}: costs an order of magnitude smaller shrink bands only by their cube root.",
        "Switching costs create hysteresis: enter and exit thresholds separate, and the gap is the option value of waiting.",
      ],
      callout: "Basis honesty: estimate proxy betas on raw vs de-smoothed series — the raw estimate understates both the overlay size and the tracking error." },
    { title: "Optimal transport: tails have no twin", kicker: "LOS 13.6 · PROPOSITION 13.8 · E4",
      bullets: [
        { text: "The 1-D Wasserstein distance W1 is the mean absolute gap between the two distributions' quantiles.", bold: true },
        "Sinkhorn's entropic regularization converges to the exact W1 as the temperature vanishes — a computable check.",
        "A CVaR objective repriced under two distributions differs by a transport-bounded amount (Proposition 13.8).",
        { text: "The quantile range contributing half of W1 locates where the private and proxy tails genuinely diverge.", bold: true },
      ], fontSize: 13.5 },
  ],
  labTitle: "Exposure Switchboard",
  labSection: "13.10",
  labBullets: [
    { text: "The allocation cockpit: price every edge of the exposure graph and return the policy map.", bold: true },
    "E1 the CIO's quarter: the policy map and recommended sequencing vs naive 'sell now' and 'overlay only'.",
    "E2 basis honesty: proxy betas on raw vs de-smoothed series, and the overlay undersizing.",
    "E3 hysteresis anatomy: the option value of the overlay edge as a function of the stress discount.",
    "E4 tails have no twin: W1, the quantile map, and the transport budget of Proposition 13.8.",
    { text: "Validation: replication reproduces the Pythagoras identity; band half-widths scale as epsilon^{1/3}; Sinkhorn converges to the exact W1; the policy map reproduces bit-for-bit.", color: NAVY, bold: true },
  ],
  nextKicker: "NEXT: CHAPTER 14",
  nextTitle: "Optimal Stopping\nand Stochastic Control",
  nextSub: "The HJB equation and the variational inequality · verification theorems · the book's decision engine, opened up",
}, "/home/claude/mfaa-course/downloads/MFAA_Ch13_Slides.pptx")

// ============================================================ CHAPTER 14
.then(() => makeDeck({
  title: "MFAA Ch.14 — Optimal Stopping and Stochastic Control",
  kicker: "MATHEMATICAL FINANCE OF ALTERNATIVE ASSETS · LECTURE 14",
  titleLine: "Optimal Stopping and\nStochastic Control",
  subtitle: "Chapter 14 · The dynamic programming principle, the verification theorem, and the book's decision engine\nSamir Asaf",
  mapKicker: "CHAPTER 14 · ORIENTATION",
  teachingMap: [
    { text: "This is the book's decision engine: stopping, switching, and control on the canonical state, certified.", bold: true },
    "The dynamic programming principle generates the HJB equation for controls.",
    "For stopping it generates the variational inequality min{rho v - L v - f, v - g} = 0.",
    "The obstacle anatomy: continuation region (v > g), stopping region (v = g), free boundary with smooth fit.",
    "Candidates come from ansaetze or numerics (grid/PSOR, regression Monte Carlo).",
    { text: "The verification theorem certifies candidate and policy together — the Ito audit that grants the certificate.", bold: true },
  ],
  losRange: "LOS 14.1 – 14.7",
  los: [
    { text: "14.1 State the dynamic programming principle for stopping and control.", bold: true },
    "14.2 Derive the HJB equation and the variational inequality.",
    "14.3 Characterize the free boundary by value matching and smooth fit.",
    "14.4 Solve obstacle problems by implicit finite differences with PSOR.",
    "14.5 Solve high-dimensional problems by regression Monte Carlo.",
    "14.6 Extend to constrained stopping (Proposition 14.6).",
    "14.7 State and apply the verification theorem as a certification layer.",
  ],
  contentSlides: [
    { title: "The machinery, assembled", kicker: "LOS 14.1 – 14.4 · THE VERIFICATION THEOREM",
      bullets: [
        { text: "The dynamic programming principle links value consistency in time to a local equation on the state.", bold: true },
        "For stopping: min{rho v - L v - f, v - g} = 0 — price where it pays to wait, exercise where it pays to stop.",
        "PSOR solves the obstacle problem by projecting each sweep onto the payoff floor.",
        "The verification checklist audits a candidate: VI residual, complementarity, and the martingale property of e^{-rho t} v along continuation paths.",
      ],
      callout: "Certification theater: corrupt a candidate boundary by 5%, watch the verification report localize the failure, then repair by projection and re-certify." },
    { title: "The development option as audit case", kicker: "LOS 14.3 – 14.7 · V* = 2.366K",
      bullets: [
        { text: "The perpetual development option has a closed form, making every tolerance auditable before attacking harder surfaces.", bold: true },
        "At rho = 6%, delta = 4%, sigma = 0.20: V* = 2.366K — build only when completed value first reaches the threshold.",
        "The PSOR grid solution matches the closed form to about 2e-3 in sup norm, with a near-zero VI residual.",
        { text: "Longstaff-Schwartz brackets the value: the in-sample (low-bias) and out-of-sample policy estimates straddle the truth.", bold: true },
      ], fontSize: 13.5 },
  ],
  labTitle: "Optimal Exit Solver",
  labSection: "14.9",
  labBullets: [
    { text: "A general solver for stopping, switching, and constrained problems, with the verification checklist built in.", bold: true },
    "E1 four memos, one map: the opening problem's three-mode, two-obstacle policy map over (rent, regime, rate state).",
    "E2 certification theater: corrupt a candidate, localize the failure, repair, and re-certify.",
    "The development option (V* = 2.366K) is the closed-form audit case for every tolerance.",
    { text: "Validation: V* matches the closed form; the grid solution matches to ~2e-3 sup norm; the VI residual is near zero; the LSM bracket contains the value; identical seeds reproduce bit-for-bit.", color: NAVY, bold: true },
  ],
  nextKicker: "NEXT: CHAPTER 15",
  nextTitle: "Rough and\nNon-Markovian Dynamics",
  nextSub: "Fractional kernels and Volterra processes · the Gaussian-Markov criterion · signatures and Chen's identity",
}, "/home/claude/mfaa-course/downloads/MFAA_Ch14_Slides.pptx"))

// ============================================================ CHAPTER 15
.then(() => makeDeck({
  title: "MFAA Ch.15 — Rough and Non-Markovian Dynamics",
  kicker: "MATHEMATICAL FINANCE OF ALTERNATIVE ASSETS · LECTURE 15",
  titleLine: "Rough and\nNon-Markovian Dynamics",
  subtitle: "Chapter 15 · Volterra processes, the Gaussian-Markov criterion, and the signature transform\nSamir Asaf",
  mapKicker: "CHAPTER 15 · ORIENTATION",
  teachingMap: [
    { text: "Some processes are rougher than Brownian motion and carry memory no Markov state can summarize.", bold: true },
    "Fractional kernels give increment variance scaling as |t-s|^{2H}: rough for small H.",
    "The Gaussian-Markov criterion R(s,u)R(t,t) = R(s,t)R(t,u) separates exponential from power-law covariances.",
    "Exponential-sum lifts approximate a fractional kernel by a Markovian system — the practical convergence.",
    "The signature transform is the sequence of iterated integrals: monomials for paths, with Chen's identity as its streaming update.",
    { text: "The confound: the smoothing pipeline manufactures hyperbolic memory from short-memory data.", bold: true },
  ],
  losRange: "LOS 15.1 – 15.7",
  los: [
    { text: "15.1 Define fractional and Volterra processes and their roughness.", bold: true },
    "15.2 Recover 2H from increment-variance scaling; simulate exactly.",
    "15.3 State the Gaussian-Markov criterion and its power-law failure.",
    "15.4 Build exponential-sum lifts to a Markovian approximation.",
    "15.5 Define the signature and prove Chen's identity.",
    "15.6 Show the smoothing pipeline manufactures apparent long memory.",
    "15.7 Use signatures as features for path-dependent regression.",
  ],
  contentSlides: [
    { title: "Roughness and the identification confound", kicker: "LOS 15.1 – 15.3, 15.6 · PROPOSITION 15.2",
      bullets: [
        { text: "Fractional Brownian motion has increment variance |t-s|^{2H}; the log-log slope recovers 2H on fine grids.", bold: true },
        "The Gaussian-Markov criterion holds exactly for exponential covariances and fails for power laws — the residual is nonzero.",
        "Exponential-sum lifts fit a fractional kernel with a handful of exponentials; the kernel error shrinks with more factors.",
        { text: "But smoothing short-memory data manufactures apparent long memory: quarterly, aggregated private data can mimic roughness that is not there.", bold: true },
      ],
      callout: "The confound: match two worlds' reported autocorrelations — then test which discriminators, if any, separate them at realistic sample sizes." },
    { title: "Signatures: monomials for paths", kicker: "LOS 15.5, 15.7 · CHEN'S IDENTITY",
      bullets: [
        { text: "The signature is the tensor sequence of iterated integrals — a lossless summary of a path's shape.", bold: true },
        "Chen's identity S(X * Y) = S(X) (x) S(Y) makes the signature a streaming update over concatenated paths, exact to machine precision.",
        "The level-two antisymmetric part is the Levy area — a screening statistic for the markdown-and-recover loop.",
        { text: "Signature features feed the Chapter 14 regression: they capture cumulative-threshold payoffs a polynomial basis misses.", bold: true },
      ], fontSize: 13.5 },
  ],
  labTitle: "Volterra and Signature Engines",
  labSection: "15.8",
  labBullets: [
    { text: "A Volterra simulator and a signature extractor, with the identification confound as the centerpiece.", bold: true },
    "E1 the confound: match reported autocorrelations across worlds and test the discriminators.",
    "E2 lift accuracy: approximate the fractional kernel with n exponentials; measure the induced exit-value error.",
    "E3 signature LSM: polynomial vs signature bases on the carry problem at matched budgets.",
    "E4 the desk's statistic: the Levy area as a screening score for subsequent mark-downs.",
    { text: "Validation: increment-variance scaling recovers 2H; the Gaussian-Markov criterion holds for exponential kernels and fails for power laws; Chen's identity verified to machine precision; identical seeds reproduce bit-for-bit.", color: NAVY, bold: true },
  ],
  nextKicker: "NEXT: CHAPTER 16",
  nextTitle: "Malliavin Calculus\nand Sensitivity Analysis",
  nextSub: "Integration by parts for Greeks · the RMSE-versus-N laws · the Clark-Ocone hedging projection",
}, "/home/claude/mfaa-course/downloads/MFAA_Ch15_Slides.pptx"))

// ============================================================ CHAPTER 16
.then(() => makeDeck({
  title: "MFAA Ch.16 — Malliavin Calculus and Sensitivity Analysis",
  kicker: "MATHEMATICAL FINANCE OF ALTERNATIVE ASSETS · LECTURE 16",
  titleLine: "Malliavin Calculus and\nSensitivity Analysis",
  subtitle: "Chapter 16 · Integration by parts for Greeks, the RMSE laws, and the hedging projection\nSamir Asaf",
  mapKicker: "CHAPTER 16 · ORIENTATION",
  teachingMap: [
    { text: "Malliavin calculus turns Greeks from repeated re-simulation into a single weighted expectation.", bold: true },
    "Integration by parts moves the derivative off the payoff and onto a Malliavin weight.",
    "The result is unbiased sensitivities even for discontinuous (digital, kinked) payoffs.",
    "The RMSE-versus-N laws separate estimators: weight ~ N^{-1/2}, bump-on-digital ~ N^{-2/5}.",
    "The Clark-Ocone formula decomposes a claim into its hedgeable and residual parts.",
    { text: "The output is the risk committee's morning, industrialized: every Greek with an error bar and a provenance.", bold: true },
  ],
  losRange: "LOS 16.1 – 16.7",
  los: [
    { text: "16.1 Derive the Malliavin weight for delta by integration by parts.", bold: true },
    "16.2 Establish the RMSE-versus-N laws for weight, bump, and score.",
    "16.3 Build score estimators for the event (jump/chain) layer.",
    "16.4 Localize estimators to control variance near kinks.",
    "16.5 Derive the Clark-Ocone hedging projection (Proposition 16.4).",
    "16.6 State the envelope result for optimal boundaries.",
    "16.7 Match each sensitivity to the right estimator (Table 16.1).",
  ],
  contentSlides: [
    { title: "Weights, bumps, and the RMSE laws", kicker: "LOS 16.1 – 16.4 · PROPOSITION 16.2",
      bullets: [
        { text: "The Malliavin weight estimator matches the Black-Scholes delta and vega within Monte Carlo error — no re-simulation.", bold: true },
        "The weight estimator's RMSE scales as N^{-1/2}; the bump-on-digital scales as N^{-2/5}, worse and requiring a bump schedule.",
        "Near a kink, bump variance explodes like 1/(epsilon N) while the localized weight holds its error bars.",
        { text: "The league table reports variance per unit compute — the desk's real currency for choosing an estimator.", bold: true },
      ],
      callout: "The committee's morning: rate duration and carry vega, bump vs weight at equal compute — report the time to a 5% relative standard error." },
    { title: "The Clark-Ocone hedging projection", kicker: "LOS 16.5 – 16.6 · PROPOSITION 16.4 · E3",
      bullets: [
        { text: "For a two-driver claim F = (A_T - K)^+ with A = a W^m + b W^perp, the hedge is phi*_t = a P(A_T > K | F_t).", bold: true },
        "The Clark-Ocone floor b^2 E[integral P(A_T>K|t)^2 dt] is the irreducible residual — the un-hedgeable idiosyncratic part.",
        "At a=1, b=0.6, K=0.2 the floor is 0.0992; realized residual variance rises as rebalancing coarsens: weekly < monthly < quarterly.",
        { text: "Envelope check: bumping an optimal boundary by +/-5% has zero first-order value effect — the policy is already optimal.", bold: true },
      ], fontSize: 13 },
  ],
  labTitle: "Malliavin Sensitivity Engine",
  labSection: "16.8",
  labBullets: [
    { text: "A sensitivity layer over every engine: Greeks with error bars, estimator diagnostics, and the hedging projection.", bold: true },
    "E1 the committee's morning: rate duration and carry vega, bump vs weight at equal compute.",
    "E2 kink stress: bump variance explodes near the hurdle while the localized weight holds.",
    "E3 hedge the fund: compute phi*, hedge monthly, match the residual to the floor 0.0992.",
    "E4 envelope theater: confirm the zero first-order effect of bumping an optimal boundary.",
    { text: "Validation: GBM delta and vega weights match Black-Scholes; RMSE slopes match -1/2 (weight) and -2/5 (bump-digital); hedged-residual variance matches Proposition 16.4; identical seeds reproduce bit-for-bit.", color: NAVY, bold: true },
  ],
  nextKicker: "NEXT: CHAPTER 17",
  nextTitle: "Robust Valuation, Model Risk,\nand Portfolio Construction",
  nextSub: "The Gibbs tilt and CVaR · the liquidity budget · the phantom breach · the book's cockpit, assembled",
}, "/home/claude/mfaa-course/downloads/MFAA_Ch16_Slides.pptx"))

// ============================================================ CHAPTER 17
.then(() => makeDeck({
  title: "MFAA Ch.17 — Robust Valuation, Model Risk, and Portfolio Construction",
  kicker: "MATHEMATICAL FINANCE OF ALTERNATIVE ASSETS · LECTURE 17",
  titleLine: "Robust Valuation, Model Risk,\nand Portfolio Construction",
  subtitle: "Chapter 17 · The book's capstone: the Gibbs tilt, CVaR, the liquidity budget, and the phantom breach\nSamir Asaf",
  mapKicker: "CHAPTER 17 · ORIENTATION",
  teachingMap: [
    { text: "The capstone assembles every prior engine into one cockpit for constructing a robust allocation.", bold: true },
    "Robust valuation reweights scenarios by the Gibbs tilt within an ambiguity budget.",
    "CVaR is minimized by the Rockafellar-Uryasev linear program on a scenario sample.",
    "The liquidity budget and pacing constraints bind where variance does not.",
    "The phantom breach: reported shares peak strictly after the true shock — mandating sales into the deepest discounts.",
    { text: "Allocations ship with certificates: the attaining tilt, the binding constraint, and the input bands.", bold: true },
  ],
  losRange: "LOS 17.1 – 17.7",
  los: [
    { text: "17.1 Correct reported moments and quantify the misallocation they cause.", bold: true },
    "17.2 Derive the entropic robust value and the attaining Gibbs tilt.",
    "17.3 State the liquidity budget that replaces variance as the binding constraint.",
    "17.4 Minimize CVaR by the Rockafellar-Uryasev linear program.",
    "17.5 Derive the phantom-breach timing result (Proposition 17.5).",
    "17.6 Run reverse stress tests as dual attainment.",
    "17.7 Design band governance that breaks the forced-sale spiral.",
  ],
  contentSlides: [
    { title: "Robust valuation and CVaR", kicker: "LOS 17.2 – 17.4 · PROPOSITIONS 17.2, 17.4",
      bullets: [
        { text: "The entropic robust value V_theta(X) = -theta log E[e^{-X/theta}] reweights scenarios by the Gibbs tilt e^{-X/theta}.", bold: true },
        "As theta falls, ambiguity rises: the tilt concentrates on adverse scenarios and the worst asset shrinks first.",
        "CVaR minimization is the Rockafellar-Uryasev LP: CVaR = min_c c + (1/(1-alpha)) E[(L-c)^+], matching the sample tail mean.",
        { text: "The reverse-stress tilt is found by bisection on the entropy budget — the breaking scenario is the attaining tilt.", bold: true },
      ],
      callout: "Break the program: reverse-stress the flagship, read the tilted anatomy, name the first constraint to fail, redesign one dial, re-run." },
    { title: "The phantom breach", kicker: "LOS 17.5 · PROPOSITION 17.5 · E2",
      bullets: [
        { text: "After a public shock, the true private-share deviation decays as e^{-kappa t}, but the reported deviation lags.", bold: true },
        "The reported breach peaks at t* = log(kappa/lambda)/(kappa - lambda) — strictly after the shock.",
        "At (kappa, lambda) = (2, 0.7): t* is about ten months, by which time the true deviation has decayed to roughly 20% of its peak.",
        { text: "A band policy on reported shares therefore mandates its largest sales at the deepest discounts, against a breach that de-smoothed accounting shows resolving.", bold: true },
        "The cure: filtered triggers, regime-dependent bands, and liquidity-budget pacing sever the three links of the spiral.",
      ], fontSize: 12.5 },
  ],
  labTitle: "Portfolio Construction Suite",
  labSection: "17.10",
  labBullets: [
    { text: "The book's cockpit: robust optimizer, pacing corridor, band-governance, liquidity budget, reverse-stress tilt finder.", bold: true },
    "E1 survive the quarter: naive vs robust program across 2,000 simulated drawdowns.",
    "E2 the price of the print: reported vs filtered triggers, and the fraction of sales that de-smoothing phantoms.",
    "E3 ambiguity sweep: which asset shrinks first as ambiguity rises.",
    "E4 break the program: reverse-stress the flagship and redesign one dial until it survives.",
    { text: "Validation: the multiplier equals -theta log E[e^{-X/theta}]; the tilt hits the entropy budget; CVaR matches the sample tail mean; the phantom-breach peak matches t*; the de-smoothed frontier sits outside the reported one; identical seeds reproduce bit-for-bit.", color: NAVY, bold: true },
  ],
  nextKicker: "THE BOOK, ASSEMBLED",
  nextTitle: "Seventeen chapters,\none architecture",
  nextSub: "Cash flows, the SDF, and the valuation operator — one premium, one address — from taxonomy to the portfolio cockpit. Every engine seeded, validated, and reproducible.",
}, "/home/claude/mfaa-course/downloads/MFAA_Ch17_Slides.pptx"))

.then(() => console.log("decks 13-17 written"));
