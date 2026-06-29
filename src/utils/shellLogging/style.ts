// Utility for styling text in terminal output using ANSI escape codes.

import { styleCode } from './settings';

/**
 * Semantic text styles for terminal output.
 */
export default {
  error: wrapCode(styleCode.error),
  success: wrapCode(styleCode.success),
  warning: wrapCode(styleCode.warning),
  info: wrapCode(styleCode.info),
  highlight: wrapCode(styleCode.highlight),
  muted: wrapCode(styleCode.muted),
  debug: wrapCode(styleCode.debug),
  border: wrapCode(styleCode.border),
  bold: wrapCode(styleCode.bold),
};

/**
 * Wraps text with an ANSI escape code and resets styling after.
 *
 * @param code
 */
function wrapCode(code: string) {
  return (text: string) => `${code}${text}${styleCode.reset}`;
}
