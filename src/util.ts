import * as cg from './types.js';

export const invRanks: readonly cg.Rank[] = [...cg.ranks].reverse();

// Generate all valid board positions
export const allKeys: readonly cg.Key[] = Array.prototype.concat(
  ...cg.files.map(c => cg.ranks.map(r => c + r)),
);

// Convert between position formats
export const pos2key = (pos: cg.NumberPair): cg.Key => allKeys[5 * pos[0] + pos[1]];

export const key2pos = (k: cg.Key): cg.NumberPair => [k.charCodeAt(0) - 97, k.charCodeAt(1) - 49];

export const allPos: readonly cg.NumberPair[] = allKeys.map(key2pos);

// Memoization utility
export function memo<A>(f: () => A): cg.Memo<A> {
  let v: A | undefined;
  const ret = (): A => {
    if (v === undefined) v = f();
    return v;
  };
  ret.clear = () => {
    v = undefined;
  };
  return ret;
}

// Performance timer
export const timer = (): cg.Timer => {
  let startAt: number | undefined;
  return {
    start() {
      startAt = performance.now();
    },
    cancel() {
      startAt = undefined;
    },
    stop() {
      if (!startAt) return 0;
      const time = performance.now() - startAt;
      startAt = undefined;
      return time;
    },
  };
};

// Get opposite side
export const oppositeSide = (s: cg.Side): cg.Side => (s === 'tiger' ? 'goat' : 'tiger');

// Calculate square distance between two positions
export const distanceSq = (pos1: cg.NumberPair, pos2: cg.NumberPair): number => {
  const dx = pos1[0] - pos2[0],
    dy = pos1[1] - pos2[1];
  return dx * dx + dy * dy;
};

// Compare two pieces
export const samePiece = (p1: cg.Piece, p2: cg.Piece): boolean => p1.side === p2.side;

// Position to pixel translation
export const posToTranslate =
  (bounds: DOMRectReadOnly) =>
  (pos: cg.NumberPair): cg.NumberPair => [(pos[0] * bounds.width) / 4, ((4 - pos[1]) * bounds.height) / 4];

// DOM manipulation utilities
export const translate = (el: HTMLElement, pos: cg.NumberPair): void => {
  el.style.transform = `translate(${pos[0]}px,${pos[1]}px)`;
};

export const translateAndScale = (el: HTMLElement, pos: cg.NumberPair, scale = 1): void => {
  el.style.transform = `translate(${pos[0]}px,${pos[1]}px) scale(${scale})`;
};

export const setVisible = (el: HTMLElement, v: boolean): void => {
  el.style.visibility = v ? 'visible' : 'hidden';
};

// Event handling
export const eventPosition = (e: cg.MouchEvent): cg.NumberPair | undefined => {
  if (e.clientX || e.clientX === 0) return [e.clientX, e.clientY!];
  if (e.targetTouches?.[0]) return [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
  return undefined;
};

export const isRightButton = (e: cg.MouchEvent): boolean => e.button === 2;

// DOM element creation
export const createEl = (tagName: string, className?: string): HTMLElement => {
  const el = document.createElement(tagName);
  if (className) el.className = className;
  return el;
};

export function computeSquareCenter(key: cg.Key, bounds: DOMRectReadOnly): cg.NumberPair {
  const pos = key2pos(key);
  return [bounds.left + (bounds.width * pos[0]) / 4, bounds.top + (bounds.height * (4 - pos[1])) / 4];
}
