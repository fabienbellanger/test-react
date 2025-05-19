import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { AppTheme, toggleTheme } from '../../stores/AppStore.ts';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '../../stores/index.ts';

/**
 * Theme
 *
 */
export default function ThemeToggle() {
    const theme = useSelector((state: GlobalState) => state.app.theme);
    const dispatch = useDispatch();

    return (
        <button
            className="btn btn-ghost text-xl px-2"
            onClick={() => dispatch(toggleTheme())}
        >
            {theme === AppTheme.DARK ? (
                <MdOutlineDarkMode />
            ) : (
                <MdOutlineLightMode className="text-yellow-500" />
            )}
        </button>
    );
}
