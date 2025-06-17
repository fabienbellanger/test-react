import { API_BASE_URL } from './config';
import { FetchAPI, FetchAPIMethod } from './fetch';

export interface GetTokenRequest {
    username: string;
    password: string;
}

export interface GetTokenResponse {
    lastname: string;
    firstname: string;
    token: string;
    username: string;
}

/**
 * Get user token from the server
 *
 *  @param {GetTokenRequest} req Request parameters containing username and password
 *  @returns {Promise<GetTokenResponse>} Promise resolving to the user token and details
 *  @throws {FetchAPIError}
 */
export async function getToken(req: GetTokenRequest): Promise<GetTokenResponse> {
    const request = new FetchAPI<GetTokenRequest>(`${API_BASE_URL}/token`, FetchAPIMethod.POST, req);

    return await request.sendJSON<GetTokenResponse>('getToken');
}
