import { getToken, GetTokenRequest } from '../api/user';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../stores/AppStore';
import { clearUser, setUser } from '../stores/UserStore';
import { useNavigate } from 'react-router';
import { HOMEPAGE } from '../Router';

/**
 * Auth hook
 *
 */
export default function useAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /**
     * Login authenticates the user with the provided credentials
     *
     * @param {string} username Username
     * @param {string} password Password
     */
    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            dispatch(startLoading());

            const response = await getToken({
                username,
                password,
            } as GetTokenRequest);

            dispatch(setUser(response));

            navigate(HOMEPAGE, { replace: true });

            return true;
        } catch (error) {
            console.error(error);

            dispatch(clearUser());

            return false;
        } finally {
            dispatch(stopLoading());
        }
    };

    /**
     * Logout clears the user session and redirects to the login page
     *
     */
    const logout = () => {
        dispatch(clearUser());

        navigate('/login', { replace: true });
    };

    /**
     * Checks if the user is authenticated
     *
     */
    const isAuthenticated = () => {
        const userSession = sessionStorage.getItem('user');
        if (userSession) {
            const user = JSON.parse(userSession);

            return user && user.token && user.token.length > 0;
        }
        return false;
    };

    /**
     * Redirects to the home page if the user is authenticated
     *
     */
    const redirectToHomeIfAuthenticated = () => {
        if (isAuthenticated()) {
            navigate(HOMEPAGE, { replace: true });
        }
    };

    return {
        login,
        logout,
        isAuthenticated,
        redirectToHomeIfAuthenticated,
    };
}
