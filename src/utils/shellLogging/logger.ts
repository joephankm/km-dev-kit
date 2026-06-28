// Logger for terminal output with semantic styling.

import style from './style';

/**
 * Terminal logger with styled output for each log level.
 */
const logger = {
  info: (msg: string) => console.info(style.info(msg)),
  warn: (msg: string) => console.warn(style.warning(msg)),
  error: (msg: string) => console.error(style.error(msg)),
  debug: (msg: string) => console.debug(style.debug(msg)),
};

export default logger;
