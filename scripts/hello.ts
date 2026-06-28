import pkg from '../package.json' with { type: 'json' };
import { logger } from '@/utils/shellLogging';

logger.info(`Hello ${pkg.author}, welcome to KM Dev Kit`);
