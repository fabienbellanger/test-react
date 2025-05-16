import useDirection from '../../hooks/useDirection';

/**
 * Theme
 *
 */
export default function DirectionToggle() {
    const { isRTL, toggleDirection } = useDirection();

    return (
        <button className="btn" onClick={toggleDirection}>
            {isRTL ? 'LTR' : 'RTL'}
        </button>
    );
}
