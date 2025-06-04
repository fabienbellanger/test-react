import { useDispatch, useSelector } from 'react-redux';
import { AppDirection, toggleDirection } from '../../stores/AppStore';
import { GlobalState } from '../../stores';

/**
 * Theme
 *
 */
export default function DirectionToggle() {
    const direction = useSelector((state: GlobalState) => state.app.direction);
    const dispatch = useDispatch();

    return (
        <button
            className="btn btn-ghost"
            onClick={() => dispatch(toggleDirection())}
        >
            {direction === AppDirection.LTR ? 'RTL' : 'LTR'}
        </button>
    );
}
