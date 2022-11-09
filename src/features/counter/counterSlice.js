import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    count: 0,
    title: "Counter App",
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        incrementByAmount: (state, action) => {
            state.count += action.payload;
        },
        resetCount: (state) => {
            state.count = 0;
        },
        setTitle: (state, action) => {
            state.title = action.payload;
        }
    },
});

export const { increment, decrement, incrementByAmount, resetCount, setTitle } = counterSlice.actions;

export default counterSlice.reducer;