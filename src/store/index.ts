import { configureStore } from '@reduxjs/toolkit';

import tasksReducer from './slices/tasks/tasks';
import usersReducer from './slices/users/users';
import chatsReducer from './slices/chats/chats';
import taskFilterReducer from './slices/tasks/tasks-filters';
import usersFilterReducer from './slices/users/users-filter';
import chatsFilterReducer from './slices/chats/chats-filter';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: usersReducer,
    chats: chatsReducer,
    taskFilters: taskFilterReducer,
    usersFilters: usersFilterReducer,
    chatsFilters: chatsFilterReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
