// MFAA Chapter 2-4 lecture decks — Midnight Executive palette, faithful
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

  // Title
  darkSlide(spec.kicker, spec.titleLine, spec.subtitle);

  // Teaching map
  let s = contentSlide("Teaching map: what this chapter must accomplish", spec.mapKicker);
  bullets(s, spec.teachingMap, { fontSize: 14 });

  // LOS overview
  s = contentSlide("Learning outcomes", spec.losRange);
  bullets(s, spec.los, { fontSize: 13.5 });

  // Content slides (2-3 conceptual anchors)
  spec.contentSlides.forEach(cs => {
    const sl = contentSlide(cs.title, cs.kicker);
    bullets(sl, cs.bullets, { fontSize: cs.fontSize || 14 });
    if (cs.callout) {
      sl.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 4.35, w: 8.9, h: 0.85, fill: { color: ICE }, rectRadius: 0.1 });
      sl.addText(cs.callout, { x: 0.85, y: 4.35, w: 8.4, h: 0.85, fontFace: F, fontSize: 13, italic: true, color: NAVY, valign: "middle" });
    }
  });

  // Laboratory slide
  s = contentSlide("The laboratory: " + spec.labTitle, "BOOK §" + spec.labSection);
  bullets(s, spec.labBullets, { fontSize: 13 });

  // Closer
  darkSlide(spec.nextKicker, spec.nextTitle, spec.nextSub);

  return p.writeFile({ fileName: outPath });
}

