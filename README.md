# mfaa-course — Course Website (Quarto)

Companion site for *Mathematical Finance of Alternative Assets*:
syllabus, 15-week schedule, per-chapter pages with LOS and public
exercise statements (solutions are **not** posted), lecture decks,
notebooks, and Excel workbooks. Built with Quarto, published on GitHub
Pages — same stack as the GE-LAV course site.

## Publish (once)

1. Push this repository to GitHub (e.g. `drsamirasaf-creator/mfaa-course`).
2. Locally (or in a GitHub Action): `quarto publish gh-pages`
   — accept the prompts; this builds `_site/` and pushes the `gh-pages`
   branch.
3. In the repo's **Settings → Pages**, confirm the source is the
   `gh-pages` branch. The site appears at
   `https://drsamirasaf-creator.github.io/mfaa-course/`.

## After the Lovable app is deployed

Search-and-replace `https://YOUR-LOVABLE-APP-URL` (in `_quarto.yml`,
`index.qmd`, `labs.qmd`, `chapters/*.qmd`) with the real app URL, then
republish.

## Adding videos

Each page carries `VIDEO_ID_...` placeholders inside
`{{< video https://www.youtube.com/embed/... >}}` shortcodes — replace
with your YouTube IDs as recordings are ready.

## Updating content

`quarto preview` for a live local preview; chapter pages live in
`chapters/`, downloadable artifacts in `downloads/`.
