import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type
import { UserFiltersState } from "@/src/types/global";

const initialState: UserFiltersState = {
  createdAt: {
    from: null,
    to: null,
  },
  status: null,
};

const userFilterSlice = createSlice({
  name: "usersFilters",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<string | null>) => {
      state.status = action.payload;
    },

    setUserDate: (
      state,
      action: PayloadAction<{ from: string | null; to: string | null }>,
    ) => {
      state.createdAt = action.payload;
    },

    resetUserFilters: (state) => {
      state.status = null;
      state.createdAt = { from: null, to: null };
    },
  },
});

export const { setActive, setUserDate, resetUserFilters } =
  userFilterSlice.actions;

export default userFilterSlice.reducer;
