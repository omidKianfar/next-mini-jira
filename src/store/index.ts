import { configureStore } from "@reduxjs/toolkit";

// redux
import tasksReducer from "./slices/tasks/tasks";
import usersReducer from "./slices/user/users";
import taskFilterReducer from "./slices/tasks/task-filters";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: usersReducer,
    taskFilters: taskFilterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
