import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasks";
import filterReducer from "./slices/filters";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
