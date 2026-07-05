// MFAA Chapter 9-12 lecture decks — Midnight Executive palette, faithful
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

// ============================================================ CHAPTER 9
makeDeck({
  title: "MFAA Ch.9 — Buyout Valuation: The Stochastic LBO",
  kicker: "MATHEMATICAL FINANCE OF ALTERNATIVE ASSETS · LECTURE 9",
  titleLine: "Buyout Valuation: The Stochastic LBO",
  subtitle: "Chapter 9 · The opening spreadsheet rebuilt with distributions: EBITDA risk, multiple regimes, sweep-driven debt, and optimal exit\nSamir Asaf",
  mapKicker: "CHAPTER 9 · ORIENTATION",
  teachingMap: [
    { text: "The deterministic LBO model returns one IRR. The stochastic model returns a distribution — and a percentile for that number.", bold: true },
    "Buyout equity is a call on enterprise value struck at the debt balance: it loves volatility and leverage.",
    "GBM EBITDA, a two-state multiple regime observed at exit, and a deterministic-within-path cash sweep.",
    "Exit is optimal stopping: at each date, sell the equity or continue collecting deleveraging.",
    "The stochastic value bridge decomposes value creation into leverage, operational, and multiple components.",
    { text: "The discipline: locate the base case within the distribution — probability statements, not optimism.", bold: true },
  ],
  losRange: "LOS 9.1 – 9.7",
  los: [
    { text: "9.1 Model buyout equity as a call on enterprise value under leverage.", bold: true },
    "9.2 Specify GBM EBITDA with a cash sweep and covenant leverage barrier.",
    "9.3 Derive the lognormal closed form for equity value (the benchmark).",
    "9.4 Analyze the covenant barrier and its breach probability.",
    "9.5 Formulate exit as an optimal-stopping problem; solve by grid DP or LSMC.",
    "9.6 Build the stochastic value bridge and its spanned/unspanned split.",
    "9.7 Assemble the committee panel and read the base case's percentile.",
  ],
  contentSlides: [
    { title: "The committee panel", kicker: "LOS 9.7 · E1 · PROPOSITION 9.3",
      bullets: [
        { text: "Base case, mean, median IRR and multiple, impairment probability, and the IRR distribution on one screen.", bold: true },
        "The deterministic base case typically sits well above the median — the point estimate flatters the deal.",
        "Impairment probability (equity below cost) is the number the committee actually needs, and the spreadsheet never showed it.",
        "The lognormal benchmark (Proposition 9.3) validates the engine: equity is a Black-Scholes call on enterprise value.",
      ],
      callout: "Re-underwriting assignment: return the committee panel and locate the base case in the distribution — graded on correct probabilities." },
    { title: "Leverage and exit timing", kicker: "LOS 9.5 – 9.6 · E2 – E3",
      bullets: [
        { text: "The leverage frontier: equity value, impairment, and covenant-breach probabilities across entry leverage 40–80%.", bold: true },
        "The GP carry optimum and the LP net-value optimum diverge — leverage that helps carry can hurt the LP.",
        "Optimal exit beats fixed year-five exit by the value of timing flexibility; sell into strength (hot regime).",
        { text: "The stochastic bridge books each dollar of value creation to leverage, operations, or the exit multiple — with the cross-term sized explicitly.", bold: true },
      ], fontSize: 13.5 },
  ],
  labTitle: "LBO Valuation Engine",
  labSection: "9.9",
  labBullets: [
    { text: "A stochastic deal model with the committee panel as its organizing display.", bold: true },
    "E1 answer the committee: mean, median, impairment probability, and the percentile at which the deterministic case sits.",
    "E2 the leverage frontier: mark where the GP and LP optima diverge.",
    "E3 sell into strength: optimal exit vs fixed year-five across regime persistence.",
    "E4 the value bridge: spanned vs unspanned value creation at the declared operational wedge.",
    { text: "Validation: MC equity matches the lognormal benchmark; deterministic limit reproduces the spreadsheet IRR to the basis point; optimal exit dominates fixed on a discounted basis; identical seeds reproduce bit-for-bit.", color: NAVY, bold: true },
  ],
  nextKicker: "NEXT: CHAPTER 10",
  nextTitle: "Venture Capital: Power Laws,\nStaged Financing, and Security Design",
  nextSub: "Power-law outcomes · the cap table as a payoff map · conversion and participation · skill versus luck under heavy tails",
}, "/home/claude/mfaa-course/downloads/MFAA_Ch09_Slides.pptx")

