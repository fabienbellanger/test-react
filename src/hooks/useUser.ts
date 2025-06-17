import { useSelector } from 'react-redux';
import { GlobalState } from '../stores';

/**
 * User hook
 *
 */
export default function useUser() {
    const { lastname, firstname } = useSelector((state: GlobalState) => state.user);
    const fullname = `${firstname || ''} ${lastname || ''}`.trim();

    return {
        lastname,
        firstname,
        fullname,
    };
}
