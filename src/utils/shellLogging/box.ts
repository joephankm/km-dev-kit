// Utility for drawing Unicode box borders in the terminal.

import { boxChars } from './settings';
import styleObj from './style';

type Col = number | [number, string];

export type BoxOptions = {
  style?: keyof typeof styleObj;
};

function isOptions(arg: unknown): arg is BoxOptions {
  return typeof arg === 'object' && arg !== null && !Array.isArray(arg);
}

function getBorderStyle(opts: BoxOptions) {
  return styleObj[opts.style ?? 'border'];
}

/** Unicode box-drawing utilities for tables and bordered output. */
export const box = {
  /** Prints the top border. Each arg is the content width of a column. */
  top: (...args: (BoxOptions | number)[]): void => {
    const [opts, widths] = isOptions(args[0]) ? [args[0], args.slice(1) as number[]] : [{}, args as number[]];
    const borderStyle = getBorderStyle(opts);
    console.log(
      borderStyle(
        boxChars.topLeft + widths.map(w => boxChars.horizontal.repeat(w + 2)).join(boxChars.topJoin) + boxChars.topRight
      )
    );
  },

  /** Prints a middle divider. Each arg is the content width of a column. */
  mid: (...args: (BoxOptions | number)[]): void => {
    const [opts, widths] = isOptions(args[0]) ? [args[0], args.slice(1) as number[]] : [{}, args as number[]];
    const borderStyle = getBorderStyle(opts);
    console.log(
      borderStyle(
        boxChars.midLeft + widths.map(w => boxChars.horizontal.repeat(w + 2)).join(boxChars.midJoin) + boxChars.midRight
      )
    );
  },

  /** Prints the bottom border. Each arg is the content width of a column. */
  bot: (...args: (BoxOptions | number)[]): void => {
    const [opts, widths] = isOptions(args[0]) ? [args[0], args.slice(1) as number[]] : [{}, args as number[]];
    const borderStyle = getBorderStyle(opts);
    console.log(
      borderStyle(
        boxChars.botLeft + widths.map(w => boxChars.horizontal.repeat(w + 2)).join(boxChars.botJoin) + boxChars.botRight
      )
    );
  },

  /** Prints a content row. Each arg is a width (empty cell) or [width, content]. */
  row: (...args: (BoxOptions | Col)[]): void => {
    const [opts, cols] = isOptions(args[0]) ? [args[0], args.slice(1) as Col[]] : [{}, args as Col[]];
    const borderStyle = getBorderStyle(opts);
    const cells = cols.map(col => {
      const [width, content = ''] = typeof col === 'number' ? [col] : col;
      return ` ${content.padEnd(width)} `;
    });
    console.log(
      borderStyle(boxChars.vertical) + cells.join(borderStyle(boxChars.separator)) + borderStyle(boxChars.vertical)
    );
  },
};
