import { createSlice } from '@reduxjs/toolkit';

export const TestSlice = createSlice({
    name: 'test',
    initialState: {
        value: 0,
    },
    reducers: {
        test: (state) => {
            console.log(state.value);
        },
    },
});

export const { test } = TestSlice.actions;