// ============================================================ CHAPTER 2
makeDeck({
  title: "MFAA Ch.2 — Probability, Stochastic Processes, and Financial States",
  kicker: "MATHEMATICAL FINANCE OF ALTERNATIVE ASSETS · LECTURE 2",
  titleLine: "Probability, Stochastic Processes,\nand Financial States",
  subtitle: "Chapter 2 · The probabilistic substrate: filtrations, the four drivers, the cash-flow process, and simulation with error control\nSamir Asaf",
  mapKicker: "CHAPTER 2 · ORIENTATION",
  teachingMap: [
    { text: "Filtrations and the usual conditions: information as a growing sigma-algebra; the observed filtration is coarser than the full one.", bold: true },
    "Conditional expectation as the primitive valuation operator — least-squares prediction, not an integral trick.",
    "The martingale toolkit: optional sampling and Doob-Meyer, used later for value processes and compensators.",
    "The four drivers: diffusions, Poisson/compound-Poisson jumps, marked point processes, Markov chains.",
    "The cash-flow process D by decomposition (2.3): continuous accrual plus marked jumps.",
    "Simulation with error control: Euler-Maruyama, exact transitions, thinning — and their convergence rates.",
  ],
  losRange: "LOS 2.1 – 2.7",
  los: [
    { text: "2.1 Construct filtered probability spaces; distinguish full vs observed filtrations.", bold: true },
    "2.2 Compute conditional expectations; justify them as least-squares predictors.",
    "2.3 State the martingale, optional-sampling, and Doob-Meyer results used in the book.",
    "2.4 Define the four drivers: Brownian, Poisson/compound-Poisson, marked point processes, chains.",
    "2.5 Formulate the cash-flow stream as an adapted finite-variation process (decomposition 2.3).",
    "2.6 Assemble the canonical state vector of alternative-asset valuation.",
    "2.7 Implement Euler-Maruyama, exact, and thinning schemes; state their error rates.",
  ],
  contentSlides: [
    { title: "Two filtrations, one latent path", kicker: "LOS 2.1 · THE OPENING PROBLEM'S MECHANISM",
      bullets: [
        { text: "The full filtration F carries the true value; the observed filtration G is generated by sparse appraisals.", bold: true },
        "Smoothing averages old information into new marks: reported volatility falls, autocorrelation rises.",
        "The committee's two volatility numbers are two points on one smoothing table — not two estimates of one quantity.",
        "Every reported moment belongs to some filtration; the reflex question is always: with respect to which?",
      ],
      callout: "Exercise 2.11 makes this a table: as α runs 0→0.8, the volatility ratio runs 0→0.816 while the latent path never moves." },
    { title: "The four drivers and the cash-flow process", kicker: "LOS 2.4 – 2.5",
      bullets: [
        { text: "Diffusions (OU rate, square-root cash-flow rate) model continuous variation.", bold: true },
        "Poisson and compound-Poisson jumps model discrete events with random marks.",
        "Marked point processes with age- and state-modulated intensity λ(t,X) = λ₀ h(t) g(X) model capital calls.",
        "Markov chains model liquidity and regime states.",
        { text: "D_t assembles these by decomposition (2.3): a continuous accrual part plus a marked-jump part.", bold: true },
      ] },
    { title: "Simulation is not free: know your error rate", kicker: "LOS 2.7 · THEOREM 2.8.1",
      bullets: [
        { text: "Euler-Maruyama is simple but only strongly convergent at order ≈ ½, weakly at order ≈ 1.", bold: true },
        "The square-root process needs full truncation (or the exact noncentral-χ² transition) to stay non-negative.",
        "Common random numbers make scheme comparisons honest; a single visible seed makes runs reproducible.",
        "Read the log-log error slopes off the convergence plot before trusting any downstream valuation.",
      ],
      callout: "A simulation that has not passed its convergence and distributional checks is not evidence of anything." },
  ],
  labTitle: "Stochastic Process and Cash-Flow Simulator",
  labSection: "2.9",
  labBullets: [
    { text: "Simulate the drivers and undiscounted cash-flow paths; no valuation yet (that is Chapters 3-4).", bold: true },
    "E1 scheme error: Euler vs exact on log-log axes; read slopes ≈ ½ (strong) and ≈ 1 (weak).",
    "E2 intensity shape: calibrate the capital-call age profile to 90% called by year 4 (Exercise 2.10).",
    "E3 two filtrations: raise α and the reporting lag; watch reported volatility fall and autocorrelation rise (Exercise 2.11).",
    "E4 tail of marks: switch exit marks from lognormal to Pareto and watch the Monte Carlo mean destabilize.",
    { text: "Validation: Poisson counts pass a chi-square test; OU/CIR match their stationary laws; identical seeds reproduce bit-for-bit.", color: NAVY, bold: true },
  ],
  nextKicker: "NEXT: CHAPTER 3",
  nextTitle: "No-Arbitrage, State Prices,\nand Incomplete Markets",
  nextSub: "The fundamental theorem · state prices / SDF / risk-neutral measures · superhedging duality · the valuation interval as the shadow of the pricing set",
}, "/home/claude/mfaa-course/downloads/MFAA_Ch02_Slides.pptx")

