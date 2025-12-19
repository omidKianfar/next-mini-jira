import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type
import { Task, TaskState } from "@/src/types/global";

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id == action.payload.id,
      );

      if (index !== -1) state.tasks[index] = action.payload;
    },
    clearTasks: (state) => {
      state.tasks = [];
    },
  },
});

export const { setTasks, addTask, removeTask, updateTask, clearTasks } =
  taskSlice.actions;

export default taskSlice.reducer;
