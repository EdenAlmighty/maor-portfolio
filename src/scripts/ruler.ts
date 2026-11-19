// The ruling layer: draws leader lines on a drawing from live layout boxes, at one device
// pixel, and re-solves them when the layout changes. A drawing opts in with
// [data-ruled]; each balloon names its target with data-leader="<id>". Without
// JavaScript the drawing keeps its plain CSS leaders (.mp-ruled switches them off).

const SVG = 'http://www.w3.org/2000/svg';

function solve(drawing: HTMLElement) {
  // Balloons step aside once the layer is on (PathDrawing.astro); measure after that.
  drawing.classList.add('mp-ruled');
  let svg = drawing.querySelector<SVGSVGElement>(':scope > svg.mp-leaders');
  if (!svg) {
    svg = document.createElementNS(SVG, 'svg');
    svg.classList.add('mp-leaders');
    svg.setAttribute('aria-hidden', 'true');
    drawing.insertBefore(svg, drawing.firstChild);
  }
  const box = drawing.getBoundingClientRect();
  svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
  svg.setAttribute('width', String(box.width));
  svg.setAttribute('height', String(box.height));
  svg.replaceChildren();

  // Snap to the device pixel grid so a 1px line stays one pixel wide.
  const px = 1 / devicePixelRatio;
  const snap = (v: number) => Math.round(v * devicePixelRatio) / devicePixelRatio + px / 2;

  for (const balloon of drawing.querySelectorAll<HTMLElement>('[data-leader]')) {
    const target = drawing.querySelector<HTMLElement>(`#${balloon.dataset.leader}`);
    if (!target || !balloon.offsetParent) continue;
    const b = balloon.getBoundingClientRect();
    const t = target.getBoundingClientRect();
    const r = b.width / 2;
    const cx = b.left + r - box.left;
    const cy = b.top + r - box.top;
    // The leader ends on the target's top edge with a dot, as on a drawing.
    const tx = t.left + t.width / 2 - box.left;
    const ty = t.top - box.top;
    const angle = Math.atan2(ty - cy, tx - cx);
    const sx = cx + Math.cos(angle) * r;
    const sy = cy + Math.sin(angle) * r;

    const line = document.createElementNS(SVG, 'path');
    line.setAttribute('d', `M${snap(sx)} ${snap(sy)} L${snap(tx)} ${snap(ty)}`);
    line.setAttribute('stroke-width', String(Math.max(px, 1)));
    line.dataset.for = balloon.dataset.leader;
    const dot = document.createElementNS(SVG, 'circle');
    dot.setAttribute('cx', String(snap(tx)));
    dot.setAttribute('cy', String(snap(ty)));
    dot.setAttribute('r', '2.5');
    dot.dataset.for = balloon.dataset.leader;
    svg.appendChild(line);
    svg.appendChild(dot);
  }
}

const drawings = [...document.querySelectorAll<HTMLElement>('[data-ruled]')];
if (drawings.length) {
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) solve(entry.target as HTMLElement);
  });
  for (const d of drawings) {
    solve(d);
    observer.observe(d);
  }
  // Web fonts swap in after the first paint and move the boxes slightly.
  document.fonts?.ready.then(() => drawings.forEach(solve));
  new MutationObserver(() => drawings.forEach(solve)).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
}
