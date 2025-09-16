// Import GOV.UK Frontend
import { initAll as initGOVUK } from "govuk-frontend";
// Import MOJ Frontend
import { initAll as initMOJ } from "@ministryofjustice/frontend";
/**
 * Initializes both GOV.UK Frontend and MOJ Frontend packages.
 * Only runs in browser environment and includes error handling.
 *
 * @returns {void}
 */
const initializeFrontendPackages = () => {
    if (typeof window !== 'undefined') {
        try {
            initGOVUK();
            initMOJ();
            // Only log in development/debug mode
            if (process.env.NODE_ENV !== 'production') {
                console.log('Frontend packages loaded and initialized');
            }
        }
        catch (error) {
            // Always log errors, even in production
            console.error('Frontend initialization error:', error);
        }
    }
};
// Initialize the frontend packages
initializeFrontendPackages();
//# sourceMappingURL=frontend-packages-entry.js.map