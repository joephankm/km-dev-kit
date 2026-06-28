// Task status logger for terminal output.

import style from './style';

/** Logs the status of a running task with styled icons. */
export const status = {
  running: (msg: string) => console.info(style.info(`● ${msg}`)),
  success: (msg: string) => console.info(style.success(`✓ ${msg}`)),
  warn: (msg: string) => console.warn(style.warning(`⚠ ${msg}`)),
  error: (msg: string) => console.error(style.error(`✗ ${msg}`)),
};
