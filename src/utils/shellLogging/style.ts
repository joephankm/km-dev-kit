// Utility for styling text in terminal output using ANSI escape codes.

import { styleCode } from './constants/style';

/**
 * Semantic text styles for terminal output.
 */
const style = {
  error: wrapCode(styleCode.error),
  success: wrapCode(styleCode.success),
  warning: wrapCode(styleCode.warning),
  info: wrapCode(styleCode.info),
  highlight: wrapCode(styleCode.highlight),
  muted: wrapCode(styleCode.muted),
  debug: wrapCode(styleCode.debug),
  border: wrapCode(styleCode.border),
  title: wrapCode(styleCode.title),
  label: wrapCode(styleCode.label),
};

export type Style = keyof typeof style;

/**
 * Wraps text with an ANSI escape code and resets styling after.
 *
 * @param code
 */
function wrapCode(code: string) {
  return (text: string) => `${code}${text}${styleCode.reset}`;
}

export default style;
