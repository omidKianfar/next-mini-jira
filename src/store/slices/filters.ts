import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type
import { FiltersState } from "@/src/types/global";

const initialState: FiltersState = {
  date: {
    from: null,
    to: null,
  },
  tag: null,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<string | null>) => {
      state.tag = action.payload;
    },

    setDate: (
      state,
      action: PayloadAction<{ from: string | null; to: string | null }>,
    ) => {
      state.date = action.payload;
    },

    resetFilters: (state) => {
      state.tag = null;
      state.date = { from: null, to: null };
    },
  },
});

export const { setType, setDate, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;
