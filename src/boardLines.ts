// src/boardLines.ts

import { State } from './state.js';
import { key2pos, createEl } from './util.js';
import { createElement as createSVG, setAttributes } from './svg.js';
import { whitePov } from './board.js';
import * as cg from './types.js';

// Line drawing utilities
function renderLine(
  startKey: cg.Key,
  endKey: cg.Key,
  isDiagonal: boolean,
  lineGroup: SVGElement,
  bounds: DOMRectReadOnly,
  asWhite: boolean,
): void {
  const start = key2pos(startKey);
  const end = key2pos(endKey);

  // Convert board coordinates to SVG viewport coordinates (-2.5 to 2.5 range)
  const startX = (start[0] - 2) * 1.25;
  const startY = (2 - start[1]) * 1.25;
  const endX = (end[0] - 2) * 1.25;
  const endY = (2 - end[1]) * 1.25;

  const line = createSVG('line');
  setAttributes(line, {
    x1: startX,
    y1: startY,
    x2: endX,
    y2: endY,
    stroke: '#000000',
    'stroke-width': isDiagonal ? '0.05' : '0.05',
    'stroke-linecap': 'round',
  });

  lineGroup.appendChild(line);
}

export function renderBoardLines(state: State): void {
  const lineGroup = state.dom.elements.svg?.querySelector('.baghchal-lines');
  if (!lineGroup) return;

  // Clear existing lines
  lineGroup.innerHTML = '';

  const asWhite = whitePov(state);
  const bounds = state.dom.bounds();

  // Render all the predefined lines from state
  for (const line of state.boardLines) {
    renderLine(line.start, line.end, line.diagonal, lineGroup, bounds, asWhite);
  }
}

export function renderResizedBoardLines(state: State): void {
  renderBoardLines(state);
}
