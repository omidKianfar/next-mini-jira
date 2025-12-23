import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type
import { TaskFiltersState } from "@/src/types/global";

const initialState: TaskFiltersState = {
  date: {
    from: null,
    to: null,
  },
  tag: null,
};

const filterTaskSlice = createSlice({
  name: "taskFilters",
  initialState,
  reducers: {
    setTaskType: (state, action: PayloadAction<string | null>) => {
      state.tag = action.payload;
    },

    setTaskDate: (
      state,
      action: PayloadAction<{ from: string | null; to: string | null }>,
    ) => {
      state.date = action.payload;
    },

    resetTaskFilters: (state) => {
      state.tag = null;
      state.date = { from: null, to: null };
    },
  },
});

export const { setTaskType, setTaskDate, resetTaskFilters } = filterTaskSlice.actions;

export default filterTaskSlice.reducer;
