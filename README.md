# Baghchalground

_Baghchalground_ is a free/libre open source baghchal UI developed for
[baghchal.org](https://baghchal.org).
It targets modern browsers, as well as mobile development using Cordova.

## License

Baghchalground is distributed under the **GPL-3.0 license** (or any later version,
at your option).
When you use Baghchalground for your website, your combined work may be
distributed only under the GPL. **You must release your source code** to the
users of your website.

Please read more about GPL for JavaScript on [greendrake.info](https://greendrake.info/publications/js-gpl).

## Features

Baghchalground is designed to fulfill all baghchal.org web and mobile apps needs, so it is pretty featureful.

- Well typed with TypeScript
- Fast. Uses a custom DOM diff algorithm to reduce DOM writes to the absolute minimum.
- Small footprint: 10K gzipped (31K unzipped). No dependencies.
- SVG drawing of circles, arrows, and custom user shapes on the board
- Arrows snap to valid moves. Freehand arrows can be drawn by dragging the mouse off the board and back while drawing an arrow.
- Entirely configurable and reconfigurable at any time
- Styling with CSS only: board and pieces can be changed by simply switching a class
- Fluid layout: board can be resized at any time
- Full mobile support (touchstart, touchmove, touchend)
- Move pieces by click
- Move pieces by drag & drop
  - Minimum distance before drag
  - Centralisation of the piece under the cursor
  - Piece ghost element
  - Drop off revert or trash
- Premove by click or drag
- Drag new pieces onto the board
- Animation of pieces: moving and fading away
- Display last move, move destinations, and premove destinations
- Import and export positions in FEN notation
- User callbacks
- No baghchal logic inside

## Installation

```sh
npm install --save baghchalground
```

### Usage

```js
import { Baghchalground } from 'baghchalground';

const config = {};
const ground = Baghchalground(document.body, config);
```

## Documentation

- [Config types](https://github.com/libaghchal-org/baghchalground/tree/master/src/config.ts)
- [Default config values](https://github.com/libaghchal-org/baghchalground/tree/master/src/state.ts)
- [API type signatures](https://github.com/libaghchal-org/baghchalground/tree/master/src/api.ts)
- [Simple standalone example](https://github.com/libaghchal-org/baghchalground/blob/master/demo.html)
- [Base CSS](https://github.com/libaghchal-org/baghchalground-examples/blob/master/assets/baghchalground.css)

## Development

Install build dependencies:

```sh
pnpm install
```

To build the node module:

```sh
pnpm run compile --watch
```

To build the standalone:

```sh
pnpm run dist
```
