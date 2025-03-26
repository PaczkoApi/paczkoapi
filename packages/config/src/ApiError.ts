/**
 * API error
 */
export class ApiError extends Error {
    /**
     * Constructor
     */
    constructor(
        message: string,
        public readonly statusCode?: number,
        public readonly errors?: string[],
        public readonly response?: Response,
    ) {
        super(message);
    }
}
