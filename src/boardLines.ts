import { State } from './state.js';
import { key2pos } from './util.js';
import { createElement as createSVG, setAttributes } from './svg.js';
import * as cg from './types.js';

// Line drawing utilities
function renderLine(startKey: cg.Key, endKey: cg.Key, lineGroup: SVGElement): void {
  const start = key2pos(startKey);
  const end = key2pos(endKey);

  // Convert board coordinates to SVG viewport coordinates (-2.5 to 2.5 range)
  const startX = (start[0] * 4) / 4 - 2;
  const startY = -((start[1] * 4) / 4) + 2;
  const endX = (end[0] * 4) / 4 - 2;
  const endY = -((end[1] * 4) / 4) + 2;

  const line = createSVG('line');
  setAttributes(line, {
    x1: startX,
    y1: startY,
    x2: endX,
    y2: endY,
    stroke: '#000000',
    'stroke-width': '0.03',
    'stroke-linecap': 'round',
  });

  lineGroup.appendChild(line);
}

export function renderBoardLines(state: State): void {
  const lineGroup = state.dom.elements.svg?.querySelector('.baghchal-lines');
  if (!(lineGroup instanceof SVGElement)) return;

  // Clear existing lines
  lineGroup.innerHTML = '';

  // Render all the predefined lines from state
  for (const line of state.boardLines) {
    renderLine(line.start, line.end, lineGroup);
  }
}

export function renderResizedBoardLines(state: State): void {
  renderBoardLines(state);
}
