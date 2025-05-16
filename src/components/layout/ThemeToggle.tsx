import { MdLightMode, MdDarkMode } from 'react-icons/md';
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
        <button className="btn text-xl" onClick={() => dispatch(toggleTheme())}>
            {theme === AppTheme.DARK ? (
                <MdLightMode className="text-yellow-600" />
            ) : (
                <MdDarkMode className="text-blue-900" />
            )}
        </button>
    );
}
