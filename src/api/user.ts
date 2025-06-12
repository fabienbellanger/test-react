import { API_BASE_URL } from './config';

export interface GetTokenRequest {
    username: string;
    password: string;
}

export interface GetTokenResponse {
    token: string;
    username: string;
}

export function getToken(req: GetTokenRequest): Promise<GetTokenResponse> {
    return fetch(`${API_BASE_URL}/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Failed to fetch token');
        }
        console.log(response);
        return response.json();
    });
}
