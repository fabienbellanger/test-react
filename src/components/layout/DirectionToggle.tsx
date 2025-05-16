import { useDispatch, useSelector } from 'react-redux';
import { toggleDirection } from '../../stores/AppStore';
import { GlobalState } from '../../stores';

/**
 * Theme
 *
 */
export default function DirectionToggle() {
    const direction = useSelector((state: GlobalState) => state.app.direction);
    const dispatch = useDispatch();

    return (
        <button className="btn" onClick={() => dispatch(toggleDirection())}>
            {direction === 'rtl' ? 'LTR' : 'RTL'}
        </button>
    );
}