// ============================================================ CHAPTER 10
.then(() => makeDeck({
  title: "MFAA Ch.10 — Venture Capital",
  kicker: "MATHEMATICAL FINANCE OF ALTERNATIVE ASSETS · LECTURE 10",
  titleLine: "Venture Capital: Power Laws, Staged\nFinancing, and Security Design",
  subtitle: "Chapter 10 · Heavy tails, the cap table as a payoff map, and the statistics of separating skill from luck\nSamir Asaf",
  mapKicker: "CHAPTER 10 · ORIENTATION",
  teachingMap: [
    { text: "Venture returns follow power laws, not the bell curve — the winner is the portfolio, and Gaussian intuition fails.", bold: true },
    "Value flows through preference stacks and staged financing, not simple ownership fractions.",
    "The cap table is a payoff map: convertible and participating preferred are piecewise-linear claims with kinks.",
    "The financing tree: staging is an option, and abandonment has value.",
    "Portfolio arithmetic: top-deal share, P(return the fund), and the Pareto moment pathologies.",
    { text: "Skill or luck: under heavy tails, a single strong fund is weak evidence — the posterior needs many funds to move.", bold: true },
  ],
  losRange: "LOS 10.1 – 10.7",
  los: [
    { text: "10.1 Model venture outcomes as power laws and derive their moment pathologies.", bold: true },
    "10.2 Value staged financing as a compound option with abandonment.",
    "10.3 Establish the Pareto moment and expected-max results.",
    "10.4 Derive the dilution identities, option-pool shuffle included.",
    "10.5 Build the cap table: conversion, participation, class-by-class valuation.",
    "10.6 Compute portfolio outcome distributions and hit arithmetic.",
    "10.7 Form skill-versus-luck posteriors from a manager's track record.",
  ],
  contentSlides: [
    { title: "The cap table as a payoff map", kicker: "LOS 10.4 – 10.5 · PROPOSITION 10.5",
      bullets: [
        { text: "Convertible preferred pays max{min(L, E), f E}: take the preference or convert, whichever is larger.", bold: true },
        "Conversion is optimal exactly at E* = L/f — the payoff is piecewise-linear with kinks at L and E*.",
        "Participating preferred pays min(L, E) + f(E - L)^+: preference plus pro-rata, dominating the convertible on (L, ∞).",
        "Class payoffs sum to exit proceeds to the cent — the cap-table conservation identity.",
      ],
      callout: "Repricing the unicorn: produce the class-value ladder and explain the gap to the headline mark — graded on Proposition 10.5(iv) reasoning." },
    { title: "Power laws and the limits of intuition", kicker: "LOS 10.1 – 10.7 · E4",
      bullets: [
        { text: "The k-th Pareto moment converges iff k < alpha: with alpha near 1, even the mean is fragile in samples.", bold: true },
        "Top-deal share and P(return the fund) are governed by the tail index, not the average outcome.",
        "Expected maximum grows with n by the Gamma formula — the portfolio's value concentrates in its single best deal.",
        { text: "Skill or lucky: a 4.1x fund gives a posterior P(positive drift) near 0.6 — it takes several consecutive funds to reach 9:1 odds.", bold: true },
        "The diligence memo answers 'skilled or lucky' as a posterior statement, not a point estimate.",
      ], fontSize: 13 },
  ],
  labTitle: "Venture Portfolio and Security Engine",
  labSection: "10.8",
  labBullets: [
    { text: "Three coupled modules — financing tree, cap table, portfolio/inference — with the two-marks panel as its display.", bold: true },
    "E1 tail-index sensitivity: sweep alpha, track fund-multiple dispersion and P(return the fund).",
    "E2 reserves versus shots: allocate between more initial checks and deeper reserves.",
    "E3 the down-round exit: build a senior participating stack, exit at 0.6x, report each class's recovery.",
    "E4 skilled or lucky: locate a 4.1x fund in the luck distribution; count funds needed for 9:1 skill odds.",
    { text: "Validation: cap-table conservation to the cent; conversion switches exactly at E* = L/f; Pareto moments converge/diverge per the theory; expected-max matches the Gamma formula; identical seeds reproduce bit-for-bit.", color: NAVY, bold: true },
  ],
  nextKicker: "NEXT: CHAPTER 11",
  nextTitle: "Private Credit: Default,\nRecovery, and Covenants",
  nextSub: "The hybrid default intensity · recovery drawn at the worst time · the covenant as an option · the spread waterfall",
}, "/home/claude/mfaa-course/downloads/MFAA_Ch10_Slides.pptx"))

