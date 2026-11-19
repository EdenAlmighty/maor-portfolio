---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages"]
---

## Surface

Whole site (home, projects index, case studies, about, CV, how-this-site-is-tested, legal). Mode: Persuade. Audience: hiring managers, QA leads, recruiters deciding whether to interview Maor. Action: Download CV, then Email. Proof: repos, GitHub issues, Drive test documents (CONTENT-MAP.md). Constraints: no photo yet, no phone on HTML, no invented claims, English only, no third-party scripts.

Run was unattended at Eden's request ("don't wait for OKs"): the decision page was not served; the assigned direction was built. Challengers all declined (see raises).

## Direction contract

THESIS: The site is a set of engineering drawing sheets that Maor has checked. Each project is a sheet with a title block, numbered callout balloons and the checker's marks: yellow highlighter over what was verified, red revision marks on defects found, each linked to its evidence. It refuses the category default (dark hero, tool-logo grid, skill bars, equal project cards).

OWN-WORLD: Cool drafting-film white ground, iron ink linework at 1 device pixel, sheet border with zone letters and numbers, title blocks with small labelled cells, single-stroke technical gothic lettering (Overpass) with Overpass Mono for IDs, dates and dimensions. Checkprint colours only: highlighter yellow (behind text, never as text) means verified; correction red means a defect. No radius, no shadows, no gradients. Dark theme is the same sheet as a graphite negative.

STORY: In one viewport the visitor reads who Maor is and what he tests, sees his path dimensioned like a part (2024 to 2026), and can download the CV from the title block. Scrolling, every claim resolves to a callout that links to a repo, bug report or test document. They leave believing he is careful and documents everything, and they take the CV.

FIRST VIEWPORT: Sheet border and zone markers frame the page. Upper left, the H1 in large technical gothic with the verified phrase under a yellow highlighter stroke. Below it, a dimensioned timeline drawing: three stations (bootcamp 2024, Weather App 2025, First-Rate 2026) on a datum line, a dimension line spanning them, numbered balloons with leaders. Lower right, the title block: name, title, location, sheet number, checked-by, date, and the primary Download CV cell plus Email. Header is a thin drawing-list strip.

FORM: Engineering drawing sheet with checkprint markup; position 4 of 7 on the ordered list; seed:69e9ac7ee6d43930.
RAISE (from centre-rail reference setting): a real ruling layer: leader lines and dimension lines are drawn by script from live layout boxes at one device pixel, re-solved on resize; three-value restraint per sheet.
RAISE (from oscilloscope bench): everything is measured against the sheet's zone grid; zone references (e.g. "see C3") are real coordinates on the page.
RAISE (from HyperCard stack): every sheet, callout and finding has a stable deep link.
RAISE (from broadcast signal): the title block is locked to the same corner of every sheet, one fixed system mark site-wide.
SIGNATURE INTERACTION: focusing or hovering a balloon sweeps the highlighter over its target and draws its leader; findings flash a red revision cloud. JS off: all text, numbers and links present; leaders static.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
