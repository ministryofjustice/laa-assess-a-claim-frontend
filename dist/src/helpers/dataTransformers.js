/**
 * Data Transformation Helpers
 *
 * Utility functions for safely transforming and validating data from JSON fixtures
 */
/**
 * Safely get string value from unknown data
 * @param {unknown} value Value to convert
 * @returns {string} String value or empty string
 */
export function safeString(value) {
    if (value === null || value === undefined) {
        return '';
    }
    if (typeof value === 'string') {
        return value;
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
        return String(value);
    }
    return '';
}
/**
 * Safely get optional string value from unknown data
 * @param {unknown} value Value to convert
 * @returns {string | undefined} String value or undefined
 */
export function safeOptionalString(value) {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === 'string') {
        return value;
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
        return String(value);
    }
    return undefined;
}
/**
 * Type guard to check if value is a record object
 * @param {unknown} value Value to check
 * @returns {boolean} True if value is a record object
 */
export function isRecord(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
/**
 * Safely extract a string value from a record object
 * @param {unknown} obj - Object to extract from
 * @param {string} key - Key to extract
 * @returns {string | null} String value or null if not found/not string
 */
export function safeStringFromRecord(obj, key) {
    if (!isRecord(obj) || !(key in obj)) {
        return null;
    }
    const { [key]: value } = obj;
    return typeof value === 'string' && value.trim() !== '' ? value : null;
}
/**
 * Check if an object has a specific property (type guard)
 * @param {unknown} obj - Object to check
 * @param {string} key - Key to check for
 * @returns {boolean} True if object has the property
 */
export function hasProperty(obj, key) {
    return isRecord(obj) && key in obj;
}
//# sourceMappingURL=dataTransformers.js.map