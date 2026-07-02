import pkg from '../../package.json' with { type: 'json' };
import { logger, descriptions } from '@/utils/shellLogging';
import os from 'os';

descriptions({
  width: 'large',
  data: [
    {
      title: 'Environment',
      rows: process.env,
      wrapText: true,
    },
    {
      title: 'Runtime Info',
      rows: {
        'Node version': process.version,
        Platform: `${process.platform} (${os.arch()})`,
        Hostname: os.hostname(),
        PID: process.pid,
        'Uptime (s)': Math.floor(process.uptime()),
        'Memory (MB)': `${(process.memoryUsage().rss / 1024 / 1024).toFixed(1)} rss`,
      },
    },
  ],
});

logger.info(`Hello ${pkg.author}, welcome to KM Dev Kit`);
