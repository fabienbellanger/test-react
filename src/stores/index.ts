import { configureStore } from '@reduxjs/toolkit';
import { AppStore, AppState } from './AppStore';
import { UserStore, UserState } from './UserStore';

/**
 * Global state
 *
 * @property {AppState} app Application state
 *  @property {UserState} user User state
 */
export interface GlobalState {
    app: AppState;
    user: UserState;
}

/**
 * Global store
 *
 */
export const store = configureStore({
    reducer: {
        app: AppStore.reducer,
        user: UserStore.reducer,
    },
});
