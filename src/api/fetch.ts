export enum FetchAPIMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
    CONNECT = 'CONNECT',
    TRACE = 'TRACE',
}

const UNKNOWN_ERROR = 'unknown error';

/**
 * FetchAPI class for making HTTP requests
 *
 */
export class FetchAPI<T> {
    url: string;
    method: FetchAPIMethod;
    body?: T;
    headers: Record<string, string>;
    credentials?: boolean;

    /**
     * Constructor for FetchAPI
     *
     * @param {string} url  URL to send the request to
     * @param {FetchAPIMethod} method  HTTP method
     * @param {T} body Body
     * @param {Record<string, string>} headers Headers
     * @param {boolean} credentials Whether to include credentials (default: false)
     * @throws {FetchAPIError} Throws an error if the request fails
     */
    constructor(
        url: string,
        method: FetchAPIMethod,
        body?: T,
        headers?: Record<string, string>,
        credentials: boolean = false,
    ) {
        this.url = url;
        this.method = method;
        this.body = body;
        this.headers = {
            'Content-Type': 'application/json',
            ...headers,
        };

        // Set credentials
        const token = sessionStorage.getItem('token');
        if (credentials && token && token.length > 0) {
            this.headers['Authorization'] = `Bearer ${token}`;
        }
    }

    private async send<R>(type: 'json' | 'text', errorName: string = UNKNOWN_ERROR): Promise<R> {
        try {
            const response = await fetch(this.url, {
                method: this.method,
                headers: this.headers,
                body: this.body ? JSON.stringify(this.body) : undefined,
            });

            if (!response.ok) {
                throw new FetchAPIError(errorName, response.status, await response.text());
            }

            return type === 'json' ? response.json() : (response.text() as Promise<R>);
        } catch (error) {
            if (error instanceof FetchAPIError) {
                throw error;
            }
            throw new FetchAPIError(
                'network error',
                500,
                typeof error === 'object' && error !== null && 'toString' in error
                    ? (error as { toString: () => string }).toString()
                    : String(error) || UNKNOWN_ERROR,
            );
        }
    }

    /**
     * Sends a JSON request to the specified URL
     *
     * @param {string} errorName Name of the error for logging
     * @returns {Promise<R>} Promise resolving to the response data
     */
    async sendJSON<R>(errorName: string = UNKNOWN_ERROR): Promise<R> {
        return this.send('json', errorName);
    }

    /**
     * Sends a text request to the specified URL
     *
     * @param {string} errorName Name of the error for logging
     * @returns {Promise<R>} Promise resolving to the response data
     */
    async sendText<R>(errorName: string = UNKNOWN_ERROR): Promise<R> {
        return this.send('text', errorName);
    }
}

/**
 * Custom error class for FetchAPI errors
 *
 * @extends Error
 */
export class FetchAPIError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number, response: string) {
        super(`[${message}] ${response}`);
        this.statusCode = statusCode;
    }

    /**
     * Checks if the error is unauthorized (HTTP 401)
     *
     * @returns {boolean} True if the error is unauthorized, false otherwise
     */
    unauthorized(): boolean {
        return this.statusCode === 401;
    }

    /**
     * Checks if the error is forbidden (HTTP 403)
     *
     * @returns {boolean} True if the error is forbidden, false otherwise
     */
    notFound(): boolean {
        return this.statusCode === 404;
    }

    /**
     * Checks if the error is a bad request (HTTP 400)
     *
     * @returns {boolean} True if the error is a bad request, false otherwise
     */
    badRequest(): boolean {
        return this.statusCode === 400;
    }

    /**
     * Checks if the error is a server error (HTTP 500)
     *
     * @returns {boolean} True if the error is a server error, false otherwise
     */
    serverError(): boolean {
        return this.statusCode >= 500 && this.statusCode < 600;
    }
}
