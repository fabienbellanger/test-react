import { createSlice } from '@reduxjs/toolkit';

export enum AppTheme {
    LIGHT = 'light',
    DARK = 'dark',
}

export enum AppDirection {
    LTR = 'ltr',
    RTL = 'rtl',
}

/**
 * Application state
 *
 * @property {string} theme Theme of the application (dark or light)
 * @property {string} direction Direction of the application (ltr or rtl)
 */
export interface AppState {
    theme: AppTheme;
    direction: AppDirection;
}

export const AppSlice = createSlice({
    name: 'app',
    initialState: {
        theme:
            document.documentElement.getAttribute('data-theme') ??
            AppTheme.DARK,
        direction:
            document.documentElement.getAttribute('dir') ?? AppDirection.LTR,
    } as AppState,
    reducers: {
        /**
         * Toggle theme
         *
         * @param {AppState} state State
         */
        toggleTheme: (state) => {
            let newTheme = state.theme;
            if (state.theme === AppTheme.DARK) {
                newTheme = AppTheme.LIGHT;
            } else {
                newTheme = AppTheme.DARK;
            }
            state.theme = newTheme;
            document.documentElement.setAttribute('data-theme', newTheme);
        },
        /**
         * Toggle direction
         *
         * @param {AppState} state State
         */
        toggleDirection: (state) => {
            let newDirection = state.direction;
            if (state.direction === AppDirection.LTR) {
                newDirection = AppDirection.RTL;
            } else {
                newDirection = AppDirection.LTR;
            }
            state.direction = newDirection;
            document.documentElement.setAttribute('dir', newDirection);
        },
    },
});

export const { toggleTheme, toggleDirection } = AppSlice.actions;
