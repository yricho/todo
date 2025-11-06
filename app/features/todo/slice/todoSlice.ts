import { Todo } from "@/app/features/todo/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Todo[] = [];

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addInitData: (state, action) => {
      return action.payload;
    },
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    },
    editTodo: (state, action) => {
      const todo = state.find((t) => t.id === action.payload.id);
      if (todo) {
        Object.assign(todo, action.payload);
      }
    },
    deleteTodo: (state, action) => {
      return state.filter((t) => t.id !== action.payload);
    },
    selectTodo: (state, action) => {
      return state.map((t) =>
        t.id === action.payload
          ? { ...t, isSelected: !t.isSelected }
          : { ...t, isSelected: false }
      );
    },
  },
});

export const {
  addInitData,
  addTodo,
  toggleTodo,
  editTodo,
  deleteTodo,
  selectTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