// ============================================================ CHAPTER 3
.then(() => makeDeck({
  title: "MFAA Ch.3 — No-Arbitrage, State Prices, and Incomplete Markets",
  kicker: "MATHEMATICAL FINANCE OF ALTERNATIVE ASSETS · LECTURE 3",
  titleLine: "No-Arbitrage, State Prices,\nand Incomplete Markets",
  subtitle: "Chapter 3 · Three theorems as manipulable objects: the pricing set, the valuation interval as its shadow, completeness as a knife edge\nSamir Asaf",
  mapKicker: "CHAPTER 3 · ORIENTATION",
  teachingMap: [
    { text: "The fundamental theorem: no arbitrage ⟺ a strictly positive state-price vector exists.", bold: true },
    "The trinity: state prices ψ, stochastic discount factor M, risk-neutral measure Q — three views of one object.",
    "Incompleteness: many measures are consistent with traded prices; the valuation interval is the set they induce.",
    "Spanned vs residual: the residual (untraded) risk carries all the valuation ambiguity.",
    "Superhedging duality: the interval endpoints are super- and sub-replication costs — correct but wide.",
    "Completeness is the razor's-edge special case where the interval collapses to a point.",
  ],
  losRange: "LOS 3.1 – 3.7",
  los: [
    { text: "3.1 Define arbitrage across settings; state the fundamental theorems with exact hypotheses.", bold: true },
    "3.2 Prove the one-period theorem by separating hyperplane; extract state prices.",
    "3.3 Translate among state prices, SDFs, and risk-neutral measures; normalize correctly.",
    "3.4 Characterize the set of equivalent martingale measures; relate its dimension to unspanned risk.",
    "3.5 Decompose a claim into spanned + residual; ambiguity lives in the residual.",
    "3.6 State superhedging duality; explain why the bounds are too wide to be prices.",
    "3.7 Compute no-arbitrage bounds by LP; read interval width as a measure of incompleteness.",
  ],
  contentSlides: [
    { title: "One object, three names", kicker: "LOS 3.3 · THE TRINITY",
      bullets: [
        { text: "A state-price vector ψ ≥ 0 prices every claim as ψᵀX and reproduces traded prices as Aᵀψ = p.", bold: true },
        "The SDF is the normalized state price: M_j = q_j /(R p_j); the risk-neutral measure is q_j = R ψ_j.",
        "Change of representation is bookkeeping — but each makes a different question easy.",
        "No arbitrage is exactly the existence of a strictly positive ψ; its failure yields a Farkas certificate — an explicit arbitrage trade.",
      ],
      callout: "The Chapter 3 laboratory surfaces the Farkas certificate verbatim when you underprice an asset until the audit trips." },
    { title: "The interval is the shadow of the pricing set", kicker: "LOS 3.4 – 3.7",
      bullets: [
        { text: "When markets are incomplete, the state-price vector is not unique — a whole convex set Ψ is consistent with prices.", bold: true },
        "Valuing the claim over all of Ψ produces an interval (π_low, π_bar), not a number.",
        "Endpoints are super- and sub-hedging costs, recovered as LP duals; the duality gap is zero at the optimum.",
        { text: "The trinomial anchor: bond R=1.02, stock (1.15,1,0.85), claim (0.15,0,0) → interval (0.0196, 0.0833).", bold: true },
        "Add an Arrow security on the middle state and the market completes — the interval collapses to 0.0539.",
      ], fontSize: 13.5 },
  ],
  labTitle: "State Prices and Pricing Bounds",
  labSection: "3.9",
  labBullets: [
    { text: "Build a finite-state market; edit assets and watch the pricing set appear, shrink, and vanish.", bold: true },
    "E1 completeness as a knife edge: add an independent asset → the interval becomes a number; perturb a payoff → incompleteness returns.",
    "E2 manufacture an arbitrage: lower a price until the audit trips; read the Farkas certificate as a trade.",
    "E3 spanning curve: add hedging assets one at a time; plot interval width against the spanned fraction.",
    "E4 P versus Q: fix measures near each end of the pricing set; reconcile two desks as an SDF disagreement, not a cash-flow one.",
    { text: "Validation: the trinomial interval reproduces (0.0196, 0.0833) exactly; zero duality gap; arbitrage detection fires.", color: NAVY, bold: true },
  ],
  nextKicker: "NEXT: CHAPTER 4",
  nextTitle: "Stochastic Discount Rates\nand Private-Market Risk Premia",
  nextSub: "The book's first full valuation engine · stochastic rates and the SDF · premium location · regimes · Bayesian parameter uncertainty · the hurdle-rate autopsy",
}, "/home/claude/mfaa-course/downloads/MFAA_Ch03_Slides.pptx"))

