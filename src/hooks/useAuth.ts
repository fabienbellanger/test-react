import { getToken, GetTokenRequest } from '../api/user';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../stores/AppStore';
import { clearUser, setUser } from '../stores/UserStore';
import { useNavigate } from 'react-router';

const HOME_ROUTE = '/todo';

/**
 * Auth hook
 *
 */
export default function useAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            dispatch(startLoading());

            const response = await getToken({
                username,
                password,
            } as GetTokenRequest);

            dispatch(setUser(response));

            navigate(HOME_ROUTE, { replace: true });

            return true;
        } catch (error) {
            console.error(error);

            dispatch(clearUser());

            return false;
        } finally {
            dispatch(stopLoading());
        }
    };

    const logout = () => {
        dispatch(clearUser());

        navigate('/login', { replace: true });
    };

    const isAuthenticated = () => {
        const userSession = sessionStorage.getItem('user');
        if (userSession) {
            const user = JSON.parse(userSession);

            return user && user.token && user.token.length > 0;
        }
        return false;
    };

    const redirectToHomeIfAuthenticated = () => {
        if (isAuthenticated()) {
            navigate(HOME_ROUTE, { replace: true });
        }
    };

    return {
        login,
        logout,
        isAuthenticated,
        redirectToHomeIfAuthenticated,
    };
}
