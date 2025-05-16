import { configureStore } from '@reduxjs/toolkit';
import { AppStore, AppState } from './AppStore';

/**
 * Global state
 *
 * @property {AppState} app Application state
 */
export interface GlobalState {
    app: AppState;
}

/**
 * Global store
 *
 */
export const store = configureStore({
    reducer: {
        app: AppStore.reducer,
    },
});
