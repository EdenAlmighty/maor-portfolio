# Design: checked drawing sheets

Every page is an engineering drawing sheet that Maor has checked. The sheet has a ruled border
with zone numbers, a title block locked to its lower-right corner, numbered balloons that call
out details, and the checker's two marks: yellow highlighter over what was verified, red
revision triangles on defects found. It says "this person checks things and documents them"
without a single tool logo, skill bar or terminal costume.

Written from the built site, Nov 2026. `src/styles/global.css` (tokens, fonts, base) and
`src/styles/sheet.css` (components) are the source of truth; update this file when they change.

## File map

| File                               | Holds                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------ |
| `src/styles/global.css`            | Fonts, fallback faces, tokens (light and dark), base elements                  |
| `src/styles/sheet.css`             | Grid, header, buttons, sheet, zones, title block, marks, tables, notes, footer |
| `src/components/PageSheet.astro`   | The top of every inner page: heading and title block                           |
| `src/components/PathDrawing.astro` | The home page's "Detail A": the career path as a dimensioned drawing           |
| `src/components/ProjectRows.astro` | Featured projects as a drawing list                                            |
| `src/scripts/ruler.ts`             | Leader lines drawn from live layout boxes at one device pixel                  |

## Color

Restrained: a drafting-film ground, iron ink, and the checker's two colours, each with one job.
Dark mode is the same sheet as a graphite negative: every token keeps its name.

| Token        | Light     | Dark      | Job                                                    |
| ------------ | --------- | --------- | ------------------------------------------------------ |
| `--paper`    | `#f4f6f3` | `#0e1317` | Ground                                                 |
| `--paper-2`  | `#e9ede8` | `#161d23` | Targeted rows and notes                                |
| `--ink`      | `#111820` | `#e6ecef` | Text, rules, primary button                            |
| `--ink-2`    | `#47515a` | `#a3aeb6` | Secondary text, labels                                 |
| `--line-2`   | `#a3acb2` | `#3c4750` | Light rules, zone ticks (decorative only)              |
| `--mark`     | `#ffe14a` | `#f5d63d` | Highlighter: verified. Behind text only, never as text |
| `--mark-ink` | `#111820` | `#0e1317` | Text on the highlighter                                |
| `--fix`      | `#b3261e` | `#ff8a7a` | Defects: revision triangles, TODO markers              |

Contrast (WCAG, computed): ink on paper 16.4:1 light / 15.7:1 dark; ink-2 on paper
7.5:1 / 8.3:1 (6.8:1 on paper-2); fix on paper 6.0:1 / 8.2:1; mark-ink on mark 13.7:1 /
13.0:1. Focus outline: 2px ink, 3px offset.

## Type

One family with two voices, self-hosted, Latin subset, SIL OFL (`public/fonts/OFL.txt`).

- **Overpass** (variable 100–900), from the Highway Gothic lineage of engineering lettering.
  Headings 800, tracking -0.025em to -0.03em, sentence case. Body 400, 17px, line height 1.55.
- **Overpass Mono** for data only: dates, sheet and drawing numbers, test case IDs, title block
  labels (uppercase, 11px, +0.04em). Never as a "technical" costume for prose.
- Scale: H1 `clamp(2.25rem … 4.75rem)` (hero up to 4.4rem), H2 `clamp(1.6rem … 2.6rem)`,
  H3 1.25rem, lede `clamp(1.1rem … 1.3rem)`, body 1.0625rem, small 0.875rem.
- Fonts load after first paint (`src/scripts/fonts.ts`, `.mp-fonts`), on metric-matched Arial
  and Consolas fallbacks measured on the real copy, so the swap moves nothing (CLS 0).

## Shape, space and structure

- No radius (balloons are the one circle, as on a drawing), no shadows, no gradients.
- Rules are 1px. Title blocks draw their cell rules with a 1px ink gap.
- An 8-column grid (`.mp-grid`) that the sheet border numbers 1 to 8: zones are real
  coordinates, not decoration. Max width 82rem, gutter `clamp(1rem, 4vw, 2.5rem)`.
- More space above a section than below its heading: sections start with
  `clamp(3rem, 7vw, 6rem)`, headings sit on a rule with 1.5rem after.
- Pages end in a closing sheet with the two actions: Download my CV, then Email me.

## Components

- **Sheet** (`.mp-sheet`): ruled border, zone numbers above, row letters at the side (hidden
  under 40rem).
- **Title block** (`.mp-tb`): labelled cells; on every sheet in the same corner. The hero's
  title block carries the primary action as its last two cells.
- **Balloon** (`.mp-balloon`): numbered callout. **Revision triangle** (`.mp-rev`): a
  defect, with its number.
- **Highlighter** (`.mp-mark`): a stroke behind the lower 62% of the text in light mode, the
  whole word in dark mode.
- **Drawing list and parts list** (`.mp-table`): real tables with header cells, tabular
  numbers, scroll inside `.mp-scroll` on narrow screens.
- **Notes** (`.mp-notes`): numbered general notes for method steps.
- **Buttons**: primary is solid ink; ghost is outlined. Hover fills both with highlighter.

## Motion

One authored moment: on load, the checker's pen sweeps the highlighter across the hero claim
(900 ms, ease-out, after 350 ms). Hovering a project row highlights its title. The leader
lines are drawn once and re-solved on resize; nothing else moves. Under reduced motion
everything shows its final state.

## Iconography

Six icons drawn for the site on a 24px grid, 1.5px square-capped stroke: download, mail,
external, sun, moon, document. No brand logos: services are named in text.

## Avoid

The `site-design-system` list, plus for this site: terminal or "hacker" green on black,
tool-logo grids, skill percentage bars, fake code editors, checkmark confetti, eyebrow labels
above headings, monospace prose, a stock or AI-made photo of Maor.

## Quality floor

One markup for every screen size; works from 320px; readable with JavaScript off; text
contrast ≥ 4.5:1 in both themes; visible focus; no inline styles (CSP); Lighthouse 100 for
accessibility, best practices and SEO; CLS ≤ 0.05.
