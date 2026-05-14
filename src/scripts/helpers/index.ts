/**
 * Helpers Index
 *
 * Central export point for all helper utilities.
 * This allows for cleaner imports throughout the application.
 *
 * Usage:
 * import { devLog, safeString, formatDate } from '#src/scripts/helpers';
 */


export {
  initializeI18nextSync,
  i18n,
  t,
  nunjucksT,
  type ExpressLocaleLoader
} from './i18nLoader.js';