import { useCallback, useState } from 'react';
import { getToken, GetTokenRequest } from '../api/user';

/**
 * Auth hook
 *
 */
export default function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = useCallback(async (username: string, password: string): Promise<boolean> => {
        const response = await getToken({
            username,
            password,
        } as GetTokenRequest);

        if (response === false) {
            setIsAuthenticated(false);

            return false;
        }

        setIsAuthenticated(true);
        return true;
    }, []);

    return {
        isAuthenticated,
        login,
    };
}
