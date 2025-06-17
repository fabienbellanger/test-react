import { getToken, GetTokenRequest } from '../api/user';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../stores/AppStore';
import { useState } from 'react';
import { clearUser, setUser } from '../stores/UserStore';
import { useNavigate } from 'react-router';

const HOME_ROUTE = '/todo';

/**
 * Auth hook
 *
 */
export default function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            dispatch(startLoading());

            const response = await getToken({
                username,
                password,
            } as GetTokenRequest);

            if (response === false) {
                setIsAuthenticated(false);
                dispatch(clearUser());

                return false;
            }

            setIsAuthenticated(true);
            dispatch(setUser(response));

            navigate(HOME_ROUTE, { replace: true });

            return true;
        } catch (error) {
            console.error('Login error:', error);
            setIsAuthenticated(false);
            dispatch(clearUser());

            return false;
        } finally {
            dispatch(stopLoading());
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        dispatch(clearUser());

        navigate('/login', { replace: true });
    };

    const connected = () => {
        const userSession = sessionStorage.getItem('user');
        if (userSession) {
            const user = JSON.parse(userSession);
            if (user && user.token && user.token.length > 0) {
                setIsAuthenticated(true);
                navigate(HOME_ROUTE, { replace: true });
            }
        }
    };

    return {
        isAuthenticated,
        login,
        logout,
        connected,
    };
}
