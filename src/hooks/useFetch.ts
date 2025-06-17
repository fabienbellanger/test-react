import { FetchAPI, FetchAPIError } from '../api/fetch';
import useAuth from './useAuth';

export default function useFetch() {
    const { logout } = useAuth();

    const sendJSON = async <T>(req: FetchAPI<T>) => {
        try {
            return await req.sendJSON<T>('test401');
        } catch (error) {
            if (error instanceof FetchAPIError) {
                if (error.unauthorized()) {
                    logout();
                }
            }
            throw error;
        }
    };

    const sendText = async <T>(req: FetchAPI<T>) => {
        try {
            return await req.sendText<T>('test401');
        } catch (error) {
            if (error instanceof FetchAPIError) {
                if (error.unauthorized()) {
                    logout();
                }
            }
            throw error;
        }
    };

    return {
        sendJson: sendJSON,
        sendText,
    };
}
