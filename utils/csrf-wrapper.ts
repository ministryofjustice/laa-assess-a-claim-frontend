import type { Application, Request, Response, NextFunction } from 'express';
import config from '#config.js';
import { csrfSync } from 'csrf-sync';

/**
 * Type guard to check if the request body contains a '_csrf' field.
 * @param {unknown} body - The request body to check.
 * @returns {boolean} True if body contains '_csrf', otherwise false.
 */
function hasCsrfField(body: unknown): body is { _csrf: unknown } {
  return body !== null &&
         body !== undefined &&
         typeof body === 'object' &&
         '_csrf' in body;
}

/**
 * Sets up CSRF protection middleware, excluding OIDC routes defined in config.
 * @param {Application} app Express application instance
 */
export function setupCsrfWithOidcExclusion(app: Application): void {
  const { csrfSynchronisedProtection } = csrfSync({
    
    /**
     * Extracts the CSRF token from the request body.
     * @param {Request} req Express request object
     * @returns {string | undefined} The CSRF token if present, otherwise undefined
     */
    getTokenFromRequest: (req: Request): string | undefined => {
  if (hasCsrfField(req.body) && typeof req.body._csrf === 'string') {
    return req.body._csrf;
  }
  return undefined;
},
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (config.oidc.excludedPaths.includes(req.path.toLowerCase())) {
      next();
      return;
    }
    csrfSynchronisedProtection(req, res, next);
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (typeof req.csrfToken === 'function') {
      res.locals.csrfToken = req.csrfToken();
    }
    next();
  });
}
