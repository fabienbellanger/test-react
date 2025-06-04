import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { AppTheme, toggleTheme } from '../../stores/AppStore.ts';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '../../stores/index.ts';
import { motion } from 'motion/react';

/**
 * Theme
 *
 */
export default function ThemeToggle() {
    const theme = useSelector((state: GlobalState) => state.app.theme);
    const dispatch = useDispatch();

    return (
        <button
            className="btn btn-link text-xl px-2"
            onClick={() => dispatch(toggleTheme())}
        >
            {theme === AppTheme.DARK ? (
                <motion.span
                    key="dark"
                    className="inline-block"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <MdOutlineLightMode className="text-yellow-500" />
                </motion.span>
            ) : (
                <motion.span
                    key="light"
                    className="inline-block"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <MdOutlineDarkMode className="text-base-content" />
                </motion.span>
            )}
        </button>
    );
}
