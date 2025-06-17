import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
    lastname?: string;
    firstname?: string;
    token?: string;
}

/**
 * Initialize application state
 *
 * @returns {UserState} Initial state
 */
function initialState(): UserState {
    try {
        const userSesssion = sessionStorage.getItem('user');

        if (userSesssion) {
            const user = JSON.parse(userSesssion);
            return {
                lastname: user.lastname,
                firstname: user.firstname,
                token: user.token,
            } as UserState;
        } else {
            return {
                lastname: undefined,
                firstname: undefined,
                token: undefined,
            } as UserState;
        }
    } catch (error) {
        console.error('Error accessing sessionStorage:', error);

        return {
            lastname: undefined,
            firstname: undefined,
            token: undefined,
        } as UserState;
    }
}

export const UserStore = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            const { lastname, firstname, token } = action.payload;
            state.lastname = lastname;
            state.firstname = firstname;
            state.token = token;

            sessionStorage.setItem('user', JSON.stringify({ lastname, firstname }));
            sessionStorage.setItem('token', token);
        },
        clearUser: (state) => {
            state.lastname = undefined;
            state.firstname = undefined;
            state.token = undefined;

            sessionStorage.removeItem('user');
            sessionStorage.removeItem('token');
        },
    },
});

export const { setUser, clearUser } = UserStore.actions;
