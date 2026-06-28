// Utility for styling text in terminal output using ANSI escape codes.

/**
 * Semantic text styles for terminal output.
 */
export default {
  error: wrapCode('\x1b[31m'), // red
  success: wrapCode('\x1b[32m'), // green
  warning: wrapCode('\x1b[33m'), // yellow
  info: wrapCode('\x1b[34m'), // blue
  highlight: wrapCode('\x1b[36m'), // cyan
  muted: wrapCode('\x1b[90m'), // gray
  debug: wrapCode('\x1b[35m'), // magenta
  bold: wrapCode('\x1b[1m'),
};

/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 📐 Style Rules (ANSI Escape Sequences)
 * -------------------------------------------------------------------------------------------------
 * Escape Sequences Example:
 *   \033[1;31m   =>   <\033> <[> <1;31> <m>
 *
 *   <\033> : Escape Code prefixed (`ESC`, ANSI value 27)
 *              - Octal: \033
 *              - Hexadecimal: \x1b
 *              - Unicode: \u001b
 *   <[>    : Control Sequence Introducer SCI
 *   <1;31> : Font Style, Font Color and Background Color, separate by ;, can have many styles, 1
 *            color and 1 background
 *   <m>    : End of an ANSI Escape Sequence
 *
 * Font Style Codes:
 *  ╔═══════════════╤══════════╤════════════╗
 *  ║ Font Style    │ Set Code │ Reset Code ║
 *  ╠═══════════════╪══════════╪════════════╣
 *  ║ bold          │        1 │         22 ║
 *  ║ dim           │        2 │         22 ║
 *  ║ italic        │        3 │         23 ║
 *  ║ underline     │        4 │         24 ║
 *  ║ blinking      │        5 │         25 ║
 *  ║ inverse       │        7 │         27 ║
 *  ║ hidden        │        8 │         28 ║
 *  ║ strikethrough │        9 │         29 ║
 *  ╠═══════════════╪══════════╪════════════╣
 *  ║ Color         │ Font     │ Background ║
 *  ╠═══════════════╪══════════╪════════════╣
 *  ║ black         │       30 │         40 ║
 *  ║ red           │       31 │         41 ║
 *  ║ green         │       32 │         42 ║
 *  ║ yellow        │       33 │         43 ║
 *  ║ blue          │       34 │         44 ║
 *  ║ magenta       │       35 │         45 ║
 *  ║ cyan          │       36 │         46 ║
 *  ║ white         │       37 │         47 ║
 *  ║ reset default │       39 │         49 ║
 *  ╠═══════════════╧══════════╪════════════╣
 *  ║ RESET ALL                │          0 ║
 *  ╚══════════════════════════╧════════════╝
 */

/**
 * Wraps text with an ANSI escape code and resets styling after.
 *
 * @param code
 */
function wrapCode(code: string) {
  return (text: string) => `${code}${text}\x1b[0m`;
}