// ============================================================ CHAPTER 4
.then(() => makeDeck({
  title: "MFAA Ch.4 — Stochastic Discount Rates and Private-Market Risk Premia",
  kicker: "MATHEMATICAL FINANCE OF ALTERNATIVE ASSETS · LECTURE 4",
  titleLine: "Stochastic Discount Rates\nand Private-Market Risk Premia",
  subtitle: "Chapter 4 · The first full valuation engine: stochastic rates, premium location, regimes, Bayesian learning, and the hurdle-rate autopsy\nSamir Asaf",
  mapKicker: "CHAPTER 4 · ORIENTATION",
  teachingMap: [
    { text: "Discount rates are stochastic: the Vasicek bond-price formula and its curve are the starting point.", bold: true },
    "Girsanov: market prices of risk are drift wedges; the SDF is built from (r, λ).",
    "The Hansen-Jagannathan bound: ‖λ‖ is the maximal Sharpe ratio a good deal may claim.",
    { text: "Premium-location discipline: illiquidity, horizon, size, complexity — each at exactly ONE address.", bold: true },
    "Regime switching for rates and prices of risk; conjugate Bayesian updating from sparse deal data.",
    "The signature exercise: a hurdle-rate autopsy that reverse-engineers, then replaces, a flat rate.",
  ],
  losRange: "LOS 4.1 – 4.7",
  los: [
    { text: "4.1 Model rates as stochastic; derive the Vasicek bond-price formula.", bold: true },
    "4.2 Change measure by Girsanov; read prices of risk as drift wedges.",
    "4.3 Construct exponential and factor SDFs; apply the Hansen-Jagannathan bound.",
    { text: "4.4 Locate each premium in exactly one of cash flows, SDF, or operator.", bold: true },
    "4.5 Value under regime-switching rates and prices of risk.",
    "4.6 Update premia from sparse deal data by conjugate Bayesian analysis.",
    "4.7 Assemble and defend the liquidity-adjusted stochastic DCF operator.",
  ],
  contentSlides: [
    { title: "Premium location: one address per premium", kicker: "LOS 4.4 · THE DISCIPLINE",
      bullets: [
        { text: "Every premium must live in exactly one place: the cash flows D, the SDF M, or the valuation operator.", bold: true },
        "The build-up method — stacking liquidity + size + risk premia into one discount rate — double counts by construction.",
        "Illiquidity as a factor-in-M is a covariance story; illiquidity as a friction-in-operator is a haircut story. Pick one.",
        "The engine's double-count detector fires when both illiquidity addresses are active at once.",
      ],
      callout: "E2, the double-count demonstration, is reported as the single most opinion-changing exercise in Part II." },
    { title: "The hurdle-rate autopsy", kicker: "LOS 4.1 – 4.7 · THE SIGNATURE EXERCISE",
      bullets: [
        { text: "Enter a flat 12% hurdle. The engine reverse-engineers what that number implicitly assumes.", bold: true },
        "It reports how much the term structure alone explains, then replaces the flat rate with a located premium architecture.",
        "The honest output is a valuation distribution — mean, quantiles, standard error — not a point.",
        { text: "The Bayesian panel then shows how a sparse track record sharpens the premium and narrows the distribution (E4).", bold: true },
        "The implied honest flat rate typically sits well below the entered hurdle once premia are located correctly.",
      ], fontSize: 13.5 },
  ],
  labTitle: "Stochastic DCF Engine",
  labSection: "4.9",
  labBullets: [
    { text: "The LDCF operator of Theorem 4.8 end to end: rate simulation, SDF, premium location, regimes, Bayesian learning.", bold: true },
    "E1 hurdle autopsy: enter 12%; read the four-way decomposition and the distribution the point estimate hid.",
    "E2 double-count demonstration: value illiquidity as factor-in-M, then friction-in-operator, then force both on.",
    "E3 good-deal narrowing: sweep the Sharpe ceiling h and watch Chapter 3's interval narrow by statistics.",
    "E4 learning curve: feed deal outcomes one at a time; watch the posterior premium spread and valuation quantiles converge.",
    { text: "Validation: MC zero-coupon prices match the closed form within SE; frozen-rate limit reproduces the deterministic DCF; posterior recursion matches the batch formula.", color: NAVY, bold: true },
  ],
  nextKicker: "NEXT: CHAPTER 5",
  nextTitle: "Illiquidity as Constraint",
  nextSub: "From premium to constraint · liquidity states and trading frictions · the shadow price of illiquidity · the liquidity-shock simulator",
}, "/home/claude/mfaa-course/downloads/MFAA_Ch04_Slides.pptx"))

.then(() => console.log("decks 2-4 written"));
