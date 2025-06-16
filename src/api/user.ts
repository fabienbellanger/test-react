import { API_BASE_URL } from './config';

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

export function getToken(req: GetTokenRequest): Promise<GetTokenResponse | boolean> {
    return fetch(`${API_BASE_URL}/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    }).then((response) => {
        if (!response.ok) {
            return false;
        }

        return response.json();
    });
}
