/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 📦 Border Rules (Unicode Box-Drawing Characters)
 * ------------------------------------------------------------------------------------------------
 * Unicode box-drawing characters are used to draw borders and tables in the terminal.
 * Each style uses a consistent set of characters for corners, junctions, and lines.
 *
 *   single              double              heavy
 *   ┌───┬───┐           ╔═══╦═══╗           ┏━━━┳━━━┓
 *   │   │   │           ║   ║   ║           ┃   ┃   ┃
 *   ├───┼───┤           ╠═══╬═══╣           ┣━━━╋━━━┫
 *   └───┴───┘           ╚═══╩═══╝           ┗━━━┻━━━┛
 *
 *   double-v / single-h    single-v / double-h
 *   ╓───╥───╖              ╒═══╤═══╕
 *   ║   ║   ║              │   │   │
 *   ╟───╫───╢              ╞═══╪═══╡
 *   ╙───╨───╜              ╘═══╧═══╛
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

type BoxChars = {
  topLeft: string;
  topRight: string;
  botLeft: string;
  botRight: string;
  topJoin: string;
  topJoinBold: string;
  midLeft: string;
  midJoin: string;
  midJoinBold: string;
  midRight: string;
  botJoin: string;
  botJoinBold: string;
  horizontal: string;
  vertical: string;
  separator: string;
};

export type BoxStyle = keyof typeof BOX_STYLES;

export const BOX_STYLES = {
  single: {
    topLeft: '┌',
    topRight: '┐',
    botLeft: '└',
    botRight: '┘',
    topJoin: '┬',
    topJoinBold: '┬',
    midLeft: '├',
    midJoin: '┼',
    midJoinBold: '┼',
    midRight: '┤',
    botJoin: '┴',
    botJoinBold: '┴',
    horizontal: '─',
    vertical: '│',
    separator: '│',
  },
  double: {
    topLeft: '╔',
    topRight: '╗',
    botLeft: '╚',
    botRight: '╝',
    topJoin: '╤',
    topJoinBold: '╦',
    midLeft: '╠',
    midJoin: '╪',
    midJoinBold: '╬',
    midRight: '╣',
    botJoin: '╧',
    botJoinBold: '╩',
    horizontal: '═',
    vertical: '║',
    separator: '│',
  },
  heavy: {
    topLeft: '┏',
    topRight: '┓',
    botLeft: '┗',
    botRight: '┛',
    topJoin: '┳',
    topJoinBold: '┳',
    midLeft: '┣',
    midJoin: '╋',
    midJoinBold: '╋',
    midRight: '┫',
    botJoin: '┻',
    botJoinBold: '┻',
    horizontal: '━',
    vertical: '┃',
    separator: '┃',
  },
} satisfies Record<string, BoxChars>;

export const config = {
  defaultBoxStyle: 'double' as BoxStyle,
};
