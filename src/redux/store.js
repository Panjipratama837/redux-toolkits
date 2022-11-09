import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postReducer from '../features/post/postSlice';
import todoReducer from '../features/todo/todoSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        post: postReducer,
        todo: todoReducer,
    },
})