// ============================================================ CHAPTER 11
.then(() => makeDeck({
  title: "MFAA Ch.11 — Private Credit",
  kicker: "MATHEMATICAL FINANCE OF ALTERNATIVE ASSETS · LECTURE 11",
  titleLine: "Private Credit: Default, Recovery,\nand Covenants",
  subtitle: "Chapter 11 · Decomposing a quoted spread: hybrid default intensity, state-dependent recovery, covenant options, and the P/Q wedge\nSamir Asaf",
  mapKicker: "CHAPTER 11 · ORIENTATION",
  teachingMap: [
    { text: "A quoted spread is not a number — it is a sum, and pricing means decomposing it into what each basis point buys.", bold: true },
    "The hybrid intensity rides the borrower's leverage path: structural distance to barrier drives a reduced-form default rate.",
    "Recovery is a random variable drawn at the worst time — the wrong-way covariance with default clustering.",
    "The covenant is an option: it converts observation into a state transition with the right to accelerate.",
    "Prepayment caps the upside — negative convexity in credit quality.",
    { text: "The discipline: label each block by its measure (P or Q) and its address, with the double-count detector running.", bold: true },
  ],
  losRange: "LOS 11.1 – 11.7",
  los: [
    { text: "11.1 Model default as a doubly-stochastic (Cox) process with a hybrid intensity.", bold: true },
    "11.2 Derive survival and loan-value closed forms in the constant and affine cases.",
    "11.3 Decompose the spread into expected loss, risk premium, illiquidity, and rents.",
    "11.4 Model state-dependent recovery and its wrong-way dependence.",
    "11.5 Build the covenant three-state engine and price the covenant in basis points.",
    "11.6 Model prepayment and its negative-convexity effect on value.",
    "11.7 Reconcile the physical and risk-neutral measures on a quoted loan.",
  ],
  contentSlides: [
    { title: "The spread waterfall", kicker: "LOS 11.3 · E1 · DECOMPOSITION (11.3)",
      bullets: [
        { text: "A 575bp quoted spread decomposes into: expected loss, default-risk premium, illiquidity, and covenant/info rents.", bold: true },
        "Expected loss (in the pricing measure) is (1 - R) times the risk-neutral intensity — the actuarial cost.",
        "The risk premium is (1 - R)(lambda_P - lambda_Q) — payment for bearing default-timing risk.",
        "Illiquidity sits at exactly one of its two admissible addresses; covenant rent is the residual, net of prepay give-up.",
      ],
      callout: "Decompose the 575: deliver the waterfall with bands, and the one sentence each block licenses in committee English." },
    { title: "The P/Q reconciliation", kicker: "LOS 11.7 · E4 · THE CHAPTER 7 AUDIT",
      bullets: [
        { text: "The agent quotes a physical intensity; the desk's spread implies a risk-neutral one. The wedge is the risk premium.", bold: true },
        "Over one year the excess is (1 - R)(lambda_P - lambda_Q) = 0.6 × (0.045 - 0.019) = 0.0156, i.e. 156 basis points.",
        "Loss volatility is (1 - R)√(p(1-p)) with p = 1 - e^{-0.0188} = 0.0815; the default-risk Sharpe is about 0.19.",
        { text: "Test that Sharpe against a declared good-deal ceiling — Chapter 7's audit applied to credit.", bold: true },
        "The covenant's value concentrates in states neither lender nor sponsor currently occupies — the institutional lesson.",
      ], fontSize: 13 },
  ],
  labTitle: "Private Credit Engine",
  labSection: "11.9",
  labBullets: [
    { text: "Price bilateral loans with all four layers live; the spread waterfall is the organizing display.", bold: true },
    "E1 decompose the 575: the waterfall with posterior bands on each block.",
    "E2 price cov-lite: covenant value by regime, verifying the three monotonicities.",
    "E3 wrong-way stress: sweep the recovery–regime link, separating the P-effect from the priced effect.",
    "E4 reconcile the committee: back out the wedge and convert it to a default-risk Sharpe contribution.",
    { text: "Validation: MC matches Proposition 11.3 in the constant and affine limits; recovery-convention wedge matches the closed form; value with prepayment ≤ without; conservation path by path; identical seeds reproduce bit-for-bit.", color: NAVY, bold: true },
  ],
  nextKicker: "NEXT: CHAPTER 12",
  nextTitle: "Real Assets: Real Estate\nand Infrastructure",
  nextSub: "Slow numerator, fast denominator · lease and concession ladders · the development option · the real-asset risk map",
}, "/home/claude/mfaa-course/downloads/MFAA_Ch11_Slides.pptx"))

