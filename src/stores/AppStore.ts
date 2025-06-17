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
 * @property {boolean} loading Loading state of the application
 */
export interface AppState {
    theme: AppTheme;
    direction: AppDirection;
    loading: boolean;
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
        loading: false,
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

const StartLoading = (state: AppState) => {
    state.loading = true;
};

const StopLoading = (state: AppState) => {
    state.loading = false;
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
        startLoading: StartLoading,
        stopLoading: StopLoading,
    },
});

// Export store actions
export const { toggleTheme, toggleDirection, startLoading, stopLoading } = AppStore.actions;
