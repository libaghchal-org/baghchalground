// Basic game elements
export const sides = ['tiger', 'goat'] as const;
export type Side = (typeof sides)[number];

// Board coordinates
export const files = ['a', 'b', 'c', 'd', 'e'] as const;
export const ranks = ['1', '2', '3', '4', '5'] as const;
export type File = (typeof files)[number];
export type Rank = (typeof ranks)[number];
export type Key = 'a0' | `${File}${Rank}`;

// Piece definitions
export interface Piece {
  side: Side;
}

export interface Drop {
  key: Key;
  side: Side; // will always be 'goat' during placement
}

export type Pieces = Map<Key, Piece>;
export type PiecesDiff = Map<Key, Piece | undefined>;

// Position and movement
export type KeyPair = [Key, Key];
export type NumberPair = [number, number];
export type NumberQuad = [number, number, number, number];

export interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface MovePath {
  from: Key;
  to: Key;
  canCapture: boolean;
  captureOver?: Key;
}

export type LegalPaths = Map<Key, MovePath[]>;
export type Dests = Map<Key, Key[]>;

// Game state
export type GamePhase = 'placing' | 'moving';

export interface GameState {
  phase: GamePhase;
  goatsPlaced: number;
  goatsCaptured: number;
  goatsToPlace: number;
}

export interface MoveMetadata {
  captured?: Key;
  wasJump?: boolean;
  holdTime?: number;
}

// DOM Elements
export interface Elements {
  board: HTMLElement;
  wrap: HTMLElement;
  container: HTMLElement;
  ghost?: HTMLElement;
  svg?: SVGElement;
  customSvg?: SVGElement;
  autoPieces?: HTMLElement;
  boardLines?: SVGElement;
}

export interface Dom {
  elements: Elements;
  bounds: Memo<DOMRectReadOnly>;
  redraw: () => void;
  redrawNow: (skipSvg?: boolean) => void;
  unbind?: Unbind;
  destroyed?: boolean;
}

// Event handling
export type MouchEvent = Event & Partial<MouseEvent & TouchEvent>;

export interface KeyedNode extends HTMLElement {
  cgKey: Key;
}

export interface PieceNode extends KeyedNode {
  tagName: 'PIECE';
  cgPiece: string;
  cgAnimating?: boolean;
  cgFading?: boolean;
  cgDragging?: boolean;
  cgScale?: number;
}

// Board structure
export interface BoardLine {
  start: Key;
  end: Key;
  diagonal: boolean;
}

export type ValidMoves = {
  regular: MovePath[];
  captures: MovePath[];
};

// Utility types
export type Memo<A> = {
  (): A;
  clear: () => void;
};

export interface Timer {
  start: () => void;
  cancel: () => void;
  stop: () => number;
}

export type Redraw = () => void;
export type Unbind = () => void;
export type Milliseconds = number;

// Game results and display
export type GameResult = 'tigers-win' | 'goats-win' | null;
export type BrushColor = 'green' | 'red' | 'blue' | 'yellow';
export type IntersectionClasses = Map<Key, string>;
