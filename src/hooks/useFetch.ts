import { useDispatch } from 'react-redux';
import { FetchAPI, FetchAPIError } from '../api/fetch';
import { startLoading, stopLoading } from '../stores/AppStore';
import useAuth from './useAuth';

export default function useFetch() {
    const { logout } = useAuth();
    const dispatch = useDispatch();

    const sendJSON = async <T>(req: FetchAPI<T>, errorName?: string) => {
        dispatch(startLoading());

        try {
            return await req.sendJSON<T>(errorName);
        } catch (error) {
            if (error instanceof FetchAPIError) {
                if (error.unauthorized()) {
                    logout();
                }
            } else {
                throw error;
            }
        } finally {
            dispatch(stopLoading());
        }
    };

    const sendText = async <T>(req: FetchAPI<T>, errorName?: string) => {
        dispatch(startLoading());

        try {
            return await req.sendText<T>(errorName);
        } catch (error) {
            if (error instanceof FetchAPIError) {
                if (error.unauthorized()) {
                    logout();
                }
            } else {
                throw error;
            }
        } finally {
            dispatch(stopLoading());
        }
    };

    return {
        sendJson: sendJSON,
        sendText,
    };
}
