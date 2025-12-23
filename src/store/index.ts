import { configureStore } from "@reduxjs/toolkit";

// redux
import tasksReducer from "./slices/tasks/tasks";
import usersReducer from "./slices/users/users";
import taskFilterReducer from "./slices/tasks/tasks-filters";
import usersFilterReducer from "./slices/users/users-filter";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: usersReducer,
    taskFilters: taskFilterReducer,
    usersFilters: usersFilterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
