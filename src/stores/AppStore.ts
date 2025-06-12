import { createSlice } from '@reduxjs/toolkit';

/**
 * Application theme
 *
 */
export enum AppTheme {
    LIGHT = 'light',
    DARK = 'dark',
}

/**
 * Application direction
 *
 */
export enum AppDirection {
    LTR = 'ltr',
    RTL = 'rtl',
}

/**
 * Application state
 *
 * @property {AppTheme} theme Theme of the application (dark or light)
 * @property {AppDirection} direction Direction of the application (ltr or rtl)
 */
export interface AppState {
    theme: AppTheme;
    direction: AppDirection;
}

/**
 * Initialize application state
 *
 * @returns {AppState} Initial state
 */
function initialState(): AppState {
    return {
        theme: document.documentElement.getAttribute('data-theme') ?? AppTheme.DARK,
        direction: document.documentElement.getAttribute('dir') ?? AppDirection.LTR,
    } as AppState;
}

/**
 * Toggle theme
 *
 * @param {AppState} state State
 */
const AppToggleTheme = (state: AppState) => {
    let newTheme = state.theme;
    if (state.theme === AppTheme.DARK) {
        newTheme = AppTheme.LIGHT;
    } else {
        newTheme = AppTheme.DARK;
    }

    state.theme = newTheme;
    document.documentElement.setAttribute('data-theme', newTheme);
};

/**
 * Toggle direction
 *
 * @param {AppState} state State
 */
const AppToogleDirection = (state: AppState) => {
    let newDirection = state.direction;
    if (state.direction === AppDirection.LTR) {
        newDirection = AppDirection.RTL;
    } else {
        newDirection = AppDirection.LTR;
    }

    state.direction = newDirection;
    document.documentElement.setAttribute('dir', newDirection);
};

/**
 * Application store
 *
 */
export const AppStore = createSlice({
    name: 'app',
    initialState: initialState(),
    reducers: {
        toggleTheme: AppToggleTheme,
        toggleDirection: AppToogleDirection,
    },
});

// Export store actions
export const { toggleTheme, toggleDirection } = AppStore.actions;
