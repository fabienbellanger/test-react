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

/**
 * FetchAPI class for making HTTP requests
 *
 */
export class FetchAPI<T> {
    url: string;
    method: FetchAPIMethod;
    body?: T;
    headers: Record<string, string>;

    /**
     * Constructor for FetchAPI
     *
     * @param {string} url  URL to send the request to
     * @param {FetchAPIMethod} method  HTTP method
     * @param {T} body Body
     * @param {Record<string, string>} headers Headers
     */
    constructor(url: string, method: FetchAPIMethod, body?: T, headers?: Record<string, string>) {
        this.url = url;
        this.method = method;
        this.body = body;
        this.headers = {
            'Content-Type': 'application/json',
            ...headers,
        };
    }

    /**
     * Sends a JSON request to the specified URL
     *
     * @returns {Promise<R>} Promise resolving to the response data
     */
    async sendJson<R>(): Promise<R> {
        try {
            const response = await fetch(this.url, {
                method: this.method,
                headers: this.headers,
                body: this.body ? JSON.stringify(this.body) : undefined,
            });

            if (!response.ok) {
                throw new FetchAPIError('FetchAPIError', response.status, await response.text());
            }

            return response.json() as Promise<R>;
        } catch (error) {
            if (error instanceof FetchAPIError) {
                throw error;
            }
            throw new FetchAPIError(
                'FetchAPI Network Error',
                500,
                typeof error === 'object' && error !== null && 'toString' in error
                    ? (error as { toString: () => string }).toString()
                    : String(error) || 'Unknown error',
            );
        }
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
        super(`${message}: ${response}`);
        this.statusCode = statusCode;
    }

    unauthorized(): boolean {
        return this.statusCode === 401;
    }

    notFound(): boolean {
        return this.statusCode === 404;
    }

    serverError(): boolean {
        return this.statusCode >= 500 && this.statusCode < 600;
    }
}
