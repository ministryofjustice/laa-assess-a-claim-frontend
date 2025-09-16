import config from '#config.js';
/**
 * Middleware setup function to attach configuration settings to response locals.
 * This makes config values accessible in all templates rendered by the app.
 *
 * @param {Application} app - The Express application instance.
 */
export const setupConfig = (app) => {
    /**
     * Middleware to add config to response locals.
     *
     * @param {Request} req - The Express request object.
     * @param {Response} res - The Express response object.
     * @param {NextFunction} next - The next middleware function in the stack.
     */
    const configMiddleware = (req, res, next) => {
        res.locals.config = config;
        next();
    };
    app.use(configMiddleware);
};
//# sourceMappingURL=setupConfigs.js.map