import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/slice/todoSlice";
import initDataReducer from "../features/todo/slice/initDataSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    initData: initDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
