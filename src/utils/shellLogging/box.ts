// Utility for drawing Unicode box borders in the terminal.

import { BOX_STYLES, config, type BoxStyle } from './constants/border';
import style, { type Style } from './style';
import type { Width, Content } from './types';

type CellCol = Width | { width: Width; content?: Content; span?: boolean; style?: Style };
type BorderCol = Width | { width: Width; span?: boolean };
type MidBorderCol = Width | { width: Width; span?: boolean; spanAbove?: boolean; spanBelow?: boolean };

export type BoxOptions = {
  style?: Style;
  boxStyle?: BoxStyle;
};

/**
 * Unicode box-drawing utilities for tables and bordered output.
 */
const box = {
  /**
   * Prints the top border. Each arg is the content width of a column.
   * @param args
   */
  top: (...args: [BoxOptions | BorderCol, ...BorderCol[]]): void => {
    const { cols, border, chars } = normalizeArgs<BoxOptions, BorderCol>(args);

    let result = chars.topLeft;
    const length = cols.length - 1;
    cols.forEach((col, i) => {
      const { width, span } = typeof col === 'number' ? { width: col } : col;
      result += chars.horizontal.repeat(width + 2);
      if (i < length) result += span ? chars.horizontal : chars.topJoin;
    });
    console.log(border(result + chars.topRight));
  },

  /**
   * Prints the bottom border. Each arg is the content width of a column.
   * @param args
   */
  bot: (...args: [BoxOptions | BorderCol, ...BorderCol[]]): void => {
    const { cols, border, chars } = normalizeArgs<BoxOptions, BorderCol>(args);

    let result = chars.botLeft;
    const length = cols.length - 1;
    cols.forEach((col, i) => {
      const { width, span } = typeof col === 'number' ? { width: col } : col;
      result += chars.horizontal.repeat(width + 2);
      if (i < length) result += span ? chars.horizontal : chars.botJoin;
    });
    console.log(border(result + chars.botRight));
  },

  /**
   * Prints a middle divider. Each arg is the content width of a column.
   * @param args
   */
  mid: (...args: [BoxOptions | MidBorderCol, ...MidBorderCol[]]): void => {
    const { cols, border, chars } = normalizeArgs<BoxOptions, MidBorderCol>(args);

    let result = chars.midLeft;
    const length = cols.length - 1;
    cols.forEach((col, i) => {
      const { width, span, spanAbove, spanBelow } = typeof col === 'number' ? { width: col } : col;

      result += chars.horizontal.repeat(width + 2);
      if (i < length) {
        if (spanAbove) result += chars.topJoin;
        else if (spanBelow) result += chars.botJoin;
        else if (span) result += chars.horizontal;
        else result += chars.midJoin;
      }
    });
    console.log(border(result + chars.midRight));
  },

  /**
   * Prints a content row. Each arg is a width (empty cell) or [width, content].
   * @param args
   */
  row: (...args: [BoxOptions | CellCol, ...CellCol[]]): void => {
    const { cols, border, chars } = normalizeArgs<BoxOptions, CellCol>(args);

    let result = border(chars.vertical);
    for (let i = 0; i < cols.length; i++) {
      const col = cols[i];
      let { width, content = '', span = false, style: cellStyle } = typeof col === 'number' ? { width: col } : col;

      if (span) {
        do {
          const nextCol = cols[++i];
          const { width: nextWidth, span: nextSpan } = typeof nextCol === 'number' ? { width: nextCol } : nextCol;

          width += nextWidth + 3; // absorb: separator (1) + next cell padding (2)
          if (!nextSpan) break;
        } while (i + 1 < cols.length);
      }

      const padded = String(content).padEnd(width);
      result += ` ${cellStyle ? style[cellStyle](padded) : padded} `;
      if (i < cols.length - 1) result += border(chars.separator);
    }
    console.log(result + border(chars.vertical));
  },
};

function normalizeArgs<Box extends BoxOptions, Col>(args: [Box | Col, ...Col[]]) {
  const [opts, cols] = isOptions(args[0]) ? [args[0] as Box, args.slice(1) as Col[]] : [{} as Box, args as Col[]];

  return {
    opts,
    cols,
    border: style[opts.style ?? 'border'],
    chars: BOX_STYLES[opts.boxStyle ?? config.defaultBoxStyle],
  };
}

function isOptions(arg: unknown): arg is BoxOptions {
  return typeof arg === 'object' && !Array.isArray(arg) && !('width' in arg!);
}

export default box;