// ============================================================ CHAPTER 12
.then(() => makeDeck({
  title: "MFAA Ch.12 — Real Assets",
  kicker: "MATHEMATICAL FINANCE OF ALTERNATIVE ASSETS · LECTURE 12",
  titleLine: "Real Assets: Real Estate\nand Infrastructure",
  subtitle: "Chapter 12 · Slow numerator, fast denominator: contracted cash flows, regime cap rates, and the development option\nSamir Asaf",
  mapKicker: "CHAPTER 12 · ORIENTATION",
  teachingMap: [
    { text: "Real-asset value has a slow numerator (contracted rent) and a fast denominator (cap rates) — serenity hides volatility.", bold: true },
    "The lease ladder low-passes the market: a staggered rent roll tracks a moving average of market rent.",
    "Value V = NOI / cap rate reprices with the fast, spanned denominator whatever the income statement suggests.",
    "Development rights and expansion capacity are options — the chronic pathology is building at the top by the NPV rule.",
    "Infrastructure adds indexation, regulatory resets, and concession length — real versus nominal duration.",
    { text: "The discipline: place the asset on the risk map by contracted share and market elasticity — a dot, not a slogan.", bold: true },
  ],
  losRange: "LOS 12.1 – 12.7",
  los: [
    { text: "12.1 Map real assets by contracted-cash-flow share and market elasticity.", bold: true },
    "12.2 Model lease and concession ladders on rent and volume dynamics.",
    "12.3 Derive the low-pass relation between market rent and the rent roll.",
    "12.4 Establish the slow-numerator, fast-denominator variance decomposition.",
    "12.5 Model regime cap rates and the value fan V = NOI / c(Z).",
    "12.6 Derive the perpetual development option and its hurdle multiple.",
    "12.7 Value infrastructure concessions with indexation and regulatory resets.",
  ],
  contentSlides: [
    { title: "Slow numerator, fast denominator", kicker: "LOS 12.3 – 12.5 · PROPOSITION 12.4",
      bullets: [
        { text: "A staggered lease ladder averages market rent over the lease term — it low-passes the market's fluctuations.", bold: true },
        "The variance ratio g(kappa*ell) = (2/x^2)(x - 1 + e^{-x}) falls as the mean lease term grows: 0.5677 at ell=5, 0.3773 at ell=10.",
        "The NOI fan is narrow, but value V = NOI/cap loads on the fast-moving, spanned cap-rate denominator.",
        "Value volatility is dominated by the denominator — 'bond-like cash flows' need not mean bond-like returns.",
      ],
      callout: "Audit the slogan: compute the toll-road pitch's actual risk-map dot — boards can be shown a coordinate instead of a claim." },
    { title: "The development option", kicker: "LOS 12.6 · PROPOSITION 12.6 · THE NPV TRAP",
      bullets: [
        { text: "Development land is a perpetual call: build for cost K when completed value V first reaches the threshold V*.", bold: true },
        "V* = beta K/(beta - 1), where beta > 1 solves (1/2)sigma^2 beta(beta-1) + mu beta - rho = 0.",
        "At sigma=0.25, rho=6%, payout 3%: beta = 1.406 and V* = 3.46K — build only well above breakeven.",
        { text: "The hurdle multiple beta/(beta-1) exceeds 1 and rises with volatility: uncertainty defers construction.", bold: true },
        "The NPV rule (build when V > K) forgoes most of land value — the sector's chronic 'building at the top' pathology.",
      ], fontSize: 13 },
  ],
  labTitle: "Real Asset Cash-Flow Engine",
  labSection: "12.9",
  labBullets: [
    { text: "Value layered real-asset claims end to end; the layer report and risk-map dot are the organizing display.", bold: true },
    "E1 audit the slogan: compute a pitch's actual risk-map coordinates.",
    "The lease ladder low-passes the market: g(kappa*ell) shrinks with the lease term.",
    "The value fan V = NOI/cap shows volatility dominated by the fast denominator.",
    "The development option (beta=1.406, V*=3.46K) shows the NPV rule building too early.",
    { text: "Validation: low-pass anchors 0.5677 and 0.3773 reproduced; development beta=1.406, V*=3.46K; MC exercise value matches the closed form; hurdle rises in sigma; identical seeds reproduce bit-for-bit.", color: NAVY, bold: true },
  ],
  nextKicker: "NEXT: CHAPTER 13",
  nextTitle: "Regime Switching and\nExposure Management",
  nextSub: "Markov-modulated dynamics · the exposure switchboard · state-dependent valuation across market regimes",
}, "/home/claude/mfaa-course/downloads/MFAA_Ch12_Slides.pptx"))

.then(() => console.log("decks 9-12 written"));
